import { Col, Row } from "react-bootstrap";
    
function pageFooter() {
    return (
        <footer className="footer">
            <Row>
                <Col xs={{ span: 3, offset: 1 }}>
                    <p>All rights reserved</p>
                </Col>
                {/*<Col xs={{ span: 5, offset: 3}}>
                    <Link to="https://www.pokemon.com/fr/pokedex" onlyActiveOnIndex>Site Officiel</Link>
        </Col>*/}
            </Row>
        </footer>
    );
}

export default pageFooter;