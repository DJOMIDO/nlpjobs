// src/components/BackToTop.tsx

import React, { useState, useEffect } from "react";
import "./BackToTop.css"; // 引入样式

const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="back-to-top">
      {visible && (
        <button onClick={scrollToTop} className="back-to-top-btn">
          ↑
        </button>
      )}
    </div>
  );
};

export default BackToTop;
