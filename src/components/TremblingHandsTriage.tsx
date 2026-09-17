import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ShieldCheck, 
  PhoneCall, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles,
  Lock,
  RefreshCw,
  Send,
  Camera,
  Ban,
  Scale
} from 'lucide-react';
import { Language } from '../types';
import { hapticAction, hapticPanic, hapticSuccess, hapticSOS } from '../utils/haptics';

interface TremblingHandsTriageProps {
  language: Language;
  onNavigateToTab: (tab: string, elementId?: string) => void;
  onOpenSOS: () => void;
}

export const TremblingHandsTriage: React.FC<TremblingHandsTriageProps> = ({
  language,
  onNavigateToTab,
  onOpenSOS
}) => {
  const isHindi = language === 'hi';

  // Step state (1: Paid money?, 2: Threat channel?, 3: Age group?)
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [hasPaid, setHasPaid] = useState<boolean | null>(null);
  const [leakVector, setLeakVector] = useState<'instagram_meta' | 'whatsapp_telegram' | 'family_friends' | null>(null);
  const [ageGroup, setAgeGroup] = useState<'adult' | 'minor' | null>(null);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);

  const resetTriage = () => {
    hapticAction();
    setStep(1);
    setHasPaid(null);
    setLeakVector(null);
    setAgeGroup(null);
  };

  const handleSelectPaid = (paid: boolean) => {
    paid ? hapticPanic() : hapticAction();
    setHasPaid(paid);
    setStep(2);
  };

  const handleSelectVector = (vector: 'instagram_meta' | 'whatsapp_telegram' | 'family_friends') => {
    hapticAction();
    setLeakVector(vector);
    setStep(3);
  };

  const handleSelectAge = (age: 'adult' | 'minor') => {
    hapticAction();
    setAgeGroup(age);
    setStep(4);
  };

  const telegramMailto = `mailto:stopca@telegram.org?subject=${encodeURIComponent("Urgent: Non-Consensual Explicit Media Extortion on Telegram")}&body=${encodeURIComponent(
    "Dear Telegram Trust & Safety Team,\n\nI am a victim of cyber extortion and non-consensual sharing of intimate images on Telegram.\n\nPerpetrator Username/Channel Link:\nThreat Message Details:\nDate & Time:\n\nUnder Indian Law (IT Act Section 67A) and Telegram Terms of Service, distributing non-consensual explicit images is strictly prohibited. Please immediately ban this account and delete the associated media.\n\nThank you."
  )}`;

  return (
    <div 
      id="trembling-hands-triage"
      className="p-5 sm:p-8 rounded-3xl bg-white border-2 border-[#2D2D2D]/15 shadow-md space-y-6"
    >
      {/* Header with Progress Steps */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0EBE6] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#8B6D5C]/15 text-[#8B6D5C] text-xs font-black uppercase tracking-wider">
              {isHindi ? 'त्वरित 3-सवाल गाइड' : '3-STEP RAPID CRISIS TRIAGE'}
            </span>
            <span className="text-xs text-gray-500 font-bold">
              {step <= 3 ? (isHindi ? `कदम ${step} / 3` : `Question ${step} of 3`) : (isHindi ? 'आपका तैयार प्लान' : 'Your Customized Plan')}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-[#111827] mt-1">
            {step === 1 && (isHindi ? 'सवाल 1: क्या आपने अब तक कोई पैसे दिए हैं?' : 'Question 1: Have you sent any money to the blackmailer yet?')}
            {step === 2 && (isHindi ? 'सवाल 2: वह फोटो कहां भेजने की धमकी दे रहा है?' : 'Question 2: Where is he threatening to circulate the media?')}
            {step === 3 && (isHindi ? 'सवाल 3: आपकी उम्र क्या है?' : 'Question 3: What is your age?')}
            {step === 4 && (isHindi ? 'आपके लिए 3 सबसे जरूरी कदम (तुरंत करें):' : 'Your Immediate 3-Step Survival Plan:')}
          </h3>
        </div>

        {step > 1 && (
          <button
            onClick={resetTriage}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B6D5C] hover:text-[#775c4c] underline cursor-pointer self-start sm:self-auto py-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{isHindi ? 'शुरू से दोबारा चुनें' : 'Reset answers'}</span>
          </button>
        )}
      </div>

      {/* QUESTION 1: MONEY SENT? */}
      {step === 1 && (
        <div className="space-y-4">
          <p className="text-sm text-gray-700 font-medium">
            {isHindi 
              ? 'बिना डरे सच चुनें। हम तुरंत बताएंगे कि आपके पैसों या स्थिति को कैसे सुरक्षित करना है।' 
              : 'Be completely honest. This determines your immediate banking and legal defense.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* NO */}
            <button
              id="triage-not-paid-button"
              onClick={() => handleSelectPaid(false)}
              className="p-5 sm:p-6 rounded-2xl border-2 border-emerald-500 bg-emerald-50/50 hover:bg-emerald-100/60 text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 active:scale-98 shadow-sm group min-h-[90px]"
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-200/80 px-2.5 py-0.5 rounded-full">
                  {isHindi ? 'सुरक्षित विकल्प' : 'Best Position'}
                </span>
                <ArrowRight className="w-5 h-5 text-emerald-700 group-hover:translate-x-1 transition-transform" />
              </div>
              <div>
                <span className="text-lg sm:text-xl font-black text-emerald-950 block">
                  {isHindi ? 'नहीं — मैंने 1 रुपया भी नहीं दिया' : 'NO — I haven’t paid anything'}
                </span>
                <span className="text-xs text-emerald-800 font-medium mt-1 block">
                  {isHindi ? 'आपकी पूरी ताकत आपके हाथ में है।' : 'You hold 100% of the leverage right now.'}
                </span>
              </div>
            </button>

            {/* YES */}
            <button
              id="triage-paid-button"
              onClick={() => handleSelectPaid(true)}
              className="p-5 sm:p-6 rounded-2xl border-2 border-rose-400 bg-rose-50/50 hover:bg-rose-100/60 text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 active:scale-98 shadow-sm group min-h-[90px]"
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-black uppercase tracking-wider text-rose-800 bg-rose-200/80 px-2.5 py-0.5 rounded-full">
                  {isHindi ? 'तुरंत रोकें' : 'Stop Immediately'}
                </span>
                <ArrowRight className="w-5 h-5 text-rose-700 group-hover:translate-x-1 transition-transform" />
              </div>
              <div>
                <span className="text-lg sm:text-xl font-black text-rose-950 block">
                  {isHindi ? 'हां — मैं पैसे दे चुकी हूं' : 'YES — I already sent some money'}
                </span>
                <span className="text-xs text-rose-800 font-medium mt-1 block">
                  {isHindi ? 'घबराएं नहीं। अभी बैंक खाता फ्रीज कराने का उपाय है।' : 'Do not panic. We will freeze his account before he withdraws it.'}
                </span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* QUESTION 2: WHERE IS THE THREAT? */}
      {step === 2 && (
        <div className="space-y-4">
          <p className="text-sm text-gray-700 font-medium">
            {isHindi 
              ? 'अपराधी ने आपको डराने के लिए किस प्लेटफॉर्म या समूह का नाम लिया है?' 
              : 'Which vector did the perpetrator threaten in his messages?'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {/* Instagram / Facebook */}
            <button
              onClick={() => handleSelectVector('instagram_meta')}
              className="p-5 rounded-2xl border-2 border-gray-300 hover:border-[#8B6D5C] bg-gray-50 hover:bg-[#FAF9F6] text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 active:scale-98 shadow-sm group min-h-[100px]"
            >
              <span className="text-xs font-black uppercase tracking-wider text-[#0F6E56] bg-[#E1F5EE] px-2 py-0.5 rounded-full self-start">
                Instagram / Meta
              </span>
              <div>
                <span className="text-base sm:text-lg font-bold text-[#111827] block">
                  {isHindi ? 'इंस्टाग्राम / फेसबुक फॉलोअर्स' : 'Instagram / Facebook Followers'}
                </span>
                <span className="text-xs text-gray-600 mt-0.5 block">
                  {isHindi ? 'StopNCII हैश से पहले ही रोकें' : 'Block uploads via StopNCII hash'}
                </span>
              </div>
            </button>

            {/* WhatsApp / Telegram */}
            <button
              onClick={() => handleSelectVector('whatsapp_telegram')}
              className="p-5 rounded-2xl border-2 border-gray-300 hover:border-[#8B6D5C] bg-gray-50 hover:bg-[#FAF9F6] text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 active:scale-98 shadow-sm group min-h-[100px]"
            >
              <span className="text-xs font-black uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full self-start">
                Telegram / WhatsApp
              </span>
              <div>
                <span className="text-base sm:text-lg font-bold text-[#111827] block">
                  {isHindi ? 'टेलीग्राम / व्हाट्सऐप ग्रुप' : 'Telegram Groups / WhatsApp'}
                </span>
                <span className="text-xs text-gray-600 mt-0.5 block">
                  {isHindi ? 'चैनल बैन व 1-क्लिक ईमेल' : 'Channel ban & direct legal takedown'}
                </span>
              </div>
            </button>

            {/* Parents / Friends */}
            <button
              onClick={() => handleSelectVector('family_friends')}
              className="p-5 rounded-2xl border-2 border-gray-300 hover:border-[#8B6D5C] bg-gray-50 hover:bg-[#FAF9F6] text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 active:scale-98 shadow-sm group min-h-[100px]"
            >
              <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full self-start">
                {isHindi ? 'परिवार / कॉलेज' : 'Family / College'}
              </span>
              <div>
                <span className="text-base sm:text-lg font-bold text-[#111827] block">
                  {isHindi ? 'माता-पिता या कॉलेज दोस्त' : 'Parents or College Contacts'}
                </span>
                <span className="text-xs text-gray-600 mt-0.5 block">
                  {isHindi ? '92% मामलों में यह सिर्फ झांसा होता है' : 'Bluff counter-plan & shield'}
                </span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* QUESTION 3: AGE GROUP? */}
      {step === 3 && (
        <div className="space-y-4">
          <p className="text-sm text-gray-700 font-medium">
            {isHindi 
              ? 'नाबालिगों (18 से कम) के लिए भारत में सख्त कानून (POCSO) और अलग डिजिटल टूल (Take It Down) उपलब्ध हैं।' 
              : 'Minors (under 18) are protected by mandatory POCSO laws and specialized NCMEC Take It Down tools.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Adult */}
            <button
              onClick={() => handleSelectAge('adult')}
              className="p-5 sm:p-6 rounded-2xl border-2 border-gray-300 hover:border-[#8B6D5C] bg-gray-50 hover:bg-[#FAF9F6] text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 active:scale-98 shadow-sm group min-h-[90px]"
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-black uppercase tracking-wider text-[#8B6D5C] bg-[#8B6D5C]/15 px-2.5 py-0.5 rounded-full">
                  {isHindi ? '18 वर्ष या अधिक' : '18 Years or Older'}
                </span>
                <ArrowRight className="w-5 h-5 text-[#8B6D5C] group-hover:translate-x-1 transition-transform" />
              </div>
              <div>
                <span className="text-lg font-bold text-[#111827] block">
                  {isHindi ? 'मैं बालिग (18+) हूं' : 'I am an Adult (18+)'}
                </span>
                <span className="text-xs text-gray-600 block mt-0.5">
                  {isHindi ? 'StopNCII.org हैश और 1930 साइबर कंप्लेंट' : 'StopNCII hash protection & adult legal privacy'}
                </span>
              </div>
            </button>

            {/* Minor */}
            <button
              onClick={() => handleSelectAge('minor')}
              className="p-5 sm:p-6 rounded-2xl border-2 border-[#26215C]/30 hover:border-[#26215C] bg-[#FAF8F3] hover:bg-[#F3EFEA] text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 active:scale-98 shadow-xs group min-h-[90px]"
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-bold tracking-wider text-[#26215C] bg-[#E8E6F3] px-2.5 py-0.5 rounded-full">
                  {isHindi ? '18 से कम (स्कूल / कॉलेज)' : 'Under 18 (Minor)'}
                </span>
                <ArrowRight className="w-5 h-5 text-[#26215C] group-hover:translate-x-1 transition-transform" />
              </div>
              <div>
                <span className="text-lg font-bold text-[#1A1A1A] block">
                  {isHindi ? 'मेरी उम्र 18 वर्ष से कम है' : 'I am Under 18'}
                </span>
                <span className="text-xs text-[#666] block mt-0.5">
                  {isHindi ? 'Take It Down हैश और POCSO धारा 13/15 सुरक्षा' : 'Take It Down NCMEC & strict POCSO legal protection'}
                </span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: CUSTOMIZED EMERGENCY ACTION PLAN */}
      {step === 4 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Status summary pill */}
          <div className="p-4 rounded-2xl bg-[#111827] text-white flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-bold">
                {isHindi ? 'आपकी चुनी हुई स्थिति:' : 'Diagnosed Profile:'}
              </span>
              <span className="text-gray-300">
                {hasPaid ? (isHindi ? '• पैसे भेजे जा चुके हैं' : '• Money paid') : (isHindi ? '• पैसे नहीं भेजे' : '• Zero money paid')}
                {' '}|{' '}
                {leakVector === 'instagram_meta' ? 'Instagram/Meta' : leakVector === 'whatsapp_telegram' ? 'Telegram/WhatsApp' : 'Family/Contacts'}
                {' '}|{' '}
                {ageGroup === 'adult' ? '18+' : 'Under 18'}
              </span>
            </div>
          </div>

          {/* Action 1: Money Strategy */}
          <div className={`p-5 rounded-2xl border-2 space-y-2.5 ${hasPaid ? 'bg-rose-50 border-rose-300' : 'bg-emerald-50 border-emerald-300'}`}>
            <div className="flex items-center gap-2">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white ${hasPaid ? 'bg-rose-600' : 'bg-emerald-700'}`}>
                1
              </span>
              <h4 className={`text-base font-black ${hasPaid ? 'text-rose-950' : 'text-emerald-950'}`}>
                {hasPaid 
                  ? (isHindi ? 'कदम 1: तुरंत 1930 डायल करें (गोल्डन 2 घंटे)' : 'Step 1: Call 1930 Immediately (Golden 2-Hour Window)')
                  : (isHindi ? 'कदम 1: एक रुपया भी न दें — बिल्कुल ब्लॉक न करें' : 'Step 1: Withhold All Payment — Do Not Block Yet')}
              </h4>
            </div>
            
            <p className={`text-xs sm:text-sm leading-relaxed ${hasPaid ? 'text-rose-900' : 'text-emerald-900'}`}>
              {hasPaid 
                ? (isHindi 
                    ? 'अगर आपने UPI (GPay, PhonePe, Paytm) से पैसे भेजे हैं, तो तुरंत 1930 पर कॉल करें और ट्रांजेक्शन UTR नंबर बताएं। भारत सरकार की CFCFRMS प्रणाली 2 घंटे के भीतर अपराधी का बैंक खाता फ्रीज कर देती है।'
                    : 'If you transferred via UPI or bank, dial 1930 right now. Provide the UTR / Transaction reference. The Indian Cyber Coordination Centre (I4C) can freeze the beneficiary bank account before the extortionist withdraws the cash at an ATM.')
                : (isHindi 
                    ? 'अपराधी को पैसे न मिलने पर भी वह समझता है कि आप डर रही हैं। पैसे देने से वह कभी नहीं रुकेगा। पहले चैट के स्क्रीनशॉट लें, फिर उसे ठंडा कानूनी जवाब दें।'
                    : 'Do not pay. Once you pay, extortionists mark you as a compliant victim. Keep your phone notifications muted and take uncropped screenshots first.')}
            </p>

            {hasPaid && (
              <a
                href="tel:1930"
                onClick={() => hapticPanic()}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full font-black text-xs transition-transform active:scale-95 shadow-md cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{isHindi ? 'अभी 1930 डायल करें' : 'Call 1930 Now (Free 24/7)'}</span>
              </a>
            )}
          </div>

          {/* Action 2: Digital Takedown Tool */}
          <div className="p-5 rounded-2xl border border-[#26215C]/20 bg-[#FAF8F3] space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#26215C] flex items-center justify-center text-xs font-bold text-white">
                2
              </span>
              <h4 className="text-base font-bold text-[#1A1A1A]">
                {isHindi ? 'कदम 2: फोटो का अपलोड स्वतः ब्लॉक करें' : 'Step 2: Proactively Block Uploads Online'}
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-[#333] leading-relaxed">
              {ageGroup === 'minor'
                ? (isHindi 
                    ? 'आप 18 से कम हैं, इसलिए Take It Down (NCMEC) टूल का उपयोग करें। यह आपकी फोटो का डिजिटल फिंगरप्रिंट (हैश) बनाता है। आपकी फोटो आपके फोन से कभी बाहर नहीं जाती।'
                    : 'Since you are under 18, use Take It Down (NCMEC). It generates cryptographic hashes on your device without uploading your actual photos, blocking them on Instagram, Facebook, TikTok, and porn sites.')
                : (isHindi 
                    ? 'StopNCII.org पर केस बनाएं। यह फोटो का एक सुरक्षित डिजिटल हैश कोड बनाता है और मेटा (इंस्टाग्राम/फेसबुक), ओनलीफैन्स व अन्य प्लेटफॉर्म्स पर शेयरिंग ब्लॉक कर देता है।'
                    : 'Create a case on StopNCII.org. Your photos never leave your device. It creates a digital hash that tells platforms to automatically block and delete the photo if anyone attempts to upload it.')}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              {ageGroup === 'minor' ? (
                <a
                  href="https://takeitdown.ncmec.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => hapticAction()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#26215C] hover:bg-[#1A1540] text-white rounded-full font-bold text-xs transition-transform active:scale-95 shadow-xs cursor-pointer"
                >
                  <span>{isHindi ? 'Take It Down पोर्टल खोलें' : 'Open TakeItDown.org'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <a
                  href="https://stopncii.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => hapticAction()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#26215C] hover:bg-[#1A1540] text-white rounded-full font-bold text-xs transition-transform active:scale-95 shadow-xs cursor-pointer"
                >
                  <span>{isHindi ? 'StopNCII.org पोर्टल खोलें' : 'Open StopNCII.org'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {leakVector === 'whatsapp_telegram' && (
                <a
                  href={telegramMailto}
                  onClick={() => hapticAction()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-black text-xs transition-transform active:scale-95 shadow-md cursor-pointer"
                >
                  <span>{isHindi ? 'टेलीग्राम लीगल ईमेल ड्राफ्ट करें' : 'Email Telegram (stopca@telegram.org)'}</span>
                  <Send className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Action 3: Legal Complaint */}
          <div className="p-5 rounded-2xl border-2 border-gray-300 bg-gray-50 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center text-xs font-black text-white">
                3
              </span>
              <h4 className="text-base font-black text-gray-950">
                {isHindi ? 'कदम 3: 1-क्लिक में पुलिस शिकायत तैयार करें' : 'Step 3: Generate Ready Police e-FIR Draft'}
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              {isHindi
                ? 'हमारे e-FIR जनरेटर से 2 मिनट में आधिकारिक शिकायत ड्राफ्ट बनाएं और cybercrime.gov.in पर अपलोड करें। आपके माता-पिता को कोई फोन या नोटिस नहीं जाता।'
                : 'Use our zero-effort e-FIR generator to generate a court-admissible complaint PDF under Section 67A IT Act. Upload it anonymously to cybercrime.gov.in.'}
            </p>

            <button
              onClick={() => {
                hapticAction();
                onNavigateToTab('report');
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111827] hover:bg-black text-white rounded-full font-black text-xs transition-transform active:scale-95 shadow-md cursor-pointer"
            >
              <span>{isHindi ? 'e-FIR ड्राफ्ट जनरेटर खोलें' : 'Open e-FIR Draft Generator'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
