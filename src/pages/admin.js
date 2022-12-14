import { useEffect, useState} from "react";
import { Card, Col, Modal, Row } from "react-bootstrap";
import { getAll, getTypes, Supprimer } from "../api/pokemons";
import FormPokemon from "../components/form";
import ModifPokemon from "../components/formmodif";
import Menu from "../components/nav.js";
import pageFooter from "../components/pageFooter";
import Search from "../components/search";
import TypeFilter from "../components/typeFilter";

function Admin(props){
    const [ pokemons, setPokemons ] = useState([]);
    const [ types, setTypes ] = useState([]);
    const [ triTypes, setTriTypes ] = useState("all");
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState([]);
    const [ refresh, setRefresh ] = useState(false);
    const [ pokemonsShow, setPokemonsShow ] = useState([]);
    const [ search, setSearch] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    useEffect(() => {
        const pokemonsFetched = getAll();
        pokemonsFetched
        .then(result => setPokemons(result))
        .catch(error=>console.error("Erreur avec notre API :",error.message));

        const typesFetched = getTypes();
        typesFetched
        .then(result => setTypes(result))
        .catch(error=>console.error("Erreur avec notre API :",error.message));
        setRefresh(false)
   },[refresh]);

   useEffect(() => {
    setPokemonsShow(pokemons.sort(function(a, b){
        if ( parseInt(a.PokedexNb) < parseInt(b.PokedexNb) ){
            return -1;
        }
        if ( parseInt(a.PokedexNb) > parseInt(b.PokedexNb) ){
            return 1;
        }
        return 0;
    }))

},[pokemons]);

   useEffect(() => {
    if(triTypes==="all"){
        setPokemonsShow(pokemons)
    }else{
        setPokemonsShow(pokemons.filter(pok => pok.type.find(typ=>typ.name === triTypes)))
    }

    },[triTypes]);

    return <div className="admin">
        {Menu()}
        
        <div>
            <Row>
                <Col xs={{ span: 10, offset: 1}} lg={{ span: 2, offset: 0}}>
                    <TypeFilter setTriTypes = {setTriTypes}/>
                    <Search setSearch = {setSearch} />
                </Col>
                <Col xs={{ span: 10, offset: 1}}  lg={{ span: 8, offset: 0}}>
                    <Row>
                    {pokemonsShow.filter((pok) => {
                            return search.toLowerCase() === ''
                                ? pok
                                : pok.name.toLowerCase().includes(search.toLowerCase());})
                            .map((pokemon) =>{
                                if (pokemon.PokedexNb<9){
                                    var pokedexUnity = "#00"
                                } else if (pokemon.PokedexNb<99) {
                                    pokedexUnity = "#0"
                                } else {
                                    pokedexUnity = "#"
                                }
                                return  <Col xs={12} sm={6} md={6} lg={4} xxl={3}>
                                            <Card className="pokemonCard">
                                                <Card.Img className="pokemonImg" src={pokemon.img}/>
                                                <Card.Body className="cardBody">
                                                    <Card.Title>N°Pokedex : <br></br>{pokedexUnity+pokemon.PokedexNb}</Card.Title>
                                                    <Card.Text>
                                                        <p>{pokemon.name}</p>
                                                    </Card.Text>
                                                    <Card.Text>
                                                        {
                                                            types.map((type) =>{
                                                                if ((pokemon.type[0].name===type.name)&&(pokemon.type.length===1)){
                                                                    return <>
                                                                    <Card.Img className="typeImg oneType" src={type.img} />
                                                                    </>
                                                                }
                                                                if (pokemon.type.length===2){
                                                                    if (pokemon.type[0].name===type.name){
                                                                        return <>
                                                                                    <Card.Img className="typeImg" src={type.img} />
                                                                                </>
                                                                    }
                                                                    if (pokemon.type[1].name===type.name){
                                                                        return  <>
                                                                                    <Card.Img className="typeImg" src={type.img} />
                                                                                </>
                                                                    }
                                                                }
                                                            })
                                                        }
                                                    </Card.Text>
                                                    <Row>
                                                        <Col xs="4">
                                                            <button className="buttonDesign" onClick={()=>{
                                                                                handleShow1()
                                                                                setSelectedPokemon(pokemon);
                                                                            }}>Modifier</button>
                                                        </Col>
                                                        <Col xs={{ span: 4, offset: 1}}>
                                                            <button className="buttonDesign" onClick={()=>{Supprimer(pokemon)
                                                                                setRefresh(true)
                                                                                }}>Supprimer</button>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                            })
                        }
                    </Row>
                </Col>
                <Col xs={{ span: 10, offset: 1}} lg={{ span: 2, offset: 0}}>
                    <button className="addButton" onClick={handleShow}>Ajouter un pokemon</button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Ajouter un pokemon</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="modalDesign">
                            <FormPokemon setRefresh={setRefresh} handleClose={handleClose}/>
                        </Modal.Body>
                    </Modal>
                    <Modal show={show1} onHide={handleClose1}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modifier un pokemon</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="modalDesign">
                            <ModifPokemon pokemon={selectedPokemon} setRefresh={setRefresh} handleClose1={handleClose1}/>
                        </Modal.Body>
                    </Modal>
                </Col>
            </Row>
        </div>
        {pageFooter()}
    </div>;
}

export default Admin;