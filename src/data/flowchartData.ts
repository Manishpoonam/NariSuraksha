import { DecisionNode } from '../types';

export const DECISION_NODES: DecisionNode[] = [
  {
    id: 'extortion_blackmail',
    category: 'extortion_blackmail',
    urgencyLevel: 'CRITICAL',
    title: {
      en: 'Blackmail / Sextortion In Progress (Threatening to Leak)',
      hi: 'ब्लैकमेल और धमकी (लीक करने की धमकी दी जा रही है)',
    },
    subtitle: {
      en: 'Someone is demanding money, favors, or more photos, threatening to send to your family, friends, or college.',
      hi: 'कोई आपसे पैसे या और तस्वीरों की मांग कर रहा है और परिवार/दोस्तों को भेजने की धमकी दे रहा है।',
    },
    immediateWarnings: {
      en: [
        'DO NOT PAY ANY MONEY: Paying does NOT make them delete it. It proves you are terrified and they will demand 5x more money immediately.',
        'DO NOT PLEAD OR BEG: Extortionists use emotional panic. Act neutral or stall calmly.',
        'DO NOT DELETE THE CHATS: The chats, phone numbers, and payment UPI IDs are your strongest legal proof to put them in jail.',
      ],
      hi: [
        'पैसे बिल्कुल न दें: पैसे देने से वो डिलीट नहीं करते, बल्कि और बड़ी रकम की मांग करते हैं।',
        'गिड़गिड़ाएं या भीख न मांगें: शांत रहें और घबराहट न दिखाएं।',
        'चैट या नंबर कभी डिलीट न करें: यही स्क्रीनशॉट और बैंक/UPI डिटेल्स पुलिस को ब्लैकमेलर को पकड़ने में मदद करेंगे।',
      ],
    },
    actionSteps: [
      {
        stepNumber: 1,
        title: {
          en: 'Preserve Forensic Evidence Instantly',
          hi: 'तुरंत कानूनी सबूत (स्क्रीनशॉट) सुरक्षित करें',
        },
        description: {
          en: 'Take complete full-screen screenshots showing the extortionist’s phone number, profile, exact message timestamps, and any UPI/bank account info.',
          hi: 'ब्लैकमेलर के फोन नंबर, प्रोफाइल, समय और UPI/बैंक आईडी के पूरे स्क्रीनशॉट लें।',
        },
        buttonLabel: {
          en: 'Open Evidence Checklist',
          hi: 'सबूत चेकलिस्ट देखें',
        },
        actionType: 'evidence',
      },
      {
        stepNumber: 2,
        title: {
          en: 'Hash Image via StopNCII.org (Prevent Viral Uploads)',
          hi: 'StopNCII.org पर इमेज हैश बनाएं (अपलोड से पहले रोकें)',
        },
        description: {
          en: 'StopNCII creates a digital fingerprint (hash) directly on your device without uploading the raw photo. Partner platforms (Meta, TikTok, Bumble, OnlyFans) block matches automatically.',
          hi: 'StopNCII आपके फोन पर ही डिजिटल कोड (हैश) बनाता है जिससे ओरिजिनल फोटो कहीं अपलोड नहीं होती और प्लेटफॉर्म्स इसे अपने आप ब्लॉक कर देते हैं।',
        },
        buttonLabel: {
          en: 'Open StopNCII Portal',
          hi: 'StopNCII पोर्टल खोलें',
        },
        actionType: 'takedown',
        linkUrl: 'https://stopncii.org',
      },
      {
        stepNumber: 3,
        title: {
          en: 'Generate Official Cyber Crime & BNS Complaint Draft',
          hi: 'साइबर पुलिस शिकायत ड्राफ्ट तैयार करें',
        },
        description: {
          en: 'Generate a legally formatted complaint under IT Act Sec 66E/67/67A & BNS 308 (Extortion) / 351 (Intimidation). You can file anonymously on cybercrime.gov.in.',
          hi: 'आईटी एक्ट और BNS 308 (जबरन वसूली) के तहत औपचारिक शिकायत बनाएं। आप इसे पोर्टल पर गुमनाम (Anonymous) रूप से भी दर्ज कर सकती हैं।',
        },
        buttonLabel: {
          en: 'Generate Complaint Draft',
          hi: 'शिकायत ड्राफ्ट बनाएं',
        },
        actionType: 'draft',
      },
      {
        stepNumber: 4,
        title: {
          en: 'Call 1930 / Women Helpline 1091',
          hi: '1930 या 1091 पर तुरंत कॉल करें',
        },
        description: {
          en: 'National Cyber Crime Helpline (1930) operates 24/7. They can trigger immediate cyber cell tracking and freeze fraudulent bank accounts.',
          hi: 'राष्ट्रीय साइबर अपराध हेल्पलाइन 1930 पर 24 घंटे सहायता मिलती है। यह ब्लैकमेलर के खाते फ्रीज करवा सकती है।',
        },
        buttonLabel: {
          en: 'Call Helpline 1930',
          hi: '1930 डायल करें',
        },
        actionType: 'call',
        linkUrl: 'tel:1930',
      },
    ],
  },
  {
    id: 'viral_leaked',
    category: 'viral_leaked',
    urgencyLevel: 'CRITICAL',
    title: {
      en: 'Content Already Leaked / Circulating on Platforms',
      hi: 'तस्वीरें/वीडियो पहले ही व्हाट्सएप, टेलीग्राम या वेबसाइट पर लीक हो चुकी हैं',
    },
    subtitle: {
      en: 'Your intimate photo or video is already being shared in WhatsApp groups, Telegram channels, Instagram, X, or pornographic websites.',
      hi: 'आपकी निजी फोटो/वीडियो व्हाट्सएप ग्रुप्स, टेलीग्राम चैनल, इंस्टाग्राम, एक्स या एडल्ट साइट्स पर वायरल की जा रही है।',
    },
    immediateWarnings: {
      en: [
        'INDIAN LAW MANDATES 24-HOUR REMOVAL: Under Rule 3(2)(b) of the IT Rules 2021, all platforms MUST take down intimate media within 24 hours of receiving a complaint.',
        'YOU ARE THE VICTIM, NOT THE ACCUSED: You have 100% legal protection. Section 73 BNS strictly forbids disclosing the identity or name of the victim.',
        'DO NOT REPORT & DELETE SENDER ACCOUNT FIRST: Copy the exact channel/post link before reporting so law enforcement can subpoena server logs.',
      ],
      hi: [
        'भारतीय कानून के तहत 24 घंटे में हटाना अनिवार्य: IT Rules 2021 के नियम 3(2)(b) के अनुसार कोई भी प्लेटफॉर्म शिकायत मिलने के 24 घंटे के अंदर सामग्री हटाने को बाध्य है।',
        'आप पूरी तरह निर्दोष हैं: BNS की धारा 73 के तहत पीड़िता की पहचान या नाम उजागर करना सख्त गैर-कानूनी है।',
        'लिंक कॉपी किए बिना ग्रुप न छोड़ें: साइबर पुलिस को जांच के लिए चैनल/पोस्ट का सटीक वेब लिंक चाहिए होता है।',
      ],
    },
    actionSteps: [
      {
        stepNumber: 1,
        title: {
          en: 'Send Mandatory 24-Hr Legal Notice to Grievance Officers',
          hi: 'प्लेटफॉर्म के ग्रीवेंस ऑफिसर को 24 घंटे का लीगल नोटिस भेजें',
        },
        description: {
          en: 'Send a formal notice citing Rule 3(2)(b) IT Rules 2021 to WhatsApp, Meta, Telegram, and X grievance officers to force immediate deletion.',
          hi: 'आईटी नियम 3(2)(b) का हवाला देते हुए व्हाट्सएप, टेलीग्राम, इंस्टाग्राम के नोडल अधिकारियों को 24 घंटे में कंटेंट हटाने का नोटिस भेजें।',
        },
        buttonLabel: {
          en: 'Create Platform Notice',
          hi: 'प्लेटफॉर्म नोटिस तैयार करें',
        },
        actionType: 'draft',
      },
      {
        stepNumber: 2,
        title: {
          en: 'Submit Google De-Indexing Request',
          hi: 'गूगल सर्च से लिंक और फोटो हटाने का अनुरोध दर्ज करें',
        },
        description: {
          en: 'Use Google’s expedited Non-Consensual Explicit Imagery removal form to erase search results, thumbnails, and website cache globally.',
          hi: 'गूगल के विशेष फॉर्म द्वारा अपना नाम या फोटो सर्च रिजल्ट्स और इमेजेस से तुरंत हटवाएं।',
        },
        buttonLabel: {
          en: 'Open Google Removal Form',
          hi: 'गूगल रिमूवल फॉर्म खोलें',
        },
        actionType: 'takedown',
        linkUrl: 'https://support.google.com/websearch/troubleshooter/3111061',
      },
      {
        stepNumber: 3,
        title: {
          en: 'File e-FIR on National Cybercrime Portal (cybercrime.gov.in)',
          hi: 'नेशनल साइबरक्राइम पोर्टल पर रिपोर्ट दर्ज करें',
        },
        description: {
          en: 'Select "Report Crime Against Women/Children". You can choose "Report Anonymously" if you want strict privacy, or tracked mode.',
          hi: '"Report Crime Against Women/Children" चुनें। आप अपनी प्राइवेसी बनाए रखने के लिए गुमनाम (Anonymous) रिपोर्ट भी दर्ज कर सकती हैं।',
        },
        buttonLabel: {
          en: 'Visit cybercrime.gov.in',
          hi: 'cybercrime.gov.in पर जाएं',
        },
        actionType: 'portal',
        linkUrl: 'https://cybercrime.gov.in',
      },
      {
        stepNumber: 4,
        title: {
          en: 'Contact NCW (National Commission for Women) 24/7 Helpline',
          hi: 'राष्ट्रीय महिला आयोग (NCW) हेल्पलाइन (कॉल: 14490 • व्हाट्सएप: 7827170170)',
        },
        description: {
          en: 'NCW has dedicated cyber nodal officers who directly follow up with Director Generals of Police (DGPs) for swift action. Call toll-free 14490 or WhatsApp 7827170170.',
          hi: 'NCW की स्पेशल साइबर सेल सीधे पुलिस महानिदेशक स्तर पर तेजी से कार्रवाई करवाती है। 14490 पर कॉल करें या 7827170170 पर व्हाट्सएप करें।',
        },
        buttonLabel: {
          en: 'Call NCW (14490 / 7827170170)',
          hi: 'NCW हेल्पलाइन (14490 / 7827170170)',
        },
        actionType: 'call',
        linkUrl: 'tel:14490',
      },
    ],
  },
  {
    id: 'ai_deepfake_morph',
    category: 'ai_deepfake_morph',
    urgencyLevel: 'HIGH',
    title: {
      en: 'AI Deepfake / Morphed Photo / Cloth Removal Fake',
      hi: 'AI डीपफेक / मॉर्फ्ड फोटो / चेहरे को एडिट करके बनाई गई अश्लील फोटो',
    },
    subtitle: {
      en: 'Someone took your normal social media photo and used AI or Photoshop to place your face onto an explicit nude image/video.',
      hi: 'किसी ने आपकी सामान्य फोटो लेकर AI या फोटोशॉप से आपका चेहरा किसी अश्लील तस्वीर या वीडियो पर लगा दिया है।',
    },
    immediateWarnings: {
      en: [
        'THIS IS A GRAVE CRIMINAL FORGERY & VOYEURISM: Making AI fakes is criminalized under Section 336 BNS (Forgery for harming reputation), Sec 77 BNS (Voyeurism), and Sec 66E/67/67A of the IT Act.',
        'YOU DO NOT NEED TO PROVE IT IS REAL OR FAKE: The law treats distribution of synthetic/morphed sexually explicit material with the same severe penalties (up to 5 years imprisonment).',
      ],
      hi: [
        'यह एक गंभीर गैर-जमानती अपराध है: AI द्वारा फर्जी अश्लील तस्वीर बनाना BNS धारा 336 (जालसाजी), धारा 77 और IT एक्ट 66E/67A के तहत 5 साल तक की जेल का अपराध है।',
        'आपको यह साबित करने की चिंता नहीं करनी: कानून में डीपफेक और वास्तविक तस्वीरों दोनों को समान रूप से दंडनीय माना गया है।',
      ],
    },
    actionSteps: [
      {
        stepNumber: 1,
        title: {
          en: 'Capture Metadata & Original Reference Image',
          hi: 'ओरिजिनल फोटो और डीपफेक दोनों का स्क्रीनशॉट रखें',
        },
        description: {
          en: 'Keep your original harmless photo (from Instagram/WhatsApp) alongside the fake version as indisputable forensic evidence of manipulation.',
          hi: 'अपनी असली फोटो और बनाई गई फर्जी फोटो दोनों का रिकॉर्ड रखें ताकि फॉरेंसिक जांच में छेड़छाड़ साबित हो सके।',
        },
        buttonLabel: {
          en: 'Open Evidence Checklist',
          hi: 'सबूत चेकलिस्ट',
        },
        actionType: 'evidence',
      },
      {
        stepNumber: 2,
        title: {
          en: 'Direct Takedown via Platform Deepfake Policies',
          hi: 'प्लेटफॉर्म डीपफेक पॉलिसी के तहत हटाने का नोटिस दें',
        },
        description: {
          en: 'Meta, Telegram, and X have zero-tolerance automated rules for synthetic non-consensual sexual content (Rule 3(2)(b)).',
          hi: 'सोशल मीडिया प्लेटफॉर्म्स पर AI जनित अश्लीलता को तुरंत हटाने के कड़े नियम हैं।',
        },
        buttonLabel: {
          en: 'View Platform Takedown Links',
          hi: 'प्लेटफॉर्म लिंक देखें',
        },
        actionType: 'takedown',
      },
      {
        stepNumber: 3,
        title: {
          en: 'File Cyber Crime Report Citing BNS 336 & IT Act 66E/67',
          hi: 'साइबर सेल में BNS 336 और IT एक्ट 66E/67 के तहत शिकायत करें',
        },
        description: {
          en: 'Use our draft generator with dedicated sections for AI manipulation and digital impersonation.',
          hi: 'हमारे ऑटो-ड्राफ्ट टूल से डीपफेक और प्रतिरूपण (Impersonation) की कानूनी शिकायत तैयार करें।',
        },
        buttonLabel: {
          en: 'Generate AI Deepfake Complaint',
          hi: 'डीपफेक शिकायत ड्राफ्ट बनाएं',
        },
        actionType: 'draft',
      },
    ],
  },
  {
    id: 'videocall_sextortion',
    category: 'videocall_sextortion',
    urgencyLevel: 'CRITICAL',
    title: {
      en: 'WhatsApp / Video Call Recording Scam (Sextortion Gangs)',
      hi: 'व्हाट्सएप वीडियो कॉल रिकॉर्डिंग स्कैम (न्यूड वीडियो कॉल ब्लैकमेल)',
    },
    subtitle: {
      en: 'An unknown number or fake profile made a video call with pre-recorded nudity, captured your face in the frame, and now sends YouTube/Facebook deletion threats.',
      hi: 'किसी अनजान नंबर से न्यूड वीडियो कॉल आई, आपकी स्क्रीन रिकॉर्ड की, और अब यूट्यूब/फेसबुक पर डालने या रिश्तेदारों को भेजने की धमकी दे रहे हैं।',
    },
    immediateWarnings: {
      en: [
        'THIS IS AN ORGANIZED CYBER CRIME GANG (Mewat / Bharatpur / Cyber-fraud network): They execute 1,000s of identical scams daily using pre-recorded clips.',
        'DO NOT PAY A SINGLE RUPEE: If you pay ₹5,000, another fake "Police Inspector Vikram Singh" or "YouTube Manager" will call demanding ₹25,000 for "deleting the video from server". It is ALL the same gang.',
        'THEY RARELY POST PUBLICLY: Posting publicly gets their burner accounts and UPI merchant handles banned by police. They rely 100% on your immediate panic to extort cash.',
      ],
      hi: [
        'यह एक संगठित साइबर गैंग (मेवात/जामताड़ा स्टाइल) का काम है जो हर दिन हजारों लोगों के साथ ऐसा करता है।',
        '₹1 भी न दें: पैसे देते ही फर्जी "साइबर पुलिस ऑफिसर" या "यूट्यूब मैनेजर" बनकर और 50,000 की मांग करेंगे। ये सब एक ही गिरोह होता है।',
        'वे यूट्यूब/फेसबुक पर अपलोड नहीं करते: पब्लिक अपलोड करते ही उनके खाते और सिम तुरंत ब्लॉक हो जाते हैं। वे केवल डर का फायदा उठाते हैं।',
      ],
    },
    actionSteps: [
      {
        stepNumber: 1,
        title: {
          en: 'Mute & Lock All Social Profiles to Private',
          hi: 'अपने सभी सोशल मीडिया एकाउंट्स को तुरंत प्राइवेट (Private) करें',
        },
        description: {
          en: 'Set Instagram, Facebook, and LinkedIn friend lists to "Only Me". Do not accept calls from unknown numbers. Do NOT engage with them.',
          hi: 'इंस्टाग्राम, फेसबुक की फ्रेंड लिस्ट छुपाएं और अकाउंट प्राइवेट करें। अनजान नंबरों से कॉल उठाना बंद करें।',
        },
        buttonLabel: {
          en: 'Social Privacy Checklist',
          hi: 'प्राइवेसी गाइड',
        },
        actionType: 'evidence',
      },
      {
        stepNumber: 2,
        title: {
          en: 'Report the UPI ID & Phone Number to 1930',
          hi: '1930 पर फोन नंबर और बैंक/UPI आईडी रिपोर्ट करें',
        },
        description: {
          en: 'Calling 1930 enables Indian Cyber Crime Coordination Centre (I4C) to freeze the fraudster’s bank accounts and block the IMEI of their devices.',
          hi: '1930 पर शिकायत दर्ज कराते ही I4C फ्रॉडस्टर के बैंक खाते और सिम तुरंत फ्रीज कर देता है।',
        },
        buttonLabel: {
          en: 'Call 1930 Now',
          hi: '1930 पर कॉल करें',
        },
        actionType: 'call',
        linkUrl: 'tel:1930',
      },
      {
        stepNumber: 3,
        title: {
          en: 'Block & Report on WhatsApp with Chat History',
          hi: 'व्हाट्सएप पर सबूत लेने के बाद ब्लॉक और रिपोर्ट करें',
        },
        description: {
          en: 'Take screenshots first, then use WhatsApp in-app "Report & Block" which sends the last 5 messages directly to WhatsApp moderation.',
          hi: 'पहले स्क्रीनशॉट लें, फिर "Report & Block" करें जिससे अंतिम 5 मैसेज सीधे व्हाट्सएप सुरक्षा टीम को चले जाएं।',
        },
        buttonLabel: {
          en: 'WhatsApp Grievance Steps',
          hi: 'व्हाट्सएप रिपोर्ट गाइड',
        },
        actionType: 'takedown',
      },
    ],
  },
  {
    id: 'device_hacked_icloud',
    category: 'device_hacked_icloud',
    urgencyLevel: 'HIGH',
    title: {
      en: 'Device Hacked / Cloud Account Stolen / Ex-Partner Access',
      hi: 'फोन हैक / गूगल फोटोज या iCloud अकाउंट से चोरी / पूर्व साथी द्वारा दुरुपयोग',
    },
    subtitle: {
      en: 'Someone has gained unauthorized access to your phone, Google Drive, iCloud, or an ex-partner is weaponizing photos you shared in confidence.',
      hi: 'किसी ने आपके फोन या क्लाउड अकाउंट में अनधिकृत घुसपैठ की है, या पूर्व साथी विश्वास में दी गई तस्वीरों का दुरुपयोग कर रहा है।',
    },
    immediateWarnings: {
      en: [
        'BREACH OF TRUST & PRIVACY IS PUNISHABLE UNDER SEC 66E IT ACT & SEC 77 BNS: Consensual sharing in a relationship gives NO ONE the right to retain, threaten, or circulate.',
        'CHANGE PASSWORDS & ENABLE 2-FACTOR AUTH IMMEDIATELY: Sign out of all devices from your Google/Apple account security console.',
      ],
      hi: [
        'विश्वास का हनन और प्राइवेसी उल्लंघन दंडनीय है: रिश्ते में साझा की गई तस्वीरों को भी ब्लैकमेल के लिए उपयोग करना IT Act 66E और BNS 77 के तहत अपराध है।',
        'तुरंत पासवर्ड बदलें और सभी डिवाइस से लॉगआउट करें।',
      ],
    },
    actionSteps: [
      {
        stepNumber: 1,
        title: {
          en: 'Secure Accounts & Revoke All Active Sessions',
          hi: 'सभी सक्रिय सत्रों (Active Sessions) से लॉगआउट करें',
        },
        description: {
          en: 'Go to Google Account Security / Apple ID > Devices > "Sign out of all sessions". Turn on 2-Factor Authentication via Authenticator App.',
          hi: 'गूगल/एप्पल सिक्योरिटी में जाकर सभी अनजान डिवाइसेज को तुरंत रिमूव करें और 2FA चालू करें।',
        },
        buttonLabel: {
          en: 'Security Steps',
          hi: 'सिक्योरिटी चेकलिस्ट',
        },
        actionType: 'evidence',
      },
      {
        stepNumber: 2,
        title: {
          en: 'StopNCII Proactive Protection',
          hi: 'StopNCII पर सुरक्षित हैश दर्ज करें',
        },
        description: {
          en: 'Register the digital hashes on StopNCII to preemptively block them from being uploaded to any Meta, TikTok, or partner platform.',
          hi: 'StopNCII पर हैश बनाकर पहले ही सोशल मीडिया पर इसके अपलोड को रोकें।',
        },
        buttonLabel: {
          en: 'Open StopNCII',
          hi: 'StopNCII पर जाएं',
        },
        actionType: 'takedown',
        linkUrl: 'https://stopncii.org',
      },
      {
        stepNumber: 3,
        title: {
          en: 'File Legal Complaint for Breach of Privacy & Stalking',
          hi: 'प्राइवेसी हनन (IT Act 66E) और स्टॉकिंग (BNS 78) की शिकायत दर्ज करें',
        },
        description: {
          en: 'Under Bharatiya Nagarik Suraksha Sanhita (BNSS), your statement will be recorded privately by a female police officer.',
          hi: 'BNSS के तहत महिला पुलिस अधिकारी द्वारा पूरी गोपनीयता के साथ आपका बयान दर्ज किया जाता है।',
        },
        buttonLabel: {
          en: 'Draft Police Complaint',
          hi: 'पुलिस शिकायत बनाएं',
        },
        actionType: 'draft',
      },
    ],
  },
];
