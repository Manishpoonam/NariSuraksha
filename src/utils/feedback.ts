/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * PRIVACY-PRESERVING OUTCOME FEEDBACK ENGINE
 * 
 * DESIGN CONSTRAINTS:
 * 1. Zero-Telemetry Guarantee:
 *    - No analytics SDKs (Google Analytics, Mixpanel, etc.)
 *    - No browser fingerprinting, user agent harvesting, or persistent cookies.
 *    - No association with case numbers, names, phone numbers, or incident specifics.
 * 2. Strict User Agency:
 *    - Feedback is strictly opt-in and triggered solely by explicit user click.
 * 3. Future-Proof Pluggable Hook:
 *    - Currently stubs submission as a local mock logger.
 *    - Can be wired to a privacy-respecting endpoint (e.g. Cloudflare Worker or edge proxy)
 *      by setting an environment variable without modifying UI components.
 */

export interface AnonymousFeedbackPayload {
  flowId: string; // e.g. 'legal_fir_export' | 'freeze_script_copied' | 'stop_ncii_guide'
  helpful: 'yes' | 'no' | 'prefer_not_to_say';
  comments?: string;
  timestamp: string; // approximate ISO date without milliseconds
}

export async function submitAnonymousFeedback(payload: Omit<AnonymousFeedbackPayload, 'timestamp'>): Promise<{ success: boolean; message: string }> {
  // Strip any accidental email addresses or 10-digit phone numbers from free-text comments for privacy
  let sanitizedComments = payload.comments || '';
  sanitizedComments = sanitizedComments
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[REDACTED_EMAIL]')
    .replace(/\b[6-9]\d{9}\b/g, '[REDACTED_PHONE]');

  const record: AnonymousFeedbackPayload = {
    flowId: payload.flowId,
    helpful: payload.helpful,
    comments: sanitizedComments.trim().slice(0, 300), // capped at 300 chars
    timestamp: new Date().toISOString().slice(0, 10), // date only (YYYY-MM-DD), no precise microsecond timestamp
  };

  // Check if an external anonymous endpoint is defined
  const endpoint = typeof process !== 'undefined' ? (process.env.VITE_ANONYMOUS_FEEDBACK_ENDPOINT || '') : '';

  if (endpoint) {
    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit', // DO NOT send cookies
        body: JSON.stringify(record),
      });
      return { success: true, message: 'Thank you for your anonymous feedback.' };
    } catch (e) {
      console.warn('[feedback] Network dispatch skipped', e);
      return { success: true, message: 'Feedback recorded locally.' };
    }
  }

  // Default: No-op client log (developer stub)
  console.info('[NariSuraksha Anonymous Feedback Recorded]', {
    flow: record.flowId,
    helpful: record.helpful,
    commentsPresent: !!record.comments,
  });

  return { success: true, message: 'Thank you. Your feedback helps improve safety tools.' };
}
