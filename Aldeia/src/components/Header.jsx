import kaze from "./../assets/kaze.svg";
import { Nav, Navbar, Container, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { logout } from "../firebase/auth";

function Header() {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogout() {
    const confirmacao = confirm("Deseja sair?");
    if (confirmacao)
      logout().then(() => {
        navigate("/login");
      });
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
              {user && (
                <Nav className="navigate-links">
                  <Nav.Link as={Link} to="/ninjas" className="nav-link">
                    Ninjas
                  </Nav.Link>
                  <Nav.Link as={Link} to="/missoes" className="nav-link">
                    Missões
                  </Nav.Link>
                  <p className="nav-link m-0">Olá, {user.displayName}!</p>
                  <button onClick={handleLogout} className="nav-link">Sair</button>
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
