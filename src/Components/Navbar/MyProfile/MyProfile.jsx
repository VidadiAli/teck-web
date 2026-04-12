import React from "react";
import './MyProfile.css'
import api from "../../../api";
import { useState } from "react";
import { useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const MyProfile = ({ profileInfo, setProfileInfo, setCloseProfile }) => {
    const [updateInfo, setUpdateInfo] = useState(false);
    const [updatePass, setUpdatePass] = useState(false);
    const [loading, setLoading] = useState(false)
    const [newProfileInfo, setNewProfileInfo] = useState(null);
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
            const res = await api.post("/customer/logout", {});
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
        setNewProfileInfo(profileInfo)
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
                                <span>Mail</span>
                                <input
                                    onChange={(e) => editInfo(e)}
                                    name="email"
                                    value={newProfileInfo?.email} />
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
                            <div className="profile-item">
                                <span>Tam Ad</span>
                                <p>{newProfileInfo?.name}</p>
                            </div>

                            <div className="profile-item">
                                <span>Mail</span>
                                <p>{newProfileInfo?.email}</p>
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