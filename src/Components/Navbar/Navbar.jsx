import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../Images/logo.png';
import { FiSearch, FiHeart, FiShoppingCart } from "react-icons/fi";
import { MdOutlineAssignmentTurnedIn } from 'react-icons/md';
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import './Navbar.css'
import api from '../../api';
import SearchNavbar from './SearchNavbar';
import AuthForm from '../Register/AuthForm';
import MyProfile from './MyProfile/MyProfile';
import { createSlug } from '../../functions';

const Navbar = ({
  basketValue, setBasketValue,
  orderValue, setOrderValue,
  searchData, setSearchData,
  categoriesForNav, setCategoriesForNav,
  setProfileInfo, profileInfo,
  closeSearch, setCloseSearch,
  setResponse, setTotalSearchPages,
  searchPage, setSearchPage,
  setSearchLoading }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [customerToken, setCustomerToken] = useState('');
  const [closeProfile, setCloseProfile] = useState(false);
  const [pageSize] = useState(10);
  const [searchText, setSearchText] = useState('');
  const [categoryForThisPage, setCategoryForThisPage] = useState([]);

  useEffect(() => {
    const fetchBasketCount = async () => {
      try {
        const res = await api.get("/customer/count");
        setBasketValue(res.data.count);
      } catch (error) {
        console.log("Basket count error:", error);
      }
    };

    const fetchOrderCount = async () => {
      try {
        const res = await api.get("/customer/getMyOrdersCount");
        setOrderValue(res.data.count);
      } catch (error) {
        console.log("Order count error:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const resCat = await api.get('/customer/getCategories');
        setCategoryForThisPage(resCat?.data)
        const cats = resCat?.data?.
          filter(data => data.categoryChild.length > 0)
          .map(item => item.categoryChild);

        const merged = [
          ...(resCat?.data || []),
          ...(cats || [])
        ].flat();

        setCategoriesForNav(merged);

      } catch (error) {
        console.log("Get categories error:", error);
      }
    }
    if (profileInfo) {
      fetchBasketCount();
      fetchOrderCount();
    }
    fetchCategories();
  }, [profileInfo]);

  const getProductsBySearchText = async () => {
    if (searchText.trim() == '') return;

    try {
      setSearchLoading(true)
      const searchProduct = await api.post("/customer/searchByProductNameAsCustomer",
        { searchText: searchText }, {
        params: {
          page: searchPage, pageSize
        }
      });

      setSearchData([...searchData, ...searchProduct?.data.data]);
      setTotalSearchPages(searchProduct.data.totalPages);
      setCloseSearch(true);

    } catch (error) {
      setResponse({
        message: error.response?.data?.message,
        head: 'Xəta!',
        showAlert: true,
        type: 'error'
      });
    }
    finally {
      setSearchLoading(false)
    }
  }

  const getProfile = async () => {
    try {
      const resProfile = await api.get('/customer/getMyprofileAsCustomer')

      setProfileInfo(resProfile?.data)
    } catch (error) {
      console.log(error?.message)
    }
  }

  const isLogin = () => {
    if (profileInfo) {
      setCloseProfile(true)
    } else {
      setShowAuthForm(true)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  useEffect(() => {
    getProductsBySearchText();
  }, [searchText, searchPage]);


  useEffect(() => {
    if (profileInfo) return;

    const updateBasket = () => {
      let count = 0;

      const data = localStorage.getItem("basketValues")
        ? JSON.parse(localStorage.getItem("basketValues"))
        : [];

      data.forEach((e) => (count += Number(e.quantity)));

      setBasketValue(count);
    };

    updateBasket();

    window.addEventListener("storage", updateBasket);

    window.addEventListener("basketUpdated", updateBasket);

    return () => {
      window.removeEventListener("storage", updateBasket);
      window.removeEventListener("basketUpdated", updateBasket);
    };
  }, [profileInfo]);

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <NavLink to="/">
          <img src={logo} alt="Logo" className="navbar__logo-img" />
        </NavLink>
      </div>

      <div className="navbar__search">
        <input type="text" className="navbar__search-input" placeholder="Axtar..."
          onChange={(e) => { setSearchText(e.target.value); setSearchPage(1); setSearchData([]) }} />
        <FiSearch className="navbar__search-icon" />
      </div>

      <ul className={`navbar__links ${menuOpen ? "navbar__links--active" : ""}`}>
        <li className="navbar__item" onClick={() => { setMenuOpen(false) }}>
          <NavLink to="/likeds" className="navbar__link">
            <FiHeart className="navbar__icon" />
            <span>Bəyəndiklərim</span>
          </NavLink>
        </li>
        <li className="navbar__item" onClick={() => { setMenuOpen(false) }}>
          <NavLink to="/basket" className="navbar__link">
            <FiShoppingCart className="navbar__icon" />
            <span>Səbətim</span>
          </NavLink>
          {
            basketValue > 0 && <span className='element__count'>{basketValue}</span>
          }
        </li>
        <li className="navbar__item" onClick={() => { setMenuOpen(false) }}>
          <NavLink to="/orders" className="navbar__link">
            <MdOutlineAssignmentTurnedIn className="navbar__icon" />
            <span>Sifarişlərim</span>
          </NavLink>
          {
            orderValue > 0 && <span className='element__count'>{orderValue}</span>
          }
        </li>
        <li className="navbar__item navbar__cta" onClick={isLogin}>
          <NavLink className="navbar__link">
            <FaUserCircle className="navbar__icon" />
            <span>
              {profileInfo ? "Hesabım" : "Daxil ol"}
            </span>
          </NavLink>
        </li>
      </ul>

      <ul className={`categories__name_list ${menuOpen ? "open" : ""}`}>
        {categoryForThisPage?.map((cat) => (
          <li key={cat._id} className="categories__name">
            {
              cat?.categoryChild?.length > 0 ?
                <NavLink
                  className="categories__name_link"
                >
                  {cat.name}
                </NavLink> :

                <NavLink
                  className="categories__name_link"
                  to={`/category/${createSlug(cat?.name)}/${cat?._id}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {cat.name}
                </NavLink>
            }
            {
              cat?.categoryChild?.length > 0 && (
                <ul className='category__child'>
                  {
                    cat?.categoryChild?.map((catChild) => (
                      <li key={catChild._id} className="categories__name">
                        <NavLink
                          className="categories__name_link"
                          to={`/category/${createSlug(catChild?.name)}/${catChild?._id}`}
                          onClick={() => setMenuOpen(false)}
                        >
                          {catChild.name}
                        </NavLink>
                      </li>
                    ))
                  }
                </ul>
              )
            }
          </li>
        ))}
      </ul>

      <div className="navbar__menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <HiOutlineX size={28} /> : <HiOutlineMenu size={28} />}
      </div>

      {
        closeSearch && !window.location.toString().includes('/search') ? (
          <SearchNavbar setSearchData={setSearchData} searchData={searchData}
            closeSearch={closeSearch}
            setCloseSearch={setCloseSearch}
          />
        ) : <></>
      }

      {
        showAuthForm && (
          <AuthForm
            setCustomerToken={setCustomerToken}
            setShowAuthForm={setShowAuthForm}
            setResponse={setResponse}
          />
        )
      }

      {
        closeProfile && <MyProfile profileInfo={profileInfo} setProfileInfo={setProfileInfo} setCloseProfile={setCloseProfile} />
      }
    </nav>
  );
};

export default Navbar;
