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

const Navbar = ({
  basketValue, setBasketValue,
  orderValue, setOrderValue,
  searchData, setSearchData,
  categoriesForNav, setCategoriesForNav,
  setProfileInfo, profileInfo,
  closeSearch, setCloseSearch,
  setResponse }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [customerToken, setCustomerToken] = useState('');
  const [closeProfile, setCloseProfile] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(150);
  const [totalPages, setTotalPages] = useState(null)

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
        setCategoriesForNav(resCat?.data);
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

  const getProductsBySearchText = async (searchText) => {
    try {
      const searchProduct = await api.post("/customer/searchByProductNameAsCustomer",
        { searchText }, {
        params: {
          page, pageSize
        }
      }
      )

      setSearchData([...searchData, ...searchProduct?.data.data]);
      setTotalPages(searchProduct.data.totalPages);
      setCloseSearch(true);
    } catch (error) {
      console.log(error);
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

  // useEffect(()=>{
  //   isLogin()
  // }, [profileInfo])


  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <NavLink to="/">
          <img src={logo} alt="Logo" className="navbar__logo-img" />
        </NavLink>
      </div>

      <div className="navbar__search">
        <input type="text" className="navbar__search-input" placeholder="Axtar..." onChange={(e) => getProductsBySearchText(e.target.value)} />
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
        {categoriesForNav?.map((cat) => (
          <li key={cat._id} className="categories__name">
            <NavLink
              className="categories__name_link"
              to={`/category/${cat._id}`}
              onClick={() => setMenuOpen(false)}
            >
              {cat.name}
            </NavLink>
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
          <AuthForm setCustomerToken={setCustomerToken} setShowAuthForm={setShowAuthForm} setResponse={setResponse} />
        )
      }

      {
        closeProfile && <MyProfile profileInfo={profileInfo} setProfileInfo={setProfileInfo} setCloseProfile={setCloseProfile} />
      }
    </nav>
  );
};

export default Navbar;
