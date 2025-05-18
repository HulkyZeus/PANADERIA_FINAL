import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './ProtectedRoute';
import RoleProtectedRoute from './RoleProtectedRoute';
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
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import AdminDashboard from './pages/AdminDashboard';
import AdminCustomers from './pages/AdminCustomers';
import AdminProductos from './pages/admin/AdminProductos';
import Resenas from "./pages/Resenas";
import FormularioEvento from "./pages/FormularioEvento.jsx";


function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <Cabecera />
          <Routes>
            {/* Rutas públicas */}
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
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/Register" element={<RegisterPage />} />
            <Route path="/FormularioEvento" element={<FormularioEvento />} />
            <Route path="/Resenas" element={<Resenas />} />

            {/* Rutas protegidas por autenticación */}
            <Route element={<ProtectedRoute />}>
              {/* Rutas de usuario normal */}
              <Route element={<RoleProtectedRoute allowedRoles={['usuario']} />}>
                <Route path='/user' element={<UserDashboard />} />
              </Route>

              {/* Rutas de administrador */}
              <Route element={<RoleProtectedRoute allowedRoles={['admin']} />}>
                <Route path='/admin' element={<AdminDashboard />}>
                  <Route path='customers' element={<AdminCustomers />} />
                  <Route path='products' element={<AdminProductos />} />
                </Route>
              </Route>
            </Route>
          </Routes>
          <CFooter />
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;