import kaze from "./../assets/kaze.svg"
import { Link } from "react-router-dom"

function Header () {
  return (
    <header>
      <Link to="/">
        <img src={kaze} alt="" />
      </Link>
    </header>
  )
}

export default Header