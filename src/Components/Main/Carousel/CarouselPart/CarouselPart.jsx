import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import data from "../../../Data/DataFile";
import "./CarouselPart.css";

const { carouselPartArr } = data;

const CarouselPart = () => {

    return (
        <section className="carousel-part">
            <div className="carousel-part__grid">
                {carouselPartArr?.map((e) => (
                    <NavLink to={e.itemLink} key={e.id} className="carousel-part__card">
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
        </section>
    );
};

export default CarouselPart;
