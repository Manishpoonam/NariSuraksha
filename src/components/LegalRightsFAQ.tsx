import React, { useState } from 'react';
import { 
  Scale, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  BookOpen, 
  Lock 
} from 'lucide-react';
import { LEGAL_SECTIONS, LEGAL_FAQS } from '../data/legalGuideData';
import { Language } from '../types';
import { LegalDisclaimerNotice } from './LegalDisclaimerNotice';

interface LegalRightsFAQProps {
  language: Language;
}

export const LegalRightsFAQ: React.FC<LegalRightsFAQProps> = ({ language }) => {
  const isHindi = language === 'hi';
  const [openFaq, setOpenFaq] = useState<string>(LEGAL_FAQS[0]?.id || '');

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? '' : id);
  };

  return (
    <section id="legal-rights-faq" className="space-y-8 scroll-mt-48">
      <div className="border-b border-[#F0EBE6] pb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-full bg-[#F3EFEC] text-[#8B6D5C] flex items-center justify-center">
            <Scale className="w-4 h-4" />
          </span>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#2D2D2D] tracking-tight">
            {isHindi ? 'कानूनी अधिकार, सुरक्षा प्रावधान एवं आवश्यक प्रश्नोत्तर' : 'Legal Rights, Statutory Penalties & Crisis FAQs'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#666] mt-1">
          {isHindi
            ? 'भारतीय न्याय संहिता (BNS), भारतीय नागरिक सुरक्षा संहिता (BNSS) एवं IT Act के तहत महिलाओं को प्राप्त कानूनी सुरक्षा और अधिकार।'
            : 'Plain-language guide to Indian Cyber Laws (IT Act & BNS 2023), mandatory anonymity rights, and answers to common fears.'}
        </p>
      </div>

      {/* 4 Pillars of Victim Legal Protection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E8E2DC] shadow-sm space-y-2.5">
          <div className="w-9 h-9 rounded-full bg-[#F3EFEC] text-[#8B6D5C] flex items-center justify-center font-bold">
            <Lock className="w-4 h-4" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-[#1A1A1A]">
            {isHindi ? 'पहचान सुरक्षा (BNS 73)' : 'Statutory Anonymity (Sec 73)'}
          </h3>
          <p className="text-xs sm:text-sm text-[#444] leading-relaxed">
            {isHindi
              ? 'पीड़िता का नाम या पहचान उजागर करना 2 वर्ष की सजा का अपराध है। कोर्ट और मीडिया में पहचान पूर्णतः गुप्त रहती है।'
              : 'Disclosing the identity or address of a victim is a criminal offense punishable by 2 years imprisonment under Section 73 BNS.'}
          </p>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E8E2DC] shadow-sm space-y-2.5">
          <div className="w-9 h-9 rounded-full bg-[#F3EFEC] text-[#8B6D5C] flex items-center justify-center font-bold">
            <Scale className="w-4 h-4" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-[#1A1A1A]">
            {isHindi ? 'महिला अधिकारी का अधिकार' : 'Right to Female Officer'}
          </h3>
          <p className="text-xs sm:text-sm text-[#444] leading-relaxed">
            {isHindi
              ? 'धारा 173 BNSS के तहत पीड़िता का बयान केवल महिला पुलिस अधिकारी द्वारा ही लिया जा सकता है, आपकी पसंद की जगह पर।'
              : 'Under Section 173 BNSS, statement of a female victim must be recorded exclusively by a woman police officer.'}
          </p>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E8E2DC] shadow-sm space-y-2.5">
          <div className="w-9 h-9 rounded-full bg-[#F3EFEC] text-[#8B6D5C] flex items-center justify-center font-bold">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-[#1A1A1A]">
            {isHindi ? 'जीरो एफआईआर (Zero FIR)' : 'Zero FIR Pan-India'}
          </h3>
          <p className="text-xs sm:text-sm text-[#444] leading-relaxed">
            {isHindi
              ? 'साइबर अपराधों में किसी भी थाने में जीरो एफआईआर दर्ज कराई जा सकती है। कोई भी पुलिस स्टेशन अधिकार क्षेत्र का बहाना नहीं बना सकता।'
              : 'Zero FIR can be lodged at any police station in India without jurisdictional refusal; the case is transferred automatically.'}
          </p>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E8E2DC] shadow-sm space-y-2.5">
          <div className="w-9 h-9 rounded-full bg-[#F3EFEC] text-[#8B6D5C] flex items-center justify-center font-bold">
            <BookOpen className="w-4 h-4" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-[#1A1A1A]">
            {isHindi ? 'मुफ्त सरकारी वकील (NALSA)' : 'Free Legal Aid for All'}
          </h3>
          <p className="text-xs sm:text-sm text-[#444] leading-relaxed">
            {isHindi
              ? 'NALSA अधिनियम की धारा 12 के तहत भारत की प्रत्येक महिला को मुफ्त में सरकारी वकील और कानूनी सहायता प्राप्त करने का अधिकार है।'
              : 'Under Section 12 of Legal Services Authorities Act, every woman in India is entitled to free legal counsel regardless of income.'}
          </p>
        </div>
      </div>

      {/* Critical Reassurance FAQs Accordion */}
      <div className="bg-white rounded-3xl border border-[#E8E2DC] p-5 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-5 h-5 text-[#8B6D5C]" />
          <h3 className="text-base sm:text-xl font-bold text-[#1A1A1A] tracking-tight">
            {isHindi ? 'पीड़िताओं के मन में उठने वाले गंभीर प्रश्न व कानूनी उत्तर' : 'Frequently Asked Questions by Victims in Crisis'}
          </h3>
        </div>

        <div className="space-y-3">
          {LEGAL_FAQS.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="border border-[#E8E2DC] rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-4 sm:p-5 text-left bg-[#FAF9F6] hover:bg-[#F3EFEC] flex items-center justify-between gap-3 font-bold text-xs sm:text-base text-[#1A1A1A] cursor-pointer transition-colors select-none"
                >
                  <span>{faq.question[language]}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#8B6D5C] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#888] shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-6 bg-white border-t border-[#E8E2DC] text-xs sm:text-sm text-[#3A3A3A] space-y-3.5 leading-relaxed">
                    <p>{faq.answer[language]}</p>
                    <div className="p-3.5 bg-[#FAF9F6] border border-[#E8E2DC] rounded-xl text-xs sm:text-sm font-semibold text-[#1A1A1A] flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#8B6D5C] shrink-0 mt-0.5" />
                      <span>{faq.keyTakeaway[language]}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Statutory Penalties Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-xs sm:text-sm font-bold text-[#8B6D5C] uppercase tracking-[0.15em]">
            {isHindi ? 'लागू होने वाली कानूनी धाराएं एवं कठोर सजा' : 'Applicable Penal Provisions & Strict Sentences'}
          </h3>
          <span className="text-xs text-[#E25822] bg-[#FAF9F6] border border-[#E8E2DC] px-3 py-1 rounded-full font-bold">
            {isHindi ? 'गैर-जमानती धाराएं' : 'Non-Bailable Offenses'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {LEGAL_SECTIONS.map((sec, idx) => (
            <div
              key={idx}
              className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E8E2DC] hover:border-[#8B6D5C] shadow-sm space-y-3 flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-[#8B6D5C] mb-1">
                  <span>{sec.code}</span>
                  <span className="bg-[#F3EFEC] text-[#8B6D5C] px-2.5 py-0.5 rounded-full text-xs font-bold">
                    {sec.bailable ? 'Bailable' : 'Non-Bailable'}
                  </span>
                </div>
                <h4 className="font-bold text-[#1A1A1A] text-sm sm:text-base">{sec.section}</h4>
                <p className="text-xs sm:text-sm font-semibold text-[#555] mt-0.5">{sec.title[language]}</p>
                <p className="text-xs sm:text-sm text-[#444] mt-2 leading-relaxed">{sec.plainMeaning[language]}</p>
              </div>

              <div className="pt-3 border-t border-[#E8E2DC]">
                <p className="text-xs sm:text-sm font-bold text-[#E25822]">
                  {isHindi ? 'सजा:' : 'Punishment:'} {sec.punishment[language]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statutory Legal Disclaimer Notice */}
      <LegalDisclaimerNotice language={language} />
    </section>
  );
};

