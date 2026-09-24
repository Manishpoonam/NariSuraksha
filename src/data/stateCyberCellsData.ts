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
    headquarters: 'UP Cyber Police HQ (Lucknow)',
    nodalOfficer: 'ADG / SP Cyber Crime UP Police',
    email: 'sp-cyber.lu@up.gov.in',
    address: 'Cyber Crime Police Station, Gomti Nagar Extension, Lucknow - 226010',
    specialWomenCell: {
      en: 'Women Powerline 1090 & Dedicated Cyber Crime PS in 75 Districts',
      hi: 'विमेन पावरलाइन 1090 एवं 75 जिलों में समर्पित साइबर पुलिस थाने'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '1090',
    women_helpline_coverage: 'Statewide (UP Women Power Line 1090 / 181)',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: null,
    women_whatsapp: null,
    alternate_number: '0522-2209867',
    alternate_number_label: 'State Cyber Crime Police Station, Lucknow',
    alternate_number_coverage: 'Statewide (Gomti Nagar Extension HQ)',
    coverage: 'Statewide',
    police_website: 'https://uppolice.gov.in',
    women_child_website: 'https://mahilakalyan.up.gov.in',
    source_url: 'https://uppolice.gov.in',
    last_verified: null,
    helplinePhone: '0522-2209867',
    websiteUrl: 'https://uppolice.gov.in',
    isVerified: false,
    verifiedDate: undefined
  },
  {
    id: 'rajasthan',
    state: 'Rajasthan',
    state_code: 'RJ',
    stateName: { en: 'Rajasthan', hi: 'राजस्थान' },
    region: 'North',
    isUnionTerritory: false,
    headquarters: 'State Cyber Crime Police Station, SCRB (Jaipur)',
    nodalOfficer: 'SP SCRB / Cyber Crime Rajasthan',
    email: 'sp.cybercrime@rajpolice.gov.in',
    address: 'SCRB Campus, Ghat Gate, Jaipur, Rajasthan - 302003',
    specialWomenCell: {
      en: 'G-Security Desk for Women Digital Safety',
      hi: 'महिला डिजिटल सुरक्षा जी-हेल्पडेस्क'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '181',
    women_helpline_coverage: 'Statewide',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: null,
    women_whatsapp: null,
    alternate_number: '0141-2609040',
    alternate_number_label: 'State Cyber Crime PS, Jaipur',
    alternate_number_coverage: 'Statewide (SCRB Jaipur)',
    coverage: 'Statewide',
    police_website: 'https://police.rajasthan.gov.in',
    women_child_website: 'https://wcd.rajasthan.gov.in',
    source_url: 'https://police.rajasthan.gov.in',
    last_verified: null,
    helplinePhone: '0141-2609040',
    websiteUrl: 'https://police.rajasthan.gov.in',
    isVerified: false,
    verifiedDate: undefined
  },
  {
    id: 'haryana',
    state: 'Haryana',
    state_code: 'HR',
    stateName: { en: 'Haryana', hi: 'हरियाणा' },
    region: 'North',
    isUnionTerritory: false,
    headquarters: 'State Cyber Crime Cell, State Crime Branch (Panchkula)',
    nodalOfficer: 'SP Cyber Crime SCB Haryana',
    email: 'cybercrime-scb.pol@hry.gov.in',
    address: 'State Crime Branch, Sector 6, Panchkula, Haryana - 134109',
    specialWomenCell: {
      en: 'Special Cyber Helpdesk for Crimes against Women',
      hi: 'महिला साइबर अपराध विशेष हेल्पडेस्क'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '181',
    women_helpline_coverage: 'Statewide',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: null,
    women_whatsapp: null,
    alternate_number: '0172-2587532',
    alternate_number_label: 'State Crime Branch Panchkula',
    alternate_number_coverage: 'Statewide (SCB Panchkula)',
    coverage: 'Statewide',
    police_website: 'https://haryanapolice.gov.in',
    women_child_website: 'https://wcdhry.gov.in',
    source_url: 'https://haryanapolice.gov.in',
    last_verified: null,
    helplinePhone: '0172-2587532',
    websiteUrl: 'https://haryanapolice.gov.in',
    isVerified: false,
    verifiedDate: undefined
  },
  {
    id: 'punjab',
    state: 'Punjab',
    state_code: 'PB',
    stateName: { en: 'Punjab', hi: 'पंजाब' },
    region: 'North',
    isUnionTerritory: false,
    headquarters: 'State Cyber Crime Cell, Bureau of Investigation (SAS Nagar/Mohali)',
    nodalOfficer: 'AIG / SP Cyber Crime Division',
    email: 'cybercrime-pb@nic.in',
    address: 'State Cyber Crime PS, Phase-4, SAS Nagar (Mohali), Punjab - 160059',
    specialWomenCell: {
      en: 'Women & Child Affairs Cyber Wing Punjab',
      hi: 'महिला एवं बाल साइबर विंग पंजाब'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '181',
    women_helpline_coverage: 'Statewide',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: null,
    women_whatsapp: null,
    alternate_number: '0172-2298700',
    alternate_number_label: 'State Cyber Crime PS Mohali',
    alternate_number_coverage: 'Statewide (Phase-4 SAS Nagar)',
    coverage: 'Statewide',
    police_website: 'https://punjabpolice.gov.in',
    women_child_website: 'https://sswcd.punjab.gov.in',
    source_url: 'https://punjabpolice.gov.in',
    last_verified: null,
    helplinePhone: '0172-2298700',
    websiteUrl: 'https://punjabpolice.gov.in',
    isVerified: false,
    verifiedDate: undefined
  },
  {
    id: 'himachal_pradesh',
    state: 'Himachal Pradesh',
    state_code: 'HP',
    stateName: { en: 'Himachal Pradesh', hi: 'हिमाचल प्रदेश' },
    region: 'North',
    isUnionTerritory: false,
    headquarters: 'State Cyber Crime Police Station, CID (Shimla)',
    nodalOfficer: 'SP Cyber Crime / DIG Crime CID HP',
    email: 'sp-cybercr-hp@nic.in',
    address: 'CID Cyber Crime Police Station, Chaura Maidan, Shimla, Himachal Pradesh - 171001',
    specialWomenCell: {
      en: 'Veerangana Mahila Cyber Helpdesk HP',
      hi: 'वीरांगना महिला साइबर हेल्पडेस्क हिमाचल'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '181',
    women_helpline_coverage: 'Statewide',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: null,
    women_whatsapp: null,
    alternate_number: '0177-2621714',
    alternate_number_label: 'CID Cyber Crime PS Shimla',
    alternate_number_coverage: 'Statewide (Chaura Maidan, Shimla)',
    coverage: 'Statewide',
    police_website: 'https://citizenportal.hppolice.gov.in',
    women_child_website: 'https://wcd.hp.gov.in',
    source_url: 'https://citizenportal.hppolice.gov.in',
    last_verified: null,
    helplinePhone: '0177-2621714',
    websiteUrl: 'https://citizenportal.hppolice.gov.in',
    isVerified: false,
    verifiedDate: undefined
  },
  {
    id: 'uttarakhand',
    state: 'Uttarakhand',
    state_code: 'UK',
    stateName: { en: 'Uttarakhand', hi: 'उत्तराखंड' },
    region: 'North',
    isUnionTerritory: false,
    headquarters: 'Special Task Force (STF) Cyber Crime Police Station (Dehradun)',
    nodalOfficer: 'SP Cyber Crime STF Uttarakhand',
    email: 'ccps.ddn@uttarakhandpolice.uk.gov.in',
    address: 'Cyber Crime Police Station, 6 Gandhi Road, Near Clock Tower, Dehradun - 248001',
    specialWomenCell: {
      en: 'Gauri Cyber Suraksha Desk for Women',
      hi: 'गौरी साइबर सुरक्षा महिला प्रकोष्ठ'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '181',
    women_helpline_coverage: 'Statewide',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: null,
    women_whatsapp: null,
    alternate_number: '0135-2655900',
    alternate_number_label: 'STF Cyber Crime PS Dehradun',
    alternate_number_coverage: 'Statewide (6 Gandhi Road, Dehradun)',
    coverage: 'Statewide',
    police_website: 'https://uttarakhandpolice.uk.gov.in',
    women_child_website: 'https://wecw.uk.gov.in',
    source_url: 'https://uttarakhandpolice.uk.gov.in',
    last_verified: null,
    helplinePhone: '0135-2655900',
    websiteUrl: 'https://uttarakhandpolice.uk.gov.in',
    isVerified: false,
    verifiedDate: undefined
  },

  // --- West Region ---
  {
    id: 'maharashtra',
    state: 'Maharashtra',
    state_code: 'MH',
    stateName: { en: 'Maharashtra', hi: 'महाराष्ट्र' },
    region: 'West',
    isUnionTerritory: false,
    headquarters: 'Maharashtra Cyber Crime Cell HQ (Mumbai)',
    nodalOfficer: 'Special IG / SP Cyber Maharashtra',
    email: 'cybercrime-mah@gov.in',
    address: 'Maharashtra Cyber, 32nd Floor, Centre 1, World Trade Centre, Cuffe Parade, Mumbai - 400005',
    specialWomenCell: {
      en: 'Maharashtra Cyber Security Project & Women Cyber Desk',
      hi: 'महाराष्ट्र साइबर सुरक्षा प्रोजेक्ट एवं महिला साइबर हेल्पडेस्क'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '181',
    women_helpline_coverage: 'Statewide',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: null,
    women_whatsapp: null,
    alternate_number: '022-22160080',
    alternate_number_label: 'Maharashtra Cyber HQ, World Trade Centre',
    alternate_number_coverage: 'Statewide (Cuffe Parade, Mumbai)',
    coverage: 'Statewide',
    police_website: 'https://mahacyber.gov.in',
    women_child_website: 'https://womenchild.maharashtra.gov.in',
    source_url: 'https://mahacyber.gov.in',
    last_verified: null,
    helplinePhone: '022-22160080',
    websiteUrl: 'https://mahacyber.gov.in',
    isVerified: false,
    verifiedDate: undefined
  },
  {
    id: 'gujarat',
    state: 'Gujarat',
    state_code: 'GJ',
    stateName: { en: 'Gujarat', hi: 'गुजरात' },
    region: 'West',
    isUnionTerritory: false,
    headquarters: 'Gujarat CID Crime Cyber Cell (Gandhinagar)',
    nodalOfficer: 'IGP / SP Cyber Crime CID',
    email: 'sp-cyber-cid@gujarat.gov.in',
    address: 'CID Crime, Police Bhavan, Sector 18, Gandhinagar, Gujarat - 382018',
    specialWomenCell: {
      en: 'Cyber AASHVAST (Women & Citizen Cyber Protection Project)',
      hi: 'साइबर आश्वस्त (महिला व नागरिक साइबर सुरक्षा पहल)'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '181',
    women_helpline_coverage: 'Statewide (Abhayam 181)',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: null,
    women_whatsapp: null,
    alternate_number: '079-23250798',
    alternate_number_label: 'CID Crime Cyber Cell Gandhinagar',
    alternate_number_coverage: 'Statewide (Police Bhavan, Sector 18)',
    coverage: 'Statewide',
    police_website: 'https://police.gujarat.gov.in',
    women_child_website: 'https://wcd.gujarat.gov.in',
    source_url: 'https://police.gujarat.gov.in',
    last_verified: null,
    helplinePhone: '079-23250798',
    websiteUrl: 'https://police.gujarat.gov.in',
    isVerified: false,
    verifiedDate: undefined
  },
  {
    id: 'goa',
    state: 'Goa',
    state_code: 'GA',
    stateName: { en: 'Goa', hi: 'गोवा' },
    region: 'West',
    isUnionTerritory: false,
    headquarters: 'Cyber Crime Police Station (Ribandar/Panaji)',
    nodalOfficer: 'SP Cyber Crime Goa Police',
    email: 'pi-cyber.pol@goa.gov.in',
    address: 'Cyber Crime Police Station, Old GMC Complex, Ribandar, Goa - 403006',
    specialWomenCell: {
      en: 'Goa Police Pink Force Cyber Support',
      hi: 'गोवा पुलिस पिंक फोर्स साइबर सपोर्ट'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '181',
    women_helpline_coverage: 'Statewide',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: null,
    women_whatsapp: null,
    alternate_number: '0832-2443214',
    alternate_number_label: 'Cyber Crime Police Station Ribandar',
    alternate_number_coverage: 'Statewide (Old GMC Complex, Ribandar)',
    coverage: 'Statewide',
    police_website: 'https://citizen.goapolice.gov.in',
    women_child_website: 'https://dwcd.goa.gov.in',
    source_url: 'https://citizen.goapolice.gov.in',
    last_verified: null,
    helplinePhone: '0832-2443214',
    websiteUrl: 'https://citizen.goapolice.gov.in',
    isVerified: false,
    verifiedDate: undefined
  },

  // --- South Region ---
  {
    id: 'karnataka',
    state: 'Karnataka',
    state_code: 'KA',
    stateName: { en: 'Karnataka', hi: 'कर्नाटक' },
    region: 'South',
    isUnionTerritory: false,
    headquarters: 'CID Cyber Crime Police Station (Bengaluru)',
    nodalOfficer: 'ADGP / SP Cyber Crime Division CID',
    email: 'ccps.cid@ksp.gov.in',
    address: 'CID Complex, Palace Road, High Grounds, Bengaluru, Karnataka - 560001',
    specialWomenCell: {
      en: 'Karnataka CID Cyber Crime Wing for Women Safety',
      hi: 'कर्नाटक सीआईडी महिला सुरक्षा साइबर सेल'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '181',
    women_helpline_coverage: 'Statewide',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: null,
    women_whatsapp: null,
    alternate_number: '080-22094498',
    alternate_number_label: 'CID Cyber Crime PS Bengaluru',
    alternate_number_coverage: 'Statewide (CID Complex, Palace Road)',
    coverage: 'Statewide',
    police_website: 'https://cid.karnataka.gov.in',
    women_child_website: 'https://dwcd.karnataka.gov.in',
    source_url: 'https://cid.karnataka.gov.in',
    last_verified: null,
    helplinePhone: '080-22094498',
    websiteUrl: 'https://cid.karnataka.gov.in',
    isVerified: false,
    verifiedDate: undefined
  },
  {
    id: 'tamil_nadu',
    state: 'Tamil Nadu',
    state_code: 'TN',
    stateName: { en: 'Tamil Nadu', hi: 'तमिलनाडु' },
    region: 'South',
    isUnionTerritory: false,
    headquarters: 'Cyber Crime Wing HQ, CBCID (Chennai)',
    nodalOfficer: 'ADGP / SP Cyber Crime Division',
    email: 'sp-cybercrime.tn@nic.in',
    address: 'CBCID Cyber Crime Wing, Old Commissioner Office, Pantheon Road, Egmore, Chennai - 600008',
    specialWomenCell: {
      en: 'Dedicated Anti-Cyber Harassment Wing for Women',
      hi: 'महिला विरोधी साइबर उत्पीड़न निवारण विंग'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '181',
    women_helpline_coverage: 'Statewide',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: null,
    women_whatsapp: null,
    alternate_number: '044-28447701',
    alternate_number_label: 'CBCID Cyber Crime Wing Chennai',
    alternate_number_coverage: 'Statewide (Egmore, Chennai)',
    coverage: 'Statewide',
    police_website: 'https://eservices.tnpolice.gov.in',
    women_child_website: 'https://swwcd.tn.gov.in',
    source_url: 'https://eservices.tnpolice.gov.in',
    last_verified: null,
    helplinePhone: '044-28447701',
    websiteUrl: 'https://eservices.tnpolice.gov.in',
    isVerified: false,
    verifiedDate: undefined
  },
  {
    id: 'telangana',
    state: 'Telangana',
    state_code: 'TG',
    stateName: { en: 'Telangana', hi: 'तेलंगाना' },
    region: 'South',
    isUnionTerritory: false,
    headquarters: 'TG Cyber Security Bureau (TGCSB), Hyderabad',
    nodalOfficer: 'Director / SP TGCSB',
    email: 'sp-cybercrimes-cid@telangana.gov.in',
    address: 'TG Cyber Security Bureau, DGP Office Complex, Lakdikapool, Hyderabad, Telangana - 500004',
    specialWomenCell: {
      en: 'SHE Teams Cyber Support Unit & TGCSB Women Cell',
      hi: 'शी टीम्स साइबर सपोर्ट यूनिट एवं टीजीसीएसबी महिला सेल'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '181',
    women_helpline_coverage: 'Statewide',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: null,
    women_whatsapp: '9490616555',
    women_whatsapp_coverage: 'Hyderabad City Police jurisdiction (SHE Teams)',
    alternate_number: '040-27852435',
    alternate_number_label: 'TG Cyber Security Bureau, Lakdikapool',
    alternate_number_coverage: 'Statewide (TGCSB HQ, Hyderabad)',
    coverage: 'Statewide',
    police_website: 'https://tgcsb.tspolice.gov.in',
    women_child_website: 'https://wdcw.tg.nic.in',
    source_url: 'https://tspolice.gov.in',
    last_verified: null,
    helplinePhone: '040-27852435',
    websiteUrl: 'https://tgcsb.tspolice.gov.in',
    isVerified: false,
    verifiedDate: undefined
  },
  {
    id: 'kerala',
    state: 'Kerala',
    state_code: 'KL',
    stateName: { en: 'Kerala', hi: 'केरल' },
    region: 'South',
    isUnionTerritory: false,
    headquarters: 'Cyber Crime Police HQ & Cyberdome (Thiruvananthapuram)',
    nodalOfficer: 'ADGP / SP Cyber Operations Kerala',
    email: 'cyberdome.pol@kerala.gov.in',
    address: 'Cyberdome, Technopark Campus / Cyber Ops HQ, Police Training College, Thiruvananthapuram - 695014',
    specialWomenCell: {
      en: 'Aparajitha Online Complaint Portal for Women Harassment',
      hi: 'अपराजिता महिला उत्पीड़न ऑनलाइन शिकायत डेस्क'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '181',
    women_helpline_coverage: 'Statewide (Mithra 181)',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: null,
    women_whatsapp: null,
    alternate_number: '0471-2322090',
    alternate_number_label: 'Cyber Operations HQ Thiruvananthapuram',
    alternate_number_coverage: 'Statewide (Police Training College, TVM)',
    coverage: 'Statewide',
    police_website: 'https://keralapolice.gov.in',
    women_child_website: 'https://wcd.kerala.gov.in',
    source_url: 'https://keralapolice.gov.in',
    last_verified: null,
    helplinePhone: '0471-2322090',
    websiteUrl: 'https://keralapolice.gov.in',
    isVerified: false,
    verifiedDate: undefined
  },
  {
    id: 'andhra_pradesh',
    state: 'Andhra Pradesh',
    state_code: 'AP',
    stateName: { en: 'Andhra Pradesh', hi: 'आंध्र प्रदेश' },
    region: 'South',
    isUnionTerritory: false,
    headquarters: 'CID Cyber Crime Police Station (Mangalagiri)',
    nodalOfficer: 'SP Cyber Crime CID AP',
    email: 'cid_cybercrime@ap.gov.in',
    address: 'CID Headquarters, DGP Office Complex, Mangalagiri, Guntur, Andhra Pradesh - 522503',
    specialWomenCell: {
      en: 'Disha Cyber Wing for Rapid Women Assistance',
      hi: 'दिशा साइबर विंग त्वरित महिला सुरक्षा'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '181',
    women_helpline_coverage: 'Statewide (Disha 181)',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: null,
    women_whatsapp: null,
    alternate_number: '0863-2340567',
    alternate_number_label: 'CID Cyber Crime PS Mangalagiri',
    alternate_number_coverage: 'Statewide (DGP Office Complex, Mangalagiri)',
    coverage: 'Statewide',
    police_website: 'https://cid.appolice.gov.in',
    women_child_website: 'https://wdcw.ap.gov.in',
    source_url: 'https://cid.appolice.gov.in',
    last_verified: null,
    helplinePhone: '0863-2340567',
    websiteUrl: 'https://cid.appolice.gov.in',
    isVerified: false,
    verifiedDate: undefined
  },

  // --- East Region ---
  {
    id: 'west_bengal',
    state: 'West Bengal',
    state_code: 'WB',
    stateName: { en: 'West Bengal', hi: 'पश्चिम बंगाल' },
    region: 'East',
    isUnionTerritory: false,
    headquarters: 'Cyber Crime Police Station, CID WB (Kolkata)',
    nodalOfficer: 'DIG / SP Cyber Crime CID',
    email: 'cidwbcyber@gmail.com',
    address: 'Bhabani Bhawan, 31 Belvedere Road, Alipore, Kolkata, West Bengal - 700027',
    specialWomenCell: {
      en: 'CID WB Special Cell for Crimes Against Women Online',
      hi: 'सीआईडी पश्चिम बंगाल महिला ऑनलाइन अपराध प्रकोष्ठ'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '1091',
    women_helpline_coverage: 'West Bengal (state-specific exception — no 181 line)',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: null,
    women_whatsapp: null,
    alternate_number: '033-24795900',
    alternate_number_label: 'CID Cyber Crime PS, Bhabani Bhawan, Kolkata',
    alternate_number_coverage: 'Statewide (Alipore, Kolkata)',
    coverage: 'Statewide',
    police_website: 'https://policewb.gov.in',
    women_child_website: 'https://wcd.wb.gov.in',
    source_url: 'https://policewb.gov.in',
    last_verified: null,
    helplinePhone: '033-24795900',
    websiteUrl: 'https://policewb.gov.in',
    isVerified: false,
    verifiedDate: undefined
  },
  {
    id: 'bihar',
    state: 'Bihar',
    state_code: 'BR',
    stateName: { en: 'Bihar', hi: 'बिहार' },
    region: 'East',
    isUnionTerritory: false,
    headquarters: 'Economic Offences Unit (EOU) Cyber Cell (Patna)',
    nodalOfficer: 'DIG / SP Cyber Crime EOU Bihar',
    email: 'cybercell-bih@nic.in',
    address: 'Economic Offences Unit, 3rd Floor, Technology Bhawan, Bailey Road, Patna, Bihar - 800001',
    specialWomenCell: {
      en: 'EOU Women Cyber Harassment Response Wing',
      hi: 'ईओयू महिला साइबर उत्पीड़न रिस्पॉन्स विंग'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '181',
    women_helpline_coverage: 'Statewide',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: null,
    women_whatsapp: null,
    alternate_number: '0612-2234044',
    alternate_number_label: 'EOU Cyber Cell, Technology Bhawan, Patna',
    alternate_number_coverage: 'Statewide (Bailey Road, Patna)',
    coverage: 'Statewide',
    police_website: 'https://eou.bihar.gov.in',
    women_child_website: 'https://wcdc.bihar.gov.in',
    source_url: 'https://eou.bihar.gov.in',
    last_verified: null,
    helplinePhone: '0612-2234044',
    websiteUrl: 'https://eou.bihar.gov.in',
    isVerified: false,
    verifiedDate: undefined
  },
  {
    id: 'odisha',
    state: 'Odisha',
    state_code: 'OD',
    stateName: { en: 'Odisha', hi: 'ओडिशा' },
    region: 'East',
    isUnionTerritory: false,
    headquarters: 'CID Crime Branch Cyber Cell (Cuttack)',
    nodalOfficer: 'SP Cyber Crime CID CB Odisha',
    email: 'cyberps.cidcb.orpol@nic.in',
    address: 'CID Crime Branch, Buxibazar, Cuttack, Odisha - 753001',
    specialWomenCell: {
      en: 'Women & Child Crime Cyber Protection Unit',
      hi: 'महिला व बाल अपराध साइबर सुरक्षा इकाई'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '181',
    women_helpline_coverage: 'Statewide',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: null,
    women_whatsapp: null,
    alternate_number: '0671-2305485',
    alternate_number_label: 'CID Crime Branch Cyber Cell Cuttack',
    alternate_number_coverage: 'Statewide (Buxibazar, Cuttack)',
    coverage: 'Statewide',
    police_website: 'https://odishapolice.gov.in',
    women_child_website: 'https://wcd.odisha.gov.in',
    source_url: 'https://odishapolice.gov.in',
    last_verified: null,
    helplinePhone: '0671-2305485',
    websiteUrl: 'https://odishapolice.gov.in',
    isVerified: false,
    verifiedDate: undefined
  },
  {
    id: 'jharkhand',
    state: 'Jharkhand',
    state_code: 'JH',
    stateName: { en: 'Jharkhand', hi: 'झारखंड' },
    region: 'East',
    isUnionTerritory: false,
    headquarters: 'Cyber Crime Police Station, CID (Ranchi)',
    nodalOfficer: 'SP Cyber Crime / IGP CID Jharkhand',
    email: 'cyberps@jhpolice.gov.in',
    address: 'Cyber Crime Police Station, Kutchery Chowk, Old Judicial Complex, Ranchi, Jharkhand - 834001',
    specialWomenCell: {
      en: 'Jharkhand Cyber Desk for Women Safety',
      hi: 'झारखंड महिला सुरक्षा साइबर डेस्क'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '181',
    women_helpline_coverage: 'Statewide',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: '9771432133',
    women_mobile_coverage: 'CID Cyber Crime Police Station Mobile, Ranchi',
    women_whatsapp: null,
    alternate_number: '0651-2490044',
    alternate_number_label: 'State Cyber Crime Police Station, Ranchi',
    alternate_number_coverage: 'Statewide (Kutchery Chowk, Ranchi)',
    coverage: 'Statewide',
    police_website: 'https://jhpolice.gov.in',
    women_child_website: 'https://wcdjharkhand.gov.in',
    source_url: 'https://jhpolice.gov.in',
    last_verified: null,
    helplinePhone: '0651-2490044',
    websiteUrl: 'https://jhpolice.gov.in',
    isVerified: false,
    verifiedDate: undefined
  },

  // --- Central Region ---
  {
    id: 'madhya_pradesh',
    state: 'Madhya Pradesh',
    state_code: 'MP',
    stateName: { en: 'Madhya Pradesh', hi: 'मध्य प्रदेश' },
    region: 'Central',
    isUnionTerritory: false,
    headquarters: 'State Cyber Crime Police Station HQ (Bhopal)',
    nodalOfficer: 'ADG / SP Cyber Crime Police MP',
    email: 'mpcyberpolice@mp.gov.in',
    address: 'State Cyber Police HQ, Bhadbhada Road, Near Suraj Nagar, Bhopal, MP - 462003',
    specialWomenCell: {
      en: 'C-Safety Women Digital Shield & Urja Desks',
      hi: 'सी-सेफ्टी महिला डिजिटल सुरक्षा एवं ऊर्जा डेस्क'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '181',
    women_helpline_coverage: 'Statewide',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: null,
    women_whatsapp: null,
    alternate_number: '0755-2770248',
    alternate_number_label: 'State Cyber Police HQ Bhopal',
    alternate_number_coverage: 'Statewide (Bhadbhada Road, Bhopal)',
    coverage: 'Statewide',
    police_website: 'https://cyberpolice.mp.gov.in',
    women_child_website: 'https://mpwcdmis.gov.in',
    source_url: 'https://cyberpolice.mp.gov.in',
    last_verified: null,
    helplinePhone: '0755-2770248',
    websiteUrl: 'https://cyberpolice.mp.gov.in',
    isVerified: false,
    verifiedDate: undefined
  },
  {
    id: 'chhattisgarh',
    state: 'Chhattisgarh',
    state_code: 'CG',
    stateName: { en: 'Chhattisgarh', hi: 'छत्तीसगढ़' },
    region: 'Central',
    isUnionTerritory: false,
    headquarters: 'State Cyber Police Station, PHQ (Nava Raipur)',
    nodalOfficer: 'DIG / AIG Cyber Technical Services',
    email: 'cybercell-phq.cg@gov.in',
    address: 'State Cyber Police Station, Police Headquarters, Sector 19, Nava Raipur, Atal Nagar - 492002',
    specialWomenCell: {
      en: 'Abhivyakti Women Cyber Safety Cell',
      hi: 'अभिव्यक्ति महिला साइबर सुरक्षा प्रकोष्ठ'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '181',
    women_helpline_coverage: 'Statewide',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: '9479191785',
    women_mobile_coverage: 'State Cyber Police Station Mobile, Nava Raipur',
    women_whatsapp: null,
    alternate_number: '0771-2428383',
    alternate_number_label: 'State Cyber Police Station, Nava Raipur',
    alternate_number_coverage: 'Statewide (Sector 19, Nava Raipur)',
    coverage: 'Statewide',
    police_website: 'https://cgpolice.gov.in',
    women_child_website: 'https://cgwcd.gov.in',
    source_url: 'https://cgpolice.gov.in',
    last_verified: null,
    helplinePhone: '0771-2428383',
    websiteUrl: 'https://cgpolice.gov.in',
    isVerified: false,
    verifiedDate: undefined
  },

  // --- North-East Region (8 States) ---
  {
    id: 'assam',
    state: 'Assam',
    state_code: 'AS',
    stateName: { en: 'Assam', hi: 'असम' },
    region: 'North-East',
    isUnionTerritory: false,
    headquarters: 'CID Cyber Police Station (Guwahati)',
    nodalOfficer: 'SP Cyber Crime Cell CID Assam',
    email: 'spp-cid@assampolice.gov.in',
    address: 'CID HQ, Ulubari, Guwahati, Assam - 781007',
    specialWomenCell: {
      en: 'Assam CID Women Cyber Safety Cell',
      hi: 'असम सीआईडी महिला साइबर सुरक्षा प्रकोष्ठ'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '181',
    women_helpline_coverage: 'Statewide',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: null,
    women_whatsapp: null,
    alternate_number: '0361-2462444',
    alternate_number_label: 'CID Cyber Police Station Guwahati',
    alternate_number_coverage: 'Statewide (Ulubari, Guwahati)',
    coverage: 'Statewide',
    police_website: 'https://police.assam.gov.in',
    women_child_website: 'https://wcd.assam.gov.in',
    source_url: 'https://police.assam.gov.in',
    last_verified: null,
    helplinePhone: '0361-2462444',
    websiteUrl: 'https://police.assam.gov.in',
    isVerified: false,
    verifiedDate: undefined
  },
  {
    id: 'arunachal_pradesh',
    state: 'Arunachal Pradesh',
    state_code: 'AR',
    stateName: { en: 'Arunachal Pradesh', hi: 'अरुणाचल प्रदेश' },
    region: 'North-East',
    isUnionTerritory: false,
    headquarters: 'Cyber Crime Police Station, PHQ (Itanagar)',
    nodalOfficer: 'SP Crime / SIT Arunachal Police',
    email: 'spsit@arunpol.nic.in',
    address: 'Police Headquarters, Cyber Crime Branch, Itanagar, Arunachal Pradesh - 791113',
    specialWomenCell: {
      en: 'Special SIT Cyber Crime Cell for Women',
      hi: 'महिला सुरक्षा विशेष साइबर एसआईटी'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '181',
    women_helpline_coverage: 'Statewide',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: null,
    women_whatsapp: null,
    alternate_number: '0360-2291065',
    alternate_number_label: 'PHQ Cyber Crime Branch Itanagar',
    alternate_number_coverage: 'Statewide (PHQ Itanagar)',
    coverage: 'Statewide',
    police_website: 'https://arunpol.nic.in',
    women_child_website: 'https://wcdarunachal.gov.in',
    source_url: 'https://arunpol.nic.in',
    last_verified: null,
    helplinePhone: '0360-2291065',
    websiteUrl: 'https://arunpol.nic.in',
    isVerified: false,
    verifiedDate: undefined
  },
  {
    id: 'manipur',
    state: 'Manipur',
    state_code: 'MN',
    stateName: { en: 'Manipur', hi: 'मणिपुर' },
    region: 'North-East',
    isUnionTerritory: false,
    headquarters: 'Cyber Crime Police Station, CID Crime Branch (Imphal)',
    nodalOfficer: 'SP CID (CB) / Cyber Crime Manipur',
    email: 'cybercrime-mn@gov.in',
    address: 'CID (Crime Branch) Police Station, Babupara, Imphal, Manipur - 795001',
    specialWomenCell: {
      en: 'Manipur Women Cyber Support Desk',
      hi: 'मणिपुर महिला साइबर सहायता डेस्क'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '181',
    women_helpline_coverage: 'Statewide',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: null,
    women_whatsapp: null,
    alternate_number: '0385-2451375',
    alternate_number_label: 'CID Crime Branch Cyber PS Imphal',
    alternate_number_coverage: 'Statewide (Babupara, Imphal)',
    coverage: 'Statewide',
    police_website: 'https://manipurpolice.gov.in',
    women_child_website: 'https://socialwelfare.mn.gov.in',
    source_url: 'https://manipurpolice.gov.in',
    last_verified: null,
    helplinePhone: '0385-2451375',
    websiteUrl: 'https://manipurpolice.gov.in',
    isVerified: false,
    verifiedDate: undefined
  },
  {
    id: 'meghalaya',
    state: 'Meghalaya',
    state_code: 'ML',
    stateName: { en: 'Meghalaya', hi: 'मेघालय' },
    region: 'North-East',
    isUnionTerritory: false,
    headquarters: 'Cyber Crime Wing CID (Shillong)',
    nodalOfficer: 'SP / In-charge Cyber Crime Wing',
    email: 'ccw-meg@gov.in',
    address: 'Cyber Crime Wing CID, Police Headquarters, Secretariat Hills, Shillong, Meghalaya - 793001',
    specialWomenCell: {
      en: 'Meghalaya Cyber Assistance Cell for Women',
      hi: 'मेघालय महिला साइबर सहायता प्रकोष्ठ'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '181',
    women_helpline_coverage: 'Statewide',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: '9402519391',
    women_mobile_coverage: 'Cyber Crime Wing CID Mobile, Shillong',
    women_whatsapp: null,
    alternate_number: '0364-2503259',
    alternate_number_label: 'Cyber Crime Wing CID Shillong',
    alternate_number_coverage: 'Statewide (Secretariat Hills, Shillong)',
    coverage: 'Statewide',
    police_website: 'https://megpolice.gov.in',
    women_child_website: 'https://megsocialwelfare.gov.in',
    source_url: 'https://megpolice.gov.in',
    last_verified: null,
    helplinePhone: '0364-2503259',
    websiteUrl: 'https://megpolice.gov.in',
    isVerified: false,
    verifiedDate: undefined
  },
  {
    id: 'mizoram',
    state: 'Mizoram',
    state_code: 'MZ',
    stateName: { en: 'Mizoram', hi: 'मिजोरम' },
    region: 'North-East',
    isUnionTerritory: false,
    headquarters: 'Cyber Crime Police Station, CID Crime (Aizawl)',
    nodalOfficer: 'SP CID (Crime) Mizoram',
    email: 'cidcrime-mz@nic.in',
    address: 'CID Crime Complex, Khatla, Aizawl, Mizoram - 796001',
    specialWomenCell: {
      en: 'Mizoram Cyber Crime Women Assistance Unit',
      hi: 'मिजोरम साइबर अपराध महिला सहायता इकाई'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '181',
    women_helpline_coverage: 'Statewide',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: '8119935420',
    women_mobile_coverage: 'CID Crime Cyber PS Mobile, Aizawl',
    women_whatsapp: null,
    alternate_number: '0389-2320416',
    alternate_number_label: 'CID Crime Cyber PS Aizawl',
    alternate_number_coverage: 'Statewide (Khatla, Aizawl)',
    coverage: 'Statewide',
    police_website: 'https://police.mizoram.gov.in',
    women_child_website: 'https://swd.mizoram.gov.in',
    source_url: 'https://police.mizoram.gov.in',
    last_verified: null,
    helplinePhone: '0389-2320416',
    websiteUrl: 'https://police.mizoram.gov.in',
    isVerified: false,
    verifiedDate: undefined
  },
  {
    id: 'nagaland',
    state: 'Nagaland',
    state_code: 'NL',
    stateName: { en: 'Nagaland', hi: 'नागालैंड' },
    region: 'North-East',
    isUnionTerritory: false,
    headquarters: 'State Cyber Crime Police Station, PHQ (Kohima)',
    nodalOfficer: 'DIG CID / SP Cyber Crime Nagaland',
    email: 'scrb-ngl@nic.in',
    address: 'Police Headquarters, P.R. Hill, Kohima, Nagaland - 797001',
    specialWomenCell: {
      en: 'Women & Child Cyber Protection Desk Nagaland',
      hi: 'महिला एवं बाल साइबर सुरक्षा डेस्क नागालैंड'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '181',
    women_helpline_coverage: 'Statewide',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: null,
    women_whatsapp: null,
    alternate_number: '0370-2243711',
    alternate_number_label: 'State Cyber Crime PS Kohima',
    alternate_number_coverage: 'Statewide (P.R. Hill, Kohima)',
    coverage: 'Statewide',
    police_website: 'https://police.nagaland.gov.in',
    women_child_website: 'https://socialwelfare.nagaland.gov.in',
    source_url: 'https://police.nagaland.gov.in',
    last_verified: null,
    helplinePhone: '0370-2243711',
    websiteUrl: 'https://police.nagaland.gov.in',
    isVerified: false,
    verifiedDate: undefined
  },
  {
    id: 'sikkim',
    state: 'Sikkim',
    state_code: 'SK',
    stateName: { en: 'Sikkim', hi: 'सिक्किम' },
    region: 'North-East',
    isUnionTerritory: false,
    headquarters: 'Cyber Crime Cell, Criminal Investigation Dept. (Gangtok)',
    nodalOfficer: 'SP CID / In-charge Cyber Crime PS',
    email: 'oc-cidpolice@sikkimpolice.nic.in',
    address: 'CID Cyber Police Station, PHQ Gangtok, East Sikkim - 737101',
    specialWomenCell: {
      en: 'Sikkim Police Women & Child Cyber Cell',
      hi: 'सिक्किम पुलिस महिला व बाल साइबर सेल'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '181',
    women_helpline_coverage: 'Statewide',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: '6294550027',
    women_mobile_coverage: 'CID Cyber Police Station Mobile, Gangtok',
    women_whatsapp: null,
    alternate_number: '03592-202087',
    alternate_number_label: 'CID Cyber Police Station Gangtok',
    alternate_number_coverage: 'Statewide (PHQ Gangtok)',
    coverage: 'Statewide',
    police_website: 'https://sikkimpolice.nic.in',
    women_child_website: 'https://sikkimsocialwelfare.gov.in',
    source_url: 'https://sikkimpolice.nic.in',
    last_verified: null,
    helplinePhone: '03592-202087',
    websiteUrl: 'https://sikkimpolice.nic.in',
    isVerified: false,
    verifiedDate: undefined
  },
  {
    id: 'tripura',
    state: 'Tripura',
    state_code: 'TR',
    stateName: { en: 'Tripura', hi: 'त्रिपुरा' },
    region: 'North-East',
    isUnionTerritory: false,
    headquarters: 'Cyber Crime Police Station, CID Complex (Agartala)',
    nodalOfficer: 'SP CID / Cyber Crime Officer Tripura',
    email: 'spcid-tri@nic.in',
    address: 'Cyber Crime Police Station, A.D. Nagar (Arundhati Nagar), Agartala, Tripura - 799003',
    specialWomenCell: {
      en: 'Tripura CID Women Cyber Safety Helpline',
      hi: 'त्रिपुरा सीआईडी महिला साइबर सुरक्षा हेल्पलाइन'
    },
    police_emergency: '112',
    police_coverage: 'Statewide',
    women_helpline: '181',
    women_helpline_coverage: 'Statewide',
    child_helpline: '1098',
    child_helpline_coverage: 'Statewide',
    women_mobile: '9436123828',
    women_mobile_coverage: 'CID Cyber Crime PS Mobile, Agartala',
    women_whatsapp: null,
    alternate_number: '0381-2376963',
    alternate_number_label: 'Cyber Crime Police Station Agartala',
    alternate_number_coverage: 'Statewide (A.D. Nagar, Agartala)',
    coverage: 'Statewide',
    police_website: 'https://tripurapolice.gov.in',
    women_child_website: 'https://socialwelfare.tripura.gov.in',
    source_url: 'https://tripurapolice.gov.in',
    last_verified: null,
    helplinePhone: '0381-2376963',
    websiteUrl: 'https://tripurapolice.gov.in',
    isVerified: false,
    verifiedDate: undefined
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
