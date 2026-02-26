import React from 'react'
import './LoadingCircle.css'

const LoadingCircle = ({ size = '60px' }) => {
    return (
        <div className="loading-box" >
            <div className="loading-box-child" style={{ width: size, height: size }}></div>
        </div>
    )
}

export default LoadingCircle