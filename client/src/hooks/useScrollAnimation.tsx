import { useState, useEffect, useRef } from "react";

export function useScrollAnimation() {
  useEffect(() => {
    const animateElements = document.querySelectorAll(".animate-on-scroll");
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, {
      threshold: 0.1
    });
    
    animateElements.forEach(element => {
      observer.observe(element);
    });
    
    return () => {
      animateElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);
}

export default useScrollAnimation;
