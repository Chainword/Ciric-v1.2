import React from "react";
import styles from "./ArticleSection.module.css";

const data = [

    {
    theme: "Récents",
    light: true,
    articles: [
      {
        id: 10,
        title: "Dernières actualités",
        summary:
          "Tags : Consectetur. Adipiscing elit. Sed do eiusmod tempor.",
        date: "2024-06-01",
        author: "François",
      },
      {
        id: 11,
        title: "Tendances du moment",
        summary:
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
        date: "2024-05-25",
        author: "François",
      },
      {
        id: 12,
        title: "En bref",
        summary:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
        date: "2024-05-10",
        author: "François",
      },
    ],
  },

  {
    
    theme: "Vision",
    articles: [
      {
        id: 1,
        title: "Exploration visuelle",
        summary:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
        date: "2024-05-01",
        author: "François",
      },
      {
        id: 2,
        title: "Couleurs et matières",
        summary:
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
        date: "2024-04-18",
        author: "François",
      },
      {
        id: 3,
        title: "Nouvelles perspectives",
        summary:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
        date: "2024-03-07",
        author: "François",
      },
    ],
  },
  {
    theme: "Structure",
    articles: [
      {
        id: 4,
        title: "Innovation numérique",
        summary:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
        date: "2024-05-12",
        author: "François",
      },
      {
        id: 5,
        title: "Outils créatifs",
        summary:
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
        date: "2024-04-22",
        author: "François",
      },
      {
        id: 6,
        title: "Intelligence artificielle",
        summary:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
        date: "2024-03-18",
        author: "François",
      },
    ],
  },
  {
    theme: "Éthique",
    articles: [
      {
        id: 7,
        title: "Design contemporain",
        summary:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
        date: "2024-05-20",
        author: "François",
      },
      {
        id: 8,
        title: "Formes organiques",
        summary:
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
        date: "2024-04-10",
        author: "François",
      },
      {
        id: 9,
        title: "Éclairage et ambiance",
        summary:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
        date: "2024-03-02",
        author: "François",
      },
    ],
  },
];

const ArticleSection = () => {

  return (
    <section className={styles.section}>
      <div className={styles.section__content}>
        <div className={styles.grid}>
          {data.map((column) => (
            <div key={column.theme} className={styles.column}>
              <h3
                className={`${styles.theme} ${column.light ? styles.themeLight : ""}`}
              >
                {column.theme}
              </h3>
              <div className={styles.columnScroll}>
                {column.articles.map((article, idx) => (
                  <article key={article.id} className={styles.card}>
                    <img
                      className={styles.image}
                      style={{
                        backgroundColor: `hsl(${idx * 40 + 160},40%,40%)`,
                      }}
                      src=""
                      alt={article.title}
                    />
                    <div className={styles.content}>
                      <h4 className={styles.title}>{article.title}</h4>
                      <p className={styles.summary}>{article.summary}</p>
                    </div>
                    <div className={styles.meta}>
                      <div className={styles.author}>
                        <span className={styles.avatar} />
                        <span>{article.author}</span>
                      </div>
                      <time className={styles.date}>{article.date}</time>
                    </div>
                  </article>
                ))}
                <div className={styles.follow}>à suivre</div>
              </div>
              <div className={styles.shadowBox} aria-hidden />
            </div>
          ))}
        </div>
        <div className={styles.buttons}>
          <a href="#" className={styles.button}>
            Accéder à tous les articles
          </a>
            {/* 
            <a href="#" className={styles.buttonSecondary}>
              Soumettre un article
            </a>
            */}

        </div>
      </div>
    </section>
  );
};

export default ArticleSection;
