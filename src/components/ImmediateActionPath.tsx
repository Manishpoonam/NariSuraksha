/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  PhoneCall, 
  Ban, 
  Camera, 
  Copy, 
  Check, 
  EyeOff, 
  ArrowRight, 
  X, 
  AlertTriangle,
  Clock,
  ShieldCheck,
  MessageSquare,
  Info
} from 'lucide-react';
import { Language } from '../types';
import { hapticAction, hapticSOS, hapticCamouflage } from '../utils/haptics';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface ImmediateActionPathProps {
  language: Language;
  onClose: () => void;
  onTriggerCamouflage: () => void;
  onOpenFullApp: () => void;
}

/**
 * Ultra-Simplified "I Only Have 2 Minutes Right Now" Immediate Action Path
 * 
 * DESIGN RATIONALE:
 * When a victim has only minutes of privacy (e.g. bathroom break, perpetrator nearby),
 * deep legal frameworks, multi-tab architectures, and dense forms induce paralysis.
 * This view delivers ONLY the 3 non-negotiables:
 * 1. DO NOT PAY A SINGLE RUPEE (Extortion demands often increase after payment)
 * 2. PRESERVE EVIDENCE (Screenshots of threats, URLs, handles before deletion)
 * 3. CALL 1930 IMMEDIATELY (National Cyber Helpline with 1-tap dial)
 * Plus a 1-tap copy of the neutral delay script to buy 24 hours.
 */
