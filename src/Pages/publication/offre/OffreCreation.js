import NavBar from '../../../Components/NavBar';
import '../../../Assets/Styles/global_Style.css';
import '../Publication.css';
import StepBar from '../../../Components/StepBar';
import './Localisations.css';

import Secteurs from './Secteurs';
import Type from './Type';
import Origine from './Origine';
import Durabilite from './Durabilite';
import Details from './Details';
import Localisations from './Localisations';
import Services from './services/Services';

import { useState, useRef, useEffect } from 'react';

import Media from './media.js';
import Recapitulatif from './Recap';
import { compile } from 'sass';

import villes from '../../../Utils/Villes';

let offre = {
	secteur: {
		id: undefined,
		new: undefined
	},
	type: undefined,//C,P
	origine: {
		origine: undefined,//DZ, ETR
		pays: undefined
	},
	durabilite: undefined,//D, N
	details: {
		title: undefined,
		brand: undefined,
		description: undefined,
		links: undefined,
		email: undefined,
		phone: undefined
	},
	localisations: {
		lieuxVente: {
			lieux: undefined,
			storeLink: undefined
		},
		lieuxProduction: undefined
	},
	services: {
		commande: {
			retrait: false,
			livraison: false,
			tarifs: [],
			conditions: []
		},
		rdv: [],
		livraison: null
	},
	media: {
		images: [],
		videos: []
	}
};

