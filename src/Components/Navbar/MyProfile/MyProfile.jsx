import React from "react";
import './MyProfile.css'
import api from "../../../api";
import { useState } from "react";
import { useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ConnectGoogle from "./ConnectGoogle";
import { AnimatePresence, motion } from "framer-motion";

const MyProfile = ({ profileInfo, setProfileInfo, setCloseProfile }) => {
    const [updateInfo, setUpdateInfo] = useState(false);
    const [updatePass, setUpdatePass] = useState(false);
    const [loading, setLoading] = useState(false)
    const [newProfileInfo, setNewProfileInfo] = useState(null);
    const [showGoogleAlert, setShowGoogleAlert] = useState(false);
    const [showPass, setShowPass] = useState({
        forOld: true,
        forNew: true,
        forNewRepeat: true
    })
    const [newPassValue, setNewPassValue] = useState({
        oldPass: '',
        newPass: '',
        newPassRepeat: ''
    })

    const handleLogout = async () => {
        try {
            setLoading(true)
            const res = await api.post("/auth/customer/logout");
            setProfileInfo(null);
            setCloseProfile(null);
            window.location.reload()
        } catch (error) {
            console.log(error.message)
        }
        finally {
            setLoading(false)
        }
    };

    const editInfo = (e) => {
        const { name, value } = e.target;
        setNewProfileInfo((prev) => (
            {
                ...prev,
                [name]: value
            }
        ))
    }

    const updateProfile = async () => {
        try {
            const res = await api.patch('/customer/updateMyProfileInfoAsMe', newProfileInfo)
            setUpdateInfo(false);
            setNewProfileInfo(res?.data)
        } catch (error) {
            setResponse({
                message: error.response?.data?.message,
                head: 'Xəta!',
                showAlert: true,
                type: 'error'
            });
        }
    }

    const changePassMethod = (e) => {
        const { name, value } = e.target;
        setNewPassValue((prev) => (
            {
                ...prev,
                [name]: value
            }
        ))
    }


    const changePass = async () => {

        if (newPassValue.newPass != newPassValue.newPassRepeat || newPassValue.newPass.trim() == '') return;
        try {
            const res = await api.patch('/customer/updateMyPasswordAsCustomer',
                {
                    newPass: newPassValue.newPassRepeat,
                    oldPass: newPassValue.oldPass
                });
            setUpdatePass(false)
            setNewPassValue({
                oldPass: '',
                newPass: '',
                newPassRepeat: ''
            })
        } catch (error) {
            setResponse({
                message: error.response?.data?.message,
                head: 'Xəta!',
                showAlert: true,
                type: 'error'
            });
        }
    }

    useEffect(() => {
        setNewProfileInfo(profileInfo);
        if (!profileInfo?.googleId) {
            setShowGoogleAlert(true);
        }
    }, [profileInfo])

    if (!profileInfo) return null;

    return (
        <>
            <div
                className="profile-overlay"
                onClick={() => {
                    setCloseProfile(null);
                    setProfileInfo(newProfileInfo)
                }}
            ></div>

            <div className="profile-panel">
                <div className="profile-header">
                    <h3>Profilim</h3>
                    <button
                        className="close-btn"
                        onClick={() => {
                            setCloseProfile(null);
                            setProfileInfo(newProfileInfo)
                        }}
                    >
                        ✕
                    </button>
                </div>

                {

                    <div style={{ marginBottom: '25px' }}>
                        <AnimatePresence>
                            {showGoogleAlert && (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: -15,
                                        scale: 0.92,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: -10,
                                        scale: 0.95,
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    style={{
                                        position: "relative",
                                        borderRadius: "14px",
                                    }}
                                >
                                    <motion.div
                                        animate={{
                                            opacity: [0.4, 0.8, 0.4],
                                            scale: [1, 1.03, 1],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                        style={{
                                            position: "absolute",
                                            inset: "-4px",
                                            borderRadius: "18px",
                                            background:
                                                "linear-gradient(90deg, #ff003c, #ff4f81, #ff003c)",
                                            filter: "blur(14px)",
                                            zIndex: -1,
                                        }}
                                    />
                                    <motion.div
                                        animate={{
                                            y: [0, -2, 0],
                                        }}
                                        transition={{
                                            duration: 2.5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                        style={{
                                            background: "#fff",
                                            borderRadius: "14px",
                                        }}
                                    >
                                        <ConnectGoogle />
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                }

                {
                    updateInfo ?
                        <form className="profile-content">
                            <label className="profile-item">
                                <span>Tam Ad</span>
                                <input
                                    onChange={(e) => editInfo(e)}
                                    name="name"
                                    value={newProfileInfo?.name} />
                            </label>

                            <label className="profile-item">
                                <span>{newProfileInfo?.googleEmail} </span>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShowGoogleAlert(true);
                                    }}
                                    style={{
                                        width: "100%",
                                        padding: "10px 14px",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "10px",
                                        background: "#fff",
                                        color: "#374151",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "#f9fafb";
                                        e.currentTarget.style.borderColor = "#d1d5db";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "#fff";
                                        e.currentTarget.style.borderColor = "#e5e7eb";
                                    }}
                                >
                                    Mail ünvanını dəyiş
                                </button>
                            </label>

                            <label className="profile-item">
                                <span>Telefon</span>
                                <input
                                    onChange={(e) => editInfo(e)}
                                    name="phone"
                                    value={newProfileInfo?.phone} />
                            </label>
                        </form> :
                        <div className="profile-content">
                            {
                                newProfileInfo?.googleId && (<div className="profile-image-wrapper">
                                    <img
                                        className="profile-image"
                                        src={newProfileInfo?.picture}
                                        alt="Profile"
                                    />
                                </div>)
                            }
                            <div className="profile-item">
                                <span>Tam Ad</span>
                                <p>{newProfileInfo?.name}</p>
                            </div>

                            <div className="profile-item">
                                <span>Mail</span>
                                <p>{newProfileInfo?.googleEmail}</p>
                            </div>

                            <div className="profile-item">
                                <span>Telefon</span>
                                <p>{newProfileInfo?.phone}</p>
                            </div>
                        </div>
                }

                {
                    updatePass && (
                        <form className="change-pass-box">
                            <label htmlFor="">
                                <input type={`${showPass.forOld ? "password" : 'text'}`} name="oldPass"
                                    value={newPassValue.oldPass}
                                    placeholder="Əvvəlki Parol"
                                    onChange={(e) => changePassMethod(e)} />
                                {
                                    showPass.forOld ? <FaEye className="update-pass-eye"
                                        onClick={() => setShowPass((prev) => ({ ...prev, forOld: false }))}
                                    /> : <FaEyeSlash className="update-pass-eye"
                                        onClick={() => setShowPass((prev) => ({ ...prev, forOld: true }))}
                                    />
                                }
                            </label>
                            <label htmlFor="">
                                <input type={`${showPass.forNew ? "password" : 'text'}`} name="newPass"
                                    value={newPassValue.newPass}
                                    placeholder="Yeni Parol"
                                    onChange={(e) => changePassMethod(e)} />
                                {
                                    showPass.forNew ? <FaEye className="update-pass-eye"
                                        onClick={() => setShowPass((prev) => ({ ...prev, forNew: false }))}
                                    /> : <FaEyeSlash className="update-pass-eye"
                                        onClick={() => setShowPass((prev) => ({ ...prev, forNew: true }))}
                                    />
                                }
                            </label>
                            <label htmlFor="">
                                <input type={`${showPass.forNewRepeat ? "password" : 'text'}`} name="newPassRepeat"
                                    value={newPassValue.newPassRepeat}
                                    placeholder="Yeni Parolun Təkrarı"
                                    onChange={(e) => changePassMethod(e)} />
                                {
                                    showPass.forNewRepeat ? <FaEye className="update-pass-eye"
                                        onClick={() => setShowPass((prev) => ({ ...prev, forNewRepeat: false }))}
                                    /> : <FaEyeSlash className="update-pass-eye"
                                        onClick={() => setShowPass((prev) => ({ ...prev, forNewRepeat: true }))}
                                    />
                                }
                            </label>
                        </form>
                    )
                }

                <div className="update-ope">
                    {
                        updateInfo ? <button className="update-profile-info update-profile"
                            onClick={updateProfile}>
                            Yadda Saxla
                        </button>
                            :
                            <button className="update-profile-info update-profile" onClick={() => setUpdateInfo(true)}>
                                Məlumatalrı yenilə
                            </button>
                    }
                    {
                        updatePass ?
                            <button className="update-password update-profile" onClick={changePass}>
                                Yadda Saxla
                            </button> :
                            <button className="update-password update-profile" onClick={() => setUpdatePass(true)}>
                                Parolu yenilə
                            </button>
                    }
                </div>

                <button className="logout-btn" onClick={handleLogout}>
                    {loading ? 'Hesabdan çıxılır...' : ' Hesabdan çıx'}
                </button>
            </div>
        </>
    );
};

export default MyProfile;