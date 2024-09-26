import { useForm } from "react-hook-form"

function Login () {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  return (
    <main>
      <section>
        <h2>Torne-se</h2>
      </section>
      <section>
        <div>
          <form className="form-section" >
            <div>
              <label htmlFor="userName">Seu nome:</label>
              <input type="text"
              id="userName"
              name="userName"
              className="form-control"
              {...register("userName", { required: "Nome obrigatório" })} />
            </div>
            <div>
              <label htmlFor="email">Seu email:</label>
              <input type="email"
              id="email"
              name="email"
              className="form-control"
              {...register("email", { required: "Email obrigatório"})} />
            </div>
            <div>
              <label htmlFor="emailConfirm">Confirme seu email:</label>
              <input type="email"
              name="emailConfirm"
              id="emailConfirm"
              className="form-control"
              {...register("emailConfirm", { required: "Confirmação de email obrigatória" })} />
            </div>
            <div>
              <label htmlFor="userSenha">Crie uma senha:</label>
              <input type="password"
              name="userSenha" 
              id="userSenha"
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