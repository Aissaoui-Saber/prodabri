import info from '../Assets/images/icons/filterBar/info.png';
import produit from '../Assets/images/icons/filterBar/box.png';
import services from '../Assets/images/icons/filterBar/tools.png';
import sondage from '../Assets/images/icons/filterBar/sondage.png';

const Types = [
    {
        id: 1,
        icon: info,
        text: "Renseignements"
    },
    {
        id: 2,
        icon: produit,
        text: "Produit & Matière"
    },
    {
        id: 3,
        icon: services,
        text: "Service"
    },
    {
        id: 4,
        icon: sondage,
        text: "Sondage"
    },
];

function getType(id) {
    let i = Types.filter(elemnt => {
        if (elemnt.id === id) {
            return elemnt;
        }
    })
    return i.length === 1 ? i[0] : null;
}

let o = { Types, getType };
export default o;