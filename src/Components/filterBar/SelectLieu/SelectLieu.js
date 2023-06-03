import './SelectLieu.css';
//import '../../../global_Style.css';
import pin from '../../../Assets/images/icons/filterBar/placeholder.png';
import { useState, useEffect, useRef } from 'react';
import Tree from './Tree';

function getTotalSelectedCities(cities) {
    let checkedCities = 0;
    cities.forEach(wilaya => {
        wilaya.communes.forEach(commune => {
            if ("checked" in commune) {
                if (commune.checked){
                    checkedCities++;
                }
            }else{
                checkedCities++;
            }
        });
    });
    return checkedCities;
}
function copyData(data) {
    //let copyWilayas = [...data];
    let copy = [];
    data.forEach(wilaya => {
        copy.push({ wilayaNumber: wilaya.wilayaNumber, name: wilaya.name, checked: wilaya.checked, communes: [...wilaya.communes] });
    });
    return copy;
}


function SelectLieu({ data, handleCitiesChecks, title, readOnly , value}) {
    const [wilayas, setWilayas] = useState(readOnly ? data : copyData(data.wilayas));
    const [isOpen, setIsOpen] = useState(false);
    const [totalCities, setTotalCities] = useState(readOnly ? getTotalSelectedCities(wilayas) : value );
    
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
        let dataTemp = wilayas;
        for (let i = 0; i < dataTemp.length; i++) {
            if (dataTemp[i].wilayaNumber === checkedCities.wilayaNumber) {
                dataTemp[i] = checkedCities;
                break;
            }
        }
        setWilayas(dataTemp);
        setTotalCities(getTotalSelectedCities(dataTemp));
        handleCitiesChecks(wilayas);
    }


    return <div className='selectMenu-container'>
        <div className={isOpen ? "select select--active" : "select"} onClick={() => setIsOpen(!isOpen)} ref={refTwo}>
            <img className="select__icon" src={pin} alt="placeholder"></img>
            <div className="select__data">
                <label className='select__data__title'>{title}</label>
                <label className='select__data__value'>{totalCities === -1 ? "Tout les Villes" : (totalCities < 2 ? totalCities + " Ville" : totalCities + " Villes")}</label>
            </div>
            <div className={isOpen ? "select__triangle select__triangle--active" : "select__triangle"}></div>
        </div>
        <div className={isOpen ? "options" : "options options--closed"} ref={refOne}>
            <div className='options__trees'>
                {
                    readOnly ? data.map((wilaya) => {
                        return <Tree className='options__trees__item' key={wilaya.wilayaNumber} data={wilaya} handleChanges={handleCitiesCheckedNumber} readOnly={readOnly ? true : false}></Tree>
                    })
                    : data.wilayas.map((wilaya) => {
                        return <Tree className='options__trees__item' key={wilaya.wilayaNumber} data={wilaya} handleChanges={handleCitiesCheckedNumber} readOnly={readOnly ? true : false}></Tree>
                    })
                    }
            </div>
        </div>
    </div>
}

export default SelectLieu;