import React, { useEffect, useState } from 'react'
import Carousel from './Carousel/Carousel'
import CatalogPageLayout from './PageLayout/CatalogPageLayout'
import api from '../../api'

const Main = ({ categoriesForNav, likeds, setLikeds, setResponse, setBasketValue }) => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [mixedItems, setMixedItems] = useState([])
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [pageFilter, setPageFilter] = useState(1);
  const [pageSizeFilter] = useState(10);
  const [loadingMixed, setLoadingMixed] = useState(false);
  const [loadingFilterd, setLoadingFiltered] = useState(false);
  const [totalPages, setTotalPages] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brands, setBrands] = useState([]);

  const callMixedProducts = async () => {
    try {
      setLoadingMixed(true)
      const res = await api.get('/customer/getMixedproducts', {
        params: {
          page, pageSize
        }
      });
      setMixedItems(res.data.data)
    } catch (error) {
      console.log(error.message)
    }
    finally {
      setLoadingMixed(false)
    }
  }


  const callFilteredProducts = async (itsPageFiltered) => {
    setLoadingFiltered(true)
    try {
      const payload = {
        minPrice,
        maxPrice,
        brand: selectedBrand,
        categoryId: selectedCategory
      }
      const res = await api.post('/customer/getProductsByFilter', payload,
        {
          params: {
            page: pageFilter, pageSize: pageSizeFilter
          }
        }
      );
      itsPageFiltered
        ? setFilteredProducts([...filteredProducts, ...res.data.data])
        : setFilteredProducts(res.data.data);

      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error.message)
    }
    finally {
      setLoadingFiltered(false)
    }
  }


  const callBrands = async () => {
    try {
      const res = await api.get(`/customer/getBrands/${selectedCategory}`);
      setBrands([...res.data.filter((e) => e.name != null)])
      console.log(res.data)
    } catch (error) {
      console.log(error.message)
    }
  }



  useEffect(() => {
    callMixedProducts();
    setSelectedCategory(categoriesForNav[0]?._id)
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      callBrands();
    }
  }, [categoriesForNav, selectedCategory]);

  useEffect(() => {
    callFilteredProducts(false);
  }, [minPrice, maxPrice, selectedCategory, selectedBrand])

  useEffect(() => {
    if (pageFilter != 1) {
      callFilteredProducts(true);
    }
  }, [pageFilter])

  return (
    <div>
      <Carousel setLikeds={setLikeds} likeds={likeds} />
      <CatalogPageLayout
        categories={categoriesForNav}
        brands={brands}
        selectedCategory={selectedCategory}
        selectedBrand={selectedBrand}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onCategoryChange={setSelectedCategory}
        onBrandChange={setSelectedBrand}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
        onResetFilters={() => {
          setSelectedCategory("");
          setSelectedBrand("");
          setMinPrice("");
          setMaxPrice("");
        }}
        mixedItems={mixedItems}
        products={filteredProducts}
        likeds={likeds}
        setLikeds={setLikeds}
        loadingMixed={loadingMixed}
        setResponse={setResponse}
        setBasketValue={setBasketValue}
        loadingFilterd={loadingFilterd}
        totalPages={totalPages}
        setPageFilter={setPageFilter}
        pageFilter={pageFilter}
      />
    </div>
  )
}

export default Main