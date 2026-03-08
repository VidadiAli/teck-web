import React from "react";
import "./ReclamArea.css";

const ReclamArea = () => {
  return (
    <section className="reclam-area">
      <div className="reclam-grid">

        <div className="reclam-item reclam-big">
          <img
            src="https://res.cloudinary.com/dtfwioxha/image/upload/v1772980570/hero_startframe__e9e7pcnguyqi_xlarge_2x-removebg-preview_wrguqf.png"
            alt=""
          />
        </div>

        <div className="reclam-item reclam-second">
          <img
            src="https://res.cloudinary.com/dtfwioxha/image/upload/v1772980769/mba_13_15_79c9165d6_2x-removebg-preview_kjpngh.png"
            alt=""
          />
        </div>

        <div className="reclam-item">
          <img
            src="https://res.cloudinary.com/dtfwioxha/image/upload/v1772980663/250612160025667198_cjcpjh.png"
            alt=""
          />
        </div>

      </div>
    </section>
  );
};

export default ReclamArea;