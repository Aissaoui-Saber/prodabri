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
                id: 5,
                name: "Mètre cube",
                label: "m³"
            },
            {
                id: 6,
                name: "Kilomètre cube",
                label: "km³"
            },
            {
                id: 7,
                name: "Décimètre cube",
                label: "dm³"
            },
            {
                id: 8,
                name: "Centimètre cube",
                label: "cm³"
            },
            {
                id: 9,
                name: "Millimètre cube",
                label: "mm³"
            }
        ]
    }
];

/*
let a = <optgroup label="Aires">
<option value="volvo">Mètre carré (m&sup2;)</option>
<option value="volvo">Kilomètre carré (km&sup2;)</option>
<option value="saab">Décimètre carré (dm&sup2;)</option>
<option value="saab">Centimètre carré (cm&sup2;)</option>
<option value="saab">Millimètre carré (mm&sup2;)</option>
</optgroup>
<optgroup label="Volumes">
<option value="volvo">Mètre cube (m&sup3;)</option>
<option value="volvo">Kilomètre cube (km&sup3;)</option>
<option value="saab">Décimètre cube (dm&sup3;)</option>
<option value="saab">Centimètre cube (cm&sup3;)</option>
<option value="saab">Millimètre cube (mm&sup3;)</option>
</optgroup>
<optgroup label="Contenances">
<option value="volvo">Litre (L)</option>
<option value="saab">Décilitre (dL)</option>
<option value="saab">Centilitre (cL)</option>
<option value="saab">Millilitre (mL)</option>
</optgroup>
<optgroup label="Masses">
<option value="volvo">Gramme (g)</option>
<option value="saab">Kilogramme (kg)</option>
<option value="saab">Milligramme (mg)</option>
<option value="saab">Tonne (1000kg) (tonne)</option>
<option value="saab">Quintal (100kg) (quintal)</option>
</optgroup>
<optgroup label="Unité">
<option value="sasa">Unité (unité)</option>
</optgroup>
<optgroup label="Autres">
<option value="sasa">Ajouter une unité</option>
</optgroup>;*/

let o = [
    ...unitsFR,
]

export default o;