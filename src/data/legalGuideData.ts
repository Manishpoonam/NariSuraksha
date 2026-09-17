import { LegalSection } from '../types';

export const LEGAL_SECTIONS: LegalSection[] = [
  {
    code: 'IT Act, 2000',
    section: 'Section 66E',
    bnsEquivalent: 'BNS Section 77 (Voyeurism)',
    title: {
      en: 'Punishment for Violation of Privacy (Capturing/Transmitting Private Images)',
      hi: 'प्राइवेसी उल्लंघन (निजी अंगों/तस्वीरों को बिना सहमति खींचना या भेजना)',
    },
    punishment: {
      en: 'Imprisonment up to 3 years and/or fine up to ₹2 Lakhs (Bailable under Sec 77B IT Act).',
      hi: '3 साल तक का कारावास और ₹2 लाख तक का जुर्माना (धारा 77B IT Act के तहत जमानती)।',
    },
    bailable: true,
    plainMeaning: {
      en: 'It is a serious crime to capture, publish, or transmit an image of a person’s private body parts without their consent, regardless of whether you had taken or sent it previously in confidence.',
      hi: 'किसी भी व्यक्ति के निजी अंगों या निजी पलों की तस्वीर बिना सहमति खींचना, इंटरनेट पर डालना या किसी को भेजना गंभीर अपराध है।',
    },
  },
  {
    code: 'IT Act, 2000',
    section: 'Section 67 & 67A',
    bnsEquivalent: 'BNS Section 79 / 294',
    title: {
      en: 'Publishing or Transmitting Sexually Explicit Content in Electronic Form',
      hi: 'इलेक्ट्रॉनिक रूप में यौन रूप से स्पष्ट सामग्री का प्रकाशन व प्रसारण',
    },
    punishment: {
      en: 'Sec 67A: Non-Bailable & Cognizable. First Conviction: Imprisonment up to 5 years + fine up to ₹10 Lakhs. Second Conviction: Up to 7 years.',
      hi: 'धारा 67A: गैर-जमानती व संज्ञेय। पहली बार: 5 साल तक की जेल + ₹10 लाख जुर्माना। दूसरी बार: 7 साल तक की जेल।',
    },
    bailable: false,
    plainMeaning: {
      en: 'Sharing intimate videos or photos on WhatsApp, Telegram, websites, or social media is a non-bailable, high-level cyber offence under Section 67A.',
      hi: 'व्हाट्सएप, टेलीग्राम या किसी भी प्लेटफॉर्म पर अश्लील/निजी वीडियो या फोटो फॉरवर्ड करना धारा 67A के तहत गैर-जमानती व कठोर अपराध है।',
    },
  },
  {
    code: 'Bharatiya Nyaya Sanhita, 2023',
    section: 'Section 308 (Old 384 IPC)',
    title: {
      en: 'Extortion (Blackmailing for Money, Favors, or Content)',
      hi: 'जबरन वसूली (पैसों या तस्वीरों के लिए ब्लैकमेल करना)',
    },
    punishment: {
      en: 'Basic Extortion (308(2)): Imprisonment up to 2 years, or fine, or both. Aggravated Extortion (Subsections 4–6): Up to 7 to 10 years imprisonment with fine.',
      hi: 'मूल जबरन वसूली (308(2)): 2 साल तक कारावास या जुर्माना या दोनों। गंभीर जबरन वसूली (उपधारा 4-6): 7 से 10 साल तक कठोर कारावास व जुर्माना।',
    },
    bailable: false,
    plainMeaning: {
      en: 'Threatening someone with injury to reputation, family dishonor, or leaking photos to extort money or favors.',
      hi: 'बदनामी का डर दिखाकर या तस्वीरें वायरल करने की धमकी देकर पैसे या अनुचित लाभ मांगना जबरन वसूली (Extortion) का गंभीर अपराध है।',
    },
  },
  {
    code: 'Bharatiya Nyaya Sanhita, 2023',
    section: 'Section 351 (Old 506 IPC)',
    title: {
      en: 'Criminal Intimidation (Threatening to Ruin Life or Leak Content)',
      hi: 'आपराधिक धमकी (जिंदगी बर्बाद करने या फोटो लीक करने की धमकी)',
    },
    punishment: {
      en: 'Imprisonment up to 2 years, or up to 7 years if threat is to cause death or grievous hurt or unchastity.',
      hi: '2 से 7 साल तक की जेल एवं जुर्माना।',
    },
    bailable: false,
    plainMeaning: {
      en: 'Threatening to ruin a woman’s reputation or circulate private content is punished under criminal intimidation.',
      hi: 'किसी महिला की प्रतिष्ठा को ठेस पहुंचाने या धमकी देने पर कड़ी कानूनी सजा का प्रावधान है।',
    },
  },
  {
    code: 'Bharatiya Nyaya Sanhita, 2023',
    section: 'Section 336 (Old 469 IPC)',
    title: {
      en: 'Forgery for Harming Reputation (AI Deepfakes & Morphed Photos)',
      hi: 'प्रतिष्ठा को नुकसान पहुंचाने के लिए जालसाजी (AI डीपफेक और मॉर्फिंग)',
    },
    punishment: {
      en: 'Imprisonment up to 3 years and fine.',
      hi: '3 साल तक का कारावास एवं जुर्माना।',
    },
    bailable: false,
    plainMeaning: {
      en: 'Creating synthetic media, AI deepfakes, face-swapped photos, or altering images with malicious intent to defame or sexualize a person.',
      hi: 'AI, फोटोशॉप या किसी सॉफ्टवेयर से किसी महिला का चेहरा फर्जी अश्लील तस्वीर पर लगाना कानूनन जालसाजी और गंभीर अपराध है।',
    },
  },
  {
    code: 'IT Rules, 2021',
    section: 'Rule 3(2)(b)',
    title: {
      en: 'Mandatory 24-Hour Takedown Rule for Intermediaries',
      hi: 'प्लेटफॉर्म्स के लिए 24 घंटे में सामग्री हटाने का अनिवार्य नियम',
    },
    punishment: {
      en: 'Loss of Safe Harbor protection under Section 79 IT Act; Platform executives face direct criminal liability.',
      hi: 'प्लेटफॉर्म का कानूनी संरक्षण खत्म हो जाता है और कंपनी के अधिकारियों पर मुकदमा चल सकता है।',
    },
    bailable: false,
    plainMeaning: {
      en: 'Within 24 hours of receiving a complaint from the victim or authorized person regarding non-consensual nudity, deepfakes, or sexual content, social media companies are legally required to remove or disable access to it.',
      hi: 'शिकायत मिलने के 24 घंटे के भीतर सोशल मीडिया कंपनियों (व्हाट्सएप, फेसबुक, इंस्टाग्राम आदि) को वह सामग्री हटानी ही होगी।',
    },
  },
];

