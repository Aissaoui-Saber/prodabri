import algerien from '../../../Assets/images/icons/filterBar/algerien.png';
import Select from '../../../Components/filterBar/Select';
import etranger from '../../../Assets/images/icons/filterBar/etranger.png';
import { useState } from 'react';
function Origine({ data }) {
    const [selectedOrigine, setSelectedOrigine] = useState(data);

    function selectOrigine(origine) {
        if (origine === 'DZ') {
            data.pays.selectedItem = -1;
        }
        data.origine = origine;
        setSelectedOrigine(origine);
    }

    return <div className="step step__origine">
        <h1 className='step__title'>Sélectionner l'origine de votre produit ou service</h1>
        <div className={selectedOrigine === 'ETR' ? "step__origine__option-etranger step__option--selected" : "step__option"} onClick={() => selectOrigine('ETR')}>
            <img className='step__option__icon' src={etranger} alt="etranger" />
            <div className='step__option__data' style={{ width: "100%", justifySelf: "start" }}>
                <h2 className='step__option__info__title'>Produit étranger</h2>
                <p className='step__option__info__description'>Le bien est fabriqué ou fournit depuis étranger</p>
            </div>
            {
                selectedOrigine === 'ETR' ? <Select data={data.pays} optionsType="countries" /> : ""
            }

        </div>
        <br />
        <div className={selectedOrigine === 'DZ' ? "step__option step__option--selected" : "step__option"} onClick={() => selectOrigine('DZ')}>
            <img className='step__option__icon' src={algerien} alt="algerie" />
            <div className='step__option__data'>
                <h2 className='step__option__info__title'>Produit Algérien</h2>
                <p className='step__option__info__description'>Le bien est fabriqué et fournit en Algérie</p>
            </div>
        </div>
    </div>
}

export default Origine;