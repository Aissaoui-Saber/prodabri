const unitsFR = [
    {
        name: "Longueurs",
        units: [
            {
                id: 0,
                name: "Mètre",
                label: "m"
            },
            {
                id: 1,
                name: "Kilomètre",
                label: "km"
            },
            {
                id: 2,
                name: "Décimètre",
                label: "dm"
            },
            {
                id: 3,
                name: "Centimètre",
                label: "cm"
            },
            {
                id: 4,
                name: "Millimètre",
                label: "mm"
            }
        ]
    },
    {
        name: "Aires",
        units: [
            {
                id: 5,
                name: "Mètre carré",
                label: "m²"
            },
            {
                id: 6,
                name: "Kilomètre carré",
                label: "km²"
            },
            {
                id: 7,
                name: "Décimètre carré",
                label: "dm²"
            },
            {
                id: 8,
                name: "Centimètre carré",
                label: "cm²"
            },
            {
                id: 9,
                name: "Millimètre carré",
                label: "mm²"
            }
        ]
    },
    {
        name: "Volumes",
        units: [
            {
                id: 10,
                name: "Mètre cube",
                label: "m³"
            },
            {
                id: 11,
                name: "Kilomètre cube",
                label: "km³"
            },
            {
                id: 12,
                name: "Décimètre cube",
                label: "dm³"
            },
            {
                id: 13,
                name: "Centimètre cube",
                label: "cm³"
            },
            {
                id: 14,
                name: "Millimètre cube",
                label: "mm³"
            }
        ]
    },
    {
        name: "Contenances",
        units: [
            {
                id: 15,
                name: "Litre",
                label: "L"
            },
            {
                id: 16,
                name: "Décilitre",
                label: "dL"
            },
            {
                id: 17,
                name: "Centilitre",
                label: "cL"
            },
            {
                id: 18,
                name: "Millilitre",
                label: "mL"
            }
        ]
    },
    {
        name: "Masses",
        units: [
            {
                id: 19,
                name: "Gramme",
                label: "g"
            },
            {
                id: 20,
                name: "Kilogramme",
                label: "kg"
            },
            {
                id: 21,
                name: "Milligramme",
                label: "mg"
            },
            {
                id: 22,
                name: "Tonne (1000kg)",
                label: "tonne"
            },
            {
                id: 23,
                name: "Quintal (100kg)",
                label: "quintal"
            }
        ]
    },
    {
        name: "Unité",
        units: [
            {
                id: 24,
                name: "Unité",
                label: "unité"
            },
        ]
    },
    {
        name: "Autres",
        units: [
            {
                id: -1,
                name: "Ajouter une unité",
            },
        ]
    },
];

function getUnit(id){
    let found = null;
    for (let i=0; i<unitsFR.length; i++){
        found = unitsFR[i].units.filter(unit => {return unit.id === id});
        if (found.length !== 0 ){
            break;
        }
    }
    return found.length === 0 ? null : found[0];
}

//D52343

let o = {
    unitsFR,
    getUnit
}

export default o;