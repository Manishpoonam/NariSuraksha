import React from 'react';
import { Scale, Info, ExternalLink } from 'lucide-react';
import { Language } from '../types';
import { LEGAL_DISCLAIMER } from '../data/legalDisclaimer';

interface LegalDisclaimerNoticeProps {
  language: Language;
  compact?: boolean;
}

export const LegalDisclaimerNotice: React.FC<LegalDisclaimerNoticeProps> = ({ 
  language, 
  compact = false 
}) => {
  const isHindi = language === 'hi';

  const handleScrollToCanonical = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(LEGAL_DISCLAIMER.anchorId);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (compact) {
    return (
      <aside 
        aria-label={isHindi ? 'कानूनी अस्वीकरण व परामर्श सूचना' : 'Legal disclaimer and counsel notice'}
        className="p-3 rounded-xl bg-[#FAF8F3] border border-[#26215C]/12 text-[11px] text-[#5A5672] leading-relaxed flex items-start gap-2.5"
      >
        <Scale className="w-4 h-4 text-[#26215C] shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <span className="font-semibold text-[#26215C]">
            {isHindi ? 'कानूनी सूचना व परामर्श:' : 'Legal & Procedural Notice:'}
          </span>{' '}
          <span>{LEGAL_DISCLAIMER.short[language]} — </span>
          <a
            href={`#${LEGAL_DISCLAIMER.anchorId}`}
            onClick={handleScrollToCanonical}
            className="text-[#26215C] font-semibold hover:underline underline-offset-2"
          >
            {LEGAL_DISCLAIMER.linkText[language]}
          </a>
          <span>. </span>
          {isHindi
            ? 'यह प्लेटफॉर्म तथ्यात्मक साक्ष्य संकलन व शिकायत का प्रारूप तैयार करने में सहायता करता है। यह औपचारिक कानूनी सलाह या अधिवक्ता प्रतिनिधित्व नहीं है। न्यायालयीन प्रक्रिया हेतु राज्य विधिक सेवा प्राधिकरण (NALSA 15100) या पंजीकृत अधिवक्ता की सलाह लें।'
            : 'This platform provides factual evidence structuring and complaint drafting assistance to facilitate reporting to official authorities (1930 / cybercrime.gov.in). It does not provide attorney-client representation or formal legal advice. For formal proceedings, consult a licensed advocate or access free legal aid via NALSA (Dial 15100).'}
        </div>
      </aside>
    );
  }

  return (
    <aside 
      aria-label={isHindi ? 'महत्वपूर्ण कानूनी अस्वीकरण' : 'Important legal and procedural disclaimer'}
      className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F3] border border-[#26215C]/15 text-xs text-[#5A5672] space-y-2.5"
    >
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-[#26215C] text-white flex items-center justify-center shrink-0">
          <Scale className="w-3.5 h-3.5" aria-hidden="true" />
        </div>
        <h4 className="font-bold text-[#26215C] text-xs sm:text-sm uppercase tracking-wide">
          {isHindi ? 'महत्वपूर्ण कानूनी सूचना एवं अस्वीकरण (Legal Notice & Disclaimer)' : 'Important Legal Notice & Advisory Disclaimer'}
        </h4>
      </div>

      <p className="leading-relaxed">
        <span>{LEGAL_DISCLAIMER.short[language]} — </span>
        <a
          href={`#${LEGAL_DISCLAIMER.anchorId}`}
          onClick={handleScrollToCanonical}
          className="text-[#26215C] font-semibold hover:underline underline-offset-2"
        >
          {LEGAL_DISCLAIMER.linkText[language]}
        </a>
        <span>. </span>
        {isHindi
          ? 'यहाँ उत्पन्न शिकायत पत्रक (Draft Complaint) उपयोगकर्ता द्वारा दी गई जानकारी पर आधारित एक प्रारूप है, जिसे आधिकारिक राष्ट्रीय साइबर अपराध पोर्टल (cybercrime.gov.in / 1930) या स्थानीय थाने में जमा करने में सहायता हेतु तैयार किया गया है। यह कोई न्यायिक प्रमाण-पत्र या वकील का औपचारिक कानूनी परामर्श नहीं है।'
          : 'Generated complaint drafts are user-guided templates structured to facilitate formal reporting to the National Cyber Crime Reporting Portal (cybercrime.gov.in / 1930) and local Cyber Crime Police Stations. This service does not constitute legal representation, attorney-client relationship, or certified legal advice.'}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#26215C]/10 text-[11px]">
        <span className="flex items-center gap-1.5 text-[#26215C] font-medium">
          <Info className="w-3.5 h-3.5 text-[#0F6E56]" aria-hidden="true" />
          {isHindi
            ? 'विधिक सेवा प्राधिकरण अधिनियम की धारा 12 के तहत भारत में प्रत्येक महिला को 100% मुफ्त सरकारी कानूनी सहायता पाने का अधिकार है।'
            : 'Under Section 12 of the Legal Services Authorities Act, 1987, every woman in India is entitled to free legal aid.'}
        </span>
        <a
          href="tel:15100"
          className="inline-flex items-center gap-1 text-[#26215C] hover:underline font-bold"
        >
          <span>NALSA Helpline: 15100</span>
          <ExternalLink className="w-3 h-3" aria-hidden="true" />
        </a>
      </div>
    </aside>
  );
};
