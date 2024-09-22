import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { getNinja, updateNinja } from "../api/ninjas"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { Button } from "react-bootstrap"
import "../styles/NovoNinja.css"

function EditarNinja () {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const navigate = useNavigate()

  const { id } = useParams()

  function atualizarNinja (data) {
    updateNinja(id, data).then((res) => {
      toast.success(res.message)
      navigate("/ninjas")
    })
  }

  function carregarNinja() {
    getNinja(id).then((data) => {
      reset(data)
    }).catch((err) => {
      navigate("/ninjas")
    })
  }

  useEffect(() => {
    carregarNinja()
  }, [])

  return (
    <main >
      <h1>Editar ninja</h1>
      <hr />
      <div className="crudNinja">
        <form onSubmit={handleSubmit(atualizarNinja)} className="formNinja">
      <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            className="form-control"
            {...register("nome", { required: true, maxLength: 200 })}
          />
          {errors.nome && (
            <small className="text-danger">Nome inválido</small>
          )}
        </div>
        <div>
          <label htmlFor="rank">Rank</label>
          <select
            name="rank"
            id="rank"
            className="form-select"
            {...register("rank", { required: true })}
          >
            <option value="" selected disabled>
              Selelcione o Rank
            </option>
            <option value="genin">Genin</option>
            <option value="chunnin">Chunnin</option>
            <option value="pJonnin">Primeiro Jonnin</option>
            <option value="sJonnin">Segundo Jonnin</option>
            <option value="anbu">ANBU</option>
            <option value="sannin">Sannin</option>
          </select>
          {errors.rank && (
              <small className="text-danger">O rank é obrigatório</small>
            )}
        </div>
        <div>
          <label htmlFor="aldeia">Aldeia</label>
          <select
            name="aldeia"
            id="aldeia"
            className="form-select"
            {...register("aldeia", { required: true })}
          >
            <option value="" selected disabled>
              Selecione a aldeia
            </option>
            <option value="folha">Aldeia da folha</option>
            <option value="areia">Aldeia da areia</option>
            <option value="rocha">Aldeia da rocha</option>
            <option value="nevoa">Aldeia da nevoa</option>
            <option value="chuva">Aldeia da chuva</option>
            <option value="outra">Outra</option>
          </select>
          {errors.aldeia && (
            <small className="text-danger">A aldeia é obrigatória</small>
          )}
        </div>
        <div>
          <label htmlFor="elemento">Elemento base</label>
          <select
            name="elemento"
            id="elemento"
            className="form-select"
            {...register("elemento", { required: true })}
          >
            <option value="" selected disabled>
              Elemento de maior domínio
            </option>
            <option value="vento">Vento</option>
            <option value="fogo">Fogo</option>
            <option value="terra">Terra</option>
            <option value="agua">Água</option>
            <option value="relampago">Relâmpago</option>
            <option value="outro">Outro</option>
          </select>
          {errors.elemento && (
            <small className="text-danger">O elemento é obrigatório</small>
          )}
        </div>
        <div>
          <label htmlFor="imgURL">Foto (opcional)</label>
          <input type="url"
          id="imgURL"
          className="form-control"
          placeholder="URL da imagem do ninja (max 1000 caracteres)."
          {...register("imgURL", { required: false, maxLength: 1000 })} 
          />
          {errors.imgURL && (
            <small className="text-danger" >URL inválida</small>
          )}
        </div>
        <div className="botaoNinja">
          <Button variant="dark" type="submit" className="botao">Editar Ninja</Button>
        </div>
      </form>
      </div>
      
      
    </main>
  )
}

export default EditarNinja