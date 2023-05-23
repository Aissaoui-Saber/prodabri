import { useState } from "react";

import './Tree.css';
import CheckBox from "./CheckBox";



function Tree({data, handleChanges, readOnly}){
    const [expanded, setExpanded] = useState(false);
    const [wilaya, setWilaya] = useState({wilayaNumber:data.wilayaNumber, name: data.name, checked: data.checked});
    const [communes, setCommunes] = useState([...data.communes]);

    function handleCheckChanges(checkedItem){
        let tempCommunes = communes.map(commune =>{
            return {...commune};
        });
        let tempWilaya = {...wilaya};
        if (checkedItem.id === wilaya.wilayaNumber){//Wilaya click
            for (let i=0; i<data.communes.length;i++){
                tempCommunes[i].checked = checkedItem.check;
            }
            tempWilaya.checked = checkedItem.check;
            //setWilaya({...wilaya, checked : checkedItem.check});
            setWilaya(tempWilaya);
        }else{//commune click
            for (let i=0;i<data.communes.length;i++){
                if (data.communes[i].id === checkedItem.id){
                    tempCommunes[i].checked = checkedItem.check;
                    break;
                }
            }
            if (!checkedItem.check){//uncheck commune
                if (wilaya.checked){
                    tempWilaya.checked = false;
                    setWilaya({...tempWilaya});
                }
            }else{//check commune
                let unCheckedCommunes = 0;
                for (let i=0; i<data.communes.length; i++){
                    if (data.communes[i].id !== checkedItem.id){
                        if (!communes[i].checked){
                            unCheckedCommunes++;
                        }
                    }
                }
                if (unCheckedCommunes === 0){
                    tempWilaya.checked = true;
                    setWilaya({...tempWilaya});
                }
            }     
        }
        setCommunes(tempCommunes);
        
        handleChanges({...tempWilaya, communes: tempCommunes});
    }


    return <>
        <div className="tree-Container">
            <div className={expanded ? "tree-triangle tree-triangle-open" : "tree-triangle"} onClick={()=>setExpanded(!expanded)}></div>
            <div className="parent-container">
                {readOnly ? <label className="checkbox-label" onClick={()=>setExpanded(!expanded)}>{wilaya.wilayaNumber + "- " + wilaya.name}</label> : <CheckBox label={wilaya.wilayaNumber + "- " + wilaya.name} id={wilaya.wilayaNumber} isChecked={wilaya.checked} handleChanges={handleCheckChanges} labelOnClick={()=>setExpanded(!expanded)}></CheckBox>}
            </div>
            <div className={expanded ? "line" : "line line-hidden"}></div>
            <div className={expanded ? "children-container" : "children-container children-container-closed"}>
                {communes.map((commune)=>{
                    return readOnly ? <label className="checkbox-label">{"- " + commune.name}</label> : <CheckBox key={commune.id} label={commune.name} id={commune.id} handleChanges={handleCheckChanges} isChecked={commune.checked}></CheckBox>
                })}
            </div>
        </div>
    </>;
}

export default Tree;