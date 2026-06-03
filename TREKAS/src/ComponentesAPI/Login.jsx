import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { apiFetch, saveToken } from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const respuesta = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });

      saveToken(respuesta.token);
      localStorage.setItem("user", JSON.stringify(respuesta.user));
      navigate("/dashboard");
    } catch (error) {
      setError("root", { message: error.message });
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <p>Ejemplo usando POST /auth/login.</p>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "El email es obligatorio" })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Contraseña"
          {...register("password", { required: "La contraseña es obligatoria" })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        {errors.root && <p className="error">{errors.root.message}</p>}

        <button type="submit">Ingresar</button>
      </form>

      <p>
        ¿No tenés usuario? <Link to="/registro">Registrarse</Link>
      </p>
    </div>
  );
};

export default Login;
