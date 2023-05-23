import React from 'react';
import ReactDOM from 'react-dom/client';
import Offres from './Pages/Offres/Offres';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Demandes from './Pages/Demandes/Demandes';
import Home from './Pages/Home/Home';
import Publication from './Pages/publication/Publication';
import OffreCreation from './Pages/publication/offre/OffreCreation';


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Offres" element={<Offres />} />
                <Route path="/Demandes" element={<Demandes />} />
                <Route path="/Publication" element={<Publication />} />
                <Route path="/Publication/Offre" element={<OffreCreation />} />
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);