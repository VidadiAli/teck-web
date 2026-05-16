import React, { useState } from "react";
import api from "../../api";
import { addToBasketFromLocal } from "../../functions";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Login = ({ setCustomerToken, setShowAuthForm, setResponse }) => {
  const [phone, setPhone] = useState("+994");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginSystem, setLoginSystem] = useState(false)
  const [showEye, setShowEye] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoginSystem(true)
      if (phone.length < 13 && phone.slice(0, 4) != '+994') {
        setResponse({
          showAlert: true,
          message: 'Telefon nömrə +994505005050 formatına uyğun olmalıdır',
          type: 'error'
        });
        return;
      }

      if (password.length < 8) {
        setResponse({
          showAlert: true,
          message: 'Parol ən az 8 elementdən ibarət olmalıdır!F',
          type: 'error'
        });
        return;
      }

      const phoneNumber = `+994${phone.slice(-9)}`;

      await api.post("/customer/login", { phone: phoneNumber, password });

      const newData = localStorage.getItem('basketValues')
        ? JSON.parse(localStorage.getItem('basketValues'))
        : [];

      const likedsData = localStorage.getItem('localLikeds')
        ? JSON.parse(localStorage.getItem('localLikeds'))
        : [];

      try {
        if (newData.length) {
          for (const e of newData) {
            await addToBasketFromLocal(e._id, e.quantity);
          }
        }

        localStorage.removeItem('basketValues');

        if (likedsData.length) {
          for (const e of likedsData.map(e => e._id)) {
            try {
              await api.post('/customer/addLikeds', { productId: e });
            } catch (err) {
              console.log("Skip edildi:", e, err.response?.data);
            }
          }

          localStorage.removeItem('localLikeds');
        }

        setResponse({
          showAlert: true,
          message: 'Heaba daxil oldunuz. Xoş alış-verişlər',
          type: 'success'
        });

        setShowAuthForm(false);
        window.location = '/';
        setLoginSystem(false);
      } catch (error) {
        const msg = error.message.includes('stok')
          ? 'Səbətdə dəyişiklik edin. Məhsul artıq sizin hesabda mövcuddur.'
          :
          error.message
        setError(msg || "Xəta baş verdii");
        setLoginSystem(false)
      }

    } catch (err) {
      setError(err.response?.data?.message || "Xəta baş verdi");
      setLoginSystem(false)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {error && <p className="error">{error}</p>}
      <label htmlFor="" style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="+994XXYYYZZTT"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
        />
      </label>
      <label htmlFor="" style={{ position: 'relative' }}>
        <input
          type={`${showEye ? 'text' : 'password'}`}
          placeholder="Şifrə"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {
          showEye ?
            <FaEyeSlash
              onClick={() => setShowEye(!showEye)}
              className="eye"
            /> :
            <FaEye
              onClick={() => setShowEye(!showEye)}
              className="eye"
            />
        }
      </label>
      <button type="submit" disabled={loginSystem}>
        {loginSystem ? "Daxil olunur..." : "Daxil Ol"}
      </button>
      <NavLink
        to={'/forgetPassword'}
        style={{ margin: '10px auto' }}
        onClick={() => setShowAuthForm(false)}
      >
        Şifrəni unutdum
      </NavLink>
    </form>
  );
};

export default Login;
