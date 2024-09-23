import { useEffect, useState } from "react"
import { deleteMissao, getMissoes } from "../api/missoes"
import toast from "react-hot-toast"
import { Button, Table } from "react-bootstrap"
import { Link } from "react-router-dom"

function Missoes () {

  const [missoes, setMissoes] = useState(null)

  function carregarMissoes () {
    getMissoes().then((data) => {
      setMissoes(data)
    })
  }

  function deletarMissao (id) {
    const del = confirm ("TEM CERTEZA EIN??")

    if (del) {
      deleteMissao(id).then((resposta) => {
        toast.success(resposta.message)
        carregarMissoes()
      })
    }

  }

  useEffect(() => {
    carregarMissoes()
  }, [])


  return (
    <main className="mt-4 container">
      <h1>Missões</h1>
      <Button as={Link} to="/missoes/novo">
        Adicionar missão
      </Button>
      <hr />
      {missoes ? <Table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Nível</th>
            <th>Data limíte para execução</th>
            <th>Descrição</th>
            <th>Ninja responsáel</th>
          </tr>
        </thead>
        <tbody>
          {missoes.map((missao) => {
            return (
              <tr key={missao.id}>
                <td>{missao.titulo}</td>
                <td>{missao.nivel}</td>
                <td>{missao.dataExecucao}</td>
                <td>{missao.desc}</td>
                <td>
                  <Button variant='danger' size='sm' onClick={() => deletarMissao(missao.id)}>
                    Excluir
                  </Button>
                  <Button size='sm' as={Link} to={`/missoes/editar/${missao.id}`}>Editar</Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table> 
      
      : <p>carregando...</p>}

    </main>
  )
  
}

export default Missoes