import '../../Components/filterBar/SelectLieu/SelectLieu.css';

import pin from '../../Assets/images/icons/filterBar/placeholder.png';
import {useState, useEffect, useRef} from 'react';
import Tree from '../filterBar/SelectLieu/Tree';


function Lieux({data, title, totalCities}){
    const [isOpen, setIsOpen] = useState(false);
    
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


    return <div className='selectMenu-container'>
        <div className={isOpen ? "select-container select-container-active" : "select-container"} onClick={()=>setIsOpen(!isOpen)} ref={refTwo}>
        <img className="select-icon" src={pin} alt="placeholder"></img>
        <div className="select-data-container">
            <label className='select-title'>{title}</label>
            <label className='select-selected-item'>{totalCities === 1541 ? "Tout les villes" : totalCities === 1 ? totalCities + " Ville" : totalCities + " Villes"}</label>
        </div>
        <div className={isOpen ? "triangle triangle-active" : "triangle"}></div>
    </div>
    <div className={isOpen ? "options-container" : "options-container options-container-closed"} ref={refOne}>
        <div className='tree-inside-container'>
            {
            data.map((wilaya)=>{
                return <Tree key={wilaya.wilayaNumber} data={wilaya} handleChanges={()=>{}} readOnly={true}></Tree>
            })}
        </div>
    </div>
    </div>
}

export default Lieux;