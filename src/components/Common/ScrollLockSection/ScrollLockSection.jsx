import React, { useRef } from "react";
import useScrollLockSection from "../../../hooks/useScrollLockSection";
import styles from "./ScrollLockSection.module.css";

/**
 * Section that prevents further scrolling on mobile/tablet. It should be
 * rendered just after the site footer.
 */
const ScrollLockSection = () => {
  const sentinelRef = useRef(null);
  useScrollLockSection(sentinelRef);

  return (
    <>
      {/* Invisible element observed for scroll position */}
      <div ref={sentinelRef} className={styles.sentinel} aria-hidden="true" />
      {/* Hidden 100vh section with primary background */}
      <section className={styles.lockSection} aria-hidden="true" />
    </>
  );
};

export default ScrollLockSection;
