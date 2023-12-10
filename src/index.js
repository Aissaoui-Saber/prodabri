import React from 'react';
import ReactDOM from 'react-dom/client';
import Offres from './Pages/Offres/Offres';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Demandes from './Pages/Demandes/Demandes';
import Home from './Pages/Home/Home';
import Publication from './Pages/publication/Publication';
import OffreCreation from './Pages/publication/offre/OffreCreation';
import Test from './Test';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Offres" element={<Offres />} />
                <Route path="/Demandes" element={<Demandes />} />
                <Route path="/Publication" element={<Publication />} />
                <Route path="/Publication/Offre" element={<OffreCreation />} />
                <Route path="/test" element={<Test />} />
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);