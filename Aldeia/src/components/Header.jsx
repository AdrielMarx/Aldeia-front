import kaze from "./../assets/kaze.svg";
import { Nav, Navbar, Container, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  return (
    <header>
      <Navbar expand="lg" >
        <Container className="cabecalho">
          <div>
            <Navbar.Brand as={Link} to="/">
            <img src={kaze} alt="Logo" className="logo" />
          </Navbar.Brand>
          </div>
          <div>
            <Navbar.Collapse className="navigate-links">
            <Nav className="navigate-links">
              <Nav.Link as={Link} to="/ninjas" className="nav-link">
                Ninjas
              </Nav.Link>
              <Nav.Link as={Link} to="/missoes" className="nav-link">
                Missões
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
