import { useState, useRef, useEffect } from 'react';
import remove from '../../../Assets/images/delete.png';
import SelectLieu from '../../../Components/filterBar/SelectLieu/SelectLieu';
import pin from '../../../Assets/images/icons/filterBar/placeholder.png';
import store from '../../../Assets/images/store.png';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import functions from '../../../Utils/Functions';
import './Localisations.css';

function LocationMarker({ data, handleChanges }) {
	//console.log(data);
	const [positions, setPositions] = useState(data);
	const map = useMapEvents({
		click(e) {
			//console.log(e.target);
			setPositions([...positions, e.latlng]);
			handleChanges([...positions, e.latlng]);
			//map.locate()
		},
		/*locationfound(e) {
			setPosition(e.latlng)
			map.flyTo(e.latlng, map.getZoom())
		},*/

	})
	return positions.length == 0 ? null : (
		positions.map(pos => {
			return <Marker key={pos.lng + "" + pos.lat} position={[pos.lat, pos.lng]} eventHandlers={{
				mouseover: (e) => {
					//alert('marker clicked');
				},
				click: (e) => {
					//console.log(e.target);
					//map.removeLayer(e.target);
					let f = positions.filter(p => (p.lat !== pos.lat && p.lng !== pos.lng));
					setPositions(f);
					handleChanges(f);
				}
			}} >
			</Marker>
		})
	)
}


function LieuCreation({ data, handleChanges }) {
	const mapRef = useRef();
	const [lieuItemOpen, setLieuItemOpen] = useState(false);
	const [totalLieux, setTotalLieux] = useState(data.points.length);
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
		} else {
			setLieuItemOpen(true);
		}
	}

	function handlePositionsChanges(positions) {
		setTotalLieux(positions.length);
		handleChanges({ commune: data.id, points: positions });
	}

	return <div className="lieu-creation">
		<div className={lieuItemOpen ? "lieu-creation__triangle lieu-creation__triangle--open" : "lieu-creation__triangle"} onClick={openCloseLieuItem}></div>
		<img className='lieu-creation__icon' src={pin} alt="lieu" />
		<div className='lieu-creation__data'>
			<label className="lieu-creation__data__commune">{data.name + " (" + totalLieux + " Lieux)"}</label>
			<label className="lieu-creation__data__wilaya">{data.wilaya}</label>
		</div>

		{
			lieuItemOpen ? <div className='lieu-creation__map'><p className={lieuItemOpen ? "step__paragraph" : "step__paragraph hidden"}>Préciser la position exacte sur la carte des lieux de production dans cette ville</p>
				<MapContainer center={[36.151988, 4.795080]} zoom={13} scrollWheelZoom={true}>
					<TileLayer
						attribution='&copy; <a href="https://www.google.com/intl/en-GB_ALL/permissions/geoguidelines/">Google Maps</a>'
						url="https://mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
					//url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<LocationMarker data={data.points} handleChanges={handlePositionsChanges} ></LocationMarker>
				</MapContainer></div> : ""
		}
	</div>
}

