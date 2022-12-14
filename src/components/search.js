import { Button, Col, Form, Row} from "react-bootstrap";


function Search(props) {


    return (
        <>
        <Row>
            <Col xs={{ span: 10, offset: 1}}>
                <Form.Group className="mb-3" controlId="search">
                    <Form.Control className="typeFilterSelect" type="search" placeholder="Rechercher un pokemon ..." onChange={(e) => props.setSearch(e.target.value)}/>
                </Form.Group>
                {/* <Row>
                    <Col xs={{ span: 4, offset: 4}}>
                        <Button className="buttonDesign searchFilterButton" type="submit">Rechercher</Button>
                    </Col>
                </Row> */}
            </Col>
        </Row>
        </>
      );
  }
  
  export default Search;