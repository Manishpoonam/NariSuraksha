/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OFFENSE_STATUTE_MAPPINGS } from './statuteCitations';

/**
 * CANONICAL EXTORTION & BLACKMAIL TACTICAL RESPONSE FRAMEWORK
 * 
 * Single source of truth for communication scripts and tactical guidance
 * during active countdown threats, blackmail, and video extortion.
 * 
 * Reconciles and unifies guidance between:
 * 1. Crisis Emergency Cockpit (EmergencyCockpit.tsx)
 * 2. Legal Rights FAQ (legalGuideData.ts)
 * 3. Communication Scripts Portal (CommunicationScripts.tsx)
 * 4. Countdown Buster Banner (CountdownBusterBanner.tsx)
 * 
 * SEQUENCED STRATEGY:
 * - Phase 1 (Tactical Delay): If facing an active countdown and breathing room
 *   is needed to capture uncropped screenshots, UPI handles, and submit StopNCII hashes
 *   without triggering an immediate panic leak, use the calm stalling line.
 *   Rights-based rule: You have the legal right to withhold payment — paying ₹1 never guarantees deletion.
 * 
 * - Phase 2 (Statutory Freeze & Sever Contact): Once evidence is preserved and cryptographic
 *   fingerprints are submitted, send the formal statutory freeze notice citing BNS 308 (Extortion),
 *   BNS 351 (Criminal Intimidation), and IT Act 66E/67A. Then turn off read receipts and immediately block.
 */

export interface TacticalScript {
  id: string;
  stepNumber: number;
  label: { en: string; hi: string };
  title: { en: string; hi: string };
  purpose: { en: string; hi: string };
  text: { en: string; hi: string };
  tacticalNote: { en: string; hi: string };
}

export const EXTORTION_SEQUENCED_GUIDANCE = {
  overview: {
    en: 'Two-Step Tactical Sequence: (1) If facing a strict countdown deadline, send the calm stalling message to buy breathing room while you capture uncropped screenshots and submit StopNCII hashes. (2) Once evidence is documented, send the formal statutory freeze notice citing BNS 308 & IT Act 67A, and immediately block.',
    hi: 'दो-चरणीय रणनीति: (1) यदि ब्लैकमेलर समय सीमा (काउंटडाउन) दे रहा है, तो बिना घबराए शांत स्टालिंग संदेश भेजें ताकि आप बिना उत्तेजित किए सबूत सुरक्षित कर सकें और StopNCII पर हैश बना सकें। (2) सबूत सुरक्षित होते ही BNS 308 व IT Act 67A का वैधानिक फ्रीज नोटिस भेजें और तुरंत ब्लॉक करें।'
  },
  rightsNotice: {
    en: 'You have the legal right to withhold payment. In documented cyber crime records, extortionists do not delete media after receiving payment; paying marks the victim for immediate recurring demands.',
    hi: 'आपको भुगतान रोकने का पूरा कानूनी अधिकार है। पुलिस रिकॉर्ड के अनुसार, पैसे देने पर अपराधी कभी फोटो नष्ट नहीं करते बल्कि दोबारा बड़ी रकम मांगते हैं।'
  }
};

