import remove from '../../../Assets/images/delete.png';
import etranger from '../../../Assets/images/icons/filterBar/etranger.png';
import {useState, useRef} from 'react';
import functions from '../../../Utils/Functions';
import './Details.css';
import '../../../Assets/Styles/global_Style.css';

function Details({ data }) {
	const [nom, setNom] = useState(data.nom === undefined ? "" : data.nom);
	const [brand, setBrand] = useState(data.brand === undefined ? "" : data.brand);
	const [description, setDescription] = useState(data.description === undefined ? "" : data.description);
	const [email, setEmail] = useState(data.email === undefined ? "" : data.email);
	const [emailClassName, setEmailClassName] = useState("input__text step__input__text");
	const [phone, setPhone] = useState(data.phone === undefined ? "" : data.phone);
	const [phoneClassName, setPhoneClassName] = useState("input__text step__input__text");
	const [linkURL, setLinkURL] = useState("");
	const [linkTitle, setLinkTitle] = useState("");
	const [links, setLinks] = useState(data.links);
	const linkUrlRef = useRef();
	const linkTitleRef = useRef();


	function handleInputTextChange(e) {
		switch (e.target.attributes.data.value) {
			case "input-nom":
				data.nom = functions.stringRemoveMultipleSpaces(e.target.value);
				setNom(data.nom);
				break;
			case "input-brand":
				setBrand(functions.stringRemoveMultipleSpaces(e.target.value));
				break;
			case "input-description":
				data.description = functions.stringRemoveMultipleSpaces(e.target.value);
				setDescription(data.description);
				break;
			case "input-link-title":
				setLinkTitle(functions.stringRemoveMultipleSpaces(e.target.value));
				break;
			case "input-link-url":
				setLinkURL(functions.stringRemoveAllSpaces(e.target.value));
				break;
			case "input-email":
				setEmail(functions.stringRemoveMultipleSpaces(e.target.value));
				break;
			case "input-phone":
				if (functions.stringIsNumber(e.target.value) && (e.target.value.length <= 10)) {
					setPhone(e.target.value);
				}
				break;
		}
	}
	function handleInputBlur(e) {
		switch (e.target.attributes.data.value) {
			case "input-nom":
				setNom(functions.stringNormalizeSpaces(e.target.value));
				break;
			case "input-brand":
				setBrand(functions.stringNormalizeSpaces(e.target.value));
				break;
			case "input-description":
				setDescription(functions.stringNormalizeSpaces(e.target.value));
				break;
			case "input-link-title":
				setLinkTitle(functions.stringNormalizeSpaces(e.target.value));
				break;
			case "input-link-url":
				setLinkURL(functions.stringNormalizeSpaces(e.target.value));
				break;
			case "input-email":
				if (e.target.value.length === 0) {
					setEmailClassName("input__text step__input__text");
				} else {
					if (functions.isValidEmail(e.target.value)) {
						setEmailClassName("input__text step__input__text valid-input");
					} else {
						setEmailClassName("input__text step__input__text invalid-input");
					}
				}
				break;
			case "input-phone":
				if (e.target.value.length === 0) {
					setPhoneClassName("input__text step__input__text");
				} else {
					if (functions.isValidPhoneNumber(e.target.value)) {
						setPhoneClassName("input__text step__input__text valid-input");
					} else {
						setPhoneClassName("input__text step__input__text invalid-input");
					}
				}
				break;
		}
	}

	function deleteLink(id) {
		data.links = links.filter((obj) => obj.id !== id);
		setLinks(data.links);
	}
	function addNewLink() {
		if (linkTitleRef.current.value.length > 0 && linkUrlRef.current.value.length > 0) {
			data.links.push({
				id: data.links.length,
				name: linkTitleRef.current.value,
				url: linkUrlRef.current.value,
				icon: undefined
			});
			setLinkURL("");
			setLinkTitle("");
			setLinks(data.links);
		}
	}
	return <div className="step step__details">
		<h1 className='step__title'>Détails sur le bien</h1>
		<div className="step__details__info">
			<input type="text" placeholder="Nom" className="step__details__info__name input__text step__input__text" onChange={handleInputTextChange} value={nom} onBlur={handleInputBlur} data="input-nom" />
			<input type="text" placeholder="Marque (optionel)" className="step__details__info__brand input__text step__input__text" onChange={handleInputTextChange} value={brand} onBlur={handleInputBlur} data="input-brand" />
		</div>
		<br />
		<textarea rows="5" className="step__details__description" placeholder="Description" data="input-description" onChange={handleInputTextChange} value={description} onBlur={handleInputBlur} />
		<hr className='step__line'/>
		<h1 className='step__title'>Liens externes</h1>
		<div className="step__details__links">
			{
				links.map(link => {
					return <div className="step__details__links__link">
						<img className='step__details__links__link__delete' src={remove} alt="delete" onClick={() => deleteLink(link.id)} />
						<img className="step__details__links__link__icon" src={!link?.icon ? etranger : link.icon} alt="link" />
						<a className="step__details__links__link__title" href={link.url} target="_blank">{link.name}</a>
						<a className="step__details__links__link__url" href={link.url} target="_blank">{link.url}</a>
					</div>
				})
			}
		</div>
		<div className="step__details__newLink">
			<input ref={linkUrlRef} type="text" placeholder="https://www.example.net" className="input__text step__input__text" data="input-link-url" value={linkURL} onPaste={handleInputTextChange} onChange={handleInputTextChange}></input>
			<input ref={linkTitleRef} type="text" placeholder="Titre" className="input__text step__input__text" data="input-link-title" value={linkTitle} onChange={handleInputTextChange}></input>
			<label className='button button--green step__details__newLink__add' onClick={() => addNewLink()}>Ajouter</label>
		</div>
		<hr className='step__line'/>
		<h1 className='step__title'>Coordonnées de contacte</h1>
		<div className="step__details__coordiantes">
			<input type="text" placeholder="Email" className={emailClassName} data="input-email" value={email} onChange={handleInputTextChange} onBlur={handleInputBlur}></input>
			<input type="text" placeholder="Téléphone" className={phoneClassName} data="input-phone" value={phone} onChange={handleInputTextChange} onBlur={handleInputBlur}></input>
		</div>
	</div>
}

export default Details;