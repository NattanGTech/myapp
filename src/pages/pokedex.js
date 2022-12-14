import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { getPokedex, getTypes, removePokedex } from "../api/pokemons.js";
import Menu from "../components/nav.js";
import TypeFilter from "../components/typeFilter.js";
import pageFooter from "../components/pageFooter.js";
import Search from "../components/search.js";

function Pokedex(props){
    const [ pokemons, setPokemons ] = useState([]);
    const [ types, setTypes ] = useState([]);
    const [ triTypes, setTriTypes ] = useState("all");
    const [ refresh, setRefresh ] = useState(false);
    const [ pokemonsShow, setPokemonsShow ] = useState([]);
    const [ search, setSearch] = useState('');

    useEffect(() => {
        const pokemonsFetched = getPokedex();
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

    return <div className="pokedex">
        {Menu()}
        <Row>
            <Col xs={2}>
                <TypeFilter setTriTypes = {setTriTypes}/>
                <Search setSearch = {setSearch} />
            </Col>
            <Col xs={8}>
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
                                                    <p>{pokemon.nickname}</p>
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
                                                    removePokedex(pokemon)
                                                    setRefresh(true);
                                                }}>Relacher</button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                        })
                    }
                </Row>
            </Col>
        </Row>
        {pageFooter()}
    </div>;
}

export default Pokedex;