import { useState, useRef, useEffect } from "react";
import commande from '../../../Assets/images/icons/commande.png';
import rdv from '../../../Assets/images/icons/appointment.png';
import retrait from '../../../Assets/images/icons/pickup.png';
import livraison from '../../../Assets/images/icons/delivery.png';
import remove from '../../../Assets/images/delete.png';
import './Services.css';
import units from '../../../Utils/Units';
import functions from '../../../Utils/Functions';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup, L } from 'react-leaflet';

import pin from './../../../Assets/images/icons/filterBar/placeholder.png'


let lll = {
    "lieuxVente": {
        "lieux": [
            {
                "id": 120,
                "name": "Commune 1",
                "wilaya": "Adrar",
                "wilayaNumber": 1,
                "points": [
                    {
                        "point": {
                            "id": 6,
                            "lat": 36.163656361530464,
                            "lng": 4.788665771484375,
                        },
                        "info": {
                            "nom": "",
                            "horaires": [
                                [],
                                [],
                                [],
                                [],
                                [],
                                [],
                                []
                            ]
                        }
                    }
                ]
            },
            {
                "id": 220,
                "name": "Commune 2",
                "wilaya": "Adrar",
                "wilayaNumber": 1,
                "points": []
            },
            {
                "id": 320,
                "name": "Commune 3",
                "wilaya": "Adrar",
                "wilayaNumber": 1,
                "points": []
            },
            {
                "id": 5020,
                "name": "Commune 5",
                "wilaya": "Chlef",
                "wilayaNumber": 2,
                "points": [
                    {
                        "point": {
                            "id": 7,
                            "lat": 36.139122412388105,
                            "lng": 4.79330062866211
                        },
                        "info": {
                            "nom": "",
                            "horaires": [
                                [],
                                [],
                                [],
                                [],
                                [],
                                [],
                                []
                            ]
                        }
                    },
                    {
                        "point": {
                            "id": 8,
                            "lat": 36.12900165569652,
                            "lng": 4.818706512451173
                        },
                        "info": {
                            "nom": "",
                            "horaires": [
                                [],
                                [],
                                [],
                                [],
                                [],
                                [],
                                []
                            ]
                        }
                    }
                ]
            }
        ],
        "storeLink": ""
    },
    "lieuxProduction": [
        {
            "id": 120,
            "name": "Commune 1",
            "wilaya": "Adrar",
            "wilayaNumber": 1,
            "points": [
                {
                    "id": 1,
                    "lat": 36.16684382532443,
                    "lng": 4.802913665771485,
                },
                {
                    "id": 2,
                    "lat": 36.15755824355528,
                    "lng": 4.815101623535156
                },
                {
                    "id": 3,
                    "lat": 36.15672664526235,
                    "lng": 4.833297729492188
                }
            ]
        },
        {
            "id": 220,
            "name": "Commune 2",
            "wilaya": "Adrar",
            "wilayaNumber": 1,
            "points": [
                {
                    "id": 4,
                    "lat": 36.16989258244813,
                    "lng": 4.786262512207032
                }
            ]
        },
        {
            "id": 320,
            "name": "Commune 3",
            "wilaya": "Adrar",
            "wilayaNumber": 1,
            "points": []
        },
        {
            "id": 5020,
            "name": "Commune 5",
            "wilaya": "Chlef",
            "wilayaNumber": 2,
            "points": [
                {
                    "id": 5,
                    "lat": 36.15173687028867,
                    "lng": 4.82625961303711
                }
            ]
        }
    ]
};

