import React, { useRef, useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  X, 
  ShieldCheck, 
  AlertTriangle, 
  Lock, 
  GitBranch, 
  HeartHandshake, 
  Scale, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  PhoneCall, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { Language } from '../types';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { exportFieldGuidePDF } from '../utils/pdfExport';
import { hapticAction, hapticSuccess } from '../utils/haptics';

interface NariSurakshaFieldGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const NariSurakshaFieldGuideModal: React.FC<NariSurakshaFieldGuideModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const isHindi = language === 'hi';
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(isOpen, modalRef, '#close-field-guide-btn');

  const [activeTab, setActiveTab] = useState<'steps' | 'flowcharts' | 'technical' | 'presentation'>('steps');
  const [isExporting, setIsExporting] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDownloadPDF = async () => {
    try {
      hapticAction();
      setIsExporting(true);
      await exportFieldGuidePDF({ action: 'download_file' });
      hapticSuccess();
    } catch (e) {
      console.error('Failed to export field guide PDF', e);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    hapticAction();
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white print:static print:inset-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="field-guide-title"
    >
      <div 
        ref={modalRef}
        className="w-full max-w-4xl bg-white rounded-3xl p-4 sm:p-8 shadow-2xl border border-[#E8E2DC] space-y-5 my-auto text-[#1A1A1A] relative print:border-none print:shadow-none print:p-0 print:max-w-none print:rounded-none max-h-[92vh] flex flex-col"
      >
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0EBE6] pb-4 print:hidden shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#26215C] text-white flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="field-guide-title" className="text-base sm:text-lg font-bold text-[#1A1A1A]">
                  {isHindi ? 'कम्युनिटी फील्ड गाइड व प्रेजेंटेशन हैंडबुक' : 'Community Field Guide & Presentation Handbook'}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {isHindi ? 'PDF तैयार' : 'Print & PDF Ready'}
                </span>
              </div>
              <p className="text-xs text-[#666]">
                {isHindi 
                  ? 'महिलाओं, छात्राओं व NGO साथियों के लिए सरल व्याख्या, स्टेप्स व फ्लोचार्ट्स' 
                  : 'Plain English walkthrough, decision flowcharts & presentation script for girls, women & NGOs'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={isExporting}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#993556] hover:bg-[#802a46] text-white rounded-full font-bold text-xs transition-all active:scale-95 cursor-pointer shadow-xs min-h-[40px] focus-visible:ring-2 focus-visible:ring-[#993556] focus-visible:outline-none disabled:opacity-60"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? (isHindi ? 'PDF बन रही है...' : 'Generating PDF...') : (isHindi ? 'डाउनलोड PDF' : 'Download PDF')}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#FAF8F3] hover:bg-[#F3EFEA] text-[#26215C] border border-[#E8E2DC] rounded-full font-semibold text-xs transition-all active:scale-95 cursor-pointer min-h-[40px] focus-visible:ring-2 focus-visible:ring-[#26215C] focus-visible:outline-none"
            >
              <Printer className="w-4 h-4 text-[#26215C]" />
              <span className="hidden sm:inline">{isHindi ? 'प्रिंट व्यू' : 'Print View'}</span>
            </button>

            <button
              id="close-field-guide-btn"
              type="button"
              onClick={onClose}
              aria-label={isHindi ? 'बंद करें' : 'Close modal'}
              className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full hover:bg-[#F3EFEC] text-[#666] hover:text-[#111] transition-colors focus-visible:ring-2 focus-visible:ring-[#26215C] focus-visible:outline-none cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs (Hidden during print) */}
        <div className="flex items-center gap-1.5 border-b border-[#F0EBE6] pb-2 overflow-x-auto no-scrollbar shrink-0 print:hidden">
          {[
            { id: 'steps', label: isHindi ? '1. स्टेप्स व नियम' : '1. Core Steps & Rules', icon: ShieldCheck },
            { id: 'flowcharts', label: isHindi ? '2. फ्लोचार्ट्स व रास्ते' : '2. Decision Flowcharts', icon: GitBranch },
            { id: 'technical', label: isHindi ? '3. प्राइवेसी व तकनीक' : '3. Privacy & Technical', icon: Lock },
            { id: 'presentation', label: isHindi ? '4. प्रेजेंटेशन व स्क्रिप्ट' : '4. Presentation & NGOs', icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  hapticAction();
                  setActiveTab(tab.id as any);
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-[#26215C] text-white shadow-xs' 
                    : 'bg-[#FAF8F3] text-[#555] hover:bg-[#F3EFEA]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto pr-1 space-y-6 text-[#2D2D2D] leading-relaxed text-xs sm:text-sm grow">
          
          {/* TAB 1: CORE STEPS & GOLDEN RULES */}
          {(activeTab === 'steps' || false) && (
            <div className="space-y-5">
              {/* High-level human reassurance */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F3] border border-[#E8E2DC] space-y-2">
                <div className="flex items-center gap-2 text-[#993556] font-bold text-xs sm:text-sm uppercase tracking-wide">
                  <Sparkles className="w-4 h-4" />
                  <span>The Unshakable Truth (What Every Girl Must Hear)</span>
                </div>
                <p className="text-[#1A1A1A] font-semibold text-sm sm:text-base">
                  "If someone threatens you with your private pictures, your life is NOT over. You did nothing wrong. You are not alone, and there is a safe, zero-shame way out of this."
                </p>
                <p className="text-xs text-[#555]">
                  Extortionists succeed only when victims are isolated and in a state of panic. Once you know the rules and technology, their leverage disappears completely.
                </p>
              </div>

              {/* The 3 Golden Rules */}
              <div className="space-y-3">
                <h3 className="text-xs sm:text-sm font-bold text-[#1A1A1A] uppercase tracking-wider text-[#26215C]">
                  The 3 Golden Rules of Cyber Rescue:
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200/80 space-y-1.5">
                    <div className="flex items-center gap-2 text-rose-800 font-bold text-xs">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                      <span>RULE 1: NEVER PAY</span>
                    </div>
                    <p className="text-xs text-rose-950 font-medium">
                      Paying never deletes photos. 97% of victims who pay are extorted again within 48 hours for even more money. Refusing to pay breaks their business model.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1.5">
                    <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                      <Lock className="w-4 h-4 shrink-0 text-amber-700" />
                      <span>RULE 2: DON'T BLOCK YET</span>
                    </div>
                    <p className="text-xs text-amber-950 font-medium">
                      Do not immediately block or delete chats. Capture full-screen screenshots first (with status bar, time, dates, UPI IDs, and profile URLs) for police evidence.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-1.5">
                    <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
                      <Scale className="w-4 h-4 shrink-0 text-emerald-700" />
                      <span>RULE 3: LAW PROTECTS YOU</span>
                    </div>
                    <p className="text-xs text-emerald-950 font-medium">
                      Under Section 73 BNS 2023, publishing a victim's name is a 2-year criminal offense. Under BNSS 173, your statement must be recorded privately by a female police officer.
                    </p>
                  </div>
                </div>
              </div>

              {/* How NariSuraksha Works Step-by-Step */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs sm:text-sm font-bold text-[#1A1A1A] uppercase tracking-wider text-[#26215C]">
                  How to Use NariSuraksha (Step-by-Step Walkthrough):
                </h3>
                <div className="space-y-2.5">
                  {[
                    {
                      step: 'Step 1: Open the Site Discreetly',
                      detail: 'No account, login, or phone number required. The site runs 100% locally on your phone or laptop. Nothing leaves your browser.'
                    },
                    {
                      step: 'Step 2: Emergency Disguise (If Anyone Enters the Room)',
                      detail: 'Press ESC on desktop or swipe across the screen with 3 fingers on mobile. The screen instantly becomes a realistic UPSC Study Notes page. Browser back button is safely trapped!'
                    },
                    {
                      step: 'Step 3: Immediate Crisis Stepper ("Rescue")',
                      detail: 'Walks you through calming breathing, collecting evidence without alerting the blackmailer, and refusing illicit demands using proven de-escalation scripts.'
                    },
                    {
                      step: 'Step 4: Image Takedown Portal ("Takedown")',
                      detail: 'Direct guidance on registering with StopNCII.org. Converts your image into a mathematical hash on your device so platforms block it before it can be uploaded.'
                    },
                    {
                      step: 'Step 5: File Legal Protection ("e-FIR")',
                      detail: 'Generates a formal, court-ready police complaint draft formatted under BNS & IT Act sections without revealing your identity on the web.'
                    },
                    {
                      step: 'Step 6: Purge All Traces ("Purge")',
                      detail: 'When you are done, one tap wipes all session drafts, cache, and clipboard data so no one using your device can tell you visited this site.'
                    }
                  ].map((s, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF9F6] border border-[#E8E2DC]">
                      <div className="w-6 h-6 rounded-full bg-[#26215C] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-[#1A1A1A]">{s.step}</h4>
                        <p className="text-xs text-[#555] mt-0.5">{s.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VISUAL FLOWCHARTS */}
          {(activeTab === 'flowcharts' || false) && (
            <div className="space-y-5">
              <p className="text-xs text-[#666]">
                These decision trees map out the exact paths a woman, counselor, or volunteer should follow in different crisis scenarios.
              </p>

              {/* Flowchart 1: Extortion Countdown */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E8E2DC] space-y-3">
                <div className="flex items-center gap-2 text-[#993556] font-bold text-xs uppercase tracking-wider">
                  <GitBranch className="w-4 h-4" />
                  <span>Flowchart 1: The 60-Minute Extortion Countdown Flow</span>
                </div>
                <div className="bg-[#FAF8F3] p-3 sm:p-4 rounded-xl border border-[#E8E2DC] font-mono text-[11px] sm:text-xs text-[#333] space-y-2 overflow-x-auto">
                  <p className="font-bold text-[#993556]">[Perpetrator sends countdown threat / photo demand]</p>
                  <p>│</p>
                  <p>▼ <strong>1. STOP: DO NOT PAY</strong> (Paying guarantees repeated extortion within 48h)</p>
                  <p>│</p>
                  <p>▼ <strong>2. DO NOT BLOCK IMMEDIATELY</strong> (Preserve evidentiary logs first)</p>
                  <p>│</p>
                  <p>▼ <strong>3. CAPTURE EVIDENCE</strong> (Full screen, battery % visible, timestamps, UPI ID)</p>
                  <p>│</p>
                  <p>▼ <strong>4. STOPNCII TAKEDOWN</strong> (Register mathematical hash to block uploads)</p>
                  <p>│</p>
                  <p>▼ <strong>5. REPORT</strong> (Call National Helpline 1930 / cybercrime.gov.in e-FIR)</p>
                </div>
              </div>

              {/* Flowchart 2: StopNCII Image Hash Flow */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E8E2DC] space-y-3">
                <div className="flex items-center gap-2 text-[#0F6E56] font-bold text-xs uppercase tracking-wider">
                  <Lock className="w-4 h-4" />
                  <span>Flowchart 2: StopNCII Image Takedown Flow (Zero Photos Uploaded)</span>
                </div>
                <div className="bg-[#FAF8F3] p-3 sm:p-4 rounded-xl border border-[#E8E2DC] font-mono text-[11px] sm:text-xs text-[#333] space-y-2 overflow-x-auto">
                  <p className="font-bold text-[#0F6E56]">[Intimate photo in wrong hands / threat to circulate]</p>
                  <p>│</p>
                  <p>▼ <strong>1. Open StopNCII via NariSuraksha</strong> (Runs inside phone browser)</p>
                  <p>│</p>
                  <p>▼ <strong>2. Device computes Perceptual Hash</strong> (Converts image to 64-char math code)</p>
                  <p>│    └── <em>CRITICAL: RAW PHOTO NEVER LEAVES PHONE. NO HUMAN EVER SEES IT.</em></p>
                  <p>│</p>
                  <p>▼ <strong>3. Hash shared with Tech Hash Bank</strong> (Meta, Instagram, Facebook, OnlyFans)</p>
                  <p>│</p>
                  <p>▼ <strong>4. Cross-Platform Auto Block</strong> (If blackmailer tries to post, it's blocked instantly)</p>
                </div>
              </div>

              {/* Flowchart 3: Legal Rights & Police Reporting */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E8E2DC] space-y-3">
                <div className="flex items-center gap-2 text-[#26215C] font-bold text-xs uppercase tracking-wider">
                  <Scale className="w-4 h-4" />
                  <span>Flowchart 3: Zero-Shame Legal Reporting Flow (BNSS 173)</span>
                </div>
                <div className="bg-[#FAF8F3] p-3 sm:p-4 rounded-xl border border-[#E8E2DC] font-mono text-[11px] sm:text-xs text-[#333] space-y-2 overflow-x-auto">
                  <p className="font-bold text-[#26215C]">[Ready to file formal complaint]</p>
                  <p>│</p>
                  <p>├── <strong>Route A: Dial 1930</strong> (Immediate cyber police dispatch & financial freeze)</p>
                  <p>├── <strong>Route B: cybercrime.gov.in</strong> (File anonymous/confidential women e-FIR)</p>
                  <p>└── <strong>Route C: Women Police Station</strong> (In-person complaint with Section 63 BSA proof)</p>
                  <p>│</p>
                  <p>▼ <strong>STATUTORY PRIVACY GUARANTEED:</strong></p>
                  <p>• Under Section 73 BNS: Offense to disclose victim's identity (2 yrs jail)</p>
                  <p>• Under BNSS 173: Statement recorded in private by a female officer</p>
                  <p>• Police cannot notify college or family against victim's explicit consent</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TECHNICAL PRIVACY IN PLAIN ENGLISH */}
          {(activeTab === 'technical' || false) && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-1.5">
                <div className="flex items-center gap-2 text-[#0F6E56] font-bold text-xs uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Zero-Server Architecture: Why Nothing Can Leak</span>
                </div>
                <p className="text-xs text-emerald-950 leading-relaxed">
                  Most websites send your inputs to a central database on a server. NariSuraksha is built with a <strong>Zero-Server Architecture</strong>. Everything runs 100% inside your browser's temporary memory. There are no user accounts, no passwords, no analytics trackers, and no log files.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs sm:text-sm font-bold text-[#1A1A1A] uppercase tracking-wider text-[#26215C]">
                  Technical Concepts Explained for Non-Technical Audiences:
                </h3>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E2DC] space-y-1">
                    <h4 className="font-bold text-xs text-[#26215C]">1. What is "Perceptual Hashing"?</h4>
                    <p className="text-xs text-[#555]">
                      Instead of uploading your photo, modern anti-NCII tools use mathematical formulas to calculate a unique 64-character fingerprint of the image on your phone. Even if the blackmailer crops, compresses, or resizes the photo, social media platforms recognize the math fingerprint and block the upload without ever seeing the original photo.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E2DC] space-y-1">
                    <h4 className="font-bold text-xs text-[#26215C]">2. How does the "Emergency Disguise" work?</h4>
                    <p className="text-xs text-[#555]">
                      Hitting ESC on a computer or swiping with 3 fingers on mobile immediately swaps the UI with an academic revision page ("UPSC Notes & Schedule"). It also pushes dummy browser history states. If someone grabs your device and presses Back, they stay on the study notes page instead of revealing the crisis portal.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E2DC] space-y-1">
                    <h4 className="font-bold text-xs text-[#26215C]">3. How does "One-Click Footprint Purging" work?</h4>
                    <p className="text-xs text-[#555]">
                      When you tap "Purge", the application triggers a comprehensive memory flush: it clears localStorage, in-memory React state, clipboard buffers, and prompts history clearing. This ensures that shared phones, hostel Wi-Fi devices, or public computers have zero record of your session.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E2DC] space-y-1">
                    <h4 className="font-bold text-xs text-[#26215C]">4. How are e-FIR PDF drafts created without a server?</h4>
                    <p className="text-xs text-[#555]">
                      The legal documents are constructed directly inside the browser using client-side JavaScript (`jsPDF`). Your names, statements, and incident notes are compiled into a PDF blob directly on your hardware and downloaded to your device with neutral filenames (e.g. `notes_2026.pdf`).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: NGO & WORKSHOP PRESENTATION GUIDE */}
          {(activeTab === 'presentation' || false) && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E2DC] space-y-2">
                <div className="flex items-center gap-2 text-[#993556] font-bold text-xs uppercase">
                  <Users className="w-4 h-4" />
                  <span>5-Minute Presentation Script for Colleges, Hostels & NGOs</span>
                </div>
                <p className="text-xs text-[#555] italic">
                  (Read this script during student orientations, hostel meetings, or community awareness drives):
                </p>
                <div className="p-3 bg-white rounded-xl border border-[#E8E2DC] text-xs text-[#222] space-y-2 leading-relaxed">
                  <p>
                    "Hello everyone. Today, let’s talk about something that happens to thousands of smart, sensible young women across India every single week: digital extortion and blackmail."
                  </p>
                  <p>
                    "When a blackmailer threatens to send intimate pictures to your parents or college, the immediate feeling is sheer panic: <em>'My life is over. I will be ruined.'</em>"
                  </p>
                  <p>
                    "We are here to tell you three crucial things: <strong>First</strong>, you did nothing wrong. Betraying trust is a crime; trusting someone was not. <strong>Second</strong>, never send a single rupee. Paying never stops extortion. <strong>Third</strong>, Indian law strictly protects your anonymity under Section 73 BNS, and statement recording by female officers is mandatory under BNSS 173."
                  </p>
                  <p>
                    "To support you, keep <strong>NariSuraksha</strong> bookmarked. It runs 100% on your phone without servers, has a 3-finger swipe stealth disguise, and guides you step-by-step through image takedown via StopNCII and legal reporting to 1930."
                  </p>
                  <p className="font-bold text-[#26215C]">
                    "Remember this number: 1930 for Cybercrime, 112 for Police. You are never alone."
                  </p>
                </div>
              </div>

              {/* Verified All-India Helplines Summary */}
              <div className="space-y-2.5">
                <h3 className="text-xs sm:text-sm font-bold text-[#1A1A1A] uppercase tracking-wider text-[#26215C]">
                  Essential All-India Emergency Contacts:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-white border border-[#E8E2DC] flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#993556]">1930</span>
                      <p className="text-[11px] text-[#666]">National Cybercrime Helpline (24x7)</p>
                    </div>
                    <PhoneCall className="w-4 h-4 text-[#993556]" />
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-[#E8E2DC] flex items-center justify-between">
                    <div>
                      <span className="font-bold text-rose-700">112</span>
                      <p className="text-[11px] text-[#666]">National Emergency & Police Response</p>
                    </div>
                    <PhoneCall className="w-4 h-4 text-rose-700" />
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-[#E8E2DC] flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#26215C]">1091 / 181</span>
                      <p className="text-[11px] text-[#666]">Women Helpline & Safety Desks</p>
                    </div>
                    <PhoneCall className="w-4 h-4 text-[#26215C]" />
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-[#E8E2DC] flex items-center justify-between">
                    <div>
                      <span className="font-bold text-teal-700">14416 (Tele-MANAS)</span>
                      <p className="text-[11px] text-[#666]">Government Mental Health Counseling</p>
                    </div>
                    <PhoneCall className="w-4 h-4 text-teal-700" />
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer (Action Buttons) */}
        <div className="pt-3 border-t border-[#F0EBE6] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 print:hidden">
          <div className="text-[11px] text-[#666]">
            {isHindi ? 'दस्तावेज़: docs/NARISURAKSHA_COMMUNITY_FIELD_GUIDE.md' : 'Complete offline manual available in repository: docs/NARISURAKSHA_COMMUNITY_FIELD_GUIDE.md'}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={isExporting}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#26215C] hover:bg-[#1C1844] text-white rounded-full font-bold text-xs transition-transform active:scale-95 cursor-pointer shadow-xs min-h-[38px] disabled:opacity-60"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? (isHindi ? 'PDF तैयार हो रही है...' : 'Downloading PDF...') : (isHindi ? 'PDF गाइड डाउनलोड करें' : 'Download Complete PDF Guide')}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-[#E8E2DC] bg-[#FAF8F3] hover:bg-[#F3EFEA] text-[#1A1A1A] font-semibold text-xs transition-colors cursor-pointer min-h-[38px]"
            >
              {isHindi ? 'बंद करें' : 'Close'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
