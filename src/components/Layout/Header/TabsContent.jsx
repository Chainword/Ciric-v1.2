import { RemoveScroll } from "react-remove-scroll";
import InfoGrid from "./InfoTab/InfoGrid";
import styles from "./Header.module.css";

const tab1Colors = [
  "bg-hue-25",
  "bg-hue-75",
  "bg-hue-125",
  "bg-hue-175",
  "bg-hue-225",
];
const tab2Colors = [
  "bg-hue-50",
  "bg-hue-100",
  "bg-hue-150",
  "bg-hue-200",
  "bg-hue-250",
  "bg-hue-300",
  "bg-hue-350",
  "bg-hue-400",
  "bg-hue-450",
];
const tab5Colors = ["bg-hue-50", "bg-hue-100", "bg-hue-150", "bg-hue-200"];

const TabsContent = ({
  activeTab,
  tabs,
  isMobile,
  setIsContentHovered,
  tab1Images,
}) => (
  <RemoveScroll enabled={activeTab !== null} removeScrollBar={isMobile}>
    <div className={`${styles.tabsContent} ${activeTab ? styles.visible : ""}`}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`${styles.tabContent} ${activeTab === tab.id ? styles.activeContent : ""}`}
          onMouseEnter={() => setIsContentHovered(true)}
          onMouseLeave={() => setIsContentHovered(false)}
        >
          <div className={styles.tabContentInner}>
            {tab.id === 1 && (
              <div className={styles.gridContent}>
                <div className={styles.mixedGrid}>
                  {[
                    "Roche fondante",
                    "Licorne",
                    "Ashramukhi Jafari",
                    "Bateau 91",
                    "Abusamenta",
                  ].map((title, idx) => (
                    <div
                      key={idx}
                      className={`${styles.gridItem} ${styles.card} ${styles.tab1Card}`}
                    >
                      <img
                        className={`${styles.gridImage} ${styles[tab1Colors[idx]]}`}
                        src={tab1Images[idx]}
                        alt={`Illustration ${idx + 1}`}
                      />
                      <div className={styles.gridText}>
                        <h3 className="no-translate">{title}</h3>
                        <p>2 pièces, 2024</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab.id === 2 && (
              <>
                <div className={styles.gridContent}>
                  <div className={styles.mixedGrid}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, idx) => (
                      <div
                        key={item}
                        className={`${styles.gridItem} ${styles.card} ${styles.tab2Card}`}
                      >
                        <img
                          className={`${styles.gridImage} ${styles[tab2Colors[idx]]}`}
                          src=""
                          alt={`Illustration ${item}`}
                        />
                        <div className={styles.gridText}>
                          <h3>Texte {item}</h3>
                          <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {tab.id === 3 && (
              <div className={styles.imageOnlyContent}>
                <img
                  className={`${styles.imageOnlyPlaceholder} ${styles["bg-gray-700-var"]}`}
                  src=""
                  alt="Légende de l'œuvre"
                />
                <span className={styles.imageCaption}>Légende de l'œuvre</span>
              </div>
            )}

            {tab.id === 4 && (
              <div className={styles.crossContent}>
                <img
                  className={`${styles.crossImage} ${styles["bg-gray-800-var"]}`}
                  src=""
                  alt="Illustration"
                />
                <div className={styles.crossText}>
                  <h2 className={styles.tabTitle}>Article croisé</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer nec odio. Praesent libero. Sed cursus ante dapibus
                    diam.
                  </p>
                </div>
              </div>
            )}

            {tab.id === 5 && (
              <div className={styles.gridContent}>
                <div className={styles.mixedGrid}>
                  {[1, 2, 3, 4].map((item, idx) => (
                    <div
                      key={item}
                      className={`${styles.gridItem} ${styles.card} ${styles.tab5Card}`}
                    >
                      <img
                        className={`${styles.gridImage} ${styles[tab5Colors[idx]]}`}
                        src=""
                        alt={`Illustration ${item}`}
                      />
                      <div className={styles.gridText}>
                        <h3>Texte {item}</h3>
                        <p>Lorem ipsum dolor sit amet.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab.id === 6 && (
              <div
                className={`${styles.tab6Content} ${styles.tab6GridWrapper}`}
              >
                <InfoGrid />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </RemoveScroll>
);

export default TabsContent;
