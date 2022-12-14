import { Col, Row } from "react-bootstrap";
    
function pageFooter() {
    return (
        
        <footer className="footer">
        <Row>
            <Col xs={12}>
                <Row>
                    <Col xs={{ span: 3, offset: 1 }}>
                        <p>All rights reserved</p>
                    </Col>
                    <Col xs={{ span: 5, offset: 3}}>
                        <a href="https://www.pokemon.com/fr/pokedex">Site Officiel</a>
                    </Col>
                </Row>
            </Col>
        </Row>
            
        </footer>
    );
}

export default pageFooter;