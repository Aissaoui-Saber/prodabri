import NavBar from '../../../Components/NavBar';
import '../../../Assets/Styles/global_Style.css';
import '../Publication.css';
import StepBar from '../../../Components/StepBar';
import secteurs from '../../../Utils/Secteurs';
import functions from '../../../Utils/Functions';
import { useState, useRef, useEffect } from 'react';
import production from '../../../Assets/images/icons/filterBar/production.png';
import consomation from '../../../Assets/images/icons/filterBar/consomation.png';
import algerien from '../../../Assets/images/icons/filterBar/algerien.png';
import etranger from '../../../Assets/images/icons/filterBar/etranger.png';
import Select from '../../../Components/filterBar/Select';
import countries from '../../../Utils/Countries';
import durable from '../../../Assets/images/icons/filterBar/durable.png';
import nonDurable from '../../../Assets/images/icons/filterBar/non-durable.png';
import remove from '../../../Assets/images/delete.png';
import SelectLieu from '../../../Components/filterBar/SelectLieu/SelectLieu';
import pin from '../../../Assets/images/icons/filterBar/placeholder.png';
import store from '../../../Assets/images/store.png';

import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


let offre = {
	secteur: {
		id: undefined,
		new: undefined
	},
	type: undefined,
	origine: {
		origine: undefined,
		pays: {
			icon: etranger,
			title: "Pays",
			options: [
				{ id: -1, text: "Selectionner un pays", icon: etranger },
				...countries
			],
			defaultOption: -1,
			selectedItem: -1,
			getOption: function (optionID) {
				let o = offre.origine.pays.options.filter(opt => {
					if (opt.id === optionID) {
						return opt;
					}
				});
				return o.length === 1 ? o[0] : null;
			},
			handleChanges: function (item) {
				console.log(item);
				offre.origine.pays.selectedItem = item;
			}
		}
	},
	durabilite: undefined,
	details: {
		nom: undefined,
		brand: undefined,
		description: undefined,
		links: [
			{
				id: 0,
				name: "facebook",
				url: "https://www.facebook.com/pageName",
				icon: undefined
			},
			{
				id: 1,
				name: "Youtube",
				url: "https://www.youtube.com/pageNameezfnozefioafneznfinezoifnuoizanfiezunfoiezhojepfoijezapjfiezjfoezajfpezapofezjafivjpoiezjfjezfopjezapoifjezijfpijezfoizjeijfpezajfezajoinfiezifnezinfu",
				icon: undefined
			}
		],
		email: undefined,
		phone: undefined
	},
	localisations: {
		lieux_de_production: {
			select: {
				wilayas: [
					{
						wilayaNumber: 1,
						name: "Adrar",
						checked: false,
						communes: [
							{ id: 120, name: "Commune 1", checked: false },
							{ id: 220, name: "Commune 2", checked: false },
							{ id: 320, name: "Commune 3", checked: false },
						]
					},
					{
						wilayaNumber: 2,
						name: "Chlef",
						checked: false,
						communes: [
							{ id: 420, name: "Commune 4", checked: false },
							{ id: 5020, name: "Commune 5", checked: false },
							{ id: 602, name: "Commune 6", checked: false },
							{ id: 1020, name: "Commune 10", checked: false },
							{ id: 11020, name: "Commune 11", checked: false },
							{ id: 1202, name: "Commune 12", checked: false },
						]
					},
					{
						wilayaNumber: 3,
						name: "Laghouat",
						checked: false,
						communes: [
							{ id: 702, name: "Commune 7", checked: false },
							{ id: 820, name: "Commune 8", checked: false },
							{ id: 920, name: "Commune 9", checked: false },
						]
					},
				],
				defaultOption: false,
				handleChanges: function (selectedCities) {
					offre.localisations.lieux_de_production.lieux.push(selectedCities);
				},
				getOption: function (optionID) {
					let o = [];
					offre.localisations.lieux_de_production.select.wilayas.forEach(wilaya => {
						wilaya.filter(commune => {
							if (commune.id === optionID) {
								o.push({ ...commune, wilaya: wilaya.name, wilayaNumber: wilaya.wilayaNumber });
							}
						});
					});
					return o.length === 1 ? o[0] : null;
				},
			},
			lieux: [
				{
					commune: { id: 220, name: "Commune 2", wilaya: "Adrar", wilayaNumber:1 },
					points: [
						[
							27.864565,
							-0.286229
						],
						[
							27.868245,
							-0.295027
						],
					]
				},
				{
					commune: { id: 320, name: "Commune 3", wilaya: "Adrar", wilayaNumber: 1 },
					points: [
						[
							27.894565,
							-0.386229
						],
						[
							27.168245,
							-0.095027
						],
					]
				}
			]
		},
		lieux_de_vente: {
			select: {
				wilayas: [
					{
						wilayaNumber: 1,
						name: "Adrar",
						checked: false,
						communes: [
							{ id: 120, name: "Commune 1", checked: false },
							{ id: 220, name: "Commune 2", checked: false },
							{ id: 320, name: "Commune 3", checked: false },
						]
					},
					{
						wilayaNumber: 2,
						name: "Chlef",
						checked: false,
						communes: [
							{ id: 420, name: "Commune 4", checked: false },
							{ id: 5020, name: "Commune 5", checked: false },
							{ id: 602, name: "Commune 6", checked: false },
							{ id: 1020, name: "Commune 10", checked: false },
							{ id: 11020, name: "Commune 11", checked: false },
							{ id: 1202, name: "Commune 12", checked: false },
						]
					},
					{
						wilayaNumber: 3,
						name: "Laghouat",
						checked: false,
						communes: [
							{ id: 702, name: "Commune 7", checked: false },
							{ id: 820, name: "Commune 8", checked: false },
							{ id: 920, name: "Commune 9", checked: false },
						]
					},
				],
				defaultOption: false,
				handleChanges: function (selectedCities) {
					offre.localisations.lieux_de_vente.lieux.push(selectedCities);
				}
			},
			lieux: [],
			online: undefined
		},
		lieux_de_livraison: {
			select: {
				wilayas: [
					{
						wilayaNumber: 1,
						name: "Adrar",
						checked: false,
						communes: [
							{ id: 120, name: "Commune 1", checked: false },
							{ id: 220, name: "Commune 2", checked: false },
							{ id: 320, name: "Commune 3", checked: false },
						]
					},
					{
						wilayaNumber: 2,
						name: "Chlef",
						checked: false,
						communes: [
							{ id: 420, name: "Commune 4", checked: false },
							{ id: 5020, name: "Commune 5", checked: false },
							{ id: 602, name: "Commune 6", checked: false },
							{ id: 1020, name: "Commune 10", checked: false },
							{ id: 11020, name: "Commune 11", checked: false },
							{ id: 1202, name: "Commune 12", checked: false },
						]
					},
					{
						wilayaNumber: 3,
						name: "Laghouat",
						checked: false,
						communes: [
							{ id: 702, name: "Commune 7", checked: false },
							{ id: 820, name: "Commune 8", checked: false },
							{ id: 920, name: "Commune 9", checked: false },
						]
					},
				],
				defaultOption: false,
				handleChanges: function (selectedCities) {
					offre.localisations.lieux_de_livraison.lieux.push(selectedCities);
				}
			},
			lieux: []
		},
	}
};

