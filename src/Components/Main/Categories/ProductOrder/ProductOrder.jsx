import React, { useEffect, useState } from "react";
import "./ProductOrder.css";
import api from "../../../../api";
import LoadingCircle from "../../../Loading/LoadingCircle";
import { ORDER_STATUS_LABEL } from "../../../Data/DataFile";

const ProductOrder = ({ profileInfo }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/customer/getOrdersAsCustomer");
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    profileInfo && (
      fetchOrders()
    );
  }, [profileInfo]);

  if (loading) return <LoadingCircle />;

  if (!orders?.length) return <p className="po-empty">Hələ sifarişiniz yoxdur.</p>;

  return (
    <div className="product-order-page">
      <h1>Sifarişlərim</h1>
      <div className="po-orders-list">
        {orders?.map((order) => (
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
                <p >
                  Qiymət:{" "}
                  {order?.product?.hasDiscount
                    ? order?.orderType === "Hissəli"
                      ? <span style={{ color: 'red' }}>{order.product.price} ₼</span>
                      : <>
                        <span style={{ color: 'red', paddingRight: '10px' }}>
                          {(order?.product?.price - (order?.product?.price * order?.product?.discountPercent) / 100).toFixed(2)} ₼
                        </span>
                        <del>{order?.product?.price} ₼</del>
                      </>
                    : <span style={{ color: 'red' }}>{order?.product?.price} ₼</span>}
                </p>
              </div>
            </div>
            <div className="po-order-status">
              <p>Status: <span className={`po-status ${order.orderStatus}`}>{
                ORDER_STATUS_LABEL?.map((e) => {
                  if (e?.statusKey == order?.orderStatus) {
                    return `${e?.statusValue}`
                  }
                })
              }</span></p>
              <p>Miqdar: {order.product.quantity || 1}</p>
              <p>Tarix: {new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <div className="order-location">
              <p>
                Sifarişin forması: <span
                  style={{
                    backgroundColor: 'rgb(31, 155, 20)', color: 'white',
                    padding: '2px 5px', borderRadius: '3px', textTransform: 'capitalize',
                    fontSize: '.7rem', fontWeight: '600'
                  }}>
                  {order?.orderType}
                </span>
              </p>
              <p>{order?.orderLocation == "store" ? "Sifariş: " : "Sifariş çatdırılacaq: "} <span
                style={{ color: 'rgb(33, 49, 186)', fontWeight: '600' }}
              >
                {order?.location}
              </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductOrder;
