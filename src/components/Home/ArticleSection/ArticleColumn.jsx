import React, { useRef } from "react";
import styles from "./ArticleSection.module.css";
import useArticleScroll from "./useArticleScroll";
import ArticleCard from "./ArticleCard";

const ArticleColumn = ({ theme, light, articles }) => {
  const columnRef = useRef(null);
  useArticleScroll(columnRef);

  return (
    <div className={styles.column}>
      <h3 className={`${styles.theme} ${light ? styles.themeLight : ""}`}>
        {theme}
      </h3>
      <div className={styles.columnScroll} ref={columnRef}>
        {articles.map((article, idx) => (
          <ArticleCard key={article.id} article={article} idx={idx} />
        ))}
        <div className={styles.follow}>à suivre</div>
      </div>
      <div className={styles.shadowBox} aria-hidden />
    </div>
  );
};

export default ArticleColumn;
