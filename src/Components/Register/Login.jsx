import React, { useState } from "react";
import api from "../../api";
import { addToBasketFromLocal } from "../../functions";

const Login = ({ setCustomerToken, setShowAuthForm, setResponse }) => {
  const [phone, setPhone] = useState("+994");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginSystem, setLoginSystem] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (phone.length < 13 && phone.slice(0, 4) != '+994') {
        setResponse({
          showAlert: true,
          message: 'Telefon nömrə +994505005050 formatına uyğun olmalıdır',
          type: 'error'
        });
        return;
      }

      const phoneNumber = `+994${phone.slice(-9)}`;

      setLoginSystem(true)
      const res = await api.post("/customer/login", { phone: phoneNumber, password });
      setShowAuthForm(false)
      setResponse({
        showAlert: true,
        message: 'Heaba daxil oldunuz. Xoş alış-verişlər',
        type: 'success'
      });

      const newData = localStorage.getItem('basketValues') ?
        JSON.parse(localStorage.getItem('basketValues')) : [];

      if (newData.length) {
        await Promise.all(
          newData.map((e) =>
            addToBasketFromLocal(e._id, e.quantity)
          )
        );
      }

      localStorage.removeItem('basketValues');
      window.location.reload();
      setLoginSystem(false)
      
    } catch (err) {
      setError(err.response?.data?.message || "Xəta baş verdi");
      setLoginSystem(false)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="+994XXYYYZZTT"
        value={phone}
        onChange={e => setPhone(e.target.value)}
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
        {loginSystem ? "Daxil olunur..." : "Davam et"}
      </button>
    </form>
  );
};

export default Login;
