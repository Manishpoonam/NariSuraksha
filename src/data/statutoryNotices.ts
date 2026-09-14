/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { STATUTE_REGISTRY } from './statuteCitations';

export interface IntermediaryNoticeParams {
  platformName: string;
  recipientEmail?: string;
  targetIdentifier?: string; // e.g. Phone number, username, URL
  incidentType?: string;
  victimAlias?: string;
  dateStr?: string;
  urgencyTimelineHours?: number;
}

/**
 * Generates the unified, legally verified 24-Hour Statutory Takedown Notice.
 * 
 * Shared between:
 * 1. PlatformTakedownPortal.tsx (Single-platform quick notices)
 * 2. ComplaintDraftGenerator.tsx (Full e-FIR / Intermediary Dossier generator)
 * 
 * Statutory References:
 * - Rule 3(2)(b), Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021
 * - Section 79(1) & Section 79(3)(b), Information Technology Act, 2000 (Forfeiture of Safe Harbour)
 * - Section 67A, Information Technology Act, 2000 (Sexually Explicit Electronic Content)
 * - Section 94, Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS) [formerly Section 91 CrPC] (Preservation of Server Records)
 * - Section 63, Bharatiya Sakshya Adhiniyam, 2023 (BSA) (Electronic Records Admissibility)
 */
export function generateIntermediaryStatutoryNotice(params: IntermediaryNoticeParams): {
  subject: string;
  body: string;
} {
  const {
    platformName,
    recipientEmail,
    targetIdentifier = '[Insert URL, Offender Username, or Phone Number]',
    incidentType = 'Circulation / threat of non-consensual intimate imagery or morphed media',
    victimAlias = 'Confidential Complainant (Identity Protected under Section 73 BNS)',
    dateStr = new Date().toLocaleDateString('en-IN'),
    urgencyTimelineHours = 24,
  } = params;

  const subject = `URGENT STATUTORY NOTICE: Mandatory ${urgencyTimelineHours}-Hour Takedown under Rule 3(2)(b) IT Rules, 2021 — ${platformName}`;

  const body = `FORMAL STATUTORY NOTICE UNDER RULE 3(2)(b) OF THE INFORMATION TECHNOLOGY (INTERMEDIARY GUIDELINES AND DIGITAL MEDIA ETHICS CODE) RULES, 2021

TO:
GRIEVANCE OFFICER / LEGAL ENFORCEMENT TEAM
${platformName.toUpperCase()}
${recipientEmail ? `(${recipientEmail})` : ''}

SUBJECT: Urgent Demand for Immediate Disabling / Permanent Removal of Non-Consensual Intimate Material within ${urgencyTimelineHours} Hours.

Respected Grievance Officer,

I am writing to serve this formal statutory notice under Rule 3(2)(b) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, regarding illicit material hosted on or transmitted via your platform.

1. TARGET IDENTIFIER / OFFENDING MATERIAL:
${targetIdentifier}

2. NATURE OF VIOLATION:
${incidentType}
The material depicts or threatens the dissemination of non-consensual intimate imagery / deepfake manipulation violating bodily privacy.

3. STATUTORY MANDATE & TIMELINE:
Under Rule 3(2)(b) of the Information Technology Rules, 2021, an intermediary is legally mandated to take all reasonable and practicable measures to remove or disable access to such content within twenty-four (24) hours of receipt of notice.

4. LEGAL CONSEQUENCES OF NON-COMPLIANCE:
Failure to disable access within the statutory 24-hour window:
a) Operates as a forfeiture of Safe Harbour protection under Section 79(1) of the Information Technology Act, 2000, in accordance with Section 79(3)(b);
b) Attracts joint liability under Section 67A of the Information Technology Act, 2000 (publishing sexually explicit electronic content, punishable by up to 5 years imprisonment and ₹10 Lakh fine).

5. PRESERVATION OF LOGS & TELEMETRY:
In terms of Section 94 of the Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS, formerly Section 91 CrPC) and Section 63 of the Bharatiya Sakshya Adhiniyam, 2023 (BSA), you are formally requested to preserve all associated server logs, IP addresses, registration records, and message/media telemetry for law enforcement investigation.

Complainant Identifier: ${victimAlias}
Date: ${dateStr}
Attached: Evidentiary screenshots and verification hashes.`;

  return { subject, body };
}

/**
 * Pre-configured canonical notices for each major platform intermediary.
 * Synchronized with STATUTE_REGISTRY in statuteCitations.ts.
 */
export const PLATFORM_CANONICAL_NOTICES: Record<string, { subject: string; body: string }> = {
  whatsapp: generateIntermediaryStatutoryNotice({
    platformName: 'WhatsApp India (Meta Platforms Inc.)',
    recipientEmail: '[Submit via WhatsApp Settings > Help > Contact Us or support@whatsapp.com]',
    targetIdentifier: 'Perpetrator Phone Number: [Insert Offender Number with +91]\nOffender Display Name: [Insert Name / Group Link]',
    incidentType: 'Circulation and extortion threat involving non-consensual intimate imagery on WhatsApp.',
  }),
  instagram: generateIntermediaryStatutoryNotice({
    platformName: 'Instagram & Facebook (Meta Platforms Inc.)',
    recipientEmail: '[Submit via Meta Intimate Image Portal or FBGOIndia@fb.com]',
    targetIdentifier: 'Offending Profile / Post URL: [Insert Instagram Profile or Post Link]\nPerpetrator Username: @[Insert Username]',
    incidentType: 'Non-consensual intimate imagery and harassment hosted on Instagram/Meta platforms.',
  }),
  telegram: generateIntermediaryStatutoryNotice({
    platformName: 'Telegram FZ-LLC (Abuse & Enforcement)',
    recipientEmail: 'abuse@telegram.org, stopCA@telegram.org',
    targetIdentifier: 'Channel / Bot / Message Link: [Insert t.me link]\nBot Username: @[Insert bot handle if AI deepfake tool]',
    incidentType: 'Unauthorized transmission of non-consensual explicit material and deepfake bot operations.',
  }),
  google: generateIntermediaryStatutoryNotice({
    platformName: 'Google LLC (Search & Image De-Indexing)',
    targetIdentifier: 'Offending Webpage URLs: [Insert URLs]\nGoogle Search Query / Image URLs: [Insert Search Terms and Image Links]',
    incidentType: 'Non-consensual explicit personal media appearing in global Google Search and Image results.',
  }),
  adult: generateIntermediaryStatutoryNotice({
    platformName: 'Upstream Web Host / Cloudflare Abuse Enforcement',
    targetIdentifier: 'Target Domain & URL: [Insert pirate site URL]\nCloudflare Ticket / Abuse Identifier: [Submit via abuse.cloudflare.com]',
    incidentType: 'Non-consensual adult media hosted in violation of IT Act Section 67A and international safe harbor regulations.',
  }),
  twitter: generateIntermediaryStatutoryNotice({
    platformName: 'X Corp. (Twitter Grievance Redressal)',
    recipientEmail: '[Submit via X Online Grievance Form at help.x.com/forms]',
    targetIdentifier: 'Offending Tweet / Post URL: [Insert X/Tweet Link]\nAuthor Handle: @[Insert X Handle]',
    incidentType: 'Non-consensual intimate media published on X in violation of Rule 3(2)(b) and X Safety Policy.',
  }),
};
