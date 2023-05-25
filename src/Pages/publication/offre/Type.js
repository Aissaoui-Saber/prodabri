import {useState} from 'react';
import production from '../../../Assets/images/icons/filterBar/production.png';
import consomation from '../../../Assets/images/icons/filterBar/consomation.png';


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

	return <div className="step step__type">
		<h1 className='step__title'>Sélectionner le type de votre produit ou service</h1>
		<div className={selectedType === 'C' || selectedType === 'CP' ? "step__option step__option--selected" : "step__option"} onClick={() => selectType('C')}>
			<img className='step__option__icon' src={consomation} alt="consomation" />
			<div className='step__option__info'>
				<h2 className='step__option__info__title'>Bien de consomation</h2>
				<p className='step__option__info__description'>Le bien de consommation est celui qui peut être utilisé et connsomé tel quel.</p>
			</div>
		</div>
		<br />
		<div className={selectedType === 'P' || selectedType === 'CP' ? "step__option step__option--selected" : "step__option"} onClick={() => selectType('P')}>
			<img className='step__option__icon' src={production} alt="production" />
			<div className='step__option__info'>
				<h2 className='step__option__info__title'>Bien de production</h2>
				<p className='step__option__info__description'>Le bien de production est celui qui permet d'obtenir un autre bien et qui rentre dans la production d'autre biens.</p>
			</div>
		</div>
	</div>
}

export default Type;