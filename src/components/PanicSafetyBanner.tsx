import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck,
  ExternalLink, 
  Camera, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Sparkles, 
  Shield, 
  PhoneCall,
  Printer,
  Trash2,
  HelpCircle,
  Clock,
  Info
} from 'lucide-react';
import { Language } from '../types';

interface PanicSafetyBannerProps {
  language: Language;
  onNavigateToTab: (tab: string, elementId?: string) => void;
  onOpenPrintCard: () => void;
  onOpenPurgeModal: () => void;
}

export const PanicSafetyBanner: React.FC<PanicSafetyBannerProps> = ({
  language,
  onNavigateToTab,
  onOpenPrintCard,
  onOpenPurgeModal
}) => {
  const isHindi = language === 'hi';
  const [selectedAge, setSelectedAge] = useState<'minor' | 'adult' | null>(null);
  const [showEvidenceGuide, setShowEvidenceGuide] = useState(false);

  return (
    <div className="space-y-4" id="panic-safety-banner">
      {/* 1. BRUTAL TRUTH / ANTI-DELETION WARNING */}
      <div className="p-4 sm:p-5 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 text-[#1A1A1A] pinterest-glass shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500 text-white shrink-0 mt-0.5 shadow-2xs">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500 text-white">
                  {isHindi ? 'सख्त चेतावनी' : 'FIRST 60 SECONDS CRITICAL RULE'}
                </span>
                <h3 className="text-sm sm:text-base font-extrabold text-[#1A1A1A]">
                  {isHindi
                    ? 'घबराहट में चैट या अपना अकाउंट कभी डिलीट न करें!'
                    : 'DO NOT DELETE THE CHAT OR YOUR ACCOUNT IN PANIC!'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#444] leading-relaxed">
                {isHindi
                  ? 'चैट डिलीट करने से अपराधी के फोन से फोटो नहीं हटती — बल्कि आप वह एकमात्र कानूनी सबूत खो देती हैं जिससे पुलिस अपराधी के फोन नंबर, आईपी एड्रेस और बैंक खाते को ट्रेस कर सकती है।'
                  : 'Deleting the chat does NOT remove media from the blackmailer’s device. It destroys the only court-admissible proof police need to subpoena telecom providers and track the perpetrator.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowEvidenceGuide(!showEvidenceGuide)}
            className="self-start sm:self-center px-4 py-2 bg-white hover:bg-[#FAF9F6] text-[#2D2D2D] border border-amber-300 rounded-full font-bold text-xs shrink-0 transition-transform active:scale-95 cursor-pointer shadow-2xs whitespace-nowrap"
          >
            {showEvidenceGuide 
              ? (isHindi ? 'गाइड छिपाएं' : 'Hide Instructions') 
              : (isHindi ? '3 जरूरी सबूत कैसे लें?' : 'How to Capture 3 Proofs')}
          </button>
        </div>

        {/* Expandable Step-by-Step Evidence Preservation Guide */}
        <AnimatePresence>
          {showEvidenceGuide && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-amber-200/60 space-y-3"
            >
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-900">
                {isHindi ? 'ब्लॉक करने से पहले यह 3 कदम उठाएं:' : 'Before Blocking or Muting, Do These 3 Things:'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-white/80 rounded-2xl border border-amber-200 space-y-1">
                  <span className="font-bold text-amber-950 block">
                    {isHindi ? '1. पूरा स्क्रीनशॉट लें' : '1. Uncropped Screenshot'}
                  </span>
                  <p className="text-[#666]">
                    {isHindi
                      ? 'ऊपर की घड़ी, तारीख और ब्लैकमेलर का मोबाइल नंबर/यूजरनेम साफ दिखना चाहिए।'
                      : 'Capture top status bar (time/date) and attacker phone number or full handle.'}
                  </p>
                </div>
                <div className="p-3 bg-white/80 rounded-2xl border border-amber-200 space-y-1">
                  <span className="font-bold text-amber-950 block">
                    {isHindi ? '2. चैट एक्सपोर्ट करें' : '2. Export Chat Ledger'}
                  </span>
                  <p className="text-[#666]">
                    {isHindi
                      ? 'व्हाट्सएप में: More > Export Chat > Without Media दबाएं और सुरक्षित सेव करें।'
                      : 'In WhatsApp: Tap More > Export Chat > Without Media. Save text file to secure cloud.'}
                  </p>
                </div>
                <div className="p-3 bg-white/80 rounded-2xl border border-amber-200 space-y-1">
                  <span className="font-bold text-amber-950 block">
                    {isHindi ? '3. यूपीआई / लिंक नोट करें' : '3. Note UPI / Links'}
                  </span>
                  <p className="text-[#666]">
                    {isHindi
                      ? 'जिस नंबर या क्यूआर कोड पर पैसे मांगे गए, उसका स्क्रीनशॉट 1930 साइबर सेल के लिए जरूरी है।'
                      : 'Record the exact UPI ID / QR code where money was requested for Section 91 tracing.'}
                  </p>
                </div>
              </div>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => onNavigateToTab('evidence')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B6D5C] hover:underline"
                >
                  <span>{isHindi ? 'पूर्ण सबूत चेकलिस्ट खोलें' : 'Open Comprehensive Evidence Checklist Tool'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. THE AGE ROUTER: MINOR (UNDER 18) VS ADULT (18+) */}
      <div className="pinterest-glass rounded-3xl p-5 sm:p-6 shadow-xs border border-white/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#8B6D5C]/10 text-[#8B6D5C] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isHindi ? 'उम्र के अनुसार सटीक सुरक्षा' : 'Age-Specific Takedown Protection'}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A] mt-1">
              {isHindi
                ? 'तस्वीर/वीडियो के समय पीड़ित की उम्र क्या थी?'
                : 'What was the age at the time the photo/video was captured?'}
            </h3>
            <p className="text-xs text-[#666]">
              {isHindi
                ? 'नाबालिगों (18 वर्ष से कम) और वयस्कों के लिए कानून व रिमूवल टूल्स अलग-अलग होते हैं।'
                : '18+ uses StopNCII. Under 18 uses Take It Down with strict POCSO criminal protections.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedAge('minor')}
              className={`px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
                selectedAge === 'minor'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-white hover:bg-[#F3EFEC] text-[#333] border border-[#E8E2DC]'
              }`}
            >
              👧 {isHindi ? '18 वर्ष से कम (नाबालिग)' : 'Under 18 (Minor)'}
            </button>
            <button
              onClick={() => setSelectedAge('adult')}
              className={`px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
                selectedAge === 'adult'
                  ? 'bg-[#2D2D2D] text-white shadow-xs'
                  : 'bg-white hover:bg-[#F3EFEC] text-[#333] border border-[#E8E2DC]'
              }`}
            >
              👩 {isHindi ? '18 वर्ष या अधिक (वयस्क)' : '18+ (Adult)'}
            </button>
          </div>
        </div>

        {/* Dynamic Display Based on Age Selection */}
        {selectedAge === 'minor' && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-2xl bg-rose-50/90 border border-rose-200 text-rose-950 space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-600 text-white inline-block mb-1">
                  {isHindi ? 'पॉक्सो कानून व टेक इट डाउन' : 'POCSO Act & Take It Down Protocol'}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-rose-950">
                  {isHindi
                    ? '18 वर्ष से कम उम्र हेतु: Take It Down (takeitdown.ncmec.org)'
                    : 'For Under 18: Use Take It Down (takeitdown.ncmec.org)'}
                </h4>
                <p className="text-xs text-rose-900 mt-0.5 leading-relaxed">
                  {isHindi
                    ? 'StopNCII केवल 18+ के लिए है। 18 से कम उम्र की सामग्री के लिए Take It Down का उपयोग करें। यह आपकी फोटो अपलोड किए बिना डिवाइस पर ही डिजिटल हैश बनाता है जिससे मेटा, इंस्टाग्राम, थ्रेड्स व अन्य प्लेटफॉर्म्स इसे तुरंत ब्लॉक कर देते हैं।'
                    : 'StopNCII only accepts 18+ cases. For under-18 media, Take It Down (NCMEC) hashes content locally without uploading. Tech giants immediately ban uploads matching the hash.'}
                </p>
              </div>
              <a
                href="https://takeitdown.ncmec.org"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-full font-bold text-xs shrink-0 inline-flex items-center gap-1.5 shadow-xs"
              >
                <span>{isHindi ? 'पोर्टल खोलें' : 'Open Portal'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-3 bg-white/80 rounded-xl border border-rose-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-rose-600 shrink-0" />
                <span>
                  {isHindi
                    ? 'पॉक्सो (POCSO) धारा 14/15: गैर-जमानती अपराध। तुरंत 1098 चाइल्डलाइन या 112 पर पुलिस शिकायत दर्ज हो सकती है।'
                    : 'POCSO Act Sec 14/15: Strictly non-bailable felony. Police FIR is mandatory with child-friendly provisions.'}
                </span>
              </div>
              <a
                href="tel:1098"
                className="inline-flex items-center gap-1 font-bold text-rose-700 hover:underline shrink-0"
              >
                <PhoneCall className="w-3 h-3" />
                <span>Call 1098 (Childline)</span>
              </a>
            </div>
          </motion.div>
        )}

        {selectedAge === 'adult' && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-emerald-950 space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-700 text-white inline-block mb-1">
                  {isHindi ? 'स्टॉप-एनसीआईआई व आईटी नियम 2021' : 'StopNCII & IT Rules 2021'}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-emerald-950">
                  {isHindi
                    ? '18+ वयस्कों हेतु: StopNCII.org (ग्लोबल प्राइवेसी प्लेटफॉर्म)'
                    : 'For 18+ Adults: Use StopNCII.org (Direct Platform Shield)'}
                </h4>
                <p className="text-xs text-emerald-900 mt-0.5 leading-relaxed">
                  {isHindi
                    ? 'आपकी फोटो कभी सर्वर पर अपलोड नहीं होती। आपके फोन में 64-अक्षरों का डिजिटल हैश बनता है जो मेटा, इंस्टाग्राम, टिकटॉक और अन्य कंपनियों को भेजा जाता है जिससे कोई भी व्यक्ति इसे पोस्ट नहीं कर पाता।'
                    : 'StopNCII creates a cryptographic SHA-256 fingerprint in your device memory. The original photo never leaves your device, and partner platforms proactively prevent sharing.'}
                </p>
              </div>
              <a
                href="https://stopncii.org"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full font-bold text-xs shrink-0 inline-flex items-center gap-1.5 shadow-xs"
              >
                <span>{isHindi ? 'StopNCII खोलें' : 'Open StopNCII'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-3 bg-white/80 rounded-xl border border-emerald-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  {isHindi
                    ? 'आईटी अधिनियम धारा 67A व आईटी रूल्स 2021: नोटिस के 24 घंटे में प्लेटफॉर्म्स को सामग्री हटाना अनिवार्य है।'
                    : 'IT Act Sec 67A & Rule 3(2)(b): Platforms are legally mandated to delete intimate media within 24 hours of notice.'}
                </span>
              </div>
              <a
                href="tel:1930"
                className="inline-flex items-center gap-1 font-bold text-emerald-800 hover:underline shrink-0"
              >
                <PhoneCall className="w-3 h-3" />
                <span>Call 1930 (Cyber Helpline)</span>
              </a>
            </div>
          </motion.div>
        )}

        {/* 3. QUICK UTILITIES: PRINT CARD & PURGE LOCAL FOOTPRINT */}
        <div className="pt-2 border-t border-black/5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={onOpenPrintCard}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/90 hover:bg-white text-[#2D2D2D] rounded-full font-bold border border-[#E8E2DC] transition-all hover:-translate-y-0.5 shadow-2xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#8B6D5C]" />
              <span>{isHindi ? 'कॉलेज व हॉस्टल सेफ्टी कार्ड प्रिंट करें' : 'Print Hostel & Campus Emergency Card'}</span>
            </button>

            <button
              onClick={onOpenPurgeModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-full font-bold border border-rose-200 transition-all hover:-translate-y-0.5 shadow-2xs cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-600" />
              <span>{isHindi ? 'साझा फोन: स्थानीय डेटा मिटाएं' : 'Shared Phone: Purge Local Footprint'}</span>
            </button>
          </div>

          <span className="text-[11px] text-[#777]">
            {isHindi ? '100% गोपनीय • ऑन-डिवाइस निष्पादन' : '100% Confidential • On-Device Execution'}
          </span>
        </div>
      </div>
    </div>
  );
};
