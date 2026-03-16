import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import api from "../../../api";
import "./CategoryGrid.css";
import ReclamArea from "./ReclamArea";
import LoadingAllData from "../../../loadings/LoadingAllData";
import ProductCard from "../PageLayout/ProductCard";

const CategoryGrid = ({ categoriesForNav, setLikeds, likeds, setResponse, setBasketValue }) => {
  const [loading, setLoading] = useState(false)
  const [mainData, setMainData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5)

  const callCategories = async () => {
    setLoading(true)
    const elements = await Promise.all(
      categoriesForNav?.map(async (data) => {
        try {
          const res = await api.get(
            `/customer/getProductsByCategory/${data?._id}`,
            {
              params: {
                page: page,
                pageSize: pageSize
              }
            }
          );

          console.log(res.data.products)
          
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
  };

  useEffect(() => {
    if (categoriesForNav?.length > 0) {
      callCategories();
    };
  }, [categoriesForNav]);



  const callArea = (product, index) => {
    return <div key={product?.categoryName + "/" + index + '1'} className="category-block">
      <div className="category-header">
        <h2 className="category-title">
          {product?.categoryName}
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
            <ProductCard
              key={item._id || item.id}
              item={item}
              likeds={likeds}
              setLikeds={setLikeds}
              setResponse={setResponse}
              setBasketValue={setBasketValue}
            />
          ))}
      </div>
    </div>
  }

  const callDifferentArea = (product, index) => {
    return <div key={index}>
      <ReclamArea />
      {
        callArea(product, index)
      }
    </div>
  }


  return (
    <div className="category-grid-container">
      {
        loading ? <LoadingAllData /> :
          mainData?.map((product, index) => {
            if (!(product?.data.length > 0)) return
            if (index != 1) {
              return callArea(product, index)
            }
            else {
              return callDifferentArea(product, index)
            }
          })
      }
    </div>
  );
};

export default CategoryGrid;
