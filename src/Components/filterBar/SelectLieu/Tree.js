import { useEffect, useState } from "react";

import './Tree.scss';
import CheckBox from "./CheckBox";



function Tree({ data, handleChanges, readOnly, selectedItems,allSelected }) {
    const [expanded, setExpanded] = useState(false);
    const [wilayaCheked, setWilayaChecked] = useState(false);
    const [selectedCommunes, setSelectedCommunes] = useState(selectedItems);

    useEffect(()=>{
        if (allSelected){
            setSelectedCommunes(selectedItems);
            setWilayaChecked(true);
        }else if(allSelected !== undefined && allSelected === false){
            setSelectedCommunes(selectedItems);
            setWilayaChecked(false);
        }
    },[allSelected]);

    function handleCheckChanges(checkedItem) {
        let selectedCommunesTemp = [...selectedCommunes];
        let selectedCommunesListTemp = [];

        if (checkedItem.id === -1) {//Wilaya click
            selectedCommunesTemp = selectedCommunesTemp.map((item,index)=>{
                if (checkedItem.check){
                    selectedCommunesListTemp.push(index);
                }
                return checkedItem.check;
            });
            setWilayaChecked(checkedItem.check);
            //checkedItem.check ? setExpanded(true) : expanded ? setExpanded(false) : setExpanded(false);
        } else {//commune click
            selectedCommunesTemp[checkedItem.id] = checkedItem.check;
            let selectedItemsNumber = selectedCommunesTemp.filter((element,index) => {
                if (element){
                    selectedCommunesListTemp.push(index);
                    return element;
                }
            }).length;
            if (selectedItemsNumber === 0){
                setWilayaChecked(false);
            }else if(selectedItemsNumber === selectedCommunesTemp.length){
                setWilayaChecked(true);
            }else{
                setWilayaChecked(undefined);
            }
        }
        setSelectedCommunes([...selectedCommunesTemp]);
        handleChanges({wilaya: data.wilayaNumber-1, selectedCommunes: [...selectedCommunesTemp], selectedCommunesList: selectedCommunesListTemp });
    }

    return <div className="tree">
        <div className={expanded ? "tree__triangle tree__triangle--open" : "tree__triangle"} onClick={() => setExpanded(!expanded)}></div>
        <div className="parent">
            <CheckBox label={data.wilayaNumber + ". " + data.name} id={-1} isChecked={wilayaCheked} handleChanges={handleCheckChanges} labelOnClick={() => setExpanded(!expanded)} readOnly={readOnly}></CheckBox>
        </div>
        <div className={expanded ? "line" : "line line--hidden"}></div>
        <div className={expanded ? "children" : "children children--closed"}>
            {
                data.communes.map((commune, index) => {
                    return <CheckBox key={commune.id} label={commune.name} id={index} handleChanges={handleCheckChanges} isChecked={selectedCommunes[index]} readOnly={readOnly}></CheckBox>
                })
            }
        </div>
    </div>;
}

export default Tree;