function OffreCreation() {
	const [currentStep, setCurrentStep] = useState(2);
	document.title = "Publication d'offre";
	let steps = [
		"Secteur",
		"Type",
		"Origine",
		"Durabilit�",
		"D�taills",
		"Emplacements",
		"M�dia",
		"R�capitulatif"
	];

	

	function nextStep() {
		setCurrentStep(currentStep+1);
		/*switch (currentStep) {
			case 0:
				if (offre.secteur.new != undefined) {
					if (offre.secteur.new !== "") {
						setCurrentStep(1);
					}
				} else {
					if (offre.secteur.id != undefined) {
						setCurrentStep(1);
					}
				}
				break;
			case 1:
				if (offre.type !== undefined) {
					setCurrentStep(2);
				}
				break;
			case 2:
				if (offre.origine.origine !== undefined) {
					setCurrentStep(3);
				}
				break;
			case 3:
				if (offre.durabilite !== undefined) {
					setCurrentStep(4);
				}
				break;
			case 4:
				if (offre.details.nom !== undefined && offre.details.description !== undefined) {
					setCurrentStep(5);
				}
				break;
			case 5:
				console.log(offre);
				break;
			case 6:
				break;
			case 7:
				break;
	}*/

	}

	function handleSecteurStepChanges(data) {
		offre.secteur = data;
	}
	function handleTypeStepChanges(data) {
		offre.type = data;
	}
	function handleOrigineStepChanges(data) {
		offre.origine = data;
	}

	return <>
		<NavBar></NavBar>
		<div className="creation-body-container">
			<StepBar data={steps} currStep={currentStep} />
			
			<div className="step-body-container">
				{(() => {
					switch (currentStep) {
						case 0:
							return <Secteurs handleChanges={handleSecteurStepChanges} data={offre.secteur} />
							break;
						case 1:
							return <Type handleChanges={handleTypeStepChanges} data={offre.type} />
							break;
						case 2:
							return <Origine handleChanges={handleOrigineStepChanges} data={offre.origine} />
							break;
						case 3:
							return <Durabilite data={offre.durabilite} />
							break;
						case 4:
							return <Details data={offre.details}/>
							break;
						case 5:
							return <Localisations data={offre.localisations} />
							break;
						case 6:
							return <></>
							break;
						case 7:
							return <></>
							break;
					}
				})()}
			</div>
			<div style={{ width: 100 + "%", textAlign: "center", marginTop: "20px" }}><input type="button" className="greenButton" value={currentStep === steps.length - 1 ? "PUBLIER" : "POURSUIVRE"} onClick={() => nextStep()}></input></div>
			
		</div>
	</>

};

