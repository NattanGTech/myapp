import { Button, Col, Form, Row} from "react-bootstrap";
import { useForm } from "react-hook-form";


function Search(props) {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        props.setSearch(data.search)
    }

    return (
        <>
        <Row>
            <Col xs={{ span: 10, offset: 1}}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="search">
                        <Form.Control className="typeFilterSelect" type="search" placeholder="Rechercher un pokemon ..." {...register("search")}/>
                    </Form.Group>
                    <Row>
                        <Col xs={{ span: 4, offset: 4}}>
                            <Button className="buttonDesign searchFilterButton" type="submit">Rechercher</Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
        </>
      );
  }
  
  export default Search;