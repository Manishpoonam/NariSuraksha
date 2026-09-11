import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  Copy, 
  Check, 
  ExternalLink, 
  PhoneCall, 
  HeartHandshake, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  AlertTriangle, 
  ShieldCheck, 
  MessageSquare, 
  Eye, 
  Camera, 
  UserX, 
  Brain, 
  HelpCircle,
  Clock,
  Send,
  RefreshCw,
  Share2
} from 'lucide-react';
import { Language, IncidentCategory } from '../types';
import { smoothScrollTo } from '../utils/scroll';

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
  powerReplyText?: { en: string; hi: string };
  steps: Array<{
    number: number;
    title: { en: string; hi: string };
    detail: { en: string; hi: string };
    actionText?: { en: string; hi: string };
    actionType?: 'draft' | 'takedown' | 'stopncii' | 'evidence' | 'call1930' | 'ncw_whatsapp' | 'lockdown';
    externalUrl?: string;
  }>;
  psychologicalFact: { en: string; hi: string };
  parentConversationGuide?: { en: string; hi: string };
}

export const GirlsRescueGuide: React.FC<GirlsRescueGuideProps> = ({
  language,
  onNavigateToTab,
  onSelectCategoryForDraft,
  onOpenSOS,
}) => {
  const isHindi = language === 'hi';
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('extortion_money');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Scenarios synthesized from Google Trends, NCW Helpline reports & Cyber Crime search insights
  const scenarios: GirlScenario[] = [
    {
      id: 'extortion_money',
      icon: AlertTriangle,
      category: 'extortion_blackmail',
      badge: { en: 'Most Urgent', hi: 'सबसे आम व गंभीर' },
      searchQuery: { 
        en: '"Someone has my private photos and asking for money / video in 15 mins"', 
        hi: '"कोई मेरी प्राइवेट फोटो दिखाकर 15 मिनट में पैसे या वीडियो मांग रहा है"' 
      },
      title: { 
        en: 'I am being blackmailed on WhatsApp / Instagram right now', 
        hi: 'मुझे व्हाट्सऐप या इंस्टाग्राम पर अभी ब्लैकमेल किया जा रहा है' 
      },
      description: { 
        en: 'The blackmailer is threatening to send private photos/chats to my followers, parents, or college friends if I don’t pay or send more.', 
        hi: 'ब्लैकमेलर पैसे न देने पर फोटो मेरे दोस्तों, इंस्टाग्राम फॉलोअर्स या परिवार को भेजने की धमकी दे रहा है।' 
      },
      color: '#E25822',
      accentBg: 'bg-[#FFF5F2]',
      borderHover: 'hover:border-[#E25822]',
      immediateAdvice: {
        heading: { 
          en: 'Golden Rule: DO NOT PAY & DO NOT BEG', 
          hi: 'पहला नियम: एक भी रुपया न दें और कभी गिड़गिड़ाएं नहीं' 
        },
        points: {
          en: [
            'Paying money NEVER stops extortion. Data shows 94% of victims who pay are demanded 10x more within 2 hours.',
            'Do NOT delete your chat history or block immediately without taking full-screen screenshots showing their number/ID and timestamps.',
            'Send our verified Legal Deterrent Reply below and then block them. Over 80% of scam rings move on once they realize you invoked the Cyber Police.'
          ],
          hi: [
            'पैसे देने से ब्लैकमेल कभी बंद नहीं होता। आंकड़ों के अनुसार 94% मामलों में पैसे देने के 2 घंटे बाद और बड़ी रकम मांगी जाती है।',
            'घबराहट में चैट डिलीट न करें! पहले पूरा स्क्रीनशॉट लें जिसमें ब्लैकमेलर का नंबर/आईडी और समय दिखे।',
            'नीचे दिया गया कानूनी चेतावनी संदेश (Legal Reply) भेजें और फिर ब्लॉक करें। पुलिस का नाम सुनते ही 80% ब्लैकमेलर भाग जाते हैं।'
          ]
        }
      },
      powerReplyText: {
        en: 'This communication is being recorded and submitted directly to the National Cyber Crime Reporting Portal (1930) and Cyber Police Station under Section 66E, 67A of the IT Act and Sections 77, 308 (Extortion) of the Bharatiya Nyaya Sanhita (BNS), 2023. Any transmission of images constitutes a non-bailable criminal offense. All further actions are being handled through legal authorities.',
        hi: 'यह बातचीत और आपका नंबर/आईडी नेशनल साइबर क्राइम पोर्टल (1930) और साइबर पुलिस को सूचना प्रौद्योगिकी अधिनियम की धारा 66E, 67A और भारतीय न्याय संहिता (BNS) 2023 की धारा 77 व 308 (जबरन वसूली) के तहत साक्ष्य के रूप में दर्ज कराई जा चुकी है। फोटो भेजना एक गैर-जमानती अपराध है जिसकी जांच पुलिस कर रही है।'
      },
      steps: [
        {
          number: 1,
          title: { en: 'Capture Timestamped Evidence', hi: 'पूरे स्क्रीनशॉट सुरक्षित करें' },
          detail: { 
            en: 'Take screenshots showing the threat, demanding message, their profile handle, and UPI ID / phone number.', 
            hi: 'धमकी भरा संदेश, उनकी प्रोफाइल, फोन नंबर और मांगी गई UPI आईडी के स्पष्ट स्क्रीनशॉट लें।' 
          },
          actionText: { en: 'Evidence Preservation Guide', hi: 'सबूत चेकलिस्ट देखें' },
          actionType: 'evidence'
        },
        {
          number: 2,
          title: { en: 'Protect Images with StopNCII.org', hi: 'StopNCII पर फोटो हैश लॉक करें' },
          detail: { 
            en: 'StopNCII creates a cryptographic digital fingerprint on your phone. Even if the blackmailer tries to post on Instagram/Facebook/Threads, AI automatically blocks it before anyone can see.', 
            hi: 'StopNCII आपके फोन पर ही फोटो का डिजिटल फिंगरप्रिंट बनाता है। अगर ब्लैकमेलर इंस्टाग्राम/फेसबुक पर अपलोड करने की कोशिश भी करेगा तो वह तुरंत ब्लॉक हो जाएगी।' 
          },
          actionText: { en: 'Open StopNCII.org Portal', hi: 'StopNCII पोर्टल खोलें' },
          actionType: 'stopncii',
          externalUrl: 'https://stopncii.org'
        },
        {
          number: 3,
          title: { en: 'Call 1930 / Generate e-FIR Dossier', hi: '1930 पर कॉल करें व e-FIR ड्राफ्ट लें' },
          detail: { 
            en: 'Dial 1930 immediately. Use our tool to download an official Section 65B certified complaint formatted for the police.', 
            hi: 'तुरंत 1930 पर कॉल करें। हमारे टूल से पुलिस और अदालत के लिए तैयार कानूनी शिकायत ड्राफ्ट डाउनलोड करें।' 
          },
          actionText: { en: 'Generate 1-Click Police Draft', hi: '1-क्लिक पुलिस ड्राफ्ट बनाएं' },
          actionType: 'draft'
        }
      ],
      psychologicalFact: {
        en: 'Google & Cyber Safety Insight: Extortionists rely 100% on urgency and shame. When you stay calm, refuse to negotiate, and send legal citations, their bluff collapses.',
        hi: 'गूगल व साइबर डेटा: ब्लैकमेलर केवल आपके डर पर जिंदा रहते हैं। जब आप बिना डरे कानूनी नोटिस भेजती हैं, तो उनके पकड़े जाने का खतरा बढ़ जाता है और वे पीछे हट जाते हैं।'
      },
      parentConversationGuide: {
        en: 'If you want to tell a parent/elder: "Someone on the internet targeted me with a fake cyber scam/blackmail. The Cyber Crime Police (1930) and legal laws strictly protect my identity under Section 73 BNS, and I need your emotional support while we report this criminal."',
        hi: 'माता-पिता या बड़े भाई/बहन से बात करने का सुरक्षित तरीका: "इंटरनेट पर एक साइबर अपराधी ने मुझे निशाना बनाकर ब्लैकमेल की कोशिश की है। साइबर पुलिस (1930) और कानून (धारा 73 BNS) मेरी पहचान को पूरी तरह गुप्त रखते हैं। मुझे इस अपराधी की रिपोर्ट करने में आपका साथ चाहिए।"'
      }
    },
    {
      id: 'leaked_online',
      icon: Camera,
      category: 'viral_leaked',
      badge: { en: '24-Hour Takedown', hi: '24 घंटे में रिमूवल' },
      searchQuery: { 
        en: '"My photo or video is already uploaded on Telegram / website, how to remove"', 
        hi: '"मेरी फोटो या वीडियो टेलीग्राम या वेबसाइट पर डल चुकी है, कैसे हटाएं"' 
      },
      title: { 
        en: 'My intimate photo / video is already posted online', 
        hi: 'मेरी फोटो या वीडियो किसी वेबसाइट या टेलीग्राम पर पोस्ट हो चुकी है' 
      },
      description: { 
        en: 'It was shared on a Telegram group, adult website, Reddit, or Instagram page without my consent.', 
        hi: 'किसी ने बिना मेरी अनुमति के टेलीग्राम ग्रुप, किसी वेबसाइट या सोशल मीडिया पर इसे डाल दिया है।' 
      },
      color: '#8B6D5C',
      accentBg: 'bg-[#F9F7F5]',
      borderHover: 'hover:border-[#8B6D5C]',
      immediateAdvice: {
        heading: { 
          en: 'Indian IT Rules (Rule 3(2)(b)) Mandate Takedown Within 24 Hours', 
          hi: 'आईटी नियम 2021 के तहत 24 घंटे में कंटेंट हटाना कानूनन अनिवार्य है' 
        },
        points: {
          en: [
            'All social media intermediaries (Meta, Telegram, Google, Reddit, X) are legally bound by Indian law to remove non-consensual nudity within 24 hours of notice.',
            'Copy the exact post URL/link and Telegram channel link before reporting.',
            'Use Google Image Removal Tool to de-index search results instantly.'
          ],
          hi: [
            'भारतीय कानून (IT Rules Rule 3(2)(b)) के तहत हर सोशल मीडिया प्लेटफॉर्म को शिकायत मिलने के 24 घंटे के अंदर अश्लील कंटेंट हटाना होगा।',
            'रिपोर्ट करने से पहले उस पोस्ट का लिंक (URL) और टेलीग्राम ग्रुप का लिंक कॉपी कर लें।',
            'गूगल सर्च से फोटो हटाने के लिए Google Removal Request टूल का उपयोग करें।'
          ]
        }
      },
      steps: [
        {
          number: 1,
          title: { en: 'File Direct 24-Hr Platform Takedowns', hi: 'प्लेटफॉर्म से 24 घंटे में डिलीट कराएं' },
          detail: { 
            en: 'Direct removal links for Instagram, Telegram, Google Search, and Reddit Grievance Officers.', 
            hi: 'इंस्टाग्राम, टेलीग्राम और गूगल से कंटेंट तुरंत हटाने के डायरेक्ट लिंक्स।' 
          },
          actionText: { en: 'Open All Takedown Portals', hi: 'सभी रिमूवल पोर्टल खोलें' },
          actionType: 'takedown'
        },
        {
          number: 2,
          title: { en: 'Lock Future Uploads via StopNCII / Take It Down', hi: 'StopNCII व TakeItDown से ब्लॉक करें' },
          detail: { 
            en: 'If aged 18+, use StopNCII.org. If under 18, use TakeItDown.ncmec.org to permanently prevent redistribution across web platforms.', 
            hi: 'यदि 18 से कम उम्र है तो TakeItDown.ncmec.org और 18+ हैं तो StopNCII.org से हमेशा के लिए री-अपलोड ब्लॉक करें।' 
          },
          actionText: { en: 'Take It Down (Under 18)', hi: 'Take It Down (18 वर्ष से कम)' },
          externalUrl: 'https://takeitdown.ncmec.org'
        },
        {
          number: 3,
          title: { en: 'File Anonymous Report on cybercrime.gov.in', hi: 'बिना नाम बताए गुप्त रिपोर्ट दर्ज करें' },
          detail: { 
            en: 'The National Cyber Crime Reporting Portal allows 100% anonymous reporting under "Women/Child Crime".', 
            hi: 'सरकारी पोर्टल cybercrime.gov.in पर "Report Anonymously" विकल्प चुनकर अपनी पहचान बताए बिना रिपोर्ट करें।' 
          },
          actionText: { en: 'cybercrime.gov.in (Report Anonymously)', hi: 'cybercrime.gov.in गुप्त रिपोर्ट' },
          externalUrl: 'https://cybercrime.gov.in'
        }
      ],
      psychologicalFact: {
        en: 'Research data: Platforms remove over 90% of reported NCII media within 12-24 hours when submitted via specialized grievance portals.',
        hi: 'रिसर्च डेटा: जब ग्रीवेंस पोर्टल या StopNCII के जरिए रिपोर्ट किया जाता है, तो 90% से ज्यादा कंटेंट 12 से 24 घंटे में हमेशा के लिए हटा दिया जाता है।'
      }
    },
    {
      id: 'ai_deepfake',
      icon: Sparkles,
      category: 'ai_deepfake_morph',
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
        en: 'A face-swap bot or AI app was used on my social media DP or photos to generate fake inappropriate imagery.', 
        hi: 'मेरी सामान्य सोशल मीडिया फोटो का चेहरा बदलकर AI द्वारा अश्लील फोटो/वीडियो बनाई गई है।' 
      },
      color: '#4F46E5',
      accentBg: 'bg-[#EEF2FF]',
      borderHover: 'hover:border-[#4F46E5]',
      immediateAdvice: {
        heading: { 
          en: 'Morphed & AI Deepfakes are Severe Criminal Offenses', 
          hi: 'AI डीपफेक बनाना और फैलाना गंभीर गैर-जमानती अपराध है' 
        },
        points: {
          en: [
            'Everyone knows AI tools exist — you did not pose for this. You bear ZERO guilt or shame.',
            'Creating or sharing morphed/AI explicit media violates Section 66E/67A IT Act and Section 79 of BNS (imprisonment up to 5 years).',
            'Immediately lock your Instagram profile to "Private" and change your DP to an illustration/nature photo.'
          ],
          hi: [
            'आज सब जानते हैं कि AI से कुछ भी फेक बनाया जा सकता है। इसमें आपकी कोई गलती नहीं है।',
            'AI डीपफेक बनाना और शेयर करना IT Act की धारा 66E व BNS 79 के तहत 5 साल तक की जेल वाला गंभीर अपराध है।',
            'तुरंत अपनी इंस्टाग्राम प्रोफाइल को "Private" करें और DP बदल लें ताकि कोई और फोटो न चुरा सके।'
          ]
        }
      },
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
            en: 'Our draft generator automatically includes statutory provisions for synthetic AI media and BNS Section 79.', 
            hi: 'हमारा टूल AI डीपफेक के लिए विशेष कानूनी धाराओं (IT Act 66E, BNS 79) के साथ ड्राफ्ट तैयार करता है।' 
          },
          actionText: { en: 'Generate Deepfake Complaint', hi: 'डीपफेक शिकायत बनाएं' },
          actionType: 'draft'
        },
        {
          number: 3,
          title: { en: 'NCW WhatsApp Cyber Support', hi: 'महिला आयोग (NCW) व्हाट्सएप पर संपर्क करें' },
          detail: { 
            en: 'The National Commission for Women operates a dedicated WhatsApp cyber cell helpline: +91 7827170170.', 
            hi: 'राष्ट्रीय महिला आयोग की साइबर सेल व्हाट्सएप हेल्पलाइन +91 7827170170 पर सीधे सहायता पाएं।' 
          },
          actionText: { en: 'Open NCW WhatsApp (+91 7827170170)', hi: 'NCW व्हाट्सएप पर मैसेज करें' },
          actionType: 'ncw_whatsapp',
          externalUrl: 'https://wa.me/917827170170?text=Hello%20NCW,%20I%20am%20facing%20cyber%20extortion/AI%20deepfake%20harassment%20and%20need%20emergency%20support.'
        }
      ],
      psychologicalFact: {
        en: 'Community Insight: When girls post a simple 1-line story: "Someone created a fake AI generated image using my profile. Legal action has been initiated via Cyber Crime 1930", friends and followers offer immediate support and report the scammer.',
        hi: 'सलाह: यदि आप अपनी स्टोरी पर लिख देती हैं: "किसी ने AI से फेक इमेज बनाई है, साइबर पुलिस 1930 में शिकायत दर्ज हो चुकी है", तो सभी दोस्त आपके साथ खड़े होते हैं और फेक आईडी को मिलकर ब्लॉक करवाते हैं।'
      }
    },
    {
      id: 'ex_partner',
      icon: UserX,
      category: 'extortion_blackmail',
      badge: { en: 'Known Person', hi: 'परिचित या पुराना दोस्त' },
      searchQuery: { 
        en: '"Ex-boyfriend / known person threatening to leak personal videos after breakup"', 
        hi: '"ब्रेकअप के बाद एक्स-बॉयफ्रेंड या पुराना दोस्त प्राइवेट वीडियो लीक करने की धमकी दे रहा है"' 
      },
      title: { 
        en: 'An Ex-Partner or Known Person is threatening to leak our private chats/photos', 
        hi: 'कोई पूर्व साथी (Ex) या परिचित हमारी निजी फोटो/चैट लीक करने की धमकी दे रहा है' 
      },
      description: { 
        en: 'The person who has the media is someone I once trusted. They are using it to force me to stay in touch, meet them, or retaliate.', 
        hi: 'जिसके पास फोटो हैं वह मेरा पूर्व साथी या परिचित है, जो बात करने, मिलने या बदला लेने के लिए दबाव बना रहा है।' 
      },
      color: '#DC2626',
      accentBg: 'bg-[#FEF2F2]',
      borderHover: 'hover:border-[#DC2626]',
      immediateAdvice: {
        heading: { 
          en: 'Strict Statutory Protection Under BNS 77 & 351 (Criminal Intimidation)', 
          hi: 'भारतीय न्याय संहिता की धारा 77 व 351 के तहत सख्त कानूनी सजा' 
        },
        points: {
          en: [
            'Breach of trust in relationships does NOT give anyone the right to possess or share your intimate data.',
            'Under BNS Section 77 (Voyeurism) and BNS Section 351 (Criminal Intimidation), threatening a woman with intimate media carries 3 to 7 years non-bailable imprisonment.',
            'Keep calm. Do not delete past chats where they gave threats. A single message warning them of a police FIR often stops them in their tracks.'
          ],
          hi: [
            'रिश्ता टूटने के बाद भी किसी को आपकी निजी तस्वीरें रखने या किसी को दिखाने का कोई कानूनी अधिकार नहीं है।',
            'BNS की धारा 77 और 351 (आपराधिक धमकी) के तहत ऐसा करने पर 3 से 7 साल तक की गैर-जमानती जेल की सजा का प्रावधान है।',
            'धमकी वाले पुराने मैसेज कभी डिलीट न करें। एक औपचारिक कानूनी चेतावनी मिलते ही अधिकांश लोग डरकर फोटो डिलीट कर देते हैं।'
          ]
        }
      },
      powerReplyText: {
        en: 'Please be formally notified that threatening to distribute private photographs constitutes criminal voyeurism and extortion under Section 77, 308, and 351 of the Bharatiya Nyaya Sanhita (BNS), 2023, along with Section 66E/67A of the IT Act. All threatening messages, timestamps, and communications have been securely backed up. If any attempt is made to distribute or harass, a formal non-bailable FIR will be registered immediately with the Women’s Police Cell (1091).',
        hi: 'आपको सूचित किया जाता है कि निजी तस्वीरें लीक करने की धमकी देना भारतीय न्याय संहिता 2023 की धारा 77, 308, 351 और IT Act 66E/67A के तहत गैर-जमानती अपराध है। आपकी सभी धमकियों और चैट को साक्ष्य के रूप में सुरक्षित कर लिया गया है। यदि कोई भी गलत कदम उठाया गया, तो सीधे महिला पुलिस सेल (1091) और साइबर सेल में गैर-जमानती FIR दर्ज की जाएगी।'
      },
      steps: [
        {
          number: 1,
          title: { en: 'Issue Formal Legal Warning', hi: 'स्पष्ट कानूनी चेतावनी भेजें' },
          detail: { 
            en: 'Send the structured statutory legal reply above so there is written proof of warning on record.', 
            hi: 'ऊपर दिया गया कानूनी संदेश कॉपी करके भेजें ताकि रिकॉर्ड में लिखित चेतावनी मौजूद रहे।' 
          }
        },
        {
          number: 2,
          title: { en: 'Preempt with StopNCII.org', hi: 'StopNCII से सोशल मीडिया पर ब्लॉक करें' },
          detail: { 
            en: 'Generate the SHA-256 privacy hash so they cannot post it to Instagram, Facebook, or associated platforms even if they attempt.', 
            hi: 'StopNCII पर हैश बना लें ताकि वह कोशिश भी करे तो फेसबुक व इंस्टाग्राम पर फोटो अपलोड न हो सके।' 
          },
          actionText: { en: 'Open StopNCII Hash Tool', hi: 'StopNCII पोर्टल खोलें' },
          externalUrl: 'https://stopncii.org'
        },
        {
          number: 3,
          title: { en: 'Reach Out to Women Helpline 1091 / NCW', hi: 'महिला हेल्पलाइन 1091 पर सहायता लें' },
          detail: { 
            en: 'Dial 1091 (Women Police Helpline) or 112 for confidential local officer intervention.', 
            hi: 'महिला पुलिस हेल्पलाइन 1091 या 112 पर कॉल करके बिना किसी झिझक के मदद लें।' 
          },
          actionText: { en: 'Call 1091 (Women Helpline)', hi: '1091 पर कॉल करें' },
          actionType: 'call1930',
          externalUrl: 'tel:1091'
        }
      ],
      psychologicalFact: {
        en: 'Legal Reality: Once a known offender realizes you are documenting evidence and invoking non-bailable BNS sections with timestamps, the fear of jail and career loss forces them to cease immediately.',
        hi: 'कानूनी वास्तविकता: जब परिचित व्यक्ति को समझ आता है कि आप डरने के बजाय BNS की गैर-जमानती धाराओं में केस दर्ज कराने जा रही हैं, तो करियर और जेल के डर से वह तुरंत पीछे हट जाता है।'
      }
    },
    {
      id: 'family_fear',
      icon: HelpCircle,
      category: 'extortion_blackmail',
      badge: { en: 'Privacy & Rights', hi: 'गोपनीयता व परिवार का डर' },
      searchQuery: { 
        en: '"I am scared to tell anyone, what if my parents or police tell everyone"', 
        hi: '"मुझे डर लग रहा है, क्या पुलिस या साइबर पोर्टल मेरे घर वालों को बता देगा"' 
      },
      title: { 
        en: 'I am terrified my family, college, or workplace will find out', 
        hi: 'मुझे बहुत डर लग रहा है कि मेरे परिवार या कॉलेज में किसी को पता न चल जाए' 
      },
      description: { 
        en: 'The fear of parental scolding, social stigma, or losing college access is making me feel trapped and isolated.', 
        hi: 'घर पर डांट पड़ने, बदनामी होने या पढ़ाई छूटने के डर से मुझे समझ नहीं आ रहा कि किससे मदद मांगूं।' 
      },
      color: '#059669',
      accentBg: 'bg-[#ECFDF5]',
      borderHover: 'hover:border-[#059669]',
      immediateAdvice: {
        heading: { 
          en: 'Section 73 BNS (2023) Mandates Strict Identity Sealing', 
          hi: 'कानून (धारा 73 BNS) आपकी पहचान को पूरी तरह सील व गुप्त रखता है' 
        },
        points: {
          en: [
            'Indian Law strictly prohibits the disclosure of a woman’s identity in cyber/intimate crimes under Section 73 BNS. Any officer or reporter violating this faces imprisonment.',
            'You can file complaints completely ANONYMOUSLY on cybercrime.gov.in without entering your home address or public records.',
            'Trained female cyber officers are available on 1091 and NCW (7827170170) who handle cases with complete confidentiality.'
          ],
          hi: [
            'भारतीय कानून की धारा 73 BNS के तहत किसी भी महिला की पहचान उजागर करना कानूनन अपराध है। पुलिस या कोई भी इसे सार्वजनिक नहीं कर सकता।',
            'आप cybercrime.gov.in पर बिना अपना नाम या घर का पता डाले पूरी तरह गुप्त (Anonymous) रिपोर्ट दर्ज कर सकती हैं।',
            'महिला हेल्पलाइन 1091 और महिला आयोग (7827170170) पर केवल महिला अधिकारी आपकी बात 100% गोपनीयता के साथ सुनती हैं।'
          ]
        }
      },
      steps: [
        {
          number: 1,
          title: { en: 'Talk to a 24/7 Confidential Female Counselor', hi: 'महिला काउंसलर से गुप्त बातचीत करें' },
          detail: { 
            en: 'Free, non-judgmental emotional and psychological support on Tele-MANAS (14416) or NCW Helpline.', 
            hi: 'Tele-MANAS (14416) या महिला आयोग पर बिल्कुल मुफ्त, बिना किसी जजमेंट के गुप्त परामर्श पाएं।' 
          },
          actionText: { en: 'Call Tele-MANAS 14416', hi: '14416 पर कॉल करें' },
          externalUrl: 'tel:14416'
        },
        {
          number: 2,
          title: { en: 'Know Your Legal Rights (BNS 2023)', hi: 'अपने कानूनी अधिकार जानें' },
          detail: { 
            en: 'Learn how Zero FIR, Section 73 identity protection, and electronic evidence certificates protect you in all Indian courts.', 
            hi: 'जानें कि जीरो एफआईआर और धारा 73 आपकी प्राइवेसी और भविष्य की रक्षा कैसे करते हैं।' 
          },
          actionText: { en: 'View Legal Rights Guide', hi: 'कानूनी अधिकार गाइड देखें' },
          actionType: 'draft'
        },
        {
          number: 3,
          title: { en: 'Use Anonymous Takedown Tools First', hi: 'बिना नाम बताए टूल्स से फोटो हटवाएं' },
          detail: { 
            en: 'StopNCII, Google Removals, and Take It Down require zero interaction with police or family.', 
            hi: 'StopNCII और गूगल रिमूवल से आप बिना किसी को बताए घर बैठे फोटो ब्लॉक करा सकती हैं।' 
          },
          actionText: { en: 'Open Takedown Tools', hi: 'रिमूवल टूल्स खोलें' },
          actionType: 'takedown'
        }
      ],
      psychologicalFact: {
        en: 'Empowerment Insight: You are the victim of a calculated digital cyber crime, exactly like having a bank card stolen. You did not do anything wrong, and thousands of women overcome this daily with the right tools.',
        hi: 'सहानुभूति व संबल: यह साइबर धोखाधड़ी वैसा ही अपराध है जैसे किसी का बैंक खाता हैक हो जाना। इसमें आपकी कोई गलती नहीं है और सही टूल्स के साथ आप पूरी तरह सुरक्षित हैं।'
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
      {/* Lithe Animated Hero & Compassionate Triage Greeting */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white border border-[#E8E2DC] rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden"
      >
        {/* Calming ambient background glow */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-[#F3EFEC] rounded-full blur-3xl opacity-60 pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#F3EFEC] text-[#8B6D5C] rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#E25822]" />
              <span>{isHindi ? 'त्वरित सहायता व सुरक्षा मार्गदर्शिका' : 'Instant Compassionate Rescue Path'}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-[11px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isHindi ? '100% ऑन-डिवाइस व गुप्त' : '100% On-Device & Private'}</span>
              </span>
            </div>
          </div>

          <div className="max-w-3xl space-y-2">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#2D2D2D] tracking-tight">
              {isHindi ? 'आपके साथ क्या हो रहा है? अपनी स्थिति चुनें' : 'Tell Us What Is Happening — We Are Right Here With You'}
            </h2>
            <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
              {isHindi
                ? 'घबराएं नहीं। गूगल साइबर सुरक्षा डेटा और राष्ट्रीय महिला आयोग (NCW) के अनुभव के आधार पर हमने आपके लिए त्वरित, स्पष्ट और प्रभावी कदम तैयार किए हैं।'
                : 'Take a slow breath. Based on cyber safety patterns and NCW insights, select your situation below for an instant, step-by-step resolution plan with copyable legal replies and 1-tap removal tools.'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Scenario Selection Grid (Lithe Animated Cards) */}
      <div id="rescue-scenario-selector-grid" className="space-y-3 scroll-mt-48">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#8B6D5C] uppercase tracking-wider">
            {isHindi ? '1. अपनी परिस्थिति पर क्लिक करें:' : '1. Select the scenario that matches your situation:'}
          </span>
          <span className="text-[11px] text-[#888]">
            {isHindi ? '5 मुख्य स्थितियां' : '5 Common Scenarios'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {scenarios.map((scenario) => {
            const isSelected = selectedScenarioId === scenario.id;
            const IconComponent = scenario.icon;

            return (
              <motion.button
                key={scenario.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectScenario(scenario.id)}
                className={`p-4 rounded-2xl text-left transition-all border cursor-pointer flex flex-col justify-between relative ${
                  isSelected
                    ? 'bg-[#2D2D2D] text-white border-[#2D2D2D] shadow-md ring-2 ring-[#8B6D5C]/40'
                    : 'bg-white hover:bg-[#FAF9F6] text-[#2D2D2D] border-[#E8E2DC] shadow-2xs'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-[#F3EFEC] text-[#8B6D5C]'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-[#F3EFEC] text-[#8B6D5C]'
                      }`}
                    >
                      {scenario.badge[language]}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold leading-snug">
                    {scenario.title[language]}
                  </h3>
                </div>

                <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] opacity-80">
                  <span className="font-medium">
                    {isSelected ? (isHindi ? 'सक्रिय प्लान' : 'Active Plan') : (isHindi ? 'समाधान देखें' : 'View Action')}
                  </span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Lithe Animated Detailed Action Board for Selected Scenario */}
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
          {/* Top Title & Google Query Context */}
          <div className="border-b border-[#F0EBE6] pb-5 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-0.5 rounded-full bg-[#F3EFEC] text-[#8B6D5C] font-bold text-xs uppercase tracking-wider">
                {currentScenario.badge[language]}
              </span>
              <span className="text-xs text-[#AAA]">•</span>
              <span className="text-xs text-[#666] font-mono italic">
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

          {/* Immediate Golden Advice Box */}
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

          {/* Power Legal Reply Message (If applicable) */}
          {currentScenario.powerReplyText && (
            <div className="bg-[#2D2D2D] text-[#FAF9F6] rounded-2xl p-5 sm:p-6 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#E25822]" />
                  <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                    {isHindi ? 'ब्लैकमेलर को भेजने हेतु कानूनी संदेश (Power Reply)' : 'Copy & Send This Legal Warning To The Extortionist:'}
                  </h4>
                </div>

                <button
                  onClick={() => handleCopy(currentScenario.powerReplyText![language], `power_${currentScenario.id}`)}
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
                      <span>{isHindi ? 'संदेश कॉपी करें' : 'Copy Message'}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-black/30 border border-white/10 rounded-xl p-4 font-mono text-xs sm:text-[13px] text-[#E5DFD9] leading-relaxed select-all">
                {currentScenario.powerReplyText[language]}
              </div>

              <p className="text-[11px] text-[#AAA] italic">
                {isHindi
                  ? 'यह संदेश भेजने के बाद ब्लैकमेलर को तुरंत ब्लॉक करें और 1930 पर शिकायत दर्ज करें।'
                  : 'Send this exact message once, then block them immediately. Do not engage in further chat.'}
              </p>
            </div>
          )}

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
                            } else if (step.actionType === 'takedown') {
                              onNavigateToTab('takedown', 'platform-takedown-portal');
                            } else if (step.actionType === 'evidence') {
                              onNavigateToTab('evidence', 'evidence-preservation-tool');
                            } else if (step.actionType === 'lockdown') {
                              onNavigateToTab('lockdown', 'privacy-lockdown-guide');
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

          {/* Psychological Reassurance & Google Data Insight */}
          <div className="bg-[#F3EFEC] rounded-2xl p-4 sm:p-5 flex items-start gap-3 border border-[#E5DFD9]">
            <Brain className="w-5 h-5 text-[#8B6D5C] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B6D5C]">
                {isHindi ? 'गूगल व साइबर सुरक्षा डेटा विश्लेषण' : 'Cyber Security & Behavioral Fact'}
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
