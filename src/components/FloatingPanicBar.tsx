import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EyeOff, PhoneCall, X, AlertTriangle, Heart, ShieldAlert } from 'lucide-react';
import { Language } from '../types';
import { CrisisScenarioKey } from './EmergencyCockpit';
import { hapticCamouflage, hapticSOS, hapticPanic, hapticAction } from '../utils/haptics';

interface FloatingPanicBarProps {
  language: Language;
  onTriggerCamouflage: () => void;
  onTriggerSOS?: () => void;
  rescueSituation?: CrisisScenarioKey | string;
}

export const FloatingPanicBar: React.FC<FloatingPanicBarProps> = ({
  language,
  onTriggerCamouflage,
  onTriggerSOS,
  rescueSituation = 'countdown',
}) => {
  const isHindi = language === 'hi';
  const isPhysicalDanger = rescueSituation === 'danger_stalking';
  const isPaidMoney = rescueSituation === 'paid';
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isScreenActive, setIsScreenActive] = useState<boolean>(() => {
    if (typeof document !== 'undefined') {
      return !document.hidden;
    }
    return true;
  });

  // Track if screen is actively visible to drive subtle grounding visual rhythm
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsScreenActive(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', () => setIsScreenActive(true));
    window.addEventListener('blur', () => setIsScreenActive(!document.hidden));

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', () => setIsScreenActive(true));
      window.removeEventListener('blur', () => setIsScreenActive(!document.hidden));
    };
  }, []);

  return (
    <div className="fixed bottom-[calc(68px+env(safe-area-inset-bottom,0px))] sm:bottom-4 right-2 sm:right-4 z-50 pointer-events-none">
      <AnimatePresence mode="wait">
        {isMinimized ? (
          <motion.aside
            key="minimized-pill"
            aria-label="Quick Emergency SOS"
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 12 }}
            transition={{ type: 'spring', stiffness: 450, damping: 30 }}
            className="pointer-events-auto relative"
          >
            {/* Grounding biofeedback aura around minimized pill: Calming 3.8s rhythm */}
            {isScreenActive && (
              <motion.div
                aria-hidden="true"
                className="absolute -inset-1 rounded-full pointer-events-none -z-10"
                animate={{
                  opacity: [0.35, 0.8, 0.35],
                  scale: [0.97, 1.06, 0.97],
                }}
                transition={{
                  duration: 3.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(220, 38, 38, 0.45) 0%, rgba(245, 158, 11, 0.2) 60%, transparent 80%)',
                  filter: 'blur(6px)',
                }}
              />
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                hapticPanic();
                setIsMinimized(false);
              }}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-full shadow-2xl text-xs font-extrabold tracking-wide border border-white/20 cursor-pointer min-h-[44px]"
              title={isHindi ? 'आपातकालीन मेन्यू खोलें' : 'Open Emergency & Quick Exit Bar'}
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <AlertTriangle className="w-4 h-4 text-amber-200 shrink-0" />
              </motion.div>
              <span>{isHindi ? 'SOS सहायता' : 'SOS / Emergency'}</span>
            </motion.button>
          </motion.aside>
        ) : (
          <motion.aside
            key="expanded-bar"
            aria-label="Floating Emergency Actions"
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              boxShadow: isScreenActive
                ? [
                    '0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                    '0 14px 32px -4px rgba(0, 0, 0, 0.75), 0 0 18px 2px rgba(244, 63, 94, 0.32), 0 0 0 1px rgba(244, 63, 94, 0.45)',
                    '0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                  ]
                : '0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{
              boxShadow: {
                duration: 3.8,
                repeat: Infinity,
                ease: 'easeInOut',
              },
              type: 'spring',
              stiffness: 400,
              damping: 32,
            }}
            className="pointer-events-auto relative flex items-center gap-1 sm:gap-1.5 bg-[#1C1C1C]/95 backdrop-blur-md text-white p-1 sm:p-1.5 pl-2 rounded-full shadow-2xl border border-[#444]/80 text-xs max-w-[calc(100vw-1rem)] overflow-x-auto scrollbar-none"
          >
            {/* Grounding biofeedback rhythm aura: Slow, calming 3.8s inhale-exhale visual rhythm */}
            {isScreenActive && (
              <motion.div
                aria-hidden="true"
                className="absolute -inset-1 rounded-full pointer-events-none -z-10"
                animate={{
                  opacity: [0.25, 0.65, 0.25],
                  scale: [0.99, 1.016, 0.99],
                }}
                transition={{
                  duration: 3.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(225, 29, 72, 0.25) 0%, rgba(217, 119, 6, 0.14) 50%, transparent 80%)',
                  filter: 'blur(7px)',
                }}
              />
            )}

            {/* Visual grounding anchor dot: Calming 3.8s breathing pulse */}
            <div 
              className="hidden sm:flex items-center pl-1 pr-0.5" 
              title={isHindi ? 'धीमी सांस लें • स्थिर रहें (3.8s लय)' : 'Slow breathing rhythm (3.8s grounding pulse)'}
            >
              <span className="relative flex h-2 w-2">
                <motion.span 
                  animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"
                />
                <motion.span 
                  animate={{ scale: [0.9, 1.2, 0.9] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"
                />
              </span>
            </div>

            {/* 1. QUICK EXIT: Neutral & distinct styling with responsive tactile feel */}
            <motion.button
              id="floating-panic-quick-exit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.94 }}
              transition={{ duration: 0.12 }}
              onClick={() => {
                hapticCamouflage(true);
                onTriggerCamouflage();
              }}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-2 bg-[#333333] hover:bg-[#444444] text-[#FAF9F6] font-bold rounded-full cursor-pointer shrink-0 border border-[#555] min-h-[40px] shadow-xs"
              title={isHindi ? 'स्क्रीन तुरंत छिपाएं (ESC)' : 'Leave this page quickly (ESC)'}
            >
              <EyeOff className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="text-[11px] sm:text-xs whitespace-nowrap font-semibold">
                {isHindi ? 'एग्जिट' : 'EXIT'}
              </span>
            </motion.button>

            {/* 2. SOS GPS alert button: High emergency contrast with reassuring subtle pulse */}
            {onTriggerSOS && (
              <motion.button
                id="floating-sos-alert"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.94 }}
                transition={{ duration: 0.12 }}
                onClick={() => {
                  hapticSOS();
                  onTriggerSOS();
                }}
                className="flex items-center gap-1 sm:gap-1.5 px-3 sm:px-3.5 py-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-extrabold rounded-full shrink-0 cursor-pointer shadow-xs min-h-[40px] border border-white/10"
                title="Send Discreet SOS with GPS Location"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-200 shrink-0" />
                </motion.div>
                <span className="text-[11px] sm:text-xs whitespace-nowrap tracking-wide">
                  {isHindi ? 'SOS' : 'SOS'}
                </span>
              </motion.button>
            )}

            {/* 4. Adaptive Speed Dial: Highlights 112 for physical danger, 1930 for cyber fraud/extortion */}
            {isPhysicalDanger ? (
              <motion.a
                id="floating-call-112"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                transition={{ duration: 0.12 }}
                href="tel:112"
                onClick={() => hapticAction()}
                className="flex items-center gap-1.5 px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-full shrink-0 min-h-[40px] shadow-sm ring-2 ring-rose-400/50"
                title="Direct dial 112 Police Emergency (Physical Danger)"
              >
                <PhoneCall className="w-3.5 h-3.5 text-white shrink-0 animate-pulse" />
                <span className="font-mono text-[11px] sm:text-xs">112</span>
                <span className="text-[10px] font-medium hidden sm:inline">{isHindi ? 'पुलिस' : 'Police'}</span>
              </motion.a>
            ) : (
              <motion.a
                id="floating-call-1930"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.94 }}
                transition={{ duration: 0.12 }}
                href="tel:1930"
                onClick={() => hapticAction()}
                className={`flex items-center gap-1 px-2.5 sm:px-3 py-2 font-bold rounded-full shrink-0 min-h-[40px] transition-colors ${
                  isPaidMoney
                    ? 'bg-[#0F6E56] hover:bg-[#0B5441] text-white ring-2 ring-emerald-400/40 shadow-xs'
                    : 'bg-white/10 hover:bg-white/20 text-[#FAF9F6]'
                }`}
                title="Direct dial 1930 Cyber Extortion Helpline"
              >
                <PhoneCall className={`w-3.5 h-3.5 shrink-0 ${isPaidMoney ? 'text-white' : 'text-[#E25822]'}`} />
                <span className="font-mono text-[11px] sm:text-xs">1930</span>
                {isPaidMoney && (
                  <span className="text-[10px] font-medium hidden sm:inline">{isHindi ? 'फ्रीज' : 'Freeze'}</span>
                )}
              </motion.a>
            )}

            {/* Minimize button */}
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMinimized(true)}
              className="w-8 h-8 rounded-full hover:bg-white/20 text-[#AAA] hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-0.5"
              title="Minimize"
              aria-label="Minimize emergency bar"
            >
              <X className="w-3.5 h-3.5" />
            </motion.button>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};
