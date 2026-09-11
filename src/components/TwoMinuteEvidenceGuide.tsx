import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Camera, 
  CheckCircle2, 
  AlertTriangle, 
  Smartphone, 
  FileText, 
  Share2, 
  Download,
  Clock,
  ShieldCheck,
  Check
} from 'lucide-react';
import { Language } from '../types';
import { hapticAction, hapticSuccess } from '../utils/haptics';

interface TwoMinuteEvidenceGuideProps {
  language: Language;
}

export const TwoMinuteEvidenceGuide: React.FC<TwoMinuteEvidenceGuideProps> = ({ language }) => {
  const isHindi = language === 'hi';
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  const toggleCheck = (id: string) => {
    hapticAction();
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const screenshots = [
    {
      id: 'shot_1',
      title: isHindi ? 'स्क्रीनशॉट 1: अपराधी की पहचान व नंबर' : 'Screenshot 1: Attacker Phone Number or Bio',
      mustInclude: isHindi 
        ? 'चैट का सबसे ऊपरी हिस्सा जहां उसका पूरा मोबाइल नंबर (+91...) या इंस्टाग्राम हैंडल व प्रोफाइल बायो दिखे।' 
        : 'Top of the chat showing full phone number (+91...) or Instagram profile username and bio.',
      whyItMatters: isHindi 
        ? 'यह साबित करता है कि धमकी इसी नंबर से आई है। पुलिस इसी से टेलीकॉम रिकॉर्ड (CDR) निकालती है।' 
        : 'Proves identity for Section 63 BSA electronic admissibility and telecom provider subpoenas.'
    },
    {
      id: 'shot_2',
      title: isHindi ? 'स्क्रीनशॉट 2: धमकी भरा संदेश व फोन की घड़ी' : 'Screenshot 2: The Threat Message With Phone Clock',
      mustInclude: isHindi 
        ? 'स्क्रीन को क्रॉप न करें! फोन के सबसे ऊपर दिखने वाला समय (घड़ी), बैटरी प्रतिशत और तारीख दिखना जरूरी है।' 
        : 'DO NOT CROP! The top phone bar (clock, battery level, network, and date) MUST be visible.',
      whyItMatters: isHindi 
        ? 'क्रॉप किए गए स्क्रीनशॉट को कोर्ट में खारिज किया जा सकता है। स्टेटस बार समय की पुष्टि करता है।' 
        : 'Cropped images risk tampering challenges in court. The top status bar timestamp verifies timeline integrity.'
    },
    {
      id: 'shot_3',
      title: isHindi ? 'स्क्रीनशॉट 3: पैसे मांगने का UPI ID या QR कोड' : 'Screenshot 3: The Payment Demand / UPI / QR Code',
      mustInclude: isHindi 
        ? 'जिस UPI ID, फोन नंबर, बारकोड या बैंक खाते में उसने पैसे ट्रांसफर करने को कहा है।' 
        : 'The exact UPI ID (e.g. name@okhdfcbank), QR code, or phone number he provided for extortion.',
      whyItMatters: isHindi 
        ? '1930 पर कॉल करते ही पुलिस इसी UPI/अकाउंट को 2 घंटे में फ्रीज करके बैंक से उसका असली आधार कार्ड निकालती है।' 
        : 'National Cyber Helpline (1930) uses this UPI handle to freeze the beneficiary bank account within 2 hours.'
    }
  ];

  return (
    <div 
      id="two-minute-evidence-guide"
      className="p-5 sm:p-8 rounded-3xl bg-white border-2 border-amber-300 shadow-sm space-y-6"
    >
      {/* Header */}
      <div className="space-y-2 border-b border-amber-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-black uppercase tracking-wider">
            {isHindi ? '2-मिनट का जरूरी सबूत' : '2-MINUTE COURT-VALID PROOF GUIDE'}
          </span>
          <span className="text-xs font-bold text-amber-900">
            {isHindi ? 'ब्लॉक करने से पहले यह 3 स्क्रीनशॉट लें' : 'Take these 3 before muting or blocking'}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-black text-[#111827]">
          {isHindi 
            ? 'चैट कभी डिलीट न करें: केवल ये 3 स्क्रीनशॉट आपकी जीत सुनिश्चित करेंगे' 
            : 'Zero-Tech Evidence Checklist: Take These 3 Uncropped Screenshots'}
        </h3>
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
          {isHindi 
            ? 'घबराहट में लड़कियां चैट डिलीट कर देती हैं, जिससे पुलिस के पास अपराधी को पकड़ने का कोई आधार नहीं बचता। सिर्फ 2 मिनट में नीचे दिए गए 3 स्क्रीनशॉट सुरक्षित कर लें।' 
            : 'When adrenaline hits, 85% of girls delete the chat out of fear. That destroys the only electronic trail. Take these 3 uncropped screenshots first.'}
        </p>
      </div>

      {/* 3 Screenshot Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {screenshots.map((s, index) => {
          const isDone = !!checkedItems[s.id];
          return (
            <div 
              key={s.id}
              onClick={() => toggleCheck(s.id)}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 select-none ${
                isDone 
                  ? 'bg-emerald-50/70 border-emerald-500' 
                  : 'bg-[#FAF9F6] border-gray-200 hover:border-amber-400'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${
                    isDone ? 'bg-emerald-600 text-white' : 'bg-amber-100 text-amber-900'
                  }`}>
                    {isDone ? <Check className="w-4 h-4 text-white" /> : index + 1}
                  </div>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                    isDone ? 'bg-emerald-200 text-emerald-900' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {isDone ? (isHindi ? 'सुरक्षित हो गया' : 'Saved') : (isHindi ? 'क्लिक करके टिक करें' : 'Tap to mark done')}
                  </span>
                </div>

                <h4 className="text-sm font-black text-[#111827]">
                  {s.title}
                </h4>

                <div className="text-xs text-gray-800 space-y-1">
                  <p className="font-bold text-amber-950">
                    {isHindi ? 'क्या दिखना चाहिए: ' : 'Must show: '}
                    <span className="font-normal text-gray-700">{s.mustInclude}</span>
                  </p>
                  <p className="text-[11px] text-gray-500 pt-1">
                    {isHindi ? 'क्यों जरूरी: ' : 'Why: '}
                    <span>{s.whyItMatters}</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5-Second WhatsApp Chat Export Guide */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gray-900 text-white space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <h4 className="text-sm font-black text-white">
              {isHindi ? 'व्हाट्सऐप पूरी चैट 5 सेकंड में कैसे डाउनलोड करें?' : 'How to Export Full WhatsApp Chat in 5 Seconds:'}
            </h4>
          </div>
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-700">
            {isHindi ? 'अदालती कानूनी साक्ष्य' : 'Court-Admissible .txt file'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs text-gray-200 pt-1">
          <div className="p-2.5 rounded-xl bg-white/10 space-y-1">
            <span className="font-black text-emerald-400 block">1. चैट खोलें</span>
            <span>अपराधी के साथ चैट खोलें और ऊपर दायें कोने में 3 डॉट्स (⋮) दबाएं।</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/10 space-y-1">
            <span className="font-black text-emerald-400 block">2. 'More' चुनें</span>
            <span>मेनू में सबसे नीचे "More" (अन्य) विकल्प पर क्लिक करें।</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/10 space-y-1">
            <span className="font-black text-emerald-400 block">3. 'Export Chat'</span>
            <span>"Export Chat" पर टैप करें और "Without Media" चुनें।</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/10 space-y-1">
            <span className="font-black text-emerald-400 block">4. खुद को ईमेल करें</span>
            <span>बनी हुई .txt फाइल को अपनी सुरक्षित ईमेल या गूगल ड्राइव पर भेज लें।</span>
          </div>
        </div>
      </div>
    </div>
  );
};
