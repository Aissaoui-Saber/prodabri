import React from 'react'
import './NavBar.css'
import logo from '../Assets/images/logo_dark.svg'
import profile from '../Assets/images/profile.png'
import { useNavigate } from "react-router-dom";

function NavBar() {
    let navigate = useNavigate();
    return <div className='navbar'>
        <img className='navbar__logo' src={logo} alt='logo' onClick={() => navigate("/")}></img>
        <div className='navbar__pages'>
            <label className='navbar__pages__page' onClick={() => navigate("/Offres")} >Offres</label>
            <label className='navbar__pages__page' onClick={() => navigate("/Demandes")}>Demandes</label>
            <label className='navbar__pages__page'>Aide</label>
        </div>
        <input className='navbar__publish button' type='button' value='PUBLIER' onClick={() => navigate("/Publication")}></input>
        <div className='navbar__search'></div>
        <div className='navbar__notifications'></div>
        <div className='navbar__messages'></div>
        <div className='navbar__account'>
            <img className='navbar__account__image' src={profile} alt='messages'></img>
            <label className='navbar__account__username'>a3dsm20110123456</label>
        </div>
    </div>
}

export default NavBar;