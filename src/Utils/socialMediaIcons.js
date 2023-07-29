import facebook from './../Assets/images/icons/social/facebook.png';
import instagram from './../Assets/images/icons/social/instagram.png';
import snapchat from './../Assets/images/icons/social/snapchat.png';
import tikTok from './../Assets/images/icons/social/tik-tok.png';
import twitter from './../Assets/images/icons/social/twitter.png';
import youtube from './../Assets/images/icons/social/youtube.png';

import etranger from './../Assets/images/icons/filterBar/etranger.png';


const icons = [
    {
        id: 0,
        name: "facebook",
        icon: facebook
    },
    {
        id: 1,
        name: "instagram",
        icon: instagram
    },
    {
        id: 2,
        name: "snapchat",
        icon: snapchat
    },
    {
        id: 3,
        name: "tiktok",
        icon: tikTok
    },
    {
        id: 4,
        name: "twitter",
        icon: twitter
    },
    {
        id: 5,
        name: "youtube",
        icon: youtube
    }
];

export default function findIcon(url) {
    for (let i = 0; i < icons.length; i++) {
        if (url.includes(icons[i].name)) {
            return icons[i].icon;
        }
    }
    return etranger;
}

