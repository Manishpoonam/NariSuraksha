/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * SINGLE SOURCE OF TRUTH: STATUTORY CITATIONS & OFFENSE MAPPINGS
 * 
 * In July 2024, the Government of India brought into effect the Bharatiya Nyaya Sanhita (BNS),
 * the Bharatiya Nagarik Suraksha Sanhita (BNSS), and the Bharatiya Sakshya Adhiniyam (BSA),
 * replacing the Indian Penal Code (IPC), Code of Criminal Procedure (CrPC), and Evidence Act.
 * 
 * This module is the sole canonical reference for:
 * 1. Individual statutory sections (BNS, BNSS, IT Act, IT Rules).
 * 2. Offense-to-statute composite mappings used across all scenario cards,
 *    legal warnings, copy-scripts, and draft complaints.
 * 
 * No component should hardcode statutory section numbers or penal consequences independently.
 */

export type VerificationStatus = 'VERIFIED_GAZETTE' | 'FLAGGED_FOR_LEGAL_REVIEW';

export interface StatuteCitation {
  id: string;
  act: string;
  section: string;
  legacyEquivalent?: string;
  shortLabel: { en: string; hi: string };
  heading: { en: string; hi: string };
  penalSummary: { en: string; hi: string };
  bailable: boolean;
  verificationStatus: VerificationStatus;
  uncertaintyFlag?: string; // Flagged for practitioner / legal verification
}

/**
 * Canonical Individual Statutes
 */
