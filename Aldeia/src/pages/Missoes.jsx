import { useEffect, useState } from "react";
import { deleteMissao, getMissoes } from "../api/missoes";
import toast from "react-hot-toast";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Missoes.css"

function DescricaoVermais({ descricao }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const descricaoQuebrada = (descricao) => {
    const limite = 100;
    return isExpanded || descricao.length <= limite
      ? descricao
      : descricao.substring(0, limite) + "...";
  };

  return (
    <div>
      <p className="descricaoTexto">{descricaoQuebrada(descricao)}</p>
      {descricao.length > 100 && (
        <button className="botaoVermais"  onClick={toggleExpand}>
          {isExpanded ? "Ver menos" : "Ver mais"}
        </button>
      )}
    </div>
  );
}

function Missoes() {
  const [missoes, setMissoes] = useState(null);

  function carregarMissoes() {
    getMissoes().then((data) => {
      setMissoes(data);
    });
  }

  function deletarMissao(id) {
    const del = confirm("TEM CERTEZA EIN??");

    if (del) {
      deleteMissao(id).then((resposta) => {
        toast.success(resposta.message);
        carregarMissoes();
      });
    }
  }

  useEffect(() => {
    carregarMissoes();
  }, []);

  return (
    <main className="mt-4 container">
      <h1>Missões</h1>
      <Button as={Link} to="/missoes/novo">
        Adicionar missão
      </Button>
      <hr />
      {missoes ? (
        <Table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Nível</th>
              <th>Data limite para execução</th>
              <th>Descrição</th>
              <th>ID do ninja responsável</th>
            </tr>
          </thead>
          <tbody>
            {missoes.map((missao) => (
              <tr key={missao.id}>
                <td>{missao.titulo}</td>
                <td>{missao.nivel}</td>
                <td>{missao.dataExecucao}</td>
                <td className="descricao">
                  <DescricaoVermais descricao={missao.desc} />
                </td>
                <td>{missao.ninjaId}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deletarMissao(missao.id)}
                  >
                    Excluir
                  </Button>
                  <Button size="sm" as={Link} to={`/missoes/editar/${missao.id}`}>
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
  );
}

export default Missoes;
