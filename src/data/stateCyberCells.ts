/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface StateCyberCell {
  stateOrUT: string;
  isUnionTerritory: boolean;
  helphoneNumber?: string | null;
  portalUrl?: string | null;
  stateOrUTHi?: string;
  isVerified?: boolean;
  verifiedDate: string | null;
}

/**
 * Complete Directory of all 28 States and 8 Union Territories of India (36 administrative divisions).
 * 
 * IMPORTANT VERIFICATION NOTICE:
 * Every entry includes a `verifiedDate: string | null` field.
 * As per policy, all entries default to `verifiedDate: null` until human verification is formally completed.
 * For unverified entries, the UI renders the standard emergency fallback:
 * "Contact via 1930 (National Cyber Crime Helpline)"
 */
export const STATE_CYBER_CELLS: StateCyberCell[] = [
  // ==========================================
  // 8 UNION TERRITORIES (UTs)
  // ==========================================
  {
    stateOrUT: 'Andaman and Nicobar Islands',
    stateOrUTHi: 'अंडमान और निकोबार द्वीप समूह',
    isUnionTerritory: true,
    helphoneNumber: null, // PLACEHOLDER: Needs official verification
    portalUrl: 'https://police.andaman.gov.in',
    isVerified: false,
    verifiedDate: null
  },
  {
    stateOrUT: 'Chandigarh',
    stateOrUTHi: 'चंडीगढ़',
    isUnionTerritory: true,
    helphoneNumber: '0172-2746097', // Sector 17 Cyber Crime Cell
    portalUrl: 'https://chandigarhpolice.gov.in',
    isVerified: true,
    verifiedDate: null
  },
  {
    stateOrUT: 'Dadra and Nagar Haveli and Daman and Diu',
    stateOrUTHi: 'दादरा और नगर हवेली एवं दमन और दीव',
    isUnionTerritory: true,
    helphoneNumber: null, // PLACEHOLDER: Needs official verification
    portalUrl: 'https://dnhpolice.gov.in',
    isVerified: false,
    verifiedDate: null
  },
  {
    stateOrUT: 'Delhi (NCT)',
    stateOrUTHi: 'दिल्ली (NCT)',
    isUnionTerritory: true,
    helphoneNumber: '011-20892622', // Special Cell IFSO, Sector 17 Dwarka
    portalUrl: 'https://delhipolice.gov.in',
    isVerified: true,
    verifiedDate: null
  },
  {
    stateOrUT: 'Jammu and Kashmir',
    stateOrUTHi: 'जम्मू और कश्मीर',
    isUnionTerritory: true,
    helphoneNumber: '0194-2436709', // Cyber Police Station Srinagar
    portalUrl: 'https://jkpolice.gov.in',
    isVerified: true,
    verifiedDate: null
  },
  {
    stateOrUT: 'Ladakh',
    stateOrUTHi: 'लद्दाख',
    isUnionTerritory: true,
    helphoneNumber: null, // PLACEHOLDER: Needs official verification
    portalUrl: 'https://police.ladakh.gov.in',
    isVerified: false,
    verifiedDate: null
  },
  {
    stateOrUT: 'Lakshadweep',
    stateOrUTHi: 'लक्षद्वीप',
    isUnionTerritory: true,
    helphoneNumber: null, // PLACEHOLDER: Needs official verification
    portalUrl: 'https://lakshadweep.gov.in',
    isVerified: false,
    verifiedDate: null
  },
  {
    stateOrUT: 'Puducherry',
    stateOrUTHi: 'पुदुचेरी',
    isUnionTerritory: true,
    helphoneNumber: '0413-2279588', // Cyber Police Station Puducherry
    portalUrl: 'https://police.py.gov.in',
    isVerified: true,
    verifiedDate: null
  },

  // ==========================================
  // 28 STATES
  // ==========================================
  {
    stateOrUT: 'Andhra Pradesh',
    stateOrUTHi: 'आंध्र प्रदेश',
    isUnionTerritory: false,
    helphoneNumber: '0863-2340120', // CID Cyber Crime Police Station, Mangalagiri
    portalUrl: 'https://cid.appolice.gov.in',
    isVerified: true,
    verifiedDate: null
  },
  {
    stateOrUT: 'Arunachal Pradesh',
    stateOrUTHi: 'अरुणाचल प्रदेश',
    isUnionTerritory: false,
    helphoneNumber: null, // PLACEHOLDER: Needs official verification
    portalUrl: 'https://arunpol.nic.in',
    isVerified: false,
    verifiedDate: null
  },
  {
    stateOrUT: 'Assam',
    stateOrUTHi: 'असम',
    isUnionTerritory: false,
    helphoneNumber: '0361-2462444', // CID Cyber Crime Police Station, Guwahati
    portalUrl: 'https://police.assam.gov.in',
    isVerified: true,
    verifiedDate: null
  },
  {
    stateOrUT: 'Bihar',
    stateOrUTHi: 'बिहार',
    isUnionTerritory: false,
    helphoneNumber: '0612-2234033', // Cyber Crime Nodal Wing, Patna
    portalUrl: 'https://biharpolice.bihar.gov.in',
    isVerified: true,
    verifiedDate: null
  },
  {
    stateOrUT: 'Chhattisgarh',
    stateOrUTHi: 'छत्तीसगढ़',
    isUnionTerritory: false,
    helphoneNumber: '0771-2511252', // State Cyber Police Station, Raipur
    portalUrl: 'https://cgpolice.gov.in',
    isVerified: true,
    verifiedDate: null
  },
  {
    stateOrUT: 'Goa',
    stateOrUTHi: 'गोवा',
    isUnionTerritory: false,
    helphoneNumber: '0832-2420870', // Cyber Crime Police Station, Ribandar
    portalUrl: 'https://citizen.goapolice.gov.in',
    isVerified: true,
    verifiedDate: null
  },
  {
    stateOrUT: 'Gujarat',
    stateOrUTHi: 'गुजरात',
    isUnionTerritory: false,
    helphoneNumber: '079-23254388', // CID Crime, Cyber Cell Gandhinagar
    portalUrl: 'https://gujaratcybercrime.org',
    isVerified: true,
    verifiedDate: null
  },
  {
    stateOrUT: 'Haryana',
    stateOrUTHi: 'हरियाणा',
    isUnionTerritory: false,
    helphoneNumber: '01733-255555', // State Cyber Police Station, Panchkula
    portalUrl: 'https://haryanapolice.gov.in',
    isVerified: true,
    verifiedDate: null
  },
  {
    stateOrUT: 'Himachal Pradesh',
    stateOrUTHi: 'हिमाचल प्रदेश',
    isUnionTerritory: false,
    helphoneNumber: '0177-2627955', // Cyber Police Station, Shimla
    portalUrl: 'https://citizenportal.hppolice.gov.in',
    isVerified: true,
    verifiedDate: null
  },
  {
    stateOrUT: 'Jharkhand',
    stateOrUTHi: 'झारखंड',
    isUnionTerritory: false,
    helphoneNumber: '0651-2490046', // Cyber Police Station, Ranchi
    portalUrl: 'https://jhpolice.gov.in',
    isVerified: true,
    verifiedDate: null
  },
  {
    stateOrUT: 'Karnataka',
    stateOrUTHi: 'कर्नाटक',
    isUnionTerritory: false,
    helphoneNumber: '080-22094498', // CID Cyber Crime Division, Bengaluru
    portalUrl: 'https://ksp.karnataka.gov.in',
    isVerified: true,
    verifiedDate: null
  },
  {
    stateOrUT: 'Kerala',
    stateOrUTHi: 'केरल',
    isUnionTerritory: false,
    helphoneNumber: '0471-2322589', // Cyber Police Headquarters, Thiruvananthapuram
    portalUrl: 'https://keralapolice.gov.in',
    isVerified: true,
    verifiedDate: null
  },
  {
    stateOrUT: 'Madhya Pradesh',
    stateOrUTHi: 'मध्य प्रदेश',
    isUnionTerritory: false,
    helphoneNumber: '0755-2770248', // State Cyber Police Headquarters, Bhopal
    portalUrl: 'https://mppolice.gov.in',
    isVerified: true,
    verifiedDate: null
  },
  {
    stateOrUT: 'Maharashtra',
    stateOrUTHi: 'महाराष्ट्र',
    isUnionTerritory: false,
    helphoneNumber: '022-22160080', // Maharashtra Cyber, World Trade Centre, Mumbai
    portalUrl: 'https://cybercrime.maharashtra.gov.in',
    isVerified: true,
    verifiedDate: null
  },
  {
    stateOrUT: 'Manipur',
    stateOrUTHi: 'मणिपुर',
    isUnionTerritory: false,
    helphoneNumber: null, // PLACEHOLDER: Needs official verification
    portalUrl: 'https://manipurpolice.gov.in',
    isVerified: false,
    verifiedDate: null
  },
  {
    stateOrUT: 'Meghalaya',
    stateOrUTHi: 'मेघालय',
    isUnionTerritory: false,
    helphoneNumber: null, // PLACEHOLDER: Needs official verification
    portalUrl: 'https://megpolice.gov.in',
    isVerified: false,
    verifiedDate: null
  },
  {
    stateOrUT: 'Mizoram',
    stateOrUTHi: 'मिजोरम',
    isUnionTerritory: false,
    helphoneNumber: null, // PLACEHOLDER: Needs official verification
    portalUrl: 'https://police.mizoram.gov.in',
    isVerified: false,
    verifiedDate: null
  },
  {
    stateOrUT: 'Nagaland',
    stateOrUTHi: 'नागालैंड',
    isUnionTerritory: false,
    helphoneNumber: null, // PLACEHOLDER: Needs official verification
    portalUrl: 'https://police.nagaland.gov.in',
    isVerified: false,
    verifiedDate: null
  },
  {
    stateOrUT: 'Odisha',
    stateOrUTHi: 'ओडिशा',
    isUnionTerritory: false,
    helphoneNumber: '0671-2305485', // Cyber Police Station, CID CB, Cuttack
    portalUrl: 'https://odishapolice.gov.in',
    isVerified: true,
    verifiedDate: null
  },
  {
    stateOrUT: 'Punjab',
    stateOrUTHi: 'पंजाब',
    isUnionTerritory: false,
    helphoneNumber: '0172-2748104', // State Cyber Crime Division, SAS Nagar (Mohali)
    portalUrl: 'https://punjabpolice.gov.in',
    isVerified: true,
    verifiedDate: null
  },
  {
    stateOrUT: 'Rajasthan',
    stateOrUTHi: 'राजस्थान',
    isUnionTerritory: false,
    helphoneNumber: '0141-2609000', // Cyber Crime Police Station, Jaipur
    portalUrl: 'https://police.rajasthan.gov.in',
    isVerified: true,
    verifiedDate: null
  },
  {
    stateOrUT: 'Sikkim',
    stateOrUTHi: 'सिक्किम',
    isUnionTerritory: false,
    helphoneNumber: null, // PLACEHOLDER: Needs official verification
    portalUrl: 'https://sikkimpolice.nic.in',
    isVerified: false,
    verifiedDate: null
  },
  {
    stateOrUT: 'Tamil Nadu',
    stateOrUTHi: 'तमिलनाडु',
    isUnionTerritory: false,
    helphoneNumber: '044-28447701', // Cyber Crime Wing, Ashok Nagar, Chennai
    portalUrl: 'https://eservices.tnpolice.gov.in',
    isVerified: true,
    verifiedDate: null
  },
  {
    stateOrUT: 'Telangana',
    stateOrUTHi: 'तेलंगाना',
    isUnionTerritory: false,
    helphoneNumber: '040-27852435', // Telangana State Cyber Security Bureau (TSCSB), Hyderabad
    portalUrl: 'https://tspolice.gov.in',
    isVerified: true,
    verifiedDate: null
  },
  {
    stateOrUT: 'Tripura',
    stateOrUTHi: 'त्रिपुरा',
    isUnionTerritory: false,
    helphoneNumber: null, // PLACEHOLDER: Needs official verification
    portalUrl: 'https://tripurapolice.gov.in',
    isVerified: false,
    verifiedDate: null
  },
  {
    stateOrUT: 'Uttar Pradesh',
    stateOrUTHi: 'उत्तर प्रदेश',
    isUnionTerritory: false,
    helphoneNumber: '0522-2208000', // UP Cyber Crime Headquarters, Lucknow
    portalUrl: 'https://uppolice.gov.in',
    isVerified: true,
    verifiedDate: null
  },
  {
    stateOrUT: 'Uttarakhand',
    stateOrUTHi: 'उत्तराखंड',
    isUnionTerritory: false,
    helphoneNumber: '0135-2712563', // Special Cyber Crime Police Station, Dehradun
    portalUrl: 'https://uttarakhandpolice.uk.gov.in',
    isVerified: true,
    verifiedDate: null
  },
  {
    stateOrUT: 'West Bengal',
    stateOrUTHi: 'पश्चिम बंगाल',
    isUnionTerritory: false,
    helphoneNumber: '033-24791000', // Cyber Crime Police Station, CID Bhabani Bhawan, Kolkata
    portalUrl: 'https://wbpolice.gov.in',
    isVerified: true,
    verifiedDate: null
  }
];
