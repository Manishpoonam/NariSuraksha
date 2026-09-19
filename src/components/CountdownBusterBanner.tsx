import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  AlertOctagon, 
  Copy, 
  Check, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  MessageSquare,
  Ban,
  ChevronDown,
  ChevronUp,
  VolumeX,
  Lock
} from 'lucide-react';
import { Language } from '../types';
import { hapticAction, hapticPanic, hapticSuccess } from '../utils/haptics';
import { EXTORTION_RESPONSE_SCRIPTS } from '../data/extortionResponseScripts';

interface CountdownBusterBannerProps {
  language: Language;
  onNavigateToTab: (tab: string, elementId?: string) => void;
  onOpenSOS: () => void;
}

export const CountdownBusterBanner: React.FC<CountdownBusterBannerProps> = ({
  language,
  onNavigateToTab,
  onOpenSOS
}) => {
  const isHindi = language === 'hi';
  const [copiedScript, setCopiedScript] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // Canonical statutory notice citing actual official reporting (BNS 308, IT Act 66E/67A)
  const freezeScript = isHindi
    ? EXTORTION_RESPONSE_SCRIPTS.phase2Freeze.text.hi
    : EXTORTION_RESPONSE_SCRIPTS.phase2Freeze.text.en;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(freezeScript);
    hapticSuccess();
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 3000);
  };

  return (
    <div 
      id="countdown-buster-banner"
      className="relative overflow-hidden rounded-3xl bg-[#18181B] text-white border-2 border-rose-600/80 shadow-xl"
    >
      {/* Top Warning Strip */}
      <div className="bg-rose-600 px-4 sm:px-6 py-2.5 flex items-center justify-between text-white text-xs sm:text-sm font-bold tracking-wide">
        <div className="flex items-center gap-2">
          <AlertOctagon className="w-4 h-4 shrink-0 animate-pulse" />
          <span>{isHindi ? '15 मिनट की फर्जी डेडलाइन का सच' : 'Understanding the 15-Minute Countdown Pressure'}</span>
        </div>
        <div className="flex items-center gap-1.5 font-bold text-[11px] bg-black/30 px-2.5 py-0.5 rounded-full border border-white/20">
          <VolumeX className="w-3 h-3 text-emerald-400" />
          <span>{isHindi ? 'ध्वनि रहित • 100% मूक' : '100% Silent Portal'}</span>
        </div>
      </div>

      <div className="p-5 sm:p-7 space-y-6">
        {/* Core De-Escalation Reality Check */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold tracking-wide border border-rose-500/40">
            <Clock className="w-3.5 h-3.5 text-rose-400" />
            <span>{isHindi ? 'वह समय को लेकर ब्लफ (झूठ) बोल रहा है' : 'Artificial Countdown Bluff'}</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-snug tracking-tight">
            {isHindi 
              ? 'रुकें। 1 रुपया भी न दें। अपराधी नकली 15 मिनट की डेडलाइन केवल इसलिए देता है ताकि आपका दिमाग सोचने न पाए।'
              : 'Pause. You have the legal right to withhold payment. Blackmailers create artificial 15-minute deadlines to force an adrenaline-driven decision.'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-rose-400 font-extrabold text-sm">
                <Ban className="w-4 h-4 shrink-0" />
                <span>{isHindi ? 'पैसे देने पर क्या होता है?' : 'What happens if you pay?'}</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {isHindi 
                  ? '98% मामलों में अगर आप ₹500 या ₹5,000 देती हैं, तो 24 घंटे के अंदर वह ₹50,000 मांगेगा। पैसे देने से वह कभी फोटो डिलीट नहीं करता।'
                  : 'In 98% of cases, paying ₹1,000 guarantees demands for ₹50,000 tomorrow. Extortionists do not delete photos after payment.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{isHindi ? 'असली सच क्या है?' : 'The unvarnished truth:'}</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {isHindi 
                  ? 'जैसे ही वह फोटो लीक करेगा, उसकी 100% ताकत खत्म हो जाएगी और उसे 1 रुपया भी नहीं मिलेगा। वह सिर्फ आपको डराकर पैसे ऐंठना चाहता है।'
                  : 'The moment he leaks the media, he loses 100% of his leverage and gets zero money. His only power is your fear.'}
              </p>
            </div>
          </div>
        </div>

        {/* 1-Tap "Freeze & Buy 24 Hours" Legal Copy Script */}
        <div className="rounded-2xl bg-black/60 border border-white/15 p-4 sm:p-5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold text-amber-400 block">
                {isHindi ? 'ब्लैकमेलर को ठंडा करने का कानूनी संदेश' : 'Statutory Legal Freeze Notice'}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white">
                {isHindi ? 'यह संदेश कॉपी करके उसे भेजें और चैट म्यूट कर दें:' : 'Copy this, paste it in his chat, and mute him:'}
              </h3>
            </div>
            
            <button
              id="copy-freeze-script-button"
              onClick={handleCopyScript}
              className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-black text-xs sm:text-sm transition-all cursor-pointer shadow-lg active:scale-95 min-h-[48px] ${
                copiedScript 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-white text-black hover:bg-gray-200'
              }`}
            >
              {copiedScript ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>{isHindi ? 'कॉपी हो गया! सीधे व्हाट्सऐप में पेस्ट करें' : 'Copied! Paste directly in chat'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{isHindi ? '1-क्लिक में संदेश कॉपी करें' : 'Copy Freeze Script (1-Click)'}</span>
                </>
              )}
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 font-mono text-xs sm:text-sm text-gray-200 leading-relaxed select-all whitespace-pre-line">
            {freezeScript}
          </div>

          <div className="flex items-center gap-2 text-xs text-amber-300/90 font-medium">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              {isHindi
                ? 'यह संदेश भेजने के बाद उसकी किसी भी कॉल या धमकी का जवाब न दें। वह जांच रहा है कि आप डरती हैं या नहीं।'
                : 'After sending this, do not reply to follow-ups. Turn off read receipts and do not pick up phone calls.'}
            </span>
          </div>
        </div>

        {/* Why this works toggle */}
        <div>
          <button
            onClick={() => {
              hapticAction();
              setShowExplanation(!showExplanation);
            }}
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-white transition-colors cursor-pointer py-1"
          >
            <span>{isHindi ? 'यह स्क्रिप्ट समय कैसे दिलाती है? (मनोवैज्ञानिक सच)' : 'Why this script buys critical time (The Psychology)'}</span>
            {showExplanation ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 space-y-2 leading-relaxed"
              >
                <p>
                  <strong>1. Blackmailers are cowardly opportunists:</strong> Most extortionists run bulk operations from anonymous SIM cards. They prey specifically on trembling, weeping victims who beg. When a victim replies with cold, precise statutory sections (IT Act 67A, non-bailable FIR), they realize the risk of jail is real and back off to find an easier target.
                </p>
                <p>
                  <strong>2. Circulating photos creates massive physical footprint:</strong> Sending explicit material to groups or third parties instantly upgrades the charge under IT Act 67A (up to 5 years prison) and enables telecom police to demand IP and subscriber records.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
