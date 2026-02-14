import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import data from "../../../Data/DataFile";
import "./CarouselPart.css";

const { carouselPartArr } = data;

const CarouselPart = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        if (width > 600) {
            const allItems = document.querySelectorAll('.carousel-part__card');
            allItems.forEach(e => {
                e.style.display = "flex";
            });
            return;
        }

        let start = carouselPartArr[1].id;
        let i = 1;
        const listOfIds = carouselPartArr.map(e => e.id);
        showItem(carouselPartArr[0].id);
        const btnHover = document.querySelectorAll('.carousel-ids-btns-hover');

        btnHover.forEach((e) => {
            if (e.getAttribute("id") !== `${carouselPartArr[0].id}Id`) {
                e.style.transition = "none";
                e.style.width = "0%";
                e.style.visibility = "hidden";
            }
        });

        const active = document.getElementById(`${carouselPartArr[0].id}Id`);
        if (active) {
            active.style.visibility = "visible";
            active.style.width = "0%";

            active.offsetWidth;

            active.style.transition = "width 6s linear";
            active.style.width = "100%";
        }

        const carouselInterval = setInterval(() => {
            showItem(start);
            start = listOfIds[i + 1];
            i++;

            if (i == listOfIds.length) {
                i = 0;
                start = listOfIds[i];
            }
        }, 6000);

        return () => {
            clearInterval(carouselInterval);
        };
    }, [width]);


    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const showItem = (itemId) => {
        const allItems = document.querySelectorAll('.carousel-part__card');
        allItems.forEach((e) => {
            e.style.display = "none";
            if (e.getAttribute("id") == itemId) {
                e.style.display = "flex"
            }
        })

        const btnHover = document.querySelectorAll('.carousel-ids-btns-hover');

        btnHover.forEach((e) => {
            if (e.getAttribute("id") !== `${itemId.toString()}Id`) {
                e.style.transition = "none";
                e.style.width = "0%";
                e.style.visibility = "hidden";
            }
        });

        const active = document.getElementById(`${itemId.toString()}Id`);
        if (active) {
            active.style.visibility = "visible";
            active.style.width = "0%";

            active.offsetWidth;

            active.style.transition = "width 6s linear";
            active.style.width = "100%";
        }
    }

    return (
        <section className="carousel-part">
            <div className="carousel-part__grid">
                {carouselPartArr?.map((e) => (
                    <NavLink to={e.itemLink} key={e.id} className="carousel-part__card" id={e.id}>
                        <div className="carousel-part__image-box">
                            <img src={e.imageUrl} alt="" className="carousel-part__image" />
                        </div>
                        <div className="carousel-part__card-content">
                            <p className="carousel-part__text">{e.imageText}</p>
                            <p className="carousel-part__text-absolute">{e.imageText}</p>
                            {e.imageDate && (
                                <span className="carousel-part__date">{e.imageDate}</span>
                            )}
                            <button className="carousel-part__button">{e.imageButton}</button>
                        </div>
                    </NavLink>
                ))}
            </div>
            <div className="carousel-ids">
                {
                    carouselPartArr.map((e) => {
                        return <button className="carousel-ids-btns" onClick={() => showItem(e.id)} key={e.id + "1"}>
                            <span className="carousel-ids-btns-hover" id={`${e.id}Id`}></span>
                        </button>
                    })
                }
            </div>
        </section>
    );
};

export default CarouselPart;
