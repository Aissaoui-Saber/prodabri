import NavBar from '../../Components/NavBar';
import './Demandes.css';
import '../../Assets/Styles/global_Style.css';
import FilterBar from '../../Components/filterBar/FilterBar';
import AnnonceDemande from '../../Components/annonce/AnnonceDemande';
import productImage from '../../Assets/images/icons/annonce/product.jpg';


function Demandes() {
    document.title = "Demandes";
    let demandesList = [
        {
            creation: {
                creator_id: 28554545,
                creator_name: "a3dsm2011",
                creation_date: "12/03/2023",
            },
            favorite: true,
            image: productImage,
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                +"Lorem Ipsum has been the industry's standard dummy text ever since "
                +"the 1500s, when an unknown printer took a galley of type and scrambled it to"
                + "make a type specimen book. It has survived not only five centuries, but also"
                + "the leap into electronic typesetting, remaining essentially unchanged.",
            lieux_de_demande: [
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
            type: 2,
            comments: 0,
            domaines: [
                0,2,6,7
            ]
        },
        {
            creation: {
                creator_id: 28554545,
                creator_name: "a3dsm2011",
                creation_date: "12/03/2023",
            },
            favorite: false,
            image: null,
            description: "saber Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                + "Lorem Ipsum has been the industry's standard dummy text ever since "
                + "the 1500s, when an unknown printer took a galley of type and scrambled it to"
                + "make a type specimen book. It has survived not only five centuries, but also"
                + "the leap into electronic typesetting, remaining essentially unchanged."
                + "Lorem Ipsum has been the industry's standard dummy text ever since "
                + "the 1500s, when an unknown printer took a galley of type and scrambled it to"
                + "make a type specimen book. It has survived not only five centuries, but also"
                + "the leap into electronic typesetting, remaining essentially unchanged. saber",
            lieux_de_demande: [
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
            type: 3,
            comments: 20,
            domaines: [
                0, 1, 3, 8
            ]
        },
    ];
    return <>
        <NavBar></NavBar>
        <div className='body-container'>
            <FilterBar filterType="demandes"></FilterBar>
            <div className='items-list-container'>
                {demandesList.map(demande => {
                    return <AnnonceDemande data={demande}></AnnonceDemande>
                })}
            </div>
        </div>

    </>
};


export default Demandes;
