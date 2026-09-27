/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface StateCyberCell {
  id: string;
  state: string;
  state_code: string;
  stateName: {
    en: string;
    hi: string;
  };
  region: 'North' | 'South' | 'East' | 'West' | 'Central' | 'North-East' | 'UT';
  isUnionTerritory: boolean;
  headquarters: string;
  nodalOfficer: string;
  email: string;
  address: string;
  specialWomenCell: {
    en: string;
    hi: string;
  };

  // Structured, Scope-Aware Helplines
  police_emergency: string | null;
  police_coverage?: string;

  women_helpline: string | null;
  women_helpline_coverage?: string;

  child_helpline: string | null;
  child_helpline_coverage?: string;

  women_mobile: string | null;
  women_mobile_coverage?: string;

  women_whatsapp: string | null;
  women_whatsapp_coverage?: string;

  alternate_number: string | null;
  alternate_number_label?: string;
  alternate_number_coverage?: string;

  coverage: string; // REQUIRED: exact scope, e.g. "Statewide", "UT-wide", "NCT of Delhi"
  police_website: string | null;
  women_child_website: string | null;
  source_url: string; // REQUIRED if any number is populated
  last_verified: string | null; // date, or null if unverified

  // Backwards compatibility helpers (derived at runtime to prevent data drift)
  helplinePhone?: string;
  websiteUrl?: string;
  isVerified?: boolean;
  verifiedDate?: string;
}

/**
 * Canonical selector function: derives the primary phone number from canonical fields.
 * Follows the canonical priority:
 * 1. women_helpline (since this is a women safety & rescue platform)
 * 2. women_mobile
 * 3. alternate_number
 * 4. police_emergency
 * 5. fallback '112'
 * Guarantees zero data drift between verified canonical fields and UI callers.
 */
export function getPrimaryPhone(cell: StateCyberCell): string {
  return (
    cell.women_helpline ||
    cell.women_mobile ||
    cell.alternate_number ||
    cell.police_emergency ||
    '112'
  );
}

/**
 * Canonical selector function: derives the primary official web portal from canonical fields.
 * Follows the canonical priority:
 * 1. police_website
 * 2. women_child_website
 * 3. source_url
 * 4. fallback 'https://cybercrime.gov.in'
 */
export function getPrimaryWebsite(cell: StateCyberCell): string {
  return (
    cell.police_website ||
    cell.women_child_website ||
    cell.source_url ||
    'https://cybercrime.gov.in'
  );
}

/**
 * Checks if a record has been verified against Tier 1/2 official sources.
 */
export function isRecordVerified(cell: StateCyberCell): boolean {
  return Boolean(cell.isVerified || (cell.last_verified && cell.last_verified.trim().length > 0));
}

/**
 * Returns the official verification date or null.
 */
export function getVerifiedDate(cell: StateCyberCell): string | null {
  return cell.last_verified || cell.verifiedDate || null;
}

