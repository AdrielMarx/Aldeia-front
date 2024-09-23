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

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />}/>
          <Route path="/ninjas" element={<Ninjas />}/>
          <Route path="/missoes" element={<Missoes />}/>
          <Route path="/ninjas/novo" element={<NovoNinja />}/>
          <Route path="/ninja/editar/:id" element={<EditarNinja />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
      <Toaster position="bottom-right"/>
    </>
  )
}

export default App