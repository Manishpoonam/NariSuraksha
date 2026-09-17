import React from 'react';
import { motion } from 'motion/react';
import { HeartHandshake, ShieldCheck, Scale, AlertTriangle, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface EmergencyBannerProps {
  language: Language;
  onNavigateToTab?: (tab: string) => void;
  onTriggerSOS?: () => void;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ 
  language, 
  onNavigateToTab,
  onTriggerSOS 
}) => {
  const isHindi = language === 'hi';

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white border border-[#E8E2DC] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6"
    >
      {/* Top Affirmation Tag & Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#F3EFEC] text-[#8B6D5C] rounded-full text-xs font-bold uppercase tracking-wider">
          <HeartHandshake className="w-3.5 h-3.5 text-[#8B6D5C]" />
          <span>{isHindi ? 'प्रथम नियम: आप निर्दोष हैं' : 'First Affirmation: You Did Nothing Wrong'}</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {onNavigateToTab && (
            <button
              onClick={() => onNavigateToTab('girls_rescue')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#8B6D5C] hover:bg-[#775c4c] text-white rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer select-none"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{isHindi ? 'सहायता मार्गदर्शिका' : 'Quick Rescue Guide'}</span>
            </button>
          )}

          {onTriggerSOS && (
            <button
              onClick={onTriggerSOS}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FDE8E8] hover:bg-[#fbd5d5] text-[#C81E1E] border border-[#F98080] rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer select-none"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{isHindi ? 'गोपनीय SOS अलर्ट (GPS)' : 'Discreet SOS (GPS Alert)'}</span>
            </button>
          )}

          {onNavigateToTab && (
            <button
              onClick={() => onNavigateToTab('grounding')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FAF9F6] hover:bg-[#F3EFEC] text-[#8B6D5C] border border-[#E8E2DC] rounded-full text-xs font-bold transition-colors cursor-pointer select-none"
            >
              <span>{isHindi ? 'घबराहट हो रही है? 2-मिनट सांस अभ्यास' : 'Panicking? 2-Min Calming Breathing'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Affirmation Heading & Context */}
      <div className="space-y-3 max-w-4xl">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#2D2D2D] tracking-tight leading-snug">
          {isHindi ? (
            <>
              गहरी सांस लें। <span className="text-[#E25822]">यह आपकी गलती नहीं है।</span> भारतीय कानून आपके साथ मजबूती से खड़ा है।
            </>
          ) : (
            <>
              Take a deep breath. <span className="text-[#E25822]">You are the victim of a crime, not the cause.</span> Indian Law stands firmly with you.
            </>
          )}
        </h2>

        <p className="text-xs sm:text-sm text-[#555] leading-relaxed">
          {isHindi
            ? 'आपसी विश्वास या निजी जीवन में तस्वीरें होना कोई अपराध नहीं है। किसी की भी निजी तस्वीरों को लीक करना, AI से फर्जी फोटो बनाना, या ब्लैकमेल करना भारतीय कानून (BNS और IT Act) के तहत गैर-जमानती संगीन अपराध है जिसमें 5 से 7 साल तक की जेल होती है।'
            : 'Taking or sharing photos in confidence is never a crime. Non-consensually leaking intimate media, generating AI deepfakes, or blackmailing is a non-bailable criminal offense under Indian Law punishable by up to 5-7 years imprisonment.'}
        </p>
      </div>

      {/* 3 Pillar Legal Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        <div className="flex items-center gap-2.5 p-3.5 bg-[#FAF9F6] rounded-2xl border border-[#F0EBE6] text-xs font-medium text-[#444]">
          <ShieldCheck className="w-4 h-4 text-[#8B6D5C] shrink-0" />
          <span>{isHindi ? '24 घंटे में अनिवार्य Takedown (IT Rules)' : 'Mandatory 24-Hr Removal (IT Rules)'}</span>
        </div>
        <div className="flex items-center gap-2.5 p-3.5 bg-[#FAF9F6] rounded-2xl border border-[#F0EBE6] text-xs font-medium text-[#444]">
          <Scale className="w-4 h-4 text-[#8B6D5C] shrink-0" />
          <span>{isHindi ? 'पहचान कानूनी रूप से गोपनीय (BNS Sec 73)' : 'Identity Confidentiality (Sec 73 BNS)'}</span>
        </div>
        <div className="flex items-center gap-2.5 p-3.5 bg-[#FAF9F6] rounded-2xl border border-[#F0EBE6] text-xs font-medium text-[#444]">
          <HeartHandshake className="w-4 h-4 text-[#E25822] shrink-0" />
          <span>{isHindi ? 'मुफ्त सरकारी वकील का अधिकार (NALSA)' : 'Free Legal Aid for All Women (NALSA)'}</span>
        </div>
      </div>
    </motion.div>
  );
};

