import { useState, useEffect, useRef } from "react";
import styles from "./HeroSlider.module.css";

const slides = [
  {
    id: 1,
    title: "Slide 1",
    backgroundColor: "var(--gray-700)",
    image: "/images/slider/slide 1.png",
  },
  {
    id: 2,
    title: "Slide 2",
    backgroundColor: "var(--gray-800)",
    image: "/images/slider/slide 2.png",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(null);
  const [zoomOut, setZoomOut] = useState(false);
  const currentRef = useRef(currentSlide);

  useEffect(() => {
    currentRef.current = currentSlide;
  }, [currentSlide]);

  // Auto-advance slides and alternate zoom direction
  useEffect(() => {
    const interval = setInterval(() => {
      setPrevSlide(currentRef.current);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setZoomOut((prev) => !prev);
    }, 10000); // switch slides at the zoom extremes

    return () => clearInterval(interval);
  }, []);

  // remove previous slide after fade-out
  useEffect(() => {
    if (prevSlide !== null) {
      const timeout = setTimeout(() => setPrevSlide(null), 8192);
      return () => clearTimeout(timeout);
    }
  }, [prevSlide]);

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slider}>
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          const isPrev = index === prevSlide;
          let directionClass = "";
          if (isActive) {
            directionClass = zoomOut ? styles.zoomOut : styles.zoomIn;
          } else if (isPrev) {
            directionClass = zoomOut ? styles.zoomIn : styles.zoomOut;
          }
          return (
            <div
              key={slide.id}
              className={`
                ${styles.slide}
                ${isActive ? styles.active : ""}
                ${directionClass}
              `}
            >
              <div
                className={styles.slideImage}
                style={{ backgroundColor: slide.backgroundColor }}
              >
                {/* Image placeholder with Ken Burns effect */}
                <img
                  className={styles.imagePlaceholder}
                  src={slide.image}
                  alt={slide.title}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroSlider;
