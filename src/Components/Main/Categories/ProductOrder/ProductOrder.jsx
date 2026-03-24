import React, { useEffect, useState } from "react";
import "./ProductOrder.css";
import api from "../../../../api";
import LoadingCircle from "../../../Loading/LoadingCircle";
import { ORDER_STATUS_LABEL } from "../../../Data/DataFile";
import { FiCircle } from "react-icons/fi";
import { FaCircle } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

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

  const createOrderStation = (item, index, orderStatus, arr) => {
    let mainIndex = 0;
    arr.forEach((e) => {
      if (e.statusKey == orderStatus) {
        mainIndex = e.statusDot
      }
    })
    return <div className="order-station-box" key={item.statusDot + item.statusKey}>
      <span className={`order-station-box-text 
      ${mainIndex > index ?
          'done-proses' :
          'waiting-proses'}`}>{item.statusValue}</span>
      {
        mainIndex > index ?
          <FaCircle className="order-station-box-text done-proses" /> :
          <FiCircle className="order-station-box-text waiting-proses" />
      }
    </div>
  }

  if (loading) return <LoadingCircle />;

  if (!orders?.length) return <>
    <Helmet>
      <title>
        {"Sifarişlərim | VNS Electronics"}
      </title>
      <meta
        name="description"
        content={`Sifarişlərinizə buradan baxın.`}
      />
    </Helmet>
    <p className="po-empty">Hələ sifarişiniz yoxdur.</p>
  </>;

  return (
    <>
      <Helmet>
        <title>
          {"Sifarişlərim | VNS Electronics"}
        </title>
        <meta
          name="description"
          content={`Sifarişlərinizə buradan baxın.`}
        />
      </Helmet>
      <div className="product-order-page">
        <h1>Sifarişlərim</h1>
        <div className="po-orders-list">
          {orders?.map((order) => (
            <div className="po-order-card" key={order._id}>
              <div className="po-product-info po-1">
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

                  {
                    order.productQuantity && order.productQuantity != "1" && (
                      <p >
                        Toplam:{" "}
                        {order?.product?.hasDiscount
                          ? order?.orderType === "Hissəli"
                            ? <span style={{ color: 'red' }}>{(order.product.price * order.productQuantity).toFixed(2)} ₼</span>
                            : <>
                              <span style={{ color: 'red', paddingRight: '10px' }}>
                                {((order?.product?.price - (order?.product?.price * order?.product?.discountPercent) / 100) * order.productQuantity).toFixed(2)} ₼
                              </span>
                            </>
                          : <span style={{ color: 'red' }}>{order?.product?.price * Number(order.productQuantity)} ₼</span>}
                      </p>
                    )
                  }
                </div>
              </div>
              <div className="po-order-status po-2">
                <p>Status: <span className={`po-status ${order.orderStatus}`}>{
                  ORDER_STATUS_LABEL?.map((e) => {
                    if (e?.statusKey == order?.orderStatus) {
                      return `${e?.statusValue}`
                    }
                  })
                }</span></p>
                <p>Miqdar: {order.productQuantity || 1}</p>
                <p>Tarix: {new Date(order.createdAt).toLocaleString()}</p>
              </div>
              {
                order?.orderStatus != 'cancelled' && (
                  <div className="order-station po-3">
                    {
                      ORDER_STATUS_LABEL.map((s, index, arr) => {
                        if (s.statusKey != 'cancelled') {
                          return createOrderStation(s, index, order?.orderStatus, arr)
                        }
                      })
                    }
                  </div>
                )
              }
              <div className="order-location po-4">
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
    </>
  );
};

export default ProductOrder;
