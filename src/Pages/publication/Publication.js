import NavBar from '../../Components/NavBar';
import '../../Assets/Styles/global_Style.css';
import './Publication.css';
import { useNavigate } from "react-router-dom";

function Publication() {
	document.title = "Publication";
	let navigate = useNavigate();
	return <>
		<NavBar></NavBar>
		<div className="annonce-type-container">
			<h3>Quel genre d'annonce voulez vous déposez ?</h3>
			<h1 onClick={() => navigate("/Publication/Offre")}>Offre</h1>
			<h1>Demmande</h1>
		</div>
	</>

};

export default Publication;
