import { useState, useEffect } from "react";
import Commande from "./commande/Commande";
import RDV from "./rdv/RDV";

import commandeIcon from '../../../../Assets/images/icons/commande.png';
import rdvIcon from '../../../../Assets/images/icons/appointment.png';

import './Services.css';

function Services({ data, handleChanges }) {
    
    const [commandeSelected, setCommandeSelected] = useState(false);
    const [rdvSelected, setRdvSelected] = useState(false);
    const [commande, setCommande] = useState({...data.commande});
    const [rdv, setRDV] = useState([...data.rdv]);

    useEffect(() => {
        handleChanges({ commande: commande, rdv: rdv });
    }, [commande, rdv]);

    useEffect(()=>{

        if (commandeSelected === false){
            setCommande({...{
                retrait: false,
                livraison: false,
                tarifs: [],
                conditions: []
            }});
            handleChanges({ commande: {
                retrait: false,
                livraison: false,
                tarifs: [],
                conditions: []
            }, rdv: rdv });
        }
    },[commandeSelected]);

    useEffect(()=>{
        if (rdvSelected === false){
            setRDV([]);
            handleChanges({ commande: commande, rdv: [] });
        }
    },[rdvSelected]);


    function handleRDVchanges(data) {
        let temp = [...rdv];
        if (data.horaires !== null) {
            let index = -1;
            for (let i=0; i<temp.length;i++){
                if (temp[i].point.id === data.point.id){
                    index = i;
                }
            }
            if (index !== -1){
                temp[index] = {...data};
            }else{
                temp.push(data);
            }
        }else{
            if (data.point !== null){
                let index = -1;
                for (let i=0; i<temp.length;i++){
                    if (temp[i].point.id === data.point.id){
                        index = i;
                    }
                }
                if (index !== -1){
                    temp.splice(index, 1);
                }
            }
        }
        setRDV([...temp]);
    }

    function handleCommandeChanges(data) {
        setCommande({ ...data });
    }


    return <div className="step step__services">
        <h1 className="step__title">Services</h1>
        <br></br>
        <div className={commandeSelected ? "step__option step__option--selected" : "step__option"} onClick={() => setCommandeSelected(!commandeSelected)}>
            <img className='step__option__icon' src={commandeIcon} alt="commande" />
            <div className='step__option__data'>
                <h2 className='step__option__info__title'>Commande</h2>
                <p className='step__option__info__description'>Vous permettez au visiteurs de commander votre bien ou service via prodabri.</p>
            </div>
        </div>
        {commandeSelected ? <Commande handleChanges={handleCommandeChanges} data={data.commande} /> : <br></br>}
        <div className={rdvSelected ? "step__option step__option--selected" : "step__option"} onClick={() => setRdvSelected(!rdvSelected)}>
            <img className='step__option__icon' src={rdvIcon} alt="rendez vous" />
            <div className='step__option__data'>
                <h2 className='step__option__info__title'>Rendez vous</h2>
                <p className='step__option__info__description'>Mettre en place un système de prise de rendez vous avec vos clients, cela vous permet d'organiser et gérer vos planings avec vos clients via prodabri</p>
            </div>
        </div>
        {rdvSelected ? <RDV handleChanges={handleRDVchanges} data={data.rdv} points={data.rdvPoints} /> : <br></br>}
    </div>
}

export default Services;

/*
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

let test = [
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
            }
        ],
        "index": 6
    }
];
*/