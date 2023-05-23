import NavBar from '../../Components/NavBar';
import './Offres.css';
import '../../Assets/Styles/global_Style.css';
import FilterBar from '../../Components/filterBar/FilterBar';
import AnnonceOffre from '../../Components/annonce/AnnonceOffre';

function Offres() {
    document.title = "Offres";
    let offresList = [
        {
            creation: {
                creator_id: 28554545,
                creator_name: "a3dsm2011",
                creation_date: "12/03/2023",
            },
            favorite: true,
            brand_name: "Brand Name",
            title: "Product name and name",
            description: "Saber Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                + "Lorem Ipsum has been the industry's standard dummy text ever since "
                +"the 1500s, when an unknown printer took a galley of type and scrambled it to"
                + "make a type specimen book. It has survived not only five centuries, but also"
                + "the leap into electronic typesetting, remaining essentially unchanged."
                + "Lorem Ipsum has been the industry's standard dummy text ever since "
                +"the 1500s, when an unknown printer took a galley of type and scrambled it to"
                + "make a type specimen book. It has survived not only five centuries, but also"
                + "the leap into electronic typesetting, remaining essentially unchanged.",
            lieux_de_production: [
                {
                    wilayaNumber: 1,
                    name: "Adrar",
                    communes: [
                        { id: 120, name: "Commune 1" },
                        { id: 220, name: "Commune 2" },
                        { id: 320, name: "Commune 3" },
                    ]
                },
                {
                    wilayaNumber: 2,
                    name: "Chlef",
                    communes: [
                        { id: 420, name: "Commune 4" },
                        { id: 5020, name: "Commune 5" },
                        { id: 602, name: "Commune 6" },
                        { id: 1020, name: "Commune 10" },
                        { id: 11020, name: "Commune 11" },
                        { id: 1202, name: "Commune 12" },
                    ]
                },
                {
                    wilayaNumber: 3,
                    name: "Laghouat",
                    communes: [
                        { id: 702, name: "Commune 7" },
                        { id: 820, name: "Commune 8" },
                        { id: 920, name: "Commune 9" },
                    ]
                },
            ],
            lieux_de_vente: [
                {
                    wilayaNumber: 1,
                    name: "Adrar",
                    communes: [
                        { id: 120, name: "Commune 1" },
                        { id: 220, name: "Commune 2" },
                        { id: 320, name: "Commune 3" },
                    ]
                },
                {
                    wilayaNumber: 2,
                    name: "Chlef",
                    communes: [
                        { id: 420, name: "Commune 4" },
                        { id: 5020, name: "Commune 5" },
                        { id: 602, name: "Commune 6" },
                        { id: 1020, name: "Commune 10" },
                        { id: 11020, name: "Commune 11" },
                        { id: 1202, name: "Commune 12" },
                    ]
                },
                {
                    wilayaNumber: 3,
                    name: "Laghouat",
                    communes: [
                        { id: 702, name: "Commune 7" },
                        { id: 820, name: "Commune 8" },
                        { id: 920, name: "Commune 9" },
                    ]
                },
            ],
            lieux_de_livraison: [
                {
                    wilayaNumber: 1,
                    name: "Adrar",
                    communes: [
                        { id: 120, name: "Commune 1" },
                        { id: 220, name: "Commune 2" },
                        { id: 320, name: "Commune 3" },
                    ]
                },
                {
                    wilayaNumber: 2,
                    name: "Chlef",
                    communes: [
                        { id: 420, name: "Commune 4" },
                        { id: 5020, name: "Commune 5" },
                        { id: 602, name: "Commune 6" },
                        { id: 1020, name: "Commune 10" },
                        { id: 11020, name: "Commune 11" },
                        { id: 1202, name: "Commune 12" },
                    ]
                },
                {
                    wilayaNumber: 3,
                    name: "Laghouat",
                    communes: [
                        { id: 702, name: "Commune 7" },
                        { id: 820, name: "Commune 8" },
                        { id: 920, name: "Commune 9" },
                    ]
                },
            ],
            origin: "DZ",
            secteur: 1,
            type: "C",
            durabilite: "ND"
        },
        {
            creation: {
                creator_id: 28554545,
                creator_name: "a3dsm2011",
                creation_date: "12/03/2023",
            },
            favorite: false,
            brand_name: "Brand Name",
            title: "Product name and name",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                + "Lorem Ipsum has been the industry's standard dummy text ever since " +
                +"the 1500s, when an unknown printer took a galley of type and scrambled it to"
                + "make a type specimen book. It has survived not only five centuries, but also"
                + "the leap into electronic typesetting, remaining essentially unchanged.",
            lieux_de_production: [
                {
                    wilayaNumber: 1,
                    name: "Adrar",
                    communes: [
                        { id: 120, name: "Commune 1" },
                        { id: 220, name: "Commune 2" },
                        { id: 320, name: "Commune 3" },
                    ]
                },
                {
                    wilayaNumber: 2,
                    name: "Chlef",
                    communes: [
                        { id: 420, name: "Commune 4" },
                        { id: 5020, name: "Commune 5" },
                        { id: 602, name: "Commune 6" },
                        { id: 1020, name: "Commune 10" },
                        { id: 11020, name: "Commune 11" },
                        { id: 1202, name: "Commune 12" },
                    ]
                },
                {
                    wilayaNumber: 3,
                    name: "Laghouat",
                    communes: [
                        { id: 702, name: "Commune 7" },
                        { id: 820, name: "Commune 8" },
                        { id: 920, name: "Commune 9" },
                    ]
                },
            ],
            lieux_de_vente: [
                {
                    wilayaNumber: 1,
                    name: "Adrar",
                    communes: [
                        { id: 120, name: "Commune 1" },
                        { id: 220, name: "Commune 2" },
                        { id: 320, name: "Commune 3" },
                    ]
                },
                {
                    wilayaNumber: 2,
                    name: "Chlef",
                    communes: [
                        { id: 420, name: "Commune 4" },
                        { id: 5020, name: "Commune 5" },
                        { id: 602, name: "Commune 6" },
                        { id: 1020, name: "Commune 10" },
                        { id: 11020, name: "Commune 11" },
                        { id: 1202, name: "Commune 12" },
                    ]
                },
                {
                    wilayaNumber: 3,
                    name: "Laghouat",
                    communes: [
                        { id: 702, name: "Commune 7" },
                        { id: 820, name: "Commune 8" },
                        { id: 920, name: "Commune 9" },
                    ]
                },
            ],
            lieux_de_livraison: [
                {
                    wilayaNumber: 1,
                    name: "Adrar",
                    communes: [
                        { id: 120, name: "Commune 1" },
                        { id: 220, name: "Commune 2" },
                        { id: 320, name: "Commune 3" },
                    ]
                },
                {
                    wilayaNumber: 2,
                    name: "Chlef",
                    communes: [
                        { id: 420, name: "Commune 4" },
                        { id: 5020, name: "Commune 5" },
                        { id: 602, name: "Commune 6" },
                        { id: 1020, name: "Commune 10" },
                        { id: 11020, name: "Commune 11" },
                        { id: 1202, name: "Commune 12" },
                    ]
                },
                {
                    wilayaNumber: 3,
                    name: "Laghouat",
                    communes: [
                        { id: 702, name: "Commune 7" },
                        { id: 820, name: "Commune 8" },
                        { id: 920, name: "Commune 9" },
                    ]
                },
            ],
            origin: "ETR",
            secteur: 2,
            type: "P",
            durabilite: "D"
        },
        {
            creation: {
                creator_id: 28554545,
                creator_name: "a3dsm2011",
                creation_date: "12/03/2023",
            },
            favorite: false,
            brand_name: "Brand Name",
            title: "Product name and name",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                + "Lorem Ipsum has been the industry's standard dummy text ever since " +
                +"the 1500s, when an unknown printer took a galley of type and scrambled it to"
                + "make a type specimen book. It has survived not only five centuries, but also"
                + "the leap into electronic typesetting, remaining essentially unchanged.",
            lieux_de_production: [
                {
                    wilayaNumber: 1,
                    name: "Adrar",
                    communes: [
                        { id: 120, name: "Commune 1" },
                        { id: 220, name: "Commune 2" },
                        { id: 320, name: "Commune 3" },
                    ]
                },
                {
                    wilayaNumber: 2,
                    name: "Chlef",
                    communes: [
                        { id: 420, name: "Commune 4" },
                        { id: 5020, name: "Commune 5" },
                        { id: 602, name: "Commune 6" },
                        { id: 1020, name: "Commune 10" },
                        { id: 11020, name: "Commune 11" },
                        { id: 1202, name: "Commune 12" },
                    ]
                },
                {
                    wilayaNumber: 3,
                    name: "Laghouat",
                    communes: [
                        { id: 702, name: "Commune 7" },
                        { id: 820, name: "Commune 8" },
                        { id: 920, name: "Commune 9" },
                    ]
                },
            ],
            lieux_de_vente: [
                {
                    wilayaNumber: 1,
                    name: "Adrar",
                    communes: [
                        { id: 120, name: "Commune 1" },
                        { id: 220, name: "Commune 2" },
                        { id: 320, name: "Commune 3" },
                    ]
                },
                {
                    wilayaNumber: 2,
                    name: "Chlef",
                    communes: [
                        { id: 420, name: "Commune 4" },
                        { id: 5020, name: "Commune 5" },
                        { id: 602, name: "Commune 6" },
                        { id: 1020, name: "Commune 10" },
                        { id: 11020, name: "Commune 11" },
                        { id: 1202, name: "Commune 12" },
                    ]
                },
                {
                    wilayaNumber: 3,
                    name: "Laghouat",
                    communes: [
                        { id: 702, name: "Commune 7" },
                        { id: 820, name: "Commune 8" },
                        { id: 920, name: "Commune 9" },
                    ]
                },
            ],
            lieux_de_livraison: [
                {
                    wilayaNumber: 1,
                    name: "Adrar",
                    communes: [
                        { id: 120, name: "Commune 1" },
                        { id: 220, name: "Commune 2" },
                        { id: 320, name: "Commune 3" },
                    ]
                },
                {
                    wilayaNumber: 2,
                    name: "Chlef",
                    communes: [
                        { id: 420, name: "Commune 4" },
                        { id: 5020, name: "Commune 5" },
                        { id: 602, name: "Commune 6" },
                        { id: 1020, name: "Commune 10" },
                        { id: 11020, name: "Commune 11" },
                        { id: 1202, name: "Commune 12" },
                    ]
                },
                {
                    wilayaNumber: 3,
                    name: "Laghouat",
                    communes: [
                        { id: 702, name: "Commune 7" },
                        { id: 820, name: "Commune 8" },
                        { id: 920, name: "Commune 9" },
                    ]
                },
            ],
            origin: "DZ",
            secteur: 3,
            type: "C",
            durabilite: "ND"
        },
        {
            creation: {
                creator_id: 28554545,
                creator_name: "a3dsm2011",
                creation_date: "12/03/2023",
            },
            favorite: false,
            brand_name: "Brand Name",
            title: "Product name and name",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                + "Lorem Ipsum has been the industry's standard dummy text ever since " +
                +"the 1500s, when an unknown printer took a galley of type and scrambled it to"
                + "make a type specimen book. It has survived not only five centuries, but also"
                + "the leap into electronic typesetting, remaining essentially unchanged.",
            lieux_de_production: [
                {
                    wilayaNumber: 1,
                    name: "Adrar",
                    communes: [
                        { id: 120, name: "Commune 1" },
                        { id: 220, name: "Commune 2" },
                        { id: 320, name: "Commune 3" },
                    ]
                },
                {
                    wilayaNumber: 2,
                    name: "Chlef",
                    communes: [
                        { id: 420, name: "Commune 4" },
                        { id: 5020, name: "Commune 5" },
                        { id: 602, name: "Commune 6" },
                        { id: 1020, name: "Commune 10" },
                        { id: 11020, name: "Commune 11" },
                        { id: 1202, name: "Commune 12" },
                    ]
                },
                {
                    wilayaNumber: 3,
                    name: "Laghouat",
                    communes: [
                        { id: 702, name: "Commune 7" },
                        { id: 820, name: "Commune 8" },
                        { id: 920, name: "Commune 9" },
                    ]
                },
            ],
            lieux_de_vente: [
                {
                    wilayaNumber: 1,
                    name: "Adrar",
                    communes: [
                        { id: 120, name: "Commune 1" },
                        { id: 220, name: "Commune 2" },
                        { id: 320, name: "Commune 3" },
                    ]
                },
                {
                    wilayaNumber: 2,
                    name: "Chlef",
                    communes: [
                        { id: 420, name: "Commune 4" },
                        { id: 5020, name: "Commune 5" },
                        { id: 602, name: "Commune 6" },
                        { id: 1020, name: "Commune 10" },
                        { id: 11020, name: "Commune 11" },
                        { id: 1202, name: "Commune 12" },
                    ]
                },
                {
                    wilayaNumber: 3,
                    name: "Laghouat",
                    communes: [
                        { id: 702, name: "Commune 7" },
                        { id: 820, name: "Commune 8" },
                        { id: 920, name: "Commune 9" },
                    ]
                },
            ],
            lieux_de_livraison: [
                {
                    wilayaNumber: 1,
                    name: "Adrar",
                    communes: [
                        { id: 120, name: "Commune 1" },
                        { id: 220, name: "Commune 2" },
                        { id: 320, name: "Commune 3" },
                    ]
                },
                {
                    wilayaNumber: 2,
                    name: "Chlef",
                    communes: [
                        { id: 420, name: "Commune 4" },
                        { id: 5020, name: "Commune 5" },
                        { id: 602, name: "Commune 6" },
                        { id: 1020, name: "Commune 10" },
                        { id: 11020, name: "Commune 11" },
                        { id: 1202, name: "Commune 12" },
                    ]
                },
                {
                    wilayaNumber: 3,
                    name: "Laghouat",
                    communes: [
                        { id: 702, name: "Commune 7" },
                        { id: 820, name: "Commune 8" },
                        { id: 920, name: "Commune 9" },
                    ]
                },
            ],
            origin: "ETR",
            secteur: 5,
            type: "P",
            durabilite: "D"
        },

    ];
    return <>
        <NavBar></NavBar>
        <div className='body-container'>
            <FilterBar filterType="offre"></FilterBar>
            <div className='items-list-container'>
                {offresList.map(offre => {
                    return <AnnonceOffre data={offre}></AnnonceOffre>
                })}
            </div>
        </div>

    </>
};


export default Offres;
