import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import api from "../../../api";
import "./CategoryElements.css";

const CategoryElements = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const fetchCategoryProducts = async () => {
    try {
      const res = await api.get(`/products/getProductsByCategory/${categoryId}`);
      const data = res?.data || [];
      setProducts(data);
      console.log(data)
      if (data.length > 0) setCategoryName(data[0].category.name);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategoryProducts();
  }, [categoryId]);

  return (
    <div className="category-page">
      <div className="category-page-header">
        <h1 className="category-page-title">{categoryName}</h1>
      </div>

      <div className="category-page-grid">
        {products.map((item) => (
          <div key={item._id} className="category-product-card">
            {item.hasDiscount && (
              <div className="category-product-badge">
                -{item.discountPercent}%
              </div>
            )}

            <div className="category-product-image-wrapper">
              <img
                src={item.itemImage || "/no-image.png"}
                alt={item.itemName}
                className="category-product-image"
              />
            </div>

            <div className="category-product-body">
              <h3 className="category-product-title">{item.itemName}</h3>
              <div className="category-product-price">₼ {item.price}</div>
              <NavLink
                to={`/product/${item._id}`}
                className="category-product-button"
              >
                Məhsula bax
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryElements;
