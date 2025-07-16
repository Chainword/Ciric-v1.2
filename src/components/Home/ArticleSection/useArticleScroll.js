import { useEffect, useRef } from "react";
import styles from "./ArticleSection.module.css";

const useArticleScroll = (columnRef) => {
  const activeIdx = useRef(0);

  useEffect(() => {
    const column = columnRef.current;
    if (!column) return;

    const updateClasses = () => {
      const cards = column.children;
      Array.from(cards).forEach((c) =>
        c.classList.remove(styles.active, styles.preview),
      );
      if (cards[activeIdx.current])
        cards[activeIdx.current].classList.add(styles.active);
      if (cards[activeIdx.current + 1])
        cards[activeIdx.current + 1].classList.add(styles.preview);
    };

    const scrollToActive = () => {
      const isHorizontal = window.innerWidth <= 991;
      const current = column.children[activeIdx.current];
      if (current) {
        column.scrollTo({
          [isHorizontal ? "left" : "top"]: isHorizontal
            ? current.offsetLeft
            : current.offsetTop,
          behavior: "auto",
        });
      }
      updateClasses();
    };

    const handleWheel = (e) => {
      e.preventDefault();
      const dir = e.deltaY > 0 ? 1 : -1;
      const nextIdx = activeIdx.current + dir;
      if (nextIdx >= 0 && nextIdx < column.children.length) {
        activeIdx.current = nextIdx;
        scrollToActive();
      }
    };

    const handleResize = scrollToActive;

    column.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", handleResize);

    scrollToActive();

    return () => {
      column.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
    };
  }, [columnRef]);
};

export default useArticleScroll;