export const STATUTE_REGISTRY: Record<string, StatuteCitation> = {
  // BNS Section 308: Extortion
  BNS_308: {
    id: 'BNS_308',
    act: 'Bharatiya Nyaya Sanhita, 2023',
    section: 'Section 308',
    legacyEquivalent: 'Section 383/384, Indian Penal Code (IPC)',
    shortLabel: { en: 'BNS 308 (Extortion)', hi: 'BNS धारा 308 (जबरन वसूली)' },
    heading: {
      en: 'Extortion (Demanding Money, Favors, or Media Under Threat)',
      hi: 'जबरन वसूली (धमकी देकर धन या लाभ की मांग)'
    },
    penalSummary: {
      en: 'Section 308(2) punishes basic extortion with up to 2 years imprisonment, or fine, or both. Aggravated extortion (putting in fear of grievous hurt, false accusation, or death) under subsections (4)-(6) carries 7 to 10 years rigorous imprisonment.',
      hi: 'धारा 308(2) के तहत जबरन वसूली पर 2 साल तक की जेल या जुर्माना या दोनों। गंभीर मामलों में 7 से 10 साल तक का कठोर कारावास।'
    },
    bailable: false,
    verificationStatus: 'VERIFIED_GAZETTE',
  },

  // BNS Section 351: Criminal Intimidation
  BNS_351: {
    id: 'BNS_351',
    act: 'Bharatiya Nyaya Sanhita, 2023',
    section: 'Section 351',
    legacyEquivalent: 'Section 503/506, Indian Penal Code (IPC)',
    shortLabel: { en: 'BNS 351 (Criminal Intimidation)', hi: 'BNS धारा 351 (आपराधिक धमकी)' },
    heading: {
      en: 'Criminal Intimidation (Threatening Injury to Person, Reputation, or Property)',
      hi: 'आपराधिक धमकी (प्रतिष्ठा, शरीर या संपत्ति को क्षति पहुंचाने की धमकी)'
    },
    penalSummary: {
      en: 'Imprisonment up to 2 years, or fine, or both. If threat is to cause death, grievous hurt, or to impute unchastity to a woman, imprisonment up to 7 years with fine.',
      hi: '2 साल तक का कारावास या जुर्माना। यदि धमकी किसी महिला के चरित्र पर लांछन लगाने या गंभीर क्षति की हो, तो 7 साल तक की जेल।'
    },
    bailable: false,
    verificationStatus: 'VERIFIED_GAZETTE',
  },

  // BNS Section 77: Voyeurism
  BNS_77: {
    id: 'BNS_77',
    act: 'Bharatiya Nyaya Sanhita, 2023',
    section: 'Section 77',
    legacyEquivalent: 'Section 354C, Indian Penal Code (IPC)',
    shortLabel: { en: 'BNS 77 (Voyeurism)', hi: 'BNS धारा 77 (वॉयरिज्म)' },
    heading: {
      en: 'Voyeurism & Non-Consensual Dissemination of Private Media',
      hi: 'निजी पलों की अनधिकृत रिकॉर्डिंग व गैर-सहमति प्रसारण'
    },
    penalSummary: {
      en: 'First conviction: Imprisonment from 1 to 3 years and fine. Second conviction: Imprisonment from 3 to 7 years and fine.',
      hi: 'पहली बार दोषसिद्धि पर 1 से 3 साल तक की जेल व जुर्माना। दूसरी बार 3 से 7 साल तक की जेल व जुर्माना।'
    },
    bailable: false,
    verificationStatus: 'VERIFIED_GAZETTE',
  },

  // BNS Section 336: Forgery for Purpose of Harming Reputation (AI Deepfakes & Morphing)
  BNS_336: {
    id: 'BNS_336',
    act: 'Bharatiya Nyaya Sanhita, 2023',
    section: 'Section 336',
    legacyEquivalent: 'Section 469, Indian Penal Code (IPC)',
    shortLabel: { en: 'BNS 336 (Forgery to Harm Reputation)', hi: 'BNS धारा 336 (जालसाजी व डीपफेक)' },
    heading: {
      en: 'Forgery for Harming Reputation (AI Deepfakes, Synthetic Media & Morphing)',
      hi: 'प्रतिष्ठा को ठेस पहुंचाने के लिए जालसाजी (AI डीपफेक व मॉर्फिंग)'
    },
    penalSummary: {
      en: 'Imprisonment up to 3 years and fine. Directly applies to creating or altering electronic records, facial likenesses, or synthetic media intended to defame or sexualize a person.',
      hi: '3 वर्ष तक का कारावास एवं जुर्माना। AI से चेहरे को बदलकर फर्जी अश्लील सामग्री बनाना इस धारा के तहत जालसाजी माना जाता है।'
    },
    bailable: false,
    verificationStatus: 'VERIFIED_GAZETTE',
    uncertaintyFlag: 'Primary statute for synthetic media forgery. Note: often charged jointly with BNS Section 79 (insulting modesty) and IT Act 66E/67A in cyber FIRs pending specific standalone AI legislation.',
  },

  // BNS Section 79: Word, gesture or act intended to insult modesty of a woman
  BNS_79: {
    id: 'BNS_79',
    act: 'Bharatiya Nyaya Sanhita, 2023',
    section: 'Section 79',
    legacyEquivalent: 'Section 509, Indian Penal Code (IPC)',
    shortLabel: { en: 'BNS 79 (Insulting Modesty)', hi: 'BNS धारा 79 (महिला की मर्यादा को ठेस)' },
    heading: {
      en: 'Word, Gesture, or Act Intended to Insult the Modesty of a Woman',
      hi: 'महिला की मर्यादा को ठेस पहुंचाने के इरादे से किया गया कृत्य'
    },
    penalSummary: {
      en: 'Imprisonment up to 3 years with fine.',
      hi: '3 साल तक की साधारण कैद एवं जुर्माना।'
    },
    bailable: false,
    verificationStatus: 'VERIFIED_GAZETTE',
    uncertaintyFlag: 'Frequently cited in complaints involving online harassment of women, but BNS Section 336 is the specific substantive section for synthetic media/morphing forgery.',
  },

  // BNS Section 73: Prohibition on Disclosing Victim Identity
  BNS_73: {
    id: 'BNS_73',
    act: 'Bharatiya Nyaya Sanhita, 2023',
    section: 'Section 73',
    legacyEquivalent: 'Section 228A, Indian Penal Code (IPC)',
    shortLabel: { en: 'BNS 73 (Victim Identity Protection)', hi: 'BNS धारा 73 (पहचान की पूर्ण सुरक्षा)' },
    heading: {
      en: 'Prohibition on Disclosure of Victim Identity',
      hi: 'पीड़िता की पहचान सार्वजनिक करने पर कानूनी प्रतिबंध'
    },
    penalSummary: {
      en: 'Prohibits publishing or making known the name or identity of victims of intimate or sexual offenses. Punishable with imprisonment up to 2 years and fine.',
      hi: 'पीड़िता का नाम, पता या पहचान उजागर करने पर 2 वर्ष तक का कारावास व जुर्माना।'
    },
    bailable: false,
    verificationStatus: 'VERIFIED_GAZETTE',
  },

  // BNSS Section 173: Mandatory Statement Recording by Female Officer
  BNSS_173: {
    id: 'BNSS_173',
    act: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
    section: 'Section 173',
    legacyEquivalent: 'Section 154, Code of Criminal Procedure (CrPC)',
    shortLabel: { en: 'BNSS 173 (Female Officer Right)', hi: 'BNSS धारा 173 (महिला पुलिस अधिकारी का अधिकार)' },
    heading: {
      en: 'Mandatory Recording of Statements by Woman Police Officer',
      hi: 'महिला पुलिस अधिकारी द्वारा ही बयान दर्ज करने का वैधानिक अधिकार'
    },
    penalSummary: {
      en: 'Statutory mandate that information relating to offenses against women must be recorded exclusively by a woman police officer, at the complainant’s residence or place of choice.',
      hi: 'कानूनी प्रावधान कि महिला से संबंधित अपराधों में बयान केवल महिला पुलिस अधिकारी द्वारा ही और पीड़िता की सुविधानुसार दर्ज किया जाएगा।'
    },
    bailable: true,
    verificationStatus: 'VERIFIED_GAZETTE',
  },

  // BNSS Section 94: Summons to Produce Documents or Electronic Records (Replaces Section 91 CrPC)
  BNSS_94: {
    id: 'BNSS_94',
    act: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
    section: 'Section 94',
    legacyEquivalent: 'Section 91, Code of Criminal Procedure (CrPC)',
    shortLabel: { en: 'BNSS Sec 94 (Production & Preservation of Records)', hi: 'BNSS धारा 94 (दस्तावेज व सर्वर रिकॉर्ड प्रस्तुति)' },
    heading: {
      en: 'Summons to Produce Document, Electronic Communication, or Other Thing',
      hi: 'दस्तावेज, इलेक्ट्रॉनिक संचार व सर्वर डेटा प्रस्तुत करने का वैधानिक आदेश'
    },
    penalSummary: {
      en: 'Empowers police officers and courts to direct intermediaries, telecom providers, and individuals to preserve and produce electronic logs, IP addresses, subscriber data, and chat records necessary for investigation.',
      hi: 'जांच अधिकारी या अदालत को सोशल मीडिया प्लेटफॉर्म, टेलीकॉम कंपनियों व व्यक्तियों को सर्वर लॉग, आईपी एड्रेस व चैट रिकॉर्ड प्रस्तुत करने का आदेश देने का वैधानिक अधिकार देता है।'
    },
    bailable: true,
    verificationStatus: 'FLAGGED_FOR_LEGAL_REVIEW',
    uncertaintyFlag: 'FLAGGED FOR LEGAL VERIFICATION & CONSOLIDATION: Section 94 of the Bharatiya Nagarik Suraksha Sanhita, 2023 (replacing Section 91 CrPC) specifically adds explicit statutory text authorizing summons to produce "electronic communication" and digital records. Flagged for legal review to verify: (1) whether investigatory summons to foreign intermediaries (Meta, Google, Telegram) under Section 94 BNSS can be served by investigating officers during preliminary enquiry before formal Section 173 BNSS FIR registration; and (2) standard operating procedures for emergency server preservation notices under Section 94 BNSS read with Rule 3(1)(j) IT Rules 2021 (which mandates 180-day data retention upon lawful government requisition).',
  },

  // IT Act Section 66E: Violation of Privacy
  IT_ACT_66E: {
    id: 'IT_ACT_66E',
    act: 'Information Technology Act, 2000',
    section: 'Section 66E',
    shortLabel: { en: 'IT Act Sec 66E (Privacy Violation)', hi: 'IT एक्ट धारा 66E (प्राइवेसी उल्लंघन)' },
    heading: {
      en: 'Punishment for Violation of Bodily Privacy (Capturing / Transmitting Private Images)',
      hi: 'शारीरिक प्राइवेसी उल्लंघन (निजी अंगों/तस्वीरों को बिना सहमति खींचना या भेजना)'
    },
    penalSummary: {
      en: 'Imprisonment up to 3 years or fine up to ₹2 Lakhs, or both.',
      hi: '3 साल तक की जेल या ₹2 लाख तक जुर्माना, या दोनों।'
    },
    bailable: true,
    verificationStatus: 'VERIFIED_GAZETTE',
  },

  // IT Act Section 67A: Sexually Explicit Electronic Content
  IT_ACT_67A: {
    id: 'IT_ACT_67A',
    act: 'Information Technology Act, 2000',
    section: 'Section 67A',
    shortLabel: { en: 'IT Act Sec 67A (Explicit Media)', hi: 'IT एक्ट धारा 67A (अश्लील सामग्री प्रसारण)' },
    heading: {
      en: 'Publishing or Transmitting Sexually Explicit Acts in Electronic Form',
      hi: 'इलेक्ट्रॉनिक माध्यम से यौन रूप से स्पष्ट सामग्री का प्रकाशन व प्रसारण'
    },
    penalSummary: {
      en: 'First conviction: Imprisonment up to 5 years and fine up to ₹10 Lakhs. Second conviction: Imprisonment up to 7 years and fine up to ₹10 Lakhs. Non-bailable.',
      hi: 'पहली बार: 5 साल तक की जेल व ₹10 लाख तक जुर्माना। दूसरी बार: 7 साल तक की जेल। गैर-जमानती अपराध।'
    },
    bailable: false,
    verificationStatus: 'VERIFIED_GAZETTE',
  },

  // IT Rules, 2021: Rule 3(2)(b) - 24-Hour Takedown Rule
  IT_RULES_3_2_B: {
    id: 'IT_RULES_3_2_B',
    act: 'Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021',
    section: 'Rule 3(2)(b)',
    shortLabel: { en: 'IT Rules 3(2)(b) (24-Hr Takedown)', hi: 'आईटी नियम 3(2)(b) (24 घंटे में निष्कासन)' },
    heading: {
      en: 'Mandatory 24-Hour Removal of Non-Consensual Intimate Imagery by Platforms',
      hi: 'सोशल मीडिया प्लेटफॉर्म्स द्वारा 24 घंटे में अंतरंग सामग्री हटाने का कानूनी नियम'
    },
    penalSummary: {
      en: 'Obligates online intermediaries to disable or remove access within 24 hours of receiving a complaint regarding non-consensual nudity, sexual acts, or impersonation. Failure forfeits Safe Harbor protection under Section 79 IT Act.',
      hi: 'शिकायत मिलने के 24 घंटे के अंदर सामग्री हटाने का वैधानिक नियम; उल्लंघन करने पर प्लेटफॉर्म का कानूनी संरक्षण (Safe Harbor) समाप्त हो जाता है।'
    },
    bailable: true,
    verificationStatus: 'VERIFIED_GAZETTE',
  },

  // BSA Section 63: Admissibility of Electronic Records (Replaces Section 65B Indian Evidence Act, 1872)
  BSA_63: {
    id: 'BSA_63',
    act: 'Bharatiya Sakshya Adhiniyam, 2023 (BSA)',
    section: 'Section 63',
    legacyEquivalent: 'Section 65B, Indian Evidence Act, 1872 (Repealed)',
    shortLabel: { 
      en: 'BSA Sec 63 (Electronic Evidence Certificate)', 
      hi: 'BSA धारा 63 (इलेक्ट्रॉनिक साक्ष्य प्रमाण-पत्र)' 
    },
    heading: {
      en: 'Admissibility of Electronic Records & Mandatory Forensic Certification',
      hi: 'इलेक्ट्रॉनिक साक्ष्य की ग्राह्यता एवं अनिवार्य फोरेंसिक प्रमाण-पत्र'
    },
    penalSummary: {
      en: 'Under Section 63(4) of the Bharatiya Sakshya Adhiniyam, 2023 (which supersedes Section 65B(4) of the former Indian Evidence Act from July 1, 2024), digital screenshots, chat archives, and call logs submitted to police or court are admissible as primary electronic evidence when accompanied by a signed forensic certificate confirming device custody, un-tampered hash, and device reliability.',
      hi: 'भारतीय साक्ष्य अधिनियम 2023 की धारा 63(4) (पूर्ववर्ती धारा 65B भारतीय साक्ष्य अधिनियम) के तहत, चैट, स्क्रीनशॉट और कॉल रिकॉर्ड तभी कानूनी साक्ष्य माने जाते हैं जब उनके साथ डिवाइस की विश्वसनीयता और अखंडता का हस्ताक्षरित प्रमाण-पत्र संलग्न हो।'
    },
    bailable: true,
    verificationStatus: 'FLAGGED_FOR_LEGAL_REVIEW',
    uncertaintyFlag: 'FLAGGED FOR LEGAL VERIFICATION: "Section 63 BSA certified complaints" vs. "Section 65B Indian Evidence Act" cited across e-FIR and evidence modules. BSA 2023 Section 63 directly supersedes Section 65B IEA for all offenses committed after July 1, 2024. Requires legal verification on whether cyber FIR drafts and e-evidence declarations should uniformly cite "Section 63 BSA 2023", or dual-cite "Section 63 BSA (formerly Section 65B Indian Evidence Act)" to accommodate legacy state police software portals and transitional proceedings.',
  },

  // Legacy Citation: IEA Section 65B (Cross-referenced for transition audit)
  IEA_65B: {
    id: 'IEA_65B',
    act: 'Indian Evidence Act, 1872 (Repealed as of July 1, 2024)',
    section: 'Section 65B',
    legacyEquivalent: 'Superseded by Section 63, Bharatiya Sakshya Adhiniyam, 2023 (BSA)',
    shortLabel: { 
      en: 'IEA Sec 65B (Legacy Electronic Certificate)', 
      hi: 'IEA धारा 65B (पूर्ववर्ती इलेक्ट्रॉनिक प्रमाण-पत्र)' 
    },
    heading: {
      en: 'Admissibility of Electronic Records (Pre-July 2024 Legacy Provision)',
      hi: 'इलेक्ट्रॉनिक साक्ष्य की ग्राह्यता (1 जुलाई 2024 से पूर्व का प्रावधान)'
    },
    penalSummary: {
      en: 'Mandated Section 65B(4) certificates for computer printouts and digital evidence. Formally repealed and superseded by Section 63 BSA, 2023 from July 1, 2024.',
      hi: 'कंप्यूटर व मोबाइल स्क्रीनशॉट के लिए धारा 65B प्रमाण-पत्र अनिवार्य था। 1 जुलाई 2024 से इसे BSA 2023 की धारा 63 द्वारा प्रतिस्थापित कर दिया गया है।'
    },
    bailable: true,
    verificationStatus: 'FLAGGED_FOR_LEGAL_REVIEW',
    uncertaintyFlag: 'FLAGGED FOR CONSOLIDATION: Retained solely as a historical/legacy cross-reference for pending investigations or evidence gathered under pre-July 2024 law. All active generation should point to Section 63 BSA upon legal confirmation.',
  },

  // UGC Regulations on Sexual Harassment (2015)
  UGC_REGULATIONS_2015: {
    id: 'UGC_REGULATIONS_2015',
    act: 'University Grants Commission (Prevention, Prohibition and Redressal of Sexual Harassment of Women Employees and Students in Higher Educational Institutions) Regulations, 2015',
    section: 'UGC Regulations, 2015 (Regulations 3, 4, 8 & 9)',
    shortLabel: { 
      en: 'UGC Regulations on Sexual Harassment (2015)', 
      hi: 'यूजीसी यौन उत्पीड़न निवारण विनियम (2015)' 
    },
    heading: {
      en: 'Mandatory ICC Redressal, Zero Victim Victimization & Confidentiality in Higher Educational Institutions',
      hi: 'उच्च शिक्षण संस्थानों में आंतरिक शिकायत समिति (ICC), शून्य उत्पीड़न व गोपनीयता का वैधानिक अधिकार'
    },
    penalSummary: {
      en: 'Under the UGC Regulations 2015, Higher Educational Institutions are legally bound to maintain an active Internal Complaints Committee (ICC), enforce strict confidentiality regarding student identity, provide immediate interim protection against non-consensual digital dissemination, and conclude inquiries within a 90-day statutory timeline.',
      hi: 'यूजीसी विनियम 2015 के तहत उच्च शिक्षण संस्थानों के लिए आंतरिक शिकायत समिति (ICC) का संचालन, पीड़िता की पहचान की पूर्ण गोपनीयता, डिजिटल उत्पीड़न के खिलाफ तात्कालिक अंतरिम सुरक्षा और 90 दिनों के भीतर जांच पूर्ण करना कानूनी रूप से अनिवार्य है।'
    },
    bailable: true,
    verificationStatus: 'VERIFIED_GAZETTE',
  }
};