export const RAW_STATE_CYBER_CELLS: StateCyberCell[] = [
  // ==========================================
  // 8 UNION TERRITORIES
  // ==========================================
  {
    id: 'delhi',
    state: 'Delhi (NCT)',
    state_code: 'DL',
    stateName: { en: 'Delhi (NCT)', hi: 'दिल्ली (NCT)' },
    region: 'UT',
    isUnionTerritory: true,
    headquarters: 'Cyber Crime Unit, IFSO, Special Cell, Delhi Police, Sector-16C, Dwarka, New Delhi - 110075',
    nodalOfficer: 'DCP/IFSO, Special Cell, Delhi Police',
    email: 'dcp-ifso@delhipolice.gov.in',
    address: 'Cyber Crime Unit, IFSO, Sector-16C, Dwarka, New Delhi - 110075',
    specialWomenCell: {
      en: 'Special Police Unit for Women & Children (SPUWAC), Delhi Police',
      hi: 'महिला एवं बाल के लिए विशेष पुलिस इकाई (SPUWAC), दिल्ली पुलिस'
    },
    police_emergency: '112',
    police_coverage: 'NCT of Delhi (Statewide, 24x7)',
    women_helpline: '1091',
    women_helpline_coverage: 'NCT of Delhi (Delhi Police Women Helpline, 24x7)',
    child_helpline: '1098',
    child_helpline_coverage: 'NCT of Delhi',
    women_mobile: null,
    women_whatsapp: '7835075012',
    alternate_number: '011-20892622',
    alternate_number_label: 'P.S. CWC / SPUWAC',
    alternate_number_coverage: 'NCT of Delhi (SPUWAC, Nanakpura)',
    coverage: 'NCT of Delhi',
    police_website: 'https://delhipolice.gov.in',
    women_child_website: 'https://spuwac.in',
    source_url: 'https://spuwac.in/helplines.html',
    last_verified: '2026-09-24',
    helplinePhone: '1091',
    websiteUrl: 'https://spuwac.in',
    isVerified: true,
    verifiedDate: '2026-09-24'
  },
  {
    id: 'chandigarh',
    state: 'Chandigarh',
    state_code: 'CH',
    stateName: { en: 'Chandigarh', hi: 'चंडीगढ़' },
    region: 'UT',
    isUnionTerritory: true,
    headquarters: 'Cyber Crime Investigation Cell (CCIC) Police Station, 17E, Sector 17, Chandigarh - 160017',
    nodalOfficer: 'Addl. Charge of DSP / Cyber Crime Cell, Chandigarh Police',
    email: 'cybercrime-chd@nic.in',
    address: 'Cyber Crime Investigation Cell (CCIC) Police Station, 17E, Sector 17, Chandigarh - 160017',
    specialWomenCell: {
      en: 'Women & Child Support Unit (W&CSU), Chandigarh Police',
      hi: 'महिला एवं बाल सहायता इकाई (W&CSU), चंडीगढ़ पुलिस'
    },
    police_emergency: '112',
    police_coverage: 'UT-wide',
    women_helpline: '1091',
    women_helpline_coverage: 'UT-wide (Chandigarh Police Women & Child Helpline)',
    child_helpline: '1098',
    child_helpline_coverage: 'UT-wide (Chandigarh Administration / Child Helpline)',
    women_mobile: '7087239005',
    women_whatsapp: null,
    alternate_number: '0172-2705011',
    alternate_number_label: 'Women & Child Helpline Alternate Number',
    alternate_number_coverage: 'UT-wide (Chandigarh Police Women & Child Support)',
    coverage: 'UT-wide',
    police_website: 'https://portal.chandigarhpolice.gov.in/public/',
    women_child_website: 'https://chdsw.gov.in',
    source_url: 'https://portal.chandigarhpolice.gov.in/Public/Home/EmergencyContacts',
    last_verified: '2026-09-24',
    helplinePhone: '1091',
    websiteUrl: 'https://portal.chandigarhpolice.gov.in/public/',
    isVerified: true,
    verifiedDate: '2026-09-24'
  },
  {
    id: 'jammu_kashmir',
    state: 'Jammu & Kashmir',
    state_code: 'JK',
    stateName: { en: 'Jammu & Kashmir', hi: 'जम्मू और कश्मीर' },
    region: 'UT',
    isUnionTerritory: true,

    headquarters: 'Cyber Police Station Kashmir Zone, 3rd Floor, P/S Shergari Complex, Srinagar & Cyber Police Station Jammu',
    nodalOfficer: 'SP PC Srinagar / Cyber Police Station Kashmir Zone',
    email: 'cyberpskmr@gmail.com',
    address: '3rd Floor, P/S Shergari Complex, Srinagar / Cyber Police Station Jammu, Jammu',

    specialWomenCell: {
      en: 'Special Cell For Women, J&K Police',
      hi: 'महिलाओं के लिए विशेष प्रकोष्ठ, जम्मू-कश्मीर पुलिस'
    },

    police_emergency: '112',
    police_coverage: 'UT-wide',

    women_helpline: '1091',
    women_helpline_coverage: 'UT-wide (Women Helpline)',

    child_helpline: '1098',
    child_helpline_coverage: 'UT-wide (Child Helpline)',

    women_mobile: null,
    women_whatsapp: null,

    alternate_number: '0191-2436709',
    alternate_number_label: 'Cyber Police Station Jammu',
    alternate_number_coverage: 'Jammu Division / Jammu',

    coverage: 'UT-wide',

    police_website: 'https://jkpolice.gov.in',
    women_child_website: 'https://socialwelfare.jk.gov.in',

    source_url: 'https://jkpolice.gov.in/specialwomen',

    last_verified: '2026-09-24',

    helplinePhone: '1091',
    websiteUrl: 'https://jkpolice.gov.in',

    isVerified: true,
    verifiedDate: '2026-09-24'
  },
  {
    id: 'ladakh',
    state: 'Ladakh',
    state_code: 'LA',
    stateName: { en: 'Ladakh', hi: 'लद्दाख' },
    region: 'UT',
    isUnionTerritory: true,

    headquarters: 'Cyber Police Station, Ladakh (existing Cyber Unit, Leh), UT Ladakh',
    nodalOfficer: 'Chief Executive Officer, Ladakh Cyber Crime Coordination Centre (L4C)',
    email: 'igp-ladakh@police.ladakh.gov.in',
    address: 'Ladakh Police Headquarters, Agling, Leh-Ladakh - 194101',

    specialWomenCell: {
      en: 'Women Police Stations, Ladakh Police (Leh & Kargil)',
      hi: 'महिला पुलिस थाने, लद्दाख पुलिस (लेह और कारगिल)'
    },

    police_emergency: '112',
    police_coverage: 'UT-wide',

    women_helpline: '1091',
    women_helpline_coverage: 'UT-wide (Ladakh Women Helpline)',

    child_helpline: '1098',
    child_helpline_coverage: 'UT-wide (Child Helpline under Mission Vatsalya)',

    women_mobile: '9544902328',
    women_mobile_coverage: 'Kargil District (Women Police Station)',

    women_whatsapp: null,

    alternate_number: '9541900291',
    alternate_number_label: 'Cyber-Crime Unit Leh',
    alternate_number_coverage: 'Leh District / Ladakh Cyber Police operations',

    coverage: 'UT-wide',

    police_website: 'https://police.ladakh.gov.in',
    women_child_website: 'https://socialwelfare.ladakh.gov.in',

    source_url: 'https://police.ladakh.gov.in/pages/emergency.html',

    last_verified: '2026-09-24',

    helplinePhone: '1091',
    websiteUrl: 'https://police.ladakh.gov.in',

    isVerified: true,
    verifiedDate: '2026-09-24'
  },
  {
    id: 'andaman_nicobar',
    state: 'Andaman & Nicobar Islands',
    state_code: 'AN',
    stateName: { en: 'Andaman & Nicobar Islands', hi: 'अंडमान और निकोबार द्वीप समूह' },
    region: 'UT',
    isUnionTerritory: true,

    headquarters: 'Crime Investigation Department (CID), Andaman & Nicobar Police, Port Blair',
    nodalOfficer: 'SP / SSP (CID), Andaman & Nicobar Police',
    email: 'spcid.and@nic.in',
    address: 'Crime Investigation Department (CID), Port Blair, Andaman & Nicobar Islands - 744101',

    specialWomenCell: {
      en: 'Crime Against Women Cell, Andaman & Nicobar Police',
      hi: 'महिलाओं के विरुद्ध अपराध प्रकोष्ठ, अंडमान एवं निकोबार पुलिस'
    },

    police_emergency: '112',
    police_coverage: 'UT-wide',

    women_helpline: '1091',
    women_helpline_coverage: 'UT-wide (A&N Police Women in Distress)',

    child_helpline: '1098',
    child_helpline_coverage: 'UT-wide (Child Helpline)',

    women_mobile: null,
    women_whatsapp: null,

    alternate_number: '181',
    alternate_number_label: 'Women Helpline - Mission Shakti / WCD Control Room',
    alternate_number_coverage: 'UT-wide (Directorate of Social Welfare, A&N Administration)',

    coverage: 'UT-wide',

    police_website: 'https://police.andamannicobar.gov.in',
    women_child_website: 'https://andssw1.and.nic.in/socialwelfare/',

    source_url: 'https://police.andamannicobar.gov.in/index.php/en/support-units/criminal-investigation-department.html',

    last_verified: '2026-09-24',

    helplinePhone: '1091',
    websiteUrl: 'https://police.andamannicobar.gov.in',

    isVerified: true,
    verifiedDate: '2026-09-24'
  },
  {
    id: 'puducherry',
    state: 'Puducherry',
    state_code: 'PY',
    stateName: { en: 'Puducherry', hi: 'पुदुचेरी' },
    region: 'UT',
    isUnionTerritory: true,

    headquarters: 'Cyber Crime Police Station, Multi-storied Building, Gorimedu, Puducherry - 605006',
    nodalOfficer: 'SP Cyber Crime Cell, Puducherry Police',
    email: 'cybercell-police@py.gov.in',
    address: 'Cyber Crime Police Station, Multi-storied Building, Gorimedu, Puducherry - 605006',

    specialWomenCell: {
      en: 'All Women Police Station (AWPS), Puducherry Police',
      hi: 'अखिल महिला पुलिस थाना (AWPS), पुदुचेरी पुलिस'
    },

    police_emergency: '112',
    police_coverage: 'UT-wide',

    women_helpline: '1091',
    women_helpline_coverage: 'UT-wide (Puducherry Women Helpline)',

    child_helpline: '1098',
    child_helpline_coverage: 'UT-wide (Puducherry Child Helpline)',

    women_mobile: null,
    women_whatsapp: null,

    alternate_number: '0413-2272581',
    alternate_number_label: 'SP Crime Against Women',
    alternate_number_coverage: 'UT-wide (Puducherry Police)',

    coverage: 'UT-wide',

    police_website: 'https://police.py.gov.in',
    women_child_website: 'https://wcd.py.gov.in',

    source_url: 'https://police.py.gov.in/Contact%20us/HELP%20CENTER.htm',

    last_verified: '2026-09-24',

    helplinePhone: '1091',
    websiteUrl: 'https://police.py.gov.in',

    isVerified: true,
    verifiedDate: '2026-09-24'
  },
  {
    id: 'dadra_nagar_daman_diu',
    state: 'Dadra & Nagar Haveli and Daman & Diu',
    state_code: 'DN',
    stateName: { en: 'Dadra & Nagar Haveli and Daman & Diu', hi: 'दादरा और नगर हवेली एवं दमन और दीव' },
    region: 'UT',
    isUnionTerritory: true,

    headquarters: 'Police Headquarters, Airport Road, Dunetha, Daman, DNH & DD',
    nodalOfficer: 'Deputy Inspector General of Police, UT of Dadra & Nagar Haveli and Daman & Diu',
    email: 'digp-daman-dd@nic.in',
    address: 'Police Headquarters, Airport Road, Dunetha, Daman, DNH & DD',

    specialWomenCell: {
      en: 'Crime Against Women Cell, Dadra & Nagar Haveli and Daman & Diu Police',
      hi: 'महिलाओं के विरुद्ध अपराध प्रकोष्ठ, दादरा और नगर हवेली एवं दमन और दीव पुलिस'
    },

    police_emergency: '112',
    police_coverage: 'UT-wide',

    women_helpline: '181',
    women_helpline_coverage: 'UT-wide (Women Help, UT Administration)',

    child_helpline: '1098',
    child_helpline_coverage: 'UT-wide (Child Helpline)',

    women_mobile: null,
    women_whatsapp: null,

    alternate_number: '0260-2633001',
    alternate_number_label: 'Crime Against Women Cell',
    alternate_number_coverage: 'UT-wide (Crime Against Women Cell; district cells in DNH, Daman and Diu)',

    coverage: 'UT-wide',

    police_website: 'https://police.ddd.gov.in',
    women_child_website: 'https://ddd.gov.in/social-welfare-department-2/',

    source_url: 'https://police.ddd.gov.in/organization/crime-against-women-cell/',

    last_verified: '2026-09-24',

    helplinePhone: '181',
    websiteUrl: 'https://police.ddd.gov.in',

    isVerified: true,
    verifiedDate: '2026-09-24'
  },
  {
    id: 'lakshadweep',
    state: 'Lakshadweep',
    state_code: 'LD',
    stateName: { en: 'Lakshadweep', hi: 'लक्षद्वीप' },
    region: 'UT',
    isUnionTerritory: true,
    headquarters: 'Police Headquarters, Kavaratti Island, UT of Lakshadweep - 682555',
    nodalOfficer: 'Superintendent of Police, Lakshadweep Police',
    email: 'lak-sop@nic.in',
    address: 'Police Headquarters, Kavaratti Island, UT of Lakshadweep - 682555',
    specialWomenCell: {
      en: 'Women & Child Development Department, Lakshadweep Administration',
      hi: 'महिला एवं बाल विकास विभाग, लक्षद्वीप प्रशासन'
    },
    police_emergency: '112',
    police_coverage: 'UT-wide',
    women_helpline: '1091',
    women_helpline_coverage: 'UT-wide (Women Helpline, Lakshadweep Administration)',
    child_helpline: '1098',
    child_helpline_coverage: 'UT-wide (Child Helpline, Lakshadweep Administration)',
    women_mobile: null,
    women_whatsapp: null,
    alternate_number: '04896-262273',
    alternate_number_label: 'Police Department Office',
    alternate_number_coverage: 'UT-wide (Lakshadweep Police Headquarters / Administration)',
    coverage: 'UT-wide',
    police_website: 'https://lakshadweep.gov.in/departments-new/police-department/',
    women_child_website: 'https://lakshadweep.gov.in/department-of-women-and-child-development/',
    source_url: 'https://lakshadweep.gov.in/departments-new/police-department/',
    last_verified: '2026-09-24',
    helplinePhone: '1091',
    websiteUrl: 'https://lakshadweep.gov.in/departments-new/police-department/',
    isVerified: true,
    verifiedDate: '2026-09-24'
  },

  // ==========================================
  // 28 STATES
  // ==========================================

  // --- North Region ---
  {
    id: 'uttar_pradesh',
    state: 'Uttar Pradesh',
    state_code: 'UP',
    stateName: { en: 'Uttar Pradesh', hi: 'उत्तर प्रदेश' },
    region: 'North',
    isUnionTerritory: false,

    headquarters: 'Cyber Crime Headquarters, Uttar Pradesh Police Headquarters, Lucknow',
    nodalOfficer: 'SP Cyber Crime Headquarters, Uttar Pradesh Police',
    email: 'sp-cyber.lu@up.gov.in',
    address: 'Police Headquarters, Gomti Nagar Extension, Lucknow, Uttar Pradesh',

    specialWomenCell: {
      en: 'Women & Child Security Organization (WCSO), Uttar Pradesh Police',
      hi: 'महिला एवं बाल सुरक्षा संगठन (WCSO), उत्तर प्रदेश पुलिस'
    },

    police_emergency: '112',
    police_coverage: 'Statewide',

    women_helpline: '1090',
    women_helpline_coverage: 'Statewide (UP Police Women Power Line 1090)',

    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',

    women_mobile: '9454401149',
    women_whatsapp: null,

    alternate_number: '0522-2325200',
    alternate_number_label: 'Mahila Samman Prakoshtha',
    alternate_number_coverage: 'Statewide (Uttar Pradesh Police WCSO)',

    coverage: 'Statewide',

    police_website: 'https://uppolice.gov.in',
    women_child_website: 'https://uppolice.gov.in/article/en-about-us-mahila-samman-prakostha',

    source_url: 'https://uppolice.gov.in/article/en-about-us-mahila-samman-prakostha',

    last_verified: '2026-09-27',

    helplinePhone: '1090',
    websiteUrl: 'https://uppolice.gov.in',

    isVerified: true,
    verifiedDate: '2026-09-27'
  },
  {
    id: 'rajasthan',
    state: 'Rajasthan',
    state_code: 'RJ',
    stateName: { en: 'Rajasthan', hi: 'राजस्थान' },
    region: 'North',
    isUnionTerritory: false,

    headquarters: 'Director General of Police, SCRB & Cyber Crime and Technical Services, Police Headquarters, Lal Kothi, Jaipur, Rajasthan - 302015',
    nodalOfficer: 'IGP SCRB, Rajasthan Police',
    email: 'sp.cybercrime@rajpolice.gov.in',
    address: 'Police Headquarters, Lal Kothi, Jaipur, Rajasthan - 302015',

    specialWomenCell: {
      en: 'Special Investigation Unit for Crimes Against Women (SIUCAW), Rajasthan Police',
      hi: 'महिलाओं के विरुद्ध अपराधों के लिए विशेष जांच इकाई (SIUCAW), राजस्थान पुलिस'
    },

    police_emergency: '112',
    police_coverage: 'Statewide',

    women_helpline: '1090',
    women_helpline_coverage: 'Statewide (Rajasthan Police Women & Senior Citizens / Garima Helpline)',

    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',

    women_mobile: null,
    women_whatsapp: '8764866090',

    alternate_number: '0141-2821288',
    alternate_number_label: 'SCRB & Cyber Crime and Technical Services Office',
    alternate_number_coverage: 'Statewide (Rajasthan Police Headquarters, Lal Kothi, Jaipur)',

    coverage: 'Statewide',

    police_website: 'https://police.rajasthan.gov.in',
    women_child_website: 'https://wcd.rajasthan.gov.in',

    source_url: 'https://police.rajasthan.gov.in/portal/contactInformation',

    last_verified: '2026-09-25',

    helplinePhone: '1090',
    websiteUrl: 'https://police.rajasthan.gov.in',

    isVerified: true,
    verifiedDate: '2026-09-25'
  },
  {
    id: 'punjab',
    state: 'Punjab',
    state_code: 'PB',
    stateName: {
      en: 'Punjab',
      hi: 'पंजाब'
    },
    region: 'North',
    isUnionTerritory: false,
    headquarters: 'State Cyber Crime Branch, Phase 4, Sector 59, Sahibzada Ajit Singh Nagar (Mohali), Punjab - 160059',
    nodalOfficer: 'SP / Cyber Crime, Punjab Police',
    email: 'aigcc@punjabpolice.gov.in',
    address: 'State Cyber Crime Branch, Phase 4, Sector 59, Sahibzada Ajit Singh Nagar (Mohali), Punjab - 160059',
    specialWomenCell: {
      en: 'Women Cell / Community Affairs Division, Punjab Police',
      hi: 'महिला प्रकोष्ठ / सामुदायिक मामले प्रभाग, पंजाब पुलिस'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '1091 / 181',
    women_helpline_coverage: 'Statewide (1091: Punjab Police Women Helpline; 181: Women Helpline / Punjab government support)',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide (Child Helpline under Mission Vatsalya)',
    women_mobile: null,
    women_whatsapp: null,
    alternate_number: '0172-2226258',
    alternate_number_label: 'State Cyber Crime Grievance Contact',
    alternate_number_coverage: 'Statewide (Punjab Cyber Crime)',
    coverage: 'Statewide',
    police_website: 'https://www.punjabpolice.gov.in',
    women_child_website: 'https://sswcd.punjab.gov.in/en',
    source_url: 'https://www.cybercrime.gov.in/webform/Crime_NodalGrivanceList.aspx',
    last_verified: '2026-09-27',
    helplinePhone: '1091',
    websiteUrl: 'https://www.punjabpolice.gov.in',
    isVerified: true,
    verifiedDate: '2026-09-27'
  },
  {
    id: 'haryana',
    state: 'Haryana',
    state_code: 'HR',
    stateName: { en: 'Haryana', hi: 'हरियाणा' },
    region: 'North',
    isUnionTerritory: false,

    headquarters: 'State Police Headquarters, Sector 6, Panchkula, Haryana - 134109',
    nodalOfficer: 'SP/Cyber, Haryana Police',
    email: 'sp-cybercrimephq.pol@hry.gov.in',
    address: 'State Police Headquarters, Sector 6, Panchkula, Haryana - 134109',

    specialWomenCell: {
      en: 'Women Safety Cell, Haryana Police',
      hi: 'महिला सुरक्षा प्रकोष्ठ, हरियाणा पुलिस'
    },

    police_emergency: '112',
    police_coverage: 'Statewide',

    women_helpline: '1091',
    women_helpline_coverage: 'Statewide (Haryana Police Women Helpline, 24x7)',

    child_helpline: '1098',
    child_helpline_coverage: 'Statewide (Haryana Women & Child Development Department)',

    women_mobile: null,
    women_whatsapp: null,

    alternate_number: '0172-2583095',
    alternate_number_label: 'SP / Women Safety, Haryana Police',
    alternate_number_coverage: 'Statewide (Haryana Police Women Safety Cell)',

    coverage: 'Statewide',

    police_website: 'https://haryanapolice.gov.in',
    women_child_website: 'https://wcdhry.gov.in',

    source_url: 'https://www.haryanapolice.gov.in/Women_Safety_Cell',

    last_verified: '2026-09-27',

    helplinePhone: '1091',
    websiteUrl: 'https://haryanapolice.gov.in',

    isVerified: true,
    verifiedDate: '2026-09-27'
  },
  {
    id: 'himachal_pradesh',
    state: 'Himachal Pradesh',
    state_code: 'HP',
    stateName: { en: 'Himachal Pradesh', hi: 'हिमाचल प्रदेश' },
    region: 'North',
    isUnionTerritory: false,
    headquarters: 'State CID, SDA Complex, Block No. 31, Kasumpti, Shimla, Himachal Pradesh - 171009',
    nodalOfficer: 'SP Cyber Crime, Himachal Pradesh Police',
    email: 'sp-cybercr-hp@nic.in',
    address: 'State CID, SDA Complex, Block No. 31, Kasumpti, Shimla, Himachal Pradesh - 171009',
    specialWomenCell: {
      en: 'Women Crime Unit, State CID, Himachal Pradesh Police',
      hi: 'महिला अपराध इकाई, राज्य सीआईडी, हिमाचल प्रदेश पुलिस'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '1091',
    women_helpline_coverage: 'Statewide (Himachal Pradesh Police Women Helpline)',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: null,
    women_whatsapp: null,
    alternate_number: '0177-2620331',
    alternate_number_label: 'Cyber Crime Police Station, Shimla',
    alternate_number_coverage: 'Statewide (State Cyber Crime Police Station, Shimla)',
    coverage: 'Statewide',
    police_website: 'https://citizenportal.hppolice.gov.in',
    women_child_website: 'https://wcd.hp.gov.in',
    source_url: 'https://citizenportal.hppolice.gov.in/citizen/openTeleDir.htm',
    last_verified: '2026-09-27',
    helplinePhone: '1091',
    websiteUrl: 'https://citizenportal.hppolice.gov.in',
    isVerified: true,
    verifiedDate: '2026-09-27'
  },
  {
    id: 'uttarakhand',
    state: 'Uttarakhand',
    state_code: 'UK',
    stateName: { en: 'Uttarakhand', hi: 'उत्तराखंड' },
    region: 'North',
    isUnionTerritory: false,

    headquarters: 'Special Task Force / Cyber Crime Unit, Uttarakhand Police, 12 Subhash Road, Dehradun - 248001',
    nodalOfficer: 'IG Cyber Crime / STF, Uttarakhand Police',
    email: 'spstf-uk@nic.in',
    address: 'Special Task Force, 12 Subhash Road, Dehradun, Uttarakhand - 248001',

    specialWomenCell: {
      en: 'Women Safety Cell, Uttarakhand Police',
      hi: 'महिला सुरक्षा प्रकोष्ठ, उत्तराखंड पुलिस'
    },

    police_emergency: '112',
    police_coverage: 'Statewide',

    women_helpline: '1090',
    women_helpline_coverage: 'Statewide (Uttarakhand Police Women Helpline)',

    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',

    women_mobile: '9411112780',
    women_mobile_coverage: 'Statewide (Uttarakhand Police Women Safety Cell)',

    women_whatsapp: '9411112780',

    alternate_number: '0135-2655900',
    alternate_number_label: 'Cyber Crime Police Station / STF',
    alternate_number_coverage: 'Statewide (Uttarakhand Cyber Crime / STF)',

    coverage: 'Statewide',

    police_website: 'https://uttarakhandpolice.uk.gov.in',
    women_child_website: 'https://wecd.uk.gov.in',

    source_url: 'https://uaoa.gov.in/sites/default/files/2025-09/Gaura%20Shakti_0.pdf',

    last_verified: '2026-09-27',

    helplinePhone: '1090',
    websiteUrl: 'https://uttarakhandpolice.uk.gov.in',

    isVerified: true,
    verifiedDate: '2026-09-27'
  },

  // --- West Region ---
  {
    id: 'maharashtra',
    state: 'Maharashtra',
    state_code: 'MH',
    stateName: { en: 'Maharashtra', hi: 'महाराष्ट्र' },
    region: 'West',
    isUnionTerritory: false,
    headquarters: 'Maharashtra State Cyber Department, 102 & 103, Sector 2, Millennium Business Park, Mahape, Navi Mumbai - 400710',
    nodalOfficer: 'Additional Director General of Police, Maharashtra State Cyber Department',
    email: 'ig.cbr-mah@gov.in',
    address: 'Maharashtra State Cyber Department, 102 & 103, Sector 2, Millennium Business Park, Mahape, Navi Mumbai - 400710',
    specialWomenCell: {
      en: 'Prevention of Crime Against Women & Children, Maharashtra Police',
      hi: 'महिलाओं एवं बच्चों के विरुद्ध अपराध की रोकथाम, महाराष्ट्र पुलिस'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '103 / 1091',
    women_helpline_coverage: '103: Mumbai, Thane & Navi Mumbai; 1091: Rest of Maharashtra',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: '8976004111, 8657222777',
    women_whatsapp: null,
    alternate_number: '022-45161635',
    alternate_number_label: 'Women Safety Helpline',
    alternate_number_coverage: 'Maharashtra Police Women Safety',
    coverage: 'Statewide',
    police_website: 'https://www.mahapolice.gov.in',
    women_child_website: 'https://womenchild.maharashtra.gov.in',
    source_url: 'https://www.mahapolice.gov.in/',
    last_verified: '2026-09-27',
    helplinePhone: '1091',
    websiteUrl: 'https://www.mahapolice.gov.in',
    isVerified: true,
    verifiedDate: '2026-09-27'
  },
  {
    id: 'gujarat',
    state: 'Gujarat',
    state_code: 'GJ',
    stateName: { en: 'Gujarat', hi: 'गुजरात' },
    region: 'West',
    isUnionTerritory: false,
    headquarters: 'State Cyber Crime Cell, CID Crime, 7th Floor, C Wing, Block-2, Karmyogi Bhavan, Sector-10A, Gandhinagar - 382010',
    nodalOfficer: 'SP, State Cyber Crime Cell, Gujarat Police',
    email: 'cc-cid@gujarat.gov.in',
    address: 'State Cyber Crime Cell, CID Crime, 7th Floor, C Wing, Block-2, Karmyogi Bhavan, Sector-10A, Gandhinagar - 382010',
    specialWomenCell: {
      en: 'Women Cell, CID Crime, Gujarat Police',
      hi: 'महिला सेल, सीआईडी क्राइम, गुजरात पुलिस'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '181',
    women_helpline_coverage: 'Statewide (Abhayam 181 Women Helpline, Gujarat Women & Child Development Department)',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: '9978405827',
    women_whatsapp: null,
    alternate_number: '079-23254421',
    alternate_number_label: 'Women Cell, Gujarat Police',
    alternate_number_coverage: 'Statewide (Women Cell, CID Crime, Gandhinagar)',
    coverage: 'Statewide',
    police_website: 'https://police.gujarat.gov.in',
    women_child_website: 'https://wcd.gujarat.gov.in',
    source_url: 'https://wcd.gujarat.gov.in/initiativedetails?id=280',
    last_verified: '2026-09-27',
    helplinePhone: '181',
    websiteUrl: 'https://police.gujarat.gov.in',
    isVerified: true,
    verifiedDate: '2026-09-27'
  },
  {
    id: 'goa',
    state: 'Goa',
    state_code: 'GA',
    stateName: { en: 'Goa', hi: 'गोवा' },
    region: 'West',
    isUnionTerritory: false,

    headquarters: 'Cyber Crime Police Station, Crime Branch, Ribandar, Goa - 403006',
    nodalOfficer: 'Superintendent of Police - Cyber Crime, Goa Police',
    email: 'spcyber@goapolice.gov.in',
    address: 'Cyber Crime Police Station, Crime Branch, Ribandar, Goa - 403006',

    specialWomenCell: {
      en: 'Women Police Station, Panaji, Goa Police',
      hi: 'महिला पुलिस थाना, पणजी, गोवा पुलिस'
    },

    police_emergency: '112',
    police_coverage: 'Statewide',

    women_helpline: '1091',
    women_helpline_coverage: 'Statewide (Goa Police Women Helpline)',

    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',

    women_mobile: '7875756214',
    women_mobile_coverage: 'Panaji (Women Police Station, Goa Police)',

    women_whatsapp: '7875756177',

    alternate_number: '0832-2428992',
    alternate_number_label: 'Women Police Station, Panaji',
    alternate_number_coverage: 'Panaji / Goa Police Women Police Station',

    coverage: 'Statewide',

    police_website: 'https://citizen.goapolice.gov.in',
    women_child_website: 'https://dwcd.goa.gov.in',

    source_url: 'https://citizen.goapolice.gov.in/web/guest/phone',

    last_verified: '2026-09-27',

    helplinePhone: '1091',
    websiteUrl: 'https://citizen.goapolice.gov.in',

    isVerified: true,
    verifiedDate: '2026-09-27'
  },

  // --- South Region ---
  {
    id: 'karnataka',
    state: 'Karnataka',
    state_code: 'KA',
    stateName: { en: 'Karnataka', hi: 'कर्नाटक' },
    region: 'South',
    isUnionTerritory: false,
    headquarters: 'Karnataka State Police Headquarters, No. 2, Nrupathunga Road, Bengaluru - 560001',
    nodalOfficer: 'DIG, Cyber Crimes, Narcotic, CID, Karnataka Police',
    email: 'spctrcid@ksp.gov.in',
    address: 'Karnataka State Police Headquarters, No. 2, Nrupathunga Road, Bengaluru - 560001',
    specialWomenCell: {
      en: 'Women Police Stations, Karnataka Police',
      hi: 'महिला पुलिस थाने, कर्नाटक पुलिस'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '1091',
    women_helpline_coverage: 'Statewide (Karnataka Police Women Helpline)',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: null,
    women_whatsapp: null,
    alternate_number: '080-22942475',
    alternate_number_label: 'Cyber Crimes, Narcotic, CID',
    alternate_number_coverage: 'Statewide (Karnataka Police CID Cyber Crime)',
    coverage: 'Statewide',
    police_website: 'https://ksp.karnataka.gov.in',
    women_child_website: 'https://dwcd.karnataka.gov.in',
    source_url: 'https://www.cybercrime.gov.in/webform/Crime_NodalGrivanceList.aspx',
    last_verified: '2026-09-27',
    helplinePhone: '1091',
    websiteUrl: 'https://ksp.karnataka.gov.in',
    isVerified: true,
    verifiedDate: '2026-09-27'
  },
  {
    id: 'tamil_nadu',
    state: 'Tamil Nadu',
    state_code: 'TN',
    stateName: { en: 'Tamil Nadu', hi: 'तमिलनाडु' },
    region: 'South',
    isUnionTerritory: false,

    headquarters: 'Tamil Nadu State Cyber Crime Coordination Centre (TN-S4C), Cyber Crime Wing Administrative Building, PTC Complex, Ashok Nagar, Chennai - 600083',

    nodalOfficer: 'ADGP, Cyber Crime Wing, Tamil Nadu Police',

    email: 'cbcyber@nic.in',

    address: 'Cyber Crime Wing Administrative Building, PTC Complex, Ashok Nagar, Chennai - 600083',

    specialWomenCell: {
      en: 'Singapen Special Force (SSF), Tamil Nadu Police',
      hi: 'सिंगप्पेन विशेष बल (SSF), तमिलनाडु पुलिस'
    },

    police_emergency: '112',
    police_coverage: 'Statewide',

    women_helpline: '1091',
    women_helpline_coverage: 'Statewide (Singapen Special Force / Tamil Nadu Police, 24x7)',

    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',

    women_mobile: null,

    women_whatsapp: null,

    alternate_number: '044-28447712',
    alternate_number_label: 'Superintendent of Police, Cyber Crime Division-I',
    alternate_number_coverage: 'Statewide (Tamil Nadu Police Cyber Crime Wing)',

    coverage: 'Statewide',

    police_website: 'https://eservices.tnpolice.gov.in',
    women_child_website: 'https://swwcd.tn.gov.in',

    source_url: 'https://www.stationeryprinting.tn.gov.in/gazette_list_details.php?date=MjAyNi0wOC0xMg%3D%3D&id=MzI%3D',

    last_verified: '2026-09-27',

    helplinePhone: '1091',

    websiteUrl: 'https://eservices.tnpolice.gov.in',

    isVerified: true,
    verifiedDate: '2026-09-27'
  },
  {
    id: 'telangana',
    state: 'Telangana',
    state_code: 'TG',
    stateName: { en: 'Telangana', hi: 'तेलंगाना' },
    region: 'South',
    isUnionTerritory: false,

    headquarters: 'Telangana Cyber Security Bureau (TGCSB), D Block, 3rd Floor, Secretariat, Government of Telangana, Hyderabad - 500022',
    nodalOfficer: 'Director, Telangana Cyber Security Bureau (TGCSB)',
    email: 'director-tscsb@tspolice.gov.in',
    address: 'D Block, 3rd Floor, Secretariat, Government of Telangana, Hyderabad - 500022',

    specialWomenCell: {
      en: 'Women Safety Wing, Telangana Police',
      hi: 'महिला सुरक्षा विंग, तेलंगाना पुलिस'
    },

    police_emergency: '112',
    police_coverage: 'Statewide',

    women_helpline: '181',
    women_helpline_coverage: 'Statewide (Telangana Women Safety / Women Helpline)',

    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',

    women_mobile: '8712656858',
    women_mobile_coverage: 'Statewide (Telangana Police Women Safety Wing)',

    women_whatsapp: '8712656856',

    alternate_number: '040-29320049',
    alternate_number_label: 'Director, Telangana Cyber Security Bureau',
    alternate_number_coverage: 'Statewide (TGCSB, Telangana Police)',

    coverage: 'Statewide',

    police_website: 'https://www.tspolice.gov.in',
    women_child_website: 'https://wdcw.tg.nic.in',

    source_url: 'https://womensafetywing.telangana.gov.in/contact-us/',

    last_verified: '2026-09-27',

    helplinePhone: '181',
    websiteUrl: 'https://www.tspolice.gov.in',

    isVerified: true,
    verifiedDate: '2026-09-27'
  },
  {
    id: 'kerala',
    state: 'Kerala',
    state_code: 'KL',
    stateName: { en: 'Kerala', hi: 'केरल' },
    region: 'South',
    isUnionTerritory: false,
    headquarters: 'Cyber Police Headquarters, Pattom, Thiruvananthapuram, Kerala - 695004',
    nodalOfficer: 'ADGP, Cyber Operations, Kerala Police',
    email: 'adgpcyberops.pol@kerala.gov.in',
    address: 'Cyber Police Headquarters, Pattom, Thiruvananthapuram, Kerala - 695004',
    specialWomenCell: {
      en: 'Women & Children Cell, Kerala Police',
      hi: 'महिला एवं बाल प्रकोष्ठ, केरल पुलिस'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '1091',
    women_helpline_coverage: 'Statewide (Kerala Police Women Helpline)',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: '9497996916',
    women_mobile_coverage: 'Statewide (AIG Women & Children Cell, Kerala Police)',
    women_whatsapp: null,
    alternate_number: '0471-2238100',
    alternate_number_label: 'Women & Children Cell, Kerala Police',
    alternate_number_coverage: 'Statewide (Kerala Police Women & Children Cell)',
    coverage: 'Statewide',
    police_website: 'https://keralapolice.gov.in',
    women_child_website: 'https://wcd.kerala.gov.in',
    source_url: 'https://keralapolice.gov.in/page/rank-wise-details',
    last_verified: '2026-09-27',
    helplinePhone: '1091',
    websiteUrl: 'https://keralapolice.gov.in',
    isVerified: true,
    verifiedDate: '2026-09-27'
  },
  {
    id: 'andhra_pradesh',
    state: 'Andhra Pradesh',
    state_code: 'AP',
    stateName: { en: 'Andhra Pradesh', hi: 'आंध्र प्रदेश' },
    region: 'South',
    isUnionTerritory: false,
    headquarters: 'CID Cyber Crime Police Station, Mangalagiri, Andhra Pradesh',
    nodalOfficer: 'SP Cyber Crimes, CID, Andhra Pradesh Police',
    email: 'cybercrimes1930@cid.appolice.gov.in',
    address: 'CID Headquarters, DGP Office Complex, Mangalagiri, Guntur, Andhra Pradesh - 522503',
    specialWomenCell: {
      en: 'Women & Child Safety Wing (SHAKTHI), Andhra Pradesh Police',
      hi: 'महिला एवं बाल सुरक्षा विंग (शक्ति), आंध्र प्रदेश पुलिस'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '181',
    women_helpline_coverage: 'Statewide (Andhra Pradesh Police Women & Child Safety Wing / SHAKTHI)',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: '7993485111',
    women_mobile_coverage: 'Statewide (AP Police Women & Child Safety Wing, 24x7)',
    women_whatsapp: null,
    alternate_number: '0863-2340559',
    alternate_number_label: 'SP Cyber Crimes, CID',
    alternate_number_coverage: 'Statewide (Andhra Pradesh Cyber Crime CID)',
    coverage: 'Statewide',
    police_website: 'https://appolice.gov.in',
    women_child_website: 'https://womenandchildsafetywing.appolice.gov.in',
    source_url: 'https://womenandchildsafetywing.appolice.gov.in/',
    last_verified: '2026-09-27',
    helplinePhone: '181',
    websiteUrl: 'https://womenandchildsafetywing.appolice.gov.in',
    isVerified: true,
    verifiedDate: '2026-09-27'
  },

  // --- East Region ---
  {
    id: 'west_bengal',
    state: 'West Bengal',
    state_code: 'WB',
    stateName: { en: 'West Bengal', hi: 'पश्चिम बंगाल' },
    region: 'East',
    isUnionTerritory: false,

    headquarters: 'West Bengal Cyber Crime Wing, Smart Connect, Action Area-II, 7th Rotary, New Town, West Bengal - 700161',
    nodalOfficer: 'ADG & IGP, Cyber Crime Wing, West Bengal Police',
    email: 'wbccw@policewb.gov.in',
    address: 'West Bengal Cyber Crime Wing, Smart Connect, Action Area-II, 7th Rotary, New Town, West Bengal - 700161',

    specialWomenCell: {
      en: 'Women & Child Protection Cell (WCPC), West Bengal Cyber Crime Wing',
      hi: 'महिला एवं बाल संरक्षण प्रकोष्ठ (WCPC), पश्चिम बंगाल साइबर क्राइम विंग'
    },

    police_emergency: '112',
    police_coverage: 'Statewide',

    women_helpline: '1091',
    women_helpline_coverage: 'Statewide (West Bengal Police Women Help Line)',

    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',

    women_mobile: null,
    women_whatsapp: null,

    alternate_number: '033-22021200',
    alternate_number_label: 'West Bengal Cyber Crime Wing Office',
    alternate_number_coverage: 'Statewide (WB Cyber Crime Wing, New Town)',

    coverage: 'Statewide',

    police_website: 'https://wbpolice.gov.in',
    women_child_website: 'https://wcdsw.wb.gov.in',

    source_url: 'https://cybercrimewing.wb.gov.in/ContactUs',

    last_verified: '2026-09-27',

    helplinePhone: '1091',
    websiteUrl: 'https://wbpolice.gov.in',

    isVerified: true,
    verifiedDate: '2026-09-27'
  },
  {
    id: 'bihar',
    state: 'Bihar',
    state_code: 'BR',
    stateName: { en: 'Bihar', hi: 'बिहार' },
    region: 'East',
    isUnionTerritory: false,

    headquarters: 'Bihar Police Headquarters, Sardar Patel Bhawan, Patna - 800023',
    nodalOfficer: 'SP, Cyber Crime, Bihar Police',
    email: 'cybercell-bih@nic.in',
    address: 'Bihar Police Headquarters, Sardar Patel Bhawan, Patna - 800023',

    specialWomenCell: {
      en: 'Women Protection Helpline & Women Help Desks, Bihar Police',
      hi: 'महिला सुरक्षा हेल्पलाइन एवं महिला सहायता डेस्क, बिहार पुलिस'
    },

    police_emergency: '112',
    police_coverage: 'Statewide',

    women_helpline: '1091 / 181',
    women_helpline_coverage: 'Statewide (1091: Bihar Police Women Protection Helpline; 181: Bihar WCDC Women Helpline, 24x7)',

    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',

    women_mobile: null,
    women_whatsapp: null,

    alternate_number: '0612-2238098',
    alternate_number_label: 'Cyber Crime / Grievance Contact, Bihar',
    alternate_number_coverage: 'Statewide (Bihar Cyber Crime)',

    coverage: 'Statewide',

    police_website: 'https://police.bihar.gov.in',
    women_child_website: 'https://wcdc.bihar.gov.in',

    source_url: 'https://www.cybercrime.gov.in/Webform/Crime_NodalGrivanceList.aspx',

    last_verified: '2026-09-27',

    helplinePhone: '1091',
    websiteUrl: 'https://police.bihar.gov.in',

    isVerified: true,
    verifiedDate: '2026-09-27'
  },
  {
    id: 'odisha',
    state: 'Odisha',
    state_code: 'OD',
    stateName: { en: 'Odisha', hi: 'ओडिशा' },
    region: 'East',
    isUnionTerritory: false,

    headquarters: 'Crime Against Women & Children Wing (CAW&CW), S.F.S.L Campus, Rasulgarh, Bhubaneswar - 751010',
    nodalOfficer: 'ADGP, CIDCB, Odisha Police',
    email: 'adgcaw.cw@odishapolice.gov.in',
    address: 'S.F.S.L Campus, Rasulgarh, Bhubaneswar - 751010',

    specialWomenCell: {
      en: 'Crime Against Women & Children Wing (CAW&CW), Odisha Police',
      hi: 'महिला एवं बाल अपराध विंग (CAW&CW), ओडिशा पुलिस'
    },

    police_emergency: '112',
    police_coverage: 'Statewide',

    women_helpline: '181',
    women_helpline_coverage: 'Statewide (Odisha Police / Women & Child Development Women Helpline)',

    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',

    women_mobile: null,
    women_whatsapp: null,

    alternate_number: '0674-2915790',
    alternate_number_label: 'Crime Against Women & Children Wing Office',
    alternate_number_coverage: 'Statewide (CAW&CW, Odisha Police)',

    coverage: 'Statewide',

    police_website: 'https://police.odisha.gov.in',
    women_child_website: 'https://wcd.odisha.gov.in',

    source_url: 'https://cawach.odisha.gov.in/',

    last_verified: '2026-09-27',

    helplinePhone: '181',
    websiteUrl: 'https://police.odisha.gov.in',

    isVerified: true,
    verifiedDate: '2026-09-27'
  },
  {
    id: 'jharkhand',
    state: 'Jharkhand',
    state_code: 'JH',
    stateName: { en: 'Jharkhand', hi: 'झारखंड' },
    region: 'East',
    isUnionTerritory: false,

    headquarters: 'Cyber Crime Police Station, Kutchery Chowk, Ranchi, Jharkhand',
    nodalOfficer: 'S.P. Cyber Crime, CID, Jharkhand Police',
    email: 'cyberps@jhpolice.gov.in',
    address: 'Cyber Crime Police Station, Kutchery Chowk, Ranchi, Jharkhand',

    specialWomenCell: {
      en: 'Mahila Help Line, Jharkhand Police',
      hi: 'महिला हेल्प लाइन, झारखंड पुलिस'
    },

    police_emergency: '112',
    police_coverage: 'Statewide',

    women_helpline: '181',
    women_helpline_coverage: 'Statewide (Jharkhand Women Helpline / Mahila Help Line)',

    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',

    women_mobile: '9771432103, 9431542379',
    women_mobile_coverage: 'Statewide (Jharkhand Police Mahila Help Line)',

    women_whatsapp: null,

    alternate_number: '0651-2220060',
    alternate_number_label: 'Cyber Crime Police Station, CID',
    alternate_number_coverage: 'Statewide (Jharkhand Police Cyber Crime)',

    coverage: 'Statewide',

    police_website: 'https://jhpolice.gov.in',
    women_child_website: 'https://www.jharkhand.gov.in/wcd',

    source_url: 'https://www.jhpolice.gov.in/contact-us',

    last_verified: '2026-09-27',

    helplinePhone: '181',
    websiteUrl: 'https://jhpolice.gov.in',

    isVerified: true,
    verifiedDate: '2026-09-27'
  },

  // --- Central Region ---
  {
    id: 'madhya_pradesh',
    state: 'Madhya Pradesh',
    state_code: 'MP',
    stateName: { en: 'Madhya Pradesh', hi: 'मध्य प्रदेश' },
    region: 'Central',
    isUnionTerritory: false,
    headquarters: 'MP Police Headquarters, Bhopal, Madhya Pradesh',
    nodalOfficer: 'IG Cyber, Madhya Pradesh Police',
    email: 'dig2-cybercell@mppolice.gov.in',
    address: 'MP Police Headquarters, Bhopal, Madhya Pradesh',
    specialWomenCell: {
      en: 'Crime Against Women Branch / URJA Help Desks, Madhya Pradesh Police',
      hi: 'महिलाओं के विरुद्ध अपराध शाखा / ऊर्जा सहायता डेस्क, मध्य प्रदेश पुलिस'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '1090',
    women_helpline_coverage: 'Statewide (Madhya Pradesh Police Women Helpline)',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: null,
    women_whatsapp: null,
    alternate_number: '0755-2677339',
    alternate_number_label: 'Cyber Help Line, Bhopal Police',
    alternate_number_coverage: 'Bhopal / Madhya Pradesh Cyber Support',
    coverage: 'Statewide',
    police_website: 'https://mppolice.gov.in',
    women_child_website: 'https://mpwcdmis.gov.in',
    source_url: 'https://dial112.mppolice.gov.in/about.php',
    last_verified: '2026-09-27',
    helplinePhone: '1090',
    websiteUrl: 'https://mppolice.gov.in',
    isVerified: true,
    verifiedDate: '2026-09-27'
  },
  {
    id: 'chhattisgarh',
    state: 'Chhattisgarh',
    state_code: 'CG',
    stateName: { en: 'Chhattisgarh', hi: 'छत्तीसगढ़' },
    region: 'Central',
    isUnionTerritory: false,
    headquarters: 'Police Headquarters, Atal Nagar, Nava Raipur, Chhattisgarh - 492002',
    nodalOfficer: 'AIG, Cyber Technical Services, Chhattisgarh Police',
    email: 'aigtech-phq.cg@gov.in',
    address: 'Police Headquarters, Atal Nagar, Nava Raipur, Chhattisgarh - 492002',
    specialWomenCell: {
      en: 'Women Cell & Child Rights Cell, Chhattisgarh Police',
      hi: 'महिला प्रकोष्ठ एवं बाल अधिकार प्रकोष्ठ, छत्तीसगढ़ पुलिस'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '1091',
    women_helpline_coverage: 'Statewide (Chhattisgarh Police Women Helpline)',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: null,
    women_whatsapp: null,
    alternate_number: '0771-2511989',
    alternate_number_label: 'DIG (Technical Services), Chhattisgarh Police',
    alternate_number_coverage: 'Statewide (Chhattisgarh Police Cyber Technical Services)',
    coverage: 'Statewide',
    police_website: 'https://cgpolice.gov.in',
    women_child_website: 'https://cgwcd.gov.in',
    source_url: 'https://www.cybercrime.gov.in/webform/Crime_NodalGrivanceList.aspx',
    last_verified: '2026-09-27',
    helplinePhone: '1091',
    websiteUrl: 'https://cgpolice.gov.in',
    isVerified: true,
    verifiedDate: '2026-09-27'
  },

  // --- North-East Region (8 States) ---
  {
    id: 'assam',
    state: 'Assam',
    state_code: 'AS',
    stateName: { en: 'Assam', hi: 'असम' },
    region: 'North-East',
    isUnionTerritory: false,

    headquarters: 'CID Headquarters, Ulubari, Guwahati, Assam - 781007',
    nodalOfficer: 'SP Cyber Crime-2, CID, Assam Police',
    email: 'sp-cid-cyber2@assampolice.gov.in',
    address: 'CID Headquarters, Ulubari, Guwahati, Assam - 781007',

    specialWomenCell: {
      en: 'Crime Against Women & Children, CID, Assam Police',
      hi: 'महिलाओं एवं बच्चों के विरुद्ध अपराध, सीआईडी, असम पुलिस'
    },

    police_emergency: '112',
    police_coverage: 'Statewide',

    women_helpline: '9345215029 / 0361-2521242',
    women_helpline_coverage: 'Statewide (Assam Police Women Helpline)',

    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',

    women_mobile: '9345215029',
    women_mobile_coverage: 'Statewide (Assam Police Women Helpline)',

    women_whatsapp: null,

    alternate_number: '0361-2521618',
    alternate_number_label: 'IGP, CID / Cyber Crime Grievance Contact',
    alternate_number_coverage: 'Statewide (Assam Police CID Cyber Crime)',

    coverage: 'Statewide',

    police_website: 'https://police.assam.gov.in',
    women_child_website: 'https://womenandchild.assam.gov.in',

    source_url: 'https://police.assam.gov.in/frontimpotentdata/womens-rights-and-helpline',

    last_verified: '2026-09-27',

    helplinePhone: '9345215029',
    websiteUrl: 'https://police.assam.gov.in',

    isVerified: true,
    verifiedDate: '2026-09-27'
  },
  {
    id: 'arunachal_pradesh',
    state: 'Arunachal Pradesh',
    state_code: 'AR',
    stateName: { en: 'Arunachal Pradesh', hi: 'अरुणाचल प्रदेश' },
    region: 'North-East',
    isUnionTerritory: false,
    headquarters: 'Police Headquarters, Itanagar, Arunachal Pradesh - 791111',
    nodalOfficer: 'SP SIT / Cyber Crime, Arunachal Pradesh Police',
    email: 'spsit@arunpol.nic.in',
    address: 'Police Headquarters, Itanagar, Arunachal Pradesh - 791111',
    specialWomenCell: {
      en: 'Women Help Desks & Women Police Stations, Arunachal Pradesh Police',
      hi: 'महिला सहायता डेस्क एवं महिला पुलिस थाने, अरुणाचल प्रदेश पुलिस'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '1091',
    women_helpline_coverage: 'Statewide (Arunachal Pradesh Police Women Helpline)',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: null,
    women_whatsapp: null,
    alternate_number: '9436040703',
    alternate_number_label: 'IGP (Crime) / Cyber Crime Grievance Contact',
    alternate_number_coverage: 'Statewide (Arunachal Pradesh Police)',
    coverage: 'Statewide',
    police_website: 'https://arunpol.nic.in',
    women_child_website: 'http://arunachalswwcd.gov.in',
    source_url: 'https://www.cybercrime.gov.in/webform/Crime_NodalGrivanceList.aspx',
    last_verified: '2026-09-27',
    helplinePhone: '1091',
    websiteUrl: 'https://arunpol.nic.in',
    isVerified: true,
    verifiedDate: '2026-09-27'
  },
  {
    id: 'manipur',
    state: 'Manipur',
    state_code: 'MN',
    stateName: { en: 'Manipur', hi: 'मणिपुर' },
    region: 'North-East',
    isUnionTerritory: false,
    headquarters: 'Manipur Police Headquarters, Mantripukhri, Imphal East, Manipur - 795002',
    nodalOfficer: 'SP Cyber Crime, Manipur Police',
    email: 'sp-cybercrime.mn@manipur.gov.in',
    address: 'Manipur Police Headquarters, Mantripukhri, Imphal East, Manipur - 795002',
    specialWomenCell: {
      en: 'Crime Against Women & Children (CAW & C), Manipur Police',
      hi: 'महिलाओं एवं बच्चों के विरुद्ध अपराध (CAW & C), मणिपुर पुलिस'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '181',
    women_helpline_coverage: 'Statewide (Manipur Police Women Helpline)',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: null,
    women_whatsapp: null,
    alternate_number: '0385-2810210',
    alternate_number_label: 'SP Cyber Crime, Manipur Police',
    alternate_number_coverage: 'Statewide (Manipur Police Cyber Crime)',
    coverage: 'Statewide',
    police_website: 'https://manipurpolice.gov.in',
    women_child_website: 'https://www.socialwelfare.mn.gov.in',
    source_url: 'https://manipurpolice.gov.in/?page_id=3261',
    last_verified: '2026-09-27',
    helplinePhone: '181',
    websiteUrl: 'https://manipurpolice.gov.in',
    isVerified: true,
    verifiedDate: '2026-09-27'
  },
  {
    id: 'meghalaya',
    state: 'Meghalaya',
    state_code: 'ML',
    stateName: { en: 'Meghalaya', hi: 'मेघालय' },
    region: 'North-East',
    isUnionTerritory: false,
    headquarters: 'Police Headquarters, Secretariat Hills, Shillong - 793001, Meghalaya',
    nodalOfficer: 'DSP, Cyber Crime Wing, Meghalaya Police',
    email: 'ccw-meg@gov.in',
    address: 'Police Headquarters, Secretariat Hills, Shillong - 793001, Meghalaya',
    specialWomenCell: {
      en: 'Women Police Stations & Crime Against Women (CAW) Cell, Meghalaya Police',
      hi: 'महिला पुलिस थाने एवं महिलाओं के विरुद्ध अपराध (CAW) प्रकोष्ठ, मेघालय पुलिस'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '1091 / 181',
    women_helpline_coverage: 'Statewide (1091: Police women helpline; 181: Meghalaya Social Welfare Women Helpline)',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: null,
    women_whatsapp: null,
    alternate_number: '9402519391',
    alternate_number_label: 'SP (Cyber), Meghalaya Police / Cyber Crime Grievance Contact',
    alternate_number_coverage: 'Statewide (Meghalaya Police Cyber Crime)',
    coverage: 'Statewide',
    police_website: 'https://megpolice.gov.in',
    women_child_website: 'https://megsocialwelfare.gov.in',
    source_url: 'https://www.cybercrime.gov.in/webform/Crime_NodalGrivanceList.aspx',
    last_verified: '2026-09-27',
    helplinePhone: '1091',
    websiteUrl: 'https://megpolice.gov.in',
    isVerified: true,
    verifiedDate: '2026-09-27'
  },
  {
    id: 'mizoram',
    state: 'Mizoram',
    state_code: 'MZ',
    stateName: { en: 'Mizoram', hi: 'मिजोरम' },
    region: 'North-East',
    isUnionTerritory: false,
    headquarters: 'Police Headquarters, Khatla, Aizawl, Mizoram - 796001',
    nodalOfficer: 'SP Cyber Crime, Mizoram Police',
    email: 'cybercrime.sp@mizoram.gov.in',
    address: 'Police Headquarters, Khatla, Aizawl, Mizoram - 796001',
    specialWomenCell: {
      en: 'All Women Police Station, Aizawl, Mizoram Police',
      hi: 'अखिल महिला पुलिस थाना, आइजोल, मिजोरम पुलिस'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '1091',
    women_helpline_coverage: 'Statewide (Mizoram Police Women Helpline)',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: null,
    women_whatsapp: null,
    alternate_number: '0389-2334682',
    alternate_number_label: 'DGP / Cyber Crime Grievance Contact',
    alternate_number_coverage: 'Statewide (Mizoram Police)',
    coverage: 'Statewide',
    police_website: 'https://police.mizoram.gov.in',
    women_child_website: 'https://socialwelfare.mizoram.gov.in',
    source_url: 'https://www.cybercrime.gov.in/webform/Crime_NodalGrivanceList.aspx',
    last_verified: '2026-09-27',
    helplinePhone: '1091',
    websiteUrl: 'https://police.mizoram.gov.in',
    isVerified: true,
    verifiedDate: '2026-09-27'
    },
  {
    id: 'nagaland',
    state: 'Nagaland',
    state_code: 'NL',
    stateName: { en: 'Nagaland', hi: 'नागालैंड' },
    region: 'North-East',
    isUnionTerritory: false,
    headquarters: 'Nagaland Police Headquarters, P.R. Hill, Kohima - 797001, Nagaland',
    nodalOfficer: 'IGP CID, Nagaland Police',
    email: 'spcyber-ngl@gov.in',
    address: 'Nagaland Police Headquarters, P.R. Hill, Kohima - 797001, Nagaland',
    specialWomenCell: {
      en: 'Women Police Stations, Nagaland Police',
      hi: 'महिला पुलिस थाने, नागालैंड पुलिस'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '181',
    women_helpline_coverage: 'Statewide (Nagaland Women Helpline, 24x7)',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: '9485239098',
    women_mobile_coverage: 'Statewide (Nagaland Women Helpline alternate mobile)',
    women_whatsapp: null,
    alternate_number: '6009308003',
    alternate_number_label: 'ADGP (L&O) / Cyber Crime Grievance Contact',
    alternate_number_coverage: 'Statewide (Nagaland Police Cyber Crime)',
    coverage: 'Statewide',
    police_website: 'https://police.nagaland.gov.in',
    women_child_website: 'https://dsw.nagaland.gov.in',
    source_url: 'https://www.cybercrime.gov.in/Webform/Crime_NodalGrivanceList.aspx',
    last_verified: '2026-09-27',
    helplinePhone: '181',
    websiteUrl: 'https://police.nagaland.gov.in',
    isVerified: true,
    verifiedDate: '2026-09-27'
  },
  {
    id: 'sikkim',
    state: 'Sikkim',
    state_code: 'SK',
    stateName: { en: 'Sikkim', hi: 'सिक्किम' },
    region: 'North-East',
    isUnionTerritory: false,

    headquarters: 'Police Headquarters, Gangtok, Sikkim',
    nodalOfficer: 'DIGP, CB-CID, Sikkim Police',
    email: 'spcid@sikkimpolice.nic.in',
    address: 'Police Headquarters, Gangtok, Sikkim',

    specialWomenCell: {
      en: 'Crime Against Women, Weaker Sections & PCR Cell, CB-CID, Sikkim Police',
      hi: 'महिलाओं, कमजोर वर्गों के विरुद्ध अपराध एवं पीसीआर प्रकोष्ठ, सीबी-सीआईडी, सिक्किम पुलिस'
    },

    police_emergency: '112',
    police_coverage: 'Statewide',

    women_helpline: '181',
    women_helpline_coverage: 'Statewide (Sikkim Police Women Helpline)',

    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',

    women_mobile: null,
    women_whatsapp: null,

    alternate_number: '9046245066',
    alternate_number_label: 'Police Inspector / CID Cyber Crime Grievance Contact',
    alternate_number_coverage: 'Statewide (Sikkim Police Cyber Crime / CID)',

    coverage: 'Statewide',

    police_website: 'https://police.sikkim.gov.in',
    women_child_website: 'https://www.womenandchild.sikkim.gov.in',

    source_url: 'https://police.sikkim.gov.in/visitor/telephonepolice',

    last_verified: '2026-09-27',

    helplinePhone: '181',
    websiteUrl: 'https://police.sikkim.gov.in',

    isVerified: true,
    verifiedDate: '2026-09-27'
  },
  {
  id: 'tripura',
  state: 'Tripura',
  state_code: 'TR',
  stateName: { en: 'Tripura', hi: 'त्रिपुरा' },
  region: 'North-East',
  isUnionTerritory: false,
  headquarters: 'Old Secretariat Complex, Agartala, Tripura - 799001',
  nodalOfficer: 'SP Cyber Crime, Tripura Police',
  email: 'spcybercrime@tripurapolice.nic.in',
  address: 'Old Secretariat Complex, Agartala, Tripura - 799001',
  specialWomenCell: {
    en: 'Women Police Stations & Crime Against Women Unit, Tripura Police',
    hi: 'महिला पुलिस थाने एवं महिलाओं के विरुद्ध अपराध इकाई, त्रिपुरा पुलिस'
  },
  police_emergency: '112',
  police_coverage: 'Statewide',
  women_helpline: '1091 / 181',
  women_helpline_coverage: 'Statewide (1091: Women Helpline; 181: Tripura Women Helpline under Social Welfare / WCD)',
  child_helpline: '1098',
  child_helpline_coverage: 'Statewide',
  women_mobile: null,
  women_whatsapp: null,
  alternate_number: '0381-2376979',
  alternate_number_label: 'SP (SCRB) / Cyber Crime Grievance Contact',
  alternate_number_coverage: 'Statewide (Tripura Police Cyber Crime / SCRB)',
  coverage: 'Statewide',
  police_website: 'https://police.tripura.gov.in',
  women_child_website: 'https://socialwelfare.tripura.gov.in',
  source_url: 'https://www.cybercrime.gov.in/webform/Crime_NodalGrivanceList.aspx',
  last_verified: '2026-09-27',
  helplinePhone: '1091',
  websiteUrl: 'https://police.tripura.gov.in',
  isVerified: true,
  verifiedDate: '2026-09-27'
 }
];

/**
 * Single Canonical Source of Truth:
 * STATE_CYBER_CELLS exports the full list of 36 States & UTs with all fields strictly typed.
 * To eliminate data drift risk, UI compatibility fields (helplinePhone, websiteUrl, isVerified, verifiedDate)
 * are derived directly from canonical fields at load time.
 */
export const STATE_CYBER_CELLS: StateCyberCell[] = RAW_STATE_CYBER_CELLS.map((cell) => ({
  ...cell,
  helplinePhone: getPrimaryPhone(cell),
  websiteUrl: getPrimaryWebsite(cell),
  isVerified: isRecordVerified(cell),
  verifiedDate: getVerifiedDate(cell) || undefined,
}));

/**
 * Consistency Validator: Flags any raw record whose static compatibility fields
 * conflict with the canonical source fields.
 */
export function validateStateCyberCellsConsistency(): { valid: boolean; warnings: string[] } {
  const warnings: string[] = [];
  for (const cell of RAW_STATE_CYBER_CELLS) {
    const canonicalPhone = getPrimaryPhone(cell);
    const canonicalWebsite = getPrimaryWebsite(cell);
    if (cell.helplinePhone && cell.helplinePhone !== canonicalPhone) {
      warnings.push(`[Data Drift] ${cell.state}: legacy helplinePhone (${cell.helplinePhone}) drifted from canonical getPrimaryPhone (${canonicalPhone})`);
    }
    if (cell.websiteUrl && cell.websiteUrl !== canonicalWebsite) {
      warnings.push(`[Data Drift] ${cell.state}: legacy websiteUrl (${cell.websiteUrl}) drifted from canonical getPrimaryWebsite (${canonicalWebsite})`);
    }
  }
  return { valid: warnings.length === 0, warnings };
}
