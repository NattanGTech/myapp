import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Menu() {
  return (
    <div className="navStyle">
      <h1>Pokedex de ZinZin</h1>
      <Navbar className="navvbar" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Acceuil</Navbar.Brand>
          <Nav className="me-auto">
              <Nav.Link href="/pokemon">Pokemon</Nav.Link>
              <Nav.Link href="/pokedex">Pokedex</Nav.Link>
              <Nav.Link href="/admin">Gestion</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Menu;