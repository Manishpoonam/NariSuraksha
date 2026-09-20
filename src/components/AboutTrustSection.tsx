import React from 'react';
import { ShieldCheck, Lock, HeartHandshake, Scale } from 'lucide-react';
import { Language } from '../types';
import { LEGAL_DISCLAIMER } from '../data/legalDisclaimer';

interface AboutTrustSectionProps {
  language: Language;
}

export const AboutTrustSection: React.FC<AboutTrustSectionProps> = ({ language }) => {
  const isHindi = language === 'hi';

  return (
    <section 
      id="about-trust-section"
      aria-label="About This Service & Privacy Guarantee" 
      className="bg-white border border-[#E8E2DC] rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs space-y-6 scroll-mt-48"
    >
      <div className="border-b border-[#F0EBE6] pb-5 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F3EFEC] text-[#8B6D5C] rounded-full text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-[#8B6D5C]" />
          <span>{isHindi ? 'सेवा एवं गोपनीयता की गारंटी' : 'About This Service & Privacy Guarantee'}</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">
          {isHindi ? 'नारी सुरक्षा: महिला डिजिटल सुरक्षा एवं आपातकालीन मार्गदर्शन' : 'NariSuraksha: Zero-Trust Emergency Guidance for Women'}
        </h3>
        <p className="text-xs sm:text-sm text-[#666] leading-relaxed max-w-3xl">
          {isHindi
            ? 'यह एक गैर-व्यावसायिक, स्वतंत्र डिजिटल सहायता और कानूनी मार्गदर्शन मंच है जिसे संकट के समय महिलाओं और लड़कियों की तत्काल सुरक्षा के लिए तैयार किया गया है।'
            : 'A non-commercial, privacy-first emergency response and legal empowerment portal designed to assist women facing non-consensual image leaks (NCII), cyber extortion, and online harassment.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
        {/* Pillar 1: Who it is for */}
        <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#E8E2DC] space-y-3">
          <div className="w-8 h-8 rounded-xl bg-[#F3EFEC] text-[#8B6D5C] flex items-center justify-center font-bold">
            <HeartHandshake className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-[#2D2D2D] text-sm sm:text-base">
            {isHindi ? 'यह किसके लिए है?' : 'Who is this for?'}
          </h4>
          <p className="text-[#666] leading-relaxed">
            {isHindi
              ? 'उन सभी महिलाओं, किशोरियों और उनके परिजनों के लिए जो सोशल मीडिया ब्लैकमेल, डीपफेक या निजी फोटो लीक का सामना कर रही हैं।'
              : 'For girls, women, parents, and advocates dealing with online threats, cyber blackmail, non-consensual photo distribution, or stalking.'}
          </p>
        </div>

        {/* Pillar 2: Nature of service */}
        <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#E8E2DC] space-y-3">
          <div className="w-8 h-8 rounded-xl bg-[#E1F5EE] text-[#0F6E56] flex items-center justify-center font-bold">
            <Scale className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-[#2D2D2D] text-sm sm:text-base">
            {isHindi ? 'यह सेवा कैसे काम करती है?' : 'Emergency vs Guidance Role'}
          </h4>
          <p className="text-[#666] leading-relaxed">
            {isHindi
              ? 'यह पोर्टल आधिकारिक सरकारी नंबरों (112, 1930, 181), कानूनी e-FIR ड्राफ्ट, StopNCII लिंक्स और तत्काल सुरक्षा चेकलिस्ट प्रदान करता है।'
              : 'Directly routes to verified official hotlines (112, 1930, 181) while generating Section 63 BSA certified complaints and StopNCII takedowns.'}
          </p>
        </div>

        {/* Pillar 3: Zero-Data Privacy Guarantee */}
        <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#E8E2DC] space-y-3">
          <div className="w-8 h-8 rounded-xl bg-[#ECFDF5] text-emerald-800 flex items-center justify-center font-bold">
            <Lock className="w-4 h-4 text-emerald-600" />
          </div>
          <h4 className="font-bold text-[#2D2D2D] text-sm sm:text-base">
            {isHindi ? '100% ऑन-डिवाइस गोपनीयता' : 'Zero Data Stored (100% Private)'}
          </h4>
          <p className="text-[#666] leading-relaxed">
            {isHindi
              ? 'कोई लॉगिन आवश्यक नहीं। आपके द्वारा भरा गया कोई भी ड्राफ्ट, इमेज हैश या विवरण किसी सर्वर पर कभी नहीं भेजा जाता।'
              : 'Zero server uploads. All drafts, hashes, and SOS drafts are processed entirely in your browser memory and vanish on tab close.'}
          </p>
        </div>
      </div>

      {/* Canonical Legal & Non-Affiliation Disclaimer */}
      <div 
        id="canonical-legal-disclaimer" 
        className="p-4 sm:p-5 rounded-2xl bg-[#FAF9F6] border border-[#E8E2DC] text-xs text-[#555] leading-relaxed flex items-start gap-3.5 scroll-mt-36"
      >
        <div className="w-7 h-7 rounded-lg bg-[#E1F5EE] text-[#0F6E56] flex items-center justify-center shrink-0 mt-0.5">
          <Scale className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <span className="font-bold text-[#1A1A1A] block text-xs sm:text-sm">
            {isHindi ? 'वैधानिक गैर-संबद्धता एवं कानूनी अस्वीकरण (Legal Disclaimer):' : 'Legal Disclaimer & Non-Affiliation Notice:'}
          </span>
          <p className="text-[#555] leading-relaxed">
            {LEGAL_DISCLAIMER.full[language]}
          </p>
        </div>
      </div>

      {/* Official Data & Sources Accreditation */}
      <div className="bg-[#FAF9F6] border border-[#E8E2DC] rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 text-xs text-[#666]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#2D2D2D]">
            {isHindi ? 'मान्यता प्राप्त स्रोत एवं हेल्पलाइन:' : 'Verified Official Sources:'}
          </span>
          <span>MHA Cyber Crime (1930) • NCW 24×7 Helpline (Calls: 14490 / WhatsApp: +91 7827170170 — violence, harassment & abuse support) • Tele-MANAS (14416) • StopNCII.org</span>
        </div>
        <span className="text-[11px] text-[#888]">
          {isHindi ? 'भारतीय सूचना प्रौद्योगिकी अधिनियम व BNS (2023) के अनुसार' : 'Aligned with IT Act 2000 & BNS 2023'}
        </span>
      </div>
    </section>
  );
};
