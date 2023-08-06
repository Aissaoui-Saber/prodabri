import { useEffect, useState } from "react";

import './Tree.scss';
import CheckBox from "./CheckBox";



function Tree({ data, handleChanges, readOnly }) {
    const [expanded, setExpanded] = useState(false);
    const [wilaya, setWilaya] = useState({ wilayaNumber: data.wilayaNumber, name: data.name, checked: data.checked });
    const [communes, setCommunes] = useState([...data.communes]);


    useEffect(()=>{
        setWilaya({ wilayaNumber: data.wilayaNumber, name: data.name, checked: data.checked });
        let temp = [...data.communes];
        setCommunes([...temp]);
    },[data.checked]);

    function handleCheckChanges(checkedItem) {
        let tempCommunes = communes.map(commune => {
            return { ...commune };
        });
        let tempWilaya = { ...wilaya };
        if (checkedItem.id === wilaya.wilayaNumber) {//Wilaya click
            for (let i = 0; i < data.communes.length; i++) {
                tempCommunes[i].checked = checkedItem.check;
            }
            tempWilaya.checked = checkedItem.check;
            //setWilaya({...wilaya, checked : checkedItem.check});
            setWilaya(tempWilaya);
        } else {//commune click
            for (let i = 0; i < data.communes.length; i++) {
                if (data.communes[i].id === checkedItem.id) {
                    tempCommunes[i].checked = checkedItem.check;
                    break;
                }
            }
            if (!checkedItem.check) {//uncheck commune
                if (wilaya.checked) {
                    tempWilaya.checked = false;
                    setWilaya({ ...tempWilaya });
                }
            } else {//check commune
                let unCheckedCommunes = 0;
                for (let i = 0; i < data.communes.length; i++) {
                    if (data.communes[i].id !== checkedItem.id) {
                        if (!communes[i].checked) {
                            unCheckedCommunes++;
                        }
                    }
                }
                if (unCheckedCommunes === 0) {
                    tempWilaya.checked = true;
                    setWilaya({ ...tempWilaya });
                }
            }
        }
        setCommunes(tempCommunes);

        handleChanges({ ...tempWilaya, communes: tempCommunes });
    }


    return <div className="tree">
        <div className={expanded ? "tree__triangle tree__triangle--open" : "tree__triangle"} onClick={() => setExpanded(!expanded)}></div>
        <div className="parent">
            <CheckBox label={wilaya.wilayaNumber + "- " + wilaya.name} id={wilaya.wilayaNumber} isChecked={wilaya.checked} handleChanges={handleCheckChanges} labelOnClick={() => setExpanded(!expanded)} readOnly={readOnly}></CheckBox>
        </div>
        <div className={expanded ? "line" : "line line--hidden"}></div>
        <div className={expanded ? "children" : "children children--closed"}>
            {
                communes.map((commune) => {
                    return <CheckBox key={commune.id} label={commune.name} id={commune.id} handleChanges={handleCheckChanges} isChecked={commune.checked} readOnly={readOnly}></CheckBox>
                })
            }
        </div>
    </div>;
}

export default Tree;