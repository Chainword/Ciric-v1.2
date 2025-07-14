import { useRef, useEffect, useState } from 'react';
import ScrambledText from '../../Common/ScrambledText';
import styles from './ContentGrid.module.css';

const blocks = [
  { title: 'Esprit', text: "L'esprit de l'artiste constitue un réservoir dynamique, façonné par la convergence de perceptions, d'émotions et de mémoires. Cet univers intérieur structure le processus créatif en agissant comme un filtre subjectif à travers lequel le réel est interprété. Dès lors, comment les expériences singulières vécues par l'artiste modifient-elles ou enrichissent-elles son imaginaire ? Quels types d’événements personnels génèrent les empreintes les plus durables dans la structuration de sa perception esthétique ?" },
  { title: 'Contexte', text: "Le contexte historique, culturel et social est déterminant dans l'élaboration d'une œuvre artistique, puisqu'il forme un cadre référentiel à partir duquel l’artiste dialogue avec son époque. Les évolutions sociétales, les bouleversements politiques ou les courants idéologiques constituent autant de forces agissantes sur l’orientation esthétique et thématique de la création. Dans quelle mesure les conditions sociales et historiques contemporaines influencent-elles nos méthodes et nos choix artistiques ? Comment les transformations collectives façonnent-elles nos représentations individuelles et collectives dans le domaine de l'art ?" },
  { title: 'Technique', text: "La technique est le médiateur indispensable entre l'idée artistique et sa matérialisation concrète, permettant la traduction visible de l'esprit et du contexte de l'artiste. Son perfectionnement continu procède d’une réflexion critique, d’expérimentations méthodiques et d’une pratique assidue, menant ainsi à des formes d’expression renouvelées et sophistiquées. Comment notre pratique des techniques artistiques a-t-elle mûri et évolué au fil du temps ? Quelles compétences spécifiques ou approches méthodologiques souhaitons-nous désormais développer pour approfondir et diversifier notre démarche artistique ?" },
];

const ContentGrid = () => {
  const titleRefs = [useRef(null), useRef(null), useRef(null)];
  const h2Refs = [useRef(null), useRef(null), useRef(null)];
  const gridRef = useRef(null);

  const [triggered, setTriggered] = useState([false, false, false]);
  const [alreadyTriggeredGrid, setAlreadyTriggeredGrid] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const width = window.innerWidth;
      const triggerLine = window.innerHeight / 2;

      if (width >= 992) {
        // Desktop : tous ensemble
        if (alreadyTriggeredGrid) return;
        const rect = gridRef.current?.getBoundingClientRect();
        if (!rect) return;
        if (rect.top < triggerLine && rect.bottom > triggerLine) {
          setAlreadyTriggeredGrid(true);
          titleRefs.forEach(ref => {
            ref.current?.trigger && ref.current.trigger();
          });
        }
      } else {
        // Tablet/mobile : titre par titre
        setTriggered((prev) => {
          // On ne modifie que si besoin, pour ne pas re-render inutilement
          const next = [...prev];
          for (let idx = 0; idx < h2Refs.length; idx++) {
            if (prev[idx]) continue; // déjà déclenché
            const h2 = h2Refs[idx]?.current;
            if (!h2) continue;
            const rect = h2.getBoundingClientRect();
            if (rect.top < triggerLine && rect.bottom > triggerLine) {
              // On déclenche le scramble pour ce titre
              titleRefs[idx]?.current?.trigger && titleRefs[idx].current.trigger();
              next[idx] = true;
            }
          }
          return next;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    setTimeout(handleScroll, 100); // Pour détecter au chargement aussi

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [alreadyTriggeredGrid]);

  return (
    <section className={`${styles.contentSection} dark-navigator`}>
      <div className={styles.container}>
        <div className={styles.grid} ref={gridRef}>
          {blocks.map((block, idx) => (
            <div key={idx} className={styles.item}>
              <h2 className={styles.title} ref={h2Refs[idx]}>
                <ScrambledText
                  ref={titleRefs[idx]}
                  text={block.title}
                  triggerOnHover={false}
                  autoScramble={false}
                />
              </h2>
              <p className={styles.text}>{block.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentGrid;
