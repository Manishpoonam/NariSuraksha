import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle, 
  ShieldCheck, 
  Copy, 
  Check, 
  ExternalLink, 
  HeartHandshake, 
  Sparkles, 
  ArrowRight, 
  MessageSquare, 
  UserX, 
  Brain, 
  HelpCircle, 
  ChevronRight, 
  Scale, 
  Shield, 
  Phone, 
  Camera 
} from 'lucide-react';
import { Language, IncidentCategory } from '../types';
import { smoothScrollTo } from '../utils/scroll';
import { 
  OFFENSE_STATUTE_MAPPINGS, 
  OffenseStatutePackage 
} from '../data/statuteCitations';

interface GirlsRescueGuideProps {
  language: Language;
  onNavigateToTab: (tab: string, elementId?: string) => void;
  onSelectCategoryForDraft?: (category: IncidentCategory) => void;
  onOpenSOS?: () => void;
}

interface GirlScenario {
  id: string;
  icon: any;
  category: IncidentCategory;
  statutePackageKey: string;
  statutePackage: OffenseStatutePackage;
  badge: { en: string; hi: string };
  searchQuery: { en: string; hi: string };
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  color: string;
  accentBg: string;
  borderHover: string;
  immediateAdvice: {
    heading: { en: string; hi: string };
    points: { en: string[]; hi: string[] };
  };
  scriptType: { en: string; hi: string };
  scriptRecipientNote: { en: string; hi: string };
  powerReplyText: { en: string; hi: string };
  steps: Array<{
    number: number;
    title: { en: string; hi: string };
    detail: { en: string; hi: string };
    actionText?: { en: string; hi: string };
    actionType?: 'draft' | 'takedown' | 'stopncii' | 'evidence' | 'call1930' | 'call1091' | 'callTeleManas' | 'lockdown';
    externalUrl?: string;
  }>;
  psychologicalFact: { en: string; hi: string };
  parentConversationGuide?: { en: string; hi: string };
}

