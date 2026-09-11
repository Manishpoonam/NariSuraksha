/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * HUMAN-IN-THE-LOOP REFERRAL PARTNERS CONFIGURATION
 * 
 * WHY THIS MATTERS:
 * Automated legal generators and self-serve checklists provide immediate tactical
 * de-escalation, but high-risk extortion cases (physical stalking, threats of violence,
 * corrupt local actors) require real, vetted human caseworkers, forensic analysts,
 * and high-court legal advocates.
 * 
 * This file allows updating and expanding vetted referral partners dynamically
 * without refactoring UI components.
 */

export interface ReferralPartner {
  id: string;
  name: { en: string; hi: string };
  category: 'cyber_forensics' | 'legal_aid' | 'crisis_counseling' | 'survivor_support';
  organizationType: 'NGO' | 'Legal Aid Society' | 'Academic Support Centre' | 'Govt Statutory Body';
  description: { en: string; hi: string };
  badge: { en: string; hi: string };
  bestFor: { en: string; hi: string };
  contactMethod: {
    type: 'phone' | 'email' | 'form' | 'helpline';
    value: string;
    displayLabel: string;
    actionUri: string;
  };
  secondaryContact?: {
    type: 'website' | 'email';
    value: string;
    actionUri: string;
  };
  operatingHours: string;
  feeStructure: '100% Free' | 'Pro Bono' | 'Subsidized';
}

export const REFERRAL_PARTNERS: ReferralPartner[] = [
  {
    id: 'cyber_peace_foundation',
    name: {
      en: 'Cyber Peace Foundation (CyberPeace Corps)',
      hi: 'साइबर पीस फाउंडेशन (CyberPeace Corps)'
    },
    category: 'cyber_forensics',
    organizationType: 'NGO',
    description: {
      en: 'India’s leading non-profit cyber defense organisation. Provides technical assistance in tracing fake profiles, digital footprint preservation, and platform escalation.',
      hi: 'भारत की प्रमुख गैर-लाभकारी साइबर सुरक्षा संस्था। फर्जी प्रोफाइल ट्रेस करने और डिजिटल साक्ष्य सुरक्षित रखने में तकनीकी सहायता।'
    },
    badge: { en: 'Technical & Escalation', hi: 'तकनीकी सहायता' },
    bestFor: {
      en: 'Tracing extortionists, device security review, and platform escalation when reporting fails.',
      hi: 'ब्लैकमेलर्स की प्रोफाइल जांच और तकनीकी साक्ष्य जुटाने के लिए।'
    },
    contactMethod: {
      type: 'phone',
      value: '+91 9570000066',
      displayLabel: 'CyberPeace Helpline (+91 9570000066)',
      actionUri: 'tel:+919570000066'
    },
    secondaryContact: {
      type: 'website',
      value: 'https://www.cyberpeace.org',
      actionUri: 'https://www.cyberpeace.org'
    },
    operatingHours: 'Mon - Sat (10:00 AM - 6:00 PM IST)',
    feeStructure: '100% Free'
  },
  {
    id: 'icall_tiss',
    name: {
      en: 'iCALL Psychosocial Helpline (TISS Mumbai)',
      hi: 'iCALL हेल्पलाइन (टाटा इंस्टीट्यूट ऑफ सोशल साइंसेज - TISS)'
    },
    category: 'crisis_counseling',
    organizationType: 'Academic Support Centre',
    description: {
      en: 'Free, confidential psychosocial counseling run by professional mental health counselors at Tata Institute of Social Sciences. Trauma-informed and non-judgmental.',
      hi: 'टाटा इंस्टीट्यूट ऑफ सोशल साइंसेज द्वारा संचालित 100% निःशुल्क और गोपनीय मनोवैज्ञानिक परामर्श सेवा।'
    },
    badge: { en: 'Trauma & Panic Counseling', hi: 'मानसिक सहारा' },
    bestFor: {
      en: 'Overcoming acute panic, shame, self-blame, and navigating conversations with family or partners.',
      hi: 'अत्यधिक घबराहट, अपराधबोध और परिवार से बात करने के तनाव को कम करने हेतु।'
    },
    contactMethod: {
      type: 'phone',
      value: '9152987821',
      displayLabel: 'iCALL Helpline (9152987821)',
      actionUri: 'tel:9152987821'
    },
    secondaryContact: {
      type: 'email',
      value: 'icall@tiss.edu',
      actionUri: 'mailto:icall@tiss.edu'
    },
    operatingHours: 'Mon - Sat (10:00 AM - 8:00 PM IST)',
    feeStructure: '100% Free'
  },
  {
    id: 'sneha_crisis_centre',
    name: {
      en: 'SNEHA (Crisis Intervention for Women)',
      hi: 'स्नेहा (SNEHA - संकटकालीन महिला सहायता)'
    },
    category: 'survivor_support',
    organizationType: 'NGO',
    description: {
      en: 'Dedicated crisis intervention for women facing gender-based violence, intimate partner extortion, and cyber harassment. Offers social caseworkers.',
      hi: 'घरेलू हिंसा, साथी द्वारा ब्लैकमेलिंग और साइबर उत्पीड़न से जूझ रही महिलाओं के लिए समर्पित परामर्श केंद्र।'
    },
    badge: { en: 'Caseworker Support', hi: 'केसवर्कर सहायता' },
    bestFor: {
      en: 'Intimate partner violence, ex-partner blackmail, and needing physical accompaniment or shelter safety.',
      hi: 'पूर्व-साथी द्वारा ब्लैकमेलिंग और व्यक्तिगत सुरक्षा मार्गदर्शन।'
    },
    contactMethod: {
      type: 'phone',
      value: '9833052684',
      displayLabel: 'SNEHA Crisis Line (9833052684 / 9167535765)',
      actionUri: 'tel:9833052684'
    },
    secondaryContact: {
      type: 'website',
      value: 'https://snehamumbai.org',
      actionUri: 'https://snehamumbai.org'
    },
    operatingHours: '24/7 Crisis Hotline',
    feeStructure: '100% Free'
  },
  {
    id: 'nalsa_free_legal_aid',
    name: {
      en: 'NALSA & State Legal Services Authority',
      hi: 'नालसा (NALSA) - राष्ट्रीय विधिक सेवा प्राधिकरण'
    },
    category: 'legal_aid',
    organizationType: 'Govt Statutory Body',
    description: {
      en: 'Statutory government legal authority providing free court-appointed advocates to women under Section 12 of the Legal Services Authorities Act.',
      hi: 'भारतीय संविधान के अनुच्छेद 39A के तहत महिलाओं को अदालत में 100% निःशुल्क सरकारी वकील उपलब्ध कराने वाली संस्था।'
    },
    badge: { en: 'Free Court Lawyers', hi: 'मुफ्त अदालती वकील' },
    bestFor: {
      en: 'Filing Section 156(3) magistrate applications when local police refuse FIR, or court-issued search warrants.',
      hi: 'यदि पुलिस FIR दर्ज करने से मना करे, तो अदालत से सीधे आदेश दिलवाने हेतु।'
    },
    contactMethod: {
      type: 'phone',
      value: '15100',
      displayLabel: 'NALSA Toll-Free National Legal Helpline (15100)',
      actionUri: 'tel:15100'
    },
    secondaryContact: {
      type: 'website',
      value: 'https://nalsa.gov.in',
      actionUri: 'https://nalsa.gov.in'
    },
    operatingHours: '24/7 Toll-Free',
    feeStructure: '100% Free'
  }
];
