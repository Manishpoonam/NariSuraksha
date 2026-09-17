/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Scale, 
  FileText, 
  Building2, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  PhoneCall, 
  BookOpen, 
  ExternalLink,
  Lock,
  Sparkles,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { Language, IncidentCategory } from '../types';
import { hapticAction } from '../utils/haptics';
import { ComplaintDraftGenerator } from './ComplaintDraftGenerator';
import { NationalCyberPortalHub } from './NationalCyberPortalHub';
import { LegalRightsFAQ } from './LegalRightsFAQ';
import { StateCyberDirectory } from './StateCyberDirectory';
import { IndianGovGuidelines } from './IndianGovGuidelines';

interface GuidedReportPortalProps {
  language: Language;
  initialCategory?: IncidentCategory;
  onNavigateToTab?: (tab: string, elementId?: string) => void;
  activeSubView?: 'drafts' | 'national_portal';
  onSelectSubView?: (view: 'drafts' | 'national_portal') => void;
}

export const GuidedReportPortal: React.FC<GuidedReportPortalProps> = ({
  language,
  initialCategory = 'extortion_blackmail',
  onNavigateToTab,
  activeSubView: controlledSubView,
  onSelectSubView: controlledOnSelectSubView,
}) => {
  const isHindi = language === 'hi';

  const [internalSubView, setInternalSubView] = useState<'drafts' | 'national_portal'>('drafts');
  const activeSubView = controlledSubView || internalSubView;
  const setActiveSubView = (view: 'drafts' | 'national_portal') => {
    hapticAction();
    if (controlledOnSelectSubView) {
      controlledOnSelectSubView(view);
    } else {
      setInternalSubView(view);
    }
  };

  // Collapsible drawers for secondary legal references
  const [showLegalRights, setShowLegalRights] = useState<boolean>(false);
  const [showStateDirectory, setShowStateDirectory] = useState<boolean>(false);
  const [showGovGuidelines, setShowGovGuidelines] = useState<boolean>(false);

  return (
    <div className="space-y-6 scroll-mt-48" id="guided-report-portal">
      {/* 1. PRIMARY WORKSPACE: Open directly on working wizard or national portal view */}
      {activeSubView === 'drafts' ? (
        <ComplaintDraftGenerator 
          language={language} 
          initialCategory={initialCategory} 
        />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#E8E2DC]">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#8B6D5C]" />
              <span className="font-semibold text-sm text-[#1A1A1A]">
                {isHindi ? 'राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल (cybercrime.gov.in)' : 'National Cyber Crime Reporting Portal (1930 / cybercrime.gov.in)'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveSubView('drafts')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#FAF8F3] hover:bg-white border border-[#E8E2DC] text-[#8B6D5C] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isHindi ? 'ई-एफआईआर ड्राफ्ट पर वापस जाएं' : 'Back to Draft Generator'}</span>
            </button>
          </div>
          <NationalCyberPortalHub 
            language={language} 
            onNavigateToDrafts={() => setActiveSubView('drafts')}
            onNavigateToTab={onNavigateToTab}
          />
        </div>
      )}

      {/* 2. COLLAPSIBLE LEGAL REFERENCE ACCORDIONS */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6D5C]">
            {isHindi ? 'अतिरिक्त कानूनी संदर्भ व सरकारी निर्देशिका:' : 'Legal Rights, State Cells & Official Directory:'}
          </h3>
        </div>

        {/* Accordion 1: Your Legal Rights & Statutory Protections */}
        <div className="rounded-3xl bg-white border border-[#E8E2DC] shadow-xs overflow-hidden">
          <button
            type="button"
            onClick={() => {
              hapticAction();
              setShowLegalRights((prev) => !prev);
            }}
            className="w-full p-5 sm:p-6 flex items-center justify-between text-left cursor-pointer hover:bg-[#FAF8F3]/60 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E1F5EE] text-[#0F6E56] flex items-center justify-center shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm sm:text-base font-bold text-[#1A1A1A]">
                    {isHindi ? 'आपके कानूनी अधिकार एवं संरक्षण (BNS व IT Act)' : 'Your Statutory Legal Rights & Protections (BNS & IT Act)'}
                  </h4>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#E1F5EE] text-[#0F6E56] border border-[#B7E4D7] hidden sm:inline-block">
                    {isHindi ? 'FAQ' : 'Legal FAQ'}
                  </span>
                </div>
                <p className="text-xs text-[#666]">
                  {isHindi
                    ? 'पुलिस माता-पिता को नहीं बताएगी, पीड़िता पर कोई धारा नहीं लगती, और महिला पुलिस अधिकारी द्वारा बयान दर्ज होना कानूनन अनिवार्य है।'
                    : 'Statutory guarantees: Zero victim liability, strict adult privacy, and mandatory female officer statement recording under BNSS Section 173.'}
                </p>
              </div>
            </div>
            <div className="shrink-0 p-1.5 rounded-full bg-black/5 text-[#555]">
              {showLegalRights ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {showLegalRights && (
            <div className="p-5 sm:p-6 pt-2 border-t border-[#F0EBE6]">
              <LegalRightsFAQ language={language} />
            </div>
          )}
        </div>

        {/* Accordion 2: State Cyber Cells Directory */}
        <div className="rounded-3xl bg-white border border-[#E8E2DC] shadow-xs overflow-hidden">
          <button
            type="button"
            onClick={() => {
              hapticAction();
              setShowStateDirectory((prev) => !prev);
            }}
            className="w-full p-5 sm:p-6 flex items-center justify-between text-left cursor-pointer hover:bg-[#FAF8F3]/60 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/70 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-amber-800" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm sm:text-base font-bold text-[#1A1A1A]">
                    {isHindi ? 'राज्य साइबर अपराध पुलिस सेल निर्देशिका' : 'State Cyber Crime Police Directory (All 28 States & UTs)'}
                  </h4>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/80 inline-flex items-center gap-1">
                    {isHindi ? 'निर्देशिका — सत्यापन जारी' : 'Directory — Under Verification'}
                  </span>
                </div>
                <p className="text-xs text-[#666]">
                  {isHindi
                    ? 'दिल्ली, महाराष्ट्र, यूपी, कर्नाटक सहित सभी राज्यों के राज्य साइबर मुख्यालय के सीधे फोन नंबर और ईमेल।'
                    : 'Direct contact details, nodal officer phone numbers, and official emails for cyber crime headquarters nationwide.'}
                </p>
              </div>
            </div>
            <div className="shrink-0 p-1.5 rounded-full bg-black/5 text-[#555]">
              {showStateDirectory ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {showStateDirectory && (
            <div className="p-3.5 sm:p-6 pt-2 border-t border-[#F0EBE6]">
              <StateCyberDirectory language={language} />
            </div>
          )}
        </div>

        {/* Accordion 3: Government Guidelines & SOPs */}
        <div className="rounded-3xl bg-white border border-[#E8E2DC] shadow-xs overflow-hidden">
          <button
            type="button"
            onClick={() => {
              hapticAction();
              setShowGovGuidelines((prev) => !prev);
            }}
            className="w-full p-5 sm:p-6 flex items-center justify-between text-left cursor-pointer hover:bg-[#FAF8F3]/60 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm sm:text-base font-bold text-[#1A1A1A]">
                    {isHindi ? 'सरकारी दिशानिर्देश एवं मानक संचालन प्रक्रिया (MHA SOPs)' : 'Official Indian Government Guidelines & SOPs'}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 hidden sm:inline-block">
                    {isHindi ? 'SOP' : 'Official SOP'}
                  </span>
                </div>
                <p className="text-xs text-[#666]">
                  {isHindi
                    ? 'गृह मंत्रालय और साइबर सुरक्षा केंद्र (I4C) द्वारा जारी किए गए नागरिक परामर्श व जांच प्रक्रिया।'
                    : 'Ministry of Home Affairs & Indian Cyber Crime Coordination Centre (I4C) official advisory manuals.'}
                </p>
              </div>
            </div>
            <div className="shrink-0 p-1.5 rounded-full bg-black/5 text-[#555]">
              {showGovGuidelines ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {showGovGuidelines && (
            <div className="p-5 sm:p-6 pt-2 border-t border-[#F0EBE6]">
              <IndianGovGuidelines 
                language={language} 
                onNavigateToTab={onNavigateToTab} 
                onOpenLegalRights={() => setShowLegalRights(true)}
              />
            </div>
          )}
        </div>
      </div>

      {/* 3. CANONICAL ABOUT LINK (SINGLE NON-REDUNDANT ENTRY) */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => {
            hapticAction();
            onNavigateToTab?.('support', 'about-trust-section');
          }}
          className="w-full p-4 rounded-2xl bg-[#FAF8F3] hover:bg-white border border-[#E8E2DC] text-left flex items-center justify-between text-[#555] hover:text-[#1A1A1A] transition-all group cursor-pointer shadow-2xs"
        >
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#0F6E56]" />
            <span className="text-xs sm:text-sm font-semibold">
              {isHindi ? 'नारी सुरक्षा और शून्य डेटा संग्रहण गारंटी के बारे में जानें' : 'About NariSuraksha & Privacy Guarantee'}
            </span>
          </div>
          <span className="text-xs font-bold text-[#993556] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
            <span>{isHindi ? 'विवरण देखें' : 'Learn more'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </button>
      </div>
    </div>
  );
};
