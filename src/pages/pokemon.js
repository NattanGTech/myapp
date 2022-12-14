import { useEffect, useState} from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { addPokedex, getAll, getTypes} from "../api/pokemons";
import Menu from "../components/nav.js";
import Card from 'react-bootstrap/Card';
import TypeFilter from "../components/typeFilter";
import pageFooter from "../components/pageFooter";
import Search from "../components/search";
import { useForm } from "react-hook-form";


function Pokemon(props){
    const [ pokemonsShow, setPokemonsShow ] = useState([]);
    const [ pokemons, setPokemons ] = useState([]);
    const [ types, setTypes ] = useState([]);
    const [ triTypes, setTriTypes ] = useState("all");
    const [ search, setSearch] = useState('');
    const { register, handleSubmit } = useForm();
    const [selectedPokemon, setSelectedPokemon] = useState([]);
    const [show, setShow] = useState(false);
    const [ refresh, setRefresh ] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSubmit = (data) => {
        let pok = selectedPokemon
        pok._id = pok._id + data.name
        pok.name = data.name
        addPokedex(pok)
        setRefresh(true)
    }

    
    useEffect(() => {
        const pokemonsFetched = getAll();
        pokemonsFetched
        .then(result => setPokemons(result))
        .catch(error=>console.error("Error :",error.message))

        const typesFetched = getTypes();
        typesFetched
        .then(result => setTypes(result))
        .catch(error=>console.error("Error :",error.message));
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

    useEffect(() => {
        if(search===""){
            setPokemonsShow(pokemons)
        }else{
            setPokemonsShow(pokemons.filter(pok => pok.name === search))
        }

    },[search]);



    return <div className="pokemon">
        {Menu()}
        <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Control type="text" placeholder="Nom de ton pokemon" {...register("name")}/>
                    </Form.Group>
                    <Button type="submit" onClick={() => {handleClose()}}>Valider</Button>
                </Form>
            </Modal.Body>
        </Modal>
        <Row>
            <Col xs={2}>
                <TypeFilter setTriTypes = {setTriTypes}/>
                <Search setSearch = {setSearch} />
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
                                                <button className="buttonDesign1" onClick={()=>{
                                                                                handleShow()
                                                                                setSelectedPokemon(pokemon);
                                                                            }}>Capturer !</button>
                                                {/*
                                                    pokedex.map((pokemon) => {
                                                        if (pokemon.name === pokedex.pokemon.name){
                                                            return "Error"
                                                        }else{
                                                            return ()=>addPokedex(pokemon)
                                                        }
                                                    })
                                                */}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                        })
                    }
                </Row>
            </Col>
        </Row>
        {pageFooter()}
    </div>
}

export default Pokemon;