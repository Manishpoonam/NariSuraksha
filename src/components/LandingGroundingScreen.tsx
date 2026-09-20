/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  HelpCircle, 
  EyeOff, 
  Globe, 
  PhoneCall, 
  Lock, 
  ArrowRight,
  Heart,
  Sparkles,
  Smartphone
} from 'lucide-react';
import { Language } from '../types';
import { hapticAction, hapticCamouflage, hapticSOS } from '../utils/haptics';
import { LEGAL_DISCLAIMER } from '../data/legalDisclaimer';

interface LandingGroundingScreenProps {
  language: Language;
  onToggleLanguage: () => void;
  onChooseUrgentHelp: () => void;
  onChooseUnderstandOptions: () => void;
  onTriggerCamouflage: () => void;
  onOpenBreathing: () => void;
  onOpenDeviceSafety: () => void;
  onOpenFullDisclaimer?: () => void;
}

/**
 * Trauma-Informed Landing & Grounding Entry Screen
 * 
 * DESIGN RATIONALE:
 * 1. Emotional Triage First: When victims arrive, they are in a state of acute adrenaline shock.
 *    Dumping them into a dense 4-door grid or clinical legal form immediately elevates panic.
 *    Instead, this full-bleed calm screen provides emotional safety and two simple, high-agency paths.
 * 2. Visual Warmth: Uses deep indigo-plum (#26215C) and warm cream (#FAF8F3), replacing cold
 *    government blue (#003087) and stark white which resemble police/court summons.
 * 3. Constant Privacy Affirmation: Reassures the user that zero data leaves their device before they touch anything.
 * 4. Quiet Stealth: Quick Exit (ESC) is immediately accessible in the corner without looking like a bomb shelter alarm.
 */
