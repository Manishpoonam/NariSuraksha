import React, { useRef } from 'react';
import { 
  Printer, 
  X, 
  ShieldCheck, 
  PhoneCall, 
  ShieldAlert, 
  Camera, 
  Scale, 
  Lock, 
  FileText,
  HeartHandshake
} from 'lucide-react';
import { Language } from '../types';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface CampusSafetyPrintableCardProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const CampusSafetyPrintableCard: React.FC<CampusSafetyPrintableCardProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const isHindi = language === 'hi';
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(isOpen, modalRef, '#close-printable-modal-btn');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white print:static print:inset-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="campus-card-modal-title"
    >
      <div 
        ref={modalRef}
        className="w-full max-w-3xl bg-white rounded-3xl p-4 sm:p-8 shadow-2xl border border-[#E8E2DC] space-y-4 my-auto text-[#1A1A1A] relative print:border-none print:shadow-none print:p-0 print:max-w-none print:rounded-none"
      >
        {/* Top bar controls (hidden during print) */}
        <div className="flex items-center justify-between gap-3 border-b border-[#F0EBE6] pb-3 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0F6E56]"></span>
            <div>
              <h2 id="campus-card-modal-title" className="text-sm sm:text-base font-bold text-[#1A1A1A]">
                {isHindi ? 'पॉकेट इमरजेंसी कार्ड (प्रिंट तैयार • वॉलेट साइज)' : 'Pocket Emergency Safety Card (Print Ready • Wallet Size)'}
              </h2>
              <p className="text-[11px] text-[#666]">
                {isHindi 
                  ? 'गोपनीय डिजाइन: जेब या बटुए में रखने योग्य 4-भाग फोल्ड गाइड' 
                  : 'Discreet layout: 4-panel foldable card for wallet or student cardholder'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#26215C] hover:bg-[#1E1949] text-white rounded-full font-bold text-xs transition-transform active:scale-95 cursor-pointer shadow-xs min-h-[40px] focus-visible:ring-2 focus-visible:ring-[#26215C] focus-visible:outline-none"
            >
              <Printer className="w-4 h-4" />
              <span>{isHindi ? 'प्रिंट / PDF' : 'Print / Save PDF'}</span>
            </button>
            <button
              id="close-printable-modal-btn"
              type="button"
              onClick={onClose}
              aria-label={isHindi ? 'संवाद बंद करें' : 'Close modal'}
              className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full hover:bg-[#F3EFEC] text-[#666] hover:text-[#111] transition-colors focus-visible:ring-2 focus-visible:ring-[#26215C] focus-visible:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE BODY: 4-PANEL FOLDABLE WALLET FORMAT */}
        <div id="printable-safety-card" className="border-2 border-black rounded-2xl p-4 sm:p-6 bg-white text-black space-y-4 print:space-y-3 print:border-black print:rounded-none print:p-2">
          
          {/* Card Header: Discreet Official Public Safety Appearance */}
          <div className="border-b border-black pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-black">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isHindi ? 'विद्यार्थी एवं नागरिक सुरक्षा संदर्शिका' : 'Student & Citizen Emergency Safety Card'}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-black">
                {isHindi ? 'आपातकालीन सहायता व डिजिटल अधिकार' : 'Emergency Contacts & Digital Privacy Rights'}
              </h1>
              <p className="text-[11px] text-neutral-700">
                {isHindi 
                  ? 'अखिल भारतीय 24/7 वैधानिक हेल्पलाइन व कानूनी सुरक्षा मार्गदर्शिका' 
                  : 'All-India 24/7 Verified Helplines & Statutory Digital Protection Protocol'}
              </p>
            </div>
            <div className="p-2 border border-black rounded-lg text-center shrink-0 min-w-[130px]">
              <span className="text-[9px] font-bold uppercase tracking-wider block text-neutral-800">
                {isHindi ? 'त्वरित संकट नंबर' : 'Immediate Crisis'}
              </span>
              <span className="text-lg font-black block text-black">112 & 1930</span>
              <span className="text-[9px] text-neutral-700 block">
                {isHindi ? 'पुलिस एवं साइबर हेल्पलाइन' : 'Police & Cyber Crime'}
              </span>
            </div>
          </div>

          {/* 4 Foldable Panels Grid (Quarter-Page proportion) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            
            {/* PANEL 1: VERIFIED EMERGENCY HELPLINES */}
            <div className="border border-black rounded-xl p-3 space-y-2">
              <div className="flex items-center gap-1.5 border-b border-black pb-1">
                <PhoneCall className="w-3.5 h-3.5" />
                <h2 className="text-xs font-black uppercase tracking-wider">
                  {isHindi ? '1. राष्ट्रीय हेल्पलाइन (24×7 टोल-फ्री)' : '1. National Helplines (24×7 Toll-Free)'}
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <div className="p-1.5 border border-neutral-400 rounded">
                  <span className="font-mono font-black text-sm block">112</span>
                  <span className="text-[10px] text-neutral-700 leading-tight block">
                    {isHindi ? 'पुलिस / आपातकालीन' : 'All-India Police & Emergency'}
                  </span>
                </div>
                <div className="p-1.5 border border-neutral-400 rounded">
                  <span className="font-mono font-black text-sm block">1930</span>
                  <span className="text-[10px] text-neutral-700 leading-tight block">
                    {isHindi ? 'राष्ट्रीय साइबर अपराध' : 'National Cyber Crime Portal'}
                  </span>
                </div>
                <div className="p-1.5 border border-neutral-400 rounded">
                  <span className="font-mono font-black text-sm block">1090 / 1091</span>
                  <span className="text-[10px] text-neutral-700 leading-tight block">
                    {isHindi ? 'महिला हेल्पलाइन' : 'Women Crisis Helpline'}
                  </span>
                </div>
                <div className="p-1.5 border border-neutral-400 rounded">
                  <span className="font-mono font-black text-sm block">14490</span>
                  <span className="text-[10px] text-neutral-700 leading-tight block">
                    {isHindi ? 'राष्ट्रीय महिला आयोग' : 'NCW 24/7 Distress Cell'}
                  </span>
                </div>
                <div className="p-1.5 border border-neutral-400 rounded">
                  <span className="font-mono font-black text-sm block">14416</span>
                  <span className="text-[10px] text-neutral-700 leading-tight block">
                    {isHindi ? 'टेली-मानस (काउंसलिंग)' : 'Tele-MANAS Mental Health'}
                  </span>
                </div>
                <div className="p-1.5 border border-neutral-400 rounded">
                  <span className="font-mono font-black text-sm block">1098</span>
                  <span className="text-[10px] text-neutral-700 leading-tight block">
                    {isHindi ? 'चाइल्डलाइन (नाबालिग)' : 'Childline & POCSO Support'}
                  </span>
                </div>
              </div>
            </div>

            {/* PANEL 2: ESSENTIAL SAFETY PROTOCOLS */}
            <div className="border border-black rounded-xl p-3 space-y-2">
              <div className="flex items-center gap-1.5 border-b border-black pb-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <h2 className="text-xs font-black uppercase tracking-wider">
                  {isHindi ? '2. तत्काल सुरक्षा नियम (गोल्डन रूल्स)' : '2. Critical Safety Protocols'}
                </h2>
              </div>
              <ul className="text-[11px] space-y-1.5 leading-snug">
                <li className="flex items-start gap-1.5">
                  <span className="font-bold shrink-0">•</span>
                  <span>
                    <strong>{isHindi ? 'पैसे या मांग कभी न मानें:' : 'Zero Payment Rule:'}</strong>{' '}
                    {isHindi 
                      ? 'किसी भी दबाव या धमकी में धन न भेजें। भुगतान करने से ब्लैकमेल बढ़ता है, सामग्री डिलीट नहीं होती।'
                      : 'Never transfer funds under pressure. Paying marks you as a repeating target and does not delete files.'}
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-bold shrink-0">•</span>
                  <span>
                    <strong>{isHindi ? 'सबूत सुरक्षित रखें:' : 'Preserve Full Records:'}</strong>{' '}
                    {isHindi 
                      ? 'ब्लॉक करने से पहले पूरी चैट, मोबाइल नंबर, यूपीआई आईडी व टाइमस्टैम्प के अनक्रॉप्ड स्क्रीनशॉट लें।'
                      : 'Take full uncropped screenshots showing phone numbers, handles, timestamps, and UPI IDs before blocking.'}
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-bold shrink-0">•</span>
                  <span>
                    <strong>{isHindi ? 'अकेले न रहें:' : 'Seek Support:'}</strong>{' '}
                    {isHindi 
                      ? 'किसी विश्वसनीय मित्र, परिवार या 14416 काउंसलर से बात करें। यह स्थिति आपकी गलती नहीं है।'
                      : 'Reach out to a trusted mentor, counselor (14416), or helpline. Coercion is entirely the perpetrator\'s crime.'}
                  </span>
                </li>
              </ul>
            </div>

            {/* PANEL 3: STATUTORY DIGITAL RIGHTS & TAKEDOWNS */}
            <div className="border border-black rounded-xl p-3 space-y-2">
              <div className="flex items-center gap-1.5 border-b border-black pb-1">
                <Scale className="w-3.5 h-3.5" />
                <h2 className="text-xs font-black uppercase tracking-wider">
                  {isHindi ? '3. वैधानिक अधिकार व 24 घंटे का नियम' : '3. Statutory Digital Removal Rights'}
                </h2>
              </div>
              <div className="text-[11px] space-y-1.5 leading-snug">
                <p>
                  <strong>{isHindi ? 'आईटी नियम 3(2)(b):' : 'IT Rules Rule 3(2)(b):'}</strong>{' '}
                  {isHindi 
                    ? 'सभी सोशल मीडिया प्लेटफॉर्म्स को गैर-सहमति वाली निजी सामग्री की शिकायत मिलने पर 24 घंटे के भीतर हटाना कानूनी रूप से अनिवार्य है।'
                    : 'Online platforms are mandated under Indian law to remove non-consensual personal media within 24 hours of notification.'}
                </p>
                <p>
                  <strong>{isHindi ? 'कानूनी धाराएं:' : 'Statutory Provisions:'}</strong>{' '}
                  {isHindi 
                    ? 'आईटी अधिनियम धारा 66E (गोपनीयता हनन), 67A (अश्लीलता) व भारतीय न्याय संहिता धारा 308 (जबरन वसूली/ब्लैकमेल) गैर-जमानती अपराध हैं।'
                    : 'IT Act Sections 66E & 67A, plus Bharatiya Nyaya Sanhita Section 308 (Extortion) make coercion a severe criminal offence.'}
                </p>
              </div>
            </div>

            {/* PANEL 4: ON-DEVICE ZERO-UPLOAD HASH TOOLS */}
            <div className="border border-black rounded-xl p-3 space-y-2">
              <div className="flex items-center gap-1.5 border-b border-black pb-1">
                <Lock className="w-3.5 h-3.5" />
                <h2 className="text-xs font-black uppercase tracking-wider">
                  {isHindi ? '4. जीरो-अपलोड प्राइवेसी टूल्स' : '4. Zero-Upload Privacy Tools'}
                </h2>
              </div>
              <div className="text-[11px] space-y-2 leading-snug">
                <div className="border-l-2 border-black pl-2">
                  <span className="font-bold block">StopNCII (stopncii.org) • 18+</span>
                  <span className="text-[10px] text-neutral-700 block">
                    {isHindi 
                      ? 'बिना फोटो अपलोड किए केवल सुरक्षित हैश कोड बनाता है और 20+ प्रमुख प्लेटफॉर्म्स पर री-अपलोड रोकता है।'
                      : 'Creates mathematical SHA-256 hash locally on phone to prevent sharing across Instagram, Meta, TikTok, OnlyFans.'}
                  </span>
                </div>
                <div className="border-l-2 border-black pl-2">
                  <span className="font-bold block">Take It Down (takeitdown.ncmec.org) • &lt;18</span>
                  <span className="text-[10px] text-neutral-700 block">
                    {isHindi 
                      ? '18 वर्ष से कम आयु के समय की सामग्री हेतु विशेष अंतरराष्ट्रीय सुरक्षा व POCSO कानूनी संरक्षण।'
                      : 'Strict zero-upload hash protection for media taken under age 18, backed by POCSO Act statutory protections.'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dotted fold guide for wallet storage */}
          <div className="border-t-2 border-dashed border-neutral-500 pt-2 flex items-center justify-between text-[10px] text-neutral-700 print:text-black">
            <span>✂️ {isHindi ? 'मोड़ें: इस कार्ड को 4 भागों में मोड़कर बटुए या आईडी धारक में सुरक्षित रखें' : 'FOLD GUIDE: Fold along dashed lines for standard pocket or wallet cardholder size'}</span>
            <span className="font-mono font-bold">cybercrime.gov.in • 1930</span>
          </div>
        </div>
      </div>
    </div>
  );
};

