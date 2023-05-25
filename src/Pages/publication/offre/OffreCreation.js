import NavBar from '../../../Components/NavBar';
import '../../../Assets/Styles/global_Style.css';
import '../Publication.css';
import StepBar from '../../../Components/StepBar';

import Secteurs from './Secteurs';
import Type from './Type';
import Origine from './Origine';
import Durabilite from './Durabilite';
import Details from './Details';

import functions from '../../../Utils/Functions';
import { useState, useRef, useEffect } from 'react';

import etranger from '../../../Assets/images/icons/filterBar/etranger.png';
import countries from '../../../Utils/Countries';
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
					commune: { id: 220, name: "Commune 2", wilaya: "Adrar", wilayaNumber: 1 },
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
	const [currentStep, setCurrentStep] = useState(0);
	document.title = "Publication d'offre";
	let steps = [
		"Secteur",
		"Type",
		"Origine",
		"Durabilité",
		"Détaills",
		"Emplacements",
		"Média",
		"Récapitulatif"
	];



	function nextStep() {
		setCurrentStep(currentStep + 1);
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
			{(() => {
				switch (currentStep) {
					case 0:
						return <Secteurs handleChanges={handleSecteurStepChanges} data={offre.secteur} />
					case 1:
						return <Type handleChanges={handleTypeStepChanges} data={offre.type} />
					case 2:
						return <Origine handleChanges={handleOrigineStepChanges} data={offre.origine} />
					case 3:
						return <Durabilite data={offre.durabilite} />
					case 4:
						return <Details data={offre.details} />
					case 5:
						return <Localisations data={offre.localisations} />
					case 6:
						return <></>
					case 7:
						return <></>
				}
			})()}
			<div className='buttons'>
				{currentStep > 0 ? <label className='buttons__previous' onClick={() => setCurrentStep(currentStep - 1)}>RETOUR</label> : ""}
				<input type="button" className="button button--green buttons__next" value={currentStep === steps.length - 1 ? "PUBLIER" : "POURSUIVRE"} onClick={() => nextStep()}></input>
			</div>

		</div>
	</>

};





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
			<SelectLieu data={data.lieux_de_production.select} handleCitiesChecks={data.lieux_de_production.select.handleChanges} title="Lieux de production" />
		</div>
		<div class="lieux-list-container">
			{
				data.lieux_de_production.lieux.map(lieu => {
					return <LieuCreation data={lieu} />
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
