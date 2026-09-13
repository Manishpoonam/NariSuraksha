/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  Lock, 
  Sparkles,
  Camera, 
  Ban, 
  Scale, 
  Copy, 
  Check, 
  Clock, 
  ExternalLink, 
  PhoneCall, 
  VolumeX, 
  CreditCard, 
  UserCheck, 
  ChevronDown, 
  ChevronUp, 
  EyeOff, 
  AlertOctagon, 
  FileCheck2, 
  FileText, 
  Baby, 
  AlertTriangle, 
  Radio, 
  Eye, 
  HelpCircle, 
  Compass, 
  RefreshCw, 
  Send,
  Heart,
  CheckCircle2,
  HeartHandshake
} from 'lucide-react';
import { Language, IncidentCategory } from '../types';
import { hapticCamouflage, hapticSOS, hapticAction, hapticPanic, hapticSuccess } from '../utils/haptics';
import { PocsoMinorShieldModal } from './PocsoMinorShieldModal';
import { smoothScrollTo } from '../utils/scroll';
import { LEGAL_DISCLAIMER } from '../data/legalDisclaimer';

export type CrisisScenarioKey = 
  | 'countdown' 
  | 'paid' 
  | 'leaked' 
  | 'deepfake' 
  | 'danger_stalking' 
  | 'police';

export type RescueStep = 1 | 2 | 3 | 4;

interface EmergencyCockpitProps {
  language: Language;
  onTriggerSOS: () => void;
  onTriggerCamouflage: () => void;
  onNavigateToTab: (tab: string, elementId?: string) => void;
  onSelectCategoryForDraft?: (category: IncidentCategory) => void;
  onSelectSituation?: (situationId: string) => void;
  initialScenario?: CrisisScenarioKey;
}

const RESCUE_STEP_STORAGE_KEY = 'suraksha_rescue_step_v1';
const RESCUE_SCENARIO_STORAGE_KEY = 'suraksha_rescue_scenario_v1';
const RESCUE_COMPLETED_STEPS_KEY = 'suraksha_rescue_completed_steps_v1';

/**
 * Unified Linear Rescue Path Stepper
 * 
 * Replaces the fragmented cockpit grid with a trauma-informed, progressive 4-step flow:
 * Step 1: Immediate Stabilization (Grounding, Reality Check & Zero-Shame Core Rules)
 * Step 2: Threat Assessment & Containment (Single-choice threat triage + tailored 1-click legal copy scripts)
 * Step 3: Secure Critical Evidence (2-minute uncropped electronic evidence preservation under Sec 63 BSA)
 * Step 4: Take Direct Action (StopNCII hashing, 24h IT Rules notices, FIR generator, and national helplines)
 */
