import './Media.css';
import '../../../Assets/Styles/global_Style.css';
import productImage from './../../../Assets/images/icons/annonce/product.jpg';

function Media() {
    return <div className="step step__media">
        <div className='step__media__header'>
            <h1 className='step__title'>Images (0 / 10)</h1>
            <input className='button button--green step__media__add' type='button' value="AJOUTER" ></input>
        </div>
        <div className="step__media__grid">
            <div className="step__media__grid__image step__media__grid__image--main" style={{backgroundImage:`url(${productImage})`}}></div>
            <div className="step__media__grid__image" style={{backgroundImage:`url(${productImage})`}}></div>
            <div className="step__media__grid__image" style={{backgroundImage:`url(${productImage})`}}></div>
            <div className="step__media__grid__image" style={{backgroundImage:`url(${productImage})`}}></div>
            <div className="step__media__grid__image" style={{backgroundImage:`url(${productImage})`}}></div>
            <div className="step__media__grid__image" style={{backgroundImage:`url(${productImage})`}}></div>
            <div className="step__media__grid__image" style={{backgroundImage:`url(${productImage})`}}></div>
            <div className="step__media__grid__image" style={{backgroundImage:`url(${productImage})`}}></div>
            <div className="step__media__grid__image" style={{backgroundImage:`url(${productImage})`}}></div>
            <div className="step__media__grid__image" style={{backgroundImage:`url(${productImage})`}}></div>
        </div>
        <div className='step__media__header'>
            <h1 className='step__title'>Vidéo (0 / 1)</h1>
            <input className='button button--green step__media__add' type='button' value="AJOUTER" ></input>
        </div>
        <div className="step__media__grid">
            <div className="step__media__grid__image"></div>
        </div>
    </div>
}
export default Media;