/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Printer, 
  Trash2, 
  PhoneCall, 
  Scale, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Lock,
  Building2,
  ArrowRight,
  Smartphone
} from 'lucide-react';
import { Language, IncidentCategory } from '../types';
import { hapticAction } from '../utils/haptics';
import { ZeroShameLegalShield } from './ZeroShameLegalShield';
import { GirlsRescueGuide } from './GirlsRescueGuide';
import { StateCyberDirectoryInline } from './StateCyberDirectoryInline';
import { RecommendedSituationCard } from './RecommendedSituationCard';
import { CrisisScenarioKey } from './EmergencyCockpit';

interface RescueFooterSupportProps {
  language: Language;
  onNavigateToTab: (tab: string, elementId?: string) => void;
  onOpenPrintCard: () => void;
  onOpenPurgeModal: () => void;
  onOpenDeviceSafety?: () => void;
  onSelectCategoryForDraft?: (category: IncidentCategory) => void;
  onOpenSOS?: () => void;
  showPlatformGuides?: boolean;
  onTogglePlatformGuides?: () => void;
  rescueSituation?: CrisisScenarioKey | string;
  draftCategory?: IncidentCategory;
}

/**
 * Post-Rescue Support & Emergency Directory Hub
 * 
 * Provides a clean, balanced dual-zone layout:
 * 1. 24/7 Crisis Helplines & State Cyber Directory Quick Access
 * 2. Offline Discretion & Zero-Trace Utilities (Print Card, Purge Footprint)
 * Followed by two collapsible deep-reference drawers (Statutory Rights & Platform Playbooks).
 * Fully responsive across Mobile (<640px), Tablet (640-1024px), and Desktop.
 */
