import React, { useState } from "react";
import api from "../../api";

const Login = ({ setCustomerToken, setShowAuthForm, setResponse }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginSystem, setLoginSystem] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoginSystem(true)
      const res = await api.post("/customer/login", { email, password });
      setShowAuthForm(false)
      setResponse({
        showAlert: true,
        message: 'Heaba daxil oldunuz. Xoş alış-verişlər',
        type: 'success'
      })
      setLoginSystem(false)
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Xəta baş verdi");
      setLoginSystem(false)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Şifrə"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">
        {loginSystem ? "Daxil olunur..." : "Daxil ol"}
      </button>
    </form>
  );
};

export default Login;
