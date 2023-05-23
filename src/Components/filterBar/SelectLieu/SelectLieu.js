import './SelectLieu.css';
//import '../../../global_Style.css';
import pin from '../../../Assets/images/icons/filterBar/placeholder.png';
import {useState, useEffect, useRef} from 'react';
import Tree from './Tree';

function getTotalSelectedCities(cities){
    let checkedCities = 0;
    cities.forEach(wilaya => {
        wilaya.communes.forEach(commune => {
            if(commune.checked){
                checkedCities++;
            }
        });
    });
    return checkedCities;
}
function copyData(data){
    let copyWilayas = [...data];
    let copy = [];
    copyWilayas.forEach(wilaya => {
        copy.push({wilayaNumber:wilaya.wilayaNumber, name: wilaya.name, checked: wilaya.checked, communes: [...wilaya.communes]});
    })
    return copy;
}


function SelectLieu({data, handleCitiesChecks, title}){
    const [wilayas, setWilayas] = useState(copyData(data.wilayas));
    const [isOpen, setIsOpen] = useState(false);
    const [totalCities, setTotalCities] = useState(getTotalSelectedCities(wilayas));
    
    const refOne = useRef(null);
    const refTwo = useRef(null);
    useEffect(()=>{
        const handleOutsideClick = (e) => {
            if (refOne.current !== null) {
                if (!refOne.current.contains(e.target)) {
                    if (!refTwo.current.contains(e.target)) {
                        setIsOpen(false);
                    }
                }
            }
        }
        document.addEventListener("click",handleOutsideClick,true);
    },[]);

    function handleCitiesCheckedNumber(checkedCities){
        let dataTemp = wilayas;
        for (let i=0; i<dataTemp.length; i++){
            if (dataTemp[i].wilayaNumber === checkedCities.wilayaNumber){
                dataTemp[i] = checkedCities;
                break;
            }
        }
        setWilayas(dataTemp);
        setTotalCities(getTotalSelectedCities(dataTemp));
        handleCitiesChecks(wilayas);
    }


    return <div className='selectMenu-container'>
        <div className={isOpen ? "select-container select-container-active" : "select-container"} onClick={()=>setIsOpen(!isOpen)} ref={refTwo}>
        <img className="select-icon" src={pin} alt="placeholder"></img>
            <div className="select-data-container">
            <label className='select-title'>{title}</label>
            <label className='select-selected-item'>{totalCities === 0 ? "Tout les Villes" : (totalCities < 2 ? totalCities + " Ville" : totalCities + " Villes")}</label>
        </div>
        <div className={isOpen ? "triangle triangle-active" : "triangle"}></div>
    </div>
    <div className={isOpen ? "options-container" : "options-container options-container-closed"} ref={refOne}>
        <div className='tree-inside-container'>
            {
            data.wilayas.map((wilaya)=>{
                return <Tree key={wilaya.wilayaNumber} data={wilaya} handleChanges={handleCitiesCheckedNumber} readOnly={false}></Tree>
            })}
        </div>
    </div>
    </div>
}

export default SelectLieu;