export const EmergencyCockpit: React.FC<EmergencyCockpitProps> = ({
  language,
  onTriggerSOS,
  onTriggerCamouflage,
  onNavigateToTab,
  onSelectCategoryForDraft,
  onSelectSituation,
  initialScenario = 'countdown',
}) => {
  const isHindi = language === 'hi';
  const prefersReducedMotion = useReducedMotion();

  // Step state (1: Stabilize, 2: Assess & Contain, 3: Evidence, 4: Action)
  const [currentStep, setCurrentStep] = useState<RescueStep>(() => {
    try {
      const saved = sessionStorage.getItem(RESCUE_STEP_STORAGE_KEY);
      if (saved && ['1', '2', '3', '4'].includes(saved)) {
        return parseInt(saved, 10) as RescueStep;
      }
    } catch {
      // ignore
    }
    return 1;
  });

  // Completed steps tracking: only marked upon explicit confirmation (e.g. clicking "Proceed")
  // Never marked based on scroll position, time spent, or passive heuristics.
  const [completedSteps, setCompletedSteps] = useState<number[]>(() => {
    try {
      const saved = sessionStorage.getItem(RESCUE_COMPLETED_STEPS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  // Selected threat scenario
  const [selectedScenario, setSelectedScenario] = useState<CrisisScenarioKey>(() => {
    try {
      const saved = sessionStorage.getItem(RESCUE_SCENARIO_STORAGE_KEY);
      if (saved && ['countdown', 'paid', 'leaked', 'deepfake', 'danger_stalking', 'police'].includes(saved)) {
        return saved as CrisisScenarioKey;
      }
    } catch {
      // ignore
    }
    return initialScenario;
  });

  // Evidence checkboxes in Step 3
  const [evidenceChecks, setEvidenceChecks] = useState<{ [key: string]: boolean }>({
    profile: false,
    threatMessage: false,
    paymentHandle: false,
  });

  // Copy script statuses
  const [copiedScript, setCopiedScript] = useState<boolean>(false);
  const [copiedDelayScript, setCopiedDelayScript] = useState<boolean>(false);
  const [copiedTakedownScript, setCopiedTakedownScript] = useState<boolean>(false);
  const [copiedDeepfakeScript, setCopiedDeepfakeScript] = useState<boolean>(false);
  const [copiedStalkingScript, setCopiedStalkingScript] = useState<boolean>(false);

  // Perpetrator type toggle for countdown
  const [perpetratorType, setPerpetratorType] = useState<'anonymous_scammer' | 'known_person'>('anonymous_scammer');
  const [showPsychology, setShowPsychology] = useState<boolean>(false);
  const [showPocsoModal, setShowPocsoModal] = useState<boolean>(false);

  // Sync to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(RESCUE_STEP_STORAGE_KEY, currentStep.toString());
    } catch {
      // ignore
    }
  }, [currentStep]);

  useEffect(() => {
    try {
      sessionStorage.setItem(RESCUE_COMPLETED_STEPS_KEY, JSON.stringify(completedSteps));
    } catch {
      // ignore
    }
  }, [completedSteps]);

  useEffect(() => {
    try {
      sessionStorage.setItem(RESCUE_SCENARIO_STORAGE_KEY, selectedScenario);
    } catch {
      // ignore
    }
  }, [selectedScenario]);

  // Handle direct step change (Always allowed, never gated)
  const goToStep = (step: RescueStep) => {
    hapticAction();
    setCurrentStep(step);
    smoothScrollTo('emergency-cockpit', 40);
  };

  // Explicit confirmation advancement handler:
  // Step completion is ONLY recorded when user explicitly confirms advancement via action buttons.
  const markStepCompleteAndAdvance = (stepToComplete: number, nextStep: RescueStep) => {
    hapticAction();
    setCompletedSteps(prev => (prev.includes(stepToComplete) ? prev : [...prev, stepToComplete]));
    goToStep(nextStep);
  };

  const handleSelectScenario = (key: CrisisScenarioKey) => {
    hapticAction();
    setSelectedScenario(key);
    if (onSelectSituation) {
      onSelectSituation(key);
    }
  };

  const toggleEvidenceCheck = (key: string) => {
    hapticAction();
    setEvidenceChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // --- STATUTORY SCRIPT TEMPLATES ---

  // Factually grounded, accurate statutory notice citing actual official reporting without fabricating legal counsel
  const freezeScript = isHindi
    ? `मैंने इस बातचीत और आपके मोबाइल नंबर/UPI की आधिकारिक शिकायत राष्ट्रीय साइबर अपराध पोर्टल (cybercrime.gov.in / हेल्पलाइन 1930) पर दर्ज करा दी है। 

सूचना प्रौद्योगिकी अधिनियम (धारा 66E व 67A) एवं भारतीय न्याय संहिता (धारा 308 - जबरन वसूली/ब्लैकमेल) के तहत किसी की निजी तस्वीरें प्रसारित करना या धमकी देना संज्ञेय अपराध है। सभी चैट स्क्रीनशॉट, टाइमस्टैम्प और आपका नंबर पुलिस जांच हेतु सुरक्षित कर लिए गए हैं। तुरंत संपर्क बंद करें और सभी सामग्री नष्ट करें।`
    : `This incident, your phone number, UPI handle, and chat records have been formally logged with the National Cyber Crime Reporting Portal (Helpline 1930 / cybercrime.gov.in).

Under the Information Technology Act (Sections 66E and 67A) and Bharatiya Nyaya Sanhita (Section 308 - Extortion), transmitting or threatening to publish intimate media is a cognizable criminal offence. All evidence has been digitally documented and preserved for law enforcement investigation. Cease all contact and delete all media immediately.`;

  // Gray-rock / delay script for known contacts
  const grayRockScript = isHindi
    ? `मुझे पैसों की व्यवस्था करने के लिए कल सुबह तक का समय चाहिए। अभी मेरे पास पैसे नहीं हैं और बैंक बंद है। कृपया जल्दबाजी में कुछ मत करना। मैं कल सुबह बात करती हूं।`
    : `I am currently trying to arrange the money and need until tomorrow morning to gather the amount. My banking limit is reached for today. Please do not do anything in haste. I will contact you tomorrow morning once ready.`;

  // 24-Hour Intermediary Takedown Notice
  const takedownNoticeScript = isHindi
    ? `अति आवश्यक कानूनी नोटिस (IT Rules 2021, Rule 3(2)(b)):
मैं इस संदेश के माध्यम से आधिकारिक सूचना दे रही हूं कि बिना मेरी सहमति के मेरी निजी/अश्लील सामग्री (Non-Consensual Intimate Media) को इस चैनल/अकाउंट पर अवैध रूप से प्रसारित किया जा रहा है। 

भारतीय सूचना प्रौद्योगिकी (मध्यवर्ती दिशानिर्देश) नियम 2021 के नियम 3(2)(b) तथा BNS धारा 77 व IT Act 67A के अनुसार, शिकायत प्राप्त होने के 24 घंटे के भीतर इस सामग्री को तत्काल हटाना प्लेटफॉर्म के लिए अनिवार्य है। ऐसा न करने पर मध्यवर्ती सुरक्षा (Safe Harbour) समाप्त मानी जाएगी और कानूनी कार्रवाई की जाएगी।`
    : `URGENT STATUTORY TAKEDOWN NOTICE (IT Rules 2021, Rule 3(2)(b)):
This is formal statutory notification that non-consensual intimate imagery (NCII) depicting me is being illegally hosted and disseminated on this channel/profile without my consent.

Under Rule 3(2)(b) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021 and Section 67A of the IT Act, platforms are legally mandated to disable access to or remove such intimate media within 24 hours of notification. Failure to comply immediately revokes statutory intermediary safe-harbor immunity under Section 79 of the IT Act and invites criminal liability.`;

  // AI Deepfake Statutory Notice
  const deepfakeNoticeScript = isHindi
    ? `कानूनी सूचना: AI डीपफेक / फर्जी फोटो का अवैध प्रसारण (IT Act 66E, 66D, 67A):
यह सामग्री आर्टिफिशियल इंटेलिजेंस (AI) और डिजिटल मॉर्फिंग टूल्स के माध्यम से बनाई गई पूरी तरह से नकली और मनगढ़ंत सामग्री (Morphed/Deepfake) है। किसी महिला की नकली अश्लील फोटो बनाना और प्रसारित करना IT Act की धारा 66E, 67A व BNS धारा 77 के तहत 5 साल तक कारावास का गैर-जमानती अपराध है। इस सामग्री को तुरंत नष्ट करें। साइबर सेल को शिकायत भेजी जा चुकी है।`
    : `LEGAL NOTICE: FABRICATED AI DEEPFAKE / MORPHED MEDIA:
The media in question is completely fabricated and synthetically generated using Artificial Intelligence / digital alteration without consent. Manufacturing and transmitting synthetic non-consensual intimate imagery is a grave non-bailable felony under Sections 66E, 66D, and 67A of the Information Technology Act and Section 77 of Bharatiya Nyaya Sanhita (up to 5 years rigorous imprisonment). Delete this synthetic content immediately; digital forensics and cyber crime authorities have been formally petitioned.`;

  // Anti-Stalking Final Warning
  const stalkingCeaseScript = isHindi
    ? `अंतिम कानूनी चेतावनी (BNS धारा 78 एवं 79):
आपका यह व्यवहार भारतीय न्याय संहिता (BNS) धारा 78 (ऑनलाइन पीछा/साइबर स्टॉकिंग) और धारा 79 (महिला की लज्जा का अनादर) के तहत संज्ञेय और गैर-जमानती अपराध है। आपके सभी संदेश, कॉल रिकॉर्ड्स और प्रोफाइल हैंडल्स साइबर पुलिस व महिला हेल्पलाइन (1090/112) को सौंप दिए गए हैं। तुरंत मुझसे संपर्क बंद करें अन्यथा पुलिस द्वारा कानूनी कार्रवाई की जाएगी।`
    : `FINAL STATUTORY CEASE AND DESIST:
Your persistent messaging, online surveillance, and harassment constitute cognizable criminal offenses under Section 78 (Cyber-Stalking) and Section 79 (Outraging Modesty of a Woman) of the Bharatiya Nyaya Sanhita (BNS) 2023. All records, timestamps, and digital footprints have been submitted to the Cyber Crime Police and Women Helpline (1090/112). Cease all direct and indirect contact immediately or face formal arrest proceedings.`;

  const copyToClipboard = (text: string, setter: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    hapticSuccess();
    setter(true);
    setTimeout(() => setter(false), 3000);
  };

  // TRAUMA-INFORMED RESCUE STEPPER CONFIGURATION & RATIONALE:
  // 1. NO GATING: In acute crisis or digital extortion, survivors face erratic panic spikes and
  //    different immediate needs (e.g. someone facing active leaks needs immediate containment scripts,
  //    while someone physically followed needs the police dossier). Forcing sequential completion
  //    amplifies helplessness and abandonment. Every step must remain freely clickable at all times.
  // 2. EXPLICIT COMPLETION ONLY: Completion is only marked when the survivor clicks an explicit
  //    "Proceed" button, never based on scroll position, time spent, or passive heuristics.
  // 3. COLOR DISCIPLINE: Red is strictly forbidden here — red is reserved exclusively for immediate
  //    physical emergency/SOS exits. Completed steps use calm teal (#0F6E56), the current step uses
  //    plum (#993556) with a soothing diaphragmatic breathing rhythm, and upcoming steps remain quiet neutral gray.
  // 4. NO TIME-PRESSURE FRAMING: No countdowns, percentages, or completion deadlines. Sequence over urgency.
  const stepsConfig = [
    {
      step: 1 as RescueStep,
      title: isHindi ? '1. स्थिरता व नियम' : '1. Stabilize',
      shortTitle: isHindi ? 'स्थिरता' : 'Stabilize',
      subtitle: isHindi ? 'श्वास व सत्य' : 'Grounding & Reality',
    },
    {
      step: 2 as RescueStep,
      title: isHindi ? '2. खतरा व रोकथाम' : '2. Assess Threat',
      shortTitle: isHindi ? 'खतरा' : 'Assess Threat',
      subtitle: isHindi ? 'स्क्रिप्ट व सुरक्षा' : 'Containment Script',
    },
    {
      step: 3 as RescueStep,
      title: isHindi ? '3. साक्ष्य सुरक्षा' : '3. Preserve Proof',
      shortTitle: isHindi ? 'साक्ष्य' : 'Preserve Proof',
      subtitle: isHindi ? '3 स्क्रीनशॉट' : 'Court Evidence',
    },
    {
      step: 4 as RescueStep,
      title: isHindi ? '4. सीधी कार्रवाई' : '4. Take Action',
      shortTitle: isHindi ? 'कार्रवाई' : 'Take Action',
      subtitle: isHindi ? 'Takedown व FIR' : 'Remedies & Portals',
    },
  ];

  // Trauma-informed breathing animation for current step:
  // Slow, gentle diaphragmatic pace (2.8s) provides somatic grounding without visual distress.
  // Uses purely non-layout-impacting boxShadow ring pulse (zero scale transform) to ensure
  // the circle's layout box and vertical midpoint never shift or displace the connecting line.
  const currentStepBreathing = prefersReducedMotion
    ? {}
    : {
        boxShadow: [
          '0 0 0 0px rgba(243, 197, 214, 0.45)',
          '0 0 0 5px rgba(243, 197, 214, 0)',
          '0 0 0 0px rgba(243, 197, 214, 0.45)',
        ],
        transition: {
          duration: 2.8,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        },
      };

  // Scenarios list for Step 2
  const scenariosList: {
    key: CrisisScenarioKey;
    title: { en: string; hi: string };
    desc: { en: string; hi: string };
    badge: { en: string; hi: string };
    icon: React.ReactNode;
  }[] = [
    {
      key: 'countdown',
      title: {
        en: 'Active Extortion & Fake Countdown',
        hi: 'उलटी गिनती की धमकी ("15 मिनट में पैसे दो")',
      },
      desc: {
        en: 'Threatening to leak intimate photos to parents, friends, or Instagram within minutes if money is not sent.',
        hi: '15-30 मिनट में रिश्तेदारों या सोशल मीडिया पर वीडियो भेजने की धमकी देकर पैसे मांग रहा है।',
      },
      badge: { en: 'Most Common', hi: 'सबसे आम मामला' },
      icon: <Clock className="w-5 h-5 text-amber-300" />,
    },
    {
      key: 'paid',
      title: {
        en: 'Already Paid Money (Golden Hour)',
        hi: 'पैसे ट्रांसफर कर चुकी हूँ (गोल्डन ऑवर)',
      },
      desc: {
        en: 'Transferred money via UPI or QR code, but the extortionist is demanding another installment.',
        hi: 'UPI से पैसे भेज दिए हैं और वह अब और अधिक पैसों की मांग कर रहा है। तुरंत 1930 बैंक फ्रीज की जरूरत।',
      },
      badge: { en: 'Financial Freeze', hi: 'बैंक फ्रीज जरूरी' },
      icon: <CreditCard className="w-5 h-5 text-rose-300" />,
    },
    {
      key: 'leaked',
      title: {
        en: 'Media Already Leaked Online',
        hi: 'तस्वीरें ऑनलाइन या ग्रुप में लीक हो चुकी हैं',
      },
      desc: {
        en: 'Content is circulating on Telegram channels, WhatsApp groups, or pornographic hosting sites.',
        hi: 'टेलीग्राम चैनल, व्हाट्सएप ग्रुप या वेबसाइट पर फोटो डाल दी गई हैं। 24-घंटे IT Rules takedown चाहिए।',
      },
      badge: { en: 'Rule 3(2)(b)', hi: '24h Takedown' },
      icon: <Radio className="w-5 h-5 text-red-300" />,
    },
    {
      key: 'deepfake',
      title: {
        en: 'AI Deepfake / Morphed Images',
        hi: 'AI डीपफेक या चेहरे को मॉर्फ की गई फोटो',
      },
      desc: {
        en: 'Face or body synthetically altered using AI apps. 100% illegal under IT Act 66D/67A & BNS 77.',
        hi: 'चेहरे को किसी अन्य अश्लील फोटो पर जोड़कर बनाया गया नकली मीडिया। कानूनन यह पूर्णतः अवैध है।',
      },
      badge: { en: 'Synthetic Media', hi: 'AI अवैध' },
      icon: <Sparkles className="w-5 h-5 text-teal-300" />,
    },
    {
      key: 'danger_stalking',
      title: {
        en: 'Physical Danger or Stalking',
        hi: 'शारीरिक खतरा या पीछा (स्टॉकिंग)',
      },
      desc: {
        en: 'Perpetrator knows your home/college address, is stalking you physically, or threatening violence.',
        hi: 'अपराधी घर/कॉलेज आ रहा है, शारीरिक नुकसान की धमकी दे रहा है। 112/1090 आपातकालीन सुरक्षा।',
      },
      badge: { en: 'High Priority', hi: 'आपातकाल' },
      icon: <AlertTriangle className="w-5 h-5 text-rose-400" />,
    },
    {
      key: 'police',
      title: {
        en: 'Filing Confidential Police FIR',
        hi: 'गोपनीय पुलिस शिकायत (FIR)',
      },
      desc: {
        en: 'Need to file a formal complaint without parents, friends, or college knowing (Sec 73 BNS anonymity).',
        hi: 'परिवार या समाज को बताए बिना साइबर सेल में गुप्त FIR दर्ज कराने की प्रक्रिया (BNS धारा 73)।',
      },
      badge: { en: 'Legal Shield', hi: 'पहचान सील' },
      icon: <Scale className="w-5 h-5 text-teal-300" />,
    },
  ];

  return (
    <section 
      id="emergency-cockpit"
      aria-label="Emergency Crisis Rescue Stepper"
      className="rounded-[24px] bg-[#26215C] text-[#FAF8F3] border border-[#373078] shadow-elevated overflow-hidden"
    >
      {/* 1. TOP SECURE STATUS STRIP */}
      <div className="bg-[#1E1949] px-4 sm:px-7 py-3 flex items-center justify-between text-xs text-[#FAF8F3] border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#0F6E56] animate-pulse" />
          <span className="font-semibold tracking-wide text-[11px] sm:text-xs text-[#FAF8F3]">
            {isHindi ? 'रेस्क्यू पाथ: चरणबद्ध संकट समाधान • 100% गोपनीय' : 'Rescue Path: Linear Crisis Response • 100% Private & Local'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-[11px] text-[#D2CCE7]">
            <VolumeX className="w-3.5 h-3.5 text-[#E1F5EE]" />
            <span>{isHindi ? 'ध्वनिरहित मोड' : 'Silent Mode Active'}</span>
          </span>
        </div>
      </div>

      {/* 2. UNIFIED 'RESCUE PATH' STEPPER HEADER */}
      <div className="bg-[#201B52] border-b border-white/10 px-3 sm:px-6 md:px-8 py-3.5 sm:py-4">
        {/* Minimal sequence position label: purely informational, zero time-pressure */}
        <div className="flex items-center justify-between text-xs mb-3 text-[#D2CCE7]">
          <div className="flex items-center gap-2">
            <span className="text-[#F3C5D6] font-bold text-xs">
              {isHindi ? `चरण ${currentStep} का 4` : `Step ${currentStep} of 4`}
            </span>
            <span className="text-white/30">•</span>
            <span className="text-white font-medium truncate max-w-[220px] sm:max-w-none">
              {stepsConfig[currentStep - 1].title.replace(/^\d+\.\s*/, '')}
            </span>
          </div>
          <span className="text-[11px] text-[#9E93C4] hidden sm:inline-block">
            {isHindi ? 'सभी चरण कभी भी सुलभ हैं' : 'All steps freely accessible'}
          </span>
        </div>

        {/* 4-Step Interactive Navigation with Integrated Slim Connecting Progress Treatment */}
        <div className="relative">
          {/* Mobile connecting line: calculated explicitly relative to the fixed 32px circle's vertical midpoint */}
          <div 
            className="sm:hidden absolute left-[12.5%] right-[12.5%] h-[2px] bg-white/15 -translate-y-1/2 pointer-events-none z-0" 
            style={{ top: 'calc(1px + 0.5rem + 16px)' }}
            aria-hidden="true"
          >
            <div 
              className="h-full bg-[#0F6E56] transition-all duration-300 rounded-full"
              style={{
                width: `${
                  completedSteps.includes(3) ? 100 :
                  completedSteps.includes(2) ? 66.6 :
                  completedSteps.includes(1) ? 33.3 : 0
                }%`
              }}
            />
          </div>

          {/* Stepper Grid: responsive across mobile (<=428px), tablet (429-1024px), and desktop (>=1025px) */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5 md:gap-3 relative z-10">
            {stepsConfig.map((s) => {
              const isCompleted = completedSteps.includes(s.step);
              const isCurrent = s.step === currentStep;

              return (
                <div key={s.step} className="relative">
                  {/* Slim connector line segment between cards on tablet & desktop */}
                  {s.step < 4 && (
                    <div
                      className={`hidden sm:block absolute -right-2 sm:-right-2.5 md:-right-3 top-1/2 -translate-y-1/2 w-2 sm:w-2.5 md:w-3 h-[2px] transition-colors duration-300 pointer-events-none z-20 ${
                        isCompleted ? 'bg-[#0F6E56]' : 'bg-white/15'
                      }`}
                      aria-hidden="true"
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => goToStep(s.step)}
                    aria-label={`${isHindi ? 'चरण' : 'Step'} ${s.step}: ${s.title}${isCompleted ? (isHindi ? ' (पूर्ण)' : ' (Completed)') : ''}${isCurrent ? (isHindi ? ' (वर्तमान)' : ' (Current)') : ''}`}
                    aria-current={isCurrent ? 'step' : undefined}
                    className={`w-full text-left transition-all cursor-pointer rounded-xl sm:rounded-2xl border min-h-[50px] sm:min-h-[56px] flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-2.5 md:gap-3 p-2 sm:p-2.5 md:p-3 active:scale-98 ${
                      isCurrent
                        ? 'bg-white/15 border-[#F3C5D6] text-white shadow-xs ring-1 ring-[#F3C5D6]/30'
                        : isCompleted
                        ? 'bg-[#0F6E56]/15 border-[#0F6E56]/40 text-[#FAF8F3] hover:bg-[#0F6E56]/25 hover:border-[#0F6E56]/60'
                        : 'bg-white/[0.03] border-white/10 text-[#9E93C4] hover:text-white hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    {/* Step marker node: Teal when completed, Plum with gentle pulse when current, Neutral gray when upcoming */}
                    {/* Fixed 32x32px layout box across all states ensures the connecting line always intersects the vertical center */}
                    <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
                      <motion.div
                        animate={isCurrent ? currentStepBreathing : {}}
                        className={`w-8 h-8 rounded-full box-border border flex items-center justify-center font-bold text-xs shrink-0 transition-colors relative z-10 ${
                          isCurrent
                            ? 'bg-[#993556] text-white border-[#F3C5D6] ring-2 ring-[#F3C5D6]/50 ring-offset-1 ring-offset-[#201B52]'
                            : isCompleted
                            ? 'bg-[#0F6E56] text-white border-[#0F6E56]'
                            : 'bg-[#201B52] sm:bg-white/10 text-[#D2CCE7]/80 border-white/20'
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="w-4 h-4 text-white" />
                        ) : (
                          <span>{s.step}</span>
                        )}
                      </motion.div>
                    </div>

                    {/* Step label: responsive typography for mobile, tablet, and desktop */}
                    <div className="w-full sm:w-auto truncate text-center sm:text-left min-w-0">
                      {/* Mobile compact title */}
                      <div className={`sm:hidden text-[10px] font-semibold truncate ${
                        isCurrent ? 'text-white' : isCompleted ? 'text-teal-200' : 'text-[#9E93C4]'
                      }`}>
                        {s.shortTitle}
                      </div>

                      {/* Tablet/Desktop full title */}
                      <div className={`hidden sm:block text-xs font-bold leading-tight truncate ${
                        isCurrent ? 'text-white' : isCompleted ? 'text-[#FAF8F3]' : 'text-[#FAF8F3]/80'
                      }`}>
                        {s.title}
                      </div>
                      <div className="hidden md:block text-[10px] text-[#D2CCE7] truncate">
                        {s.subtitle}
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. STEPPER BODY (STEP-BY-STEP CONTENT) */}
      <div className="p-5 sm:p-8 space-y-6">
        <AnimatePresence mode="wait">
          {/* ========================================================================= */}
          {/* STEP 1: IMMEDIATE STABILIZATION & REALITY CHECK                            */}
          {/* ========================================================================= */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Grounding & Breath Cue */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E1F5EE]/15 text-[#E1F5EE] text-xs font-medium border border-[#B7E4D7]/20">
                  <Lock className="w-3.5 h-3.5 text-[#E1F5EE]" />
                  <span>{isHindi ? 'गहरी सांस लें • आप इस समय पूरी तरह सुरक्षित हैं' : 'Take a slow, deep breath • You are physically safe right now'}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-white leading-tight tracking-tight">
                  {isHindi 
                    ? 'रुकें। 1 रुपया भी न दें। ब्लैकमेलर सिर्फ डर का फायदा उठा रहा है।' 
                    : 'Stop. Do not pay. The extortionist is bluffing on a fake countdown.'}
                </h1>

                <p className="text-sm sm:text-base text-[#D2CCE7] max-w-3xl leading-relaxed font-normal">
                  {isHindi
                    ? 'अपराधी 15 या 30 मिनट की नकली उलटी गिनती सिर्फ इसलिए बनाता है ताकि आप घबराकर पैसे दे दें। पैसे देने से कोई फोटो डिलीट नहीं होती, बल्कि वह दोबारा पैसे मांगता है। जैसे ही वह मीडिया लीक करेगा, उसकी सारी ब्लैकमेलिंग शक्ति खत्म हो जाएगी और वह 5 साल जेल जाएगा।'
                    : 'Extortionists engineer fake 15-minute countdowns specifically to trigger adrenaline-induced panic. Paying once never deletes the media—it only marks you as a paying target. Disseminating private media is a non-bailable felony (IT Act 67A, up to 5 years prison). You have the law and cyber police on your side.'}
                </p>
              </div>

              {/* Minor / POCSO Alert Banner */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white/6 border border-white/12 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FBEAF0]/20 flex items-center justify-center text-[#F3C5D6] shrink-0">
                    <Baby className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <div className="font-semibold text-white">
                      {isHindi ? 'क्या तस्वीरों/वीडियो में कोई नाबालिग (18 वर्ष से कम) है?' : 'Is anyone depicted in the photos/video under 18?'}
                    </div>
                    <div className="text-[#D2CCE7] text-[11px] font-normal">
                      {isHindi ? 'POCSO अधिनियम व TakeItDown के तहत विशेष गोपनीय सुरक्षा प्रक्रिया' : 'Special statutory POCSO protection, Childline 1098 & TakeItDown hashing'}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    hapticAction();
                    setShowPocsoModal(true);
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-[#993556] hover:bg-[#7A2843] text-white text-xs font-semibold shrink-0 cursor-pointer transition-colors"
                >
                  {isHindi ? 'POCSO सुरक्षा देखें' : 'Minor / POCSO Guide'}
                </button>
              </div>

              {/* The 3 Cardinal Stabilization Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="p-4 rounded-2xl bg-white/6 border border-white/12 space-y-2">
                  <div className="flex items-center gap-2 text-[#A8E5D7] font-bold text-xs uppercase tracking-wide">
                    <Ban className="w-4 h-4" />
                    <span>{isHindi ? 'नियम 1: पैसा न दें' : 'Rule 1: Never Pay'}</span>
                  </div>
                  <p className="text-xs text-[#D2CCE7] leading-relaxed">
                    {isHindi
                      ? '₹500 भी न दें। अपराधी कभी डिलीट नहीं करता। पैसा न देने पर उसका धंधा ठप हो जाता है।'
                      : 'Never pay any sum. Extortion is a bottomless pit. Refusing payment collapses their leverage.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/6 border border-white/12 space-y-2">
                  <div className="flex items-center gap-2 text-[#A8E5D7] font-bold text-xs uppercase tracking-wide">
                    <Camera className="w-4 h-4" />
                    <span>{isHindi ? 'नियम 2: चैट डिलीट न करें' : 'Rule 2: Do Not Delete'}</span>
                  </div>
                  <p className="text-xs text-[#D2CCE7] leading-relaxed">
                    {isHindi
                      ? 'डरकर चैट या नंबर डिलीट न करें। यह सबूत (BSA Sec 63) अपराधी को जेल भेजने के लिए जरूरी है।'
                      : 'Do not panic-delete chats or profiles. Uncropped messages are court-admissible electronic armor.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/6 border border-white/12 space-y-2">
                  <div className="flex items-center gap-2 text-[#A8E5D7] font-bold text-xs uppercase tracking-wide">
                    <UserCheck className="w-4 h-4" />
                    <span>{isHindi ? 'नियम 3: आपकी कोई गलती नहीं' : 'Rule 3: Zero Shame'}</span>
                  </div>
                  <p className="text-xs text-[#D2CCE7] leading-relaxed">
                    {isHindi
                      ? 'आप पीड़िता हैं, अपराधी नहीं। IT Act 67A के तहत आपको पूर्ण कानूनी सुरक्षा व गोपनीयता प्राप्त है।'
                      : 'You committed zero crime. Under IT Act Sec 67A and BNS Sec 73, your identity is sealed.'}
                  </p>
                </div>
              </div>

              {/* Bottom Navigation for Step 1 */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-[#D2CCE7]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{isHindi ? 'चरण 1 पूरा: अब अपनी स्थिति पहचानें' : 'Stabilization verified: Ready to identify threat'}</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => markStepCompleteAndAdvance(1, 2)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#0F6E56] hover:bg-[#0A4E3D] text-white font-bold text-xs sm:text-sm transition-all shadow-soft active:scale-97 min-h-[44px]"
                  >
                    <span>{isHindi ? 'आगे बढ़ें: खतरा व रोकथाम (चरण 2) →' : 'Proceed to Step 2: Assess Threat →'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STEP 2: THREAT ASSESSMENT & TAILORED CONTAINMENT                          */}
          {/* ========================================================================= */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="space-y-1">
                <div className="text-xs font-bold text-[#F3C5D6] uppercase tracking-wider">
                  {isHindi ? 'चरण 2: संकट की सटीक पहचान व तत्काल रोकथाम' : 'Step 2: Identify Your Threat & Instant Containment'}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {isHindi ? 'अभी आपके साथ क्या हो रहा है?' : 'What is the blackmailer doing right now?'}
                </h2>
                <p className="text-xs sm:text-sm text-[#D2CCE7]">
                  {isHindi 
                    ? 'नीचे से अपना मामला चुनें। आपको तुरंत सटीक कानूनी स्क्रिप्ट व रोकथाम का उपाय मिलेगा।'
                    : 'Select your situation below to unlock instant statutory copy-paste scripts and containment protocols.'}
                </p>
              </div>

              {/* Single-Choice Threat Selection List */}
              <div className="space-y-2.5">
                {scenariosList.map((item) => {
                  const isSelected = selectedScenario === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handleSelectScenario(item.key)}
                      className={`w-full p-4 rounded-2xl text-left transition-all cursor-pointer flex items-start justify-between gap-3 border ${
                        isSelected
                          ? 'bg-white/15 border-[#F3C5D6] ring-1 ring-[#F3C5D6] shadow-soft'
                          : 'bg-white/6 border-white/10 hover:bg-white/10 text-[#FAF8F3]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-white/10 shrink-0 mt-0.5">
                          {item.icon}
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-white">
                              {isHindi ? item.title.hi : item.title.en}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-[#D2CCE7]">
                              {isHindi ? item.badge.hi : item.badge.en}
                            </span>
                          </div>
                          <p className="text-xs text-[#D2CCE7] leading-relaxed">
                            {isHindi ? item.desc.hi : item.desc.en}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 pt-1">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#F3C5D6] bg-[#993556]' : 'border-white/30'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* TAILORED CONTAINMENT ACTION BOX (ACCORDING TO CHOSEN SCENARIO) */}
              <div className="p-5 rounded-2xl bg-[#1E1949] border border-white/15 space-y-4">
                {/* SCENARIO 1: COUNTDOWN EXTORTION */}
                {selectedScenario === 'countdown' && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                          <span>{isHindi ? 'तत्काल रोकथाम: धमकी देने वाला कौन है?' : 'Containment Script: Who is threatening you?'}</span>
                        </h3>
                        <p className="text-xs text-[#D2CCE7]">
                          {isHindi ? 'अनजान साइबर ठग और पूर्व परिचित के लिए अलग रणनीति होती है।' : 'Scammers and known ex-partners require different psychological handling.'}
                        </p>
                      </div>

                      {/* Perpetrator Toggle */}
                      <div className="flex items-center p-1 bg-white/10 rounded-full border border-white/15 self-start sm:self-auto">
                        <button
                          type="button"
                          onClick={() => setPerpetratorType('anonymous_scammer')}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                            perpetratorType === 'anonymous_scammer' ? 'bg-[#993556] text-white shadow-xs' : 'text-[#D2CCE7] hover:text-white'
                          }`}
                        >
                          {isHindi ? 'अपरिचित ठग' : 'Unknown Scammer'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setPerpetratorType('known_person')}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                            perpetratorType === 'known_person' ? 'bg-[#993556] text-white shadow-xs' : 'text-[#D2CCE7] hover:text-white'
                          }`}
                        >
                          {isHindi ? 'परिचित / एक्स' : 'Known Contact'}
                        </button>
                      </div>
                    </div>

                    {/* Script Display */}
                    {perpetratorType === 'anonymous_scammer' ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                            <Scale className="w-3.5 h-3.5" />
                            <span>{isHindi ? 'कठोर कानूनी संदेश (1-क्लिक कॉपी करें व भेजें)' : 'Cold Statutory Freeze Notice (Copy & Send)'}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(freezeScript, setCopiedScript)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0F6E56] hover:bg-[#0A4E3D] text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
                          >
                            {copiedScript ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedScript ? (isHindi ? 'कॉपी हो गया' : 'Copied') : (isHindi ? 'संदेश कॉपी करें' : 'Copy Notice')}</span>
                          </button>
                        </div>
                        <p className="text-xs text-[#FAF8F3]/90 font-mono bg-black/30 p-3 rounded-xl border border-white/10 leading-relaxed whitespace-pre-wrap max-h-36 overflow-y-auto">
                          {freezeScript}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{isHindi ? 'समय बढ़ाने वाला संदेश (ग्रे-रॉक डिले)' : 'Gray-Rock Delay Script (Buys 12 Hours)'}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(grayRockScript, setCopiedDelayScript)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#993556] hover:bg-[#7A2843] text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
                          >
                            {copiedDelayScript ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedDelayScript ? (isHindi ? 'कॉपी हो गया' : 'Copied') : (isHindi ? 'संदेश कॉपी करें' : 'Copy Script')}</span>
                          </button>
                        </div>
                        <p className="text-xs text-[#FAF8F3]/90 font-mono bg-black/30 p-3 rounded-xl border border-white/10 leading-relaxed whitespace-pre-wrap">
                          {grayRockScript}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* SCENARIO 2: ALREADY PAID (GOLDEN HOUR) */}
                {selectedScenario === 'paid' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                      <h3 className="text-sm sm:text-base font-bold text-white">
                        {isHindi ? 'गोल्डन ऑवर प्रोटोकॉल: तुरंत 1930 डायल करें' : 'Golden Hour Protocol: Immediate 1930 Bank Freeze'}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#D2CCE7]">
                      {isHindi
                        ? 'पैसे ट्रांसफर के 2 घंटे के अंदर नेशनल साइबर हेल्पलाइन 1930 पर कॉल करने से नोडल ऑफिसर लाभार्थी के बैंक खाते में पैसा फ्रीज (Lien) कर देता है। और पैसे बिल्कुल न दें।'
                        : 'Reporting within 2 hours to National Cyber Helpline 1930 triggers an emergency lien on the recipient bank account. Do not pay any secondary demands.'}
                    </p>
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      <a
                        href="tel:1930"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm transition-all shadow-soft"
                      >
                        <PhoneCall className="w-4 h-4" />
                        <span>{isHindi ? '1930 पर कॉल करें (वित्तीय साइबर सेल)' : 'Call 1930 (Cyber Fraud Helpline)'}</span>
                      </a>
                      <a
                        href="https://cybercrime.gov.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm border border-white/20"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>cybercrime.gov.in</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* SCENARIO 3: LEAKED MEDIA */}
                {selectedScenario === 'leaked' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-red-300 flex items-center gap-1.5">
                        <FileCheck2 className="w-3.5 h-3.5" />
                        <span>{isHindi ? 'प्लेटफॉर्म/ग्रुप एडमिन हेतु 24-घंटे लीगल नोटिस' : '24-Hour Intermediary Takedown Notice (IT Rules)'}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(takedownNoticeScript, setCopiedTakedownScript)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
                      >
                        {copiedTakedownScript ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedTakedownScript ? (isHindi ? 'कॉपी हो गया' : 'Copied') : (isHindi ? 'नोटिस कॉपी करें' : 'Copy Notice')}</span>
                      </button>
                    </div>
                    <p className="text-xs text-[#FAF8F3]/90 font-mono bg-black/30 p-3 rounded-xl border border-white/10 leading-relaxed whitespace-pre-wrap max-h-36 overflow-y-auto">
                      {takedownNoticeScript}
                    </p>
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      <button
                        onClick={() => onNavigateToTab('takedown', 'platform-takedown-portal')}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{isHindi ? 'StopNCII हैश जनरेटर' : 'Open StopNCII Hub'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* SCENARIO 4: AI DEEPFAKE */}
                {selectedScenario === 'deepfake' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{isHindi ? 'डीपफेक कानूनी सूचना (IT Act 66D/67A & BNS 77)' : 'AI Deepfake Statutory Notice'}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(deepfakeNoticeScript, setCopiedDeepfakeScript)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0F6E56] hover:bg-[#0A4E3D] text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
                      >
                        {copiedDeepfakeScript ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedDeepfakeScript ? (isHindi ? 'कॉपी हो गया' : 'Copied') : (isHindi ? 'नोटिस कॉपी करें' : 'Copy Notice')}</span>
                      </button>
                    </div>
                    <p className="text-xs text-[#FAF8F3]/90 font-mono bg-black/30 p-3 rounded-xl border border-white/10 leading-relaxed whitespace-pre-wrap max-h-36 overflow-y-auto">
                      {deepfakeNoticeScript}
                    </p>
                  </div>
                )}

                {/* SCENARIO 5: STALKING / PHYSICAL THREAT */}
                {selectedScenario === 'danger_stalking' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                        <Radio className="w-3.5 h-3.5" />
                        <span>{isHindi ? 'अंतिम कानूनी चेतावनी संदेश (BNS 78/79)' : 'Cease & Desist Warning (Sec 78/79 BNS)'}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(stalkingCeaseScript, setCopiedStalkingScript)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
                      >
                        {copiedStalkingScript ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedStalkingScript ? (isHindi ? 'कॉपी हो गया' : 'Copied') : (isHindi ? 'चेतावनी कॉपी करें' : 'Copy Warning')}</span>
                      </button>
                    </div>
                    <p className="text-xs text-[#FAF8F3]/90 font-mono bg-black/30 p-3 rounded-xl border border-white/10 leading-relaxed whitespace-pre-wrap max-h-36 overflow-y-auto">
                      {stalkingCeaseScript}
                    </p>
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      <a
                        href="tel:112"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>{isHindi ? 'पुलिस 112' : 'Police 112'}</span>
                      </a>
                      <a
                        href="tel:1090"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#993556] hover:bg-[#7A2843] text-white text-xs font-bold"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>{isHindi ? 'महिला हेल्पलाइन 1090' : 'Women Helpline 1090'}</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* SCENARIO 6: POLICE FIR */}
                {selectedScenario === 'police' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                      <h3 className="text-sm sm:text-base font-bold text-white">
                        {isHindi ? 'पहचान सुरक्षा: BNS धारा 73 के तहत पूर्ण गोपनीयता' : 'Identity Protection: Strictly Sealed under Sec 73 BNS'}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#D2CCE7]">
                      {isHindi
                        ? 'पुलिस या मीडिया में पीड़िता का नाम, पता या कॉलेज उजागर करना गैर-कानूनी है (2 साल कारावास)। आप "सुश्री X" के नाम से शिकायत दर्ज करा सकती हैं और BNSS धारा 173 के तहत बयान केवल महिला अधिकारी दर्ज करेगी।'
                        : 'Disclosing the identity of a victim of intimate harassment is punishable by up to 2 years imprisonment. You have the statutory right to be addressed as Ms. X in all filings and have statements recorded by a woman officer.'}
                    </p>
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      <button
                        onClick={() => onNavigateToTab('report', 'complaint-draft-generator')}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#26215C] hover:bg-[#FAF8F3] text-xs font-bold"
                      >
                        <Scale className="w-3.5 h-3.5" />
                        <span>{isHindi ? 'FIR डोजियर जनरेटर' : 'Open FIR Generator'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Psychology Accordion */}
              <div>
                <button
                  onClick={() => setShowPsychology(!showPsychology)}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white/6 hover:bg-white/10 border border-white/12 text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#FAF8F3]">
                    <Sparkles className="w-4 h-4 text-[#F3C5D6]" />
                    <span>
                      {isHindi 
                        ? 'ब्लैकमेलर का मनोविज्ञान समझें: वह वास्तव में फोटो लीक क्यों नहीं करना चाहता?' 
                        : 'Understand Blackmailer Psychology: Why they dread actually leaking your photos'}
                    </span>
                  </div>
                  {showPsychology ? <ChevronUp className="w-4 h-4 text-[#D2CCE7]" /> : <ChevronDown className="w-4 h-4 text-[#D2CCE7]" />}
                </button>

                {showPsychology && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-4 mt-2 rounded-2xl bg-white/5 border border-white/10 text-xs text-[#D2CCE7] space-y-2 leading-relaxed"
                  >
                    <p>
                      {isHindi
                        ? '1. फोटो उसके पास केवल "लीवरेज" है। जैसे ही वह उसे लीक करता है, उसकी सारी ताकत हमेशा के लिए खत्म हो जाती है।'
                        : '1. The media is their leverage. The exact second they leak it, their bargaining power drops to zero forever.'}
                    </p>
                    <p>
                      {isHindi
                        ? '2. प्राइवेट ब्लैकमेल से सीधा 5 साल जेल का गैर-जमानती केस बन जाता है। पुलिस टेलीकॉम सर्वर से उसका IP और मोबाइल लोकेशन तुरंत निकाल सकती है।'
                        : '2. Once disseminated, it escalates to a non-bailable Section 67A IT Act case. Police obtain CDR, IMEI, and IP location immediately.'}
                    </p>
                    <p>
                      {isHindi
                        ? '3. जब आप पैसे देने से मना कर कानूनी नोटिस भेजती हैं, तो 90% से अधिक मामलों में अपराधी चैट डिलीट करके भाग जाता है।'
                        : '3. When the victim sends a cold statutory notice citing BNS and refuses to pay, over 90% of opportunistic extortionists abort.'}
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Bottom Navigation for Step 2 */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => goToStep(1)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm transition-colors border border-white/20 min-h-[44px]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{isHindi ? 'चरण 1 पर वापस' : 'Back to Step 1'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => markStepCompleteAndAdvance(2, 3)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0F6E56] hover:bg-[#0A4E3D] text-white font-bold text-xs sm:text-sm transition-all shadow-soft active:scale-97 min-h-[44px]"
                >
                  <span>{isHindi ? 'आगे बढ़ें: साक्ष्य सुरक्षा (चरण 3) →' : 'Proceed to Step 3: Secure Evidence →'}</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STEP 3: 2-MINUTE COURT-VALID EVIDENCE PRESERVATION                        */}
          {/* ========================================================================= */}
          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <div className="text-xs font-bold text-[#F3C5D6] uppercase tracking-wider">
                  {isHindi ? 'चरण 3: न्यायालय-मान्य साक्ष्य सुरक्षा' : 'Step 3: 2-Minute Court Proof Preservation'}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {isHindi ? 'ब्लॉक करने से पहले 3 बिना-क्रॉप किए स्क्रीनशॉट लें' : 'Take 3 Uncropped Screenshots Before Blocking'}
                </h2>
                <p className="text-xs sm:text-sm text-[#D2CCE7]">
                  {isHindi 
                    ? 'अपराधी को म्यूट या ब्लॉक करने से पहले ये 3 साक्ष्य सुरक्षित करना आवश्यक है। भारतीय साक्ष्य अधिनियम (BSA 63) के तहत पूर्ण स्क्रीन की घड़ी व तारीख कोर्ट में मान्य होती है।'
                    : 'Do not block yet. Preserve these 3 full uncropped screenshots. Under Section 63 of Bharatiya Sakshya Adhiniyam, top phone status bar timestamps ensure court admissibility.'}
                </p>
              </div>

              {/* 3 Interactive Evidence Checkpoints */}
              <div className="space-y-3">
                {/* Shot 1 */}
                <div 
                  onClick={() => toggleEvidenceCheck('profile')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    evidenceChecks.profile ? 'bg-emerald-950/30 border-emerald-500/50' : 'bg-white/6 border-white/12 hover:bg-white/10'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-amber-300" />
                      <span className="text-sm font-bold text-white">
                        {isHindi ? 'स्क्रीनशॉट 1: अपराधी का मोबाइल नंबर, हैंडल व बायो' : 'Screenshot 1: Attacker Phone Number or Profile Bio'}
                      </span>
                    </div>
                    <p className="text-xs text-[#D2CCE7] leading-relaxed">
                      {isHindi
                        ? 'चैट का सबसे ऊपरी हिस्सा जहां उसका पूरा मोबाइल नंबर (+91...) या इंस्टाग्राम/टेलीग्राम प्रोफाइल बायो दिखे। इसी से पुलिस कॉल रिकॉर्ड (CDR) निकलवाती है।'
                        : 'Top of the chat showing full phone number (+91...) or Instagram/Telegram handle and profile link for telecom subpoenas.'}
                    </p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                    evidenceChecks.profile ? 'border-emerald-400 bg-emerald-600 text-white' : 'border-white/30'
                  }`}>
                    {evidenceChecks.profile && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>

                {/* Shot 2 */}
                <div 
                  onClick={() => toggleEvidenceCheck('threatMessage')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    evidenceChecks.threatMessage ? 'bg-emerald-950/30 border-emerald-500/50' : 'bg-white/6 border-white/12 hover:bg-white/10'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-rose-300" />
                      <span className="text-sm font-bold text-white">
                        {isHindi ? 'स्क्रीनशॉट 2: धमकी भरा संदेश व फोन की पूरी घड़ी (No Crop)' : 'Screenshot 2: Threat Message with Phone Clock (DO NOT CROP)'}
                      </span>
                    </div>
                    <p className="text-xs text-[#D2CCE7] leading-relaxed">
                      {isHindi
                        ? 'स्क्रीन को क्रॉप न करें! फोन के ऊपर दिखने वाला समय (घड़ी), बैटरी प्रतिशत और तारीख दिखना जरूरी है ताकि कोई छेड़छाड़ का आरोप न लगा सके।'
                        : 'DO NOT CROP! The top phone bar (clock, battery level, network, and date) MUST be visible to prevent tampering challenges in court.'}
                    </p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                    evidenceChecks.threatMessage ? 'border-emerald-400 bg-emerald-600 text-white' : 'border-white/30'
                  }`}>
                    {evidenceChecks.threatMessage && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>

                {/* Shot 3 */}
                <div 
                  onClick={() => toggleEvidenceCheck('paymentHandle')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    evidenceChecks.paymentHandle ? 'bg-emerald-950/30 border-emerald-500/50' : 'bg-white/6 border-white/12 hover:bg-white/10'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-teal-300" />
                      <span className="text-sm font-bold text-white">
                        {isHindi ? 'स्क्रीनशॉट 3: पैसे मांगने का UPI ID या QR कोड' : 'Screenshot 3: The Payment Demand / UPI / QR Code'}
                      </span>
                    </div>
                    <p className="text-xs text-[#D2CCE7] leading-relaxed">
                      {isHindi
                        ? 'जिस UPI ID, फोन नंबर, बारकोड या बैंक खाते में उसने पैसे ट्रांसफर करने को कहा है। 1930 पर कॉल करते ही पुलिस इसी UPI को तुरंत फ्रीज करती है।'
                        : 'The exact UPI ID (e.g. name@bank), QR code, or phone number he provided. Helpline 1930 freezes this account.'}
                    </p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                    evidenceChecks.paymentHandle ? 'border-emerald-400 bg-emerald-600 text-white' : 'border-white/30'
                  }`}>
                    {evidenceChecks.paymentHandle && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </div>

              {/* Tip on safe storage */}
              <div className="p-3.5 rounded-2xl bg-white/6 border border-white/12 flex items-center gap-3 text-xs text-[#D2CCE7]">
                <ShieldCheck className="w-5 h-5 text-emerald-300 shrink-0" />
                <span>
                  {isHindi
                    ? 'सुरक्षा सुझाव: इन स्क्रीनशॉट को अपने फोन के हिडन एल्बम में रखें या किसी निजी गुप्त ईमेल पर सुरक्षित रख लें।'
                    : 'Safety Tip: Keep these 3 uncropped screenshots in a hidden secure folder or email them to a private secure account.'}
                </span>
              </div>

              {/* Bottom Navigation for Step 3 */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => goToStep(2)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm transition-colors border border-white/20 min-h-[44px]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{isHindi ? 'चरण 2 पर वापस' : 'Back to Step 2'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => markStepCompleteAndAdvance(3, 4)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0F6E56] hover:bg-[#0A4E3D] text-white font-bold text-xs sm:text-sm transition-all shadow-soft active:scale-97 min-h-[44px]"
                >
                  <span>{isHindi ? 'आगे बढ़ें: सीधी कार्रवाई (चरण 4) →' : 'Proceed to Step 4: Take Action →'}</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STEP 4: DIRECT ACTIONS & STATUTORY REMEDIES                               */}
          {/* ========================================================================= */}
          {currentStep === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <div className="text-xs font-bold text-[#F3C5D6] uppercase tracking-wider">
                  {isHindi ? 'चरण 4: सीधी कार्रवाई और विधिक उपाय' : 'Step 4: Take Direct Action & Legal Remedies'}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {isHindi ? 'नियंत्रण वापस लें: आवश्यक कार्रवाई शुरू करें' : 'Take Back Control: Execute Immediate Action'}
                </h2>
                <p className="text-xs sm:text-sm text-[#D2CCE7]">
                  {isHindi 
                    ? 'आपने स्थिति समझ ली है और साक्ष्य सुरक्षित कर लिए हैं। अब नीचे दिए गए उपायों में से अपनी प्राथमिकता चुनें:'
                    : 'Evidence is secured and threat is contained. Choose your prioritized immediate remedy below:'}
                </p>
              </div>

              {/* Action Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* 1. StopNCII / TakeItDown Hub */}
                <div className="p-4 rounded-2xl bg-white/6 border border-white/12 space-y-3 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                      <ShieldCheck className="w-4 h-4" />
                      <span>{isHindi ? 'StopNCII हैश सुरक्षा हब' : 'StopNCII Pre-emptive Hashing'}</span>
                    </div>
                    <p className="text-xs text-[#D2CCE7] leading-relaxed">
                      {isHindi
                        ? 'अपने डिवाइस पर फोटो का डिजिटल हैश (फिंगरप्रिंट) बनाएं। मूल फोटो कभी अपलोड नहीं होती। मेटा, थ्रेड्स और अन्य साइट्स पर अपलोड स्वतः ब्लॉक हो जाएगा।'
                        : 'Generates a unique cryptographic hash on your device. Original photo never leaves your phone. Blocks dissemination across Meta, Threads, OnlyFans.'}
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigateToTab('takedown', 'platform-takedown-portal')}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#0F6E56] hover:bg-[#0A4E3D] text-white text-xs font-bold transition-all"
                  >
                    <span>{isHindi ? 'StopNCII पोर्टल खोलें' : 'Open StopNCII Hub'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 2. 24-Hour Intermediary Notice */}
                <div className="p-4 rounded-2xl bg-white/6 border border-white/12 space-y-3 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                      <FileCheck2 className="w-4 h-4" />
                      <span>{isHindi ? '24-घंटे Takedown नोटिस' : '24-Hour Intermediary Takedown'}</span>
                    </div>
                    <p className="text-xs text-[#D2CCE7] leading-relaxed">
                      {isHindi
                        ? 'IT Rules के नियम 3(2)(b) के तहत टेलीग्राम, मेटा, व्हाट्सएप के शिकायत अधिकारी को 24 घंटे के अंदर अश्लील सामग्री हटाने का कानूनी नोटिस भेजें।'
                        : 'Rule 3(2)(b) of IT Rules 2021 mandates platforms remove intimate imagery within 24 hours of receiving notice.'}
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigateToTab('takedown', 'platform-takedown-portal')}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#993556] hover:bg-[#7A2843] text-white text-xs font-bold transition-all"
                  >
                    <span>{isHindi ? 'प्लेटफॉर्म Takedown खोलें' : 'Platform Grievance Portals'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 3. Police FIR Generator */}
                <div className="p-4 rounded-2xl bg-white/6 border border-white/12 space-y-3 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-teal-300 font-bold text-sm">
                      <Scale className="w-4 h-4" />
                      <span>{isHindi ? 'गोपनीय साइबर FIR ड्राफ्ट' : 'Confidential Police FIR Dossier'}</span>
                    </div>
                    <p className="text-xs text-[#D2CCE7] leading-relaxed">
                      {isHindi
                        ? 'BNS धारा 73 के तहत पूर्ण सील पहचान ("सुश्री X") के साथ तैयार औपचारिक शिकायत। IT Act 67A व BNS 308(2) धाराओं सहित प्रिंट या कॉपी करें।'
                        : 'Pre-formatted legal complaint draft with sealed identity under Section 73 BNS. Cites non-bailable felony provisions.'}
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigateToTab('report', 'complaint-draft-generator')}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white text-[#26215C] hover:bg-[#FAF8F3] text-xs font-bold transition-all"
                  >
                    <span>{isHindi ? 'शिकायत ड्राफ्ट तैयार करें' : 'Generate FIR Complaint'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 4. National Helplines */}
                <div className="p-4 rounded-2xl bg-white/6 border border-white/12 space-y-3 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                      <PhoneCall className="w-4 h-4" />
                      <span>{isHindi ? '24/7 राष्ट्रीय हेल्पलाइन' : '24/7 National Emergency Helplines'}</span>
                    </div>
                    <p className="text-xs text-[#D2CCE7] leading-relaxed">
                      {isHindi
                        ? '1930 (वित्तीय साइबर फ्रॉड), 1090 (महिला पावर लाइन), 112 (आपातकालीन पुलिस) और 1800-599-0019 (किरण मानसिक स्वास्थ्य सहारा)।'
                        : '1930 (Cyber Fraud & Bank Freeze), 1090 (Women Power Line), 112 (Emergency Police), and 1800-599-0019 (KIRAN Mental Health).'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href="tel:1930"
                      className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold transition-all"
                    >
                      <PhoneCall className="w-3 h-3" />
                      <span>1930</span>
                    </a>
                    <a
                      href="tel:1090"
                      className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-full bg-[#993556] hover:bg-[#7A2843] text-white text-xs font-bold transition-all"
                    >
                      <PhoneCall className="w-3 h-3" />
                      <span>1090</span>
                    </a>
                    <a
                      href="tel:112"
                      className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all"
                    >
                      <PhoneCall className="w-3 h-3" />
                      <span>112</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom Navigation for Step 4 */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => goToStep(3)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm transition-colors border border-white/20 min-h-[44px]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{isHindi ? 'चरण 3 पर वापस' : 'Back to Step 3'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => goToStep(1)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF8F3] text-xs sm:text-sm font-medium transition-colors border border-white/20 min-h-[44px]"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#F3C5D6]" />
                  <span>{isHindi ? 'पाथ पुनः प्रारंभ करें' : 'Start Path Again'}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Discreet Legal Non-Affiliation Safeguard */}
      <div className="mt-4 text-center px-4">
        <p className="text-[11px] text-[#85819C] leading-relaxed max-w-3xl mx-auto">
          <span>{LEGAL_DISCLAIMER.short[language]} — </span>
          <a
            href={`#${LEGAL_DISCLAIMER.anchorId}`}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(LEGAL_DISCLAIMER.anchorId);
              el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="text-[#FAF8F3] hover:underline font-semibold underline-offset-2"
          >
            {LEGAL_DISCLAIMER.linkText[language]}
          </a>
        </p>
      </div>

      {/* Minor / POCSO Guidance Modal */}
      <PocsoMinorShieldModal
        isOpen={showPocsoModal}
        onClose={() => setShowPocsoModal(false)}
        language={language}
      />
    </section>
  );
};
