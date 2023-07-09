import { useState, useRef, useEffect } from "react";
import functions from '../../../../Utils/Functions';
import remove from '../../../../Assets/images/delete.png';

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
        if (e.target.value.length === 0) {
            handleRemove(value.id);
        } else {
            handleChanges({ id: value.id, value: temp });
        }

    }
    return <div className="step__services__commande__condition">
        <img className="step__details__links__link__delete" src={remove} onClick={() => handleRemove(value.id)}></img>
        <input ref={inputRef} className="input__text step__input__text step__services__commande__condition__input" type="text" placeholder="Règles et conditions" onChange={handleInputChanges} onBlur={handleInputBlur} value={value.value}></input>
    </div>
}

export default Condition;