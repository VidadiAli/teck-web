import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

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

    const [elementWith, setElementWith] = useState(window.innerWidth);
    const [responsiveFilter, setResponsiveFilter] = useState('');
    const [showFilter, setShowFilter] = useState(false)

    useEffect(() => {
        const handleResize = () => setElementWith(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    useEffect(() => {
        if (elementWith < 980) {
            setResponsiveFilter('vns-responsive-filter')
            setShowFilter(false)
        }
        else {
            setResponsiveFilter('')
            setShowFilter(true)
        }
    }, [elementWith])

    const handleClose = () => {
        setShowFilter(false)
    }

    return (
        !showFilter ? <button
            className="filter-btn"
            onClick={() => setShowFilter(true)}
        >
            🔍 Filter
        </button> :
            <div className={`vns-filter ${responsiveFilter}`}>
                <div className="vns-filter-block">
                    <div className="vns-filter-title-row">
                        <h3 className="vns-filter-title">Filter</h3>
                        <button className="vns-filter-reset" onClick={onResetFilters}>
                            Sıfırla
                        </button>
                        {
                            responsiveFilter != '' && <button className="search-close" onClick={handleClose}>
                                <FaTimes />
                            </button>
                        }
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