export const EXTORTION_RESPONSE_SCRIPTS: {
  phase1Stall: TacticalScript;
  phase2Freeze: TacticalScript;
  knownContactDeescalate: TacticalScript;
} = {
  // Phase 1: Calm Delay / Stall
  phase1Stall: {
    id: 'phase1_calm_stall',
    stepNumber: 1,
    label: {
      en: 'Step 1: Buy Breathing Room (If Countdown Active)',
      hi: 'कदम 1: समय हासिल करें (यदि डेडलाइन दी गई हो)'
    },
    title: {
      en: 'Calm Stalling Script (Buys 2–4 Hours to Secure Proof)',
      hi: 'शांत स्टालिंग संदेश (सबूत सुरक्षित करने हेतु 2-4 घंटे का समय)'
    },
    purpose: {
      en: 'Neutralizes immediate countdown panic without provoking an impulsive leak, giving you time to document chat evidence and hash images on StopNCII.',
      hi: 'ब्लैकमेलर को उत्तेजित किए बिना तुरंत समय प्राप्त करता है ताकि आप साक्ष्य जुटा सकें और StopNCII पर हैश बना सकें।'
    },
    text: {
      en: 'I am trying to arrange the money from my bank. The banking server is slow right now. Please give me 3 to 4 hours to arrange this. Please do not do anything in haste.',
      hi: 'मैं बैंक से पैसों की व्यवस्था करने की कोशिश कर रही हूँ। अभी बैंक का सर्वर धीमा चल रहा है। कृपया मुझे 3-4 घंटे का समय दें। जल्दबाजी में कुछ मत करें।'
    },
    tacticalNote: {
      en: 'Send this once only if a ticking timer is being used against you. Do not negotiate amounts. Withhold all payment while you screenshot uncropped proof.',
      hi: 'इसे केवल तब भेजें जब वह तुरंत पैसे की समय सीमा दे रहा हो। रकम पर कोई बातचीत न करें। पैसे बिल्कुल न भेजें और इस दौरान सबूतों के स्क्रीनशॉट लें।'
    }
  },

  // Phase 2: Formal Statutory Freeze Notice
  phase2Freeze: {
    id: 'phase2_statutory_freeze',
    stepNumber: 2,
    label: {
      en: 'Step 2: Formal Notice (Send Once, Then Block)',
      hi: 'कदम 2: वैधानिक नोटिस (एक बार भेजें, फिर ब्लॉक करें)'
    },
    title: {
      en: 'Statutory Legal Freeze Notice (BNS 308 & IT Act 66E/67A)',
      hi: 'वैधानिक फ्रीज नोटिस (BNS धारा 308 व IT Act 66E/67A)'
    },
    purpose: {
      en: 'Puts the offender on legal notice that all identifiers are formally preserved and reported to law enforcement. Ceases negotiation.',
      hi: 'अपराधी को वैधानिक चेतावनी देता है कि उसका नंबर, UPI और चैट पुलिस रिकॉर्ड में दर्ज हो चुके हैं और आगे बातचीत बंद है।'
    },
    text: {
      en: `This incident, your phone number, UPI handle, and chat records have been formally logged with the National Cyber Crime Reporting Portal (Helpline 1930 / cybercrime.gov.in).

Under the Information Technology Act (Sections 66E and 67A) and Bharatiya Nyaya Sanhita (Section 308 - Extortion, and Section 351 - Criminal Intimidation), transmitting or threatening to publish intimate media is a cognizable, non-bailable criminal offense. All evidence has been digitally documented and preserved for law enforcement investigation. Cease all contact and delete all media immediately.`,
      hi: `मैंने इस बातचीत और आपके मोबाइल नंबर/UPI की आधिकारिक शिकायत राष्ट्रीय साइबर अपराध पोर्टल (cybercrime.gov.in / हेल्पलाइन 1930) पर दर्ज करा दी है।

सूचना प्रौद्योगिकी अधिनियम (धारा 66E व 67A) एवं भारतीय न्याय संहिता (धारा 308 - जबरन वसूली व धारा 351 - आपराधिक धमकी) के तहत किसी की निजी तस्वीरें प्रसारित करना या धमकी देना संज्ञेय गैर-जमानती अपराध है। सभी चैट स्क्रीनशॉट, टाइमस्टैम्प और आपका नंबर पुलिस जांच हेतु सुरक्षित कर लिए गए हैं। तुरंत संपर्क बंद करें और सभी सामग्री नष्ट करें।`
    },
    tacticalNote: {
      en: 'Send this once after evidence is screenshotted. Turn off read receipts, do not pick up calls or engage in arguments, and block the perpetrator immediately.',
      hi: 'सबूत सुरक्षित होने के बाद यह नोटिस एक बार भेजें। इसके बाद किसी कॉल का उत्तर न दें, कोई बहस न करें और नंबर को तुरंत ब्लॉक कर दें।'
    }
  },

  // Known Contact Alternative
  knownContactDeescalate: {
    id: 'known_contact_deescalate',
    stepNumber: 1,
    label: {
      en: 'Alternative: Known Individual / Ex-Partner Delay',
      hi: 'विकल्प: परिचित व्यक्ति / एक्स-पार्टनर हेतु शांत संदेश'
    },
    title: {
      en: 'Neutral De-escalation Delay (Buys Until Next Morning)',
      hi: 'तटस्थ समय-वृद्धि संदेश (अगली सुबह तक का समय)'
    },
    purpose: {
      en: 'Low-confrontation delay line for known persons to allow survivor time to confide in family, consult Women Helpline (1091), or hash media.',
      hi: 'परिचित व्यक्ति के साथ टकराव टालने वाला संदेश ताकि आपको महिला हेल्पलाइन 1091 या भरोसेमंद व्यक्ति से मदद लेने का समय मिल सके।'
    },
    text: {
      en: 'I am currently trying to arrange the matter and need until tomorrow morning. My banking access is not available right now. Please do not do anything in haste. I will message you tomorrow morning once ready.',
      hi: 'मुझे व्यवस्था करने के लिए कल सुबह तक का समय चाहिए। अभी मेरे पास बैंकिंग का एक्सेस नहीं है। कृपया जल्दबाजी में कुछ मत करना। मैं कल सुबह बात करती हूं।'
    },
    tacticalNote: {
      en: 'Prevents immediate escalation while you contact Women Helpline 1091 or lodge a confidential complaint on cybercrime.gov.in.',
      hi: 'यह तात्कालिक तनाव को कम करता है ताकि आप महिला हेल्पलाइन 1091 या 1930 पर संपर्क कर सकें।'
    }
  }
};
