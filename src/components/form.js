import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import {useForm} from "react-hook-form";
import { Ajouter, getTypes } from "../api/pokemons";


function FormPokemon(props) {
    const { register, handleSubmit } = useForm();
    const [ types, setTypes ] = useState([]);
    const onSubmit = (data) => {
        if (data.type2 === ""){
            data.type = [{"name": data.type1}]
        }else{
            data.type = [{"name": data.type1},{"name" : data.type2}]
        }
        delete data.type1
        delete data.type2
        console.log(data);
        Ajouter(data);
    }

    useEffect(() => {
        const typesFetched = getTypes();
        typesFetched
        .then(result => setTypes(result))
        .catch(error=>console.error("Erreur avec notre API :",error.message));
   },[]);

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="id">
                    <Form.Label>Numéro du pokedex</Form.Label>
                    <Form.Control type="text" {...register("PokedexNb")}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Nom du pokemon</Form.Label>
                    <Form.Control type="text" {...register("name")}/>
                </Form.Group>
                <Form.Select aria-label="Default select example" {...register("type1", { required: true })}>
                    <option>1er Type</option>
                    {
                    types.map((type) =>{
                                return <option>{type.name}</option>
                                })
                    }
                </Form.Select>
                <Form.Select aria-label="Default select example" {...register("type2")}>
                    <option>2eme Type</option>
                    {
                    types.map((type) =>{
                                return <option>{type.name}</option>
                                })
                    }
                </Form.Select>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Lien de l'image</Form.Label>
                    <Form.Control type="text" {...register("img")}/>
                </Form.Group>
                <Button type="submit" className="modalBtn" onClick={() => {props.setRefresh(true) 
                                                        props.handleClose()
                                                    }}>Submit</Button>
            </Form>
        </>
      );
  }
  
  export default FormPokemon;