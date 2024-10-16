import kaze from "./../assets/kaze.svg";
import { Nav, Navbar, Container, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { logout } from "../firebase/auth";
import toast from "react-hot-toast";

function Header() {
  const user = useContext(UserContext)
  const navigate = useNavigate()

  function handleLogout() {
    logout().then(() => {
      toast("Saiu")
      navigate("/login")
    })
  }

  return (
    <header>
      <Navbar expand="lg">
        <Container className="cabecalho">
          <div>
            <Navbar.Brand as={Link} to="/">
              <img src={kaze} alt="Logo" className="logo" />
            </Navbar.Brand>
          </div>
          <div>
            <Navbar.Collapse className="navigate-links">
              <Nav>
                <Nav.Link as={Link} to="/" className="nav-link">
                  Home
                </Nav.Link>
              </Nav>
              {user && (
                <Nav className="navigate-links" id="links-logado">
                  <Nav.Link as={Link} to="/ninjas" className="nav-link">
                    Ninjas
                  </Nav.Link>
                  <Nav.Link as={Link} to="/missoes" className="nav-link">
                    Missões
                  </Nav.Link>
                  <p className="nav-link m-0" id="nomeUsuario">Olá, {user.displayName}!</p>
                  <button onClick={handleLogout} className="nav-link">
                    Sair
                  </button>
                </Nav>
              )}
              {!user && (
                <Nav>
                  <Nav.Link as={Link} to="/login" className="nav-link">
                    Entrar
                  </Nav.Link>
                </Nav>
              )}
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
