import { useForm } from "react-hook-form";
import "../styles/Login.css";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { loginUser, entrarGoogle, entrarGithub } from "../firebase/auth";
import toast from "react-hot-toast";
import { getAuth } from "firebase/auth";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },

  } = useForm()

  const navigate = useNavigate()

  const auth = getAuth()
  const user = auth.currentUser

  if (user) {
    return <Navigate to="/"/>
  }

  function entrar(data) {

    loginUser(data.email, data.userSenha)
      .then(() => {
        toast(`Bem-vindo(a) de volta!`)
        navigate("/")
      })
      .catch((error) => {
        toast.error("Erro ao entrar: " + error.message)
      })
  }

  function handleEntrarGoogle() {
    entrarGoogle().then(() => {
      toast("Bem vindo(a) de volta!")
      navigate("/")
    })
  }

  function handleEntrarGithub() {
    entrarGithub().then(() => {
      toast("Bem vindo(a) de volta!")
      navigate("/")
    })
  }

  return (
    <main className="login-page">
      <aside className="cardInfo">
        <h2>Torne-se um Kage:</h2>
        <p>- Gerencie suas missões</p>
        <p>- Autonomia total</p>
        <p>- Ferramentas de personalização</p>
        <p>- E muito mais!</p>
      </aside>
      <section className="login-card">
        <div className="form-login">
          <h2>Login</h2>
            <section className="loginRedes">
              <button className="botaoRedes" onClick={handleEntrarGithub}>github</button>
              <button className="botaoRedes" onClick={handleEntrarGoogle}>google</button>
            </section>
          <form className="form-section" onSubmit={handleSubmit(entrar)}>

            <div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="form-control"
                {...register("email", { required: true, maxLength: 150 })}
              />
              {errors.email && (
                <small className="text-danger">Email inválido</small>
              )}
            </div>

            <div>
              <input
                type="password"
                name="userSenha"
                id="userSenha"
                placeholder="Senha"
                className="form-control"
                {...register("userSenha", { required: true, maxLength: 150 })}
              />
              {errors.userSenha && (
                <small className="text-danger">Senha inválida</small>
              )}
            </div>
            <small><Link as={Link} to="/cadastro" className="navLogin" ><p>Ainda não tem uma conta? Cadastre-se</p></Link></small>
            <div className="w-80">
              <button className="botaoRedes" id="botaoEntrar" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Login
