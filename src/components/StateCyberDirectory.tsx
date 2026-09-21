import React, { useState } from 'react';
import { STATE_CYBER_CELLS } from '../data/stateCyberCellsData';
import { Language } from '../types';
import { StateLocationDetector } from './StateLocationDetector';
import { 
  Building2, 
  PhoneCall, 
  Mail, 
  MapPin, 
  ExternalLink, 
  Check, 
  Copy, 
  Search, 
  Lock,
  Phone,
  X,
  Radio,
  CheckCircle2,
  HelpCircle,
  MessageSquare,
  Shield
} from 'lucide-react';

interface StateCyberDirectoryProps {
  language: Language;
}

export const StateCyberDirectory: React.FC<StateCyberDirectoryProps> = ({ language }) => {
  const isHindi = language === 'hi';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [detectedConfirmedState, setDetectedConfirmedState] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const handleConfirmDetectedState = (stateName: string) => {
    setDetectedConfirmedState(stateName);
    setSearchQuery(stateName);
    setSelectedRegion('all');
  };

  const handleClearConfirmedState = () => {
    setDetectedConfirmedState(null);
    setSearchQuery('');
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  const filteredCells = STATE_CYBER_CELLS.filter((cell) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      cell.stateName.en.toLowerCase().includes(q) ||
      cell.stateName.hi.includes(q) ||
      cell.state.toLowerCase().includes(q) ||
      cell.state_code.toLowerCase().includes(q) ||
      cell.headquarters.toLowerCase().includes(q) ||
      cell.address.toLowerCase().includes(q) ||
      (cell.women_helpline && cell.women_helpline.toLowerCase().includes(q)) ||
      (cell.police_emergency && cell.police_emergency.toLowerCase().includes(q)) ||
      (cell.child_helpline && cell.child_helpline.toLowerCase().includes(q)) ||
      (cell.alternate_number && cell.alternate_number.toLowerCase().includes(q)) ||
      (cell.women_mobile && cell.women_mobile.toLowerCase().includes(q)) ||
      (cell.women_whatsapp && cell.women_whatsapp.toLowerCase().includes(q)) ||
      cell.email.toLowerCase().includes(q) ||
      cell.nodalOfficer.toLowerCase().includes(q);

    let matchesRegion = true;
    if (selectedRegion === 'all') {
      matchesRegion = true;
    } else if (selectedRegion === 'states') {
      matchesRegion = cell.region !== 'UT';
    } else if (selectedRegion === 'UT') {
      matchesRegion = cell.region === 'UT';
    } else {
      matchesRegion = cell.region === selectedRegion;
    }

    return matchesSearch && matchesRegion;
  });

  const regions = [
    { id: 'all', label: isHindi ? 'सभी (36)' : 'All States & UTs (36)' },
    { id: 'states', label: isHindi ? 'सभी 28 राज्य' : '28 States' },
    { id: 'UT', label: isHindi ? '8 केंद्रशासित प्रदेश (UTs)' : '8 UTs' },
    { id: 'North', label: isHindi ? 'उत्तर भारत' : 'North' },
    { id: 'South', label: isHindi ? 'दक्षिण भारत' : 'South' },
    { id: 'West', label: isHindi ? 'पश्चिम भारत' : 'West' },
    { id: 'East', label: isHindi ? 'पूर्व भारत' : 'East' },
    { id: 'Central', label: isHindi ? 'मध्य भारत' : 'Central' },
    { id: 'North-East', label: isHindi ? 'पूर्वोत्तर (8)' : 'North-East (8)' },
  ];

  return (
    <div id="state-cyber-directory" className="space-y-6 scroll-mt-48">
      {/* Informative Header Banner */}
      <div className="bg-white border border-[#E8E2DC] rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-900 border border-amber-200/70 flex items-center justify-center font-bold shrink-0">
              <Building2 className="w-6 h-6 text-amber-800" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/80 text-[11px] font-bold uppercase tracking-wider mb-1">
                <Radio className="w-3 h-3 text-amber-600 animate-pulse" />
                <span>{isHindi ? '36 राज्य व UT डायरेक्टरी — सुरक्षा व आपातकालीन सेवाएं' : '36 States & UTs — Safety & Emergency Support'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] tracking-tight">
                {isHindi ? 'राज्य व केंद्रशासित प्रदेश सुरक्षा एवं सहायता डायरेक्टरी' : 'State & UT Safety & Support Directory'}
              </h2>
              <p className="text-xs sm:text-sm text-[#555] mt-1 leading-relaxed">
                {isHindi
                  ? 'सभी 28 राज्यों व 8 केंद्रशासित प्रदेशों के CID साइबर सेल, महिला डेस्क, नोडल अधिकारी, आपातकालीन नंबर व पोर्टल संपर्क।'
                  : 'CID cyber stations, dedicated women cells, emergency response links, and nodal officers across all 28 States and 8 Union Territories.'}
              </p>
            </div>
          </div>
        </div>

        {/* National Hotlines Reassurance Pill */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="flex items-center gap-2.5 p-3.5 bg-[#FAF9F6] border border-[#E8E2DC] rounded-2xl text-xs sm:text-sm text-[#1A1A1A]">
            <Shield className="w-4 h-4 text-[#8B6D5C] shrink-0" />
            <span>
              {isHindi
                ? 'धारा 173 BNSS: देश के किसी भी पुलिस स्टेशन में Zero FIR दर्ज कराई जा सकती है।'
                : 'Section 173 BNSS: You can file a Zero FIR at any local police station in India.'}
            </span>
          </div>

          <div className="flex items-center gap-2.5 p-3.5 bg-[#FBF5F2] border border-[#EADBCE] rounded-2xl text-xs sm:text-sm text-[#8B6D5C] font-semibold">
            <Phone className="w-4 h-4 text-[#8B6D5C] shrink-0" />
            <span>
              {isHindi
                ? 'राष्ट्रीय साइबर हेल्पलाइन: 1930 (वित्तीय धोखाधड़ी एवं ऑनलाइन ब्लैकमेल)'
                : 'National Cyber Helpline: 1930 (Immediate Financial Hold & Online Extortion)'}
            </span>
          </div>
        </div>

        {/* 100% On-device State Detection Prompt & Pinned Suggestion Banner */}
        <StateLocationDetector
          isHindi={isHindi}
          onConfirmState={handleConfirmDetectedState}
          activeConfirmedState={detectedConfirmedState}
          onClearConfirmedState={handleClearConfirmedState}
        />

        {/* Search & Region Filters */}
        <div className="pt-1 flex flex-col gap-3">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#888]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (detectedConfirmedState && e.target.value !== detectedConfirmedState) {
                  setDetectedConfirmedState(null);
                }
              }}
              placeholder={isHindi ? 'राज्य, UT, शहर, फोन नंबर या नोडल ऑफिसर खोजें (उदा. Delhi, Ladakh, Mumbai, 1930)...' : 'Search by State, UT, City, Nodal Officer, or Phone (e.g., Delhi, Ladakh, Bengaluru, Lucknow)...'}
              className="w-full pl-11 pr-10 py-3 bg-[#FAF9F6] focus:bg-white border border-[#DED9D4] rounded-full text-xs sm:text-sm focus:outline-none focus:border-[#8B6D5C] text-[#1A1A1A] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setDetectedConfirmedState(null);
                }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#888] hover:text-[#333] cursor-pointer"
                title="Clear Search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Region Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            {regions.map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer select-none ${
                  selectedRegion === reg.id
                    ? 'bg-[#2D2D2D] text-white shadow-xs'
                    : 'bg-[#FAF9F6] text-[#555] border border-[#E8E2DC] hover:bg-[#F3EFEC]'
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>

          {/* Filter count indicator */}
          <div className="flex items-center justify-between text-xs text-[#777] px-1">
            <span>
              {isHindi
                ? `प्रदर्शित: ${filteredCells.length} / 36 राज्य एवं UTs`
                : `Showing ${filteredCells.length} of 36 States & Union Territories`}
            </span>
            {searchQuery && (
              <span className="font-semibold text-[#8B6D5C]">
                {isHindi ? `खोज परिणाम: "${searchQuery}"` : `Filtered by "${searchQuery}"`}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Grid of State Cyber Cells: single column below 480px/tablet, 2-col on tablet/laptop, 3-col on wide desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-4">
        {filteredCells.map((cell) => {
          const isUT = cell.region === 'UT';

          return (
            <div
              key={cell.id}
              className="bg-white rounded-2xl sm:rounded-3xl border border-[#E8E2DC] hover:border-[#8B6D5C] p-4 sm:p-5 shadow-sm flex flex-col justify-between space-y-4 transition-all"
            >
              <div className="space-y-3.5">
                {/* Header: Badges, State Name, and Nodal Officer */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        isUT ? 'bg-[#EBF3ED] text-[#2D5A3C]' : 'bg-[#F3EFEC] text-[#8B6D5C]'
                      }`}>
                        {isUT ? (isHindi ? 'केंद्रशासित प्रदेश (UT)' : 'Union Territory (UT)') : cell.region}
                      </span>

                      {/* Verification status label on every card: consistent pill */}
                      <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                        cell.verifiedDate 
                          ? 'text-[#0F6E56] bg-emerald-50 border-emerald-200 font-semibold' 
                          : 'text-amber-900 bg-amber-50 border-amber-200 font-medium'
                      }`}>
                        {cell.verifiedDate ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-[#0F6E56] shrink-0" />
                            <span>{isHindi ? `सत्यापित: ${cell.verifiedDate}` : `Verified: ${cell.verifiedDate}`}</span>
                          </>
                        ) : (
                          <>
                            <HelpCircle className="w-3 h-3 text-amber-700 shrink-0" />
                            <span>{isHindi ? 'सत्यापन शेष — पहले पुष्टि करें' : 'Unverified — confirm before relying'}</span>
                          </>
                        )}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A] mt-1">
                      {cell.stateName[language]}
                    </h3>
                  </div>
                  <span className="self-start text-[11px] font-semibold text-[#666] bg-[#FAF9F6] px-2.5 py-1 rounded-full border border-[#F0EBE6] shrink-0">
                    {cell.nodalOfficer}
                  </span>
                </div>

                {/* Headquarters & Address */}
                <div className="space-y-1 text-xs">
                  <p className="font-semibold text-[#2D2D2D] flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-[#8B6D5C] shrink-0" />
                    <span className="break-words">{cell.headquarters}</span>
                  </p>
                  <p className="text-[#666] flex items-start gap-2 pl-0.5">
                    <MapPin className="w-3 h-3 text-[#8B6D5C] shrink-0 mt-0.5" />
                    <span className="text-[11px] leading-relaxed break-words">{cell.address}</span>
                  </p>
                </div>

                {/* Structured, Scope-Aware Helplines & Numbers */}
                <div className="p-3 bg-[#FAF9F6] border border-[#E8E2DC] rounded-2xl space-y-2 text-xs">
                  {/* State Identifier */}
                  <div className="text-[11px] font-bold text-[#8B6D5C] pb-1 border-b border-[#E8E2DC] flex items-center justify-between">
                    <span>{isHindi ? `राज्य / UT: ${cell.stateName[language]}` : `State: ${cell.state}`}</span>
                    <span className="font-mono text-[10px] text-[#888] font-semibold">{cell.state_code}</span>
                  </div>

                  {/* Police Emergency Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pt-0.5">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="font-semibold text-[#1A1A1A] w-28 shrink-0">
                        {isHindi ? 'पुलिस आपातकाल:' : 'Police:'}
                      </span>
                      {cell.police_emergency ? (
                        <span className="font-mono font-bold text-[#1A1A1A]">{cell.police_emergency}</span>
                      ) : (
                        <span className="text-[#888] italic">{isHindi ? 'सार्वजनिक रूप से सूचीबद्ध नहीं' : 'Not publicly listed'}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {cell.police_emergency && (
                        <a
                          href={`tel:${cell.police_emergency.replace(/\s+/g, '')}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#8B6D5C] hover:bg-[#775c4c] text-white text-[11px] font-bold transition-colors cursor-pointer"
                          aria-label={`${isHindi ? 'कॉल करें' : 'Call'} ${cell.police_emergency}`}
                        >
                          <PhoneCall className="w-3 h-3" />
                          <span>{isHindi ? `कॉल ${cell.police_emergency}` : `Call ${cell.police_emergency}`}</span>
                        </a>
                      )}
                      <span className="text-[10px] text-[#666]">
                        — {isHindi ? 'कवरेज:' : 'Coverage:'} {cell.police_coverage || cell.coverage}
                      </span>
                    </div>
                  </div>

                  {/* Women Helpline Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pt-1.5 border-t border-[#F0EBE6]">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="font-semibold text-[#1A1A1A] w-28 shrink-0">
                        {isHindi ? 'महिला हेल्पलाइन:' : 'Women Helpline:'}
                      </span>
                      {cell.women_helpline ? (
                        <span className="font-mono font-bold text-[#1A1A1A]">{cell.women_helpline}</span>
                      ) : (
                        <span className="text-[#888] italic">{isHindi ? 'सार्वजनिक रूप से सूचीबद्ध नहीं' : 'Not publicly listed'}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {cell.women_helpline && (
                        <a
                          href={`tel:${cell.women_helpline.replace(/\s+/g, '')}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#0F6E56] hover:bg-[#0A4E3D] text-white text-[11px] font-bold transition-colors cursor-pointer"
                          aria-label={`${isHindi ? 'महिला हेल्पलाइन कॉल करें' : 'Call Women Helpline'} ${cell.women_helpline}`}
                        >
                          <PhoneCall className="w-3 h-3" />
                          <span>{isHindi ? `कॉल ${cell.women_helpline}` : `Call ${cell.women_helpline}`}</span>
                        </a>
                      )}
                      <span className="text-[10px] text-[#666]">
                        — {isHindi ? 'कवरेज:' : 'Coverage:'} {cell.women_helpline_coverage || cell.coverage}
                      </span>
                    </div>
                  </div>

                  {/* Child Helpline Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pt-1.5 border-t border-[#F0EBE6]">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="font-semibold text-[#1A1A1A] w-28 shrink-0">
                        {isHindi ? 'बाल हेल्पलाइन:' : 'Child Helpline:'}
                      </span>
                      {cell.child_helpline ? (
                        <span className="font-mono font-bold text-[#1A1A1A]">{cell.child_helpline}</span>
                      ) : (
                        <span className="text-[#888] italic">{isHindi ? 'सार्वजनिक रूप से सूचीबद्ध नहीं' : 'Not publicly listed'}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {cell.child_helpline && (
                        <a
                          href={`tel:${cell.child_helpline.replace(/\s+/g, '')}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#26215C] hover:bg-[#1A1644] text-white text-[11px] font-bold transition-colors cursor-pointer"
                          aria-label={`${isHindi ? 'बाल हेल्पलाइन कॉल करें' : 'Call Child Helpline'} ${cell.child_helpline}`}
                        >
                          <PhoneCall className="w-3 h-3" />
                          <span>{isHindi ? `कॉल ${cell.child_helpline}` : `Call ${cell.child_helpline}`}</span>
                        </a>
                      )}
                      <span className="text-[10px] text-[#666]">
                        — {isHindi ? 'कवरेज:' : 'Coverage:'} {cell.child_helpline_coverage || cell.coverage}
                      </span>
                    </div>
                  </div>

                  {/* WhatsApp Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pt-1.5 border-t border-[#F0EBE6]">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="font-semibold text-[#1A1A1A] w-28 shrink-0">
                        WhatsApp:
                      </span>
                      {cell.women_whatsapp ? (() => {
                        const cleanDigits = cell.women_whatsapp.replace(/\D/g, '');
                        const waNum = cleanDigits.startsWith('91') && cleanDigits.length > 10 ? cleanDigits : `91${cleanDigits}`;
                        return (
                          <a
                            href={`https://wa.me/${waNum}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono font-bold text-emerald-700 hover:text-emerald-800 underline underline-offset-2 decoration-emerald-400 hover:decoration-emerald-700 inline-flex items-center gap-1 transition-colors"
                            aria-label={`${isHindi ? 'व्हाट्सएप चैट खोलें' : 'Open WhatsApp chat with'} ${cell.women_whatsapp}`}
                          >
                            <span>{cell.women_whatsapp}</span>
                            <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-70" />
                          </a>
                        );
                      })() : (
                        <span className="text-[#888] italic">{isHindi ? 'आधिकारिक रूप से प्रकाशित नहीं' : 'Not officially published'}</span>
                      )}
                    </div>
                    {cell.women_whatsapp ? (() => {
                      const cleanDigits = cell.women_whatsapp.replace(/\D/g, '');
                      const waNum = cleanDigits.startsWith('91') && cleanDigits.length > 10 ? cleanDigits : `91${cleanDigits}`;
                      return (
                        <div className="flex items-center gap-2 shrink-0">
                          <a
                            href={`https://wa.me/${waNum}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition-colors cursor-pointer"
                            aria-label={`${isHindi ? 'व्हाट्सएप संदेश भेजें' : 'Send WhatsApp message to'} ${cell.women_whatsapp}`}
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>{isHindi ? 'संदेश / कॉल' : 'Call / Message'}</span>
                          </a>
                          <span className="text-[10px] text-[#666]">
                            — {isHindi ? 'कवरेज:' : 'Coverage:'} {cell.women_whatsapp_coverage || cell.coverage}
                          </span>
                        </div>
                      );
                    })() : (
                      <span className="text-[10px] text-[#888]">
                        — {isHindi ? 'कवरेज: N/A' : 'Coverage: N/A'}
                      </span>
                    )}
                  </div>

                  {/* Alternate / Cyber Police Station Number */}
                  {cell.alternate_number && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pt-1.5 border-t border-[#F0EBE6]">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="font-semibold text-[#1A1A1A] w-28 shrink-0">
                          {isHindi ? 'साइबर थाना / अन्य:' : 'Cyber PS / Alt:'}
                        </span>
                        <span className="font-mono font-bold text-[#1A1A1A]">{cell.alternate_number}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={`tel:${cell.alternate_number.replace(/\s+/g, '')}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FAF9F6] hover:bg-[#F3EFEA] border border-[#E8E2DC] text-[#1A1A1A] text-[11px] font-bold transition-colors cursor-pointer"
                          aria-label={`${isHindi ? 'कॉल करें' : 'Call'} ${cell.alternate_number}`}
                        >
                          <PhoneCall className="w-3 h-3 text-[#8B6D5C]" />
                          <span>{isHindi ? 'कॉल करें' : `Call ${cell.alternate_number}`}</span>
                        </a>
                        <span className="text-[10px] text-[#666]">
                          — {isHindi ? 'कवरेज:' : 'Coverage:'} {cell.alternate_number_coverage || cell.coverage}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Women Mobile Number */}
                  {cell.women_mobile && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pt-1.5 border-t border-[#F0EBE6]">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="font-semibold text-[#1A1A1A] w-28 shrink-0">
                          {isHindi ? 'मोबाइल हेल्पलाइन:' : 'Mobile Line:'}
                        </span>
                        <span className="font-mono font-bold text-[#1A1A1A]">{cell.women_mobile}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={`tel:${cell.women_mobile.replace(/\s+/g, '')}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FAF9F6] hover:bg-[#F3EFEA] border border-[#E8E2DC] text-[#1A1A1A] text-[11px] font-bold transition-colors cursor-pointer"
                          aria-label={`${isHindi ? 'कॉल करें' : 'Call'} ${cell.women_mobile}`}
                        >
                          <PhoneCall className="w-3 h-3 text-[#0F6E56]" />
                          <span>{isHindi ? 'कॉल करें' : `Call ${cell.women_mobile}`}</span>
                        </a>
                        <span className="text-[10px] text-[#666]">
                          — {isHindi ? 'कवरेज:' : 'Coverage:'} {cell.women_mobile_coverage || cell.coverage}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Websites & Sources */}
                <div className="p-3 bg-[#FAF9F6] border border-[#E8E2DC] rounded-2xl space-y-2 text-xs">
                  {/* Police Website */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-[#1A1A1A]">
                      {isHindi ? 'पुलिस पोर्टल:' : 'Police Website:'}
                    </span>
                    {cell.police_website ? (
                      <a
                        href={cell.police_website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#0F6E56] hover:underline font-medium text-[11px] truncate max-w-[210px]"
                      >
                        <span className="truncate">{cell.police_website.replace('https://', '')}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    ) : (
                      <span className="text-[#888] italic">{isHindi ? 'सार्वजनिक रूप से सूचीबद्ध नहीं' : 'Not publicly listed'}</span>
                    )}
                  </div>

                  {/* Women & Child Website */}
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#F0EBE6]">
                    <span className="font-semibold text-[#1A1A1A]">
                      {isHindi ? 'महिला व बाल विकास पोर्टल:' : 'Women & Child Website:'}
                    </span>
                    {cell.women_child_website ? (
                      <a
                        href={cell.women_child_website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#26215C] hover:underline font-medium text-[11px] truncate max-w-[210px]"
                      >
                        <span className="truncate">{cell.women_child_website.replace('https://', '')}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    ) : (
                      <span className="text-[#888] italic">{isHindi ? 'सार्वजनिक रूप से सूचीबद्ध नहीं' : 'Not publicly listed'}</span>
                    )}
                  </div>

                  {/* Source & Last Verified */}
                  <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1.5 border-t border-[#F0EBE6] text-[10px] text-[#666]">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-[#444]">{isHindi ? 'स्रोत:' : 'Source:'}</span>
                      {cell.source_url ? (
                        <a
                          href={cell.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#8B6D5C] hover:underline font-medium"
                        >
                          {cell.source_url.replace('https://', '').split('/')[0]}
                        </a>
                      ) : (
                        <span className="italic">{isHindi ? 'सूचीबद्ध नहीं' : 'Not publicly listed'}</span>
                      )}
                    </div>
                    <div>
                      <span>• {isHindi ? 'अंतिम सत्यापन:' : 'Last verified:'} {cell.last_verified || (isHindi ? 'सत्यापन शेष — पहले पुष्टि करें' : 'Unverified — confirm before relying')}</span>
                    </div>
                  </div>
                </div>

                {/* Special Women Desk highlight */}
                <div className="p-3 bg-[#FBF5F2] rounded-2xl border border-[#EADBCE] text-xs">
                  <div className="flex items-center gap-1.5 text-[#8B6D5C] font-bold">
                    <Lock className="w-3.5 h-3.5 shrink-0" />
                    <span>{isHindi ? 'महिला सुरक्षा डेस्क:' : 'Women Cyber Protection Wing:'}</span>
                  </div>
                  <p className="text-[#444] mt-0.5 font-medium leading-snug break-words">{cell.specialWomenCell[language]}</p>
                </div>

                {/* Email row */}
                <div className="flex items-center justify-between p-2.5 bg-[#FAF9F6] border border-[#E8E2DC] rounded-2xl text-xs gap-2">
                  <div className="flex items-center gap-2 text-[#1A1A1A] overflow-hidden font-mono font-semibold min-w-0">
                    <Mail className="w-3.5 h-3.5 text-[#8B6D5C] shrink-0" />
                    <span className="truncate">{cell.email}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyEmail(cell.email)}
                    className="p-1.5 text-[#555] hover:text-[#111] transition-colors shrink-0 cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg hover:bg-black/5"
                    title="Copy Email ID"
                    aria-label={isHindi ? 'ईमेल कॉपी करें' : 'Copy email'}
                  >
                    {copiedEmail === cell.email ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Action buttons at bottom: Women Helpline or Police Call */}
              <div className="pt-3 border-t border-[#E8E2DC] flex flex-wrap items-center gap-2">
                {cell.women_helpline ? (
                  <a
                    href={`tel:${cell.women_helpline.replace(/\s+/g, '')}`}
                    className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#0F6E56] hover:bg-[#0A4E3D] active:bg-[#073D30] text-white rounded-full text-xs sm:text-sm font-bold transition-all shadow-xs min-h-[44px] whitespace-nowrap"
                    aria-label={`${isHindi ? 'महिला हेल्पलाइन कॉल करें' : 'Call Women Helpline'} ${cell.women_helpline}`}
                  >
                    <PhoneCall className="w-4 h-4 shrink-0" />
                    <span>{isHindi ? `कॉल ${cell.women_helpline} (महिला)` : `Call ${cell.women_helpline} (Women)`}</span>
                  </a>
                ) : cell.police_emergency ? (
                  <a
                    href={`tel:${cell.police_emergency.replace(/\s+/g, '')}`}
                    className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#8B6D5C] hover:bg-[#775c4c] active:bg-[#684f41] text-white rounded-full text-xs sm:text-sm font-bold transition-all shadow-xs min-h-[44px] whitespace-nowrap"
                    aria-label={`${isHindi ? 'पुलिस कॉल करें' : 'Call Police'} ${cell.police_emergency}`}
                  >
                    <PhoneCall className="w-4 h-4 shrink-0" />
                    <span>{isHindi ? `कॉल ${cell.police_emergency} (पुलिस)` : `Call ${cell.police_emergency} (Police)`}</span>
                  </a>
                ) : null}

                {cell.police_website && (
                  <a
                    href={cell.police_website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 px-3.5 inline-flex items-center justify-center gap-1.5 bg-white hover:bg-[#FAF9F6] text-[#2D2D2D] border border-[#DED9D4] rounded-full transition-colors shrink-0 min-h-[44px] text-xs font-semibold whitespace-nowrap"
                    title={`Visit ${cell.stateName.en} Police Portal`}
                    aria-label={`Visit ${cell.stateName.en} Police Portal`}
                  >
                    <ExternalLink className="w-4 h-4 text-[#8B6D5C] shrink-0" />
                    <span>{isHindi ? 'वेबसाइट' : 'Portal'}</span>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredCells.length === 0 && (
        <div className="bg-white border border-[#E8E2DC] rounded-3xl p-10 text-center space-y-3">
          <p className="text-base font-bold text-[#2D2D2D]">
            {isHindi ? 'कोई परिणाम नहीं मिला' : 'No State or UT Found'}
          </p>
          <p className="text-xs text-[#666]">
            {isHindi ? 'कृपया दूसरा नाम या पिनकोड खोजें।' : 'Try searching with another state name, UT name, or city.'}
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedRegion('all'); }}
            className="px-4 py-2 bg-[#8B6D5C] text-white rounded-full text-xs font-bold cursor-pointer"
          >
            {isHindi ? 'सभी देखें (36)' : 'View All (36 States & UTs)'}
          </button>
        </div>
      )}
    </div>
  );
};
