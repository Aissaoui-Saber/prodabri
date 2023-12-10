import './Annonce.css';
import SelectCities from '../filterBar/SelectCities/SelectCities';

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


function AnnonceOffre({ data }) {
	return <div className='annonce'>
		<div className='annonce__header'>
			<div className='annonce__header__creator'>
				<img className='annonce__header__creator__image' src={creatorImage} alt="profile du créateur"></img>
				<label className='annonce__header__creator__username'>{data.creation.creator_name}</label>
				<label className='annonce__header__creator__date'>{data.creation.creation_date}</label>
			</div>
			<img className='annonce__header__favorite' src={data.favorite ? favoriteChecked : favoriteUnchecked} alt='favorite'></img>
		</div>
		<div className='annonce__body'>
			<img className="annonce__image" src={productImage} alt='product'></img>
			<div className='annonce__info'>
				<label className='annonce__info__brand'>{data.brand_name}</label>
				<label className='annonce__info__title'>{data.title}</label>
				<p className='annonce__info__description--image'>{data.description}</p>
				<div className="annonce__info__lieux">
					<SelectCities title="Lieux de productions" value={47} data={data.lieux_de_production} readOnly={true}></SelectCities>
					<SelectCities title="Lieux de vente" value={565} data={data.lieux_de_production} readOnly={true}></SelectCities>
					<SelectCities title="Lieux de livraison" value={1541} data={data.lieux_de_production} readOnly={true}></SelectCities>
				</div>
				<div className="annonce__info__tiles">
					<div className="annonce__info__tiles__tile">
						<img className="annonce__info__tiles__tile__icon" src={data.origin === "DZ" ? algerien : etranger} alt="origine de produit"></img>
						<label className="annonce__info__tiles__tile__text">{data.origin === "DZ" ? "Produit Algérien" : "Produit étranger"}</label>
					</div>
					<div className='annonce__info__tiles__tile'>
						<img className="annonce__info__tiles__tile__icon" src={secteurs.getSecteur(data.secteur).fr.icon} alt="secteur d'activité"></img>
						<label className="annonce__info__tiles__tile__text">{secteurs.getSecteur(data.secteur).fr.text}</label>
					</div>
					{(() => {
						let m = [];
						if (data.type === "CP") {
							m.push(<div className='annonce__info__tiles__tile'>
								<img className="annonce__info__tiles__tile__icon" src={consomation} alt="type de produit"></img>
								<label className="annonce__info__tiles__tile__text">Bien de consomation</label>
							</div>);
							m.push(<div className='annonce__info__tiles__tile'>
							<img className="annonce__info__tiles__tile__icon" src={production} alt="type de produit"></img>
							<label className="annonce__info__tiles__tile__text">Bien de production</label>
						</div>);
						} else {
							if (data.type === 'C'){
								m.push(<div className='annonce__info__tiles__tile'>
								<img className="annonce__info__tiles__tile__icon" src={consomation} alt="type de produit"></img>
								<label className="annonce__info__tiles__tile__text">Bien de consomation</label>
							</div>);
							}else{
								m.push(<div className='annonce__info__tiles__tile'>
								<img className="annonce__info__tiles__tile__icon" src={production} alt="type de produit"></img>
								<label className="annonce__info__tiles__tile__text">Bien de production</label>
							</div>);
							}
						}
						return (m.map(element => {
							return element;
						}));
					})()}

					<div className='annonce__info__tiles__tile'>
						<img className="annonce__info__tiles__tile__icon" src={data.durabilite === "D" ? durable : nonDurable} alt="durabilité de produit"></img>
						<label className="annonce__info__tiles__tile__text">{data.durabilite === "D" ? "Durable" : "Non durable"}</label>
					</div>
				</div>
			</div>
		</div>
		<div className='annonce__footer'>
			<div className='annonce__footer__stats'>
				<div className='annonce__footer__stats__note'>
					<img className='annonce__footer__stats__note__star' src={starChecked} alt='checked'></img>
					<img className='annonce__footer__stats__note__star' src={starChecked} alt='checked'></img>
					<img className='annonce__footer__stats__note__star' src={starChecked} alt='checked'></img>
					<img className='annonce__footer__stats__note__star' src={starUnChecked} alt='unChecked'></img>
					<img className='annonce__footer__stats__note__star' src={starUnChecked} alt='unChecked'></img>
					<label className='annonce__footer__stats__note__total'>33</label>
				</div>
				<div className='annonce__footer__stats__comments'>
					<img className='annonce__footer__stats__comments__icon' src={comments} alt='comments'></img>
					<label className='annonce__footer__stats__comments__total'>12</label>
				</div>
			</div>
			<img src={arrow} alt='arrow' className='annonce__footer__arrow'></img>
		</div>
	</div>
}
export default AnnonceOffre;