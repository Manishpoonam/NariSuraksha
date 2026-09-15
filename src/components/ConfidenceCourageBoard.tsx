import React, { useState, useEffect } from 'react';
import { 
  Pin, 
  Heart, 
  Copy, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Scale, 
  Flame, 
  SunMedium, 
  MessageSquareQuote,
  ExternalLink,
  Lock,
  BookmarkCheck
} from 'lucide-react';
import { Language } from '../types';

interface ConfidenceCourageBoardProps {
  language: Language;
  onNavigateToTab: (tab: string, elementId?: string) => void;
}

interface ConfidencePin {
  id: string;
  category: 'self_worth' | 'legal_truth' | 'power_script' | 'psychology' | 'family';
  tag: { en: string; hi: string };
  title: { en: string; hi: string };
  affirmation: { en: string; hi: string };
  legalFact: { en: string; hi: string };
  actionLabel?: { en: string; hi: string };
  actionTarget?: { tab: string; elementId?: string };
  colorClass: string;
  badgeBg: string;
}

const CONFIDENCE_PINS: ConfidencePin[] = [
  {
    id: 'pin_zero_shame',
    category: 'self_worth',
    tag: { en: '🌸 Zero Shame & Guilt', hi: '🌸 कोई शर्म नहीं • कोई अपराधबोध नहीं' },
    title: { 
      en: 'Trusting someone is human. Betraying trust is a crime.', 
      hi: 'किसी पर विश्वास करना मानवीय है। विश्वासघात करना अपराध है।' 
    },
    affirmation: { 
      en: '"I have done nothing wrong. My dignity is intact, and no criminal with a stolen photo can diminish who I am."', 
      hi: '"मेरी कोई गलती नहीं है। मेरा आत्मसम्मान सुरक्षित है और कोई भी अपराधी चोरी किए गए फोटो से मुझे कमजोर नहीं कर सकता।"' 
    },
    legalFact: { 
      en: 'Article 21 of the Indian Constitution guarantees personal dignity and privacy as fundamental rights. The law strictly punishes the uploader, never the victim.', 
      hi: 'भारतीय संविधान का अनुच्छेद 21 सम्मान व निजता की गारंटी देता है। कानून केवल ब्लैकमेलर को सजा देता है, पीड़िता को कभी नहीं।' 
    },
    colorClass: 'border-rose-100 hover:border-rose-300',
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200'
  },
  {
    id: 'pin_scared_blackmailer',
    category: 'psychology',
    tag: { en: '⚡ The Criminal is Terrified', hi: '⚡ ब्लैकमेलर कानून से कांपता है' },
    title: { 
      en: 'They hide behind screens because they fear 5 years of prison.', 
      hi: 'वे स्क्रीन के पीछे इसलिए छिपते हैं क्योंकि वे 5 साल की जेल से डरते हैं।' 
    },
    affirmation: { 
      en: '"You hold all the legal cards. The moment you refuse to panic and refuse to pay, their entire leverage evaporates."', 
      hi: '"सारा नियंत्रण आपके हाथ में है। जैसे ही आप डरने और पैसे देने से मना करती हैं, ब्लैकमेलर की सारी ताकत खत्म हो जाती है।"' 
    },
    legalFact: { 
      en: 'Section 67A IT Act & BNS 308 (Extortion) are non-bailable criminal offenses carrying up to 5 years rigorous imprisonment and heavy fines.', 
      hi: 'IT एक्ट की धारा 67A और BNS धारा 308 गैर-जमानती अपराध हैं जिनमें 5 साल तक की कठोर जेल और भारी जुर्माना है।' 
    },
    actionLabel: { en: 'View Power Replies', hi: 'कानूनी रिप्लाई देखें' },
    actionTarget: { tab: 'rescue', elementId: 'guided-situation-action-card' },
    colorClass: 'border-teal-100 hover:border-teal-300',
    badgeBg: 'bg-teal-50 text-teal-800 border-teal-200'
  },
  {
    id: 'pin_anonymous_shield',
    category: 'legal_truth',
    tag: { en: '🛡️ Anonymous Protection', hi: '🛡️ 100% गुमनाम शिकायत' },
    title: { 
      en: 'You never have to go to a police station or reveal your name.', 
      hi: 'आपको न तो थाने जाने की जरूरत है, न ही अपना नाम बताने की।' 
    },
    affirmation: { 
      en: '"I can use official government portals to take down links completely anonymously without any public exposure."', 
      hi: '"मैं अपनी पहचान बताए बिना सरकारी पोर्टल से वीडियो/फोटो हटवा सकती हूं। मेरी निजता पूरी तरह सुरक्षित रहेगी।"' 
    },
    legalFact: { 
      en: 'The Indian Government cybercrime.gov.in portal provides a special "Report Anonymously" channel under Crime Against Women for instant takedowns.', 
      hi: 'cybercrime.gov.in पर "Report Anonymously" विकल्प उपलब्ध है जहां बिना नाम या फोन नंबर दिए सीधे लिंक ब्लॉक कराए जाते हैं।' 
    },
    actionLabel: { en: 'Open e-FIR Guide', hi: 'पुलिस रिपोर्ट गाइड देखें' },
    actionTarget: { tab: 'report' },
    colorClass: 'border-emerald-100 hover:border-emerald-300',
    badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200'
  },
  {
    id: 'pin_future_untouched',
    category: 'self_worth',
    tag: { en: '🕊️ Your Future is Bright & Safe', hi: '🕊️ आपका भविष्य पूरी तरह सुरक्षित है' },
    title: { 
      en: 'One cyber incident will never define your career, degrees, or life.', 
      hi: 'यह घटना आपके करियर, पढ़ाई या जिंदगी को कभी तय नहीं कर सकती।' 
    },
    affirmation: { 
      en: '"This temporary storm will pass. Digital hashes erase leaks permanently, and my future remains full of unlimited potential."', 
      hi: '"यह समय भी बीत जाएगा। डिजिटल टूल्स से फोटो हमेशा के लिए मिट जाते हैं और मेरा भविष्य असीमित संभावनाओं से भरा है।"' 
    },
    legalFact: { 
      en: 'StopNCII.org and Google automated mirror purge remove content across global servers so thousands of women successfully move on in peace.', 
      hi: 'StopNCII और गूगल टूल्स दुनिया भर के सर्वर से फाइलें साफ कर देते हैं। हजारों महिलाएं पूरी शांति से अपने सपनों को जी रही हैं।' 
    },
    actionLabel: { en: 'Explore Takedowns', hi: 'फोटो हटाने के टूल्स' },
    actionTarget: { tab: 'takedown' },
    colorClass: 'border-sky-100 hover:border-sky-300',
    badgeBg: 'bg-sky-50 text-sky-800 border-sky-200'
  },
  {
    id: 'pin_power_script',
    category: 'power_script',
    tag: { en: '💬 The Fearless Power Reply', hi: '💬 निडर कानूनी जवाब' },
    title: { 
      en: 'Exact words that make blackmailers instantly back off.', 
      hi: 'सटीक शब्द जो ब्लैकमेलर को तुरंत पीछे हटने पर मजबूर करते हैं।' 
    },
    affirmation: { 
      en: '"I do not negotiate with cyber criminals. Your chat, UPI details, and IP address are submitted to the Cyber Police under Section 67A IT Act."', 
      hi: '"मैं साइबर अपराधियों से कोई समझौता नहीं करती। आपकी चैट, बैंक/UPI और IP साइबर पुलिस को IT Act 67A के तहत भेज दिए गए हैं।"' 
    },
    legalFact: { 
      en: 'Criminals rely on emotional subservience. Delivering a calm, formal legal statement signals that you know the law and cannot be manipulated.', 
      hi: 'ब्लैकमेलर केवल घबराहट पर पलते हैं। शांत कानूनी जवाब देखते ही वे समझ जाते हैं कि आपको डराया नहीं जा सकता।' 
    },
    colorClass: 'border-[#A2E2CD] hover:border-[#0F6E56]',
    badgeBg: 'bg-[#E1F5EE] text-[#0F6E56] border-[#A2E2CD]'
  },
  {
    id: 'pin_parent_talk',
    category: 'family',
    tag: { en: '🤝 Standing Tall with Parents', hi: '🤝 माता-पिता के सामने गरिमा' },
    title: { 
      en: 'How to communicate from a position of strength, not shame.', 
      hi: 'अपराधबोध के बजाय गरिमा और मजबूती से बात करने का तरीका।' 
    },
    affirmation: { 
      en: '"A cyber criminal attempted to target me. I have taken the legal steps, and I am telling you because family stands together against crime."', 
      hi: '"एक साइबर अपराधी ने मुझे निशाना बनाने की कोशिश की। मैंने कानूनी कदम उठा लिए हैं और मैं आपको बता रही हूं ताकि हम एक साथ खड़े रहें।"' 
    },
    legalFact: { 
      en: 'Framing the situation factually as cybercrime helps parents focus on protecting you rather than reacting in panic.', 
      hi: 'जब आप इसे साइबर अपराध के रूप में प्रस्तुत करती हैं, तो माता-पिता घबराने के बजाय आपकी सुरक्षा में साथ खड़े होते हैं।' 
    },
    colorClass: 'border-slate-200 hover:border-slate-300',
    badgeBg: 'bg-slate-100 text-slate-800 border-slate-200'
  }
];

