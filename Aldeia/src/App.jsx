import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import Ninjas from "./pages/Ninjas";
import Missoes from "./pages/Missoes";
import Footer from "./components/Footer";
import NovoNinja from "./pages/NovoNinja";
import { Toaster } from "react-hot-toast";
import EditarNinja from "./pages/EditarNinja";
import NovaMissao from "./pages/NovaMissao";
import EditarMissao from "./pages/EditarMissao";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { UserContext } from "./context/UserContext";
import Cadastro from "./pages/Cadastro";

function App() {

  const [userLoged, setUserLoged] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserLoged(user)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return null
  }
  return (
    <>
      <UserContext.Provider value={userLoged}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/cadastro" element={<Cadastro />}/>
            <Route path="/ninjas" element={<Ninjas />}/>
            <Route path="/missoes" element={<Missoes />}/>
            <Route path="/missoes/novo" element={<NovaMissao />}/>
            <Route path="/missoes/editar/:id" element={<EditarMissao />}/>
            <Route path="/ninjas/novo" element={<NovoNinja />}/>
            <Route path="/ninja/editar/:id" element={<EditarNinja />}/>
          </Routes>
          <Footer />
        </BrowserRouter>
        <Toaster position="bottom-right"/>
      </UserContext.Provider>
      
    </>
  )
}

export default App