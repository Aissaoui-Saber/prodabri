import { useState, useRef, useEffect } from "react";
import commande from '../../../Assets/images/icons/commande.png';
import rdv from '../../../Assets/images/icons/appointment.png';
import retrait from '../../../Assets/images/icons/pickup.png';
import livraison from '../../../Assets/images/icons/delivery.png';
import remove from '../../../Assets/images/delete.png';
import './Services.css';
import units from '../../../Utils/Units';
import functions from '../../../Utils/Functions';

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
        setValue({id: value.id, value: temp});
        handleChanges({ id: value.id, value: functions.stringNormalizeSpaces(temp) });
    }
    function handleInputBlur(e){
        let temp = functions.stringRemoveBeginingSpaces(e.target.value);
        temp = functions.stringRemoveMultipleSpaces(temp);
        temp = functions.stringRemoveEndingSpaces(temp);
        setValue({id: value.id, value: temp});
        handleChanges({ id: value.id, value: temp});
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
        setConditions([...conditions, {id: id, value:""}]);
    }
    function removeCondition(cond) {
        let newArray = [];
        conditions.forEach((value)=>{
            if (value.id !== cond) {
                newArray.push(value);
            }
        })
        setConditions(newArray);
    }
    function handleConditionsChanges(cond) {
        let temp = [...conditions];
        temp.filter(e => {return e.id == cond.id}).value = cond.value;

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