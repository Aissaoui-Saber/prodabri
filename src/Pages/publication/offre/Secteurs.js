import { useState } from 'react';
import secteurs from '../../../Utils/Secteurs';
import '../Publication.css';
import './Secteurs.css';
import '../../../Assets/Styles/global_Style.css';
import functions from '../../../Utils/Functions';

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
	return <div className="step">
		<h1 className='step__title'>Sélectionner le secteur dont votre produit appartient</h1>
		<h2 className='step__subTitle'>Sécteur primaire</h2>
		<p className='step__paragraph'>Exploitation et extraction de ressources naturelles</p>
		<div className="step__secteurs">
			{
				secteurs.secteurs_FR[0].branches.map(branche => {
					return <div className={branche.id === selectedBranche ? "step__secteurs__branche step__secteurs__branche--selected" : "step__secteurs__branche"} onClick={() => selectBranche(branche.id)}>
						<img className='step__secteurs__branche__icon' src={branche.icon} alt="secteur"/>
						<label className='step__secteurs__branche__name'>{branche.text}</label>
					</div>
				})
			}
		</div>
		<h2 className='step__subTitle'>Sécteur secondaire</h2>
		<p className='step__paragraph'>Transformation des matières premières issues du secteur primaire</p>
		<div className="step__secteurs">
			{
				secteurs.secteurs_FR[1].branches.map(branche => {
					return <div className={branche.id === selectedBranche ? "step__secteurs__branche step__secteurs__branche--selected" : "step__secteurs__branche"} onClick={() => selectBranche(branche.id)}>
						<img className='step__secteurs__branche__icon' src={branche.icon} alt="secteur"/>
						<label className='step__secteurs__branche__name'>{branche.text}</label>
					</div>
				})
			}
		</div>
		<h2 className='step__subTitle'>Sécteur tertiaire</h2>
		<p className='step__paragraph'>Produire des services</p>
		<div className="step__secteurs">
			{
				secteurs.secteurs_FR[2].branches.map(branche => {
					return <div className={branche.id === selectedBranche ? "step__secteurs__branche step__secteurs__branche--selected" : "step__secteurs__branche"} onClick={() => selectBranche(branche.id)}>
						<img className='step__secteurs__branche__icon' src={branche.icon} alt="secteur"/>
						<label className='step__secteurs__branche__name'>{branche.text}</label>
					</div>
				})
			}
		</div>
		<hr className='step__line'/>
		<h1 className='step__title'>Vous avez pas trouvé le bon secteur ?</h1>
		<p className='step__paragraph'>Précisez le nom du secteur souhaité</p>
		<input className="input__text step__input__text step__secteurs__new" type="text" placeholder="Nom du secteur" onChange={handleInputTextChange} value={newTypedBranche} onBlur={handleInputBlur} />
	</div>
}

export default Secteurs;