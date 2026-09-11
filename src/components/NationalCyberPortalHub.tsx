import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { 
  ShieldCheck, 
  ExternalLink, 
  Lock, 
  Clock, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  PhoneCall, 
  HelpCircle,
  Sparkles,
  ArrowRight,
  EyeOff,
  RotateCcw
} from 'lucide-react';

interface NationalCyberPortalHubProps {
  language: Language;
  onNavigateToDrafts?: () => void;
  onNavigateToTab?: (tab: string, elementId?: string) => void;
}

const STORAGE_KEY = 'suraksha_portal_prereqs_v1';

export const NationalCyberPortalHub: React.FC<NationalCyberPortalHubProps> = ({ 
  language, 
  onNavigateToDrafts,
  onNavigateToTab
}) => {
  const isHindi = language === 'hi';
  const [checkedPreReqs, setCheckedPreReqs] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not parse portal prereqs', e);
    }
    return {};
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedPreReqs));
    } catch (e) {
      console.warn('Could not save portal prereqs', e);
    }
  }, [checkedPreReqs]);

  const toggleCheck = (id: string) => {
    setCheckedPreReqs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleReset = () => {
    if (window.confirm(isHindi ? 'क्या आप सभी चेकलिस्ट टिक रीसेट करना चाहते हैं?' : 'Reset all prerequisites?')) {
      setCheckedPreReqs({});
    }
  };

  const portalSections = [
    {
      id: 'women_anon',
      title: {
        en: 'Report Women/Child Crime Anonymously',
        hi: 'महिला/बाल अपराध: गुप्त रूप से रिपोर्ट करें'
      },
      badge: {
        en: '100% Anonymous (No Login)',
        hi: '100% गोपनीय (बिना लॉगिन)'
      },
      urgency: 'CRITICAL',
      description: {
        en: 'File a complaint regarding non-consensual intimate images, deepfakes, or blackmail without creating an account or providing your real identity.',
        hi: 'बिना अकाउंट बनाए या पहचान उजागर किए अश्लील फोटो, डीपफेक या ब्लैकमेलिंग की शिकायत सीधे केंद्रीय साइबर सेल को भेजें।'
      },
      directUrl: 'https://cybercrime.gov.in/Webform/Crime_AuthoLogin.aspx',
      btnText: {
        en: 'Launch Anonymous Form (No OTP)',
        hi: 'बिना पहचान बताए शिकायत दर्ज करें'
      },
      statutoryRule: 'BNS 73 / IT Act Sec 66E'
    },
    {
      id: 'women_track',
      title: {
        en: 'Report with Citizen Tracking & Mobile Updates',
        hi: 'शिकायत दर्ज करें (SMS ट्रैकिंग व रसीद सहित)'
      },
      badge: {
        en: 'Official Acknowledgement No.',
        hi: 'आधिकारिक डायरी संख्या'
      },
      urgency: 'HIGH',
      description: {
        en: 'Submit with your mobile number to receive a 14-digit Complaint Acknowledgment number for court or police station follow-ups.',
        hi: 'अपने मोबाइल नंबर से शिकायत दर्ज कर 14-अंकों की पावती संख्या प्राप्त करें, जिससे जांच की प्रगति ट्रैक की जा सके।'
      },
      directUrl: 'https://cybercrime.gov.in/Webform/Crime_CitizenLogin.aspx',
      btnText: {
        en: 'Login & Report (Get Track ID)',
        hi: 'लॉगिन कर शिकायत दर्ज करें'
      },
      statutoryRule: 'BNSS Section 173'
    },
    {
      id: 'financial_1930',
      title: {
        en: '1930 Financial Cyber Fraud System (CFCFRMS)',
        hi: '1930 वित्तीय साइबर फ्रॉड रिपोर्टिंग सिस्टम'
      },
      badge: {
        en: 'Freeze Ransom / Extortion Money',
        hi: 'ब्लैकमेलर का बैंक खाता फ्रीज कराएं'
      },
      urgency: 'CRITICAL',
      description: {
        en: 'If you transferred money via UPI, NetBanking, or QR code under blackmail, reporting here immediately alerts the bank nodal officer to freeze the recipient account.',
        hi: 'यदि आपने ब्लैकमेलिंग के डर से UPI या बैंक से पैसे ट्रांसफर किए हैं, तो यहाँ तुरंत रिपोर्ट करने से आरोपी का बैंक खाता फ्रीज हो जाता है।'
      },
      directUrl: 'https://cybercrime.gov.in/Webform/Crime_FinancialFraud.aspx',
      btnText: {
        en: 'Report Extortion Payment (1930)',
        hi: 'पैसे ट्रांसफर की रिपोर्ट करें'
      },
      statutoryRule: 'Citizen Financial Cyber Fraud System'
    },
    {
      id: 'track_status',
      title: {
        en: 'Track Existing Complaint Status',
        hi: 'अपनी शिकायत की स्थिति (Status) जांचें'
      },
      badge: {
        en: 'Real-Time IO Assigned Status',
        hi: 'जांच अधिकारी (IO) अपडेट'
      },
      urgency: 'MEDIUM',
      description: {
        en: 'Check whether your complaint has been assigned to the district Cyber Crime Unit, convert it into an FIR, or view the Investigating Officer (IO) details.',
        hi: 'जांचें कि आपकी शिकायत किस थाने या साइबर सेल को भेजी गई है और आपके मामले के जांच अधिकारी (IO) का नाम क्या है।'
      },
      directUrl: 'https://cybercrime.gov.in/Webform/Crime_TrackStatus.aspx',
      btnText: {
        en: 'Check Complaint Status Online',
        hi: 'ऑनलाइन स्टेटस चेक करें'
      },
      statutoryRule: 'Track 14-Digit Number'
    }
  ];

  const preReqs = [
    {
      id: 'p1',
      text: {
        en: 'Raw Screenshots of chat showing date, timestamp, and blackmailer\'s phone number or username.',
        hi: 'चैट और धमकी के स्क्रीनशॉट जिनमें तारीख, समय और ब्लैकमेलर का नंबर या यूजरनेम साफ दिखे।'
      }
    },
    {
      id: 'p2',
      text: {
        en: 'Direct URL / Web Link of the profile, channel, or leaked media post.',
        hi: 'आरोपी की सोशल मीडिया प्रोफाइल, टेलीग्राम चैनल या पोस्ट का पूरा वेब लिंक (URL)।'
      }
    },
    {
      id: 'p3',
      text: {
        en: 'UTR / Transaction Reference Number if any ransom payment was made via UPI or bank.',
        hi: 'यदि कोई पैसा दिया है तो बैंक या UPI ट्रांजैक्शन का 12-अंकों का UTR नंबर।'
      }
    },
    {
      id: 'p4',
      text: {
        en: 'Pre-written legal incident summary (Use our Legal Draft Generator to copy it instantly).',
        hi: 'तैयार कानूनी शिकायत विवरण (हमारे लीगल ड्राफ्ट जनरेटर से 1-क्लिक में कॉपी कर सकते हैं)।'
      }
    }
  ];

  return (
    <div id="national-cyber-portal-hub" className="space-y-6 scroll-mt-48">
      {/* Official Government Gateway Hero Card */}
      <div className="bg-[#2D2D2D] text-[#FAF9F6] rounded-3xl p-6 sm:p-9 shadow-sm border border-[#222] space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FAF9F6] text-xs font-bold tracking-wider uppercase">
              <ShieldCheck className="w-4 h-4 text-[#E25822]" />
              <span>{isHindi ? 'भारत सरकार: राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल' : 'Ministry of Home Affairs: National Cyber Crime Portal (I4C)'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {isHindi
                ? 'cybercrime.gov.in आधिकारिक सबमिशन एवं डायरेक्ट लिंक हब'
                : 'Direct Integration & Category Router for cybercrime.gov.in'}
            </h2>
            <p className="text-xs sm:text-sm text-[#CCC] leading-relaxed">
              {isHindi
                ? 'यह पोर्टल भारत सरकार के गृह मंत्रालय (MHA) के अधीन संचालित होता है। यहाँ की गई शिकायत सीधे आपके जिले के पुलिस अधीक्षक (SP Cyber) को भेजी जाती है।'
                : 'Direct links to specialized sections of the National Cyber Crime Reporting Portal under Indian Cyber Crime Coordination Centre (I4C).'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#8B6D5C] hover:bg-[#775c4c] text-white rounded-full text-xs sm:text-sm font-bold transition-all shadow-xs"
            >
              <span>{isHindi ? 'मुख्य पोर्टल खोलें' : 'Open cybercrime.gov.in'}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 3 Golden Rules Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10 text-xs">
          <div className="flex items-center gap-2 bg-white/5 p-3 rounded-2xl">
            <EyeOff className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{isHindi ? 'गुप्त रिपोर्ट: नाम व पता अनिवार्य नहीं है' : 'Anonymous Mode: Real name not mandatory'}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 p-3 rounded-2xl">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{isHindi ? '24 घंटे के अंदर मध्यस्थों को नोटिस' : '24-Hour statutory notice to platforms'}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 p-3 rounded-2xl">
            <PhoneCall className="w-4 h-4 text-[#E25822] shrink-0" />
            <span>{isHindi ? 'वित्तीय धोखाधड़ी पर तुरंत 1930 मिलाएं' : 'Helpline 1930 for instant financial freeze'}</span>
          </div>
        </div>
      </div>

      {/* Pre-Submission Preparation Checklist */}
      <div className="bg-white border border-[#E8E2DC] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#F3EFEC] text-[#8B6D5C] flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A]">
                {isHindi ? 'cybercrime.gov.in पर जाने से पहले यह 4 चीजें तैयार रखें' : 'Pre-Submission Checklist: 4 Items to Keep Ready'}
              </h3>
              <p className="text-xs text-[#666]">
                {isHindi ? 'इससे आपकी शिकायत बिना किसी देरी के 5 मिनट में पूरी हो जाएगी' : 'Ensures swift, uninterrupted submission in under 5 minutes'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F3EFEC] text-[#8B6D5C] rounded-full text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {Object.values(checkedPreReqs).filter(Boolean).length}/4 {isHindi ? 'तैयार (सुरक्षित)' : 'ready (saved)'}
              </span>
            </span>

            {Object.values(checkedPreReqs).filter(Boolean).length > 0 && (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-[#888] hover:text-[#DC2626] transition-colors cursor-pointer"
                title={isHindi ? 'रीसेट करें' : 'Reset checks'}
              >
                <RotateCcw className="w-3 h-3" />
                <span>{isHindi ? 'रीसेट' : 'Reset'}</span>
              </button>
            )}

            {onNavigateToDrafts && (
              <button
                onClick={onNavigateToDrafts}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FAF9F6] hover:bg-[#F3EFEC] text-[#8B6D5C] border border-[#E8E2DC] rounded-full text-xs font-bold transition-colors cursor-pointer select-none"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isHindi ? 'तैयार FIR ड्राफ्ट कॉपी करें' : 'Generate Ready FIR Text'}</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {preReqs.map((req) => {
            const isChecked = !!checkedPreReqs[req.id];
            return (
              <div
                key={req.id}
                onClick={() => toggleCheck(req.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                  isChecked
                    ? 'bg-[#F3EFEC] border-[#DED9D4] text-[#1A1A1A]'
                    : 'bg-[#FAF9F6] hover:bg-white border-[#E8E2DC] text-[#1A1A1A]'
                }`}
              >
                <div className="pt-0.5">
                  <CheckCircle2 className={`w-5 h-5 ${isChecked ? 'text-[#8B6D5C]' : 'text-[#CCC]'}`} />
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed ${isChecked ? 'line-through opacity-80 text-[#8B6D5C]' : 'text-[#333]'}`}>
                  {req.text[language]}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid of Specialized Sub-Portals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {portalSections.map((sec) => (
          <div
            key={sec.id}
            className="bg-white border border-[#E8E2DC] hover:border-[#8B6D5C] rounded-3xl p-5 sm:p-7 shadow-sm flex flex-col justify-between space-y-4 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#F3EFEC] text-[#8B6D5C]">
                  {sec.badge[language]}
                </span>
                <span className="text-xs font-semibold text-[#888] font-mono">
                  {sec.statutoryRule}
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A]">
                  {sec.title[language]}
                </h3>
                <p className="text-xs sm:text-sm text-[#444] mt-2 leading-relaxed">
                  {sec.description[language]}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E8E2DC]">
              <a
                href={sec.directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 bg-[#2D2D2D] hover:bg-[#111] text-white rounded-full text-xs sm:text-sm font-bold transition-all shadow-xs"
              >
                <span>{sec.btnText[language]}</span>
                <ExternalLink className="w-4 h-4 text-[#E25822]" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
