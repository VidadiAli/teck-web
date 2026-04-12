import React, { useState } from "react";
import api from "../../api";
import { addToBasketFromLocal } from "../../functions";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = ({ setCustomerToken, setShowAuthForm, setResponse }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("+994");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loginSystem, setLoginSystem] = useState(false)
    const [showEye, setShowEye] = useState(false)

    const handleSubmit = async e => {
        setLoginSystem(true)
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

            if (password.length < 8) {
                setResponse({
                    showAlert: true,
                    message: 'Parol ən az 8 elementdən ibarət olmalıdır!F',
                    type: 'error'
                });
                return;
            }

            const phoneNumber = `+994${phone.slice(-9)}`
            await api.post("/customer/register", {
                name,
                phone: phoneNumber,
                password
            });


            const newData = localStorage.getItem('basketValues')
                ? JSON.parse(localStorage.getItem('basketValues'))
                : [];

            if (newData.length) {
                for (const e of newData) {
                    await addToBasketFromLocal(e._id, e.quantity);
                }
            }

            localStorage.removeItem('basketValues');

            setResponse({
                showAlert: true,
                message: 'Heaba daxil oldunuz. Xoş alış-verişlər',
                type: 'success'
            });

            setShowAuthForm(false);
            window.location.reload();
            setLoginSystem(false);

        } catch (err) {
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
                placeholder="+994505005050"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
            />
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
            <button type="submit" disabled={loginSystem}>{loginSystem ? "Hesab yaradılır..." : "Qeydiyyatdan keç"}</button>
        </form>
    );
};

export default Register;
