import { useState, useRef, useEffect } from 'react';
import remove from '../../../Assets/images/delete.png';
import SelectLieu from '../../../Components/filterBar/SelectLieu/SelectLieu';
import pin from '../../../Assets/images/icons/filterBar/placeholder.png';
import store from '../../../Assets/images/store.png';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import functions from '../../../Utils/Functions';
import './Localisations.css';


function LieuCreation({ data }) {
	const mapRef = useRef();
	const [lieuItemOpen, setLieuItemOpen] = useState(false);
	useEffect(() => {
		const L = require("leaflet");

		delete L.Icon.Default.prototype._getIconUrl;

		L.Icon.Default.mergeOptions({
			iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
			iconUrl: require("leaflet/dist/images/marker-icon.png"),
			shadowUrl: require("leaflet/dist/images/marker-shadow.png")
		});
	}, []);

	function openCloseLieuItem() {
		if (lieuItemOpen) {
			setLieuItemOpen(false);
			//mapRef.current._container.style.height = '0px';
		} else {
			setLieuItemOpen(true);
			//mapRef.current._container.style.height = '500px';
			//mapRef.current._container.style.width = '80%';
		}
	}
	return <div className="lieu-creation">
		<div className={lieuItemOpen ? "lieu-creation__triangle lieu-creation__triangle--open" : "lieu-creation__triangle"} onClick={openCloseLieuItem}></div>
		<img className='lieu-creation__icon' src={pin} alt="lieu" />
		<div className='lieu-creation__data'>
			<label className="lieu-creation__data__commune">{data.commune.name + " (" + data.points.length + " Lieux)"}</label>
			<label className="lieu-creation__data__wilaya">{data.commune.wilaya}</label>
		</div>
		<img className={lieuItemOpen ? "lieu-creation__delete" : "lieu-creation__delete hidden"} src={remove}></img>

		{
			lieuItemOpen ? <div className='lieu-creation__map'><p className={lieuItemOpen ? "step__paragraph" : "step__paragraph hidden"}>Préciser la position exacte sur la carte des lieux de production dans cette ville</p>
				<MapContainer center={data.points[0]} zoom={13} scrollWheelZoom={true}>
					<TileLayer
						attribution='&copy; <a href="https://www.google.com/intl/en-GB_ALL/permissions/geoguidelines/">Google Maps</a>'
						url="https://mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
					//url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					{
						data.points.map(point => {
							return <Marker position={point}></Marker>
						})
					}
				</MapContainer></div> : ""
		}

	</div>
}

function Localisations({ data }) {
	const [storeSelected, setStoreSelected] = useState(false);
	const [storeLink, setStoreLink] = useState("");
	const storeLinkRef = useRef();
	function selectStore(e) {
		if (storeLinkRef.current !== e.target) {
			if (storeSelected) {
				setStoreSelected(false);
				setStoreLink("");
			} else {
				setStoreSelected(true);
			}
		}

	}
	useEffect(()=>{
		if (storeSelected){
			storeLinkRef.current.focus();
		}
	},[storeSelected]);
	function handleInputTextChange(e) {
		setStoreLink(functions.stringRemoveAllSpaces(e.target.value));
	}
	return <div className="step step__localisations">
		<div class="step__localisation__header">
			<div><h1 className='step__title'>Lieux de production (0 ville)</h1></div>
			<SelectLieu data={data.lieux_de_production.select} handleCitiesChecks={data.lieux_de_production.select.handleChanges} title="Lieux de production" />
		</div>
		{
			data.lieux_de_production.lieux.map(lieu => {
				return <LieuCreation data={lieu} />
			})
		}
		<hr className='step__line' />
		<div class="step__localisation__header">
			<div><h1 className='step__title'>Lieux de vente (0 ville)</h1></div>
			<SelectLieu data={data.lieux_de_vente.select} handleCitiesChecks={data.lieux_de_vente.select.handleChanges} title="Lieux de vente" />
		</div>
		{
			data.lieux_de_vente.lieux.map(lieu => {
				return <LieuCreation data={lieu} />
			})
		}
		<div className={storeSelected ? "step__option step__option--selected" : "step__option"} onClick={selectStore}>
			<img className='step__option__icon' src={store} alt="market" />
			<div className='step__option__data'>
				<h2 className='step__option__info__title'>Boutique en ligne</h2>
				<p className='step__option__info__description'>Vous avez une boutique sur internet ?</p>
			</div>
			<input autofocus ref={storeLinkRef} className={storeSelected ? "input__text step__input__text step__localisation__store__link" : "invisible"} type="text" placeholder="https://www.nom-de-boutique.com" onBlur={()=>storeLinkRef.current.value.length == 0 ? setStoreSelected(false) : setStoreSelected(true)} onPaste={handleInputTextChange} onChange={handleInputTextChange} value={storeLink} />
		</div>
		<hr className='step__line'/>
		<div class="step__localisation__header">
			<div><h1 className='step__title'>Lieux de Livraison (0 ville)</h1></div>
			<SelectLieu data={data.lieux_de_livraison.select} handleCitiesChecks={data.lieux_de_livraison.select.handleChanges} title="Lieux de livraison" />
		</div>
	</div>
}

export default Localisations;