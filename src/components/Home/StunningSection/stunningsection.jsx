import React, { useRef, useState } from "react";
import styles from "./stunningsection.module.css";
import useThrottledEvent from "../../../hooks/useThrottledEvent";

const TRACE_LIFETIME = 100000; // 10s
const TRACE_INTERVAL = 1; // ms
const VH_BAND = 50; // 50vh

const StunningSection = () => {
  const [traces, setTraces] = useState([]);
  const [ctrlPressed, setCtrlPressed] = useState(false);
  const [traceEnabled, setTraceEnabled] = useState(false);
  const lastTraceTimeRef = useRef(0);
  const sectionRef = useRef();
  const boundsRef = useRef({
    headerBottom: 0,
    footerTop: document.documentElement.scrollHeight,
  });

  const updateBounds = () => {
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const headerRect = header?.getBoundingClientRect();
    const footerRect = footer?.getBoundingClientRect();
    boundsRef.current.headerBottom = headerRect
      ? headerRect.bottom + window.scrollY
      : 0;
    boundsRef.current.footerTop = footerRect
      ? footerRect.top + window.scrollY
      : document.documentElement.scrollHeight;
  };

  React.useEffect(() => {
    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => {
      window.removeEventListener("resize", updateBounds);
    };
  }, []);

  useThrottledEvent("scroll", updateBounds, 100);

  // Gère l'état des touches Ctrl et Alt
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey) setCtrlPressed(true);
    };
    const handleKeyUp = (e) => {
      if (!e.ctrlKey) setCtrlPressed(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Nettoyage auto des traces expirées
  React.useEffect(() => {
    if (traces.length === 0) return;
    const interval = setInterval(() => {
      setTraces((ts) =>
        ts.filter((trace) => Date.now() - trace.time < TRACE_LIFETIME),
      );
    }, 200);
    return () => clearInterval(interval);
  }, [traces.length]);

  // Calcul dynamique de la hauteur du band (pour le CSS inline)
  const [band, setBand] = useState(
    Math.round(window.innerHeight * (VH_BAND / 100)),
  );
  React.useEffect(() => {
    const onResize = () => {
      setBand(Math.round(window.innerHeight * (VH_BAND / 100)));
      updateBounds();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Écouteur global pour suivre la souris même hors de la section (dans la bande 6vh)
  React.useEffect(() => {
    const handleGlobalMove = (e) => {
      if (!sectionRef.current || !traceEnabled) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const bandHeight = Math.round(window.innerHeight * (VH_BAND / 100));

      const { headerBottom, footerTop } = boundsRef.current;

      const pageX = e.pageX;
      const pageY = e.pageY;
      const rectLeft = rect.left + window.scrollX;
      const rectTop = rect.top + window.scrollY;

      const topBound = Math.min(rectTop - bandHeight, headerBottom);
      const bottomBound = Math.max(
        rectTop + rect.height + bandHeight,
        footerTop,
      );

      const withinSection =
        pageY >= topBound &&
        pageY <= bottomBound &&
        pageX >= rectLeft &&
        pageX <= rectLeft + rect.width;

      if (withinSection) {
        // Gestion du débit
        const now = Date.now();
        if (now - lastTraceTimeRef.current < TRACE_INTERVAL) return;
        lastTraceTimeRef.current = now;

        // Position relative au conteneur étendu : y inclut la bande du haut
        const x = pageX - rectLeft;
        const y = pageY - rectTop + bandHeight;

        let color = null;
        let blurMode = "default";
        if (ctrlPressed) {
          const hue = Math.floor(Math.random() * 360);
          color = `hsl(${hue}, 80%, 60%)`;
          blurMode = "decrease";
        }
        const size = 1;
        setTraces((ts) => [
          ...ts,
          {
            x,
            y,
            time: now,
            key: Math.random().toString(36),
            color,
            blurMode,
            size,
          },
        ]);
      }
    };

    window.addEventListener("mousemove", handleGlobalMove);
    return () => {
      window.removeEventListener("mousemove", handleGlobalMove);
    };
  }, [ctrlPressed, traceEnabled, band]);

  return (
    <section
      id="stunning-section"
      className={styles.section}
      ref={sectionRef}
      style={{
        position: "relative",
        overflow: "visible",
        zIndex: 0,
      }}
    >
      <div
        className={styles.traces}
        style={{
          position: "absolute",
          left: 0,
          top: `-${band}px`,
          width: "100%",
          height: `calc(100% + ${band * 2}px)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {traces.map(({ x, y, time, key, color, blurMode, size }) => {
          const age = Date.now() - time;
          const progress = Math.min(1, age / TRACE_LIFETIME);
          const opacity = 1 - progress;
          let blur;
          if (blurMode === "decrease") {
            blur = 3 - progress * 1; // plus net, finit à 2px
          } else {
            blur = 6 + progress * 12;
          }
          const bg = color
            ? `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 100%)`
            : "radial-gradient(circle at 50% 50%, var(--tertiary-color-hover) 0%, var(--tertiary-color) 50%, transparent 100%)";
          return (
            <span
              key={key}
              className={styles.trace}
              style={{
                left: `${x}px`,
                top: `${y}px`,
                width: `${size}rem`,
                height: `${size}rem`,
                marginLeft: `-${size / 2}rem`,
                marginTop: `-${size / 2}rem`,
                opacity,
                filter: `blur(${blur}px)`,
                transition: "opacity 1s linear, filter 1s linear",
                background: bg,
              }}
            />
          );
        })}
      </div>
      <div className={styles.container}>
        <div className={styles.gridRow}>
          <div className={styles.colTitle}>
            <h2 className={`${styles.title} aura-pulse`}>
              Autorisons-nous un espace d'expression.
            </h2>
          </div>

          <div className={styles.colSubtitle}>
            <p className={styles.subtitle}>
              S'autoriser de soi-même un espace sans attendre une validation de
              ce que l'on veut dire. Activez le bouton situé à droite et restez
              appuyer sur Ctrl pour le faire maintenant.
            </p>
          </div>

          {/* 

          <div className={styles.colSubtitle}>
            <img
              src="/images/signature/ciric.png"
              alt="Signature François Ciric"
              className={styles.signatureImg}
              style={{ maxWidth: "100%", height: "auto", display: "block", margin: "0 auto" }}
            />
          </div>

          */}

          <div className={styles.colToggle}>
            <div className={styles.toggleWrapper}>
              <button
                onClick={() => setTraceEnabled((v) => !v)}
                className={`${styles.toggle} ${traceEnabled ? styles.toggleActive : styles.toggleInactive}`}
                aria-label="Activer/désactiver les traces"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StunningSection;
