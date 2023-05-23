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


import Lieux from './Lieux';


function AnnonceDemande({ data }) {
	return <div className='annonce-container'>
		<div className='top'>
			<div className='creation-container'>
				<img src={creatorImage} alt="profile du créateur"></img>
				<label className='creator-username'>{data.creation.creator_name}</label>
				<label className='creation-date'>{data.creation.creation_date}</label>
			</div>
			<img src={data.favorite ? favoriteChecked : favoriteUnchecked} alt='favorite' className='favorite-button'></img>
		</div>
		{data.image !== null ?
			<div className='middle demmande-middle-template'>
				<img className="annonce-image" src={data.image} alt='product'></img>
				<div className='top-info-container'>
					<p className='description-with-image'>{data.description}</p>
				</div>
				<div className='bottom-info-container'>
					<div className='annonce-other-info-container'>
						<div className="info">
							<img src={Demande.getType(data.type).icon} alt="origine de produit"></img>
							<div>
								<label className="info-title">Type de demande</label><br />
								<label className="info-data">{Demande.getType(data.type).text}</label>
							</div>
						</div>
						<div className='info'>
							<img src={comments} alt="secteur d'activité"></img>
							<div>
								<label className="info-title">Commentaires</label><br />
								<label className="info-data">{data.comments}</label>
							</div>
						</div>
						<Lieux title="Lieux de la demande" totalCities={1} data={data.lieux_de_demande}></Lieux>
					</div>
					<label className="info-title">Domaine d'expertise</label><br />
					<div className="dommaines-container">
						{
							data.domaines.map(element => {
								return <label>{domaines.getDomaine(element).name}</label>
							})
						}
					</div>
				</div>
			</div> ://without image
			<div className='middle demmande-middle-template'>
				<p className='description-without-image'>{data.description}</p>
				<div className='top-info-container'>
					<div className='annonce-other-info-container'>
						<div className="info">
							<img src={Demande.getType(data.type).icon} alt="origine de produit"></img>
							<div>
								<label className="info-title">Type de demande</label><br />
								<label className="info-data">{Demande.getType(data.type).text}</label>
							</div>
						</div>
						<div className='info'>
							<img src={comments} alt="secteur d'activité"></img>
							<div>
								<label className="info-title">Commentaires</label><br />
								<label className="info-data">{data.comments}</label>
							</div>
						</div>
						<Lieux title="Lieux de la demande" totalCities={1} data={data.lieux_de_demande}></Lieux>
					</div>
				</div>
				<div className='bottom-info-container'>
					<label className="info-title">Domaine d'expertise</label><br />
					<div className="dommaines-container">
						{
							data.domaines.map(element => {
								return <label>{domaines.getDomaine(element).name}</label>
							})
						}
					</div>
				</div>
			</div>}
		<hr />

		<div className='bottom'>
			<div className='stat-container'>
			</div>
			<img src={arrow} alt='arrow' className='details-arrow'></img>
		</div>
	</div>
}
export default AnnonceDemande;