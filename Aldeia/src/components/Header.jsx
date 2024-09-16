import kaze from "./../assets/kaze.svg"
import { Link } from "react-router-dom"
import "../styles/Header.css"

function Header () {
  return (
    <header>
      <div className="cabecalho">
        <Link to="/">
          <img src={kaze} alt="" className="logo"/>
        </Link>
        <nav>
          <a href="/ninjas">ninjas</a>
          <a href="/missoes">missoes</a>
        </nav>
      </div>
      
    </header>
  )
}

export default Header