/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Play, 
  Pause, 
  RotateCcw, 
  PhoneCall, 
  ShieldCheck, 
  Sparkles,
  Maximize2,
  Minimize2,
  Lock
} from 'lucide-react';
import { Language } from '../types';
import { hapticAction } from '../utils/haptics';

interface SomaticGroundingToolProps {
  language: Language;
}

type BreathPhase = 'Inhale' | 'Hold' | 'Exhale';

/**
 * Trauma-Informed Somatic 4-7-8 Breathing & Grounding Pacer
 * 
 * DESIGN RATIONALE:
 * 1. Teal Palette (#0F6E56 / #E1F5EE): Cool, nature-adjacent soft teal activates parasympathetic
 *    nervous system signaling, directly counteracting adrenaline vasoconstriction and hyperventilation.
 * 2. Synchronized Slow Expansion (4s Inhale, 7s Hold, 8s Exhale):
 *    The 4-7-8 technique is clinically proven to lower heart rate and reduce panic tremors.
 *    The expanding rings pulse smoothly with zero abrupt easing.
 * 3. Spacious Sanctuary: Designed with generous breathing room (padding 32-48px) and an optional
 *    full-screen sanctuary mode for deep concentration in a private setting.
 * 4. Affirmation Rhythm: Cycles gentle, non-judgmental facts that dismantle self-blame.
 */
