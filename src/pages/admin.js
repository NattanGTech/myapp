import { useEffect, useState} from "react";
import { Card, Col, Modal, Row } from "react-bootstrap";
import { getAll, getTypes, Supprimer } from "../api/pokemons";
import FormPokemon from "../components/form";
import ModifPokemon from "../components/formmodif";
import Menu from "../components/nav.js";
import pageFooter from "../components/pageFooter";
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

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    useEffect(() => {
        const pokemonsFetched = getAll();
        pokemonsFetched
        .then(result => (setPokemons(result), setPokemonsShow(result)))
        .catch(error=>console.error("Erreur avec notre API :",error.message));

        const typesFetched = getTypes();
        typesFetched
        .then(result => setTypes(result))
        .catch(error=>console.error("Erreur avec notre API :",error.message));
        setRefresh(false)
   },[refresh]);

   useEffect(() => {
    if(triTypes==="all"){
        setPokemonsShow(pokemons)
    }else{
        setPokemonsShow(pokemons.filter(pok => pok.type.find(typ=>typ.name === triTypes)))
    }

    },[triTypes]);

    return <div className="admin">
        {Menu()}
        <button onClick={handleShow}>Ajouter un pokemon</button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Ajouter un pokemon</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormPokemon setRefresh={setRefresh} handleClose={handleClose}/>
            </Modal.Body>
        </Modal>
        <Modal show={show1} onHide={handleClose1}>
            <Modal.Header closeButton>
                <Modal.Title>Modifier un pokemon</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ModifPokemon pokemon={selectedPokemon} setRefresh={setRefresh} handleClose1={handleClose1}/>
            </Modal.Body>
        </Modal>
        <div>
            <Row>
                <Col xs={2}>
                    <TypeFilter setTriTypes = {setTriTypes}/>
                </Col>
                <Col xs={8}>
                    <Row>
                        {
                            pokemonsShow.map((pokemon) =>{
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
                                                    <button onClick={()=>{
                                                                        handleShow1()
                                                                        setSelectedPokemon(pokemon);
                                                                    }}>Modifier</button>
                                                    <button onClick={()=>{Supprimer(pokemon)
                                                                        setRefresh(true)
                                                                        }}>Supprimer</button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                            })
                        }
                    </Row>
                </Col>
            </Row>
            {/* <Row>
                <Col sm={2}>
                    {
                        types.map((type) =>{
                        return  <div>
                                    <br/>
                                    <button onClick={()=>setTriTypes(type.name)}><img src={type.img} alt=""/></button>
                                    <br/>
                                </div>
                        })
                    }
                    <br/>
                    <button onClick={()=>setTriTypes("all")}>Réinitialiser</button>
                </Col>
                <Col sm={10}>
                    <Row>
                        {
                            pokemons.map((pokemon,key) =>{
                                if (key<9){
                                    var pokedexUnity = "#00"
                                } else if (key<99) {
                                    pokedexUnity = "#0"
                                } else {
                                    pokedexUnity = "#"
                                }
                                if ((triTypes  === "all")||(pokemon.type[0].name === triTypes)||((pokemon.type.length===2)&&(pokemon.type[1].name === triTypes))){
                                    return  <Col sm={4}>
                                                <div>
                                                    <h2>Pokedex Number : {pokedexUnity+String(key+1)}</h2>
                                                    <img src={pokemon.img} alt=""/>
                                                    <h2>{pokemon.name}</h2>
                                                    {
                                                        types.map((type) =>{
                                                            if (pokemon.type[0].name===type.name){
                                                                var imgType1 = type.img
                                                            }
                                                            if (pokemon.type.length===2){
                                                                if (pokemon.type[1].name===type.name){
                                                                    return  <>
                                                                                <img src={imgType1} alt=""/>
                                                                                <img src={type.img} alt=""/>
                                                                            </>
                                                                }
                                                            }
                                                            return <img src={imgType1} alt=""/>
                                                        })
                                                    }
                                                    <button onClick={()=>{
                                                                        handleShow1()
                                                                        setSelectedPokemon(pokemon);
                                                                    }}>Modifier</button>
                                                    <button onClick={()=>{Supprimer(pokemon)
                                                                        setRefresh(true)
                                                                        }}>Supprimer</button>
                                                </div>
                                            </Col>
                                }
                            })
                        }
                    </Row>
                </Col>
            </Row> */}
        </div>
        {pageFooter()}
    </div>;
}

export default Admin;