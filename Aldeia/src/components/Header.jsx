import kaze from "./../assets/kaze.svg"
import { Nav, Navbar, Container, Dropdown } from "react-bootstrap"
import { Link } from "react-router-dom"
import "../styles/Header.css"

function Header () {
  return (
    <header>
      <Navbar expand="lg" bg="black" variant="dark" className="nav-bar">
        <Container className="cabecalho">
          <Navbar.Brand as={Link} to="/">
            <img src={kaze} alt="Logo" width={240} className="logo"/>
          </Navbar.Brand>

          <Navbar.Collapse id="basic-navbar-nav" className="navigate-links">
            <Nav className="navigate-links">
              <Nav.Link as={Link} to="/ninjas" className="nav-link">
                Ninjas
              </Nav.Link>
              <Nav.Link as={Link} to="/missoes" className="nav-link">
                Missões
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header