import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import api from "../../../api";
import "./CategoryGrid.css";

const CategoryGrid = () => {
  const [groupedProducts, setGroupedProducts] = useState({});

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products/getProducts");
      const products = res?.data || [];

      // 🔥 Category-yə görə qruplaşdırma
      const grouped = products.reduce((acc, product) => {
        const categoryId = product.category?._id;
        const categoryName = product.category?.name;

        if (!categoryId) return acc;

        if (!acc[categoryId]) {
          acc[categoryId] = {
            name: categoryName,
            products: [],
          };
        }

        acc[categoryId].products.push(product);
        return acc;
      }, {});

      setGroupedProducts(grouped);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="category-grid-container">
      {Object.keys(groupedProducts).map((categoryId) => {
        const categoryData = groupedProducts[categoryId];

        return (
          <div key={categoryId} className="category-block">
            <div className="category-header">
              <h2 className="category-title">
                {categoryData.name.toUpperCase()}
              </h2>

              <NavLink
                className="category-link"
                to={`/category/${categoryId}`}
              >
                Daha çox
              </NavLink>
            </div>

            <div className="card-grid">
              {categoryData.products
                .slice(0, 4) 
                .map((item) => (
                  <div key={item._id} className="product-card">
                    {item.hasDiscount && (
                      <div className="discount-badge">
                        -{item.discountPercent}%
                      </div>
                    )}

                    <img
                      src={
                        item.itemImage || "/no-image.png"
                      }
                      alt={item.itemName}
                      className="product-image"
                    />

                    <div className="product-info">
                      <h3 className="product-name">
                        {item.itemName}
                      </h3>

                      <p className="product-price">
                        ₼{item.price}
                      </p>

                      <p className="product-sales">
                        Satış: {item.salesCount}
                      </p>

                      <NavLink
                        className="product-button"
                        to={`/product/${item._id}`}
                      >
                        İndi al
                      </NavLink>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryGrid;
