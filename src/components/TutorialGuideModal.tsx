import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  X, 
  ShieldCheck, 
  PhoneCall, 
  AlertTriangle, 
  Check, 
  Copy, 
  Layers, 
  MessageSquare, 
  Scale, 
  Clock, 
  Lock, 
  HeartHandshake,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Language } from '../types';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { hapticAction, hapticSuccess } from '../utils/haptics';
import { exportTutorialGuidePDF } from '../utils/pdfExport';

interface TutorialGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onNavigateToTab?: (tab: string, elementId?: string) => void;
}

export const TutorialGuideModal: React.FC<TutorialGuideModalProps> = ({
  isOpen,
  onClose,
  language,
  onNavigateToTab,
}) => {
  const isHindi = language === 'hi';
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(isOpen, modalRef, '#close-tutorial-modal-btn');

  const [activeSection, setActiveSection] = useState<'how_to_use' | 'flowchart' | 'scripts' | 'legal'>('how_to_use');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    hapticSuccess();
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownloadPDF = async () => {
    hapticAction();
    setIsExporting(true);
    try {
      await exportTutorialGuidePDF(language, { action: 'download_file' });
    } catch (e) {
      console.error('Error generating guide PDF', e);
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
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white print:static print:inset-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tutorial-modal-title"
    >
      <div 
        ref={modalRef}
        className="w-full max-w-4xl bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border border-[#E8E2DC] space-y-5 my-auto text-[#1A1A1A] relative max-h-[92vh] flex flex-col print:border-none print:shadow-none print:p-0 print:max-w-none print:rounded-none"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-[#F0EBE6] pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F3EFEC] text-[#8B6D5C] flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 id="tutorial-modal-title" className="text-base sm:text-lg font-bold text-[#1A1A1A]">
                {isHindi ? 'पोर्टल उपयोग गाइड व संकट समाधान ट्यूटोरियल' : "How to Use This Portal: Women's Emergency Tutorial Guide"}
              </h2>
              <p className="text-xs text-[#666]">
                {isHindi 
                  ? 'सरल मानवीय भाषा में समझें: ब्लैकमेलिंग रोकना, साक्ष्य जुटाना, स्क्रिप्ट्स और पीडीएफ गाइड' 
                  : 'In gentle, clear human words: stop extortion, preserve evidence, communication scripts, and PDF guide'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={isExporting}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-[#26215C] text-white hover:bg-[#1C1844] text-xs font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
              title={isHindi ? 'गाइड पीडीएफ डाउनलोड करें' : 'Download Complete Tutorial PDF'}
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {isExporting ? (isHindi ? 'तैयार हो रहा...' : 'Generating...') : (isHindi ? 'डाउनलोड PDF' : 'Download Guide PDF')}
              </span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="p-2 rounded-xl border border-[#E8E2DC] text-[#555] hover:bg-[#FAF9F6] transition-colors cursor-pointer hidden sm:inline-flex"
              title={isHindi ? 'प्रिंट करें' : 'Print Guide'}
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              id="close-tutorial-modal-btn"
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl border border-[#E8E2DC] text-[#777] hover:bg-[#FAF9F6] transition-colors cursor-pointer"
              aria-label={isHindi ? 'बंद करें' : 'Close tutorial modal'}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs (hidden in print) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 shrink-0 scrollbar-none print:hidden border-b border-[#F0EBE6]">
          {[
            { id: 'how_to_use', label: isHindi ? '1. पोर्टल कैसे इस्तेमाल करें' : '1. How to Use Portal', icon: Sparkles },
            { id: 'flowchart', label: isHindi ? '2. संकट टाइमलाइन फ्लोचार्ट' : '2. Crisis Timeline Flowchart', icon: Layers },
            { id: 'scripts', label: isHindi ? '3. तैयार संदेश (स्क्रिप्ट्स)' : '3. Communication Scripts', icon: MessageSquare },
            { id: 'legal', label: isHindi ? '4. कानूनी सुरक्षा व हेल्पलाइन' : '4. Legal Rights & Helplines', icon: Scale },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  hapticAction();
                  setActiveSection(tab.id as any);
                }}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  active 
                    ? 'bg-[#993556] text-white shadow-xs' 
                    : 'text-[#555] hover:bg-[#FAF9F6] hover:text-[#1A1A1A]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto space-y-6 pr-1 text-xs sm:text-sm text-[#333] leading-relaxed">
          
          {/* TAB 1: HOW TO USE THE PORTAL */}
          {(activeSection === 'how_to_use' || window.matchMedia?.('print')?.matches) && (
            <div className="space-y-4">
              {/* Grounding Message in Human Tone */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F3] border border-[#E8E2DC] space-y-2">
                <div className="flex items-center gap-2 text-[#993556] font-bold text-xs uppercase tracking-wider">
                  <HeartHandshake className="w-4 h-4" />
                  <span>{isHindi ? 'आप सुरक्षित हैं — पहले एक गहरी सांस लें' : 'You Are Safe — Take a Gentle Breath First'}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#444]">
                  {isHindi
                    ? 'ब्लैकमेलर्स का सबसे बड़ा हथियार घबराहट और शर्मिंदगी है। आपने कोई अपराध नहीं किया है। इस पोर्टल को इसलिए बनाया गया है ताकि आपको किसी के सामने हाथ न जोड़ना पड़े और आप अपने मोबाइल से ही सुरक्षित, कानूनी और तकनीकी रूप से ब्लैकमेलर को पूरी तरह निष्प्रभावी कर सकें।'
                    : 'Blackmailers rely entirely on panic, urgency, and manufactured shame. You did nothing wrong. This portal was designed so you do not have to beg or negotiate. From this device alone, you have the full backing of law, automated takedown technology, and zero-telemetry privacy.'}
                </p>
              </div>

              {/* The 4 Main Hubs Explained */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl bg-white border border-[#E8E2DC] space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#26215C]">
                    <ShieldCheck className="w-4 h-4 text-[#0F6E56]" />
                    <span>{isHindi ? 'हब 1: त्वरित रेस्क्यू (Triage)' : 'Hub 1: Quick Rescue Stepper'}</span>
                  </div>
                  <p className="text-xs text-[#666]">
                    {isHindi
                      ? 'यदि ब्लैकमेलर अभी ऑनलाइन है और उल्टी गिनती (काउंटडाउन) कर रहा है, तो रेस्क्यू टैब में जाएं। यह आपको मिनट-दर-मिनट बताता है कि क्या करना है और क्या कतई नहीं करना।'
                      : 'If the blackmailer is active right now giving a countdown, start here. It guides you minute-by-minute on freezing payment, staying grounded, and neutralizing urgency.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#E8E2DC] space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#26215C]">
                    <Lock className="w-4 h-4 text-[#993556]" />
                    <span>{isHindi ? 'हब 2: डिजिटल टेकडाउन व साक्ष्य' : 'Hub 2: Digital Takedowns (StopNCII)'}</span>
                  </div>
                  <p className="text-xs text-[#666]">
                    {isHindi
                      ? 'तस्वीरें इंटरनेट पर फैलने से पहले StopNCII.org की तकनीक से ब्लॉक करें। फोटो आपके फोन से कभी बाहर नहीं जाती—केवल एक सुरक्षित गणितीय कोड (Hash) प्लेटफॉर्म्स को भेजा जाता है।'
                      : 'Create cryptographic hashes on device through StopNCII to pre-emptively block photo uploads across Meta, Instagram, OnlyFans, and TikTok without ever sharing raw images.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#E8E2DC] space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#26215C]">
                    <Scale className="w-4 h-4 text-[#8B6D5C]" />
                    <span>{isHindi ? 'हब 3: कानूनी शिकायत ड्राफ्ट (e-FIR)' : 'Hub 3: Police & Cyber e-FIR Generator'}</span>
                  </div>
                  <p className="text-xs text-[#666]">
                    {isHindi
                      ? 'भारतीय न्याय संहिता (BNS 2023) और आईटी एक्ट की सख्त धाराओं के तहत थानेदार और राष्ट्रीय साइबर पोर्टल के लिए 1 मिनट में कानूनी पत्र तैयार करें।'
                      : 'Generate formal court-ready complaint drafts citing exact sections (Sec 73, 77, 308 BNS & 67A IT Act). Ready to submit at cybercrime.gov.in or your local police station.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#E8E2DC] space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#26215C]">
                    <Sparkles className="w-4 h-4 text-[#26215C]" />
                    <span>{isHindi ? 'हब 4: मनोवैज्ञानिक सहारा व साहस' : 'Hub 4: Grounding & Verified Helplines'}</span>
                  </div>
                  <p className="text-xs text-[#666]">
                    {isHindi
                      ? 'सोमैटिक ब्रीदिंग गाइड, 24/7 सुरक्षित टोल-फ्री हेल्पलाइन (1930, 112, 7827170170), और परिवार या दोस्तों से बात करने के लिए तैयार संदेश।'
                      : 'Somatic box breathing exercises, trusted helplines (1930, 112, NCW 7827170170), and words to confide in loved ones without fear of blame.'}
                  </p>
                </div>
              </div>

              {/* Stealth Camouflage Quick Tip */}
              <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E8E2DC] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#8B6D5C]">{isHindi ? 'सुरक्षा टिप:' : 'Stealth Protection:'}</span>
                  <span className="text-[#555]">
                    {isHindi 
                      ? 'मोबाइल पर 3 उंगलियों से स्वाइप करें या कंप्यूटर पर ESC दबाएं — स्क्रीन तुरंत UPSC स्टडी नोट्स में बदल जाएगी।' 
                      : 'Swipe with 3 fingers on mobile or press ESC on desktop — screen instantly disguises as UPSC study notes.'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CRISIS TIMELINE FLOWCHART */}
          {(activeSection === 'flowchart' || window.matchMedia?.('print')?.matches) && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-[#1A1A1A]">
                  {isHindi ? 'चरणबद्ध संकट समाधान प्रवाह (Flowchart)' : 'Step-by-Step Crisis Action Flowchart'}
                </h3>
                <span className="text-xs text-[#85819C] font-medium">
                  {isHindi ? 'समय सीमा अनुसार' : 'Time-Critical Sequence'}
                </span>
              </div>

              <div className="space-y-3">
                {[
                  {
                    step: '1',
                    phase: isHindi ? 'मिनट 0 - 5' : 'Minute 0 - 5',
                    title: isHindi ? 'तुरंत भुगतान रोकें और घबराहट शांत करें' : 'Freeze Payment & Pause All Panic',
                    desc: isHindi 
                      ? 'ब्लैकमेलर को कभी 1 रुपया भी न भेजें। पैसे देने पर मांग दोगुनी हो जाती है। बातचीत में कोई विनती या गिड़गिड़ाहट न करें। स्क्रीनशॉट लेने तक चैट डिलीट न करें।' 
                      : 'Never pay any ransom. Paying confirms your fear and guarantees repeated extortion. Do not plead. Do not delete chats before preserving proof.',
                    tag: isHindi ? 'अति महत्वपूर्ण' : 'Critical Rule',
                    tagColor: 'bg-red-50 text-red-700 border-red-200'
                  },
                  {
                    step: '2',
                    phase: isHindi ? 'मिनट 5 - 15' : 'Minute 5 - 15',
                    title: isHindi ? 'साक्ष्य सुरक्षित करें (Screenshots with URLs)' : 'Preserve Digital Evidence with Timestamps',
                    desc: isHindi 
                      ? 'ब्लैकमेलर की प्रोफाइल आईडी, यूजरनेम, फोन नंबर, यूपीआई आईडी और धमकी भरे संदेशों का पूरा स्क्रीनशॉट लें। स्क्रीनशॉट में तारीख व समय दिखना अनिवार्य है।' 
                      : 'Capture full screens showing the perpetrator’s username, profile URL, phone number, payment QR/UPI, and threats. Ensure device clock and status bar are visible.',
                    tag: isHindi ? 'कानूनी सबूत' : 'Legal Evidence',
                    tagColor: 'bg-amber-50 text-amber-800 border-amber-200'
                  },
                  {
                    step: '3',
                    phase: isHindi ? 'मिनट 15 - 30' : 'Minute 15 - 30',
                    title: isHindi ? 'StopNCII.org पर डिजिटल हैश बनाएं' : 'Pre-Emptive Digital Hash Takedown',
                    desc: isHindi 
                      ? 'टेकडाउन टैब में StopNCII का उपयोग करें। यह आपकी डिवाइस पर ही तस्वीरों का 256-बिट सुरक्षित हैश बनाता है। सोशल मीडिया प्लेटफॉर्म्स इस हैश को अपलोड होने से रोक देते हैं।' 
                      : 'Use StopNCII.org via the Takedown tab. Generate client-side mathematical fingerprints of threatened photos. Platforms block anyone from uploading them anywhere.',
                    tag: isHindi ? '100% गोपनीय' : 'Zero-Upload Hash',
                    tagColor: 'bg-teal-50 text-teal-800 border-teal-200'
                  },
                  {
                    step: '4',
                    phase: isHindi ? 'घंटे 1 - 24' : 'Hours 1 - 24',
                    title: isHindi ? '1930 पर कॉल करें और e-FIR दर्ज कराएं' : 'Report to National Cyber Portal (1930 / cybercrime.gov.in)',
                    desc: isHindi 
                      ? 'राष्ट्रीय साइबर हेल्पलाइन 1930 पर कॉल करें। हमारे पोर्टल के ड्राफ्ट जेनरेटर से पत्र कॉपी करें। धारा 73 BNS के तहत आपकी पहचान सार्वजनिक करना कानूनी जुर्म है।' 
                      : 'Call National Cyber Helpline 1930 or file on cybercrime.gov.in. Use our pre-formatted legal complaint draft. Sec 73 BNS strictly guarantees your anonymity.',
                    tag: isHindi ? 'कानूनी सुरक्षा' : 'Statutory FIR',
                    tagColor: 'bg-purple-50 text-purple-800 border-purple-200'
                  }
                ].map((item) => (
                  <div key={item.step} className="p-4 rounded-2xl bg-white border border-[#E8E2DC] flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-[#26215C] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {item.step}
                    </div>
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-xs font-bold text-[#8B6D5C] uppercase tracking-wider">{item.phase}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.tagColor}`}>
                          {item.tag}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-[#1A1A1A]">{item.title}</h4>
                      <p className="text-xs text-[#555] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: COMMUNICATION SCRIPTS */}
          {(activeSection === 'scripts' || window.matchMedia?.('print')?.matches) && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-[#1A1A1A]">
                  {isHindi ? 'तैयार कानूनी व पारिवारिक संदेश (रेडी-टू-सेंड)' : 'Ready-to-Use Communication Scripts'}
                </h3>
                <span className="text-xs text-[#85819C]">
                  {isHindi ? 'क्लिक करके कॉपी करें' : 'Click to copy text'}
                </span>
              </div>

              {/* Script 1: To Blackmailer */}
              <div className="p-4 rounded-2xl bg-[#FFFBFB] border border-[#F3D5D5] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-red-700 uppercase tracking-wider">
                    {isHindi ? 'स्क्रिप्ट 1: ब्लैकमेलर को भेजने हेतु (एक बार भेजकर म्यूट/ब्लॉक करें)' : 'Script 1: Message to the Blackmailer (Send once, then mute/block)'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(
                      isHindi
                        ? 'मैंने आपके सभी संदेशों, प्रोफाइल आईडी, फोन नंबर और लेन-देन के विवरण को कानूनी साक्ष्य के रूप में सुरक्षित कर लिया है। यह मामला भारतीय न्याय संहिता (BNS) की धारा 73, 77, 308 (जबरन वसूली) और आईटी एक्ट की धारा 67A के तहत राष्ट्रीय साइबर क्राइम पोर्टल (1930 / cybercrime.gov.in) को सौंप दिया गया है। मैं आपको एक भी रुपया नहीं दूंगी। आपका कोई भी अगला संदेश या कॉल सीधे एफआईआर में पूरक साक्ष्य के रूप में जोड़ा जाएगा।'
                        : 'I have preserved all your messages, profile IDs, phone numbers, and payment demands as legal digital evidence. The matter has been formally reported to the National Cyber Crime Portal (1930 / cybercrime.gov.in) under BNS Sections 73, 77, 308 (extortion) and IT Act Section 67A. I will not pay a single rupee. Any further attempt to contact me or anyone known to me will be added directly to the criminal FIR.',
                      'script_blackmailer'
                    )}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#E8E2DC] text-[11px] font-semibold text-[#555] hover:bg-[#FAF9F6] transition-colors cursor-pointer"
                  >
                    {copiedId === 'script_blackmailer' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === 'script_blackmailer' ? (isHindi ? 'कॉपी हो गया' : 'Copied') : (isHindi ? 'कॉपी करें' : 'Copy')}</span>
                  </button>
                </div>
                <p className="p-3 rounded-xl bg-white text-xs text-[#333] border border-[#F3D5D5] italic leading-relaxed">
                  {isHindi
                    ? '"मैंने आपके सभी संदेशों, प्रोफाइल आईडी, फोन नंबर और लेन-देन के विवरण को कानूनी साक्ष्य के रूप में सुरक्षित कर लिया है। यह मामला भारतीय न्याय संहिता (BNS) की धारा 73, 77, 308 (जबरन वसूली) और आईटी एक्ट की धारा 67A के तहत राष्ट्रीय साइबर क्राइम पोर्टल (1930 / cybercrime.gov.in) को सौंप दिया गया है। मैं आपको एक भी रुपया नहीं दूंगी। आपका कोई भी अगला संदेश या कॉल सीधे एफआईआर में पूरक साक्ष्य के रूप में जोड़ा जाएगा।"'
                    : '"I have preserved all your messages, profile IDs, phone numbers, and payment demands as legal digital evidence. The matter has been formally reported to the National Cyber Crime Portal (1930 / cybercrime.gov.in) under BNS Sections 73, 77, 308 (extortion) and IT Act Section 67A. I will not pay a single rupee. Any further attempt to contact me or anyone known to me will be added directly to the criminal FIR."'}
                </p>
              </div>

              {/* Script 2: To Parents */}
              <div className="p-4 rounded-2xl bg-[#F6FAF8] border border-[#CCE3D8] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0F6E56] uppercase tracking-wider">
                    {isHindi ? 'स्क्रिप्ट 2: माता-पिता / बड़े भाई-बहन को पहले से बताने का संदेश' : 'Script 2: Pre-Emptive Disclosure to Parents / Elder Sibling'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(
                      isHindi
                        ? 'मम्मी/पापा, मुझे आपसे एक ज़रूरी बात करनी है। एक ऑनलाइन धोखेबाज/साइबर अपराधी ने मेरी कुछ निजी तस्वीरों का गलत इस्तेमाल / मॉर्फिंग कर मुझे ब्लैकमेल करके पैसों की मांग की है और डराने की कोशिश कर रहा है। मैंने कोई गलती नहीं की है। मैंने साइबर हेल्पलाइन (1930) और साइबर क्राइम पोर्टल पर कानूनी प्रक्रिया शुरू कर दी है। वकीलों और पुलिस का सख्त निर्देश है कि ब्लैकमेलर को एक भी पैसा न दिया जाए। मैं चाहती थी कि यह बात आपको सीधे मुझसे पता चले ताकि हम मिलकर कानूनी रूप से इसका सामना कर सकें। मुझे इस समय आपके साथ और भरोसे की ज़रूरत है।'
                        : 'Mom/Dad, I need to talk to you about something important. An online scammer/hacker has obtained/manipulated some personal private images and is trying to extort money from me by threatening to share them. I have not done anything wrong, and I have already preserved the evidence and consulted the National Cyber Crime Portal (1930 / cybercrime.gov.in). Legal experts and cyber police have advised me not to pay a single rupee. I wanted you to hear this directly from me so we can handle this legally and firmly together. Please stand by me.',
                      'script_parents'
                    )}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#E8E2DC] text-[11px] font-semibold text-[#555] hover:bg-[#FAF9F6] transition-colors cursor-pointer"
                  >
                    {copiedId === 'script_parents' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === 'script_parents' ? (isHindi ? 'कॉपी हो गया' : 'Copied') : (isHindi ? 'कॉपी करें' : 'Copy')}</span>
                  </button>
                </div>
                <p className="p-3 rounded-xl bg-white text-xs text-[#333] border border-[#CCE3D8] italic leading-relaxed">
                  {isHindi
                    ? '"मम्मी/पापा, मुझे आपसे एक ज़रूरी बात करनी है। एक ऑनलाइन धोखेबाज/साइबर अपराधी ने मेरी कुछ निजी तस्वीरों का गलत इस्तेमाल / मॉर्फिंग कर मुझे ब्लैकमेल करके पैसों की मांग की है और डराने की कोशिश कर रहा है। मैंने कोई गलती नहीं की है। मैंने साइबर हेल्पलाइन (1930) और साइबर क्राइम पोर्टल पर कानूनी प्रक्रिया शुरू कर दी है। वकीलों और पुलिस का सख्त निर्देश है कि ब्लैकमेलर को एक भी पैसा न दिया जाए। मैं चाहती थी कि यह बात आपको सीधे मुझसे पता चले ताकि हम मिलकर कानूनी रूप से इसका सामना कर सकें। मुझे इस समय आपके साथ और भरोसे की ज़रूरत है।"'
                    : '"Mom/Dad, I need to talk to you about something important. An online scammer/hacker has obtained/manipulated some personal private images and is trying to extort money from me by threatening to share them. I have not done anything wrong, and I have already preserved the evidence and consulted the National Cyber Crime Portal (1930 / cybercrime.gov.in). Legal experts and cyber police have advised me not to pay a single rupee. I wanted you to hear this directly from me so we can handle this legally and firmly together. Please stand by me."'}
                </p>
              </div>

              {/* Script 3: At Police Station */}
              <div className="p-4 rounded-2xl bg-[#F8F6FC] border border-[#E1D8F4] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#553C9A] uppercase tracking-wider">
                    {isHindi ? 'स्क्रिप्ट 3: थाने में पुलिस अधिकारी से बात करते समय (BNSS 173 अधिकार)' : 'Script 3: At the Police Station (BNSS Section 173 Rights)'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(
                      isHindi
                        ? 'मैं साइबर एक्सटॉर्शन और निजता हनन की औपचारिक शिकायत दर्ज कराने आई हूँ। भारतीय नागरिक सुरक्षा संहिता (BNSS 2023) की धारा 173 के तहत मैं अनुरोध करती हूँ कि मेरा बयान किसी महिला पुलिस अधिकारी द्वारा ही दर्ज किया जाए। इसके अतिरिक्त भारतीय न्याय संहिता (BNS 2023) की धारा 73 के तहत मेरी पहचान और नाम को पूरी तरह गोपनीय रखा जाए।'
                        : 'I am here to file a formal FIR for cyber extortion and intimate privacy violation. Under BNSS Section 173, I respectfully request that my statement be recorded by a female police officer. Furthermore, under Section 73 BNS 2023, I request strict confidentiality regarding my identity in all police records.',
                      'script_police'
                    )}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#E8E2DC] text-[11px] font-semibold text-[#555] hover:bg-[#FAF9F6] transition-colors cursor-pointer"
                  >
                    {copiedId === 'script_police' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === 'script_police' ? (isHindi ? 'कॉपी हो गया' : 'Copied') : (isHindi ? 'कॉपी करें' : 'Copy')}</span>
                  </button>
                </div>
                <p className="p-3 rounded-xl bg-white text-xs text-[#333] border border-[#E1D8F4] italic leading-relaxed">
                  {isHindi
                    ? '"मैं साइबर एक्सटॉर्शन और निजता हनन की औपचारिक शिकायत दर्ज कराने आई हूँ। भारतीय नागरिक सुरक्षा संहिता (BNSS 2023) की धारा 173 के तहत मैं अनुरोध करती हूँ कि मेरा बयान किसी महिला पुलिस अधिकारी द्वारा ही दर्ज किया जाए। इसके अतिरिक्त भारतीय न्याय संहिता (BNS 2023) की धारा 73 के तहत मेरी पहचान और नाम को पूरी तरह गोपनीय रखा जाए।"'
                    : '"I am here to file a formal FIR for cyber extortion and intimate privacy violation. Under BNSS Section 173, I respectfully request that my statement be recorded by a female police officer. Furthermore, under Section 73 BNS 2023, I request strict confidentiality regarding my identity in all police records."'}
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: LEGAL RIGHTS & HELPLINES */}
          {(activeSection === 'legal' || window.matchMedia?.('print')?.matches) && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-[#1A1A1A]">
                  {isHindi ? 'आपके वैधानिक कानूनी अधिकार व 24/7 हेल्पलाइन' : 'Statutory Legal Rights & Verified Helplines'}
                </h3>
                <span className="text-xs text-[#0F6E56] font-bold">
                  {isHindi ? '100% निजता सुरक्षा' : 'Zero-Shame Legal Shield'}
                </span>
              </div>

              {/* Legal Sections Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-white border border-[#E8E2DC] space-y-1">
                  <div className="font-bold text-xs text-[#26215C]">धारा 73 BNS 2023 / Sec 73 BNS</div>
                  <p className="text-[11px] text-[#555]">
                    {isHindi 
                      ? 'पीड़िता का नाम, फोटो या पहचान उजागर करना संज्ञेय अपराध है (2 वर्ष तक का कारावास)।' 
                      : 'Publishing a victim’s name, photo, or identifying details is a criminal offense punishable by 2 years in prison.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#E8E2DC] space-y-1">
                  <div className="font-bold text-xs text-[#26215C]">धारा 77 BNS 2023 / Sec 77 BNS</div>
                  <p className="text-[11px] text-[#555]">
                    {isHindi 
                      ? 'वॉयरिज्म: सहमति के बिना निजी तस्वीरें खींचना या फैलाना (3 से 7 वर्ष का कठोर कारावास)।' 
                      : 'Voyeurism: Capturing or circulating intimate images without consent (3 to 7 years rigorous imprisonment).'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#E8E2DC] space-y-1">
                  <div className="font-bold text-xs text-[#26215C]">धारा 308 BNS 2023 / Sec 308 BNS</div>
                  <p className="text-[11px] text-[#555]">
                    {isHindi 
                      ? 'एक्सटॉर्शन: छवि बिगाड़ने की धमकी देकर पैसे या फेवर मांगना (7 वर्ष तक की कैद व जुर्माना)।' 
                      : 'Extortion: Threatening reputation or injury to demand money or compliance (up to 7 years jail and fine).'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#E8E2DC] space-y-1">
                  <div className="font-bold text-xs text-[#26215C]">धारा 67A IT Act / Sec 67A IT Act</div>
                  <p className="text-[11px] text-[#555]">
                    {isHindi 
                      ? 'अश्लील सामग्री का डिजिटल प्रसारण: गैर-जमानती अपराध (5 वर्ष तक की कैद व 10 लाख जुर्माना)।' 
                      : 'Publishing sexually explicit content online: Mandatory non-bailable offense (up to 5 years prison, ₹10 lakh fine).'}
                  </p>
                </div>
              </div>

              {/* Verified Helplines Box */}
              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#0F6E56]/30 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0F6E56]">
                  <PhoneCall className="w-4 h-4" />
                  <span>{isHindi ? '24/7 आपातकालीन संपर्क नंबर (टोल-फ्री)' : '24/7 Verified Toll-Free Emergency Numbers'}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <a
                    href="tel:1930"
                    className="p-3 rounded-xl bg-white border border-[#E8E2DC] flex items-center justify-between hover:border-[#0F6E56] transition-colors"
                  >
                    <div>
                      <div className="font-bold text-[#1A1A1A]">1930</div>
                      <div className="text-[11px] text-[#666]">{isHindi ? 'राष्ट्रीय साइबर अपराध हेल्पलाइन' : 'National Cyber Crime Helpline'}</div>
                    </div>
                    <span className="text-[11px] text-[#0F6E56] font-semibold">{isHindi ? 'कॉल करें' : 'Call'}</span>
                  </a>

                  <a
                    href="tel:112"
                    className="p-3 rounded-xl bg-white border border-[#E8E2DC] flex items-center justify-between hover:border-[#0F6E56] transition-colors"
                  >
                    <div>
                      <div className="font-bold text-[#1A1A1A]">112</div>
                      <div className="text-[11px] text-[#666]">{isHindi ? 'पुलिस आपातकालीन सेवा' : 'All-India Emergency Police'}</div>
                    </div>
                    <span className="text-[11px] text-[#0F6E56] font-semibold">{isHindi ? 'कॉल करें' : 'Call'}</span>
                  </a>

                  <a
                    href="tel:7827170170"
                    className="p-3 rounded-xl bg-white border border-[#E8E2DC] flex items-center justify-between hover:border-[#0F6E56] transition-colors"
                  >
                    <div>
                      <div className="font-bold text-[#1A1A1A]">7827170170</div>
                      <div className="text-[11px] text-[#666]">{isHindi ? 'राष्ट्रीय महिला आयोग (NCW)' : 'National Commission for Women'}</div>
                    </div>
                    <span className="text-[11px] text-[#0F6E56] font-semibold">{isHindi ? 'कॉल करें' : 'Call'}</span>
                  </a>

                  <a
                    href="tel:9152987821"
                    className="p-3 rounded-xl bg-white border border-[#E8E2DC] flex items-center justify-between hover:border-[#0F6E56] transition-colors"
                  >
                    <div>
                      <div className="font-bold text-[#1A1A1A]">9152987821</div>
                      <div className="text-[11px] text-[#666]">{isHindi ? 'iCall मानसिक स्वास्थ्य सपोर्ट' : 'iCall Psychosocial Support'}</div>
                    </div>
                    <span className="text-[11px] text-[#0F6E56] font-semibold">{isHindi ? 'कॉल करें' : 'Call'}</span>
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#F0EBE6] shrink-0 print:hidden">
          <div className="flex items-center gap-2 text-[11px] text-[#777]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0F6E56]" />
            <span>
              {isHindi 
                ? '100% आपकी डिवाइस पर तैयार होता है • कोई सर्वर ट्रैकिंग नहीं' 
                : '100% generated on your device • Zero server tracking or telemetry'}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={isExporting}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#26215C] text-white hover:bg-[#1C1844] text-xs font-semibold shadow-xs transition-colors cursor-pointer w-full sm:w-auto"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting ? (isHindi ? 'तैयार हो रहा...' : 'Generating...') : (isHindi ? 'गाइड PDF डाउनलोड करें' : 'Download Complete Guide PDF')}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#E8E2DC] text-xs font-semibold text-[#555] hover:bg-[#FAF9F6] transition-colors cursor-pointer"
            >
              {isHindi ? 'बंद करें' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
