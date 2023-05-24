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
    
    return <div className='switch'>
            <div data={data.options[0].id} className={selectedItem === 0 ? "switch__element--checked" : "switch__element"} onClick={()=>switchOption(0)}>
                <img className='switch__element__icon' src={data.options[0].icon} alt={data.options[0].name}></img>
                <label className='switch__element__name'>{data.options[0].name}</label>
            </div>
            <div data={data.options[1].id} className={selectedItem === 1 ? "switch__element--checked" : "switch__element"} onClick={()=>switchOption(1)}>
                <img className='switch__element__icon' src={data.options[1].icon} alt={data.options[1].name}></img>
                <label className='switch__element__name'>{data.options[1].name}</label>
            </div>
        </div>
}