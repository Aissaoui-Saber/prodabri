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
        wilaya.forEach(commune => {
            if (commune) {
                checkedCities++;
            }
        });
    });
    return checkedCities;
}

function SelectLieu({ selectedItems, onChange, title, readOnly, isFilter }) {
    //const [villes, setVilles] = useState(JSON.parse(JSON.stringify([...cities.FR])));
    const [isOpen, setIsOpen] = useState(false);
    const [totalCities, setTotalCities] = useState(selectedItems !== undefined && selectedItems !== null ? selectedItems.length : 0);
    const [allSelected, setAllSelected] = useState(false);
    const [selectedVilles, setSelectedVilles] = useState([...cities.DEFAULT_UNSELECTED_VILLES]);
    const [selectedVillesList, setSelectedVillesList] = useState([...cities.DEFAULT_UNSELECTED_VILLES_LIST]);

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

    useEffect(()=>{
        if (totalCities === 0){
            setAllSelected(false);
        } else if (totalCities === 1541){
            setAllSelected(true)
        }else{
            setAllSelected(undefined);
        }
    },[totalCities])

    function handleCheckChanges(checkedCities) {       
        let dataTemp = [...selectedVilles];
        let listTemp = [...selectedVillesList];
        dataTemp[checkedCities.wilaya] = checkedCities.selectedCommunes;
        listTemp[checkedCities.wilaya] = checkedCities.selectedCommunesList;
        setSelectedVilles([...dataTemp]);
        setSelectedVillesList([...listTemp]);
        setTotalCities(getTotalSelectedCities(dataTemp));
        onChange(listTemp);
    }

    function selectAllCities(){
        
        if (allSelected === true){
            setAllSelected(false);
            setSelectedVilles([...cities.DEFAULT_UNSELECTED_VILLES]);
            setSelectedVillesList([...cities.DEFAULT_UNSELECTED_VILLES_LIST]);
            setTotalCities(0);
            onChange(cities.DEFAULT_UNSELECTED_VILLES_LIST);
        }else{
            setAllSelected(true);
            setSelectedVilles([...cities.DEFAULT_SELECTED_VILLES]);
            setSelectedVillesList([...cities.DEFAULT_SELECTED_VILLES_LIST]);
            setTotalCities(1541);
            onChange([...cities.DEFAULT_SELECTED_VILLES_LIST]);
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
                    /*readOnly ? */cities.FR.map((wilaya, index) => {
                    return <Tree className='options__trees__item' key={index} data={wilaya} handleChanges={handleCheckChanges} readOnly={readOnly} selectedItems={selectedVilles[index]} allSelected={allSelected}></Tree>
                })
                    /*: data.wilayas.map((wilaya) => {
                        return <Tree className='options__trees__item' key={wilaya.wilayaNumber} data={wilaya} handleChanges={handleCheckChanges} readOnly={readOnly ? true : false}></Tree>
                    })*/
                }
            </div>
        </div>
    </div>
}

export default SelectLieu;