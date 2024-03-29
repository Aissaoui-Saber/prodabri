import Select from "./Select";
import Switch from "./Switch";
import './FilterBar.css';
import SelectCities from "./SelectCities/SelectCities";
import secteurs from "../../Utils/Secteurs";
import Demande from '../../Utils/DemandeTypes';

import sort from '../../Assets/images/icons/filterBar/sort.png';
import map from '../../Assets/images/icons/filterBar/map.png';
import list from '../../Assets/images/icons/filterBar/option.png';
import secteursIcon from '../../Assets/images/icons/filterBar/secteurs.png';
import production from '../../Assets/images/icons/filterBar/production.png';
import consomation from '../../Assets/images/icons/filterBar/consomation.png';
import algerien from '../../Assets/images/icons/filterBar/algerien.png';
import etranger from '../../Assets/images/icons/filterBar/etranger.png';
import durable from '../../Assets/images/icons/filterBar/durable.png';
import nonDurable from '../../Assets/images/icons/filterBar/non-durable.png';
import demandes from '../../Assets/images/icons/filterBar/demandes.png';


function FilterBar({filterType}){
   
    let offresFilterData = {
        tri: {
            icon:sort,
            title: "Trier par",
            options: [
                { id: 0, text: "Date (Plus récent)", icon: sort },
                { id: 1, text: "Date (Plus ancien)", icon: sort},
                { id: 2, text: "Note", icon: sort}
            ],
            getOption: function (optionID) {
                return offresFilterData.tri.options.find(opt => opt.id === optionID);
            },
            defaultOption: 0,
            selectedItem: 0,
            handleChanges: function (selectedItem){
                offresFilterData.tri.selectedItem = selectedItem;
                
            }
        },
        affichage: {
            options:[
                {
                    id:0,
                    name:"Liste",
                    icon: list,
                },
                {
                    id:1,
                    name:"Carte",
                    icon: map,
                },
            ],
            defaultOption: 0,
            selectedItem: 0,
            handleChanges: function (selectedItem){
                offresFilterData.affichage.selectedItem = selectedItem;
                console.log(selectedItem);
            }
        },
        lieux_De_Production: {
            wilayas: [
                {
                    wilayaNumber: 1,
                    name: "Adrar",
                    checked: false,
                    communes: [
                        {id:120,name:"Commune 1",checked: false},
                        {id:220,name:"Commune 2",checked: false},
                        {id:320,name:"Commune 3",checked: false},
                    ]
                },
                {
                    wilayaNumber:2,
                    name: "Chlef",
                    checked: false,
                    communes: [
                        {id:420,name:"Commune 4",checked: false},
                        {id:5020,name:"Commune 5",checked: false},
                        {id:602,name:"Commune 6",checked: false},
                        {id:1020,name:"Commune 10",checked: false},
                        {id:11020,name:"Commune 11",checked: false},
                        {id:1202,name:"Commune 12",checked: false},
                    ]
                },
                {
                    wilayaNumber: 3,
                    name: "Laghouat",
                    checked: false,
                    communes: [
                        {id:702,name:"Commune 7",checked: false},
                        {id:820,name:"Commune 8",checked: false},
                        {id:920,name:"Commune 9",checked: false},
                    ]
                },
            ],
            defaultOption: false,
            handleChanges: function (selectedCities){
                offresFilterData.lieux_De_Production.wilayas = selectedCities;
            }
        },
        lieux_De_Vente: {
            wilayas: [
                {
                    wilayaNumber: 1,
                    name: "Adrar",
                    checked: false,
                    communes: [
                        {id:120,name:"Commune 1",checked: false},
                        {id:220,name:"Commune 2",checked: false},
                        {id:320,name:"Commune 3",checked: false},
                    ]
                },
                {
                    wilayaNumber:2,
                    name: "Chlef",
                    checked: false,
                    communes: [
                        {id:420,name:"Commune 4",checked: false},
                        {id:5020,name:"Commune 5",checked: false},
                        {id:602,name:"Commune 6",checked: false},
                        {id:1020,name:"Commune 10",checked: false},
                        {id:11020,name:"Commune 11",checked: false},
                        {id:1202,name:"Commune 12",checked: false},
                    ]
                },
                {
                    wilayaNumber: 3,
                    name: "Laghouat",
                    checked: false,
                    communes: [
                        {id:702,name:"Commune 7",checked: false},
                        {id:820,name:"Commune 8",checked: false},
                        {id:920,name:"Commune 9",checked: false},
                    ]
                },
            ],
            defaultOption: false,
            handleChanges: function (selectedCities){
                offresFilterData.lieux_De_Production.wilayas = selectedCities;
            }
        },
        lieux_De_Livraison: {
            wilayas: [
                {
                    wilayaNumber: 1,
                    name: "Adrar",
                    checked: false,
                    communes: [
                        {id:120,name:"Commune 1",checked: false},
                        {id:220,name:"Commune 2",checked: false},
                        {id:320,name:"Commune 3",checked: false},
                    ]
                },
                {
                    wilayaNumber:2,
                    name: "Chlef",
                    checked: false,
                    communes: [
                        {id:420,name:"Commune 4",checked: false},
                        {id:5020,name:"Commune 5",checked: false},
                        {id:602,name:"Commune 6",checked: false},
                        {id:1020,name:"Commune 10",checked: false},
                        {id:11020,name:"Commune 11",checked: false},
                        {id:1202,name:"Commune 12",checked: false},
                    ]
                },
                {
                    wilayaNumber: 3,
                    name: "Laghouat",
                    checked: false,
                    communes: [
                        {id:702,name:"Commune 7",checked: false},
                        {id:820,name:"Commune 8",checked: false},
                        {id:920,name:"Commune 9",checked: false},
                    ]
                },
            ],
            defaultOption: false,
            handleChanges: function (selectedCities){
                offresFilterData.lieux_De_Production.wilayas = selectedCities;
            }
        },
        secteurs: {
            icon:secteursIcon,
            title: "Secteur d'activité",
            options:[
                {
                    id:0,
                    icon: secteursIcon,
                    text: "Tout les secteurs"
                },
                ...(secteurs.secteurs_FR)
            ],
            defaultOption: 0,
            selectedItem: 0,
            handleChanges: function (selectedItem){
                offresFilterData.secteurs.selectedItem = selectedItem;
            },
            getOption: function (optionID) {
                if (optionID === 0) {
                    return offresFilterData.secteurs.options[0];
                } else {
                    return secteurs.getSecteur(optionID).fr;
                }
            },
        },
        type: {
            options:[
                {
                    id:0,
                    name:"Bien de consomation",
                    icon: consomation,
                },
                {
                    id:1,
                    name:"Bien de production",
                    icon: production,
                },
            ],
            defaultOption: -1,
            selectedItem: -1,
            handleChanges: function (selectedItem){
                offresFilterData.type.selectedItem = selectedItem;
            }
        },
        origine: {
            options:[
                {
                    id:0,
                    name:"Algérien",
                    icon: algerien,
                },
                {
                    id:1,
                    name:"Étranger",
                    icon: etranger,
                },
            ],
            defaultOption: -1,
            selectedItem: -1,
            handleChanges: function (selectedItem){
                offresFilterData.origine.selectedItem = selectedItem;
            }
        },
        durabilite: {
            options:[
                {
                    id:0,
                    name:"Durable",
                    icon: durable,
                },
                {
                    id:1,
                    name:"Non durable",
                    icon: nonDurable,
                },
            ],
            defaultOption: -1,
            selectedItem: -1,
            handleChanges: function (selectedItem){
                offresFilterData.durabilite.selectedItem = selectedItem;
            }
        },
        
    }
    let demandesFilterData = {
        tri: {
            icon: sort,
            title: "Trier par",
            options: [
                { id: 0, text: "Date (Plus récent)", icon: sort },
                { id: 1, text: "Date (Plus ancien)", icon: sort },
            ],
            defaultOption: 0,
            selectedItem: 0,
            handleChanges: function (selectedItem) {
                demandesFilterData.tri.selectedItem = selectedItem;

            },
            getOption: function (optionID) {
                return demandesFilterData.tri.options.find(opt => opt.id === optionID);
            },
        },
        affichage: {
            options: [
                {
                    id: 0,
                    name: "Liste",
                    icon: list,
                },
                {
                    id: 1,
                    name: "Carte",
                    icon: map,
                },
            ],
            defaultOption: 0,
            selectedItem: 0,
            handleChanges: function (selectedItem) {
                offresFilterData.affichage.selectedItem = selectedItem;
                console.log(selectedItem);
            }
        },
        lieux_De_demande: {
            wilayas: [
                {
                    wilayaNumber: 1,
                    name: "Adrar",
                    checked: false,
                    communes: [
                        { id: 120, name: "Commune 1", checked: false },
                        { id: 220, name: "Commune 2", checked: false },
                        { id: 320, name: "Commune 3", checked: false },
                    ]
                },
                {
                    wilayaNumber: 2,
                    name: "Chlef",
                    checked: false,
                    communes: [
                        { id: 420, name: "Commune 4", checked: false },
                        { id: 5020, name: "Commune 5", checked: false },
                        { id: 602, name: "Commune 6", checked: false },
                        { id: 1020, name: "Commune 10", checked: false },
                        { id: 11020, name: "Commune 11", checked: false },
                        { id: 1202, name: "Commune 12", checked: false },
                    ]
                },
                {
                    wilayaNumber: 3,
                    name: "Laghouat",
                    checked: false,
                    communes: [
                        { id: 702, name: "Commune 7", checked: false },
                        { id: 820, name: "Commune 8", checked: false },
                        { id: 920, name: "Commune 9", checked: false },
                    ]
                },
            ],
            defaultOption: false,
            handleChanges: function (selectedCities) {
                demandesFilterData.lieux_De_demande.wilayas = selectedCities;
            }
        },
        type: {
            icon: demandes,
            title: "Type de la demande",
            options: [
                {
                    id: 0,
                    icon: demandes,
                    text: "Tout les demandes"
                },
                ...Demande.Types
            ],
            defaultOption: 0,
            selectedItem: 0,
            handleChanges: function (selectedItem) {
                demandesFilterData.type.selectedItem = selectedItem;
            },
            getOption: function (optionID) {
                return demandesFilterData.type.options.find(opt => opt.id === optionID);
            },
        }

    };

    let offreFiltre = <div className="filterBar">
        <Select data={offresFilterData.tri} optionsType="tri" />
        <Switch data={offresFilterData.affichage} isBinary={true}></Switch>
        <hr className="filterBar__line"></hr>
        <SelectCities data={offresFilterData.lieux_De_Production} handleCitiesChecks={offresFilterData.lieux_De_Production.handleChanges} title="Lieux de production" readOnly={false} value={-1}></SelectCities>
        <SelectCities data={offresFilterData.lieux_De_Vente} handleCitiesChecks={offresFilterData.lieux_De_Vente.handleChanges} title="Lieux de vente" readOnly={false} value={-1}></SelectCities>
        <SelectCities data={offresFilterData.lieux_De_Livraison} handleCitiesChecks={offresFilterData.lieux_De_Livraison.handleChanges} title="Lieux de livraison" readOnly={false} value={-1}></SelectCities>
        <Select data={offresFilterData.secteurs} optionsType="secteurs"></Select>
        <Switch data={offresFilterData.type} isBinary={false}></Switch>
        <hr className="filterBar__line"></hr>
        <Switch data={offresFilterData.origine} isBinary={false}></Switch>
        <hr className="filterBar__line"></hr>
        <Switch data={offresFilterData.durabilite} isBinary={false}></Switch>
        <hr className="filterBar__line"></hr>
        <input type="button" value="Rechercher (18)" className="button button--green filterBar__rechercher"></input>
    </div>;
    let demandeFilter = <div className="filterBar">
        <Select data={demandesFilterData.tri} optionsType="tri"></Select>
        <Switch data={demandesFilterData.affichage} isBinary={true}></Switch>
        <hr className="filterBar__line"></hr>
        <SelectCities data={demandesFilterData.lieux_De_demande} handleCitiesChecks={demandesFilterData.lieux_De_demande.handleChanges} title="Lieux de la demande" readOnly={false} value={-1}></SelectCities>
        <Select data={demandesFilterData.type} optionsType="type"></Select>
        <input type="button" value="Rechercher (18)" className="button filterBar__rechercher"></input>
    </div>;

    return filterType === "demandes" ? demandeFilter : offreFiltre;
}

export default FilterBar;