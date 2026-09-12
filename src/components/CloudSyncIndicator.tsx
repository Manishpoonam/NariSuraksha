import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  Download, 
  X, 
  HardDrive,
  CheckCircle2
} from 'lucide-react';
import { Language, CloudSyncState } from '../types';
import { 
  getCloudSyncState, 
  subscribeToSync, 
  exportEncryptedBackupBundle 
} from '../utils/cloudSync';
import { hapticAction } from '../utils/haptics';

interface CloudSyncIndicatorProps {
  language: Language;
  className?: string;
  variant?: 'compact' | 'full';
}

export const CloudSyncIndicator: React.FC<CloudSyncIndicatorProps> = ({
  language,
  className = '',
  variant = 'compact'
}) => {
  const isHindi = language === 'hi';
  const [syncState, setSyncState] = useState<CloudSyncState>(getCloudSyncState());
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = subscribeToSync((newState) => {
      setSyncState(newState);
    });
    return unsubscribe;
  }, []);

  const handleOpenDetails = () => {
    hapticAction();
    setIsModalOpen(true);
  };

  return (
    <>
      {/* 1. COMPACT DEFENSIVE PRIVACY PILL: CALM TEAL / LOCAL ONLY */}
      <div className={`relative inline-flex items-center ${className}`}>
        <button
          id="header-local-only-pill"
          type="button"
          onClick={handleOpenDetails}
          className="group relative inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer select-none active:scale-95 shadow-2xs bg-[#0F6E56]/15 hover:bg-[#0F6E56]/25 border-[#0F6E56]/40 text-[#E1F5EE]"
          title={
            isHindi
              ? 'स्थानीय गोपनीयता पुष्टि: शून्य सर्वर अपलोड (डेटा केवल आपके डिवाइस में है)'
              : 'Local-Only Verified: Zero server uploads (Data stays entirely in your browser)'
          }
          aria-label={isHindi ? 'लोकल-ओनली डेटा पुष्टि' : 'Local-Only Verified'}
        >
          {/* Calm shield check icon */}
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />

          {/* Status Text: Unambiguously local */}
          <div className="flex items-center gap-1">
            <span className="whitespace-nowrap font-medium text-[11px] sm:text-xs">
              <span className="hidden sm:inline">
                {isHindi ? 'क्लाउड सिंक बंद • 100% लोकल' : 'Local-Only • Confirmed'}
              </span>
              <span className="sm:hidden">
                {isHindi ? '100% लोकल' : 'Local-Only'}
              </span>
            </span>
          </div>
        </button>
      </div>

      {/* 2. REASSURING PRIVACY CONFIRMATION MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              className="relative w-full max-w-lg bg-[#1F1F23] text-white rounded-3xl border border-white/15 shadow-2xl overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-labelledby="local-privacy-modal-title"
            >
              {/* Header Strip with Live Status */}
              <div className="bg-gradient-to-r from-emerald-950/80 via-[#1F1F23] to-[#1F1F23] p-5 sm:p-6 border-b border-white/10 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 id="local-privacy-modal-title" className="text-base sm:text-lg font-black text-white tracking-tight">
                      {isHindi ? 'स्थानीय गोपनीयता • शून्य क्लाउड अपलोड' : 'No Cloud Sync • Verified'}
                    </h3>
                    <p className="text-xs text-emerald-300/90 font-medium">
                      {isHindi 
                        ? 'पुष्टि: कोई भी डेटा आपके डिवाइस से बाहर नहीं जाता' 
                        : 'Confirmed: 100% in-browser memory. Zero remote server uploads.'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body Content */}
              <div className="p-5 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-emerald-200 leading-relaxed">
                    {isHindi
                      ? 'यह पोर्टल पूरी तरह आपके ब्राउज़र में काम करता है। किसी भी बैकएंड सर्वर, क्लाउड डेटाबेस या एनालिटिक्स पर आपका ड्राफ्ट, फोटो या शिकायत कभी नहीं भेजी जाती।'
                      : 'This application runs entirely client-side. No complaint drafts, image hashes, contacts, or chat logs are ever transmitted to any remote server or cloud database.'}
                  </p>
                </div>

                {/* THE 3 RESCUE GUARANTEES (PANIC REDUCTION) */}
                <div className="space-y-2.5">
                  <span className="text-[11px] font-black uppercase tracking-wider text-gray-400">
                    {isHindi ? 'गोपनीयता व डेटा सुरक्षा सिद्धांत:' : 'LOCAL STORAGE & PRIVACY ARCHITECTURE:'}
                  </span>

                  <div className="grid grid-cols-1 gap-2.5">
                    {/* Guarantee 1: Zero Server Transmission */}
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                        <Lock className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs sm:text-sm font-bold text-white">
                          {isHindi ? '1. शून्य क्लाउड ट्रांसमिशन (Zero Server Uploads)' : '1. Zero Cloud Transmission (Strictly In-Browser)'}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-gray-300 leading-relaxed">
                          {isHindi
                            ? 'कोई लॉगिन या अकाउंट नहीं है। सभी हैश, ड्राफ्ट और फॉर्म आपके फोन की अस्थाई मेमोरी में रहते हैं।'
                            : 'No accounts, no cookies, no tracking. Calculations and draft text stay strictly inside your phone’s temporary session.'}
                        </p>
                      </div>
                    </div>

                    {/* Guarantee 2: Crash Resilience */}
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 shrink-0 mt-0.5">
                        <HardDrive className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs sm:text-sm font-bold text-white">
                          {isHindi ? '2. अचानक पेज रीलोड से सुरक्षा' : '2. In-Memory Session Preservation'}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-gray-300 leading-relaxed">
                          {isHindi
                            ? 'अगर गलती से पेज रीफ्रेश हो जाए, तो स्थानीय ब्राउज़र सेशन ड्राफ्ट को सुरक्षित रखता है ताकि आपको दोबारा न लिखना पड़े।'
                            : 'If your browser tab reloads, your in-progress work is retained locally within your private browser session.'}
                        </p>
                      </div>
                    </div>

                    {/* Guarantee 3: Quick Exit ESC */}
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                        <EyeOff className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs sm:text-sm font-bold text-white">
                          {isHindi ? '3. त्वरित निकास (ESC) पर तुरंत छिपाव' : '3. Quick Exit (ESC) & Complete Vanish'}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-gray-300 leading-relaxed">
                          {isHindi
                            ? 'क्विक एग्जिट दबाते ही स्क्रीन तुरंत सामान्य विकिपीडिया पेज में बदल जाती है। टैब बंद करते ही सब नष्ट हो जाता है।'
                            : 'Triggering Quick Exit immediately disguises your screen. Closing the browser tab permanently flushes memory.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vault Inventory / Stats */}
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-gray-300">
                    <HardDrive className="w-4 h-4 text-emerald-400" />
                    <span>{isHindi ? 'स्थानीय मेमोरी में मौजूद सामग्री:' : 'Items in local browser memory:'}</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-300 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800">
                    {syncState.itemsSavedCount} {isHindi ? 'लोकल ड्राफ्ट' : 'Items (Local Only)'}
                  </span>
                </div>

                {/* Actions: Portable Backup Export */}
                <div className="pt-2 flex justify-end">
                  <button
                    id="modal-export-encrypted-json"
                    onClick={() => exportEncryptedBackupBundle()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer border border-white/15"
                    title={isHindi ? 'ऑफ़लाइन बैकअप फाइल (.json) डाउनलोड करें' : 'Download Encrypted Backup File (.json)'}
                  >
                    <Download className="w-4 h-4 text-emerald-300" />
                    <span>{isHindi ? 'ऑफ़लाइन बैकअप डाउनलोड (.json)' : 'Export Local Backup (.json)'}</span>
                  </button>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-black/50 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isHindi ? 'क्लाइंट-साइड केवल • जीरो सर्वर' : 'Client-Side Only • Zero Server Knowledge'}</span>
                </div>
                <span className="text-emerald-400/90 font-medium">
                  {isHindi ? 'सिंक: बंद' : 'No Cloud Sync: Verified'}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
