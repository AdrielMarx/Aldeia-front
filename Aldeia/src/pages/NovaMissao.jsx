import { get, useForm } from "react-hook-form";
import { useNavigate, Navigate } from "react-router-dom";
import { addMissao } from "../api/missoes";
import { getNinjas } from "../api/ninjas";
import toast from "react-hot-toast";
import "../styles/NovoNinja.css";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getAuth } from "firebase/auth";
import { UserContext } from "../context/UserContext";

function NovaMissao() {
  const auth = getAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dia = String(tomorrow.getDate()).padStart(2, "0");
  const mes = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const ano = tomorrow.getFullYear();
  const dataFormatada = `${ano}-${mes}-${dia}`;

  function salvarMissao(data) {
    const user = auth.currentUser;

    if (user) {
      const uid = user.uid;

      if (!data.dataExecucao) {
        data.dataExecucao = "-";
      }

      addMissao(data, uid)
        .then((res) => {
          toast(res.message);
          navigate("/missoes");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Usuário não encontrado.");
    }
  }

  const [ninjas, setNinjas] = useState([]);

  function carregarNinjas() {
    const user = auth.currentUser

    if (user) {
      const uid = user.uid

      getNinjas(uid).then((dados) => {
      setNinjas(dados);
    });
    }
    
  }

  const user = useContext(UserContext)

  if (user === null) {
    toast.error("Login necessário para acessar página")
    return <Navigate to="/login"/>
  }


  useEffect(() => {
    carregarNinjas();
  }, []);

  return (
    <main>
      <h1  className="titleNovo">Nova missão</h1>
      <hr />
      <div className="crudNinja">
        <form onSubmit={handleSubmit(salvarMissao)} className="formNinja">
          <div>
            <label htmlFor="titulo">Título</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
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
              <option value="" selected disabled>
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
              min={dataFormatada}
              {...register("dataExecucao")}
            />
            {errors.dataExecucao && (
              <small className="text-danger">Data inválida</small>
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
              {...register("desc", { required: true, maxLength: 1000 })}
            />
            {errors.desc && (
              <small className="text-danger">Descrição inválida</small>
            )}
          </div>
          <div>
            <label htmlFor="ninjaId">Qual ninja conduzirá?</label>
            <select
              name="ninjaId"
              id="ninjaId"
              className="form-select"
              {...register("ninjaId", { required: true, valueAsNumber: true })}
            >
              <option value="" selected disabled>
                Selecione um ninja
              </option>
              {ninjas.map((ninja) => {
                return (
                  <option key={ninja.id} value={ninja.id}>
                    {ninja.nome} - {ninja.rank}
                  </option>
                );
              })}
            </select>
            {errors.ninjaId && (
              <small className="text-danger">Ninja inválido</small>
            )}
          </div>
          <div className="botaoNinja">
            <Button variant="dark" type="submit" className="botao">
              Criar missão
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default NovaMissao;
