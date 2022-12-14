import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { getTypes } from "../api/pokemons";
import { Col, Row } from "react-bootstrap";


function TypeFilter(props) {
    const [ types, setTypes ] = useState([]);

    useEffect(() => {
        const typesFetched = getTypes();
        typesFetched
        .then(result => setTypes(result))
        .catch(error=>console.error("Erreur avec notre API :",error.message));
   },[]);

   return (
    <div className="filterStick">
        <Row>
            <Col xs={{ span: 10, offset: 1}}>
                <Form.Select className="typeFilterSelect" aria-label="Default select example" onChange={(e)=>{props.setTriTypes(e.target.value)}}>
                    <option value = "all">Tous les Types</option>
                    {
                    types.map((type) =>{
                        return <option>{type.name}</option>
                    })
                    }
                </Form.Select>
            </Col>
        </Row>
    </div>
  );
  }

  export default TypeFilter;