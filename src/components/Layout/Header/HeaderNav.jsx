import TabButton from "./TabButton";
import styles from "./Header.module.css";
import ScrambledText from "../../Common/ScrambledText";

const HeaderNav = ({
  headerRef,
  tabs,
  activeTab,
  handleTabMouseOver,
  handleTabClick,
  handleLanguageClick,
  languageRef,
  onHeaderMouseEnter,
  onHeaderMouseLeave,
}) => (
  <>
    <header
      ref={headerRef}
      className={`${styles.header} ${styles.sticky}`}
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
                handleTabMouseOver={handleTabMouseOver}
                handleTabClick={handleTabClick}
              />
            ))}
          </div>
        </nav>
        <div
          className={styles.languageSection}
          onMouseEnter={() => languageRef.current?.trigger()}
          onMouseLeave={() => languageRef.current?.stop()}
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
  </>
);

export default HeaderNav;
