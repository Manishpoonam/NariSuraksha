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
  Sparkles
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
      {/* 1. SINGLE, CLEAR HERO CARD */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E2DC] shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#26215C]/10 text-[#26215C] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-[#26215C]" />
            <span>{isHindi ? 'कानूनी शिकायत एवं पुलिस ई-एफआईआर' : 'Police Complaint & Legal Action'}</span>
          </span>
          <span className="text-xs text-[#777] hidden sm:inline-block">
            {isHindi ? 'BNS धारा 73 व BSA धारा 63 प्रारूप' : 'Sec 73 BNS & Sec 63 BSA Aligned'}
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tight">
          {isHindi 
            ? 'साइबर सेल हेतु औपचारिक शिकायत ड्राफ्ट तैयार करें' 
            : 'Generate Formal Police Complaint Draft & Access National Cyber Portal'}
        </h2>
        
        <p className="text-xs sm:text-sm text-[#666] max-w-3xl leading-relaxed">
          {isHindi
            ? 'भारतीय साक्ष्य अधिनियम (BSA) धारा 63 डिजिटल साक्ष्य घोषणा प्रारूप के साथ पुलिस शिकायत पत्र तैयार करें, या राष्ट्रीय साइबर अपराध पोर्टल (cybercrime.gov.in) पर सीधे शिकायत दर्ज करें। आपकी पहचान कानूनन गोपनीय रखी जाती है।'
            : 'Draft formal complaints with electronic evidence declarations under Section 63 BSA and identity confidentiality safeguards under Section 73 BNS, or report directly through the National Cyber Crime Portal (1930). 100% private and on-device.'}
        </p>

        {/* 2-Option Pill Selector */}
        <div className="pt-1 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveSubView('drafts')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
              activeSubView === 'drafts'
                ? 'bg-[#1A1A1A] text-white shadow-xs scale-102'
                : 'bg-[#FAF8F3] text-[#555] hover:text-[#111] border border-[#E8E2DC] hover:bg-white'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-300" />
            <span>{isHindi ? '1. ई-एफआईआर ड्राफ्ट जनरेटर (PDF)' : '1. e-FIR Draft Generator (PDF)'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubView('national_portal')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
              activeSubView === 'national_portal'
                ? 'bg-[#1A1A1A] text-white shadow-xs scale-102'
                : 'bg-[#FAF8F3] text-[#555] hover:text-[#111] border border-[#E8E2DC] hover:bg-white'
            }`}
          >
            <Building2 className="w-4 h-4 text-indigo-400" />
            <span>{isHindi ? '2. राष्ट्रीय साइबर पोर्टल (1930)' : '2. National Cyber Portal (1930)'}</span>
          </button>
        </div>
      </div>

      {/* 2. PRIMARY WORKSPACE */}
      {activeSubView === 'drafts' ? (
        <ComplaintDraftGenerator language={language} initialCategory={initialCategory} />
      ) : (
        <NationalCyberPortalHub 
          language={language} 
          onNavigateToDrafts={() => setActiveSubView('drafts')}
          onNavigateToTab={onNavigateToTab}
        />
      )}

      {/* 3. COLLAPSIBLE LEGAL REFERENCE ACCORDIONS (ZERO CLUTTER) */}
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
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm sm:text-base font-bold text-[#1A1A1A]">
                    {isHindi ? 'आपके कानूनी अधिकार एवं संरक्षण (BNS व IT Act)' : 'Your Statutory Legal Rights & Protections (BNS & IT Act)'}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 hidden sm:inline-block">
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
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm sm:text-base font-bold text-[#1A1A1A]">
                    {isHindi ? 'राज्य साइबर अपराध पुलिस सेल निर्देशिका' : 'State Cyber Crime Police Directory (All 28 States & UTs)'}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 hidden sm:inline-block">
                    {isHindi ? 'फोन व ईमेल' : 'Verified Contacts'}
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
            <div className="p-5 sm:p-6 pt-2 border-t border-[#F0EBE6]">
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
              <IndianGovGuidelines language={language} onNavigateToTab={onNavigateToTab} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
