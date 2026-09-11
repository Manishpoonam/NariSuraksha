/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  PhoneCall, 
  ExternalLink, 
  Clock, 
  Lock, 
  Globe,
  Info,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { HELPLINE_ITEMS } from '../data/helplinesData';
import { Language } from '../types';
import { hapticPanic, hapticAction } from '../utils/haptics';

interface HelplineDirectoryProps {
  language: Language;
}

/**
 * Trauma-Informed 24/7 Helpline Directory
 * 
 * DESIGN RATIONALE:
 * 1. Dismantling the "Fear of the Unknown": Victims frequently delay calling helplines out of terror
 *    that police will alert their parents, judge their lifestyle, or leak their private photos.
 *    Adding a dedicated "What happens when you call" explanation for each number restores agency and courage.
 * 2. Large Touch Targets (≥48px): Sized for hands that may be trembling or impaired by acute panic.
 * 3. Warm, Non-Bureaucratic Aesthetic: Soft cards with deep plum (#26215C) and soft teal (#0F6E56) accents.
 */
export const HelplineDirectory: React.FC<HelplineDirectoryProps> = ({ language }) => {
  const isHindi = language === 'hi';
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedCallInfo, setExpandedCallInfo] = useState<Record<string, boolean>>({});

  const toggleCallInfo = (id: string) => {
    setExpandedCallInfo(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getCallExpectation = (id: string) => {
    switch (id) {
      case 'cybercrime_1930':
        return {
          en: 'You speak to an MHA cyber officer. They will ask for transaction ID or blackmailer’s handle, immediately log a priority freeze alert with your bank and telecom provider, and provide an incident acknowledgement token. No shame, no moral lecturing.',
          hi: 'आप गृह मंत्रालय के प्रशिक्षित साइबर अधिकारी से बात करेंगे। वे केवल ट्रांजेक्शन ID या ब्लैकमेलर का नंबर पूछेंगे और तुरंत बैंक खाता फ्रीज करने का अलर्ट जारी करेंगे। कोई पूछताछ या डांट-फटकार नहीं।'
        };
      case 'ncw_helpline':
        return {
          en: 'You speak with an NCW women’s rights counselor. If local police are unresponsive, NCW escalates directly to the state DGP or Cyber Crime Cell head to ensure your complaint is registered under identity-protection provisions.',
          hi: 'राष्ट्रीय महिला आयोग की महिला परामर्शदाता आपसे बात करेंगी। यदि स्थानीय पुलिस सहयोग नहीं करती, तो NCW सीधे राज्य पुलिस महानिदेशक (DGP) से समन्वय कर कार्रवाई कराती है।'
        };
      case 'women_police_1091':
        return {
          en: 'Connects directly to the Women Helpdesk of your state police. By law, statements in intimate harassment cases must be recorded exclusively by female officers in civil clothes.',
          hi: 'सीधे आपके राज्य के महिला पुलिस हेल्पडेस्क से जुड़ता है। कानूनन आपका बयान केवल महिला अधिकारी द्वारा सादे कपड़ों में दर्ज किया जाता है।'
        };
      case 'vandrevala_foundation':
      case 'tele_manas':
        return {
          en: 'You speak with an accredited clinical psychologist or crisis counselor. Completely anonymous and free. They help regulate severe anxiety, panic tremors, and suicidal ideation, providing immediate grounding.',
          hi: 'मान्यता प्राप्त मनोवैज्ञानिक या थेरेपिस्ट से बात होगी। 100% मुफ्त व गोपनीय। यह गंभीर घबराहट और डर को शांत करने में मदद करते हैं।'
        };
      default:
        return {
          en: 'Trained counselor provides confidential advice, emergency psychological support, and legal guidance. Your personal details are never publicized.',
          hi: 'प्रशिक्षित परामर्शदाता द्वारा निःशुल्क और गोपनीय कानूनी व मानसिक सहायता। आपकी पहचान कभी उजागर नहीं की जाती।'
        };
    }
  };

  const filteredHelplines = HELPLINE_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesName = item.name.en.toLowerCase().includes(query) || item.name.hi.toLowerCase().includes(query);
    const matchesNumber = item.number.toLowerCase().includes(query);
    const matchesDesc = item.description.en.toLowerCase().includes(query) || item.description.hi.toLowerCase().includes(query);
    const matchesBadge = item.badge.en.toLowerCase().includes(query) || item.badge.hi.toLowerCase().includes(query);

    return matchesCategory && (matchesName || matchesNumber || matchesDesc || matchesBadge);
  });

  return (
    <section id="helpline-directory" className="space-y-6 scroll-mt-36 sm:scroll-mt-48">
      <div className="border-b border-[#26215C]/10 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-[#26215C] text-[#FAF8F3] flex items-center justify-center">
            <PhoneCall className="w-4 h-4 text-[#E1F5EE]" />
          </span>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#26215C] tracking-tight">
            {isHindi ? '24/7 सत्यापित आपातकालीन हेल्पलाइन डायरेक्टरी' : '24/7 Verified Crisis & Emergency Helplines'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#5A5672] mt-1 font-normal">
          {isHindi
            ? 'भारत सरकार और राष्ट्रीय महिला आयोग द्वारा संचालित 100% गोपनीय, निःशुल्क व त्वरित सहायता केंद्र।'
            : 'Official, toll-free, 24/7 helplines for urgent cyber police intervention, psychological first-aid, and legal aid.'}
        </p>
      </div>

      {/* Search Bar & Category Tabs */}
      <div className="space-y-3">
        {/* Quick Search */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isHindi ? 'हेल्पलाइन खोजें (उदा: 1930, पुलिस, महिला, डिप्रेशन, साइबर)...' : 'Search helplines (e.g., 1930, police, NCW, panic, cyber)...'}
            className="w-full text-base sm:text-sm pl-4 pr-10 py-3 rounded-2xl border border-[#26215C]/15 bg-white text-[#26215C] placeholder-[#85819C] focus:outline-none focus:border-[#26215C] shadow-soft"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#5A5672] hover:text-[#26215C] px-2 py-1 rounded-md bg-[#FAF8F3] cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          {[
            { id: 'all', label: isHindi ? 'सभी नंबर' : 'All Helplines' },
            { id: 'police', label: isHindi ? 'साइबर पुलिस (1930 / 112)' : 'Cyber Police' },
            { id: 'women_crisis', label: isHindi ? 'महिला सुरक्षा (1091 / NCW)' : 'Women Safety' },
            { id: 'mental_health', label: isHindi ? 'मानसिक स्वास्थ्य / तनाव' : 'Trauma & Counseling' },
            { id: 'legal_aid', label: isHindi ? 'मुफ्त कानूनी सहायता' : 'Free Legal Aid' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                hapticAction();
                setActiveCategory(cat.id);
              }}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer select-none min-h-[40px] ${
                activeCategory === cat.id
                  ? 'bg-[#26215C] text-white shadow-soft'
                  : 'bg-white text-[#5A5672] border border-[#26215C]/12 hover:bg-[#FAF8F3]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Empty Search Result Fallback */}
      {filteredHelplines.length === 0 && (
        <div className="bg-white p-8 rounded-3xl border border-[#26215C]/10 text-center space-y-3">
          <PhoneCall className="w-8 h-8 text-[#5A5672] mx-auto opacity-50" />
          <h3 className="font-bold text-[#26215C] text-base">
            {isHindi ? 'कोई हेल्पलाइन नहीं मिली' : 'No Helplines Found'}
          </h3>
          <p className="text-xs text-[#5A5672]">
            {isHindi ? 'कृपया दूसरा कीवर्ड खोजें या सभी नंबर देखें।' : 'Try searching with another keyword or clear the search filter.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="px-4 py-2 rounded-full bg-[#26215C] text-white text-xs font-bold cursor-pointer"
          >
            {isHindi ? 'फ़िल्टर हटाएं' : 'Reset Search'}
          </button>
        </div>
      )}

      {/* Helplines Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredHelplines.map((item) => {
          const expectation = getCallExpectation(item.id);
          const isExpanded = !!expandedCallInfo[item.id];

          return (
            <div
              key={item.id}
              className="bg-white rounded-[22px] border border-[#26215C]/10 hover:border-[#26215C]/25 p-5 sm:p-6 shadow-soft flex flex-col justify-between space-y-4 transition-all"
            >
              <div className="space-y-3.5">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <span className="text-[11px] font-medium uppercase tracking-wider px-3 py-1 rounded-full bg-[#E1F5EE] text-[#0F6E56]">
                    {item.badge[language]}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#5A5672] bg-[#FAF8F3] px-3 py-1 rounded-full border border-[#26215C]/8">
                    <Clock className="w-3.5 h-3.5 text-[#0F6E56]" />
                    <span>{item.availableHours}</span>
                  </span>
                </div>

                <div>
                  <h3 className="font-semibold text-[#26215C] text-base leading-snug">
                    {item.name[language]}
                  </h3>
                  <div className="mt-2 text-2xl sm:text-3xl font-semibold text-[#26215C] tracking-tight font-mono">
                    {item.number}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#5A5672] leading-relaxed font-normal">
                  {item.description[language]}
                </p>

                {/* Multilingual Support Pill */}
                <div className="flex items-center gap-2 text-xs text-[#5A5672] bg-[#FAF8F3] p-2.5 rounded-xl border border-[#26215C]/8">
                  <Globe className="w-3.5 h-3.5 text-[#993556] shrink-0" />
                  <span>{isHindi ? 'हिन्दी, अंग्रेजी व क्षेत्रीय भाषाएं' : 'Hindi, English & regional languages'}</span>
                </div>

                {/* Removing Fear of Unknown: Expandable "What Happens When You Call" */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => toggleCallInfo(item.id)}
                    className="w-full flex items-center justify-between text-xs text-[#0F6E56] hover:text-[#0A4E3D] font-medium cursor-pointer py-1.5 transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5" />
                      <span>{isHindi ? 'कॉल करने पर क्या होगा? (डरें नहीं)' : 'What happens when you call?'}</span>
                    </span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-2 p-3.5 bg-[#FAF8F3] rounded-xl border border-[#26215C]/8 text-xs text-[#5A5672] leading-relaxed animate-in fade-in duration-200">
                      <p className="font-medium text-[#26215C] mb-1">
                        {isHindi ? 'गोपनीयता की गारंटी:' : 'Confidential Guarantee:'}
                      </p>
                      <p>{expectation[language]}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons: 1-Tap Large Touch Call + Website */}
              <div className="pt-3 border-t border-[#26215C]/8 flex items-center gap-3">
                <a
                  href={item.directDial}
                  onClick={() => hapticPanic()}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#0F6E56] hover:bg-[#0A4E3D] text-white font-medium text-xs sm:text-sm transition-all shadow-soft active:scale-97 cursor-pointer min-h-[46px]"
                >
                  <PhoneCall className="w-4 h-4 text-white" />
                  <span>{isHindi ? 'कॉल करें' : 'Tap to Call'}</span>
                </a>

                {item.website && (
                  <a
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center p-3 rounded-full border border-[#26215C]/12 hover:bg-[#FAF8F3] text-[#26215C] transition-colors cursor-pointer min-h-[46px] min-w-[46px]"
                    title="Official Website"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
