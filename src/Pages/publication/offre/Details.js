import remove from '../../../Assets/images/delete.png';
import etranger from '../../../Assets/images/icons/filterBar/etranger.png';
import { useState, useRef, useEffect } from 'react';
import functions from '../../../Utils/Functions';
import './Details.css';
import '../../../Assets/Styles/global_Style.css';
import socialMediaIcons from './../../../Utils/socialMediaIcons';
function Details({ data, handleChanges }) {
	const [title, setTitle] = useState(!data?.title ? "" : data.title);
	const [brand, setBrand] = useState(!data?.brand ? "" : data.brand);
	const [description, setDescription] = useState(!data?.description ? "" : data.description);
	const [email, setEmail] = useState(!data?.email ? "" : data.email);
	const [emailClassName, setEmailClassName] = useState("input__text step__input__text");
	const [phone, setPhone] = useState(!data?.phone ? "" : data.phone);
	const [phoneClassName, setPhoneClassName] = useState("input__text step__input__text");
	const [linkURL, setLinkURL] = useState("");
	const [linkTitle, setLinkTitle] = useState("");
	const [links, setLinks] = useState(!data?.links ? [] : data.links);
	const linkUrlRef = useRef();
	const linkTitleRef = useRef();


	function handleInputTextChange(e) {
		switch (e.target.attributes.data.value) {
			case "input-title":
				let t1 = functions.stringRemoveMultipleSpaces(e.target.value);
				setTitle(t1);
				handleChanges({ title: t1 });
				break;
			case "input-brand":
				let t2 = functions.stringRemoveMultipleSpaces(e.target.value);
				setBrand(t2);
				handleChanges({ brand: t2 });
				break;
			case "input-description":
				let t3 = functions.stringRemoveMultipleSpaces(e.target.value);
				setDescription(t3);
				handleChanges({ description: t3 });
				break;
			case "input-link-title":
				setLinkTitle(functions.stringRemoveMultipleSpaces(e.target.value));
				break;
			case "input-link-url":
				setLinkURL(functions.stringRemoveAllSpaces(e.target.value));
				break;
			case "input-email":
				let t4 = functions.stringRemoveMultipleSpaces(e.target.value);
				setEmail(t4);
				handleChanges({ email: t4 });
				break;
			case "input-phone":
				if (functions.stringIsNumber(e.target.value) && (e.target.value.length <= 10)) {
					let t5 = functions.stringRemoveMultipleSpaces(e.target.value);
					setPhone(t5);
					handleChanges({ phone: t5 });
				}
				break;
		}
	}
	function handleInputBlur(e) {
		switch (e.target.attributes.data.value) {
			case "input-title":
				setTitle(functions.stringNormalizeSpaces(e.target.value));
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
		setLinks([...(links.filter((obj) => obj.id !== id))]);
	}
	function addNewLink() {
		if (linkTitleRef.current.value.length > 0 && linkUrlRef.current.value.length > 0) {
			setLinks([...links,{
				id: links.length,
				name: linkTitleRef.current.value,
				url: linkUrlRef.current.value,
				icon: socialMediaIcons(linkUrlRef.current.value)
			}]);
			setLinkURL("");
			setLinkTitle("");
		}
	}
	return <div className="step step__details">
		<h1 className='step__title'>Détails sur le bien</h1>
		<div className="step__details__info">
			<input type="text" maxlength="64" placeholder="Titre de l'annonce" className="step__details__info__name input__text step__input__text" onChange={handleInputTextChange} value={title} onBlur={handleInputBlur} data="input-title" />
			<input type="text" maxlength="64" placeholder="Marque (Optionnel)" className="step__details__info__brand input__text step__input__text" onChange={handleInputTextChange} value={brand} onBlur={handleInputBlur} data="input-brand" />
		</div>
		<br />
		<textarea maxlength="4096" rows="8" className="step__details__description" placeholder="Description" data="input-description" onChange={handleInputTextChange} value={description} onBlur={handleInputBlur} />
		<hr className='step__line' />
		<h1 className='step__title'>Liens externes</h1>
		<div className="step__details__links">
			{
				links?.map(link => {
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
			<input ref={linkTitleRef} maxLength="64" type="text" placeholder="Titre" className="input__text step__input__text" data="input-link-title" value={linkTitle} onChange={handleInputTextChange}></input>
			<label className='button button--green step__details__newLink__add' onClick={() => addNewLink()}>Ajouter</label>
		</div>
		<hr className='step__line' />
		<h1 className='step__title'>Coordonnées de contacte</h1>
		<div className="step__details__coordiantes">
			<input type="text" placeholder="Email" className={emailClassName} data="input-email" value={email} onChange={handleInputTextChange} onBlur={handleInputBlur}></input>
			<input type="text" placeholder="Téléphone" className={phoneClassName} data="input-phone" value={phone} onChange={handleInputTextChange} onBlur={handleInputBlur}></input>
		</div>
	</div>
}

export default Details;