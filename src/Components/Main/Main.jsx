import React, { useEffect, useState } from 'react'
import Carousel from './Carousel/Carousel'
import CategoryGrid from './Categories/CategoryGrid'
import CatalogPageLayout from './PageLayout/CatalogPageLayout'
import { brands } from '../Data/DataFile'
import api from '../../api'

const Main = ({ categoriesForNav, likeds, setLikeds, setResponse, setBasketValue }) => {
  const [selectedBrand, setSelectedBrand] = useState({});
  const [selectedCategory, setSelectedCategory] = useState({});
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [mixedItems, setMixedItems] = useState([])
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [loadingMixed, setLoadingMixed] = useState(false);

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
    finally{
      setLoadingMixed(false)
    }
  }

  useEffect(() => {
    callMixedProducts()
  }, [])

  return (
    <div>
      <Carousel setLikeds={setLikeds} likeds={likeds} />
      {/* <CategoryGrid categoriesForNav={categoriesForNav} setLikeds={setLikeds} likeds={likeds} /> */}
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
        products={[]}
        likeds={likeds}
        setLikeds={setLikeds}
        loadingMixed={loadingMixed}
        setResponse={setResponse}
        setBasketValue={setBasketValue}
      />
    </div>
  )
}

export default Main