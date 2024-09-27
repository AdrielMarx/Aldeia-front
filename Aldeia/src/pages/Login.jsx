import { useForm } from "react-hook-form"
import "../styles/Login.css"

function Login () {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  
  return (
    <main className="login-page">
      <aside className="cardInfo">
        <h2>Torne-se um Kage</h2>
      </aside>
      <section>
        <div className="form-login">
          <h2>Login</h2>
          <section className="loginRedes">
              <button className="botaoRedes">github</button>
              <button className="botaoRedes">google</button>
          </section>
          <form className="form-section">
            <div>
              <input type="text"
              id="userName"
              name="userName"
              placeholder="Nome"
              className="form-control"
              {...register("userName", { required: "Nome obrigatório" })} />
            </div>
            <div>
              <input type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="form-control"
              {...register("email", { required: "Email obrigatório"})} />
            </div>
            <div>
              <input type="email"
              name="emailConfirm"
              id="emailConfirm"
              placeholder="Confirme o Email"
              className="form-control"
              {...register("emailConfirm", { required: "Confirmação de email obrigatória" })} />
            </div>
            <div>
              <input type="password"
              name="userSenha" 
              id="userSenha"
              placeholder="Senha"
              className="form-control"
              {...register("userSenha", {required: "Senha obrigatória" })} />
            </div>
            
          </form>
          
        </div>
      </section>
    </main>
  )
}

export default Login