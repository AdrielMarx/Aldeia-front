import { useContext, useEffect, useState } from "react";
import { deleteMissao, getMissoes } from "../api/missoes";
import { getNinja } from "../api/ninjas";
import toast from "react-hot-toast";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Missoes.css";
import { getAuth } from "firebase/auth";
import { UserContext } from "../context/UserContext";

function DescricaoVermais({ descricao }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const descricaoQuebrada = (descricao) => {
    const limite = 100;
    return isExpanded || descricao.length <= limite
      ? descricao
      : descricao.substring(0, limite) + "..."
  }

  return (
    <div>
      <p className="descricaoTexto">{descricaoQuebrada(descricao)}</p>
      {descricao.length > 100 && (
        <button className="botaoVermais" onClick={toggleExpand}>
          {isExpanded ? "Ver menos" : "Ver mais"}
        </button>
      )}
    </div>
  )
}

function Missoes() {

  const user = useContext(UserContext)
  const navigate = useNavigate

  const [missoes, setMissoes] = useState([])
  const [ninjaNome, setNinjaNome] = useState({})

  function carregarMissoes() {
    const auth = getAuth()
    const user = auth.currentUser

    if (user) {
      const uid = user.uid;
      getMissoes(uid).then(async (data) => {
        setMissoes(data)

        const novosNinjaNome = {}
        for (const missao of data) {
          const ninjaId = missao.ninjaId
          if (ninjaId) {
            const ninja = await getNinja(ninjaId)
            novosNinjaNome[ninjaId] = ninja.nome
          }
        }
        setNinjaNome(novosNinjaNome)
      })
    }
  }

  function deletarMissao(id) {
    const del = confirm("TEM CERTEZA EIN??")

    if (del) {
      deleteMissao(id).then((resposta) => {
        toast.success(resposta.message)
        carregarMissoes()
      });
    }
  }

  useEffect(() => {
    carregarMissoes()
  }, [])

  if (user === null) {
    return navigate("/login")
  }

  return (
    <main className="mt-4 container">
      <h1>Missões</h1>
      <Button as={Link} to="/missoes/novo">
        Adicionar missão
      </Button>
      <hr />
      {missoes.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Nível</th>
              <th>Data limite para execução</th>
              <th>Descrição</th>
              <th>Ninja responsável</th>
            </tr>
          </thead>
          <tbody>
            {missoes.map((missao) => (
              <tr key={missao.id}>
                <td>{missao.titulo}</td>
                <td>{missao.nivel}</td>
                <td>
                  {new Date(
                    missao.dataExecucao + "T00:00:00"
                  ).toLocaleDateString()}
                </td>
                <td className="descricao">
                  <DescricaoVermais descricao={missao.desc} />
                </td>
                <td>{ninjaNome[missao.ninjaId]}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deletarMissao(missao.id)}
                  >
                    Excluir
                  </Button>
                  <Button
                    size="sm"
                    as={Link}
                    to={`/missoes/editar/${missao.id}`}
                  >
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>carregando...</p>
      )}
    </main>
  )
}

export default Missoes
