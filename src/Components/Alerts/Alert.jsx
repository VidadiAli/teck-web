import React from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaQuestionCircle } from 'react-icons/fa';
import './Alert.css'

const Alert = ({ response, setResponse }) => {
  if (!response) return null;

  const resetResponse = {
    message: '',
    head: '',
    api: '',
    isQuestion: false,
    showAlert: false,
    type: ''
  }

  const getAlertStyle = (type) => {
    switch (type) {
      case 'success':
        return 'alert-success';
      case 'warning':
        return 'alert-warning';
      case 'error':
        return 'alert-error';
      case 'question':
        return 'alert-question';
      default:
        return 'alert-default';
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <FaCheckCircle />;
      case 'warning':
        return <FaExclamationTriangle />;
      case 'error':
        return <FaTimesCircle />;
      case 'question':
        return <FaQuestionCircle />;
      default:
        return null;
    }
  };

  return (
    <div className={`alert-container ${getAlertStyle(response.type)}`}>
      <div className="alert-content">
        <span className="alert-icon">{getIcon(response.type)}</span>
        <div className="alert-text">
          <h2>{response.head}</h2>
          <p>{response.message}</p>
        </div>
      </div>

      {response.isQuestion ? (
        <div className="alert-buttons">
          <button className="btn btn-cancel" onClick={() => setResponse(resetResponse)}>Ləğv et</button>
          <button className="btn btn-confirm" onClick={() => setResponse(resetResponse)}>Təsdiq et</button>
        </div>
      ) : (
        <div className="alert-buttons">
          <button className="btn btn-close" onClick={() => setResponse(resetResponse)}>Bağla</button>
        </div>
      )}
    </div>
  );
};

export default Alert;
