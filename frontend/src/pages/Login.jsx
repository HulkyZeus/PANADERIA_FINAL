import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import Swal from "sweetalert2";

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState([]);

  const onSubmit = async (data) => {
    try {
      const res = await api.post(
        "/auth/login",
        { username: data.username, password: data.password },
        { withCredentials: true }
      );

      const result = res.data;

      login({
        user: result.user,
        token: result.token,
      });

      Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: "Inicio de sesión exitoso.",
        timer: 2000,
        showConfirmButton: false,
      });

    } catch (err) {
      setServerErrors([err.response?.data?.message || "Error al iniciar sesión"]);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (

    <div>
    <div>
      {serverErrors.map((error, i) => (
        <div key={i}>
          {error}
        </div>
      ))}
      <h1>Iniciar sesión</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("username", { required: true })}
          placeholder="Usuario"
        />
        {errors.username && (
          <p>El usuario es requerido</p>
        )}

        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Contraseña"
        />
        {errors.password && (
          <p>La contraseña es requerida</p>
        )}

        <button
          type="submit"
        >
          Iniciar sesión
        </button>
      </form>

      <p>
        ¿No tienes una cuenta?
        <Link to="/register">
          Regístrate
        </Link>
      </p>
    </div>
  </div>


    
  );
}

export default LoginPage;