function Tartif({ data, handleChanges, handleRemove }) {
    const unitsRef = useRef();
    const prixRef = useRef();
    const quantiteRef = useRef();
    const [tarif, setTarif] = useState(data);

    function handleUnitChanges(e) {
        setTarif({ ...tarif, unite: parseInt(e.target.value) });
        handleChanges({ ...tarif, unite: parseInt(e.target.value) });
    }
    function handlePrixChanges(e) {
        if (functions.stringIsNumber(e.target.value)) {
            if (e.target.value.length === 0) {
                e.target.value = 0;
            } else {
                while (e.target.value.startsWith("0") && e.target.value.length != 0) {
                    e.target.value = e.target.value.substring(1);
                }
                if (e.target.value.length === 0) {
                    e.target.value = 0;
                }
            }
            setTarif({ ...tarif, prix: e.target.value });
            handleChanges({ ...tarif, prix: e.target.value });
        }
    }
    function handleQuantiteChanges(e) {

        if (functions.stringIsNumber(e.target.value)) {
            if (e.target.value.startsWith("0")) {
                e.target.value = e.target.value.substring(1);
            }
            setTarif({ ...tarif, quantite: e.target.value });
            handleChanges({ ...tarif, quantite: e.target.value });
        }
    }
    function handleQuantiteBlur(e) {
        if (e.target.value.length == 0) {
            setTarif({ ...tarif, quantite: 1 });
            //handleChanges({...tarif, quantite: 1});
        } else {
            setTarif(tarif);
            handleChanges(tarif);
        }
    }

    return <div key={data.id} className="step__services__tarif">
        <img className="step__details__links__link__delete invisible step__services__tarif__delete" src={remove} onClick={() => handleRemove(data.id)}></img>
        <h1 className="step__title">{tarif.prix} DA/{tarif.quantite + " " + units.getUnit(tarif.unite).label}</h1>
        <div className="step__services__tarif__inputs">
            <label>Prix par unité</label>
            <label>Unité de mésure</label>
            <label>Quantité</label>
            <input ref={prixRef} className="input__text tarif__input__text" type="text" value={tarif.prix} onChange={handlePrixChanges} maxLength="9"></input>
            <select ref={unitsRef} className="step__service__tarif__selcet" onChange={handleUnitChanges} value={tarif.unite}>
                {

                    units.unitsFR.map((group, index) => {
                        return <optgroup key={index} label={group.name}>
                            {
                                group.units.map((unit, index) => {
                                    return <option key={index} value={unit.id}>{unit.name} {unit?.label ? "(" + unit.label + ")" : ""}</option>
                                })
                            }
                        </optgroup>
                    })
                }
            </select>
            <input ref={quantiteRef} className="input__text tarif__input__text" type="text" value={tarif.quantite} onChange={handleQuantiteChanges} onBlur={handleQuantiteBlur}></input>
        </div>
    </div>
}

function Condition({ data, handleChanges, handleRemove }) {
    const [value, setValue] = useState(data);
    const inputRef = useRef();
    function handleInputChanges(e) {
        let temp = functions.stringRemoveBeginingSpaces(e.target.value);
        temp = functions.stringRemoveMultipleSpaces(e.target.value);
        setValue({ id: value.id, value: temp });
        handleChanges({ id: value.id, value: functions.stringNormalizeSpaces(temp) });
    }
    function handleInputBlur(e) {
        let temp = functions.stringRemoveBeginingSpaces(e.target.value);
        temp = functions.stringRemoveMultipleSpaces(temp);
        temp = functions.stringRemoveEndingSpaces(temp);
        setValue({ id: value.id, value: temp });
        handleChanges({ id: value.id, value: temp });
    }
    return <div className="step__services__commande__condition">
        <img className="step__details__links__link__delete" src={remove} onClick={() => handleRemove(value.id)}></img>
        <input ref={inputRef} className="input__text step__input__text step__services__commande__condition__input" type="text" placeholder="Règles et conditions" onChange={handleInputChanges} onBlur={handleInputBlur} value={value.value}></input>
    </div>
}

