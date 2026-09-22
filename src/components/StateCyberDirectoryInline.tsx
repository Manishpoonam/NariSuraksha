/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Phone, 
  PhoneCall, 
  ExternalLink, 
  Copy, 
  Check, 
  Building2, 
  Shield, 
  Info, 
  X, 
  ArrowUpRight, 
  ChevronDown, 
  CheckCircle2, 
  HelpCircle, 
  MessageSquare 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { StateCyberCell } from '../data/stateCyberCells';
import { Language } from '../types';
import { StateLocationDetector } from './StateLocationDetector';
import { LEGAL_DISCLAIMER } from '../data/legalDisclaimer';

interface StateCyberDirectoryInlineProps {
  language: Language;
  onNavigateToFullDirectory?: () => void;
}

export const StateCyberDirectoryInline: React.FC<StateCyberDirectoryInlineProps> = ({
  language,
  onNavigateToFullDirectory
}) => {
  const isHindi = language === 'hi';
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'states' | 'uts'>('all');
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [isDisclaimerExpanded, setIsDisclaimerExpanded] = useState<boolean>(false);
  const [detectedConfirmedState, setDetectedConfirmedState] = useState<string | null>(null);
  const [cells, setCells] = useState<StateCyberCell[]>([]);

  useEffect(() => {
    import('../data/stateCyberCells').then((m) => {
      setCells(m.STATE_CYBER_CELLS);
    });
  }, []);

  const handleConfirmDetectedState = (stateName: string) => {
    setDetectedConfirmedState(stateName);
    setSearchQuery(stateName);
    setFilterType('all');
  };

  const handleClearConfirmedState = () => {
    setDetectedConfirmedState(null);
    setSearchQuery('');
  };

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  const filteredCells = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return cells.filter((item) => {
      const matchesSearch = 
        !q ||
        item.stateOrUT.toLowerCase().includes(q) ||
        (item.stateOrUTHi && item.stateOrUTHi.includes(q)) ||
        (item.women_helpline && item.women_helpline.toLowerCase().includes(q)) ||
        (item.police_emergency && item.police_emergency.toLowerCase().includes(q)) ||
        (item.child_helpline && item.child_helpline.toLowerCase().includes(q)) ||
        (item.alternate_number && item.alternate_number.toLowerCase().includes(q)) ||
        (item.helphoneNumber && item.helphoneNumber.toLowerCase().includes(q));

      const matchesType =
        filterType === 'all' ||
        (filterType === 'states' && !item.isUnionTerritory) ||
        (filterType === 'uts' && item.isUnionTerritory);

      return matchesSearch && matchesType;
    });
  }, [cells, searchQuery, filterType]);

  return (
    <div className="mt-3 p-3.5 sm:p-5 rounded-2xl bg-[#FAF8F3] border border-[#E8E2DC] space-y-4">
      {/* Directory Header */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#0F6E56]/10 text-[#0F6E56] flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
                {isHindi ? 'राज्य व केंद्रशासित प्रदेश सुरक्षा एवं सहायता निर्देशिका (36)' : 'State & UT Safety & Support Directory (36)'}
              </h4>
              <p className="text-[11px] text-[#666]">
                {isHindi 
                  ? 'सभी 28 राज्यों और 8 केंद्रशासित प्रदेशों के संपर्क नंबर व सहायता पोर्टल' 
                  : 'Public safety contacts & portals for all 28 States and 8 Union Territories'}
              </p>
            </div>
          </div>

          {onNavigateToFullDirectory && (
            <button
              type="button"
              onClick={onNavigateToFullDirectory}
              className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-[#0F6E56] hover:underline shrink-0 cursor-pointer pt-0.5"
            >
              <span>{isHindi ? 'विस्तृत डायरेक्टरी खोलें' : 'Open Full Guide'}</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Compact Single-Line Collapsible Non-Affiliation Disclaimer (Item 5) */}
        <div className="rounded-xl bg-white border border-[#E8E2DC] p-2 sm:p-2.5 text-[11px] text-[#555] transition-all">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <Info className="w-3.5 h-3.5 text-[#0F6E56] shrink-0" />
              <span className="truncate">
                {LEGAL_DISCLAIMER.short[language]}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsDisclaimerExpanded((prev) => !prev)}
              aria-expanded={isDisclaimerExpanded}
              className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#0F6E56] hover:underline shrink-0 cursor-pointer ml-1"
            >
              <span>
                {isDisclaimerExpanded 
                  ? (isHindi ? 'कम दिखाएं' : 'Show less') 
                  : (isHindi ? 'अधिक जानें' : 'Learn more')}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDisclaimerExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <AnimatePresence>
            {isDisclaimerExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="pt-2 mt-2 border-t border-[#F0EBE6] text-[#666] leading-relaxed">
                  {LEGAL_DISCLAIMER.full[language]}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* On-device Location Auto-Detect Prompt & Confirmation Suggestion */}
      <StateLocationDetector
        isHindi={isHindi}
        onConfirmState={handleConfirmDetectedState}
        activeConfirmedState={detectedConfirmedState}
        onClearConfirmedState={handleClearConfirmedState}
      />

      {/* Search Bar & Filter Chips (Clean, untruncated placeholder) */}
      <div className="space-y-2.5">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (detectedConfirmedState && e.target.value !== detectedConfirmedState) {
                setDetectedConfirmedState(null);
              }
            }}
            placeholder={
              isHindi
                ? 'राज्य या UT खोजें (उदा. Delhi, Maharashtra)...'
                : 'Search State or UT (e.g. Delhi, Maharashtra)'
            }
            aria-label={isHindi ? 'राज्य या UT खोजें' : 'Search State or Union Territory'}
            className="w-full pl-9 pr-9 py-2.5 bg-white border border-[#DED9D4] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#0F6E56] text-[#1A1A1A] placeholder:text-[#999] transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setDetectedConfirmedState(null);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#888] hover:text-[#222] cursor-pointer"
              aria-label={isHindi ? 'खोज साफ़ करें' : 'Clear search'}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filters and Count */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => {
                setFilterType('all');
                if (searchQuery) setSearchQuery('');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filterType === 'all' && !searchQuery.trim()
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'bg-white text-[#555] border border-[#E8E2DC] hover:bg-[#F3EFEA]'
              }`}
            >
              {isHindi ? 'सभी (36)' : 'All (36)'}
            </button>

            <button
              type="button"
              onClick={() => setFilterType('states')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filterType === 'states'
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'bg-white text-[#555] border border-[#E8E2DC] hover:bg-[#F3EFEA]'
              }`}
            >
              {isHindi ? `28 राज्य` : `28 States`}
            </button>

            <button
              type="button"
              onClick={() => setFilterType('uts')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filterType === 'uts'
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'bg-white text-[#555] border border-[#E8E2DC] hover:bg-[#F3EFEA]'
              }`}
            >
              {isHindi ? `8 केंद्रशासित प्रदेश (UTs)` : `8 UTs`}
            </button>

            {/* When a search or location query filter is active, render a distinct "Filtered" pill */}
            {searchQuery.trim() && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#1A1A1A] text-white shadow-xs">
                <span>{isHindi ? `फ़िल्टर: "${searchQuery.trim()}"` : `Filtered: "${searchQuery.trim()}"`}</span>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label={isHindi ? 'फ़िल्टर हटाएं' : 'Remove filter'}
                  className="hover:text-[#F3EFEA] ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>

          <span className="text-[11px] text-[#777] font-medium ml-auto">
            {isHindi 
              ? `प्रदर्शित: ${filteredCells.length} / 36`
              : `Showing ${filteredCells.length} of 36`}
          </span>
        </div>
      </div>

      {/* Directory Grid: single column on mobile, 2 columns on tablet & desktop */}
      {/* Item 2: Enforced consistent card height (min-h-[200px] sm:min-h-[210px] h-full) */}
      <div className="max-h-[420px] sm:max-h-[460px] overflow-y-auto pr-1 space-y-2.5 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-2 gap-2.5">
        {filteredCells.map((cell) => {
          const hasPhone = Boolean(cell.helphoneNumber);
          const rawPhone = cell.helphoneNumber ? cell.helphoneNumber.split('/')[0].trim().replace(/\s+/g, '') : '1930';

          return (
            <div
              key={cell.stateOrUT}
              className="p-3.5 rounded-xl bg-white border border-[#E8E2DC] hover:border-[#C5BCB6] transition-all flex flex-col justify-between min-h-[175px] sm:min-h-[185px] h-full shadow-2xs"
            >
              {/* Top Section: Header, Badge, & Verified Date if present */}
              <div className="space-y-1.5">
                {/* State/UT Header & Badge (Clean text with no overlapping title tooltip) */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h5 className="font-bold text-xs sm:text-sm text-[#1A1A1A] leading-snug">
                      {cell.stateOrUT}
                    </h5>
                    {isHindi && cell.stateOrUTHi && (
                      <span className="block text-[11px] font-normal text-[#666] leading-tight">
                        {cell.stateOrUTHi}
                      </span>
                    )}
                  </div>

                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shrink-0 ${
                    cell.isUnionTerritory 
                      ? 'bg-amber-100 text-amber-900 border border-amber-200' 
                      : 'bg-teal-50 text-teal-800 border border-teal-200'
                  }`}>
                    {cell.isUnionTerritory ? 'UT' : 'State'}
                  </span>
                </div>

                {/* Verification status label on every card: "Verified: [date]" or "Unverified — confirm before relying" */}
                <div className="pt-0.5 flex items-center gap-1 text-[10px]">
                  {cell.verifiedDate ? (
                    <div className="flex items-center gap-1 font-semibold text-[#0F6E56]">
                      <CheckCircle2 className="w-3 h-3 text-[#0F6E56] shrink-0" />
                      <span>{isHindi ? `सत्यापित: ${cell.verifiedDate}` : `Verified: ${cell.verifiedDate}`}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 font-medium text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                      <HelpCircle className="w-3 h-3 text-amber-700 shrink-0" />
                      <span>{isHindi ? 'सत्यापन शेष — पहले पुष्टि करें' : 'Unverified — confirm before relying'}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Middle Section: Structured Numbers & Coverage */}
              <div className="flex-1 flex flex-col justify-center my-2 space-y-1.5 text-xs">
                {/* Women Helpline or Main Helpline Row */}
                {cell.women_helpline ? (
                  <div className="p-2 rounded-lg bg-[#FAF8F3] border border-[#E8E2DC] flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 font-mono font-bold text-[#1A1A1A]">
                        <Phone className="w-3.5 h-3.5 text-[#0F6E56] shrink-0" />
                        <span className="truncate">{cell.women_helpline}</span>
                      </div>
                      <span className="text-[10px] text-[#666]">
                        {isHindi ? 'महिला हेल्पलाइन' : 'Women Helpline'} • {cell.coverage}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(cell.women_helpline!)}
                      className="p-1 rounded text-[#777] hover:text-[#111] hover:bg-white transition-colors cursor-pointer shrink-0"
                      aria-label={isHindi ? 'नंबर कॉपी करें' : 'Copy number'}
                    >
                      {copiedNumber === cell.women_helpline ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                ) : cell.alternate_number ? (
                  <div className="p-2 rounded-lg bg-[#FAF8F3] border border-[#E8E2DC] flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 font-mono font-bold text-[#1A1A1A]">
                        <Phone className="w-3.5 h-3.5 text-[#8B6D5C] shrink-0" />
                        <span className="truncate">{cell.alternate_number}</span>
                      </div>
                      <span className="text-[10px] text-[#666]">
                        {isHindi ? 'साइबर थाना / हेल्पलाइन' : 'Cyber Unit'} • {cell.coverage}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(cell.alternate_number!)}
                      className="p-1 rounded text-[#777] hover:text-[#111] hover:bg-white transition-colors cursor-pointer shrink-0"
                      aria-label={isHindi ? 'नंबर कॉपी करें' : 'Copy number'}
                    >
                      {copiedNumber === cell.alternate_number ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-lg bg-amber-50/80 border border-amber-200/90 text-[11px] text-amber-950 space-y-0.5">
                    <div className="flex items-center gap-1 font-semibold text-amber-900">
                      <Shield className="w-3 h-3 text-amber-700 shrink-0" />
                      <span>{isHindi ? 'राष्ट्रीय हेल्पलाइन 1930 से संपर्क करें' : 'Contact via 1930 (National Helpline)'}</span>
                    </div>
                    <p className="text-[10px] text-amber-800 leading-tight">
                      {isHindi 
                        ? 'केंद्रीय 1930 या आपातकाल में 112 पर सीधे कॉल करें।'
                        : 'Call 24/7 National 1930 or 112 police emergency.'}
                    </p>
                  </div>
                )}

                {/* WhatsApp Status Row */}
                <div className="p-1.5 px-2 rounded-lg bg-[#FAF8F3] border border-[#E8E2DC] flex items-center justify-between gap-2 text-[11px]">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="text-[#666] shrink-0">WhatsApp:</span>
                    {cell.women_whatsapp ? (() => {
                      const cleanDigits = cell.women_whatsapp.replace(/\D/g, '');
                      const waNum = cleanDigits.startsWith('91') && cleanDigits.length > 10 ? cleanDigits : `91${cleanDigits}`;
                      return (
                        <a
                          href={`https://wa.me/${waNum}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono font-bold text-emerald-700 hover:text-emerald-800 underline underline-offset-2 decoration-emerald-400 hover:decoration-emerald-700 inline-flex items-center gap-1 transition-colors truncate"
                          aria-label={`Open WhatsApp chat with ${cell.women_whatsapp}`}
                        >
                          <span>{cell.women_whatsapp}</span>
                          <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-70" />
                        </a>
                      );
                    })() : (
                      <span className="text-[#888] italic text-[10px] truncate">
                        {isHindi ? 'आधिकारिक रूप से प्रकाशित नहीं' : 'Not officially published'}
                      </span>
                    )}
                  </div>
                  {cell.women_whatsapp && (() => {
                    const cleanDigits = cell.women_whatsapp.replace(/\D/g, '');
                    const waNum = cleanDigits.startsWith('91') && cleanDigits.length > 10 ? cleanDigits : `91${cleanDigits}`;
                    return (
                      <a
                        href={`https://wa.me/${waNum}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold transition-colors shrink-0"
                        aria-label={`Open WhatsApp chat with ${cell.women_whatsapp}`}
                      >
                        {isHindi ? 'चैट' : 'Chat'}
                      </a>
                    );
                  })()}
                </div>
              </div>

              {/* Bottom Section: Separate Call & Portal Actions */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#F0EBE6]">
                {cell.women_helpline ? (
                  <a
                    href={`tel:${cell.women_helpline.replace(/\s+/g, '')}`}
                    aria-label={`${isHindi ? 'कॉल करें' : 'Call'} ${cell.women_helpline}`}
                    className="flex-1 min-w-[115px] inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#0F6E56] hover:bg-[#0b5442] text-white text-xs font-semibold transition-colors shadow-2xs cursor-pointer min-h-[36px] whitespace-nowrap"
                  >
                    <PhoneCall className="w-3 h-3 shrink-0" />
                    <span>{isHindi ? `कॉल ${cell.women_helpline}` : `Call ${cell.women_helpline}`}</span>
                  </a>
                ) : cell.alternate_number ? (
                  <a
                    href={`tel:${cell.alternate_number.replace(/\s+/g, '')}`}
                    aria-label={`${isHindi ? 'कॉल करें' : 'Call'} ${cell.alternate_number}`}
                    className="flex-1 min-w-[115px] inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#FAF8F3] hover:bg-[#F3EFEA] border border-[#E8E2DC] text-[#1A1A1A] text-xs font-semibold transition-colors cursor-pointer min-h-[36px] whitespace-nowrap"
                  >
                    <PhoneCall className="w-3 h-3 text-[#8B6D5C] shrink-0" />
                    <span>{isHindi ? 'कॉल करें' : 'Call Unit'}</span>
                  </a>
                ) : (
                  <a
                    href="tel:1930"
                    aria-label={isHindi ? '1930 कॉल करें' : 'Call 1930'}
                    className="flex-1 min-w-[100px] inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors cursor-pointer min-h-[36px] whitespace-nowrap"
                  >
                    <PhoneCall className="w-3 h-3 shrink-0" />
                    <span>{isHindi ? '1930 कॉल' : 'Call 1930'}</span>
                  </a>
                )}

                {cell.police_emergency && (
                  <a
                    href={`tel:${cell.police_emergency.replace(/\s+/g, '')}`}
                    aria-label={`${isHindi ? 'पुलिस 112' : 'Police 112'}`}
                    className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#FAF8F3] hover:bg-[#F3EFEA] border border-[#E8E2DC] text-[#8B6D5C] text-xs font-semibold transition-colors cursor-pointer min-h-[36px] shrink-0 whitespace-nowrap"
                  >
                    <PhoneCall className="w-3 h-3 shrink-0" />
                    <span>112</span>
                  </a>
                )}

                {cell.portalUrl && (
                  <a
                    href={cell.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${cell.stateOrUT} ${isHindi ? 'पुलिस पोर्टल खोलें' : 'Police Portal'}`}
                    className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#FAF8F3] hover:bg-[#F3EFEA] text-[#333] border border-[#E8E2DC] text-xs font-medium transition-colors cursor-pointer min-h-[36px] shrink-0 whitespace-nowrap"
                  >
                    <span className="text-[11px]">{isHindi ? 'पोर्टल' : 'Portal'}</span>
                    <ExternalLink className="w-3 h-3 text-[#666] shrink-0" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredCells.length === 0 && (
        <div className="p-6 text-center bg-white rounded-xl border border-[#E8E2DC] space-y-2">
          <p className="text-xs sm:text-sm font-semibold text-[#333]">
            {isHindi ? 'कोई राज्य या UT नहीं मिला' : 'No State or Union Territory Found'}
          </p>
          <p className="text-[11px] text-[#666]">
            {isHindi ? 'कृपया दूसरा नाम खोजें या फ़िल्टर साफ़ करें।' : 'Try checking spelling or clear your search query.'}
          </p>
          <button
            type="button"
            onClick={() => { setSearchQuery(''); setFilterType('all'); }}
            className="text-xs font-bold text-[#0F6E56] hover:underline cursor-pointer pt-1"
          >
            {isHindi ? 'सभी 36 राज्य व UT देखें' : 'Reset and show all 36 States & UTs'}
          </button>
        </div>
      )}

      {/* Footer helpline note */}
      <div className="pt-2 border-t border-[#F0EBE6] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[#666]">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-semibold text-[#1A1A1A]">
            {isHindi ? 'आपातकालीन हस्तक्षेप:' : 'Immediate Crisis Intervention:'}
          </span>
          <a
            href="tel:1930"
            className="inline-flex items-center gap-1 font-mono font-bold text-[#0F6E56] hover:underline"
          >
            <Phone className="w-3 h-3 shrink-0" />
            <span>1930 {isHindi ? '(साइबर अपराध)' : '(Cyber Crime)'}</span>
          </a>
          <span className="text-[#CCC]">|</span>
          <a
            href="tel:112"
            className="inline-flex items-center gap-1 font-mono font-bold text-[#8B6D5C] hover:underline"
          >
            <Phone className="w-3 h-3 shrink-0" />
            <span>112 {isHindi ? '(पुलिस / आपातकालीन)' : '(Police Emergency)'}</span>
          </a>
        </div>

        {onNavigateToFullDirectory && (
          <button
            type="button"
            onClick={onNavigateToFullDirectory}
            className="sm:hidden self-start text-xs font-semibold text-[#0F6E56] hover:underline cursor-pointer flex items-center gap-0.5"
          >
            <span>{isHindi ? 'पूरी गाइड व विस्तृत डायरेक्टरी' : 'Full Guide & Detailed Directory'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
