import { useEffect, useRef } from "react";

export default function useThrottledEvent(
  eventName,
  handler,
  delay = 100,
  options = { passive: false },
) {
  const lastCall = useRef(0);
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (...args) => {
      const now = Date.now();
      if (now - lastCall.current >= delay) {
        lastCall.current = now;
        savedHandler.current(...args);
      }
    };

    window.addEventListener(eventName, listener, options);
    return () => window.removeEventListener(eventName, listener, options);
  }, [eventName, delay, options]);
}