export const ConfidenceCourageBoard: React.FC<ConfidenceCourageBoardProps> = ({
  language,
  onNavigateToTab,
}) => {
  const isHindi = language === 'hi';
  const STORAGE_KEY = 'suraksha_saved_courage_pins_v1';
  
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [pinnedIds, setPinnedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['pin_zero_shame', 'pin_scared_blackmailer'];
    } catch {
      return ['pin_zero_shame', 'pin_scared_blackmailer'];
    }
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pinnedIds));
    } catch {
      // Safe fallback
    }
  }, [pinnedIds]);

  const togglePin = (id: string) => {
    setPinnedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const filteredPins = CONFIDENCE_PINS.filter((pin) => {
    if (selectedFilter === 'saved') return pinnedIds.includes(pin.id);
    if (selectedFilter === 'all') return true;
    return pin.category === selectedFilter;
  });

  return (
    <section 
      id="confidence-courage-board" 
      className="space-y-6 scroll-mt-48"
      aria-label="Women Confidence and Courage Pins"
    >
      {/* Header Banner: Pinterest Aesthetic with Soft Gradients */}
      <div className="pinterest-glass rounded-3xl p-6 sm:p-8 border border-white/80 shadow-xs relative overflow-hidden space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B6D5C]/10 text-[#8B6D5C] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isHindi ? 'शक्ति, सत्य व आत्मसम्मान' : 'Courage, Truth & Dignity'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
              {isHindi ? 'आत्मविश्वास बोर्ड: डर को ताकत में बदलें' : 'Confidence & Courage Pins'}
            </h2>
            <p className="text-xs sm:text-sm text-[#555] leading-relaxed">
              {isHindi
                ? 'ब्लैकमेलरों का एकमात्र हथियार आपका डर है। जब आप अपने कानूनी अधिकार जानती हैं, तो भय शांत आत्मविश्वास में बदल जाता है।'
                : 'The blackmailer\'s only weapon is fear. These verified legal and psychological truths remind you that you hold all the power.'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#E8E2DC] text-xs font-bold text-[#8B6D5C] shadow-2xs">
              <Pin className="w-3 h-3 fill-[#8B6D5C]" />
              <span>{pinnedIds.length} {isHindi ? 'पिन सेव्ड' : 'Saved Pins'}</span>
            </span>
          </div>
        </div>

        {/* Filter Chips - Pinterest Pill Style */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-2 pb-1">
          {[
            { id: 'all', label: isHindi ? 'सभी पिन्स (All)' : 'All Pins' },
            { id: 'saved', label: isHindi ? `❤️ सेव किए गए (${pinnedIds.length})` : `❤️ Saved (${pinnedIds.length})` },
            { id: 'self_worth', label: isHindi ? '🌸 आत्मसम्मान' : 'Self-Worth' },
            { id: 'psychology', label: isHindi ? '⚡ ब्लैकमेलर का सच' : 'Criminal Psychology' },
            { id: 'legal_truth', label: isHindi ? '🛡️ कानूनी सुरक्षा' : 'Legal Shield' },
            { id: 'power_script', label: isHindi ? '💬 कानूनी जवाब' : 'Power Scripts' },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`pinterest-pill px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedFilter === filter.id
                  ? 'bg-[#2D2D2D] text-white shadow-xs scale-102'
                  : 'bg-white/80 hover:bg-white text-[#555] border border-[#E8E2DC]'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pinterest-Style Masonry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPins.map((pin) => {
          const isPinned = pinnedIds.includes(pin.id);
          const isCopied = copiedId === pin.id;

          return (
            <div
              key={pin.id}
              className={`pinterest-glass pinterest-hover-card rounded-3xl p-6 sm:p-7 border ${pin.colorClass} shadow-xs flex flex-col justify-between space-y-4 relative group`}
            >
              <div className="space-y-3.5">
                {/* Top Badge & Pin Action */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border ${pin.badgeBg}`}>
                    {pin.tag[language]}
                  </span>

                  <button
                    onClick={() => togglePin(pin.id)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      isPinned 
                        ? 'bg-rose-100 text-rose-600 shadow-2xs' 
                        : 'bg-white/80 text-[#888] hover:text-[#111] hover:bg-white border border-[#E8E2DC]'
                    }`}
                    title={isPinned ? 'Remove from saved pins' : 'Pin to my pocket'}
                  >
                    <Pin className={`w-3.5 h-3.5 ${isPinned ? 'fill-current rotate-45' : ''}`} />
                  </button>
                </div>

                {/* Main Insight Title */}
                <h3 className="font-extrabold text-base sm:text-lg text-[#1A1A1A] leading-snug">
                  {pin.title[language]}
                </h3>

                {/* Empowering Quote / Affirmation Box */}
                <div className="p-4 rounded-2xl bg-white/90 border border-[#E8E2DC] space-y-2 relative">
                  <p className="text-xs sm:text-sm italic font-medium text-[#2D2D2D] leading-relaxed">
                    {pin.affirmation[language]}
                  </p>
                  
                  <div className="flex items-center justify-between pt-1 border-t border-[#F0EBE6]">
                    <span className="text-[10px] font-bold text-[#8B6D5C] uppercase tracking-wider">
                      {isHindi ? 'शक्ति मंत्र' : 'Power Words'}
                    </span>
                    <button
                      onClick={() => handleCopy(pin.affirmation[language], pin.id)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#555] hover:text-[#111] transition-colors cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">{isHindi ? 'कॉपी हो गया' : 'Copied!'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>{isHindi ? 'कॉपी करें' : 'Copy'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Grounded Legal Fact */}
                <div className="flex items-start gap-2 text-xs text-[#555] leading-relaxed pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8B6D5C] shrink-0 mt-0.5" />
                  <span>{pin.legalFact[language]}</span>
                </div>
              </div>

              {/* Action Button (if applicable) */}
              {pin.actionLabel && pin.actionTarget && (
                <div className="pt-2 border-t border-black/5">
                  <button
                    onClick={() => onNavigateToTab(pin.actionTarget!.tab, pin.actionTarget!.elementId)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2D2D2D] hover:bg-[#111] text-white rounded-full text-xs font-bold transition-all shadow-2xs cursor-pointer"
                  >
                    <span>{pin.actionLabel[language]}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
