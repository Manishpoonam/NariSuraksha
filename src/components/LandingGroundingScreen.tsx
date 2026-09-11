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
  Sparkles
} from 'lucide-react';
import { Language } from '../types';
import { hapticAction, hapticCamouflage, hapticSOS } from '../utils/haptics';

interface LandingGroundingScreenProps {
  language: Language;
  onToggleLanguage: () => void;
  onChooseUrgentHelp: () => void;
  onChooseUnderstandOptions: () => void;
  onTriggerCamouflage: () => void;
  onOpenBreathing: () => void;
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
}) => {
  const isHindi = language === 'hi';

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1A1829] flex flex-col justify-between selection:bg-[#993556] selection:text-white relative overflow-hidden">
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

        {/* Right utility controls: Calm Quick Exit + Language Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Exit: Discrete, clear, non-alarming red accent */}
          <button
            onClick={() => {
              hapticCamouflage(true);
              onTriggerCamouflage();
            }}
            className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium text-[#FAF8F3] bg-[#26215C] hover:bg-[#1E1949] transition-all cursor-pointer shadow-xs min-h-[38px] active:scale-97"
            title={isHindi ? 'तुरंत स्क्रीन छिपाएं (ESC)' : 'Leave page immediately (ESC key)'}
          >
            <EyeOff className="w-3.5 h-3.5 text-[#F3C5D6]" />
            <span className="font-semibold">{isHindi ? 'स्क्रीन छिपाएं' : 'Quick Exit'}</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.2 bg-white/15 text-[10px] rounded font-mono">ESC</kbd>
          </button>

          {/* Bilingual Switcher */}
          <button
            onClick={onToggleLanguage}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#26215C] bg-[#FAF8F3] hover:bg-white border border-[#26215C]/12 transition-colors cursor-pointer min-h-[38px]"
            title="Switch Language / भाषा बदलें"
          >
            <Globe className="w-3.5 h-3.5 text-[#993556]" />
            <span>{isHindi ? 'English' : 'हिन्दी'}</span>
          </button>
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
                ? 'चाहे ब्लैकमेल हो, प्राइवेट फोटो लीक की धमकी, या डीपफेक—कानून पूरी तरह आपके साथ है। अपनी गति से चुनें कि आप कैसे आगे बढ़ना चाहती हैं।'
                : 'Whether you are facing extortion, photo leak threats, or deepfake harassment—the law protects you, and you are in control. Choose how you would like to begin.'}
            </p>
          </div>

          {/* TWO PRIMARY HIGH-AGENCY CHOICES (Large, Warm, Uncluttered) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-3 text-left max-w-2xl mx-auto w-full">
            {/* CHOICE 1: ACTIVE EMERGENCY / NEED HELP RIGHT NOW */}
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={() => {
                hapticAction();
                onChooseUrgentHelp();
              }}
              className="p-6 sm:p-7 rounded-[22px] bg-[#26215C] text-[#FAF8F3] hover:bg-[#1E1949] transition-all cursor-pointer shadow-soft border border-[#26215C] flex flex-col justify-between group min-h-[170px]"
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
                  <span>{isHindi ? 'मुझे अभी तुरंत मदद चाहिए' : 'I need help right now'}</span>
                  <ArrowRight className="w-4 h-4 text-[#F3C5D6] group-hover:translate-x-1 transition-transform" />
                </h2>
                <p className="text-xs sm:text-sm text-[#D2CCE7] mt-1.5 font-normal leading-normal">
                  {isHindi
                    ? 'उलटी गिनती रोके, सबूत सुरक्षित करें और ब्लैकमेलर को फ्रीज करने का संदेश भेजें।'
                    : 'Stop the countdown, preserve critical evidence, and freeze the extortionist.'}
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
              className="p-6 sm:p-7 rounded-[22px] bg-white text-[#26215C] hover:bg-[#FAF8F3] transition-all cursor-pointer shadow-soft border border-[#26215C]/12 flex flex-col justify-between group min-h-[170px]"
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
                  <span>{isHindi ? 'पहले अपने अधिकार समझना चाहती हूँ' : 'I want to understand my options'}</span>
                  <ArrowRight className="w-4 h-4 text-[#993556] group-hover:translate-x-1 transition-transform" />
                </h2>
                <p className="text-xs sm:text-sm text-[#5A5672] mt-1.5 font-normal leading-normal">
                  {isHindi
                    ? 'बिना किसी डर के जानिए: कानून क्या कहता है, पहचान कैसे गुप्त रहती है और क्या विकल्प हैं।'
                    : 'Explore your legal rights, anonymous complaint protections, and StopNCII quietly.'}
                </p>
              </div>
            </motion.button>
          </div>

          {/* Quick Somatic Calming Bridge */}
          <div className="pt-2">
            <button
              onClick={onOpenBreathing}
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#0F6E56] hover:text-[#0A4E3D] font-medium transition-colors cursor-pointer py-1 px-3 rounded-full hover:bg-[#E1F5EE]/60"
            >
              <Heart className="w-4 h-4 text-[#0F6E56]" />
              <span>
                {isHindi
                  ? 'घबराहट महसूस हो रही है? 2 मिनट की शांत श्वास क्रिया शुरू करें'
                  : 'Feeling overwhelmed? Try the gentle 2-minute breathing pacer'}
              </span>
            </button>
          </div>
        </motion.div>
      </main>

      {/* 3. REASSURING MINIMAL FOOTER */}
      <footer className="w-full px-4 sm:px-8 py-4 sm:py-5 border-t border-[#26215C]/5 text-center text-xs text-[#85819C] z-10 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-4xl mx-auto">
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

        <div className="text-[11px] text-[#5A5672]">
          {isHindi
            ? 'भारतीय कानून (IT Act 66E, 67A व BNS 73) के तहत पीड़ित संरक्षण'
            : 'Protected under Indian Law (IT Act 66E, 67A & BNS Sec 73)'}
        </div>
      </footer>
    </div>
  );
};
