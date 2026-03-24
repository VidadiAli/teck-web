import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "./CarouselPart.css";
import api from "../../../../api";
import LoadingAllData from "../../../../loadings/LoadingAllData";

const CarouselPart = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [carouselPartArr, setCarouselPartArr] = useState([]);
  const [loading, setLoading] = useState(false)
  const intervalRef = useRef(null);

  const allCarouselPosts = async () => {
    try {
      setLoading(true)
      const res = await api.get("/customer/getAllCarouselPosts");
      const list = Array.isArray(res?.data) ? res.data : res?.data?.posts || [];
      setCarouselPartArr(list);
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    allCarouselPosts();
  }, []);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showItem = (itemId) => {
    const allItems = document.querySelectorAll(".carousel-part__card");
    allItems.forEach((el) => {
      el.style.display = "none";
      if (el.getAttribute("id") === String(itemId)) el.style.display = "flex";
    });

    const btnHover = document.querySelectorAll(".carousel-ids-btns-hover");
    btnHover.forEach((el) => {
      if (el.getAttribute("id") !== `${String(itemId)}Id`) {
        el.style.transition = "none";
        el.style.width = "0%";
        el.style.visibility = "hidden";
      }
    });

    const active = document.getElementById(`${String(itemId)}Id`);
    if (active) {
      active.style.visibility = "visible";
      active.style.width = "0%";
      active.offsetWidth;
      active.style.transition = "width 6s linear";
      active.style.width = "100%";
    }
  };

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!carouselPartArr || carouselPartArr.length === 0) return;

    if (width > 1000) {
      const allItems = document.querySelectorAll(".carousel-part__card");
      allItems.forEach((el) => (el.style.display = "flex"));

      const btnHover = document.querySelectorAll(".carousel-ids-btns-hover");
      btnHover.forEach((el) => {
        el.style.transition = "none";
        el.style.width = "0%";
        el.style.visibility = "hidden";
      });

      return;
    }

    const listOfIds = carouselPartArr.map((x) => x._id);

    showItem(listOfIds[0]);

    let i = 1;
    intervalRef.current = setInterval(() => {
      showItem(listOfIds[i]);
      i++;
      if (i >= listOfIds.length) i = 0;
    }, 6000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [width, carouselPartArr]);

  if (loading) return <LoadingAllData />

  return (
    <section className="carousel-part">
      <div className="carousel-part__grid">
        {carouselPartArr?.map((e) => (
          <NavLink
            to={`category/${"c" + '-id-' + e.itemLink}`}
            key={e._id}
            className="carousel-part__card"
            id={e._id}
          >
            <div className="carousel-part__image-box">
              <img src={e.itemImage} alt="" className="carousel-part__image" />
            </div>

            <div className="carousel-part__card-content">
              <button className="carousel-part__button">Ətraflı</button>
            </div>
          </NavLink>
        ))}
      </div>

      <div className="carousel-ids">
        {carouselPartArr.map((e) => (
          <button
            className="carousel-ids-btns"
            type="button"
            onClick={() => showItem(e._id)}
            key={e._id + "1"}
          >
            <span className="carousel-ids-btns-hover" id={`${e._id}Id`}></span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CarouselPart;