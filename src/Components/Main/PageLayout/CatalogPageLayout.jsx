import React, { useEffect, useState } from "react";
import "./CatalogPageLayout.css";
import ProductRowsSection from "./ProductRowsSection";
import FilterSidebar from "./FilterSideBar";

const CatalogPageLayout = ({
    categories = [],
    brands = [],
    selectedCategory = "",
    selectedBrand = "",
    minPrice = "",
    maxPrice = "",
    onCategoryChange,
    onBrandChange,
    onMinPriceChange,
    onMaxPriceChange,
    onResetFilters,
    mixedItems = [],
    products = [],
    likeds,
    setLikeds,
    loadingMixed,
    setResponse,
    setBasketValue,
    loadingFilterd,
    totalPages,
    setPageFilter,
    pageFilter,
    profileInfo
}) => {

    const [reversValue, setReverseValue] = useState('')

    useEffect(() => {
        if (minPrice != '' || maxPrice != '' || selectedBrand != '' || selectedCategory != '') {
            setReverseValue('none')
        }
        else {
            setReverseValue('')
        }
    }, [minPrice, maxPrice, selectedBrand, selectedCategory])

    return (
        <div className="vns-catalog-page">
            <div className="vns-catalog-shell">
                <aside className="vns-catalog-sidebar">
                    <FilterSidebar
                        categories={categories}
                        brands={brands}
                        selectedCategory={selectedCategory}
                        selectedBrand={selectedBrand}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        onCategoryChange={onCategoryChange}
                        onBrandChange={onBrandChange}
                        onMinPriceChange={onMinPriceChange}
                        onMaxPriceChange={onMaxPriceChange}
                        onResetFilters={onResetFilters}
                        setPageFilter={setPageFilter}
                    />
                </aside>

                <div className={`vns-catalog-content`}>
                    <ProductRowsSection
                        title="Sizin üçün seçilənlər"
                        subtitle="Fərqli növ məhsulların toplandığı seçilmiş təkliflər."
                        moreLink="/products"
                        items={mixedItems}
                        likeds={likeds}
                        setLikeds={setLikeds}
                        loadingMixed={loadingMixed}
                        setResponse={setResponse}
                        setBasketValue={setBasketValue}
                        showMore={true}
                        style={reversValue}
                        loadingFilterd={loadingFilterd}
                        totalPages={totalPages}
                        setPageFilter={setPageFilter}
                        pageFilter={pageFilter}
                        profileInfo={profileInfo}
                    />

                    <ProductRowsSection
                        title="Məhsullar"
                        subtitle="Kateqoriya və brendlərə görə baxa biləcəyin əsas məhsullar."
                        moreLink="/products"
                        items={products}
                        likeds={likeds}
                        setLikeds={setLikeds}
                        loadingMixed={loadingMixed}
                        setResponse={setResponse}
                        setBasketValue={setBasketValue}
                        showMore={false}
                        style={''}
                        loadingFilterd={loadingFilterd}
                        totalPages={totalPages}
                        setPageFilter={setPageFilter}
                        pageFilter={pageFilter}
                        profileInfo={profileInfo}
                    />
                </div>
            </div>
        </div>
    );
};

export default CatalogPageLayout;