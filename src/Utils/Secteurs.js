//Secteurs
import agriculture from './../Assets/images/icons/filterBar/secteurs/agriculture.png';
import matiers from './../Assets/images/icons/filterBar/secteurs/matiers.png';
import mine from './../Assets/images/icons/filterBar/secteurs/mine.png';
import pecherie from './../Assets/images/icons/filterBar/secteurs/fish.png';
import agroalimentaire from './../Assets/images/icons/filterBar/secteurs/aliments.png';
import btp from './../Assets/images/icons/filterBar/secteurs/btp.png';
import electronics from './../Assets/images/icons/filterBar/secteurs/electronics.png';
import chimique from './../Assets/images/icons/filterBar/secteurs/laboratoire.png';
import pharmacie from './../Assets/images/icons/filterBar/secteurs/pharmacie.png';
import vetements from './../Assets/images/icons/filterBar/secteurs/vetements.png';
import papetiere from './../Assets/images/icons/filterBar/secteurs/printing.png';
import bois from './../Assets/images/icons/filterBar/secteurs/bois.png';
import artisanat from './../Assets/images/icons/filterBar/secteurs/artisanat.png';
import plastique from './../Assets/images/icons/filterBar/secteurs/plastique.png';
import metal from './../Assets/images/icons/filterBar/secteurs/metal.png';
import equipments from './../Assets/images/icons/filterBar/secteurs/equipements.png';
import electromenager from './../Assets/images/icons/filterBar/secteurs/electromenager.png';
import commerce from './../Assets/images/icons/filterBar/secteurs/commerce.png';
import serviceAlaPersonne from './../Assets/images/icons/filterBar/secteurs/serviceAlaPersonne.png';
import b2b from './../Assets/images/icons/filterBar/secteurs/b2b.png';
import finance from './../Assets/images/icons/filterBar/secteurs/finance.png';
import restauration from './../Assets/images/icons/filterBar/secteurs/restauration.png';
import transport from './../Assets/images/icons/filterBar/secteurs/transport.png';


export function getSecteur(id) {
    for (let i = 0; i < secteurs_FR.length; i++) {
        for (let j = 0; j < secteurs_FR[i].branches.length; j++) {
            if (id === secteurs_FR[i].branches[j].id) {
                return {
                    fr: secteurs_FR[i].branches[j],
                    ar: secteurs_AR[i].branches[j]
                }
            }
        }
    }
    return null;
}

const secteurs_FR = [
    {
        secteurName: "SECTEUR PRIMAIRE",
        branches: [
            {
                id: 1,
                icon: agriculture,
                text: "Agriculture, élevage des animaux"
            },
            {
                id: 2,
                icon: matiers,
                text: "Matières premières (Métal, Plastique, Bois, Papier, ... etc.)"
            },
            {
                id: 3,
                icon: mine,
                text: "Extraction (Forage, Mines, carrière, ... etc.)"
                },
            {
                id: 4,
                icon: pecherie,
                text: "Pècherie et exploitation maritime"
            },
        ]
},
    {
        secteurName: "SECTEUR SECONDIARE",
        branches: [
            {
                id: 5,
                icon: agroalimentaire,
                text: "Industrie agroalimentaire"
            },
            {
                id: 6,
                icon: btp,
                text: "Bàtiments et travaux publics (BTP)"
            },
            {
                id: 7,
                icon: electronics,
                text: "Industrie électronique"
            },
            {
                id: 8,
                icon: chimique,
                text: "Industrie chimique"
            },
            {
                id: 9,
                icon: pharmacie,
                text: "Industries Pharmaceutique"
            },
            {
                id: 10,
                icon: vetements,
                text: "Industrie Textile, Cuir"
            },
            {
                id: 11,
                icon: papetiere,
                text: "Industrie papetière"
            },
            {
                id: 12,
                icon: bois,
                text: "Industrie de bois"
            },
            {
                id: 13,
                icon: artisanat,
                text: "Artisanat"
            },
            {
                id: 14,
                icon: plastique,
                text: "Industrie du plastique"
            },
            {
                id: 15,
                icon: metal,
                text: "Industrie métallurgie"
            },
            {
                id: 16,
                icon: equipments,
                text: "Équipements"
            },
            {
                id: 17,
                icon: electromenager,
                text: "Industrie électroménager"
            },
        ]
    },
    {
        secteurName: "SECTEUR TERTIAIRE",
        branches: [
            {
                id: 18,
                icon: commerce,
                text: "Commerce"
            },
            {
                id: 19,
                icon: serviceAlaPersonne,
                text: "Service à la personne"
            },
            {
                id: 20,
                icon: b2b,
                text: "B2B (Business to business)"
            },
            {
                id: 21,
                icon: finance,
                text: "Finance"
            },
            {
                id: 22,
                icon: restauration,
                text: "Hébergement et restauration"
            },
            {
                id: 23,
                icon: transport,
                text: "Transport"
            },
        ]
    },
];

const secteurs_AR = [
    {
        secteurName: "SECTEUR PRIMAIRE",
        branches: [
            {
                id: 1,
                icon: agriculture,
                text: "Agriculture, élevage des animaux"
            },
            {
                id: 2,
                icon: matiers,
                text: "Matières premières (Métal, Plastique, Bois, Papier, ... etc.)"
            },
            {
                id: 3,
                icon: mine,
                text: "Extraction (Forage, Mines, carrière,... etc.)"
            },
            {
                id: 4,
                icon: pecherie,
                text: "Pècherie et exploitation maritime"
            },
        ]
    },
    {
        secteurName: "SECTEUR SECONDIARE",
        branches: [
            {
                id: 5,
                icon: agroalimentaire,
                text: "Industrie agroalimentaire"
            },
            {
                id: 6,
                icon: btp,
                text: "Bàtiments et travaux publics (BTP)"
            },
            {
                id: 7,
                icon: electronics,
                text: "Industrie électronique"
            },
            {
                id: 8,
                icon: chimique,
                text: "Industrie chimique"
            },
            {
                id: 9,
                icon: pharmacie,
                text: "Industries Pharmaceutique"
            },
            {
                id: 10,
                icon: vetements,
                text: "Industrie Textile, Cuir"
            },
            {
                id: 11,
                icon: papetiere,
                text: "Industrie papetière"
            },
            {
                id: 12,
                icon: bois,
                text: "Industrie de bois"
            },
            {
                id: 13,
                icon: artisanat,
                text: "Artisanat"
            },
            {
                id: 14,
                icon: plastique,
                text: "Industrie du plastique"
            },
            {
                id: 15,
                icon: metal,
                text: "Industrie métallurgie"
            },
            {
                id: 16,
                icon: equipments,
                text: "Équipements"
            },
            {
                id: 17,
                icon: electromenager,
                text: "Industrie électroménager"
            },
        ]
    },
    {
        secteurName: "SECTEUR TERTIAIRE",
        branches: [
            {
                id: 18,
                icon: commerce,
                text: "Commerce"
            },
            {
                id: 19,
                icon: serviceAlaPersonne,
                text: "Service à la personne"
            },
            {
                id: 20,
                icon: b2b,
                text: "B2B (Business to business)"
            },
            {
                id: 21,
                icon: finance,
                text: "Finance"
            },
            {
                id: 22,
                icon: restauration,
                text: "Hébergement et restauration"
            },
            {
                id: 23,
                icon: transport,
                text: "Transport"
            },
        ]
    },
];
let o = { secteurs_FR, getSecteur };
export default o;