import React, { useState } from "react";
import api from "../../api";

const Register = ({ setCustomerToken, setShowAuthForm, setResponse }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("+994");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loginSystem, setLoginSystem] = useState(false)

    const handleSubmit = async e => {
        setLoginSystem(true)
        e.preventDefault();
        try {
            const res = await api.post("/customer/register", {
                name,
                phone,
                password
            });


            setResponse({
                showAlert: true,
                message: 'Heaba daxil oldunuz. Xoş alış-verişlər',
                type: 'success'
            })
            
            setShowAuthForm(false);
            setLoginSystem(false);

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Xəta baş verdi");
            setLoginSystem(false)
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
            <button type="submit">{loginSystem ? "Hesab yaradılır..." : "Qeydiyyatdan keç"}</button>
        </form>
    );
};

export default Register;
