import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import pageFooter from "../components/pageFooter.js";

function Home(props){

    return  <div className="homePage">
                <h1>React-JS Pokedex</h1>
                <Row>
                    <Col xs={{ span: 10, offset: 1}} className="homePageContent">
                        <a href="https://www.pokemon.com/fr/pokedex">
                            <img className="pokemonLogo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"/>
                        </a>
                        <h2>BIENVENUE SUR LE POKEDEX DE ZINZIN !!</h2>
                        <Row>
                            <Col xs={{ span: 2, offset:1}} className="homeButton buttonDesign1">
                                <Link to="/pokemon" className="buttonText"><img src="https://www.pngplay.com/wp-content/uploads/2/Pokeball-PNG-Pic-Background.png"/><br/>Liste des Pokemons Disponibles</Link>
                            </Col>
                            <Col xs={{ span: 2, offset:2}} className="homeButton buttonDesign1">
                                <Link to="/pokedex" className="buttonText"><img src="https://img.icons8.com/color/480/pokedex.png"/><br/>Liste des Pokemons en votre Possession</Link>
                            </Col>
                            <Col xs={{ span: 2, offset:2}} className="homeButton buttonDesign1">
                                <Link to="/admin" className="buttonText"><img src="https://cdn-icons-png.flaticon.com/512/1087/1087840.png"/><br/>Panneau de Gestion des Pokemons</Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {pageFooter()}
            </div>;

}

export default Home;