export const LandingGroundingScreen: React.FC<LandingGroundingScreenProps> = ({
  language,
  onToggleLanguage,
  onChooseUrgentHelp,
  onChooseUnderstandOptions,
  onTriggerCamouflage,
  onOpenBreathing,
  onOpenDeviceSafety,
  onOpenFullDisclaimer,
}) => {
  const isHindi = language === 'hi';

  const handleDisclaimerClick = () => {
    if (onOpenFullDisclaimer) {
      onOpenFullDisclaimer();
    } else {
      onChooseUnderstandOptions();
      setTimeout(() => {
        const el = document.getElementById('about-trust-section');
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1A1829] flex flex-col justify-between selection:bg-[#993556] selection:text-white relative overflow-hidden">
      {/* Educational & Independent Resource Banner */}
      <aside aria-label="Disclaimer" className="w-full bg-[#1E1A48] text-amber-200 text-xs px-3 sm:px-4 py-1.5 border-b border-amber-300/20 text-center flex items-center justify-center z-20">
        <span className="text-amber-100/90 text-[11px] leading-tight max-w-2xl mx-auto font-medium">
          {isHindi 
            ? 'स्वतंत्र डिजिटल सुरक्षा पोर्टल • कोई लॉगिन नहीं • कोई डेटा सेव नहीं, कभी नहीं।'
            : 'Independent Digital Safety Portal • No Login • No Data Stored, Ever.'}
        </span>
      </aside>

      {/* 1. DISCREET TOP UTILITY STRIP */}
      <header className="w-full px-4 sm:px-8 py-3.5 sm:py-5 flex items-center justify-between z-20 border-b border-[#26215C]/5">
        {/* Brand identity: Quiet, dignified, non-institutional */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#26215C] text-[#FAF8F3] flex items-center justify-center shadow-xs">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#E1F5EE]" />
          </div>
          <div>
            <span className="text-base sm:text-lg font-semibold tracking-tight text-[#26215C]">
              NariSuraksha
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs text-[#5A5672] font-normal">
              {isHindi ? '• सुरक्षित डिजिटल सहायता' : '• Confidential Digital Safety'}
            </span>
          </div>
        </div>

        {/* Right utility controls: Calm Quick Exit + Segmented Two-State Language Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Exit: Discrete, clear, non-alarming red accent */}
          <button
            onClick={() => {
              hapticCamouflage(true);
              onTriggerCamouflage();
            }}
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs font-medium text-[#FAF8F3] bg-[#26215C] hover:bg-[#1E1949] transition-all cursor-pointer shadow-xs min-h-[44px] active:scale-97 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#F3C5D6] focus-visible:outline-none"
            title={isHindi ? 'तुरंत स्क्रीन छिपाएं (ESC)' : 'Leave page immediately (ESC key)'}
            aria-label={isHindi ? 'तुरंत स्क्रीन छिपाएं (ESC)' : 'Leave page immediately (ESC key)'}
          >
            <EyeOff className="w-4 h-4 text-[#F3C5D6] shrink-0" />
            <span className="font-semibold">{isHindi ? 'स्क्रीन छिपाएं' : 'Quick Exit'}</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 bg-white/15 text-[10px] rounded font-mono" aria-hidden="true">ESC</kbd>
          </button>

          {/* Explicit Two-State Segmented Language Toggle */}
          <div 
            className="inline-flex items-center p-0.5 rounded-full bg-black/5 sm:bg-[#26215C]/5 border border-[#26215C]/12 text-xs font-medium"
            role="group"
            aria-label={isHindi ? 'भाषा का चयन' : 'Language selection'}
          >
            <button
              type="button"
              onClick={() => {
                if (isHindi) onToggleLanguage();
              }}
              className={`px-3 py-2 rounded-full transition-all cursor-pointer min-h-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#26215C] focus-visible:outline-none ${
                !isHindi
                  ? 'bg-[#26215C] text-white font-semibold shadow-xs'
                  : 'text-[#5A5672] hover:text-[#26215C]'
              }`}
              aria-pressed={!isHindi}
              aria-label="Switch language to English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => {
                if (!isHindi) onToggleLanguage();
              }}
              className={`px-3 py-2 rounded-full transition-all cursor-pointer min-h-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#26215C] focus-visible:outline-none ${
                isHindi
                  ? 'bg-[#26215C] text-white font-semibold shadow-xs'
                  : 'text-[#5A5672] hover:text-[#26215C]'
              }`}
              aria-pressed={isHindi}
              aria-label="भाषा बदलकर हिन्दी करें"
            >
              हिन्दी
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN GROUNDING SANCTUARY HERO */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-16 flex flex-col items-center justify-center text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="space-y-6 sm:space-y-8 w-full"
        >
          {/* Gentle Protective Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E1F5EE] border border-[#B7E4D7] text-[#0F6E56] text-xs sm:text-sm font-medium">
            <Lock className="w-3.5 h-3.5 text-[#0F6E56]" />
            <span>
              {isHindi
                ? '100% आपके फोन पर सुरक्षित • कोई डेटा सर्वर पर नहीं जाता'
                : '100% on your device • Nothing you view or type ever leaves your browser'}
            </span>
          </div>

          {/* Calming Warm Headline — Sentence Case, No Intimidating Aggression */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-semibold text-[#26215C] tracking-tight leading-[1.25]">
              {isHindi
                ? 'आप सुरक्षित हैं। एक गहरी सांस लें।'
                : 'You are safe here. Take a gentle breath.'}
            </h1>
            <p className="text-base sm:text-lg text-[#5A5672] max-w-2xl mx-auto leading-relaxed font-normal">
              {isHindi
                ? 'यदि कोई आपको धमकी दे रहा है, आपकी निजी फोटो या वीडियो साझा कर रहा है, या आपकी नकली तस्वीर का उपयोग कर रहा है — तो आपके पास विकल्प हैं।'
                : 'If someone is threatening you, sharing a private photo or video, or using a fake image of you — you have options.'}
            </p>
          </div>

          {/* TWO PRIMARY HIGH-AGENCY CHOICES (Large, Warm, Uncluttered — Exactly Two Real Choices) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2 text-left max-w-2xl mx-auto w-full">
            {/* CHOICE 1: ACTIVE EMERGENCY / NEED HELP RIGHT NOW */}
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={() => {
                hapticSOS();
                onChooseUrgentHelp();
              }}
              className="p-6 sm:p-7 rounded-[22px] bg-[#26215C] text-[#FAF8F3] hover:bg-[#1E1949] transition-all cursor-pointer shadow-soft border border-[#26215C] flex flex-col justify-between group min-h-[170px] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#F3C5D6] focus-visible:outline-none"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#F3C5D6] group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full bg-[#993556] text-[#FAF8F3]">
                  {isHindi ? 'तुरंत सहायता' : 'Action steps'}
                </span>
              </div>

              <div className="mt-4">
                <h2 className="text-lg sm:text-xl font-semibold text-white tracking-tight flex items-center gap-1.5">
                  <span>{isHindi ? 'मुझे अभी तुरंत मदद चाहिए →' : 'I need help right now →'}</span>
                </h2>
                <p className="text-xs sm:text-sm text-[#D2CCE7] mt-1.5 font-normal leading-normal">
                  {isHindi
                    ? 'अपने सबूत सुरक्षित करें और अगला सुरक्षित कदम उठाएं।'
                    : 'Secure your evidence and take the next safe step.'}
                </p>
              </div>
            </motion.button>

            {/* CHOICE 2: UNDERSTAND RIGHTS & OPTIONS FIRST */}
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={() => {
                hapticAction();
                onChooseUnderstandOptions();
              }}
              className="p-6 sm:p-7 rounded-[22px] bg-white text-[#26215C] hover:bg-[#FAF8F3] transition-all cursor-pointer shadow-soft border border-[#26215C]/12 flex flex-col justify-between group min-h-[170px] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#26215C] focus-visible:outline-none"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#E1F5EE] flex items-center justify-center text-[#0F6E56] group-hover:scale-105 transition-transform">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full bg-[#E1F5EE] text-[#0F6E56]">
                  {isHindi ? 'शांति से समझें' : 'Take your time'}
                </span>
              </div>

              <div className="mt-4">
                <h2 className="text-lg sm:text-xl font-semibold text-[#26215C] tracking-tight flex items-center gap-1.5">
                  <span>{isHindi ? 'अपने विकल्प समझें →' : 'Understand my options →'}</span>
                </h2>
                <p className="text-xs sm:text-sm text-[#5A5672] mt-1.5 font-normal leading-normal">
                  {isHindi
                    ? 'जानें कि आप क्या कर सकती हैं, रिपोर्ट कैसे करें, और सहायता कहां से प्राप्त करें।'
                    : 'Learn what you can do, how to report it, and where to get support.'}
                </p>
              </div>
            </motion.button>
          </div>

          {/* Quick Somatic Calming Bridge & Device Integrity Check */}
          <div className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 pt-2">
            <button
              type="button"
              onClick={onOpenBreathing}
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#0F6E56] hover:text-[#0A4E3D] font-medium transition-colors cursor-pointer py-2 px-3.5 rounded-full hover:bg-[#E1F5EE]/60 min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#0F6E56] focus-visible:outline-none text-center"
            >
              <Heart className="w-4 h-4 text-[#0F6E56] shrink-0" />
              <span>
                {isHindi
                  ? 'घबराहट महसूस हो रही है? 2 मिनट की शांत श्वास क्रिया शुरू करें'
                  : 'Feeling overwhelmed? Try the gentle 2-minute breathing pacer'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                hapticAction();
                onOpenDeviceSafety();
              }}
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#5A5672] hover:text-[#26215C] font-medium transition-colors cursor-pointer py-2 px-3.5 rounded-full hover:bg-black/5 min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#26215C] focus-visible:outline-none text-center"
            >
              <Smartphone className="w-4 h-4 text-[#5A5672] shrink-0" />
              <span>
                {isHindi
                  ? 'क्या कोई और इस फोन या ब्राउज़र की निगरानी कर रहा है?'
                  : 'Could someone else be monitoring this phone or browser?'}
              </span>
            </button>
          </div>
        </motion.div>
      </main>

      {/* 3. REASSURING MINIMAL FOOTER WITH AFFILIATION DISCLAIMER */}
      <footer className="w-full px-4 sm:px-8 py-4 sm:py-6 border-t border-[#26215C]/5 text-center text-xs text-[#85819C] z-10 max-w-4xl mx-auto space-y-3 pb-20 sm:pb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0F6E56]" />
            <span>
              {isHindi ? 'राष्ट्रीय साइबर हेल्पलाइन: 1930' : 'National Cyber Helpline: 1930'}
            </span>
            <span className="text-[#26215C]/20">•</span>
            <span>
              {isHindi ? 'पुलिस आपातकाल: 112' : 'Police Emergency: 112'}
            </span>
          </div>

          <div className="text-[11px] text-[#5A5672] font-medium">
            {isHindi
              ? 'भारतीय कानून के तहत सुरक्षित।'
              : 'Protected under Indian law.'}
          </div>
        </div>

        {/* Canonical Short Legal & Non-Affiliation Disclaimer Line */}
        <p className="text-[11px] sm:text-xs text-[#5A5672] leading-relaxed max-w-3xl mx-auto border-t border-[#26215C]/5 pt-2.5">
          <span>{LEGAL_DISCLAIMER.short[language]} — </span>
          <button
            type="button"
            onClick={handleDisclaimerClick}
            className="text-[#26215C] hover:underline font-semibold cursor-pointer underline-offset-2 inline-flex items-center gap-0.5 focus-visible:ring-2 focus-visible:ring-[#26215C] focus-visible:outline-none rounded"
          >
            <span>{LEGAL_DISCLAIMER.linkText[language]}</span>
          </button>
        </p>
      </footer>

      {/* 4. PERSISTENT CRISIS HELPLINE FLOATING ACTION */}
      <aside aria-label="Emergency Helpline Quick Action" className="fixed bottom-4 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-6 sm:bottom-6 z-30">
        <a
          href="tel:1930"
          onClick={() => hapticSOS()}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#DC2626] hover:bg-[#B91C1C] text-white font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl active:scale-95 transition-all cursor-pointer border border-white/20 whitespace-nowrap min-h-[44px] min-w-[44px] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-600 focus-visible:outline-none"
          title={isHindi ? 'राष्ट्रीय साइबर अपराध हेल्पलाइन 1930 पर तुरंत कॉल करें' : 'Call National Cyber Helpline 1930'}
          aria-label={isHindi ? 'राष्ट्रीय साइबर अपराध हेल्पलाइन 1930 पर तुरंत कॉल करें' : 'Call National Cyber Helpline 1930'}
        >
          <PhoneCall className="w-4 h-4 text-white shrink-0" />
          <span>{isHindi ? '1930 पर कॉल करें' : 'Call 1930'}</span>
        </a>
      </aside>
    </div>
  );
};
