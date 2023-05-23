import React from 'react'
import './NavBar.css'
import logo from '../Assets/images/logo_dark.svg'
import search from '../Assets/images/icons/navBar/loupe.png'
import notification from '../Assets/images/icons/navBar/bell.png'
import messages from '../Assets/images/icons/navBar/messenger.png'
import profile from '../Assets/images/profile.png'
import { useNavigate } from "react-router-dom";

function NavBar() {
    let navigate = useNavigate();
    return <div className='navBarContainer'>
        <div id='left-block'>
            <img src={logo} alt='logo' className='logo' onClick={() =>navigate("/")}></img>
            <label className='pages' onClick={() =>navigate("/Offres")} >Offres</label>
            <label className='pages' onClick={()=>navigate("/Demandes")}>Demandes</label>
        <label className='pages'>Aide</label>
        </div>
        <div id='right-block'>
            <input type='button' value='PUBLIER' className='greenButton' onClick={ ()=>navigate("/Publication") }></input>
        <img src={search} alt='rechercher' id='search-icon'></img>
        <div className='icon-container'>
            <img src={notification} alt='notifications'></img>
            <div><p>3</p></div>
        </div>
        <div className='icon-container'>
            <img src={messages} alt='messages'></img>
            <div><p>1</p></div>
        </div>
        <div id='account'>
            <img src={profile} alt='messages' className='icon'></img>
            <label>a3dsm2011</label>
        </div>
        </div>
    </div>
}

export default NavBar;