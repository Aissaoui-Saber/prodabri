import checkedBox from "../../../Assets/images/icons/filterBar/checked.png";
import uncheckedBox from "../../../Assets/images/icons/filterBar/unchecked.png";

import './CheckBox.css';
import { useState, useEffect } from "react";

function CheckBox({id, label, isChecked, handleChanges, labelOnClick}){
    const  [checked,setChecked] = useState(isChecked);
    function check(){
        let x = checked ? false : true;
        handleChanges({id: id, check:x});
        setChecked(x);
    }
    //console.log("checkbox rendring");
    useEffect(() => {
        setChecked(isChecked);
      }, [isChecked]);
    return <div className="checkbox" data={id}>
        <img data={id} src={checked ? checkedBox : uncheckedBox} alt="checkBox" className="checkbox__icon" onClick={check}></img>
        <label className='checkbox__label' data={id} onClick={labelOnClick}>{label}</label>
    </div>
}

export default CheckBox;