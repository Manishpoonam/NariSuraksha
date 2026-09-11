export interface StateCyberCell {
  id: string;
  stateName: { en: string; hi: string };
  region: 'North' | 'South' | 'East' | 'West' | 'Central' | 'North-East' | 'UT';
  headquarters: string;
  nodalOfficer: string;
  helplinePhone: string;
  email: string;
  websiteUrl: string;
  address: string;
  specialWomenCell: { en: string; hi: string };
}

export const STATE_CYBER_CELLS: StateCyberCell[] = [
  // --- UNION TERRITORIES (8 UTs) ---
  {
    id: 'delhi',
    stateName: { en: 'Delhi (NCT)', hi: 'दिल्ली (NCT)' },
    region: 'UT',
    headquarters: 'IFSO (Special Cell), Delhi Police, Dwarka Sector 17',
    nodalOfficer: 'DCP / ACP Cyber Crime IFSO',
    helplinePhone: '011-20892622 / 1930 / 112',
    email: 'cybercell-delhi@nic.in',
    websiteUrl: 'https://delhipolice.gov.in',
    address: 'Special Cell IFSO, Police Station Complex, Sector-17, Dwarka, New Delhi - 110078',
    specialWomenCell: {
      en: 'Specialized Cyber Women & Child Safety Wing (IFSO)',
      hi: 'विशेष साइबर महिला एवं बाल सुरक्षा विंग (IFSO)'
    }
  },
  {
    id: 'chandigarh',
    stateName: { en: 'Chandigarh', hi: 'चंडीगढ़' },
    region: 'UT',
    headquarters: 'Cyber Crime Investigation Cell (Sector 17, Chandigarh)',
    nodalOfficer: 'DSP Cyber Crime Cell',
    helplinePhone: '0172-2746097 / 1930 / 112',
    email: 'cybercell-chd@nic.in',
    websiteUrl: 'https://chandigarhpolice.gov.in',
    address: 'Police Headquarters, Additional Deluxe Building, Sector 9D / Sector 17, Chandigarh - 160009',
    specialWomenCell: {
      en: 'Women & Child Safety Cyber Desk Chandigarh',
      hi: 'महिला व बाल सुरक्षा साइबर डेस्क'
    }
  },
  {
    id: 'jammu_kashmir',
    stateName: { en: 'Jammu & Kashmir', hi: 'जम्मू और कश्मीर' },
    region: 'UT',
    headquarters: 'Cyber Police Station Cargo (Srinagar) & Cyber PS Jammu',
    nodalOfficer: 'SP Cyber Crime J&K Police',
    helplinePhone: '0194-2451597 / 0191-2566780 / 1930',
    email: 'cyberpolice-jk@nic.in',
    websiteUrl: 'https://jkpolice.gov.in',
    address: 'Cyber Police Station, Cargo Complex, Shergarhi, Srinagar - 190001 / ZPHQ Complex, Jammu',
    specialWomenCell: {
      en: 'J&K Cyber Special Women Support Desk',
      hi: 'जम्मू-कश्मीर साइबर विशेष महिला सहायता डेस्क'
    }
  },
  {
    id: 'ladakh',
    stateName: { en: 'Ladakh', hi: 'लद्दाख' },
    region: 'UT',
    headquarters: 'Cyber Crime Unit, District Police Lines Leh & Kargil',
    nodalOfficer: 'SP / DSP Cyber Crime Cell Ladakh',
    helplinePhone: '01982-252200 / 9541900291 / 1930',
    email: 'cybercrime-ladakh@nic.in',
    websiteUrl: 'https://police.ladakh.gov.in',
    address: 'Cyber Crime Police Station, District Police Lines, Skalzangling, Leh, UT Ladakh - 194101',
    specialWomenCell: {
      en: 'Women Cyber Assistance Cell Ladakh',
      hi: 'महिला साइबर सहायता प्रकोष्ठ लद्दाख'
    }
  },
  {
    id: 'andaman_nicobar',
    stateName: { en: 'Andaman & Nicobar Islands', hi: 'अंडमान और निकोबार द्वीप समूह' },
    region: 'UT',
    headquarters: 'Cyber Crime Cell, CID Complex, Port Blair',
    nodalOfficer: 'SP CID / Cyber Crime Officer',
    helplinePhone: '03192-232100 / 9531856083 / 1930',
    email: 'spcid.and@nic.in',
    websiteUrl: 'https://police.andaman.gov.in',
    address: 'CID Police Station, Aberdeen Bazaar, Port Blair, Andaman & Nicobar - 744101',
    specialWomenCell: {
      en: 'A&N Islands Women Cyber Safety Unit',
      hi: 'अंडमान एवं निकोबार महिला साइबर सुरक्षा यूनिट'
    }
  },
  {
    id: 'puducherry',
    stateName: { en: 'Puducherry', hi: 'पुदुचेरी' },
    region: 'UT',
    headquarters: 'Cyber Crime Police Station, Police Complex, Gorimedu',
    nodalOfficer: 'SP Cyber Crime Puducherry Police',
    helplinePhone: '0413-2277700 / 0413-2231343 / 1930',
    email: 'cyberps.py@gov.in',
    websiteUrl: 'https://police.py.gov.in',
    address: 'Cyber Crime Police Station, Police Complex, Gorimedu, Puducherry - 605006',
    specialWomenCell: {
      en: 'Puducherry Women & Child Cyber Cell',
      hi: 'पुदुचेरी महिला एवं बाल साइबर प्रकोष्ठ'
    }
  },
  {
    id: 'dadra_nagar_daman_diu',
    stateName: { en: 'Dadra & Nagar Haveli and Daman & Diu', hi: 'दादरा और नगर हवेली एवं दमन और दीव' },
    region: 'UT',
    headquarters: 'Cyber Crime Cell PHQ, Airport Road, Daman / Silvassa',
    nodalOfficer: 'SP / Addl. SP Cyber Crime',
    helplinePhone: '0260-2220140 / 0260-2640905 / 1930',
    email: 'phq-dd@nic.in',
    websiteUrl: 'https://ddd.gov.in',
    address: 'Police Headquarters, Airport Road, Dunetha, Daman - 396210 / Cyber Cell, Silvassa',
    specialWomenCell: {
      en: 'Women Police Helpline & Cyber Support Wing',
      hi: 'महिला पुलिस हेल्पलाइन एवं साइबर सहायता विंग'
    }
  },
  {
    id: 'lakshadweep',
    stateName: { en: 'Lakshadweep', hi: 'लक्षद्वीप' },
    region: 'UT',
    headquarters: 'Cyber Crime Cell, Police HQ Kavaratti',
    nodalOfficer: 'DSP (HQ) / SP Cyber Lakshadweep',
    helplinePhone: '04896-262258 / 1930 / 112',
    email: 'cctns-lk@nic.in',
    websiteUrl: 'https://lakshadweeppolice.gov.in',
    address: 'Police Headquarters, Kavaratti Island, UT of Lakshadweep - 682555',
    specialWomenCell: {
      en: 'Lakshadweep Women Safety Cyber Cell',
      hi: 'लक्षद्वीप महिला सुरक्षा साइबर प्रकोष्ठ'
    }
  },

  // --- 28 STATES ---
  // North Region
  {
    id: 'uttar_pradesh',
    stateName: { en: 'Uttar Pradesh', hi: 'उत्तर प्रदेश' },
    region: 'North',
    headquarters: 'UP Cyber Police HQ (Lucknow)',
    nodalOfficer: 'ADG / SP Cyber Crime UP Police',
    helplinePhone: '0522-2209867 / 1090 / 1930',
    email: 'sp-cyber.lu@up.gov.in',
    websiteUrl: 'https://uppolice.gov.in',
    address: 'Cyber Crime Police Station, Gomti Nagar Extension, Lucknow - 226010',
    specialWomenCell: {
      en: 'Women Powerline 1090 & Dedicated Cyber Crime PS in 75 Districts',
      hi: 'विमेन पावरलाइन 1090 एवं 75 जिलों में समर्पित साइबर पुलिस थाने'
    }
  },
  {
    id: 'rajasthan',
    stateName: { en: 'Rajasthan', hi: 'राजस्थान' },
    region: 'North',
    headquarters: 'State Cyber Crime Police Station, SCRB (Jaipur)',
    nodalOfficer: 'SP SCRB / Cyber Crime Rajasthan',
    helplinePhone: '0141-2609040 / 1930 / 112',
    email: 'sp.cybercrime@rajpolice.gov.in',
    websiteUrl: 'https://police.rajasthan.gov.in',
    address: 'SCRB Campus, Ghat Gate, Jaipur, Rajasthan - 302003',
    specialWomenCell: {
      en: 'G-Security Desk for Women Digital Safety',
      hi: 'महिला डिजिटल सुरक्षा जी-हेल्पडेस्क'
    }
  },
  {
    id: 'haryana',
    stateName: { en: 'Haryana', hi: 'हरियाणा' },
    region: 'North',
    headquarters: 'State Cyber Crime Cell, State Crime Branch (Panchkula)',
    nodalOfficer: 'SP Cyber Crime SCB Haryana',
    helplinePhone: '0172-2587532 / 1930 / 112',
    email: 'cybercrime-scb.pol@hry.gov.in',
    websiteUrl: 'https://haryanapolice.gov.in',
    address: 'State Crime Branch, Sector 6, Panchkula, Haryana - 134109',
    specialWomenCell: {
      en: 'Special Cyber Helpdesk for Crimes against Women',
      hi: 'महिला साइबर अपराध विशेष हेल्पडेस्क'
    }
  },
  {
    id: 'punjab',
    stateName: { en: 'Punjab', hi: 'पंजाब' },
    region: 'North',
    headquarters: 'State Cyber Crime Cell, Bureau of Investigation (SAS Nagar/Mohali)',
    nodalOfficer: 'AIG / SP Cyber Crime Division',
    helplinePhone: '0172-2298700 / 1930 / 112',
    email: 'cybercrime-pb@nic.in',
    websiteUrl: 'https://punjabpolice.gov.in',
    address: 'State Cyber Crime PS, Phase-4, SAS Nagar (Mohali), Punjab - 160059',
    specialWomenCell: {
      en: 'Women & Child Affairs Cyber Wing Punjab',
      hi: 'महिला एवं बाल साइबर विंग पंजाब'
    }
  },
  {
    id: 'himachal_pradesh',
    stateName: { en: 'Himachal Pradesh', hi: 'हिमाचल प्रदेश' },
    region: 'North',
    headquarters: 'State Cyber Crime Police Station, CID (Shimla)',
    nodalOfficer: 'SP Cyber Crime / DIG Crime CID HP',
    helplinePhone: '0177-2621714 / 0177-2622205 / 1930',
    email: 'sp-cybercr-hp@nic.in',
    websiteUrl: 'https://citizenportal.hppolice.gov.in',
    address: 'CID Cyber Crime Police Station, Chaura Maidan, Shimla, Himachal Pradesh - 171001',
    specialWomenCell: {
      en: 'Veerangana Mahila Cyber Helpdesk HP',
      hi: 'वीरांगना महिला साइबर हेल्पडेस्क हिमाचल'
    }
  },
  {
    id: 'uttarakhand',
    stateName: { en: 'Uttarakhand', hi: 'उत्तराखंड' },
    region: 'North',
    headquarters: 'Special Task Force (STF) Cyber Crime Police Station (Dehradun)',
    nodalOfficer: 'SP Cyber Crime STF Uttarakhand',
    helplinePhone: '0135-2655900 / 0135-2712563 / 1930',
    email: 'ccps.ddn@uttarakhandpolice.uk.gov.in',
    websiteUrl: 'https://uttarakhandpolice.uk.gov.in',
    address: 'Cyber Crime Police Station, 6 Gandhi Road, Near Clock Tower, Dehradun - 248001',
    specialWomenCell: {
      en: 'Gauri Cyber Suraksha Desk for Women',
      hi: 'गौरी साइबर सुरक्षा महिला प्रकोष्ठ'
    }
  },

  // West Region
  {
    id: 'maharashtra',
    stateName: { en: 'Maharashtra', hi: 'महाराष्ट्र' },
    region: 'West',
    headquarters: 'Maharashtra Cyber Crime Cell HQ (Mumbai)',
    nodalOfficer: 'Special IG / SP Cyber Maharashtra',
    helplinePhone: '022-22160080 / 1930',
    email: 'cybercrime-mah@gov.in',
    websiteUrl: 'https://mahacyber.gov.in',
    address: 'Maharashtra Cyber, 32nd Floor, Centre 1, World Trade Centre, Cuffe Parade, Mumbai - 400005',
    specialWomenCell: {
      en: 'Maharashtra Cyber Security Project & Women Cyber Desk',
      hi: 'महाराष्ट्र साइबर सुरक्षा प्रोजेक्ट एवं महिला साइबर हेल्पडेस्क'
    }
  },
  {
    id: 'gujarat',
    stateName: { en: 'Gujarat', hi: 'गुजरात' },
    region: 'West',
    headquarters: 'Gujarat CID Crime Cyber Cell (Gandhinagar)',
    nodalOfficer: 'IGP / SP Cyber Crime CID',
    helplinePhone: '079-23250798 / 079-23254407 / 1930',
    email: 'sp-cyber-cid@gujarat.gov.in',
    websiteUrl: 'https://police.gujarat.gov.in',
    address: 'CID Crime, Police Bhavan, Sector 18, Gandhinagar, Gujarat - 382018',
    specialWomenCell: {
      en: 'Cyber AASHVAST (Women & Citizen Cyber Protection Project)',
      hi: 'साइबर आश्वस्त (महिला व नागरिक साइबर सुरक्षा पहल)'
    }
  },
  {
    id: 'goa',
    stateName: { en: 'Goa', hi: 'गोवा' },
    region: 'West',
    headquarters: 'Cyber Crime Police Station (Ribandar/Panaji)',
    nodalOfficer: 'SP Cyber Crime Goa Police',
    helplinePhone: '0832-2443214 / 1930',
    email: 'pi-cyber.pol@goa.gov.in',
    websiteUrl: 'https://citizen.goapolice.gov.in',
    address: 'Cyber Crime Police Station, Old GMC Complex, Ribandar, Goa - 403006',
    specialWomenCell: {
      en: 'Goa Police Pink Force Cyber Support',
      hi: 'गोवा पुलिस पिंक फोर्स साइबर सपोर्ट'
    }
  },

  // South Region
  {
    id: 'karnataka',
    stateName: { en: 'Karnataka', hi: 'कर्नाटक' },
    region: 'South',
    headquarters: 'CID Cyber Crime Police Station (Bengaluru)',
    nodalOfficer: 'ADGP / SP Cyber Crime Division CID',
    helplinePhone: '080-22094498 / 080-22201026 / 1930',
    email: 'ccps.cid@ksp.gov.in',
    websiteUrl: 'https://cid.karnataka.gov.in',
    address: 'CID Complex, Palace Road, High Grounds, Bengaluru, Karnataka - 560001',
    specialWomenCell: {
      en: 'Karnataka CID Cyber Crime Wing for Women Safety',
      hi: 'कर्नाटक सीआईडी महिला सुरक्षा साइबर सेल'
    }
  },
  {
    id: 'tamil_nadu',
    stateName: { en: 'Tamil Nadu', hi: 'तमिलनाडु' },
    region: 'South',
    headquarters: 'Cyber Crime Wing HQ, CBCID (Chennai)',
    nodalOfficer: 'ADGP / SP Cyber Crime Division',
    helplinePhone: '044-28447701 / 044-28447703 / 1930',
    email: 'sp-cybercrime.tn@nic.in',
    websiteUrl: 'https://eservices.tnpolice.gov.in',
    address: 'CBCID Cyber Crime Wing, Old Commissioner Office, Pantheon Road, Egmore, Chennai - 600008',
    specialWomenCell: {
      en: 'Dedicated Anti-Cyber Harassment Wing for Women',
      hi: 'महिला विरोधी साइबर उत्पीड़न निवारण विंग'
    }
  },
  {
    id: 'telangana',
    stateName: { en: 'Telangana', hi: 'तेलंगाना' },
    region: 'South',
    headquarters: 'TG Cyber Security Bureau (TGCSB), Hyderabad',
    nodalOfficer: 'Director / SP TGCSB',
    helplinePhone: '1930 / 040-27852435 / 040-27852436',
    email: 'sp-cybercrimes-cid@telangana.gov.in',
    websiteUrl: 'https://tgcsb.tspolice.gov.in',
    address: 'TG Cyber Security Bureau, DGP Office Complex, Lakdikapool, Hyderabad, Telangana - 500004',
    specialWomenCell: {
      en: 'SHE Teams Cyber Support Unit & TGCSB Women Cell',
      hi: 'शी टीम्स साइबर सपोर्ट यूनिट एवं टीजीसीएसबी महिला सेल'
    }
  },
  {
    id: 'kerala',
    stateName: { en: 'Kerala', hi: 'केरल' },
    region: 'South',
    headquarters: 'Cyber Crime Police HQ & Cyberdome (Thiruvananthapuram)',
    nodalOfficer: 'ADGP / SP Cyber Operations Kerala',
    helplinePhone: '0471-2322090 / 0471-2721547 / 1930',
    email: 'cyberdome.pol@kerala.gov.in',
    websiteUrl: 'https://keralapolice.gov.in',
    address: 'Cyberdome, Technopark Campus / Cyber Ops HQ, Police Training College, Thiruvananthapuram - 695014',
    specialWomenCell: {
      en: 'Aparajitha Online Complaint Portal for Women Harassment',
      hi: 'अपराजिता महिला उत्पीड़न ऑनलाइन शिकायत डेस्क'
    }
  },
  {
    id: 'andhra_pradesh',
    stateName: { en: 'Andhra Pradesh', hi: 'आंध्र प्रदेश' },
    region: 'South',
    headquarters: 'CID Cyber Crime Police Station (Mangalagiri)',
    nodalOfficer: 'SP Cyber Crime CID AP',
    helplinePhone: '0863-2340567 / 0863-2340533 / 1930',
    email: 'cid_cybercrime@ap.gov.in',
    websiteUrl: 'https://cid.appolice.gov.in',
    address: 'CID Headquarters, DGP Office Complex, Mangalagiri, Guntur, Andhra Pradesh - 522503',
    specialWomenCell: {
      en: 'Disha Cyber Wing for Rapid Women Assistance',
      hi: 'दिशा साइबर विंग त्वरित महिला सुरक्षा'
    }
  },

  // East Region
  {
    id: 'west_bengal',
    stateName: { en: 'West Bengal', hi: 'पश्चिम बंगाल' },
    region: 'East',
    headquarters: 'Cyber Crime Police Station, CID WB (Kolkata)',
    nodalOfficer: 'DIG / SP Cyber Crime CID',
    helplinePhone: '033-24795900 / 033-24791075 / 1930',
    email: 'cidwbcyber@gmail.com',
    websiteUrl: 'https://cidwestbengal.gov.in',
    address: 'Bhabani Bhawan, 31 Belvedere Road, Alipore, Kolkata, West Bengal - 700027',
    specialWomenCell: {
      en: 'CID WB Special Cell for Crimes Against Women Online',
      hi: 'सीआईडी पश्चिम बंगाल महिला ऑनलाइन अपराध प्रकोष्ठ'
    }
  },
  {
    id: 'bihar',
    stateName: { en: 'Bihar', hi: 'बिहार' },
    region: 'East',
    headquarters: 'Economic Offences Unit (EOU) Cyber Cell (Patna)',
    nodalOfficer: 'DIG / SP Cyber Crime EOU Bihar',
    helplinePhone: '0612-2234044 / 0612-2215682 / 1930',
    email: 'cybercell-bih@nic.in',
    websiteUrl: 'https://eou.bihar.gov.in',
    address: 'Economic Offences Unit, 3rd Floor, Technology Bhawan, Bailey Road, Patna, Bihar - 800001',
    specialWomenCell: {
      en: 'EOU Women Cyber Harassment Response Wing',
      hi: 'ईओयू महिला साइबर उत्पीड़न रिस्पॉन्स विंग'
    }
  },
  {
    id: 'odisha',
    stateName: { en: 'Odisha', hi: 'ओडिशा' },
    region: 'East',
    headquarters: 'CID Crime Branch Cyber Cell (Cuttack)',
    nodalOfficer: 'SP Cyber Crime CID CB Odisha',
    helplinePhone: '0671-2305485 / 0671-2304834 / 1930',
    email: 'cyberps.cidcb.orpol@nic.in',
    websiteUrl: 'https://odishapolice.gov.in',
    address: 'CID Crime Branch, Buxibazar, Cuttack, Odisha - 753001',
    specialWomenCell: {
      en: 'Women & Child Crime Cyber Protection Unit',
      hi: 'महिला व बाल अपराध साइबर सुरक्षा इकाई'
    }
  },
  {
    id: 'jharkhand',
    stateName: { en: 'Jharkhand', hi: 'झारखंड' },
    region: 'East',
    headquarters: 'Cyber Crime Police Station, CID (Ranchi)',
    nodalOfficer: 'SP Cyber Crime / IGP CID Jharkhand',
    helplinePhone: '0651-2490044 / 9771432133 / 1930',
    email: 'cyberps@jhpolice.gov.in',
    websiteUrl: 'https://jhpolice.gov.in',
    address: 'Cyber Crime Police Station, Kutchery Chowk, Old Judicial Complex, Ranchi, Jharkhand - 834001',
    specialWomenCell: {
      en: 'Jharkhand Cyber Desk for Women Safety',
      hi: 'झारखंड महिला सुरक्षा साइबर डेस्क'
    }
  },

  // Central Region
  {
    id: 'madhya_pradesh',
    stateName: { en: 'Madhya Pradesh', hi: 'मध्य प्रदेश' },
    region: 'Central',
    headquarters: 'State Cyber Crime Police Station HQ (Bhopal)',
    nodalOfficer: 'ADG / SP Cyber Crime Police MP',
    helplinePhone: '0755-2770248 / 0755-2779601 / 1930',
    email: 'mpcyberpolice@mp.gov.in',
    websiteUrl: 'https://cyberpolice.mp.gov.in',
    address: 'State Cyber Police HQ, Bhadbhada Road, Near Suraj Nagar, Bhopal, MP - 462003',
    specialWomenCell: {
      en: 'C-Safety Women Digital Shield & Urja Desks',
      hi: 'सी-सेफ्टी महिला डिजिटल सुरक्षा एवं ऊर्जा डेस्क'
    }
  },
  {
    id: 'chhattisgarh',
    stateName: { en: 'Chhattisgarh', hi: 'छत्तीसगढ़' },
    region: 'Central',
    headquarters: 'State Cyber Police Station, PHQ (Nava Raipur)',
    nodalOfficer: 'DIG / AIG Cyber Technical Services',
    helplinePhone: '0771-2428383 / 9479191785 / 1930',
    email: 'cybercell-phq.cg@gov.in',
    websiteUrl: 'https://cgpolice.gov.in',
    address: 'State Cyber Police Station, Police Headquarters, Sector 19, Nava Raipur, Atal Nagar - 492002',
    specialWomenCell: {
      en: 'Abhivyakti Women Cyber Safety Cell',
      hi: 'अभिव्यक्ति महिला साइबर सुरक्षा प्रकोष्ठ'
    }
  },

  // North-East Region (8 NE States)
  {
    id: 'assam',
    stateName: { en: 'Assam', hi: 'असम' },
    region: 'North-East',
    headquarters: 'CID Cyber Police Station (Guwahati)',
    nodalOfficer: 'SP Cyber Crime Cell CID Assam',
    helplinePhone: '0361-2462444 / 0361-2521242 / 1930',
    email: 'spp-cid@assampolice.gov.in',
    websiteUrl: 'https://police.assam.gov.in',
    address: 'CID HQ, Ulubari, Guwahati, Assam - 781007',
    specialWomenCell: {
      en: 'Assam CID Women Cyber Safety Cell',
      hi: 'असम सीआईडी महिला साइबर सुरक्षा प्रकोष्ठ'
    }
  },
  {
    id: 'arunachal_pradesh',
    stateName: { en: 'Arunachal Pradesh', hi: 'अरुणाचल प्रदेश' },
    region: 'North-East',
    headquarters: 'Cyber Crime Police Station, PHQ (Itanagar)',
    nodalOfficer: 'SP Crime / SIT Arunachal Police',
    helplinePhone: '0360-2291065 / 0360-2212576 / 1930',
    email: 'spsit@arunpol.nic.in',
    websiteUrl: 'https://arunpol.nic.in',
    address: 'Police Headquarters, Cyber Crime Branch, Itanagar, Arunachal Pradesh - 791113',
    specialWomenCell: {
      en: 'Special SIT Cyber Crime Cell for Women',
      hi: 'महिला सुरक्षा विशेष साइबर एसआईटी'
    }
  },
  {
    id: 'manipur',
    stateName: { en: 'Manipur', hi: 'मणिपुर' },
    region: 'North-East',
    headquarters: 'Cyber Crime Police Station, CID Crime Branch (Imphal)',
    nodalOfficer: 'SP CID (CB) / Cyber Crime Manipur',
    helplinePhone: '0385-2451375 / 0385-2450123 / 1930',
    email: 'cybercrime-mn@gov.in',
    websiteUrl: 'https://manipurpolice.gov.in',
    address: 'CID (Crime Branch) Police Station, Babupara, Imphal, Manipur - 795001',
    specialWomenCell: {
      en: 'Manipur Women Cyber Support Desk',
      hi: 'मणिपुर महिला साइबर सहायता डेस्क'
    }
  },
  {
    id: 'meghalaya',
    stateName: { en: 'Meghalaya', hi: 'मेघालय' },
    region: 'North-East',
    headquarters: 'Cyber Crime Wing CID (Shillong)',
    nodalOfficer: 'SP / In-charge Cyber Crime Wing',
    helplinePhone: '0364-2503259 / 9402519391 / 1930',
    email: 'ccw-meg@gov.in',
    websiteUrl: 'https://megpolice.gov.in',
    address: 'Cyber Crime Wing CID, Police Headquarters, Secretariat Hills, Shillong, Meghalaya - 793001',
    specialWomenCell: {
      en: 'Meghalaya Cyber Assistance Cell for Women',
      hi: 'मेघालय महिला साइबर सहायता प्रकोष्ठ'
    }
  },
  {
    id: 'mizoram',
    stateName: { en: 'Mizoram', hi: 'मिजोरम' },
    region: 'North-East',
    headquarters: 'Cyber Crime Police Station, CID Crime (Aizawl)',
    nodalOfficer: 'SP CID (Crime) Mizoram',
    helplinePhone: '0389-2320416 / 8119935420 / 1930',
    email: 'cidcrime-mz@nic.in',
    websiteUrl: 'https://police.mizoram.gov.in',
    address: 'CID Crime Complex, Khatla, Aizawl, Mizoram - 796001',
    specialWomenCell: {
      en: 'Mizoram Cyber Crime Women Assistance Unit',
      hi: 'मिजोरम साइबर अपराध महिला सहायता इकाई'
    }
  },
  {
    id: 'nagaland',
    stateName: { en: 'Nagaland', hi: 'नागालैंड' },
    region: 'North-East',
    headquarters: 'State Cyber Crime Police Station, PHQ (Kohima)',
    nodalOfficer: 'DIG CID / SP Cyber Crime Nagaland',
    helplinePhone: '0370-2243711 / 0370-2221285 / 1930',
    email: 'scrb-ngl@nic.in',
    websiteUrl: 'https://police.nagaland.gov.in',
    address: 'Police Headquarters, P.R. Hill, Kohima, Nagaland - 797001',
    specialWomenCell: {
      en: 'Women & Child Cyber Protection Desk Nagaland',
      hi: 'महिला एवं बाल साइबर सुरक्षा डेस्क नागालैंड'
    }
  },
  {
    id: 'sikkim',
    stateName: { en: 'Sikkim', hi: 'सिक्किम' },
    region: 'North-East',
    headquarters: 'Cyber Crime Cell, Criminal Investigation Dept. (Gangtok)',
    nodalOfficer: 'SP CID / In-charge Cyber Crime PS',
    helplinePhone: '03592-202087 / 6294550027 / 1930',
    email: 'oc-cidpolice@sikkimpolice.nic.in',
    websiteUrl: 'https://sikkimpolice.nic.in',
    address: 'CID Cyber Police Station, PHQ Gangtok, East Sikkim - 737101',
    specialWomenCell: {
      en: 'Sikkim Police Women & Child Cyber Cell',
      hi: 'सिक्किम पुलिस महिला व बाल साइबर सेल'
    }
  },
  {
    id: 'tripura',
    stateName: { en: 'Tripura', hi: 'त्रिपुरा' },
    region: 'North-East',
    headquarters: 'Cyber Crime Police Station, CID Complex (Agartala)',
    nodalOfficer: 'SP CID / Cyber Crime Officer Tripura',
    helplinePhone: '0381-2376963 / 9436123828 / 1930',
    email: 'spcid-tri@nic.in',
    websiteUrl: 'https://tripurapolice.gov.in',
    address: 'Cyber Crime Police Station, A.D. Nagar (Arundhati Nagar), Agartala, Tripura - 799003',
    specialWomenCell: {
      en: 'Tripura CID Women Cyber Safety Helpline',
      hi: 'त्रिपुरा सीआईडी महिला साइबर सुरक्षा हेल्पलाइन'
    }
  }
];
