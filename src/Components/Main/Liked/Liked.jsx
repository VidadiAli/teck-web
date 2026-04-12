import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import api from '../../../api';
import { FaHeart } from "react-icons/fa";
import './Liked.css';
import LoadingAllData from '../../../loadings/LoadingAllData';
import LoadingMore from '../../../../../teck-seller/src/loadings/LoadingMore';
import { Helmet } from "react-helmet-async";

const Liked = () => {
    const [allLoading, setAllLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [likedProducts, setLikedProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0)

    const callLikeds = async (isFirst) => {
        try {
            isFirst ? setAllLoading(true) : setLoadingMore(true)
            const res = await api.get('/customer/getLikedsAsPart', {
                params: { page, pageSize }
            });
            setLikedProducts((prev) => [...prev, ...res.data.data]);
            setTotalPages(res.data.totalPages)
        } catch (error) {
            return null;
        }
        finally {
            isFirst ? setAllLoading(false) : setLoadingMore(false)
        }
    };

    const unLiked = async (id) => {
        try {
            const res = await api.delete(`/customer/unLikedAsPart/${id}`, {
                params: { page, pageSize }
            });

            setLikedProducts(res.data.data);
            setTotalPages(res.data.totalPages)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        callLikeds(true);
    }, []);

    useEffect(() => {
        if (page != 1) {
            callLikeds(false);
        }
    }, [page]);

    return (

        <>
            <Helmet>
                <title>
                    {"Bəyəndiklərim | VNS Electronics"}
                </title>
                <meta
                    name="description"
                    content={`Bəyəndiyiniz məhsullara baxın.`}
                />
            </Helmet>
            <div className="tvef-liked-page">
                {
                    allLoading ?
                        <LoadingAllData /> :
                        <>
                            <div className="tvef-liked-head">
                                <h1 className="tvef-liked-title">Bəyənilən məhsullar</h1>
                                <p className="tvef-liked-subtitle">Seçdiyin məhsulları buradan izləyə bilərsən</p>
                            </div>

                            {likedProducts.length === 0 ? (
                                <div className="tvef-liked-empty">Hələ bəyənilən məhsul yoxdur</div>
                            ) : (
                                <div className="tvef-liked-list">
                                    {likedProducts.map((item) => {
                                        const product = item.product;
                                        const discountedPrice = product?.hasDiscount
                                            ? Math.round(product.price - (product.price * product.discountPercent) / 100)
                                            : product?.price;

                                        return (
                                            <div className="tvef-liked-card" key={item._id || product?._id}>
                                                {product?.hasDiscount && (
                                                    <div className="tvef-liked-badge">-{product.discountPercent}%</div>
                                                )}

                                                <div className="tvef-liked-image-box">
                                                    <img
                                                        src={product.itemImageList[0].imageUrl}
                                                        alt={product?.itemName}
                                                        className="tvef-liked-image"
                                                    />
                                                </div>

                                                <FaHeart className="heart-icon" onClick={() => unLiked(product._id)} />

                                                <div className="tvef-liked-content">
                                                    <p className="tvef-liked-company">{product?.salesCompany}</p>
                                                    <h3 className="tvef-liked-name">{product?.itemName}</h3>

                                                    <div className="tvef-liked-price-box">
                                                        {product?.hasDiscount ? (
                                                            <>
                                                                <span className="tvef-liked-price">{discountedPrice} ₼</span>
                                                                <span className="tvef-liked-old-price">{product?.price} ₼</span>
                                                            </>
                                                        ) : (
                                                            <span className="tvef-liked-price">{product?.price} ₼</span>
                                                        )}
                                                    </div>

                                                    <NavLink
                                                        to={`/product/${product?._id}`}
                                                        className="tvef-liked-detail-btn"
                                                    >
                                                        Ətraflı bax
                                                    </NavLink>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {
                                loadingMore && <LoadingMore />
                            }
                            {
                                page < totalPages && <div className="tvef-loadmore-wrapper">
                                    <button
                                        className="tvef-loadmore-btn"
                                        onClick={() => setPage(page + 1)}
                                    >
                                        Data çox
                                    </button>
                                </div>
                            }
                        </>
                }
            </div>
        </>
    );
};

export default Liked;