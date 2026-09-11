/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * STATUTORY REFERENCE & AUDIT TRACKER
 * 
 * In July 2024, the Government of India enacted the Bharatiya Nyaya Sanhita (BNS),
 * the Bharatiya Nagarik Suraksha Sanhita (BNSS), and the Bharatiya Sakshya Adhiniyam (BSA),
 * replacing the legacy Indian Penal Code (IPC), CrPC, and Evidence Act.
 * 
 * IMPORTANT LEGAL NOTICE:
 * All statutory citations and section mappings in this platform are indexed directly
 * from official Gazette notifications for informational structuring purposes.
 * They do not constitute formal legal counsel. Complainants should obtain formal
 * review from a licensed cyber-law practitioner or State Legal Services Authority (NALSA 15100).
 */

export interface StatuteAuditRecord {
  statuteCode: string; // e.g. "BNS_308" or "IT_ACT_67A"
  section: string;
  actTitle: string;
  replacedLegacySection?: string;
  summaryTitle: { en: string; hi: string };
  lastUpdatedDate: string; // ISO format: YYYY-MM-DD
  statutorySource: string;
  verificationStatus: 'GAZETTE_INDEXED' | 'AWAITING_EXTERNAL_SIGNOFF' | 'PRACTITIONER_VERIFIED';
  proceduralNote: { en: string; hi: string };
}

export interface TemplateAuditRecord {
  templateId: 'fir_police' | 'intermediary_notice' | 'ncw_petition' | 'pocso_notice';
  title: string;
  lastUpdatedDate: string;
  statutoryBasis: string[];
  status: 'INFORMATIONAL_DRAFT' | 'AWAITING_PRACTITIONER_SIGNOFF';
}

