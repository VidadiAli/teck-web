import React, { useState } from "react";
import api from "../../api";

const Login = ({ setCustomerToken, setShowAuthForm, setResponse }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post("/customer/login", { email, password });

      localStorage.setItem("customerAccessToken", res.data.accessToken);
      localStorage.setItem("customerRefreshToken", res.data.refreshToken);

      setCustomerToken(res.data.accessToken);
      setShowAuthForm(false)
      setResponse({
        showAlert: true,
        message: 'Heaba daxil oldunuz. Xoş alış-verişlər',
        type: 'success'
      })
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Xəta baş verdi");
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
      <button type="submit">Daxil ol</button>
    </form>
  );
};

export default Login;
