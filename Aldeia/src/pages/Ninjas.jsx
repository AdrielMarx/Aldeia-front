import { useContext, useEffect, useState } from "react"
import { getNinjas, deleteNinja } from "../api/ninjas"
import toast from "react-hot-toast"
import { Button, Table } from "react-bootstrap"
import { Link, Navigate, useNavigate } from "react-router-dom"
import "../styles/Ninjas.css"
import { getAuth } from "firebase/auth"
import { UserContext } from "../context/UserContext"

function Ninjas () {
  const [ninjas, setNinjas] = useState(null)

  const user = useContext(UserContext)

  function carregarNinjas() {
    const auth = getAuth()
    const user = auth.currentUser

    if (user) {
      const uid = user.uid
      getNinjas(uid).then((data) => {
      setNinjas(data)
    })
    }
    
  }

  useEffect(() => {
    carregarNinjas()
  }, [])

  if (user === null) {
    toast.error("Login necessário para acessar página")
    return <Navigate to="/login"/>
  }

  function deletarNinja(id) {
    deleteNinja(id).then((resposta) => {
      toast.success(resposta.message)
      carregarNinjas()
    })
  }

  

  return (
    <main className="container">
      <h1>Seus ninjas</h1>
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
              <tr key={ninja.id} className="tabelaNinjas">
                  <td><img src={ninja.imgURL} alt="Imagem do ninja" className="fotoNinja"/></td>
                <td>{ninja.nome}</td>
                <td>{ninja.rank}</td>
                <td>{ninja.aldeia}</td>
                <td>{ninja.elemento}</td>
                <td className="botoes">
                  <Button variant='danger' size='sm' onClick={() => deletarNinja(ninja.id)}>
                    Excluir
                  </Button>
                  <Button size='sm' as={Link} to={`/ninja/editar/${ninja.id}`}>Editar</Button>
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