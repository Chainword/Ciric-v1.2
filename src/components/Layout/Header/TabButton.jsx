import styles from "./Header.module.css";

const TabButton = ({ tab, activeTab, handleTabMouseOver, handleTabClick }) => {
  return (
    <button
      key={tab.id}
      className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ""}`}
      onMouseOver={() => handleTabMouseOver(tab.id)}
      onClick={() => handleTabClick(tab.id)}
    >
      <span className={styles.tabText}>{tab.label}</span>
    </button>
  );
};

export default TabButton;
