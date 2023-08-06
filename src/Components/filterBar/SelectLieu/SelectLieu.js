import './SelectLieu.css';
//import '../../../global_Style.css';
import pin from '../../../Assets/images/icons/filterBar/placeholder.png';
import { useState, useEffect, useRef } from 'react';
import Tree from './Tree';
import cities from '../../../Utils/Villes';
import CheckBox from './CheckBox';
import { json } from 'react-router-dom';

function getTotalSelectedCities(cities) {
    let checkedCities = 0;
    cities.forEach(wilaya => {
        wilaya.communes.forEach(commune => {
            if ("checked" in commune) {
                if (commune.checked) {
                    checkedCities++;
                }
            } else {
                checkedCities++;
            }
        });
    });
    return checkedCities;
}

function SelectLieu({ selectedItems, onChange, title, readOnly, isFilter }) {
    const [villes, setVilles] = useState(JSON.parse(JSON.stringify([...cities.FR])));
    const [isOpen, setIsOpen] = useState(false);
    const [totalCities, setTotalCities] = useState(selectedItems !== undefined && selectedItems !== null ? selectedItems.length : 0);
    const [allSelected, setAllSelected] = useState(false);


    const refOne = useRef(null);
    const refTwo = useRef(null);
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (refOne.current !== null) {
                if (!refOne.current.contains(e.target)) {
                    if (!refTwo.current.contains(e.target)) {
                        setIsOpen(false);
                    }
                }
            }
        }
        document.addEventListener("click", handleOutsideClick, true);
    }, []);

    function handleCitiesCheckedNumber(checkedCities) {
        let dataTemp = [...villes];
        for (let i = 0; i < dataTemp.length; i++) {
            if (dataTemp[i].wilayaNumber === checkedCities.wilayaNumber) {
                dataTemp[i] = checkedCities;
                break;
            }
        }
        setVilles(dataTemp);
        setTotalCities(getTotalSelectedCities(dataTemp));
        onChange(dataTemp);
    }

    function selectAllCities(){
        if (allSelected === true){
            let t = JSON.parse(JSON.stringify([...cities.FR]));
            setVilles([...t]);
            setTotalCities(0);
            setAllSelected(false);
            onChange([...t]);
        }else{
            let temp = [...villes];
            temp.forEach(willaya =>{
                willaya.communes.forEach(commune =>{
                    commune.checked = true;
                });
                willaya.checked = true;
            });
            setVilles([...temp]);
            setTotalCities(1541);
            setAllSelected(true);
            onChange([...temp]);
        }
    }


    return <div className='selectMenu-container'>
        <div className={isOpen ? "select select--active" : "select"} onClick={() => setIsOpen(!isOpen)} ref={refTwo}>
            <img className="select__icon" src={pin} alt="placeholder"></img>
            <div className="select__data">
                <label className='select__data__title'>{title}</label>
                <label className='select__data__value'>{isFilter ? totalCities < 1 ? "Tout les Villes" : (totalCities < 2 ? totalCities + " Ville" : totalCities + " Villes") : (totalCities < 2 ? totalCities + " Ville" : totalCities + " Villes")}</label>
            </div>
            <div className={isOpen ? "select__triangle select__triangle--active" : "select__triangle"}></div>
        </div>
        <div className={isOpen ? "options" : "options options--closed"} ref={refOne}>

            <div className='options__trees'>
                {
                    !isFilter && !readOnly ? <div style={{gridColumnStart: "2", marginLeft:"14px"}}><CheckBox label={"Sélectionner tout"} isChecked={allSelected} id={-1} handleChanges={selectAllCities}></CheckBox><br></br></div> : ""
                }
                
                {
                    /*readOnly ? */villes.map((wilaya) => {
                    return <Tree className='options__trees__item' key={wilaya.wilayaNumber} data={wilaya} handleChanges={handleCitiesCheckedNumber} readOnly={readOnly} selectedItems={selectedItems}></Tree>
                })
                    /*: data.wilayas.map((wilaya) => {
                        return <Tree className='options__trees__item' key={wilaya.wilayaNumber} data={wilaya} handleChanges={handleCitiesCheckedNumber} readOnly={readOnly ? true : false}></Tree>
                    })*/
                }
            </div>
        </div>
    </div>
}

export default SelectLieu;