function Commande({ data, handleChanges }) {
    const [retraitSelected, setRetraitSelected] = useState(false);
    const [livraisonSelected, setLivraisonSelected] = useState(false);
    const [tarifs, setTarifs] = useState([]);
    const [conditions, setConditions] = useState([]);
    const [id, setId] = useState(0);


    useEffect(e=>{
        handleChanges({
            retrait: retraitSelected,
            livraison: livraisonSelected,
            tarifs: tarifs,
            conditions: conditions
        })
    },[retraitSelected,livraisonSelected,tarifs,conditions])

    useEffect(() => {
        setId(id + 1);
    }, [tarifs.length, conditions.length]);

    function addTarif() {
        setTarifs([...tarifs, { id: id, prix: 1, unite: 20, quantite: 1 }]);
    }
    function removeTarif(tarif) {
        let temp = [...tarifs];
        let newTarifs = temp.filter(t => { return t.id !== tarif });
        setTarifs(newTarifs);
    }
    function handleTarifsChanges(tarif) {
        let temp = tarifs.map(t => {
            if (t.id == tarif.id) {
                return tarif;
            }
            return t;
        })
        setTarifs([...temp]);
    }


    function addCondition() {
        let temp = conditions.filter(t => { return t.value.length === 0 });
        if (temp.length === 0){
            setConditions([...conditions, { id: id, value: "" }]);
        }
    }
    function removeCondition(cond) {
        let newArray = [];
        conditions.forEach((value) => {
            if (value.id !== cond) {
                newArray.push(value);
            }
        })
        setConditions(newArray);
    }
    function handleConditionsChanges(cond) {
        let temp = conditions.map(t => {
            if (t.id == cond.id) {
                return cond;
            }
            return t;
        })
        setConditions([...temp]);
    }


    return <div className="step__services__commande">
        <h1 className="step__subTitle">Méthode de récuperation</h1>
        <br></br>
        <div className={retraitSelected ? "step__option step__option--selected" : "step__option"} onClick={() => setRetraitSelected(!retraitSelected)}>
            <img className='step__option__icon' src={retrait} alt="retrait" />
            <div className='step__option__data'>
                <h2 className='step__option__info__title'>Retrait</h2>
                <p className='step__option__info__description'>Le client récupere la commande au lieu de vente</p>
            </div>
        </div>
        <br></br>
        <div className={livraisonSelected ? "step__option step__option--selected" : "step__option"} onClick={() => setLivraisonSelected(!livraisonSelected)}>
            <img className='step__option__icon' src={livraison} alt="livraison" />
            <div className='step__option__data'>
                <h2 className='step__option__info__title'>livraison</h2>
                <p className='step__option__info__description'>Le client sera livre a l'adresse fourni</p>
            </div>
        </div>
        <br></br>
        <h1 className="step__subTitle">Tarifs</h1>
        {
            tarifs.map(tarif => {
                return <Tartif key={tarif.id} data={tarif} handleChanges={handleTarifsChanges} handleRemove={removeTarif}></Tartif>;
            })
        }
        <input type="button" value={"Ajouter"} className="button button--green step__services__ajouter" onClick={addTarif}></input>
        <br></br>
        <br></br>
        <h1 className="step__subTitle">Règles et conditions</h1>
        {
            conditions.map((cond, index) => {
                return <Condition key={cond.id} data={cond} handleChanges={handleConditionsChanges} handleRemove={removeCondition}></Condition>
            })
        }
        <input type="button" value={"Ajouter"} className="button button--green step__services__ajouter" onClick={addCondition}></input>
    </div>
}


function mapLieuxRDVpositions(data) {
    let prodPoints = [];
    data.lieuxProduction.forEach(city => {
        city.points.forEach(point => {
            prodPoints.push(point);
        })
    });
    let ventePoints = [];
    data.lieuxVente.lieux.forEach(city => {
        city.points.forEach(point => {
            ventePoints.push(point.point);
        })
    });
    return ({ prod: prodPoints, vente: ventePoints });
}

