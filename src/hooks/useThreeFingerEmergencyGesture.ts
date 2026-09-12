/**
 * 3-Finger Emergency Camouflage Gesture Hook
 * 
 * In Chrome/Android, three-finger downward swipe triggers reload or history gesture.
 * This hook captures multi-touch events non-passively:
 * 1. Cancels native browser swipe gestures / pull-to-refresh on 3 fingers
 * 2. Fires haptic vibration pulse on touchdown
 * 3. Switches instantly to UPSC Study Camouflage mode
 */
import { useEffect } from 'react';
import { hapticCamouflage } from '../utils/haptics';

export function useThreeFingerEmergencyGesture(onCamouflage: () => void) {
  useEffect(() => {
    let triggered = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length >= 3) {
        // Prevent default browser gestures (e.g. Chrome 3-finger reload/history)
        if (e.cancelable) {
          e.preventDefault();
        }
        triggered = true;
        // Physical haptic acknowledgement
        hapticCamouflage(true);
        onCamouflage();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length >= 3) {
        // Intercept movement so browser pull-to-refresh cannot take over
        if (e.cancelable) {
          e.preventDefault();
        }
        if (!triggered) {
          triggered = true;
          hapticCamouflage(true);
          onCamouflage();
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length === 0) {
        triggered = false;
      }
    };

    // Use non-passive listeners to cancel native pull-to-refresh
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
  }, [onCamouflage]);
}
