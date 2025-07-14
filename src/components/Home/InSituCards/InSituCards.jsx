// src/components/Home/InSituCards/InSituCards.jsx

import React from "react";
import styles from "./InSituCards.module.css";

const InSituCards = ({ cards }) => {
  if (!cards || cards.length === 0) {
    return <div className={styles["insitu-section"]}>Aucune carte à afficher.</div>;
  }

  return (
    <section className={styles["insitu-section"]}>
      <div className={styles["insitu-sectionContent"]}>
        <div className={styles["insitu-grid"]}>
          {cards.map((card) => (
            <article key={card.id} className={styles["insitu-card"]}>
              <div className={styles["insitu-imageBox"]}>
                <img
                  src={card.image}
                  alt={card.title}
                  className={styles["insitu-image"]}
                  loading="lazy"
                />
                {card.available === false && (
                  <div className={styles["insitu-unavailable"]}>{/*Indisponible */}</div>
                )}
              </div>
              <div className={styles["insitu-text"]}>
                <h4 className={styles["insitu-title"]}>{card.title}</h4>
                <p className={styles["insitu-source"]}>{card.source}</p>
                <p className={styles["insitu-price"]}>{card.price}</p>
              </div>
              <button className={styles["insitu-cta"]}>Découvrir</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InSituCards;
