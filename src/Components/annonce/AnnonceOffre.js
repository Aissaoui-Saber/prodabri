import './Annonce.css';
import creatorImage from '../../Assets/images/profile.png';

import favoriteUnchecked from '../../Assets/images/icons/annonce/favorite-unchecked.png';
import favoriteChecked from '../../Assets/images/icons/annonce/favorite-checked.png';

import starChecked from '../../Assets/images/icons/annonce/star.png';
import starUnChecked from '../../Assets/images/icons/annonce/favorite.png';
import comments from '../../Assets/images/icons/annonce/comment.png';
import arrow from '../../Assets/images/icons/annonce/right-arrow.png';
import secteurs from '../../Utils/Secteurs';

import production from '../../Assets/images/icons/filterBar/production.png';
import consomation from '../../Assets/images/icons/filterBar/consomation.png';
import algerien from '../../Assets/images/icons/filterBar/algerien.png';
import etranger from '../../Assets/images/icons/filterBar/etranger.png';
import durable from '../../Assets/images/icons/filterBar/durable.png';
import nonDurable from '../../Assets/images/icons/filterBar/non-durable.png';




import productImage from '../../Assets/images/icons/annonce/product.jpg';
import Lieux from './Lieux';


function AnnonceOffre({ data }) {
	return <div className='annonce-container'>
		<div className='top'>
			<div className='creation-container'>
				<img src={creatorImage} alt="profile du créateur"></img>
				<label className='creator-username'>{data.creation.creator_name}</label>
				<label className='creation-date'>{data.creation.creation_date}</label>
			</div>
			<img src={data.favorite ? favoriteChecked : favoriteUnchecked} alt='favorite' className='favorite-button'></img>
		</div>
		<div className='middle offre-middle-template'>
			<img className="annonce-image" src={productImage} alt='product'></img>
			<div className='top-info-container'>
				<label className='brand-name'>{data.brand_name}</label>
				<label className='offre-name'>{data.title}</label>
				<p className='description-with-image'>{data.description}</p>
			</div>
			<div className='bottom-info-container'>
				<div className="annonce-lieux-container">
					<Lieux title="Lieux de productions" totalCities={47} data={data.lieux_de_production}></Lieux>
					<Lieux title="Lieux de vente" totalCities={565} data={data.lieux_de_production}></Lieux>
					<Lieux title="Lieux de livraison" totalCities={1541} data={data.lieux_de_production}></Lieux>
				</div>
				<div className="annonce-other-info-container">
					<div className="info">
						<img src={data.origin === "DZ" ? algerien : etranger} alt="origine de produit"></img>
						<label className="info-data">{data.origin === "DZ" ? "Produit Algérien" : "Produit étranger"}</label>
					</div>
					<div className='info'>
						<img src={secteurs.getSecteur(data.secteur).fr.icon} alt="secteur d'activité"></img>
						<label className="info-data">{secteurs.getSecteur(data.secteur).fr.text}</label>
					</div>
					<div className='info'>
						<img src={data.type === "C" ? consomation : production} alt="type de produit"></img>
						<label className="info-data">{data.type === "C" ? "Bien de consomation" : "Bien de production"}</label>
					</div>
					<div className='info'>
						<img src={data.type === "C" ? consomation : production} alt="type de produit"></img>
						<label className="info-data">{data.type === "C" ? "Bien de consomation" : "Bien de production"}</label>
					</div>
					<div className='info'>
						<img src={data.durabilite === "D" ? durable : nonDurable} alt="durabilité de produit"></img>
						<label className="info-data">{data.durabilite === "D" ? "Durable" : "Non durable"}</label>
					</div>
				</div>
			</div>
		</div>
		<div className='bottom'>
			<div className='stat-container'>
				<div className='note-container'>
					<img src={starChecked} alt='checked'></img>
					<img src={starChecked} alt='checked'></img>
					<img src={starChecked} alt='checked'></img>
					<img src={starUnChecked} alt='unChecked'></img>
					<img src={starUnChecked} alt='unChecked'></img>
					<label>33</label>
				</div>
				<div className='comments-container'>
					<img src={comments} alt='comments'></img>
					<label>12</label>
				</div>
			</div>
			<img src={arrow} alt='arrow' className='details-arrow'></img>
		</div>
	</div>
}
export default AnnonceOffre;