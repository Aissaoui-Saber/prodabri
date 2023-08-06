import { useState, useEffect } from "react";
import Commande from "./commande/Commande";
import RDV from "./rdv/RDV";
import SelectLieu from "../../../../Components/filterBar/SelectLieu/SelectLieu";
import villes from "../../../../Utils/Villes";

import commandeIcon from '../../../../Assets/images/icons/commande.png';
import rdvIcon from '../../../../Assets/images/icons/appointment.png';
import deliveryIcon from '../../../../Assets/images/icons/delivery.png';

import './Services.css';



function Services({ data, handleChanges }) {
    const [commandeSelected, setCommandeSelected] = useState(false);
    const [rdvSelected, setRdvSelected] = useState(false);
    const [livraisonSelected, setLivraisonSelected] = useState(false);
    const [commande, setCommande] = useState({ ...data.commande });
    const [rdv, setRDV] = useState([...data.rdv]);
    const [lieuxLivraison, setLieuxLivraison] = useState(undefined);

    useEffect(() => {
        handleChanges({ commande: commande, rdv: rdv, livraison: lieuxLivraison === undefined ? undefined : lieuxLivraison });
    }, [commande, rdv, lieuxLivraison]);

    useEffect(() => {

        if (commandeSelected === false) {
            setCommande({
                ...{
                    retrait: false,
                    livraison: false,
                    tarifs: [],
                    conditions: []
                }
            });
            handleChanges({
                commande: {
                    retrait: false,
                    livraison: false,
                    tarifs: [],
                    conditions: []
                }, 
                rdv: rdv,
                livraison: lieuxLivraison === undefined ? undefined : lieuxLivraison
            });
        }
    }, [commandeSelected]);

    useEffect(() => {
        if (rdvSelected === false) {
            setRDV([]);
            handleChanges({ commande: commande, rdv: [], livraison: lieuxLivraison === undefined ? undefined : lieuxLivraison });
        }
    }, [rdvSelected]);

    useEffect(() => {
        
        if (livraisonSelected === false) {
            setLieuxLivraison(undefined);
            handleChanges({ commande: commande, rdv: rdv, livraison: undefined });
        }else{
            setLieuxLivraison(villes.FR);
            handleChanges({ commande: commande, rdv: rdv, livraison: villes.FR });
        }
    }, [livraisonSelected]);


    function handleRDVchanges(data) {
        let temp = [...rdv];
        if (data.horaires !== null) {
            let index = -1;
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].point.id === data.point.id) {
                    index = i;
                }
            }
            if (index !== -1) {
                temp[index] = { ...data };
            } else {
                temp.push(data);
            }
        } else {
            if (data.point !== null) {
                let index = -1;
                for (let i = 0; i < temp.length; i++) {
                    if (temp[i].point.id === data.point.id) {
                        index = i;
                    }
                }
                if (index !== -1) {
                    temp.splice(index, 1);
                }
            }
        }
        setRDV([...temp]);
    }

    function handleCommandeChanges(data) {
        setCommande({ ...data });
    }

    function handleLieuxLivraisonChanges(data){
        console.log(data);
        setLieuxLivraison([...data]);
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

        <div className={livraisonSelected ? "step__option step__option--selected" : "step__option"} onClick={() => setLivraisonSelected(!livraisonSelected)}>
            <img className='step__option__icon' src={deliveryIcon} alt="rendez vous" />
            <div className='step__option__data'>
                <h2 className='step__option__info__title'>Livraison</h2>
                <p className='step__option__info__description'>Définir les villes de livraison</p>
            </div>
        </div>
        {livraisonSelected ? <div className="step__services__commande" style={{backgroundColor: "var(--dark-foreground)", width:"40%"}}>
            <h1 className="step__subTitle">Villes de livraison</h1>
            <SelectLieu selectedItems={lieuxLivraison === undefined ? [] : lieuxLivraison} onChange={handleLieuxLivraisonChanges} title="Lieux de livraison" readOnly={false} isFilter={false}></SelectLieu>
        </div> : <br></br>}
    </div>
}

export default Services;