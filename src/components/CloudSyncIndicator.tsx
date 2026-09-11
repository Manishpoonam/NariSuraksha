import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cloud, 
  CloudCheck, 
  CloudOff, 
  RefreshCw, 
  ShieldCheck, 
  BatteryCharging, 
  WifiOff, 
  EyeOff, 
  Download, 
  CheckCircle2, 
  X, 
  Lock, 
  FileText,
  Clock,
  HardDrive
} from 'lucide-react';
import { Language, CloudSyncState } from '../types';
import { 
  getCloudSyncState, 
  subscribeToSync, 
  triggerManualSync, 
  exportEncryptedBackupBundle 
} from '../utils/cloudSync';
import { hapticAction, hapticSuccess } from '../utils/haptics';

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
  const [isManualSyncing, setIsManualSyncing] = useState<boolean>(false);

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

  const handleManualBackup = async () => {
    setIsManualSyncing(true);
    await triggerManualSync();
    setIsManualSyncing(false);
  };

  const formatTimeAgo = (timestamp: number | null): string => {
    if (!timestamp) return isHindi ? 'अभी-अभी' : 'Just now';
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 10) return isHindi ? 'अभी-अभी' : 'Just now';
    if (seconds < 60) return isHindi ? `${seconds} सेकंड पहले` : `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return isHindi ? `${minutes} मिनट पहले` : `${minutes}m ago`;
    return isHindi ? 'सहेजा गया' : 'Saved';
  };

  const isSaving = syncState.status === 'saving';
  const isOffline = syncState.status === 'offline' || !syncState.isOnline;

  return (
    <>
      {/* 1. COMPACT HEADER TRIGGER PILL */}
      <div className={`relative inline-flex items-center ${className}`}>
        <button
          id="header-cloud-sync-pill"
          type="button"
          onClick={handleOpenDetails}
          className={`group relative overflow-hidden inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer select-none active:scale-95 shadow-2xs ${
            isSaving
              ? 'bg-amber-500/20 border-amber-400/60 text-amber-200'
              : isOffline
              ? 'bg-zinc-800/80 border-zinc-600/70 text-zinc-300'
              : 'bg-emerald-950/60 hover:bg-emerald-900/70 border-emerald-600/50 text-emerald-200 hover:text-emerald-100'
          }`}
          title={
            isHindi
              ? 'क्लाउड बैकअप स्थिति देखें (फोन बंद होने पर भी डेटा सुरक्षित रहेगा)'
              : 'Cloud-Sync Backup Status (Your draft is safe even if phone dies)'
          }
          aria-label="Cloud-Sync Backup Status"
        >
          {/* Subtle Hairline Progress Bar along the bottom of the pill when saving */}
          {isSaving && (
            <motion.div
              className="absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-amber-400 via-emerald-400 to-cyan-300"
              initial={{ width: '0%' }}
              animate={{ width: `${syncState.progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.2 }}
            />
          )}

          {/* Status Icon */}
          {isSaving ? (
            <RefreshCw className="w-3.5 h-3.5 text-amber-300 animate-spin shrink-0" />
          ) : isOffline ? (
            <CloudOff className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          ) : (
            <span className="relative flex items-center shrink-0">
              <CloudCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping opacity-75" />
            </span>
          )}

          {/* Status Text / Percentage */}
          <div className="flex items-center gap-1">
            {isSaving ? (
              <span className="font-bold whitespace-nowrap">
                {isHindi ? `सहेजा जा रहा है... ${syncState.progress}%` : `Backing up... ${syncState.progress}%`}
              </span>
            ) : isOffline ? (
              <span className="whitespace-nowrap font-medium">
                {isHindi ? 'ऑफ़लाइन सुरक्षित' : 'Offline Vault (Safe)'}
              </span>
            ) : (
              <span className="whitespace-nowrap font-medium">
                <span className="hidden sm:inline">
                  {isHindi ? 'क्लाउड बैकअप सुरक्षित' : 'Cloud-Sync Safe'}
                </span>
                <span className="sm:hidden">
                  {isHindi ? 'सुरक्षित' : 'Saved'}
                </span>
              </span>
            )}

            {/* Subtle time-ago badge when synced on larger screens */}
            {!isSaving && !isOffline && (
              <span className="hidden xl:inline-block text-[10px] text-emerald-300/80 font-normal ml-0.5">
                • {formatTimeAgo(syncState.lastSavedAt)}
              </span>
            )}
          </div>
        </button>
      </div>

      {/* 2. REASSURING DETAILS MODAL / POPOVER */}
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
              aria-labelledby="cloud-sync-modal-title"
            >
              {/* Header Strip with Live Status */}
              <div className="bg-gradient-to-r from-emerald-950 via-[#1F1F23] to-[#1F1F23] p-5 sm:p-6 border-b border-white/10 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <CloudCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 id="cloud-sync-modal-title" className="text-base sm:text-lg font-black text-white tracking-tight">
                        {isHindi ? 'क्लाउड सिंक व डेटा सुरक्षा बैकअप' : 'Cloud-Sync & Zero-Loss Vault'}
                      </h3>
                    </div>
                    <p className="text-xs text-emerald-300/90 font-medium">
                      {isHindi 
                        ? 'आपका ड्राफ्ट और साक्ष्य 100% सुरक्षित हैं' 
                        : 'Your complaint draft & evidence are continuously safeguarded'}
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
                {/* Active Saving Bar if in progress */}
                {isSaving && (
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                      <span className="flex items-center gap-1.5">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>{isHindi ? 'एनक्रिप्टेड बैकअप लिखा जा रहा है...' : 'Writing Encrypted Backup...'}</span>
                      </span>
                      <span>{syncState.progress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full"
                        style={{ width: `${syncState.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* THE 3 RESCUE GUARANTEES (PANIC REDUCTION) */}
                <div className="space-y-2.5">
                  <span className="text-[11px] font-black uppercase tracking-wider text-gray-400">
                    {isHindi ? 'डेटा सुरक्षा की 3 गारंटी (घबराएं नहीं):' : '3 UNCONDITIONAL SAFETY GUARANTEES:'}
                  </span>

                  <div className="grid grid-cols-1 gap-2.5">
                    {/* Guarantee 1: Battery Dies */}
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                        <BatteryCharging className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs sm:text-sm font-bold text-white">
                          {isHindi ? '1. अगर फोन की बैटरी खत्म या स्विच ऑफ हो जाए' : '1. If your phone dies or shuts down right now'}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-gray-300 leading-relaxed">
                          {isHindi
                            ? 'आपके द्वारा लिखा गया हर शब्द ब्राउज़र के सिक्योर स्टोरेज में लगातार ऑटो-सेव हो रहा है। फोन ऑन होते ही आपका ड्राफ्ट वैसा ही मिलेगा।'
                            : 'Every character you type is instantly cached to durable offline storage and synced. When you power your phone back on, your complaint draft is completely intact.'}
                        </p>
                      </div>
                    </div>

                    {/* Guarantee 2: Network Loss */}
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 shrink-0 mt-0.5">
                        <WifiOff className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs sm:text-sm font-bold text-white">
                          {isHindi ? '2. अगर इंटरनेट या वाई-फाई बंद हो जाए' : '2. If internet connection drops or signal cuts out'}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-gray-300 leading-relaxed">
                          {isHindi
                            ? 'बिना नेटवर्क के भी आप पूरी शिकायत लिख सकती हैं। इंटरनेट आते ही बैकअप स्वतः क्लाउड वॉल्ट में सिंक्रनाइज़ हो जाता है।'
                            : 'Offline-first architecture ensures zero data loss. You can continue drafting with zero connection, and changes sync seamlessly the instant signal returns.'}
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
                          {isHindi ? '3. अचानक क्विक एग्जिट (ESC) दबाने पर' : '3. Triggering Quick Exit (ESC) or closing the tab'}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-gray-300 leading-relaxed">
                          {isHindi
                            ? 'स्क्रीन तुरंत छिप जाएगी लेकिन आपकी जानकारी कभी नष्ट नहीं होगी। यह पासवर्ड/एनक्रिप्शन सुरक्षा के तहत लॉक रहती है।'
                            : 'Quick concealment disguises the window immediately without resetting or discarding your work. All details remain locked in your private session.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vault Inventory / Stats */}
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-gray-300">
                    <HardDrive className="w-4 h-4 text-emerald-400" />
                    <span>{isHindi ? 'सुरक्षित ड्राफ्ट व साक्ष्य:' : 'Protected items in vault:'}</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-300 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800">
                    {syncState.itemsSavedCount} {isHindi ? 'आइटम सहेजे गए' : 'Items Secured'}
                  </span>
                </div>

                {/* Actions: Manual Sync & Portable Backup Export */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    id="modal-trigger-manual-backup"
                    onClick={handleManualBackup}
                    disabled={isManualSyncing || isSaving}
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm transition-all cursor-pointer shadow-lg active:scale-95 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${isManualSyncing ? 'animate-spin' : ''}`} />
                    <span>
                      {isManualSyncing 
                        ? (isHindi ? 'सिंक हो रहा है...' : 'Syncing Vault...') 
                        : (isHindi ? 'अभी बैकअप लें (Sync Now)' : 'Sync & Verify Backup Now')}
                    </span>
                  </button>

                  <button
                    id="modal-export-encrypted-json"
                    onClick={() => exportEncryptedBackupBundle()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer border border-white/15"
                    title={isHindi ? 'ऑफ़लाइन बैकअप फाइल (.json) डाउनलोड करें' : 'Download Encrypted Backup File (.json)'}
                  >
                    <Download className="w-4 h-4 text-amber-300" />
                    <span>{isHindi ? 'बैकअप डाउनलोड (.json)' : 'Export Backup'}</span>
                  </button>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-black/50 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isHindi ? 'जीरो-नॉलेज प्राइवेसी • केवल आपके डिवाइस में सुरक्षित' : 'Client-Side Encrypted • Zero-Knowledge'}</span>
                </div>
                <span>
                  {isHindi ? 'अंतिम सिंक:' : 'Last saved:'} {formatTimeAgo(syncState.lastSavedAt)}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
