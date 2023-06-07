import { useState } from "react";
import commande from '../../../Assets/images/icons/commande.png';
import rdv from '../../../Assets/images/icons/appointment.png';
import retrait from '../../../Assets/images/icons/pickup.png';
import livraison from '../../../Assets/images/icons/delivery.png';
import remove from '../../../Assets/images/delete.png';
import './Services.css';
import units from '../../../Utils/Units';

function Tartif({ data, handleChanges }) {
    console.log(units);
    return <div className="step__services__tarif">
        <img className="step__details__links__link__delete invisible" src={remove}></img>
        <h1 className="step__title">0 DA/1Kg</h1>
        <div className="step__services__tarif__inputs">
            <label>Prix par unité</label>
            <label>Unité de mésure</label>
            <label>Quantité</label>
            <input className="input__text tarif__input__text" type="text" value={0}></input>
            <select className="step__service__tarif__selcet" onChange={(e) => console.log(e)}>
                {
                    
                    units.map(group => {
                        return <optgroup label={group.name}>
                            {
                                group.units.map(unit => {
                                    return <option value={unit.id}>{unit.name} ({unit.label})</option>
                                })
                            }
                        </optgroup>
                    })
                }
            </select>
            <input className="input__text tarif__input__text" type="text" value={1}></input>
        </div>
    </div>
}

function Commande({ data, handleChanges }) {
    const [retraitSelected, setRetraitSelected] = useState(false);
    const [livraisonSelected, setLivraisonSelected] = useState(false);
    const [tarifs, setTarifs] = useState([]);
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
        <Tartif></Tartif>
        <Tartif></Tartif>
        <input type="button" value={"Ajouter"} className="button button--green step__services__ajouter"></input>
        <br></br>
        <br></br>
        <h1 className="step__subTitle">Règles et conditions</h1>
        <input type="button" value={"Ajouter"} className="button button--green step__services__ajouter"></input>
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
    </div>
}

export default Services;