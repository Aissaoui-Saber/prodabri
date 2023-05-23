import './Select.css';

//import '../../Assets/Styles/global_Style.css';
import { useState, useEffect, useRef } from 'react';

function SortOptions({ optionsData, handleItemSelect }) {
    return <div className='options__tri'>
        {optionsData.options.map(option => {
            return <label className='options__tri__item' data={option.id} onClick={handleItemSelect}>{option.text}</label>;
        })}</div>;
}

function CountriesOptions({ optionsData, handleItemSelect }) {
    return <div className='options__countries'>
        {
            optionsData.options.map(country => {
                return <div className='options__countries__item' onClick={handleItemSelect} data={country.id}><img className='options__countries__item__icon' onClick={handleItemSelect} data={country.id} src={country.icon} alt='flag'></img><label className='options__countries__item__name' data={country.id} onClick={handleItemSelect}>{country.text}</label></div>;
            })
        }</div>;
}

function SecteursOptions({ optionsData, handleItemSelect }) {
    return <div className='options__sectors'>
        {optionsData.options.map(option => {
            if (option.id === 0) {
                return <div className='options__sectors__item' data={option.id} onClick={handleItemSelect}><img className="options__sectors__item__icon" src={option.icon} alt='secteur'></img><label className="options__sectors__item__name" data={option.id} onClick={handleItemSelect}>{option.text}</label></div>;
            } else {
                return <>
                    <h2 className='options__sectors__groupName'>{option.secteurName}</h2>
                    {option.branches.map(branche => {
                        return <div className='options__sectors__item'  data={branche.id} onClick={handleItemSelect}><img className='options__sectors__item__icon' onClick={handleItemSelect} data={branche.id} src={branche.icon} alt='secteur'></img><label className='options__sectors__item__name' data={branche.id} onClick={handleItemSelect}>{branche.text}</label></div>;
                    })}
                </>
            }

        })}
    </div>
}

function TypeOptions({ optionsData, handleItemSelect }) {
    return <div className='options__demandeType'>{
        optionsData.options.map(option => {
            return <div className='options__demandeType__item' data={option.id} onClick={handleItemSelect}><img className='options__demandeType__item__icon' src={option.icon} alt='type de demande' data={option.id} onClick={handleItemSelect}></img><label className='options__demandeType__item__name' data={option.id} onClick={handleItemSelect}>{option.text}</label></div>;
        })}
    </div>
}


function Select({ data, optionsType }) {
    const [isOpen, setIsOpen] = useState(true);
    const [selectedItem, setSelectedItem] = useState(data.defaultOption);

    function selectItem(event) {
        let selected = event.target.attributes.data.value;
        data.handleChanges(parseInt(selected));
        setSelectedItem(parseInt(selected));
        setIsOpen(false);
    }

    const optionsRef = useRef(null);
    const selectRef = useRef(null);
    useEffect(() => {
        document.addEventListener("click", handleOutsideClick, false);
    }, []);
    const handleOutsideClick = (e) => {
        if (optionsRef.current !== null) {
            if (!optionsRef.current.contains(e.target)) {
                if (!selectRef.current.contains(e.target)) {
                    setIsOpen(false);
                }
            }
        }
    }
    return <div className='selectMenu-container'>
        <div className={isOpen ? "select select--active" : "select"} onClick={() => setIsOpen(!isOpen)} ref={selectRef}>
            <img className='select__icon' src={data.getOption(selectedItem).icon} alt={data.title}></img>
            <div className="select__data">
                <label className='select__data__title'>{data.title}</label>
                <label className='select__data__value'>{data.getOption(selectedItem).text}</label>
            </div>
            <div className={isOpen ? "select__triangle select__triangle--active" : "select__triangle"}></div>
        </div>
        <div className={isOpen ? "options" : "options options--closed"} ref={optionsRef}>
            {(() => {
                switch (optionsType) {
                    case 'tri':
                        return <SortOptions optionsData={data} handleItemSelect={selectItem} />;
                    case 'secteurs':
                        return <SecteursOptions optionsData={data} handleItemSelect={selectItem} />;
                    case 'type':
                        return <TypeOptions optionsData={data} handleItemSelect={selectItem} />;
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

