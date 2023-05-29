import algerien from '../../../Assets/images/icons/filterBar/algerien.png';
import Select from '../../../Components/filterBar/Select';
import etranger from '../../../Assets/images/icons/filterBar/etranger.png';
import countries from '../../../Utils/Countries';
import { useState } from 'react';
function Origine({ data, handleChanges }) {
    const [selectedOrigine, setSelectedOrigine] = useState(data);

    let pays = {
        icon: etranger,
        title: "Pays",
        options: [
            { id: -1, text: "Selectionner un pays", icon: etranger },
            ...countries
        ],
        defaultOption: -1,
        selectedItem: -1,
        getOption: function (optionID) {
            return pays.options.find(opt => opt.id === optionID);
        },
        handleChanges: function (item) {
            if (item === 3) {//3 = algeria
                selectOrigine('DZ');
            } else {
                pays.selectedItem = item;
                setSelectedOrigine({ origine: selectedOrigine.origine, pays: item });
                handleChanges({ origine: selectedOrigine.origine, pays: item });
            }

        }
    }

    function selectOrigine(origine) {
        if (origine !== selectedOrigine.origine) {
            pays.selectedItem = -1;
            setSelectedOrigine({ origine: origine, pays: undefined });
            handleChanges({ origine: origine, pays: undefined });
        }
    }

    return <div className="step step__origine">
        <h1 className='step__title'>Sélectionner l'origine de votre produit ou service</h1>
        <div className={selectedOrigine.origine === 'ETR' ? "step__origine__option-etranger step__option--selected" : "step__option"} onClick={() => selectOrigine('ETR')}>
            <img className='step__option__icon' src={etranger} alt="etranger" />
            <div className='step__option__data' style={{ width: "100%", justifySelf: "start" }}>
                <h2 className='step__option__info__title'>Produit étranger</h2>
                <p className='step__option__info__description'>Le bien est fabriqué ou fournit depuis étranger</p>
            </div>
            {
                selectedOrigine.origine === 'ETR' ? <Select data={pays} optionsType="countries" /> : ""
            }

        </div>
        <br />
        <div className={selectedOrigine.origine === 'DZ' ? "step__option step__option--selected" : "step__option"} onClick={() => selectOrigine('DZ')}>
            <img className='step__option__icon' src={algerien} alt="algerie" />
            <div className='step__option__data'>
                <h2 className='step__option__info__title'>Produit Algérien</h2>
                <p className='step__option__info__description'>Le bien est fabriqué et fournit en Algérie</p>
            </div>
        </div>
    </div>
}

export default Origine;