function OffreCreation() {
	const [currentStep, setCurrentStep] = useState(5);
	useEffect(e => {
		window.scrollTo(0, 0);
	}, [currentStep]);
	document.title = "Publication d'offre";
	const [secteur, setSecteur] = useState({ ...offre.secteur });
	const [type, setType] = useState(offre.type);
	const [origine, setOrigine] = useState({ ...offre.origine });
	const [durabilite, setDurabilite] = useState(offre.durabilite);
	const [details, setDetails] = useState(offre.details);
	const [localisations, setLocalisations] = useState(offre.localisations);
	const [services, setServices] = useState(offre.services);
	const [media, setMedia] = useState(offre.media);

	let steps = [
		"Secteur",
		"Type",
		"Origine",
		"Durabilité",
		"Détaills",
		"Emplacements",
		"Services",
		"Média",
		"Récapitulatif"
	];



	function nextStep() {
		switch (currentStep) {
			case 0:
				if (secteur.new != undefined) {
					if (secteur.new !== "") {
						setCurrentStep(1);
					}
				} else {
					if (secteur.id != undefined) {
						setCurrentStep(1);
					}
				}
				break;
			case 1:
				if (type !== undefined) {
					setCurrentStep(2);
				}
				break;
			case 2:
				if (origine.origine !== undefined) {
					if (origine.origine === 'DZ') {
						setCurrentStep(3);
					} else {
						if (origine.pays !== undefined) {
							setCurrentStep(3);
						}
					}
				}
				break;
			case 3:
				if (durabilite !== undefined) {
					setCurrentStep(4);
				}
				break;
			case 4:
				if (details.title !== undefined && details.description !== undefined) {
					setCurrentStep(5);
				} else {
					alert("Vous devez au moins saisir le titre et la description");
				}
				break;
			case 5:
				setCurrentStep(6);
				break;
			case 6:
				let CommandeValid = undefined;
				let rdvValid = undefined;
				let livraisonValid = undefined;
				if (services.selectedServices[0]) {
					let reception = !(!services.commande.livraison && !services.commande.retrait);
					let tarifs = !(services.commande.tarifs.length === 0);
					CommandeValid = reception && tarifs;
				}
				if (services.selectedServices[1]) {
					rdvValid = !(services.rdv.length === 0);
				}
				if (services.selectedServices[2]) {
					if (services.livraison === undefined) {
						livraisonValid = false;
					} else {
						livraisonValid = !(villes.getTotalSelectedCities(services.livraison) === 0);
					}
				}
				let alertMessage = `Vous avez choisi le service de (${services.selectedServices[0] ? "Commande" : ""}${services.selectedServices[1] ? ", Rendez vous" : ""}${services.selectedServices[2] ? ", Livraison" : ""}), vous devrez:\n${!CommandeValid && CommandeValid !== undefined ? "- Selectionner la méthode de réception des commandes par vos clients et définir les tarifs de votre produit ou service." : ""}${!rdvValid && rdvValid !== undefined ? "\n- Définir vos points de rendez vous." : ""}${!livraisonValid && livraisonValid !== undefined ? "\n- Sélectionner les villes de livraison." : ""}`;
				if (
					(CommandeValid !== undefined && !CommandeValid)
					|| (rdvValid !== undefined && !rdvValid)
					|| (livraisonValid !== undefined && !livraisonValid)
				) {
					alert(alertMessage);
				} else {
					setCurrentStep(7);
				}
				break;
			case 7:
				setCurrentStep(8);
				break;
		}
	}
	function handleStepChanges(data) {
		switch (currentStep) {
			case 0:
				setSecteur({ ...data });
				break;
			case 1:
				setType(data);
				break;
			case 2:
				setOrigine({ ...data });
				break;
			case 3:
				setDurabilite(data);
				break;
			case 4:
				setDetails({
					title: data?.title ? data.title.length == 0 ? undefined : data.title : undefined,
					brand: data?.brand,
					description: data?.description ? data.description.length == 0 ? undefined : data.description : undefined,
					links: data?.links ? [...data.links] : undefined,
					email: data?.email,
					phone: data?.phone
				});
				break;
			case 5:
				setLocalisations(data);
				break;
			case 6:
				setServices({ commande: { ...data.commande }, rdv: [...data.rdv], livraison: data.livraison !== undefined ? [...data.livraison] : undefined, selectedServices: [...data.selectedServices] });
				break;
			case 7:
				setMedia(data);
				break;
			case 8:
				setCurrentStep(data);
		}
	}

	return <>
		<NavBar></NavBar>
		<div className="creation-body-container">
			<StepBar data={steps} currStep={currentStep} />
			{(() => {
				switch (currentStep) {
					case 0:
						return <Secteurs handleChanges={handleStepChanges} data={secteur} />
					case 1:
						return <Type handleChanges={handleStepChanges} data={type} />
					case 2:
						return <Origine handleChanges={handleStepChanges} data={origine} />
					case 3:
						return <Durabilite handleChanges={handleStepChanges} data={durabilite} />
					case 4:
						return <Details handleChanges={handleStepChanges} data={details} />
					case 5:
						return <Localisations handleChanges={handleStepChanges} data={localisations} />
					case 6:
						return <Services handleChanges={handleStepChanges} data={{ ...services, rdvPoints: localisations }}></Services>
					case 7:
						return <Media handleChanges={handleStepChanges} data={media}></Media>
					case 8:
						return <Recapitulatif data={{
							secteur: secteur,
							type: type,
							origine: origine,
							durabilite: durabilite,
							details: details,
							localisations: localisations,
							services: services,
							media: media
						}} handleChanges={handleStepChanges}></Recapitulatif>
				}
			})()}
			<div className='buttons'>
				{currentStep > 0 ? <label className='buttons__previous' onClick={function () { setCurrentStep(currentStep - 1); }}>RETOUR</label> : ""}
				<input type="button" className="button button--green buttons__next" value={currentStep === steps.length - 1 ? "PUBLIER" : "POURSUIVRE"} onClick={() => nextStep()}></input>
			</div>

		</div>
	</>

};
export default OffreCreation;

/*[
	{
		"id": 120,
		"name": "Commune 1",
		"wilaya": "Adrar",
		"wilayaNumber": 1,
		"points": []
	},
	{
		"id": 220,
		"name": "Commune 2",
		"wilaya": "Adrar",
		"wilayaNumber": 1,
		"points": [
			{
				"id": 1,
				"lat": 36.15838983302817,
				"lng": 4.792098999023438
			},
			{
				"id": 2,
				"lat": 36.14743986519926,
				"lng": 4.790725708007813
			},
			{
				"id": 3,
				"lat": 36.14439023489638,
				"lng": 4.778022766113281
			},
			{
				"id": 4,
				"lat": 36.14439023489638,
				"lng": 4.795360565185547
			},
			{
				"id": 5,
				"lat": 36.138567884179444,
				"lng": 4.791927337646485
			},
			{
				"id": 6,
				"lat": 36.15367737606265,
				"lng": 4.783859252929688
			},
			{
				"id": 7,
				"lat": 36.152429913577315,
				"lng": 4.808063507080079
			}
		]
	},
	{
		"id": 320,
		"name": "Commune 3",
		"wilaya": "Adrar",
		"wilayaNumber": 1,
		"points": []
	}
]*/