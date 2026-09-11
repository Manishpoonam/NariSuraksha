import React from 'react';
import { motion } from 'motion/react';
import { 
  Printer, 
  X, 
  ShieldCheck, 
  PhoneCall, 
  Ban, 
  Camera, 
  Scale, 
  Lock, 
  ExternalLink,
  QrCode
} from 'lucide-react';
import { Language } from '../types';

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

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#E8E2DC] space-y-6 my-auto text-[#2D2D2D] relative">
        {/* Top bar controls (hidden during print) */}
        <div className="flex items-center justify-between gap-3 border-b border-[#F0EBE6] pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8B6D5C]"></span>
            <h3 className="text-sm sm:text-base font-bold text-[#1A1A1A]">
              {isHindi ? 'हॉस्टल व कॉलेज आपातकालीन गाइड (प्रिंट तैयार)' : 'Hostel & Campus Emergency Safety Card (Print Ready)'}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2D2D2D] hover:bg-[#111] text-white rounded-full font-bold text-xs transition-transform active:scale-95 cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>{isHindi ? 'प्रिंट करें / PDF सेव करें' : 'Print / Save PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#F3EFEC] text-[#666] hover:text-[#111] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE BODY */}
        <div id="printable-safety-card" className="space-y-6">
          {/* Header */}
          <div className="border-b-2 border-[#2D2D2D] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#8B6D5C] text-white text-[11px] font-extrabold uppercase tracking-wider mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isHindi ? 'महिला डिजिटल सुरक्षा प्रोटोकॉल' : 'Women Digital Safety Crisis Protocol'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] tracking-tight">
                NariSuraksha • {isHindi ? 'आपातकालीन सहायता कार्ड' : 'Emergency Action Card'}
              </h1>
              <p className="text-xs sm:text-sm text-[#555] mt-0.5">
                {isHindi
                  ? 'हॉस्टल, कॉलेज एवं व्यक्तिगत डायरी हेतु तत्काल 24/7 मार्गदर्शिका'
                  : 'For College Hostels, Noticeboards, Student Unions & Personal Wallets'}
              </p>
            </div>
            <div className="p-3 bg-[#FAF9F6] border border-[#E8E2DC] rounded-2xl text-center shrink-0">
              <span className="text-[10px] font-bold text-[#8B6D5C] uppercase tracking-wider block">
                {isHindi ? 'राष्ट्रीय हेल्पलाइन' : 'Emergency 24/7'}
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#DC2626] block">1930 & 112</span>
              <span className="text-[10px] text-[#777] block">
                {isHindi ? 'साइबर व पुलिस' : 'Cyber Crime & Police'}
              </span>
            </div>
          </div>

          {/* 3 Golden Rules */}
          <div className="space-y-2">
            <h2 className="text-sm font-black uppercase tracking-wider text-[#8B6D5C]">
              {isHindi ? 'संकट के पहले 60 सेकंड के 3 स्वर्ण नियम:' : 'First 60 Seconds: The 3 Non-Negotiable Rules'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-black text-rose-800">
                  <Ban className="w-4 h-4 text-rose-600" />
                  <span>{isHindi ? '1. पैसे कभी न दें' : '1. NEVER PAY MONEY'}</span>
                </div>
                <p className="text-[11px] text-rose-950 leading-snug">
                  {isHindi
                    ? 'एक रुपया भी देने पर वे और अधिक मांगते हैं। ब्लैकमेलर पैसे लेकर कभी फोटो डिलीट नहीं करते।'
                    : 'Extortionists NEVER delete media. Paying ₹1 immediately turns you into a repeating target.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-black text-amber-800">
                  <Camera className="w-4 h-4 text-amber-600" />
                  <span>{isHindi ? '2. चैट कभी न हटाएं' : '2. DO NOT DELETE CHAT'}</span>
                </div>
                <p className="text-[11px] text-amber-950 leading-snug">
                  {isHindi
                    ? 'ब्लॉक करने से पहले पूरे स्क्रीनशॉट लें (फोन नंबर, समय, यूपीआई आईडी सहित)। यही पुलिस का कानूनी सबूत है।'
                    : 'Keep full uncropped screenshots showing phone numbers and UPI IDs. Without this, police cannot trace the criminal.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-black text-emerald-800">
                  <Scale className="w-4 h-4 text-emerald-600" />
                  <span>{isHindi ? '3. 24 घंटे में रिमूवल' : '3. 24-HR REMOVAL'}</span>
                </div>
                <p className="text-[11px] text-emerald-950 leading-snug">
                  {isHindi
                    ? 'आईटी रूल्स 2021 के तहत सभी प्लेटफॉर्म्स 24 घंटे में गैर-सहमति वाली तस्वीरें हटाने के लिए कानूनी रूप से बाध्य हैं।'
                    : 'Under Indian Law (IT Rules 2021), platforms must take down intimate content within 24 hours of notice.'}
                </p>
              </div>
            </div>
          </div>

          {/* Age-Specific Universal Takedowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-b border-[#F0EBE6] py-4">
            <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E2DC] space-y-1.5">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#8B6D5C] text-white">
                {isHindi ? 'यदि उम्र 18 से कम है (नाबालिग)' : 'Under 18 at Time of Media'}
              </span>
              <h3 className="text-sm font-bold text-[#1A1A1A]">
                Take It Down (takeitdown.ncmec.org)
              </h3>
              <p className="text-xs text-[#555] leading-relaxed">
                {isHindi
                  ? 'बिना फोटो अपलोड किए फोन पर हैश बनाकर मेटा, फेसबुक, इंस्टाग्राम व अन्य साइट्स से हमेशा के लिए ब्लॉक करें। POCSO कानून के तहत त्वरित पुलिस कार्रवाई।'
                  : 'Hashes image locally on device without uploading. Automatically blocked by Meta, Snap, OnlyFans. Covered by POCSO Act.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E2DC] space-y-1.5">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#2D2D2D] text-white">
                {isHindi ? 'यदि उम्र 18 वर्ष या अधिक है (वयस्क)' : '18+ Adult at Time of Media'}
              </span>
              <h3 className="text-sm font-bold text-[#1A1A1A]">
                StopNCII (stopncii.org)
              </h3>
              <p className="text-xs text-[#555] leading-relaxed">
                {isHindi
                  ? 'ग्लोबल प्राइवेसी टूल जो आपकी फोटो को शेयर होने से पहले ही ब्लॉक कर देता है। केवल 64-अक्षरों का हैश कोड जनरेट होता है।'
                  : 'Official global privacy tool generating device-side SHA-256 hashes. Stops distribution across 20+ major platforms.'}
              </p>
            </div>
          </div>

          {/* Essential Helpline Directory */}
          <div className="space-y-2">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#666]">
              {isHindi ? 'महत्वपूर्ण आपातकालीन फोन नंबर (टोल-फ्री):' : 'Essential Verified Emergency Hotlines:'}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200">
                <span className="font-extrabold text-red-700 block text-base">112</span>
                <span className="text-[10px] text-red-900 font-semibold">{isHindi ? 'पुलिस आपातकाल' : 'All-India Police'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-orange-50 border border-orange-200">
                <span className="font-extrabold text-orange-700 block text-base">1930</span>
                <span className="text-[10px] text-orange-900 font-semibold">{isHindi ? 'राष्ट्रीय साइबर अपराध' : 'National Cyber Crime'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-pink-50 border border-pink-200">
                <span className="font-extrabold text-pink-700 block text-base">1091</span>
                <span className="text-[10px] text-pink-900 font-semibold">{isHindi ? 'महिला हेल्पलाइन' : 'Women Helpline'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200">
                <span className="font-extrabold text-blue-700 block text-base">1098</span>
                <span className="text-[10px] text-blue-900 font-semibold">{isHindi ? 'चाइल्डलाइन / POCSO' : 'Childline 1098'}</span>
              </div>
            </div>
          </div>

          {/* Bottom Trust & Zero-Shame Note */}
          <div className="pt-2 text-center border-t border-[#F0EBE6] text-[11px] text-[#777]">
            <p className="font-semibold text-[#1A1A1A]">
              {isHindi
                ? 'याद रखें: अंतरंग तस्वीर होना अपराध नहीं है — किसी की अनुमति के बिना उसे प्रसारित करना या ब्लैकमेल करना गैर-जमानती अपराध है।'
                : 'REMEMBER: Having private photos is NOT a crime. Distributing without consent or blackmailing is a non-bailable felony.'}
            </p>
            <p className="mt-0.5">
              Online Access: <strong className="text-[#2D2D2D]">cybercrime.gov.in</strong> • StopNCII: <strong className="text-[#2D2D2D]">stopncii.org</strong> • Take It Down: <strong className="text-[#2D2D2D]">takeitdown.ncmec.org</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
