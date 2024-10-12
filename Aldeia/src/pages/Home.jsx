import { Link } from "react-router-dom";
import "../styles/Home.css";
import kaze from "./../assets/kaze.svg";
import { Button } from "react-bootstrap";

function Home() {
  return (
    <main>
      <div className="imagem-home">
        <img src={kaze} alt="kagehub logo" />
      </div>
      <section className="texto-descritivo">
        <h2 className="homeDescricao">
          Criada para facilitar a vida dos shinobis, a plataforma permite que
          você crie, organize e acompanhe suas missões de forma prática e
          intuitiva
        </h2>
      </section>

      <hr />

      <section className="lista-home">
        <h3>No KageHub, você pode: </h3>
        <ul>
          <li>
            Gestão de Missões: Criação e controle de missões personalizadas.
          </li>
          <li>
            Gerenciamento de Equipes: Organização de equipes e ninjas para as
            missões.
          </li>
          <li>
            Relatórios de Desempenho: Visualização detalhada de cada missão.
          </li>
          <li>
            Segurança e Privacidade: Todo o acesso e gerenciamento de missões é
            protegido e exclusivo a você.
          </li>
        </ul>
      </section>

      <hr />

      <section className="botoes-home">
        <h3>Comece hoje:</h3>
        <div className="div-botoes">
          <Button as={Link} to="/login" className="botaoRedes">
            Entrar
          </Button>
          <Button as={Link} to="/cadastro" className="botaoRedes">
            Cadastrar
          </Button>
        </div>
      </section>
    </main>
  )
}

export default Home
