/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  PhoneCall, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  X,
  Compass,
  MessageSquare,
  Baby,
  Building2
} from 'lucide-react';
import { Language } from '../types';
import { CrisisScenarioKey } from './EmergencyCockpit';
import { STATE_CYBER_CELLS, StateCyberCell } from '../data/stateCyberCellsData';
import { detectCurrentStateOnDevice } from '../utils/localGeocode';
import { hapticAction } from '../utils/haptics';

interface StateEmergencyHighlightCardProps {
  language: Language;
  selectedScenario?: CrisisScenarioKey | string;
  onNavigateToTab?: (tab: string, elementId?: string) => void;
  onBrowseStateServices?: () => void;
}

const SESSION_DETECTED_STATE_KEY = 'suraksha_session_detected_state_v1';
const CONFIRM_PROMPT_DISMISSED_KEY = 'suraksha_loc_confirm_dismissed_v1';

export const StateEmergencyHighlightCard: React.FC<StateEmergencyHighlightCardProps> = ({
  language,
  selectedScenario,
  onNavigateToTab,
  onBrowseStateServices
}) => {
  const isHindi = language === 'hi';

  const [confirmedState, setConfirmedState] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem(SESSION_DETECTED_STATE_KEY);
    } catch {
      return null;
    }
  });

  const [showGrantedConfirmBanner, setShowGrantedConfirmBanner] = useState<boolean>(false);
  const [isDetecting, setIsDetecting] = useState<boolean>(false);
  const [manualSelectOpen, setManualSelectOpen] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Check browser-level permission status defensively on mount
  useEffect(() => {
    let isMounted = true;

    async function checkPermission() {
      if (typeof navigator !== 'undefined' && 'permissions' in navigator && typeof navigator.permissions?.query === 'function') {
        try {
          const status = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
          if (!isMounted) return;

          if (status.state === 'granted') {
            const alreadyConfirmed = sessionStorage.getItem(SESSION_DETECTED_STATE_KEY);
            const alreadyDismissed = sessionStorage.getItem(CONFIRM_PROMPT_DISMISSED_KEY);
            if (!alreadyConfirmed && !alreadyDismissed) {
              setShowGrantedConfirmBanner(true);
            }
          }
        } catch {
          // Gracefully ignore in Safari iOS and older engines
        }
      }
    }

    checkPermission();
    return () => {
      isMounted = false;
    };
  }, []);

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
      setManualSelectOpen(true);
    }
  };

  const handleUserDeclinesGrantedLocation = () => {
    hapticAction();
    setShowGrantedConfirmBanner(false);
    setManualSelectOpen(true);
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
    setSearchFilter('');
  };

  const handleClearLocation = () => {
    hapticAction();
    setConfirmedState(null);
    try {
      sessionStorage.removeItem(SESSION_DETECTED_STATE_KEY);
    } catch {}
  };

  // Find canonical state cell information if state is confirmed
  const stateCell: StateCyberCell | null = confirmedState
    ? (STATE_CYBER_CELLS.find(
        (c) => c.stateName.en.toLowerCase() === confirmedState.toLowerCase() || 
               c.stateName.hi === confirmedState ||
               c.stateName.en.toLowerCase().includes(confirmedState.toLowerCase())
      ) || null)
    : null;

  const isMinor = selectedScenario === 'police' || selectedScenario === 'known_person_threats';

  // Filtered state list for manual selection
  const filteredCells = STATE_CYBER_CELLS.filter((cell) => {
    if (!searchFilter.trim()) return true;
    const term = searchFilter.toLowerCase().trim();
    return cell.stateName.en.toLowerCase().includes(term) || cell.stateName.hi.includes(term);
  });

  return (
    <div className="space-y-3">
      {/* 1. CONNECT YOUR STATE CYBER & POLICE CONTACT BAR */}
      <div className="p-3.5 rounded-2xl bg-white/8 border border-white/15 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-400/30">
            <MapPin className="w-4 h-4 text-emerald-300 shrink-0" />
          </div>
          <div className="min-w-0">
            <span className="font-bold text-white text-xs sm:text-sm block">
              {isHindi ? 'अपने राज्य का सत्यापित साइबर व पुलिस संपर्क जोड़ें' : 'Connect Your State Cyber & Police Contact'}
            </span>
            <p className="text-[11px] text-[#D2CCE7] truncate">
              {confirmedState 
                ? (isHindi ? `${confirmedState} के लिए आधिकारिक हेल्पलाइन सक्रिय हैं` : `Official emergency helplines active for ${confirmedState}`)
                : (isHindi ? 'सीधे अपने राज्य का 24×7 महिला नंबर, WhatsApp व साइबर थाना प्राप्त करें' : 'Surface your official state women desk, WhatsApp helpline, and cyber police station')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto flex-wrap">
          {confirmedState ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-400/40 text-emerald-200 text-xs font-semibold">
              <span className="truncate max-w-[140px]">{confirmedState}</span>
              <button
                type="button"
                onClick={handleClearLocation}
                className="text-emerald-300 hover:text-white p-0.5 rounded cursor-pointer"
                title={isHindi ? 'स्थान बदलें' : 'Change state'}
                aria-label={isHindi ? 'स्थान बदलें' : 'Change state'}
              >
                <X className="w-3.5 h-3.5 shrink-0" />
              </button>
            </div>
          ) : (
            <>
              {typeof navigator !== 'undefined' && 'geolocation' in navigator && (
                <button
                  type="button"
                  disabled={isDetecting}
                  onClick={handleUserAcceptsGrantedLocation}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0F6E56] hover:bg-[#0B5441] text-white font-bold text-xs transition-colors cursor-pointer disabled:opacity-75"
                >
                  <Compass className="w-3.5 h-3.5 shrink-0" />
                  <span>{isDetecting ? (isHindi ? 'पहचान रहे हैं...' : 'Detecting...') : (isHindi ? 'स्थान पहचानें' : 'Detect On-Device')}</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setManualSelectOpen((prev) => !prev)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <span>{isHindi ? 'राज्य चुनें (36 राज्य/UT)' : 'Choose State / UT'}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Confirmation Banner for Already Granted Geolocation Permission */}
      {showGrantedConfirmBanner && !confirmedState && (
        <div className="p-3 rounded-xl bg-teal-950/70 border border-teal-400/40 text-xs text-teal-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-start gap-2.5 min-w-0">
            <div className="w-6 h-6 rounded-md bg-[#0F6E56] text-white flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-white leading-tight">
                {isHindi 
                  ? 'आपने पहले ही लोकेशन की अनुमति दी हुई है — क्या अब आपके राज्य का आपातकालीन नंबर दिखाएं?' 
                  : "You've already allowed location access — show your state's emergency contacts now?"}
              </p>
              <p className="text-[10px] text-teal-200/80 mt-0.5">
                {isHindi 
                  ? 'यह गणना 100% आपके डिवाइस पर ऑफलाइन होगी। आपका स्थान सर्वर पर कभी नहीं भेजा जाता।' 
                  : 'Computed 100% on-device offline. Never sent to any server.'}
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
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>{isDetecting ? (isHindi ? 'पहचान रहे हैं...' : 'Detecting...') : (isHindi ? 'हाँ, दिखाएं' : 'Yes, show my state')}</span>
            </button>
            <button
              type="button"
              onClick={handleUserDeclinesGrantedLocation}
              className="px-2.5 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 text-xs font-medium cursor-pointer"
            >
              {isHindi ? 'नहीं, मैन्युअली चुनूंगा' : 'No, I’ll choose manually'}
            </button>
          </div>
        </div>
      )}

      {/* Manual State Select Quick Dropdown if opened */}
      {manualSelectOpen && !confirmedState && (
        <div className="p-3.5 bg-[#171338] border border-white/20 rounded-2xl space-y-2.5 text-xs text-white shadow-xl">
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-white text-xs">
              {isHindi ? 'अपना राज्य या केंद्रशासित प्रदेश चुनें (सभी 36 उपलब्ध):' : 'Select your State or Union Territory (all 36 States/UTs):'}
            </span>
            <button 
              type="button"
              onClick={() => {
                setManualSelectOpen(false);
                setSearchFilter('');
              }}
              className="p-1 text-white/60 hover:text-white cursor-pointer"
              aria-label="Close state selector"
            >
              <X className="w-4 h-4 shrink-0" />
            </button>
          </div>

          {/* Quick Search */}
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder={isHindi ? 'राज्य खोजें (उदा. महाराष्ट्र, दिल्ली, यूपी)...' : 'Search state (e.g. Maharashtra, Delhi, UP)...'}
            className="w-full px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-emerald-400"
          />

          <div className="max-h-48 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-1.5 pr-1">
            {filteredCells.map((cell) => (
              <button
                key={cell.id}
                type="button"
                onClick={() => handleManualStateSelect(cell.stateName.en)}
                className="text-left px-2.5 py-1.5 rounded-lg hover:bg-white/15 border border-white/10 hover:border-emerald-400/50 truncate text-[11px] text-[#FAF8F3] transition-colors cursor-pointer"
              >
                {cell.stateName[language]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. STATE IS SELECTED: SINGLE, POLISHED STATE-SPECIFIC HIGHLIGHT CARD */}
      {stateCell ? (
        <div className="p-4 sm:p-5 rounded-2xl bg-white text-[#1A1A1A] border-2 border-emerald-500/30 shadow-lg space-y-4">
          {/* Header with state badges and official verification note */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-[#E8E2DC]">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#0F6E56] bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                  {stateCell.stateName[language]}
                </span>
                <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {stateCell.coverage}
                </span>
                {stateCell.isUnionTerritory && (
                  <span className="text-[10px] font-semibold text-purple-900 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                    UT
                  </span>
                )}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A] leading-tight">
                {stateCell.stateName[language]} {isHindi ? 'सत्यापित पुलिस व महिला सुरक्षा संपर्क' : 'Verified Police & Women Emergency Directory'}
              </h3>
              <p className="text-xs text-[#555] line-clamp-2">
                {stateCell.specialWomenCell[language] || stateCell.headquarters}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 text-[11px] text-[#666]">
              {stateCell.last_verified && (
                <span className="inline-flex items-center gap-1 font-medium text-emerald-800 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{isHindi ? `सत्यापित: ${stateCell.last_verified}` : `Verified: ${stateCell.last_verified}`}</span>
                </span>
              )}
              {stateCell.source_url && (
                <a
                  href={stateCell.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#0F6E56] hover:underline font-medium p-1"
                  title={isHindi ? 'आधिकारिक स्रोत पोर्टल देखें' : 'View official government source portal'}
                >
                  <span>{isHindi ? 'स्रोत पोर्टल' : 'Official Portal'}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              )}
            </div>
          </div>

          {/* Contact Numbers Row: 1-3 Relevant Contacts with single clear Call action per number & visible coverage note */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Contact 1: Women Helpline / Safety Line */}
            {stateCell.women_helpline && (
              <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E2DC] flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#26215C] bg-[#E8E6F3] px-2 py-0.5 rounded">
                      {isHindi ? 'महिला हेल्पलाइन' : 'Women Helpline'}
                    </span>
                    <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded font-medium border border-emerald-100">
                      {stateCell.women_helpline_coverage || stateCell.coverage}
                    </span>
                  </div>
                  <div className="font-mono text-base font-bold text-[#1A1A1A]">
                    {stateCell.women_helpline}
                  </div>
                  <p className="text-[11px] text-[#666] leading-snug">
                    {stateCell.id === 'west_bengal'
                      ? (isHindi ? 'कोलकाता व पश्चिम बंगाल महिला सहायता' : 'WB Police dedicated women line')
                      : (isHindi ? '24×7 आपातकालीन महिला परामर्श व पुलिस समन्वय' : '24/7 dedicated women distress & police liaison')}
                  </p>
                </div>
                <a
                  href={`tel:${stateCell.women_helpline.replace(/\s+/g, '')}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#26215C] hover:bg-[#1A1644] text-white text-xs font-bold transition-all shadow-xs cursor-pointer min-h-[38px]"
                >
                  <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                  <span>{isHindi ? `कॉल करें (${stateCell.women_helpline})` : `Call ${stateCell.women_helpline}`}</span>
                </a>
              </div>
            )}

            {/* Contact 2: Police Emergency PCR / Dispatch */}
            {stateCell.police_emergency && (
              <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E2DC] flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      {isHindi ? 'पुलिस आपातकालीन' : 'Police Emergency'}
                    </span>
                    <span className="text-[10px] text-rose-800 bg-rose-50 px-1.5 py-0.5 rounded font-medium border border-rose-100">
                      {stateCell.police_coverage || (isHindi ? 'पुलिस पीसीआर' : 'Police Dispatch')}
                    </span>
                  </div>
                  <div className="font-mono text-base font-bold text-rose-950">
                    {stateCell.police_emergency}
                  </div>
                  <p className="text-[11px] text-[#666] leading-snug">
                    {isHindi 
                      ? 'तात्कालिक शारीरिक खतरे या स्थानीय पुलिस वाहन डिस्पैच के लिए सीधा संपर्क।' 
                      : 'Immediate physical emergency dispatch and jurisdictional officer response.'}
                  </p>
                </div>
                <a
                  href={`tel:${stateCell.police_emergency.replace(/\s+/g, '')}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer min-h-[38px]"
                >
                  <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                  <span>{isHindi ? `कॉल करें (${stateCell.police_emergency})` : `Call ${stateCell.police_emergency}`}</span>
                </a>
              </div>
            )}

            {/* Contact 3: Child Helpline (if minor) OR Cyber Police Station / WhatsApp */}
            {isMinor && stateCell.child_helpline ? (
              <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E2DC] flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {isHindi ? 'बाल हेल्पलाइन (POCSO)' : 'Childline (POCSO)'}
                    </span>
                    <span className="text-[10px] text-amber-900 bg-amber-50 px-1.5 py-0.5 rounded font-medium border border-amber-100">
                      {stateCell.child_helpline_coverage || '24x7'}
                    </span>
                  </div>
                  <div className="font-mono text-base font-bold text-[#1A1A1A]">
                    {stateCell.child_helpline}
                  </div>
                  <p className="text-[11px] text-[#666] leading-snug">
                    {isHindi 
                      ? '18 वर्ष से कम आयु के मामलों में पूर्ण कानूनी पहचान संरक्षण व बाल संरक्षण।' 
                      : 'Statutory identity protection and child care for individuals under 18.'}
                  </p>
                </div>
                <a
                  href={`tel:${stateCell.child_helpline.replace(/\s+/g, '')}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer min-h-[38px]"
                >
                  <Baby className="w-3.5 h-3.5 shrink-0" />
                  <span>{isHindi ? `कॉल करें (${stateCell.child_helpline})` : `Call ${stateCell.child_helpline}`}</span>
                </a>
              </div>
            ) : stateCell.alternate_number ? (
              <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E2DC] flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F6E56] bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {stateCell.alternate_number_label || (isHindi ? 'साइबर सेल' : 'Cyber Cell')}
                    </span>
                    <span className="text-[10px] text-[#666] font-medium">
                      {stateCell.alternate_number_coverage || stateCell.coverage}
                    </span>
                  </div>
                  <div className="font-mono text-base font-bold text-[#1A1A1A]">
                    {stateCell.alternate_number}
                  </div>
                  <p className="text-[11px] text-[#666] leading-snug">
                    {isHindi 
                      ? `${stateCell.headquarters} स्थित आधिकारिक साइबर अपराध अनुसंधान इकाई।` 
                      : `Official cyber cell desk headquartered in ${stateCell.headquarters}.`}
                  </p>
                </div>
                <a
                  href={`tel:${stateCell.alternate_number.replace(/\s+/g, '')}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#0F6E56] hover:bg-[#0A4E3D] text-white text-xs font-bold transition-all shadow-xs cursor-pointer min-h-[38px]"
                >
                  <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                  <span>{isHindi ? `कॉल करें (${stateCell.alternate_number})` : `Call ${stateCell.alternate_number}`}</span>
                </a>
              </div>
            ) : stateCell.women_whatsapp ? (() => {
              const cleanDigits = stateCell.women_whatsapp.replace(/\D/g, '');
              const waNum = cleanDigits.startsWith('91') && cleanDigits.length > 10 ? cleanDigits : `91${cleanDigits}`;
              return (
                <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E2DC] flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        WhatsApp
                      </span>
                      <span className="text-[10px] text-emerald-700 font-medium">
                        {stateCell.women_whatsapp_coverage || 'Chat Support'}
                      </span>
                    </div>
                    <div className="font-mono text-base font-bold text-[#1A1A1A]">
                      {stateCell.women_whatsapp}
                    </div>
                    <p className="text-[11px] text-[#666] leading-snug">
                      {isHindi ? 'राज्य पुलिस महिला हेल्पडेस्क पर त्वरित संदेश भेजें।' : 'Direct text assistance with state police women support desk.'}
                    </p>
                  </div>
                  <a
                    href={`https://wa.me/${waNum}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer min-h-[38px]"
                  >
                    <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                    <span>{isHindi ? 'व्हाट्सएप चैट शुरू करें' : 'Open WhatsApp Desk'}</span>
                  </a>
                </div>
              );
            })() : stateCell.women_mobile ? (
              <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E2DC] flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#26215C] bg-[#E8E6F3] px-2 py-0.5 rounded">
                      {isHindi ? 'मोबाइल हेल्पलाइन' : 'Mobile Helpline'}
                    </span>
                    <span className="text-[10px] text-[#666] font-medium">
                      {stateCell.women_mobile_coverage || stateCell.coverage}
                    </span>
                  </div>
                  <div className="font-mono text-base font-bold text-[#1A1A1A]">
                    {stateCell.women_mobile}
                  </div>
                  <p className="text-[11px] text-[#666] leading-snug">
                    {isHindi ? '24 घंटे सक्रिय राज्य मोबाइल संपर्क।' : 'Statewide mobile assistance line.'}
                  </p>
                </div>
                <a
                  href={`tel:${stateCell.women_mobile.replace(/\s+/g, '')}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#26215C] hover:bg-[#1A1644] text-white text-xs font-bold transition-all shadow-xs cursor-pointer min-h-[38px]"
                >
                  <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                  <span>{isHindi ? `कॉल करें (${stateCell.women_mobile})` : `Call ${stateCell.women_mobile}`}</span>
                </a>
              </div>
            ) : null}
          </div>

          {/* If WhatsApp desk is available and not in primary grid */}
          {stateCell.women_whatsapp && stateCell.alternate_number && (
            (() => {
              const cleanDigits = stateCell.women_whatsapp.replace(/\D/g, '');
              const waNum = cleanDigits.startsWith('91') && cleanDigits.length > 10 ? cleanDigits : `91${cleanDigits}`;
              return (
                <div className="pt-2 border-t border-[#F0EBE6] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-[#555]">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>
                      {isHindi ? 'व्हाट्सएप सहायता उपलब्ध:' : 'WhatsApp Desk Available:'}{' '}
                      <span className="font-mono font-semibold text-[#1A1A1A]">{stateCell.women_whatsapp}</span>
                    </span>
                  </div>
                  <a
                    href={`https://wa.me/${waNum}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    <span>{isHindi ? 'व्हाट्सएप खोलें' : 'Chat on WhatsApp'}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>
              );
            })()
          )}
        </div>
      ) : (
        /* 3. CALM EMPTY STATE WHEN NO STATE HAS BEEN SELECTED/DETECTED YET */
        <div className="p-4 rounded-2xl bg-white/6 border border-white/12 text-center space-y-1.5">
          <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-emerald-300 mb-0.5">
            <Building2 className="w-3.5 h-3.5 shrink-0" />
          </div>
          <p className="text-xs sm:text-sm font-semibold text-white/90">
            {isHindi 
              ? 'अपने राज्य का विशिष्ट साइबर व पुलिस संपर्क देखने के लिए ऊपर अपना राज्य चुनें या पहचानें।' 
              : 'Select or detect your state above to see its specific contact here.'}
          </p>
          <p className="text-[11px] text-[#D2CCE7]/70">
            {isHindi 
              ? 'सभी 36 राज्यों व केंद्र शासित प्रदेशों के आधिकारिक संपर्क canonical डेटाबेस से उपलब्ध हैं।' 
              : 'Direct verified helplines for all 36 States and Union Territories.'}
          </p>
        </div>
      )}
    </div>
  );
};
