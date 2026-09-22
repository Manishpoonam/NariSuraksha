import React, { useState, useEffect } from 'react';
import type { StateCyberCell } from '../data/stateCyberCellsData';
import { Language } from '../types';
import { StateLocationDetector } from './StateLocationDetector';
import { StateCyberCellCard } from './StateCyberCellCard';
import { 
  Building2, 
  Search, 
  X,
  Radio,
  Shield,
  Phone
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
  const [cells, setCells] = useState<StateCyberCell[]>([]);

  useEffect(() => {
    import('../data/stateCyberCellsData').then((m) => {
      setCells(m.STATE_CYBER_CELLS);
    });
  }, []);

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

  const filteredCells = cells.filter((cell) => {
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

      {/* Grid of State Cyber Cells: single column on mobile, 2 columns on tablet & desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filteredCells.map((cell) => (
          <StateCyberCellCard
            key={cell.id}
            cell={cell}
            language={language}
            onCopyEmail={handleCopyEmail}
            copiedEmail={copiedEmail}
          />
        ))}
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
