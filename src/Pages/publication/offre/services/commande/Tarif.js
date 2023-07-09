import { useState, useRef, useEffect } from "react";
import units from '../../../../../Utils/Units';
import functions from '../../../../../Utils/Functions';
import remove from '../../../../../Assets/images/delete.png';

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

export default Tartif;