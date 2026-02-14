import React, { useEffect, useState } from 'react'
import { AiOutlineClockCircle, AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import './MyRequests.css'

const statusMap = {
  1: { label: 'Gözləmədə', color: '#facc15', icon: <AiOutlineClockCircle /> },
  2: { label: 'Təsdiqləndi', color: '#22c55e', icon: <AiOutlineCheckCircle /> },
  3: { label: 'Rədd edildi', color: '#ef4444', icon: <AiOutlineCloseCircle /> }
}

const MyRequests = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch('https://teck-web-back.onrender.com/api/users/getItemStatus')
        const data = await res.json()
        setRequests(data)
      } catch (error) {
        console.error('Sorğu xətası:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [])

  if (loading) return <div className="requests-page">Yüklənir...</div>

  return (
    <div className="requests-page">
      <h1>Sorğularım</h1>

      {requests.length === 0 ? (
        <p className="empty">Heç bir sorğu yoxdur.</p>
      ) : (
        <div className="requests-list">
          {requests.map((item) => {
            const total = parseFloat(item.price) * item.quantity
            const status = statusMap[item.productStatus] || statusMap[0]

            return (
              <div className="request-card" key={item.id}>
                <img src={item.itemImage} alt={item.itemName} />

                <div className="request-info">
                  <h3>{item.itemName}</h3>
                  <p className="seller">Satıcı: {item.salesCompany}</p>
                  <p>Qiymət: ${item.price}</p>
                  <p>Say: {item.quantity}</p>
                  <p className="total">Total: ${total.toFixed(2)}</p>
                </div>

                <div className="status" style={{ backgroundColor: status.color }}>
                  {status.icon} <span>{status.label}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MyRequests
