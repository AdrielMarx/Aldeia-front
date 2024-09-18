import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { addNinja } from "../api/ninjas"
import toast from "react-hot-toast"


function NovoNinja () {
  const {
    register, 
    handleSubmit, 
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()

  function salvarNinja(data) {
    addNinja(data).then((res) => {
      toast.success(resposta.message)
      navigate("/ninjas")
    }).catch((err) => {
      toast.error(err.response.data.message)
    })
  }
  return (
    <main>
      <h1>Novo ninja</h1>
      <hr />
      <div>
        <label htmlFor="nome">Nome</label>
        <input 
        type="text"
        id="nome"
        className="form-control"
        {...register("nome", { required: true, maxLength: 200 })} />
        {errors.nome && (
          <small className="text-danger">O nome é inválido!</small>
        )}
      </div>
      <div>
        <label htmlFor="rank">Rank</label>
        <select name="rank" id="rank" className="form-select"
        {...register("rank", { required: true, valueAsNumber: true })}>
          <option value="" selected disabled>Selelcione o Rank</option>
          <option value="genin">Genin</option>
          <option value="chunnin">Chunnin</option>
          <option value="pJonnin">Primeiro Jonnin</option>
          <option value="sJonnin">Segundo Jonnin</option>
          <option value="anbu">ANBU</option>
          <option value="sannin" >Sannin</option>
        </select>
        <select name="aldeia" id="aldeia"
        className="form-select"
        {...register("rank", { required: true, valueAsNumber: true })}>
          <option value="folha">Aldeia da folha</option>
          <option value="areia">Aldeia da areia</option>
          <option value="folha">Aldeia da folha</option>
          <option value="rocha">Aldeia da rocha</option>
          <option value="nevoa">Aldeia da nevoa</option>
          <option value="chuva">Aldeia da chuva</option>
          <option value="outros">Outra</option>
        </select>
      </div>
    </main>
  )
}

export default NovoNinja