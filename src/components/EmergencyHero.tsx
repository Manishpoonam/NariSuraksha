import React from 'react';
import { motion } from 'motion/react';
import { 
  AlertTriangle, 
  PhoneCall, 
  EyeOff, 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Sparkles,
  Camera,
  Ban,
  Scale,
  Shield,
  Heart
} from 'lucide-react';
import { Language } from '../types';
import { hapticCamouflage, hapticSOS, hapticAction, hapticPanic } from '../utils/haptics';

interface EmergencyHeroProps {
  language: Language;
  onTriggerSOS: () => void;
  onTriggerCamouflage: () => void;
  onNavigateToTab: (tab: string, elementId?: string) => void;
  onSelectSituation?: (situationId: string) => void;
}

export const EmergencyHero: React.FC<EmergencyHeroProps> = ({
  language,
  onTriggerSOS,
  onTriggerCamouflage,
  onNavigateToTab,
  onSelectSituation,
}) => {
  const isHindi = language === 'hi';

  const goldenRules = [
    {
      step: '01',
      icon: Ban,
      title: isHindi ? 'पैसे कभी न दें' : 'Never Pay Money',
      subtitle: isHindi ? 'मांग मानने से ब्लैकमेल बढ़ता है' : 'Paying only fuels more demands',
      desc: isHindi
        ? 'अपराधी पैसे मिलने के बाद भी फोटो कभी डिलीट नहीं करते। एक रुपया भी न दें।'
        : 'Extortionists do not delete photos after payment. Paying marks you as a recurring target.',
      badge: isHindi ? 'नियम 1' : 'Rule 1',
      color: 'bg-rose-50 text-rose-700 border-rose-200'
    },
    {
      step: '02',
      icon: Camera,
      title: isHindi ? 'सबूत सुरक्षित करें' : 'Save Evidence First',
      subtitle: isHindi ? 'स्क्रीनशॉट लें, चैट न हटाएं' : 'Take 3 uncropped screenshots',
      desc: isHindi
        ? 'ब्लॉक करने से पहले तारीख, समय, फोन नंबर और प्रोफाइल का पूरा स्क्रीनशॉट लें।'
        : 'Before blocking, take full screenshots showing date, time, username, phone, or UPI ID.',
      badge: isHindi ? 'नियम 2' : 'Rule 2',
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      step: '03',
      icon: Scale,
      title: isHindi ? 'कानून आपके साथ है' : 'Protected by Law',
      subtitle: isHindi ? '24 घंटे में रिमूवल अनिवार्य' : '24-hour mandatory removal',
      desc: isHindi
        ? 'आईटी नियम 2021 के तहत सभी प्लेटफॉर्म्स को 24 घंटे में प्राइवेट मीडिया हटाना अनिवार्य है।'
        : 'Under Indian Law (IT Rules 2021), platforms must remove intimate content within 24 hours.',
      badge: isHindi ? 'नियम 3' : 'Rule 3',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    }
  ];

  return (
    <section 
      aria-label="Calm Emergency Guidance" 
      className="pinterest-glass rounded-3xl p-6 sm:p-10 shadow-xs space-y-7 relative overflow-hidden"
    >
      {/* Top Reassurance & Privacy Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F0EBE6] pb-4 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50/90 text-emerald-800 font-bold border border-emerald-200 shadow-2xs">
            <Lock className="w-3 h-3 text-emerald-600" />
            <span>{isHindi ? '100% ऑन-डिवाइस व सुरक्षित' : '100% Private & Safe'}</span>
          </span>
          <span className="hidden sm:inline-block text-[#777]">
            {isHindi ? '• कोई डेटा सर्वर पर नहीं जाता • कोई लॉगिन नहीं' : '• No data saved on servers • No sign-up required'}
          </span>
        </div>

        {/* Quick Exit Action */}
        <button
          onClick={() => {
            hapticCamouflage(true);
            onTriggerCamouflage();
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/90 hover:bg-[#F3EFEC] text-[#2D2D2D] rounded-full font-bold border border-[#DED9D4] transition-all cursor-pointer text-xs active:scale-95 shadow-2xs hover:-translate-y-0.5"
          title={isHindi ? 'स्क्रीन तुरंत छिपाएं (ESC दबाएं)' : 'Quick Exit: Hide screen instantly (ESC)'}
        >
          <EyeOff className="w-3.5 h-3.5 text-[#666]" />
          <span>{isHindi ? 'क्विक एग्जिट (ESC)' : 'QUICK EXIT (ESC)'}</span>
        </button>
      </div>

      {/* Hero Headline & Subtitle */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B6D5C]/10 text-[#8B6D5C] text-xs font-bold tracking-wide border border-[#8B6D5C]/20 shadow-2xs">
          <Heart className="w-3.5 h-3.5 fill-[#8B6D5C]" />
          <span>{isHindi ? 'घबराएं नहीं • हम आपके साथ हैं' : 'Take a slow breath • You are safe'}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1A1A1A] tracking-tight leading-tight">
          {isHindi 
            ? 'आप सुरक्षित हैं। यह आपकी गलती नहीं है।' 
            : 'You are safe. This is not your fault.'}
        </h1>

        <p className="text-sm sm:text-base text-[#555] leading-relaxed max-w-2xl">
          {isHindi
            ? 'ब्लैकमेलरों की धमकियों से डरें नहीं। नीचे दिए गए 3 नियमों का पालन करें और 1-क्लिक में फोटो हटाने व पुलिस शिकायत की सुरक्षित सहायता लें।'
            : 'You do not have to panic or pay. Follow these 3 golden rules below, stop the blackmailer, and remove leaked content through legal channels.'}
        </p>
      </div>

      {/* Confidence Empowerment Pill - Makes girls & women feel fearless */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-50/80 via-white/90 to-amber-50/80 border border-rose-100 shadow-2xs flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 shrink-0">
          <Sparkles className="w-4.5 h-4.5" />
        </div>
        <div className="text-xs sm:text-sm text-[#3A3A3A] leading-relaxed">
          <span className="font-bold text-[#1A1A1A]">
            {isHindi ? 'आप कमजोर नहीं हैं — कानून आपके साथ है: ' : 'You Hold All The Power: '}
          </span>
          {isHindi 
            ? 'ब्लैकमेलर गैर-जमानती अपराध कर रहा है (IT Act 67A व BNS 308 - 5 साल जेल)। आपने कोई गुनाह नहीं किया है।' 
            : 'The perpetrator is committing a non-bailable crime under IT Act 67A and BNS 308 (up to 5 years prison). You have zero reason to feel ashamed.'}
        </div>
      </div>

      {/* 3 Golden Rules (Pinterest Hover Cards) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#8B6D5C] uppercase tracking-wider">
            {isHindi ? '3 मुख्य सुनहरे नियम (3 Golden Rules):' : 'The 3 Golden Rules to Follow Right Now:'}
          </span>
          <span className="text-[11px] text-[#888] hidden sm:inline">
            {isHindi ? 'शांत मन से याद रखें' : 'Remember these'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {goldenRules.map((rule) => {
            const Icon = rule.icon;
            return (
              <div 
                key={rule.step}
                className="pinterest-glass pinterest-hover-card p-5 sm:p-6 rounded-3xl border border-white/80 shadow-2xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-white/90 border border-[#E8E2DC] flex items-center justify-center text-[#2D2D2D] shadow-2xs">
                      <Icon className="w-4.5 h-4.5 text-[#8B6D5C]" />
                    </div>
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider border ${rule.color}`}>
                      {rule.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#1A1A1A] leading-snug">
                    {rule.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#8B6D5C]">
                    {rule.subtitle}
                  </p>
                  <p className="text-xs text-[#666] leading-relaxed pt-1">
                    {rule.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Instant Action Bar (Tesla / Apple Bold Simplicity) */}
      <div className="p-6 rounded-3xl bg-[#2D2D2D] text-white space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-bold tracking-tight">
              {isHindi ? 'तुरंत क्या कदम उठाना चाहते हैं?' : 'What do you want to do right now?'}
            </h3>
            <p className="text-xs text-white/70">
              {isHindi ? '1-क्लिक में सीधा समाधान चुनें' : 'Direct solutions without complicated forms'}
            </p>
          </div>
          <span className="text-[11px] text-emerald-400 font-bold bg-white/10 px-3 py-1 rounded-full self-start sm:self-auto border border-white/10">
            {isHindi ? 'त्वरित कार्रवाई' : 'Instant Action'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {/* Action 1: Extortion / Blackmail Plan */}
          <button
            onClick={() => {
              if (onSelectSituation) {
                onSelectSituation('blackmail');
              } else {
                onNavigateToTab('rescue', 'guided-emergency-flow');
              }
            }}
            className="p-4 rounded-2xl bg-white text-[#2D2D2D] hover:bg-[#F3EFEC] font-bold text-left transition-all cursor-pointer flex items-center justify-between group shadow-xs hover:-translate-y-1 active:scale-98"
          >
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-extrabold text-rose-600 block">
                {isHindi ? 'ब्लैकमेल हो रहा है' : 'Being Blackmailed'}
              </span>
              <span className="text-sm font-bold block">
                {isHindi ? 'कानूनी जवाब व उपाय' : 'Power Reply & Plan'}
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#8B6D5C] group-hover:translate-x-1 transition-transform shrink-0" />
          </button>

          {/* Action 2: Stop The Leak */}
          <button
            onClick={() => onNavigateToTab('takedown')}
            className="p-4 rounded-2xl bg-white text-[#2D2D2D] hover:bg-[#F3EFEC] font-bold text-left transition-all cursor-pointer flex items-center justify-between group shadow-xs hover:-translate-y-1 active:scale-98"
          >
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-extrabold text-[#8B6D5C] block">
                {isHindi ? 'लीक रोकें' : 'Stop The Leak'}
              </span>
              <span className="text-sm font-bold block">
                {isHindi ? 'फोटो हटाएं (StopNCII)' : 'StopNCII & Takedowns'}
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#8B6D5C] group-hover:translate-x-1 transition-transform shrink-0" />
          </button>

          {/* Action 3: e-FIR Complaint Draft */}
          <button
            onClick={() => onNavigateToTab('report')}
            className="p-4 rounded-2xl bg-white text-[#2D2D2D] hover:bg-[#F3EFEC] font-bold text-left transition-all cursor-pointer flex items-center justify-between group shadow-xs hover:-translate-y-1 active:scale-98"
          >
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-extrabold text-[#8B6D5C] block">
                {isHindi ? 'पुलिस शिकायत' : 'Police Complaint'}
              </span>
              <span className="text-sm font-bold block">
                {isHindi ? 'e-FIR ड्राफ्ट व PDF' : 'Ready e-FIR Draft'}
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#8B6D5C] group-hover:translate-x-1 transition-transform shrink-0" />
          </button>

          {/* Action 4: Call 1930 Helpline */}
          <a
            href="tel:1930"
            onClick={() => hapticAction()}
            className="p-4 rounded-2xl bg-[#8B6D5C] hover:bg-[#775c4c] text-white font-bold text-left transition-all flex items-center justify-between group shadow-xs hover:-translate-y-1 active:scale-98"
          >
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-extrabold text-amber-200 block">
                {isHindi ? '24/7 हेल्पलाइन' : '24/7 Helpline'}
              </span>
              <span className="text-sm font-bold block">
                {isHindi ? '1930 पर कॉल करें' : 'Dial 1930 Direct'}
              </span>
            </div>
            <PhoneCall className="w-4 h-4 text-white group-hover:scale-110 transition-transform shrink-0" />
          </a>
        </div>
      </div>

      {/* Emergency Distress Assistance Drawer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs text-[#666]">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-[#2D2D2D]">{isHindi ? 'आपातकालीन कॉल:' : 'Emergency Police Call:'}</span>
          <a 
            href="tel:112" 
            onClick={() => hapticPanic()}
            className="font-bold text-[#DC2626] hover:underline"
          >
            112 ({isHindi ? 'राष्ट्रीय पुलिस' : 'National Police'})
          </a>
          <span>•</span>
          <a 
            href="tel:1091" 
            onClick={() => hapticAction()}
            className="font-bold text-[#8B6D5C] hover:underline"
          >
            1091 ({isHindi ? 'महिला हेल्पलाइन' : 'Women Helpline'})
          </a>
        </div>

        <button
          onClick={() => {
            hapticSOS();
            onTriggerSOS();
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-900 font-bold transition-colors cursor-pointer"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-rose-700" />
          <span>{isHindi ? 'SOS आपातकालीन अलर्ट खोलें' : 'Open SOS GPS Alert'}</span>
        </button>
      </div>
    </section>
  );
};
