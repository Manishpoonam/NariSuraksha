/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, 
  ExternalLink, 
  Mail, 
  Clock, 
  Check, 
  Copy, 
  Search, 
  MessageCircle, 
  Send, 
  Instagram, 
  Twitter, 
  Film,
  ShieldAlert,
  Globe,
  Layers,
  Sparkles,
  ArrowRight,
  HelpCircle,
  FileText,
  Lock,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  PhoneCall,
  Scale,
  AlertTriangle
} from 'lucide-react';
import { Language } from '../types';
import { hapticAction, hapticPanic } from '../utils/haptics';
import { PrivacyLockdownGuide } from './PrivacyLockdownGuide';
import { PLATFORM_CANONICAL_NOTICES } from '../data/statutoryNotices';
import { LEGAL_DISCLAIMER } from '../data/legalDisclaimer';

interface PlatformTakedownPortalProps {
  language: Language;
  onNavigateToTab?: (tab: string, elementId?: string) => void;
}

type PlatformTabKey = 'whatsapp' | 'instagram' | 'telegram' | 'google' | 'adult' | 'twitter';

export const PlatformTakedownPortal: React.FC<PlatformTakedownPortalProps> = ({ 
  language,
  onNavigateToTab 
}) => {
  const isHindi = language === 'hi';

  const [activePlatform, setActivePlatform] = useState<PlatformTabKey>('whatsapp');
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [copiedNotice, setCopiedNotice] = useState<boolean>(false);
  const [showLockdownDrawer, setShowLockdownDrawer] = useState<boolean>(false);
  const [showMirrorSolutions, setShowMirrorSolutions] = useState<boolean>(false);

  const noticeBoxRef = useRef<HTMLPreElement>(null);

  // Reset statutory notice preview box scroll position to top (scrollTop = 0) on mount and platform tab change
  useEffect(() => {
    if (noticeBoxRef.current) {
      noticeBoxRef.current.scrollTop = 0;
    }
    const frameId = requestAnimationFrame(() => {
      if (noticeBoxRef.current) {
        noticeBoxRef.current.scrollTop = 0;
      }
    });
    return () => cancelAnimationFrame(frameId);
  }, [activePlatform]);

  const handleCopy = (text: string, type: 'email' | 'notice') => {
    navigator.clipboard.writeText(text);
    hapticAction();
    if (type === 'email') {
      setCopiedEmail(text);
      setTimeout(() => setCopiedEmail(null), 2200);
    } else {
      setCopiedNotice(true);
      setTimeout(() => setCopiedNotice(false), 2200);
    }
  };

  const platformsConfig: Record<PlatformTabKey, {
    name: string;
    badge: string;
    icon: React.ReactNode;
    turnaround: string;
    directUrl: string;
    portalVerifiedDate: string | null;
    grievanceEmail?: string;
    grievanceEmailVerifiedDate?: string | null;
    statutoryRule: string;
    steps: { en: string[]; hi: string[] };
    noticeSubject: string;
    noticeBody: string;
  }> = {
    whatsapp: {
      name: isHindi ? 'व्हाट्सएप (WhatsApp India)' : 'WhatsApp (In-App & Grievance)',
      badge: isHindi ? '24 घंटे में अनिवार्य निष्कासन' : 'Mandatory 24-Hr Indian Takedown',
      icon: <MessageCircle className="w-5 h-5 text-emerald-600" />,
      turnaround: isHindi ? '< 24 घंटे (IT नियम 2021)' : '< 24 Hours (IT Rules 2021)',
      directUrl: 'https://www.whatsapp.com/contact/',
      portalVerifiedDate: null, // WhatsApp lacks a standalone 24-hr intimate image web portal; routes users to in-app reporting
      grievanceEmail: 'grievance_officer_wa@support.whatsapp.com',
      grievanceEmailVerifiedDate: null, // Address not published on WhatsApp primary compliance landing pages
      statutoryRule: 'Rule 3(2)(b) Information Technology Rules, 2021',
      steps: {
        en: [
          'In chat screen: tap the 3 dots (⋮) in the top-right corner > tap "More" > select "Report" (or optionally "Report and block"). You can also tap the contact name at the top and scroll down to "Report".',
          'If circulating in a group: tap the 3 dots (⋮) in the top-right > tap "More" > "Report", or tap Group info and scroll down to "Report Group".',
          'For formal escalation: submit via WhatsApp Settings > Help > Contact Us or email grievance contact (unverified inbox — confirm delivery receipt).',
        ],
        hi: [
          'चैट स्क्रीन में: ऊपर दाईं ओर 3 डॉट्स (⋮) पर टैप करें > "More" (अधिक) चुनें > "Report" (रिपोर्ट) पर टैप करें (या "Report and block" चुनें)। या ऊपर नाम पर टैप करके नीचे "Report" चुन सकते हैं।',
          'यदि ग्रुप में साझा किया गया है: ऊपर दाईं ओर 3 डॉट्स (⋮) > "More" > "Report" चुनें, या ग्रुप जानकारी खोलकर नीचे "Report Group" चुनें।',
          'औपचारिक शिकायत के लिए: व्हाट्सएप सेटिंग्स > हेल्प > Contact Us के जरिए भेजें या ग्रीवेंस पते पर ईमेल करें (असत्यापित इनबॉक्स — डिलीवरी रसीद जांचें)।',
        ],
      },
      noticeSubject: PLATFORM_CANONICAL_NOTICES.whatsapp.subject,
      noticeBody: PLATFORM_CANONICAL_NOTICES.whatsapp.body,
    },
    instagram: {
      name: isHindi ? 'इंस्टाग्राम व फेसबुक (Meta India)' : 'Instagram & Facebook (Meta India)',
      badge: isHindi ? '24 घंटे में प्रोफाइल व फोटो रिमूवल' : '24-Hr Removal & Profile Strike',
      icon: <Instagram className="w-5 h-5 text-rose-600" />,
      turnaround: isHindi ? '< 24 घंटे' : '< 24 Hours',
      directUrl: 'https://help.instagram.com/contact/584460464982589',
      portalVerifiedDate: null, // Numeric Help Center form IDs frequently relocate or require active user session
      grievanceEmail: 'FBGOIndia@fb.com',
      grievanceEmailVerifiedDate: null, // Meta India Grievance inbox; direct email response SLAs are unverified
      statutoryRule: 'Rule 3(2)(b) IT Rules 2021 & Meta Safety Policies',
      steps: {
        en: [
          'On the offending post, story, reel, or profile: tap the three dots (...) > Report > select "Nudity or sexual activity" / "Bullying or harassment" (unverified menu path — confirm options in your app version).',
          'Submit Meta’s Intimate Image Abuse form (link below) while logged into your account (unverified — confirm before use; form may require in-app reporting).',
          'Use StopNCII.org (official partner tool below) to pre-emptively hash and block the media across participating platforms.',
        ],
        hi: [
          'आपत्तिजनक पोस्ट, स्टोरी, रील या प्रोफाइल पर: 3 डॉट्स (...) > Report > "Nudity or sexual activity" या "Bullying or harassment" चुनें (असत्यापित मेनू पथ — अपने ऐप वर्जन में पुष्टि करें)।',
          'मेटा के इंटिमेट इमेज अब्यूज फॉर्म (नीचे लिंक) पर अपने अकाउंट में लॉग-इन रहकर शिकायत दर्ज करें (असत्यापित — उपयोग से पहले पुष्टि करें; लिंक रीडायरेक्ट होने पर ऐप में रिपोर्ट करें)।',
          'मेटा के आधिकारिक पार्टनर टूल StopNCII.org (नीचे लिंक) का उपयोग करके पहले ही डिजिटल हैश ब्लॉक बनाएं ताकि सहयोगी प्लेटफॉर्म्स पर प्रसार रुक सके।',
        ],
      },
      noticeSubject: PLATFORM_CANONICAL_NOTICES.instagram.subject,
      noticeBody: PLATFORM_CANONICAL_NOTICES.instagram.body,
    },
    telegram: {
      name: isHindi ? 'टेलीग्राम (Telegram Abuse & Bots)' : 'Telegram Abuse & Deepfake Bots',
      badge: isHindi ? 'चैनल व बॉट बैन प्रोटोकॉल' : 'Channel, Bot & Group Takedown',
      icon: <Send className="w-5 h-5 text-sky-600" />,
      turnaround: isHindi ? '24 - 48 घंटे' : '24 - 48 Hours',
      directUrl: 'https://telegram.org/support',
      portalVerifiedDate: null, // General support form, not an intimate image expedited takedown pipeline
      grievanceEmail: 'abuse@telegram.org, stopCA@telegram.org',
      grievanceEmailVerifiedDate: null, // Listed in telegram.org/faq for general abuse/CSAM, but Telegram lacks a verified 24-hr Indian IT Rules SLA
      statutoryRule: 'Rule 3(2)(b) IT Rules 2021 & Telegram TOS',
      steps: {
        en: [
          'In the channel, group, or chat: long-press the offending message or media > select "Report" > choose "Illegal Adult Content" or "Personal Data".',
          'Copy the permanent link of the post, channel, or message (e.g. t.me/... link) and note the bot or account username.',
          'Email abuse@telegram.org and stopCA@telegram.org with the links and context (response times vary; also report via police/1930 for urgent blocking orders).',
        ],
        hi: [
          'चैनल, ग्रुप या चैट में: आपत्तिजनक मैसेज या मीडिया पर लॉन्ग-प्रेस करें > "Report" चुनें > "Illegal Adult Content" चुनें।',
          'चैनल या संदेश का सटीक t.me लिंक कॉपी करें और बॉट/यूजरनेम नोट करें।',
          'abuse@telegram.org और stopCA@telegram.org पर लिंक भेजें (प्रतिक्रिया समय अनिश्चित है; तत्काल आदेश के लिए 1930 पर भी रिपोर्ट करें)।',
        ],
      },
      noticeSubject: PLATFORM_CANONICAL_NOTICES.telegram.subject,
      noticeBody: PLATFORM_CANONICAL_NOTICES.telegram.body,
    },
    google: {
      name: isHindi ? 'गूगल सर्च व इमेजेस (Google De-Index)' : 'Google Search & Images De-Indexing',
      badge: isHindi ? 'वैश्विक सर्च रिजल्ट्स से खात्मा' : 'Global Search & Mirror Erasure',
      icon: <Search className="w-5 h-5 text-sky-600" />,
      turnaround: isHindi ? '24 - 72 घंटे' : '24 - 72 Hours',
      directUrl: 'https://support.google.com/websearch/troubleshooter/3111061',
      portalVerifiedDate: 'Mar 2026', // Source: Google Search Help Center Troubleshooter ID 3111061
      statutoryRule: 'Google Non-Consensual Explicit Media Removal Policy',
      steps: {
        en: [
          'Open Google’s official "Remove explicit personal images from Google Search" troubleshooter (verified link below).',
          'Submit the webpage URLs hosting the content and the specific Google Image search results displaying the media.',
          'List search queries that trigger the results (e.g., your name, phone number, or handle). Google reviews and de-indexes matching search results.',
        ],
        hi: [
          'गूगल के आधिकारिक "Remove explicit personal images from Google Search" फॉर्म (सत्यापित लिंक) पर जाएं।',
          'कंटेंट होस्ट करने वाले वेबपेज के लिंक और गूगल सर्च रिजल्ट्स के यूआरएल दर्ज करें।',
          'वे सर्च कीवर्ड्स बताएं जिनसे यह परिणाम दिखता है। गूगल समीक्षा करके सर्च नतीजों से इसे हटाता है।',
        ],
      },
      noticeSubject: PLATFORM_CANONICAL_NOTICES.google.subject,
      noticeBody: PLATFORM_CANONICAL_NOTICES.google.body,
    },
    adult: {
      name: isHindi ? 'एडल्ट वेबसाइट्स व क्लाउडफ्लेयर शटडाउन' : 'Adult / Pirate Sites & Cloudflare Abuse',
      badge: isHindi ? 'होस्टिंग सर्वर डिलीशन' : 'Upstream Origin Server Kill-Switch',
      icon: <Film className="w-5 h-5 text-rose-700" />,
      turnaround: isHindi ? '24 - 48 घंटे' : '24 - 48 Hours',
      directUrl: 'https://abuse.cloudflare.com',
      portalVerifiedDate: 'Mar 2026', // Source: Cloudflare Trust & Safety abuse reporting portal
      statutoryRule: '18 U.S.C. 2257 / DMCA / IT Act Section 67A',
      steps: {
        en: [
          'Do NOT communicate with rogue pirate site webmasters or pay extortion demands.',
          'Over 80% of adult clone sites use Cloudflare reverse proxies to conceal their host. File a report on abuse.cloudflare.com under "Non-Consensual Sexual Content".',
          'Cloudflare transmits the legal takedown strike directly to the actual origin host and domain registrar, compelling upstream file deletion.',
        ],
        hi: [
          'अनजान पायरेट वेबसाइटों के एडमिन से कभी पैसे देकर बात न करें।',
          '80% से ज्यादा ऐसी साइट्स क्लाउडफ्लेयर के जरिए चलती हैं। abuse.cloudflare.com पर "Non-Consensual Sexual Content" में रिपोर्ट करें।',
          'क्लाउडफ्लेयर असली वेब होस्टिंग कंपनी और डोमेन रजिस्ट्रार को नोटिस भेजकर मुख्य सर्वर से फाइलें डिलीट करवाता है।',
        ],
      },
      noticeSubject: PLATFORM_CANONICAL_NOTICES.adult.subject,
      noticeBody: PLATFORM_CANONICAL_NOTICES.adult.body,
    },
    twitter: {
      name: isHindi ? 'एक्स / ट्विटर (X Non-Consensual Nudity)' : 'X / Twitter Takedown Portal',
      badge: isHindi ? 'त्वरित निष्कासन व स्थायी बैन' : 'Expedited Removal & Account Suspension',
      icon: <Twitter className="w-5 h-5 text-[#111]" />,
      turnaround: isHindi ? '< 24 घंटे' : '< 24 Hours',
      directUrl: 'https://help.twitter.com/forms/safety-and-sensitive-content/private-information',
      portalVerifiedDate: null, // X form URLs frequently change or redirect to help.x.com
      grievanceEmail: 'grievance-officer-india@twitter.com',
      grievanceEmailVerifiedDate: null, // Public grievance inbox retired; X mandates web form submissions
      statutoryRule: 'X Safety Policy & Rule 3(2)(b) IT Rules 2021',
      steps: {
        en: [
          'On the offending post: tap the three dots (...) > Report Post > select "Sensitive media" or "Non-consensual nudity".',
          'Submit a report through X’s dedicated Non-Consensual Intimate Media portal (link below).',
          'If circulation continues, file with National Cyber Crime portal (cybercrime.gov.in) to trigger Section 79 intermediary notice.',
        ],
        hi: [
          'पोस्ट पर 3 डॉट्स (...) टैप करें > Report Post > "Sensitive media" या "Non-consensual nudity" चुनें।',
          'X के समर्पित वेब फॉर्म पर ट्वीट का लिंक दर्ज करें (नीचे लिंक)।',
          'यदि सामग्री नहीं हटती है, तो राष्ट्रीय साइबर अपराध पोर्टल (cybercrime.gov.in) पर धारा 79 नोटिस जारी करवाने के लिए शिकायत करें।',
        ],
      },
      noticeSubject: PLATFORM_CANONICAL_NOTICES.twitter.subject,
      noticeBody: PLATFORM_CANONICAL_NOTICES.twitter.body,
    },
  };

  const selectedPlatform = platformsConfig[activePlatform];

  const platformTabs: { id: PlatformTabKey; label: string; icon: React.ReactNode }[] = [
    { id: 'whatsapp', label: 'WhatsApp', icon: <MessageCircle className="w-4 h-4 text-emerald-600" /> },
    { id: 'instagram', label: 'Instagram / FB', icon: <Instagram className="w-4 h-4 text-rose-600" /> },
    { id: 'telegram', label: 'Telegram', icon: <Send className="w-4 h-4 text-sky-600" /> },
    { id: 'google', label: 'Google Search', icon: <Search className="w-4 h-4 text-sky-600" /> },
    { id: 'adult', label: 'Adult Sites', icon: <Film className="w-4 h-4 text-rose-700" /> },
    { id: 'twitter', label: 'X (Twitter)', icon: <Twitter className="w-4 h-4 text-neutral-800" /> },
  ];

  return (
    <div className="space-y-6 scroll-mt-48" id="platform-takedown-portal">
      {/* 1. SINGLE, CLEAR HERO BAR */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E2DC] shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#26215C]/10 text-[#26215C] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#26215C]" />
            <span>{isHindi ? '24 घंटे में अनिवार्य कानूनी रिमूवल' : 'Mandatory 24-Hour Legal Takedowns'}</span>
          </span>
          <span className="text-xs text-[#777] hidden sm:inline-block">
            {isHindi ? 'IT Rules 2021 नियम 3(2)(b)' : 'Rule 3(2)(b) IT Rules, 2021'}
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tight">
          {isHindi ? 'तस्वीरें व वीडियो सोशल मीडिया से हटाएं — बिना किसी को पैसे दिए' : 'Remove Intimate Photos & Stop Leaks — Without Paying Anyone'}
        </h2>
        <p className="text-xs sm:text-sm text-[#666] max-w-3xl leading-relaxed">
          {isHindi
            ? 'भारतीय कानून के तहत सोशल मीडिया प्लेटफॉर्म 24 घंटे के भीतर गैर-सहमति वाली निजी तस्वीरें हटाने के लिए बाध्य हैं। नीचे दिए गए आधिकारिक रिमूवल लिंक्स और स्टॉपएनसीआईआई (StopNCII) का उपयोग करें।'
            : 'Under Indian IT Rules 2021, tech intermediaries must remove non-consensual intimate media within 24 hours of receiving notice. Use the verified portals below to force immediate deletion.'}
        </p>
      </div>

      {/* 2. THE STOPNCII GLOBAL HASH SHIELD (FIRST DEFENSE) */}
      <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-[#26215C] to-[#18143F] text-white shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isHindi ? 'अपलोड होने से पहले ही ताला लगाएं' : 'Pre-Emptive Global Hash Shield'}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {isHindi ? 'तस्वीरों को सोशल मीडिया पर पोस्ट होने से रोकें (StopNCII)' : 'Block Photos From Being Shared Across Social Networks'}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              {isHindi
                ? 'यह तकनीक आपके फोन पर ही एक निजी डिजिटल कोड (हैश) बनाती है। आपकी असली फोटो कभी किसी सर्वर पर अपलोड नहीं होती। इंस्टाग्राम, फेसबुक, टिकटॉक, थ्रेड्स और ओनलीफैंस पर कोई भी इसे कभी पोस्ट नहीं कर सकेगा।'
                : 'Generates an irreversible mathematical fingerprint directly on your device — your raw photo never leaves your phone. Participating networks (Meta, Instagram, Facebook, Threads, TikTok, Reddit, OnlyFans) automatically block matching files permanently.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 shrink-0 self-start sm:self-center w-full sm:w-auto">
            <div className="flex flex-col items-start sm:items-end gap-1">
              <a
                href="https://stopncii.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#111] font-bold text-xs sm:text-sm transition-all shadow-sm active:scale-97 w-full sm:w-auto"
              >
                <span>👩 {isHindi ? '18+: StopNCII.org खोलें' : '18+: Open StopNCII.org'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-300 font-semibold px-2">
                <CheckCircle2 className="w-3 h-3 text-emerald-300 shrink-0" />
                <span>{isHindi ? 'सत्यापित: SWGfL / Meta पार्टनर' : 'Verified: SWGfL / Meta Partner'}</span>
              </span>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-1">
              <a
                href="https://takeitdown.ncmec.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/20 font-bold text-xs sm:text-sm transition-all active:scale-97 w-full sm:w-auto"
              >
                <span>👧 {isHindi ? '18 से कम: Take It Down' : 'Under 18: Take It Down'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <span className="inline-flex items-center gap-1 text-[10px] text-white/80 font-semibold px-2">
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>{isHindi ? 'सत्यापित: NCMEC आधिकारिक' : 'Verified: Official NCMEC'}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-white/10 text-xs text-white/70">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{isHindi ? 'फोटो डिवाइस से बाहर नहीं जाती' : 'Zero photo upload to servers'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{isHindi ? 'मेटा, टिकटॉक, रेडिट पर री-अपलोड ब्लॉक' : 'Blocks re-uploads across partner apps'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{isHindi ? '100% मुफ्त व गोपनीय' : '100% Free, Anonymous & Legal'}</span>
          </div>
        </div>
      </div>

      {/* 3. PLATFORM-BY-PLATFORM TAKEDOWN (FOCUSED 1-CARD SELECTOR) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A]">
            {isHindi ? 'प्लेटफॉर्म चुनें और 24 घंटे में हटाएं:' : 'Select Platform for 24-Hour Removal:'}
          </h3>
          <span className="text-xs text-[#777] hidden sm:inline-block">
            {isHindi ? 'आधिकारिक फॉर्म व नोडल ईमेल' : 'Official Portal & Nodal Email'}
          </span>
        </div>

        {/* Clean Platform Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {platformTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                hapticAction();
                setActivePlatform(tab.id);
              }}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                activePlatform === tab.id
                  ? 'bg-[#1A1A1A] text-white shadow-xs scale-102'
                  : 'bg-white text-[#555] hover:text-[#111] border border-[#E8E2DC] hover:bg-[#FAF8F3]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Selected Platform Action Card */}
        <div className="bg-white border border-[#E8E2DC] rounded-3xl p-5 sm:p-7 shadow-xs space-y-5">
          {/* Header & Badges */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F0EBE6]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF8F3] border border-[#E8E2DC] flex items-center justify-center shrink-0">
                {selectedPlatform.icon}
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-[#1A1A1A]">
                  {selectedPlatform.name}
                </h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#8B6D5C] bg-[#F3EFEC] px-2.5 py-0.5 rounded-full font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{selectedPlatform.turnaround}</span>
                  </span>
                  <span className="text-xs text-[#777] hidden md:inline">
                    {selectedPlatform.statutoryRule}
                  </span>
                </div>
              </div>
            </div>

            {/* Primary Action Button & Verification Marker */}
            <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
              <a
                href={selectedPlatform.directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1A1A1A] hover:bg-black text-white font-bold text-xs sm:text-sm transition-all shadow-xs shrink-0 active:scale-97"
              >
                <span>{isHindi ? 'आधिकारिक रिमूवल फॉर्म खोलें' : 'Open Official Takedown Portal'}</span>
                <ExternalLink className="w-4 h-4 text-white/80" />
              </a>
              {selectedPlatform.portalVerifiedDate ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0F6E56] bg-[#E1F5EE] px-2.5 py-0.5 rounded-full border border-[#B7E4D7]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0F6E56] shrink-0" />
                  <span>{isHindi ? `पोर्टल सत्यापित: ${selectedPlatform.portalVerifiedDate}` : `Portal Verified: ${selectedPlatform.portalVerifiedDate}`}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{isHindi ? 'असत्यापित — उपयोग से पहले पुष्टि करें' : 'Unverified — confirm before use'}</span>
                </span>
              )}
            </div>
          </div>

          {/* Grievance Email Bar with 1-Click Copy & Verification Status */}
          {selectedPlatform.grievanceEmail && (
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E2DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-[#E1F5EE] text-[#0F6E56] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#777]">
                      {isHindi ? 'भारत सरकार मान्यता प्राप्त नोडल ईमेल' : 'Official Grievance Officer Email'}
                    </span>
                    {selectedPlatform.grievanceEmailVerifiedDate ? (
                      <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-[#0F6E56] bg-[#E1F5EE] px-2 py-0.5 rounded-full border border-[#B7E4D7]">
                        <CheckCircle2 className="w-3 h-3 text-[#0F6E56] shrink-0" />
                        <span>{isHindi ? `सत्यापित: ${selectedPlatform.grievanceEmailVerifiedDate}` : `Verified: ${selectedPlatform.grievanceEmailVerifiedDate}`}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                        <span>{isHindi ? 'असत्यापित — उपयोग से पहले पुष्टि करें' : 'Unverified — confirm before use'}</span>
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-xs sm:text-sm font-bold text-[#1A1A1A] truncate mt-0.5">
                    {selectedPlatform.grievanceEmail}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleCopy(selectedPlatform.grievanceEmail!, 'email')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-[#F3EFEC] text-[#2D2D2D] border border-[#DED9D4] text-xs font-bold transition-colors cursor-pointer active:scale-95"
                >
                  {copiedEmail === selectedPlatform.grievanceEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">{isHindi ? 'ईमेल कॉपी हो गया!' : 'Email Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isHindi ? 'ईमेल कॉपी करें' : 'Copy Email'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Action Steps */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#8B6D5C]">
              {isHindi ? 'कार्रवाई के 3 त्वरित कदम:' : '3 Quick Steps to Complete Takedown:'}
            </h5>
            <ol className="space-y-2 pl-4 list-decimal text-xs sm:text-sm text-[#333]">
              {selectedPlatform.steps[language].map((step, idx) => (
                <li key={idx} className="leading-relaxed pl-1 font-medium">
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Statutory Notice Quick Copy (Unified with e-FIR Generator) */}
          {selectedPlatform.noticeBody && (
            <div className="pt-2 border-t border-[#F0EBE6] space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#555]">
                  {isHindi ? 'ईमेल में भेजने के लिए 24-घंटे कानूनी नोटिस टेम्पलेट:' : 'Pre-Drafted 24-Hour Statutory Notice for Email:'}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(`${selectedPlatform.noticeSubject}\n\n${selectedPlatform.noticeBody}`, 'notice')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#26215C] hover:underline cursor-pointer shrink-0"
                >
                  {copiedNotice ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">{isHindi ? 'नोटिस कॉपी हुआ!' : 'Notice Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isHindi ? 'पूरा नोटिस कॉपी करें' : 'Copy Legal Notice'}</span>
                    </>
                  )}
                </button>
              </div>
              <pre
                ref={noticeBoxRef}
                key={activePlatform}
                className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#E8E2DC] text-[11px] sm:text-xs text-[#444] font-mono whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto"
              >
                {selectedPlatform.noticeBody}
              </pre>
            </div>
          )}
        </div>

        {/* DEDICATED ESCALATION PATH: POLICE 1930 & E-FIR (Moved out of platform selector) */}
        <div className="bg-gradient-to-br from-[#FAF8F3] to-[#F5EFEB] border border-[#E8E2DC] rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#993556]/10 text-[#993556] text-xs font-bold uppercase tracking-wider border border-[#993556]/20">
                <ShieldAlert className="w-3.5 h-3.5 text-[#993556]" />
                <span>{isHindi ? 'सरकारी पुलिस कार्रवाई • 24/7 हेल्पलाइन' : 'Government Escalation Path • 24/7 Helpline'}</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-[#1A1A1A]">
                {isHindi ? 'प्लेटफॉर्म के बजाय सीधे पुलिस में रिपोर्ट करें' : 'Need Formal Criminal Investigation or Extortion Arrest?'}
              </h4>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0F6E56] bg-[#E1F5EE] px-2.5 py-1 rounded-full border border-[#B7E4D7]">
                <CheckCircle2 className="w-3 h-3 text-[#0F6E56] shrink-0" />
                <span>{isHindi ? 'सत्यापित: भारत सरकार आधिकारिक पोर्टल (I4C)' : 'Verified: Official Govt Portal (MHA / I4C)'}</span>
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#444] leading-relaxed">
            {isHindi
              ? 'सोशल मीडिया प्लेटफॉर्म केवल अपनी वेबसाइट से लिंक हटाते हैं। यदि अपराधी पैसे मांग रहा है, ब्लैकमेल कर रहा है या धमकी दे रहा है, तो सीधे साइबर अपराध पुलिस 1930 पर कॉल करें या आधिकारिक ई-एफआईआर दर्ज करें। पुलिस अपराधी का बैंक/UPI खाता फ्रीज करती है और BNS धारा 73 के तहत पीड़िता की पहचान पूर्णतः गोपनीय रखी जाती है।'
              : 'Intermediary takedowns only remove content from social platform servers. If an offender is blackmailing you for money, making threats, or circulating files widely, escalate directly to the National Cyber Crime Police. Police can freeze extortion bank/UPI accounts, issue server preservation summons under Section 94 BNSS, and prosecute under Section 67A IT Act. Complainant identity is strictly protected under Section 73 BNS.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="tel:1930"
              onClick={() => hapticPanic()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm transition-all shadow-xs active:scale-97"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span>{isHindi ? '1930 डायल करें (तत्काल साइबर पुलिस)' : 'Call 1930 Cyber Police'}</span>
            </a>

            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-[#F3EFEC] text-[#1A1A1A] border border-[#DED9D4] font-bold text-xs sm:text-sm transition-all shadow-xs active:scale-97"
            >
              <span>{isHindi ? 'cybercrime.gov.in खोलें' : 'Open cybercrime.gov.in'}</span>
              <ExternalLink className="w-4 h-4 text-[#777]" />
            </a>

            {onNavigateToTab && (
              <button
                type="button"
                onClick={() => {
                  hapticAction();
                  onNavigateToTab('report');
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#26215C] hover:bg-[#1C1844] text-white font-bold text-xs sm:text-sm transition-all shadow-xs active:scale-97 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-white/80" />
                <span>{isHindi ? 'निर्देशित ई-एफआईआर ड्राफ्टर खोलें' : 'Open Guided e-FIR Generator'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4. COMPACT UMBRELLA FIX FOR CLONE & MIRROR WEBSITES */}
      <div className="rounded-3xl bg-white border border-[#E8E2DC] shadow-xs overflow-hidden">
        <button
          type="button"
          onClick={() => {
            hapticAction();
            setShowMirrorSolutions((prev) => !prev);
          }}
          className="w-full p-5 sm:p-6 flex items-center justify-between text-left cursor-pointer hover:bg-[#FAF8F3]/60 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E1F5EE] text-[#0F6E56] flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm sm:text-base font-bold text-[#1A1A1A]">
                  {isHindi ? 'क्या वीडियो कई अनजान मिरर या पायरेट साइट्स पर फैल गया है?' : 'What if Media Has Spread to Multiple Clone or Pirate Mirror Sites?'}
                </h4>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#E1F5EE] text-[#0F6E56] border border-[#B7E4D7] hidden sm:inline-block">
                  {isHindi ? 'मास्टर समाधान' : 'Master Solution'}
                </span>
              </div>
              <p className="text-xs text-[#666]">
                {isHindi
                  ? 'आपको 100 अलग-अलग वेबसाइटों को खोजने की आवश्यकता नहीं है। 2 मास्टर टूल्स जो सभी क्लोन्स को एक साथ बंद करते हैं।'
                  : 'You do not need to contact 100 pirate websites individually. Use these 2 umbrella tools to shut down copies worldwide.'}
              </p>
            </div>
          </div>
          <div className="shrink-0 p-1.5 rounded-full bg-black/5 text-[#555]">
            {showMirrorSolutions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showMirrorSolutions && (
          <div className="p-5 sm:p-6 pt-0 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-[#F0EBE6]">
            {/* Tool 1: Google De-Index */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F3] border border-[#E8E2DC] space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#26215C] uppercase tracking-wide">
                    {isHindi ? '1. गूगल सर्च रिजल्ट्स से लिंक हटाएं' : '1. Remove From Google Search Results'}
                  </span>
                  <Globe className="w-4 h-4 text-sky-600" />
                </div>
                <h5 className="text-sm font-bold text-[#1A1A1A]">
                  {isHindi ? 'सर्च रिजल्ट्स से डुप्लीकेट कॉपियां हटाएं' : 'Removes Duplicate Copies Across Search Results'}
                </h5>
                <p className="text-xs text-[#666] leading-relaxed">
                  {isHindi
                    ? 'गूगल के एल्गोरिदम के तहत, 1 बार रिपोर्ट स्वीकृत होने पर गूगल सभी अन्य क्लोन व डुप्लीकेट वेबसाइटों से उस सामग्री को सर्च व इमेज रिजल्ट्स से हटा देता है।'
                    : 'Once Google approves removal for one URL, its duplicate matching algorithm automatically de-lists matching copies across other mirror websites globally.'}
                </p>
              </div>
              <div className="space-y-1.5">
                <a
                  href="https://support.google.com/websearch/troubleshooter/3111061"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#26215C] hover:bg-[#1C1844] text-white text-xs font-bold transition-all shadow-xs active:scale-97 w-full cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>{isHindi ? 'गूगल रिमूवल फॉर्म खोलें' : 'Open Google Removal Request'}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/70 shrink-0" />
                </a>
                <div className="text-center">
                  <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-[#0F6E56]">
                    <CheckCircle2 className="w-3 h-3 text-[#0F6E56]" />
                    <span>{isHindi ? 'सत्यापित: Google सहायता केंद्र #3111061' : 'Verified: Google Help Center #3111061'}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Tool 2: Cloudflare Host Report */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F3] border border-[#E8E2DC] space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#26215C] uppercase tracking-wide">
                    {isHindi ? '2. वेबसाइट की होस्टिंग कंपनी को रिपोर्ट करें' : '2. Report the Website\'s Hosting Company'}
                  </span>
                  <ShieldAlert className="w-4 h-4 text-orange-500" />
                </div>
                <h5 className="text-sm font-bold text-[#1A1A1A]">
                  {isHindi ? 'होस्टिंग प्रदाता को रिपोर्ट भेजें' : 'Report Directly to the Site\'s Host'}
                </h5>
                <p className="text-xs text-[#666] leading-relaxed">
                  {isHindi
                    ? 'कई क्लोन या पायरेट वेबसाइटें अपनी मूल पहचान छुपाने के लिए क्लाउडफ्लेयर जैसी सेवाओं का उपयोग करती हैं। एब्यूज रिपोर्ट दर्ज करने से वेबसाइट की मुख्य होस्टिंग कंपनी को सूचना मिलती है, जो सामग्री को हटाने या साइट को ऑफलाइन करने के कदम उठा सकती है।'
                    : 'Many clone or pirate websites use services like Cloudflare to route their traffic. Submitting an abuse report informs the site\'s hosting provider, who can take steps to remove it or take it offline.'}
                </p>
              </div>
              <div className="space-y-1.5">
                <a
                  href="https://abuse.cloudflare.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#26215C] hover:bg-[#1C1844] text-white text-xs font-bold transition-all shadow-xs active:scale-97 w-full cursor-pointer"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                  <span>{isHindi ? 'क्लाउडफ्लेयर एब्यूज फॉर्म खोलें' : 'Open Cloudflare Abuse Form'}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/70 shrink-0" />
                </a>
                <div className="text-center">
                  <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-[#0F6E56]">
                    <CheckCircle2 className="w-3 h-3 text-[#0F6E56]" />
                    <span>{isHindi ? 'सत्यापित: Cloudflare Trust & Safety' : 'Verified: Cloudflare Trust & Safety'}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. COLLAPSIBLE ACCOUNT PRIVACY LOCKDOWN DRAWER */}
      <div className="rounded-3xl bg-white border border-[#E8E2DC] shadow-xs overflow-hidden">
        <button
          type="button"
          onClick={() => {
            hapticAction();
            setShowLockdownDrawer((prev) => !prev);
          }}
          className="w-full p-5 sm:p-6 flex items-center justify-between text-left cursor-pointer hover:bg-[#FAF8F3]/60 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E1F5EE] text-[#0F6E56] flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm sm:text-base font-bold text-[#1A1A1A]">
                  {isHindi ? 'सोशल मीडिया अकाउंट प्राइवेसी लॉकडाउन' : 'Account Privacy & Harassment Lockdown'}
                </h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E1F5EE] text-[#0F6E56] border border-[#A2E2CD] hidden sm:inline-block">
                  {isHindi ? 'सेटिंग्स चेकलिस्ट' : 'Settings Checklist'}
                </span>
              </div>
              <p className="text-xs text-[#666]">
                {isHindi
                  ? 'इंस्टाग्राम, व्हाट्सएप व टेलीग्राम की सेटिंग्स लॉक करें ताकि अनजान लोग आपको मैसेज या टैग न कर सकें।'
                  : 'Lock down Instagram, WhatsApp, and Telegram settings to prevent unwanted contact, tagging, or friendlist scraping.'}
              </p>
            </div>
          </div>
          <div className="shrink-0 p-1.5 rounded-full bg-black/5 text-[#555]">
            {showLockdownDrawer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showLockdownDrawer && (
          <div className="p-5 sm:p-6 pt-2 border-t border-[#F0EBE6]">
            <PrivacyLockdownGuide language={language} />
          </div>
        )}
      </div>

      {/* 6. CANONICAL LEGAL DISCLAIMER & NON-AFFILIATION NOTICE */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F3] border border-[#E8E2DC] text-xs text-[#666] flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-[#E1F5EE] text-[#0F6E56] flex items-center justify-center shrink-0">
          <Scale className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <div className="font-bold text-[#1A1A1A]">
            {isHindi ? 'वैधानिक अस्वीकरण व गैर-संबद्धता सूचना' : 'Legal Disclaimer & Non-Affiliation Notice'}
          </div>
          <p className="leading-relaxed">
            {isHindi ? LEGAL_DISCLAIMER.full.hi : LEGAL_DISCLAIMER.full.en}
          </p>
        </div>
      </div>
    </div>
  );
};
