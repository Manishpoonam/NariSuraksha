import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ArrowRight, 
  ExternalLink, 
  FileText, 
  ShieldCheck, 
  PhoneCall, 
  Lock, 
  Zap, 
  Layers
} from 'lucide-react';
import { DECISION_NODES } from '../data/flowchartData';
import { Language, IncidentCategory } from '../types';

interface CrisisFlowchartProps {
  language: Language;
  onNavigateToTab: (tab: string) => void;
  onSelectCategoryForDraft?: (category: IncidentCategory) => void;
}

export const CrisisFlowchart: React.FC<CrisisFlowchartProps> = ({
  language,
  onNavigateToTab,
  onSelectCategoryForDraft,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<IncidentCategory>('extortion_blackmail');
  const isHindi = language === 'hi';

  const currentNode = DECISION_NODES.find((node) => node.category === selectedCategory) || DECISION_NODES[0];

  const handleStepAction = (actionType?: string, linkUrl?: string) => {
    if (actionType === 'draft') {
      if (onSelectCategoryForDraft) {
        onSelectCategoryForDraft(selectedCategory);
      }
      onNavigateToTab('drafts');
    } else if (actionType === 'evidence') {
      onNavigateToTab('evidence');
    } else if (actionType === 'takedown' && !linkUrl) {
      onNavigateToTab('takedown');
    } else if (linkUrl) {
      if (linkUrl.startsWith('tel:')) {
        window.location.href = linkUrl;
      } else {
        window.open(linkUrl, '_blank', 'noopener,noreferrer');
      }
    }
  };

  return (
    <section className="space-y-6">
      {/* Flowchart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0EBE6] pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-[#F3EFEC] text-[#8B6D5C] flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </span>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#2D2D2D] tracking-tight">
              {isHindi ? 'आपातकालीन संकट निवारण फ्लोचार्ट' : 'Emergency Crisis Decision Flowchart'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#666] mt-1">
            {isHindi
              ? 'अपनी स्थिति चुनें और 4-चरणीय प्रमाणित कानूनी व तकनीकी समाधान का पालन करें'
              : 'Select your exact scenario below to view tailored, step-by-step immediate action protocols.'}
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#F3EFEC] border border-[#E5DFD9] rounded-full text-xs font-semibold text-[#8B6D5C] self-start sm:self-auto uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 text-[#E25822]" />
          <span>{isHindi ? '4-चरणीय कार्ययोजना' : '4-Phase Resolution Flow'}</span>
        </div>
      </div>

      {/* Scenario Selector Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {DECISION_NODES.map((node) => {
          const isSelected = selectedCategory === node.category;
          return (
            <button
              key={node.id}
              onClick={() => setSelectedCategory(node.category)}
              className={`p-4 sm:p-4.5 rounded-2xl text-left transition-all border cursor-pointer flex flex-col justify-between select-none ${
                isSelected
                  ? 'bg-[#2D2D2D] text-white border-[#2D2D2D] shadow-md ring-2 ring-[#8B6D5C]/30'
                  : 'bg-white hover:bg-[#FAF9F6] text-[#2D2D2D] border-[#E8E2DC]'
              }`}
            >
              <div>
                <span
                  className={`inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2.5 ${
                    isSelected ? 'bg-white/20 text-[#FAF9F6]' : 'bg-[#F3EFEC] text-[#8B6D5C]'
                  }`}
                >
                  {node.urgencyLevel}
                </span>
                <h3 className="text-sm sm:text-base font-bold leading-snug">
                  {node.title[language]}
                </h3>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs font-medium opacity-90">
                <span>{isHindi ? 'समाधान देखें' : 'View Protocol'}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Visual Flow Diagram Overview */}
      <div className="bg-[#2D2D2D] text-[#FAF9F6] rounded-3xl p-5 sm:p-7 shadow-sm">
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-3 sm:gap-4">
          {/* Phase 1 */}
          <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/15">
            <div className="flex items-center gap-2 text-[#FAF9F6] font-bold text-xs sm:text-sm mb-1.5">
              <span className="w-6 h-6 rounded-full bg-[#E25822] text-white flex items-center justify-center text-xs font-bold shrink-0">1</span>
              <span className="tracking-wide">{isHindi ? 'चरण 1: रुकें व पैसे न दें' : 'Phase 1: Pause & Withhold Payment'}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#EAE6E1] leading-relaxed">
              {isHindi ? 'पैसे देने या भीख मांगने से ब्लैकमेलर की हिम्मत बढ़ती है। शांत रहें।' : 'Withhold all money. Extortionists increase demands once paid.'}
            </p>
          </div>

          {/* Phase 2 */}
          <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/15">
            <div className="flex items-center gap-2 text-[#FAF9F6] font-bold text-xs sm:text-sm mb-1.5">
              <span className="w-6 h-6 rounded-full bg-[#8B6D5C] text-white flex items-center justify-center text-xs font-bold shrink-0">2</span>
              <span className="tracking-wide">{isHindi ? 'चरण 2: सबूत सुरक्षित करें' : 'Phase 2: Preserve Evidence'}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#EAE6E1] leading-relaxed">
              {isHindi ? 'तारीख, समय, प्रोफाइल व UPI आईडी के पूरे स्क्रीनशॉट लें।' : 'Capture full-screen proof with timestamp, handles, and UPI IDs.'}
            </p>
          </div>

          {/* Phase 3 */}
          <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/15">
            <div className="flex items-center gap-2 text-[#FAF9F6] font-bold text-xs sm:text-sm mb-1.5">
              <span className="w-6 h-6 rounded-full bg-[#8B6D5C] text-white flex items-center justify-center text-xs font-bold shrink-0">3</span>
              <span className="tracking-wide">{isHindi ? 'चरण 3: डिजिटल ब्लॉकिंग व हैश' : 'Phase 3: StopNCII & Takedown'}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#EAE6E1] leading-relaxed">
              {isHindi ? 'StopNCII.org व 24-घंटे वाले लीगल नोटिस से कंटेंट ब्लॉक करवाएं।' : 'Hash on StopNCII to preempt uploads; issue 24-hr notices.'}
            </p>
          </div>

          {/* Phase 4 */}
          <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/15">
            <div className="flex items-center gap-2 text-[#FAF9F6] font-bold text-xs sm:text-sm mb-1.5">
              <span className="w-6 h-6 rounded-full bg-[#E25822] text-white flex items-center justify-center text-xs font-bold shrink-0">4</span>
              <span className="tracking-wide">{isHindi ? 'चरण 4: 1930 / साइबर रिपोर्ट' : 'Phase 4: 1930 & Police FIR'}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#EAE6E1] leading-relaxed">
              {isHindi ? '1930 पर कॉल करें या cybercrime.gov.in पर रिपोर्ट दर्ज करें।' : 'Dial 1930 to freeze fraudster accounts & file formal e-FIR.'}
            </p>
          </div>
        </div>
      </div>

      {/* Selected Scenario Action Detail */}
      <div className="bg-white rounded-3xl border border-[#F0EBE6] p-5 sm:p-8 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-[#F3EFEC] text-[#8B6D5C] font-bold text-xs uppercase tracking-wider">
              {isHindi ? 'सक्रिय स्थिति' : 'Active Scenario Protocol'}
            </span>
            <span className="text-xs text-[#AAA]">•</span>
            <span className="text-xs font-bold text-[#E25822] tracking-wide">{currentNode.urgencyLevel} PRIORITY</span>
          </div>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1A1A1A] tracking-tight">{currentNode.title[language]}</h3>
          <p className="text-sm sm:text-base text-[#444] mt-1.5 leading-relaxed">{currentNode.subtitle[language]}</p>
        </div>

        {/* Immediate Warnings Box */}
        <div className="bg-[#FAF9F6] border-2 border-[#E5DFD9] rounded-2xl p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2.5 text-[#1A1A1A] font-bold text-sm sm:text-base">
            <AlertTriangle className="w-5 h-5 text-[#E25822] shrink-0" />
            <span>{isHindi ? 'अत्यंत महत्वपूर्ण सावधानियां' : 'Critical Immediate Steps & Guidance'}</span>
          </div>
          <ul className="space-y-2.5 pl-5 list-disc text-sm sm:text-base text-[#333]">
            {currentNode.immediateWarnings[language].map((warning, idx) => (
              <li key={idx} className="leading-relaxed">
                {warning}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Steps Grid */}
        <div className="space-y-4 pt-2">
          <h4 className="text-xs sm:text-sm font-bold text-[#8B6D5C] uppercase tracking-[0.18em]">
            {isHindi ? 'कदम-दर-कदम समाधान प्रक्रिया' : 'Step-by-Step Action Workflow'}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentNode.actionSteps.map((step) => (
              <div
                key={step.stepNumber}
                className="bg-[#FAF9F6] border border-[#E8E2DC] hover:border-[#8B6D5C] rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-colors space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#8B6D5C] text-white flex items-center justify-center text-xs sm:text-sm font-bold shrink-0">
                      {step.stepNumber}
                    </span>
                    <h5 className="font-bold text-[#1A1A1A] text-sm sm:text-base leading-snug">{step.title[language]}</h5>
                  </div>
                  <p className="text-xs sm:text-sm text-[#444] leading-relaxed pl-10">
                    {step.description[language]}
                  </p>
                </div>

                {step.buttonLabel && (
                  <div className="pl-10 pt-1">
                    <button
                      onClick={() => handleStepAction(step.actionType, step.linkUrl)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-[#2D2D2D] hover:text-white text-[#2D2D2D] rounded-full text-xs sm:text-sm font-semibold border border-[#DED9D4] transition-colors shadow-xs cursor-pointer"
                    >
                      {step.actionType === 'draft' && <FileText className="w-4 h-4 text-[#8B6D5C]" />}
                      {step.actionType === 'takedown' && <ShieldCheck className="w-4 h-4 text-[#E25822]" />}
                      {step.actionType === 'call' && <PhoneCall className="w-4 h-4 text-[#E25822]" />}
                      {step.actionType === 'evidence' && <Lock className="w-4 h-4 text-[#8B6D5C]" />}
                      {step.actionType === 'portal' && <ExternalLink className="w-4 h-4 text-[#8B6D5C]" />}
                      <span>{step.buttonLabel[language]}</span>
                      {step.linkUrl && <ExternalLink className="w-3.5 h-3.5 text-[#888]" />}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

