import styles from "./Header.module.css";
import { TABLET } from "../../../constants/breakpoints";

const TabButton = ({
  tab,
  activeTab,
  showCloseText,
  handleTabMouseOver,
  handleTabClick,
}) => {
  const isMobile = window.innerWidth <= TABLET;

  return (
    <button
      key={tab.id}
      className={`
      ${styles.tab}
      ${activeTab === tab.id ? styles.activeTab : ""}
      ${isMobile && activeTab === tab.id ? styles.mobileActive : ""}
    `}
      onMouseOver={() => handleTabMouseOver(tab.id)}
      onClick={() => handleTabClick(tab.id)}
    >
      <span
        className={`${styles.tabText} ${showCloseText[tab.id] ? styles.hidden : ""}`}
      >
        {tab.label}
      </span>
      {isMobile && (
        <span
          className={`${styles.closeText} ${showCloseText[tab.id] ? styles.visible : ""}`}
        >
          ✖ fermer
        </span>
      )}
    </button>
  );
};

export default TabButton;
