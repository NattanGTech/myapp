import { useEffect, useState} from "react";
import { Col, Row } from "react-bootstrap";
import { addPokedex, getAll, getTypes} from "../api/pokemons";
import Menu from "../components/nav.js";
import Card from 'react-bootstrap/Card';
import TypeFilter from "../components/typeFilter";
import pageFooter from "../components/pageFooter";


function Pokemon(props){
    const [ pokemonsShow, setPokemonsShow ] = useState([]);
    const [ pokemons, setPokemons ] = useState([]);
    const [ types, setTypes ] = useState([]);
    const [ triTypes, setTriTypes ] = useState("all");
    const [ search, setSearch] = useState('all');

    useEffect(() => {
        const pokemonsFetched = getAll();
        pokemonsFetched
        .then(result => (setPokemons(result), setPokemonsShow(result)))
        .catch(error=>console.error("Error :",error.message))
        //setPokemons(pokemons.sort(PokedexNb))

        const typesFetched = getTypes();
        typesFetched
        .then(result => setTypes(result))
        .catch(error=>console.error("Error :",error.message));
   },[]);

   useEffect(() => {
        if(triTypes==="all"){
            setPokemonsShow(pokemons)
        }else{
            setPokemonsShow(pokemons.filter(pok => pok.type.find(typ=>typ.name === triTypes)))
        }

    },[triTypes]);



    return <div className="pokemon">
        {Menu()}
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
                                                <button className="buttonDesign" onClick={()=>addPokedex(pokemon)}>Capturer !</button>
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