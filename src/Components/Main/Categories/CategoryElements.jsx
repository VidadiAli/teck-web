import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import api from "../../../api";
import "./CategoryElements.css";
import { FaStar } from "react-icons/fa";
import LoadingCircle from "../../Loading/LoadingCircle";

const CategoryElements = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15)
  const [totalItem, setTotalItem] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingFirst, setLoadingFirst] = useState(false)

  const fetchCategoryProducts = async (valueOfLoading) => {
    valueOfLoading == "loadingFirst" ? setLoadingFirst(true) : setLoading(true)
    try {
      const res = await api.get(`/products/getProductsByCategory/${categoryId}`,
        {
          params: {
            page, pageSize
          }
        }
      );
      const data = res?.data?.products || [];
      setTotalItem(res?.data?.total)
      setProducts((prev) => [...prev, ...data]);
      valueOfLoading == "loadingFirst" ? setLoadingFirst(false) : setLoading(false)
      if (data.length > 0) setCategoryName(data[0].category.name);
    } catch (error) {
      console.error(error);
      valueOfLoading == "loadingFirst" ? setLoadingFirst(false) : setLoading(false)
    }
  };


  const moreProducts = () => {
    setPage((prev) => prev + 1)
  }

  useEffect(() => {
    fetchCategoryProducts("loadingFirst");
  }, [categoryId]);

  useEffect(() => {
    if (page != 1) {
      fetchCategoryProducts("loading");
    }
  }, [page]);

  if (loadingFirst) {
    return <LoadingCircle />
  }

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
              <h3 className="category-product-title">
                {item.itemName}
              </h3>

              {/* <p className="item-rating">
                <FaStar /> {item?.rating} • {item?.salesCount} satış
              </p> */}

              <p className="item-rating">
                {/* <FaStar /> {item?.rating} • {item?.salesCount} satış */}
                {((item?.price + (item?.price * 21.6) / 100) / 18).toFixed(2)} ₼ x 18 ay
              </p>

              <div className="category-product-price">
                {item?.hasDiscount ? <>
                  <span style={{ paddingRight: '15px' }}>₼ {(item?.price - (item?.price * item?.discountPercent) / 100).toFixed(2)}</span>
                  <del style={{ fontSize: '.9rem', color: 'gray' }}>₼ {item?.price}</del>
                </> : <span>₼ {item?.price}</span>}
              </div>
              <p className="product-sales product-stock">
                {
                  item?.stock > 0 ?
                    item?.stock < 10 ? `son ${item.stock} məhsul` : 'Stokda mövcuddur'
                    : 'Stokda mövcud deyil'
                }
              </p>
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
      {
        products?.length < totalItem && (
          loading ? <LoadingCircle /> : <button onClick={moreProducts} className="more-products">Daha çox</button>
        )
      }
    </div>
  );
};

export default CategoryElements;
