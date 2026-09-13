/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * CANONICAL LEGAL & NON-AFFILIATION DISCLAIMER
 * 
 * Single source of truth for the legal, non-commercial, and non-affiliation disclaimer.
 * All screens (Landing Grounding Screen, Crisis Rescue Screen, Legal Rights Panel,
 * and Application Footers) import from this file.
 * 
 * The canonical full copy is permanently housed in the "About This Service & Privacy Guarantee" panel
 * at #about-trust-section.
 */

export interface DisclaimerCopy {
  full: {
    en: string;
    hi: string;
  };
  short: {
    en: string;
    hi: string;
  };
  linkText: {
    en: string;
    hi: string;
  };
  combinedShort: {
    en: string;
    hi: string;
  };
  anchorId: string;
}

export const LEGAL_DISCLAIMER: DisclaimerCopy = {
  full: {
    en: 'NariSuraksha is an independent, non-commercial tool and is not affiliated with the Government of India, the National Commission for Women, or any police authority. Information provided is general in nature and not a substitute for professional legal advice.',
    hi: 'नारीसुरक्षा एक स्वतंत्र, गैर-व्यावसायिक साधन है और भारत सरकार, राष्ट्रीय महिला आयोग (NCW) या किसी पुलिस प्राधिकरण से संबद्ध नहीं है। दी गई जानकारी सामान्य जागरूकता के लिए है, पेशेवर कानूनी सलाह का विकल्प नहीं।'
  },
  short: {
    en: 'Independent, not government-affiliated',
    hi: 'स्वतंत्र साधन, सरकार या पुलिस से संबद्ध नहीं'
  },
  linkText: {
    en: 'full disclaimer',
    hi: 'पूर्ण अस्वीकरण'
  },
  combinedShort: {
    en: 'Independent, not government-affiliated — full disclaimer',
    hi: 'स्वतंत्र साधन, सरकार या पुलिस से संबद्ध नहीं — पूर्ण अस्वीकरण'
  },
  anchorId: 'about-trust-section'
};
