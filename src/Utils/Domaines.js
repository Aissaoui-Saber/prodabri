
const domaines_fr = [
    {
        id: 0,
        name: "Droit & l�gislation"
    },
    {
        id: 1,
        name: "Gestion financi�re & Comptabilit�"
    },
    {
        id: 2,
        name: "Commerce & Vente"
    },
    {
        id: 3,
        name: "Marketing & Publicit�"
    },
    {
        id: 4,
        name: "Management & Leadership"
    },
    {
        id: 5,
        name: "Sant�, Hygi�ne & S�curit�"
    },
    {
        id: 6,
        name: "Commerce & Vente"
    },
    {
        id: 7,
        name: "Transport & Logistique"
    },
    {
        id: 8,
        name: "Construction & Baiment"
    },
    {
        id: 9,
        name: "Agriculture & Elvage des animaux"
    },
];


function getDomaine(id) {
    let i = domaines_fr.filter(elemnt => {
        if (elemnt.id === id) {
            return elemnt;
        }
    })
    return i.length === 1 ? i[0] : null;
}

let o = { domaines_fr, getDomaine };
export default o;