import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  MapPin, 
  PhoneCall, 
  ExternalLink, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Baby, 
  HeartHandshake, 
  ShieldCheck, 
  X,
  Lock,
  MessageSquare
} from 'lucide-react';
import { Language, IncidentCategory } from '../types';
import { CrisisScenarioKey } from './EmergencyCockpit';
import { STATE_CYBER_CELLS } from '../data/stateCyberCellsData';
import { detectCurrentStateOnDevice } from '../utils/localGeocode';
import { hapticAction } from '../utils/haptics';

interface RecommendedSituationCardProps {
  language: Language;
  selectedScenario?: CrisisScenarioKey | string;
  selectedCategory?: IncidentCategory;
  onNavigateToTab: (tab: string, elementId?: string) => void;
  onBrowseStateServices: (targetState?: string) => void;
}

const SESSION_DETECTED_STATE_KEY = 'suraksha_session_detected_state_v1';
const CONFIRM_PROMPT_DISMISSED_KEY = 'suraksha_loc_confirm_dismissed_v1';

export const RecommendedSituationCard: React.FC<RecommendedSituationCardProps> = ({
  language,
  selectedScenario = 'countdown',
  selectedCategory,
  onNavigateToTab,
  onBrowseStateServices,
}) => {
  const isHindi = language === 'hi';

  // Permission state: 'granted' | 'prompt' | 'denied' | 'unsupported'
  const [permissionState, setPermissionState] = useState<'granted' | 'prompt' | 'denied' | 'unsupported'>('unsupported');
  // Confirmed detected state in current session (sessionStorage only, never persistent across sessions)
  const [confirmedState, setConfirmedState] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem(SESSION_DETECTED_STATE_KEY);
    } catch {
      return null;
    }
  });

  // Candidate state detected after user consented to show
  const [candidateState, setCandidateState] = useState<string | null>(null);
  // Visible confirmation banner visibility for already granted permission
  const [showGrantedConfirmBanner, setShowGrantedConfirmBanner] = useState<boolean>(false);
  const [isDetecting, setIsDetecting] = useState<boolean>(false);
  const [manualSelectOpen, setManualSelectOpen] = useState<boolean>(false);

  // Check browser-level permission status on mount
  useEffect(() => {
    let isMounted = true;

    async function checkPermission() {
      if (typeof navigator !== 'undefined' && 'permissions' in navigator && navigator.permissions?.query) {
        try {
          const status = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
          if (!isMounted) return;

          setPermissionState(status.state as any);

          // If permission is already granted and user hasn't yet confirmed or dismissed in this section
          if (status.state === 'granted') {
            const alreadyConfirmed = sessionStorage.getItem(SESSION_DETECTED_STATE_KEY);
            const alreadyDismissed = sessionStorage.getItem(CONFIRM_PROMPT_DISMISSED_KEY);
            if (!alreadyConfirmed && !alreadyDismissed) {
              setShowGrantedConfirmBanner(true);
            }
          }

          status.onchange = () => {
            if (isMounted) {
              setPermissionState(status.state as any);
            }
          };
        } catch {
          // Permissions API might throw on unsupported browsers
          if (isMounted) setPermissionState('unsupported');
        }
      }
    }

    checkPermission();

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle user confirming the "You've already allowed location access — show your state's emergency number now?"
  const handleUserAcceptsGrantedLocation = async () => {
    hapticAction();
    setIsDetecting(true);
    setShowGrantedConfirmBanner(false);

    try {
      const res = await detectCurrentStateOnDevice();
      setIsDetecting(false);
      if (res.state) {
        setConfirmedState(res.state);
        try {
          sessionStorage.setItem(SESSION_DETECTED_STATE_KEY, res.state);
        } catch {}
      }
    } catch {
      setIsDetecting(false);
    }
  };

  const handleUserDeclinesGrantedLocation = () => {
    hapticAction();
    setShowGrantedConfirmBanner(false);
    try {
      sessionStorage.setItem(CONFIRM_PROMPT_DISMISSED_KEY, 'true');
    } catch {}
  };

  const handleManualStateSelect = (stateName: string) => {
    hapticAction();
    setConfirmedState(stateName);
    try {
      sessionStorage.setItem(SESSION_DETECTED_STATE_KEY, stateName);
    } catch {}
    setManualSelectOpen(false);
  };

  const handleClearLocation = () => {
    hapticAction();
    setConfirmedState(null);
    try {
      sessionStorage.removeItem(SESSION_DETECTED_STATE_KEY);
    } catch {}
  };

  // Find state cell information if state is confirmed
  const stateCell = confirmedState 
    ? STATE_CYBER_CELLS.find(
        (c) => c.stateName.en.toLowerCase() === confirmedState.toLowerCase() || 
               c.stateName.hi === confirmedState ||
               c.stateName.en.toLowerCase().includes(confirmedState.toLowerCase())
      )
    : null;

  // Determine normalized scenario
  const isPhysicalDanger = selectedScenario === 'danger_stalking';
  const isPaidMoney = selectedScenario === 'paid';
  const isLeakedOrDeepfake = selectedScenario === 'leaked' || selectedScenario === 'deepfake' || selectedCategory === 'ai_deepfake_morph' || selectedCategory === 'viral_leaked' || selectedCategory === 'ncii_distribution';
  const isMinor = selectedCategory === 'known_person_threats' || selectedScenario === 'police'; // Or user indicates minor context

  // Scenario title and description
  const getScenarioLabel = () => {
    switch (selectedScenario) {
      case 'danger_stalking':
        return {
          tag: isHindi ? 'शारीरिक खतरा व पीछा करना' : 'Physical Danger & Stalking',
          headline: isHindi ? 'तात्कालिक शारीरिक सुरक्षा व पुलिस हस्तक्षेप' : 'Immediate Physical Safety & Police Dispatch'
        };
      case 'paid':
        return {
          tag: isHindi ? 'पैसे दे चुके हैं' : 'Already Paid Money',
          headline: isHindi ? 'वित्तीय धोखाधड़ी रिकवरी व खाता सुरक्षा' : 'Cyber Financial Recovery & Immediate Freeze'
        };
      case 'deepfake':
        return {
          tag: isHindi ? 'AI डीपफेक / मॉर्फ' : 'AI Deepfake / Morphed Media',
          headline: isHindi ? 'डीपफेक निरोध व प्लेटफॉर्म निष्कासन' : 'Deepfake Containment & Evidence Logging'
        };
      case 'leaked':
        return {
          tag: isHindi ? 'मीडिया लीक हो चुका है' : 'Media Leaked / Distributed',
          headline: isHindi ? 'वैश्विक सामग्री निष्कासन व टेकडाउन' : 'Rapid Hash Removal & Digital Containment'
        };
      case 'police':
        return {
          tag: isHindi ? 'पुलिस शिकायत' : 'Police / Legal Support',
          headline: isHindi ? 'सत्यापित कानूनी कार्रवाई व सुरक्षा' : 'Police Complaint & Zero-FIR Filing'
        };
      case 'countdown':
      default:
        return {
          tag: isHindi ? 'सक्रिय ब्लैकमेल व धमकी' : 'Active Extortion & Threats',
          headline: isHindi ? 'ब्लैकमेल रोकें व कानूनी नोटिस भेजें' : 'Stop The Extortionist & Preserve Proof'
        };
    }
  };

  const scenarioMeta = getScenarioLabel();

  return (
    <div className="rounded-2xl bg-gradient-to-br from-white via-[#FCFBF8] to-[#FAF8F3] border-2 border-[#0F6E56]/25 p-4 sm:p-5 shadow-sm space-y-4">
      {/* Top Bar: Reassurance + Scenario Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-[#E8E2DC]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#0F6E56]/10 text-[#0F6E56] flex items-center justify-center shrink-0">
            <Compass className="w-4 h-4 text-[#0F6E56]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm sm:text-base font-bold text-[#1A1A1A]">
                {isHindi ? 'आपकी स्थिति के लिए अनुशंसित कदम' : 'Recommended for your situation'}
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0F6E56]/10 text-[#0F6E56] border border-[#0F6E56]/20">
                {scenarioMeta.tag}
              </span>
            </div>
            <p className="text-[11px] text-[#666]">
              {isHindi 
                ? 'आपके द्वारा चुने गए संकट परिदृश्य और आपके स्थान के आधार पर 1-3 सबसे ज़रूरी कदम।' 
                : '1-3 immediate high-priority actions based on your crisis scenario and location.'}
            </p>
          </div>
        </div>

        {/* Location Tag / Selector Button */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          {confirmedState ? (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-200 text-teal-900 text-[11px] font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#0F6E56] shrink-0" />
              <span className="font-semibold text-[#0F6E56]">{confirmedState}</span>
              <button
                type="button"
                onClick={handleClearLocation}
                className="text-teal-700 hover:text-teal-950 ml-1 p-0.5 hover:bg-teal-100 rounded cursor-pointer"
                title={isHindi ? 'स्थान बदलें' : 'Change location'}
                aria-label={isHindi ? 'स्थान बदलें' : 'Change location'}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setManualSelectOpen(prev => !prev)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#D8CFCE] text-[#555] hover:text-[#1A1A1A] hover:bg-[#F3EFEA] text-[11px] font-medium transition-colors cursor-pointer"
            >
              <MapPin className="w-3 h-3 text-[#8B6D5C]" />
              <span>{isHindi ? 'राज्य चुनें (+स्थानीय नंबर)' : 'Add State / UT'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Item 2: Explicit Confirmation for Already Granted Geolocation Permission */}
      {showGrantedConfirmBanner && !confirmedState && (
        <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-start gap-2.5 min-w-0">
            <div className="w-6 h-6 rounded-md bg-[#0F6E56] text-white flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-teal-950 leading-tight">
                {isHindi 
                  ? 'आपने पहले ही लोकेशन की अनुमति दी हुई है — क्या अब आपके राज्य का आपातकालीन नंबर दिखाएं?' 
                  : "You've already allowed location access — show your state's emergency number now?"}
              </p>
              <p className="text-[10px] text-teal-800 mt-0.5">
                {isHindi 
                  ? 'यह गणना 100% आपके डिवाइस पर ऑफलाइन होगी। आपका स्थान सर्वर पर कभी नहीं भेजा जाता।' 
                  : 'Computed 100% on-device offline. Never sent to any server or stored across sessions.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <button
              type="button"
              disabled={isDetecting}
              onClick={handleUserAcceptsGrantedLocation}
              className="px-3 py-1.5 rounded-lg bg-[#0F6E56] hover:bg-[#0B5441] text-white font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-75 shadow-xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isDetecting ? (isHindi ? 'पहचान रहे हैं...' : 'Detecting...') : (isHindi ? 'हाँ, दिखाएं' : 'Yes, show my state')}</span>
            </button>
            <button
              type="button"
              onClick={handleUserDeclinesGrantedLocation}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-teal-200 text-teal-800 hover:bg-teal-100 text-xs font-medium cursor-pointer"
            >
              {isHindi ? 'नहीं, मैन्युअली चुनूंगा' : 'No, I’ll choose manually'}
            </button>
          </div>
        </div>
      )}

      {/* Manual State Select Quick Dropdown if opened */}
      {manualSelectOpen && !confirmedState && (
        <div className="p-3 bg-white border border-[#E8E2DC] rounded-xl space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[#1A1A1A]">
              {isHindi ? 'अपना राज्य या केंद्रशासित प्रदेश चुनें:' : 'Select your State or Union Territory:'}
            </span>
            <button 
              type="button"
              onClick={() => setManualSelectOpen(false)}
              className="p-1 text-[#888] hover:text-[#111]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="max-h-40 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-1.5 pr-1">
            {STATE_CYBER_CELLS.map((cell) => (
              <button
                key={cell.id}
                type="button"
                onClick={() => handleManualStateSelect(cell.stateName.en)}
                className="text-left px-2 py-1.5 rounded-md hover:bg-[#FAF8F3] border border-transparent hover:border-[#E8E2DC] truncate text-[11px] text-[#333] transition-colors cursor-pointer"
              >
                {cell.stateName[language]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* DIRECTLY RELEVANT ACTIONS: Compiled, never replaced */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${stateCell ? 'lg:grid-cols-2 xl:grid-cols-4' : 'lg:grid-cols-3'} gap-3`}>
        {/* ACTION 1: SCENARIO-DRIVEN PRIMARY CALL */}
        {isPhysicalDanger ? (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex flex-col justify-between space-y-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                  {isHindi ? 'तात्कालिक खतरा' : 'Immediate Danger'}
                </span>
                <span className="font-mono text-xs font-bold text-rose-900">24x7</span>
              </div>
              <h4 className="text-sm font-bold text-rose-950">
                {isHindi ? 'तुरंत 112 पर कॉल करें' : 'Call 112 (Police PCR)'}
              </h4>
              <p className="text-[11px] text-rose-800 leading-snug">
                {isHindi 
                  ? 'ब्लैकमेलर बाहर मौजूद है, पीछा कर रहा है या शारीरिक नुकसान की आशंका है।' 
                  : 'Stalker near your location, following you, or posing imminent physical harm.'}
              </p>
            </div>
            <a
              href="tel:112"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{isHindi ? '112 डायल करें' : 'Call 112 Now'}</span>
            </a>
          </div>
        ) : isPaidMoney ? (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col justify-between space-y-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  {isHindi ? 'वित्तीय धोखाधड़ी' : 'Financial Fraud'}
                </span>
                <span className="font-mono text-xs font-bold text-emerald-800">MHA 1930</span>
              </div>
              <h4 className="text-sm font-bold text-emerald-950">
                {isHindi ? 'कॉल 1930 — तुरंत रिपोर्ट करें' : 'Call 1930 Immediately'}
              </h4>
              <p className="text-[11px] text-emerald-800 leading-snug">
                {isHindi 
                  ? 'ट्रांजेक्शन को बैंक व नोडल स्तर पर तुरंत फ्रीज कराने के लिए 1930 पर तुरंत कॉल करें।' 
                  : 'Report cyber financial fraud immediately to trigger bank account freeze within golden hours.'}
              </p>
            </div>
            <a
              href="tel:1930"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#0F6E56] hover:bg-[#0B5441] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{isHindi ? '1930 डायल करें' : 'Call 1930 Now'}</span>
            </a>
          </div>
        ) : isLeakedOrDeepfake ? (
          <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 flex flex-col justify-between space-y-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                  {isHindi ? 'सामग्री हटाना' : 'Content Containment'}
                </span>
                <span className="font-mono text-xs font-bold text-purple-900">StopNCII</span>
              </div>
              <h4 className="text-sm font-bold text-purple-950">
                {isHindi ? 'StopNCII व टेकडाउन पोर्टल' : 'StopNCII & Platform Removal'}
              </h4>
              <p className="text-[11px] text-purple-800 leading-snug">
                {isHindi 
                  ? 'फोटो को बिना अपलोड किए डिजिटल हैश बनाकर सोशल मीडिया व सर्च इंजनों से हमेशा के लिए रोकें।' 
                  : 'Generate on-device hashes to proactively block distribution across Meta, Instagram, and web portals.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateToTab('takedown')}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#26215C] hover:bg-[#1A1644] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isHindi ? 'टेकडाउन पोर्टल खोलें' : 'Open Takedown Hub'}</span>
            </button>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 flex flex-col justify-between space-y-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                  {isHindi ? 'साइबर सुरक्षा' : 'Cyber Security'}
                </span>
                <span className="font-mono text-xs font-bold text-teal-800">1930</span>
              </div>
              <h4 className="text-sm font-bold text-teal-950">
                {isHindi ? 'राष्ट्रीय साइबर हेल्पलाइन 1930' : 'National Cyber Helpline 1930'}
              </h4>
              <p className="text-[11px] text-teal-800 leading-snug">
                {isHindi 
                  ? 'ब्लैकमेल की शिकायत दर्ज करने व स्थानीय साइबर सेल को केस ट्रांसफर कराने के लिए कॉल करें।' 
                  : 'Toll-free 24/7 official assistance for online extortion, threats, and cybercrime dispatch.'}
              </p>
            </div>
            <a
              href="tel:1930"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#0F6E56] hover:bg-[#0B5441] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{isHindi ? '1930 डायल करें' : 'Call 1930'}</span>
            </a>
          </div>
        )}

        {/* ACTION 2: 181 WOMEN HELPLINE (MISSION SHAKTI) — ALWAYS VISIBLE */}
        <div className="p-3.5 rounded-xl bg-white border border-[#E8E2DC] flex flex-col justify-between space-y-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#26215C] bg-[#E1F5EE] px-2 py-0.5 rounded">
                Mission Shakti
              </span>
              <span className="text-[10px] text-[#777] font-semibold">24x7 Toll-Free</span>
            </div>
            <h4 className="text-sm font-bold text-[#1A1A1A]">
              {stateCell?.id === 'west_bengal'
                ? (isHindi ? '1091 महिला हेल्पलाइन (पश्चिम बंगाल)' : '1091 Women Helpline (West Bengal)')
                : (isHindi ? '181 महिला हेल्पलाइन (सखी OSC)' : '181 Women Helpline (Sakhi OSC)')}
            </h4>
            <p className="text-[11px] text-[#666] leading-snug">
              {stateCell?.id === 'west_bengal'
                ? (isHindi 
                    ? 'पश्चिम बंगाल में 181 लाइन संचालित नहीं है; राज्य पुलिस महिला हेल्पलाइन 1091 व 112 पर सेवाएं उपलब्ध हैं।' 
                    : '181 line is not operational in WB per WCD; WB Police operates 1091 and 112 for women safety.')
                : (isHindi 
                    ? 'संकट में घिरी महिलाओं के लिए 24×7 सहायता — पुलिस (112) व वन स्टॉप सेंटर से तत्काल समन्वय।' 
                    : 'Universal 24×7 crisis response for women; coordinates 112 police and district One Stop Centres.')}
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            {stateCell?.id === 'west_bengal' ? (
              <div className="flex items-center gap-2">
                <a
                  href="tel:1091"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#26215C] hover:bg-[#1A1644] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{isHindi ? 'कॉल 1091 (WB)' : 'Call 1091 (WB)'}</span>
                </a>
                <a
                  href="tel:181"
                  className="inline-flex items-center justify-center px-2.5 py-2 rounded-lg bg-[#FAF8F3] hover:bg-[#F3EFEA] border border-[#E8E2DC] text-[#26215C] text-xs font-semibold transition-colors cursor-pointer"
                  title="National 181"
                >
                  <span>181</span>
                </a>
              </div>
            ) : (
              <a
                href="tel:181"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#FAF8F3] hover:bg-[#F3EFEA] border border-[#E8E2DC] text-[#26215C] text-xs font-bold transition-colors cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#26215C]" />
                <span>{isHindi ? '181 कॉल करें' : 'Call 181'}</span>
              </a>
            )}
          </div>
        </div>

        {/* ACTION 3: COMPLEMENTARY LEGAL / MINOR / MENTAL HEALTH ROUTE — ALWAYS VISIBLE */}
        <div className="p-3.5 rounded-xl bg-white border border-[#E8E2DC] flex flex-col justify-between space-y-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B6D5C] bg-[#FAF8F3] px-2 py-0.5 rounded border border-[#E8E2DC]">
                {isMinor ? (isHindi ? 'POCSO / नाबालिग' : 'POCSO / Under 18') : (isHindi ? 'मानसिक शांति' : 'Trauma Aid')}
              </span>
              <span className="text-[10px] text-[#777] font-semibold">
                {isMinor ? '1098' : '14416'}
              </span>
            </div>
            <h4 className="text-sm font-bold text-[#1A1A1A]">
              {isMinor 
                ? (isHindi ? 'चाइल्डलाइन / POCSO (1098)' : 'CHILDLINE / POCSO (1098)')
                : (isHindi ? 'टेली-मानस आघात सहायता (14416)' : 'Tele-MANAS Panic First-Aid (14416)')}
            </h4>
            <p className="text-[11px] text-[#666] leading-snug">
              {isMinor 
                ? (isHindi ? '18 वर्ष से कम आयु की बालिकाओं के लिए पूर्ण पहचान गोपनीयता व संरक्षण।' : 'Strict statutory identity sealing, protective counseling & legal shield under POCSO.')
                : (isHindi ? 'गंभीर डर, कंपकंपी या घबराहट के समय 100% गोपनीय व मुफ्त मनोवैज्ञानिक परामर्श।' : '24/7 free psychological grounding with accredited counselors. 100% confidential.')}
            </p>
          </div>
          <a
            href={isMinor ? "tel:1098" : "tel:14416"}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#FAF8F3] hover:bg-[#F3EFEA] border border-[#E8E2DC] text-[#1A1A1A] text-xs font-bold transition-colors cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#0F6E56]" />
            <span>{isMinor ? (isHindi ? '1098 कॉल करें' : 'Call 1098') : (isHindi ? '14416 कॉल करें' : 'Call 14416')}</span>
          </a>
        </div>

        {/* ACTION 4: STATE-SPECIFIC INTERVENTION (ADDED ALONGSIDE, NEVER REPLACING) */}
        {stateCell && (
          <div className="p-3.5 rounded-xl bg-white border border-[#E8E2DC] flex flex-col justify-between space-y-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F6E56] bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                  {confirmedState}
                </span>
                <span className="text-[10px] text-[#777] font-semibold">{stateCell.region}</span>
              </div>
              <h4 className="text-sm font-bold text-[#1A1A1A]">
                {stateCell.stateName[language]} {isHindi ? 'साइबर व आपातकालीन सेल' : 'Cyber & Emergency'}
              </h4>
              <p className="text-[11px] text-[#555] line-clamp-2 leading-snug">
                {stateCell.specialWomenCell[language] || stateCell.headquarters}
              </p>
              <p className="text-[10px] text-[#777]">
                {isHindi ? 'कवरेज:' : 'Coverage:'} <span className="font-semibold text-[#444]">{stateCell.coverage}</span>
              </p>
            </div>

            {/* Separate, Clearly Labeled Call Buttons for Every Distinct Number */}
            <div className="space-y-1.5 pt-1">
              {stateCell.alternate_number && (
                <a
                  href={`tel:${stateCell.alternate_number.replace(/\s+/g, '')}`}
                  className="w-full inline-flex items-center justify-between gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF8F3] hover:bg-[#F3EFEA] border border-[#E8E2DC] text-[#1A1A1A] text-xs font-bold transition-colors cursor-pointer"
                  aria-label={`${isHindi ? 'साइबर थाना कॉल करें' : 'Call Cyber Police Station'} ${stateCell.alternate_number}`}
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <PhoneCall className="w-3.5 h-3.5 text-[#0F6E56] shrink-0" />
                    <span className="truncate">{stateCell.alternate_number}</span>
                  </span>
                  <span className="text-[10px] text-[#666] shrink-0 font-medium">
                    {isHindi ? 'साइबर थाना' : 'Cyber PS'}
                  </span>
                </a>
              )}

              {stateCell.women_mobile && (
                <a
                  href={`tel:${stateCell.women_mobile.replace(/\s+/g, '')}`}
                  className="w-full inline-flex items-center justify-between gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF8F3] hover:bg-[#F3EFEA] border border-[#E8E2DC] text-[#1A1A1A] text-xs font-bold transition-colors cursor-pointer"
                  aria-label={`${isHindi ? 'मोबाइल हेल्पलाइन कॉल करें' : 'Call Mobile Helpline'} ${stateCell.women_mobile}`}
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <PhoneCall className="w-3.5 h-3.5 text-[#26215C] shrink-0" />
                    <span className="truncate">{stateCell.women_mobile}</span>
                  </span>
                  <span className="text-[10px] text-[#666] shrink-0 font-medium">
                    {isHindi ? 'मोबाइल' : 'Mobile'}
                  </span>
                </a>
              )}

              {stateCell.women_whatsapp && (() => {
                const cleanDigits = stateCell.women_whatsapp.replace(/\D/g, '');
                const waNum = cleanDigits.startsWith('91') && cleanDigits.length > 10 ? cleanDigits : `91${cleanDigits}`;
                return (
                  <a
                    href={`https://wa.me/${waNum}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-between gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-950 text-xs font-bold transition-colors cursor-pointer"
                    aria-label={`Open WhatsApp chat with ${stateCell.women_whatsapp}`}
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span className="font-mono">{stateCell.women_whatsapp}</span>
                    </span>
                    <span className="text-[10px] text-emerald-800 shrink-0 font-medium">
                      WhatsApp
                    </span>
                  </a>
                );
              })()}

              <div className="flex flex-wrap items-center gap-2">
                {stateCell.police_emergency && (
                  <a
                    href={`tel:${stateCell.police_emergency.replace(/\s+/g, '')}`}
                    className="flex-1 min-w-[100px] inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#FAF8F3] hover:bg-[#F3EFEA] border border-[#E8E2DC] text-[#8B6D5C] text-xs font-bold transition-colors cursor-pointer shrink-0 whitespace-nowrap"
                    aria-label={`Call Police ${stateCell.police_emergency}`}
                  >
                    <PhoneCall className="w-3 h-3 text-[#8B6D5C] shrink-0" />
                    <span>{isHindi ? 'पुलिस 112' : `Police ${stateCell.police_emergency}`}</span>
                  </a>
                )}
                {stateCell.police_website && (
                  <a
                    href={stateCell.police_website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-[#FAF8F3] hover:bg-[#F3EFEA] border border-[#E8E2DC] text-[#555] transition-colors cursor-pointer shrink-0"
                    title={`${stateCell.stateName.en} Police Portal`}
                    aria-label={`${stateCell.stateName.en} Police Portal`}
                  >
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Below card link: "Browse State / UT Services" link to the full directory */}
      <div className="pt-2 border-t border-[#F0EBE6] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <span className="text-[#666] text-[11px]">
          {isHindi 
            ? 'अधिक विस्तृत राज्य स्तरीय अधिकारियों, ईमेल व नोडल संपर्क की आवश्यकता है?' 
            : 'Need comprehensive officer emails, nodal wings, or physical station addresses?'}
        </span>
        <button
          type="button"
          onClick={() => onBrowseStateServices(confirmedState || undefined)}
          className="inline-flex items-center gap-1 font-bold text-[#0F6E56] hover:underline cursor-pointer"
        >
          <span>{isHindi ? 'राज्य व UT सुरक्षा सेवाएं देखें' : 'Browse State / UT Services'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
