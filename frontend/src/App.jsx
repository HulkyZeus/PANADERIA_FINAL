import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Menu from "./pages/Menu";
import Nosotros from "./pages/Nosotros";
import Eventos from "./pages/Eventos";
import Matrimonios from './pages/Matrimonios';
import BabyShowers from './pages/BabyShowers';
import Aniversarios from './pages/Aniversarios';
import Cumpleaños from './pages/Cumpleaños';
import API from "./pages/API";
import Panaderia from "./pages/Panaderia";
import Pasteleria from "./pages/Pasteleria";
import Desayunos from "./pages/Desayunos";
import Bebidas from "./pages/Bebidas";
import Combos from "./pages/Combos";
import CFooter from "./components/CFooter";
import Cabecera from "./components/Cabecera";

function App() {
  return (
    <Router>
      <Cabecera />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/Nosotros" element={<Nosotros />} />
        <Route path="/Eventos" element={<Eventos />} />
        <Route path="/Matrimonios" element={<Matrimonios />} />
        <Route path="/BabyShowers" element={<BabyShowers />} />
        <Route path="/Aniversarios" element={<Aniversarios />} />
        <Route path="/Cumpleaños" element={<Cumpleaños />} />        
        <Route path="/API" element={<API />} />
        <Route path="/Panaderia" element={<Panaderia />} />
        <Route path="/Pasteleria" element={<Pasteleria />} />
        <Route path="/Desayunos" element={<Desayunos />} />
        <Route path="/Bebidas" element={<Bebidas />} />
        <Route path="/Combos" element={<Combos />} />
        
      </Routes>
      <CFooter />
    </Router>
  );
}

export default App;
