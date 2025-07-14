import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
} from 'react';

const SCRAMBLE_STEPS = 6;
const SCRAMBLE_LEN = 5;

const ScrambledText = forwardRef(
  (
    {
      text,
      className,
      speed = 30,
      triggerOnHover = false,
      autoScramble = true,
      onProgress,
    },
    ref
  ) => {
    const [displayed, setDisplayed] = useState([]);
    const [scrambling, setScrambling] = useState(false);
    const timeoutRef = useRef(null);

    // --- scrambleRef toujours stable ---
    const scrambleRef = useRef();
    scrambleRef.current = (speedOverride = speed) => {
      const letters =
        'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン' +
        'ابتثجحخدذرزسشصضطظعغفقكلمنهوية' +
        'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω';
      let iteration = 0;
      let currentSpeed = speedOverride;

      const step = () => {
        const revealProgress = Math.min(iteration / SCRAMBLE_STEPS, 1);
        const revealCount = Math.floor(revealProgress * SCRAMBLE_LEN);
        let scrambleArray = [];
        for (let i = 0; i < SCRAMBLE_LEN; i++) {
          if (i < revealCount && i < text.length) {
            scrambleArray.push({ char: text[i], revealed: true });
          } else if (i < text.length) {
            scrambleArray.push({
              char: letters[Math.floor(Math.random() * letters.length)],
              revealed: false,
            });
          }
        }
        setDisplayed(scrambleArray);
        if (onProgress) onProgress(revealProgress);

        iteration += 1 / 3;
        if (iteration >= SCRAMBLE_STEPS) {
          setScrambling(false);
          setDisplayed(
            text.split('').map((c) => ({ char: c, revealed: true }))
          );
          if (onProgress) onProgress(1);
          return;
        }
        timeoutRef.current = setTimeout(step, currentSpeed);
      };

      clearTimeout(timeoutRef.current);
      setScrambling(true);
      timeoutRef.current = setTimeout(step, currentSpeed);
    };

    const stop = () => {
      clearTimeout(timeoutRef.current);
      setDisplayed(text.split('').map((c) => ({ char: c, revealed: true })));
      setScrambling(false);
    };

    useImperativeHandle(
      ref,
      () => ({
        trigger: scrambleRef.current,
        stop,
      }),
      [text]
    );

    // --- UseEffect déclenche scramble SEULEMENT une fois par apparition/texte ---
    useEffect(() => {
      if (!triggerOnHover && autoScramble) {
        scrambleRef.current();
      } else {
        setDisplayed([]);
      }
      return () => {
        clearTimeout(timeoutRef.current);
      };
    }, [triggerOnHover, autoScramble, text]);

    const handleMouseEnter = () => {
      if (triggerOnHover && window.innerWidth >= 992) {
        scrambleRef.current();
      }
    };

    const handleMouseLeave = () => {
      if (triggerOnHover && window.innerWidth >= 992) {
        stop();
      }
    };

    return (
      <span
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          display: 'inline-block',
          minWidth: scrambling ? '6ch' : undefined,
        }}
      >
        {scrambling && displayed.length > 0
          ? displayed.map((el, idx) => (
              <span
                key={idx}
                style={{
                  opacity: el.revealed ? 1 : 0.25,
                  fontWeight: el.revealed ? 100 : 100,
                  transition: 'opacity 0.15s',
                }}
              >
                {el.char}
              </span>
            ))
          : text.split('').map((char, idx) => (
              <span key={idx}>{char}</span>
            ))}
      </span>
    );
  }
);

export default ScrambledText;