export const ImmediateActionPath: React.FC<ImmediateActionPathProps> = ({
  language,
  onClose,
  onTriggerCamouflage,
  onOpenFullApp,
}) => {
  const isHindi = language === 'hi';
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(true, modalRef, '#close-immediate-path-btn');
  const [copiedDelayScript, setCopiedDelayScript] = useState(false);

  // CRITICAL: ESC keypress must ALWAYS trigger the full stealth disguise,
  // matching global app behavior. Never simply close the modal to reveal the landing screen.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        hapticCamouflage(true);
        onTriggerCamouflage();
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [onTriggerCamouflage]);

  const delayMessage = isHindi
    ? 'मैं बहुत घबराई हुई हूं और अपने खाते से पैसे जुटाने की कोशिश कर रही हूं। कृपया मुझे कल सुबह तक का समय दें। किसी से कुछ भी साझा न करें।'
    : 'I am terrified and currently trying to arrange the money from my account. Please give me until tomorrow morning. Do not share anything.';

  const handleCopyDelayScript = async () => {
    hapticAction();
    try {
      await navigator.clipboard.writeText(delayMessage);
      setCopiedDelayScript(true);
      setTimeout(() => setCopiedDelayScript(false), 3000);
    } catch {
      // Fallback if clipboard API unavailable
      setCopiedDelayScript(true);
      setTimeout(() => setCopiedDelayScript(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0C0A20]/95 backdrop-blur-xl sm:backdrop-blur-2xl overflow-y-auto p-3 sm:p-6 flex items-center justify-center selection:bg-[#993556] selection:text-white">
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
        className="w-full max-w-2xl bg-[#FAF8F3] text-[#1A1829] rounded-[28px] shadow-2xl border border-[#26215C]/15 overflow-hidden flex flex-col my-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="immediate-action-title"
        ref={modalRef}
      >
        {/* Top Emergency Action Header */}
        <header className="px-5 sm:px-7 py-4 bg-[#26215C] text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DC2626] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#DC2626]"></span>
            </span>
            <div>
              <h2 id="immediate-action-title" className="text-sm sm:text-base font-bold text-white tracking-tight">
                {isHindi ? '⚡ तुरंत सहायता: 3 सबसे जरूरी कदम' : '⚡ Immediate Action: 3 Critical Steps'}
              </h2>
              <p className="text-[11px] text-[#D2CCE7]">
                {isHindi ? 'घबराहट के समय किसी भी अन्य प्रक्रिया से पहले ये 3 बुनियादी नियम' : 'High-urgency protection — complete these essentials before anything else'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Exit */}
            <button
              type="button"
              onClick={() => {
                hapticCamouflage(true);
                onTriggerCamouflage();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer transition-all active:scale-95 min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#F3C5D6] focus-visible:outline-none"
              title={isHindi ? 'तुरंत स्क्रीन छिपाएं (ESC)' : 'Leave immediately (ESC)'}
              aria-label={isHindi ? 'तुरंत स्क्रीन छिपाएं (ESC)' : 'Leave immediately (ESC)'}
            >
              <EyeOff className="w-4 h-4 text-[#F3C5D6] shrink-0" />
              <span className="hidden sm:inline">{isHindi ? 'स्क्रीन छिपाएं' : 'Quick Exit'}</span>
              <kbd className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono" aria-hidden="true">ESC</kbd>
            </button>

            {/* Close Modal */}
            <button
              id="close-immediate-path-btn"
              type="button"
              onClick={() => {
                hapticAction();
                onClose();
              }}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-white/10 text-[#D2CCE7] hover:text-white transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              aria-label={isHindi ? 'संवाद बंद करें' : 'Close immediate action modal'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content Body: Exactly the 3 Critical Guidance Points */}
        <div className="p-5 sm:p-7 space-y-4">
          <p className="text-xs sm:text-sm text-[#5A5672] leading-relaxed">
            {isHindi
              ? 'यदि आपके पास केवल कुछ ही मिनट हैं, तो किसी भी उलझन या जटिल फॉर्म को छोड़ दें। शांति से केवल ये 3 बुनियादी नियम याद रखें:'
              : 'If you only have a few minutes of privacy, disregard full legal paperwork for now. Remember only these three core rules:'}
          </p>

          {/* STEP 1: DO NOT PAY */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#DC2626]/30 shadow-xs space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#FBEAF0] text-[#DC2626] flex items-center justify-center shrink-0">
                <Ban className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#DC2626]">
                  {isHindi ? 'नियम 1 (सर्वोच्च प्राथमिकता)' : 'Rule 1 (Top Priority)'}
                </span>
                <h3 className="text-base font-bold text-[#1A1829] leading-tight">
                  {isHindi ? 'पैसे बिल्कुल न दें — एक रुपया भी नहीं' : 'Do NOT Pay — Not a Single Rupee'}
                </h3>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#5A5672] leading-relaxed pl-10.5">
              {isHindi
                ? 'ब्लैकमेलर डर का फायदा उठाते हैं। पैसे देने से फोटो कभी डिलीट नहीं होती—बल्कि वे समझ जाते हैं कि धमकी काम कर रही है और अक्सर मांगें और बढ़ जाती हैं। पैसे देना तुरंत बंद करें।'
                : 'Extortionists feed on panic. Paying never deletes your media—it proves the threat works, and demands often increase. Cut off payment completely.'}
            </p>
          </div>

          {/* STEP 2: PRESERVE EVIDENCE (SCREENSHOTS) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#26215C]/12 shadow-xs space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <Camera className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                  {isHindi ? 'नियम 2' : 'Rule 2'}
                </span>
                <h3 className="text-base font-bold text-[#1A1829] leading-tight">
                  {isHindi ? 'तुरंत स्क्रीनशॉट लें (सबूत सुरक्षित करें)' : 'Take Screenshots Now (Preserve Evidence)'}
                </h3>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#5A5672] leading-relaxed pl-10.5">
              {isHindi
                ? 'चैट डिलीट न करें! ब्लैकमेलर के मैसेज, प्रोफाइल लिंक, फोन नंबर और UPI आईडी के स्क्रीनशॉट लें, इससे पहले कि वह उन्हें अनसेंड या डिलीट कर दे। यह सबूत आपकी सबसे बड़ी कानूनी ढाल है।'
                : 'Do not delete the chat! Take screenshots of all threat messages, profile handles, phone numbers, and UPI IDs before they un-send or delete. This evidence is your legal shield.'}
            </p>
          </div>

          {/* STEP 3: CALL 1930 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#0F6E56]/40 shadow-xs space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#E1F5EE] text-[#0F6E56] flex items-center justify-center shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F6E56]">
                    {isHindi ? 'नियम 3' : 'Rule 3'}
                  </span>
                  <h3 className="text-base font-bold text-[#1A1829] leading-tight">
                    {isHindi ? 'राष्ट्रीय साइबर हेल्पलाइन 1930 पर कॉल करें' : 'Call 1930 (National Cyber Helpline)'}
                  </h3>
                </div>
              </div>

              <a
                href="tel:1930"
                onClick={() => hapticSOS()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{isHindi ? '1930 डायल करें' : 'Call 1930'}</span>
              </a>
            </div>
            <p className="text-xs sm:text-sm text-[#5A5672] leading-relaxed pl-10.5">
              {isHindi
                ? 'गृह मंत्रालय की यह 24/7 निःशुल्क हेल्पलाइन है। अधिकारी तुरंत वित्तीय लेन-देन रोकने और कानूनी कार्रवाई में बिना किसी शुल्क के मदद करते हैं।'
                : 'Government 24/7 toll-free helpline operated by Ministry of Home Affairs. Officers assist immediately with platform takedowns and freezing fraudulent transfers.'}
            </p>
          </div>

          {/* DELAY SCRIPT: 1-TAP COPY TO BUY 24 HOURS */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <MessageSquare className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{isHindi ? 'समय हासिल करने वाला संदेश (1-टैप कॉपी)' : 'Neutral Delay Message (1-Tap Copy)'}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyDelayScript}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 text-xs font-bold cursor-pointer transition-all active:scale-95 shadow-2xs"
              >
                {copiedDelayScript ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">{isHindi ? 'कॉपी हो गया!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-800" />
                    <span>{isHindi ? 'मैसेज कॉपी करें' : 'Copy Message'}</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-amber-950 font-mono bg-white/80 p-2.5 rounded-xl border border-amber-200/60 select-all leading-relaxed">
              "{delayMessage}"
            </p>
            <p className="text-[11px] text-amber-800/90">
              {isHindi
                ? 'यह संदेश ब्लैकमेलर को उकसाए बिना शांत रखता है और आपको हेल्पलाइन पर कॉल करने का 24 घंटे का समय देता है।'
                : 'Send this to buy 24 hours without provoking the extortionist, giving you calm time to consult 1930.'}
            </p>

            {/* Known vs. Anonymous Caveat */}
            <div className="flex items-start gap-2 pt-2 border-t border-amber-200/60 text-[11px] text-amber-900/90 leading-relaxed">
              <Info className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
              <span>
                {isHindi
                  ? 'सुझाव: यह संदेश अज्ञात ऑनलाइन ब्लैकमेलरों के लिए सबसे प्रभावी है। यदि आरोपी कोई परिचित या पूर्व-साथी है, तो संदेश भेजने के बजाय पहले 1930 पर चुपचाप रिपोर्ट करना अधिक सुरक्षित हो सकता है।'
                  : 'Note: This stalling line is best for anonymous extortionists. If the perpetrator is someone you know personally (e.g. an acquaintance or ex-partner), consider reporting quietly via 1930 first without engaging.'}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <footer className="px-5 sm:px-7 py-4 bg-[#F5F1EB] border-t border-[#26215C]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#5A5672] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0F6E56]" />
            <span>{isHindi ? '100% गोपनीय • कोई डेटा सेव नहीं हुआ।' : '100% confidential • Zero data recorded.'}</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                hapticAction();
                onClose();
              }}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full bg-white hover:bg-neutral-100 text-[#26215C] text-xs font-bold border border-[#26215C]/15 transition-all cursor-pointer text-center min-h-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#26215C] focus-visible:outline-none"
            >
              {isHindi ? 'वापस जाएं' : 'Back'}
            </button>

            <button
              type="button"
              onClick={() => {
                hapticAction();
                onOpenFullApp();
              }}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full bg-[#26215C] hover:bg-[#1E1949] text-white text-xs font-bold transition-all shadow-sm cursor-pointer inline-flex items-center justify-center gap-1.5 text-center min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#F3C5D6] focus-visible:outline-none"
            >
              <span>{isHindi ? 'पूरा क्राइसिस कॉकपिट' : 'Full Crisis Cockpit'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F3C5D6]" />
            </button>
          </div>
        </footer>
      </motion.div>
    </div>
  );
};
