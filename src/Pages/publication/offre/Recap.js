import './Recap.css';
import sect from './../../../Assets/images/icons/filterBar/secteurs.png'
import etranger from '../../../Assets/images/icons/filterBar/etranger.png';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { useState, useRef, useEffect } from 'react';
import pin from './../../../Assets/images/icons/filterBar/placeholder.png'
import store from '../../../Assets/images/store.png';
import SelectLieu from '../../../Components/filterBar/SelectLieu/SelectLieu';
import productImage from './../../../Assets/images/icons/annonce/product.jpg';

function Recapitulatif({ data }) {

    useEffect(() => {
        const L = require("leaflet");

        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
            iconUrl: require("leaflet/dist/images/marker-icon.png"),
            shadowUrl: require("leaflet/dist/images/marker-shadow.png")
        });
    }, []);
    return <div className="step step__recap">
        <div className="step__recap__header">
            <h1 className="step__title">Sécteur</h1>
            <label className="step__recap__modifier">Modifier</label>
        </div>
        <div className="step__recap__branche">
            <img className='step__secteurs__branche__icon' src={sect} alt="secteur" />
            <label className='step__recap__branche__name'>Industries Pharmaceutique</label>
        </div>
        <div className="step__recap__header">
            <h1 className="step__title">Type</h1>
            <label className="step__recap__modifier">Modifier</label>
        </div>
        <div className="step__recap__type">
            <img className='step__secteurs__branche__icon' src={sect} alt="secteur" />
            <label className='step__recap__branche__name'>Bien de consomation</label>
        </div>
        <div className="step__recap__type">
            <img className='step__secteurs__branche__icon' src={sect} alt="secteur" />
            <label className='step__recap__branche__name'>Bien de production</label>
        </div>
        <div className="step__recap__header">
            <h1 className="step__title">Origine</h1>
            <label className="step__recap__modifier">Modifier</label>
        </div>
        <div className="step__recap__origine">
            <img className='step__recap__origine__icon' src={sect} alt="secteur" />
            <label className='step__recap__branche__name'>Produit étranger</label>
            <label className='step__recap__origine__country'>Italie</label>
        </div>
        <div className="step__recap__header">
            <h1 className="step__title">Durabilité</h1>
            <label className="step__recap__modifier">Modifier</label>
        </div>
        <div className="step__recap__durabilite">
            <img className='step__secteurs__branche__icon' src={sect} alt="secteur" />
            <label className='step__recap__branche__name'>Durable</label>
        </div>
        <div className="step__recap__header">
            <h1 className="step__title">Détails</h1>
            <label className="step__recap__modifier">Modifier</label>
        </div>
        <div className="step__recap__details">
            <h2 className='step__recap__details__title'>Titre</h2>
            <p className='step__recap__details__text'>Durable epj dieko ezkokfezp kfzek  opokpk</p>
            <h2 className='step__recap__details__title'>Marque</h2>
            <p className='step__recap__details__text'>Durable epj dieko ezkokfezp kfzek  opokpk</p>
            <h2 className='step__recap__details__title'>description</h2>
            <p className='step__recap__details__text'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            <h2 className='step__recap__details__title'>Liens</h2>
            <div className='step__recap__details__link'>
                <img className='step__recap__details__link__icon' src={etranger} alt="lien"></img>
                <label className='step__recap__details__link__title'>link 1</label>
                <p className='step__recap__details__link__url'>https://www.google.com/page</p>
            </div>
            <div className='step__recap__details__link'>
                <img className='step__recap__details__link__icon' src={etranger} alt="lien"></img>
                <label className='step__recap__details__link__title'>link 2</label>
                <p className='step__recap__details__link__url'>https://www.google.com/page</p>
            </div>
            <div className='step__recap__details__link'>
                <img className='step__recap__details__link__icon' src={etranger} alt="lien"></img>
                <label className='step__recap__details__link__title'>link 3</label>
                <p className='step__recap__details__link__url'>https://www.google.com/page</p>
            </div>
        </div>
        <div className="step__recap__header">
            <h1 className="step__title">Emplacements</h1>
            <label className="step__recap__modifier">Modifier</label>
        </div>
        <h2 className='step__recap__details__title'>Lieux de production (4 Villes)</h2>
        <div className='recap__lieux'>
            <div className='recap__lieux__villes'>
                <div className='recap__lieux__ville'>
                    <img className='recap__lieux__ville__icon' alt='pin' src={pin}></img>
                    <label className='recap__lieux__ville__commune'>Khelil</label>
                    <label className='recap__lieux__ville__wilaya'>Bordj Bou Arreridj</label>
                </div>
                <div className='recap__lieux__ville'>
                    <img className='recap__lieux__ville__icon' alt='pin' src={pin}></img>
                    <label className='recap__lieux__ville__commune'>Khelil</label>
                    <label className='recap__lieux__ville__wilaya'>Bordj Bou Arreridj</label>
                </div>
                <div className='recap__lieux__ville'>
                    <img className='recap__lieux__ville__icon' alt='pin' src={pin}></img>
                    <label className='recap__lieux__ville__commune'>Khelil</label>
                    <label className='recap__lieux__ville__wilaya'>Bordj Bou Arreridj</label>
                </div>
                <div className='recap__lieux__ville'>
                    <img className='recap__lieux__ville__icon' alt='pin' src={pin}></img>
                    <label className='recap__lieux__ville__commune'>Khelil</label>
                    <label className='recap__lieux__ville__wilaya'>Bordj Bou Arreridj</label>
                </div>
            </div>
            <MapContainer center={[36.333333,5.083333]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.google.com/intl/en-GB_ALL/permissions/geoguidelines/">Google Maps</a>'
                    url="https://mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                //url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[36.181113, 5.026789]}></Marker>
            </MapContainer>
        </div>
        <h2 className='step__recap__details__title'>Lieux de vente (4 Villes)</h2>
        <div className='step__recap__lieux__store'>
            <img className='step__recap__lieux__store__icon' src={store} alt="store"></img>
            <label className='step__recap__lieux__store__title'>Boutique en ligne</label>
            <p className='step__recap__lieux__store__url'>https://www.google.com/page</p>
        </div>
        <div className='recap__lieux'>
            <div className='recap__lieux__villes'>
                <div className='recap__lieux__ville'>
                    <img className='recap__lieux__ville__icon' alt='pin' src={pin}></img>
                    <label className='recap__lieux__ville__commune'>Khelil</label>
                    <label className='recap__lieux__ville__wilaya'>Bordj Bou Arreridj</label>
                </div>
                <div className='recap__lieux__ville'>
                    <img className='recap__lieux__ville__icon' alt='pin' src={pin}></img>
                    <label className='recap__lieux__ville__commune'>Khelil</label>
                    <label className='recap__lieux__ville__wilaya'>Bordj Bou Arreridj</label>
                </div>
                <div className='recap__lieux__ville'>
                    <img className='recap__lieux__ville__icon' alt='pin' src={pin}></img>
                    <label className='recap__lieux__ville__commune'>Khelil</label>
                    <label className='recap__lieux__ville__wilaya'>Bordj Bou Arreridj</label>
                </div>
                <div className='recap__lieux__ville'>
                    <img className='recap__lieux__ville__icon' alt='pin' src={pin}></img>
                    <label className='recap__lieux__ville__commune'>Khelil</label>
                    <label className='recap__lieux__ville__wilaya'>Bordj Bou Arreridj</label>
                </div>
            </div>
            <MapContainer center={[36.181113, 5.026789]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.google.com/intl/en-GB_ALL/permissions/geoguidelines/">Google Maps</a>'
                    url="https://mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                //url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[36.181113, 5.026789]}></Marker>
            </MapContainer>
        </div>
        <h2 className='step__recap__details__title'>Lieux de livraison (4 Villes)</h2>
        <div style={{width: "40%", margin: "10px 0px"}}>
            <SelectLieu readOnly={true} title={"Lieux de livraison"} value={"350 Villes"} data={data.localisations.lieux_de_livraison.select.wilayas}></SelectLieu>
        </div>
        <div className="step__recap__header">
            <h1 className="step__title">Média</h1>
            <label className="step__recap__modifier">Modifier</label>
        </div>
        <h2 className='step__recap__details__title'>Images (10 / 10)</h2>
        <div className="step__recap__media__grid">
            <div className="step__recap__media__image step__recap__media__image--main" style={{backgroundImage:`url(${productImage})`}}></div>
            <div className="step__recap__media__image" style={{backgroundImage:`url(${productImage})`}}></div>
            <div className="step__recap__media__image" style={{backgroundImage:`url(${productImage})`}}></div>
            <div className="step__recap__media__image" style={{backgroundImage:`url(${productImage})`}}></div>
            <div className="step__recap__media__image" style={{backgroundImage:`url(${productImage})`}}></div>
            <div className="step__recap__media__image" style={{backgroundImage:`url(${productImage})`}}></div>
            <div className="step__recap__media__image" style={{backgroundImage:`url(${productImage})`}}></div>
            <div className="step__recap__media__image" style={{backgroundImage:`url(${productImage})`}}></div>
            <div className="step__recap__media__image" style={{backgroundImage:`url(${productImage})`}}></div>
            <div className="step__recap__media__image" style={{backgroundImage:`url(${productImage})`}}></div>
        </div>
        <h2 className='step__recap__details__title'>Vidéo (0 / 1)</h2>
        <div className="step__media__grid">
            <div className="step__recap__media__image"></div>
        </div>
    </div>

}
export default Recapitulatif;