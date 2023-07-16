import { useState, useEffect } from "react";
import Tartif from "./Tarif";
import Condition from "../Condition";

import retrait from '../../../../../Assets/images/icons/pickup.png';
import livraison from '../../../../../Assets/images/icons/delivery.png';


function Commande({ data, handleChanges }) {
    const [retraitSelected, setRetraitSelected] = useState(false);
    const [livraisonSelected, setLivraisonSelected] = useState(false);
    const [tarifs, setTarifs] = useState([]);
    const [conditions, setConditions] = useState([]);
    const [id, setId] = useState(0);


    useEffect(e => {
        handleChanges({
            retrait: retraitSelected,
            livraison: livraisonSelected,
            tarifs: tarifs,
            conditions: conditions
        })
    }, [retraitSelected, livraisonSelected, tarifs, conditions])

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
        if (temp.length === 0) {
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
        <h1 className="step__subTitle">Méthode de réception</h1>
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
        <h1 className="step__subTitle">Tarifs du bien</h1>
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

export default Commande;