function Localisations({ data, handleChanges }) {
	const [storeSelected, setStoreSelected] = useState(false);
	const [storeLink, setStoreLink] = useState("");
	const [lieuxProduction, setLieuxProduction] = useState([]);
	const [lieuxVente, setLieuxVente] = useState([]);

	const storeLinkRef = useRef();
	let localisations = {
		lieux_de_production: {
			wilayas: [
				{
					wilayaNumber: 1,
					name: "Adrar",
					checked: false,
					communes: [
						{ id: 120, name: "Commune 1", checked: false },
						{ id: 220, name: "Commune 2", checked: false },
						{ id: 320, name: "Commune 3", checked: false },
					]
				},
				{
					wilayaNumber: 2,
					name: "Chlef",
					checked: false,
					communes: [
						{ id: 420, name: "Commune 4", checked: false },
						{ id: 5020, name: "Commune 5", checked: false },
						{ id: 602, name: "Commune 6", checked: false },
						{ id: 1020, name: "Commune 10", checked: false },
						{ id: 11020, name: "Commune 11", checked: false },
						{ id: 1202, name: "Commune 12", checked: false },
					]
				},
				{
					wilayaNumber: 3,
					name: "Laghouat",
					checked: false,
					communes: [
						{ id: 702, name: "Commune 7", checked: false },
						{ id: 820, name: "Commune 8", checked: false },
						{ id: 920, name: "Commune 9", checked: false },
					]
				},
			],
			defaultOption: false,
			handleChanges: function (selectedCities) {
				localisations.lieux_de_production.wilayas = selectedCities;
				let arr = [];
				selectedCities.forEach(wilaya => {
					wilaya.communes.forEach(commune => {
						if (commune.checked) {
							arr.push({ id: commune.id, name: commune.name, wilaya: wilaya.name, wilayaNumber: wilaya.wilayaNumber, points: [] });
						}
					});
				});
				setLieuxProduction([...arr]);
			},
			getOption: function (optionID) {
				let o = [];
				localisations.lieux_de_production.wilayas.forEach(wilaya => {
					wilaya.filter(commune => {
						if (commune.id === optionID) {
							o.push({ ...commune, wilaya: wilaya.name, wilayaNumber: wilaya.wilayaNumber });
						}
					});
				});
				return o.length === 1 ? o[0] : null;
			},
		},
		lieux_de_vente: {
			wilayas: [
				{
					wilayaNumber: 1,
					name: "Adrar",
					checked: false,
					communes: [
						{ id: 120, name: "Commune 1", checked: false },
						{ id: 220, name: "Commune 2", checked: false },
						{ id: 320, name: "Commune 3", checked: false },
					]
				},
				{
					wilayaNumber: 2,
					name: "Chlef",
					checked: false,
					communes: [
						{ id: 420, name: "Commune 4", checked: false },
						{ id: 5020, name: "Commune 5", checked: false },
						{ id: 602, name: "Commune 6", checked: false },
						{ id: 1020, name: "Commune 10", checked: false },
						{ id: 11020, name: "Commune 11", checked: false },
						{ id: 1202, name: "Commune 12", checked: false },
					]
				},
				{
					wilayaNumber: 3,
					name: "Laghouat",
					checked: false,
					communes: [
						{ id: 702, name: "Commune 7", checked: false },
						{ id: 820, name: "Commune 8", checked: false },
						{ id: 920, name: "Commune 9", checked: false },
					]
				},
			],
			defaultOption: false,
			handleChanges: function (selectedCities) {
				localisations.lieux_de_vente.wilayas = selectedCities;
				let arr = [];
				selectedCities.forEach(wilaya => {
					wilaya.communes.forEach(commune => {
						if (commune.checked) {
							arr.push({ id: commune.id, name: commune.name, wilaya: wilaya.name, wilayaNumber: wilaya.wilayaNumber, points: [] });
						}
					});
				});
				setLieuxVente([...arr]);
				//offre.localisations.lieux_de_vente.lieux.push(selectedCities);
			}
		}
	}
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
	function handlePositionsChanges(data) {
		let temp = lieuxProduction.map(function (element) {
			if (element.id == data.commune) {
				element.points = data.points;
			}
			return element;
		});
		setLieuxProduction([...temp]);
	}

	useEffect(() => {
		if (storeSelected) {
			storeLinkRef.current.focus();
		}
	}, [storeSelected]);
	function handleInputTextChange(e) {
		setStoreLink(functions.stringRemoveAllSpaces(e.target.value));
	}
	return <div className="step step__localisations">
		<div class="step__localisation__header">
			<div><h1 className='step__title'>Lieux de production</h1></div>
			<SelectLieu data={localisations.lieux_de_production} handleCitiesChecks={localisations.lieux_de_production.handleChanges} title="Lieux de production" readOnly={false} value={0} />
		</div>
		{
			lieuxProduction.map(lieu => {
				return <LieuCreation data={lieu} handleChanges={handlePositionsChanges} />
			})
		}
		<hr className='step__line' />
		<div class="step__localisation__header">
			<div><h1 className='step__title'>Lieux de vente</h1></div>
			<SelectLieu data={localisations.lieux_de_vente} handleCitiesChecks={localisations.lieux_de_vente.handleChanges} title="Lieux de vente" readOnly={false} value={0} />
		</div>
		{
			lieuxVente.map(lieu => {
				return <LieuCreation data={lieu} />
			})
		}
		<div className={storeSelected ? "step__option step__option--selected" : "step__option"} onClick={selectStore}>
			<img className='step__option__icon' src={store} alt="market" />
			<div className='step__option__data'>
				<h2 className='step__option__info__title'>Boutique en ligne</h2>
				<p className='step__option__info__description'>Vous avez une boutique sur internet ?</p>
			</div>
			<input ref={storeLinkRef} className={storeSelected ? "input__text step__input__text step__localisation__store__link" : "invisible"} type="text" placeholder="https://www.nom-de-boutique.com" onBlur={() => storeLinkRef.current.value.length == 0 ? setStoreSelected(false) : setStoreSelected(true)} onPaste={handleInputTextChange} onChange={handleInputTextChange} value={storeLink} />
		</div>
	</div>
}

export default Localisations;