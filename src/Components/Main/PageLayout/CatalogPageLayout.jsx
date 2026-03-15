import React from "react";
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
    setBasketValue
}) => {
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
                    />
                </aside>

                <div className="vns-catalog-content">
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
                    />

                    <ProductRowsSection
                        title="Məhsullar"
                        subtitle="Kateqoriya və brendlərə görə baxa biləcəyin əsas məhsullar."
                        moreLink="/products"
                        items={products}
                    />
                </div>
            </div>
        </div>
    );
};

export default CatalogPageLayout;