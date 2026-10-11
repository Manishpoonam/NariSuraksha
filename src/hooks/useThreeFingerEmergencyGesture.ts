/**
 * 3-Finger Emergency Camouflage Gesture Hook
 * 
 * Intercepts multi-touch swipe events non-passively:
 * 1. Cancels native browser swipe gestures / pull-to-refresh on 3 fingers
 * 2. Detects 3-finger swipe in any direction (distance >= 30px)
 * 3. Bidirectional toggle: real app -> disguise, and disguise -> real app
 */
import { useEffect, useRef } from 'react';

export function useThreeFingerEmergencyGesture(onToggle: () => void) {
  const onToggleRef = useRef(onToggle);
  onToggleRef.current = onToggle;

  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let hasSwiped = false;
    let activeTouchCount = 0;

    const handleTouchStart = (e: TouchEvent) => {
      activeTouchCount = e.touches.length;
      if (e.touches && e.touches.length >= 3) {
        // Prevent default browser gestures (Chrome 3-finger reload/history or pull-to-refresh)
        if (e.cancelable) {
          e.preventDefault();
        }
        hasSwiped = false;
        // Average coordinates across the 3 touch points
        startX = (e.touches[0].clientX + e.touches[1].clientX + e.touches[2].clientX) / 3;
        startY = (e.touches[0].clientY + e.touches[1].clientY + e.touches[2].clientY) / 3;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      activeTouchCount = e.touches.length;
      if (e.touches && e.touches.length >= 3) {
        // Intercept movement to block native swipe behaviors
        if (e.cancelable) {
          e.preventDefault();
        }
        if (!hasSwiped) {
          const currentX = (e.touches[0].clientX + e.touches[1].clientX + e.touches[2].clientX) / 3;
          const currentY = (e.touches[0].clientY + e.touches[1].clientY + e.touches[2].clientY) / 3;
          const deltaX = currentX - startX;
          const deltaY = currentY - startY;
          const distance = Math.hypot(deltaX, deltaY);

          // Threshold for intentional 3-finger swipe gesture (30px displacement)
          if (distance >= 30) {
            hasSwiped = true;
            onToggleRef.current();
          }
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // In case of a rapid flick gesture where touchmove didn't trigger
      if (!hasSwiped && activeTouchCount >= 3 && e.changedTouches && e.changedTouches.length > 0) {
        const lastTouch = e.changedTouches[0];
        const distance = Math.hypot(lastTouch.clientX - startX, lastTouch.clientY - startY);
        if (distance >= 30) {
          hasSwiped = true;
          onToggleRef.current();
        }
      }

      if (e.touches.length === 0) {
        hasSwiped = false;
        activeTouchCount = 0;
      } else {
        activeTouchCount = e.touches.length;
      }
    };

    // Use non-passive listeners to cancel native pull-to-refresh and Chrome 3-finger gestures
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, []);
}