/**
 * Offense-Specific Composite Statute Packages
 * Used across the 5 scenarios in GirlsRescueGuide and other triage flows.
 */
export interface OffenseStatutePackage {
  scenarioKey: string;
  title: { en: string; hi: string };
  primarySections: string[]; // keys into STATUTE_REGISTRY
  supplementalSections?: string[];
  unifiedCitationString: { en: string; hi: string };
  headerSummaryBadge: { en: string; hi: string };
  warningNoticeText: { en: string; hi: string };
  practitionerNote: string;
}

export const OFFENSE_STATUTE_MAPPINGS: Record<string, OffenseStatutePackage> = {
  // 1. Blackmail / Extortion
  extortion_blackmail: {
    scenarioKey: 'extortion_blackmail',
    title: {
      en: 'Blackmail & Financial / Video Extortion',
      hi: 'जबरन वसूली व ब्लैकमेल'
    },
    primarySections: ['BNS_308', 'BNS_351', 'IT_ACT_66E', 'IT_ACT_67A'],
    supplementalSections: ['BNSS_94'],
    unifiedCitationString: {
      en: 'BNS Sections 308 (Extortion) and 351 (Criminal Intimidation), read with IT Act Sections 66E and 67A',
      hi: 'BNS धारा 308 (जबरन वसूली) व धारा 351 (आपराधिक धमकी), साथ ही IT एक्ट धारा 66E व 67A'
    },
    headerSummaryBadge: {
      en: 'BNS 308, 351 & IT Act 66E/67A',
      hi: 'BNS 308, 351 व IT एक्ट 66E/67A'
    },
    warningNoticeText: {
      en: 'This communication is being recorded and submitted directly to the National Cyber Crime Reporting Portal (1930) and Cyber Police Station under Section 66E and Section 67A of the Information Technology Act, 2000, and Sections 308 (Extortion) and 351 (Criminal Intimidation) of the Bharatiya Nyaya Sanhita (BNS), 2023. Any transmission of images constitutes a non-bailable criminal offense. All further actions are being handled through official law enforcement channels.',
      hi: 'यह बातचीत और आपका संपर्क विवरण नेशनल साइबर क्राइम पोर्टल (1930) और साइबर पुलिस को IT एक्ट की धारा 66E, 67A और भारतीय न्याय संहिता (BNS) 2023 की धारा 308 (जबरन वसूली) व 351 (आपराधिक धमकी) के तहत साक्ष्य के रूप में दर्ज कराया जा चुका है। किसी भी प्रकार की सामग्री प्रसारित करना गैर-जमानती अपराध है जिसकी जांच पुलिस कर रही है।'
    },
    practitionerNote: 'Extortion is primarily grounded in BNS 308. Where the blackmailer threatens defamation or death/injury to extract compliance, BNS 351 is invoked concurrently. IT Act 67A attaches if sexually explicit media is part of the extortion package.'
  },

  // 2. NCII Distribution (Already Posted Online)
  ncii_distribution: {
    scenarioKey: 'ncii_distribution',
    title: {
      en: 'Non-Consensual Intimate Imagery (NCII) Distribution',
      hi: 'गैर-सहमति वाली अंतरंग सामग्री का प्रसार'
    },
    primarySections: ['IT_RULES_3_2_B', 'IT_ACT_66E', 'IT_ACT_67A', 'BNS_77'],
    unifiedCitationString: {
      en: 'Rule 3(2)(b) IT Rules 2021, IT Act Sections 66E & 67A, and BNS Section 77 (Voyeurism)',
      hi: 'IT नियम 2021 (नियम 3(2)(b)), IT एक्ट धारा 66E व 67A, और BNS धारा 77'
    },
    headerSummaryBadge: {
      en: 'Rule 3(2)(b) IT Rules 2021 & BNS 77',
      hi: 'IT नियम 3(2)(b) व BNS 77'
    },
    warningNoticeText: {
      en: 'URGENT STATUTORY TAKEDOWN NOTICE: Under Rule 3(2)(b) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, online intermediaries are legally obligated to disable access to non-consensual intimate imagery, nudity, or morphed depictions within 24 hours of receiving this notice. Failure to comply terminates safe harbor immunity under Section 79 of the IT Act, 2000. Offending material has also been cited under BNS Section 77 and IT Act Sections 66E and 67A.',
      hi: 'अति-आवश्यक वैधानिक निष्कासन नोटिस: सूचना प्रौद्योगिकी (मध्यवर्ती दिशानिर्देश) नियम 2021 के नियम 3(2)(b) के अंतर्गत, गैर-सहमति वाली अंतरंग या मॉर्फ्ड सामग्री की शिकायत मिलने पर 24 घंटे के भीतर उसे हटाना मध्यवर्ती प्लेटफॉर्म्स के लिए कानूनी रूप से अनिवार्य है। ऐसा न करने पर IT एक्ट की धारा 79 के तहत प्राप्त कानूनी संरक्षण समाप्त हो जाता है।'
    },
    practitionerNote: 'Rule 3(2)(b) of the 2021 IT Rules provides the strict 24-hour intermediary turnaround mandate. Substantive penal charges against the poster proceed under IT Act 67A and BNS 77.'
  },

  // 3. AI Deepfakes & Morphed Media
  ai_deepfake_morph: {
    scenarioKey: 'ai_deepfake_morph',
    title: {
      en: 'AI Deepfakes & Morphed Synthetic Imagery',
      hi: 'AI डीपफेक व मॉर्फ्ड डिजिटल सामग्री'
    },
    primarySections: ['BNS_336', 'IT_ACT_66E', 'IT_ACT_67A'],
    supplementalSections: ['BNS_79'],
    unifiedCitationString: {
      en: 'BNS Section 336 (Forgery for Harming Reputation), IT Act Sections 66E & 67A, and BNS Section 79',
      hi: 'BNS धारा 336 (जालसाजी), IT एक्ट धारा 66E व 67A, तथा BNS धारा 79'
    },
    headerSummaryBadge: {
      en: 'BNS 336, IT Act 66E/67A & BNS 79',
      hi: 'BNS 336, IT एक्ट 66E/67A व BNS 79'
    },
    warningNoticeText: {
      en: 'PUBLIC NOTICE & LEGAL WARNING: Synthetic, AI-generated, or morphed imagery impersonating my likeness has been generated and circulated without consent. Creating, storing, or transmitting morphed intimate media constitutes criminal forgery to harm reputation under Section 336 and Section 79 of the Bharatiya Nyaya Sanhita (BNS), 2023, and Sections 66E and 67A of the IT Act. A formal complaint has been filed with the Cyber Crime Police (1930). Any person forwarding or hosting this synthetic media is legally liable as an accessory to criminal forgery.',
      hi: 'सार्वजनिक सूचना व कानूनी चेतावनी: मेरी पहचान या चेहरे का दुरुपयोग करके फर्जी AI या मॉर्फ्ड तस्वीरें तैयार कर प्रसारित की जा रही हैं। ऐसी सामग्री बनाना, अपने पास रखना या आगे भेजना BNS 2023 की धारा 336 (जालसाजी), धारा 79 और IT एक्ट 66E/67A के तहत दंडनीय अपराध है। साइबर क्राइम पोर्टल (1930) पर मामला दर्ज किया जा चुका है। इसे फॉरवर्ड करने वाला व्यक्ति भी कानूनन उत्तरदायी होगा।'
    },
    practitionerNote: 'RESOLUTION OF PREVIOUS CONFLICT: BNS Section 336 (old IPC 469: forgery for harming reputation) is the substantive offense governing synthetic/AI alteration of electronic records and likeness. BNS Section 79 (old IPC 509: insult to modesty) is applied concurrently in complaints involving women victims. Standardized to cite BNS 336 as primary forgery statute and BNS 79 as supplemental modesty offense.'
  },

  // 4. Known Person / Ex-Partner Threats
  known_person_threats: {
    scenarioKey: 'known_person_threats',
    title: {
      en: 'Known Person / Ex-Partner Retaliation & Threats',
      hi: 'परिचित या पूर्व साथी द्वारा धमकी व प्रतिशोध'
    },
    primarySections: ['BNS_77', 'BNS_308', 'BNS_351', 'IT_ACT_66E'],
    unifiedCitationString: {
      en: 'BNS Sections 77 (Voyeurism), 308 (Extortion), and 351 (Criminal Intimidation), read with IT Act Section 66E',
      hi: 'BNS धारा 77, 308 (जबरन वसूली), 351 (आपराधिक धमकी) व IT एक्ट धारा 66E'
    },
    headerSummaryBadge: {
      en: 'BNS 77, 308, 351 & IT Act 66E',
      hi: 'BNS 77, 308, 351 व IT एक्ट 66E'
    },
    warningNoticeText: {
      en: 'Please be formally notified that threatening to possess, disclose, or distribute private photographs or conversations constitutes criminal voyeurism, extortion, and criminal intimidation under Sections 77, 308, and 351 of the Bharatiya Nyaya Sanhita (BNS), 2023, along with Section 66E of the Information Technology Act, 2000. All threatening messages, call records, and timestamps have been preserved for forensics. If any further contact, harassment, or distribution is attempted, a formal non-bailable complaint will be registered with the Women’s Police Cell (1091) and Cyber Crime Police.',
      hi: 'आपको औपचारिक रूप से सूचित किया जाता है कि निजी बातचीत या तस्वीरें लीक करने की धमकी देना भारतीय न्याय संहिता 2023 की धारा 77, 308 और 351, तथा IT एक्ट की धारा 66E के तहत संज्ञेय अपराध है। आपकी सभी धमकियों और संदेशों को साक्ष्य के रूप में सुरक्षित कर लिया गया है। यदि कोई भी अनुचित कदम उठाया गया या संपर्क करने की कोशिश की गई, तो महिला पुलिस सेल (1091) व साइबर सेल में त्वरित गैर-जमानती शिकायत दर्ज कराई जाएगी।'
    },
    practitionerNote: 'RESOLUTION OF INTERNAL CARD CONFLICT: Both card header and power-reply script are now completely synchronized to the exact same statutory package: BNS Sections 77, 308, 351 and IT Act 66E.'
  },

  // 5. Identity Protection & Procedural Safeguards (Fear of Family / Social Stigma)
  identity_and_procedural_rights: {
    scenarioKey: 'identity_and_procedural_rights',
    title: {
      en: 'Victim Identity Sealing & Procedural Safeguards',
      hi: 'पहचान की सुरक्षा व महिला अधिकारी द्वारा बयान'
    },
    primarySections: ['BNS_73', 'BNSS_173'],
    unifiedCitationString: {
      en: 'BNS Section 73 (Prohibition on Identity Disclosure) and BNSS Section 173 (Statement by Female Officer)',
      hi: 'BNS धारा 73 (पहचान की गोपनीयता) व BNSS धारा 173 (महिला अधिकारी द्वारा बयान)'
    },
    headerSummaryBadge: {
      en: 'BNS 73 & BNSS 173 (Statutory Rights)',
      hi: 'BNS 73 व BNSS 173 (वैधानिक अधिकार)'
    },
    warningNoticeText: {
      en: 'STATUTORY PROCEDURAL REQUEST UNDER BNS SECTION 73 & BNSS SECTION 173:\n\nTo: Investigating Officer / Cyber Crime Police Desk\n\nI am submitting this grievance concerning cyber harassment / intimate data exploitation. Under Section 73 of the Bharatiya Nyaya Sanhita (BNS), 2023, the law strictly prohibits the disclosure or publication of the victim’s name or identity. Furthermore, under Section 173 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023, I respectfully exercise my statutory right to have all statements recorded exclusively by a woman police officer in a confidential setting without third-party or public exposure.\n\nDate: [Insert Date]\nComplainant Ref: [Confidential Submission]',
      hi: 'BNS धारा 73 व BNSS धारा 173 के अंतर्गत वैधानिक प्रक्रिया अनुरोध:\n\nसेवा में: जांच अधिकारी / साइबर क्राइम सेल\n\nमैं साइबर उत्पीड़न के संबंध में यह शिकायत प्रस्तुत कर रही हूँ। भारतीय न्याय संहिता 2023 की धारा 73 के अनुसार पीड़िता की पहचान या नाम उजागर करना कानूनन प्रतिबंधित है। इसके अलावा, भारतीय नागरिक सुरक्षा संहिता 2023 की धारा 173 के तहत मैं अपना बयान केवल महिला पुलिस अधिकारी द्वारा ही गोपनीय माहौल में दर्ज कराने के अपने वैधानिक अधिकार का अनुरोध करती हूँ।'
    },
    practitionerNote: 'BNS 73 imposes 2-year imprisonment on anyone disclosing the identity of victims of intimate offenses. BNSS 173 mandates female officer recording. Both empower the victim to demand strict procedural privacy.'
  },

  // 6. Video Call Sextortion (Mapped explicitly to Extortion & IT Act provisions)
  videocall_sextortion: {
    scenarioKey: 'videocall_sextortion',
    title: {
      en: 'Video Call Sextortion & Immediate Blackmail',
      hi: 'वीडियो कॉल सेक्सटॉर्शन व जबरन वसूली'
    },
    primarySections: ['BNS_308', 'BNS_351', 'IT_ACT_66E', 'IT_ACT_67A'],
    supplementalSections: ['BNSS_94'],
    unifiedCitationString: {
      en: 'BNS Sections 308 (Extortion) and 351 (Criminal Intimidation), read with IT Act Sections 66E and 67A',
      hi: 'BNS धारा 308 (जबरन वसूली) व धारा 351 (आपराधिक धमकी), साथ ही IT एक्ट धारा 66E व 67A'
    },
    headerSummaryBadge: {
      en: 'BNS 308, 351 & IT Act 66E/67A',
      hi: 'BNS 308, 351 व IT एक्ट 66E/67A'
    },
    warningNoticeText: {
      en: 'This communication is being recorded and submitted directly to the National Cyber Crime Reporting Portal (1930) and Cyber Police Station under Section 66E and Section 67A of the Information Technology Act, 2000, and Sections 308 (Extortion) and 351 (Criminal Intimidation) of the Bharatiya Nyaya Sanhita (BNS), 2023. Any transmission of recorded video calls constitutes a non-bailable criminal offense. All further actions are being handled through official law enforcement channels.',
      hi: 'यह बातचीत और आपका संपर्क विवरण नेशनल साइबर क्राइम पोर्टल (1930) और साइबर पुलिस को IT एक्ट की धारा 66E, 67A और भारतीय न्याय संहिता (BNS) 2023 की धारा 308 (जबरन वसूली) व 351 (आपराधिक धमकी) के तहत साक्ष्य के रूप में दर्ज कराया जा चुका है।'
    },
    practitionerNote: 'Video call entrapment with immediate extortion demands is charged primarily under BNS 308 (Extortion) and 351 (Intimidation).'
  },

  // 7. Viral Leaked Media
  viral_leaked: {
    scenarioKey: 'viral_leaked',
    title: {
      en: 'Viral Dissemination & Leakage of Private Media',
      hi: 'इंटरनेट पर निजी तस्वीरों का वायरल प्रसार'
    },
    primarySections: ['IT_RULES_3_2_B', 'IT_ACT_66E', 'IT_ACT_67A', 'BNS_77'],
    supplementalSections: ['BNSS_94'],
    unifiedCitationString: {
      en: 'Rule 3(2)(b) IT Rules 2021, IT Act Sections 66E & 67A, and BNS Section 77 (Voyeurism)',
      hi: 'IT नियम 2021 (नियम 3(2)(b)), IT एक्ट धारा 66E व 67A, और BNS धारा 77'
    },
    headerSummaryBadge: {
      en: 'Rule 3(2)(b) IT Rules 2021 & BNS 77',
      hi: 'IT नियम 3(2)(b) व BNS 77'
    },
    warningNoticeText: {
      en: 'URGENT STATUTORY TAKEDOWN NOTICE: Under Rule 3(2)(b) of the Information Technology Rules, 2021, online intermediaries are legally obligated to disable access to non-consensual intimate imagery within 24 hours of receiving this notice.',
      hi: 'अति-आवश्यक वैधानिक निष्कासन नोटिस: IT नियम 2021 के नियम 3(2)(b) के अंतर्गत 24 घंटे में सामग्री हटाना अनिवार्य है।'
    },
    practitionerNote: 'Immediate 24-hour takedown under IT Rules 2021 Rule 3(2)(b) alongside penal provisions.'
  },

  // 8. Device Hacked / Cloud Account Compromise
  device_hacked_icloud: {
    scenarioKey: 'device_hacked_icloud',
    title: {
      en: 'Device Hacked / Cloud Account Compromise with Extortion',
      hi: 'डिवाइस हैक व जबरन वसूली'
    },
    primarySections: ['BNS_308', 'IT_ACT_66E', 'BNS_351'],
    supplementalSections: ['BNSS_94'],
    unifiedCitationString: {
      en: 'BNS Section 308 (Extortion), IT Act Section 66E, and BNS Section 351 (Criminal Intimidation)',
      hi: 'BNS धारा 308 (जबरन वसूली), IT एक्ट धारा 66E व BNS धारा 351'
    },
    headerSummaryBadge: {
      en: 'BNS 308 & IT Act 66E',
      hi: 'BNS 308 व IT एक्ट 66E'
    },
    warningNoticeText: {
      en: 'Unauthorized access to device records followed by extortion threats violates Section 308 BNS and IT Act provisions.',
      hi: 'अनधिकृत डेटा एक्सेस और फिरौती की मांग BNS धारा 308 और IT एक्ट के तहत संज्ञेय अपराध है।'
    },
    practitionerNote: 'Hacking coupled with blackmail is charged under extortion (BNS 308) and privacy breach (IT Act 66E).'
  },

  // 9. Account Takeover
  account_takeover: {
    scenarioKey: 'account_takeover',
    title: {
      en: 'Account Takeover & Impersonation Blackmail',
      hi: 'खाता हैक व ब्लैकमेल'
    },
    primarySections: ['BNS_308', 'IT_ACT_66E', 'BNS_351'],
    supplementalSections: ['BNSS_94'],
    unifiedCitationString: {
      en: 'BNS Section 308 (Extortion), IT Act Section 66E, and BNS Section 351',
      hi: 'BNS धारा 308 (जबरन वसूली) व IT एक्ट धारा 66E'
    },
    headerSummaryBadge: {
      en: 'BNS 308 & IT Act 66E',
      hi: 'BNS 308 व IT एक्ट 66E'
    },
    warningNoticeText: {
      en: 'Compromising accounts and issuing extortion demands constitutes non-bailable offenses under BNS 308.',
      hi: 'खाता हैक कर जबरन वसूली करना BNS धारा 308 के तहत संज्ञेय अपराध है।'
    },
    practitionerNote: 'Impersonation and blackmail invoke BNS 308 alongside privacy protections.'
  }
};

