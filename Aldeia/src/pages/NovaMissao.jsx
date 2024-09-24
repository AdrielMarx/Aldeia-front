import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { addMissao } from "../api/missoes"
import toast from "react-hot-toast"
import "../styles/Ninjas.css"

function NovaMissao () {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const dia = String(tomorrow.getDate()).padStart(2, '0')
  const mes = String(tomorrow.getMonth() + 1).padStart(2, '0') 
  const ano = tomorrow.getFullYear()
  const dataFormatada = `${ano}-${mes}-${dia}`

  function salvarMissao (data) {
    if (!data.dataExecucao) {
      data.dataExecucao = "-"
    }

    addMissao(data)
    .then((res) => {
      toast.success(res.message)
      navigate("/missoes")
    })
    .catch((err) => {
      console.log(err)
    })
  }
  return (
    <main>
      <h1>Nova missão</h1>
    <hr />
    <div className="crudNinja">
      <form onSubmit={handleSubmit(salvarMissao)} className="formNinja">
        <div>
          <label htmlFor="titulo">Título</label>
          <input type="text"
          id="titulo"
          className="form-control"
          {...register("nome", { required: true, maxLength:200 })} />
          {errors.nome && (
            <small className="text-danger">Título inválido</small>
          )}
        </div>
        <div>
          <label htmlFor="nivel">Nível</label>
          <select 
            name="nivel"
            id="nivel"
            className="form-select"
            {...register("nivel", { required: true })}>
              <option value="" selected disabled>Nível da missão</option>
              <option value="S">S</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
          </select>
          {errors.nivel && (
            <small className="text-danger">Nível inválido</small>
          )}
        </div>
        <div>
          <label htmlFor="dataExecucao">Data limite</label>
          <input type="date"
          id="dataExecucao"
          className="form-control"
          min={dataFormatada}
          {...register("dataExecucao")} />
          {errors.dataExecucao && (
            <small className="text-danger" >Data inválida</small>
          )}
        </div>
        <div>
          <label htmlFor="desc">Descrição</label>
          <textarea 
            type="text"
            name="desc"
            id="desc"
            placeholder="Descreva a missão (Max 1000 caracteres)"
            className="form-control"
            {...register("desc", { required: true, maxLength: 1000 })} />
        </div>
        <div>
          
        </div>
      </form>
    </div>
    </main>
    
  )
}

export default NovaMissao