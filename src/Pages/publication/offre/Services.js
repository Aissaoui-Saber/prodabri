import { useState, useRef, useEffect } from "react";
import commande from '../../../Assets/images/icons/commande.png';
import rdv from '../../../Assets/images/icons/appointment.png';
import retrait from '../../../Assets/images/icons/pickup.png';
import livraison from '../../../Assets/images/icons/delivery.png';
import remove from '../../../Assets/images/delete.png';
import './Services.css';
import units from '../../../Utils/Units';
import functions from '../../../Utils/Functions';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';

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
                            "lat": 36.163656361530464,
                            "lng": 4.788665771484375
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
                    "lat": 36.16684382532443,
                    "lng": 4.802913665771485
                },
                {
                    "lat": 36.15755824355528,
                    "lng": 4.815101623535156
                },
                {
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
        setConditions([...conditions, { id: id, value: "" }]);
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
        let temp = [...conditions];
        temp.filter(e => { return e.id == cond.id }).value = cond.value;

        //temp[cond.id] = cond.value;
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
    useEffect(() => {
        const L = require("leaflet");

        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
            iconUrl: require("leaflet/dist/images/marker-icon.png"),
            shadowUrl: require("leaflet/dist/images/marker-shadow.png")
        });
    }, []);
    //console.log(mapLieuxRDVpositions(data));
    return <div className="step__services__lieuxRDV">
        <div className="step__services__lieuxRDV__switch">
            <label className={!prodSelected ? "step__services__lieuxRDV__switch__item step__services__lieuxRDV__switch__item--selected" : "step__services__lieuxRDV__switch__item"} onClick={() => { setProdSelected(false) }}>Lieux de vente</label>
            <label className={prodSelected ? "step__services__lieuxRDV__switch__item step__services__lieuxRDV__switch__item--selected" : "step__services__lieuxRDV__switch__item"} onClick={() => { setProdSelected(true) }}>Lieux de production</label>
        </div>
        <br></br>
        <MapContainer center={[36.151988, 4.795080]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.google.com/intl/en-GB_ALL/permissions/geoguidelines/">Google Maps</a>'
                url="https://mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            //url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                prodSelected ? data.prod.map((point, index) => {
                    return <Marker key={index} position={[point.lat, point.lng]} eventHandlers={{
                        click: (e) => {
                            handleChanges(e.latlng);
                        }
                    }}>
                    </Marker>
                }) :
                    data.vente.map((point, index) => {
                        return <Marker key={index} position={[point.lat, point.lng]} eventHandlers={{
                            click: (e) => {
                                handleChanges(e.latlng);
                            }
                        }}>
                        </Marker>
                    })
            }
        </MapContainer>
    </div>
}

function RDVjour({ data, handleChanges }) {
    return <div className="step__services__horairesRDV__plages__day">
        <input type="checkbox" name="dayName" value="Bike"></input>
            <label for="dayName">SAMEDI</label>
    </div>
}

function HorairesRDV({ data, handleChanges }) {
    return <div className="step__services__horairesRDV">
        <div className="step__services__horairesRDV__params">
            <label>Heure de début</label>
            <label>Heure de fin</label>
            <label>Durrée entre les rendez vous</label>
            <input className="input__text services__horairesRDV__input__text" type="text" placeholder="00:00"></input>
            <input className="input__text services__horairesRDV__input__text" type="text" placeholder="00:00"></input>
            <input className="input__text services__horairesRDV__input__text" type="text" placeholder="00:00"></input>
        </div>
        <br></br>
        <div className="step__services__horairesRDV__plages">
            <RDVjour></RDVjour>
            <RDVjour></RDVjour>
            <RDVjour></RDVjour>
            <RDVjour></RDVjour>
            <RDVjour></RDVjour>
            <RDVjour></RDVjour>
            <RDVjour></RDVjour>
        </div>
    </div>
}

function RDV({ data, handleChanges }) {

    function handlePositionClick(data) {
        console.log(data);
    }
    return <div className="step__services__commande">
        <div>
            <h1 className="step__subTitle">1. Lieux</h1>
            <LieuxRDV data={mapLieuxRDVpositions(lll)} handleChanges={handlePositionClick}></LieuxRDV>
            <br></br>
            <h1 className="step__subTitle">2. Horaires</h1>
            <HorairesRDV></HorairesRDV>
            <h1 className="step__subTitle">3. Motifs</h1>
        </div>
    </div>
}
function Services({ data, handleChanges }) {
    const [commandeSelected, setCommandeSelected] = useState(false);
    const [rdvSelected, setRdvSelected] = useState(false);
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
        {commandeSelected ? <Commande /> : <br></br>}
        <div className={rdvSelected ? "step__option step__option--selected" : "step__option"} onClick={() => setRdvSelected(!rdvSelected)}>
            <img className='step__option__icon' src={rdv} alt="rendez vous" />
            <div className='step__option__data'>
                <h2 className='step__option__info__title'>Rendez vous</h2>
                <p className='step__option__info__description'>Mettre en place un système de prise de rendez vous avec vos clients, cela vous permet d'organiser et gérer vos planings avec vos clients</p>
            </div>
        </div>
        {rdvSelected ? <RDV /> : <br></br>}
    </div>
}

export default Services;