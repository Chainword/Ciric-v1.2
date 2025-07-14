import TabButton from "./TabButton";
import styles from "./Header.module.css";
import ScrambledText from "../../Common/ScrambledText";
import { TABLET } from "../../../constants/breakpoints";

const HeaderNav = ({
  headerRef,
  isSticky,
  tabs,
  activeTab,
  showCloseText,
  handleTabMouseOver,
  handleTabClick,
  handleLanguageClick,
  languageRef,
  showMobileTabs,
  onHeaderMouseEnter,
  onHeaderMouseLeave,
}) => (
  <>
    <header
      ref={headerRef}
      className={`${styles.header} ${isSticky ? styles.sticky : ""}`}
      onMouseEnter={onHeaderMouseEnter}
      onMouseLeave={onHeaderMouseLeave}
    >
      <div className={styles.headerGrid}>
        <div className={styles.logoSection}>
          <div className={styles.logoContainer}>
            <a href="/" className={styles.logoLink}>
              <span className={styles.logoMain}>CIRIC.FR</span>
              <span className={styles.logoSub}>ANCOIS</span>
            </a>
          </div>
        </div>
        <nav className={styles.navigation}>
          <div className={styles.desktopTabsContainer}>
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                tab={tab}
                activeTab={activeTab}
                showCloseText={showCloseText}
                handleTabMouseOver={handleTabMouseOver}
                handleTabClick={handleTabClick}
              />
            ))}
          </div>
        </nav>
        <div
          className={styles.languageSection}
          onMouseEnter={() => {
            if (window.innerWidth > TABLET) {
              languageRef.current?.trigger();
            }
          }}
          onMouseLeave={() => {
            if (window.innerWidth > TABLET) {
              languageRef.current?.stop();
            }
          }}
        >
          <button
            className={styles.languageButton}
            onClick={handleLanguageClick}
          >
            <ScrambledText ref={languageRef} text="Langue" />
          </button>
        </div>
      </div>
    </header>
    <div
      className={`${styles.mobileTabsContainer} ${
        showMobileTabs ? styles.visible : ""
      }`}
    >
      {tabs.map((tab) => (
        <TabButton
          key={tab.id}
          tab={tab}
          activeTab={activeTab}
          showCloseText={showCloseText}
          handleTabMouseOver={handleTabMouseOver}
          handleTabClick={handleTabClick}
        />
      ))}
    </div>
  </>
);

export default HeaderNav;
