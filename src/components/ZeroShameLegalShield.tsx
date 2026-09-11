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
  FileText
} from 'lucide-react';
import { Language } from '../types';
import { hapticAction } from '../utils/haptics';

interface ZeroShameLegalShieldProps {
  language: Language;
}

export const ZeroShameLegalShield: React.FC<ZeroShameLegalShieldProps> = ({ language }) => {
  const isHindi = language === 'hi';
  const [openCard, setOpenCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    hapticAction();
    setOpenCard(openCard === index ? null : index);
  };

  const shieldItems = [
    {
      id: 1,
      question: isHindi 
        ? 'क्या साइबर पुलिस मेरे माता-पिता या परिवार को फोन करेगी?' 
        : 'Will the cyber police notify my parents or send letters to my house?',
      shortAnswer: isHindi 
        ? 'बिल्कुल नहीं। 18+ होने पर आप एक स्वतंत्र वयस्क हैं।' 
        : 'ABSOLUTELY NOT. If you are 18+, you have complete legal privacy under Indian law.',
      detail: isHindi 
        ? 'भारतीय संविधान और साइबर अपराध पोर्टल (cybercrime.gov.in) के नियमानुसार, 18 वर्ष से अधिक उम्र की महिला की शिकायत पूर्णतः गोपनीय होती है। पुलिस आपके माता-पिता को कोई पत्र, नोटिस या फोन नहीं करती। आप अपनी निजी ईमेल आईडी और फोन नंबर दर्ज कर सकती हैं।' 
        : 'Under Indian Law, adult citizens possess full legal autonomy. When registering a grievance on cybercrime.gov.in or 1930, you provide your personal phone and email. The police are legally barred from contacting your relatives or mailing notices to your home address.'
    },
    {
      id: 2,
      question: isHindi 
        ? 'क्या अपनी प्राइवेट फोटो खींचने या भेजने के लिए मुझे कोई सजा हो सकती है?' 
        : 'Am I in legal trouble for taking or privately sharing the photo?',
      shortAnswer: isHindi 
        ? 'कतई नहीं। आपने कोई अपराध नहीं किया है।' 
        : 'ABSOLUTELY NOT. You committed ZERO crimes. You are the sole victim here.',
      detail: isHindi 
        ? 'निजता के तहत अपनी व्यक्तिगत तस्वीरें लेना या किसी पर विश्वास करके भेजना कोई गैर-कानूनी काम नहीं है। कानून की नजर में असली अपराधी वह है जो आपको ब्लैकमेल कर रहा है (IT Act धारा 66E, 67A और BNS 308 - 5 साल तक की गैर-जमानती जेल)। आप पीड़िता हैं और कानून आपकी रक्षा करता है।' 
        : 'Consensual intimacy in personal trust is 100% legal. The extortionist, however, is committing multiple non-bailable felonies under Section 67A of the IT Act (punishable by up to 5 years in prison) and Section 308(2) of Bharatiya Nyaya Sanhita (Extortion). You bear zero criminal or moral culpability.'
    },
    {
      id: 3,
      question: isHindi 
        ? 'क्या मुझे थाने में पुरुष पुलिसकर्मियों के सामने जाना पड़ेगा?' 
        : 'Will I have to face male police officers at a crowded station?',
      shortAnswer: isHindi 
        ? 'नहीं। कानूनन आपका बयान केवल महिला अधिकारी ही ले सकती है।' 
        : 'NO. By statute, your statement MUST be recorded by a woman police officer in plain clothes.',
      detail: isHindi 
        ? 'भारतीय नागरिक सुरक्षा संहिता (BNSS धारा 173 / CrPC 154) के तहत महिलाओं के खिलाफ यौन या साइबर अपराध के मामलों में बयान सिर्फ महिला पुलिस अधिकारी द्वारा ही दर्ज किया जाना अनिवार्य है। आप अनुरोध कर सकती हैं कि यह बयान आपके हॉस्टल, घर या किसी सुरक्षित जगह पर सादे कपड़ों (Plain Clothes) में दर्ज किया जाए।' 
        : 'Under Section 173 of Bharatiya Nagarik Suraksha Sanhita (BNSS 2023) and CrPC 154, any statement regarding sexual or digital harassment must be recorded by a woman police officer. You have the statutory right to request it be taken at your residence, hostel, or via video recording in civil clothes.'
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5 text-emerald-700" />
            <span>{isHindi ? 'कानूनी सुरक्षा कवच' : 'ZERO-SHAME LEGAL SHIELD'}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-[#111827]">
            {isHindi 
              ? 'तीन सबसे बड़े डर — और उनका सच्चा कानूनी सच' 
              : 'The 3 Biggest Fears Keeping Girls Silent (And The Legal Truth)'}
          </h3>
        </div>

        <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
          {isHindi ? '100% निजता की गारंटी' : 'Guaranteed By Indian Law'}
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
                onClick={() => toggleCard(idx)}
                className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-3 cursor-pointer"
              >
                <div className="space-y-1">
                  <span className="text-xs font-black text-emerald-700 uppercase tracking-wider block">
                    {isHindi ? `सच #${idx + 1}` : `Legal Fact #${idx + 1}`}
                  </span>
                  <h4 className="text-sm sm:text-base font-black text-[#111827]">
                    {item.question}
                  </h4>
                  <p className="text-xs sm:text-sm font-bold text-emerald-900">
                    {item.shortAnswer}
                  </p>
                </div>

                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 shrink-0 mt-1">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-700 leading-relaxed border-t border-gray-100 bg-[#FAF9F6]"
                  >
                    {item.detail}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Statutory Reassurance Footer */}
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
    </div>
  );
};
