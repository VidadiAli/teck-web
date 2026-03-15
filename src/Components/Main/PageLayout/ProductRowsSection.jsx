import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import LoadingAllData from "../../../loadings/LoadingAllData";

const ProductRowsSection = ({
    title,
    subtitle,
    moreLink,
    items = [],
    likeds,
    setLikeds,
    loadingMixed,
    setResponse,
    setBasketValue
}) => {
    return (
        <section className="vns-section">

            <div className="vns-section-head">
                <div>
                    <h2 className="vns-section-title">{title}</h2>
                    <p className="vns-section-subtitle">{subtitle}</p>
                </div>

                <Link to={moreLink} className="vns-section-more">
                    Daha ətraflı
                </Link>
            </div>

            {
                loadingMixed && <LoadingAllData />
            }

            <div className="vns-products-grid">
                {items.map((item) => (
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
        </section>
    );
};

export default ProductRowsSection;