export const LEGAL_FRAMEWORK_AUDIT: {
  systemVersion: string;
  lastUpdatedDate: string;
  complianceNotice: string;
  statutes: Record<string, StatuteAuditRecord>;
  templates: Record<string, TemplateAuditRecord>;
} = {
  systemVersion: '2.4.0-BNS-2024',
  lastUpdatedDate: '2026-09-11',
  complianceNotice: 'Indexed directly from official Gazette notifications for BNS 2023, BNSS 2023, BSA 2023, and IT Act 2000. Template drafts are provided for law enforcement reporting assistance, not formal legal representation.',

  statutes: {
    'BNS_73': {
      statuteCode: 'BNS_73',
      section: 'Section 73',
      actTitle: 'Bharatiya Nyaya Sanhita, 2023',
      replacedLegacySection: 'Section 228A, Indian Penal Code (IPC)',
      summaryTitle: {
        en: 'Prohibition on Disclosing Victim Identity',
        hi: 'पीड़िता की पहचान उजागर करने पर कानूनी प्रतिबंध'
      },
      lastUpdatedDate: '2026-09-11',
      statutorySource: 'Gazette of India, Act No. 45 of 2023',
      verificationStatus: 'GAZETTE_INDEXED',
      proceduralNote: {
        en: 'Prohibits publishing or making known the name or any matter which may disclose the identity of victims of certain offenses under Section 64–71 BNS. Punishable with imprisonment up to 2 years and fine.',
        hi: 'विशिष्ट यौन अपराधों की पीड़िता की पहचान या नाम सार्वजनिक करने पर 2 वर्ष तक का कारावास व जुर्माना।'
      }
    },
    'BNS_308': {
      statuteCode: 'BNS_308',
      section: 'Section 308',
      actTitle: 'Bharatiya Nyaya Sanhita, 2023',
      replacedLegacySection: 'Section 383/384, Indian Penal Code (IPC)',
      summaryTitle: {
        en: 'Extortion & Criminal Demands',
        hi: 'जबरन वसूली (एक्सटोर्शन)'
      },
      lastUpdatedDate: '2026-09-11',
      statutorySource: 'Gazette of India, Act No. 45 of 2023',
      verificationStatus: 'GAZETTE_INDEXED',
      proceduralNote: {
        en: 'Section 308(1) defines extortion by putting any person in fear of injury. Section 308(2) prescribes punishment up to 2 years imprisonment, or fine, or both. Aggravated offenses (putting in fear of grievous harm or false accusation) attract higher penal terms under subsections (3)-(6).',
        hi: 'किसी व्यक्ति को भय में डालकर अनुचित लाभ या धन की मांग करना धारा 308 के तहत दंडनीय अपराध है।'
      }
    },
    'BNS_77': {
      statuteCode: 'BNS_77',
      section: 'Section 77',
      actTitle: 'Bharatiya Nyaya Sanhita, 2023',
      replacedLegacySection: 'Section 354C, Indian Penal Code (IPC)',
      summaryTitle: {
        en: 'Voyeurism & Non-Consensual Capture of Private Media',
        hi: 'निजी पलों की अनधिकृत रिकॉर्डिंग व प्रसारण (Voyeurism)'
      },
      lastUpdatedDate: '2026-09-11',
      statutorySource: 'Gazette of India, Act No. 45 of 2023',
      verificationStatus: 'GAZETTE_INDEXED',
      proceduralNote: {
        en: 'Penalizes capturing, watching, or disseminating the image of a woman engaging in a private act without consent.',
        hi: 'सहमति के बिना किसी महिला के निजी पलों की तस्वीरें खींचना या फैलाना संज्ञेय अपराध है।'
      }
    },
    'IT_ACT_67A': {
      statuteCode: 'IT_ACT_67A',
      section: 'Section 67A',
      actTitle: 'Information Technology Act, 2000',
      summaryTitle: {
        en: 'Transmitting Sexually Explicit Material in Electronic Form',
        hi: 'इलेक्ट्रॉनिक माध्यम से अश्लील सामग्री का प्रसारण'
      },
      lastUpdatedDate: '2026-09-11',
      statutorySource: 'Information Technology (Amendment) Act, 2008',
      verificationStatus: 'GAZETTE_INDEXED',
      proceduralNote: {
        en: 'Publishing or transmitting sexually explicit acts in electronic form carries imprisonment up to 5 years and fine up to ₹10 lakh on first conviction.',
        hi: 'इलेक्ट्रॉनिक रूप से अश्लील सामग्री प्रसारित करने पर पहली बार में 5 वर्ष तक की जेल व ₹10 लाख तक जुर्माना।'
      }
    },
    'IT_RULES_3_2_B': {
      statuteCode: 'IT_RULES_3_2_B',
      section: 'Rule 3(2)(b)',
      actTitle: 'Information Technology (Intermediary Guidelines) Rules, 2021',
      summaryTitle: {
        en: '24-Hour Removal Requirement for Non-Consensual Intimate Imagery',
        hi: 'मध्यवर्ती प्लेटफॉर्म्स द्वारा 24 घंटे में सामग्री हटाने का नियम'
      },
      lastUpdatedDate: '2026-09-11',
      statutorySource: 'Ministry of Electronics and Information Technology (MeitY)',
      verificationStatus: 'GAZETTE_INDEXED',
      proceduralNote: {
        en: 'Mandates online intermediaries to remove or disable access within 24 hours of receiving a complaint regarding non-consensual nudity, sexual acts, or morphed impersonation.',
        hi: 'सोशल मीडिया प्लेटफॉर्म्स को गैर-सहमति वाली निजी सामग्री की शिकायत मिलने पर 24 घंटे में हटाने का नियम।'
      }
    },
    'POCSO_2012': {
      statuteCode: 'POCSO_2012',
      section: 'POCSO Act, 2012 & Sec 67B IT Act',
      actTitle: 'Protection of Children from Sexual Offences Act, 2012',
      summaryTitle: {
        en: 'Protection of Minors (<18) from Digital Exploitation & CSAM',
        hi: 'नाबालिगों (<18 वर्ष) का डिजिटल शोषण व CSAM से संरक्षण'
      },
      lastUpdatedDate: '2026-09-11',
      statutorySource: 'Protection of Children from Sexual Offences Act, 2012',
      verificationStatus: 'GAZETTE_INDEXED',
      proceduralNote: {
        en: 'Any sexually explicit imagery involving a minor (<18) is classified under mandatory reporting guidelines. Absolute statutory confidentiality is required by law.',
        hi: '18 वर्ष से कम उम्र के व्यक्ति से जुड़ी अंतरंग सामग्री पर POCSO कानून के तहत कड़ी कार्रवाई व पूर्ण गोपनीयता लागू होती है।'
      }
    }
  },

  templates: {
    fir_police: {
      templateId: 'fir_police',
      title: 'Structured Police Complaint Draft (Cyber Cell / 1930)',
      lastUpdatedDate: '2026-09-11',
      statutoryBasis: ['BNS Sections 73, 77, 79, 308, 336, 351', 'IT Act Sections 66E, 67, 67A', 'BNSS Section 173'],
      status: 'INFORMATIONAL_DRAFT'
    },
    intermediary_notice: {
      templateId: 'intermediary_notice',
      title: '24-Hour Emergency Takedown Notice to Intermediaries',
      lastUpdatedDate: '2026-09-11',
      statutoryBasis: ['Rule 3(2)(b) IT Rules 2021', 'Section 79 IT Act 2000'],
      status: 'INFORMATIONAL_DRAFT'
    },
    ncw_petition: {
      templateId: 'ncw_petition',
      title: 'National Commission for Women (NCW) Grievance Submission Draft',
      lastUpdatedDate: '2026-09-11',
      statutoryBasis: ['Section 10 National Commission for Women Act, 1990'],
      status: 'INFORMATIONAL_DRAFT'
    },
    pocso_notice: {
      templateId: 'pocso_notice',
      title: 'NCPCR / POCSO Minor Safeguard Reporting Draft',
      lastUpdatedDate: '2026-09-11',
      statutoryBasis: ['POCSO Act 2012', 'Section 67B IT Act'],
      status: 'INFORMATIONAL_DRAFT'
    }
  }
};
