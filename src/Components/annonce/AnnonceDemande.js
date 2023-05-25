import './Annonce.css';
import creatorImage from '../../Assets/images/profile.png';

import favoriteUnchecked from '../../Assets/images/icons/annonce/favorite-unchecked.png';
import favoriteChecked from '../../Assets/images/icons/annonce/favorite-checked.png';

import comments from '../../Assets/images/icons/annonce/comment.png';
import arrow from '../../Assets/images/icons/annonce/right-arrow.png';

import algerien from '../../Assets/images/icons/filterBar/algerien.png';
import etranger from '../../Assets/images/icons/filterBar/etranger.png';


import domaines from '../../Utils/Domaines';
import Demande from '../../Utils/DemandeTypes';


import SelectLieu from '../filterBar/SelectLieu/SelectLieu';


function AnnonceDemande({ data }) {
	return <div className='annonce'>
		<div className='annonce__header'>
			<div className='annonce__header__creator'>
				<img className='annonce__header__creator__image' src={creatorImage} alt="profile du créateur"></img>
				<label className='annonce__header__creator__username'>{data.creation.creator_name}</label>
				<label className='annonce__header__creator__date'>{data.creation.creation_date}</label>
			</div>
			<img src={data.favorite ? favoriteChecked : favoriteUnchecked} alt='favorite' className='annonce__header__favorite'></img>
		</div>
		<div className='annonce__body'>
			{data?.image ? <img className="annonce__image" src={data.image} alt='product'></img> : <p className='annonce__info__description'>{data.description}</p>}
			<div className='annonce__info'>
				{!data?.image ? "" : <p className='annonce__info__description--image'>{data.description}</p>}
				<div className='annonce__info__tiles'>
					<div className="annonce__info__tiles__tile">
						<img className='annonce__info__tiles__tile__icon' src={Demande.getType(data.type).icon} alt="origine de produit"></img>
						<div className='annonce__info__tiles__tile__data'>
							<label className="annonce__info__tiles__tile__data__title">Type de demande</label><br />
							<label className="annonce__info__tiles__tile__data__value">{Demande.getType(data.type).text}</label>
						</div>
					</div>
					<div className='annonce__info__tiles__tile'>
						<img className='annonce__info__tiles__tile__icon' src={comments} alt="secteur d'activité"></img>
						<div>
							<label className="annonce__info__tiles__tile__data__title">Commentaires</label><br />
							<label className="annonce__info__tiles__tile__data__value">{data.comments}</label>
						</div>
					</div>
					<SelectLieu title="Lieux de la demande" totalCities={1} data={data.lieux_de_demande} readOnly={true}></SelectLieu>
				</div>
				<label className="annonce__info__tiles__tile__data__title">Domaine d'expertise</label><br />
				<div className="annonce__info__dommaines">
					{
						data.domaines.map(element => {
							return <label className="annonce__info__dommaines__domaine">{domaines.getDomaine(element).name}</label>})
					}
				</div>
			</div>
		</div>

		<div className='annonce__footer'>
			<div className='annonce__footer__stats'>
			</div>
			<img src={arrow} alt='arrow' className='annonce__footer__arrow'></img>
		</div>
	</div>
}
export default AnnonceDemande;