function Secteurs({ data, handleChanges }) {
	const [selectedBranche, setSelectedBranche] = useState(data.id);
	const [newTypedBranche, setNewTypedBranche] = useState(data.new === undefined ? "" : data.new);

	function selectBranche(brancheID) {
		if (brancheID == selectedBranche) {
			handleChanges({
				id: undefined,
				new: undefined
			});
			setSelectedBranche(undefined);
		} else {
			handleChanges({
				id: brancheID,
				new: undefined
			});
			setSelectedBranche(brancheID);
		}
		setNewTypedBranche("");
	}

	function handleInputTextChange(e) {
		setSelectedBranche(undefined);
		setNewTypedBranche(functions.stringRemoveMultipleSpaces(e.target.value));
		handleChanges({
			id: undefined,
			new: functions.stringNormalizeSpaces(e.target.value)
		});
	}
	function handleInputBlur(e) {
		setNewTypedBranche(functions.stringNormalizeSpaces(e.target.value));

	}
	return <div className="step-inner-container">
		<h1>S�lectionner le secteur dont votre produit appartient</h1>
		<h2>S�cteur primaire</h2>
		<p>Exploitation et extraction de ressources naturelles</p>
		<div className="Secteurs-container">
			{
				secteurs.secteurs_FR[0].branches.map(branche => {
					return <div className={branche.id === selectedBranche ? "branche-container selected-branche" : "branche-container"} onClick={() => selectBranche(branche.id)}>
						<img src={branche.icon} alt="secteur"/>
						<label>{branche.text}</label>
					</div>
				})
			}
		</div>
		<h2>S�cteur secondaire</h2>
		<p>Transformation des mati�res premi�res issues du secteur primaire</p>
		<div className="Secteurs-container">
			{
				secteurs.secteurs_FR[1].branches.map(branche => {
					return <div className={branche.id === selectedBranche ? "branche-container selected-branche" : "branche-container"} onClick={() => selectBranche(branche.id)}>
						<img src={branche.icon} alt="secteur"/>
						<label>{branche.text}</label>
					</div>
				})
			}
		</div>
		<h2>S�cteur tertiaire</h2>
		<p>Produire des services</p>
		<div className="Secteurs-container">
			{
				secteurs.secteurs_FR[2].branches.map(branche => {
					return <div className={branche.id === selectedBranche ? "branche-container selected-branche" : "branche-container"} onClick={() => selectBranche(branche.id)}>
						<img src={branche.icon} alt="secteur" />
						<label>{branche.text}</label>
					</div>
				})
			}
		</div>
		<hr/>
		<h1>Vous avez pas trouv� le bon secteur ?</h1>
		<p>Pr�cisez le nom du secteur souhait�</p>
		<input type="text" placeholder="Nom du secteur" className="input-text" onChange={handleInputTextChange} value={newTypedBranche} onBlur={handleInputBlur} />
	</div>
}

