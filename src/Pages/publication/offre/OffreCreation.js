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
import Services from './Services';

import { useState, useRef, useEffect } from 'react';

import Media from './media.js';
import Recapitulatif from './Recap';


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
		lieux_de_production: [
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
			}
		],
		lieux_de_vente: {
			lieux: [],
			onlineStore: undefined,
		},
	},
	services: {
		commande:{},
		rdv:{},
	},
	media: {
		images: [],
		mainImage: undefined,
		video: undefined
	}
};

function OffreCreation() {
	const [currentStep, setCurrentStep] = useState(6);
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
				break;
			case 7:
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
				console.log(data);
				setLocalisations(data);
				break;
			case 6:
				break;
			case 7:
				break;
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
						return <Services handleChanges={handleStepChanges} data={services}></Services>
					case 7:
						return <Media data={offre.media}></Media>
					case 8:
						return <Recapitulatif data={offre}></Recapitulatif>
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