function LieuxRDV({ data, handleChanges }) {
    const [prodSelected, setProdSelected] = useState(false);
    const [selectedPoint, setSelectedPoint] = useState(-1);
    const L = require("leaflet");
    const mapRef = useRef();
    let selectedPointMarker = L.icon({
        "iconUrl": pin,
        "iconRetinaUrl": pin,
        "shadowUrl": require("leaflet/dist/images/marker-shadow.png"),
        "iconSize": [35, 41],
        "iconAnchor": [17, 41],
        "popupAnchor": [1, -34],
        "tooltipAnchor": [16, -28],
        "shadowSize": [47, 41]
    });
    let defaultMarkerIcon = L.icon({
        "iconUrl": require("leaflet/dist/images/marker-icon.png"),
        "iconRetinaUrl": require("leaflet/dist/images/marker-icon-2x.png"),
        "shadowUrl": require("leaflet/dist/images/marker-shadow.png"),
        "iconSize": [25, 41],
        "iconAnchor": [12, 41],
        "popupAnchor": [1, -34],
        "tooltipAnchor": [16, -28],
        "shadowSize": [41, 41]
    });

    useEffect(() => {
        setSelectedPoint(-1);
        handleChanges(null);
    }, [prodSelected])

    //console.log(mapLieuxRDVpositions(data));
    return <div className="step__services__lieuxRDV">
        <div className="step__services__lieuxRDV__switch">
            <label className={!prodSelected ? "step__services__lieuxRDV__switch__item step__services__lieuxRDV__switch__item--selected" : "step__services__lieuxRDV__switch__item"} onClick={() => { setProdSelected(false) }}>Lieux de vente</label>
            <label className={prodSelected ? "step__services__lieuxRDV__switch__item step__services__lieuxRDV__switch__item--selected" : "step__services__lieuxRDV__switch__item"} onClick={() => { setProdSelected(true) }}>Lieux de production</label>
        </div>
        <br></br>
        <MapContainer ref={mapRef} center={[36.151988, 4.795080]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.google.com/intl/en-GB_ALL/permissions/geoguidelines/">Google Maps</a>'
                url="https://mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            //url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                prodSelected ? data.prod.map((point, index) => {
                    return <Marker icon={point.id === selectedPoint ? selectedPointMarker : defaultMarkerIcon} key={index} position={[point.lat, point.lng]} eventHandlers={{
                        click: (e) => {
                            if (point.id === selectedPoint) {
                                setSelectedPoint(-1);
                                handleChanges(null);
                            } else {
                                setSelectedPoint(point.id);
                                //const {map} = this.state;
                                mapRef.current.flyTo([point.lat, point.lng]);
                                handleChanges(point)
                            }
                        }
                    }}>
                    </Marker>
                }) :
                    data.vente.map((point, index) => {
                        return <Marker icon={point.id === selectedPoint ? selectedPointMarker : defaultMarkerIcon} key={index} position={[point.lat, point.lng]} eventHandlers={{
                            click: (e) => {
                                if (point.id === selectedPoint) {
                                    setSelectedPoint(-1);
                                    handleChanges(null);
                                } else {
                                    setSelectedPoint(point.id);
                                    mapRef.current.flyTo([point.lat, point.lng]);
                                    handleChanges(point)
                                }
                            }
                        }}>
                        </Marker>
                    })
            }
        </MapContainer>
    </div>
}

function RDVjour({ data, handleChanges }) {
    const [day, setDay] = useState(data);

    function checkDay(e) {
        let newDay = { ...day };
        newDay.enabled = !newDay.enabled;
        newDay.times.forEach((time, index) => {
            time.enabled = newDay.enabled;
        });
        setDay({ ...newDay });
        handleChanges({ ...newDay });
    }

    function checkTime(e) {
        let newDay = { ...day };
        newDay.times[parseInt(e.target.value)].enabled = !newDay.times[parseInt(e.target.value)].enabled;
        setDay({ ...newDay });
        handleChanges({ ...newDay });
    }
    return <div className="step__services__horairesRDV__plages__day">
        <div className="step__services__horairesRDV__plages__day__time">
            <input type="checkbox" name="dayName" value={data.index} checked={day.enabled} onChange={checkDay}></input>
            <label htmlFor="dayName">{day.name}</label>
        </div>
        <br></br>
        {
            data.times.map((time, index) => {
                return <div key={index} className="step__services__horairesRDV__plages__day__time">
                    <input type="checkbox" name="time" value={index} checked={time.enabled} onChange={checkTime}></input>
                    <label htmlFor="time">{time.time}</label>
                </div>
            })
        }
    </div>
}
//{enabled: true, name: "SAMEDI", times: [{enabled: true, time: "00:00"}]}, 


