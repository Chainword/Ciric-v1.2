import { useEffect, useRef, useCallback } from "react";
import { TABLET } from "../constants/breakpoints";
import useThrottledEvent from "./useThrottledEvent";

/**
 * Prevents scrolling past the sentinel element. When the user reaches the
 * sentinel (typically placed just before a hidden section), the scroll position
 * is locked so the section never becomes visible. Scrolling upward remains
 * possible. Active only on screens up to the TABLET breakpoint.
 */
export default function useScrollLockSection(sentinelRef) {
  const lockPos = useRef(0);

  // Compute scroll position at which to lock
  const updateLockPosition = useCallback(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    lockPos.current = rect.top + window.scrollY - window.innerHeight;
  }, [sentinelRef]);

  // Scroll handler clamps the scroll position when threshold is reached
  const handleScroll = useCallback(() => {
    if (window.innerWidth <= TABLET && window.scrollY >= lockPos.current) {
      window.scrollTo(0, lockPos.current);
    }
  }, []);

  // Attach throttled scroll listener
  useThrottledEvent("scroll", handleScroll, 16);

  // Recompute positions on mount and resize
  useEffect(() => {
    updateLockPosition();
    window.addEventListener("resize", updateLockPosition);
    return () => {
      window.removeEventListener("resize", updateLockPosition);
    };
  }, [updateLockPosition]);
}
