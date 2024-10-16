import { useForm } from "react-hook-form";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { getMissao, updateMissao } from "../api/missoes";
import toast from "react-hot-toast";
import { useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { getAuth } from "firebase/auth";
import { UserContext } from "../context/UserContext";


function EditarMissao() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const navigate = useNavigate()
  const { id } = useParams()

  function carregarMissao() {
    const auth = getAuth()
    const user = auth.currentUser

    if (user) {
      const uid = user.uid

      getMissao(id)
        .then((data) => {
          if (data.userId === uid) {
            reset(data)
          } else {
            toast.error("Você não tem permissão para editar esta missão.");
            navigate("/missoes")
          }
        })
        .catch((err) => {
          toast.error("Erro ao carregar a missão.")
          navigate("/missoes")
        });
    } else {
      toast.error("Você precisa estar logado para acessar essa página.");
      navigate("/login")
    }
  }

  const user = useContext(UserContext) 

  if (user === null) {
    toast.error("Login necessário para acessar página")
    return <Navigate to="/login"/>
  }

  function atualizarMissao(data) {
    const auth = getAuth();
    const user = auth.currentUser

    if (user) {
      updateMissao(id, data)
        .then((res) => {
          toast(res.message)
          navigate("/missoes")
        })
        .catch((err) => {
          toast.error("Erro ao atualizar a missão.")
        })
    }
  }

  useEffect(() => {
    carregarMissao()
  }, [])

  return (
    <main>
      <h1>Editar missão</h1>
      <hr />
      <div className="crudNinja">
        <form onSubmit={handleSubmit(atualizarMissao)} className="formNinja">
          <div>
            <label htmlFor="titulo">Título</label>
            <input
              type="text"
              id="titulo"
              className="form-control"
              {...register("titulo", { required: true, maxLength: 200 })}
            />
            {errors.titulo && (
              <small className="text-danger">Título inválido</small>
            )}
          </div>
          <div>
            <label htmlFor="nivel">Nível</label>
            <select
              name="nivel"
              id="nivel"
              className="form-select"
              {...register("nivel", { required: true })}
            >
              <option value="" disabled>
                Nível da missão
              </option>
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
            <input
              type="date"
              id="dataExecucao"
              className="form-control"
              {...register("dataExecucao")}
            />
            {errors.dataExecucao && (
              <small className="text-danger">Data inválida</small>
            )}
          </div>
          <div>
            <label htmlFor="desc">Descrição</label>
            <textarea
              name="desc"
              id="desc"
              placeholder="Descreva a missão (Max 1000 caracteres)"
              className="form-control"
              {...register("desc", { required: true, maxLength: 1000 })}
            />
            {errors.desc && (
              <small className="text-danger">Descrição inválida</small>
            )}
          </div>
          <div className="botaoNinja">
            <Button variant="dark" type="submit" className="botao">
              Atualizar missão
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default EditarMissao;
