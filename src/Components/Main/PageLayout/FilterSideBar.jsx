import React from "react";

const FilterSidebar = ({
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
    setPageFilter
}) => {
    return (
        <div className="vns-filter">
            <div className="vns-filter-block">
                <div className="vns-filter-title-row">
                    <h3 className="vns-filter-title">Filter</h3>
                    <button className="vns-filter-reset" onClick={onResetFilters}>
                        Sıfırla
                    </button>
                </div>
            </div>

            <div className="vns-filter-block">
                <label className="vns-filter-label">Qiymət aralığı</label>
                <div className="vns-filter-price-row">
                    <input
                        className="vns-filter-input"
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => onMinPriceChange(e.target.value)}
                    />
                    <input
                        className="vns-filter-input"
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => onMaxPriceChange(e.target.value)}
                    />
                </div>
            </div>

            <div className="vns-filter-block">
                <label className="vns-filter-label">Kateqoriya</label>
                <div className="vns-filter-list">
                    <button
                        className={`vns-filter-chip ${selectedCategory === "" ? "active" : ""}`}
                        onClick={() => onCategoryChange("")}
                    >
                        Hamısı
                    </button>

                    {categories.map((item) => (
                        <button
                            key={item._id || item.id || item.name}
                            className={`vns-filter-chip ${selectedCategory === (item._id || item.id || item.name) ? "active" : ""}`}
                            onClick={() => { onCategoryChange(item._id); onBrandChange(''); setPageFilter(1) }}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="vns-filter-block">
                <label className="vns-filter-label">Brend</label>
                <div className="vns-filter-list">
                    <button
                        className={`vns-filter-chip ${selectedBrand === "" ? "active" : ""}`}
                        onClick={() => onBrandChange("")}
                    >
                        Hamısı
                    </button>

                    {brands.map((item) => (
                        <button
                            key={item._id || item.id || item.name}
                            className={`vns-filter-chip ${selectedBrand === (item._id || item.id || item.name) ? "active" : ""}`}
                            onClick={() => { onBrandChange(item.name); setPageFilter(1) }}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;