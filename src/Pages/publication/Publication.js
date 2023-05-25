import NavBar from '../../Components/NavBar';
import '../../Assets/Styles/global_Style.css';
import './Publication.css';
import { useNavigate } from "react-router-dom";

function Publication() {
	document.title = "Publication";
	let navigate = useNavigate();
	return <>
		<NavBar></NavBar>
		<div className="publication_page_template">
			<div className='pub-dialog-box'>
				<h3 className='pub-dialog-box__question'>Quel genre d'annonce voulez vous déposez ?</h3>
				<h1 className='pub-dialog-box__option' onClick={() => navigate("/Publication/Offre")}>OFFRE</h1>
				<h1 className='pub-dialog-box__option'>DEMMANDE</h1>
			</div>
		</div>
	</>

};

export default Publication;
