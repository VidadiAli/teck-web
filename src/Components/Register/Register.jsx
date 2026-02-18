import React, { useState } from "react";
import api from "../../api";

const Register = ({ setCustomerToken, setShowAuthForm }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await api.post("/customer/register", {
                name,
                email,
                phone,
                password
            });

            localStorage.setItem("customerAccessToken", res.data.accessToken);
            localStorage.setItem("customerRefreshToken", res.data.refreshToken);

            setCustomerToken(res.data.accessToken);
            setShowAuthForm(false);

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Xəta baş verdi");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h2>Qeydiyyat</h2>
            {error && <p className="error">{error}</p>}
            <input
                type="text"
                placeholder="Adınız"
                value={name}
                onChange={e => setName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Telefon"
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
            <button type="submit">Qeydiyyatdan keç</button>
        </form>
    );
};

export default Register;