export const SomaticGroundingTool: React.FC<SomaticGroundingToolProps> = ({ language }) => {
  const isHindi = language === 'hi';
  const [isActive, setIsActive] = useState<boolean>(false);
  const [phase, setPhase] = useState<BreathPhase>('Inhale');
  const [countdown, setCountdown] = useState<number>(4);
  const [affirmationIndex, setAffirmationIndex] = useState<number>(0);
  const [isSpaciousMode, setIsSpaciousMode] = useState<boolean>(false);

  const affirmations = [
    {
      en: 'Take a gentle, unhurried breath. You are physically safe right now.',
      hi: 'गहरी और धीमी सांस लें। इस पल आप पूरी तरह सुरक्षित हैं।'
    },
    {
      en: 'You did nothing wrong. Digital extortion is a crime committed against you.',
      hi: 'आपकी कोई गलती नहीं है। डिजिटल ब्लैकमेलिंग एक आपराधिक कृत्य है जो आपके विरुद्ध किया गया है।'
    },
    {
      en: 'The blackmailer relies on sudden panic. As you breathe, you take back control.',
      hi: 'ब्लैकमेलर केवल आपके डर पर निर्भर है। जैसे-जैसे आप शांत होती हैं, नियंत्रण आपके हाथ आता है।'
    },
    {
      en: 'We will handle this methodically. One calm step at a time.',
      hi: 'हम इस परिस्थिति को नियमपूर्वक सुलझाएंगे। एक समय में एक शांत कदम।'
    }
  ];

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount > 1) {
          return prevCount - 1;
        }

        // Phase transitions
        if (phase === 'Inhale') {
          setPhase('Hold');
          return 7;
        } else if (phase === 'Hold') {
          setPhase('Exhale');
          return 8;
        } else {
          setPhase('Inhale');
          setAffirmationIndex((idx) => (idx + 1) % affirmations.length);
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase, affirmations.length]);

  const resetBreathing = () => {
    setIsActive(false);
    setPhase('Inhale');
    setCountdown(4);
  };

  const getPhaseTitle = () => {
    if (phase === 'Inhale') return isHindi ? 'धीमे से सांस अंदर लें' : 'Inhale gently';
    if (phase === 'Hold') return isHindi ? 'सांस को आराम से रोकें' : 'Hold your breath gently';
    return isHindi ? 'मुलायमियत से सांस बाहर छोड़ें' : 'Exhale slowly and let go';
  };

  const getPhaseSubtitle = () => {
    if (phase === 'Inhale') return isHindi ? '4 सेकंड: नाक से शांति से सांस भरें' : '4 seconds: Breathe in calmly through your nose';
    if (phase === 'Hold') return isHindi ? '7 सेकंड: कंधों को ढीला छोड़ें और स्थिर रहें' : '7 seconds: Soften your shoulders and stay still';
    return isHindi ? '8 सेकंड: मुंह से सारी चिंता बाहर निकालें' : '8 seconds: Release tension smoothly through your mouth';
  };

  return (
    <section 
      id="somatic-grounding-tool" 
      className={`space-y-6 scroll-mt-48 transition-all duration-500 ${
        isSpaciousMode ? 'fixed inset-0 z-50 bg-[#FAF8F3] p-4 sm:p-10 overflow-y-auto flex flex-col justify-between' : ''
      }`}
    >
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#26215C]/10 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#E1F5EE] text-[#0F6E56] flex items-center justify-center">
              <Heart className="w-4 h-4 text-[#0F6E56]" />
            </span>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#26215C] tracking-tight">
              {isHindi ? 'शांत मन व घबराहट निवारण (4-7-8 श्वास क्रिया)' : 'Somatic 4-7-8 Breathing & Panic Grounding'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5A5672] mt-1 font-normal">
            {isHindi
              ? 'अचानक मिली धमकी से दिल की धड़कन बढ़ना स्वाभाविक है। कानूनी कदम उठाने से पहले 2 मिनट अपने नर्वस सिस्टम को शांत करें।'
              : 'Blackmail triggers sudden fight-or-flight panic. Take 2 minutes to center your breathing before taking legal actions.'}
          </p>
        </div>

        {/* Spacious mode toggle button */}
        <button
          onClick={() => setIsSpaciousMode(!isSpaciousMode)}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-[#26215C] bg-white hover:bg-[#FAF8F3] border border-[#26215C]/12 transition-colors cursor-pointer min-h-[36px]"
          title={isSpaciousMode ? 'Exit full screen' : 'Expand to full screen sanctuary'}
        >
          {isSpaciousMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          <span>{isSpaciousMode ? (isHindi ? 'सामान्य दृश्य' : 'Exit Focus') : (isHindi ? 'पूर्ण स्क्रीन एकाग्रता' : 'Focus Sanctuary')}</span>
        </button>
      </div>

      {/* Main Grounding Card with Calming Soft Teal Aesthetic */}
      <div className="bg-white border border-[#26215C]/10 rounded-[24px] p-6 sm:p-12 shadow-soft flex flex-col items-center justify-center text-center space-y-8 relative overflow-hidden">
        {/* Soft background glow circles */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#E1F5EE]/40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#FBEAF0]/40 blur-3xl pointer-events-none" />

        {/* Animated Visual Breathing Pacer */}
        <div className="relative flex items-center justify-center p-6 sm:p-10">
          {/* Outer gentle wave aura */}
          <motion.div
            animate={{
              scale: isActive ? (phase === 'Inhale' ? 1.35 : phase === 'Hold' ? 1.35 : 1.0) : 1.0,
              opacity: isActive ? (phase === 'Hold' ? 0.45 : 0.25) : 0.15,
            }}
            transition={{
              duration: phase === 'Inhale' ? 4 : phase === 'Hold' ? 0.5 : 8,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-[#0F6E56] pointer-events-none"
          />

          {/* Primary Breath Sphere */}
          <motion.div
            animate={{
              scale: isActive ? (phase === 'Inhale' ? 1.18 : phase === 'Hold' ? 1.18 : 0.95) : 1,
              backgroundColor: phase === 'Inhale' ? '#E1F5EE' : phase === 'Hold' ? '#D5EFE7' : '#FAF8F3',
              borderColor: phase === 'Inhale' ? '#0F6E56' : phase === 'Hold' ? '#26215C' : '#B7E4D7',
            }}
            transition={{
              duration: phase === 'Inhale' ? 4 : phase === 'Hold' ? 0.35 : 8,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="w-44 h-44 sm:w-56 sm:h-56 rounded-full border-2 border-[#0F6E56]/40 flex flex-col items-center justify-center shadow-soft relative z-10"
          >
            <span className="text-3xl sm:text-5xl font-semibold font-mono text-[#26215C]">
              {countdown}s
            </span>
            <span className="text-xs sm:text-sm font-medium text-[#0F6E56] uppercase tracking-wider mt-1">
              {phase === 'Inhale' ? (isHindi ? 'अंदर लें' : 'Inhale') : phase === 'Hold' ? (isHindi ? 'रोकें' : 'Hold') : (isHindi ? 'छोड़ें' : 'Exhale')}
            </span>
          </motion.div>
        </div>

        {/* Phase instruction label */}
        <div className="space-y-2 max-w-md relative z-10">
          <h3 className="text-lg sm:text-xl font-semibold text-[#26215C] tracking-tight">
            {getPhaseTitle()}
          </h3>
          <p className="text-xs sm:text-sm text-[#5A5672] font-normal">
            {getPhaseSubtitle()}
          </p>
          <div className="pt-2">
            <p className="text-xs sm:text-sm text-[#0F6E56] leading-relaxed italic bg-[#E1F5EE]/60 px-4 py-2 rounded-full border border-[#B7E4D7]/50 inline-block">
              "{affirmations[affirmationIndex][language]}"
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 relative z-10 pt-2">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              hapticAction();
              setIsActive(!isActive);
            }}
            className={`inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-medium transition-all shadow-soft cursor-pointer min-h-[44px] ${
              isActive
                ? 'bg-[#26215C] text-white hover:bg-[#1E1949]'
                : 'bg-[#0F6E56] text-white hover:bg-[#0A4E3D]'
            }`}
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isActive ? (isHindi ? 'अभ्यास रोकें' : 'Pause Exercise') : (isHindi ? '4-7-8 श्वास क्रिया शुरू करें' : 'Start 4-7-8 Breathing')}</span>
          </motion.button>

          <button
            onClick={resetBreathing}
            className="p-3 bg-white hover:bg-[#FAF8F3] text-[#5A5672] border border-[#26215C]/12 rounded-full transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            title="Reset timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Confidential Psychological Helplines */}
      <div className="bg-[#FAF8F3] border border-[#26215C]/10 rounded-[24px] p-5 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-[#0F6E56] font-medium text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#0F6E56]" />
            <span>{isHindi ? 'गोपनीय मनोवैज्ञानिक व मानसिक स्वास्थ्य सहायता' : 'Confidential Trauma Support Helplines (24/7)'}</span>
          </div>
          <span className="text-[11px] font-medium text-[#0F6E56] bg-[#E1F5EE] px-3 py-1 rounded-full border border-[#B7E4D7]">
            {isHindi ? '100% निःशुल्क व गुप्त' : 'Free & 100% Anonymous'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* NIMHANS Tele-MANAS */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#26215C]/8 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-wider text-[#5A5672]">Government of India</span>
            <h4 className="font-semibold text-[#26215C] text-sm">Tele-MANAS (NIMHANS)</h4>
            <div className="text-lg sm:text-xl font-semibold font-mono text-[#26215C]">14416 / 1800-891-4416</div>
            <p className="text-xs text-[#5A5672]">
              {isHindi ? '24 घंटे बहुभाषी मनोवैज्ञानिक परामर्श।' : '24/7 toll-free psychiatric first-aid in 20+ Indian languages.'}
            </p>
            <a
              href="tel:14416"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0F6E56] hover:underline pt-1 min-h-[36px]"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{isHindi ? 'कॉल करें 14416' : 'Call 14416'}</span>
            </a>
          </div>

          {/* KIRAN Helpline */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#26215C]/8 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-wider text-[#5A5672]">Ministry of Social Justice</span>
            <h4 className="font-semibold text-[#26215C] text-sm">KIRAN Helpline</h4>
            <div className="text-lg sm:text-xl font-semibold font-mono text-[#26215C]">1800-599-0019</div>
            <p className="text-xs text-[#5A5672]">
              {isHindi ? 'तनाव, चिंता और संकट निवारण परामर्श।' : 'Specialized psychological support and distress management.'}
            </p>
            <a
              href="tel:18005990019"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0F6E56] hover:underline pt-1 min-h-[36px]"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{isHindi ? 'कॉल करें 1800-599-0019' : 'Call 1800-599-0019'}</span>
            </a>
          </div>

          {/* Vandrevala Foundation */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#26215C]/8 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-wider text-[#5A5672]">NGO Counselor Network</span>
            <h4 className="font-semibold text-[#26215C] text-sm">Vandrevala Foundation</h4>
            <div className="text-lg sm:text-xl font-semibold font-mono text-[#26215C]">9999 666 555</div>
            <p className="text-xs text-[#5A5672]">
              {isHindi ? 'व्हाट्सएप चैट व फोन पर निःशुल्क थेरेपी सहायता।' : 'Free 24/7 crisis intervention via phone and WhatsApp.'}
            </p>
            <a
              href="tel:9999666555"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0F6E56] hover:underline pt-1 min-h-[36px]"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{isHindi ? 'कॉल करें 9999 666 555' : 'Call 9999 666 555'}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
