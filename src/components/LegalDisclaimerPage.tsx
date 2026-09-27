/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Scale, 
  ShieldCheck, 
  ArrowLeft, 
  PhoneCall, 
  AlertTriangle, 
  ExternalLink, 
  Lock, 
  EyeOff, 
  Globe, 
  CheckCircle2, 
  Info,
  HeartHandshake
} from 'lucide-react';
import { Language } from '../types';
import { LEGAL_DISCLAIMER } from '../data/legalDisclaimer';
import { hapticAction, hapticCamouflage, hapticSOS } from '../utils/haptics';

export interface LegalDisclaimerPageProps {
  language: Language;
  onBack: () => void;
  onTriggerCamouflage?: () => void;
  onToggleLanguage?: () => void;
  returnLabel?: string;
}

export const LegalDisclaimerPage: React.FC<LegalDisclaimerPageProps> = ({
  language,
  onBack,
  onTriggerCamouflage,
  onToggleLanguage,
  returnLabel,
}) => {
  const isHindi = language === 'hi';

  const defaultReturnLabel = returnLabel || (isHindi ? 'पिछली स्क्रीन पर वापस जाएं' : 'Return to Previous Screen');

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#1A1829] flex flex-col justify-between selection:bg-[#993556] selection:text-white">
      {/* 1. TOP UTILITY STRIP */}
      <header className="sticky top-0 z-40 bg-[#FAF8F3]/95 backdrop-blur-md border-b border-[#26215C]/10 shadow-soft">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          {/* Back button */}
          <button
            type="button"
            onClick={() => {
              hapticAction();
              onBack();
            }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white hover:bg-neutral-100 text-[#26215C] text-xs sm:text-sm font-bold border border-[#26215C]/15 transition-all cursor-pointer shadow-2xs active:scale-95 min-h-[40px] focus-visible:ring-2 focus-visible:ring-[#26215C] focus-visible:outline-none"
            title={defaultReturnLabel}
          >
            <ArrowLeft className="w-4 h-4 text-[#993556] shrink-0" />
            <span className="truncate max-w-[180px] sm:max-w-none">{defaultReturnLabel}</span>
          </button>

          {/* Quick Controls: Language + Quick Exit */}
          <div className="flex items-center gap-2">
            {onToggleLanguage && (
              <button
                type="button"
                onClick={() => {
                  hapticAction();
                  onToggleLanguage();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-neutral-100 text-[#26215C] text-xs font-semibold border border-[#26215C]/15 transition-colors cursor-pointer min-h-[40px]"
                title="Switch Language / भाषा बदलें"
              >
                <Globe className="w-3.5 h-3.5 text-[#993556] shrink-0" />
                <span>{isHindi ? 'EN' : 'हिन्दी'}</span>
              </button>
            )}

            {onTriggerCamouflage && (
              <button
                type="button"
                onClick={() => {
                  hapticCamouflage(true);
                  onTriggerCamouflage();
                }}
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#993556] hover:bg-[#7A2843] transition-all cursor-pointer shadow-xs min-h-[40px] active:scale-95 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#F3C5D6] focus-visible:outline-none"
                title={isHindi ? 'तुरंत स्क्रीन छिपाएं (ESC)' : 'Leave this page instantly (ESC)'}
              >
                <EyeOff className="w-3.5 h-3.5 text-[#F3C5D6] shrink-0" />
                <span className="hidden sm:inline">{isHindi ? 'स्क्रीन छिपाएं' : 'Quick Exit'}</span>
                <span className="sm:hidden">{isHindi ? 'छिपाएं' : 'Exit'}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8">
        {/* Title & Trust Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E1F5EE] border border-[#B7E4D7] text-[#0F6E56] text-xs font-semibold">
            <Scale className="w-3.5 h-3.5 shrink-0" />
            <span>{isHindi ? 'आधिकारिक वैधानिक सूचना' : 'Official Legal Notice & Transparency'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#26215C] tracking-tight leading-tight">
            {isHindi 
              ? 'वैधानिक गैर-संबद्धता एवं कानूनी अस्वीकरण' 
              : 'Legal Disclaimer & Non-Affiliation Notice'}
          </h1>

          <p className="text-sm sm:text-base text-[#5A5672] leading-relaxed">
            {isHindi 
              ? 'नारीसुरक्षा की स्वतंत्रता, उद्देश्य, सीमाओं एवं उपयोगकर्ताओं की सुरक्षा से संबंधित महत्वपूर्ण कानूनी शर्तें।'
              : 'Essential legal terms regarding NariSuraksha’s independence, purpose, limitations, and user safeguards.'}
          </p>
        </div>

        {/* PRIMARY CANONICAL NOTICE BOX */}
        <div className="p-5 sm:p-7 rounded-[22px] bg-[#26215C] text-[#FAF8F3] border border-[#373078] shadow-elevated space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#F3C5D6] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#F3C5D6]">
                {isHindi ? 'मुख्य घोषणा' : 'Canonical Statement'}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                {isHindi ? 'स्वतंत्र गैर-व्यावसायिक डिजिटल सहायता साधन' : 'Independent Non-Commercial Digital Tool'}
              </h2>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#FAF8F3]/95 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10 font-normal">
            {isHindi ? LEGAL_DISCLAIMER.full.hi : LEGAL_DISCLAIMER.full.en}
          </p>

          <div className="flex flex-wrap items-center gap-2 text-xs text-[#D2CCE7] pt-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-emerald-300 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isHindi ? '100% निःशुल्क व गैर-व्यावसायिक' : '100% Free & Non-Commercial'}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-amber-200 font-medium">
              <Lock className="w-3.5 h-3.5" />
              <span>{isHindi ? 'शून्य डेटा संग्रह (No Data Retained)' : 'Zero Data Retained'}</span>
            </span>
          </div>
        </div>

        {/* DETAILED SECTIONS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Card 1: Non-Affiliation */}
          <section className="p-5 sm:p-6 rounded-2xl bg-white border border-[#26215C]/10 shadow-soft space-y-3">
            <div className="flex items-center gap-2.5 text-[#26215C]">
              <div className="w-8 h-8 rounded-lg bg-[#FAF8F3] border border-[#26215C]/15 flex items-center justify-center shrink-0">
                <Scale className="w-4 h-4 text-[#26215C]" />
              </div>
              <h3 className="font-bold text-sm sm:text-base">
                {isHindi ? '1. गैर-सरकारी स्थिति (Non-Affiliation)' : '1. Independent Civic Resource'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#5A5672] leading-relaxed">
              {isHindi
                ? 'नारीसुरक्षा भारत सरकार, गृह मंत्रालय (MHA), राष्ट्रीय महिला आयोग (NCW), राज्य पुलिस बल, या किसी न्यायिक प्राधिकरण का आधिकारिक पोर्टल नहीं है। यह संकटग्रस्त महिलाओं और बालिकाओं की सहायता हेतु निर्मित एक स्वतंत्र नागरिक पहल (Civic Tech Initiative) है।'
                : 'NariSuraksha is an independent, non-governmental civic tech resource. It is not affiliated with, endorsed by, or operated by the Government of India, the Ministry of Home Affairs (MHA), the National Commission for Women (NCW), state police departments, or any judicial authority.'}
            </p>
          </section>

          {/* Card 2: Not Legal Advice */}
          <section className="p-5 sm:p-6 rounded-2xl bg-white border border-[#26215C]/10 shadow-soft space-y-3">
            <div className="flex items-center gap-2.5 text-[#26215C]">
              <div className="w-8 h-8 rounded-lg bg-[#FAF8F3] border border-[#26215C]/15 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </div>
              <h3 className="font-bold text-sm sm:text-base">
                {isHindi ? '2. कानूनी सलाह का विकल्प नहीं' : '2. Not Formal Legal Counsel'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#5A5672] leading-relaxed">
              {isHindi
                ? 'यहाँ प्रदान की गई जानकारी, सुरक्षा चेकलिस्ट और शिकायत के प्रारूप केवल तथ्यात्मक मार्गदर्शन और साक्ष्य संकलन हेतु हैं। यह औपचारिक वकील-मुवक्किल संबंध (Attorney-Client Relationship) या कानूनी प्रतिनिधित्व स्थापित नहीं करता है।'
                : 'The guidance, evidence preservation checklists, and complaint templates generated by this tool are educational frameworks to assist reporting to official authorities. They do not constitute formal legal representation, judicial certificates, or attorney-client counsel.'}
            </p>
          </section>

          {/* Card 3: Free Legal Aid Right */}
          <section className="p-5 sm:p-6 rounded-2xl bg-white border border-[#26215C]/10 shadow-soft space-y-3">
            <div className="flex items-center gap-2.5 text-[#0F6E56]">
              <div className="w-8 h-8 rounded-lg bg-[#E1F5EE] flex items-center justify-center shrink-0">
                <HeartHandshake className="w-4 h-4 text-[#0F6E56]" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-[#26215C]">
                {isHindi ? '3. 100% मुफ्त सरकारी कानूनी सहायता का अधिकार' : '3. Statutory Right to Free Legal Aid'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#5A5672] leading-relaxed">
              {isHindi
                ? 'विधिक सेवा प्राधिकरण अधिनियम, 1987 (Legal Services Authorities Act) की धारा 12 के तहत भारत में प्रत्येक महिला को उसकी आय पर ध्यान दिए बिना पूर्णतः मुफ्त कानूनी वकील व सहायता प्राप्त करने का संवैधानिक अधिकार है।'
                : 'Under Section 12 of the Legal Services Authorities Act, 1987, every woman in India, regardless of financial income, is legally entitled to 100% free legal assistance and government-appointed advocates through NALSA and State Legal Services Authorities.'}
            </p>
            <div className="pt-1">
              <a
                href="tel:15100"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F6E56] hover:underline"
              >
                <span>NALSA 24×7 Free Legal Aid Helpline: 15100</span>
                <PhoneCall className="w-3 h-3" />
              </a>
            </div>
          </section>

          {/* Card 4: Zero-Knowledge Privacy Architecture */}
          <section className="p-5 sm:p-6 rounded-2xl bg-white border border-[#26215C]/10 shadow-soft space-y-3">
            <div className="flex items-center gap-2.5 text-[#26215C]">
              <div className="w-8 h-8 rounded-lg bg-[#FAF8F3] border border-[#26215C]/15 flex items-center justify-center shrink-0">
                <Lock className="w-4 h-4 text-[#0F6E56]" />
              </div>
              <h3 className="font-bold text-sm sm:text-base">
                {isHindi ? '4. पूर्ण स्थानीय गोपनीयता (Zero-Knowledge)' : '4. Zero-Knowledge Privacy'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#5A5672] leading-relaxed">
              {isHindi
                ? 'नारीसुरक्षा कोई रिमोट डेटाबेस नहीं रखता। जो कुछ भी आप यहाँ टाइप करती हैं या साक्ष्य जोड़ती हैं, वह केवल आपके फोन/ब्राउज़र की अस्थायी मेमोरी में रहता है। कोई खाता नहीं, कोई लॉगिन नहीं, कोई ट्रैकिंग नहीं।'
                : 'All information entered into this application remains strictly within your browser’s local session. We maintain no backend servers that store personal data, zero analytics cookies, no tracking pixels, and no cloud synchronization.'}
            </p>
          </section>
        </div>

        {/* OFFICIAL CHANNELS DIRECTORY STRIP */}
        <section className="p-5 sm:p-6 rounded-2xl bg-[#F4F3F9] border border-[#26215C]/12 space-y-3">
          <div className="flex items-center gap-2 text-[#26215C]">
            <Info className="w-4 h-4 text-[#993556] shrink-0" />
            <h3 className="font-bold text-sm sm:text-base">
              {isHindi ? 'आधिकारिक आपातकालीन एवं शिकायत चैनल' : 'Official Emergency & Law Enforcement Channels'}
            </h3>
          </div>
          <p className="text-xs text-[#5A5672]">
            {isHindi
              ? 'आधिकारिक रिपोर्टिंग और आपातकालीन सहायता हेतु सीधे इन सत्यापित सरकारी माध्यमों का उपयोग करें:'
              : 'For formal reporting and immediate emergency response, connect directly with these verified government bodies:'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1 text-xs">
            <a
              href="tel:1930"
              onClick={() => hapticSOS()}
              className="p-3 rounded-xl bg-white border border-[#26215C]/10 flex items-center justify-between hover:border-[#0F6E56] transition-colors"
            >
              <div>
                <span className="font-bold text-[#26215C] block">1930</span>
                <span className="text-[11px] text-[#5A5672]">{isHindi ? 'राष्ट्रीय साइबर अपराध' : 'National Cyber Crime'}</span>
              </div>
              <PhoneCall className="w-4 h-4 text-[#0F6E56]" />
            </a>

            <a
              href="tel:112"
              onClick={() => hapticSOS()}
              className="p-3 rounded-xl bg-white border border-[#26215C]/10 flex items-center justify-between hover:border-[#DC2626] transition-colors"
            >
              <div>
                <span className="font-bold text-[#DC2626] block">112</span>
                <span className="text-[11px] text-[#5A5672]">{isHindi ? 'अखिल भारतीय पुलिस/आपातकाल' : 'All-India Police / ERSS'}</span>
              </div>
              <PhoneCall className="w-4 h-4 text-[#DC2626]" />
            </a>

            <a
              href="tel:1091"
              onClick={() => hapticAction()}
              className="p-3 rounded-xl bg-white border border-[#26215C]/10 flex items-center justify-between hover:border-[#993556] transition-colors"
            >
              <div>
                <span className="font-bold text-[#993556] block">1091</span>
                <span className="text-[11px] text-[#5A5672]">{isHindi ? 'महिला सुरक्षा हेल्पलाइन' : 'Women Safety Helpline'}</span>
              </div>
              <PhoneCall className="w-4 h-4 text-[#993556]" />
            </a>

            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white border border-[#26215C]/10 flex items-center justify-between hover:border-[#26215C] transition-colors"
            >
              <div>
                <span className="font-bold text-[#26215C] block">cybercrime.gov.in</span>
                <span className="text-[11px] text-[#5A5672]">{isHindi ? 'गृह मंत्रालय साइबर पोर्टल' : 'MHA Cyber Portal'}</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#5A5672]" />
            </a>

            <a
              href="https://stopncii.org"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white border border-[#26215C]/10 flex items-center justify-between hover:border-[#26215C] transition-colors"
            >
              <div>
                <span className="font-bold text-[#26215C] block">StopNCII.org</span>
                <span className="text-[11px] text-[#5A5672]">{isHindi ? 'निजी फोटो प्रसार रोकथाम' : 'Non-Consensual Image Stop'}</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#5A5672]" />
            </a>

            <a
              href="tel:14490"
              onClick={() => hapticAction()}
              className="p-3 rounded-xl bg-white border border-[#26215C]/10 flex items-center justify-between hover:border-[#26215C] transition-colors"
            >
              <div>
                <span className="font-bold text-[#26215C] block">14490</span>
                <span className="text-[11px] text-[#5A5672]">{isHindi ? 'राष्ट्रीय महिला आयोग (NCW)' : 'NCW 24/7 Helpline'}</span>
              </div>
              <PhoneCall className="w-4 h-4 text-[#26215C]" />
            </a>
          </div>
        </section>

        {/* BOTTOM ACTION BUTTONS */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#26215C]/10">
          <button
            type="button"
            onClick={() => {
              hapticAction();
              onBack();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#26215C] hover:bg-[#1E1949] text-white text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer inline-flex items-center justify-center gap-2 min-h-[44px] active:scale-97 focus-visible:ring-2 focus-visible:ring-[#F3C5D6] focus-visible:outline-none"
          >
            <ArrowLeft className="w-4 h-4 text-[#F3C5D6]" />
            <span>{defaultReturnLabel}</span>
          </button>

          <a
            href="tel:1930"
            onClick={() => hapticSOS()}
            className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#0F6E56] hover:bg-[#0A4E3D] text-white text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer inline-flex items-center justify-center gap-2 min-h-[44px] active:scale-97"
          >
            <PhoneCall className="w-4 h-4 text-emerald-200" />
            <span>{isHindi ? '1930 साइबर हेल्पलाइन पर कॉल करें' : 'Call 1930 Cyber Helpline'}</span>
          </a>
        </div>
      </main>

      {/* 3. MINIMAL FOOTER */}
      <footer className="w-full px-4 sm:px-6 py-4 text-center border-t border-[#26215C]/10 text-xs text-[#5A5672]">
        <p>
          {isHindi 
            ? 'नारीसुरक्षा • शून्य डेटा ट्रैकिंग • आपकी सुरक्षा हमारी प्राथमिकता है' 
            : 'NariSuraksha • Zero Data Tracking • Your Safety & Agency First'}
        </p>
      </footer>
    </div>
  );
};