function HorairesRDV({ data, point, handleChanges }) {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [duration, setDuration] = useState("");
    const [timesTable, setTimesTable] = useState(data);

    const rdvStartTimeRef = useRef();
    const rdvEndTimeRef = useRef();
    const rdvDurationRef = useRef();

    function handleInputsChanges(e) {
        if (e.target === rdvStartTimeRef.current) {
            if (e.target.value.length === 3) {
                if (functions.isValidTime(e.target.value)) {
                    setStartTime(e.target.value);
                } else {
                    if (e.target.value[2] === ':') {//<- 12:
                        e.target.value = e.target.value.substring(0, 2);
                        setStartTime(e.target.value);
                    } else {//-> 125
                        let t = e.target.value.substring(2, 3);
                        e.target.value = e.target.value.substring(0, 2) + ":" + t;
                        if (functions.isValidTime(e.target.value)) {
                            setStartTime(e.target.value);
                        }

                    }
                }
            } else {
                if (functions.isValidTime(e.target.value)) {
                    setStartTime(e.target.value);
                }
            }
        }
        if (e.target === rdvEndTimeRef.current) {
            if (e.target.value.length === 3) {
                if (functions.isValidTime(e.target.value)) {
                    setEndTime(e.target.value);
                } else {
                    if (e.target.value[2] === ':') {//<- 12:
                        e.target.value = e.target.value.substring(0, 2);
                        setEndTime(e.target.value);
                    } else {//-> 125
                        let t = e.target.value.substring(2, 3);
                        e.target.value = e.target.value.substring(0, 2) + ":" + t;
                        if (functions.isValidTime(e.target.value)) {
                            setEndTime(e.target.value);
                        }

                    }
                }
            } else {
                if (functions.isValidTime(e.target.value)) {
                    setEndTime(e.target.value);
                }
            }
        }
        if (e.target === rdvDurationRef.current) {
            if (e.target.value.length === 3) {
                if (functions.isValidTime(e.target.value)) {
                    setDuration(e.target.value);
                } else {
                    if (e.target.value[2] === ':') {//<- 12:
                        e.target.value = e.target.value.substring(0, 2);
                        setDuration(e.target.value);
                    } else {//-> 125
                        let t = e.target.value.substring(2, 3);
                        e.target.value = e.target.value.substring(0, 2) + ":" + t;
                        if (functions.isValidTime(e.target.value)) {
                            setDuration(e.target.value);
                        }

                    }
                }
            } else {
                if (functions.isValidTime(e.target.value)) {
                    setDuration(e.target.value);
                }
            }
        }
    }
    function handleInputsBlur(e) {
        if (e.target === rdvStartTimeRef.current) {
            if (e.target.value.length !== 5) {
                setStartTime("");
            } else {
                if (startTime.length === 5 && endTime.length === 5) {
                    if (functions.timeIsInOrder(startTime, endTime)) {
                        if (duration.length === 5) {
                            //generateTimes();
                        }
                    } else {
                        alert("La période que vous avez saisie n'est pas en ordre, merci de saisire la periode correctement")
                        if (e.target === rdvEndTimeRef.current) {
                            setEndTime("");
                            rdvEndTimeRef.current.focus();
                        } else if (e.target === rdvStartTimeRef.current) {
                            setStartTime("");
                            rdvStartTimeRef.current.focus();
                        } else {

                        }
                    }
                }
            }

        } else if (e.target === rdvEndTimeRef.current) {
            if (e.target.value.length !== 5) {
                setEndTime("");
            } else {
                if (startTime.length === 5 && endTime.length === 5) {
                    if (functions.timeIsInOrder(startTime, endTime)) {
                        if (duration.length === 5) {
                            //generateTimes();
                        }
                    } else {
                        alert("La période que vous avez saisie n'est pas en ordre, merci de saisire la periode correctement")
                        if (e.target === rdvEndTimeRef.current) {
                            setEndTime("");
                            rdvEndTimeRef.current.focus();
                        } else if (e.target === rdvStartTimeRef.current) {
                            setStartTime("");
                            rdvStartTimeRef.current.focus();
                        } else {

                        }
                    }
                }
            }
        } else if (e.target === rdvDurationRef.current) {
            if (e.target.value.length !== 5) {
                setDuration("");
            }
        }
    }

    useEffect(() => {
        if (startTime.length === 5 && endTime.length === 5 && duration.length === 5) {
            if (functions.timeIsInOrder(startTime, endTime)) {
                generateTimes();
            }
        } else {
            setTimesTable(null);
            handleChanges({ point: point, horaires: null });
        }
    }, [startTime, endTime, duration]);


    function handleDayTimesChanges(data) {
        let newTable = [...timesTable];
        newTable[data.index] = data;
        setTimesTable([...newTable]);
        handleChanges({ point: point, horaires: [...newTable] });
    }

    function generateTimes() {
        let times = [
            { enabled: true, name: "SAMEDI", times: [] },
            { enabled: true, name: "DIMANCHE", times: [] },
            { enabled: true, name: "LUNDI", times: [] },
            { enabled: true, name: "MARDI", times: [] },
            { enabled: true, name: "MERCREDI", times: [] },
            { enabled: true, name: "JEUDI", times: [] },
            { enabled: true, name: "VENDREDI", times: [] },
        ];
        times.forEach((day, index) => {
            day.times = [];
            day.times.push({ enabled: true, time: startTime });
            while (functions.timeIsInOrder(day.times[day.times.length - 1].time, endTime)) {
                let somme = functions.timeSomme(day.times[day.times.length - 1].time, duration);
                if (somme === endTime || somme === startTime || functions.timeIsInOrder(endTime, somme)) {
                    break;
                }
                day.times.push({ enabled: true, time: somme });
            }
        });
        setTimesTable([...times]);
        handleChanges({ point: point, horaires: [...times] });
    }

    return point === null ? <p className="step__paragraph" >Sélectionner un lieu d'abord</p> : <div className="step__services__horairesRDV">
        <div className="step__services__horairesRDV__params">
            <label>Heure de début</label>
            <label>Heure de fin</label>
            <label>Durrée entre les rendez vous</label>
            <input ref={rdvStartTimeRef} className="input__text services__horairesRDV__input__text" type="text" placeholder="00:00" value={startTime} onChange={handleInputsChanges} onBlur={handleInputsBlur}></input>
            <input ref={rdvEndTimeRef} className="input__text services__horairesRDV__input__text" type="text" placeholder="00:00" value={endTime} onChange={handleInputsChanges} onBlur={handleInputsBlur}></input>
            <input ref={rdvDurationRef} className="input__text services__horairesRDV__input__text" type="text" placeholder="00:00" value={duration} onChange={handleInputsChanges} onBlur={handleInputsBlur}></input>
        </div>
        <br></br>
        <hr style={{ width: "80%", margin: "auto" }}></hr>
        <br></br>
        <div className="step__services__horairesRDV__plages">
            {
                timesTable?.map((element, index) => {
                    return <RDVjour key={index} data={{ ...element, index: index }} handleChanges={handleDayTimesChanges}></RDVjour>
                })
            }

        </div>
    </div>
}

