import { useState, useContext } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", form);

      // Save token & role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      login(data.token, data.role);

      if (data.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/employee");
      }

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Login</button>


      </form>
      <p className="login-register">
        Don’t have an account? <Link to="/signup">Register here</Link>
      </p>
    </div>
  );
}

export default Login;