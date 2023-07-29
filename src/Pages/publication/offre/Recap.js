import './Recap.css';
import sect from './../../../Assets/images/icons/filterBar/secteurs.png'
import production from './../../../Assets/images/icons/filterBar/production.png';
import consomation from './../../../Assets/images/icons/filterBar/consomation.png';
import { getSecteur } from '../../../Utils/Secteurs';
import Countries from '../../../Utils/Countries';
import durable from './../../../Assets/images/icons/filterBar/durable.png';
import nonDurable from './../../../Assets/images/icons/filterBar/non-durable.png';

import etranger from '../../../Assets/images/icons/filterBar/etranger.png';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { useState, useRef, useEffect } from 'react';
import pin from './../../../Assets/images/icons/filterBar/placeholder.png'
import store from '../../../Assets/images/store.png';
import SelectLieu from '../../../Components/filterBar/SelectLieu/SelectLieu';
import productImage from './../../../Assets/images/icons/annonce/product.jpg';


let testData = {
    "secteur": { id: 6, new: undefined },
    "origine": {
        origine: "ETR",//DZ, ETR
        pays: 100
    },
    "durabilite": "D",
    "type": "P",
    "details": {
        title: "Titre de l'annonce",
        brand: undefined,
        description: "la déscription du bien iezjf oiej oiezj oijeoi jez l,sndlnd lksjdn gn fdlg jfds jg",
        links: [
            {
                "id": 0,
                "name": "page facebook",
                "url": "https://www.facebook.com/pagefacebook",
                "icon": "/static/media/facebook.01a470d813915c298403.png"
            },
            {
                "id": 1,
                "name": "youtube chanle",
                "url": "https://www.youtube.com",
                "icon": "/static/media/youtube.b4f2b64af1b614ce26dc.png"
            }
        ],
        email: "saber96aissaoui@gmail.com",
        phone: "0617520857"
    },
    "localisations": {
        "lieuxProduction": [
            {
                "id": 110,
                "name": "Aïn Taghrout",
                "wilaya": "Bordj Bou Arreridj",
                "wilayaNumber": 34,
                "latLng": [
                    36.130889,
                    5.070969
                ],
                "points": [
                    {
                        "id": 2,
                        "lat": 36.13066543137375,
                        "lng": 5.076885223388673
                    }
                ]
            },
            {
                "id": 321,
                "name": "Bir Kasdali",
                "wilaya": "Bordj Bou Arreridj",
                "wilayaNumber": 34,
                "latLng": [
                    36.144327,
                    5.025075
                ],
                "points": [
                    {
                        "id": 1,
                        "lat": 36.14536058467179,
                        "lng": 5.024700164794922
                    }
                ]
            },
            {
                "id": 848,
                "name": "Khelil",
                "wilaya": "Bordj Bou Arreridj",
                "wilayaNumber": 34,
                "latLng": [
                    36.177172,
                    5.023998
                ],
                "points": [
                    {
                        "id": 3,
                        "lat": 36.17571260762722,
                        "lng": 5.029163360595704
                    }
                ]
            }
        ],
        "lieuxVente": {
            "lieux": [
                {
                    "id": 370,
                    "name": "Bougaa",
                    "wilaya": "Sétif",
                    "wilayaNumber": 19,
                    "latLng": [
                        36.334489,
                        5.092889
                    ],
                    "points": [
                        {
                            "point": {
                                "id": 4,
                                "lat": 36.33351952685382,
                                "lng": 5.090103149414063
                            },
                            "info": {
                                "nom": "Aissaoui saber",
                                "horaires": [
                                    [],
                                    [
                                        {
                                            "id": 0,
                                            "start": "08:00",
                                            "end": "12:00"
                                        },
                                        {
                                            "id": 1,
                                            "start": "13:00",
                                            "end": "17:00"
                                        }
                                    ],
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
                    "id": 1182,
                    "name": "Ras El Oued",
                    "wilaya": "Bordj Bou Arreridj",
                    "wilayaNumber": 34,
                    "latLng": [
                        35.942882,
                        5.042036
                    ],
                    "points": [
                        {
                            "point": {
                                "id": 7,
                                "lat": 35.94132391854179,
                                "lng": 5.031909942626954
                            },
                            "info": {
                                "nom": "",
                                "horaires": [
                                    [],
                                    [],
                                    [],
                                    [
                                        {
                                            "id": 2,
                                            "start": "08:00",
                                            "end": "18:00"
                                        }
                                    ],
                                    [],
                                    [],
                                    []
                                ]
                            }
                        }
                    ]
                }
            ],
            "storeLink": "https://www.prodabri.com"
        }
    },
    "services": {
        "commande": {
            "retrait": false,
            "livraison": false,
            "tarifs": [],
            "conditions": []
        },
        "rdv": [],
        "livraison": null
    },
    "media": {
        "images": [],
        "videos": []
    }
};

function Recapitulatif({ data }) {
    useEffect(() => {
        const L = require("leaflet");

        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
            iconUrl: require("leaflet/dist/images/marker-icon.png"),
            shadowUrl: require("leaflet/dist/images/marker-shadow.png")
        });
    }, []);

    const [selectedProdVille, setSelectedProdVille] = useState(null);
    const [selectedVenteVille, setSelectedVenteVille] = useState(null);

    const prodMapRef = useRef();
    const venteMapRef = useRef();

    function selectProdVille(ville){
        if (ville.id !== selectedProdVille?.id){
            setSelectedProdVille(ville);
            prodMapRef.current.flyTo(ville.latLng, 13);
        }else{
            setSelectedProdVille(null);
            prodMapRef.current.flyTo([28.889515, 2.485352], 5);
        }
    }
    function selectVenteVille(ville){
        if (ville.id !== selectedVenteVille?.id){
            setSelectedVenteVille(ville);
            venteMapRef.current.flyTo(ville.latLng, 13);
        }else{
            setSelectedVenteVille(null);
            venteMapRef.current.flyTo([28.889515, 2.485352], 5);
        }
    }

    return <div className="step step__recap">
        <div className="step__recap__header">
            <h1 className="step__title">Sécteur</h1>
            <label className="step__recap__modifier">Modifier</label>
        </div>
        <div className="step__recap__branche">
            <img className='step__secteurs__branche__icon' src={getSecteur(testData.secteur.id).fr.icon} alt="secteur" />
            <label className='step__recap__branche__name'>{getSecteur(testData.secteur.id).fr.text}</label>
        </div>
        <div className="step__recap__header">
            <h1 className="step__title">Type</h1>
            <label className="step__recap__modifier">Modifier</label>
        </div>
        <div className="step__recap__type">
            <img className='step__secteurs__branche__icon' src={testData.type === "C" ? consomation : production} alt="secteur" />
            <label className='step__recap__branche__name'>{testData.type === "C" ? "Bien de consomation" : "Bien de production"}</label>
        </div>
        {
            testData.type === "CP" ? <div className="step__recap__type">
                <img className='step__secteurs__branche__icon' src={consomation} alt="secteur" />
                <label className='step__recap__branche__name'>Bien de consomation</label>
            </div> : ""
        }
        <div className="step__recap__header">
            <h1 className="step__title">Origine</h1>
            <label className="step__recap__modifier">Modifier</label>
        </div>
        <div className="step__recap__origine">
            <img className='step__recap__origine__icon' src={testData.origine.origine !== "DZ" ? Countries.fr[testData.origine.pays].icon : Countries.fr[3].icon} alt="secteur" />
            <label className='step__recap__branche__name'>{testData.origine.origine === "DZ" ? "Produit Algérien" : "Produit étranger"}</label>
            <label className='step__recap__origine__country'>{testData.origine.origine === "DZ" ? "Algérie" : Countries.fr[testData.origine.pays].text}</label>
        </div>
        <div className="step__recap__header">
            <h1 className="step__title">Durabilité</h1>
            <label className="step__recap__modifier">Modifier</label>
        </div>
        <div className="step__recap__durabilite">
            <img className='step__secteurs__branche__icon' src={testData.durabilite === "D" ? durable : nonDurable} alt="secteur" />
            <label className='step__recap__branche__name'>{testData.durabilite === "D" ? "Durable" : "Non durable"}</label>
        </div>
        <div className="step__recap__header">
            <h1 className="step__title">Détails</h1>
            <label className="step__recap__modifier">Modifier</label>
        </div>
        <div className="step__recap__details">
            <h2 className='step__recap__details__title'>Titre</h2>
            <p className='step__recap__details__text'>{testData.details.title}</p>
            <h2 className='step__recap__details__title'>Marque</h2>
            <p className='step__recap__details__text'>{testData.details.brand === undefined ? "" : testData.details.brand}</p>
            <h2 className='step__recap__details__title'>description</h2>
            <p className='step__recap__details__text'>{testData.details.description}</p>
            <h2 className='step__recap__details__title'>Liens</h2>
            {
                testData.details.links.map((link, index) => {
                    return <div key={index} className='step__recap__details__link'>
                        <img className='step__recap__details__link__icon' src={link.icon} alt="lien"></img>
                        <label className='step__recap__details__link__title'>{link.name}</label>
                        <p className='step__recap__details__link__url'>{link.url}</p>
                    </div>
                })
            }
        </div>
        <div className="step__recap__header">
            <h1 className="step__title">Emplacements</h1>
            <label className="step__recap__modifier">Modifier</label>
        </div>
        <h2 className='step__recap__details__title'>Lieux de production ({testData.localisations.lieuxProduction.length} Villes)</h2>
        <div className='recap__lieux'>
            <div className='recap__lieux__villes'>
                {
                    testData.localisations.lieuxProduction.map((lieu, index) => {
                        return <div key={index} className={selectedProdVille?.id === lieu.id ? 'recap__lieux__ville--selected' : 'recap__lieux__ville'} onClick={()=>{selectProdVille(lieu)}}>
                            <img className='recap__lieux__ville__icon' alt='pin' src={pin}></img>
                            <label className='recap__lieux__ville__commune'>{lieu.name} ({lieu.points.length} lieux)</label>
                            <label className='recap__lieux__ville__wilaya'>{lieu.wilaya}</label>
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
                {
                    selectedProdVille?.points?.map((point, index)=>{
                        return <Marker key={index} position={[point.lat, point.lng]}></Marker>
                    })
                }
                
            </MapContainer>
        </div>
        <h2 className='step__recap__details__title'>Lieux de vente ({testData.localisations.lieuxVente.lieux.length} Villes)</h2>
        {
            testData.localisations.lieuxVente.storeLink !== undefined ? 
            <div className='step__recap__lieux__store'>
                <img className='step__recap__lieux__store__icon' src={store} alt="store"></img>
                <label className='step__recap__lieux__store__title'>Boutique en ligne</label>
                <p className='step__recap__lieux__store__url'>{testData.localisations.lieuxVente.storeLink}</p>
            </div> : ""
        }
        <div className='recap__lieux'>
            <div className='recap__lieux__villes'>
                {
                    testData.localisations.lieuxVente.lieux.map((lieu, index) => {
                        return <div className={selectedVenteVille?.id === lieu.id ? 'recap__lieux__ville--selected' : 'recap__lieux__ville'} onClick={()=>{selectVenteVille(lieu)}}>
                            <img className='recap__lieux__ville__icon' alt='pin' src={pin}></img>
                            <label className='recap__lieux__ville__commune'>{lieu.name} ({lieu.points.length} lieux)</label>
                            <label className='recap__lieux__ville__wilaya'>{lieu.wilaya}</label>
                        </div>
                    })
                }
            </div>
            <MapContainer ref={venteMapRef} center={[28.889515, 2.485352]} zoom={5} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.google.com/intl/en-GB_ALL/permissions/geoguidelines/">Google Maps</a>'
                    url="https://mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                //url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    selectedVenteVille?.points?.map((point, index)=>{
                        return <Marker key={index} position={[point.point.lat, point.point.lng]}></Marker>
                    })
                }
            </MapContainer>
        </div>
        <h2 className='step__recap__details__title'>Lieux de livraison (4 Villes)</h2>
        <div style={{ width: "40%", margin: "10px 0px" }}>
            {data.services.livraison === null ? <></> : <SelectLieu readOnly={true} title={"Lieux de livraison"} data={data.services.livraison}></SelectLieu>}
        </div>
        <div className="step__recap__header">
            <h1 className="step__title">Média</h1>
            <label className="step__recap__modifier">Modifier</label>
        </div>
        <h2 className='step__recap__details__title'>Images (10 / 10)</h2>
        <div className="step__recap__media__grid">
            <div className="step__recap__media__image step__recap__media__image--main" style={{ backgroundImage: `url(${productImage})` }}></div>
            <div className="step__recap__media__image" style={{ backgroundImage: `url(${productImage})` }}></div>
            <div className="step__recap__media__image" style={{ backgroundImage: `url(${productImage})` }}></div>
            <div className="step__recap__media__image" style={{ backgroundImage: `url(${productImage})` }}></div>
            <div className="step__recap__media__image" style={{ backgroundImage: `url(${productImage})` }}></div>
            <div className="step__recap__media__image" style={{ backgroundImage: `url(${productImage})` }}></div>
            <div className="step__recap__media__image" style={{ backgroundImage: `url(${productImage})` }}></div>
            <div className="step__recap__media__image" style={{ backgroundImage: `url(${productImage})` }}></div>
            <div className="step__recap__media__image" style={{ backgroundImage: `url(${productImage})` }}></div>
            <div className="step__recap__media__image" style={{ backgroundImage: `url(${productImage})` }}></div>
        </div>
        <h2 className='step__recap__details__title'>Vidéo (0 / 1)</h2>
        <div className="step__media__grid">
            <div className="step__recap__media__image"></div>
        </div>
    </div>

}
export default Recapitulatif;