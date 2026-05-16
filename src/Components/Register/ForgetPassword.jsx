import React, { use, useState } from 'react';
import './ForgetPassword.css';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ForgetPassword = ({ showAuthForm, setShowAuthForm }) => {

  const navigate = useNavigate();

  const [noGmail, setNoGmail] = useState(false);

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const [newPassword, setNewPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const [otpStep, setOtpStep] = useState(false);
  const [passwordStep, setPasswordStep] = useState(false);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const sendOtp = async () => {
    try {

      setLoading(true);
      setError('');
      setMessage('');

      const res = await api.post(
        '/customer/sendOtp',
        { email }
      );

      setMessage(res.data.message);
      setOtpStep(true);

    } catch (err) {

      setError(
        err.response?.data?.message || 'Problem yaşandı'
      );

    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {

      setLoading(true);
      setError('');
      setMessage('');

      const res = await api.post(
        '/customer/verifyOtp',
        { email, otp }
      );

      setMessage(res.data.message);

      setPasswordStep(true);

    } catch (err) {

      setError(
        err.response?.data?.message || 'Problem yaşandı'
      );

    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    try {

      setLoading(true);
      setError('');
      setMessage('');

      const res = await api.post(
        '/customer/resetPassword',
        {
          email,
          newPassword
        }
      );

      setMessage(res.data.message);

      setTimeout(() => {
        setShowAuthForm(true);
      }, 1500);

    } catch (err) {

      setError(
        err.response?.data?.message || 'Problem yaşandı'
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='forgetPassword'>

      <div className='forgetPasswordBox'>

        <h1>Parolu unutmuşam</h1>

        <p>
          Gmail vasitəsilə hesabınızı bərpa edin
        </p>

        {
          message &&
          <div className='successMessage'>
            {message}
          </div>
        }

        {
          error &&
          <div className='errorMessage'>
            {error}
          </div>
        }

        <div className='forgetPasswordField'>
          <label>Gmail ünvanı</label>

          <input
            type='email'
            placeholder='Gmail ünvanınızı daxil edin'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {
          !otpStep &&
          <button
            onClick={sendOtp}
            disabled={loading}
          >
            {
              loading
                ? 'Göndərilir...'
                : 'Kod göndər'
            }
          </button>
        }

        {
          otpStep &&
          !passwordStep &&
          <>
            <div className='forgetPasswordField'>
              <label>OTP kodu <span style={{ color: 'var(--color-success)', fontSize: '.7rem', fontStyle: 'italic' }}>
                ( Mesajı görməsəz gmail proqramında spam qutusunu yoxlayın )
              </span></label>

              <input
                type='text'
                placeholder='6 rəqəmli kod'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <button
              onClick={verifyOtp}
              disabled={loading}
            >
              {
                loading
                  ? 'Yoxlanılır...'
                  : 'Kodu təsdiqlə'
              }
            </button>
          </>
        }

        {
          passwordStep &&
          <>
            <div className='forgetPasswordField'>
              <label>Yeni parol</label>

              <div className='passwordWrapper'>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder='Yeni parol'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <span
                  className='eyeIcon'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <button
              onClick={resetPassword}
              disabled={loading}
            >
              {
                loading
                  ? 'Dəyişdirilir...'
                  : 'Parolu dəyiş'
              }
            </button>
          </>
        }

        <button className='noGmailBtn'
          onClick={() => setNoGmail(!noGmail)}
        >
          Hesabın bağlı olduğu Gmail ünvanı yoxdur!
        </button>

        {
          noGmail &&
          <div className='noGmailAlert' >
            Hesabınızın bağlı olduğu Gmail ünvanı yoxdursa, zəhmət olmasa müştəri xidmətləri ilə əlaqə saxlayın: <a href='https://wa.me/+994504587493'>WhatsApp - da yaz</a>
          </div>
        }

      </div>

    </div>
  );
};

export default ForgetPassword;