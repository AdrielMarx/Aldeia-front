import { useForm } from "react-hook-form";
import { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { cadastrarUsuario, entrarGoogle } from "../firebase/auth";
import toast from "react-hot-toast";

function Cadastro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()

  const navigate = useNavigate()
  
  const [emailError, setEmailError] = useState("")

  // Watch para monitorar em real time se os emails são o mesmo --
  const email = watch("email");
  const emailConfirm = watch("emailConfirm")

  function verificarEmail() {
    if (email !== emailConfirm) {
      setEmailError("Os e-mails não coincidem")
    } else {
      setEmailError("")
    }
  }

  function cadastrar(data) {
    if (emailError) {
      toast.error(emailError)
      return;
    }

    cadastrarUsuario(data.userName, data.email, data.userSenha)
      .then(() => {
        toast.success(`Bem-vindo(a) ${data.userName}`)
        navigate("/")
      })
      .catch((error) => {
        toast.error("Erro ao cadastrar: " + error.message)
      })
  }

  function handleEntrarGoogle() {
    entrarGoogle().then(() => {
      toast.success("Bem vindo(a)!")
      navigate("/")
    })
  }

  return (
    <main className="login-page">
      <aside className="cardInfo">
        <h2>Torne-se um Kage</h2>
      </aside>
      <section>
        <div className="form-login">
          <h2>Cadastro</h2>
            <section className="loginRedes">
              <button className="botaoRedes">github</button>
              <button className="botaoRedes" onClick={handleEntrarGoogle}>google</button>
            </section>
          <form className="form-section" onSubmit={handleSubmit(cadastrar)}>
            <div>
              <input
                type="text"
                id="userName"
                name="userName"
                placeholder="Nome"
                className="form-control"
                {...register("userName", { required: true, maxLength: 150 })}
              />
              {errors.userName && (
                <small className="text-danger">Nome inválido</small>
              )}
            </div>

            <div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="form-control"
                {...register("email", { required: true, maxLength: 150 })}
                onBlur={verificarEmail}
              />
              {errors.email && (
                <small className="text-danger">Email inválido</small>
              )}
            </div>

            <div>
              <input
                type="email"
                name="emailConfirm"
                id="emailConfirm"
                placeholder="Confirme o Email"
                className="form-control"
                {...register("emailConfirm", { required: true, maxLength: 150 })}
                onBlur={verificarEmail}
              />
              {emailError && <small className="text-danger">{emailError}</small>}
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

            <div id="botaoEntrar">
              <button className="botaoRedes" type="submit">
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Cadastro
