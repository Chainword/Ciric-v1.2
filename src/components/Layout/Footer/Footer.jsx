import styles from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.brandSection}>
          <div className={styles.brandLogo}>
            <span className={styles.logoMain}>CIRIC.FR</span>
            <span className={styles.logoSub}>ANCOIS</span>
          </div>
          <p className={styles.tagline}>Art numérique et physique</p>
        </div>

        <div className={styles.navSection}>
          <a href="#" className={styles.link}>
            Numérique
          </a>
          <a href="#" className={styles.link}>
            Physique
          </a>
          <a href="#" className={styles.link}>
            Expositions
          </a>
        </div>

        <div className={styles.infoSection}>
          <a href="mailto:contact@ciric.fr" className={styles.link}>
            contact@ciric.fr
          </a>
          <a href="#" className={styles.link}>
            Mentions légales
          </a>
          <a href="#" className={styles.link}>
            Politique de confidentialité
          </a>
        </div>

        <div className={styles.ctaSection}>
          <p className={styles.ctaText}>Rejoignez la newsletter</p>
          <button className={styles.ctaButton}>S'abonner</button>
        </div>
      </div>
      <div className={styles.bottom}>
        &copy; {currentYear} Ciric. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
