import React, { useEffect, useState } from 'react'
import data from '../../Data/DataFile'
import './ChooseSalesCompany.css'

const ChooseSalesCompany = ({ product, setResponse, setBasketValue, setShowCompanies }) => {
    const { productsData } = data;
    const [salesCompanies, setSalesCompanies] = useState([])

    useEffect(() => {
        let category = "";
        productsData.forEach((element) => {
            element?.items.forEach((item) => {
                if (item?.id == product?.id) {
                    category = element?.category;
                }
            })
        })

        let arr = [];
        productsData?.forEach((element) => {
            if (element?.category == category) {
                arr = element.items;
            }
        });

        const newData = arr?.filter(
            (item) => item?.productNumber === product?.productNumber
        );

        setSalesCompanies(newData);
    }, [product, productsData]);

    const addElement = (item) => {
        let basket = localStorage.getItem('basket') ?
            JSON.parse(localStorage.getItem("basket"))
            : [];
        basket.push(item);
        localStorage.setItem('basket', JSON.stringify(basket))
        setBasketValue(basket?.length)
        setResponse((prev) => ({
            ...prev,
            message: 'Element uğurla səbətə əlavə olundu!',
            head: 'Uğurlu',
            showAlert: true,
            type: 'success'
        }))
    }

    return (
        <div className="overlay" onClick={() => { setShowCompanies(false) }}>
            <div className="sales-card-box" onClick={(e) => e.stopPropagation()}>
                <h2>Satıcı seç!</h2>
                <button className="close-btn-add" onClick={() => { setShowCompanies(false) }}>✖</button>
                {salesCompanies?.map((item, index) => (
                    <div key={index} className="sales-card">
                        <div className="product-details">
                            <div className="sales-company">🏬 {item.salesCompany}</div>
                            <h3>{item.itemName}</h3>
                            <p className="price">
                                ${item.price} | 18 ay: ${(item.price / 18).toFixed(2)} / ay
                            </p>
                            <p className="rating">⭐ {item.rating}</p>
                            {item.hasDiscount && <p className="discount">Endirim: {item.discountPercent}%</p>}
                        </div>
                        <button className="add-to-cart" onClick={() => {
                            addElement(item);
                            setShowCompanies(false)
                        }}>
                            🛒 Səbətə əlavə et
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChooseSalesCompany
