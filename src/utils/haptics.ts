/**
 * Haptic Feedback Utility (Web Vibration API)
 * Provides physical tactile feedback for critical emergency actions:
 * - SOS Distress Trigger & Dispatch
 * - Panic & Urgent Warning acknowledgement
 * - Quick Camouflage Screen Concealment & Resume
 * - Local Footprint Purge
 * 
 * Safely guards against unsupported environments or permission blocks.
 */

export const HAPTIC_STORAGE_KEY = 'suraksha_haptics_opt_in_v1';

export const isHapticSupported = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    'navigator' in window &&
    typeof window.navigator.vibrate === 'function'
  );
};

/**
 * Audit Requirement: Haptics must be opt-in only.
 * Defaults to FALSE (disabled) unless explicitly enabled by user preference.
 */
export const isHapticEnabled = (): boolean => {
  try {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(HAPTIC_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

export const setHapticEnabled = (enabled: boolean): void => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(HAPTIC_STORAGE_KEY, enabled ? 'true' : 'false');
  } catch {
    // Fail silently in restricted storage environments
  }
};

export const triggerVibration = (pattern: number | number[]): boolean => {
  // Guard 1: Must be explicitly enabled by user (default OFF)
  if (!isHapticEnabled()) {
    return false;
  }

  // Guard 2: Must be supported by browser/device hardware
  try {
    if (isHapticSupported()) {
      return window.navigator.vibrate(pattern);
    }
  } catch (err) {
    // Non-blocking: fail gracefully without disrupting UI
    console.debug('Haptic feedback unavailable or blocked', err);
  }
  return false;
};

/**
 * High-urgency SOS pulse pattern: [short, gap, short, gap, long, gap, long]
 * Gives unmistakable physical confirmation when tapping SOS.
 */
export const hapticSOS = (): boolean => {
  return triggerVibration([100, 60, 100, 60, 220, 80, 220]);
};

/**
 * SOS Dispatch vibration (when firing WhatsApp, SMS, or Location distress)
 */
export const hapticSOSDispatch = (): boolean => {
  return triggerVibration([140, 70, 140, 70, 280]);
};

/**
 * Discreet, stealthy double-tap confirmation when engaging or resuming Camouflage
 */
export const hapticCamouflage = (entering: boolean = true): boolean => {
  return triggerVibration(entering ? [50, 40, 50] : [40]);
};

/**
 * Sharp alert vibration when accessing panic guides or high-urgency warnings
 */
export const hapticPanic = (): boolean => {
  return triggerVibration([80, 50, 80]);
};

/**
 * Heavy, definitive vibration when wiping all local traces from shared phones
 */
export const hapticPurge = (): boolean => {
  return triggerVibration([120, 60, 120, 60, 150]);
};

/**
 * Crisp single tap feedback for copied evidence, hotlines, or critical buttons
 */
export const hapticAction = (): boolean => {
  return triggerVibration(40);
};

/**
 * Light confirmation pulse for successful actions
 */
export const hapticSuccess = (): boolean => {
  return triggerVibration([45, 30, 45]);
};
