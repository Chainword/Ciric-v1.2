import { useState, useEffect, useRef } from "react";
import { TABLET } from "../../../constants/breakpoints";
import useThrottledEvent from "../../../hooks/useThrottledEvent";
import Headroom from "react-headroom";
import HeaderNav from "./HeaderNav";
import TabsContent from "./TabsContent";

const Header = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showCloseText, setShowCloseText] = useState({});
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [isContentHovered, setIsContentHovered] = useState(false);
  const headerRef = useRef(null);
  const languageRef = useRef(null);

  const tabs = [
    { id: 1, label: "Travaux" },
    { id: 2, label: "Projets" },
    { id: 3, label: "Articles" },
    { id: 4, label: "Commander" },
    { id: 5, label: "Évènements" },
    { id: 6, label: "Ressources" },
  ];

  const tab1Images = [
    "/images/cards tab1/roche fondante.png",
    "/images/cards tab1/licorne.png",
    "/images/cards tab1/jafari.png",
    "/images/cards tab1/bateau 91.png",
    "/images/cards tab1/abusamenta.png",
  ];

  // Au chargement, ajoute la classe dark-navigator si besoin
  useEffect(() => {
    document.body.classList.add("dark-navigator");
    return () => {
      document.body.classList.remove("dark-navigator");
    };
  }, []);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= TABLET);
    if (window.innerWidth > TABLET) {
      setShowCloseText({});
    } else if (activeTab !== null) {
      setShowCloseText({ [activeTab]: true });
    }
  };

  useEffect(() => {
    handleResize();
  }, []);

  useThrottledEvent("resize", handleResize, 200);

  // Handle tab interactions
  const handleTabMouseOver = (tabId) => {
    if (window.innerWidth > TABLET) {
      setActiveTab(tabId);
    }
  };

  const handleTabClick = (tabId) => {
    if (window.innerWidth <= TABLET) {
      if (activeTab === tabId) {
        setActiveTab(null);
        setShowCloseText((prev) => ({ ...prev, [tabId]: false }));
      } else {
        setActiveTab(tabId);
        setShowCloseText({ [tabId]: true });
      }
    }
  };

  const handleLanguageMouseEnter = () => {
    if (window.innerWidth > TABLET) {
      languageRef.current?.trigger();
    }
  };

  const handleLanguageMouseLeave = () => {
    if (window.innerWidth > TABLET) {
      languageRef.current?.stop();
    }
  };

  useEffect(() => {
    if (window.innerWidth <= TABLET) {
      setTimeout(() => {
        languageRef.current?.trigger(60);
      }, 300);
    }
  }, []);

  const handleLanguageClick = () => {
    if (window.innerWidth <= TABLET) {
      languageRef.current?.trigger();
    }
    const currentUrl = window.location.href;
    const ALLOWED_LANGS = ["en", "fr", "es", "de"];
    const rawLang = (navigator.language || navigator.userLanguage || "en")
      .slice(0, 2)
      .toLowerCase();
    const userLang = ALLOWED_LANGS.includes(rawLang) ? rawLang : "en";
    const googleTranslateUrl = `https://translate.google.com/translate?hl=${userLang}&sl=fr&tl=${userLang}&u=${encodeURIComponent(currentUrl)}&anno=1`; // À vérifier pour la sécurité
    window.open(googleTranslateUrl, "_blank", "noopener,noreferrer");
  };

  // Ferme l'onglet ouvert si la souris n'est ni sur le header ni sur le contenu
  useEffect(() => {
    if (
      activeTab &&
      window.innerWidth > TABLET &&
      !isHeaderHovered &&
      !isContentHovered
    ) {
      setActiveTab(null);
    }
  }, [isHeaderHovered, isContentHovered, activeTab]);

  useEffect(() => {
    if (activeTab !== null) {
      document.body.classList.add("overlay-active");
    } else {
      document.body.classList.remove("overlay-active");
    }
  }, [activeTab]);

  return (
    <>
      <Headroom
        tolerance={{ up: 10, down: 10 }}
        disableInlineStyles
        wrapperStyle={{ position: "relative", zIndex: "var(--z-header)" }}
      >
        <HeaderNav
          headerRef={headerRef}
          tabs={tabs}
          activeTab={activeTab}
          showCloseText={showCloseText}
          handleTabMouseOver={handleTabMouseOver}
          handleTabClick={handleTabClick}
          handleLanguageClick={handleLanguageClick}
          languageRef={languageRef}
          onHeaderMouseEnter={() => setIsHeaderHovered(true)}
          onHeaderMouseLeave={() => setIsHeaderHovered(false)}
        />
      </Headroom>
      <TabsContent
        activeTab={activeTab}
        tabs={tabs}
        isMobile={isMobile}
        setIsContentHovered={setIsContentHovered}
        tab1Images={tab1Images}
      />
    </>
  );
};

export default Header;
