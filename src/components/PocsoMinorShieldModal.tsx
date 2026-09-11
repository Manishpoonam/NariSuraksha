/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  Baby, 
  ExternalLink, 
  Phone, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  Heart, 
  Lock, 
  ArrowRight,
  Scale
} from 'lucide-react';
import { Language } from '../types';
import { hapticAction } from '../utils/haptics';

interface PocsoMinorShieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSelectTakeItDown?: () => void;
}

export const PocsoMinorShieldModal: React.FC<PocsoMinorShieldModalProps> = ({
  isOpen,
  onClose,
  language,
  onSelectTakeItDown
}) => {
  const isHindi = language === 'hi';

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-3xl border border-[#E8E2DC] shadow-2xl max-w-xl w-full p-6 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 border-b border-[#F0EBE6] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FBEAF0] text-[#993556] flex items-center justify-center font-bold shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1A1A1A]">
                  {isHindi ? 'नाबालिग संरक्षण मार्गदर्शिका (POCSO Act & 67B IT Act)' : 'Minor (<18) Protection Protocol & POCSO Shield'}
                </h3>
                <p className="text-xs text-[#666]">
                  {isHindi ? '18 वर्ष से कम उम्र के मामलों के लिए विशेष कानूनी सुरक्षा' : 'Dedicated legal framework and platform removal for minors'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-[#777] hover:text-[#111] rounded-full hover:bg-[#FAF9F6] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Reassurance Banner */}
          <div className="p-4 bg-[#E1F5EE]/40 rounded-2xl border border-[#B7E4D7] flex items-start gap-3">
            <Heart className="w-5 h-5 text-[#0F6E56] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#0F6E56] space-y-1">
              <span className="font-bold">
                {isHindi ? 'आप पूरी तरह सुरक्षित हैं — कानून पीड़िता के साथ है' : 'You are protected under the law — you are the victim, not the offender'}
              </span>
              <p className="text-xs text-[#2D2D2D] leading-relaxed">
                {isHindi
                  ? 'भारतीय कानून में 18 वर्ष से कम उम्र के किसी भी बच्चे की अंतरंग तस्वीरें बनाना या रखना अपराध है। कानून बच्चे को सुरक्षा प्रदान करता है और अपराधी के खिलाफ गैर-जमानती कार्रवाई करता है।'
                  : 'Under Indian law, children and teenagers under 18 are granted absolute statutory immunity as victims. The law penalizes the blackmailer/distributor under non-bailable provisions.'}
              </p>
            </div>
          </div>

          {/* Key Differences: StopNCII vs TakeItDown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#993556]">
              {isHindi ? 'प्लेटफॉर्म से तस्वीरें हटाने का सही टूल:' : 'Mandatory Tool Difference: StopNCII vs TakeItDown'}
            </h4>

            <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E2DC] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#1A1A1A]">
                  Take It Down (NCMEC)
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E1F5EE] text-[#0F6E56]">
                  {isHindi ? 'नाबालिगों के लिए अनिवार्य' : 'Required for <18'}
                </span>
              </div>
              <p className="text-xs text-[#555] leading-relaxed">
                {isHindi
                  ? 'StopNCII केवल 18 वर्ष या उससे अधिक उम्र के वयस्कों के लिए है। यदि फोटो 18 वर्ष से कम उम्र में ली गई थी, तो TakeItDown.ncmec.org का उपयोग करें। यह सुरक्षित हैश बनाकर Facebook, Instagram, TikTok और Pornhub से फोटो हमेशा के लिए ब्लॉक कर देता है।'
                  : 'StopNCII strictly operates for individuals who were 18+ when the media was captured. For anyone under 18, use Take It Down (by NCMEC). It generates an on-device digital fingerprint to block circulation across global platforms without uploading the image.'}
              </p>

              <a
                href="https://takeitdown.ncmec.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F6E56] hover:underline pt-1"
              >
                <span>{isHindi ? 'Take It Down पोर्टल खोलें' : 'Open Take It Down Portal'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Dedicated Institutional Contacts */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
              {isHindi ? 'समर्पित हेल्पलाइन व बाल संरक्षण आयोग (NCPCR):' : 'Statutory Minor Helplines & Child Protection Councils:'}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href="tel:1098"
                className="p-3.5 rounded-2xl border border-[#E8E2DC] bg-[#FAF9F6] hover:bg-[#F3EFEC] transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-[#1A1A1A]">
                    {isHindi ? 'चाइल्डलाइन हेल्पलाइन' : 'Childline National Helpline'}
                  </div>
                  <div className="text-xs text-[#666]">1098 (24/7 Toll-Free)</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#2D2D2D] text-white flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5" />
                </div>
              </a>

              <a
                href="https://ncpcr.gov.in/pocso-e-box"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl border border-[#E8E2DC] bg-[#FAF9F6] hover:bg-[#F3EFEC] transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-[#1A1A1A]">
                    {isHindi ? 'POCSO e-Box (NCPCR)' : 'POCSO e-Box (NCPCR)'}
                  </div>
                  <div className="text-xs text-[#666]">{isHindi ? 'गोपनीय ऑनलाइन पोर्टल' : 'Confidential Child Rights'}</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#993556] text-white flex items-center justify-center">
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            </div>
          </div>

          {/* Mandatory Reporting Note */}
          <div className="p-3.5 bg-[#FAF9F6] rounded-2xl border border-[#E8E2DC] text-[11px] text-[#666] leading-relaxed space-y-1">
            <span className="font-bold text-[#1A1A1A]">
              {isHindi ? 'कानूनी प्रावधान: ' : 'Legal Context (Section 19 POCSO): '}
            </span>
            {isHindi
              ? 'धारा 19 के तहत किसी भी वयस्क या संस्था को बच्चे के यौन शोषण की जानकारी मिलने पर विशेष किशोर पुलिस इकाई (SJPU) को सूचित करना अनिवार्य है। पीड़िता की पहचान कानूनन गोपनीय रहती है।'
              : 'Section 19 of the POCSO Act places a statutory reporting duty on institutions. Importantly, Section 73 BNS and POCSO mandate total anonymity for the child in all public or court records.'}
          </div>

          <div className="pt-2 flex items-center justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-[#2D2D2D] hover:bg-black text-white text-xs font-bold transition-all cursor-pointer"
            >
              {isHindi ? 'समझ गई / ठीक है' : 'Understood • Close Guidance'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
