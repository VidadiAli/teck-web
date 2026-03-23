import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import LoadingAllData from "../../../loadings/LoadingAllData";
import LoadingMore from "../../../loadings/LoadingMore";

const ProductRowsSection = ({
    title,
    subtitle,
    moreLink,
    items = [],
    likeds,
    setLikeds,
    loadingMixed,
    setResponse,
    setBasketValue,
    showMore,
    style,
    loadingFilterd,
    totalPages,
    setPageFilter,
    pageFilter,
    profileInfo
}) => {
    return (
        <section className="vns-section" style={{ display: style }}>

            <div className="vns-section-head">
                <div>
                    <h2 className="vns-section-title">{title}</h2>
                    <p className="vns-section-subtitle">{subtitle}</p>
                </div>

                {
                    showMore && <Link to={moreLink} className="vns-section-more">
                        Daha ətraflı
                    </Link>
                }
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
                        profileInfo={profileInfo}
                    />
                ))}
            </div>

            {
                !showMore && (
                    <>
                        {
                            loadingFilterd && <LoadingMore />
                        }
                        {
                            pageFilter < totalPages &&
                            <button
                                className="vns-load-more-btn"
                                onClick={() => setPageFilter(prev => prev + 1)}
                            >
                                Daha çox
                            </button>
                        }
                    </>
                )
            }
        </section>
    );
};

export default ProductRowsSection;