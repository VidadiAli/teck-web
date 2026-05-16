import React from "react";
import "./GmailAlert.css";
import { useState } from "react";
import ConnectGoogle from "./MyProfile/ConnectGoogle";

const GmailAlert = ({ setGoogleAlert }) => {
    const [connecting, setConnecting] = useState(false);

    const showConnectGoogle = () => {
        setConnecting(true);
    };

    return (
        <div className="gmailAlert">
            {
                connecting ?
                    (
                        <div className="gmailAlert__connecting">
                            <ConnectGoogle />
                        </div>
                    )
                    :
                    <div className="gmailAlert__container">
                        <div className="gmailAlert__icon">📧</div>

                        <h1 className="gmailAlert__title">
                            Gmail ünvanı əlavə edin
                        </h1>

                        <p className="gmailAlert__text">
                            Parolunuzu unutduğunuz halda hesabınızı bərpa edib yeni parol
                            təyin edə bilmək üçün gmail ünvanı əlavə etməyiniz tövsiyə olunur.
                        </p>

                        <button className="gmailAlert__addBtn" onClick={showConnectGoogle}>
                            Gmail əlavə et
                        </button>
                        <button className="gmailAlert__laterBtn" onClick={() => setGoogleAlert(false)}>
                            Daha sonra
                        </button>
                    </div>
            }
        </div>
    );
};

export default GmailAlert;