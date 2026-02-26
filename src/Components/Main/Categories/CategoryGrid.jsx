import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import api from "../../../api";
import "./CategoryGrid.css";
import { FaStar } from "react-icons/fa";
import LoadingCircle from "../../Loading/LoadingCircle";

const CategoryGrid = () => {
  const [loading, setLoading] = useState(false)
  const [mainData, setMainData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5)

  const callCategories = async () => {
    setLoading(true)
    try {
      const resCat = await api.get('/categories/getCategories');

      const elements = await Promise.all(
        resCat?.data?.map(async (data) => {
          try {
            const res = await api.get(
              `/products/getProductsByCategory/${data?._id}`,
              {
                params: {
                  page: page,
                  pageSize: pageSize
                }
              }
            );

            console.log(res?.data)
            return {
              categoryName: data?.name,
              categoryId: data?._id,
              data: res?.data?.products
            };
          } catch (error) {
            return null;
          }
        })
      );

      const filtered = elements.filter(Boolean).reverse();

      setMainData(filtered);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  useEffect(() => {
    callCategories();
  }, []);

  if (loading) return <LoadingCircle />

  return (
    <div className="category-grid-container">
      {mainData?.map((product, index) => {

        return (
          <div key={product?.categoryName + "/" + index} className="category-block">
            <div className="category-header">
              <h2 className="category-title">
                {product?.categoryName.toUpperCase()}
              </h2>

              <NavLink
                className="category-link"
                to={`/category/${product?.categoryId}`}
              >
                Daha çox
              </NavLink>
            </div>

            <div className="card-grid">
              {product?.data
                .map((item) => (
                  <div key={item._id} className="product-card">
                    {item.hasDiscount && (
                      <div className="discount-badge">
                        -{item.discountPercent}%
                      </div>
                    )}

                    <div className="product-image-box">
                      <img
                        src={
                          item.itemImage || "/no-image.png"
                        }
                        alt={item.itemName}
                        className="product-image"
                      />
                    </div>

                    <div className="product-info">
                      <h3 className="product-name">
                        {item.itemName}
                      </h3>

                      <p className="item-rating">
                        <FaStar /> {item?.rating} • {item?.salesCount} satış
                      </p>

                      <p className="product-price">
                        {item?.hasDiscount ? <>
                          <span style={{ paddingRight: '15px' }}>₼ {(item?.price - (item?.price * item?.discountPercent) / 100).toFixed(2)}</span>
                          <del style={{ fontSize: '.9rem', color: 'gray' }}>₼ {item?.price}</del>
                        </> : <span>₼ {item?.price}</span>}
                      </p>

                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
                        {/* <p className="product-sales">
                          Satış: {item.salesCount}
                        </p> */}
                        <p className="product-sales product-stock">
                          {
                            item?.stock > 0 ?
                              item?.stock < 10 ? `Son ${item.stock} məhsul` : 'Stokda mövcuddur'
                              : 'Stokda mövcud deyil'
                          }
                        </p>
                      </div>

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