function Type({ data, handleChanges }) {
	const [selectedType, setSelectedType] = useState(data);

	function selectType(type) {
		if (type === 'C') {
			if (selectedType === 'P') {
				handleChanges('CP');
				setSelectedType('CP');
			} else if (selectedType === undefined) {
				handleChanges('C');
				setSelectedType('C');
			} else if (selectedType === 'CP') {
				handleChanges('P');
				setSelectedType('P');
			} else {
				handleChanges(undefined);
				setSelectedType(undefined);
			}
		} else {
			if (selectedType === 'C') {
				handleChanges('CP');
				setSelectedType('CP');
			} else if (selectedType === undefined) {
				handleChanges('P');
				setSelectedType('P');
			} else if (selectedType === 'CP') {
				handleChanges('C');
				setSelectedType('C');
			} else {
				handleChanges(undefined);
				setSelectedType(undefined);
			}
		}
	}

	return <div className="step-inner-container">
		<h1>S�lectionner le type de votre produit ou service</h1>
		<div className={selectedType === 'C' || selectedType === 'CP'? "branche-container selected-branche" : "branche-container"} onClick={() => selectType('C')}>
			<img src={consomation} alt="consomation" />
			<div>
				<h2>Bien de consomation</h2>
				<p>Le bien de consommation est celui qui peut �tre utilis� et connsom� tel quel.</p>
			</div>
		</div>
		<br />
		<div className={selectedType === 'P' || selectedType === 'CP' ? "branche-container selected-branche" : "branche-container"} onClick={() => selectType('P')}>
			<img src={production} alt="production" />
			<div>
				<h2>Bien de production</h2>
				<p>Le bien de production est celui qui permet d'obtenir un autre bien et qui rentre dans la production d'autre biens.</p>
			</div>
		</div>
	</div>
}

function Origine({ data }) {
	const [selectedOrigine, setSelectedOrigine] = useState(data);

	function selectOrigine(origine) {
		if (origine === 'DZ') {
			offre.origine.pays.selectedItem = -1;
		}
		offre.origine.origine = origine;
		setSelectedOrigine(origine);
	}

	return <div className="step-inner-container">
		<h1>S�lectionner l'origine de votre produit ou service</h1>
		<div className={selectedOrigine === 'DZ' ? "branche-container selected-branche" : "branche-container"} onClick={() => selectOrigine('DZ')}>
			<img src={algerien} alt="algerie" />
			<div>
				<h2>Produit Alg�rien</h2>
				<p>Le bien est fabriqu� et fournit en Alg�rie</p>
			</div>
		</div>
		<br />
		<div className={selectedOrigine === 'ETR' ? "branche-container selected-branche" : "branche-container"} onClick={() => selectOrigine('ETR')}>
			<img src={etranger} alt="etranger" />
			<div style={{ width: "100%", justifySelf: "start" }}>
				<h2>Produit �tranger</h2>
				<p>Le bien est fabriqu� ou fournit depuis �tranger</p>
			</div>
			{
				selectedOrigine === 'ETR' ? <Select data={offre.origine.pays} optionsType="countries"  /> : ""
			}
			
		</div>
		
	</div>
}

