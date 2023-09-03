import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import remove from '../../../Assets/images/delete.png';
import SelectLieu from '../../../Components/filterBar/SelectLieu/SelectLieu';
import pin from '../../../Assets/images/icons/filterBar/placeholder.png';
import store from '../../../Assets/images/store.png';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import functions from '../../../Utils/Functions';
import './Localisations.css';
import LieuVenteDialog from './LieuVenteDialog';
import villes from "../../../Utils/Villes";

let pointID = 0;
let mmm = [[2,4,6,7,8,9],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

function VenteLocationMarker({ data, handleChanges, handleDelete }) {
	const [positions, setPositions] = useState(data?.points);
	useEffect(() => {
		setPositions(data?.points);
	}, [data]);

	const map = useMapEvents({
		click(e) {
			if (positions !== undefined) {
				pointID++;
				handleChanges({ id: pointID, ...e.latlng });
			}

		},
	})
	function deletePoint(e) {
		handleDelete(parseInt(e.target.attributes["data"].value));
	}

	return positions !== undefined ? positions.map((pos, index) => {
		return <Marker key={index} position={[pos.point.lat, pos.point.lng]}
			eventHandlers={{
				mouseover: (e) => {

				},
				click: (e) => {

				}
			}} >
			<Popup>
				<h1 className='lieuxVente__popUp__info__name'>{positions[index].info.nom}</h1>
				<hr></hr>
				<div className='lieuxVente__popUp__info__times'>
					<label className='lieuxVente__popUp__info__times__dayName'>Samedi</label>
					<div className='lieuxVente__popUp__info__times__periods'>
						{
							positions[index]?.info.horaires[0].length !== 0 ?
								positions[index]?.info.horaires[0].map(period => {
									return <label>{period.start + " - " + period.end}</label>
								}) : <label>Indisponible</label>
						}
					</div>
					<hr className='lieuxVente__popUp__info__times__line'></hr>
					<label className='lieuxVente__popUp__info__times__dayName'>Dimanche</label>
					<div className='lieuxVente__popUp__info__times__periods'>
						{
							positions[index]?.info.horaires[1].length !== 0 ?
								positions[index]?.info.horaires[1].map(period => {
									return <label>{period.start + " - " + period.end}</label>
								}) : <label>Indisponible</label>
						}
					</div>
					<hr className='lieuxVente__popUp__info__times__line'></hr>
					<label className='lieuxVente__popUp__info__times__dayName'>Lundi</label>
					<div className='lieuxVente__popUp__info__times__periods'>
						{
							positions[index]?.info.horaires[2].length !== 0 ?
								positions[index]?.info.horaires[2].map(period => {
									return <label>{period.start + " - " + period.end}</label>
								}) : <label>Indisponible</label>
						}
					</div>
					<hr className='lieuxVente__popUp__info__times__line'></hr>
					<label className='lieuxVente__popUp__info__times__dayName'>Mardi</label>
					<div className='lieuxVente__popUp__info__times__periods'>
						{
							positions[index]?.info.horaires[3].length !== 0 ?
								positions[index]?.info.horaires[3].map(period => {
									return <label>{period.start + " - " + period.end}</label>
								}) : <label>Indisponible</label>
						}
					</div>
					<hr className='lieuxVente__popUp__info__times__line'></hr>
					<label className='lieuxVente__popUp__info__times__dayName'>Mercredi</label>
					<div className='lieuxVente__popUp__info__times__periods'>
						{
							positions[index]?.info.horaires[4].length !== 0 ?
								positions[index]?.info.horaires[4].map(period => {
									return <label>{period.start + " - " + period.end}</label>
								}) : <label>Indisponible</label>
						}
					</div>
					<hr className='lieuxVente__popUp__info__times__line'></hr>
					<label className='lieuxVente__popUp__info__times__dayName'>Jeudi</label>
					<div className='lieuxVente__popUp__info__times__periods'>
						{
							positions[index]?.info.horaires[5].length !== 0 ?
								positions[index]?.info.horaires[5].map(period => {
									return <label>{period.start + " - " + period.end}</label>
								}) : <label>Indisponible</label>
						}
					</div>
					<hr className='lieuxVente__popUp__info__times__line'></hr>
					<label className='lieuxVente__popUp__info__times__dayName'>Vendredi</label>
					<div className='lieuxVente__popUp__info__times__periods'>
						{
							positions[index]?.info.horaires[6].length !== 0 ?
								positions[index]?.info.horaires[6].map(period => {
									return <label>{period.start + " - " + period.end}</label>
								}) : <label>Indisponible</label>
						}
					</div>
					<hr className='lieuxVente__popUp__info__times__line'></hr>
					<label data={positions[index].point.id} className='lieuxVente__popUp__info__delete' onClick={deletePoint}>Supprimer</label>
				</div>

			</Popup>
		</Marker>
	}) : ""

}

function ProdLocationMarker({ data, handleChanges }) {
	const [positions, setPositions] = useState(data === undefined ? [] : data);
	useEffect(() => {
		setPositions(data === undefined ? [] : data);
	}, [data]);

	const map = useMapEvents({
		click(e) {
			if (data !== undefined) {
				pointID++;
				//handleChanges({point: e.latlng});
				setPositions([...positions, { id: pointID, ...e.latlng }]);
				handleChanges([...positions, { id: pointID, ...e.latlng }]);
				//handleChanges([...positions, e.latlng]);
				//map.locate()
			}
		},

	})

	return positions.map((pos, index) => {
		return <Marker key={index} position={[pos.lat, pos.lng]} eventHandlers={{
			mouseover: (e) => {

			},
			click: (e) => {
				let f = positions.filter(p => (p.lat !== pos.lat && p.lng !== pos.lng));
				setPositions(f);
				handleChanges(f);
			}
		}} >
		</Marker>
	})
	//)

}

function LieuVenteCreation({ data, handleChanges }) {

	const mapRef = useRef();
	const [lieuPoints, setLieuPoints] = useState(data);
	const [dialogIsOpen, setDialogIsOpen] = useState(false);
	const [tempPosition, setTempPosition] = useState(null);


	useEffect(() => {
		const L = require("leaflet");

		delete L.Icon.Default.prototype._getIconUrl;

		L.Icon.Default.mergeOptions({
			iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
			iconUrl: require("leaflet/dist/images/marker-icon.png"),
			shadowUrl: require("leaflet/dist/images/marker-shadow.png")
		});
	}, []);

	useEffect(() => {
		if (dialogIsOpen) {
			document.body.style.overflowY = "hidden";
		} else {
			document.body.style.overflowY = "scroll";
		}
	}, [dialogIsOpen]);

	useEffect(() => {
		if (mapRef.current !== null) {
			if (data === null) {
				mapRef.current.flyTo([28.889515, 2.485352], 5);
				setLieuPoints(null);
			} else {
				mapRef.current.flyTo(data.latLng, 13);
				setLieuPoints(data);
			}
		}
	}, [data]);


	function handleDeleteChanges(pointID) {
		let tempPoints = lieuPoints.points.filter(pos => { return pos.point.id !== pointID });
		let t = { ...lieuPoints };
		t.points = tempPoints;
		setLieuPoints({ ...t });
		handleChanges({ ...t });
	}

	function handlePositionsChanges(position) {
		setTempPosition(position);
		setDialogIsOpen(true);
	}

	function handleDialogDataChanges(info) {
		setDialogIsOpen(false);
		if (info !== null) {
			setLieuPoints({ ...lieuPoints, points: [...lieuPoints.points, { point: tempPosition, info: info }] });
			handleChanges({ ...lieuPoints, points: [...lieuPoints.points, { point: tempPosition, info: info }] });

		}
	}

	return <div>
		<MapContainer ref={mapRef} center={(lieuPoints === null || lieuPoints === undefined) ? [28.889515, 2.485352] : lieuPoints.latLng} zoom={lieuPoints?.latLng === undefined ? 5 : 13} scrollWheelZoom={true}>
			<TileLayer
				attribution='&copy; <a href="https://www.google.com/intl/en-GB_ALL/permissions/geoguidelines/">Google Maps</a>'
				url="https://mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
			//url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<VenteLocationMarker data={lieuPoints} handleChanges={handlePositionsChanges} handleDelete={handleDeleteChanges}></VenteLocationMarker>
		</MapContainer>
		{dialogIsOpen ? <LieuVenteDialog handleChanges={handleDialogDataChanges}></LieuVenteDialog> : ""}
	</div>
}

function Localisations({ data, handleChanges }) {
	const [storeSelected, setStoreSelected] = useState(data.lieuxVente.storeLink === undefined ? false : true);
	const [storeLink, setStoreLink] = useState(data.lieuxVente.storeLink === undefined ? "" : data.lieuxVente.storeLink);
	const [lieuxProduction, setLieuxProduction] = useState(data.lieuxProduction === undefined ? [] : data.lieuxProduction);
	const [lieuxVente, setLieuxVente] = useState(data.lieuxVente.lieux === undefined ? [] : data.lieuxVente.lieux);

	const [lieuxProductionList, setLieuxProductionList] = useState(mmm);
	const [lieuxVenteList, setLieuxVenteList] = useState(mmm);

	const [selectedProdVille, setselectedProdVille] = useState(null);
	const [selectedVenteVille, setselectedVenteVille] = useState(null);

	const storeLinkRef = useRef();
	const prodMapRef = useRef();

	useEffect(() => {
		const L = require("leaflet");

		delete L.Icon.Default.prototype._getIconUrl;

		L.Icon.Default.mergeOptions({
			iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
			iconUrl: require("leaflet/dist/images/marker-icon.png"),
			shadowUrl: require("leaflet/dist/images/marker-shadow.png")
		});
	}, []);

	function handleLieuxProductionSelect(selectedCities) {

		let arr = [];
		selectedCities.forEach((wilaya, index) => {
			wilaya.forEach((commune, index2) => {
				arr.push({ id: villes.FR[index].communes[commune].id, name: villes.FR[index].communes[commune].name, wilaya: villes.FR[index].name, wilayaNumber: villes.FR[index].wilayaNumber, latLng: villes.FR[index].communes[commune].latLng, points: [] });
			});
		});
		setLieuxProduction([...arr]);
		setLieuxProductionList(selectedCities);
		setselectedProdVille(null);
		prodMapRef.current.flyTo([28.889515, 2.485352], 5);
	}
	function handleLieuxVenteSelect(selectedCities) {
		let arr = [];
		selectedCities.forEach((wilaya, index) => {
			wilaya.forEach(commune => {
				arr.push({ id: villes.FR[index].communes[commune].id, name: villes.FR[index].communes[commune].name, wilaya: villes.FR[index].name, wilayaNumber: villes.FR[index].wilayaNumber, latLng: villes.FR[index].communes[commune].latLng, points: [] });
			});
		})
		setLieuxVente([...arr]);
		setLieuxVenteList(selectedCities);
		setselectedVenteVille(null);
		prodMapRef.current.flyTo([28.889515, 2.485352], 5);

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

	function handleVenteDeletePosition(data) {
		let temp = [];
		lieuxVente.forEach(commune => {
			let points = [];
			commune.points.forEach((point, index) => {
				if (point === data) {
					//commune.points.splice(index,1);
				} else {
					points.push({ ...point });
				}
			});
			temp.push({ ...commune, points: [...points] })
		});
		setLieuxVente([...temp]);
	}

	function selectProdVille(ville) {
		if (ville.id === selectedProdVille?.id) {
			setselectedProdVille(null);
			prodMapRef.current.flyTo([28.889515, 2.485352], 5);
		} else {
			setselectedProdVille(ville);
			prodMapRef.current.flyTo(ville.latLng, 13);
		}
	}
	function handleProdPositionsChanges(pos) {
		let lieux = [...lieuxProduction];
		lieux.find(lieu => { return lieu.id === selectedProdVille.id }).points = pos;
		setLieuxProduction([...lieux]);
	}

	function selectVenteVille(ville) {
		if (ville.id === selectedVenteVille?.id) {
			setselectedVenteVille(null)
		} else {
			setselectedVenteVille(ville);
		}
	}

	function handleVentePositionsChanges(pos) {
		let t = [];
		lieuxVente.forEach(lieu => {
			if (lieu.id === selectedVenteVille.id) {
				t.push(pos);
			} else {
				return t.push(lieu);
			}
		})
		setLieuxVente(t);
	}

	useEffect(() => {
		handleChanges({ lieuxVente: { lieux: lieuxVente, storeLink: storeLink }, lieuxProduction: lieuxProduction });
	}, [lieuxVente, lieuxProduction, storeLink]);

	useEffect(() => {
		if (storeSelected) {
			storeLinkRef.current.focus();
		}
	}, [storeSelected]);

	function handleInputTextChange(e) {
		setStoreLink(functions.stringRemoveAllSpaces(e.target.value));
	}


	return <div className="step step__localisations">
		<div className="step__localisation__header">
			<div><h1 className='step__title'>Lieux de production</h1></div>
			<SelectLieu selectedItems={[]} onChange={handleLieuxProductionSelect} title="Lieux de production" readOnly={false} isFilter={false} />
		</div>
		<div className='recap__lieux'>
			<div className='recap__lieux__villes'>
				{

					lieuxProduction.length === 0 ? <p className='step__paragraph'>Séléctionner d'abord la/les ville(s) de production</p> : lieuxProduction.map((ville, index) => {
						return <div key={index} className={ville.id === selectedProdVille?.id ? 'recap__lieux__ville--selected' : 'recap__lieux__ville'} onClick={() => { selectProdVille(ville) }}>
							<img className='recap__lieux__ville__icon' alt='pin' src={pin}></img>
							<label className='recap__lieux__ville__commune'>{ville.name} ({ville.points.length} lieux)</label>
							<label className='recap__lieux__ville__wilaya'>{ville.wilaya}</label>
						</div>
					})
				}
			</div>
			<MapContainer ref={prodMapRef} center={[28.889515, 2.485352]} zoom={5} scrollWheelZoom={true}>
				<TileLayer
					attribution='&copy; <a href="https://www.google.com/intl/en-GB_ALL/permissions/geoguidelines/">Google Maps</a>'
					url="https://mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
				//url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<ProdLocationMarker data={selectedProdVille?.points} handleChanges={handleProdPositionsChanges}></ProdLocationMarker>
			</MapContainer>
		</div>

		<hr className='step__line' />
		<div className="step__localisation__header">
			<div><h1 className='step__title'>Lieux de vente</h1></div>
			{/*<SelectLieu selectedItems={lieuxVenteList} onChange={handleLieuxVenteSelect} title="Lieux de vente" readOnly={false} isFilter={false} />*/}
		</div>
		<div className='recap__lieux'>
			<div className='recap__lieux__villes'>
				{
					lieuxVente.length === 0 ? <p className='step__paragraph'>Séléctionner d'abord la/les ville(s) de vente</p> : lieuxVente.map((ville, index) => {
						return <div key={index} className={ville.id === selectedVenteVille?.id ? 'recap__lieux__ville--selected' : 'recap__lieux__ville'} onClick={() => { selectVenteVille(ville) }}>
							<img className='recap__lieux__ville__icon' alt='pin' src={pin}></img>
							<label className='recap__lieux__ville__commune'>{ville.name} ({ville.points.length} lieux)</label>
							<label className='recap__lieux__ville__wilaya'>{ville.wilaya}</label>
						</div>
					})
				}
			</div>
			<LieuVenteCreation data={selectedVenteVille} handleChanges={handleVentePositionsChanges} handleDelete={handleVenteDeletePosition}></LieuVenteCreation>
		</div>
		<div className={storeSelected ? "step__option step__option--selected" : "step__option"} onClick={selectStore}>
			<img className='step__option__icon' src={store} alt="market" />
			<div className='step__option__data'>
				<h2 className='step__option__info__title'>Boutique en ligne</h2>
				<p className='step__option__info__description'>Vous avez une boutique sur internet ?</p>
			</div>
			<input ref={storeLinkRef} className={storeSelected ? "input__text step__input__text step__localisation__store__link" : "invisible"} type="text" placeholder="https://www.nom-de-boutique.com" onBlur={() => storeLinkRef.current.value.length === 0 ? setStoreSelected(false) : setStoreSelected(true)} onPaste={handleInputTextChange} onChange={handleInputTextChange} value={storeLink} />
		</div>
		
	</div>
}

export default Localisations;