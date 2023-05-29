import durable from '../../../Assets/images/icons/filterBar/durable.png';
import nonDurable from '../../../Assets/images/icons/filterBar/non-durable.png';
import {useState} from 'react';

function Durabilite({ data, handleChanges }) {
	const [selectedDurabilite, setSelectedDurabilite] = useState(data);

	function selectDurabilite(durabilite) {
		setSelectedDurabilite(durabilite);
		handleChanges(durabilite);
	}

	return <div className="step step__durabilite">
		<h1 className='step__title'>Quel est la duré d'utilisation de votre produit ou service</h1>
		<div className={selectedDurabilite === 'D' ? "step__option step__option--selected" : "step__option"} onClick={() => selectDurabilite('D')}>
			<img className='step__option__icon' src={durable} alt="consomation" />
			<div className='step__option__data'>
				<h2 className='step__option__info__title'>Bien durable</h2>
				<p className='step__option__info__description'>Le bien peut être utilisé de nombreuses fois</p>
			</div>
		</div>
		<br />
		<div className={selectedDurabilite === 'ND' ? "step__option step__option--selected" : "step__option"} onClick={() => selectDurabilite('ND')}>
			<img className='step__option__icon' src={nonDurable} alt="production" />
			<div className='step__option__data'>
				<h2 className='step__option__info__title'>Bien non durable</h2>
				<p className='step__option__info__description'>Le bien est détruit par le premier usage.</p>
			</div>
		</div>
	</div>
}

export default Durabilite;