/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComplaintFormData } from '../types';

/**
 * PRIVACY & SAFETY ARCHITECTURE:
 * 
 * In domestic abuse, stalking, and cyber-blackmail scenarios, perpetrators frequently
 * demand or gain physical access to the victim's device. 
 * Any state stored in `localStorage` persists indefinitely across browser restarts,
 * transforming complaint drafts, extortion amounts, and phone numbers into dangerous
 * evidence against the victim.
 * 
 * Therefore, NariSuraksha enforces:
 * 1. `sessionDraft`: Default storage engine (sessionStorage). Wiped automatically when the tab or app is closed.
 * 2. `persistentDraft`: Opt-in only storage engine (localStorage). Requires active confirmation by the user.
 */

const SESSION_PREFIX = 'suraksha_session_';
const PERSISTENT_PREFIX = 'suraksha_persistent_';

export const STORAGE_KEYS = {
  COMPLAINT_DRAFT: 'complaint_draft_v2',
  EVIDENCE_SUMMARY: 'evidence_summary_v1',
  EMERGENCY_CONTACTS: 'emergency_contacts_v1',
  IDLE_TIMEOUT_SEC: 'idle_timeout_sec',
  CUSTOM_STEALTH_KEY: 'custom_stealth_hotkey',
  DISGUISE_MANIFEST_OPT_IN: 'disguise_pwa_manifest_opt_in',
} as const;

/**
 * In-memory fallback if sessionStorage or localStorage are blocked (e.g., Strict Private Browsing).
 */
const memoryStore: Record<string, string> = {};

// Helper: safe wrapper around storage APIs
function getStorage(type: 'session' | 'local'): Storage | null {
  try {
    if (typeof window === 'undefined') return null;
    const s = type === 'session' ? window.sessionStorage : window.localStorage;
    // Test write
    const testKey = `__test_${type}__`;
    s.setItem(testKey, '1');
    s.removeItem(testKey);
    return s;
  } catch (e) {
    return null;
  }
}

/**
 * Session-Scoped Draft Engine (DEFAULT)
 * Automatically destroyed on tab closure.
 */
export const sessionDraft = {
  get<T>(key: string, defaultValue: T): T {
    try {
      const storage = getStorage('session');
      const val = storage ? storage.getItem(SESSION_PREFIX + key) : memoryStore[SESSION_PREFIX + key];
      if (val !== null && val !== undefined) {
        return JSON.parse(val) as T;
      }
    } catch (e) {
      console.warn(`[sessionDraft] Failed to read key: ${key}`, e);
    }
    return defaultValue;
  },

  set<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      const storage = getStorage('session');
      if (storage) {
        storage.setItem(SESSION_PREFIX + key, serialized);
      } else {
        memoryStore[SESSION_PREFIX + key] = serialized;
      }
    } catch (e) {
      console.warn(`[sessionDraft] Failed to write key: ${key}`, e);
    }
  },

  remove(key: string): void {
    try {
      const storage = getStorage('session');
      if (storage) storage.removeItem(SESSION_PREFIX + key);
      delete memoryStore[SESSION_PREFIX + key];
    } catch (e) {
      console.warn(`[sessionDraft] Failed to remove key: ${key}`, e);
    }
  },

  clearAll(): void {
    try {
      const storage = getStorage('session');
      if (storage) {
        const keysToRemove: string[] = [];
        for (let i = 0; i < storage.length; i++) {
          const k = storage.key(i);
          if (k && k.startsWith(SESSION_PREFIX)) {
            keysToRemove.push(k);
          }
        }
        keysToRemove.forEach((k) => storage.removeItem(k));
      }
      Object.keys(memoryStore).forEach((k) => {
        if (k.startsWith(SESSION_PREFIX)) delete memoryStore[k];
      });
    } catch (e) {
      console.warn('[sessionDraft] Failed to clear session drafts', e);
    }
  }
};

/**
 * Persistent Storage Engine (STRICT OPT-IN ONLY)
 * Survived across sessions. Used ONLY when user explicitly checks "Keep this draft for later".
 */
