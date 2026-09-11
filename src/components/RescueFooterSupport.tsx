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
  HeartHandshake
} from 'lucide-react';
import { Language, IncidentCategory } from '../types';
import { hapticAction } from '../utils/haptics';
import { ZeroShameLegalShield } from './ZeroShameLegalShield';
import { GirlsRescueGuide } from './GirlsRescueGuide';

interface RescueFooterSupportProps {
  language: Language;
  onNavigateToTab: (tab: string, elementId?: string) => void;
  onOpenPrintCard: () => void;
  onOpenPurgeModal: () => void;
  onSelectCategoryForDraft?: (category: IncidentCategory) => void;
  onOpenSOS?: () => void;
  showPlatformGuides?: boolean;
  onTogglePlatformGuides?: () => void;
}

/**
 * Simplified Post-Rescue Support & Reference Hub
 * 
 * Replaces the previously chaotic and complex stack of overlapping banners,
 * duplicate evidence checklists, and Pinterest feeds with a calm, streamlined
 * dual-zone experience:
 * 1. Compact Offline Safety Bar (Print Emergency Card + Purge Footprint + Quick Helplines)
 * 2. Two Clean, Collapsible Reference Drawers (Legal Rights & Platform Deep Guides)
 */
export const RescueFooterSupport: React.FC<RescueFooterSupportProps> = ({
  language,
  onNavigateToTab,
  onOpenPrintCard,
  onOpenPurgeModal,
  onSelectCategoryForDraft,
  onOpenSOS,
  showPlatformGuides: externalShowPlatformGuides,
  onTogglePlatformGuides: externalTogglePlatformGuides,
}) => {
  const isHindi = language === 'hi';

  const [showLegalRights, setShowLegalRights] = useState<boolean>(false);
  const [internalShowPlatformGuides, setInternalShowPlatformGuides] = useState<boolean>(false);

  const isPlatformGuidesOpen = externalShowPlatformGuides !== undefined 
    ? externalShowPlatformGuides 
    : internalShowPlatformGuides;

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

  return (
    <div className="space-y-4 pt-2">
      {/* 1. COMPACT OFFLINE SAFETY & PRIVACY TOOLBAR */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E8E2DC] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#26215C]/5 text-[#26215C] flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5 text-[#26215C]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#1A1A1A]">
              {isHindi ? 'ऑफलाइन सुरक्षा व डेटा प्राइवेसी टूल्स' : 'Offline Safety & Privacy Utilities'}
            </h3>
            <p className="text-xs text-[#666]">
              {isHindi
                ? 'बिना इंटरनेट के लिए वॉलेट कार्ड प्रिंट करें या इस डिवाइस से सर्च हिस्ट्री तुरंत मिटाएं।'
                : 'Print a physical emergency card for offline access or purge all browser footprints.'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenPrintCard}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FAF8F3] hover:bg-[#F3EFEC] text-[#26215C] border border-[#E8E2DC] font-semibold text-xs transition-colors cursor-pointer active:scale-97"
          >
            <Printer className="w-3.5 h-3.5 text-[#26215C]" />
            <span>{isHindi ? 'इमरजेंसी कार्ड प्रिंट करें' : 'Print Wallet Card'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenPurgeModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 font-semibold text-xs transition-colors cursor-pointer active:scale-97"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-600" />
            <span>{isHindi ? 'डेटा तुरंत मिटाएं' : 'Purge Footprint'}</span>
          </button>
        </div>
      </div>

      {/* 2. COLLAPSIBLE LEGAL RIGHTS (ZERO SHAME) ACCORDION */}
      <div className="rounded-2xl bg-white border border-[#E8E2DC] shadow-xs overflow-hidden transition-colors">
        <button
          type="button"
          onClick={toggleLegalRights}
          className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-[#FAF8F3]/60 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#1A1A1A]">
                  {isHindi ? 'आपके कानूनी अधिकार व सुरक्षा (IT Act एवं BNS)' : 'Your Legal Rights & Immunity (IT Act & BNS)'}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 hidden sm:inline-block">
                  {isHindi ? '100% गोपनीयता' : 'Statutory Privacy'}
                </span>
              </div>
              <p className="text-xs text-[#666]">
                {isHindi
                  ? 'क्या पुलिस घर फोन करेगी? क्या फोटो भेजने की सजा होगी? अपने 3 कानूनी अधिकार जानें।'
                  : 'Will police notify family? Am I liable? Statements by female officers under BNSS 173.'}
              </p>
            </div>
          </div>

          <div className="shrink-0 p-1.5 rounded-full bg-black/5 text-[#555]">
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
              <ZeroShameLegalShield language={language} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. COLLAPSIBLE PLATFORM GUIDES (TELEGRAM, INSTAGRAM, PARENTS) ACCORDION */}
      <div className="rounded-2xl bg-white border border-[#E8E2DC] shadow-xs overflow-hidden transition-colors">
        <button
          type="button"
          onClick={togglePlatformGuides}
          className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer hover:bg-[#FAF8F3]/60 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#1A1A1A]">
                  {isHindi ? 'विस्तृत प्लेटफॉर्म समाधान व माता-पिता गाइड' : 'Detailed Platform Guides & Parental Support'}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 hidden sm:inline-block">
                  {isHindi ? '6 परिदृश्य' : '6 Scenarios'}
                </span>
              </div>
              <p className="text-xs text-[#666]">
                {isHindi
                  ? 'टेलीग्राम लीक, इंस्टाग्राम फेक प्रोफाइल, AI डीपफेक व माता-पिता से बात करने के कदम।'
                  : 'Action checklists for Telegram channels, Instagram fake profiles, AI deepfakes, and talking to parents.'}
              </p>
            </div>
          </div>

          <div className="shrink-0 p-1.5 rounded-full bg-black/5 text-[#555]">
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
  );
};
