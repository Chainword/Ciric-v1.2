import React from "react";
import styles from "./ArticleSection.module.css";

const ArticleCard = ({ article, idx }) => (
  <article className={styles.card}>
    <img
      className={styles.image}
      style={{ backgroundColor: `hsl(${idx * 40 + 160},40%,40%)` }}
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
);

export default ArticleCard;