function Durabilite({ data}) {
	const [selectedDurabilite, setSelectedDurabilite] = useState(data);

	function selectDurabilite(durabilite) {
		if (durabilite === selectedDurabilite) {
			offre.durabilite = undefined;
			setSelectedDurabilite(undefined);
		} else {
			offre.durabilite = durabilite;
			setSelectedDurabilite(durabilite);
		}
	}

	return <div className="step-inner-container">
		<h1>Quel est la dur� d'utilisation de votre produit ou service</h1>
		<div className={selectedDurabilite === 'D' ? "branche-container selected-branche" : "branche-container"} onClick={() => selectDurabilite('D')}>
			<img src={durable} alt="consomation" />
			<div>
				<h2>Bien durable</h2>
				<p>Le bien peut �tre utilis� de nombreuses fois</p>
			</div>
		</div>
		<br />
		<div className={selectedDurabilite === 'ND' ? "branche-container selected-branche" : "branche-container"} onClick={() => selectDurabilite('ND')}>
			<img src={nonDurable} alt="production" />
			<div>
				<h2>Bien non durable</h2>
				<p>Le bien est d�truit par le premier usage.</p>
			</div>
		</div>
	</div>
}

function Details({ data }) {
	const [nom, setNom] = useState(data.nom === undefined ? "" : data.nom);
	const [brand, setBrand] = useState(data.brand === undefined ? "" : data.brand);
	const [description, setDescription] = useState(data.description === undefined ? "" : data.description);
	const [email, setEmail] = useState(data.email === undefined ? "" : data.email);
	const [emailClassName, setEmailClassName] = useState("input-text");
	const [phone, setPhone] = useState(data.phone === undefined ? "" : data.phone);
	const [phoneClassName, setPhoneClassName] = useState("input-text");
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
					setEmailClassName("input-text");
				} else {
					if (functions.isValidEmail(e.target.value)) {
						setEmailClassName("input-text valid-input");
					} else {
						setEmailClassName("input-text invalid-input");
					}
				}
				break;
			case "input-phone":
				if (e.target.value.length === 0) {
					setPhoneClassName("input-text");
				} else {
					if (functions.isValidPhoneNumber(e.target.value)) {
						setPhoneClassName("input-text valid-input");
					} else {
						setPhoneClassName("input-text invalid-input");
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
	return <div className="step-inner-container">
		<h1>D�tails sur le bien</h1>
		<div className="coordinates-container">
			<input type="text" placeholder="Nom" className="input-text" onChange={handleInputTextChange} value={nom} onBlur={handleInputBlur} data="input-nom"/>
			<input type="text" placeholder="Marque (optionel)" className="input-text" onChange={handleInputTextChange} value={brand} onBlur={handleInputBlur} data="input-brand" />
		</div>
		<br />
		<textarea rows="12" className="textArea" placeholder="Description" data="input-description" onChange={handleInputTextChange} value={description} onBlur={handleInputBlur}/>
		<hr/>
		<h1>Liens externes</h1>
		<div className="links-container">
			{
				links.map(link => {
					return <div className="link-container">
						<div className="delete-button delete-button-link"><img src={remove} alt="delete" onClick={() => deleteLink(link.id)} /></div>
						<img className="link-icon" src={link.icon === undefined ? etranger : link.icon} alt="link" />
						<a className="link-title" href={link.url} target="_blank">{link.name}</a>
						<a className="link-url" href={link.url} target="_blank">{link.url}</a>
					</div>
				})
			}
		</div>
		<div className="new-link-container">
			<input ref={linkUrlRef} type="text" placeholder="https://www.example.net" className="input-text" data="input-link-url" value={linkURL} onPaste={handleInputTextChange} onChange={handleInputTextChange}></input>
			<input ref={linkTitleRef} type="text" placeholder="Titre" className="input-text" data="input-link-title" value={linkTitle} onChange={handleInputTextChange}></input>
			<label onClick={()=>addNewLink()}>Ajouter</label>
		</div>
		<hr/>
		<h1>Coordonn�es de contacte</h1>
		<div className="coordinates-container">
			<input type="text" placeholder="Email" className={emailClassName} data="input-email" value={email} onChange={handleInputTextChange} onBlur={handleInputBlur}></input>
			<input type="text" placeholder="T�l�phone" className={phoneClassName} data="input-phone" value={phone} onChange={handleInputTextChange} onBlur={handleInputBlur}></input>
		</div>
	</div>
}

function Localisations({ data }) {
	const [eCommerceSelected, setEcommerceSelected] = useState(false);
	const [onlineStoreLink, setOnlineStoreLink] = useState("");
	const eCommerceLinkRef = useRef();
	function selectEcommerce(e) {
		if (eCommerceLinkRef.current !== e.target) {
			if (eCommerceSelected) {
				setEcommerceSelected(false);
				setOnlineStoreLink("");
			} else {
				setEcommerceSelected(true);
			}
		}
		
	}
	function handleInputTextChange(e) {
		setOnlineStoreLink(functions.stringRemoveAllSpaces(e.target.value));
	}
	return <div className="step-inner-container">
		<div class="lieux-header-container">
			<div><h1>Lieux de production (0 ville)</h1></div>
			<SelectLieu data={data.lieux_de_production.select} handleCitiesChecks={data.lieux_de_production.select.handleChanges} title="Lieux de production"/>
		</div>
		<div class="lieux-list-container">
			{
				data.lieux_de_production.lieux.map(lieu => {
					return <LieuCreation data={lieu}/>
				})
			}
		</div>
		<hr />
		<div class="lieux-header-container">
			<div><h1>Lieux de vente (0 ville)</h1></div>
			<SelectLieu data={data.lieux_de_vente.select} handleCitiesChecks={data.lieux_de_vente.select.handleChanges} title="Lieux de vente" />
		</div>
		<div class="lieux-list-container">
			{
				data.lieux_de_vente.lieux.map(lieu => {
					return <LieuCreation data={lieu} />
				})
			}
		</div>
		<div className={eCommerceSelected ? "branche-container selected-branche" : "branche-container"} onClick={selectEcommerce}>
			<img src={store} alt="consomation" />
			<div>
				<h2>Boutique en ligne</h2>
				<p>Vous avez une boutique sur internet pour le eCommerce</p>
			</div>
			<input ref={eCommerceLinkRef} className={eCommerceSelected ? "input-text" : "input-text hidden"} type="text" placeholder="https://www.nom-de-boutique.com" onPaste={handleInputTextChange} onChange={handleInputTextChange} value={onlineStoreLink} />
		</div>
		<hr />
		<div class="lieux-header-container">
			<div><h1>Lieux de Livraison (0 ville)</h1></div>
			<SelectLieu data={data.lieux_de_livraison.select} handleCitiesChecks={data.lieux_de_livraison.select.handleChanges} title="Lieux de livraison" />
		</div>
	</div>
}

function LieuCreation({ data }) {
	const [lieuItemOpen, setLieuItemOpen] = useState(false);
	function openCloseLieuItem() {
		if (lieuItemOpen) {
			setLieuItemOpen(false);
		} else {
			setLieuItemOpen(true);
		}
	}
	return <div className="lieu-item-container">
		<div className={lieuItemOpen ? "tree-triangle tree-triangle-open" : "tree-triangle"} onClick={openCloseLieuItem}></div>
		<img src={pin} alt="lieu" />
		<div>
			<label className="commune-name">{data.commune.name + " (" + data.points.length + " Lieux)"}</label>
			<label className="wilaya-name">{data.commune.wilaya}</label>
		</div>
		<div className={lieuItemOpen ? "delete-button delete-button-lieu" : "delete-button delete-button-lieu hidden"}><img src={remove} alt="delete" /></div>
		<div className={lieuItemOpen ? "lieu-map-container" : "lieu-map-container hidden"}>
			<p>Pr�ciser la position exacte sur la carte des lieux de production dans cette ville</p>
				<MapContainer center={data.points[0]} zoom={13} scrollWheelZoom={false}>
					<TileLayer
						attribution='&copy; <a href="https://www.google.com/intl/en-GB_ALL/permissions/geoguidelines/">Google Maps</a> contributors'
						url="https://mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
					/>
					{
						data.points.map(point => {
							return <Marker position={point}>
							</Marker>
						})
					}
				</MapContainer>
		</div>
	</div>
}

export default OffreCreation;
