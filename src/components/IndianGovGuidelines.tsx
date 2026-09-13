import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  ExternalLink, 
  FileText, 
  PhoneCall, 
  Clock, 
  Lock, 
  AlertCircle, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles,
  Search,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Shield,
  KeyRound,
  EyeOff,
  Globe,
  HeartHandshake
} from 'lucide-react';
import { Language } from '../types';

interface GovGuideline {
  id: string;
  agency: string;
  agencyFull: { en: string; hi: string };
  badge: { en: string; hi: string };
  ruleOrRef: string;
  title: { en: string; hi: string };
  summary: { en: string; hi: string };
  actionPoints: { en: string[]; hi: string[] };
  portalLink?: string;
  portalLabel?: { en: string; hi: string };
  helpline?: string;
}

interface IndianGovGuidelinesProps {
  language: Language;
  onNavigateToTab?: (tab: string, elementId?: string) => void;
}

export const IndianGovGuidelines: React.FC<IndianGovGuidelinesProps> = ({
  language,
  onNavigateToTab
}) => {
  const isHindi = language === 'hi';
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>('meity_24h');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const guidelines: GovGuideline[] = [
    {
      id: 'meity_24h',
      agency: 'MeitY (IT Rules)',
      agencyFull: {
        en: 'Ministry of Electronics and Information Technology',
        hi: 'इलेक्ट्रॉनिकी और सूचना प्रौद्योगिकी मंत्रालय'
      },
      badge: {
        en: 'Mandatory 24h Removal',
        hi: '24 घंटे में अनिवार्य निष्कासन'
      },
      ruleOrRef: 'IT Rules 2021, Rule 3(2)(b)',
      title: {
        en: '24-Hour Mandatory Content Removal for Non-Consensual Images & Deepfakes',
        hi: 'बिना सहमति की अश्लील सामग्री व डीपफेक को 24 घंटे में हटाने का अनिवार्य सरकारी नियम'
      },
      summary: {
        en: 'All social media intermediaries (Instagram, Telegram, Facebook, YouTube, X, Reddit) are legally mandated to disable access or remove non-consensual nudity, morphed images, and deepfakes within 24 hours of receiving a complaint.',
        hi: 'सभी सोशल मीडिया प्लेटफॉर्म्स को शिकायत मिलने के 24 घंटे के अंदर बिना सहमति के निजी फोटो, मॉर्फ्ड वीडियो और डीपफेक हटाने का कानूनी आदेश है। ऐसा न करने पर कंपनी का कानूनी संरक्षण समाप्त हो जाता है।'
      },
      actionPoints: {
        en: [
          'File an immediate takedown notice to the platform Grievance Officer citing Rule 3(2)(b).',
          'Include the exact post/profile URL and screenshot with timestamp.',
          'Platforms failing to act within 24 hours lose "Safe Harbor" protection under Section 79 IT Act and become liable for prosecution.'
        ],
        hi: [
          'आईटी नियम 3(2)(b) का हवाला देते हुए प्लेटफॉर्म के ग्रीवेंस ऑफिसर को तुरंत शिकायत भेजें।',
          'शिकायत में पोस्ट/चैनल का पूरा लिंक (URL) और तारीख-समय का स्क्रीनशॉट जोड़ें।',
          '24 घंटे में कार्रवाई न करने पर कंपनी के खिलाफ सीधे कानूनी मुकदमा चलाया जा सकता है।'
        ]
      },
      portalLink: 'https://cybercrime.gov.in',
      portalLabel: { en: 'Report on cybercrime.gov.in', hi: 'सरकारी पोर्टल पर रिपोर्ट करें' }
    },
    {
      id: 'un_women_tfgbv',
      agency: 'UN Women & UNFPA',
      agencyFull: {
        en: 'United Nations Entity for Gender Equality & Women\'s Empowerment',
        hi: 'संयुक्त राष्ट्र महिला एवं जनसंख्या कोष (UN Women / UNFPA)'
      },
      badge: {
        en: 'Global TFGBV Framework',
        hi: 'अंतर्राष्ट्रीय सुरक्षा मानक'
      },
      ruleOrRef: 'UN Women Global TFGBV Strategy',
      title: {
        en: 'UN Guidelines on Technology-Facilitated Gender-Based Violence (TFGBV)',
        hi: 'डिजिटल हिंसा व ऑनलाइन उत्पीड़न पर संयुक्त राष्ट्र (UN) के सुरक्षा सिद्धांत'
      },
      summary: {
        en: 'UN Women and UNFPA mandate a "Survivor-Centered Protocol" for digital safety: zero victim-blaming, immediate psychological grounding, non-retaliation, preserving cryptographic forensic chains, and enforcing prompt digital de-escalation without forcing victims off the internet.',
        hi: 'संयुक्त राष्ट्र (UN) के अनुसार ऑनलाइन उत्पीड़न में पीड़िता को इंटरनेट छोड़ने के लिए मजबूर करने के बजाय "सर्वाइवर-सेंटर्ड" सुरक्षा, मानसिक संबल, साक्ष्य संरक्षण और प्लेटफॉर्म्स पर तत्काल रोक लगाने के अंतर्राष्ट्रीय दिशानिर्देश हैं।'
      },
      actionPoints: {
        en: [
          'Never Accept Blame: Digital violation is 100% the perpetrator\'s crime. Do not isolate yourself from support systems.',
          'Chain-of-Custody Forensics: Always capture full URLs, sender metadata, and timestamps before blocking perpetrators.',
          'Psychological First Aid: Engage grounding exercises or confidential helplines before confronting blackmailers.'
        ],
        hi: [
          'स्वयं को कभी दोषी न मानें: डिजिटल ब्लैकमेलिंग व मॉर्फिंग पूरी तरह अपराधी का जुर्म है।',
          'ब्लॉक करने से पहले साक्ष्य सुरक्षित करें: यूजरनेम, प्रोफाइल लिंक और समय का स्क्रीनशॉट संभालें।',
          'मानसिक शांति बनाए रखें: किसी भी ब्लैकमेलर के दबाव में आकर पैसे न दें, तुरंत हेल्पलाइन का सहारा लें।'
        ]
      },
      portalLink: 'https://www.unwomen.org/en/what-we-do/ending-violence-against-women/creating-safe-public-spaces/cyber-violence',
      portalLabel: { en: 'UN Women Cyber Safety Guide', hi: 'UN Women गाइड देखें' }
    },
    {
      id: 'certin_deepfake',
      agency: 'CERT-In',
      agencyFull: {
        en: 'Indian Computer Emergency Response Team',
        hi: 'भारतीय कंप्यूटर आपातकालीन प्रतिक्रिया दल (CERT-In)'
      },
      badge: {
        en: 'Advisory CIAD-2024-0060',
        hi: 'आधिकारिक सलाह CIAD-2024-0060'
      },
      ruleOrRef: 'CERT-In Mahila Suraksha Handbook',
      title: {
        en: 'Countermeasures Against Deepfakes, Synthetic Media & Video-Call Traps',
        hi: 'डीपफेक, एआई मॉर्फिंग और वीडियो-कॉल फ्रॉड से बचाव के सरकारी सुरक्षा उपाय'
      },
      summary: {
        en: 'Official technical countermeasures issued by CERT-In for identifying synthetic manipulation (unnatural eye blinks, audio sync gaps, inconsistent skin texture) and defending against extortion video calls.',
        hi: 'CERT-In द्वारा डीपफेक और फर्जी वीडियो कॉल से सुरक्षा के लिए जारी आधिकारिक दिशानिर्देश—असामान्य पलक झपकाना, ऑडियो-वीडियो बेमेल और बिना सोचे-समझे अनजान वीडियो कॉल न उठाने की सलाह।'
      },
      actionPoints: {
        en: [
          'Enable "Silence Unknown Callers" on WhatsApp to completely block extortion video call traps.',
          'Use cryptographic hashing (StopNCII) to generate mathematical signatures of images before blackmailers attempt re-uploads.',
          'Switch from SMS-based OTPs to App-based Authenticators (TOTP) to block SIM-swap hijacking.'
        ],
        hi: [
          'व्हाट्सऐप पर "Silence Unknown Callers" तुरंत चालू करें ताकि अनजान वीडियो कॉल न बज सके।',
          'StopNCII से फोटो का डिजिटल हैश बनाएं ताकि सोशल मीडिया पर री-अपलोडिंग अपने आप ब्लॉक हो जाए।',
          'एसएमएस ओटीपी के बजाय गूगल ऑथेंटिकेटर जैसे 2FA ऐप का प्रयोग करें।'
        ]
      },
      portalLink: 'https://www.cert-in.org.in',
      portalLabel: { en: 'Visit CERT-In Advisory', hi: 'CERT-In गाइड देखें' }
    },
    {
      id: 'mha_i4c',
      agency: 'MHA / I4C',
      agencyFull: {
        en: 'Ministry of Home Affairs - Indian Cyber Crime Coordination Centre',
        hi: 'गृह मंत्रालय - भारतीय साइबर अपराध समन्वय केंद्र (I4C)'
      },
      badge: {
        en: 'National Cyber Portal 1930',
        hi: 'राष्ट्रीय साइबर हेल्पलाइन 1930'
      },
      ruleOrRef: 'cybercrime.gov.in (I4C)',
      title: {
        en: '100% Anonymous Reporting & Rapid Financial Account Freezing',
        hi: '100% गुप्त शिकायत दर्ज करने की सुविधा व 1930 से ब्लैकमेलर का बैंक खाता फ्रीज कराना'
      },
      summary: {
        en: 'The Ministry of Home Affairs operates cybercrime.gov.in with a dedicated "Report Women/Child Crime Anonymously" module. Victims do not need to provide personal identification or mobile numbers to initiate cyber police investigations.',
        hi: 'गृह मंत्रालय के पोर्टल पर "Report Crime Against Women/Child Anonymously" की विशेष सुविधा है। इसमें बिना नाम या पहचान बताए गुप्त रिपोर्ट दर्ज होती है और साइबर पुलिस लिंक ब्लॉक करने की कार्यवाही शुरू करती है।'
      },
      actionPoints: {
        en: [
          'If extorted money was transferred via UPI/NetBanking, call 1930 immediately within the "Golden Hour" to freeze the receiver\'s bank account.',
          'Use Anonymous Reporting mode if you fear family or social stigma; no SMS will be sent to your family.',
          'Keep UTR numbers, screenshot hashes, and profile links ready for speedy verification.'
        ],
        hi: [
          'यदि ब्लैकमेलिंग के डर से पैसे ट्रांसफर किए हैं, तो आरोपी का खाता फ्रीज कराने के लिए तुरंत 1930 मिलाएं।',
          'घर वालों को पता चलने के डर से "Anonymous Report" चुनें; इसमें घर पर कोई नोटिस या कॉल नहीं जाता।',
          'जांच में तेजी लाने के लिए UPI का UTR नंबर और स्क्रीनशॉट संभाल कर रखें।'
        ]
      },
      helpline: '1930',
      portalLink: 'https://cybercrime.gov.in/Webform/Crime_AuthoLogin.aspx',
      portalLabel: { en: 'Launch Anonymous Form', hi: 'गुप्त फॉर्म खोलें' }
    },
    {
      id: 'bns_zero_fir',
      agency: 'Ministry of Law & Justice',
      agencyFull: {
        en: 'Bharatiya Nagarik Suraksha Sanhita (BNSS) & BNS 2023',
        hi: 'भारतीय नागरिक सुरक्षा संहिता (BNSS) एवं भारतीय न्याय संहिता 2023'
      },
      badge: {
        en: 'Statutory Rights in Police Stations',
        hi: 'थाने में महिलाओं के कानूनी अधिकार'
      },
      ruleOrRef: 'Section 173 BNSS & Section 73 BNS',
      title: {
        en: 'Pan-India Zero FIR & Strict Victim Anonymity Protections',
        hi: 'देश भर में जीरो एफआईआर (Zero FIR) और पीड़िता की पहचान सीलबंद रखने का कानून'
      },
      summary: {
        en: 'Police officers cannot refuse to register a complaint citing jurisdictional boundaries. Section 173 BNSS mandates Zero FIR registration at any station, and Section 73 BNS makes disclosing the victim\'s name or identity punishable by 2 years in prison.',
        hi: 'कोई भी पुलिस स्टेशन यह कहकर शिकायत लेने से मना नहीं कर सकता कि घटना उनके क्षेत्र की नहीं है। किसी भी थाने में जीरो एफआईआर दर्ज कराई जा सकती है और पीड़िता का नाम उजागर करना 2 वर्ष की सजा का अपराध है।'
      },
      actionPoints: {
        en: [
          'Statement of a female victim must be recorded exclusively by a woman police officer (Sec 173 BNSS).',
          'You have the right to give your statement at your home or a safe place of your choice.',
          'Every woman in India is entitled to 100% free legal aid and a government lawyer under Section 12 NALSA.'
        ],
        hi: [
          'महिला पीड़िता का बयान केवल महिला पुलिस अधिकारी द्वारा ही दर्ज किया जाएगा।',
          'आप अपने घर या अपनी पसंद की किसी भी सुरक्षित जगह पर बयान देने की मांग कर सकती हैं।',
          'नालसा (NALSA) के तहत हर महिला को सरकारी वकील और मुफ्त कानूनी सहायता पाने का अधिकार है।'
        ]
      },
      helpline: '112'
    },
    {
      id: 'uidai_biometrics',
      agency: 'UIDAI',
      agencyFull: {
        en: 'Unique Identification Authority of India',
        hi: 'भारतीय विशिष्ट पहचान प्राधिकरण (UIDAI)'
      },
      badge: {
        en: 'Identity Theft Defense',
        hi: 'पहचान चोरी से सुरक्षा'
      },
      ruleOrRef: 'UIDAI Biometric Lock Advisory',
      title: {
        en: 'Lock Aadhaar Biometrics to Prevent Remote Synthetic Identity Fraud',
        hi: 'mAadhaar ऐप से बायोमेट्रिक लॉक करें ताकि कोई आपके नाम पर फर्जी सिम या लोन न ले सके'
      },
      summary: {
        en: 'Cybercriminals use stolen photos and identity data for synthetic KYC verification and illegal SIM registration. UIDAI recommends all citizens keep their Aadhaar biometrics permanently locked via mAadhaar or uidai.gov.in.',
        hi: 'ठग चोरी की गई तस्वीरों और पहचान का उपयोग फर्जी सिम लेने या लोन निकालने में करते हैं। UIDAI के अनुसार mAadhaar ऐप में जाकर बायोमेट्रिक को लॉक रखना सबसे सुरक्षित उपाय है।'
      },
      actionPoints: {
        en: [
          'Open mAadhaar app or visit uidai.gov.in > My Aadhaar > Lock/Unlock Biometrics.',
          'Biometrics remain locked until you temporarily unlock them with an OTP during actual verification.',
          'Check active mobile connections registered against your Aadhaar via the Sanchar Saathi portal (tafcop.sancharsaathi.gov.in).'
        ],
        hi: [
          'mAadhaar ऐप या uidai.gov.in पर जाकर "Lock/Unlock Biometrics" पर क्लिक करें।',
          'बायोमेट्रिक लॉक रहने पर कोई भी आपके फिंगरप्रिंट या चेहरे से गलत सत्यापन नहीं कर सकता।',
          'संचार साथी (Sanchar Saathi TAFCOP) पोर्टल पर चेक करें कि आपके नाम पर कितने सिम कार्ड चल रहे हैं।'
        ]
      },
      portalLink: 'https://tafcop.sancharsaathi.gov.in',
      portalLabel: { en: 'Check SIMs on TAFCOP', hi: 'TAFCOP पर सिम चेक करें' }
    }
  ];

  const categories = [
    { id: 'all', label: { en: 'All Guidelines', hi: 'सभी दिशानिर्देश' } },
    { id: 'un', label: { en: 'UN Women (TFGBV)', hi: 'UN महिला सुरक्षा' } },
    { id: 'meity', label: { en: '24h Takedown (MeitY)', hi: '24h रिमूवल नियम' } },
    { id: 'i4c', label: { en: 'Anonymous & 1930 (MHA)', hi: 'गुप्त रिपोर्ट व 1930' } },
    { id: 'certin', label: { en: 'Deepfakes (CERT-In)', hi: 'डीपफेक सुरक्षा' } },
    { id: 'legal', label: { en: 'Zero FIR & Rights', hi: 'जीरो FIR व अधिकार' } },
  ];

  const filtered = activeCategory === 'all' 
    ? guidelines 
    : guidelines.filter(g => {
        if (activeCategory === 'un') return g.id.includes('un_women');
        if (activeCategory === 'meity') return g.id.includes('meity');
        if (activeCategory === 'i4c') return g.id.includes('mha');
        if (activeCategory === 'certin') return g.id.includes('certin');
        if (activeCategory === 'legal') return g.id.includes('bns') || g.id.includes('uidai');
        return true;
      });

  return (
    <section id="indian-gov-guidelines" className="space-y-6 scroll-mt-48">
      {/* Header Banner */}
      <div className="bg-[#2D2D2D] text-[#FAF9F6] rounded-3xl p-6 sm:p-9 shadow-sm border border-[#222] space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FAF9F6] text-xs font-bold tracking-wider uppercase">
              <Building2 className="w-4 h-4 text-[#E25822]" />
              <span>{isHindi ? 'भारत सरकार एवं संयुक्त राष्ट्र (UN) सुरक्षा परामर्श' : 'Indian Government & UN Women Cyber Safety Advisories'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
              {isHindi
                ? 'UN Women, MeitY, CERT-In व गृह मंत्रालय के प्रमुख सुरक्षा नियम'
                : 'Key Directives from UN Women, MHA, MeitY & CERT-In'}
            </h2>
            <p className="text-xs sm:text-sm text-[#CCC] leading-relaxed">
              {isHindi
                ? 'यह नियम और कानूनी अधिकार आपको ब्लैकमेलिंग, अश्लील फोटो लीक और डीपफेक के समय तुरंत सुरक्षा प्रदान करते हैं। सरल भाषा में समझें और तुरंत लागू करें।'
                : 'Simple, actionable breakdown of mandatory Indian statutory rules, UN survivor-centered protocols, 24-hour takedown obligations, and digital identity defense.'}
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-2.5 shrink-0">
            <a
              href="tel:1930"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-full text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer min-h-[44px]"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{isHindi ? '1930 डायल करें' : 'Call 1930'}</span>
            </a>
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer min-h-[44px]"
            >
              <span>{isHindi ? 'cybercrime.gov.in' : 'National Portal'}</span>
              <ExternalLink className="w-4 h-4 text-[#C4A482]" />
            </a>
          </div>
        </div>

        {/* 5 Summary Highlight Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-3 border-t border-white/10 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl flex items-center gap-2">
            <Globe className="w-4 h-4 text-teal-300 shrink-0" />
            <span className="font-semibold">{isHindi ? 'UN सर्वाइवर सिद्धांत' : 'UN Survivor-First'}</span>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-300 shrink-0" />
            <span className="font-semibold">{isHindi ? '24h निष्कासन नियम' : '24h Content Takedown'}</span>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-emerald-300 shrink-0" />
            <span className="font-semibold">{isHindi ? '100% गुप्त शिकायत' : 'Anonymous Filing'}</span>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-300 shrink-0" />
            <span className="font-semibold">{isHindi ? 'जीरो FIR पूरे भारत में' : 'Zero FIR Nationwide'}</span>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-rose-300 shrink-0" />
            <span className="font-semibold">{isHindi ? 'बायोमेट्रिक लॉक' : 'Biometric Lock'}</span>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer border ${
              activeCategory === cat.id
                ? 'bg-[#8B6D5C] text-white border-[#8B6D5C] shadow-2xs'
                : 'bg-white text-[#555] hover:bg-[#FAF9F6] border-[#E8E2DC]'
            }`}
          >
            {cat.label[language]}
          </button>
        ))}
      </div>

      {/* Guidelines Cards List */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className="bg-white border border-[#E8E2DC] hover:border-[#8B6D5C] rounded-3xl p-5 sm:p-7 shadow-sm transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3 py-1 bg-[#F3EFEC] text-[#8B6D5C] text-xs font-bold rounded-full uppercase tracking-wider">
                    {item.agency}
                  </span>
                  <span className="text-xs font-bold text-emerald-800 bg-[#ECFDF5] px-3 py-1 rounded-full">
                    {item.badge[language]}
                  </span>
                  <span className="text-xs font-mono text-[#888]">
                    {item.ruleOrRef}
                  </span>
                </div>

                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#8B6D5C] hover:text-[#775c4c] self-start sm:self-auto cursor-pointer"
                >
                  <span>{isExpanded ? (isHindi ? 'कम विवरण' : 'Show Less') : (isHindi ? 'पूरा विवरण व कदम' : 'View Action Steps')}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              <div>
                <h3 className="text-base sm:text-xl font-bold text-[#1A1A1A] tracking-tight">
                  {item.title[language]}
                </h3>
                <p className="text-xs sm:text-sm text-[#555] mt-1.5 leading-relaxed">
                  {item.summary[language]}
                </p>
              </div>

              {/* Action Steps */}
              <div className="pt-3 border-t border-[#F0EBE6] space-y-3">
                <span className="text-xs font-bold text-[#8B6D5C] uppercase tracking-wider block">
                  {isHindi ? 'आपको तुरंत क्या करना चाहिए (Recommended Action Steps):' : 'Immediate Recommended Action Steps:'}
                </span>

                <ul className="space-y-2 text-xs sm:text-sm text-[#333]">
                  {item.actionPoints[language].map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#8B6D5C] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Interactive Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#F0EBE6]">
                <div className="flex items-center gap-2 flex-wrap">
                  {item.portalLink && (
                    <a
                      href={item.portalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2D2D2D] hover:bg-[#111] text-white rounded-full text-xs font-bold transition-all shadow-2xs"
                    >
                      <span>{item.portalLabel ? item.portalLabel[language] : (isHindi ? 'आधिकारिक पोर्टल' : 'Official Portal')}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#E25822]" />
                    </a>
                  )}

                  {item.helpline && (
                    <a
                      href={`tel:${item.helpline}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FAF9F6] hover:bg-[#F3EFEC] text-[#DC2626] border border-[#DC2626]/30 rounded-full text-xs font-bold transition-all"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{isHindi ? `हेल्पलाइन ${item.helpline}` : `Call ${item.helpline}`}</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => handleCopy(
                    `${item.title[language]}\n\n${item.summary[language]}\n\nKey Steps:\n${item.actionPoints[language].map((s, i) => `${i + 1}. ${s}`).join('\n')}`,
                    item.id
                  )}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#FAF9F6] hover:bg-[#F3EFEC] text-[#555] hover:text-[#222] border border-[#E8E2DC] rounded-full text-xs font-bold transition-colors cursor-pointer"
                  title="Copy this guideline"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{isHindi ? 'कॉपी हो गया' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isHindi ? 'गाइडलाइन कॉपी करें' : 'Copy Advice'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
