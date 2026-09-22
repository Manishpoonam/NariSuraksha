import React, { useState } from 'react';
import { 
  Scale, 
  ShieldCheck, 
  FileText, 
  Sparkles, 
  Heart, 
  ArrowRight, 
  ArrowLeft, 
  Lock, 
  CheckCircle2, 
  HelpCircle, 
  PhoneCall, 
  Clock, 
  Compass,
  AlertCircle,
  EyeOff,
  UserCheck,
  Building2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Language } from '../types';
import { hapticAction } from '../utils/haptics';

interface OptionsOverviewHubProps {
  language: Language;
  onNavigateToTab: (tab: string, elementId?: string) => void;
  onBackToLanding?: () => void;
}

export const OptionsOverviewHub: React.FC<OptionsOverviewHubProps> = ({
  language,
  onNavigateToTab,
  onBackToLanding,
}) => {
  const isHindi = language === 'hi';
  const [selectedPathId, setSelectedPathId] = useState<string>('takedown');

  // The 5 Core Action Paths
  const actionPaths = [
    {
      id: 'takedown',
      title: {
        en: '1. Platform Takedown Only (Zero Police Involvement)',
        hi: '1. केवल प्लेटफॉर्म से फोटो हटवाएं (पुलिस के बिना)'
      },
      badge: { en: 'Digital Removal Only', hi: 'केवल डिजिटल निष्कासन' },
      badgeColor: 'bg-[#FBEAF0] text-[#993556] border-[#F3C5D6]',
      icon: ShieldCheck,
      iconColor: 'text-[#993556] bg-[#FBEAF0]',
      whoKnows: {
        en: 'Strictly confidential. Nobody in your family, college, or police is contacted.',
        hi: 'पूर्णतः गोपनीय। आपके परिवार, कॉलेज या पुलिस को कोई जानकारी नहीं जाती।'
      },
      timeline: {
        en: '24 hours for legal grievance notice; instant cryptographic hash protection via StopNCII / Take It Down.',
        hi: 'कानूनी नोटिस पर 24 घंटे; StopNCII / Take It Down से तुरंत क्रिप्टोग्राफिक हैश सुरक्षा।'
      },
      whatToExpect: {
        en: 'Your media is hashed on your device (not uploaded) to block dissemination across Instagram, Facebook, Snapchat, etc. A formal notice under IT Rule 3(2)(b) compels the platform to delete content within 24 hours.',
        hi: 'आपकी फोटो को फोन पर ही सुरक्षित हैश कोड में बदला जाता है जिससे यह इंस्टाग्राम, फेसबुक पर दोबारा पोस्ट न हो सके। आईटी नियम 3(2)(b) के तहत प्लेटफॉर्म 24 घंटे में इसे हटाने को बाध्य है।'
      },
      limitations: {
        en: 'Does not identify or penalize the extortionist legally; focuses purely on removing and suppressing the media.',
        hi: 'यह ब्लैकमेलर की पहचान या कानूनी सजा नहीं कराता; इसका उद्देश्य केवल सामग्री को हटाना व रोकना है।'
      },
      recommendedWhen: {
        en: 'You want the material removed immediately and have no desire to initiate a police case right now.',
        hi: 'आप तुरंत सामग्री हटवाना चाहती हैं और अभी पुलिस केस में नहीं पड़ना चाहतीं।'
      },
      targetTab: 'takedown',
      buttonLabel: { en: 'Open Takedown & StopNCII Tools →', hi: 'टेकडाउन व StopNCII टूल्स खोलें →' }
    },
    {
      id: 'cyber',
      title: {
        en: '2. National Cyber Crime Portal (1930 / cybercrime.gov.in)',
        hi: '2. राष्ट्रीय साइबर क्राइम पोर्टल (1930 / cybercrime.gov.in)'
      },
      badge: { en: 'Online Official Report', hi: 'आधिकारिक ऑनलाइन रिपोर्ट' },
      badgeColor: 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]',
      icon: FileText,
      iconColor: 'text-[#92400E] bg-[#FEF3C7]',
      whoKnows: {
        en: 'State cyber cell investigators. Option available to file anonymously under Women/Children reporting category.',
        hi: 'राज्य साइबर सेल के जांच अधिकारी। महिला एवं बाल अपराध श्रेणी में अज्ञात/गोपनीय रिपोर्ट का विकल्प भी उपलब्ध है।'
      },
      timeline: {
        en: 'Immediate acknowledgment receipt and acknowledgment number; investigation takes days to weeks depending on state jurisdiction.',
        hi: 'तुरंत पावती नंबर; राज्य क्षेत्र के अनुसार जांच में कुछ दिन से कुछ सप्ताह लग सकते हैं।'
      },
      whatToExpect: {
        en: 'Cyber police trace IP logs, telecom SIM registrations, and UPI banking trails. If extortion money was transferred, calling 1930 within the golden window can freeze the perpetrator\'s fraudulent recipient account.',
        hi: 'साइबर पुलिस आईपी लॉग्स, सिम रजिस्ट्रेशन व यूपीआई ट्रांजैक्शन की जांच करती है। पैसे ट्रांसफर हुए हों तो 1930 पर तुरंत कॉल करने से जालसाज का बैंक खाता फ्रीज हो सकता है।'
      },
      limitations: {
        en: 'Requires providing preserved uncropped screenshots, URLs, and financial transaction IDs.',
        hi: 'इसके लिए आपको बातचीत के स्क्रीनशॉट, प्रोफाइल लिंक व लेनदेन आईडी उपलब्ध करानी होती है।'
      },
      recommendedWhen: {
        en: 'Money was extorted, or threats of distribution are persistent, and you want an official state investigation.',
        hi: 'पैसों की जबरन वसूली हुई हो, या ब्लैकमेल लगातार जारी हो, और आप आधिकारिक जांच चाहती हों।'
      },
      targetTab: 'report',
      buttonLabel: { en: 'View e-FIR Portal & Drafts →', hi: 'ई-एफआईआर पोर्टल व ड्राफ्ट्स देखें →' }
    },
    {
      id: 'police',
      title: {
        en: '3. Local Police Station / Women Police Station (Zero FIR)',
        hi: '3. स्थानीय / महिला पुलिस थाना (जीरो एफआईआर)'
      },
      badge: { en: 'Direct Police Protection', hi: 'सीधी पुलिस सुरक्षा' },
      badgeColor: 'bg-[#E1F5EE] text-[#0F6E56] border-[#A2E2CD]',
      icon: Scale,
      iconColor: 'text-[#0F6E56] bg-[#E1F5EE]',
      whoKnows: {
        en: 'Police officers. Section 73 BNS legally prohibits publishing or disclosing your name or identity (punishable by 2 years imprisonment for anyone who breaches this).',
        hi: 'संबंधित पुलिस अधिकारी। BNS धारा 73 के तहत आपकी पहचान उजागर करना पूर्णतः वर्जित व 2 वर्ष तक का संज्ञेय अपराध है।'
      },
      timeline: {
        en: 'Immediate filing of Zero FIR. Investigating officer can immediately summon, interrogate, or issue formal notice to the accused.',
        hi: 'तुरंत जीरो एफआईआर। जांच अधिकारी आरोपी को तुरंत तलब कर पूछताछ या कानूनी नोटिस जारी कर सकते हैं।'
      },
      whatToExpect: {
        en: 'By law, your statement must be recorded by a woman police officer. You can register a Zero FIR at ANY police station regardless of where the incident occurred.',
        hi: 'कानूनन आपका बयान महिला पुलिस अधिकारी द्वारा ही दर्ज होना अनिवार्य है। घटना कहीं भी हुई हो, किसी भी थाने में जीरो एफआईआर हो सकती है।'
      },
      limitations: {
        en: 'Requires visiting a station or speaking directly with investigating personnel.',
        hi: 'इसके लिए थाने जाना या पुलिस अधिकारियों से सीधे बातचीत करना आवश्यक होता है।'
      },
      recommendedWhen: {
        en: 'You are in immediate physical danger, being actively stalked, or you know the person and need swift legal restraint.',
        hi: 'शारीरिक खतरे या पीछा किए जाने की आशंका हो, या आरोपी परिचित हो और तुरंत कानूनी रोक की आवश्यकता हो।'
      },
      targetTab: 'rights',
      targetElementId: 'legal-rights-faq',
      buttonLabel: { en: 'Review Police Station Rights & FAQs →', hi: 'थाने के अधिकार व FAQ पढ़ें →' }
    },
    {
      id: 'counseling',
      title: {
        en: '4. Confidential Emotional Counseling (Tele-MANAS 14416)',
        hi: '4. गोपनीय भावनात्मक परामर्श (टेली-मानस 14416)'
      },
      badge: { en: 'Safe Psychological Support', hi: 'सुरक्षित मानसिक संबल' },
      badgeColor: 'bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]',
      icon: Heart,
      iconColor: 'text-[#0369A1] bg-[#E0F2FE]',
      whoKnows: {
        en: '100% confidential. No reports made to parents, guardians, police, or colleges.',
        hi: '100% गोपनीय। माता-पिता, अभिभावकों, पुलिस या कॉलेज को कोई रिपोर्ट नहीं दी जाती।'
      },
      timeline: {
        en: 'Immediate 24/7 toll-free telephone connection with certified clinical psychologists and counselors.',
        hi: 'प्रमाणित क्लिनिकल मनोवैज्ञानिकों के साथ तुरंत 24/7 टोल-फ्री फोन परामर्श।'
      },
      whatToExpect: {
        en: 'Non-judgmental, trauma-informed stabilization. Counselors help you breathe through panic, dismantle feelings of shame or guilt, and regain mental clarity before making decisions.',
        hi: 'बिना किसी पूर्वाग्रह के संवेदनशील बातचीत। वे घबराहट शांत करने, आत्मग्लानि दूर करने और स्पष्ट निर्णय लेने में मदद करते हैं।'
      },
      limitations: {
        en: 'Psychological support only; counselors cannot file legal notices or police reports on your behalf.',
        hi: 'केवल मानसिक व भावनात्मक सहायता; वे आपकी ओर से कानूनी नोटिस या एफआईआर दर्ज नहीं करते।'
      },
      recommendedWhen: {
        en: 'You are experiencing racing heartbeat, intense shame, panic, or feel completely alone with nobody safe to talk to.',
        hi: 'जब दिल की धड़कन बढ़ रही हो, अत्यधिक शर्म या घबराहट महसूस हो, और बात करने के लिए कोई सुरक्षित व्यक्ति न हो।'
      },
      targetTab: 'support',
      buttonLabel: { en: 'Access 14416 & Calming Tools →', hi: '14416 व शांत अभ्यास खोलें →' }
    },
    {
      id: 'legalaid',
      title: {
        en: '5. Free Government Legal Aid (NALSA / DLSA Helpline 15100)',
        hi: '5. निःशुल्क सरकारी कानूनी सहायता (NALSA / DLSA 15100)'
      },
      badge: { en: '100% Free Lawyer Representation', hi: 'मुफ्त सरकारी वकील का अधिकार' },
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      icon: Building2,
      iconColor: 'text-emerald-800 bg-emerald-50',
      whoKnows: {
        en: 'Legal aid advocates bound by attorney-client privilege. Complete confidentiality.',
        hi: 'सरकारी कानूनी सलाहकार (अधिवक्ता-मुवक्किल गोपनीयता के तहत 100% सुरक्षित)।'
      },
      timeline: {
        en: 'Free consultation via 15100 or walk-in to District Legal Services Authority (DLSA) in any district court complex.',
        hi: 'हेल्पलाइन 15100 पर सलाह या किसी भी जिला अदालत परिसर में DLSA कार्यालय से त्वरित सहायता।'
      },
      whatToExpect: {
        en: 'Under Section 12 of the Legal Services Authorities Act, 1987, EVERY Indian woman is legally entitled to completely free legal representation, irrespective of her family income.',
        hi: 'विधिक सेवा प्राधिकरण अधिनियम 1987 की धारा 12 के तहत, भारत की प्रत्येक महिला आय की परवाह किए बिना निःशुल्क वकील पाने की हकदार है।'
      },
      limitations: {
        en: 'Formal court filings require in-person identity verification with the assigned advocate.',
        hi: 'न्यायालय में औपचारिक कार्यवाही हेतु नियुक्त वकील से आवश्यक सत्यापन कराना होता है।'
      },
      recommendedWhen: {
        en: 'You want legal advice before deciding whether to lodge an FIR, or need an advocate to accompany you to the station.',
        hi: 'एफआईआर से पहले कानूनी सलाह चाहिए, या थाने में साथ जाने हेतु किसी अनुभवी वकील की आवश्यकता हो।'
      },
      targetTab: 'rights',
      targetElementId: 'legal-rights-faq',
      buttonLabel: { en: 'Read Free Legal Aid Entitlements →', hi: 'निःशुल्क कानूनी सहायता अधिकार देखें →' }
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 scroll-mt-48" id="options-overview-hub">
      {/* Top Breadcrumb Header */}
      {onBackToLanding && (
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              hapticAction();
              onBackToLanding();
            }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#26215C] hover:text-[#993556] transition-colors cursor-pointer py-1 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>{isHindi ? 'मुख्य द्वार पर वापस जाएं' : 'Back to Home'}</span>
          </button>

          <div className="inline-flex items-center gap-1.5 text-xs text-[#5A5672]">
            <Lock className="w-3.5 h-3.5 text-[#0F6E56]" />
            <span className="font-medium">{isHindi ? 'गोपनीय अध्ययन' : 'Confidential Overview'}</span>
          </div>
        </div>
      )}

      {/* Hero / Overview Header */}
      <div className="rounded-3xl bg-white border border-[#E8E2DC] p-6 sm:p-8 shadow-xs relative overflow-hidden space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E1F5EE] text-[#0F6E56] border border-[#A2E2CD] text-xs font-bold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5" />
          <span>{isHindi ? 'शांत व स्पष्ट दृष्टिकोण' : 'Take Your Time • Zero Pressure'}</span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#26215C] tracking-tight">
          {isHindi ? 'अपने 5 सुरक्षा रास्ते और विकल्प समझें' : 'Understand Your 5 Action Paths & Options'}
        </h1>

        <p className="text-sm sm:text-base text-[#5A5672] max-w-3xl leading-relaxed">
          {isHindi
            ? 'आप पर किसी भी एक कदम को उठाने का कोई दबाव नहीं है। नीचे दिए गए 5 रास्तों को ध्यान से पढ़ें ताकि आप जान सकें कि कौन सा रास्ता आपकी वर्तमान स्थिति और मानसिक शांति के लिए सबसे सही है:'
            : 'You are in total control. There is no requirement to choose one path immediately or do anything you are not ready for. Compare the realistic timelines, outcomes, and privacy guarantees below:'}
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs text-[#5A5672]">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F3] border border-[#E8E2DC]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0F6E56]" />
            <span>{isHindi ? 'कोई जबरदस्ती नहीं' : 'No forced decisions'}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F3] border border-[#E8E2DC]">
            <EyeOff className="w-3.5 h-3.5 text-[#0F6E56]" />
            <span>{isHindi ? '100% गोपनीय व सुरक्षित' : 'Zero tracking on device'}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F3] border border-[#E8E2DC]">
            <Scale className="w-3.5 h-3.5 text-[#0F6E56]" />
            <span>{isHindi ? 'भारतीय कानूनों द्वारा संरक्षित' : 'Protected by Indian Law'}</span>
          </span>
        </div>
      </div>

      {/* QUICK COMPARISON SELECTOR TABS */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#8B6D5C]">
          {isHindi ? 'मार्ग चुनें और वास्तविक अपेक्षाएं देखें:' : 'Select a Path to View Detailed Realities:'}
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {actionPaths.map((p) => {
            const isSelected = selectedPathId === p.id;
            const Icon = p.icon;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  hapticAction();
                  setSelectedPathId(p.id);
                }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 min-h-[90px] ${
                  isSelected
                    ? 'bg-[#26215C] text-white border-[#26215C] shadow-sm'
                    : 'bg-white hover:bg-[#FAF8F3] text-[#26215C] border-[#E8E2DC]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-300' : 'text-[#8B6D5C]'}`} />
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600'
                  }`}>
                    {p.id.toUpperCase()}
                  </span>
                </div>
                <span className="text-xs font-bold leading-tight line-clamp-2">
                  {p.title[language].replace(/^[0-9]\.\s*/, '')}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* DETAILED PATH BREAKDOWN CARD */}
      {(() => {
        const activePath = actionPaths.find((p) => p.id === selectedPathId) || actionPaths[0];
        const PathIcon = activePath.icon;
        return (
          <div className="rounded-3xl bg-white border border-[#E8E2DC] p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0EBE6] pb-5">
              <div className="flex items-start gap-3.5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${activePath.iconColor}`}>
                  <PathIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className={`inline-block text-[11px] font-bold px-3 py-0.5 rounded-full border mb-1 ${activePath.badgeColor}`}>
                    {activePath.badge[language]}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A]">
                    {activePath.title[language]}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  hapticAction();
                  onNavigateToTab(activePath.targetTab, activePath.targetElementId);
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#26215C] hover:bg-[#1E1949] text-white text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
              >
                <span>{activePath.buttonLabel[language]}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Path Realities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E2DC] space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B6D5C] block">
                  {isHindi ? 'गोपनीयता व कौन जानेगा:' : 'Privacy & Who Gets Notified:'}
                </span>
                <p className="text-[#2D2D2D] leading-relaxed font-medium">
                  {activePath.whoKnows[language]}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E2DC] space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B6D5C] block">
                  {isHindi ? 'समय सीमा (टाइमलाइन):' : 'Realistic Timeframe:'}
                </span>
                <p className="text-[#2D2D2D] leading-relaxed font-medium">
                  {activePath.timeline[language]}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                  {isHindi ? 'यह कैसे काम करता है (अपेक्षाएं):' : 'How It Works & What to Expect:'}
                </span>
                <p className="text-emerald-950 leading-relaxed">
                  {activePath.whatToExpect[language]}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                  {isHindi ? 'इसकी सीमाएं (क्या नहीं होगा):' : 'Realistic Boundaries & Limits:'}
                </span>
                <p className="text-amber-950 leading-relaxed">
                  {activePath.limitations[language]}
                </p>
              </div>
            </div>

            {/* When Recommended */}
            <div className="p-4 rounded-2xl bg-[#E1F5EE]/40 border border-[#A2E2CD]/60 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#0F6E56] shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <strong className="text-[#0F6E56] block font-bold mb-0.5">
                  {isHindi ? 'यह विकल्प आपके लिए सबसे सही है यदि:' : 'Best suited for your situation if:'}
                </strong>
                <span className="text-[#2D2D2D]">
                  {activePath.recommendedWhen[language]}
                </span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ALL 5 PATHS AT-A-GLANCE COMPARISON TABLE */}
      <div className="rounded-3xl bg-white border border-[#E8E2DC] p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-[#1A1A1A]">
          {isHindi ? '5 विकल्पों की संक्षिप्त तुलना (तुलनात्मक चार्ट)' : 'At-a-Glance Comparison of All 5 Paths'}
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-[#2D2D2D] text-[#8B6D5C]">
                <th className="py-2.5 pr-4 font-bold">{isHindi ? 'रास्ता' : 'Path'}</th>
                <th className="py-2.5 px-3 font-bold">{isHindi ? 'पुलिस संपर्क' : 'Police Contact'}</th>
                <th className="py-2.5 px-3 font-bold">{isHindi ? 'गोपनीयता' : 'Identity Privacy'}</th>
                <th className="py-2.5 px-3 font-bold">{isHindi ? 'समय' : 'Speed'}</th>
                <th className="py-2.5 pl-3 font-bold text-right">{isHindi ? 'कार्रवाई' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EBE6] text-[#2D2D2D]">
              {actionPaths.map((p) => (
                <tr key={p.id} className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="py-3 pr-4 font-semibold">
                    {p.title[language].replace(/^[0-9]\.\s*/, '')}
                  </td>
                  <td className="py-3 px-3">
                    {p.id === 'takedown' || p.id === 'counseling' ? (
                      <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 font-medium">
                        {isHindi ? 'शून्य (कोई नहीं)' : 'None'}
                      </span>
                    ) : p.id === 'cyber' ? (
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-medium">
                        {isHindi ? 'वैकल्पिक / ऑनलाइन' : 'Online / Optional'}
                      </span>
                    ) : p.id === 'legalaid' ? (
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-medium">
                        {isHindi ? 'वकील मार्गदर्शन' : 'Advocate Guided'}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                        {isHindi ? 'सीधा (महिला अफसर)' : 'Direct (Female Officer)'}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-medium text-[#0F6E56]">
                      {p.id === 'police' ? 'Section 73 BNS' : isHindi ? '100% गोपनीय' : '100% Confidential'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-neutral-600">
                    {p.id === 'counseling' ? (isHindi ? 'तुरंत (24×7)' : 'Instant 24×7') : p.id === 'takedown' ? '24 hrs' : isHindi ? 'कुछ दिन' : 'Days/Weeks'}
                  </td>
                  <td className="py-3 pl-3 text-right">
                    <button
                      type="button"
                      onClick={() => {
                        hapticAction();
                        onNavigateToTab(p.targetTab, p.targetElementId);
                      }}
                      className="text-xs font-bold text-[#26215C] hover:text-[#993556] hover:underline cursor-pointer"
                    >
                      {isHindi ? 'खोलें →' : 'Explore →'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reassurance Banner at bottom */}
      <div className="rounded-2xl bg-[#E1F5EE]/40 border border-[#A2E2CD]/60 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#0F6E56] text-white flex items-center justify-center shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-[#0F6E56]">
              {isHindi ? 'आप किसी भी रास्ते को कभी भी बदल सकती हैं' : 'You can switch paths at any moment'}
            </h3>
            <p className="text-[11px] sm:text-xs text-[#5A5672]">
              {isHindi
                ? 'एक विकल्प चुनने से आपके बाकी विकल्प बंद नहीं होते। आपका नियंत्रण 100% आपके पास है।'
                : 'Taking one step never closes off other avenues. Every path operates independently for your protection.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            hapticAction();
            onNavigateToTab('rescue');
          }}
          className="shrink-0 px-4 py-2 rounded-full bg-white hover:bg-[#FAF8F3] text-[#26215C] border border-[#26215C]/20 text-xs font-bold transition-all cursor-pointer shadow-2xs"
        >
          {isHindi ? 'त्वरित बचाव मार्ग पर जाएं →' : 'Go to Rescue Path →'}
        </button>
      </div>
    </div>
  );
};