function Motif({ data, handleChanges, handleRemove }) {
    const [value, setValue] = useState(data);
    const inputRef = useRef();
    function handleInputChanges(e) {
        let temp = functions.stringRemoveBeginingSpaces(e.target.value);
        temp = functions.stringRemoveMultipleSpaces(e.target.value);
        setValue({ id: value.id, value: temp });
        handleChanges({ id: value.id, value: functions.stringNormalizeSpaces(temp) });
    }
    function handleInputBlur(e) {
        let temp = functions.stringRemoveBeginingSpaces(e.target.value);
        temp = functions.stringRemoveMultipleSpaces(temp);
        temp = functions.stringRemoveEndingSpaces(temp);
        setValue({ id: value.id, value: temp });
        handleChanges({ id: value.id, value: temp });
    }
    return <div className="step__services__commande__condition">
        <img className="step__details__links__link__delete" src={remove} onClick={() => handleRemove(value.id)}></img>
        <input ref={inputRef} className="input__text step__input__text step__services__commande__condition__input" type="text" placeholder="Motif du rendez vous" onChange={handleInputChanges} onBlur={handleInputBlur} value={value.value}></input>
    </div>
}

function RDV({ data, handleChanges }) {
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [horaires, setHoraires] = useState(null);
    const [motifs, setMotifs] = useState([]);
    const [conditions, setConditions] = useState([]);

    //console.log(motifs);

    const [id, setId] = useState(0);

    useEffect(() => {
        setId(id + 1);
    }, [motifs.length, conditions.length]);

    useEffect(e=>{
        handleChanges({
            point: selectedPoint,
            horaires: horaires,
            motifs: motifs,
            conditions: conditions
        })
    },[selectedPoint, horaires, motifs, conditions]);

    function handlePositionClick(data) {
        setSelectedPoint(data);
        setHoraires(null);
        setMotifs([]);
        setConditions([]);
    }
    function handleTimesChanges(data) {
        setHoraires(data.horaires);
    }
    
    function addMotif() {
        let temp = motifs.filter(t => { return t.value.length === 0 });
        if (temp.length === 0){
            setMotifs([...motifs, { id: id, value: "" }]);
        }
    }
    function handleMotifChanges(data) {
        let temp = motifs.map(t => {
            if (t.id == data.id) {
                return data;
            }
            return t;
        })
        setMotifs([...temp]);
    }
    function handleMotifRemove(data) {
        let temp = [...motifs];
        let newMotifs = temp.filter(t => { return t.id !== data });
        setMotifs(newMotifs);
    }


    function addCondition() {
        let temp = conditions.filter(t => { return t.value.length === 0 });
        if (temp.length === 0){
            setConditions([...conditions, { id: id, value: "" }]);
        }
    }
    function handleConditionChanges(data) {
        let temp = conditions.map(t => {
            if (t.id == data.id) {
                return data;
            }
            return t;
        })
        setConditions([...temp]);
    }
    function handleConditionRemove(data) {
        let temp = [...conditions];
        let newConditions = temp.filter(t => { return t.id !== data });
        setConditions(newConditions);
    }
    
    
    return <div className="step__services__commande">
        <div>
            <h1 className="step__subTitle">1. Lieux</h1>
            <LieuxRDV data={mapLieuxRDVpositions(lll)} handleChanges={handlePositionClick}></LieuxRDV>
            <br></br>
            <h1 className="step__subTitle">2. Horaires</h1>
            {selectedPoint === null ? "" : <HorairesRDV data={horaires} point={selectedPoint} handleChanges={handleTimesChanges}></HorairesRDV>}
            <br></br>
            <h1 className="step__subTitle">3. Motifs</h1>
            {
                motifs?.map((motif, index) => {
                    return <Motif key={motif.id} data={motif} handleChanges={handleMotifChanges} handleRemove={handleMotifRemove}></Motif>
                })
            }
            {
                horaires === null ? "" : <input type="button" value={"Ajouter"} className="button button--green step__services__ajouter" onClick={addMotif}></input>
            }
            <br></br>
            <h1 className="step__subTitle">3. Règles et conditions</h1>
            {
                conditions?.map((cond, index) => {
                    return <Condition key={cond.id} data={cond} handleChanges={handleConditionChanges} handleRemove={handleConditionRemove}></Condition>
                })
            }
            {
                horaires === null ? "" : <input type="button" value={"Ajouter"} className="button button--green step__services__ajouter" onClick={addCondition}></input>
            }
        </div>
    </div>
}
function Services({ data, handleChanges }) {
    const [commandeSelected, setCommandeSelected] = useState(false);
    const [rdvSelected, setRdvSelected] = useState(false);


    function handleRDVchanges(data){
        console.log(data);
    }

    function handleCommandeChanges(data){
        console.log(data);
    }


    return <div className="step step__services">
        <h1 className="step__title">Services</h1>
        <br></br>
        <div className={commandeSelected ? "step__option step__option--selected" : "step__option"} onClick={() => setCommandeSelected(!commandeSelected)}>
            <img className='step__option__icon' src={commande} alt="commande" />
            <div className='step__option__data'>
                <h2 className='step__option__info__title'>Commande</h2>
                <p className='step__option__info__description'>Vous permettez au visiteurs de commander votre bien ou service.</p>
            </div>
        </div>
        {commandeSelected ? <Commande handleChanges={handleCommandeChanges}/> : <br></br>}
        <div className={rdvSelected ? "step__option step__option--selected" : "step__option"} onClick={() => setRdvSelected(!rdvSelected)}>
            <img className='step__option__icon' src={rdv} alt="rendez vous" />
            <div className='step__option__data'>
                <h2 className='step__option__info__title'>Rendez vous</h2>
                <p className='step__option__info__description'>Mettre en place un système de prise de rendez vous avec vos clients, cela vous permet d'organiser et gérer vos planings avec vos clients</p>
            </div>
        </div>
        {rdvSelected ? <RDV handleChanges={handleRDVchanges}/> : <br></br>}
    </div>
}

export default Services;