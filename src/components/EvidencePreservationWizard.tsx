/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  Clock, 
  Smartphone, 
  CreditCard, 
  FileCheck, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  AlertTriangle, 
  Check, 
  Copy, 
  Sparkles,
  Info,
  Scale,
  ExternalLink
} from 'lucide-react';
import { Language, ComplaintFormData } from '../types';
import { hapticAction, hapticSuccess } from '../utils/haptics';
import { sessionDraft, STORAGE_KEYS, loadComplaintDraft, saveComplaintDraft } from '../utils/storage';

export interface EvidenceRecord {
  suspectHandle: string;
  suspectPhone: string;
  suspectUpiOrBank: string;
  platform: string;
  extortionAmount: string;
  threatDescription: string;
  firstThreatDate: string;
  uncroppedScreenshotsConfirmed: boolean;
  rawMediaPreserved: boolean;
  profileUrlCaptured: boolean;
  bsaAffidavitAcknowledged: boolean;
}

interface EvidencePreservationWizardProps {
  language: Language;
  onBack?: () => void;
  onTransferToComplaint?: () => void;
  onNavigateToTab?: (tab: string, elementId?: string) => void;
}

export const EvidencePreservationWizard: React.FC<EvidencePreservationWizardProps> = ({
  language,
  onBack,
  onTransferToComplaint,
  onNavigateToTab
}) => {
  const isHindi = language === 'hi';

  const [evidence, setEvidence] = useState<EvidenceRecord>(() => {
    return sessionDraft.get<EvidenceRecord>(STORAGE_KEYS.EVIDENCE_SUMMARY, {
      suspectHandle: '',
      suspectPhone: '',
      suspectUpiOrBank: '',
      platform: 'WhatsApp',
      extortionAmount: '₹',
      threatDescription: '',
      firstThreatDate: new Date().toISOString().slice(0, 10),
      uncroppedScreenshotsConfirmed: false,
      rawMediaPreserved: false,
      profileUrlCaptured: false,
      bsaAffidavitAcknowledged: false,
    });
  });

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [transferred, setTransferred] = useState<boolean>(false);

  const updateEvidence = (fields: Partial<EvidenceRecord>) => {
    setEvidence((prev) => {
      const updated = { ...prev, ...fields };
      sessionDraft.set(STORAGE_KEYS.EVIDENCE_SUMMARY, updated);
      return updated;
    });
  };

  const handleTransfer = () => {
    hapticSuccess();
    // Pre-fill complaint draft with preserved evidence
    const defaultData: ComplaintFormData = {
      victimAlias: '',
      contactEmailOrPhone: '',
      incidentType: 'extortion_blackmail',
      accusedKnown: 'unknown',
      accusedDetails: `Handle/Username: ${evidence.suspectHandle || 'Unknown'}\nPhone/Contact: ${evidence.suspectPhone || 'Unknown'}\nUPI ID / Payment Handle: ${evidence.suspectUpiOrBank || 'Unknown'}`,
      platformsInvolved: [evidence.platform || 'WhatsApp'],
      linksOrUsernames: evidence.suspectHandle || '',
      extortionAmountDemanded: evidence.extortionAmount || '',
      threatDetails: `Extortion Demand: ${evidence.extortionAmount}\nFirst Incident Date: ${evidence.firstThreatDate}\nIncident Summary: ${evidence.threatDescription}`,
      evidenceList: [
        'Uncropped screenshots displaying system clock, battery bar, and phone status indicators',
        'Chat logs showing extortion demands and payment QR/UPI addresses',
        'Profile URL and numeric user identifier prior to blocking',
        'Certified electronic evidence record under Section 63 Bharatiya Sakshya Adhiniyam (BSA) 2023'
      ],
      cityState: 'New Delhi, India',
      language: language
    };

    const existing = loadComplaintDraft(defaultData);
    const merged: ComplaintFormData = {
      ...existing.data,
      platformsInvolved: Array.from(new Set([...existing.data.platformsInvolved, evidence.platform])),
      accusedDetails: existing.data.accusedDetails?.includes(evidence.suspectHandle)
        ? existing.data.accusedDetails
        : `${existing.data.accusedDetails}\n${defaultData.accusedDetails}`.trim(),
      threatDetails: existing.data.threatDetails?.includes(evidence.extortionAmount)
        ? existing.data.threatDetails
        : `${existing.data.threatDetails}\n${defaultData.threatDetails}`.trim(),
    };

    saveComplaintDraft(merged, existing.isPersistedLocally);
    setTransferred(true);

    if (onTransferToComplaint) {
      setTimeout(() => {
        onTransferToComplaint();
      }, 700);
    } else if (onNavigateToTab) {
      setTimeout(() => {
        onNavigateToTab('report', 'complaint-draft-generator');
      }, 700);
    }
  };

  const generateEvidenceText = () => {
    return `=== FORENSIC DIGITAL EVIDENCE LOG ===
Generated under Section 63, Bharatiya Sakshya Adhiniyam (BSA) 2023 (formerly 65B Evidence Act)
Recorded on: ${new Date().toLocaleString('en-IN')}

1. ACCUSED DIGITAL IDENTIFIERS:
- Platform / Service: ${evidence.platform || 'Not specified'}
- Suspect Username/Handle: ${evidence.suspectHandle || 'Preserved in screenshots'}
- Phone / Contact Number: ${evidence.suspectPhone || 'None/Obtained in chat'}
- Extortion UPI / Banking Handle: ${evidence.suspectUpiOrBank || 'Preserved in chat'}

2. EXTORTION DEMAND & TIMELINE:
- First Threat Timestamp: ${evidence.firstThreatDate}
- Demanded Ransom/Concession: ${evidence.extortionAmount || 'None recorded'}
- Incident Synopsis: ${evidence.threatDescription || 'Documented in accompanying chat exhibits'}

3. CHAIN OF CUSTODY INTEGRITY CHECKLIST:
- [${evidence.uncroppedScreenshotsConfirmed ? 'X' : ' '}] Full uncropped screenshots preserved (Status bar with system time, carrier, and battery visible)
- [${evidence.rawMediaPreserved ? 'X' : ' '}] Original raw file preserved in camera roll (EXIF metadata intact; not re-forwarded)
- [${evidence.profileUrlCaptured ? 'X' : ' '}] Permanent profile URL / bio screenshot logged before blocking
- [${evidence.bsaAffidavitAcknowledged ? 'X' : ' '}] Ready for Section 63 BSA certificate filing before Cyber Crime Cell
`;
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(generateEvidenceText());
    hapticSuccess();
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2200);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Back Button */}
      {onBack && (
        <button
          onClick={() => {
            hapticAction();
            onBack();
          }}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#8B6D5C] hover:text-[#2D2D2D] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isHindi ? 'वापस मुख्य मेनू पर जाएं' : 'Return to Sanctuary'}</span>
        </button>
      )}

      {/* Header Banner */}
      <div className="bg-[#1E1949] text-white rounded-3xl p-6 sm:p-8 border border-white/15 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E1F5EE]/15 text-[#E1F5EE] text-xs font-medium border border-[#B7E4D7]/20">
          <Camera className="w-3.5 h-3.5 text-[#E1F5EE]" />
          <span>{isHindi ? 'डिजिटल साक्ष्य सुरक्षा विज़ार्ड' : 'Chain-of-Custody Evidence Preservation'}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          {isHindi ? 'अदालत व पुलिस के लिए कानूनी रूप से मान्य साक्ष्य तैयार करें' : 'Forensic Evidence Preservation Wizard'}
        </h1>

        <p className="text-sm sm:text-base text-[#D2CCE7] max-w-2xl leading-relaxed">
          {isHindi
            ? 'ब्लैकमेलर्स से घबराकर चैट डिलीट न करें और न ही तुरंत ब्लॉक करें। भारतीय साक्ष्य अधिनियम (Section 63 BSA) के तहत सही तरीके से स्क्रीनशॉट लेने पर ही पुलिस आरोपी को 24 घंटे में ट्रैक कर पाती है।'
            : 'Do not panic-delete chats or block prematurely. Under Section 63 of Bharatiya Sakshya Adhiniyam 2023, courts require untampered digital evidence showing full screen status bars, timestamps, and UPI identifiers.'}
        </p>
      </div>

      {/* Wizard Steps Indicator */}
      <div className="grid grid-cols-3 gap-2.5">
        {[
          { step: 1, title: isHindi ? '1. स्क्रीनशॉट नियम' : '1. Screenshot Rules' },
          { step: 2, title: isHindi ? '2. आरोपी की पहचान' : '2. Perpetrator IDs' },
          { step: 3, title: isHindi ? '3. साक्ष्य समरी' : '3. Dossier Summary' },
        ].map((s) => (
          <button
            key={s.step}
            onClick={() => {
              hapticAction();
              setCurrentStep(s.step);
            }}
            className={`py-3 px-3 rounded-2xl text-xs font-bold transition-all text-center border cursor-pointer ${
              currentStep === s.step
                ? 'bg-[#2D2D2D] text-white border-[#2D2D2D] shadow-xs'
                : 'bg-white text-[#666] border-[#E8E2DC] hover:bg-[#FAF9F6]'
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* STEP 1: FORENSIC SCREENSHOT MANDATES */}
      {currentStep === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E2DC] shadow-sm space-y-6"
        >
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-[#1A1A1A]">
              {isHindi ? 'कदम 1: स्क्रीनशॉट लेते समय ये 3 गलतियां न करें' : 'Step 1: The 3 Critical Rules for Admissible Screenshots'}
            </h2>
            <p className="text-xs text-[#666]">
              {isHindi ? 'कोर्ट में साक्ष्य पेश करने के लिए इन नियमों का पालन अनिवार्य है:' : 'Ensures the cyber forensic lab can verify timestamps and device authenticity.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E2DC] space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#E1F5EE] text-[#0F6E56] flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h3 className="text-sm font-bold text-[#1A1A1A]">
                {isHindi ? 'स्क्रीनशॉट कभी क्रॉप न करें' : 'Never Crop the Image'}
              </h3>
              <p className="text-xs text-[#555] leading-relaxed">
                {isHindi
                  ? 'ऊपर की स्टेटस बार (सिस्टम समय, बैटरी प्रतिशत, नेटवर्क सिग्नल) और नीचे की नेविगेशन बार हमेशा दिखनी चाहिए ताकि कोई इसे फोटोशॉप न कह सके।'
                  : 'Keep the entire phone display visible. The top status bar (showing clock, battery %, cellular carrier) proves chronological authenticity.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E2DC] space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#E1F5EE] text-[#0F6E56] flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h3 className="text-sm font-bold text-[#1A1A1A]">
                {isHindi ? 'ब्लॉक करने से पहले प्रोफाइल URL लें' : 'Capture URL Before Blocking'}
              </h3>
              <p className="text-xs text-[#555] leading-relaxed">
                {isHindi
                  ? 'ब्लॉक करने के बाद आरोपी का प्रोफाइल लिंक छिप जाता है। प्रोफाइल पर 3-डॉट्स दबाकर "Copy Profile Link" और अकाउंट का स्क्रीनशॉट पहले सुरक्षित करें।'
                  : 'Extortionists quickly change usernames or delete accounts. Always copy their permanent profile URL and unique numerical ID before hitting block.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E8E2DC] space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#E1F5EE] text-[#0F6E56] flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h3 className="text-sm font-bold text-[#1A1A1A]">
                {isHindi ? 'मूल फाइल (Original EXIF) रखें' : 'Preserve Raw Metadata'}
              </h3>
              <p className="text-xs text-[#555] leading-relaxed">
                {isHindi
                  ? 'यदि कोई फोटो फोन कैमरे से ली गई थी, तो उसे कैमरा रोल में सुरक्षित रखें। WhatsApp पर री-फॉरवर्ड करने से उसका मेटाडेटा (समय, स्थान) मिट जाता है।'
                  : 'Retain the camera roll master copy. WhatsApp/Telegram compress media and strip critical EXIF creation timestamps.'}
              </p>
            </div>
          </div>

          {/* Verification Checkboxes */}
          <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-[#E8E2DC] space-y-3">
            <label className="flex items-center gap-3 cursor-pointer text-xs sm:text-sm font-medium text-[#1A1A1A]">
              <input
                type="checkbox"
                checked={evidence.uncroppedScreenshotsConfirmed}
                onChange={(e) => updateEvidence({ uncroppedScreenshotsConfirmed: e.target.checked })}
                className="w-4 h-4 rounded text-[#0F6E56] accent-[#0F6E56]"
              />
              <span>
                {isHindi
                  ? 'मैंने अनक्रॉप्ड (समय व बैटरी बार सहित) स्क्रीनशॉट ले लिए हैं।'
                  : 'I have captured full uncropped screenshots with time and battery bars intact.'}
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer text-xs sm:text-sm font-medium text-[#1A1A1A]">
              <input
                type="checkbox"
                checked={evidence.profileUrlCaptured}
                onChange={(e) => updateEvidence({ profileUrlCaptured: e.target.checked })}
                className="w-4 h-4 rounded text-[#0F6E56] accent-[#0F6E56]"
              />
              <span>
                {isHindi
                  ? 'मैंने आरोपी का प्रोफाइल लिंक / फोन नंबर कॉपी कर लिया है।'
                  : 'I have copied the suspect\'s permanent profile link or handle.'}
              </span>
            </label>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => {
                hapticAction();
                setCurrentStep(2);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#2D2D2D] hover:bg-black text-white rounded-full text-xs font-bold transition-all cursor-pointer"
            >
              <span>{isHindi ? 'अगला: आरोपी की पहचान दर्ज करें' : 'Next: Log Suspect Details'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 2: SUSPECT IDENTIFIERS */}
      {currentStep === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E2DC] shadow-sm space-y-5"
        >
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-[#1A1A1A]">
              {isHindi ? 'कदम 2: आरोपी व जबरन वसूली की जानकारी दर्ज करें' : 'Step 2: Log Suspect Identifiers & Demands'}
            </h2>
            <p className="text-xs text-[#666]">
              {isHindi ? 'जितनी जानकारी उपलब्ध हो उतनी भरें। जो नहीं पता उसे खाली छोड़ दें।' : 'Fill whatever data points are known. These will be linked directly to your formal complaint.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                {isHindi ? 'प्लेटफ़ॉर्म जहाँ धमकी मिली:' : 'Platform Involved:'}
              </label>
              <select
                value={evidence.platform}
                onChange={(e) => updateEvidence({ platform: e.target.value })}
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-2xl border border-[#DED9D4] bg-[#FAF9F6] focus:bg-white text-[#1A1A1A] focus:outline-none"
              >
                <option value="WhatsApp">WhatsApp</option>
                <option value="Instagram">Instagram</option>
                <option value="Telegram">Telegram</option>
                <option value="Snapchat">Snapchat</option>
                <option value="Phone Call / SMS">Phone Call / SMS</option>
                <option value="Dating App (Bumble/Tinder)">Dating App (Bumble/Tinder)</option>
                <option value="Other / Unknown">Other / Unknown</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                {isHindi ? 'आरोपी का यूज़रनेम / हैंडल / प्रोफ़ाइल नाम:' : 'Suspect Handle / Profile Username:'}
              </label>
              <input
                type="text"
                value={evidence.suspectHandle}
                onChange={(e) => updateEvidence({ suspectHandle: e.target.value })}
                placeholder="@username or profile display name"
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-2xl border border-[#DED9D4] bg-[#FAF9F6] focus:bg-white text-[#1A1A1A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                {isHindi ? 'आरोपी का फ़ोन नंबर (यदि ज्ञात हो):' : 'Suspect Phone Number (if known):'}
              </label>
              <input
                type="tel"
                value={evidence.suspectPhone}
                onChange={(e) => updateEvidence({ suspectPhone: e.target.value })}
                placeholder="+91 XXXXX XXXXX"
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-2xl border border-[#DED9D4] bg-[#FAF9F6] focus:bg-white text-[#1A1A1A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                {isHindi ? 'UPI ID / बैंक खाता / क्रिप्टो वॉलेट:' : 'Extortion UPI ID / Bank Handle:'}
              </label>
              <input
                type="text"
                value={evidence.suspectUpiOrBank}
                onChange={(e) => updateEvidence({ suspectUpiOrBank: e.target.value })}
                placeholder="e.g. name@okaxis or 98XXXXXXXX@paytm"
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-2xl border border-[#DED9D4] bg-[#FAF9F6] focus:bg-white text-[#1A1A1A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                {isHindi ? 'मांगी गई राशि (रुपये में):' : 'Extortion Demand Amount:'}
              </label>
              <input
                type="text"
                value={evidence.extortionAmount}
                onChange={(e) => updateEvidence({ extortionAmount: e.target.value })}
                placeholder="₹10,000 or 'Threatening media leak'"
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-2xl border border-[#DED9D4] bg-[#FAF9F6] focus:bg-white text-[#1A1A1A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                {isHindi ? 'पहली धमकी की तारीख:' : 'First Threat Date:'}
              </label>
              <input
                type="date"
                value={evidence.firstThreatDate}
                onChange={(e) => updateEvidence({ firstThreatDate: e.target.value })}
                className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-2xl border border-[#DED9D4] bg-[#FAF9F6] focus:bg-white text-[#1A1A1A] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
              {isHindi ? 'धमकी का संक्षिप्त विवरण (उसने क्या कहा):' : 'Summary of Threat / What did perpetrator say:'}
            </label>
            <textarea
              rows={3}
              value={evidence.threatDescription}
              onChange={(e) => updateEvidence({ threatDescription: e.target.value })}
              placeholder={isHindi ? 'जैसे: 15 मिनट में 10,000 रुपये न देने पर तस्वीरें दोस्तों और परिवार को भेजने की धमकी दी...' : 'e.g. Threatened to send private video to Instagram followers if money not sent within 15 minutes...'}
              className="w-full text-xs sm:text-sm p-4 rounded-2xl border border-[#DED9D4] bg-[#FAF9F6] focus:bg-white text-[#1A1A1A] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                hapticAction();
                setCurrentStep(1);
              }}
              className="px-5 py-2.5 text-xs font-bold text-[#666] hover:text-[#111] cursor-pointer"
            >
              {isHindi ? 'पीछे' : 'Back'}
            </button>

            <button
              onClick={() => {
                hapticAction();
                setCurrentStep(3);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#2D2D2D] hover:bg-black text-white rounded-full text-xs font-bold transition-all cursor-pointer"
            >
              <span>{isHindi ? 'अगला: साक्ष्य समरी देखें' : 'Next: Review Dossier'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 3: DOSSIER REVIEW & TRANSFER TO COMPLAINT */}
      {currentStep === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E2DC] shadow-sm space-y-5"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0EBE6] pb-4">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#0F6E56]" />
                <span>{isHindi ? 'साक्ष्य समरी (धारा 63 BSA प्रारूप)' : 'Section 63 BSA Digital Evidence Summary'}</span>
              </h2>
              <p className="text-xs text-[#666]">
                {isHindi ? 'यह सारांश आपके डिवाइस की सुरक्षित सेशन मेमोरी में तैयार है।' : 'Ready to attach to your e-FIR or hand to investigating cyber officers.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopySummary}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#DED9D4] bg-[#FAF9F6] hover:bg-white text-xs font-bold text-[#2D2D2D] transition-colors cursor-pointer"
              >
                {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#8B6D5C]" />}
                <span>{copiedSummary ? (isHindi ? 'कॉपी हुआ!' : 'Copied!') : (isHindi ? 'टेक्स्ट कॉपी करें' : 'Copy Text')}</span>
              </button>
            </div>
          </div>

          {/* Formatted Evidence Box */}
          <pre className="p-4 bg-[#2D2D2D] text-white rounded-2xl text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto border border-[#222]">
            {generateEvidenceText()}
          </pre>

          {/* Transfer to Legal Complaint Action Banner */}
          <div className="p-5 bg-[#E1F5EE]/40 rounded-2xl border border-[#B7E4D7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-[#0F6E56]">
                {isHindi ? 'यह साक्ष्य सीधे कानूनी शिकायत जनरेटर में भेजें' : 'Transfer directly into Legal Complaint Generator'}
              </h4>
              <p className="text-xs text-[#2D2D2D]">
                {isHindi 
                  ? 'आपको दोबारा आरोपी का नाम, UPI आईडी या घटना की तारीख टाइप नहीं करनी पड़ेगी।' 
                  : 'Automatically populates the e-FIR draft with this suspect handle, payment info, and timeline.'}
              </p>
            </div>

            <button
              onClick={handleTransfer}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0F6E56] hover:bg-[#0b5442] text-white rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer shrink-0"
            >
              {transferred ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              <span>{transferred ? (isHindi ? 'सफलतापूर्वक भेजा गया!' : 'Transferred!') : (isHindi ? 'e-FIR जनरेटर में लोड करें' : 'Load into e-FIR Draft')}</span>
            </button>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                hapticAction();
                setCurrentStep(2);
              }}
              className="px-5 py-2.5 text-xs font-bold text-[#666] hover:text-[#111] cursor-pointer"
            >
              {isHindi ? 'पीछे' : 'Back'}
            </button>

            <div className="text-[11px] text-[#777]">
              {isHindi ? '100% ऑन-डिवाइस • कोई सर्वर अपलोड नहीं' : '100% Client-Side Session Storage'}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
