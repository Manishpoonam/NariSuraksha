import React, { useState } from 'react';
import { MapPin, Navigation, ShieldCheck, Loader2, Check, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { detectCurrentStateOnDevice, StateDetectionResult } from '../utils/localGeocode';

interface StateLocationDetectorProps {
  isHindi: boolean;
  onConfirmState: (stateName: string) => void;
  activeConfirmedState?: string | null;
  onClearConfirmedState?: () => void;
}

export const StateLocationDetector: React.FC<StateLocationDetectorProps> = ({
  isHindi,
  onConfirmState,
  activeConfirmedState,
  onClearConfirmedState
}) => {
  const [detecting, setDetecting] = useState(false);
  const [detectedState, setDetectedState] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  // Purely on-demand detection; no automatic call on mount, no persistent storage
  const handleDetect = async () => {
    setDetecting(true);
    setIsDismissed(false);
    setErrorMessage(null);
    
    try {
      const result: StateDetectionResult = await detectCurrentStateOnDevice();
      setDetecting(false);
      if (result.state) {
        setDetectedState(result.state);
        setErrorMessage(null);
      } else {
        setDetectedState(null);
        if (result.error === 'permission_denied') {
          setErrorMessage(
            isHindi 
              ? 'ब्राउज़र में लोकेशन अनुमति अस्वीकृत है। आप ऊपर खोज बार में अपना राज्य सीधे टाइप कर सकते हैं।'
              : 'Location permission was denied in your browser settings. You can still search your state manually.'
          );
        } else if (result.error === 'outside_india') {
          setErrorMessage(
            isHindi
              ? 'स्थान भारत की सीमा से बाहर पाया गया। कृपया नीचे दी गई सूची से अपना राज्य चुनें।'
              : 'Location coordinates detected outside Indian borders. Please select your state from the directory.'
          );
        } else if (result.error === 'timeout') {
          setErrorMessage(
            isHindi
              ? 'सत्यापन समय समाप्त हो गया। कृपया दोबारा प्रयास करें या Safari/iOS सेटिंग्स में स्थान सेवा चालू रखें।'
              : 'Location request timed out. Please try again or check Location Services in Safari/iOS Settings.'
          );
        }
      }
    } catch {
      setDetecting(false);
      setDetectedState(null);
    }
  };

  const handleConfirm = (stateName: string) => {
    onConfirmState(stateName);
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setDetectedState(null);
  };

  return (
    <div className="space-y-2">
      {/* 1. Initial Prompt: Optional auto-detect trigger with on-device privacy guarantee */}
      {!detectedState && !activeConfirmedState && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 sm:p-3 rounded-xl bg-white border border-[#E8E2DC] shadow-2xs">
          <div className="flex items-center gap-2 text-[#444] min-w-0">
            <div className="w-6 h-6 rounded-lg bg-[#0F6E56]/10 text-[#0F6E56] flex items-center justify-center shrink-0">
              <Navigation className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-semibold text-[#1A1A1A]">
                  {isHindi ? 'अपने राज्य का नंबर तुरंत देखना चाहते हैं?' : "See your state's number faster?"}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] text-[#0F6E56] bg-teal-50 border border-teal-200/60 px-1.5 py-0.5 rounded font-medium">
                  <ShieldCheck className="w-3 h-3 text-[#0F6E56]" />
                  {isHindi ? 'डिवाइस पर ही रहेगा' : 'Never leaves your device'}
                </span>
              </div>
              <p className="text-[10px] text-[#777] hidden sm:block">
                {isHindi 
                  ? 'स्थान की पहचान स्थानीय बाउंड्री मैप से 100% ऑफलाइन की जाती है • Chrome, Safari, Firefox और Edge पर सुरक्षित'
                  : 'Computed 100% on-device using local boundaries • Works across Safari, Chrome, Firefox & Edge'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDetect}
            disabled={detecting}
            className="w-full sm:w-auto px-3.5 py-2 rounded-lg bg-[#0F6E56] hover:bg-[#0B5441] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shrink-0 cursor-pointer shadow-xs disabled:opacity-75"
          >
            {detecting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>{isHindi ? 'सत्यापन जारी...' : 'Detecting on device...'}</span>
              </>
            ) : (
              <>
                <MapPin className="w-3.5 h-3.5" />
                <span>{isHindi ? 'स्थान पहचानें' : 'Detect my location'}</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Helpful inline status notice if Safari or browser permission was denied/timed out */}
      <AnimatePresence>
        {errorMessage && !detectedState && !activeConfirmedState && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-2 shadow-2xs"
          >
            <div className="flex items-center gap-2 min-w-0">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="text-[11px] leading-tight">{errorMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="p-1 text-amber-700 hover:text-amber-900 hover:bg-amber-100 rounded cursor-pointer shrink-0"
              aria-label="Dismiss error"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Detected State Suggestion Banner: Pinned above list, requires explicit confirmation */}
      <AnimatePresence>
        {detectedState && !isDismissed && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="p-3 rounded-xl bg-teal-50/95 border border-teal-300 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
          >
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-[#0F6E56] text-white flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 shadow-2xs">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-teal-950 font-medium leading-snug">
                  {isHindi ? (
                    <>
                      पहचाना गया: <strong className="font-bold text-[#0F6E56] text-sm">{detectedState}</strong> — पुष्टि के लिए टैप करें
                    </>
                  ) : (
                    <>
                      Detected: <strong className="font-bold text-[#0F6E56] text-sm">{detectedState}</strong> — tap to confirm
                    </>
                  )}
                </p>
                <p className="text-[10px] text-teal-800/90 mt-0.5">
                  {isHindi
                    ? 'जीपीएस सीमावर्ती क्षेत्र में होने पर भिन्न हो सकता है • पुष्टि करने पर सूची फिल्टर होगी'
                    : 'Reverse-geocoded offline on-device • Tap to view your local cell or dismiss to keep browsing'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <button
                type="button"
                onClick={() => handleConfirm(detectedState)}
                className="px-3 py-1.5 rounded-lg bg-[#0F6E56] hover:bg-[#0B5441] text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{isHindi ? `${detectedState} दिखाएं` : `Show ${detectedState}`}</span>
              </button>
              <button
                type="button"
                onClick={handleDismiss}
                className="p-1.5 rounded-lg text-teal-700 hover:text-teal-950 hover:bg-teal-100 transition-colors cursor-pointer"
                aria-label={isHindi ? 'सुझाव हटाएं' : 'Dismiss suggestion'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Confirmed Active State Pill (when user confirmed and list is filtered) */}
      {activeConfirmedState && (
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-teal-50 border border-teal-200 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#0F6E56] shrink-0" />
            <span className="text-teal-950 font-medium text-[11px] sm:text-xs">
              {isHindi ? (
                <>स्थान फ़िल्टर सक्रिय: <strong className="font-bold text-[#0F6E56]">{activeConfirmedState}</strong></>
              ) : (
                <>Location filter active: <strong className="font-bold text-[#0F6E56]">{activeConfirmedState}</strong></>
              )}
            </span>
          </div>

          {onClearConfirmedState && (
            <button
              type="button"
              onClick={onClearConfirmedState}
              className="text-[11px] font-bold text-[#0F6E56] hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>{isHindi ? 'सभी 36 दिखाएं' : 'Show all 36'}</span>
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
