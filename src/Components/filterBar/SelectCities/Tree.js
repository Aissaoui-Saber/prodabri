import { useContext, useEffect, useState } from "react";

import './Tree.scss';
import CheckBox from "./CheckBox";


function getTotalValue(data){
    let t = data.filter((element)=>{return element === 1}).length;
    if (t > 0 && t < data.length){
        return undefined
    } else {
        return t;
    }
    
}



function Tree(props) {
    const [expanded, setExpanded] = useState(true);
    const [isParentChecked, setParentChecked] = useState(props.readOnly ? undefined : getTotalValue(props.values));
    const [values, setValues] = useState(props.values);

    useEffect(()=>{
        setValues(props.values);
    },[props.values]);

    useEffect(()=>{
        setParentChecked(getTotalValue(values));
    },[values])

    function checkParent(){
        let tempValues = values.map((element)=>{
            return !isParentChecked ? 1 : 0;
        });
        setParentChecked(!isParentChecked);
        setValues(tempValues);
        if (props.onChange !== undefined) {props.onChange(tempValues)};
    }

    function checkChild(index, value){        
        let tempValues = [...values];
        tempValues[index] = value;
        setValues(tempValues);
        if (props.onChange !== undefined) {props.onChange(tempValues)};
    }

    return <div className="tree">
        <div className={expanded ? "tree__triangle tree__triangle--open" : "tree__triangle"} onClick={() => setExpanded(!expanded)}></div>
        <div className="parent" data-testid={"parent_checkbox"}>
            {
                props.readOnly ? <label className="checkbox__label">{props.label}</label>
                : <CheckBox label={props.label} id={-1} isChecked={isParentChecked} onClick={checkParent} labelOnClick={() => setExpanded(!expanded)}></CheckBox>
            }
            
        </div>
        <div className={expanded ? "line" : "line line--hidden"}></div>
        <div className={expanded ? "children" : "children children--closed"}>
            {
                
                props.children.map((child, index) => {
                    if (props.readOnly){
                        return <label key={child.id} className="checkbox__label">{child.name}</label>
                    }else{
                        return <CheckBox data-testid={"child"+index} key={child.id} label={child.name} id={index} onClick={(data)=>{checkChild(index, data.value)}} isChecked={values[index]}></CheckBox>
                    }
                })
            }
        </div>
    </div>;
}

export default Tree;