import React from "react";
import './MyProfile.css'
import api from "../../../api";

const MyProfile = ({ profileInfo, setProfileInfo, setCloseProfile }) => {

    const handleLogout = async () => {
        const res = await api.post("/customer/logout", {});
        setProfileInfo(null);
        setCloseProfile(null);
    };

    if (!profileInfo) return null;

    return (
        <>
            <div
                className="profile-overlay"
                onClick={() => setCloseProfile(null)}
            ></div>

            <div className="profile-panel">
                <div className="profile-header">
                    <h3>Profilim</h3>
                    <button
                        className="close-btn"
                        onClick={() => setCloseProfile(null)}
                    >
                        ✕
                    </button>
                </div>

                <div className="profile-content">
                    <div className="profile-item">
                        <span>Tam Ad</span>
                        <p>{profileInfo?.name}</p>
                    </div>

                    <div className="profile-item">
                        <span>Mail</span>
                        <p>{profileInfo?.email}</p>
                    </div>

                    <div className="profile-item">
                        <span>Telefon</span>
                        <p>{profileInfo?.phone}</p>
                    </div>
                </div>

                <button className="logout-btn" onClick={handleLogout}>
                    Hesabdan çıx
                </button>
            </div>
        </>
    );
};

export default MyProfile;