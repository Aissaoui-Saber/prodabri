import './Select.css';

//import '../../Assets/Styles/global_Style.css';
import { useState, useEffect, useRef } from 'react';

function SortOptions({ optionsData , handleItemSelect}) {
    return <ul className='options-list'>
        {optionsData.options.map(option => {
            return <li className='options-list-item' key={option.id} data={option.id} onClick={handleItemSelect}>{option.text}</li>;
        })}
    </ul>;
}

function CountriesOptions({ optionsData, handleItemSelect }) {
    return <ul>
        {
            optionsData.options.map(country => {
                return <div onClick={handleItemSelect} data={country.id} key={"div" + country.id} className='sector-list-item'><img key={"i" + country.id} src={country.icon} alt='icon secteur'></img><li key={country.id} data={country.id} >{country.text}</li></div>;
            })
        }</ul>;
}

function SecteursOptions({ optionsData, handleItemSelect }) {
    return <ul>
        {optionsData.options.map(option => {
            if (option.id === 0) {
                return <div key={"div" + option.id} className='sector-list-item'><img key={"i" + option.id} src={option.icon} alt='icon secteur'></img><li key={option.id} data={option.id} onClick={handleItemSelect}>{option.text}</li></div>;
            } else {
                return <>
                    <h2 key={option.secteurName} className='sector-name'>{option.secteurName}</h2>
                    {option.branches.map(branche => {
                        return <div key={"div" + branche.id} className='sector-list-item'><img key={"i" + branche.id} src={branche.icon} alt='icon secteur'></img><li key={branche.id} data={branche.id} onClick={handleItemSelect}>{branche.text}</li></div>;
                    })}
                </>
            }

        })}
    </ul>
}

function TypeOptions({ optionsData, handleItemSelect }) {
    return optionsData.options.map(option => {
            return <div key={"div" + option.id} className='sector-list-item'><img key={"i" + option.id} src={option.icon} alt='icon secteur'></img><li key={option.id} data={option.id} onClick={handleItemSelect}>{option.text}</li></div>;
        });
}


function Select({ data, optionsType }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(data.defaultOption);

    function selectItem(event) {
        let selected = event.target.attributes.data.value;
        data.handleChanges(parseInt(selected));
        setSelectedItem(parseInt(selected));
        setIsOpen(false);
    }

    const refOne = useRef(null);
    const refTwo = useRef(null);
    useEffect(() => {
        document.addEventListener("click", handleOutsideClick,false);
    }, []);
    const handleOutsideClick = (e) => {
        if (refOne.current !== null) {
            if (!refOne.current.contains(e.target)) {
                if (!refTwo.current.contains(e.target)) {
                    setIsOpen(false);
                }
            }
		}
    }
    return <div className='selectMenu-container'>
        <div className={isOpen ? "select-container select-container-active" : "select-container"} onClick={() => setIsOpen(!isOpen)} ref={refTwo}>
            <img className='select-icon' src={data.getOption(selectedItem).icon} alt={data.title}></img>
            <div className="select-data-container">
                <label className='select-title'>{data.title}</label>
                <label className='select-selected-item'>{data.getOption(selectedItem).text}</label>
            </div>
            <div className={isOpen ? "triangle triangle-active" : "triangle"}></div>
        </div>
        <div className={isOpen ? "options-container" : "options-container options-container-closed"} ref={refOne}>
            {(() => {
                switch (optionsType) {
                    case 'tri':
                        return <SortOptions optionsData={data} handleItemSelect={selectItem} />;
                    case 'secteurs':
                        return <SecteursOptions optionsData={data} handleItemSelect={selectItem} />;
                    case 'type':
                        return <ul><TypeOptions optionsData={data} handleItemSelect={selectItem} /></ul>;
                    case 'countries':
                        return <CountriesOptions optionsData={data} handleItemSelect={selectItem} />;
                    default:
                        return <label>no options</label>;
                }
            })()}
        </div>
    </div>
}

export default Select;

