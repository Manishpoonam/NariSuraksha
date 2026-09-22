/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Phone, 
  Building2, 
  Shield, 
  Info, 
  X, 
  ArrowUpRight, 
  ChevronDown 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { StateCyberCell } from '../data/stateCyberCellsData';
import { StateCyberCellCard } from './StateCyberCellCard';
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
  const [isDisclaimerExpanded, setIsDisclaimerExpanded] = useState<boolean>(false);
  const [detectedConfirmedState, setDetectedConfirmedState] = useState<string | null>(null);
  const [cells, setCells] = useState<StateCyberCell[]>([]);

  useEffect(() => {
    import('../data/stateCyberCellsData').then((m) => {
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

  const filteredCells = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return cells.filter((item) => {
      const isUT = item.region === 'UT';
      const matchesSearch = 
        !q ||
        item.state.toLowerCase().includes(q) ||
        item.state_code.toLowerCase().includes(q) ||
        (item.stateName?.hi && item.stateName.hi.includes(q)) ||
        (item.stateName?.en && item.stateName.en.toLowerCase().includes(q)) ||
        (item.women_helpline && item.women_helpline.toLowerCase().includes(q)) ||
        (item.police_emergency && item.police_emergency.toLowerCase().includes(q)) ||
        (item.child_helpline && item.child_helpline.toLowerCase().includes(q)) ||
        (item.alternate_number && item.alternate_number.toLowerCase().includes(q)) ||
        (item.headquarters && item.headquarters.toLowerCase().includes(q));

      const matchesType =
        filterType === 'all' ||
        (filterType === 'states' && !isUT) ||
        (filterType === 'uts' && isUT);

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

      {/* Directory Grid */}
      <div className="max-h-[540px] overflow-y-auto pr-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
          {filteredCells.map((cell) => (
            <StateCyberCellCard
              key={cell.id}
              cell={cell}
              language={language}
            />
          ))}
        </div>
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
