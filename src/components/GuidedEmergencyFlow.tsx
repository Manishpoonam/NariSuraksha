import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  PhoneCall, 
  EyeOff, 
  Camera, 
  Lock, 
  UserX, 
  Sparkles, 
  Copy, 
  Check, 
  ExternalLink, 
  Scale, 
  HeartHandshake, 
  RefreshCw,
  MessageSquare,
  Shield,
  HelpCircle,
  KeyRound,
  Eye,
  ChevronRight
} from 'lucide-react';
import { Language, IncidentCategory } from '../types';
import { smoothScrollTo } from '../utils/scroll';

interface GuidedEmergencyFlowProps {
  language: Language;
  onNavigateToTab: (tab: string, elementId?: string) => void;
  onSelectCategoryForDraft: (category: IncidentCategory) => void;
  onTriggerSOS: () => void;
  externalSituation?: SituationKey;
}

export type SituationKey = 
  | 'danger'
  | 'photo_leaked'
  | 'blackmail'
  | 'stalking'
  | 'account_hacked'
  | 'guidance';

export const GuidedEmergencyFlow: React.FC<GuidedEmergencyFlowProps> = ({
  language,
  onNavigateToTab,
  onSelectCategoryForDraft,
  onTriggerSOS,
  externalSituation,
}) => {
  const isHindi = language === 'hi';
  const SITUATION_STORAGE_KEY = 'suraksha_selected_situation_v1';

  const [selectedSituation, setSelectedSituation] = useState<SituationKey>(() => {
    if (externalSituation) return externalSituation;
    try {
      const saved = sessionStorage.getItem(SITUATION_STORAGE_KEY);
      if (saved && ['danger', 'photo_leaked', 'blackmail', 'stalking', 'account_hacked', 'guidance'].includes(saved)) {
        return saved as SituationKey;
      }
    } catch {
      // ignore
    }
    return 'blackmail';
  });

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (externalSituation) {
      setSelectedSituation(externalSituation);
    }
  }, [externalSituation]);

  useEffect(() => {
    try {
      sessionStorage.setItem(SITUATION_STORAGE_KEY, selectedSituation);
    } catch {
      // ignore
    }
  }, [selectedSituation]);

  const handleSelectSituation = (id: SituationKey) => {
    setSelectedSituation(id);
    smoothScrollTo('guided-situation-action-card', 85);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const situationList = [
    {
      id: 'danger' as SituationKey,
      icon: '🆘',
      label: { en: "I'm in immediate danger", hi: "मैं तत्काल खतरे में हूँ" },
      subtitle: { en: "Physical threat or immediate emergency", hi: "शारीरिक खतरा या तत्काल आपातकाल" },
      badge: { en: "Urgent", hi: "अति आवश्यक" }
    },
    {
      id: 'photo_leaked' as SituationKey,
      icon: '📸',
      label: { en: "My private photo/video was leaked", hi: "मेरी निजी फोटो/वीडियो लीक हो गई है" },
      subtitle: { en: "Uploaded on Telegram, websites, or social media", hi: "टेलीग्राम, सोशल मीडिया या वेबसाइट पर पोस्ट" },
      badge: { en: "24h Removal", hi: "24 घंटे में रिमूवल" }
    },
    {
      id: 'blackmail' as SituationKey,
      icon: '💰',
      label: { en: "Someone is blackmailing or threatening me", hi: "कोई मुझे ब्लैकमेल या धमकी दे रहा है" },
      subtitle: { en: "Demanding money, chats, or more photos", hi: "पैसे, वीडियो या चैट की मांग कर रहा है" },
      badge: { en: "Do Not Pay", hi: "पैसे न दें" }
    },
    {
      id: 'stalking' as SituationKey,
      icon: '👀',
      label: { en: "I'm being stalked or harassed online", hi: "मेरा ऑनलाइन पीछा या उत्पीड़न हो रहा है" },
      subtitle: { en: "Fake accounts, abusive messages, monitoring", hi: "फेक प्रोफाइल, भद्दे मैसेज या निगरानी" },
      badge: { en: "BNS 78 Protection", hi: "कानूनी सुरक्षा" }
    },
    {
      id: 'account_hacked' as SituationKey,
      icon: '🔐',
      label: { en: "Someone has access to my account", hi: "किसी ने मेरा अकाउंट हैक/एक्सेस कर लिया है" },
      subtitle: { en: "Instagram, WhatsApp, Google password compromised", hi: "इंस्टाग्राम, व्हाट्सऐप या पासवर्ड कॉम्प्रोमाइज्ड" },
      badge: { en: "Lockdown", hi: "सुरक्षा लॉक" }
    },
    {
      id: 'guidance' as SituationKey,
      icon: '⚖️',
      label: { en: "I need guidance / I want to report it", hi: "मुझे मार्गदर्शन व गुप्त रिपोर्टिंग चाहिए" },
      subtitle: { en: "Understand legal rights, e-FIR, or counseling", hi: "कानूनी अधिकार, e-FIR या काउंसलर सहायता" },
      badge: { en: "Confidential", hi: "100% गोपनीय" }
    }
  ];

  return (
    <section id="guided-emergency-flow" aria-label="Guided Emergency Rescue" className="space-y-6 scroll-mt-48">
      {/* Step 1: What Happened? (Situation-Based Selection Grid) */}
      <div id="step2-situation-grid" className="space-y-3 scroll-mt-48">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8B6D5C]"></span>
            <h2 className="text-sm sm:text-base font-bold text-[#1A1A1A]">
              {isHindi ? 'अपनी स्थिति चुनें — तुरंत सही उपाय पाएं:' : 'Select what is happening to you:'}
            </h2>
          </div>
          <span className="text-[11px] text-[#777] hidden sm:inline">
            {isHindi ? '1-क्लिक में समाधान' : '1-Click Instant Action'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {situationList.map((item) => {
            const isSelected = selectedSituation === item.id;
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectSituation(item.id)}
                className={`p-5 sm:p-6 rounded-3xl text-left transition-all border cursor-pointer flex flex-col justify-between pinterest-hover-card ${
                  isSelected
                    ? 'bg-[#2D2D2D] text-white border-[#2D2D2D] shadow-md ring-2 ring-[#8B6D5C]/40 -translate-y-1'
                    : 'pinterest-glass text-[#2D2D2D] border-white/80 shadow-xs hover:border-[#8B6D5C]/30'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl p-2 rounded-2xl bg-white/60 shadow-2xs">{item.icon}</span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-[#F3EFEC] text-[#8B6D5C]'
                      }`}
                    >
                      {item.badge[language]}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold leading-snug">
                    {item.label[language]}
                  </h4>
                  <p className={`text-xs leading-relaxed ${isSelected ? 'text-white/80' : 'text-[#666]'}`}>
                    {item.subtitle[language]}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-black/5 flex items-center justify-between text-xs font-semibold opacity-90">
                  <span>{isSelected ? (isHindi ? 'सक्रिय उपाय' : 'Active Plan') : (isHindi ? 'कदम देखें' : 'View Action')}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Step 3: Actionable 3-5 Immediate Steps for Selected Situation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedSituation}
          id="guided-situation-action-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="pinterest-glass rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-48 border border-white/80"
        >
          {/* Situation Title & Reassurance Header */}
          <div className="border-b border-[#F0EBE6] pb-5 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#ECFDF5] text-emerald-800 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isHindi ? 'यह आपकी गलती नहीं है — आप सुरक्षित हैं' : 'This is not your fault — You are protected'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">
              {situationList.find((s) => s.id === selectedSituation)?.label[language]}
            </h3>
            <p className="text-xs sm:text-sm text-[#666]">
              {isHindi
                ? 'नीचे दिए गए 3 त्वरित कदमों का पालन करें। किसी भी समय सहायता के लिए 1930 पर कॉल करें।'
                : 'Follow these immediate verified actions. Take it one step at a time.'}
            </p>
          </div>

          {/* Action 1: SITUATION SPECIFIC IMMEDIATE ACTIONS */}
          {selectedSituation === 'blackmail' && (
            <div className="space-y-6">
              {/* Golden Rule Warning */}
              <div className="bg-[#FEF2F2] border border-[#FCA5A5] rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-[#DC2626] font-bold text-sm">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{isHindi ? 'पहला नियम: कभी पैसे न दें और गिड़गिड़ाएं नहीं' : 'Golden Rule: Withhold Payment & Stay Composed'}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#444] leading-relaxed">
                  {isHindi
                    ? 'पैसे देने से ब्लैकमेलर कभी नहीं रुकता। चैट डिलीट न करें। पहले स्क्रीनशॉट लें और नीचे दिया गया कानूनी नोटिस भेजें।'
                    : 'Paying never stops extortion. Do not delete chats. Take screenshots showing timestamps, then send our verified legal reply.'}
                </p>
              </div>

              {/* Power Reply Box */}
              <div className="bg-[#2D2D2D] text-white rounded-2xl p-5 sm:p-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#E25822]" />
                    <h4 className="text-xs sm:text-sm font-bold">
                      {isHindi ? 'ब्लैकमेलर को भेजने हेतु कानूनी चेतावनी संदेश:' : 'Copy & Send This Legal Warning to the Blackmailer:'}
                    </h4>
                  </div>

                  <button
                    onClick={() => handleCopy(
                      isHindi
                        ? 'यह बातचीत और आपका नंबर नेशनल साइबर क्राइम पोर्टल (1930) और साइबर पुलिस को IT Act 66E, 67A व BNS धारा 77 व 308 (जबरन वसूली) के तहत साक्ष्य के रूप में भेजी जा चुकी है। फोटो भेजना गैर-जमानती अपराध है।'
                        : 'This communication is being recorded and submitted directly to the National Cyber Crime Reporting Portal (1930) and Cyber Police under IT Act 66E, 67A and BNS Sections 77, 308 (Extortion). Any distribution is a non-bailable criminal offense.',
                      'blackmail_power_reply'
                    )}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#8B6D5C] hover:bg-[#775c4c] text-white rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    {copiedKey === 'blackmail_power_reply' ? (
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

                <div className="bg-black/30 border border-white/10 rounded-xl p-4 font-mono text-xs text-[#E5DFD9] leading-relaxed select-all">
                  {isHindi
                    ? 'यह बातचीत और आपका नंबर नेशनल साइबर क्राइम पोर्टल (1930) और साइबर पुलिस को IT Act 66E, 67A व BNS धारा 77 व 308 (जबरन वसूली) के तहत साक्ष्य के रूप में भेजी जा चुकी है। फोटो भेजना गैर-जमानती अपराध है।'
                    : 'This communication is being recorded and submitted directly to the National Cyber Crime Reporting Portal (1930) and Cyber Police under IT Act 66E, 67A and BNS Sections 77, 308 (Extortion). Any distribution is a non-bailable criminal offense.'}
                </div>
              </div>

              {/* 3 Step Action Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E2DC] space-y-3">
                  <span className="w-7 h-7 rounded-full bg-[#8B6D5C] text-white text-xs font-bold flex items-center justify-center">1</span>
                  <h5 className="font-bold text-sm text-[#2D2D2D]">{isHindi ? 'StopNCII से इमेज लॉक करें' : 'Hash Lock with StopNCII'}</h5>
                  <p className="text-xs text-[#666]">{isHindi ? 'फोटो का डिजिटल हैश बनाएं ताकि सोशल मीडिया पर अपलोड न हो सके।' : 'Create an on-device digital fingerprint to block Facebook/Instagram uploads.'}</p>
                  <a href="https://stopncii.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-[#8B6D5C] hover:underline">
                    <span>StopNCII.org</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E2DC] space-y-3">
                  <span className="w-7 h-7 rounded-full bg-[#8B6D5C] text-white text-xs font-bold flex items-center justify-center">2</span>
                  <h5 className="font-bold text-sm text-[#2D2D2D]">{isHindi ? 'शिकायत ड्राफ्ट तैयार करें' : 'Generate Police Complaint Draft'}</h5>
                  <p className="text-xs text-[#666]">{isHindi ? 'धारा 63 BSA इलेक्ट्रॉनिक घोषणा प्रारूप के साथ तैयार ड्राफ्ट।' : 'Formal complaint draft formatted with Section 63 BSA evidence declaration.'}</p>
                  <button onClick={() => { onSelectCategoryForDraft('extortion_blackmail'); onNavigateToTab('drafts', 'complaint-draft-generator'); }} className="inline-flex items-center gap-1 text-xs font-bold text-[#8B6D5C] hover:underline cursor-pointer">
                    <span>{isHindi ? 'ड्राफ्ट टूल खोलें' : 'Open Draft Generator'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E2DC] space-y-3">
                  <span className="w-7 h-7 rounded-full bg-[#8B6D5C] text-white text-xs font-bold flex items-center justify-center">3</span>
                  <h5 className="font-bold text-sm text-[#2D2D2D]">{isHindi ? '1930 साइबर हेल्पलाइन' : 'Call 1930 Cyber Cell'}</h5>
                  <p className="text-xs text-[#666]">{isHindi ? 'सरकारी पोर्टल पर त्वरित जांच व खाता फ्रीज।' : 'Official National Cyber Crime helpline for prompt investigation.'}</p>
                  <a href="tel:1930" className="inline-flex items-center gap-1 text-xs font-bold text-[#DC2626] hover:underline">
                    <span>{isHindi ? '1930 पर कॉल करें' : 'Dial 1930'}</span>
                    <PhoneCall className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {selectedSituation === 'photo_leaked' && (
            <div className="space-y-6">
              <div className="bg-[#FAF9F6] border border-[#E8E2DC] rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-[#2D2D2D] font-bold text-sm">
                  <Scale className="w-4 h-4 text-[#8B6D5C]" />
                  <span>{isHindi ? 'आईटी नियम 2021 के तहत 24 घंटे में कंटेंट हटाना कानूनन अनिवार्य है' : 'Mandatory 24-Hour Removal Under IT Rules 2021 (Rule 3(2)(b))'}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#555] leading-relaxed">
                  {isHindi
                    ? 'सोशल मीडिया प्लेटफॉर्म्स (Meta, Telegram, Google, Reddit, X) को 24 घंटे के अंदर बिना सहमति की अश्लील सामग्री हटानी होगी।'
                    : 'All platforms are legally mandated under Indian law to remove non-consensual intimate imagery within 24 hours of notice.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E2DC] space-y-3">
                  <span className="w-7 h-7 rounded-full bg-[#8B6D5C] text-white text-xs font-bold flex items-center justify-center">1</span>
                  <h5 className="font-bold text-sm text-[#2D2D2D]">{isHindi ? '24-घंटे रिमूवल पोर्टल्स' : '24-Hr Platform Takedowns'}</h5>
                  <p className="text-xs text-[#666]">{isHindi ? 'इंस्टाग्राम, टेलीग्राम, गूगल सर्च व रेडिट के डायरेक्ट ग्रीवेंस लिंक्स।' : 'Direct grievance officer escalation links for Telegram, Instagram, Google.'}</p>
                  <button onClick={() => onNavigateToTab('takedown', 'platform-takedown-portal')} className="inline-flex items-center gap-1 text-xs font-bold text-[#8B6D5C] hover:underline cursor-pointer">
                    <span>{isHindi ? 'सभी लिंक्स देखें' : 'View Takedown Links'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E2DC] space-y-3">
                  <span className="w-7 h-7 rounded-full bg-[#8B6D5C] text-white text-xs font-bold flex items-center justify-center">2</span>
                  <h5 className="font-bold text-sm text-[#2D2D2D]">{isHindi ? 'Take It Down (नाबालिग)' : 'Take It Down (Under 18)'}</h5>
                  <p className="text-xs text-[#666]">{isHindi ? 'यदि उम्र 18 से कम है तो हमेशा के लिए री-अपलोड ब्लॉक करें।' : 'Permanent cryptographic removal for anyone who was under 18.'}</p>
                  <a href="https://takeitdown.ncmec.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-[#8B6D5C] hover:underline">
                    <span>TakeItDown.org</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E2DC] space-y-3">
                  <span className="w-7 h-7 rounded-full bg-[#8B6D5C] text-white text-xs font-bold flex items-center justify-center">3</span>
                  <h5 className="font-bold text-sm text-[#2D2D2D]">{isHindi ? 'गुप्त सरकारी रिपोर्टिंग' : 'Anonymous Cyber Crime Report'}</h5>
                  <p className="text-xs text-[#666]">{isHindi ? 'cybercrime.gov.in पर बिना नाम बताए रिपोर्ट दर्ज करें।' : 'Report without disclosing identity under Women/Child crime.'}</p>
                  <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-[#8B6D5C] hover:underline">
                    <span>cybercrime.gov.in</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {selectedSituation === 'stalking' && (
            <div className="space-y-6">
              <div className="bg-[#FAF9F6] border border-[#E8E2DC] rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-[#2D2D2D] font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#8B6D5C]" />
                  <span>{isHindi ? 'BNS धारा 78 के तहत साइबर स्टॉकिंग गैर-जमानती अपराध है' : 'BNS Section 78: Cyber Stalking is Strictly Punishable'}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#555] leading-relaxed">
                  {isHindi
                    ? 'लगातार मॉनिटर करना, फेक आईडी बनाना या अनचाहे मैसेज भेजना 3 साल तक की गैर-जमानती जेल की सजा का कारण बनता है।'
                    : 'Repeated monitoring, fake profile creation, or unwanted persistent messaging carries up to 3 years imprisonment under Indian criminal law.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E2DC] space-y-3">
                  <span className="w-7 h-7 rounded-full bg-[#8B6D5C] text-white text-xs font-bold flex items-center justify-center">1</span>
                  <h5 className="font-bold text-sm text-[#2D2D2D]">{isHindi ? 'प्राइवेसी लॉकडाउन गाइड' : '10-Min Privacy Lockdown'}</h5>
                  <p className="text-xs text-[#666]">{isHindi ? 'सोशल मीडिया प्राइवेट करें और लोकेशन ट्रैकिंग बंद करें।' : 'Lockdown Instagram, revoke third-party app permissions, hide active status.'}</p>
                  <button onClick={() => onNavigateToTab('lockdown', 'privacy-lockdown-guide')} className="inline-flex items-center gap-1 text-xs font-bold text-[#8B6D5C] hover:underline cursor-pointer">
                    <span>{isHindi ? 'लॉकडाउन गाइड' : 'Open Lockdown Guide'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E2DC] space-y-3">
                  <span className="w-7 h-7 rounded-full bg-[#8B6D5C] text-white text-xs font-bold flex items-center justify-center">2</span>
                  <h5 className="font-bold text-sm text-[#2D2D2D]">{isHindi ? 'NCW 24×7 हेल्पलाइन' : 'NCW 24/7 Helpline'}</h5>
                  <p className="text-xs text-[#666]">{isHindi ? 'NCW 24×7 हेल्पलाइन — महिलाओं के खिलाफ हिंसा, उत्पीड़न, घरेलू दुर्व्यवहार और संकट में सहायता (कॉल 14490 / व्हाट्सएप: +91 7827170170)।' : 'NCW 24×7 Helpline — support for violence against women, harassment, domestic abuse, and more (Call 14490 or WhatsApp +91 7827170170).'}</p>
                  <a href="https://wa.me/917827170170" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline">
                    <span>WhatsApp +91 7827170170</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E2DC] space-y-3">
                  <span className="w-7 h-7 rounded-full bg-[#8B6D5C] text-white text-xs font-bold flex items-center justify-center">3</span>
                  <h5 className="font-bold text-sm text-[#2D2D2D]">{isHindi ? 'सबूत सुरक्षित करें (Log)' : 'Log Stalking Evidence'}</h5>
                  <p className="text-xs text-[#666]">{isHindi ? 'मैसेज और प्रोफाइल URL के टाइमस्टैम्प स्क्रीनशॉट लें।' : 'Capture timestamped screenshots and compute SHA-256 integrity hash.'}</p>
                  <button onClick={() => onNavigateToTab('evidence', 'evidence-preservation-tool')} className="inline-flex items-center gap-1 text-xs font-bold text-[#8B6D5C] hover:underline cursor-pointer">
                    <span>{isHindi ? 'सबूत टूल देखें' : 'Preserve Evidence'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedSituation === 'account_hacked' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E2DC] space-y-3">
                  <span className="w-7 h-7 rounded-full bg-[#8B6D5C] text-white text-xs font-bold flex items-center justify-center">1</span>
                  <h5 className="font-bold text-sm text-[#2D2D2D]">{isHindi ? 'सक्रिय सत्र समाप्त करें (Log out)' : 'Terminate Active Sessions'}</h5>
                  <p className="text-xs text-[#666]">{isHindi ? 'सेटिंग्स में जाकर "Log out all devices" चुनें।' : 'Force sign-out all other active sessions and reset recovery email.'}</p>
                  <button onClick={() => onNavigateToTab('lockdown', 'privacy-lockdown-guide')} className="inline-flex items-center gap-1 text-xs font-bold text-[#8B6D5C] hover:underline cursor-pointer">
                    <span>{isHindi ? 'सुरक्षा चेकलिस्ट' : 'Security Steps'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E2DC] space-y-3">
                  <span className="w-7 h-7 rounded-full bg-[#8B6D5C] text-white text-xs font-bold flex items-center justify-center">2</span>
                  <h5 className="font-bold text-sm text-[#2D2D2D]">{isHindi ? '2FA (दो-चरणीय प्रमाणीकरण)' : 'Enable 2FA Authentication'}</h5>
                  <p className="text-xs text-[#666]">{isHindi ? 'Google Authenticator या SMS 2FA तुरंत चालू करें।' : 'Enable App-based 2-factor authentication immediately.'}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E2DC] space-y-3">
                  <span className="w-7 h-7 rounded-full bg-[#8B6D5C] text-white text-xs font-bold flex items-center justify-center">3</span>
                  <h5 className="font-bold text-sm text-[#2D2D2D]">{isHindi ? 'अकाउंट हैकिंग FIR दर्ज करें' : 'File Unauthorized Access FIR'}</h5>
                  <p className="text-xs text-[#666]">{isHindi ? 'IT Act 66 (हैकिंग) के तहत कानूनी ड्राफ्ट बनाएं।' : 'Generate formal complaint under Section 43/66 IT Act.'}</p>
                  <button onClick={() => { onSelectCategoryForDraft('account_takeover'); onNavigateToTab('drafts', 'complaint-draft-generator'); }} className="inline-flex items-center gap-1 text-xs font-bold text-[#8B6D5C] hover:underline cursor-pointer">
                    <span>{isHindi ? 'ड्राफ्ट बनाएं' : 'Create Draft'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedSituation === 'danger' && (
            <div className="space-y-6">
              <div className="bg-[#FEF2F2] border-2 border-[#DC2626] rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-[#DC2626] font-extrabold text-base">
                  <AlertTriangle className="w-5 h-5" />
                  <span>{isHindi ? 'तत्काल सहायता नंबर — बिना देरी कॉल करें' : 'Immediate Emergency Help Numbers'}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a href="tel:112" className="p-4 bg-[#DC2626] text-white font-bold rounded-xl flex items-center justify-between text-base">
                    <span>{isHindi ? '112 (राष्ट्रीय पुलिस आपातकाल)' : '112 (National Police Emergency)'}</span>
                    <PhoneCall className="w-5 h-5" />
                  </a>
                  <a href="tel:1091" className="p-4 bg-[#8B6D5C] text-white font-bold rounded-xl flex items-center justify-between text-base">
                    <span>{isHindi ? '1091 (महिला पुलिस सहायता)' : '1091 (Women Police Cell)'}</span>
                    <PhoneCall className="w-5 h-5" />
                  </a>
                </div>
                <div className="pt-2">
                  <button onClick={onTriggerSOS} className="w-full p-4 bg-[#2D2D2D] hover:bg-[#111] text-white font-bold rounded-xl flex items-center justify-center gap-2 text-sm cursor-pointer">
                    <span>{isHindi ? '🚨 लाइव GPS डिस्ट्रेस अलर्ट भेजें (परिवार/मित्र)' : '🚨 Send Live GPS Distress Alert to Trusted Contact'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedSituation === 'guidance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E2DC] space-y-3">
                  <span className="w-7 h-7 rounded-full bg-[#8B6D5C] text-white text-xs font-bold flex items-center justify-center">1</span>
                  <h5 className="font-bold text-sm text-[#2D2D2D]">{isHindi ? '24/7 महिला हेल्पलाइन (1091)' : '24/7 Women Helpline (1091)'}</h5>
                  <p className="text-xs text-[#666]">{isHindi ? 'महिला पुलिस अधिकारियों से सीधे गोपनीय सहायता और त्वरित हस्तक्षेप।' : 'Direct, confidential support & emergency response by verified female police officers.'}</p>
                  <a href="tel:1091" className="inline-flex items-center gap-1 text-xs font-bold text-[#8B6D5C] hover:underline cursor-pointer">
                    <span>{isHindi ? '1091 पर कॉल करें' : 'Call 1091 Now'}</span>
                    <PhoneCall className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E2DC] space-y-3">
                  <span className="w-7 h-7 rounded-full bg-[#8B6D5C] text-white text-xs font-bold flex items-center justify-center">2</span>
                  <h5 className="font-bold text-sm text-[#2D2D2D]">{isHindi ? 'मानसिक संबल (Tele-MANAS 14416)' : 'Emotional Support (14416)'}</h5>
                  <p className="text-xs text-[#666]">{isHindi ? 'सरकारी 24/7 मुफ्त व गुप्त मानसिक स्वास्थ्य परामर्श।' : '24/7 free, confidential psychological counseling by trained female counselors.'}</p>
                  <a href="tel:14416" className="inline-flex items-center gap-1 text-xs font-bold text-[#8B6D5C] hover:underline">
                    <span>{isHindi ? '14416 पर कॉल करें' : 'Dial 14416'}</span>
                    <PhoneCall className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E2DC] space-y-3">
                  <span className="w-7 h-7 rounded-full bg-[#8B6D5C] text-white text-xs font-bold flex items-center justify-center">3</span>
                  <h5 className="font-bold text-sm text-[#2D2D2D]">{isHindi ? 'कानूनी अधिकार (BNS & Zero FIR)' : 'Know Your Legal Rights'}</h5>
                  <p className="text-xs text-[#666]">{isHindi ? 'धारा 73 BNS (पहचान गोपनीयता) व जीरो FIR की जानकारी।' : 'Learn about mandatory identity sealing and free legal aid.'}</p>
                  <button onClick={() => onNavigateToTab('rights', 'legal-rights-faq')} className="inline-flex items-center gap-1 text-xs font-bold text-[#8B6D5C] hover:underline cursor-pointer">
                    <span>{isHindi ? 'अधिकार गाइड पढ़ें' : 'Read Rights FAQ'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