export const RescueFooterSupport: React.FC<RescueFooterSupportProps> = ({
  language,
  onNavigateToTab,
  onOpenPrintCard,
  onOpenPurgeModal,
  onOpenDeviceSafety,
  onSelectCategoryForDraft,
  onOpenSOS,
  showPlatformGuides: externalShowPlatformGuides,
  onTogglePlatformGuides: externalTogglePlatformGuides,
  rescueSituation = 'countdown',
  draftCategory,
}) => {
  const isHindi = language === 'hi';

  const [showLegalRights, setShowLegalRights] = useState<boolean>(false);
  const [internalShowPlatformGuides, setInternalShowPlatformGuides] = useState<boolean>(false);
  const [showStateCyberDirectory, setShowStateCyberDirectory] = useState<boolean>(false);
  const [confirmingPurge, setConfirmingPurge] = useState<boolean>(false);
  const purgeTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    return () => {
      if (purgeTimerRef.current) clearTimeout(purgeTimerRef.current);
    };
  }, []);

  const handlePurgeClick = () => {
    hapticAction();
    if (confirmingPurge) {
      if (purgeTimerRef.current) clearTimeout(purgeTimerRef.current);
      setConfirmingPurge(false);
      onOpenPurgeModal();
    } else {
      setConfirmingPurge(true);
      if (purgeTimerRef.current) clearTimeout(purgeTimerRef.current);
      purgeTimerRef.current = setTimeout(() => {
        setConfirmingPurge(false);
      }, 3000);
    }
  };

  const isPlatformGuidesOpen = externalShowPlatformGuides !== undefined 
    ? externalShowPlatformGuides 
    : internalShowPlatformGuides;

  const toggleStateCyberDirectory = () => {
    hapticAction();
    setShowStateCyberDirectory((prev) => !prev);
  };

  const toggleLegalRights = () => {
    hapticAction();
    setShowLegalRights((prev) => !prev);
  };

  const togglePlatformGuides = () => {
    hapticAction();
    if (externalTogglePlatformGuides) {
      externalTogglePlatformGuides();
    } else {
      setInternalShowPlatformGuides((prev) => !prev);
    }
  };

  const handleBrowseStateServices = (targetState?: string) => {
    hapticAction();
    setShowStateCyberDirectory(true);
    setTimeout(() => {
      const el = document.getElementById('inline-state-directory-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  return (
    <div className="space-y-4 sm:space-y-5 pt-4">
      {/* SECTION TITLE & CONTEXT */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0F6E56]" />
            <h2 className="text-base sm:text-lg font-bold text-[#1A1A1A]">
              {isHindi ? 'संकट पश्चात सहायता व आपातकालीन निर्देशिका' : 'Post-Rescue Support & Emergency Directories'}
            </h2>
          </div>
          <p className="text-xs text-[#666]">
            {isHindi
              ? 'सत्यापित राष्ट्रीय हेल्पलाइन, साइबर सेल संपर्क, कानूनी अधिकार और ऑफलाइन प्राइवेसी टूल्स।'
              : 'Verified national helplines, official cyber cells, statutory legal rights, and offline privacy tools.'}
          </p>
        </div>
      </div>

      {/* 1. RECOMMENDED FOR YOUR SITUATION (HIGH PRIORITY: COMBINES CRISIS SCENARIO + LOCATION) */}
      <RecommendedSituationCard
        language={language}
        selectedScenario={rescueSituation}
        selectedCategory={draftCategory}
        onNavigateToTab={onNavigateToTab}
        onBrowseStateServices={handleBrowseStateServices}
      />

      {/* BALANCED 2-COLUMN GRID (MOBILE: 1 COLUMN, TABLET & DESKTOP: 2 EQUAL COLUMNS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-stretch">
        
        {/* CARD 1: 24/7 VERIFIED CRISIS HELPLINES & POLICE DIRECTORY */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E8E2DC] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#D8CFCE] transition-colors">
          <div className="space-y-3">
            {/* Card Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0F6E56]/10 text-[#0F6E56] flex items-center justify-center shrink-0">
                  <PhoneCall className="w-4 h-4 text-[#0F6E56]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1A1A1A]">
                    {isHindi ? '24/7 आपातकालीन हेल्पलाइन' : '24/7 Verified Emergency Helplines'}
                  </h3>
                  <p className="text-[11px] text-[#666]">
                    {isHindi ? 'टोल-फ्री, 100% गोपनीय व आधिकारिक' : 'Toll-free, confidential & government verified'}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                {isHindi ? '24 घंटे सक्रिय' : 'Active 24x7'}
              </span>
            </div>

            {/* Purpose-Grouped Helpline Directory (Physical danger, Cyber financial, Women's support, Child support, Mental health) */}
            <div className="space-y-3 pt-1">
              {/* Group 1: Immediate Physical & Police Protection */}
              <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-200/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800">
                    {isHindi ? '1. शारीरिक सुरक्षा व पुलिस आपातकाल' : '1. Physical Danger & Emergency Police'}
                  </span>
                  <span className="text-[10px] font-mono text-rose-700">24x7</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href="tel:112"
                    className="p-2.5 rounded-lg bg-white border border-rose-200 hover:border-rose-400 transition-all flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-sm text-rose-700">112</span>
                        <span className="text-[9px] font-semibold bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded">ERSS</span>
                      </div>
                      <p className="text-[10px] text-[#666]">{isHindi ? 'राष्ट्रीय आपातकालीन सेवा (PCR)' : 'All-India Police Emergency'}</p>
                    </div>
                    <PhoneCall className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  </a>

                  <a
                    href="tel:1091"
                    className="p-2.5 rounded-lg bg-white border border-rose-200 hover:border-rose-400 transition-all flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-sm text-[#26215C]">1091</span>
                        <span className="text-[9px] font-semibold bg-[#E8E6F3] text-[#26215C] px-1.5 py-0.5 rounded">Police</span>
                      </div>
                      <p className="text-[10px] text-[#666]">{isHindi ? 'महिला पुलिस हेल्पलाइन' : 'Women Police Cell'}</p>
                    </div>
                    <PhoneCall className="w-3.5 h-3.5 text-[#26215C] shrink-0" />
                  </a>
                </div>
              </div>

              {/* Group 2: Cyber Financial & Online Extortion */}
              <div className="p-3 rounded-xl bg-teal-50/50 border border-teal-200/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F6E56]">
                    {isHindi ? '2. साइबर वित्तीय व जबरन वसूली' : '2. Cyber Financial & Online Extortion'}
                  </span>
                  <span className="text-[10px] font-mono text-[#0F6E56]">MHA I4C</span>
                </div>
                <a
                  href="tel:1930"
                  className="p-2.5 rounded-lg bg-white border border-teal-200 hover:border-teal-400 transition-all flex items-center justify-between gap-2"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-sm text-[#0F6E56]">1930</span>
                      <span className="text-[9px] font-semibold bg-[#0F6E56]/15 text-[#0F6E56] px-1.5 py-0.5 rounded">Govt of India</span>
                    </div>
                    <p className="text-[10px] text-[#666]">
                      {isHindi ? 'साइबर वित्तीय धोखाधड़ी व ब्लैकमेल रिपोर्टिंग' : 'National Cyber Crime Reporting Helpline & State Dispatch'}
                    </p>
                  </div>
                  <PhoneCall className="w-3.5 h-3.5 text-[#0F6E56] shrink-0" />
                </a>
              </div>

              {/* Group 3: Women's Safety, Legal & Violence Support */}
              <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-200/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#26215C]">
                    {isHindi ? '3. महिला सुरक्षा व कानूनी अधिकार' : "3. Women's Support & Legal Aid"}
                  </span>
                  <span className="text-[10px] font-mono text-purple-800">NCW & NALSA</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href="tel:14490"
                    className="p-2.5 rounded-lg bg-white border border-purple-200 hover:border-purple-400 transition-all flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-xs text-[#26215C]">14490</span>
                        <span className="text-[9px] font-semibold bg-[#E1F5EE] text-[#0F6E56] px-1.5 py-0.5 rounded">NCW</span>
                      </div>
                      <p className="text-[10px] text-[#666]">{isHindi ? 'NCW 24×7 (कॉल / व्हाट्सएप)' : 'NCW 24x7 Helpline'}</p>
                    </div>
                    <PhoneCall className="w-3.5 h-3.5 text-[#26215C] shrink-0" />
                  </a>

                  <a
                    href="tel:15100"
                    className="p-2.5 rounded-lg bg-white border border-purple-200 hover:border-purple-400 transition-all flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-xs text-[#26215C]">15100</span>
                        <span className="text-[9px] font-semibold bg-purple-100 text-purple-900 px-1.5 py-0.5 rounded">NALSA</span>
                      </div>
                      <p className="text-[10px] text-[#666]">{isHindi ? 'मुफ्त सरकारी वकील (Sec 12)' : 'Free Legal Aid for Women'}</p>
                    </div>
                    <PhoneCall className="w-3.5 h-3.5 text-[#26215C] shrink-0" />
                  </a>
                </div>
              </div>

              {/* Group 4: Child & Minor Protection (POCSO) & Mental Health */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-amber-900">{isHindi ? 'नाबालिग / POCSO' : 'Minors / Under 18'}</span>
                    <span className="text-[9px] font-mono text-amber-800">1098</span>
                  </div>
                  <a
                    href="tel:1098"
                    className="p-2 rounded-lg bg-white border border-amber-200 flex items-center justify-between gap-1.5"
                  >
                    <span className="font-mono font-bold text-xs text-amber-950">CHILDLINE 1098</span>
                    <PhoneCall className="w-3 h-3 text-amber-800 shrink-0" />
                  </a>
                </div>

                <div className="p-2.5 rounded-xl bg-teal-50/60 border border-teal-200/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-teal-900">{isHindi ? 'मानसिक स्वास्थ्य' : 'Mental Health'}</span>
                    <span className="text-[9px] font-mono text-teal-800">14416</span>
                  </div>
                  <a
                    href="tel:14416"
                    className="p-2 rounded-lg bg-white border border-teal-200 flex items-center justify-between gap-1.5"
                  >
                    <span className="font-mono font-bold text-xs text-[#0F6E56]">Tele-MANAS 14416</span>
                    <PhoneCall className="w-3 h-3 text-[#0F6E56] shrink-0" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Directory Navigation Buttons */}
          <div id="inline-state-directory-section" className="pt-2 border-t border-[#F0EBE6] flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <button
              type="button"
              onClick={toggleStateCyberDirectory}
              aria-expanded={showStateCyberDirectory}
              className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer active:scale-98 min-h-[40px] ${
                showStateCyberDirectory
                  ? 'bg-[#0F6E56] text-white border-[#0F6E56] shadow-2xs'
                  : 'bg-[#FAF8F3] hover:bg-[#F3EFEA] text-[#1A1A1A] border-[#E8E2DC]'
              }`}
            >
              <Building2 className={`w-3.5 h-3.5 shrink-0 ${showStateCyberDirectory ? 'text-white' : 'text-[#0F6E56]'}`} />
              <span className="truncate">
                {showStateCyberDirectory 
                  ? (isHindi ? 'सुरक्षा निर्देशिका छिपाएं' : 'Hide State & UT Directory')
                  : (isHindi ? 'राज्य व UT सुरक्षा डायरेक्टरी (36)' : 'State & UT Safety & Support (36)')}
              </span>
              {showStateCyberDirectory ? (
                <ChevronUp className="w-3.5 h-3.5 ml-auto sm:ml-0 text-white/80 shrink-0" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 ml-auto sm:ml-0 text-[#888] shrink-0" />
              )}
            </button>

            <button
              type="button"
              onClick={() => onNavigateToTab('helplines', 'helpline-directory')}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#FAF8F3] hover:bg-[#F3EFEA] text-[#1A1A1A] border border-[#E8E2DC] text-xs font-semibold transition-colors cursor-pointer active:scale-98 min-h-[40px]"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#26215C]" />
              <span>{isHindi ? 'पूरी हेल्पलाइन सूची' : 'Full Helpline Guide'}</span>
              <ArrowRight className="w-3 h-3 text-[#888] ml-auto sm:ml-0" />
            </button>
          </div>

          {/* Expandable Inline State & UT Cyber Directory */}
          <AnimatePresence>
            {showStateCyberDirectory && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <StateCyberDirectoryInline 
                  language={language}
                  onNavigateToFullDirectory={() => onNavigateToTab('state_cells', 'state-cyber-directory')}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CARD 2: OFFLINE DISCRETION & ZERO-TRACE UTILITIES */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E8E2DC] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#D8CFCE] transition-colors">
          <div className="space-y-3">
            {/* Card Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#26215C]/10 text-[#26215C] flex items-center justify-center shrink-0">
                  <Lock className="w-4 h-4 text-[#26215C]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1A1A1A]">
                    {isHindi ? 'ऑफलाइन सुरक्षा व प्राइवेसी टूल्स' : 'Offline Privacy & Safety Utilities'}
                  </h3>
                  <p className="text-[11px] text-[#666]">
                    {isHindi ? 'बिना इंटरनेट के बैकअप रखें या इस फोन से सर्च रिकॉर्ड मिटाएं' : 'Zero-trace offline tools & instant session memory flush'}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E1F5EE] text-[#0F6E56] border border-[#A2E2CD] shrink-0">
                {isHindi ? 'लोकल केवल' : '100% On-Device'}
              </span>
            </div>

            {/* Utility 1: Print Wallet Emergency Card */}
            <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#E8E2DC] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#E8E2DC] flex items-center justify-center text-[#26215C] shrink-0">
                  <Printer className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-[#1A1A1A] truncate">
                    {isHindi ? 'इमरजेंसी पॉकेट कार्ड प्रिंट करें' : 'Print Pocket Emergency Card'}
                  </h4>
                  <p className="text-[10px] text-[#666] line-clamp-1">
                    {isHindi ? '1930 नंबर, 24 घंटे का नोटिस और कानूनी नियम वॉलेट साइज में' : 'Foldable wallet card with 1930, 24h IT notice & rights'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenPrintCard}
                className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-[#F3EFEA] text-[#26215C] border border-[#E8E2DC] font-semibold text-xs transition-colors cursor-pointer active:scale-97 min-h-[38px]"
              >
                <Printer className="w-3.5 h-3.5 text-[#26215C]" />
                <span className="whitespace-nowrap">{isHindi ? 'प्रिंट करें' : 'Print'}</span>
              </button>
            </div>

            {/* Utility 2: Purge Browser Traces & Footprint */}
            <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-200/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-white border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
                  <Trash2 className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-rose-950 truncate">
                    {isHindi ? 'इस डिवाइस से फुटप्रिंट तुरंत मिटाएं' : 'Purge All Footprints & Cache'}
                  </h4>
                  <p className="text-[10px] text-rose-800/80 line-clamp-1">
                    {isHindi ? 'ब्राउज़र हिस्ट्री सुझाव, इन-मेमोरी ड्राफ्ट और सेशन तुरंत साफ़ करें' : 'Instantly flush browser cache, in-memory drafts & session traces'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handlePurgeClick}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold text-xs transition-all cursor-pointer active:scale-97 shadow-2xs min-h-[38px] ${
                  confirmingPurge 
                    ? 'bg-amber-600 hover:bg-amber-700 text-white ring-2 ring-amber-400' 
                    : 'bg-rose-600 hover:bg-rose-700 text-white'
                }`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">
                  {confirmingPurge 
                    ? (isHindi ? 'पुष्टि हेतु पुनः दबाएं' : 'Tap again to confirm')
                    : (isHindi ? 'डेटा मिटाएं' : 'Purge')}
                </span>
              </button>
            </div>

            {/* Utility 3: Device Safety & Stalkerware Audit */}
            {onOpenDeviceSafety && (
              <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-white border border-amber-200 flex items-center justify-center text-amber-800 shrink-0">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-amber-950 truncate">
                      {isHindi ? 'डिवाइस सुरक्षा व जासूसी ऐप्स जांच' : 'Check Device Safety & Stalkerware'}
                    </h4>
                    <p className="text-[10px] text-amber-800/80 line-clamp-1">
                      {isHindi ? 'अकाउंट सिंक, हिडन एडमिन ऐप्स और हिस्ट्री हटाने का तरीका' : 'Audit linked Google/Apple accounts, admin apps & clear history'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onOpenDeviceSafety}
                  className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 font-semibold text-xs transition-colors cursor-pointer active:scale-97 min-h-[38px]"
                >
                  <Smartphone className="w-3.5 h-3.5 text-amber-800" />
                  <span className="whitespace-nowrap">{isHindi ? 'जांचें' : 'Audit'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Privacy Confirmation Strip */}
          <div className="pt-2 border-t border-[#F0EBE6] flex items-center justify-between text-[11px] text-[#666]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isHindi ? 'शून्य क्लाउड लॉग • पूरी तरह सुरक्षित' : 'Zero Cloud Logs • Client-Side Memory'}</span>
            </div>
            <span className="text-[10px] text-[#888] font-mono">100% Private</span>
          </div>
        </div>
      </div>

      {/* EXPANDABLE STATUTORY RIGHTS & PLATFORM RECOVERY DRAWERS */}
      <div className="space-y-3 pt-1">
        {/* DRAWER 1: STATUTORY LEGAL RIGHTS (ZERO SHAME) */}
        <div className="rounded-2xl bg-white border border-[#E8E2DC] shadow-xs overflow-hidden transition-colors">
          <button
            type="button"
            onClick={toggleLegalRights}
            className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-[#FAF8F3]/60 transition-colors"
            aria-expanded={showLegalRights}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-[#E1F5EE] text-[#0F6E56] flex items-center justify-center shrink-0">
                <Scale className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-bold text-[#1A1A1A]">
                    {isHindi ? 'आपके कानूनी अधिकार व सुरक्षा (IT Act एवं BNS)' : 'Your Legal Rights & Statutory Immunity (IT Act & BNS)'}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E1F5EE] text-[#0F6E56]">
                    {isHindi ? '100% गोपनीयता' : 'Statutory Privacy'}
                  </span>
                </div>
                <p className="text-xs text-[#666] line-clamp-1 sm:line-clamp-none">
                  {isHindi
                    ? 'क्या पुलिस घर फोन करेगी? क्या फोटो भेजने की सजा होगी? जानिए अपने वैधानिक अधिकार एवं BNSS 173 के तहत सुरक्षा।'
                    : 'Will police notify family? Am I liable? Statutory right to privacy and statement recording by female officers under BNSS 173.'}
                </p>
              </div>
            </div>

            <div className="shrink-0 p-1.5 rounded-full bg-black/5 text-[#555] ml-2">
              {showLegalRights ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          <AnimatePresence>
            {showLegalRights && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="border-t border-[#F0EBE6] p-4 sm:p-6 bg-[#FAF8F3]/40"
              >
                <ZeroShameLegalShield 
                  language={language} 
                  onNavigateToTab={onNavigateToTab}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* DRAWER 2: PLATFORM-SPECIFIC RECOVERY & PARENTAL SUPPORT */}
        <div className="rounded-2xl bg-white border border-[#E8E2DC] shadow-xs overflow-hidden transition-colors">
          <button
            type="button"
            onClick={togglePlatformGuides}
            className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-[#FAF8F3]/60 transition-colors"
            aria-expanded={isPlatformGuidesOpen}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-bold text-[#1A1A1A]">
                    {isHindi ? 'विस्तृत प्लेटफॉर्म समाधान व माता-पिता गाइड' : 'Detailed Platform Guides & Parental Support'}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                    {isHindi ? '6 परिदृश्य' : '6 Scenarios'}
                  </span>
                </div>
                <p className="text-xs text-[#666] line-clamp-1 sm:line-clamp-none">
                  {isHindi
                    ? 'टेलीग्राम लीक, इंस्टाग्राम फेक प्रोफाइल, AI डीपफेक व माता-पिता से बात करने के कदम।'
                    : 'Action checklists for Telegram channels, Instagram fake profiles, AI deepfakes, and talking to parents.'}
                </p>
              </div>
            </div>

            <div className="shrink-0 p-1.5 rounded-full bg-black/5 text-[#555] ml-2">
              {isPlatformGuidesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          <AnimatePresence>
            {isPlatformGuidesOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="border-t border-[#F0EBE6] p-4 sm:p-6 bg-[#FAF8F3]/40"
              >
                <GirlsRescueGuide
                  language={language}
                  onNavigateToTab={onNavigateToTab}
                  onSelectCategoryForDraft={onSelectCategoryForDraft}
                  onOpenSOS={onOpenSOS}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
