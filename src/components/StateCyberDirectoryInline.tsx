/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
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
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { STATE_CYBER_CELLS } from '../data/stateCyberCells';
import { Language } from '../types';

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

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  const filteredCells = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return STATE_CYBER_CELLS.filter((item) => {
      const matchesSearch = 
        !q ||
        item.stateOrUT.toLowerCase().includes(q) ||
        (item.stateOrUTHi && item.stateOrUTHi.includes(q)) ||
        (item.helphoneNumber && item.helphoneNumber.toLowerCase().includes(q));

      const matchesType =
        filterType === 'all' ||
        (filterType === 'states' && !item.isUnionTerritory) ||
        (filterType === 'uts' && item.isUnionTerritory);

      return matchesSearch && matchesType;
    });
  }, [searchQuery, filterType]);

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
                {isHindi ? 'राज्य व केंद्रशासित प्रदेश साइबर सेल डायरेक्टरी (36)' : 'State & UT Cyber Crime Directory (36)'}
              </h4>
              <p className="text-[11px] text-[#666]">
                {isHindi 
                  ? 'सभी 28 राज्यों और 8 केंद्रशासित प्रदेशों के आधिकारिक संपर्क नंबर व पोर्टल' 
                  : 'Official contacts & portals for all 28 States and 8 Union Territories'}
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
                {isHindi
                  ? 'स्वतंत्र उपकरण, सरकार से संबद्ध नहीं — संपर्क सार्वजनिक रिकॉर्ड से संकलित।'
                  : 'Independent tool, not government-affiliated — contacts aggregated from public records.'}
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
                  {isHindi
                    ? 'अस्वीकरण: नारीसुरक्षा एक स्वतंत्र नागरिक सुरक्षा उपकरण है और यह भारत सरकार, राष्ट्रीय महिला आयोग (NCW) या किसी पुलिस प्राधिकरण से संबद्ध नहीं है। हेल्पलाइन विवरण सार्वजनिक आधिकारिक स्रोतों से संकलित हैं। आपातकाल में सीधे 1930 या 112 पर संपर्क करें।'
                    : 'Disclaimer: NariSuraksha is an independent crisis tool and is not affiliated with the Government of India, the National Commission for Women, or any police department. Directory contacts are aggregated from official public records. In immediate danger, dial 1930 or 112 directly.'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Search Bar & Filter Chips (Item 3: Clean, untruncated placeholder) */}
      <div className="space-y-2.5">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#888] hover:text-[#222] cursor-pointer"
              aria-label={isHindi ? 'खोज साफ़ करें' : 'Clear search'}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filters and Count */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filterType === 'all'
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

                {/* Verified date indicator only when set */}
                {cell.verifiedDate && (
                  <div className="pt-0.5 flex items-center gap-1 text-[10px] font-semibold text-[#0F6E56]">
                    <CheckCircle2 className="w-3 h-3 text-[#0F6E56] shrink-0" />
                    <span>{isHindi ? `सत्यापित: ${cell.verifiedDate}` : `Verified: ${cell.verifiedDate}`}</span>
                  </div>
                )}
              </div>

              {/* Middle Section: Helpline or Fallback Box (Flex-1 vertically centers content in consistent height card) */}
              <div className="flex-1 flex flex-col justify-center my-2">
                {hasPhone ? (
                  <div className="p-2.5 rounded-lg bg-[#FAF8F3] border border-[#E8E2DC] flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5 font-mono font-bold text-[#1A1A1A] min-w-0">
                      <Phone className="w-3.5 h-3.5 text-[#0F6E56] shrink-0" />
                      <span className="truncate">{cell.helphoneNumber}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(cell.helphoneNumber!)}
                      className="p-1 rounded text-[#777] hover:text-[#111] hover:bg-white transition-colors cursor-pointer shrink-0"
                      aria-label={isHindi ? 'हेल्पलाइन नंबर कॉपी करें' : 'Copy helpline number'}
                    >
                      {copiedNumber === cell.helphoneNumber ? (
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
                        ? 'स्थानीय सेल नंबर का सत्यापन जारी है — केंद्रीय 1930 पर सीधे कॉल करें।'
                        : 'Local division contact pending verification — routed to 24/7 National 1930 Helpline.'}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Section: Call & Portal Actions (Item 1: Removed native title attributes) */}
              <div className="flex items-center gap-2 pt-2 border-t border-[#F0EBE6]">
                <a
                  href={`tel:${rawPhone}`}
                  aria-label={`${isHindi ? 'कॉल करें' : 'Call'} ${cell.stateOrUT} ${hasPhone ? cell.helphoneNumber : '1930'}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#0F6E56] hover:bg-[#0b5442] text-white text-xs font-semibold transition-colors shadow-2xs cursor-pointer min-h-[36px]"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{hasPhone ? (isHindi ? 'कॉल करें' : 'Call') : (isHindi ? '1930 कॉल करें' : 'Call 1930')}</span>
                </a>

                {cell.portalUrl && (
                  <a
                    href={cell.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${cell.stateOrUT} ${isHindi ? 'पुलिस पोर्टल खोलें' : 'Police Portal'}`}
                    className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-[#FAF8F3] hover:bg-[#F3EFEA] text-[#333] border border-[#E8E2DC] text-xs font-medium transition-colors cursor-pointer min-h-[36px]"
                  >
                    <span className="text-[11px]">{isHindi ? 'पोर्टल' : 'Portal'}</span>
                    <ExternalLink className="w-3 h-3 text-[#666]" />
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
      <div className="flex items-center justify-between text-[11px] text-[#777] pt-1">
        <span>
          {isHindi 
            ? 'किसी भी आपात स्थिति में सीधे 1930 या 112 डायल करें' 
            : 'For immediate crisis intervention, dial 1930 (Cyber) or 112 (Police)'}
        </span>
        {onNavigateToFullDirectory && (
          <button
            type="button"
            onClick={onNavigateToFullDirectory}
            className="sm:hidden text-xs font-semibold text-[#0F6E56] hover:underline cursor-pointer"
          >
            {isHindi ? 'पूरी गाइड →' : 'Full Guide →'}
          </button>
        )}
      </div>
    </div>
  );
};
