import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    dateOfJoining: "",
    role: "Employee", // default role
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", form);
    navigate("/");
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          placeholder="Full Name"
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />

        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <input
          type="date"
          onChange={(e) =>
            setForm({ ...form, dateOfJoining: e.target.value })
          }
        />

        {/* 👇 ROLE DROPDOWN ADDED */}
        <select
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="Employee">Employee</option>
          <option value="Admin">Admin</option>
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Signup;