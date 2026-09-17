import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Scale, 
  UserCheck, 
  Lock, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Heart, 
  AlertTriangle,
  FileText,
  ArrowRight,
  ShieldAlert,
  PhoneCall
} from 'lucide-react';
import { Language } from '../types';
import { hapticAction } from '../utils/haptics';
import { PocsoMinorShieldModal } from './PocsoMinorShieldModal';

interface ZeroShameLegalShieldProps {
  language: Language;
  onNavigateToTab?: (tab: string, elementId?: string) => void;
  onOpenPocsoGuide?: () => void;
}

export const ZeroShameLegalShield: React.FC<ZeroShameLegalShieldProps> = ({ 
  language,
  onNavigateToTab,
  onOpenPocsoGuide
}) => {
  const isHindi = language === 'hi';
  const [openCard, setOpenCard] = useState<number | null>(null);
  const [showInternalPocsoModal, setShowInternalPocsoModal] = useState<boolean>(false);

  const toggleCard = (index: number) => {
    hapticAction();
    setOpenCard(openCard === index ? null : index);
  };

  const handleOpenPocso = () => {
    hapticAction();
    if (onOpenPocsoGuide) {
      onOpenPocsoGuide();
    } else {
      setShowInternalPocsoModal(true);
    }
  };

  const shieldItems = [
    {
      id: 1,
      question: isHindi 
        ? 'क्या साइबर पुलिस मेरे माता-पिता या परिवार को फोन करेगी?' 
        : 'Will the cyber police notify my parents or send letters to my house?',
      shortAnswer: isHindi 
        ? 'नहीं। 18+ होने पर आपको कानूनन पूर्ण निजता का अधिकार प्राप्त है।' 
        : 'No. If you are 18+, you have the legal right to complete privacy under Indian law.',
      detail: isHindi 
        ? 'भारतीय कानून और राष्ट्रीय साइबर अपराध पोर्टल (cybercrime.gov.in) के प्रावधानों के अनुसार, 18 वर्ष से अधिक उम्र के नागरिक को पूर्ण कानूनी निजता प्राप्त है। शिकायत दर्ज करते समय आप अपनी व्यक्तिगत ईमेल और फ़ोन नंबर देते हैं। कानूनन पुलिस को आपके परिवार को अनधिकृत सूचना देने या घर पर पत्र भेजने का अधिकार नहीं है।' 
        : 'Under Indian law, adult citizens possess full legal autonomy. When registering a grievance on cybercrime.gov.in or dialing 1930, you provide your personal phone and email. By law, police are not permitted to contact your relatives or mail unsolicited notices regarding intimate grievances to your home address.',
      hasMinorCrossLink: true
    },
    {
      id: 2,
      question: isHindi 
        ? 'क्या अपनी प्राइवेट फोटो खींचने या भेजने के लिए मुझे कोई सजा हो सकती है?' 
        : 'Am I in legal trouble for taking or privately sharing the photo?',
      shortAnswer: isHindi 
        ? 'नहीं। आपने कोई अपराध नहीं किया है। कानूनन आप पीड़िता के रूप में सुरक्षित हैं।' 
        : 'No. You have committed no crime. By law, you are protected as the victim.',
      detail: isHindi 
        ? 'सहमति और विश्वास के तहत ली गई या साझा की गई निजी तस्वीरें आपके निजता के अधिकार का हिस्सा हैं। कानून की नज़र में असली अपराधी वह है जो आपको ब्लैकमेल कर रहा है (IT Act धारा 66E, 67A और BNS 308 - गैर-जमानती अपराध)। कानूनन आप पर कोई आपराधिक या नैतिक दायित्व नहीं बनता।' 
        : 'Consensual intimacy in personal trust is protected under your constitutional right to privacy. The extortionist, however, is committing serious non-bailable offenses under Section 67A of the IT Act and Section 308(2) of Bharatiya Nyaya Sanhita (Extortion). By law, you bear no criminal liability for being extorted.',
      hasMinorCrossLink: false
    },
    {
      id: 3,
      question: isHindi 
        ? 'क्या मुझे थाने में पुरुष पुलिसकर्मियों के सामने जाना पड़ेगा?' 
        : 'Will I have to face male police officers at a crowded station?',
      shortAnswer: isHindi 
        ? 'नहीं। कानूनन आपको यह अधिकार प्राप्त है कि आपका बयान सादे कपड़ों में महिला पुलिस अधिकारी द्वारा ही दर्ज किया जाए।' 
        : 'No. You have the statutory right to have your statement recorded by a woman police officer in plain clothes.',
      detail: isHindi 
        ? 'भारतीय नागरिक सुरक्षा संहिता (BNSS धारा 173, पूर्ववर्ती CrPC 154) के तहत महिलाओं के खिलाफ डिजिटल या यौन उत्पीड़न के मामलों में बयान महिला पुलिस अधिकारी द्वारा ही दर्ज किए जाने का कानूनी अधिकार है। आप अनुरोध कर सकती हैं कि यह बयान आपके आवास, हॉस्टल या सुरक्षित स्थान पर सादे कपड़ों में दर्ज किया जाए।' 
        : 'Under Section 173 of Bharatiya Nagarik Suraksha Sanhita (BNSS 2023, superseding CrPC 154), any statement regarding digital or sexual harassment must be recorded by a woman police officer. You have the statutory right to request it be taken at your residence, hostel, or in plain clothes.',
      escalationNote: isHindi
        ? 'यदि इस अधिकार का सम्मान नहीं किया जाता है, तो यह एक प्रक्रियात्मक उल्लंघन है जिसकी शिकायत आप दर्ज करा सकती हैं — राष्ट्रीय महिला आयोग (NCW: 7827170170) या राज्य साइबर सेल नोडल अधिकारी को तत्काल सूचित करें।'
        : 'If this right isn\'t honored, that\'s a violation you can report — escalate immediately via the National Commission for Women (NCW Helpline: 7827170170) or your State Cyber Cell nodal officer.',
      hasMinorCrossLink: false
    }
  ];

  return (
    <div 
      id="zero-shame-shield"
      className="p-5 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-[#FAF9F6] to-emerald-50/40 border-2 border-emerald-600/30 shadow-sm space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-100 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5 text-emerald-700" />
            <span>{isHindi ? 'कानूनी सुरक्षा कवच' : 'Zero-Shame Legal Shield'}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#111827]">
            {isHindi 
              ? 'तीन सबसे बड़े डर — और उनका सच्चा कानूनी सच' 
              : 'The 3 Biggest Fears Keeping Girls Silent (And The Legal Truth)'}
          </h3>
        </div>

        <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
          {isHindi ? 'भारतीय कानून द्वारा संरक्षित' : 'Backed by Indian Law'}
        </span>
      </div>

      {/* 3 FAQ Accordion Cards */}
      <div className="space-y-3">
        {shieldItems.map((item, idx) => {
          const isOpen = openCard === idx;
          return (
            <div 
              key={item.id}
              className="rounded-2xl border-2 border-gray-200 bg-white overflow-hidden transition-all shadow-2xs hover:border-emerald-300"
            >
              <button
                type="button"
                onClick={() => toggleCard(idx)}
                className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-3 cursor-pointer"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                    {isHindi ? `सच #${idx + 1}` : `Legal Fact #${idx + 1}`}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-[#111827]">
                    {item.question}
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-emerald-900">
                    {item.shortAnswer}
                  </p>
                </div>

                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 shrink-0 mt-1">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Item 3: Inline Minor/POCSO Cross-link directly visible on Fact #1 */}
              {item.hasMinorCrossLink && (
                <div className="px-4 sm:px-5 pb-3 -mt-1 flex items-center gap-1.5 text-xs text-[#26215C] flex-wrap">
                  <span className="text-[#555]">
                    {isHindi ? '18 वर्ष से कम? अलग कानूनी सुरक्षा लागू होती है —' : 'Under 18? Different protections apply —'}
                  </span>
                  <button
                    type="button"
                    onClick={handleOpenPocso}
                    className="inline-flex items-center gap-1 font-bold text-[#993556] hover:underline cursor-pointer bg-[#FBEAF0] px-2 py-0.5 rounded-md border border-[#F4D3E0]"
                  >
                    <ShieldAlert className="w-3 h-3 text-[#993556]" />
                    <span>{isHindi ? 'नाबालिग / POCSO गाइड देखें' : 'Minor / POCSO Guide'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-700 leading-relaxed border-t border-gray-100 bg-[#FAF9F6] space-y-3"
                  >
                    <p>{item.detail}</p>

                    {/* Item 1 Escalation Note for Fact #3 */}
                    {item.escalationNote && (
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                          <p className="text-xs leading-normal">
                            {item.escalationNote}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                          <a
                            href="tel:7827170170"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-amber-300 text-amber-950 text-xs font-bold hover:bg-amber-100 transition-colors"
                          >
                            <PhoneCall className="w-3 h-3 text-[#0F6E56]" />
                            <span>NCW 7827170170</span>
                          </a>
                          {onNavigateToTab && (
                            <button
                              type="button"
                              onClick={() => onNavigateToTab('state_cells')}
                              className="text-xs font-bold text-[#0F6E56] hover:underline cursor-pointer"
                            >
                              {isHindi ? 'साइबर सेल नोडल अधिकारी →' : 'State Nodal Cells →'}
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Statutory Reassurance Footer (Takeaway box kept intact) */}
      <div className="p-4 rounded-2xl bg-emerald-900 text-white flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center shrink-0 text-emerald-300">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
          <strong className="text-white font-bold">
            {isHindi ? 'याद रखें: ' : 'Takeaway for victims: '}
          </strong>
          {isHindi 
            ? 'अपराधी को केवल आपकी शर्म और डर से ताकत मिलती है। जैसे ही आप कानून का सहारा लेती हैं, वह जेल जाने के डर से भाग खड़ा होता है।' 
            : 'Blackmailers rely entirely on your shame to stay safe. The moment legal force is applied, they realize they are risking a non-bailable criminal record and vanish.'}
        </p>
      </div>

      {/* POCSO Modal rendered if opened internally */}
      <PocsoMinorShieldModal
        isOpen={showInternalPocsoModal}
        onClose={() => setShowInternalPocsoModal(false)}
        language={language}
        onSelectTakeItDown={() => {
          setShowInternalPocsoModal(false);
          if (onNavigateToTab) {
            onNavigateToTab('takedown', 'stopncii');
          }
        }}
      />
    </div>
  );
};
