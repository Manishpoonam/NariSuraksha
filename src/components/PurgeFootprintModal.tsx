import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trash2, 
  ShieldAlert, 
  Check, 
  X, 
  Lock, 
  EyeOff, 
  AlertTriangle,
  History,
  Sparkles
} from 'lucide-react';
import { Language } from '../types';
import { hapticPurge, hapticAction } from '../utils/haptics';
import { purgeAllLocalFootprint } from '../utils/storage';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface PurgeFootprintModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const PurgeFootprintModal: React.FC<PurgeFootprintModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const isHindi = language === 'hi';
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(isOpen, modalRef, '#close-purge-modal-btn');
  const [purged, setPurged] = useState(false);

  const handlePurgeAllData = () => {
    hapticPurge();
    try {
      purgeAllLocalFootprint();
      setPurged(true);
      setTimeout(() => {
        setPurged(false);
        onClose();
        window.location.reload();
      }, 1600);
    } catch (e) {
      console.error(e);
      setPurged(true);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="purge-modal-title"
      >
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#E8E2DC] space-y-5 text-[#2D2D2D]"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 border-b border-[#F0EBE6] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h2 id="purge-modal-title" className="text-base sm:text-lg font-bold text-[#1A1A1A]">
                  {isHindi ? 'डिवाइस से सभी निशान मिटाएं' : 'Purge Local Footprint'}
                </h2>
                <p className="text-xs text-[#777]">
                  {isHindi ? 'साझा फोन या परिवार के डिवाइस के लिए' : 'For shared or monitored phones'}
                </p>
              </div>
            </div>
            <button
              id="close-purge-modal-btn"
              type="button"
              onClick={onClose}
              aria-label={isHindi ? 'संवाद बंद करें' : 'Close modal'}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-[#F3EFEC] text-[#888] hover:text-[#111] transition-colors focus-visible:ring-2 focus-visible:ring-[#26215C] focus-visible:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {purged ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-emerald-900">
                {isHindi ? 'सभी स्थानीय डेटा पूरी तरह मिटा दिया गया!' : 'Local Footprint Completely Erased!'}
              </h3>
              <p className="text-xs text-emerald-800">
                {isHindi
                  ? 'ड्राफ्ट, सेव किए गए पिन्स और इतिहास हटा दिए गए हैं। पेज रीलोड हो रहा है...'
                  : 'All drafts, saved pins, and local cache removed. Reloading clean state...'}
              </p>
            </div>
          ) : (
            <div className="space-y-4 text-xs sm:text-sm text-[#444] leading-relaxed">
              <div className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E8E2DC] space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#1A1A1A]">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>{isHindi ? 'यह क्या डिलीट करेगा?' : 'What will this do?'}</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-[#555]">
                  <li>{isHindi ? 'सहेजे गए पुलिस e-FIR ड्राफ्ट' : 'Saved court/e-FIR complaint drafts'}</li>
                  <li>{isHindi ? 'सेव किए गए हिम्मत और शक्ति पिन्स' : 'Saved courage & boundary pins'}</li>
                  <li>{isHindi ? 'चयनित स्थिति व फॉर्म की प्रविष्टियां' : 'All local progress & state selection'}</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-1.5 text-xs text-amber-900">
                <div className="flex items-center gap-1.5 font-bold">
                  <History className="w-4 h-4 text-amber-700" />
                  <span>{isHindi ? 'ब्राउज़र हिस्ट्री भी हटाएं (महत्वपूर्ण)' : 'Also Clear Browser History:'}</span>
                </div>
                <p>
                  {isHindi
                    ? 'यदि फोन किसी और के हाथ में जा सकता है, तो ब्राउज़र में Ctrl+H (या फोन में Settings > Clear Browsing Data) दबाकर हिस्ट्री मिटाएं या Incognito मोड इस्तेमाल करें।'
                    : 'If someone inspects your browser history, press Ctrl+H (or Safari/Chrome History > Clear Data) or open in a Private/Incognito Tab.'}
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                <button
                  type="button"
                  onClick={handlePurgeAllData}
                  className="w-full sm:flex-1 py-3 px-4 min-h-[44px] bg-rose-600 hover:bg-rose-700 text-white rounded-full font-bold text-xs sm:text-sm transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2 active:scale-98 focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:outline-none"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{isHindi ? '1-क्लिक में सब मिटाएं' : 'Wipe All Data Now'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    hapticAction();
                    onClose();
                  }}
                  className="w-full sm:w-auto py-3 px-5 min-h-[44px] bg-[#F3EFEC] hover:bg-[#E8E2DC] text-[#2D2D2D] rounded-full font-semibold text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#26215C] focus-visible:outline-none"
                >
                  {isHindi ? 'रद्द करें' : 'Cancel'}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
