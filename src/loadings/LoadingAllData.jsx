import React, { useEffect, useState } from "react";
import "./loadingAllData.css";

const LoadingAllData = () => {
  const [count, setCount] = useState(5);

  const updateCount = () => {
    const width = window.innerWidth;

    if (width <= 600) {
      setCount(2);
    } else if (width <= 1000) {
      setCount(3);
    } else {
      setCount(5);
    }
  };

  useEffect(() => {
    updateCount();
    window.addEventListener("resize", updateCount);

    return () => window.removeEventListener("resize", updateCount);
  }, []);

  return (
    <div className="tvef-loading-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div className="tvef-loading-card" key={i}>
          <div className="tvef-loading-image"></div>
          <div className="tvef-loading-line"></div>
          <div className="tvef-loading-line small"></div>
        </div>
      ))}
    </div>
  );
};

export default LoadingAllData;