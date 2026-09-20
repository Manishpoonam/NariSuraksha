/**
 * @license MIT
 * Copyright (c) 2026 Manish Poonam Kashyap <manishkumarkashyap14@gmail.com>
 * NariSuraksha - NCII & Cyber Extortion Emergency Response Portal
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { Header } from './components/Header';
import { EmergencyHero } from './components/EmergencyHero';
import { GirlsRescueGuide } from './components/GirlsRescueGuide';
import { CrisisFlowchart } from './components/CrisisFlowchart';
import { PlatformTakedownPortal } from './components/PlatformTakedownPortal';
import { EvidencePreservationTool } from './components/EvidencePreservationTool';
import { GuidedReportPortal } from './components/GuidedReportPortal';
import { CalmSupportPortal } from './components/CalmSupportPortal';
import { CamouflageScreen } from './components/CamouflageScreen';
import { FloatingPanicBar } from './components/FloatingPanicBar';
import { EmergencySOSModal } from './components/EmergencySOSModal';
import { ConfidenceCourageBoard } from './components/ConfidenceCourageBoard';
import { OptionsOverviewHub } from './components/OptionsOverviewHub';
import { RescueFooterSupport } from './components/RescueFooterSupport';
import { CampusSafetyPrintableCard } from './components/CampusSafetyPrintableCard';
import { PurgeFootprintModal } from './components/PurgeFootprintModal';
import { LandingGroundingScreen } from './components/LandingGroundingScreen';
import { ImmediateActionPath } from './components/ImmediateActionPath';
import { DeviceSafetyChecklist } from './components/DeviceSafetyChecklist';
import { EmergencyCockpit, CrisisScenarioKey } from './components/EmergencyCockpit';
import { CountdownBusterBanner } from './components/CountdownBusterBanner';
import { smoothScrollTo } from './utils/scroll';
import { hapticCamouflage, hapticSOS, hapticAction } from './utils/haptics';
import { useThreeFingerEmergencyGesture } from './hooks/useThreeFingerEmergencyGesture';
import { Language, IncidentCategory } from './types';
import { LEGAL_DISCLAIMER } from './data/legalDisclaimer';
import { 
  ShieldCheck, 
  PhoneCall, 
  Lock, 
  Scale, 
  HeartHandshake, 
  Check, 
  ExternalLink,
  Sparkles,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Info
} from 'lucide-react';

const ACTIVE_TAB_STORAGE_KEY = 'suraksha_active_tab_v1';
const TAKEDOWN_SUBTAB_STORAGE_KEY = 'suraksha_takedown_subtab_v1';
const REPORT_SUBTAB_STORAGE_KEY = 'suraksha_report_subtab_v1';
const SUPPORT_SUBTAB_STORAGE_KEY = 'suraksha_support_subtab_v1';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const isHindi = language === 'hi';

  const [activeTab, setActiveTab] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(ACTIVE_TAB_STORAGE_KEY);
      if (saved && ['rescue', 'confidence', 'takedown', 'report', 'support'].includes(saved)) {
        return saved;
      }
    } catch {}
    return 'rescue';
  });

  const [takedownSubTab, setTakedownSubTab] = useState<'stopncii' | 'evidence' | 'lockdown'>(() => {
    try {
      const saved = localStorage.getItem(TAKEDOWN_SUBTAB_STORAGE_KEY);
      if (saved && ['stopncii', 'evidence', 'lockdown'].includes(saved)) {
        return saved as any;
      }
    } catch {}
    return 'stopncii';
  });

  const [reportSubTab, setReportSubTab] = useState<'drafts' | 'national_portal' | 'rights' | 'state_cells' | 'guidelines'>(() => {
    try {
      const saved = localStorage.getItem(REPORT_SUBTAB_STORAGE_KEY);
      if (saved && ['drafts', 'national_portal', 'rights', 'state_cells', 'guidelines'].includes(saved)) {
        return saved as any;
      }
    } catch {}
    return 'drafts';
  });

  const [supportSubTab, setSupportSubTab] = useState<'grounding' | 'helplines' | 'scripts' | 'pins'>(() => {
    try {
      const saved = localStorage.getItem(SUPPORT_SUBTAB_STORAGE_KEY);
      if (saved && ['grounding', 'helplines', 'scripts', 'pins'].includes(saved)) {
        return saved as any;
      }
    } catch {}
    return 'grounding';
  });

  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');
  const [showDeepScenarios, setShowDeepScenarios] = useState<boolean>(false);
  const [isCamouflage, setIsCamouflage] = useState<boolean>(false);
  const [isSOSOpen, setIsSOSOpen] = useState<boolean>(false);
  const [draftCategory, setDraftCategory] = useState<IncidentCategory>('extortion_blackmail');
  const [rescueSituation, setRescueSituation] = useState<CrisisScenarioKey | string>('countdown');
  const [isPrintCardOpen, setIsPrintCardOpen] = useState<boolean>(false);
  const [isPurgeModalOpen, setIsPurgeModalOpen] = useState<boolean>(false);
  const [isImmediateActionOpen, setIsImmediateActionOpen] = useState<boolean>(false);
  const [isDeviceSafetyOpen, setIsDeviceSafetyOpen] = useState<boolean>(false);
  const [navSource, setNavSource] = useState<'landing' | 'rescue' | 'options' | null>(null);

  const STEALTH_TITLE_STORAGE_KEY = 'suraksha_stealth_tab_v1';
  const NIGHT_DIMMER_STORAGE_KEY = 'suraksha_night_dimmer_v1';

  const [isStealthTitle, setIsStealthTitle] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STEALTH_TITLE_STORAGE_KEY);
      if (saved !== null) return saved === 'true';
    } catch {}
    return true; // Default stealth for life safety
  });

  const [isNightDimmer, setIsNightDimmer] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(NIGHT_DIMMER_STORAGE_KEY);
      if (saved !== null) return saved === 'true';
    } catch {}
    return false;
  });

  const pendingScrollTargetRef = useRef<string | null>(null);

  const performSmoothScrollTo = (elementId: string) => {
    let attempts = 0;
    const maxAttempts = 25; // Try over ~1.8 seconds to accommodate viewMode exit/entry transitions

    const timer = setInterval(() => {
      attempts++;
      const el =
        document.getElementById(elementId) ||
        (elementId === 'somatic-breathing-card' ? document.getElementById('somatic-grounding-tool') : null) ||
        document.getElementById('somatic-breathing-sphere') ||
        document.getElementById('somatic-grounding-tool');

      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.height > 0 || attempts > 2) {
          clearInterval(timer);
          pendingScrollTargetRef.current = null;

          const headerEl = document.querySelector('header');
          const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 90;
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const safeMargin = 16;
          const targetTop = Math.max(0, rect.top + scrollTop - (headerHeight + safeMargin));

          window.scrollTo({
            top: targetTop,
            behavior: 'smooth',
          });

          try {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } catch {}

          el.classList.add('ring-2', 'ring-[#0F6E56]', 'ring-offset-4', 'transition-all', 'duration-500');
          setTimeout(() => {
            el.classList.remove('ring-2', 'ring-[#0F6E56]', 'ring-offset-4');
          }, 1600);
        }
      }

      if (attempts >= maxAttempts) {
        clearInterval(timer);
      }
    }, 70);
  };

  // Sync active states to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STEALTH_TITLE_STORAGE_KEY, String(isStealthTitle));
    } catch {}
  }, [isStealthTitle]);

  useEffect(() => {
    try {
      localStorage.setItem(NIGHT_DIMMER_STORAGE_KEY, String(isNightDimmer));
    } catch {}
  }, [isNightDimmer]);

  // Dynamic Browser Tab Disguise (Stealth Title + Background Visibility Camouflage)
  useEffect(() => {
    const defaultAppTitle = "NariSuraksha - NCII & Cyber Extortion Emergency Response Portal";
    const studyTitle = "UPSC Civil Services - Indian Polity & Governance Revision Notes";
    const bgTitle = "NCERT Class 12 Notes - Biology & Chemistry";

    const updateTitle = () => {
      if (document.hidden) {
        document.title = bgTitle;
      } else if (isStealthTitle) {
        document.title = studyTitle;
      } else {
        document.title = defaultAppTitle;
      }
    };

    updateTitle();
    document.addEventListener('visibilitychange', updateTitle);
    window.addEventListener('blur', updateTitle);
    window.addEventListener('focus', updateTitle);

    return () => {
      document.removeEventListener('visibilitychange', updateTitle);
      window.removeEventListener('blur', updateTitle);
      window.removeEventListener('focus', updateTitle);
    };
  }, [isStealthTitle]);

  useEffect(() => {
    try {
      localStorage.setItem(ACTIVE_TAB_STORAGE_KEY, activeTab);
    } catch {}
  }, [activeTab]);

  useEffect(() => {
    try {
      localStorage.setItem(TAKEDOWN_SUBTAB_STORAGE_KEY, takedownSubTab);
    } catch {}
  }, [takedownSubTab]);

  useEffect(() => {
    try {
      localStorage.setItem(REPORT_SUBTAB_STORAGE_KEY, reportSubTab);
    } catch {}
  }, [reportSubTab]);

  useEffect(() => {
    try {
      localStorage.setItem(SUPPORT_SUBTAB_STORAGE_KEY, supportSubTab);
    } catch {}
  }, [supportSubTab]);

  // Global listener for cross-component navigation
  useEffect(() => {
    const handleCustomNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<{ tab: string; elementId?: string }>;
      if (customEvent.detail) {
        handleNavigateToTab(customEvent.detail.tab, customEvent.detail.elementId);
      }
    };
    window.addEventListener('navigate-tab', handleCustomNavigate);
    return () => window.removeEventListener('navigate-tab', handleCustomNavigate);
  }, []);

  // Push history and navigate
  const handleNavigateToTab = (
    tab: string, 
    elementId?: string, 
    pushHistory: boolean = true,
    source?: 'landing' | 'rescue' | 'options'
  ) => {
    let targetTab = 'rescue';
    let targetSubTab: string | undefined = undefined;

    if (source) {
      setNavSource(source);
    } else if (activeTab === 'options') {
      setNavSource('options');
    } else if (activeTab === 'rescue') {
      setNavSource('rescue');
    }

    if (tab === 'rescue' || tab === 'girls_rescue' || tab === 'flowchart') {
      targetTab = 'rescue';
      if (tab === 'girls_rescue' && elementId === 'girls-rescue-guide') {
        setShowDeepScenarios(true);
      }
    } else if (tab === 'options' || tab === 'guidance') {
      targetTab = 'options';
    } else if (tab === 'takedown' || tab === 'stopncii') {
      targetTab = 'takedown';
      targetSubTab = 'stopncii';
      setTakedownSubTab('stopncii');
    } else if (tab === 'evidence') {
      targetTab = 'takedown';
      targetSubTab = 'evidence';
      setTakedownSubTab('evidence');
    } else if (tab === 'lockdown') {
      targetTab = 'takedown';
      targetSubTab = 'lockdown';
      setTakedownSubTab('lockdown');
    } else if (tab === 'report' || tab === 'drafts') {
      targetTab = 'report';
      targetSubTab = 'drafts';
      setReportSubTab('drafts');
    } else if (tab === 'national_portal') {
      targetTab = 'report';
      targetSubTab = 'national_portal';
      setReportSubTab('national_portal');
    } else if (tab === 'rights') {
      targetTab = 'report';
      targetSubTab = 'rights';
      setReportSubTab('rights');
    } else if (tab === 'state_cells' || tab === 'state_cyber' || tab === 'state-cyber-directory') {
      targetTab = 'report';
      targetSubTab = 'state_cells';
      setReportSubTab('state_cells');
    } else if (tab === 'guidelines') {
      targetTab = 'report';
      targetSubTab = 'guidelines';
      setReportSubTab('guidelines');
    } else if (tab === 'support' || tab === 'grounding') {
      targetTab = 'support';
      targetSubTab = 'grounding';
      setSupportSubTab('grounding');
    } else if (tab === 'helplines') {
      targetTab = 'support';
      targetSubTab = 'helplines';
      setSupportSubTab('helplines');
    } else if (tab === 'scripts') {
      targetTab = 'support';
      targetSubTab = 'scripts';
      setSupportSubTab('scripts');
    } else if (tab === 'pins') {
      targetTab = 'support';
      targetSubTab = 'pins';
      setSupportSubTab('pins');
    } else if (tab === 'confidence') {
      targetTab = 'confidence';
    } else {
      targetTab = tab;
    }

    const isTabSwitching = targetTab !== activeTab;
    setActiveTab(targetTab);

    if (pushHistory) {
      const currentDepth = (window.history.state && typeof window.history.state.depth === 'number')
        ? window.history.state.depth
        : 0;
      window.history.pushState(
        { tab: targetTab, subTab: targetSubTab, depth: currentDepth + 1 },
        ''
      );
    }

    // Scroll handling:
    // When elementId is specified (e.g. somatic-breathing-card or somatic-grounding-tool), always prioritize scrolling
    // to that exact component even when switching tabs or viewModes.
    const isExplicitElementTarget = Boolean(
      elementId && 
      elementId !== 'active-tab-container' && 
      elementId !== 'platform-takedown-portal' && 
      elementId !== 'complaint-draft-generator' &&
      elementId !== 'girls-rescue-guide' &&
      elementId !== 'guided-emergency-flow'
    );

    if (isExplicitElementTarget && elementId) {
      pendingScrollTargetRef.current = elementId;
      performSmoothScrollTo(elementId);
    } else {
      // When opening general main views without a specific deep link, ensure the page starts smoothly from the top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 50);
    }
  };

  // Re-check pending scroll target whenever viewMode or tab changes
  useEffect(() => {
    if (viewMode === 'app' && pendingScrollTargetRef.current) {
      performSmoothScrollTo(pendingScrollTargetRef.current);
    }
  }, [viewMode, activeTab, supportSubTab]);

  const handleSelectTakedownSubTab = (sub: 'stopncii' | 'evidence' | 'lockdown') => {
    setTakedownSubTab(sub);
    const currentDepth = (window.history.state?.depth || 0) + 1;
    window.history.pushState({ tab: 'takedown', subTab: sub, depth: currentDepth }, '');
  };

  const handleSelectReportSubTab = (sub: 'drafts' | 'national_portal' | 'rights' | 'state_cells' | 'guidelines') => {
    setReportSubTab(sub);
    const currentDepth = (window.history.state?.depth || 0) + 1;
    window.history.pushState({ tab: 'report', subTab: sub, depth: currentDepth }, '');
  };

  const handleSelectSupportSubTab = (sub: 'grounding' | 'helplines' | 'scripts' | 'pins') => {
    setSupportSubTab(sub);
    const currentDepth = (window.history.state?.depth || 0) + 1;
    window.history.pushState({ tab: 'support', subTab: sub, depth: currentDepth }, '');
  };

  // Dedicated in-app Back Navigation handler
  const handleGoBack = () => {
    // 1. Close active modals if open
    if (isSOSOpen) {
      setIsSOSOpen(false);
      return;
    }
    if (isCamouflage) {
      setIsCamouflage(false);
      return;
    }
    if (showDeepScenarios) {
      setShowDeepScenarios(false);
      return;
    }

    // 2. If inside secondary subtabs, go to hub root
    if (activeTab === 'takedown' && takedownSubTab !== 'stopncii') {
      handleSelectTakedownSubTab('stopncii');
      return;
    }
    if (activeTab === 'report' && reportSubTab !== 'drafts') {
      handleSelectReportSubTab('drafts');
      return;
    }
    if (activeTab === 'support' && supportSubTab !== 'grounding') {
      handleSelectSupportSubTab('grounding');
      return;
    }

    // 3. Contextual back for Confidence Pins
    if (activeTab === 'confidence') {
      if (navSource === 'options') {
        handleNavigateToTab('options');
      } else {
        handleNavigateToTab('rescue');
      }
      return;
    }

    // 4. Return from Options Overview Hub to Landing Sanctuary
    if (activeTab === 'options') {
      setViewMode('landing');
      return;
    }

    // 5. If user navigated from Options Overview to a sub-feature, return to Options
    if (navSource === 'options' && activeTab !== 'rescue') {
      handleNavigateToTab('options');
      return;
    }

    // 6. If in another hub, go back to Quick Rescue
    if (activeTab !== 'rescue') {
      handleNavigateToTab('rescue');
      return;
    }

    // 7. If at Rescue, return to the Landing Grounding Sanctuary
    if (viewMode === 'app') {
      setViewMode('landing');
      return;
    }

    // 5. Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Browser back & hardware gesture interception (popstate) - safe & standard
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // Priority 1: Close active modals without leaving view
      if (isSOSOpen) {
        setIsSOSOpen(false);
        return;
      }
      if (isCamouflage) {
        setIsCamouflage(false);
        return;
      }
      if (showDeepScenarios) {
        setShowDeepScenarios(false);
        return;
      }

      const state = event.state as { tab?: string; subTab?: string; depth?: number } | null;

      if (state && state.tab) {
        setActiveTab(state.tab);
        if (state.subTab) {
          if (state.tab === 'takedown') setTakedownSubTab(state.subTab as any);
          if (state.tab === 'report') setReportSubTab(state.subTab as any);
          if (state.tab === 'support') setSupportSubTab(state.subTab as any);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isSOSOpen, isCamouflage, showDeepScenarios]);

  // Global ESC shortcut for instant panic camouflage with physical haptic confirmation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsCamouflage((prev) => {
          const next = !prev;
          hapticCamouflage(next);
          return next;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 3-Finger Touch Emergency Gesture Hook (blocks Chrome reload gesture, triggers haptic + camouflage)
  useThreeFingerEmergencyGesture(() => {
    setIsCamouflage(true);
  });

  const handleTriggerCamouflage = (entering: boolean = true) => {
    hapticCamouflage(entering);
    setIsCamouflage(entering);
  };

  const handleTriggerSOS = () => {
    hapticSOS();
    setIsSOSOpen(true);
  };

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        {isCamouflage ? (
        <CamouflageScreen key="camouflage-view" onRestore={() => handleTriggerCamouflage(false)} />
      ) : isDeviceSafetyOpen ? (
        <div key="device-safety-view" className="min-h-screen bg-[#FAF8F3] text-[#26215C] py-4 sm:py-8 selection:bg-[#993556] selection:text-white">
          <DeviceSafetyChecklist
            language={language}
            onBack={() => setIsDeviceSafetyOpen(false)}
            onProceedToEmergency={() => {
              setIsDeviceSafetyOpen(false);
              setViewMode('app');
              handleNavigateToTab('rescue');
            }}
          />
        </div>
      ) : viewMode === 'landing' ? (
        <React.Fragment key="landing-fragment">
          <LandingGroundingScreen
            key="landing-grounding-view"
            language={language}
            onToggleLanguage={handleToggleLanguage}
            onChooseUrgentHelp={() => {
              setIsImmediateActionOpen(true);
            }}
            onChooseUnderstandOptions={() => {
              setViewMode('app');
              setNavSource('landing');
              handleNavigateToTab('options', undefined, true, 'landing');
            }}
            onTriggerCamouflage={() => handleTriggerCamouflage(true)}
            onOpenBreathing={() => {
              setViewMode('app');
              handleNavigateToTab('support', 'somatic-breathing-card');
            }}
            onOpenDeviceSafety={() => setIsDeviceSafetyOpen(true)}
            onOpenFullDisclaimer={() => {
              setViewMode('app');
              setTimeout(() => {
                const el = document.getElementById(LEGAL_DISCLAIMER.anchorId);
                el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 100);
            }}
          />
          {isImmediateActionOpen && (
            <ImmediateActionPath
              key="immediate-action-path"
              language={language}
              onClose={() => setIsImmediateActionOpen(false)}
              onTriggerCamouflage={() => handleTriggerCamouflage(true)}
              onOpenFullApp={() => {
                setIsImmediateActionOpen(false);
                setViewMode('app');
                handleNavigateToTab('rescue');
              }}
            />
          )}
        </React.Fragment>
      ) : (
        <motion.div
          key="main-app-view"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          className={`min-h-screen flex flex-col font-sans transition-colors duration-300 selection:bg-[#993556] selection:text-white ${
            isNightDimmer 
              ? 'bg-[#121212] text-[#E0E0E0] brightness-90 contrast-[1.02]' 
              : 'bg-[#FAF8F3] text-[#26215C]'
          }`}
        >
      {/* Educational & Independent Portal Disclaimer */}
      <aside aria-label="Disclaimer" className="bg-[#1E1A48] text-amber-200 text-xs px-4 py-2 border-b border-amber-300/20 text-center flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2.5 z-30">
        <span className="font-semibold flex items-center gap-1.5 text-amber-300 text-[11px] sm:text-xs">
          <Info className="w-3.5 h-3.5 shrink-0" />
          {isHindi ? 'नागरिक सहायता व जागरूकता संसाधन' : 'Citizen Safety Awareness & Legal Aid Guide'}
        </span>
        <span className="text-amber-100/90 text-[11px] font-medium">
          {isHindi 
            ? 'स्वतंत्र डिजिटल सुरक्षा पोर्टल • कोई लॉगिन नहीं। कोई डेटा सेव नहीं। कभी नहीं।'
            : 'Independent Digital Safety Portal • No Login. No Data Stored. Ever.'}
        </span>
      </aside>

      {/* 1. Top Header & Emergency Bar */}
      <Header
        language={language}
        onToggleLanguage={handleToggleLanguage}
        onTriggerCamouflage={() => handleTriggerCamouflage(true)}
        onTriggerSOS={handleTriggerSOS}
        onOpenPrintCard={() => setIsPrintCardOpen(true)}
        onOpenPurgeModal={() => setIsPurgeModalOpen(true)}
        isStealthTitle={isStealthTitle}
        onToggleStealthTitle={() => setIsStealthTitle((prev) => !prev)}
        isNightDimmer={isNightDimmer}
        onToggleNightDimmer={() => setIsNightDimmer((prev) => !prev)}
        activeTab={activeTab}
        onSelectTab={(tab) => handleNavigateToTab(tab)}
        canGoBack={true}
        onGoBack={handleGoBack}
        onReturnToLanding={() => setViewMode('landing')}
      />

      {/* 2. Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8 pb-[calc(7.5rem+env(safe-area-inset-bottom,0px))] sm:pb-16">
        {/* Intuitive In-App Back Navigation Bar & Auto-Saved Status */}
        {(activeTab !== 'rescue' || showDeepScenarios) && (
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-[#E8E2DC] rounded-2xl p-3 sm:px-5 sm:py-3.5 shadow-xs">
            <button
              onClick={handleGoBack}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2D2D2D] hover:bg-[#1A1A1A] text-white text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer active:scale-95 select-none min-h-[40px]"
              title={isHindi ? 'वापस जाएं' : 'Back'}
            >
              <ArrowLeft className="w-4 h-4 text-amber-300" />
              <span>
                {showDeepScenarios
                  ? (isHindi ? 'विस्तृत परिदृश्य बंद करें' : 'Close Scenarios')
                  : activeTab === 'options'
                  ? (isHindi ? 'मुख्य द्वार पर वापस जाएं' : 'Back to Entry Screen')
                  : activeTab === 'confidence'
                  ? (navSource === 'options'
                    ? (isHindi ? 'विकल्पों पर वापस जाएं' : 'Back to Options Overview')
                    : (isHindi ? 'त्वरित सहायता पर वापस जाएं' : 'Back to Quick Rescue'))
                  : (navSource === 'options'
                    ? (isHindi ? 'विकल्पों पर वापस जाएं' : 'Back to Options Overview')
                    : (isHindi ? 'त्वरित सहायता पर वापस जाएं' : 'Back to Quick Rescue'))}
              </span>
            </button>

            <div className="flex items-center gap-2 text-xs text-[#666]">
              <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-semibold border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  {isHindi 
                    ? 'इस निजी सत्र में सुरक्षित — टैब बंद करने पर साफ़ हो जाएगा' 
                    : 'Saved to this private session — cleared when you close this tab'}
                </span>
              </span>
            </div>
          </div>
        )}

        {/* Dynamic 4-Hub Views */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            id="active-tab-container"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="space-y-8 scroll-mt-48"
          >
            {/* HUB 0: CALM OPTIONS & RIGHTS OVERVIEW */}
            {activeTab === 'options' && (
              <OptionsOverviewHub
                language={language}
                onNavigateToTab={(tab, elemId) => {
                  setNavSource('options');
                  handleNavigateToTab(tab, elemId, true, 'options');
                }}
                onBackToLanding={() => {
                  setViewMode('landing');
                }}
              />
            )}

            {/* HUB 1: QUICK RESCUE & IMMEDIATE TRIAGE */}
            {activeTab === 'rescue' && (
              <div className="space-y-8">
                {/* 1. THE UNIFIED LINEAR RESCUE PATH STEPPER */}
                <EmergencyCockpit
                  language={language}
                  onTriggerSOS={handleTriggerSOS}
                  onTriggerCamouflage={() => handleTriggerCamouflage(true)}
                  onNavigateToTab={handleNavigateToTab}
                  onSelectSituation={(sitId) => {
                    setRescueSituation(sitId as any);
                  }}
                />

                {/* 2. SIMPLIFIED ESSENTIAL SAFETY & EXPANDABLE REFERENCE HUB */}
                <RescueFooterSupport
                  language={language}
                  onNavigateToTab={handleNavigateToTab}
                  onOpenPrintCard={() => setIsPrintCardOpen(true)}
                  onOpenPurgeModal={() => setIsPurgeModalOpen(true)}
                  onOpenDeviceSafety={() => setIsDeviceSafetyOpen(true)}
                  onSelectCategoryForDraft={setDraftCategory}
                  onOpenSOS={handleTriggerSOS}
                  showPlatformGuides={showDeepScenarios}
                  onTogglePlatformGuides={() => setShowDeepScenarios((prev) => !prev)}
                />
              </div>
            )}

            {/* HUB: COURAGE & CONFIDENCE PINS (DEDICATED PINTEREST VIEW) */}
            {activeTab === 'confidence' && (
              <div className="space-y-6">
                <ConfidenceCourageBoard
                  language={language}
                  onNavigateToTab={handleNavigateToTab}
                  onBack={handleGoBack}
                  backLabel={
                    navSource === 'options'
                      ? (isHindi ? 'विकल्पों पर वापस जाएं' : 'Back to Options Overview')
                      : (isHindi ? 'त्वरित सहायता पर वापस जाएं' : 'Back to Quick Rescue')
                  }
                />
              </div>
            )}

            {/* HUB 2: STOP LEAKS & TOOLS */}
            {activeTab === 'takedown' && (
              <div className="space-y-6">
                {takedownSubTab === 'evidence' ? (
                  <div className="space-y-4">
                    <button
                      type="button"
                      onClick={() => handleSelectTakedownSubTab('stopncii')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B6D5C] hover:text-[#1A1A1A] transition-colors cursor-pointer py-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>{isHindi ? 'लीक रोकें पोर्टल पर वापस जाएं' : 'Back to Stop Leaks & Takedown Portals'}</span>
                    </button>
                    <EvidencePreservationTool language={language} onNavigateToTab={handleNavigateToTab} />
                  </div>
                ) : (
                  <PlatformTakedownPortal 
                    language={language} 
                    onNavigateToTab={handleNavigateToTab} 
                  />
                )}
              </div>
            )}

            {/* HUB 3: REPORT & E-FIR */}
            {activeTab === 'report' && (
              <GuidedReportPortal
                language={language}
                initialCategory={draftCategory}
                onNavigateToTab={handleNavigateToTab}
                activeSubView={reportSubTab === 'national_portal' ? 'national_portal' : 'drafts'}
                onSelectSubView={(sub) => handleSelectReportSubTab(sub as any)}
              />
            )}

            {/* HUB 4: CALM & HELPLINES */}
            {activeTab === 'support' && (
              <div className="space-y-8">
                <CalmSupportPortal
                  language={language}
                  onNavigateToTab={handleNavigateToTab}
                  defaultSection={supportSubTab === 'scripts' ? 'scripts' : supportSubTab === 'helplines' ? 'helplines' : 'grounding'}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#F0EBE6] mt-12 py-8 px-4 sm:px-6 text-[#666] text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 font-bold text-[#2D2D2D] text-sm">
              <ShieldCheck className="w-4 h-4 text-[#8B6D5C]" />
              <span>NariSuraksha Emergency Portal (भारत)</span>
            </div>
            <p className="text-[11px] text-[#777]">
              Designed for women's digital safety under the Information Technology Act, 2000 & Bharatiya Nyaya Sanhita, 2023.
            </p>
            <p className="text-[11px] text-[#555]">
              An independent, non-commercial safety resource.
            </p>
            {/* Short disclaimer with link to canonical block (omitted on support tab where full canonical block is already present) */}
            {activeTab !== 'support' && (
              <p className="text-[11px] text-[#777] leading-relaxed">
                <span>{LEGAL_DISCLAIMER.short[language]} — </span>
                <a
                  href={`#${LEGAL_DISCLAIMER.anchorId}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigateToTab('support', LEGAL_DISCLAIMER.anchorId);
                  }}
                  className="text-[#2D2D2D] hover:underline font-semibold underline-offset-2"
                >
                  {LEGAL_DISCLAIMER.linkText[language]}
                </a>
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center text-[#666] text-xs">
            <button
              onClick={() => handleNavigateToTab('girls_rescue', 'girls-rescue-guide')}
              className="hover:text-[#2D2D2D] font-medium cursor-pointer"
            >
              {isHindi ? 'आपातकालीन सहायता' : 'Emergency Help'}
            </button>
            <span>•</span>
            <button
              onClick={() => handleNavigateToTab('rights', 'legal-rights-faq')}
              className="hover:text-[#2D2D2D] font-medium cursor-pointer"
            >
              {isHindi ? 'कानूनी अधिकार' : 'Legal Rights'}
            </button>
            <span>•</span>
            <button
              onClick={() => handleNavigateToTab('helplines', 'helpline-directory')}
              className="hover:text-[#2D2D2D] font-medium cursor-pointer"
            >
              {isHindi ? 'हेल्पलाइन डायरेक्टरी' : 'Helplines'}
            </button>
            <span>•</span>
            <button
              onClick={() => setIsDeviceSafetyOpen(true)}
              className="hover:text-[#2D2D2D] font-medium cursor-pointer"
            >
              {isHindi ? '📱 डिवाइस सुरक्षा व हिस्ट्री' : '📱 Device Safety'}
            </button>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar: Thumb-accessible, safe-area aware */}
      <nav 
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F3]/95 backdrop-blur-md border-t border-[#26215C]/10 pt-1.5 pb-[calc(0.375rem+env(safe-area-inset-bottom,0px))] px-2 flex items-center justify-around sm:hidden shadow-soft"
      >
        <button
          onClick={() => handleNavigateToTab('rescue')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer min-w-[52px] min-h-[46px] ${
            activeTab === 'rescue' ? 'text-[#993556] font-semibold' : 'text-[#85819C] font-normal'
          }`}
        >
          <ShieldCheck className={`w-5 h-5 ${activeTab === 'rescue' ? 'text-[#993556] stroke-[2.2]' : 'text-[#85819C]'}`} />
          <span className="text-[10px] mt-0.5 tracking-tight leading-tight">{isHindi ? 'मदद' : 'Rescue'}</span>
        </button>

        <button
          onClick={() => handleNavigateToTab('confidence')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer min-w-[52px] min-h-[46px] ${
            activeTab === 'confidence' ? 'text-[#993556] font-semibold' : 'text-[#85819C] font-normal'
          }`}
        >
          <Sparkles className={`w-5 h-5 ${activeTab === 'confidence' ? 'text-[#993556] stroke-[2.2]' : 'text-[#85819C]'}`} />
          <span className="text-[10px] mt-0.5 tracking-tight leading-tight">{isHindi ? 'साहस' : 'Courage'}</span>
        </button>

        <button
          onClick={() => handleNavigateToTab('takedown')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer min-w-[52px] min-h-[46px] ${
            activeTab === 'takedown' ? 'text-[#993556] font-semibold' : 'text-[#85819C] font-normal'
          }`}
        >
          <Lock className={`w-5 h-5 ${activeTab === 'takedown' ? 'text-[#993556] stroke-[2.2]' : 'text-[#85819C]'}`} />
          <span className="text-[10px] mt-0.5 tracking-tight leading-tight">{isHindi ? 'हटाएं' : 'Takedown'}</span>
        </button>

        <button
          onClick={() => handleNavigateToTab('report')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer min-w-[52px] min-h-[46px] ${
            activeTab === 'report' ? 'text-[#993556] font-semibold' : 'text-[#85819C] font-normal'
          }`}
        >
          <Scale className={`w-5 h-5 ${activeTab === 'report' ? 'text-[#993556] stroke-[2.2]' : 'text-[#85819C]'}`} />
          <span className="text-[10px] mt-0.5 tracking-tight leading-tight">{isHindi ? 'एफआईआर' : 'e-FIR'}</span>
        </button>

        <button
          onClick={() => handleNavigateToTab('support')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer min-w-[52px] min-h-[46px] ${
            activeTab === 'support' ? 'text-[#993556] font-semibold' : 'text-[#85819C] font-normal'
          }`}
        >
          <HeartHandshake className={`w-5 h-5 ${activeTab === 'support' ? 'text-[#993556] stroke-[2.2]' : 'text-[#85819C]'}`} />
          <span className="text-[10px] mt-0.5 tracking-tight leading-tight">{isHindi ? 'सपोर्ट' : 'Support'}</span>
        </button>
      </nav>

      {/* Always-visible Floating Panic & Fast-Dial Bar */}
      <FloatingPanicBar
        language={language}
        onTriggerCamouflage={() => handleTriggerCamouflage(true)}
        onTriggerSOS={handleTriggerSOS}
      />

      {/* Emergency GPS SOS Modal */}
      <EmergencySOSModal
        isOpen={isSOSOpen}
        onClose={() => setIsSOSOpen(false)}
        language={language}
      />

      {/* Hostel & Campus Emergency Safety Card (Print Ready) */}
      <CampusSafetyPrintableCard
        isOpen={isPrintCardOpen}
        onClose={() => setIsPrintCardOpen(false)}
        language={language}
      />

      {/* Shared Phone Footprint Purge Modal */}
      <PurgeFootprintModal
        isOpen={isPurgeModalOpen}
        onClose={() => setIsPurgeModalOpen(false)}
        language={language}
      />

      {/* 2-Minute Emergency Immediate Action Path Modal */}
      {isImmediateActionOpen && (
        <ImmediateActionPath
          language={language}
          onClose={() => setIsImmediateActionOpen(false)}
          onTriggerCamouflage={() => handleTriggerCamouflage(true)}
          onOpenFullApp={() => {
            setIsImmediateActionOpen(false);
            handleNavigateToTab('rescue');
          }}
        />
      )}
        </motion.div>
      )}
      </AnimatePresence>
    </MotionConfig>
  );
}
