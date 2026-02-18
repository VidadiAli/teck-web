import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "./AuthForm.css";

const AuthForm = ({ setCustomerToken, setShowAuthForm }) => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="auth-overlay">
            <div className="auth-container">
                <button className="close-auth-form" onClick={() => setShowAuthForm(false)}>
                    &times;
                </button>

                <div className="toggle-buttons">
                    <button
                        className={isLogin ? "active" : ""}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button
                        className={!isLogin ? "active" : ""}
                        onClick={() => setIsLogin(false)}
                    >
                        Qeydiyyat
                    </button>
                </div>

                <div className="form-wrapper">
                    {isLogin ? (
                        <Login setCustomerToken={setCustomerToken} setShowAuthForm={setShowAuthForm} />
                    ) : (
                        <Register setCustomerToken={setCustomerToken} setShowAuthForm={setShowAuthForm} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