/**
 * Helper function to retrieve composite statute package safely
 */
export function getOffenseStatutePackage(key: string): OffenseStatutePackage {
  return OFFENSE_STATUTE_MAPPINGS[key] || OFFENSE_STATUTE_MAPPINGS.extortion_blackmail;
}

export interface IncidentStatutesResult {
  statuteKeys: string[];
  statutes: StatuteCitation[];
  provisionsText: string;
  groundsList: string[];
  referenceSubjectString: string;
}

/**
 * Dynamically resolves statutory citations and legal grounds for complaints and FIR drafts.
 * Ensures extortion (BNS 308), deepfakes (BNS 336), voyeurism (BNS 77), and takedown (Rule 3(2)(b))
 * are accurately and dynamically pulled based on the incident category.
 */
export function getStatuteCitationsForIncident(
  incidentType: string,
  isHindi: boolean = false,
  isMinor: boolean = false
): IncidentStatutesResult {
  const pkg = OFFENSE_STATUTE_MAPPINGS[incidentType] || OFFENSE_STATUTE_MAPPINGS.extortion_blackmail;
  
  // Base keys from canonical mapping
  const baseKeys: string[] = [...pkg.primarySections];
  if (pkg.supplementalSections) {
    pkg.supplementalSections.forEach((s) => {
      if (!baseKeys.includes(s)) baseKeys.push(s);
    });
  }

  // Explicitly ensure BNS 308 is present and prioritized at the very top for extortion/blackmail categories
  const isExtortionCategory = 
    incidentType === 'extortion_blackmail' || 
    incidentType === 'videocall_sextortion' || 
    incidentType.toLowerCase().includes('extortion') || 
    incidentType.toLowerCase().includes('blackmail');

  if (isExtortionCategory) {
    if (!baseKeys.includes('BNS_308')) {
      baseKeys.unshift('BNS_308');
    } else if (baseKeys[0] !== 'BNS_308') {
      const idx = baseKeys.indexOf('BNS_308');
      baseKeys.splice(idx, 1);
      baseKeys.unshift('BNS_308');
    }
  }
  
  // Safeguards always attached to complaints
  if (!baseKeys.includes('BNS_73')) {
    baseKeys.push('BNS_73');
  }
  if (!baseKeys.includes('BSA_63')) {
    baseKeys.push('BSA_63');
  }

  const statutes = baseKeys
    .map((key) => STATUTE_REGISTRY[key])
    .filter((s): s is StatuteCitation => Boolean(s));

  // Build provisions lines
  const lines: string[] = [];
  
  if (isMinor) {
    if (isHindi) {
      lines.push('- POCSO Act, 2012 (धारा 13, 14, 15): 18 वर्ष से कम आयु की पीड़िता का डिजिटल/यौन शोषण (गैर-जमानती)');
      lines.push('- IT Act, 2000 (धारा 67B): नाबालिग से संबंधित इलेक्ट्रॉनिक सामग्री का निर्माण या प्रसारण (गैर-जमानती)');
    } else {
      lines.push('- Sections 13, 14, 15 of Protection of Children from Sexual Offences (POCSO) Act, 2012 (Non-Bailable)');
      lines.push('- Section 67B of Information Technology Act, 2000 (Child Sexual Exploitation & CSAM Material - Non-Bailable)');
    }
  }

  statutes.forEach((s) => {
    if (isHindi) {
      lines.push(`- ${s.act} (${s.section}): ${s.shortLabel.hi}`);
    } else {
      lines.push(`- ${s.section}, ${s.act} (${s.shortLabel.en})`);
    }
  });

  if (isMinor) {
    if (isHindi) {
      lines.push('- POCSO Act धारा 19 व 33: अनिवार्य रिपोर्टिंग व पहचान की पूर्ण गोपनीयता');
    } else {
      lines.push('- Section 19 & 33 of POCSO Act, 2012 (Mandatory Reporting & In-Camera Identity Safeguards)');
    }
  }

  // Build statutory grounds paragraphs tailored specifically to the incident
  const groundsList: string[] = [];
  if (incidentType === 'extortion_blackmail' || isExtortionCategory) {
    if (isHindi) {
      groundsList.push('1. BNS धारा 308 (जबरन वसूली): किसी व्यक्ति को भय में डालकर धन, संपत्ति या अनुचित लाभ की मांग करना गैर-जमानती संज्ञेय अपराध है।');
      groundsList.push('2. BNS धारा 351 (आपराधिक धमकी): शारीरिक, मानसिक या प्रतिष्ठा को क्षति पहुंचाने की धमकी देना दंडनीय अपराध है।');
      groundsList.push('3. IT Act धारा 67A: इलेक्ट्रॉनिक माध्यम से यौन रूप से स्पष्ट सामग्री का प्रसारण करने पर 5 वर्ष तक कारावास व ₹10 लाख जुर्माने का प्रावधान है।');
      groundsList.push('4. BNS धारा 73: पीड़िता की पहचान किसी भी रूप में सार्वजनिक करना कानूनन निषिद्ध है।');
    } else {
      groundsList.push('1. Under Section 308 BNS, putting any person in fear of injury or reputation in order to commit extortion carries severe penal consequences under subsections (2) through (6).');
      groundsList.push('2. Under Section 351 BNS, threatening injury to person, reputation, or property constitutes criminal intimidation.');
      groundsList.push('3. Under Section 67A IT Act, transmitting sexually explicit material electronically is a cognizable, non-bailable offense punishable by up to 5 years imprisonment and fine up to ₹10 Lakh on first conviction.');
      groundsList.push('4. Under Section 73 BNS, publishing or disclosing the name or identity of the victim in public or police records is strictly prohibited by law.');
    }
  } else if (incidentType === 'ai_deepfake_morph') {
    if (isHindi) {
      groundsList.push('1. BNS धारा 336 (जालसाजी): प्रतिष्ठा धूमिल करने के उद्देश्य से AI या मॉर्फ्ड डिजिटल सामग्री तैयार करना जालसाजी का संज्ञेय अपराध है।');
      groundsList.push('2. BNS धारा 79: किसी महिला की मर्यादा व लज्जा को आहत करने के इरादे से कोई शब्द, इशारा या कृत्य करना दंडनीय है।');
      groundsList.push('3. IT Act धारा 66E व 67A: बिना सहमति के शारीरिक निजता का उल्लंघन और अश्लील सामग्री का प्रसारण गैर-जमानती अपराध है।');
      groundsList.push('4. BNS धारा 73: पीड़िता की पहचान की पूर्ण गोपनीयता कानून द्वारा संरक्षित है।');
    } else {
      groundsList.push('1. Under Section 336 BNS, electronic forgery intending that the forged synthetic media shall harm reputation is punishable with imprisonment up to 3 years and fine.');
      groundsList.push('2. Under Section 79 BNS, any word, gesture, or act intended to insult the modesty of a woman is a cognizable penal offense.');
      groundsList.push('3. Under Section 66E & 67A IT Act, capturing or transmitting non-consensual sexualized media attracts strict non-bailable penalties.');
      groundsList.push('4. Under Section 73 BNS, victim identity is safeguarded from public disclosure.');
    }
  } else if (incidentType === 'known_person_threats') {
    if (isHindi) {
      groundsList.push('1. BNS धारा 77 (दृश्यरतिकता): किसी व्यक्ति की निजी तस्वीरों को बिना सहमति रखना या प्रसारित करने की धमकी देना संज्ञेय अपराध है।');
      groundsList.push('2. BNS धारा 308 व 351: तस्वीरों को सार्वजनिक करने की धमकी देकर ब्लैकमेल करना जबरन वसूली और आपराधिक धमकी का अपराध है।');
      groundsList.push('3. IT Act धारा 66E: निजता के उल्लंघन पर 3 साल तक की जेल व ₹2 लाख तक जुर्माना है।');
      groundsList.push('4. BNS धारा 73: पीड़िता की पहचान पुलिस या सार्वजनिक अभिलेखों में गोपनीय रखना अनिवार्य है।');
    } else {
      groundsList.push('1. Under Section 77 BNS (Voyeurism) & Section 66E IT Act, capturing, retaining, or threatening dissemination of private intimate media violates bodily privacy.');
      groundsList.push('2. Under Sections 308 & 351 BNS, using threats of media disclosure to intimidate or coerce compliance constitutes extortion and criminal intimidation.');
      groundsList.push('3. Under Section 67A IT Act, actual or attempted transmission of sexually explicit material is non-bailable.');
      groundsList.push('4. Under Section 73 BNS, victim identity is safeguarded from public disclosure.');
    }
  } else {
    // Default: ncii_distribution
    if (isHindi) {
      groundsList.push('1. IT Rules 2021 नियम 3(2)(b): शिकायत मिलने के 24 घंटे के अंदर मध्यवर्ती प्लेटफॉर्म्स द्वारा सामग्री हटाना अनिवार्य है।');
      groundsList.push('2. IT Act धारा 67A: इलेक्ट्रॉनिक माध्यम से अश्लील सामग्री का प्रसारण गैर-जमानती अपराध है (5 साल तक की जेल व ₹10 लाख जुर्माना)।');
      groundsList.push('3. BNS धारा 77: बिना सहमति के अंतरंग सामग्री का प्रसार दृश्यरतिकता (Voyeurism) के तहत दंडनीय है।');
      groundsList.push('4. BNS धारा 73: पीड़िता की पहचान कानूनी रूप से संरक्षित है।');
    } else {
      groundsList.push('1. Under Rule 3(2)(b) IT Rules 2021, online intermediaries are legally obligated to disable access to non-consensual intimate imagery within 24 hours.');
      groundsList.push('2. Under Section 67A IT Act, transmitting sexually explicit material electronically is a cognizable, non-bailable offense punishable by up to 5 years imprisonment.');
      groundsList.push('3. Under Section 77 BNS (Voyeurism), capturing or distributing private acts without consent is punishable by 1 to 3 years imprisonment on first conviction.');
      groundsList.push('4. Under Section 73 BNS, publishing or disclosing the name or identity of the victim in public or police records is strictly prohibited by law.');
    }
  }

  return {
    statuteKeys: baseKeys,
    statutes,
    provisionsText: lines.join('\n'),
    groundsList,
    referenceSubjectString: pkg.unifiedCitationString[isHindi ? 'hi' : 'en']
  };
}
