/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Check, RotateCcw } from 'lucide-react';
import { Language } from '../types';

export interface TrackerStepItem {
  number: number;
  title: string;
  desc?: string;
  shortTitle?: string;
}

export interface TraumaInformedStepTrackerProps {
  steps: TrackerStepItem[];
  currentStep: number;
  completedStepNumbers: number[];
  onStepClick: (stepNumber: number) => void;
  onReset?: () => void;
  language?: Language;
  theme?: 'light' | 'dark';
  className?: string;
  showSequenceHeader?: boolean;
}

export const TraumaInformedStepTracker: React.FC<TraumaInformedStepTrackerProps> = ({
  steps,
  currentStep,
  completedStepNumbers,
  onStepClick,
  onReset,
  language = 'en',
  theme = 'light',
  className = '',
  showSequenceHeader = true,
}) => {
  const isHindi = language === 'hi';
  const prefersReducedMotion = useReducedMotion();

  // Trauma-informed breathing animation for the current active step node:
  // Purely non-layout-impacting boxShadow ring pulse (zero scale transform)
  // so the layout box and connecting line's vertical center never shift or jitter.
  const breathingAnimation = prefersReducedMotion
    ? {}
    : {
        boxShadow: [
          theme === 'dark'
            ? '0 0 0 0px rgba(243, 197, 214, 0.45)'
            : '0 0 0 0px rgba(153, 53, 86, 0.35)',
          theme === 'dark'
            ? '0 0 0 6px rgba(243, 197, 214, 0)'
            : '0 0 0 6px rgba(153, 53, 86, 0)',
          theme === 'dark'
            ? '0 0 0 0px rgba(243, 197, 214, 0.45)'
            : '0 0 0 0px rgba(153, 53, 86, 0.35)',
        ],
        transition: {
          duration: 2.8,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        },
      };

  const currentStepItem = steps.find((s) => s.number === currentStep) || steps[0];
  const cleanCurrentTitle = (currentStepItem?.title || '').replace(/^\d+\.\s*/, '');

  // Screen reader live region announcement tracking:
  // Announce step change with context ("Step X of Y, Title, current")
  // and only announce completion when real completion occurs.
  const prevCompletedCountRef = React.useRef(completedStepNumbers.length);
  const [srAnnouncement, setSrAnnouncement] = React.useState<string>(() =>
    isHindi
      ? `चरण ${currentStep} का ${steps.length}, ${cleanCurrentTitle}, वर्तमान चरण`
      : `Step ${currentStep} of ${steps.length}, ${cleanCurrentTitle}, current`
  );

  React.useEffect(() => {
    if (completedStepNumbers.length > prevCompletedCountRef.current) {
      // Find newly completed step number
      const newlyCompleted = completedStepNumbers[completedStepNumbers.length - 1];
      const stepItem = steps.find((s) => s.number === newlyCompleted);
      const title = (stepItem?.title || '').replace(/^\d+\.\s*/, '');
      setSrAnnouncement(
        isHindi
          ? `चरण ${newlyCompleted} (${title}) पूर्ण हुआ। अब चरण ${currentStep} का ${steps.length}, ${cleanCurrentTitle}, वर्तमान चरण।`
          : `Step ${newlyCompleted} (${title}) completed. Now on Step ${currentStep} of ${steps.length}, ${cleanCurrentTitle}, current.`
      );
    } else {
      setSrAnnouncement(
        isHindi
          ? `चरण ${currentStep} का ${steps.length}, ${cleanCurrentTitle}, वर्तमान चरण।`
          : `Step ${currentStep} of ${steps.length}, ${cleanCurrentTitle}, current.`
      );
    }
    prevCompletedCountRef.current = completedStepNumbers.length;
  }, [currentStep, completedStepNumbers, steps, cleanCurrentTitle, isHindi]);

  return (
    <div
      className={`rounded-[22px] transition-all ${
        theme === 'dark'
          ? 'bg-[#201B52] border border-white/10 p-3 sm:p-5'
          : 'bg-white border border-[#26215C]/10 shadow-soft p-3 sm:p-5'
      } ${className}`}
    >
      {/* Screen Reader Live Region for Accessible Step Announcements */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {srAnnouncement}
      </div>

      {/* 1. INFORMATIONAL SEQUENCE BAR: Consistent Recommended Framing */}
      {showSequenceHeader && (
        <div className="flex items-center justify-between text-xs mb-3 sm:mb-4">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className={`font-bold text-xs tracking-tight ${
                theme === 'dark' ? 'text-[#F3C5D6]' : 'text-[#993556]'
              }`}
            >
              {isHindi ? `चरण ${currentStep} का ${steps.length}` : `Step ${currentStep} of ${steps.length}`}
            </span>
            <span className={theme === 'dark' ? 'text-white/20' : 'text-[#26215C]/20'}>•</span>
            <span
              className={`font-semibold truncate text-xs ${
                theme === 'dark' ? 'text-white' : 'text-[#26215C]'
              }`}
            >
              {cleanCurrentTitle}
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <span
              className={`text-[11px] hidden sm:inline-block ${
                theme === 'dark' ? 'text-[#9E93C4]' : 'text-[#5A5672]'
              }`}
            >
              {isHindi
                ? 'अनुशंसित क्रम • आप किसी भी चरण पर कभी भी जा सकते हैं'
                : 'Recommended sequence • You can revisit any step at any time'}
            </span>
            {onReset && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onReset();
                }}
                className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg transition-all cursor-pointer min-h-[30px] active:scale-95 ${
                  theme === 'dark'
                    ? 'text-[#D2CCE7] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10'
                    : 'text-[#85819C] hover:text-[#993556] bg-[#FAF8F3] hover:bg-[#F3EFEC] border border-[#26215C]/10'
                }`}
                title={isHindi ? 'सभी चरण व फॉर्म डेटा रीसेट करें' : 'Reset all wizard steps and clear form'}
              >
                <RotateCcw className="w-3 h-3" />
                <span>{isHindi ? 'रीसेट करें' : 'Reset'}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* 2. PROGRESS STEPPER NAVIGATION GRID */}
      <div className="relative">
        {/* MOBILE CONNECTING LINE SEGMENTS (<=639px):
            Runs behind the vertically-centered 32px/36px step circles across the 4 columns.
            3 individual connecting segments between step nodes 1->2, 2->3, and 3->4.
            Filled ONLY when the preceding step is actually completed.
        */}
        <div className="sm:hidden absolute left-[12.5%] right-[12.5%] top-[22px] -translate-y-1/2 pointer-events-none z-0">
          <div className="relative w-full h-[2.5px]">
            {/* Segment 1: from Step 1 center (0%) to Step 2 center (33.33%) */}
            <div
              className={`absolute left-0 w-[33.33%] h-full rounded-l-full overflow-hidden ${
                theme === 'dark' ? 'bg-white/15' : 'bg-[#26215C]/10'
              }`}
            >
              <div
                className="h-full bg-[#0F6E56] rounded-full"
                style={{
                  width: completedStepNumbers.includes(1) ? '100%' : '0%',
                  transition: prefersReducedMotion ? 'none' : 'width 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </div>

            {/* Segment 2: from Step 2 center (33.33%) to Step 3 center (66.66%) */}
            <div
              className={`absolute left-[33.33%] w-[33.33%] h-full overflow-hidden ${
                theme === 'dark' ? 'bg-white/15' : 'bg-[#26215C]/10'
              }`}
            >
              <div
                className="h-full bg-[#0F6E56] rounded-full"
                style={{
                  width: completedStepNumbers.includes(2) ? '100%' : '0%',
                  transition: prefersReducedMotion ? 'none' : 'width 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </div>

            {/* Segment 3: from Step 3 center (66.66%) to Step 4 center (100%) */}
            <div
              className={`absolute left-[66.66%] w-[33.34%] h-full rounded-r-full overflow-hidden ${
                theme === 'dark' ? 'bg-white/15' : 'bg-[#26215C]/10'
              }`}
            >
              <div
                className="h-full bg-[#0F6E56] rounded-full"
                style={{
                  width: completedStepNumbers.includes(3) ? '100%' : '0%',
                  transition: prefersReducedMotion ? 'none' : 'width 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </div>
          </div>
        </div>

        {/* 4-COLUMN STEPPER CONTAINER */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5 md:gap-3 relative z-10">
          {steps.map((s, idx) => {
            // Precise 4-state stepper model:
            // 1. current: active step the user is viewing
            // 2. completed: actually completed via engagement/action (in completedStepNumbers)
            // 3. skipped-not-completed: earlier step (number < currentStep) that was bypassed without completion
            // 4. available: upcoming step (number > currentStep) ready to be engaged
            const isCurrent = s.number === currentStep;
            const isCompleted = completedStepNumbers.includes(s.number);
            const isSkipped = s.number < currentStep && !isCompleted;
            const isAvailable = !isCurrent && !isCompleted && !isSkipped;

            // Accessible state descriptor (NOT relying on color alone)
            const stateText = isCurrent && isCompleted
              ? (isHindi ? 'वर्तमान, पूर्ण' : 'Current, Completed')
              : isCurrent
              ? (isHindi ? 'वर्तमान' : 'Current')
              : isCompleted
              ? (isHindi ? 'पूर्ण' : 'Completed')
              : isSkipped
              ? (isHindi ? 'छोड़ा गया - अधूरा' : 'Skipped - not completed')
              : (isHindi ? 'सुलभ' : 'Available');

            // Clean title without numeric prefix for display where step node is shown
            const titleWithoutNum = s.title.replace(/^\d+\.\s*/, '');
            const displayTitle = s.shortTitle || titleWithoutNum;

            return (
              <div key={s.number} className="relative">
                {/* TABLET & DESKTOP CONNECTOR LINE SEGMENT (>=640px):
                    Slim connector segment between adjacent cards that smoothly fills ONLY when completed
                */}
                {idx < steps.length - 1 && (
                  <div
                    className={`hidden sm:block absolute -right-2 sm:-right-2.5 md:-right-3 top-1/2 -translate-y-1/2 w-2 sm:w-2.5 md:w-3 h-[2px] rounded-full overflow-hidden pointer-events-none z-20 ${
                      theme === 'dark' ? 'bg-white/15' : 'bg-[#26215C]/10'
                    }`}
                    aria-hidden="true"
                  >
                    <div
                      className="h-full bg-[#0F6E56] rounded-full"
                      style={{
                        width: completedStepNumbers.includes(s.number) ? '100%' : '0%',
                        transition: prefersReducedMotion ? 'none' : 'width 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                  </div>
                )}

                {/* STEP BUTTON (Touch target >=44px, visible focus ring, keyboard accessible) */}
                <button
                  type="button"
                  onClick={() => onStepClick(s.number)}
                  aria-label={`${isHindi ? 'चरण' : 'Step'} ${s.number}: ${s.title} (${stateText})`}
                  aria-current={isCurrent ? 'step' : undefined}
                  className={`w-full text-left transition-all cursor-pointer rounded-xl sm:rounded-2xl border min-h-[48px] sm:min-h-[56px] flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-2.5 md:gap-3 p-1.5 sm:p-2.5 md:p-3 active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    theme === 'dark' ? 'focus-visible:ring-[#F3C5D6] focus-visible:ring-offset-[#201B52]' : 'focus-visible:ring-[#993556] focus-visible:ring-offset-white'
                  } ${
                    isCompleted && !isCurrent
                      ? theme === 'dark'
                        ? 'bg-[#0F6E56]/15 border-[#0F6E56]/40 text-[#FAF8F3] hover:bg-[#0F6E56]/25 hover:border-[#0F6E56]/60'
                        : 'bg-[#E1F5EE]/40 border-[#0F6E56]/30 text-[#0F6E56] hover:bg-[#E1F5EE]/70 hover:border-[#0F6E56]/50'
                      : isCurrent
                      ? isCompleted
                        ? theme === 'dark'
                          ? 'bg-[#0F6E56]/25 border-[#0F6E56] text-white shadow-xs ring-2 ring-[#F3C5D6]/60'
                          : 'bg-[#E1F5EE] border-[#0F6E56] text-[#0F6E56] shadow-soft ring-2 ring-[#0F6E56]/40'
                        : theme === 'dark'
                        ? 'bg-white/15 border-[#F3C5D6] text-white shadow-xs ring-1 ring-[#F3C5D6]/30'
                        : 'bg-[#FAF8F3] border-[#993556]/40 text-[#26215C] shadow-soft ring-1 ring-[#993556]/25'
                      : isSkipped
                      ? theme === 'dark'
                        ? 'bg-amber-950/20 border-dashed border-amber-400/40 text-[#D2CCE7] hover:bg-amber-950/30'
                        : 'bg-amber-50/50 border-dashed border-amber-400/50 text-[#5A5672] hover:bg-amber-50'
                      : theme === 'dark'
                      ? 'bg-white/[0.03] border-white/10 text-[#9E93C4] hover:text-white hover:border-white/20 hover:bg-white/5'
                      : 'bg-[#FAF8F3]/50 border-[#26215C]/10 text-[#5A5672] hover:bg-[#FAF8F3] hover:border-[#26215C]/20'
                  }`}
                >
                  {/* Step Marker Node (Uses distinct shapes/icons, never color alone):
                      - Completed: teal circle with Checkmark icon ✓
                      - Current: active ring with somatic pulse
                      - Skipped: dashed border with step number and alert marker
                      - Available: solid clean outline with step number
                  */}
                  <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shrink-0">
                    <motion.div
                      animate={isCurrent ? breathingAnimation : {}}
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full box-border border flex items-center justify-center font-bold text-xs shrink-0 transition-colors relative z-10 ${
                        isCompleted
                          ? 'bg-[#0F6E56] text-white border-[#0F6E56]'
                          : isCurrent
                          ? theme === 'dark'
                            ? 'bg-[#993556] text-white border-[#F3C5D6] ring-2 ring-[#F3C5D6]/50 ring-offset-1 ring-offset-[#201B52]'
                            : 'bg-[#993556] text-white border-[#993556] ring-2 ring-[#993556]/30 ring-offset-1 ring-offset-white'
                          : isSkipped
                          ? theme === 'dark'
                            ? 'bg-amber-900/30 text-amber-200 border-dashed border-amber-400/60'
                            : 'bg-amber-100 text-amber-900 border-dashed border-amber-500'
                          : theme === 'dark'
                          ? 'bg-[#201B52] sm:bg-white/10 text-[#D2CCE7]/80 border-white/20'
                          : 'bg-white text-[#5A5672] border-[#26215C]/20'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.8] text-white" aria-hidden="true" />
                      ) : (
                        <span className="text-xs font-bold leading-none select-none">
                          {s.number}
                        </span>
                      )}
                    </motion.div>
                  </div>

                  {/* Step Typography Hierarchy:
                      - Label as the visual anchor
                      - Sublabel notably smaller/muted
                      - Resilient across mobile (<=428px), tablet (429-1024px), and desktop (>=1025px)
                  */}
                  <div className="w-full sm:w-auto text-center sm:text-left min-w-0">
                    {/* Mobile Label (<=639px): Clean truncation, no overflow */}
                    <div
                      className={`sm:hidden text-[10px] font-bold leading-tight truncate px-0.5 ${
                        isCompleted
                          ? theme === 'dark'
                            ? 'text-teal-200'
                            : 'text-[#0F6E56]'
                          : isCurrent
                          ? theme === 'dark'
                            ? 'text-white'
                            : 'text-[#26215C]'
                          : theme === 'dark'
                          ? 'text-[#9E93C4]'
                          : 'text-[#5A5672]'
                      }`}
                    >
                      {displayTitle}
                    </div>

                    {/* Tablet/Desktop Title (>=640px) */}
                    <div
                      className={`hidden sm:block text-xs sm:text-sm font-bold leading-tight truncate ${
                        isCompleted
                          ? theme === 'dark'
                            ? 'text-[#FAF8F3]'
                            : 'text-[#0F6E56]'
                          : isCurrent
                          ? theme === 'dark'
                            ? 'text-white'
                            : 'text-[#26215C]'
                          : theme === 'dark'
                          ? 'text-[#FAF8F3]/80'
                          : 'text-[#26215C]/80'
                      }`}
                    >
                      {s.title}
                    </div>

                    {/* Sublabel: notably smaller & muted, stacked gracefully */}
                    {s.desc && (
                      <div
                        className={`text-[9px] sm:text-[10px] md:text-[11px] truncate leading-tight mt-0.5 hidden xs:block ${
                          isCompleted
                            ? theme === 'dark'
                              ? 'text-teal-300/80'
                              : 'text-[#0F6E56]/80'
                            : isCurrent
                            ? theme === 'dark'
                              ? 'text-[#D2CCE7]'
                              : 'text-[#5A5672]'
                            : theme === 'dark'
                            ? 'text-[#9E93C4]/80'
                            : 'text-[#85819C]'
                        }`}
                      >
                        {s.desc}
                      </div>
                    )}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
