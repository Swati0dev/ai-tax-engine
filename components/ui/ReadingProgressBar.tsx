"use client";

import { useEffect, useState } from "react";

export function ReadingProgressBar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      const scrollPercent = (scrollY / (documentHeight - windowHeight)) * 100;
      setWidth(scrollPercent);
    };

    window.addEventListener("scroll", updateWidth);
    return () => window.removeEventListener("scroll", updateWidth);
  }, []);

  return (
    <div 
      className="reading-progress-bar" 
      style={{ width: `${width}%` }} 
      role="progressbar"
      aria-valuenow={width}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}