export const persistentDraft = {
  get<T>(key: string, defaultValue: T): T {
    try {
      const storage = getStorage('local');
      const val = storage ? storage.getItem(PERSISTENT_PREFIX + key) : null;
      if (val !== null && val !== undefined) {
        return JSON.parse(val) as T;
      }
    } catch (e) {
      console.warn(`[persistentDraft] Failed to read key: ${key}`, e);
    }
    return defaultValue;
  },

  set<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      const storage = getStorage('local');
      if (storage) {
        storage.setItem(PERSISTENT_PREFIX + key, serialized);
      }
    } catch (e) {
      console.warn(`[persistentDraft] Failed to write key: ${key}`, e);
    }
  },

  remove(key: string): void {
    try {
      const storage = getStorage('local');
      if (storage) storage.removeItem(PERSISTENT_PREFIX + key);
    } catch (e) {
      console.warn(`[persistentDraft] Failed to remove key: ${key}`, e);
    }
  },

  has(key: string): boolean {
    try {
      const storage = getStorage('local');
      return storage ? storage.getItem(PERSISTENT_PREFIX + key) !== null : false;
    } catch {
      return false;
    }
  },

  clearAll(): void {
    try {
      const storage = getStorage('local');
      if (storage) {
        const keysToRemove: string[] = [];
        for (let i = 0; i < storage.length; i++) {
          const k = storage.key(i);
          if (k && k.startsWith(PERSISTENT_PREFIX)) {
            keysToRemove.push(k);
          }
        }
        keysToRemove.forEach((k) => storage.removeItem(k));
      }
    } catch (e) {
      console.warn('[persistentDraft] Failed to clear persistent drafts', e);
    }
  }
};

/**
 * Unified Draft Accessor:
 * Reads from sessionStorage first; if not found, checks if user previously opted into persistent storage.
 */
export function loadComplaintDraft(defaultData: ComplaintFormData): {
  data: ComplaintFormData;
  isPersistedLocally: boolean;
} {
  // 1. Check session storage (default)
  const sessionVal = sessionDraft.get<ComplaintFormData | null>(STORAGE_KEYS.COMPLAINT_DRAFT, null);
  if (sessionVal) {
    const isPersisted = persistentDraft.has(STORAGE_KEYS.COMPLAINT_DRAFT);
    return { data: { ...defaultData, ...sessionVal }, isPersistedLocally: isPersisted };
  }

  // 2. Check persistent storage (only if user had previously opted in)
  const persistentVal = persistentDraft.get<ComplaintFormData | null>(STORAGE_KEYS.COMPLAINT_DRAFT, null);
  if (persistentVal) {
    // Mirror into session
    sessionDraft.set(STORAGE_KEYS.COMPLAINT_DRAFT, persistentVal);
    return { data: { ...defaultData, ...persistentVal }, isPersistedLocally: true };
  }

  return { data: defaultData, isPersistedLocally: false };
}

/**
 * Saves draft according to the user's explicit preference.
 * By default (`saveToPersistent = false`), only sessionStorage is touched.
 */
export function saveComplaintDraft(data: ComplaintFormData, saveToPersistent: boolean = false): void {
  // Always write to session
  sessionDraft.set(STORAGE_KEYS.COMPLAINT_DRAFT, data);

  if (saveToPersistent) {
    persistentDraft.set(STORAGE_KEYS.COMPLAINT_DRAFT, data);
  } else {
    // If the user unchecks the toggle, purge from persistent storage immediately
    persistentDraft.remove(STORAGE_KEYS.COMPLAINT_DRAFT);
  }
}

/**
 * Emergency Footprint Purge
 * Erases ALL session and persistent artifacts across all keys.
 */
export function purgeAllLocalFootprint(): void {
  sessionDraft.clearAll();
  persistentDraft.clearAll();

  // Also clean any legacy keys
  try {
    if (typeof window !== 'undefined') {
      window.sessionStorage.clear();
      const legacyKeys = [
        'suraksha_sync_metadata_v1',
        'suraksha_complaint_form_v1',
        'suraksha_evidence_checklist_v1',
        'suraksha_emergency_contacts_v1',
      ];
      legacyKeys.forEach((k) => window.localStorage.removeItem(k));
    }
  } catch (e) {
    console.warn('Error during full footprint purge', e);
  }
}