export interface LegalFAQ {
  id: string;
  question: { en: string; hi: string };
  answer: { en: string; hi: string };
  keyTakeaway: { en: string; hi: string };
}

export const LEGAL_FAQS: LegalFAQ[] = [
  {
    id: 'parents_fear',
    question: {
      en: 'Will my parents, spouse, or relatives find out if I file a police report?',
      hi: 'क्या मेरे माता-पिता, पति या रिश्तेदारों को पता चल जाएगा अगर मैं शिकायत करती हूँ?',
    },
    answer: {
      en: 'No. Under Section 73 of the Bharatiya Nyaya Sanhita (BNS) [formerly Section 228A IPC], the law strictly prohibits the disclosure of the name, address, or any detail that could reveal the identity of a woman in sexual harassment or cyber intimate cases. Unlawful disclosure of identity is a criminal offense punishable by up to 2 years in prison. Furthermore, on the National Cyber Crime Reporting Portal (cybercrime.gov.in), you can file under "Crime Against Women/Children" with confidentiality, enabling cyber police to take down offending links and investigate without sending notices to your family.',
      hi: 'बिल्कुल नहीं। कानून (BNS धारा 73) के तहत पीड़िता का नाम, पता या पहचान सार्वजनिक करना सख्त अपराध है (जिसके लिए 2 साल की जेल हो सकती है)। पुलिस गोपनीयता बनाए रखने के लिए बाध्य है। इसके अतिरिक्त आप cybercrime.gov.in पर "गुमनाम शिकायत (Anonymous Report)" भी दर्ज कर सकती हैं जिससे घर पर कोई सूचना नहीं जाती।',
    },
    keyTakeaway: {
      en: 'Your identity is legally protected and sealed by Indian law.',
      hi: 'आपकी पहचान भारतीय कानून द्वारा पूरी तरह सुरक्षित और सीलबंद रखी जाती है।',
    },
  },
  {
    id: 'victim_blaming_guilt',
    question: {
      en: 'Can I be arrested or blamed by police for having taken or sent the photo initially?',
      hi: 'क्या मुझे पुलिस द्वारा दोषी ठहराया जा सकता है क्योंकि मैंने पहले विश्वास में फोटो भेजी थी?',
    },
    answer: {
      en: 'No. Under Indian criminal law, taking or sharing private photographs in personal privacy or a consensual relationship is not an offense. The criminal offense occurs when someone retains, threatens, leaks, blackmails, or circulates that content without your explicit consent (IT Act Sections 66E & 67A, and BNS Section 77). You are recognized in law as the complainant and survivor. Law enforcement authorities cannot charge or penalize you for having private photos.',
      hi: 'कतई नहीं। निजी जीवन या आपसी विश्वास में फोटो खींचना या भेजना कोई अपराध नहीं है। अपराध केवल उस व्यक्ति ने किया है जिसने आपकी सहमति के बिना इसे लीक किया या आपको ब्लैकमेल कर रहा है। कानून की नजर में आप पूरी तरह से पीड़िता (Victim) हैं।',
    },
    keyTakeaway: {
      en: 'Consensual private sharing is not an offense. Leaking and blackmailing is a serious crime.',
      hi: 'निजी विश्वास में फोटो होना अपराध नहीं है। लीक करना और ब्लैकमेल करना संगीन जुर्म है।',
    },
  },
  {
    id: 'female_officer_right',
    question: {
      en: 'Can I demand to speak only to a female police officer in a private room?',
      hi: 'क्या मैं केवल महिला पुलिस अधिकारी से ही बात करने और बयान देने की मांग कर सकती हूँ?',
    },
    answer: {
      en: 'Yes. Under Section 173 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023 [formerly Section 154 CrPC], any statement relating to offenses against women must be recorded by a female police officer. You have the statutory right to have your statement recorded at your residence or at another private location of your choice in the presence of a trusted support person.',
      hi: 'हाँ, यह आपका कानूनी अधिकार है। कानून (BNSS धारा 173) के तहत किसी भी महिला का बयान केवल महिला पुलिस अधिकारी द्वारा ही दर्ज किया जाएगा। आप अपनी पसंद की किसी भी सुरक्षित जगह पर बयान दर्ज कराने का अनुरोध कर सकती हैं।',
    },
    keyTakeaway: {
      en: 'Mandatory statutory right to a female officer under Section 173 BNSS.',
      hi: 'महिला पुलिस अधिकारी द्वारा ही बयान दर्ज किया जाना अनिवार्य है।',
    },
  },
  {
    id: 'zero_fir_jurisdiction',
    question: {
      en: 'What if the criminal or ex-partner lives in another city or state?',
      hi: 'अगर ब्लैकमेलर या आरोपी किसी दूसरे शहर या राज्य में रहता है तब क्या होगा?',
    },
    answer: {
      en: 'Cyber crimes operate under Pan-India jurisdiction. You can register a "Zero FIR" at any police station nearest to you, or submit directly on cybercrime.gov.in. The receiving police station is legally required to accept the complaint without jurisdictional objections and transfer the case file to the cyber forensics unit where the suspect’s IP or phone tower is located.',
      hi: 'साइबर अपराध पूरे देश में लागू होते हैं। आप अपने नजदीकी किसी भी थाने में "Zero FIR" दर्ज करा सकती हैं या ऑनलाइन cybercrime.gov.in पर रिपोर्ट कर सकती हैं। पुलिस अधिकार क्षेत्र का बहाना बनाकर मना नहीं कर सकती।',
    },
    keyTakeaway: {
      en: 'Zero FIR can be filed at any police station across India.',
      hi: 'भारत के किसी भी थाने में जीरो एफआईआर दर्ज कराई जा सकती है।',
    },
  },
  {
    id: 'money_extortion_stall',
    question: {
      en: 'The blackmailer is counting down (e.g., giving 30 minutes). How should I respond right now?',
      hi: 'ब्लैकमेलर 30 मिनट का समय देकर तुरंत पैसे मांग रहा है। मुझे अभी क्या जवाब देना चाहिए?',
    },
    answer: {
      en: 'Follow the two-step tactical sequence: Extortionists use artificial countdown timers to trigger adrenaline-driven panic before you can evaluate options. Step 1 (If breathing room is needed): Send the calm stalling message ("I am trying to arrange the money from my bank. The banking server is slow right now. Please give me 3 to 4 hours. Please do not do anything in haste."). This buys immediate time without provoking an impulsive leak. Step 2: During this window, take uncropped screenshots of the chat, phone number, profile URL, and UPI ID, and hash your imagery on StopNCII.org. You have the legal right to withhold payment — paying ₹1 never stops blackmail and leads to repeat demands. Step 3: Send the formal statutory freeze notice citing BNS Section 308 (Extortion) and IT Act 66E/67A, then immediately block the offender.',
      hi: 'दो-चरणीय रणनीति का पालन करें: ब्लैकमेलर घबराहट पैदा करने के लिए कृत्रिम टाइमर का उपयोग करते हैं। कदम 1: यदि सबूत जुटाने हेतु समय चाहिए, तो शांत स्टालिंग संदेश भेजें ("मैं बैंक से व्यवस्था करने की कोशिश कर रही हूँ, सर्वर धीमा है, कृपया 3-4 घंटे दें। जल्दबाजी न करें।")। इससे बिना तनाव बढ़ाए समय मिलता है। कदम 2: इस दौरान पूरी स्क्रीन के अनक्रॉप्ड स्क्रीनशॉट लें और StopNCII.org पर हैश बनाएं। आपको भुगतान रोकने का पूरा कानूनी अधिकार है — पैसे कभी न दें। कदम 3: BNS धारा 308 व IT Act 67A का वैधानिक फ्रीज नोटिस भेजें और नंबर को तुरंत ब्लॉक करें।',
    },
    keyTakeaway: {
      en: 'Sequenced strategy: Stall calmly to preserve proof and hash media, then issue legal freeze notice and block. Withhold all payment.',
      hi: 'क्रमबद्ध रणनीति: सबूत जुटाने के लिए शांत रहकर समय लें, StopNCII हैश बनाएं, फिर कानूनी फ्रीज नोटिस भेजकर ब्लॉक करें। पैसे कभी न दें।',
    },
  },
];
