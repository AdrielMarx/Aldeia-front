import { useEffect, useState } from "react"
import { getNinjas, deleteNinja } from "../api/ninjas"
import toast from "react-hot-toast"
import { Button, Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import "../styles/Ninjas.css"

function Ninjas () {
  const [ninjas, setNinjas] = useState(null)

  function carregarNinjas() {
    getNinjas().then((data) => {
      setNinjas(data)
    })
  }

  function deletarNinja(id) {
    const del = confirm("TEm CERTEZA ABSOLUTA??????????????????????????")

    if (del) {
      deleteNinja(id).then((resposta) => {
        toast.success(resposta.message)
        carregarNinjas()
      })
    }
  }

  useEffect(() => {
    carregarNinjas()
  }, [])

  return (
    <main className="mt-4 container">
      <h1>ninjas</h1>
      <Button as={Link} to="/ninjas/novo">
        Adicionar ninja
      </Button>
      <hr />
      {ninjas?  <Table>
        <thead>
          <tr>
            <th></th>
            <th>Nome</th>
            <th>Rank</th>
            <th>Aldeia</th>
            <th>Elemento</th>
          </tr>
        </thead>
        <tbody>
          {ninjas.map((ninja) => {
            return (
              <tr key={ninja.id} >
                  <td><img src={ninja.imgURL} alt="Imagem do ninja" className="fotoNinja"/></td>
                <td>{ninja.nome}</td>
                <td>{ninja.rank}</td>
                <td>{ninja.aldeia}</td>
                <td>{ninja.elemento}</td>
                <td>
                  <Button variant='danger' size='sm' onClick={() => deletarNinja(ninja.id)}>
                    Excluir
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table> : <p>carregando...</p>}
    </main>
  );
}

export default Ninjas