export const GirlsRescueGuide: React.FC<GirlsRescueGuideProps> = ({
  language,
  onNavigateToTab,
  onSelectCategoryForDraft,
}) => {
  const isHindi = language === 'hi';
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('extortion_money');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Scenarios synchronized with canonical statute packages from statuteCitations.ts
  const scenarios: GirlScenario[] = [
    {
      id: 'extortion_money',
      icon: AlertTriangle,
      category: 'extortion_blackmail',
      statutePackageKey: 'extortion_blackmail',
      statutePackage: OFFENSE_STATUTE_MAPPINGS.extortion_blackmail,
      badge: { en: 'Immediate Threat', hi: 'तत्काल खतरा' },
      searchQuery: { 
        en: '"Someone has my private photos and asking for money / video in 15 mins"', 
        hi: '"कोई मेरी प्राइवेट फोटो दिखाकर 15 मिनट में पैसे या वीडियो मांग रहा है"' 
      },
      title: { 
        en: 'I am being blackmailed on WhatsApp / Instagram right now', 
        hi: 'मुझे व्हाट्सऐप या इंस्टाग्राम पर अभी ब्लैकमेल किया जा रहा है' 
      },
      description: { 
        en: 'The blackmailer is threatening to send private photos or chats to my followers, parents, or college friends if I do not pay or send more.', 
        hi: 'ब्लैकमेलर पैसे न देने पर फोटो मेरे दोस्तों, इंस्टाग्राम फॉलोअर्स या परिवार को भेजने की धमकी दे रहा है।' 
      },
      color: '#E25822',
      accentBg: 'bg-[#FFF5F2]',
      borderHover: 'hover:border-[#E25822]',
      immediateAdvice: {
        heading: { 
          en: 'Core guidance: Do not transfer funds and do not negotiate', 
          hi: 'मुख्य सलाह: पैसे न दें और बातचीत बंद रखें' 
        },
        points: {
          en: [
            'Paying money does not stop extortion. Evidence from cyber crime helplines shows that paying extortionists leads to further demands rather than relief. Perpetrators view payment as proof that extortion works.',
            'Do not delete your chat history or block immediately without first capturing timestamped screenshots showing their phone number, handle, and messages.',
            'Send our verified legal deterrent message below and then block them. Citing cyber police and statutory offenses makes clear that you are documenting evidence.'
          ],
          hi: [
            'पैसे देने से ब्लैकमेल कभी बंद नहीं होता। साइबर क्राइम हेल्पलाइन के अनुसार पैसे देने पर अपराधी और बड़ी रकम मांगने लगते हैं।',
            'घबराहट में चैट डिलीट न करें। पहले स्पष्ट स्क्रीनशॉट सुरक्षित करें जिसमें ब्लैकमेलर का नंबर/आईडी और समय दिखे।',
            'नीचे दिया गया कानूनी चेतावनी संदेश भेजें और फिर ब्लॉक करें। साइबर पुलिस व कानूनी धाराओं का उल्लेख करने से आरोपी को समझ आता है कि मामला दर्ज हो रहा है।'
          ]
        }
      },
      scriptType: { 
        en: 'Legal Deterrent Message to Extortionist', 
        hi: 'ब्लैकमेलर को कानूनी चेतावनी संदेश' 
      },
      scriptRecipientNote: {
        en: 'Send this exact message once, then block them immediately. Do not engage in further negotiation.',
        hi: 'यह संदेश एक बार भेजें, फिर तुरंत ब्लॉक करें। आगे कोई बातचीत न करें।'
      },
      powerReplyText: OFFENSE_STATUTE_MAPPINGS.extortion_blackmail.warningNoticeText,
      steps: [
        {
          number: 1,
          title: { en: 'Capture Timestamped Evidence', hi: 'स्पष्ट स्क्रीनशॉट सुरक्षित करें' },
          detail: { 
            en: 'Take uncropped screenshots showing the threats, extortion demands, their profile handle, and UPI ID or phone number.', 
            hi: 'धमकी भरा संदेश, उनकी प्रोफाइल, फोन नंबर और मांगी गई UPI आईडी के स्पष्ट स्क्रीनशॉट लें।' 
          },
          actionText: { en: 'Evidence Preservation Guide', hi: 'सबूत चेकलिस्ट देखें' },
          actionType: 'evidence'
        },
        {
          number: 2,
          title: { en: 'Protect Images with StopNCII.org', hi: 'StopNCII पर फोटो हैश लॉक करें' },
          detail: { 
            en: 'StopNCII creates an on-device cryptographic hash. Even if the blackmailer attempts to upload to Meta platforms, automated detection blocks it without human eyes viewing the image.', 
            hi: 'StopNCII आपके फोन पर ही फोटो का डिजिटल हैश बनाता है। यदि कोई इसे इंस्टाग्राम या फेसबुक पर अपलोड करेगा तो यह बिना किसी के देखे स्वतः ब्लॉक हो जाएगी।' 
          },
          actionText: { en: 'Open StopNCII & Takedown Hub', hi: 'StopNCII व टेकडाउन हब खोलें' },
          actionType: 'takedown'
        },
        {
          number: 3,
          title: { en: 'Call 1930 / Generate e-FIR Dossier', hi: '1930 पर कॉल करें व e-FIR ड्राफ्ट लें' },
          detail: { 
            en: 'Dial 1930 immediately. Use our tool to download an official complaint draft citing BNS 308/351 and IT Act 66E/67A formatted for cyber police.', 
            hi: 'तुरंत 1930 पर कॉल करें। हमारे टूल से पुलिस और अदालत के लिए तैयार कानूनी शिकायत ड्राफ्ट डाउनलोड करें।' 
          },
          actionText: { en: 'Generate Police Draft', hi: 'पुलिस शिकायत ड्राफ्ट बनाएं' },
          actionType: 'draft'
        }
      ],
      psychologicalFact: {
        en: 'Behavioral insight: Extortionists rely on manufactured urgency, tight countdowns, and isolation. When you remain calm, refuse financial negotiation, and invoke formal statutory provisions, their leverage collapses.',
        hi: 'मनोवैज्ञानिक विश्लेषण: ब्लैकमेलर तात्कालिक डर और अलगाव पर निर्भर होते हैं। जब आप बिना डरे वित्तीय बातचीत से मना करती हैं और वैधानिक धाराओं का उल्लेख करती हैं, तो उनका दबाव खत्म हो जाता है।'
      },
      parentConversationGuide: {
        en: 'If you want to confide in a parent or trusted friend: "Someone online attempted a cyber extortion scam targeting me. Cyber Police (1930) and Indian law strictly protect my identity under Section 73 BNS, and I need your emotional support while we report this criminal."',
        hi: 'माता-पिता या बड़े भाई/बहन से बात करने का सुरक्षित तरीका: "इंटरनेट पर एक साइबर अपराधी ने मुझे निशाना बनाकर ब्लैकमेल की कोशिश की है। साइबर पुलिस (1930) और कानून (धारा 73 BNS) मेरी पहचान को पूरी तरह गुप्त रखते हैं। मुझे इस अपराधी की रिपोर्ट करने में आपका साथ चाहिए।"'
      }
    },
    {
      id: 'leaked_online',
      icon: Camera,
      category: 'viral_leaked',
      statutePackageKey: 'ncii_distribution',
      statutePackage: OFFENSE_STATUTE_MAPPINGS.ncii_distribution,
      badge: { en: '24-Hour Removal', hi: '24 घंटे में निष्कासन' },
      searchQuery: { 
        en: '"My photo or video is already uploaded on Telegram / website, how to remove"', 
        hi: '"मेरी फोटो या वीडियो टेलीग्राम या वेबसाइट पर डल चुकी है, कैसे हटाएं"' 
      },
      title: { 
        en: 'My intimate photo / video is already posted online', 
        hi: 'मेरी फोटो या वीडियो किसी वेबसाइट या टेलीग्राम पर पोस्ट हो चुकी है' 
      },
      description: { 
        en: 'It was shared on a Telegram channel, adult website, forum, or social media page without my consent.', 
        hi: 'किसी ने बिना मेरी अनुमति के टेलीग्राम ग्रुप, किसी वेबसाइट या सोशल मीडिया पर इसे डाल दिया है।' 
      },
      color: '#8B6D5C',
      accentBg: 'bg-[#F9F7F5]',
      borderHover: 'hover:border-[#8B6D5C]',
      immediateAdvice: {
        heading: { 
          en: 'Statutory 24-hour takedown under IT Rules, 2021 (Rule 3(2)(b))', 
          hi: 'आईटी नियम 2021 (नियम 3(2)(b)) के तहत 24 घंटे में निष्कासन का वैधानिक अधिकार' 
        },
        points: {
          en: [
            'Under Rule 3(2)(b) of the Information Technology Rules, 2021, online intermediaries (Meta, Telegram, Google, Reddit, X) are legally obligated to remove non-consensual intimate imagery within 24 hours of receiving notice.',
            'Copy the exact post URL/link and Telegram channel or group link before reporting.',
            'Use our integrated Takedown Portal to send direct statutory notices to platform grievance officers.'
          ],
          hi: [
            'आईटी नियम 2021 (Rule 3(2)(b)) के तहत, सोशल मीडिया प्लेटफॉर्म्स को गैर-सहमति वाली निजी सामग्री की औपचारिक शिकायत मिलने पर 24 घंटे के भीतर उसे हटाने का कानूनी दायित्व है।',
            'रिपोर्ट करने से पहले उस पोस्ट का लिंक (URL) और संबंधित ग्रुप का लिंक कॉपी कर लें।',
            'प्लेटफॉर्म्स के नोडल अधिकारियों को 24-घंटे का वैधानिक नोटिस भेजने के लिए हमारे टेकडाउन पोर्टल का उपयोग करें।'
          ]
        }
      },
      scriptType: { 
        en: '24-Hour Intermediary Takedown Notice for Grievance Officers', 
        hi: 'प्लेटफॉर्म ग्रीवेंस अधिकारी हेतु 24-घंटे का निष्कासन नोटिस' 
      },
      scriptRecipientNote: {
        en: 'Submit this notice directly to the platform Grievance Officer email or webform in our Takedown Portal.',
        hi: 'हमारे टेकडाउन पोर्टल में दिए गए ग्रीवेंस अधिकारी के ईमेल या फॉर्म पर यह नोटिस भेजें।'
      },
      powerReplyText: OFFENSE_STATUTE_MAPPINGS.ncii_distribution.warningNoticeText,
      steps: [
        {
          number: 1,
          title: { en: 'File Direct 24-Hr Platform Takedowns', hi: 'प्लेटफॉर्म से 24 घंटे में हटाएं' },
          detail: { 
            en: 'Access direct statutory removal routes for Instagram, Telegram, Google Search, and website Grievance Officers.', 
            hi: 'इंस्टाग्राम, टेलीग्राम और गूगल से कंटेंट तुरंत हटाने के डायरेक्ट वैधानिक रूट्स।' 
          },
          actionText: { en: 'Open Platform Takedown Hub', hi: 'प्लेटफॉर्म टेकडाउन हब खोलें' },
          actionType: 'takedown'
        },
        {
          number: 2,
          title: { en: 'Lock Future Uploads via StopNCII / Take It Down', hi: 'StopNCII व TakeItDown से ब्लॉक करें' },
          detail: { 
            en: 'If aged 18+, use StopNCII.org. If under 18, use TakeItDown to prevent redistribution across web platforms.', 
            hi: 'यदि 18 से कम उम्र है तो TakeItDown और 18+ हैं तो StopNCII से हमेशा के लिए री-अपलोड ब्लॉक करें।' 
          },
          actionText: { en: 'Open StopNCII & Takedown Hub', hi: 'StopNCII टेकडाउन हब खोलें' },
          actionType: 'takedown'
        },
        {
          number: 3,
          title: { en: 'File Confidential Report on cybercrime.gov.in', hi: 'बिना नाम बताए गुप्त रिपोर्ट दर्ज करें' },
          detail: { 
            en: 'The National Cyber Crime Reporting Portal allows confidential reporting under "Crime Against Women/Children".', 
            hi: 'सरकारी पोर्टल cybercrime.gov.in पर अपनी पहचान की गोपनीयता के साथ रिपोर्ट दर्ज करें।' 
          },
          actionText: { en: 'Generate e-FIR Complaint Draft', hi: 'e-FIR शिकायत ड्राफ्ट बनाएं' },
          actionType: 'draft'
        }
      ],
      psychologicalFact: {
        en: 'Regulatory fact: Under Rule 3(2)(b) of the IT Rules 2021, major social media intermediaries operate dedicated priority review pipelines for intimate imagery complaints to avoid losing legal intermediary immunity.',
        hi: 'नियामक तथ्य: आईटी नियम 2021 के तहत सभी प्रमुख सोशल मीडिया प्लेटफॉर्म्स अंतरंग सामग्री की शिकायतों के लिए विशेष त्वरित टीम रखते हैं ताकि उनका वैधानिक संरक्षण समाप्त न हो।'
      }
    },
    {
      id: 'ai_deepfake',
      icon: Sparkles,
      category: 'ai_deepfake_morph',
      statutePackageKey: 'ai_deepfake_morph',
      statutePackage: OFFENSE_STATUTE_MAPPINGS.ai_deepfake_morph,
      badge: { en: 'AI & Morphed', hi: 'AI डीपफेक व मॉर्फिंग' },
      searchQuery: { 
        en: '"Someone made fake AI nude or morphed picture of my face from Instagram"', 
        hi: '"किसी ने इंस्टाग्राम से मेरी फोटो लेकर AI से फेक/न्यूड डीपफेक बना दी"' 
      },
      title: { 
        en: 'Someone created an AI Deepfake or Morphed Photo of me', 
        hi: 'किसी ने AI या फोटोशॉप से मेरी फेक/मॉर्फ्ड फोटो या वीडियो बनाई है' 
      },
      description: { 
        en: 'A face-swap bot or generative AI tool was used on my social media photos to fabricate inappropriate imagery.', 
        hi: 'मेरी सामान्य सोशल मीडिया फोटो का चेहरा बदलकर AI द्वारा अश्लील फोटो/वीडियो बनाई गई है।' 
      },
      color: '#4F46E5',
      accentBg: 'bg-[#EEF2FF]',
      borderHover: 'hover:border-[#4F46E5]',
      immediateAdvice: {
        heading: { 
          en: 'Morphed and AI deepfakes are serious criminal offenses', 
          hi: 'AI डीपफेक और मॉर्फिंग गंभीर कानूनी अपराध हैं' 
        },
        points: {
          en: [
            'Synthetic and face-swapped imagery is a product of software manipulation — you bear zero guilt or blame for unauthorized creations using your photos.',
            'Creating, storing, or circulating morphed or synthetic explicit media violates Section 336 of the BNS (Forgery for harming reputation), alongside Sections 66E and 67A of the IT Act and Section 79 of the BNS.',
            'Immediately lock your social media profiles to private, remove personal profile photos, and revoke unused third-party application permissions.'
          ],
          hi: [
            'AI डीपफेक और मॉर्फ्ड फोटो पूरी तरह फर्जी सॉफ्टवेयर जनित सामग्री हैं — इसमें आपकी कोई गलती या दोष नहीं है।',
            'AI से फर्जी अश्लील सामग्री बनाना व फैलाना BNS धारा 336 (जालसाजी), IT एक्ट धारा 66E व 67A, और BNS धारा 79 के तहत दंडनीय अपराध है।',
            'तुरंत अपने सोशल मीडिया अकाउंट्स को प्राइवेट करें और प्रोफाइल फोटो हटा लें ताकि कोई अन्य फोटो न ले सके।'
          ]
        }
      },
      scriptType: { 
        en: 'Public Clarification & Forwarding Warning for Social Media', 
        hi: 'सोशल मीडिया स्टेटस / फॉलोअर्स हेतु सार्वजनिक स्पष्टीकरण व चेतावनी' 
      },
      scriptRecipientNote: {
        en: 'Post this notice to your story, bio, or status. It informs your network of the cyber crime and warns anyone against forwarding.',
        hi: 'इसे अपनी स्टोरी या स्टेटस पर पोस्ट करें ताकि दोस्तों को सच पता चले और कोई इसे आगे न भेजे।'
      },
      powerReplyText: OFFENSE_STATUTE_MAPPINGS.ai_deepfake_morph.warningNoticeText,
      steps: [
        {
          number: 1,
          title: { en: 'Apply Complete Social Media Lockdown', hi: 'सोशल मीडिया प्राइवेसी लॉकडाउन करें' },
          detail: { 
            en: 'Turn accounts to Private, restrict story sharing, disable search indexing, and revoke third-party app permissions.', 
            hi: 'अकाउंट प्राइवेट करें, स्टोरी शेयरिंग बंद करें और अनचाहे ऐप्स की परमिशन हटाएं।' 
          },
          actionText: { en: '10-Min Privacy Lockdown Guide', hi: 'प्राइवेसी लॉकडाउन गाइड देखें' },
          actionType: 'lockdown'
        },
        {
          number: 2,
          title: { en: 'Generate AI Deepfake Police Draft', hi: 'AI डीपफेक पुलिस शिकायत तैयार करें' },
          detail: { 
            en: 'Our draft generator automatically includes statutory provisions for synthetic media under BNS 336, IT Act 66E/67A, and BNS 79.', 
            hi: 'हमारा टूल AI डीपफेक के लिए विशेष कानूनी धाराओं (BNS 336, IT Act 66E, BNS 79) के साथ ड्राफ्ट तैयार करता है।' 
          },
          actionText: { en: 'Generate Deepfake Complaint', hi: 'डीपफेक शिकायत बनाएं' },
          actionType: 'draft'
        },
        {
          number: 3,
          title: { en: 'Remove from Search & Social Media', hi: 'सर्च और प्लेटफॉर्म से हटवाएं' },
          detail: { 
            en: 'Submit Google de-indexing requests and platform takedowns via our dedicated Takedown Hub.', 
            hi: 'हमारे टेकडाउन हब से गूगल सर्च और सोशल मीडिया प्लेटफॉर्म्स को निष्कासन नोटिस भेजें।' 
          },
          actionText: { en: 'Open Takedown Hub & Removals', hi: 'टेकडाउन हब खोलें' },
          actionType: 'takedown'
        }
      ],
      psychologicalFact: {
        en: 'Community pattern: Posting a calm, factual public clarification stating that synthetic media was generated without consent and reported to 1930 neutralizes social stigma and prompts friends to mass-report the offending profile.',
        hi: 'सामुदायिक सहयोग: जब आप शांति से स्पष्ट कर देती हैं कि यह AI द्वारा बनाई गई फर्जी फोटो है और साइबर सेल (1930) में शिकायत दर्ज हो चुकी है, तो लोग सच समझते हैं और फेक प्रोफाइल को रिपोर्ट करते हैं।'
      }
    },
    {
      id: 'ex_partner',
      icon: UserX,
      category: 'extortion_blackmail',
      statutePackageKey: 'known_person_threats',
      statutePackage: OFFENSE_STATUTE_MAPPINGS.known_person_threats,
      badge: { en: 'Known Individual', hi: 'परिचित या पुराना साथी' },
      searchQuery: { 
        en: '"Ex-boyfriend / known person threatening to leak personal videos after breakup"', 
        hi: '"ब्रेकअप के बाद एक्स-बॉयफ्रेंड या पुराना दोस्त प्राइवेट वीडियो लीक करने की धमकी दे रहा है"' 
      },
      title: { 
        en: 'An Ex-Partner or Known Person is threatening to leak our private chats/photos', 
        hi: 'कोई पूर्व साथी (Ex) या परिचित हमारी निजी फोटो/चैट लीक करने की धमकी दे रहा है' 
      },
      description: { 
        en: 'The person who has the media is someone I once trusted. They are using it to coerce me into remaining in contact, meeting, or retaliating.', 
        hi: 'जिसके पास फोटो हैं वह मेरा पूर्व साथी या परिचित है, जो बात करने, मिलने या बदला लेने के लिए दबाव बना रहा है।' 
      },
      color: '#DC2626',
      accentBg: 'bg-[#FEF2F2]',
      borderHover: 'hover:border-[#DC2626]',
      immediateAdvice: {
        heading: { 
          en: 'Statutory protection under BNS Sections 77, 308 & 351 and IT Act 66E', 
          hi: 'BNS धारा 77, 308, 351 व IT एक्ट 66E के तहत वैधानिक संरक्षण' 
        },
        points: {
          en: [
            'Past trust in a relationship does not grant anyone the legal right to retain, threaten, or circulate your private photographs or messages.',
            'Under BNS Section 77 (Voyeurism), Section 308 (Extortion), and Section 351 (Criminal Intimidation), threatening a woman with intimate media carries rigorous penal terms.',
            'Preserve past chat logs where threats were made. Sending a formal statutory legal notice makes clear that their conduct is being documented for law enforcement.'
          ],
          hi: [
            'संबंध टूटने के बाद भी किसी को आपकी निजी तस्वीरें रखने या प्रसारित करने का कोई कानूनी अधिकार नहीं है।',
            'BNS की धारा 77 (वॉयरिज्म), धारा 308 (जबरन वसूली) और धारा 351 (आपराधिक धमकी) के तहत ऐसा करना गैर-जमानती संज्ञेय अपराध है।',
            'धमकी वाले पुराने संदेश सुरक्षित रखें। औपचारिक कानूनी नोटिस भेजने से यह स्पष्ट होता है कि उनके खिलाफ सबूत दर्ज हो रहे हैं।'
          ]
        }
      },
      scriptType: { 
        en: 'Formal Statutory Notice to Known Individual / Ex-Partner', 
        hi: 'परिचित व्यक्ति या पूर्व साथी को औपचारिक वैधानिक नोटिस' 
      },
      scriptRecipientNote: {
        en: 'Send this exact notice once, preserve their reply or read receipts as proof, and avoid entering into emotional arguments.',
        hi: 'यह नोटिस एक बार भेजें, रसीद या उत्तर का स्क्रीनशॉट सुरक्षित रखें, और भावुक बहस में न पड़ें।'
      },
      powerReplyText: OFFENSE_STATUTE_MAPPINGS.known_person_threats.warningNoticeText,
      steps: [
        {
          number: 1,
          title: { en: 'Issue Formal Statutory Notice', hi: 'स्पष्ट कानूनी नोटिस भेजें' },
          detail: { 
            en: 'Send the structured statutory notice below so there is written proof of warning on record.', 
            hi: 'नीचे दिया गया कानूनी संदेश कॉपी करके भेजें ताकि रिकॉर्ड में लिखित चेतावनी मौजूद रहे।' 
          },
          actionText: { en: 'Copy Warning Message Below', hi: 'नीचे दिया गया संदेश कॉपी करें' }
        },
        {
          number: 2,
          title: { en: 'Preempt with StopNCII.org', hi: 'StopNCII से सोशल मीडिया पर ब्लॉक करें' },
          detail: { 
            en: 'Generate the cryptographic privacy hash so they cannot post it to Instagram, Facebook, or associated platforms even if they attempt.', 
            hi: 'StopNCII पर हैश बना लें ताकि वह कोशिश भी करे तो फेसबुक व इंस्टाग्राम पर फोटो अपलोड न हो सके।' 
          },
          actionText: { en: 'Open StopNCII & Takedown Hub', hi: 'StopNCII टेकडाउन हब खोलें' },
          actionType: 'takedown'
        },
        {
          number: 3,
          title: { en: 'Reach Out to Women Helpline 1091 / Police', hi: 'महिला हेल्पलाइन 1091 पर सहायता लें' },
          detail: { 
            en: 'Dial 1091 (Women Police Helpline) or 112 for confidential local officer intervention.', 
            hi: 'महिला पुलिस हेल्पलाइन 1091 या 112 पर कॉल करके बिना किसी झिझक के मदद लें।' 
          },
          actionText: { en: 'Call 1091 (Women Helpline)', hi: '1091 पर कॉल करें' },
          actionType: 'call1091',
          externalUrl: 'tel:1091'
        }
      ],
      psychologicalFact: {
        en: 'Behavioral reality: Known offenders often rely on the victim staying silent due to relationship history. Serving a formal notice citing specific non-bailable BNS sections often deters further contact — you also have the statutory right to seek immediate police protection.',
        hi: 'व्यावहारिक सत्य: परिचित व्यक्ति अक्सर सोचते हैं कि लोकलाज के कारण आप चुप रहेंगी। जब उन्हें BNS की गैर-जमानती धाराओं का औपचारिक नोटिस मिलता है, तो वे अक्सर पीछे हट जाते हैं — आपको त्वरित पुलिस सहायता पाने का पूरा वैधानिक अधिकार है।'
      }
    },
    {
      id: 'family_fear',
      icon: HelpCircle,
      category: 'extortion_blackmail',
      statutePackageKey: 'identity_and_procedural_rights',
      statutePackage: OFFENSE_STATUTE_MAPPINGS.identity_and_procedural_rights,
      badge: { en: 'Confidentiality & Rights', hi: 'गोपनीयता व कानूनी अधिकार' },
      searchQuery: { 
        en: '"I am scared to tell anyone, what if my parents or police tell everyone"', 
        hi: '"मुझे डर लग रहा है, क्या पुलिस या साइबर पोर्टल मेरे घर वालों को बता देगा"' 
      },
      title: { 
        en: 'I am terrified my family, college, or workplace will find out', 
        hi: 'मुझे बहुत डर लग रहा है कि मेरे परिवार या कॉलेज में किसी को पता न चल जाए' 
      },
      description: { 
        en: 'The fear of parental reprimand, social stigma, or losing college access is making me feel isolated and trapped.', 
        hi: 'घर पर डांट पड़ने, बदनामी होने या पढ़ाई छूटने के डर से मुझे समझ नहीं आ रहा कि किससे मदद मांगूं।' 
      },
      color: '#059669',
      accentBg: 'bg-[#ECFDF5]',
      borderHover: 'hover:border-[#059669]',
      immediateAdvice: {
        heading: { 
          en: 'Identity protection under Section 73 BNS and statement recording under BNSS 173', 
          hi: 'धारा 73 BNS के तहत पहचान की सुरक्षा व BNSS 173 के तहत बयान का अधिकार' 
        },
        points: {
          en: [
            'Under Section 73 of the BNS, Indian law strictly prohibits disclosing or publishing the identity of victims of intimate or sexual offenses. Any person or officer violating this faces imprisonment.',
            'You have the statutory right to file complaints confidentially without public disclosure on the National Cyber Crime Reporting Portal (cybercrime.gov.in).',
            'Under Section 173 of the BNSS, you have the legal right to have your statement recorded exclusively by a woman police officer at your residence or a place of your choice.'
          ],
          hi: [
            'BNS की धारा 73 के तहत किसी भी पीड़िता की पहचान या नाम उजागर करना कानूनन प्रतिबंधित है। इसका उल्लंघन करने वाले को कारावास हो सकता है।',
            'आप cybercrime.gov.in पर बिना सार्वजनिक खुलासे के पूर्ण गोपनीयता के साथ रिपोर्ट दर्ज करने का वैधानिक अधिकार रखती हैं।',
            'BNSS धारा 173 के तहत महिला पुलिस अधिकारी द्वारा ही आपकी सुविधानुसार गोपनीय बयान दर्ज किया जाना अनिवार्य है।'
          ]
        }
      },
      scriptType: { 
        en: 'Statutory Request for Confidential Recording (Section 73 BNS & BNSS 173)', 
        hi: 'गोपनीयता व महिला अधिकारी द्वारा बयान का वैधानिक आवेदन' 
      },
      scriptRecipientNote: {
        en: 'Attach this request to your cybercrime complaint or present it to the police desk to assert your statutory procedural rights.',
        hi: 'अपनी साइबर शिकायत के साथ लगाएं या पुलिस डेस्क पर देकर अपने वैधानिक अधिकारों का उपयोग करें।'
      },
      powerReplyText: OFFENSE_STATUTE_MAPPINGS.identity_and_procedural_rights.warningNoticeText,
      steps: [
        {
          number: 1,
          title: { en: 'Speak with a 24/7 Confidential Female Counselor', hi: 'महिला काउंसलर से गुप्त बातचीत करें' },
          detail: { 
            en: 'Free, non-judgmental emotional and psychological guidance on Tele-MANAS (14416) or NCW Helpline.', 
            hi: 'Tele-MANAS (14416) या महिला आयोग पर बिल्कुल मुफ्त, बिना किसी जजमेंट के गुप्त परामर्श पाएं।' 
          },
          actionText: { en: 'Call Tele-MANAS 14416', hi: '14416 पर कॉल करें' },
          actionType: 'callTeleManas',
          externalUrl: 'tel:14416'
        },
        {
          number: 2,
          title: { en: 'Review Statutory Protections & Generate Draft', hi: 'अपने कानूनी अधिकार जानें व ड्राफ्ट बनाएं' },
          detail: { 
            en: 'Generate a structured complaint invoking Section 73 BNS and Zero FIR procedural rights.', 
            hi: 'धारा 73 BNS और जीरो एफआईआर के अधिकारों के साथ तैयार ड्राफ्ट प्राप्त करें।' 
          },
          actionText: { en: 'Generate Confidential Police Draft', hi: 'गोपनीय पुलिस ड्राफ्ट बनाएं' },
          actionType: 'draft'
        },
        {
          number: 3,
          title: { en: 'Use Anonymous Takedown Portals First', hi: 'बिना नाम बताए टूल्स से फोटो हटवाएं' },
          detail: { 
            en: 'StopNCII, Google Removals, and platform takedowns can be submitted privately without family disclosure.', 
            hi: 'StopNCII और गूगल रिमूवल से आप बिना किसी को बताए घर बैठे फोटो ब्लॉक करा सकती हैं।' 
          },
          actionText: { en: 'Open Takedown Hub', hi: 'रिमूवल टूल्स खोलें' },
          actionType: 'takedown'
        }
      ],
      psychologicalFact: {
        en: 'Support insight: Cyber extortion and unauthorized image distribution are calculated offenses where you are the victim of a crime. You did not invite or cause this conduct, and statutory safeguards exist specifically to protect your dignity and confidentiality.',
        hi: 'संबल व मार्गदर्शन: साइबर ब्लैकमेल पूरी तरह एक गैर-कानूनी अपराध है जिसमें आप पीड़िता हैं। इसमें आपकी कोई गलती नहीं है, और कानून आपकी गोपनीयता व गरिमा की रक्षा के लिए पूरी तरह साथ खड़ा है।'
      }
    }
  ];

  const currentScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];

  const handleSelectScenario = (id: string) => {
    setSelectedScenarioId(id);
    smoothScrollTo('rescue-scenario-action-board');
  };

  return (
    <div id="girls-rescue-guide" className="space-y-8 scroll-mt-48">
      {/* Top Banner Context Header */}
      <div className="bg-[#FAF8F3] border border-[#E8E2DC] rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B6D5C]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#8B6D5C]/10 text-[#8B6D5C] rounded-full text-xs font-bold tracking-tight">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isHindi ? 'त्वरित आपातकालीन मार्गदर्शिका' : 'Incident Triage & Rapid Rescue'}</span>
            </span>
            <span className="text-xs text-[#888] font-medium hidden sm:inline">
              {isHindi ? 'ऑन-डिवाइस व सुरक्षित' : 'On-device and private'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2D2D] tracking-tight">
            {isHindi ? 'परिस्थिति अनुसार तत्काल समाधान व कानूनी सुरक्षा' : 'Detailed Platform Guides & Parental Support'}
          </h2>

          <p className="text-xs sm:text-sm text-[#555] leading-relaxed">
            {isHindi
              ? 'साइबर ब्लैकमेल, वायरल मीडिया, डीपफेक या परिचित व्यक्ति से मिल रही धमकियों के लिए भारतीय कानून (BNS 2023, IT Act 2000) अनुसार प्रमाणित समाधान।'
              : 'Actionable, rights-grounded protocols under the Bharatiya Nyaya Sanhita (BNS), 2023 and IT Act, 2000 for blackmail, leaked media, AI deepfakes, and relationship extortion.'}
          </p>
        </div>
      </div>

      {/* 5 Scenario Selector Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-[#8B6D5C] uppercase tracking-wider">
            {isHindi ? '1. अपनी परिस्थिति चुनें:' : '1. Select the scenario that matches your situation:'}
          </h3>
          <span className="text-xs text-[#888]">
            {isHindi ? '5 विशिष्ट परिदृश्य' : '5 specific scenarios'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {scenarios.map((scenario) => {
            const isSelected = scenario.id === selectedScenarioId;
            const Icon = scenario.icon;

            return (
              <button
                key={scenario.id}
                onClick={() => handleSelectScenario(scenario.id)}
                className={`text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 relative group ${
                  isSelected
                    ? 'bg-white border-[#8B6D5C] shadow-md ring-2 ring-[#8B6D5C]/20'
                    : 'bg-[#FAF9F6] border-[#E8E2DC] hover:bg-white hover:border-[#8B6D5C]/40 hover:shadow-xs'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                      style={{ backgroundColor: `${scenario.color}15`, color: scenario.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${scenario.color}15`, color: scenario.color }}
                    >
                      {scenario.badge[language]}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-[#2D2D2D] leading-snug line-clamp-2">
                    {scenario.title[language]}
                  </h4>
                </div>

                <div className="pt-2 border-t border-[#F0EBE6] flex items-center justify-between text-[11px] text-[#777]">
                  <span>{isHindi ? 'समाधान देखें' : 'View protocol'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-1 text-[#8B6D5C]' : 'group-hover:translate-x-0.5'}`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Scenario Action Board */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScenario.id}
          id="rescue-scenario-action-board"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="bg-white border border-[#E8E2DC] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-48"
        >
          {/* Top Title & Canonical Statute Badge */}
          <div className="border-b border-[#F0EBE6] pb-5 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-[#F3EFEC] text-[#8B6D5C] font-bold text-xs">
                {currentScenario.badge[language]}
              </span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5F2ED] text-[#2D2D2D] rounded-full text-xs font-semibold border border-[#E5DFD9]">
                <Scale className="w-3.5 h-3.5 text-[#8B6D5C]" />
                <span>{currentScenario.statutePackage.headerSummaryBadge[language]}</span>
              </div>
              <span className="text-xs text-[#AAA] hidden sm:inline">•</span>
              <span className="text-xs text-[#666] font-mono italic hidden sm:inline">
                {currentScenario.searchQuery[language]}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#2D2D2D] tracking-tight">
              {currentScenario.title[language]}
            </h3>
            <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
              {currentScenario.description[language]}
            </p>
          </div>

          {/* Immediate Advisory Box */}
          <div className="bg-[#FAF9F6] border border-[#E8E2DC] rounded-2xl p-5 sm:p-6 space-y-3">
            <div className="flex items-center gap-2.5 text-[#2D2D2D] font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-[#E25822] shrink-0" />
              <span>{currentScenario.immediateAdvice.heading[language]}</span>
            </div>
            <ul className="space-y-2 pl-5 list-disc text-xs sm:text-sm text-[#444] leading-relaxed">
              {currentScenario.immediateAdvice.points[language].map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>

          {/* Standardized Copyable Legal Script / Notice (Present Across All 5 Cards) */}
          <div className="bg-[#2D2D2D] text-[#FAF9F6] rounded-2xl p-5 sm:p-6 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#E25822]" />
                <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                  {currentScenario.scriptType[language]}
                </h4>
              </div>

              <button
                onClick={() => handleCopy(currentScenario.powerReplyText[language], `power_${currentScenario.id}`)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#8B6D5C] hover:bg-[#775c4c] text-white rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer select-none"
              >
                {copiedKey === `power_${currentScenario.id}` ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>{isHindi ? 'कॉपी हो गया!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{isHindi ? 'संदेश कॉपी करें' : 'Copy Notice'}</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-black/30 border border-white/10 rounded-xl p-4 font-mono text-xs sm:text-[13px] text-[#E5DFD9] leading-relaxed select-all whitespace-pre-line">
              {currentScenario.powerReplyText[language]}
            </div>

            <p className="text-[11px] text-[#AAA] italic">
              {currentScenario.scriptRecipientNote[language]}
            </p>
          </div>

          {/* Action Steps (Numbered Lithe Cards) */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-bold text-[#8B6D5C] uppercase tracking-wider">
              {isHindi ? '2. आपके लिए 3-चरणीय समाधान प्रक्रिया:' : '2. Your 3-Step Action Workflow:'}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentScenario.steps.map((step) => (
                <div
                  key={step.number}
                  className="bg-[#FAF9F6] border border-[#E8E2DC] hover:border-[#8B6D5C]/50 rounded-2xl p-5 flex flex-col justify-between transition-all space-y-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-[#8B6D5C] text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {step.number}
                      </span>
                      <h5 className="font-bold text-[#2D2D2D] text-sm leading-snug">
                        {step.title[language]}
                      </h5>
                    </div>
                    <p className="text-xs text-[#555] leading-relaxed pl-8">
                      {step.detail[language]}
                    </p>
                  </div>

                  {step.actionText && (
                    <div className="pl-8 pt-1">
                      {step.externalUrl ? (
                        <a
                          href={step.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-[#2D2D2D] hover:text-white text-[#2D2D2D] rounded-full text-xs font-bold border border-[#DED9D4] transition-colors shadow-2xs"
                        >
                          <span>{step.actionText[language]}</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                        </a>
                      ) : (
                        <button
                          onClick={() => {
                            if (step.actionType === 'draft') {
                              if (onSelectCategoryForDraft) {
                                onSelectCategoryForDraft(currentScenario.category);
                              }
                              onNavigateToTab('drafts', 'complaint-draft-generator');
                            } else if (step.actionType === 'takedown' || step.actionType === 'stopncii') {
                              onNavigateToTab('takedown', 'platform-takedown-portal');
                            } else if (step.actionType === 'evidence') {
                              onNavigateToTab('evidence', 'evidence-preservation-tool');
                            } else if (step.actionType === 'lockdown') {
                              onNavigateToTab('lockdown', 'privacy-lockdown-guide');
                            } else {
                              handleCopy(currentScenario.powerReplyText[language], `power_${currentScenario.id}`);
                            }
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-[#2D2D2D] hover:text-white text-[#2D2D2D] rounded-full text-xs font-bold border border-[#DED9D4] transition-colors shadow-2xs cursor-pointer"
                        >
                          <span>{step.actionText[language]}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Behavioral & Regulatory Fact */}
          <div className="bg-[#F3EFEC] rounded-2xl p-4 sm:p-5 flex items-start gap-3 border border-[#E5DFD9]">
            <Brain className="w-5 h-5 text-[#8B6D5C] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B6D5C]">
                {isHindi ? 'साइबर सुरक्षा व व्यावहारिक तथ्य' : 'Cyber Security & Behavioral Fact'}
              </span>
              <p className="text-xs text-[#444] leading-relaxed">
                {currentScenario.psychologicalFact[language]}
              </p>
            </div>
          </div>

          {/* Safe Family / Friend Conversation Guide */}
          {currentScenario.parentConversationGuide && (
            <div className="bg-white border border-[#E8E2DC] rounded-2xl p-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#2D2D2D] font-bold text-xs sm:text-sm">
                  <HeartHandshake className="w-4 h-4 text-[#E25822]" />
                  <span>{isHindi ? 'यदि आप परिवार/विश्वसनीय दोस्त को बताना चाहती हैं:' : 'Safe Script To Talk To Family / Trusted Friend:'}</span>
                </div>
                <button
                  onClick={() => handleCopy(currentScenario.parentConversationGuide![language], `parent_${currentScenario.id}`)}
                  className="text-xs text-[#8B6D5C] hover:underline font-bold inline-flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedKey === `parent_${currentScenario.id}` ? (isHindi ? 'कॉपी हो गया' : 'Copied') : (isHindi ? 'कॉपी करें' : 'Copy Script')}</span>
                </button>
              </div>
              <p className="text-xs text-[#555] italic bg-[#FAF9F6] p-3.5 rounded-xl border border-[#F0EBE6] leading-relaxed">
                {currentScenario.parentConversationGuide[language]}
              </p>
            </div>
          )}

          {/* Fast Navigation Quick-Links */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#F0EBE6] text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#777] font-medium">{isHindi ? 'अन्य टूल्स:' : 'Direct Tools:'}</span>
              <button
                onClick={() => onNavigateToTab('drafts')}
                className="text-[#8B6D5C] hover:underline font-bold cursor-pointer"
              >
                {isHindi ? 'शिकायत ड्राफ्ट व PDF' : 'Legal Drafts & PDF'}
              </button>
              <span>•</span>
              <button
                onClick={() => onNavigateToTab('grounding')}
                className="text-[#8B6D5C] hover:underline font-bold cursor-pointer"
              >
                {isHindi ? 'सांस अभ्यास' : 'Panic First-Aid'}
              </button>
              <span>•</span>
              <button
                onClick={() => onNavigateToTab('helplines')}
                className="text-[#8B6D5C] hover:underline font-bold cursor-pointer"
              >
                {isHindi ? '24/7 हेल्पलाइन' : 'Helplines'}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
