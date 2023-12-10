import checkedBox from "../../../Assets/images/icons/filterBar/checked.png";
import uncheckedBox from "../../../Assets/images/icons/filterBar/unchecked.png";
import semiChecked from "../../../Assets/images/icons/filterBar/semiCheked.png";

import './CheckBox.scss';
import { useState, useEffect } from "react";

function CheckBox(props){
    const  [isChecked,setIsChecked] = useState(props.isChecked);
    function check(){
        let x = isChecked ? 0 : 1;
        props.onClick({id: props.id, value:x});
        setIsChecked(x);
    }
    //console.log("checkbox rendring");
    useEffect(() => {
        setIsChecked(props.isChecked);
      }, [props.isChecked]);
      
    return <div className="checkbox" data-id={props.id} data-testid="CB">
        <img data-id={props.id} src={isChecked !== undefined ?  ( isChecked ? checkedBox : uncheckedBox ) : semiChecked} alt="checkBox" className="checkbox__icon" onClick={check}></img>
        <label className='checkbox__label' data-id={props.id} onClick={props.labelOnClick}>{props.label}</label>
    </div>
}

export default CheckBox;