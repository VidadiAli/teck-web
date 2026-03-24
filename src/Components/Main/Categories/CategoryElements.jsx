import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import api from "../../../api";
import "./CategoryElements.css";
import LoadingCircle from "../../Loading/LoadingCircle";
import ProductCard from "../PageLayout/ProductCard";
import { Helmet } from "react-helmet-async";

const CategoryElements = ({
  likeds,
  setLikeds, setResponse,
  setBasketValue,
  profileInfo
}) => {
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
      const res = await api.get(`/customer/getProductsByCategory/${categoryId.split("-id-")[1]}`,
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
    <>
      <Helmet>
        <title>
          {categoryName ? `${categoryName} | VNS Electronics` : "Kateqoriya | VNS Electronics"}
        </title>
        <meta
          name="description"
          content={`${categoryName} kateqoriyasında məhsullara baxın.`}
        />
      </Helmet>
      <div className="category-page">
        <div className="category-page-header">
          <h1 className="category-page-title">{categoryName}</h1>
        </div>

        <div className="category-page-grid">
          {products.map((item) => (
            <ProductCard
              key={item._id || item.id}
              item={item}
              likeds={likeds}
              setLikeds={setLikeds}
              setResponse={setResponse}
              setBasketValue={setBasketValue}
              profileInfo={profileInfo}
            />
          ))}
        </div>
        {
          products?.length < totalItem && (
            loading ? <LoadingCircle /> : <button onClick={moreProducts} className="more-products">Daha çox</button>
          )
        }
      </div>
    </>
  );
};

export default CategoryElements;
