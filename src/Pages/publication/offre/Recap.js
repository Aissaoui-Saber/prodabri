import './Recap.css';
import sect from './../../../Assets/images/icons/filterBar/secteurs.png'
import production from './../../../Assets/images/icons/filterBar/production.png';
import consomation from './../../../Assets/images/icons/filterBar/consomation.png';
import { getSecteur } from '../../../Utils/Secteurs';
import Countries from '../../../Utils/Countries';
import durable from './../../../Assets/images/icons/filterBar/durable.png';
import nonDurable from './../../../Assets/images/icons/filterBar/non-durable.png';
import retrait from './../../../Assets/images/icons/pickup.png';
import livraison from './../../../Assets/images/icons/delivery.png';
import units from '../../../Utils/Units';
import RDVjour from './services/rdv/RDVjour';

import etranger from '../../../Assets/images/icons/filterBar/etranger.png';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { useState, useRef, useEffect } from 'react';
import pin from './../../../Assets/images/icons/filterBar/placeholder.png'
import timePin from './../../../Assets/images/icons/time-pin.png';

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
            "retrait": true,
            "livraison": false,
            "tarifs": [
                {
                    "id": 1,
                    "prix": "100",
                    "unite": 20,
                    "quantite": 1
                },
                {
                    "id": 2,
                    "prix": "180",
                    "unite": 20,
                    "quantite": "2"
                },
                {
                    "id": 3,
                    "prix": "400",
                    "unite": 20,
                    "quantite": "5"
                }
            ],
            "conditions": [
                {
                    "id": 4,
                    "value": "paiement en especes uniquemenet"
                },
                {
                    "id": 5,
                    "value": "garantie 3 jours"
                }
            ]
        },
        "rdv": [
            {
                "point": {
                    "id": 12,
                    "lat": 35.38751055764283,
                    "lng": 5.368194580078126,
                    "rdv": true
                },
                "timeBoundary": {
                    "begin": "08:00",
                    "end": "17:00",
                    "duration": "00:30"
                },
                "horaires": [
                    {
                        "enabled": false,
                        "name": "SAMEDI",
                        "times": [
                            {
                                "enabled": false,
                                "time": "08:00"
                            },
                            {
                                "enabled": false,
                                "time": "08:30"
                            },
                            {
                                "enabled": false,
                                "time": "09:00"
                            },
                            {
                                "enabled": false,
                                "time": "09:30"
                            },
                            {
                                "enabled": false,
                                "time": "10:00"
                            },
                            {
                                "enabled": false,
                                "time": "10:30"
                            },
                            {
                                "enabled": false,
                                "time": "11:00"
                            },
                            {
                                "enabled": false,
                                "time": "11:30"
                            },
                            {
                                "enabled": false,
                                "time": "12:00"
                            },
                            {
                                "enabled": false,
                                "time": "12:30"
                            },
                            {
                                "enabled": false,
                                "time": "13:00"
                            },
                            {
                                "enabled": false,
                                "time": "13:30"
                            },
                            {
                                "enabled": false,
                                "time": "14:00"
                            },
                            {
                                "enabled": false,
                                "time": "14:30"
                            },
                            {
                                "enabled": false,
                                "time": "15:00"
                            },
                            {
                                "enabled": false,
                                "time": "15:30"
                            },
                            {
                                "enabled": false,
                                "time": "16:00"
                            },
                            {
                                "enabled": false,
                                "time": "16:30"
                            }
                        ],
                        "index": 0
                    },
                    {
                        "enabled": true,
                        "name": "DIMANCHE",
                        "times": [
                            {
                                "enabled": true,
                                "time": "08:00"
                            },
                            {
                                "enabled": true,
                                "time": "08:30"
                            },
                            {
                                "enabled": true,
                                "time": "09:00"
                            },
                            {
                                "enabled": true,
                                "time": "09:30"
                            },
                            {
                                "enabled": true,
                                "time": "10:00"
                            },
                            {
                                "enabled": true,
                                "time": "10:30"
                            },
                            {
                                "enabled": true,
                                "time": "11:00"
                            },
                            {
                                "enabled": true,
                                "time": "11:30"
                            },
                            {
                                "enabled": true,
                                "time": "12:00"
                            },
                            {
                                "enabled": true,
                                "time": "12:30"
                            },
                            {
                                "enabled": true,
                                "time": "13:00"
                            },
                            {
                                "enabled": true,
                                "time": "13:30"
                            },
                            {
                                "enabled": true,
                                "time": "14:00"
                            },
                            {
                                "enabled": true,
                                "time": "14:30"
                            },
                            {
                                "enabled": true,
                                "time": "15:00"
                            },
                            {
                                "enabled": true,
                                "time": "15:30"
                            },
                            {
                                "enabled": true,
                                "time": "16:00"
                            },
                            {
                                "enabled": true,
                                "time": "16:30"
                            }
                        ]
                    },
                    {
                        "enabled": true,
                        "name": "LUNDI",
                        "times": [
                            {
                                "enabled": true,
                                "time": "08:00"
                            },
                            {
                                "enabled": true,
                                "time": "08:30"
                            },
                            {
                                "enabled": true,
                                "time": "09:00"
                            },
                            {
                                "enabled": true,
                                "time": "09:30"
                            },
                            {
                                "enabled": true,
                                "time": "10:00"
                            },
                            {
                                "enabled": true,
                                "time": "10:30"
                            },
                            {
                                "enabled": true,
                                "time": "11:00"
                            },
                            {
                                "enabled": true,
                                "time": "11:30"
                            },
                            {
                                "enabled": true,
                                "time": "12:00"
                            },
                            {
                                "enabled": true,
                                "time": "12:30"
                            },
                            {
                                "enabled": true,
                                "time": "13:00"
                            },
                            {
                                "enabled": true,
                                "time": "13:30"
                            },
                            {
                                "enabled": true,
                                "time": "14:00"
                            },
                            {
                                "enabled": true,
                                "time": "14:30"
                            },
                            {
                                "enabled": true,
                                "time": "15:00"
                            },
                            {
                                "enabled": true,
                                "time": "15:30"
                            },
                            {
                                "enabled": true,
                                "time": "16:00"
                            },
                            {
                                "enabled": true,
                                "time": "16:30"
                            }
                        ]
                    },
                    {
                        "enabled": true,
                        "name": "MARDI",
                        "times": [
                            {
                                "enabled": true,
                                "time": "08:00"
                            },
                            {
                                "enabled": true,
                                "time": "08:30"
                            },
                            {
                                "enabled": true,
                                "time": "09:00"
                            },
                            {
                                "enabled": true,
                                "time": "09:30"
                            },
                            {
                                "enabled": true,
                                "time": "10:00"
                            },
                            {
                                "enabled": true,
                                "time": "10:30"
                            },
                            {
                                "enabled": true,
                                "time": "11:00"
                            },
                            {
                                "enabled": true,
                                "time": "11:30"
                            },
                            {
                                "enabled": true,
                                "time": "12:00"
                            },
                            {
                                "enabled": true,
                                "time": "12:30"
                            },
                            {
                                "enabled": true,
                                "time": "13:00"
                            },
                            {
                                "enabled": true,
                                "time": "13:30"
                            },
                            {
                                "enabled": true,
                                "time": "14:00"
                            },
                            {
                                "enabled": true,
                                "time": "14:30"
                            },
                            {
                                "enabled": true,
                                "time": "15:00"
                            },
                            {
                                "enabled": true,
                                "time": "15:30"
                            },
                            {
                                "enabled": true,
                                "time": "16:00"
                            },
                            {
                                "enabled": true,
                                "time": "16:30"
                            }
                        ]
                    },
                    {
                        "enabled": true,
                        "name": "MERCREDI",
                        "times": [
                            {
                                "enabled": true,
                                "time": "08:00"
                            },
                            {
                                "enabled": true,
                                "time": "08:30"
                            },
                            {
                                "enabled": true,
                                "time": "09:00"
                            },
                            {
                                "enabled": true,
                                "time": "09:30"
                            },
                            {
                                "enabled": true,
                                "time": "10:00"
                            },
                            {
                                "enabled": true,
                                "time": "10:30"
                            },
                            {
                                "enabled": true,
                                "time": "11:00"
                            },
                            {
                                "enabled": true,
                                "time": "11:30"
                            },
                            {
                                "enabled": true,
                                "time": "12:00"
                            },
                            {
                                "enabled": true,
                                "time": "12:30"
                            },
                            {
                                "enabled": true,
                                "time": "13:00"
                            },
                            {
                                "enabled": true,
                                "time": "13:30"
                            },
                            {
                                "enabled": true,
                                "time": "14:00"
                            },
                            {
                                "enabled": true,
                                "time": "14:30"
                            },
                            {
                                "enabled": true,
                                "time": "15:00"
                            },
                            {
                                "enabled": true,
                                "time": "15:30"
                            },
                            {
                                "enabled": true,
                                "time": "16:00"
                            },
                            {
                                "enabled": true,
                                "time": "16:30"
                            }
                        ]
                    },
                    {
                        "enabled": true,
                        "name": "JEUDI",
                        "times": [
                            {
                                "enabled": true,
                                "time": "08:00"
                            },
                            {
                                "enabled": true,
                                "time": "08:30"
                            },
                            {
                                "enabled": true,
                                "time": "09:00"
                            },
                            {
                                "enabled": true,
                                "time": "09:30"
                            },
                            {
                                "enabled": true,
                                "time": "10:00"
                            },
                            {
                                "enabled": true,
                                "time": "10:30"
                            },
                            {
                                "enabled": true,
                                "time": "11:00"
                            },
                            {
                                "enabled": true,
                                "time": "11:30"
                            },
                            {
                                "enabled": true,
                                "time": "12:00"
                            },
                            {
                                "enabled": true,
                                "time": "12:30"
                            },
                            {
                                "enabled": true,
                                "time": "13:00"
                            },
                            {
                                "enabled": true,
                                "time": "13:30"
                            },
                            {
                                "enabled": true,
                                "time": "14:00"
                            },
                            {
                                "enabled": true,
                                "time": "14:30"
                            },
                            {
                                "enabled": true,
                                "time": "15:00"
                            },
                            {
                                "enabled": true,
                                "time": "15:30"
                            },
                            {
                                "enabled": true,
                                "time": "16:00"
                            },
                            {
                                "enabled": true,
                                "time": "16:30"
                            }
                        ]
                    },
                    {
                        "enabled": false,
                        "name": "VENDREDI",
                        "times": [
                            {
                                "enabled": false,
                                "time": "08:00"
                            },
                            {
                                "enabled": false,
                                "time": "08:30"
                            },
                            {
                                "enabled": false,
                                "time": "09:00"
                            },
                            {
                                "enabled": false,
                                "time": "09:30"
                            },
                            {
                                "enabled": false,
                                "time": "10:00"
                            },
                            {
                                "enabled": false,
                                "time": "10:30"
                            },
                            {
                                "enabled": false,
                                "time": "11:00"
                            },
                            {
                                "enabled": false,
                                "time": "11:30"
                            },
                            {
                                "enabled": false,
                                "time": "12:00"
                            },
                            {
                                "enabled": false,
                                "time": "12:30"
                            },
                            {
                                "enabled": false,
                                "time": "13:00"
                            },
                            {
                                "enabled": false,
                                "time": "13:30"
                            },
                            {
                                "enabled": false,
                                "time": "14:00"
                            },
                            {
                                "enabled": false,
                                "time": "14:30"
                            },
                            {
                                "enabled": false,
                                "time": "15:00"
                            },
                            {
                                "enabled": false,
                                "time": "15:30"
                            },
                            {
                                "enabled": false,
                                "time": "16:00"
                            },
                            {
                                "enabled": false,
                                "time": "16:30"
                            }
                        ],
                        "index": 6
                    }
                ],
                "motifs": [
                    {
                        "id": 1,
                        "value": "renseignements"
                    },
                    {
                        "id": 2,
                        "value": "inscription"
                    }
                ],
                "conditions": [
                    {
                        "id": 3,
                        "value": "arrivé 15 minutes avant le rendez vous"
                    }
                ]
            },
            {
                "point": {
                    "id": 9,
                    "lat": 35.24884347803403,
                    "lng": 6.350269317626953,
                    "rdv": true
                },
                "timeBoundary": {
                    "begin": "08:00",
                    "end": "17:00",
                    "duration": "00:30"
                },
                "horaires": [
                    {
                        "enabled": false,
                        "name": "SAMEDI",
                        "times": [
                            {
                                "enabled": false,
                                "time": "08:00"
                            },
                            {
                                "enabled": false,
                                "time": "08:30"
                            },
                            {
                                "enabled": false,
                                "time": "09:00"
                            },
                            {
                                "enabled": false,
                                "time": "09:30"
                            },
                            {
                                "enabled": false,
                                "time": "10:00"
                            },
                            {
                                "enabled": false,
                                "time": "10:30"
                            },
                            {
                                "enabled": false,
                                "time": "11:00"
                            },
                            {
                                "enabled": false,
                                "time": "11:30"
                            },
                            {
                                "enabled": false,
                                "time": "12:00"
                            },
                            {
                                "enabled": false,
                                "time": "12:30"
                            },
                            {
                                "enabled": false,
                                "time": "13:00"
                            },
                            {
                                "enabled": false,
                                "time": "13:30"
                            },
                            {
                                "enabled": false,
                                "time": "14:00"
                            },
                            {
                                "enabled": false,
                                "time": "14:30"
                            },
                            {
                                "enabled": false,
                                "time": "15:00"
                            },
                            {
                                "enabled": false,
                                "time": "15:30"
                            },
                            {
                                "enabled": false,
                                "time": "16:00"
                            },
                            {
                                "enabled": false,
                                "time": "16:30"
                            }
                        ],
                        "index": 0
                    },
                    {
                        "enabled": true,
                        "name": "DIMANCHE",
                        "times": [
                            {
                                "enabled": true,
                                "time": "08:00"
                            },
                            {
                                "enabled": true,
                                "time": "08:30"
                            },
                            {
                                "enabled": true,
                                "time": "09:00"
                            },
                            {
                                "enabled": true,
                                "time": "09:30"
                            },
                            {
                                "enabled": true,
                                "time": "10:00"
                            },
                            {
                                "enabled": true,
                                "time": "10:30"
                            },
                            {
                                "enabled": true,
                                "time": "11:00"
                            },
                            {
                                "enabled": true,
                                "time": "11:30"
                            },
                            {
                                "enabled": true,
                                "time": "12:00"
                            },
                            {
                                "enabled": true,
                                "time": "12:30"
                            },
                            {
                                "enabled": true,
                                "time": "13:00"
                            },
                            {
                                "enabled": true,
                                "time": "13:30"
                            },
                            {
                                "enabled": true,
                                "time": "14:00"
                            },
                            {
                                "enabled": true,
                                "time": "14:30"
                            },
                            {
                                "enabled": true,
                                "time": "15:00"
                            },
                            {
                                "enabled": true,
                                "time": "15:30"
                            },
                            {
                                "enabled": true,
                                "time": "16:00"
                            },
                            {
                                "enabled": true,
                                "time": "16:30"
                            }
                        ]
                    },
                    {
                        "enabled": true,
                        "name": "LUNDI",
                        "times": [
                            {
                                "enabled": true,
                                "time": "08:00"
                            },
                            {
                                "enabled": true,
                                "time": "08:30"
                            },
                            {
                                "enabled": true,
                                "time": "09:00"
                            },
                            {
                                "enabled": true,
                                "time": "09:30"
                            },
                            {
                                "enabled": true,
                                "time": "10:00"
                            },
                            {
                                "enabled": true,
                                "time": "10:30"
                            },
                            {
                                "enabled": true,
                                "time": "11:00"
                            },
                            {
                                "enabled": true,
                                "time": "11:30"
                            },
                            {
                                "enabled": true,
                                "time": "12:00"
                            },
                            {
                                "enabled": true,
                                "time": "12:30"
                            },
                            {
                                "enabled": true,
                                "time": "13:00"
                            },
                            {
                                "enabled": true,
                                "time": "13:30"
                            },
                            {
                                "enabled": true,
                                "time": "14:00"
                            },
                            {
                                "enabled": true,
                                "time": "14:30"
                            },
                            {
                                "enabled": true,
                                "time": "15:00"
                            },
                            {
                                "enabled": true,
                                "time": "15:30"
                            },
                            {
                                "enabled": true,
                                "time": "16:00"
                            },
                            {
                                "enabled": true,
                                "time": "16:30"
                            }
                        ]
                    },
                    {
                        "enabled": true,
                        "name": "MARDI",
                        "times": [
                            {
                                "enabled": true,
                                "time": "08:00"
                            },
                            {
                                "enabled": true,
                                "time": "08:30"
                            },
                            {
                                "enabled": true,
                                "time": "09:00"
                            },
                            {
                                "enabled": true,
                                "time": "09:30"
                            },
                            {
                                "enabled": true,
                                "time": "10:00"
                            },
                            {
                                "enabled": true,
                                "time": "10:30"
                            },
                            {
                                "enabled": true,
                                "time": "11:00"
                            },
                            {
                                "enabled": true,
                                "time": "11:30"
                            },
                            {
                                "enabled": true,
                                "time": "12:00"
                            },
                            {
                                "enabled": true,
                                "time": "12:30"
                            },
                            {
                                "enabled": true,
                                "time": "13:00"
                            },
                            {
                                "enabled": true,
                                "time": "13:30"
                            },
                            {
                                "enabled": true,
                                "time": "14:00"
                            },
                            {
                                "enabled": true,
                                "time": "14:30"
                            },
                            {
                                "enabled": true,
                                "time": "15:00"
                            },
                            {
                                "enabled": true,
                                "time": "15:30"
                            },
                            {
                                "enabled": true,
                                "time": "16:00"
                            },
                            {
                                "enabled": true,
                                "time": "16:30"
                            }
                        ]
                    },
                    {
                        "enabled": true,
                        "name": "MERCREDI",
                        "times": [
                            {
                                "enabled": true,
                                "time": "08:00"
                            },
                            {
                                "enabled": true,
                                "time": "08:30"
                            },
                            {
                                "enabled": true,
                                "time": "09:00"
                            },
                            {
                                "enabled": true,
                                "time": "09:30"
                            },
                            {
                                "enabled": true,
                                "time": "10:00"
                            },
                            {
                                "enabled": true,
                                "time": "10:30"
                            },
                            {
                                "enabled": true,
                                "time": "11:00"
                            },
                            {
                                "enabled": true,
                                "time": "11:30"
                            },
                            {
                                "enabled": true,
                                "time": "12:00"
                            },
                            {
                                "enabled": true,
                                "time": "12:30"
                            },
                            {
                                "enabled": true,
                                "time": "13:00"
                            },
                            {
                                "enabled": true,
                                "time": "13:30"
                            },
                            {
                                "enabled": true,
                                "time": "14:00"
                            },
                            {
                                "enabled": true,
                                "time": "14:30"
                            },
                            {
                                "enabled": true,
                                "time": "15:00"
                            },
                            {
                                "enabled": true,
                                "time": "15:30"
                            },
                            {
                                "enabled": true,
                                "time": "16:00"
                            },
                            {
                                "enabled": true,
                                "time": "16:30"
                            }
                        ]
                    },
                    {
                        "enabled": true,
                        "name": "JEUDI",
                        "times": [
                            {
                                "enabled": true,
                                "time": "08:00"
                            },
                            {
                                "enabled": true,
                                "time": "08:30"
                            },
                            {
                                "enabled": true,
                                "time": "09:00"
                            },
                            {
                                "enabled": true,
                                "time": "09:30"
                            },
                            {
                                "enabled": true,
                                "time": "10:00"
                            },
                            {
                                "enabled": true,
                                "time": "10:30"
                            },
                            {
                                "enabled": true,
                                "time": "11:00"
                            },
                            {
                                "enabled": true,
                                "time": "11:30"
                            },
                            {
                                "enabled": true,
                                "time": "12:00"
                            },
                            {
                                "enabled": true,
                                "time": "12:30"
                            },
                            {
                                "enabled": true,
                                "time": "13:00"
                            },
                            {
                                "enabled": true,
                                "time": "13:30"
                            },
                            {
                                "enabled": true,
                                "time": "14:00"
                            },
                            {
                                "enabled": true,
                                "time": "14:30"
                            },
                            {
                                "enabled": true,
                                "time": "15:00"
                            },
                            {
                                "enabled": true,
                                "time": "15:30"
                            },
                            {
                                "enabled": true,
                                "time": "16:00"
                            },
                            {
                                "enabled": true,
                                "time": "16:30"
                            }
                        ]
                    },
                    {
                        "enabled": false,
                        "name": "VENDREDI",
                        "times": [
                            {
                                "enabled": false,
                                "time": "08:00"
                            },
                            {
                                "enabled": false,
                                "time": "08:30"
                            },
                            {
                                "enabled": false,
                                "time": "09:00"
                            },
                            {
                                "enabled": false,
                                "time": "09:30"
                            },
                            {
                                "enabled": false,
                                "time": "10:00"
                            },
                            {
                                "enabled": false,
                                "time": "10:30"
                            },
                            {
                                "enabled": false,
                                "time": "11:00"
                            },
                            {
                                "enabled": false,
                                "time": "11:30"
                            },
                            {
                                "enabled": false,
                                "time": "12:00"
                            },
                            {
                                "enabled": false,
                                "time": "12:30"
                            },
                            {
                                "enabled": false,
                                "time": "13:00"
                            },
                            {
                                "enabled": false,
                                "time": "13:30"
                            },
                            {
                                "enabled": false,
                                "time": "14:00"
                            },
                            {
                                "enabled": false,
                                "time": "14:30"
                            },
                            {
                                "enabled": false,
                                "time": "15:00"
                            },
                            {
                                "enabled": false,
                                "time": "15:30"
                            },
                            {
                                "enabled": false,
                                "time": "16:00"
                            },
                            {
                                "enabled": false,
                                "time": "16:30"
                            }
                        ],
                        "index": 6
                    }
                ],
                "motifs": [
                    {
                        "id": 5,
                        "value": "renseignements"
                    },
                    {
                        "id": 6,
                        "value": "inscription"
                    }
                ],
                "conditions": [
                    {
                        "id": 7,
                        "value": "paiement en especes uniquement"
                    }
                ]
            }
        ],
        "livraison": [
            {
                "id": 43,
                "name": "Aïn Djasser",
                "checked": true,
                "latLng": [
                    35.860985,
                    6.003773
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 124,
                "name": "Aïn Touta",
                "checked": true,
                "latLng": [
                    35.380502,
                    5.901918
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 127,
                "name": "Aïn Yagout",
                "checked": true,
                "latLng": [
                    35.777377,
                    6.415763
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 178,
                "name": "Arris",
                "checked": true,
                "latLng": [
                    35.256672,
                    6.344573
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 186,
                "name": "Azil Abdelkader",
                "checked": true,
                "latLng": [
                    35.367315,
                    5.169212
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 205,
                "name": "Barika",
                "checked": true,
                "latLng": [
                    35.387996,
                    5.370293
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 207,
                "name": "Batna",
                "checked": true,
                "latLng": [
                    35.54476,
                    6.159957
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 257,
                "name": "Beni Foudhala El Hakania",
                "checked": true,
                "latLng": [
                    35.352133,
                    6.017697
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 328,
                "name": "Bitam",
                "checked": true,
                "latLng": [
                    35.307667,
                    5.374421
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 400,
                "name": "Boulhilat",
                "checked": true,
                "latLng": [
                    35.726636,
                    6.662441
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 403,
                "name": "Boumagueur",
                "checked": true,
                "latLng": [
                    35.515055,
                    5.562243
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 405,
                "name": "Boumia",
                "checked": true,
                "latLng": [
                    32.730377,
                    -5.098841
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 427,
                "name": "Bouzina",
                "checked": true,
                "latLng": [
                    35.264182,
                    6.09793
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 454,
                "name": "Chemora",
                "checked": true,
                "latLng": [
                    35.66859,
                    6.642776
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 468,
                "name": "Chir",
                "checked": true,
                "latLng": [
                    35.214693,
                    6.097368
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 528,
                "name": "Djerma",
                "checked": true,
                "latLng": [
                    35.66344,
                    6.307326
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 529,
                "name": "Djezar",
                "checked": true,
                "latLng": [
                    35.511649,
                    5.268539
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 621,
                "name": "El Hassi",
                "checked": true,
                "latLng": [
                    35.81474,
                    5.941263
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 643,
                "name": "El Madher",
                "checked": true,
                "latLng": [
                    35.627598,
                    6.373369
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 699,
                "name": "Fesdis",
                "checked": true,
                "latLng": [
                    35.617799,
                    6.246801
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 706,
                "name": "Foum Toub",
                "checked": true,
                "latLng": [
                    35.403514,
                    6.549769
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 718,
                "name": "Ghassira",
                "checked": true,
                "latLng": [
                    35.100609,
                    6.227184
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 721,
                "name": "Gosbat",
                "checked": true,
                "latLng": [
                    35.648015,
                    5.459786
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 736,
                "name": "Guigba",
                "checked": true,
                "latLng": [
                    35.734181,
                    5.589464
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 799,
                "name": "Hidoussa",
                "checked": true,
                "latLng": [
                    35.527757,
                    5.937777
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 807,
                "name": "Ichmoul",
                "checked": true,
                "latLng": [
                    35.310976,
                    6.508935
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 824,
                "name": "Inoughissen",
                "checked": true,
                "latLng": [
                    35.304395,
                    6.54905
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 862,
                "name": "Kimmel",
                "checked": true,
                "latLng": [
                    35.217418,
                    6.54486
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 869,
                "name": "Ksar Bellezma",
                "checked": true,
                "latLng": [
                    35.676606,
                    5.903168
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 884,
                "name": "Larbaâ",
                "checked": true,
                "latLng": [
                    35.353717,
                    6.138008
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 892,
                "name": "Lazrou",
                "checked": true,
                "latLng": [
                    35.842834,
                    6.216467
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 894,
                "name": "Lemsane",
                "checked": true,
                "latLng": [
                    35.656104,
                    5.798637
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 901,
                "name": "Maafa",
                "checked": true,
                "latLng": [
                    35.266872,
                    5.900632
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 934,
                "name": "M'Doukel",
                "checked": true,
                "latLng": [
                    35.126808,
                    5.182205
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 961,
                "name": "Menaa",
                "checked": true,
                "latLng": [
                    35.176811,
                    6.000775
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 971,
                "name": "Merouana",
                "checked": true,
                "latLng": [
                    35.632579,
                    5.910336
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 1029,
                "name": "N'Gaous",
                "checked": true,
                "latLng": [
                    35.555783,
                    5.610346
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 1044,
                "name": "Oued Chaaba",
                "checked": true,
                "latLng": [
                    35.505979,
                    6.077772
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 1058,
                "name": "Oued El Ma",
                "checked": true,
                "latLng": [
                    35.643757,
                    5.996889
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 1079,
                "name": "Oued Taga",
                "checked": true,
                "latLng": [
                    35.431302,
                    6.41416
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 1096,
                "name": "Ouled Ammar",
                "checked": true,
                "latLng": [
                    35.462569,
                    5.156683
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 1098,
                "name": "Ouled Aouf",
                "checked": true,
                "latLng": [
                    35.455492,
                    5.756669
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 1114,
                "name": "Ouled Fadel",
                "checked": true,
                "latLng": [
                    35.483825,
                    6.62471
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 1140,
                "name": "Ouled Sellam",
                "checked": true,
                "latLng": [
                    35.824649,
                    5.882533
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 1145,
                "name": "Ouled Si Slimane",
                "checked": true,
                "latLng": [
                    35.61179,
                    5.632912
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 1167,
                "name": "Ouyoun El Assafir",
                "checked": true,
                "latLng": [
                    35.553585,
                    6.307489
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 1180,
                "name": "Ras El Aioun",
                "checked": true,
                "latLng": [
                    35.67548,
                    5.65053
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 1189,
                "name": "Rahbat",
                "checked": true,
                "latLng": [
                    35.711962,
                    5.65464
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 1227,
                "name": "Sefiane",
                "checked": true,
                "latLng": [
                    35.437779,
                    5.558563
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 1228,
                "name": "Seggana",
                "checked": true,
                "latLng": [
                    35.364873,
                    5.574378
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 1239,
                "name": "Seriana",
                "checked": true,
                "latLng": [
                    35.697682,
                    6.187944
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 1395,
                "name": "Talkhamt",
                "checked": true,
                "latLng": [
                    35.66951,
                    5.784153
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 1423,
                "name": "Taxlent",
                "checked": true,
                "latLng": [
                    35.60513,
                    5.802682
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 1427,
                "name": "Tazoult",
                "checked": true,
                "latLng": [
                    35.483308,
                    6.259512
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 1438,
                "name": "Teniet El Abed",
                "checked": true,
                "latLng": [
                    35.246969,
                    6.189355
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 1463,
                "name": "Tighanimine",
                "checked": true,
                "latLng": [
                    35.168621,
                    6.239218
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 1464,
                "name": "Tigherghar",
                "checked": true,
                "latLng": [
                    35.15931,
                    5.97061
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 1467,
                "name": "Tilatou",
                "checked": true,
                "latLng": [
                    35.328273,
                    5.792528
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 1471,
                "name": "Timgad",
                "checked": true,
                "latLng": [
                    35.494973,
                    6.468169
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 1495,
                "name": "T'Kout",
                "checked": true,
                "latLng": [
                    35.14254,
                    6.305417
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 1516,
                "name": "Zanat El Baida",
                "checked": true,
                "latLng": [
                    35.807884,
                    6.133687
                ],
                "wilaya": {
                    "name": "Batna",
                    "number": 5
                }
            },
            {
                "id": 90,
                "name": "Aïn Naga",
                "checked": true,
                "latLng": [
                    34.689011,
                    6.092821
                ],
                "wilaya": {
                    "name": "Biskra",
                    "number": 7
                }
            },
            {
                "id": 129,
                "name": "Ain Zaatout",
                "checked": true,
                "latLng": [
                    35.145687,
                    5.836628
                ],
                "wilaya": {
                    "name": "Biskra",
                    "number": 7
                }
            },
            {
                "id": 327,
                "name": "Biskra",
                "checked": true,
                "latLng": [
                    34.853511,
                    5.7293
                ],
                "wilaya": {
                    "name": "Biskra",
                    "number": 7
                }
            },
            {
                "id": 333,
                "name": "Bordj Ben Azzouz",
                "checked": true,
                "latLng": [
                    34.696376,
                    5.364514
                ],
                "wilaya": {
                    "name": "Biskra",
                    "number": 7
                }
            },
            {
                "id": 355,
                "name": "Bouchagroune",
                "checked": true,
                "latLng": [
                    34.724398,
                    5.466079
                ],
                "wilaya": {
                    "name": "Biskra",
                    "number": 7
                }
            },
            {
                "id": 428,
                "name": "Branis",
                "checked": true,
                "latLng": [
                    34.978772,
                    5.713309
                ],
                "wilaya": {
                    "name": "Biskra",
                    "number": 7
                }
            },
            {
                "id": 461,
                "name": "Chetma",
                "checked": true,
                "latLng": [
                    34.849716,
                    5.788822
                ],
                "wilaya": {
                    "name": "Biskra",
                    "number": 7
                }
            },
            {
                "id": 508,
                "name": "Djemourah",
                "checked": true,
                "latLng": [
                    35.07134,
                    5.84594
                ],
                "wilaya": {
                    "name": "Biskra",
                    "number": 7
                }
            },
            {
                "id": 587,
                "name": "El Feidh",
                "checked": true,
                "latLng": [
                    34.521614,
                    6.522482
                ],
                "wilaya": {
                    "name": "Biskra",
                    "number": 7
                }
            },
            {
                "id": 593,
                "name": "El Ghrous",
                "checked": true,
                "latLng": [
                    34.720074,
                    5.281613
                ],
                "wilaya": {
                    "name": "Biskra",
                    "number": 7
                }
            },
            {
                "id": 604,
                "name": "El Hadjeb",
                "checked": true,
                "latLng": [
                    34.790859,
                    5.597385
                ],
                "wilaya": {
                    "name": "Biskra",
                    "number": 7
                }
            },
            {
                "id": 615,
                "name": "El Haouch",
                "checked": true,
                "latLng": [
                    34.563874,
                    6.046139
                ],
                "wilaya": {
                    "name": "Biskra",
                    "number": 7
                }
            },
            {
                "id": 631,
                "name": "El Kantara",
                "checked": true,
                "latLng": [
                    35.218117,
                    5.710227
                ],
                "wilaya": {
                    "name": "Biskra",
                    "number": 7
                }
            },
            {
                "id": 665,
                "name": "El Mizaraa",
                "checked": true,
                "latLng": [
                    34.721147,
                    6.292956
                ],
                "wilaya": {
                    "name": "Biskra",
                    "number": 7
                }
            },
            {
                "id": 674,
                "name": "El Outaya",
                "checked": true,
                "latLng": [
                    35.03265,
                    5.587235
                ],
                "wilaya": {
                    "name": "Biskra",
                    "number": 7
                }
            },
            {
                "id": 704,
                "name": "Foughala",
                "checked": true,
                "latLng": [
                    34.728614,
                    5.329578
                ],
                "wilaya": {
                    "name": "Biskra",
                    "number": 7
                }
            },
            {
                "id": 856,
                "name": "Khengueut Sidi Nadji",
                "checked": true,
                "latLng": [
                    34.805802,
                    6.706742
                ],
                "wilaya": {
                    "name": "Biskra",
                    "number": 7
                }
            },
            {
                "id": 897,
                "name": "Lichana",
                "checked": true,
                "latLng": [
                    34.724824,
                    5.432332
                ],
                "wilaya": {
                    "name": "Biskra",
                    "number": 7
                }
            },
            {
                "id": 898,
                "name": "Lioua",
                "checked": true,
                "latLng": [
                    34.638416,
                    5.395941
                ],
                "wilaya": {
                    "name": "Biskra",
                    "number": 7
                }
            },
            {
                "id": 936,
                "name": "M'Chouneche",
                "checked": true,
                "latLng": [
                    34.936892,
                    5.989826
                ],
                "wilaya": {
                    "name": "Biskra",
                    "number": 7
                }
            },
            {
                "id": 954,
                "name": "Mekhadma",
                "checked": true,
                "latLng": [
                    34.651833,
                    5.471314
                ],
                "wilaya": {
                    "name": "Biskra",
                    "number": 7
                }
            },
            {
                "id": 993,
                "name": "M'Lili",
                "checked": true,
                "latLng": [
                    34.669335,
                    5.563736
                ],
                "wilaya": {
                    "name": "Biskra",
                    "number": 7
                }
            },
            {
                "id": 1155,
                "name": "Oumache",
                "checked": true,
                "latLng": [
                    34.693678,
                    5.697844
                ],
                "wilaya": {
                    "name": "Biskra",
                    "number": 7
                }
            },
            {
                "id": 1165,
                "name": "Ourlal",
                "checked": true,
                "latLng": [
                    34.655728,
                    5.512298
                ],
                "wilaya": {
                    "name": "Biskra",
                    "number": 7
                }
            },
            {
                "id": 1317,
                "name": "Sidi Okba",
                "checked": true,
                "latLng": [
                    34.750692,
                    5.907745
                ],
                "wilaya": {
                    "name": "Biskra",
                    "number": 7
                }
            },
            {
                "id": 1497,
                "name": "Tolga",
                "checked": true,
                "latLng": [
                    34.72935,
                    5.380581
                ],
                "wilaya": {
                    "name": "Biskra",
                    "number": 7
                }
            },
            {
                "id": 1531,
                "name": "Zribet El Oued",
                "checked": true,
                "latLng": [
                    34.683141,
                    6.498688
                ],
                "wilaya": {
                    "name": "Biskra",
                    "number": 7
                }
            },
            {
                "id": 19,
                "name": "Aïn Abbasa",
                "checked": true,
                "latLng": [
                    36.29604,
                    5.292753
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 22,
                "name": "Aïn Arnat",
                "checked": true,
                "latLng": [
                    36.185347,
                    5.313645
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 23,
                "name": "Aïn Azal",
                "checked": true,
                "latLng": [
                    35.820844,
                    5.510979
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 56,
                "name": "Aïn El Kbira",
                "checked": true,
                "latLng": [
                    36.369522,
                    5.507786
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 79,
                "name": "Aïn Lahdjar",
                "checked": true,
                "latLng": [
                    35.937694,
                    5.536706
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 83,
                "name": "Aïn Legueredje",
                "checked": true,
                "latLng": [
                    36.408921,
                    4.892509
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 94,
                "name": "Aïn Oulmane",
                "checked": true,
                "latLng": [
                    35.921761,
                    5.29431
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 99,
                "name": "Aïn Roua",
                "checked": true,
                "latLng": [
                    36.33413,
                    5.181638
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 102,
                "name": "Aïn Sebt",
                "checked": true,
                "latLng": [
                    36.484764,
                    5.708974
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 144,
                "name": "Aït Naoual Mezada",
                "checked": true,
                "latLng": [
                    36.545045,
                    5.083211
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 148,
                "name": "Aït Tizi",
                "checked": true,
                "latLng": [
                    36.558292,
                    5.129089
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 167,
                "name": "Amoucha",
                "checked": true,
                "latLng": [
                    36.383753,
                    5.415945
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 197,
                "name": "Babour",
                "checked": true,
                "latLng": [
                    36.489625,
                    5.535211
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 209,
                "name": "Bazer Sekhra",
                "checked": true,
                "latLng": [
                    36.065174,
                    5.734733
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 213,
                "name": "Baidha Bordj",
                "checked": true,
                "latLng": [
                    35.89338,
                    5.667815
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 224,
                "name": "Belaa",
                "checked": true,
                "latLng": [
                    36.202279,
                    5.855007
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 246,
                "name": "Beni Aziz",
                "checked": true,
                "latLng": [
                    36.464266,
                    5.646547
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 252,
                "name": "Beni Chbana",
                "checked": true,
                "latLng": [
                    36.468938,
                    4.867793
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 256,
                "name": "Beni Fouda",
                "checked": true,
                "latLng": [
                    36.285956,
                    5.607376
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 271,
                "name": "Beni Mouhli",
                "checked": true,
                "latLng": [
                    36.516025,
                    4.90887
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 273,
                "name": "Beni Ourthilane",
                "checked": true,
                "latLng": [
                    36.441413,
                    4.85456
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 276,
                "name": "Beni Houcine",
                "checked": true,
                "latLng": [
                    36.280717,
                    5.127686
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 313,
                "name": "Bir El Arch",
                "checked": true,
                "latLng": [
                    36.131598,
                    5.841372
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 319,
                "name": "Bir Haddada",
                "checked": true,
                "latLng": [
                    5.967304,
                    5.429139
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 352,
                "name": "Bouandas",
                "checked": true,
                "latLng": [
                    36.497598,
                    5.101791
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 370,
                "name": "Bougaa",
                "checked": true,
                "latLng": [
                    36.334489,
                    5.092889
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 415,
                "name": "Bousellame",
                "checked": true,
                "latLng": [
                    36.496343,
                    5.038683
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 418,
                "name": "Boutaleb",
                "checked": true,
                "latLng": [
                    35.66804,
                    5.320226
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 494,
                "name": "Dhamcha",
                "checked": true,
                "latLng": [
                    36.381203,
                    5.596007
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 524,
                "name": "Djemila",
                "checked": true,
                "latLng": [
                    36.313495,
                    5.737173
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 542,
                "name": "Draa Kbila",
                "checked": true,
                "latLng": [
                    36.437947,
                    4.997135
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 583,
                "name": "Eulma",
                "checked": true,
                "latLng": [
                    36.147745,
                    5.687873
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 676,
                "name": "Oueldja",
                "checked": true,
                "latLng": [
                    36.062842,
                    5.953341
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 678,
                "name": "Ourissia",
                "checked": true,
                "latLng": [
                    36.283799,
                    5.409162
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 724,
                "name": "Guellale",
                "checked": true,
                "latLng": [
                    36.034802,
                    5.334063
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 727,
                "name": "El Guelta Zerga",
                "checked": true,
                "latLng": [
                    36.207858,
                    5.686027
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 729,
                "name": "Guenzet",
                "checked": true,
                "latLng": [
                    36.320566,
                    4.835199
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 735,
                "name": "Guidjel",
                "checked": true,
                "latLng": [
                    36.113971,
                    5.528523
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 751,
                "name": "Hamma",
                "checked": true,
                "latLng": [
                    35.684305,
                    5.373953
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 760,
                "name": "Hammam Guergour",
                "checked": true,
                "latLng": [
                    36.322587,
                    5.054645
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 764,
                "name": "Hammam El Sokhna",
                "checked": true,
                "latLng": [
                    35.977889,
                    5.812051
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 772,
                "name": "Herbil",
                "checked": true,
                "latLng": [
                    36.323933,
                    4.93682
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 871,
                "name": "Ksar El Abtal",
                "checked": true,
                "latLng": [
                    35.967737,
                    5.26171
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 905,
                "name": "Meaouia",
                "checked": true,
                "latLng": [
                    36.386597,
                    5.709188
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 923,
                "name": "Maouklane",
                "checked": true,
                "latLng": [
                    36.394356,
                    5.067031
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 983,
                "name": "Mezloug",
                "checked": true,
                "latLng": [
                    36.107541,
                    5.335831
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 1054,
                "name": "Oued El Bared",
                "checked": true,
                "latLng": [
                    36.47647,
                    5.399946
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 1092,
                "name": "Ouled Adouane",
                "checked": true,
                "latLng": [
                    36.339277,
                    5.473593
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 1138,
                "name": "Ouled Sabeur",
                "checked": true,
                "latLng": [
                    36.1989,
                    5.507384
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 1141,
                "name": "Ouled Si Ahmed",
                "checked": true,
                "latLng": [
                    35.896743,
                    5.187169
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 1148,
                "name": "Ouled Tebbane",
                "checked": true,
                "latLng": [
                    35.805091,
                    5.101742
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 1197,
                "name": "Rasfa",
                "checked": true,
                "latLng": [
                    35.80708,
                    5.265626
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 1209,
                "name": "Salah Bey",
                "checked": true,
                "latLng": [
                    35.852418,
                    5.287076
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 1237,
                "name": "Serdj El Ghoul",
                "checked": true,
                "latLng": [
                    36.476587,
                    5.574699
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 1240,
                "name": "Setif",
                "checked": true,
                "latLng": [
                    36.208271,
                    5.396861
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 1371,
                "name": "Tachouda",
                "checked": true,
                "latLng": [
                    36.256903,
                    5.711557
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 1393,
                "name": "Tala Ifacene",
                "checked": true,
                "latLng": [
                    36.005469,
                    5.716013
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 1424,
                "name": "El Taya",
                "checked": true,
                "latLng": [
                    35.957676,
                    5.967102
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 1431,
                "name": "Tella",
                "checked": true,
                "latLng": [
                    36.00799,
                    5.718024
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            },
            {
                "id": 1490,
                "name": "Tizi N'Bechar",
                "checked": true,
                "latLng": [
                    36.428467,
                    5.357684
                ],
                "wilaya": {
                    "name": "Sétif",
                    "number": 19
                }
            }
        ]
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
    const [selectedRdvPoint, setSelectedRdvPoint] = useState(null);

    const L = require("leaflet");
    const prodMapRef = useRef();
    const venteMapRef = useRef();
    const rdvMapRef = useRef();

    let rdvMarker = L.icon({
        "iconUrl": timePin,
        "iconRetinaUrl": timePin,
        "shadowUrl": require("leaflet/dist/images/marker-shadow.png"),
        "iconSize": [35, 41],
        "iconAnchor": [17, 41],
        "popupAnchor": [1, -34],
        "tooltipAnchor": [16, -28],
        "shadowSize": [47, 41]
    });
    let selectedPointMarker = L.icon({
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
        if (selectedRdvPoint !== null) {
            rdvMapRef.current.flyTo([testData.services.rdv[selectedRdvPoint].point.lat, testData.services.rdv[selectedRdvPoint].point.lng], 10);
        }
    }, [selectedRdvPoint])

    function selectProdVille(ville) {
        if (ville.id !== selectedProdVille?.id) {
            setSelectedProdVille(ville);
            prodMapRef.current.flyTo(ville.latLng, 13);
        } else {
            setSelectedProdVille(null);
            prodMapRef.current.flyTo([28.889515, 2.485352], 5);
        }
    }
    function selectVenteVille(ville) {
        if (ville.id !== selectedVenteVille?.id) {
            setSelectedVenteVille(ville);
            venteMapRef.current.flyTo(ville.latLng, 13);
        } else {
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
        <hr className='step__line'></hr>
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
        <hr className='step__line'></hr>

        <div className="step__recap__header">
            <h1 className="step__title">Origine</h1>
            <label className="step__recap__modifier">Modifier</label>
        </div>
        <div className="step__recap__origine">
            <img className='step__recap__origine__icon' src={testData.origine.origine !== "DZ" ? Countries.fr[testData.origine.pays].icon : Countries.fr[3].icon} alt="secteur" />
            <label className='step__recap__branche__name'>{testData.origine.origine === "DZ" ? "Produit Algérien" : "Produit étranger"}</label>
            <label className='step__recap__origine__country'>{testData.origine.origine === "DZ" ? "Algérie" : Countries.fr[testData.origine.pays].text}</label>
        </div>
        <hr className='step__line'></hr>

        <div className="step__recap__header">
            <h1 className="step__title">Durabilité</h1>
            <label className="step__recap__modifier">Modifier</label>
        </div>
        <div className="step__recap__durabilite">
            <img className='step__secteurs__branche__icon' src={testData.durabilite === "D" ? durable : nonDurable} alt="secteur" />
            <label className='step__recap__branche__name'>{testData.durabilite === "D" ? "Durable" : "Non durable"}</label>
        </div>
        <hr className='step__line'></hr>

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
        <hr className='step__line'></hr>

        <div className="step__recap__header">
            <h1 className="step__title">Emplacements</h1>
            <label className="step__recap__modifier">Modifier</label>
        </div>
        <h2 className='step__recap__details__title'>Lieux de production ({testData.localisations.lieuxProduction.length} Villes)</h2>
        <div className='recap__lieux'>
            <div className='recap__lieux__villes'>
                {
                    testData.localisations.lieuxProduction.map((lieu, index) => {
                        return <div key={index} className={selectedProdVille?.id === lieu.id ? 'recap__lieux__ville--selected' : 'recap__lieux__ville'} onClick={() => { selectProdVille(lieu) }}>
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
                    selectedProdVille?.points?.map((point, index) => {
                        return <Marker key={index} position={[point.lat, point.lng]}></Marker>
                    })
                }

            </MapContainer>
        </div>
        <h2 className='step__recap__details__title'>Lieux de vente ({testData.localisations.lieuxVente.lieux.length} Villes)</h2>
        <br></br>
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
                        return <div className={selectedVenteVille?.id === lieu.id ? 'recap__lieux__ville--selected' : 'recap__lieux__ville'} onClick={() => { selectVenteVille(lieu) }}>
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
                    selectedVenteVille?.points?.map((point, index) => {
                        return <Marker key={index} position={[point.point.lat, point.point.lng]}>
                            <Popup>
                                <h1 className='lieuxVente__popUp__info__name'>{point.info.nom}</h1>
                                <hr></hr>
                                <div className='lieuxVente__popUp__info__times'>
                                    <label className='lieuxVente__popUp__info__times__dayName'>Samedi</label>
                                    <div className='lieuxVente__popUp__info__times__periods'>
                                        {
                                            point?.info.horaires[0].length !== 0 ?
                                                point?.info.horaires[0].map(period => {
                                                    return <label>{period.start + " - " + period.end}</label>
                                                }) : <label>Indisponible</label>
                                        }
                                    </div>
                                    <hr className='lieuxVente__popUp__info__times__line'></hr>
                                    <label className='lieuxVente__popUp__info__times__dayName'>Dimanche</label>
                                    <div className='lieuxVente__popUp__info__times__periods'>
                                        {
                                            point?.info.horaires[1].length !== 0 ?
                                                point?.info.horaires[1].map(period => {
                                                    return <label>{period.start + " - " + period.end}</label>
                                                }) : <label>Indisponible</label>
                                        }
                                    </div>
                                    <hr className='lieuxVente__popUp__info__times__line'></hr>
                                    <label className='lieuxVente__popUp__info__times__dayName'>Lundi</label>
                                    <div className='lieuxVente__popUp__info__times__periods'>
                                        {
                                            point?.info.horaires[2].length !== 0 ?
                                                point?.info.horaires[2].map(period => {
                                                    return <label>{period.start + " - " + period.end}</label>
                                                }) : <label>Indisponible</label>
                                        }
                                    </div>
                                    <hr className='lieuxVente__popUp__info__times__line'></hr>
                                    <label className='lieuxVente__popUp__info__times__dayName'>Mardi</label>
                                    <div className='lieuxVente__popUp__info__times__periods'>
                                        {
                                            point?.info.horaires[3].length !== 0 ?
                                                point?.info.horaires[3].map(period => {
                                                    return <label>{period.start + " - " + period.end}</label>
                                                }) : <label>Indisponible</label>
                                        }
                                    </div>
                                    <hr className='lieuxVente__popUp__info__times__line'></hr>
                                    <label className='lieuxVente__popUp__info__times__dayName'>Mercredi</label>
                                    <div className='lieuxVente__popUp__info__times__periods'>
                                        {
                                            point?.info.horaires[4].length !== 0 ?
                                                point?.info.horaires[4].map(period => {
                                                    return <label>{period.start + " - " + period.end}</label>
                                                }) : <label>Indisponible</label>
                                        }
                                    </div>
                                    <hr className='lieuxVente__popUp__info__times__line'></hr>
                                    <label className='lieuxVente__popUp__info__times__dayName'>Jeudi</label>
                                    <div className='lieuxVente__popUp__info__times__periods'>
                                        {
                                            point?.info.horaires[5].length !== 0 ?
                                                point?.info.horaires[5].map(period => {
                                                    return <label>{period.start + " - " + period.end}</label>
                                                }) : <label>Indisponible</label>
                                        }
                                    </div>
                                    <hr className='lieuxVente__popUp__info__times__line'></hr>
                                    <label className='lieuxVente__popUp__info__times__dayName'>Vendredi</label>
                                    <div className='lieuxVente__popUp__info__times__periods'>
                                        {
                                            point?.info.horaires[6].length !== 0 ?
                                                point?.info.horaires[6].map(period => {
                                                    return <label>{period.start + " - " + period.end}</label>
                                                }) : <label>Indisponible</label>
                                        }
                                    </div>
                                </div>

                            </Popup>
                        </Marker>
                    })
                }
            </MapContainer>
        </div>
        <hr className='step__line'></hr>
        <div className="step__recap__header">
            <h1 className="step__title">Services</h1>
            <label className="step__recap__modifier">Modifier</label>
        </div>
        <div className='step__recap__services__title'>
            <h2>Commande</h2>
            <div></div>
        </div>
        <p className='step__paragraph' style={{ textDecoration: "underline" }}>Méthode de réception</p>

        {
            testData.services.commande.retrait ? <div className="step__recap__type">
                <img className='step__secteurs__branche__icon' src={retrait} alt="secteur" />
                <label className='step__recap__branche__name'>Retrait sur place</label>
            </div> : ""
        }
        {
            testData.services.commande.livraison ? <div className="step__recap__type">
                <img className='step__secteurs__branche__icon' src={livraison} alt="secteur" />
                <label className='step__recap__branche__name'>Livraison a domicile</label>
            </div> : ""
        }
        <br></br>
        <p className='step__paragraph' style={{ textDecoration: "underline" }}>Tarifs</p>
        <div className='step__services__commande__tarifs'>
            {
                testData.services.commande.tarifs.map((tarif, index) => {
                    return <label key={index}>{`${tarif.prix} DA/${tarif.quantite}${units.getUnit(tarif.unite).label}`}</label>
                })
            }
        </div>
        <p className='step__paragraph' style={{ textDecoration: "underline", marginBottom: "10px" }}>Règles et conditions</p>
        {
            testData.services.commande.conditions.map((condition, index) => {
                return <label key={index} className='step__recap__services__contition'>{condition.value}</label>
            })
        }
        <br></br>
        <div className='step__recap__services__title'>
            <h2>Rendez vous</h2>
            <div></div>
        </div>
        <p className='step__paragraph' style={{ textDecoration: "underline" }}>Points</p>
        <br />
        <MapContainer ref={rdvMapRef} center={[28.889515, 2.485352]} zoom={5} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.google.com/intl/en-GB_ALL/permissions/geoguidelines/">Google Maps</a>'
                url="https://mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            //url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                testData.services.rdv.map((rdv, index) => {
                    return <Marker key={index} icon={selectedRdvPoint !== index ? rdvMarker : selectedPointMarker} position={[rdv.point.lat, rdv.point.lng]} eventHandlers={{
                        click: (event) => {
                            if (index === selectedRdvPoint) {
                                setSelectedRdvPoint(null);
                            } else {
                                setSelectedRdvPoint(index);
                            }
                        }
                    }}></Marker>
                })
            }
        </MapContainer>
        <br />
        <p className='step__paragraph' style={{ textDecoration: "underline" }}>Horaires</p>
        <br />
        {
            selectedRdvPoint === null ? '' :
                <div className="step__services__horairesRDV__plages">
                    {
                        testData.services.rdv[selectedRdvPoint].horaires.map((element, index) => {
                            return <RDVjour key={index} data={{ ...element, index: index }} handleChanges={null} readOnly={true}></RDVjour>
                        })
                    }
                </div>
        }
        <br />
        <p className='step__paragraph' style={{ textDecoration: "underline" }}>Motifs</p>
        <br />
        {
            testData.services.rdv[selectedRdvPoint]?.motifs.map((motif, index) => {
                return <label key={index} className='step__recap__services__contition'>{motif.value}</label>
            })
        }
        <br />
        <p className='step__paragraph' style={{ textDecoration: "underline" }}>Règles et conditions</p>
        <br />
        {
            testData.services.rdv[selectedRdvPoint]?.conditions.map((condition, index) => {
                return <label key={index} className='step__recap__services__contition'>{condition.value}</label>
            })
        }
        <br />
        <div className='step__recap__services__title'>
            <h2>Livraison</h2>
            <div></div>
        </div>
        <div style={{ width: "40%", margin: "10px 0px" }}>
            {testData.services.livraison === null ? <></> : <SelectLieu readOnly={true} title={"Lieux de livraison"} selectedItems={testData.services.livraison.map((item)=>{return item.id})}></SelectLieu>}
        </div>
        <hr className='step__line'></hr>

        <div className="step__recap__header">
            <h1 className="step__title">Média</h1>
            <label className="step__recap__modifier">Modifier</label>
        </div>
        <h2 className='step__recap__details__title'>Images ({data.media.images.length} / 10)</h2>
        <div className="step__recap__media__grid">
            {(() => {
                let t = [];
                for (let i = 0; i < 10; i++) {
                    if (data.media.images[i] !== undefined) {
                        if (i === 0) {
                            t.push(<div key={i} className="step__recap__media__image step__recap__media__image--main" style={{ backgroundImage: `url(${URL.createObjectURL(data.media.images[i])})` }}></div>);
                        } else {
                            t.push(<div key={i} className="step__recap__media__image" style={{ backgroundImage: `url(${URL.createObjectURL(data.media.images[i])})` }}></div>);
                        }
                    } else {
                        t.push(<div key={i} className="step__recap__media__image"></div>);
                    }
                }
                return t.map(image => {
                    return image;
                })
            })()}
        </div>
        <h2 className='step__recap__details__title'>Vidéos ({data.media.videos.length} / 3)</h2>
        <div className="step__media__grid">
            {(() => {
                let t = [];
                for (let i = 0; i < 3; i++) {
                    if (data.media.videos[i] !== undefined) {
                        t.push(<div key={i} className="step__recap__media__image">
                            <video style={{ width: "100%", gridArea: "1 / 1 / 1 / 1" }} autoPlay muted loop src={URL.createObjectURL(data.media.videos[i])} />
                        </div>);
                    } else {
                        t.push(<div key={i} className="step__recap__media__image"></div>);
                    }
                }
                return t.map(video => {
                    return video;
                })
            })()}
        </div>
    </div>

}
export default Recapitulatif;