import './Switch.css';
//import '../../global_Style.css';


import {useState} from 'react';


export default function Switch({data, isBinary}){
    const [selectedItem, setSelectedItem] = useState(data.defaultOption);

    function switchOption(itemId){
        if (isBinary){
            if (itemId !== selectedItem){
                setSelectedItem(itemId);
                data.handleChanges(itemId);
            }            
        }else{
            if (selectedItem === itemId){
                setSelectedItem(-1);
                data.handleChanges(-1);
            }else{
                setSelectedItem(itemId);
                data.handleChanges(itemId);
            }
        }        
    }
    
    return <>
        <div className='switch-container'>
            <div data={data.options[0].id} className={selectedItem === 0 ? "selected-switch" : ""} onClick={()=>switchOption(0)}>
                <img src={data.options[0].icon} alt={data.options[0].name}></img>
                <label>{data.options[0].name}</label>
            </div>
            <div data={data.options[1].id} className={selectedItem === 1 ? "selected-switch" : ""} onClick={()=>switchOption(1)}>
                <img src={data.options[1].icon} alt={data.options[1].name}></img>
                <label>{data.options[1].name}</label>
            </div>
        </div>
    </>
}