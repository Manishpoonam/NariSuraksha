import React from 'react';
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
  Compass
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

  const optionCards = [
    {
      id: 'rights',
      badge: { en: 'Constitutional & Legal Rights', hi: 'संवैधानिक व कानूनी अधिकार' },
      badgeColor: 'bg-[#E1F5EE] text-[#0F6E56] border-[#A2E2CD]',
      icon: Scale,
      iconBg: 'bg-[#E1F5EE] text-[#0F6E56]',
      title: {
        en: 'Your Legal Rights & Statutory Protections (BNS & IT Act)',
        hi: 'आपके कानूनी अधिकार एवं संरक्षण (BNS व IT Act)',
      },
      summary: {
        en: 'You are protected by law. Zero victim liability, mandatory female police officer for recording statements, strict adult privacy (no parents informed), and Section 73 BNS anonymity.',
        hi: 'कानून पूरी तरह आपकी सुरक्षा के लिए है। पीड़िता पर कोई धारा नहीं लगती, महिला पुलिस अधिकारी द्वारा बयान होना अनिवार्य है और आपकी पहचान पूर्णतः गुप्त रखी जाती है।',
      },
      actionLabel: { en: 'Read Legal Rights & FAQs', hi: 'कानूनी अधिकार और FAQ पढ़ें' },
      targetTab: 'rights',
      targetElementId: 'legal-rights-faq',
    },
    {
      id: 'takedowns',
      badge: { en: 'Proactive Digital Defense', hi: 'सक्रिय डिजिटल रोकथाम' },
      badgeColor: 'bg-[#FBEAF0] text-[#993556] border-[#F3C5D6]',
      icon: ShieldCheck,
      iconBg: 'bg-[#FBEAF0] text-[#993556]',
      title: {
        en: 'Stop Leaks & Platform Takedowns (StopNCII & Portals)',
        hi: 'फोटो लीक रोकें व प्लेटफॉर्म से हटवाएं (StopNCII व पोर्टल्स)',
      },
      summary: {
        en: 'Digital hashing prevents non-consensual images from being re-uploaded to participating platforms without anyone ever viewing your original file. IT Rules 2021 mandate 24-hour takedown.',
        hi: 'StopNCII प्राइवेसी हैश बनाकर प्रमुख सोशल मीडिया पर फोटो को री-अपलोड होने से पहले ही ब्लॉक करता है। IT नियम 2021 के तहत 24 घंटे में प्लेटफॉर्म से फोटो हटाना अनिवार्य है।',
      },
      actionLabel: { en: 'Explore Takedowns & StopNCII', hi: 'फोटो रोकने के टूल्स देखें' },
      targetTab: 'takedown',
    },
    {
      id: 'efir',
      badge: { en: 'Guided Reporting', hi: 'निर्देशित शिकायत प्रक्रिया' },
      badgeColor: 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]',
      icon: FileText,
      iconBg: 'bg-[#FEF3C7] text-[#92400E]',
      title: {
        en: 'Official Reporting & Guided e-FIR Overview',
        hi: 'आधिकारिक रिपोर्टिंग व ई-एफआईआर प्रारूप',
      },
      summary: {
        en: 'Understand how the National Cyber Crime Reporting Portal (1930 / cybercrime.gov.in) functions, with pre-formatted anonymous complaint templates that eliminate stressful drafting.',
        hi: 'जानिए कि नेशनल साइबर क्राइम पोर्टल (1930 / cybercrime.gov.in) पर शिकायत कैसे दर्ज होती है। तैयार कानूनी ड्राफ्ट्स की मदद से आपको कुछ भी नया लिखने की जरूरत नहीं पड़ेगी।',
      },
      actionLabel: { en: 'View e-FIR Guide & Drafts', hi: 'ई-एफआईआर गाइड और ड्राफ्ट्स देखें' },
      targetTab: 'report',
    },
    {
      id: 'confidence',
      badge: { en: 'Inner Strength & Dignity', hi: 'आत्मविश्वास व मानसिक संबल' },
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: Sparkles,
      iconBg: 'bg-rose-50 text-rose-700',
      title: {
        en: 'Confidence & Courage Pins',
        hi: 'आत्मविश्वास व साहस पिन्स (Courage Board)',
      },
      summary: {
        en: 'Truth cards that dismantle fear: understand criminal psychology (why blackmailers are cowards), read constitutional dignity anchors, and save grounding power words.',
        hi: 'डर को शांत आत्मविश्वास में बदलें: ब्लैकमेलर के डर का सच समझें, संविधान के गरिमा सिद्धांतों को पढ़ें और तुरंत भेजने योग्य सशक्त कानूनी जवाब सेव करें।',
      },
      actionLabel: { en: 'Open Courage Pins Board', hi: 'आत्मविश्वास बोर्ड खोलें' },
      targetTab: 'confidence',
    },
    {
      id: 'calm',
      badge: { en: 'Confidential Helplines & Calm', hi: 'गोपनीय हेल्पलाइन व राहत' },
      badgeColor: 'bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]',
      icon: Heart,
      iconBg: 'bg-[#E0F2FE] text-[#0369A1]',
      title: {
        en: 'Helplines, Safe Scripts & Somatic Calming',
        hi: '24/7 हेल्पलाइन, सुरक्षित संदेश व श्वास अभ्यास',
      },
      summary: {
        en: 'Connect directly with verified national numbers (1930, 112, NCW, Tele-MANAS), access templates to safely disclose to parents or allies, and regulate panic with a 2-minute breathing pacer.',
        hi: 'सत्यापित राष्ट्रीय हेल्पलाइन (1930, 112, NCW, Tele-MANAS) से जुड़ें, परिजनों को सुरक्षित ढंग से बताने के संदेश प्राप्त करें, और 2-मिनट श्वास अभ्यास से घबराहट शांत करें।',
      },
      actionLabel: { en: 'Access Helplines & Calming Tools', hi: 'हेल्पलाइन व शांत अभ्यास' },
      targetTab: 'support',
    },
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
            <span>{isHindi ? 'मुख्य द्वार पर वापस जाएं' : 'Back to Entry Screen'}</span>
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
          <span>{isHindi ? 'शांत व स्पष्ट दृष्टिकोण' : 'Calm & Objective Guidance'}</span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#26215C] tracking-tight">
          {isHindi ? 'अपने अधिकार और सुरक्षा विकल्प समझें' : 'Understand Your Rights & Protection Options'}
        </h1>

        <p className="text-sm sm:text-base text-[#5A5672] max-w-3xl leading-relaxed">
          {isHindi
            ? 'बिना किसी घबराहट या दबाव के अपनी गति से जानें कि कानून, तकनीकी टूल्स और सहायता प्रणालियां आपकी सुरक्षा कैसे करती हैं। नीचे दिए गए किसी भी विकल्प पर क्लिक करके विस्तृत जानकारी देखें:'
            : 'Explore your options at your own pace with zero pressure. Learn how statutory laws, privacy hashing tools, and national support networks protect your dignity:'}
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-[#5A5672]">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F3] border border-[#E8E2DC]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0F6E56]" />
            <span>{isHindi ? 'कोई लॉगिन नहीं' : 'No sign-in required'}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F3] border border-[#E8E2DC]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0F6E56]" />
            <span>{isHindi ? 'शून्य डेटा स्टोरेज' : 'Zero data recorded'}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F3] border border-[#E8E2DC]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0F6E56]" />
            <span>{isHindi ? 'भारतीय कानून समर्थित' : 'Grounded in Indian Law'}</span>
          </span>
        </div>
      </div>

      {/* Grid of Options Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {optionCards.map((card) => {
          const IconComponent = card.icon;
          return (
            <div
              key={card.id}
              className="rounded-3xl bg-white border border-[#E8E2DC] p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-[#26215C]/30 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform ${card.iconBg}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${card.badgeColor}`}>
                    {card.badge[language]}
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-[#26215C] group-hover:text-[#993556] transition-colors leading-snug">
                  {card.title[language]}
                </h2>

                <p className="text-xs sm:text-sm text-[#5A5672] leading-relaxed">
                  {card.summary[language]}
                </p>
              </div>

              <div className="pt-5 mt-auto">
                <button
                  type="button"
                  onClick={() => {
                    hapticAction();
                    onNavigateToTab(card.targetTab, card.targetElementId);
                  }}
                  className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-full bg-[#FAF8F3] hover:bg-[#26215C] text-[#26215C] hover:text-white border border-[#E8E2DC] hover:border-[#26215C] text-xs font-bold transition-all cursor-pointer shadow-2xs group-hover:bg-[#26215C] group-hover:text-white"
                >
                  <span>{card.actionLabel[language]}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reassurance Banner at bottom */}
      <div className="rounded-2xl bg-[#E1F5EE]/40 border border-[#A2E2CD]/60 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#0F6E56] text-white flex items-center justify-center shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-[#0F6E56]">
              {isHindi ? 'आपकी सुरक्षा और गोपनीयता सर्वोपरि है' : 'Your Privacy & Safety are Absolute'}
            </h3>
            <p className="text-[11px] sm:text-xs text-[#5A5672]">
              {isHindi
                ? 'इन पेजों को पढ़ने से कोई डिजिटल रिकॉर्ड या सर्च हिस्ट्री हमारे सर्वर पर नहीं बनती।'
                : 'Browsing these options leaves zero trace on our servers. You remain anonymous at all times.'}
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
          {isHindi ? 'तुरंत सहायता की जरूरत है? →' : 'Need urgent help instead? →'}
        </button>
      </div>
    </div>
  );
};
