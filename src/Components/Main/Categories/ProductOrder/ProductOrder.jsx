import React, { useEffect, useState } from "react";
import "./ProductOrder.css";
import api from "../../../../api";

const ProductOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/getOrdersAsCustomer");
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="po-loading">Yüklənir...</p>;

  if (!orders.length) return <p className="po-empty">Hələ sifarişiniz yoxdur.</p>;

  return (
    <div className="product-order-page">
      <h1>My Orders</h1>
      <div className="po-orders-list">
        {orders.map((order) => (
          <div className="po-order-card" key={order._id}>
            <div className="po-product-info">
              <img
                src={order.product.itemImage}
                alt={order.product.itemName}
                className="po-product-img"
              />
              <div className="po-product-details">
                <h3>{order.product.itemName}</h3>
                <p>Şirkət: {order.product.salesCompany}</p>
                <p>Qiymət: ${order.product.price}</p>
              </div>
            </div>
            <div className="po-order-status">
              <p>Status: <span className={`po-status ${order.orderStatus}`}>{order.orderStatus}</span></p>
              <p>Miqdar: {order.product.quantity || 1}</p>
              <p>Tarix: {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductOrder;
