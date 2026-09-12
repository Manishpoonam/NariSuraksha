/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ShieldCheck, 
  PhoneCall, 
  Globe, 
  EyeOff, 
  AlertTriangle,
  ArrowLeft,
  FileText,
  LifeBuoy,
  Lock,
  Heart,
  Printer,
  Trash2,
  BookOpen,
  Moon,
  VolumeX,
  Home
} from 'lucide-react';
import { Language } from '../types';
import { hapticCamouflage, hapticPanic, hapticAction } from '../utils/haptics';
import { CloudSyncIndicator } from './CloudSyncIndicator';
import { subscribeToSync, getCloudSyncState } from '../utils/cloudSync';
import { CloudSyncState } from '../types';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  onTriggerCamouflage: () => void;
  onTriggerSOS?: () => void;
  onOpenPrintCard?: () => void;
  onOpenPurgeModal?: () => void;
  isStealthTitle?: boolean;
  onToggleStealthTitle?: () => void;
  isNightDimmer?: boolean;
  onToggleNightDimmer?: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onGoBack?: () => void;
  canGoBack?: boolean;
  onReturnToLanding?: () => void;
}

/**
 * Trauma-Informed Header & Navigation
 * 
 * DESIGN RATIONALE:
 * 1. Deep Indigo-Plum Anchor (#26215C): Delivers calm authority and emotional stability.
 * 2. Measured Emergency Red: Confined strictly to 112 and SOS triggers, avoiding visual fatigue.
 * 3. Warm Cream Surface (#FAF8F3): Keeps eye strain low, especially in dim nighttime conditions.
 * 4. Grounding Access: Includes a return to the grounding sanctuary screen if the user feels overwhelmed.
 */
export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  onTriggerCamouflage,
  onTriggerSOS,
  onOpenPrintCard,
  onOpenPurgeModal,
  isStealthTitle = true,
  onToggleStealthTitle,
  isNightDimmer = false,
  onToggleNightDimmer,
  activeTab,
  onSelectTab,
  onGoBack,
  canGoBack = false,
  onReturnToLanding,
}) => {
  const isHindi = language === 'hi';
  const [syncState, setSyncState] = React.useState<CloudSyncState>(getCloudSyncState());

  React.useEffect(() => {
    return subscribeToSync(setSyncState);
  }, []);

  const primaryNav = [
    { 
      id: 'rescue', 
      label: isHindi ? 'तुरंत सहायता' : 'Crisis Rescue',
      icon: LifeBuoy,
    },
    { 
      id: 'takedown', 
      label: isHindi ? 'फोटो रोकें (StopNCII)' : 'Stop Leaks',
      icon: ShieldCheck,
    },
    { 
      id: 'report', 
      label: isHindi ? 'निर्देशित e-FIR' : 'Guided e-FIR',
      icon: FileText,
    },
    { 
      id: 'support', 
      label: isHindi ? 'हेल्पलाइन व राहत' : 'Helplines & Calm',
      icon: Heart,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F3]/95 backdrop-blur-md border-b border-[#26215C]/10 shadow-soft">
      {/* 1. TOP UTILITY STRIP: QUIET REASSURANCE & ESSENTIAL CONTROLS */}
      <div className="bg-[#26215C] text-[#FAF8F3] px-3 sm:px-6 py-1.5 sm:py-2">
        {/* DESKTOP / TABLET VIEW (sm: and up) - Identical original layout */}
        <div className="hidden sm:flex max-w-7xl mx-auto items-center justify-between gap-2 text-xs">
          {/* Left: Quick Access Helplines */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-[#FAF8F3] text-[11px] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#0F6E56] animate-pulse" />
              <span>{isHindi ? '24/7 हेल्पलाइन:' : '24/7 Helpline:'}</span>
            </span>

            {/* National Cyber Crime 1930 */}
            <a
              href="tel:1930"
              onClick={() => hapticAction()}
              className="inline-flex items-center gap-1 font-semibold text-white bg-[#0F6E56] hover:bg-[#0A4E3D] px-2.5 py-1 rounded-full text-xs transition-all active:scale-97 shadow-xs"
              title="National Cyber Crime Helpline 1930"
            >
              <PhoneCall className="w-3 h-3 shrink-0" />
              <span>1930<span className="hidden sm:inline"> ({isHindi ? 'साइबर' : 'Cyber'})</span></span>
            </a>

            {/* Police 112 */}
            <a
              href="tel:112"
              onClick={() => hapticPanic()}
              className="inline-flex items-center gap-1 font-semibold text-white bg-[#DC2626] hover:bg-[#B91C1C] px-2.5 py-1 rounded-full text-xs transition-all active:scale-97 shadow-xs"
              title="Police Emergency 112"
            >
              <PhoneCall className="w-3 h-3 shrink-0" />
              <span>112<span className="hidden sm:inline"> ({isHindi ? 'पुलिस' : 'Police'})</span></span>
            </a>
          </div>

          {/* Right: Stealth Modes, Quick Exit, Language */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Cloud-Sync Backup Indicator */}
            <CloudSyncIndicator language={language} />

            {/* Stealth Tab Disguise Toggle */}
            {onToggleStealthTitle && (
              <button
                id="header-toggle-stealth-tab"
                onClick={() => {
                  hapticAction();
                  onToggleStealthTitle();
                }}
                className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full transition-colors cursor-pointer ${
                  isStealthTitle 
                    ? 'bg-[#E1F5EE] text-[#0F6E56] border border-[#B7E4D7]' 
                    : 'bg-white/10 hover:bg-white/20 text-[#FAF8F3]'
                }`}
                title={isHindi 
                  ? 'ब्राउज़र टैब को UPSC/NCERT नोट्स के रूप में छिपाएं' 
                  : 'Disguise browser tab title as Study Notes'}
              >
                <BookOpen className="w-3 h-3 text-[#F3C5D6] shrink-0" />
                <span className="hidden md:inline">
                  {isStealthTitle 
                    ? (isHindi ? 'टैब गुप्त: चालू' : 'Tab Stealth: ON') 
                    : (isHindi ? 'टैब छिपाएं' : 'Disguise Tab')}
                </span>
              </button>
            )}

            {/* Night Dimmer / Blanket Mode */}
            {onToggleNightDimmer && (
              <button
                id="header-toggle-night-dimmer"
                onClick={() => {
                  hapticAction();
                  onToggleNightDimmer();
                }}
                className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full transition-colors cursor-pointer ${
                  isNightDimmer 
                    ? 'bg-amber-500/30 text-amber-200 border border-amber-400' 
                    : 'bg-white/10 hover:bg-white/20 text-[#FAF8F3]'
                }`}
                title={isHindi 
                  ? 'कम रोशनी मोड' 
                  : 'Night Dimmer'}
              >
                <Moon className="w-3 h-3 text-amber-200 shrink-0" />
                <span className="hidden lg:inline">{isNightDimmer ? (isHindi ? 'अंधेरा मोड' : 'Dim: ON') : (isHindi ? 'डिम' : 'Dim')}</span>
              </button>
            )}

            {/* Purge Local Storage */}
            {onOpenPurgeModal && (
              <button
                onClick={() => {
                  hapticPanic();
                  onOpenPurgeModal();
                }}
                className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 bg-white/10 hover:bg-white/20 text-[#FAF8F3] text-xs font-medium rounded-full transition-colors cursor-pointer"
                title={isHindi ? 'स्थानीय इतिहास मिटाएं' : 'Purge Local Data'}
              >
                <Trash2 className="w-3 h-3 text-[#F3C5D6]" />
                <span className="hidden lg:inline">{isHindi ? 'मिटाएं' : 'Purge'}</span>
              </button>
            )}

            {/* QUICK EXIT (DISCREET, INSTANT ESCAPE) */}
            <button
              onClick={() => {
                hapticCamouflage(true);
                onTriggerCamouflage();
              }}
              className="inline-flex items-center gap-1 px-3 py-1 bg-[#993556] hover:bg-[#7A2843] text-white rounded-full text-xs font-semibold transition-all active:scale-97 cursor-pointer shadow-xs"
              title={isHindi ? 'तुरंत स्क्रीन छिपाएं (ESC)' : 'Leave this page instantly (ESC)'}
            >
              <EyeOff className="w-3.5 h-3.5 text-[#F3C5D6] shrink-0" />
              <span>{isHindi ? 'स्क्रीन छिपाएं' : 'Quick Exit'}</span>
              <kbd className="hidden sm:inline-block px-1 py-0.2 bg-white/20 text-[10px] rounded font-mono">ESC</kbd>
            </button>

            {/* Language Switch */}
            <button
              onClick={onToggleLanguage}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF8F3] text-xs font-medium transition-colors cursor-pointer"
              title="Switch Language"
            >
              <Globe className="w-3 h-3 shrink-0 text-[#F3C5D6]" />
              <span>{isHindi ? 'EN' : 'हिन्दी'}</span>
            </button>
          </div>
        </div>

        {/* MOBILE VIEW (< sm): Smooth Native App Dual-Strip with Zero Overflow */}
        <div className="sm:hidden flex flex-col gap-1.5 text-xs">
          {/* Row 1: Primary Action & Emergency Bar (Helplines Left, Quick Exit + Language Right) */}
          <div className="flex items-center justify-between gap-1">
            {/* Quick Access Helplines */}
            <div className="flex items-center gap-1 shrink-0">
              {/* National Cyber Crime 1930 */}
              <a
                href="tel:1930"
                onClick={() => hapticAction()}
                className="inline-flex items-center gap-1 font-semibold text-white bg-[#0F6E56] active:bg-[#0A4E3D] px-2.5 py-1 rounded-full text-[11px] shadow-xs active:scale-95 transition-transform"
                title="1930 National Cyber Crime Helpline"
              >
                <PhoneCall className="w-3 h-3 shrink-0" />
                <span>1930</span>
              </a>

              {/* Police 112 */}
              <a
                href="tel:112"
                onClick={() => hapticPanic()}
                className="inline-flex items-center gap-1 font-semibold text-white bg-[#DC2626] active:bg-[#B91C1C] px-2.5 py-1 rounded-full text-[11px] shadow-xs active:scale-95 transition-transform"
                title="112 Police Emergency"
              >
                <PhoneCall className="w-3 h-3 shrink-0" />
                <span>112</span>
              </a>
            </div>

            {/* Quick Exit & Language Switch - Always 100% visible and unclipped */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => {
                  hapticCamouflage(true);
                  onTriggerCamouflage();
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#993556] active:bg-[#7A2843] text-white rounded-full text-[11px] font-semibold shadow-xs active:scale-95 transition-transform"
                title={isHindi ? 'तुरंत स्क्रीन छिपाएं (ESC)' : 'Leave this page instantly (ESC)'}
              >
                <EyeOff className="w-3 h-3 text-[#F3C5D6] shrink-0" />
                <span>{isHindi ? 'स्क्रीन छिपाएं' : 'Quick Exit'}</span>
              </button>

              <button
                onClick={onToggleLanguage}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/15 active:bg-white/25 text-[#FAF8F3] text-[11px] font-semibold transition-colors active:scale-95"
                title="Switch Language / भाषा बदलें"
              >
                <Globe className="w-3 h-3 shrink-0 text-[#F3C5D6]" />
                <span>{isHindi ? 'EN' : 'हिन्दी'}</span>
              </button>
            </div>
          </div>

          {/* Row 2: Secondary Utilities (Cloud Status Left, Stealth & Dimmer Right) */}
          <div className="flex items-center justify-between gap-1 pt-1 border-t border-white/10 text-[11px]">
            {/* Cloud-Sync Backup Indicator */}
            <div className="flex items-center min-w-0">
              <CloudSyncIndicator language={language} />
            </div>

            {/* Stealth & Dimmer Toggles */}
            <div className="flex items-center gap-1.5 shrink-0">
              {onToggleStealthTitle && (
                <button
                  id="mobile-header-toggle-stealth-tab"
                  onClick={() => {
                    hapticAction();
                    onToggleStealthTitle();
                  }}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full transition-colors cursor-pointer text-[10.5px] ${
                    isStealthTitle 
                      ? 'bg-[#E1F5EE] text-[#0F6E56] border border-[#B7E4D7] font-medium' 
                      : 'bg-white/10 text-[#FAF8F3]'
                  }`}
                  title={isHindi ? 'ब्राउज़र टैब को UPSC/NCERT नोट्स के रूप में छिपाएं' : 'Disguise Tab'}
                >
                  <BookOpen className="w-3 h-3 text-[#F3C5D6] shrink-0" />
                  <span>{isStealthTitle ? (isHindi ? 'टैब गुप्त' : 'Tab: Stealth') : (isHindi ? 'टैब' : 'Tab')}</span>
                </button>
              )}

              {onToggleNightDimmer && (
                <button
                  id="mobile-header-toggle-night-dimmer"
                  onClick={() => {
                    hapticAction();
                    onToggleNightDimmer();
                  }}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full transition-colors cursor-pointer text-[10.5px] ${
                    isNightDimmer 
                      ? 'bg-amber-500/30 text-amber-200 border border-amber-400 font-medium' 
                      : 'bg-white/10 text-[#FAF8F3]'
                  }`}
                  title={isHindi ? 'कम रोशनी मोड' : 'Night Dimmer'}
                >
                  <Moon className="w-3 h-3 text-amber-200 shrink-0" />
                  <span>{isNightDimmer ? (isHindi ? 'डिम' : 'Dim: ON') : (isHindi ? 'डिम' : 'Dim')}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Hairline Auto-Save Progress Bar */}
      {syncState.status === 'saving' && (
        <div className="w-full h-[2px] bg-[#26215C]/10 overflow-hidden">
          <div
            className="h-full bg-[#0F6E56] transition-all duration-150 ease-out"
            style={{ width: `${syncState.progress}%` }}
          />
        </div>
      )}

      {/* 2. MAIN HEADER: BRAND & SANCTUARY ACCESS */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex items-center justify-between gap-3">
        {/* Brand identity */}
        <div 
          onClick={() => {
            if (onReturnToLanding) onReturnToLanding();
            else onSelectTab('rescue');
          }}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group min-w-0"
          title={isHindi ? 'होम / ग्राउंडिंग स्क्रीन पर जाएं' : 'Return to Home / Grounding screen'}
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#26215C] text-[#FAF8F3] rounded-xl flex items-center justify-center font-semibold shadow-xs shrink-0 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#E1F5EE]" />
          </div>
          <div className="truncate">
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-semibold tracking-tight text-[#26215C] truncate">
                NariSuraksha
              </h1>
              <span className="hidden sm:inline-block px-2.5 py-0.5 bg-[#E1F5EE] border border-[#B7E4D7] text-[#0F6E56] font-medium rounded-full text-[10px] tracking-wide">
                {isHindi ? 'सुरक्षित व गोपनीय' : 'Privacy-First'}
              </span>
            </div>
            <p className="text-[11px] text-[#5A5672] font-normal leading-none mt-0.5 truncate">
              {isHindi ? 'डिजिटल सुरक्षा व गोपनीय कानूनी ढाल' : 'Trauma-Informed Crisis Sanctuary'}
            </p>
          </div>
        </div>

        {/* Right Action: Grounding Screen link + SOS button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {onReturnToLanding && (
            <button
              onClick={onReturnToLanding}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium text-[#26215C] bg-white hover:bg-[#FAF8F3] border border-[#26215C]/12 transition-colors cursor-pointer min-h-[40px]"
              title={isHindi ? 'शांत मन / ग्राउंडिंग स्क्रीन' : 'Grounding Sanctuary'}
            >
              <Home className="w-3.5 h-3.5 text-[#0F6E56]" />
              <span className="hidden sm:inline">{isHindi ? 'होम / सांस लें' : 'Sanctuary'}</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. PRIMARY NAVIGATION TABS (DESKTOP & TABLET TOP PERSISTENT) */}
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 py-1.5 border-t border-[#26215C]/8">
        <nav aria-label="Main Navigation" className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto scrollbar-none py-0.5">
          {canGoBack && onGoBack && (
            <button
              onClick={onGoBack}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-white hover:bg-[#FAF8F3] text-[#26215C] font-medium text-xs sm:text-sm shrink-0 cursor-pointer transition-colors border border-[#26215C]/12 shadow-xs min-h-[38px]"
              title={isHindi ? 'पीछे जाएं' : 'Back'}
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#993556]" />
              <span className="hidden sm:inline">{isHindi ? 'वापस' : 'Back'}</span>
            </button>
          )}

          <div className="inline-flex items-center bg-white p-1 rounded-2xl border border-[#26215C]/10 gap-1 shrink-0 shadow-xs">
            {primaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap select-none min-h-[38px] ${
                    isActive
                      ? 'bg-[#26215C] text-white shadow-soft font-semibold'
                      : 'text-[#5A5672] hover:text-[#26215C] hover:bg-[#FAF8F3]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? 'text-[#F3C5D6]' : 'text-[#85819C]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
};
