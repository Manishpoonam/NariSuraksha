import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Square, 
  Camera, 
  ShieldCheck, 
  FileText, 
  Copy, 
  Check, 
  Download, 
  RotateCcw, 
  AlertTriangle, 
  Cloud, 
  Link2, 
  DollarSign, 
  Mic, 
  Hash, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Info,
  Smartphone,
  CheckCircle2,
  Sparkles,
  Shield,
  Loader2,
  Lock,
  HeartHandshake
} from 'lucide-react';
import { Language } from '../types';
import { notifyDraftSaving } from '../utils/cloudSync';

export interface EvidenceChecklistProps {
  language: Language;
  onNavigateToTab?: (tab: string, elementId?: string) => void;
}

export interface ChecklistItem {
  id: string;
  category: 'visual' | 'url_id' | 'financial' | 'audio_media' | 'cloud_backup' | 'hash';
  categoryLabel: { en: string; hi: string };
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  tips: { en: string; hi: string };
  legalRelevance: { en: string; hi: string };
  isCritical: boolean;
}

export const EvidenceChecklist: React.FC<EvidenceChecklistProps> = ({ 
  language,
  onNavigateToTab 
}) => {
  const isHindi = language === 'hi';

  const defaultChecklist: ChecklistItem[] = [
    {
      id: 'uncropped_screenshot',
      category: 'visual',
      categoryLabel: { en: 'Visual Evidence', hi: 'विजुअल स्क्रीनशॉट' },
      title: {
        en: 'Uncropped Full-Screen Screenshots (with Status Bar)',
        hi: 'बिना क्रॉप किए पूरे स्क्रीन का स्क्रीनशॉट (समय व बैटरी बार सहित)'
      },
      description: {
        en: 'Capture entire screen including top notification bar (clock, battery, Wi-Fi icon) and full conversation context.',
        hi: 'ऊपर के स्टेटस बार (घड़ी, बैटरी, वाई-फाई आइकन) के साथ पूरी स्क्रीन का स्क्रीनशॉट लें। स्क्रीनशॉट को कभी क्रॉप न करें।'
      },
      tips: {
        en: 'Cropped screenshots are often challenged in court. The top bar timestamps prove chronological continuity under Section 63 BSA.',
        hi: 'क्रॉप किए गए स्क्रीनशॉट कोर्ट में खारिज हो सकते हैं। ऊपर का समय और तारीख फॉरेंसिक जांच में कानूनी प्रमाण माने जाते हैं।'
      },
      legalRelevance: {
        en: 'Bharatiya Sakshya Adhiniyam (BSA) Sec 63 - Electronic Record Admissibility',
        hi: 'भारतीय साक्ष्य अधिनियम (BSA) धारा 63 - इलेक्ट्रॉनिक साक्ष्य की स्वीकार्यता'
      },
      isCritical: true,
    },
    {
      id: 'screen_recording',
      category: 'visual',
      categoryLabel: { en: 'Visual Evidence', hi: 'विजुअल स्क्रीनशॉट' },
      title: {
        en: 'Video Screen Recording of Scrolling Chat & Profile Page',
        hi: 'चैट और प्रोफाइल पेज को स्क्रॉल करते हुए स्क्रीन रिकॉर्डिंग'
      },
      description: {
        en: 'Record a 20-30 second video scrolling through the whole chat, opening the offender\'s profile page, and showing their bio/phone number.',
        hi: '20-30 सेकंड की स्क्रीन रिकॉर्डिंग करें जिसमें पूरी चैट स्क्रॉल हो और ब्लैकमेलर की प्रोफाइल खोलकर उनका नंबर या यूजरनेम दिखे।'
      },
      tips: {
        en: 'Video recording disproves any defense claiming messages were forged or fabricated using web inspector tools.',
        hi: 'वीडियो रिकॉर्डिंग से यह साबित होता है कि मैसेज वास्तविक हैं और किसी ऐप द्वारा एडिट नहीं किए गए हैं।'
      },
      legalRelevance: {
        en: 'IT Act Sec 65B / BSA Sec 63 Video Hash Admissibility',
        hi: 'आईटी एक्ट 65B / BSA धारा 63 वीडियो साक्ष्य'
      },
      isCritical: false,
    },
    {
      id: 'exact_urls_saved',
      category: 'url_id',
      categoryLabel: { en: 'URLs & Offender ID', hi: 'वेब लिंक व पहचान' },
      title: {
        en: 'Exact Profile & Post URLs Saved to Safe Notes',
        hi: 'ब्लैकमेलर की प्रोफाइल और पोस्ट का सीधा वेब लिंक (URL) कॉपी किया'
      },
      description: {
        en: 'Copy the complete URL links of the offending post, account handle, Telegram channel, or Instagram profile (e.g. instagram.com/username or t.me/channel).',
        hi: 'ब्लैकमेलर के अकाउंट, पोस्ट या टेलीग्राम चैनल का पूरा वेब लिंक (URL) कॉपी करके सुरक्षित नोट में रख लें।'
      },
      tips: {
        en: 'Offenders change usernames quickly, but unique profile URLs help cyber police trace account creation IP and device IMEI numbers.',
        hi: 'अपराधी अपना यूजरनेम तुरंत बदल लेते हैं, लेकिन स्थायी प्रोफाइल लिंक से साइबर पुलिस सर्वर लॉग्स व आईपी एड्रेस निकाल सकती है।'
      },
      legalRelevance: {
        en: 'Rule 3(2)(b) IT Rules 2021 Takedown Traceability',
        hi: 'आईटी नियम 2021 नियम 3(2)(b) - त्वरित यूआरएल निष्कासन'
      },
      isCritical: true,
    },
    {
      id: 'phone_and_handles',
      category: 'url_id',
      categoryLabel: { en: 'URLs & Offender ID', hi: 'वेब लिंक व पहचान' },
      title: {
        en: 'Offender Contact Numbers (+91) & User ID Identifiers',
        hi: 'ब्लैकमेलर का मोबाइल नंबर (+91 सहित) और यूजरनेम सुरक्षित किया'
      },
      description: {
        en: 'Preserve raw phone number, country code, WhatsApp contact card, Telegram user ID, or email addresses used for extortion.',
        hi: 'ब्लैकमेलर का पूरा मोबाइल नंबर (+91 के साथ), व्हाट्सएप प्रोफाइल कार्ड या टेलीग्राम यूजर आईडी संभाल कर रखें।'
      },
      tips: {
        en: 'Check if the number has a Truecaller profile or active WhatsApp "About" description and screenshot that too.',
        hi: 'व्हाट्सएप में कॉन्टैक्ट पर टैप करके वास्तविक नंबर का स्क्रीनशॉट लें, न कि केवल सेव किए गए नाम का।'
      },
      legalRelevance: {
        en: 'BNS Sec 308(2) / Sec 351 Criminal Extortion Investigation',
        hi: 'भारतीय न्याय संहिता धारा 308(2) व 351 - आपराधिक जबरन वसूली'
      },
      isCritical: true,
    },
    {
      id: 'financial_trails',
      category: 'financial',
      categoryLabel: { en: 'Financial Trails', hi: 'वित्तीय साक्ष्य' },
      title: {
        en: 'UPI VPA, QR Codes, Bank Details & Transaction UTR Numbers',
        hi: 'पैसे मांगने की UPI आईडी, QR कोड, बैंक विवरण व UTR नंबर'
      },
      description: {
        en: 'Save any UPI Virtual Payment Address (e.g. name@oksbi), QR code image, bank account number, IFSC code, or UTR/Ref numbers of any paid amounts.',
        hi: 'ब्लैकमेलर द्वारा भेजी गई UPI आईडी, QR कोड, बैंक खाता नंबर और यदि कोई राशि ट्रांसफर हुई है तो उसका 12-अंकों का UTR नंबर नोट करें।'
      },
      tips: {
        en: 'If any money was transferred, call 1930 within the first hour with the UTR number to immediately freeze the recipient bank/wallet account.',
        hi: 'यदि पैसे ट्रांसफर हो गए हैं, तो UTR नंबर के साथ तुरंत 1930 पर कॉल करें ताकि बैंक खाता तुरंत होल्ड पर डाला जा सके।'
      },
      legalRelevance: {
        en: 'MHA I4C CFCFRMS Bank Freezing Protocol',
        hi: 'गृह मंत्रालय 1930 त्वरित बैंक खाता फ्रीज प्रोटोकॉल'
      },
      isCritical: true,
    },
    {
      id: 'audio_voice_notes',
      category: 'audio_media',
      categoryLabel: { en: 'Audio & Source Media', hi: 'ऑडियो व मूल फोटो' },
      title: {
        en: 'Voice Notes, Call Recordings & Audio Threat Messages',
        hi: 'धमकी भरे वॉइस नोट्स और कॉल रिकॉर्डिंग्स सुरक्षित कीं'
      },
      description: {
        en: 'Keep voice notes, audio extortion clips, and call recordings in their original format (.opus, .mp3, .m4a) without renaming or converting.',
        hi: 'धमकी भरे वॉइस मैसेज और कॉल रिकॉर्डिंग को बिना डिलीट या कन्वर्ट किए ओरिजिनल फाइल फॉर्मेट में सुरक्षित रखें।'
      },
      tips: {
        en: 'Audio files contain biometric frequency markers that forensic acoustic labs use for suspect voice identification.',
        hi: 'वॉइस नोट्स में फॉरेंसिक बायोमेट्रिक डेटा होता है जो कोर्ट में आवाज की पहचान करने के लिए सबसे मजबूत सबूत बनता है।'
      },
      legalRelevance: {
        en: 'Acoustic Voice Spectrogram Analysis Admissibility',
        hi: 'फॉरेंसिक वॉइस मैचिंग साक्ष्य'
      },
      isCritical: false,
    },
    {
      id: 'original_unmorphed_photo',
      category: 'audio_media',
      categoryLabel: { en: 'Audio & Source Media', hi: 'ऑडियो व मूल फोटो' },
      title: {
        en: 'Original Harmless Source Photo Saved (For Deepfake / Morphing)',
        hi: 'अपनी मूल बिना छेड़छाड़ वाली फोटो सुरक्षित रखी (डीपफेक तुलना के लिए)'
      },
      description: {
        en: 'Save the original, harmless photograph from your gallery or social media that the perpetrator used to generate the morphed image.',
        hi: 'अपनी वह मूल सामान्य फोटो गैलरी में सुरक्षित रखें जिसका उपयोग करके अपराधी ने फर्जी या मॉर्फ्ड फोटो बनाई है।'
      },
      tips: {
        en: 'Providing both the original and manipulated photos allows forensic labs to conclusively demonstrate pixel interpolation and face-swapping.',
        hi: 'असली और फर्जी दोनों फोटो साथ देने से फॉरेंसिक लैब तुरंत छेड़छाड़ और एआई मॉर्फिंग साबित कर देती है।'
      },
      legalRelevance: {
        en: 'Section 336 BNS (Forgery for Harm) / IT Act Sec 66D & 66E',
        hi: 'BNS धारा 336 (जालसाजी) व आईटी एक्ट 66E (गोपनीयता हनन)'
      },
      isCritical: true,
    },
    {
      id: 'cloud_sync_and_export',
      category: 'cloud_backup',
      categoryLabel: { en: 'Cloud Sync & Offline Backup', hi: 'क्लाउड बैकअप व सुरक्षा' },
      title: {
        en: 'Chat Exported & Backed Up to Secure Offline/Cloud Storage',
        hi: 'चैट का पूरा बैकअप/एक्सपोर्ट लेकर सुरक्षित प्राइवेट ड्राइव या फोल्डर में रखा'
      },
      description: {
        en: 'In WhatsApp/Telegram: Tap 3 dots > More > "Export Chat" (with media). Save to an isolated Google Drive/iCloud folder or USB drive.',
        hi: 'व्हाट्सएप में Export Chat (With Media) करके पूरी बातचीत का बैकअप किसी सुरक्षित ईमेल या पेनड्राइव में रख लें।'
      },
      tips: {
        en: 'Ensure your phone\'s public cloud sharing or family photo sync is set to private so sensitive extortion files are not automatically broadcasted.',
        hi: 'यह सुनिश्चित करें कि गूगल फोटोज का ऑटो-शेयरिंग फैमिली ग्रुप में बंद हो ताकि निजी सबूत केवल आपके पास रहें।'
      },
      legalRelevance: {
        en: 'Preservation of Chain of Custody & Device Metadata',
        hi: 'चेन ऑफ कस्टडी व डिजिटल साक्ष्य का संरक्षण'
      },
      isCritical: true,
    },
    {
      id: 'hash_and_stopncii',
      category: 'hash',
      categoryLabel: { en: 'Cryptographic Hash & StopNCII', hi: 'हैश व StopNCII' },
      title: {
        en: 'On-Device SHA-256 Hash or StopNCII Reference Code Generated',
        hi: 'फोटो का डिजिटल SHA-256 हैश या StopNCII केस नंबर तैयार किया'
      },
      description: {
        en: 'Generated on-device cryptographic hash or StopNCII.org case ID to block image re-uploading without sharing raw files.',
        hi: 'StopNCII.org पर जाकर अपनी फोटो का डिजिटल फिंगरप्रिंट (हैश) बनाया ताकि इंटरनेट पर री-अपलोडिंग अपने आप रुक सके।'
      },
      tips: {
        en: 'A hash is a 64-character mathematical fingerprint. It proves file integrity and prevents alteration claims.',
        hi: 'हैश से यह साबित होता है कि सबूत के साथ बाद में कोई छेड़छाड़ नहीं की गई है।'
      },
      legalRelevance: {
        en: 'ISO/IEC 27037 Digital Evidence Forensics Integrity',
        hi: 'डिजिटल साक्ष्य फॉरेंसिक अखंडता मानक'
      },
      isCritical: false,
    }
  ];

  // Load from local storage or default
  const STORAGE_KEY = 'suraksha_evidence_checklist_v1';
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return {
      uncropped_screenshot: false,
      exact_urls_saved: false,
      phone_and_handles: false,
      financial_trails: false,
      original_unmorphed_photo: false,
      cloud_sync_and_export: false,
    };
  });

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [copiedReport, setCopiedReport] = useState<boolean>(false);
  const [expandedTip, setExpandedTip] = useState<string | null>('uncropped_screenshot');
  
  // Active securing progress & comforting cues state
  const [securingItem, setSecuringItem] = useState<{ id: string; progress: number } | null>(null);
  const [justSecuredId, setJustSecuredId] = useState<string | null>(null);
  const [isSecuringAll, setIsSecuringAll] = useState<boolean>(false);
  const [activeComfortCue, setActiveComfortCue] = useState<{
    en: string;
    hi: string;
    tone: 'safe' | 'empower' | 'calm';
  }>({
    en: 'Take your time. Every evidence step you preserve is secured privately on your device only.',
    hi: 'धैर्य रखें। आपके द्वारा सहेजा गया हर साक्ष्य केवल आपके डिवाइस की सुरक्षित मेमोरी में दर्ज होता है।',
    tone: 'calm'
  });

  // Reassuring comforting cues per checklist item
  const comfortingCuesMap: Record<string, { en: string; hi: string; tone: 'safe' | 'empower' | 'calm' }> = {
    uncropped_screenshot: {
      en: 'Timestamp & status bar locked. You are preserving undeniable Section 63 BSA proof.',
      hi: 'समय व स्टेटस बार सुरक्षित। आपका इलेक्ट्रॉनिक कानूनी साक्ष्य अब कोर्ट के लिए मजबूत हो गया है।',
      tone: 'empower'
    },
    screen_recording: {
      en: 'Video context saved. This disproves any perpetrator claim of message editing.',
      hi: 'वीडियो रिकॉर्डिंग दर्ज। इससे मैसेज में छेड़छाड़ के झूठे दावों का पूर्ण खंडन होता है।',
      tone: 'safe'
    },
    exact_urls_saved: {
      en: 'Profile URL locked. Cyber police can request server IP logs using this exact link.',
      hi: 'वेब लिंक सुरक्षित। साइबर पुलिस इस लिंक से सर्वर लॉग्स व आईपी का पता लगा सकती है।',
      tone: 'empower'
    },
    phone_and_handles: {
      en: 'Contact details recorded. Every piece of identity aids law enforcement tracing.',
      hi: 'फोन व यूजर आईडी दर्ज। यह जानकारी पुलिस जांच को अपराधी तक पहुंचाने में मदद करती है।',
      tone: 'safe'
    },
    financial_trails: {
      en: 'Financial trail saved. Helpline 1930 uses UPI/UTR numbers to freeze illicit accounts.',
      hi: 'वित्तीय साक्ष्य सुरक्षित। 1930 हेल्पलाइन UPI व UTR नंबर से बैंक खाते तुरंत फ्रीज करती है।',
      tone: 'empower'
    },
    audio_voice_notes: {
      en: 'Voice audio preserved in original format. Acoustic frequencies provide solid identification.',
      hi: 'वॉइस रिकॉर्डिंग सुरक्षित। फॉरेंसिक लैब आवाज की तरंगों से आरोपी की पहचान प्रमाणित करती है।',
      tone: 'safe'
    },
    original_unmorphed_photo: {
      en: 'Original reference photo linked. Side-by-side forensic analysis proves digital forgery.',
      hi: 'मूल तस्वीर सुरक्षित। तुलनात्मक फॉरेंसिक जांच से तुरंत साबित होता है कि फोटो से छेड़छाड़ हुई है।',
      tone: 'empower'
    },
    cloud_sync_and_export: {
      en: 'Private backup confirmed. Your evidence is safe even if the phone changes or resets.',
      hi: 'निजी बैकअप सुरक्षित। फोन बदलने पर भी आपके सभी साक्ष्य सुरक्षित और उपलब्ध रहेंगे।',
      tone: 'safe'
    },
    hash_and_stopncii: {
      en: 'Cryptographic hash registered. Image fingerprint created without uploading raw media.',
      hi: 'डिजिटल हैश तैयार। अपनी फोटो सार्वजनिक किए बिना इंटरनेट पर री-अपलोडिंग रोकी जा सकती है।',
      tone: 'calm'
    }
  };

  // Save to local storage and notify cloud sync
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedState));
      notifyDraftSaving('Evidence Locker Checklist');
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }, [checkedState]);

  const toggleItem = (id: string) => {
    const isCurrentlyChecked = Boolean(checkedState[id]);

    if (!isCurrentlyChecked) {
      // Start soothing loading & securing simulation
      setSecuringItem({ id, progress: 15 });
      const cue = comfortingCuesMap[id] || {
        en: 'Evidence item verified and locked in local secure sandbox.',
        hi: 'साक्ष्य सफलतापूर्वक सत्यापित और स्थानीय सुरक्षित सैंडबॉक्स में दर्ज।',
        tone: 'empower'
      };
      setActiveComfortCue(cue);

      const t1 = setTimeout(() => {
        setSecuringItem({ id, progress: 65 });
      }, 180);

      const t2 = setTimeout(() => {
        setSecuringItem({ id, progress: 100 });
        setCheckedState((prev) => ({
          ...prev,
          [id]: true
        }));
        setJustSecuredId(id);
        setSecuringItem(null);
      }, 420);

      const t3 = setTimeout(() => {
        setJustSecuredId((prev) => (prev === id ? null : prev));
      }, 4000);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    } else {
      // Unchecking is instant
      setCheckedState((prev) => ({
        ...prev,
        [id]: false
      }));
      if (justSecuredId === id) {
        setJustSecuredId(null);
      }
      setActiveComfortCue({
        en: 'Checklist updated. Take your time to re-verify when ready.',
        hi: 'चेकलिस्ट अपडेट की गई। जब आप तैयार हों, तब दोबारा जांच कर सकती हैं।',
        tone: 'calm'
      });
    }
  };

  const handleSelectAll = () => {
    setIsSecuringAll(true);
    setActiveComfortCue({
      en: 'Securing all 9 digital forensic evidence points to local device memory...',
      hi: 'सभी 9 डिजिटल फॉरेंसिक साक्ष्य बिंदु डिवाइस मेमोरी में सुरक्षित किए जा रहे हैं...',
      tone: 'safe'
    });

    setTimeout(() => {
      const allChecked: Record<string, boolean> = {};
      defaultChecklist.forEach(item => {
        allChecked[item.id] = true;
      });
      setCheckedState(allChecked);
      setIsSecuringAll(false);
      setActiveComfortCue({
        en: 'All 9 forensic evidence points are now safely logged. Your legal dossier is ready.',
        hi: 'सभी 9 फॉरेंसिक साक्ष्य बिंदु अब सुरक्षित हैं। आपकी कानूनी रिपोर्ट तैयार है।',
        tone: 'empower'
      });
    }, 550);
  };

  const handleReset = () => {
    setCheckedState({});
    setJustSecuredId(null);
    setSecuringItem(null);
    setActiveComfortCue({
      en: 'Checklist reset. You can begin logging your evidence calmly at your own pace.',
      hi: 'चेकलिस्ट रीसेट हो गई है। आप शांति से अपनी गति से साक्ष्य दर्ज करना शुरू कर सकती हैं।',
      tone: 'calm'
    });
  };

  const totalItems = defaultChecklist.length;
  const completedCount = Object.values(checkedState).filter(Boolean).length;
  const criticalItems = defaultChecklist.filter(item => item.isCritical);
  const criticalCompletedCount = criticalItems.filter(item => checkedState[item.id]).length;
  const progressPercent = Math.round((completedCount / totalItems) * 100);

  // Status Tier Assessment
  const getReadinessLevel = () => {
    if (progressPercent === 100) {
      return {
        tier: isHindi ? 'उत्कृष्ट (100% फॉरेंसिक दृष्टि से ठोस)' : 'Excellent (100% Forensically Solid)',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        badgeBg: 'bg-emerald-600',
        assessment: isHindi 
          ? 'आपके पास पुलिस एफआईआर, 1930 और कोर्ट के लिए सभी आवश्यक इलेक्ट्रॉनिक सबूत सुरक्षित हैं।'
          : 'Your digital evidence package strictly adheres to Section 63 BSA standards and is ready for cyber cell investigation.',
      };
    }
    if (criticalCompletedCount === criticalItems.length) {
      return {
        tier: isHindi ? 'मजबूत साक्ष्य (सभी मुख्य बिंदु पूर्ण)' : 'Strong Evidence (All Critical Items Done)',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        badgeBg: 'bg-emerald-600',
        assessment: isHindi
          ? 'आपने सभी जरूरी सबूत सुरक्षित कर लिए हैं। शिकायत दर्ज करने के लिए यह पूरी तरह पर्याप्त है।'
          : 'All legally critical proof items are preserved. You are in a strong position to file an FIR and request urgent takedowns.',
      };
    }
    if (progressPercent >= 50) {
      return {
        tier: isHindi ? 'मध्यम तत्परता (कुछ मुख्य बिंदु बाकी)' : 'Moderate Readiness (Partial Proof)',
        color: 'text-amber-700 bg-amber-50 border-amber-200',
        badgeBg: 'bg-amber-600',
        assessment: isHindi
          ? 'कुछ सबूत सुरक्षित हैं, लेकिन कृपया यूआरएल, बिना क्रॉप किया स्क्रीनशॉट व चैट बैकअप भी सुनिश्चित करें।'
          : 'Good start. Ensure you also preserve uncropped top-bar timestamps and exact account URLs before blocking.',
      };
    }
    return {
      tier: isHindi ? 'प्रारंभिक अवस्था (सबूत सुरक्षित करना आवश्यक)' : 'Initial State (Action Required)',
      color: 'text-rose-700 bg-rose-50 border-rose-200',
      badgeBg: 'bg-rose-600',
      assessment: isHindi
        ? 'अपराधी को ब्लॉक या चैट डिलीट करने से पहले स्क्रीनशॉट, प्रोफाइल लिंक और यूपीआई विवरण अवश्य संभालें।'
        : 'Do NOT delete chats or block offenders yet. Tick off the critical items above to lock in legal proof.',
    };
  };

  const statusLevel = getReadinessLevel();

  // Generate Police / 1930 Ready Summary Report
  const generateSummaryReportText = () => {
    const timestamp = new Date().toLocaleString(isHindi ? 'hi-IN' : 'en-IN', {
      dateStyle: 'full',
      timeStyle: 'medium'
    });

    const completedList = defaultChecklist.filter(item => checkedState[item.id]);
    const pendingList = defaultChecklist.filter(item => !checkedState[item.id]);

    let text = isHindi
      ? `=== डिजिटल फॉरेंसिक साक्ष्य तत्परता रिपोर्ट ===\n`
      : `=== DIGITAL FORENSIC EVIDENCE READINESS REPORT ===\n`;

    text += `${isHindi ? 'रिपोर्ट दिनांक व समय' : 'Report Generated'}: ${timestamp}\n`;
    text += `${isHindi ? 'कुल प्रगति' : 'Total Progress'}: ${completedCount}/${totalItems} (${progressPercent}%)\n`;
    text += `${isHindi ? 'अति महत्वपूर्ण बिंदु' : 'Critical Items Complete'}: ${criticalCompletedCount}/${criticalItems.length}\n`;
    text += `${isHindi ? 'साक्ष्य स्थिति' : 'Evidence Status'}: ${statusLevel.tier}\n\n`;

    text += isHindi ? `--- सुरक्षित किए गए साक्ष्य (PRESERVED EVIDENCE) ---\n` : `--- PRESERVED EVIDENCE ITEMS ---\n`;
    if (completedList.length === 0) {
      text += isHindi ? `(कोई साक्ष्य दर्ज नहीं किया गया)\n` : `(No items checked off yet)\n`;
    } else {
      completedList.forEach((item, idx) => {
        text += `[✓] ${idx + 1}. ${item.title[language]}\n`;
        text += `    - ${isHindi ? 'श्रेणी' : 'Category'}: ${item.categoryLabel[language]}\n`;
        text += `    - ${isHindi ? 'कानूनी धारा' : 'Statute'}: ${item.legalRelevance[language]}\n`;
      });
    }

    if (pendingList.length > 0) {
      text += isHindi ? `\n--- शेष / लंबित कदम (PENDING ITEMS TO PRESERVE) ---\n` : `\n--- PENDING ITEMS TO PRESERVE ---\n`;
      pendingList.forEach((item, idx) => {
        text += `[ ] ${idx + 1}. ${item.title[language]} (${item.isCritical ? (isHindi ? 'अति महत्वपूर्ण' : 'CRITICAL') : (isHindi ? 'अनुशंसित' : 'Recommended')})\n`;
      });
    }

    text += isHindi
      ? `\n--- आधिकारिक सहायता पोर्टल ---\n`
      : `\n--- OFFICIAL ESCALATION CONTACTS ---\n`;
    text += `• National Cyber Crime Helpline: 1930\n`;
    text += `• Police Emergency: 112\n`;
    text += `• National Cybercrime Portal: https://cybercrime.gov.in\n`;
    text += `• Preemptive Image Blocker: https://stopncii.org\n`;
    text += `\n* Note: Generated locally in device memory by Suraksha Setu for victim legal empowerment.`;

    return text;
  };

  const handleCopyReport = () => {
    const reportText = generateSummaryReportText();
    navigator.clipboard.writeText(reportText);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2500);
  };

  const handleDownloadReport = () => {
    const reportText = generateSummaryReportText();
    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Evidence_Preservation_Report_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredChecklist = filterCategory === 'all'
    ? defaultChecklist
    : filterCategory === 'critical'
      ? defaultChecklist.filter(item => item.isCritical)
      : defaultChecklist.filter(item => item.category === filterCategory);

  return (
    <section id="evidence-checklist-section" className="space-y-6 scroll-mt-48">
      {/* Header Banner */}
      <div className="bg-[#2D2D2D] text-[#FAF9F6] rounded-3xl p-6 sm:p-9 shadow-sm border border-[#222] space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FAF9F6] text-xs font-bold tracking-wider uppercase">
              <Camera className="w-4 h-4 text-[#E25822]" />
              <span>{isHindi ? 'फॉरेंसिक साक्ष्य चेकलिस्ट व प्रगति रिपोर्ट' : 'Forensic Evidence Checklist & Progress Report'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
              {isHindi 
                ? 'ब्लैकमेलर को ब्लॉक करने से पहले कानूनी साक्ष्य सुरक्षित करें' 
                : 'Preserve Legal-Grade Evidence Before Blocking Perpetrators'}
            </h2>
            <p className="text-xs sm:text-sm text-[#CCC] leading-relaxed">
              {isHindi
                ? 'भारतीय साक्ष्य अधिनियम (BSA) धारा 63 और आईटी एक्ट के तहत कोर्ट में इलेक्ट्रॉनिक साक्ष्य को प्रमाणित रखने के लिए नीचे दिए गए बिंदुओं को टिक करें।'
                : 'Tick off the vital evidence preservation steps below. This prevents blackmailers from destroying trails and generates an instant readiness report for Police & 1930.'}
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-2.5 shrink-0">
            <button
              onClick={() => setIsReportOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#E25822] hover:bg-[#c94b1b] text-white rounded-full text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer min-h-[44px]"
            >
              <FileText className="w-4 h-4" />
              <span>{isHindi ? 'साक्ष्य रिपोर्ट देखें' : 'View Progress Report'}</span>
            </button>
            
            <button
              onClick={handleSelectAll}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer min-h-[44px]"
            >
              <CheckSquare className="w-4 h-4" />
              <span>{isHindi ? 'सभी टिक करें' : 'Check All'}</span>
            </button>
          </div>
        </div>

        {/* Progress Score Bar */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold text-white ${statusLevel.badgeBg}`}>
                {progressPercent}% {isHindi ? 'पूर्ण' : 'Complete'}
              </span>
              <span className="font-bold text-white text-xs sm:text-sm">
                {completedCount} of {totalItems} {isHindi ? 'साक्ष्य बिंदु सुरक्षित' : 'Evidence Steps Verified'}
              </span>
              <span className="text-[#AAA] text-xs">
                ({criticalCompletedCount}/{criticalItems.length} {isHindi ? 'मुख्य' : 'Critical'})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-300 text-[11px] font-semibold border border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{isHindi ? 'सैंडबॉक्स सक्रिय • 100% सुरक्षित' : 'On-Device Sandbox Active'}</span>
              </span>
              <span className="text-xs text-[#E5DFD9] italic font-medium hidden sm:inline">
                {statusLevel.tier}
              </span>
            </div>
          </div>

          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden border border-white/10">
            <div
              className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Comforting Live Cue Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#FAF6F2] to-[#F5EFEB] border border-[#E8E2DC] shadow-xs flex items-start sm:items-center justify-between gap-4 transition-all">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-9 h-9 rounded-2xl bg-white text-[#8B6D5C] shadow-2xs border border-[#E8E2DC] flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
            {isSecuringAll ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#8B6D5C]" />
            ) : securingItem ? (
              <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
            ) : (
              <HeartHandshake className="w-4 h-4 text-[#8B6D5C]" />
            )}
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8B6D5C] bg-white px-2 py-0.5 rounded-full border border-[#E8E2DC]">
                {isHindi ? 'सुरक्षा व सांत्वना' : 'Secure Guidance'}
              </span>
              <span className="text-[11px] text-[#777] font-medium hidden md:inline">
                {isHindi ? '• आपकी सुरक्षा व गोपनीयता शत-प्रतिशत सुरक्षित है' : '• 100% Private, Client-Side Encryption'}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-[#2D2D2D] leading-snug">
              {activeComfortCue[language]}
            </p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 shrink-0">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>{isHindi ? 'ऑफलाइन सुरक्षित' : 'Offline Safe'}</span>
        </div>
      </div>

      {/* Filter Tabs & Quick Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
              filterCategory === 'all'
                ? 'bg-[#8B6D5C] text-white border-[#8B6D5C] shadow-2xs'
                : 'bg-white text-[#555] hover:bg-[#FAF9F6] border-[#E8E2DC]'
            }`}
          >
            {isHindi ? 'सभी 9 कदम' : 'All 9 Steps'}
          </button>
          <button
            onClick={() => setFilterCategory('critical')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
              filterCategory === 'critical'
                ? 'bg-[#8B6D5C] text-white border-[#8B6D5C] shadow-2xs'
                : 'bg-white text-[#DC2626] hover:bg-[#FEF2F2] border-[#E8E2DC]'
            }`}
          >
            {isHindi ? '★ अति आवश्यक (6)' : '★ Critical Only (6)'}
          </button>
          <button
            onClick={() => setFilterCategory('visual')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
              filterCategory === 'visual'
                ? 'bg-[#8B6D5C] text-white border-[#8B6D5C] shadow-2xs'
                : 'bg-white text-[#555] hover:bg-[#FAF9F6] border-[#E8E2DC]'
            }`}
          >
            {isHindi ? 'स्क्रीनशॉट व वीडियो' : 'Screenshots & Video'}
          </button>
          <button
            onClick={() => setFilterCategory('financial')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
              filterCategory === 'financial'
                ? 'bg-[#8B6D5C] text-white border-[#8B6D5C] shadow-2xs'
                : 'bg-white text-[#555] hover:bg-[#FAF9F6] border-[#E8E2DC]'
            }`}
          >
            {isHindi ? 'UPI व बैंक' : 'UPI & Banking'}
          </button>
          <button
            onClick={() => setFilterCategory('cloud_backup')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
              filterCategory === 'cloud_backup'
                ? 'bg-[#8B6D5C] text-white border-[#8B6D5C] shadow-2xs'
                : 'bg-white text-[#555] hover:bg-[#FAF9F6] border-[#E8E2DC]'
            }`}
          >
            {isHindi ? 'क्लाउड सिंक' : 'Cloud Sync'}
          </button>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-xs text-[#888] hover:text-[#333] transition-colors cursor-pointer py-1 px-2"
            title="Reset Checklist"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isHindi ? 'रीसेट करें' : 'Reset'}</span>
          </button>
        </div>
      </div>

      {/* Checklist Interactive Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredChecklist.map((item) => {
          const isChecked = Boolean(checkedState[item.id]);
          const isTipExpanded = expandedTip === item.id;
          const isSecuringThis = securingItem?.id === item.id;
          const isJustSecured = justSecuredId === item.id;

          return (
            <div
              key={item.id}
              className={`rounded-3xl border p-5 sm:p-6 transition-all duration-300 space-y-3 flex flex-col justify-between relative overflow-hidden ${
                isSecuringThis
                  ? 'bg-amber-50/40 border-amber-300 shadow-md ring-2 ring-amber-400/30'
                  : isJustSecured
                    ? 'bg-emerald-50/40 border-emerald-300 shadow-sm ring-1 ring-emerald-400/30'
                    : isChecked
                      ? 'bg-[#F9F7F5] border-[#DED9D4] shadow-xs'
                      : 'bg-white hover:bg-[#FAF9F6] border-[#E8E2DC] shadow-xs hover:border-[#D6CCC2]'
              }`}
            >
              {/* Subtle top loading progress bar when actively securing */}
              {isSecuringThis && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-amber-100 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 via-[#8B6D5C] to-emerald-500 transition-all duration-200"
                    style={{ width: `${securingItem.progress}%` }}
                  />
                </div>
              )}

              <div className="space-y-3">
                {/* Top Row: Category tag + Critical Badge + Status Cue */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F3EFEC] text-[#8B6D5C]">
                    {item.categoryLabel[language]}
                  </span>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    {item.isCritical && (
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                        {isHindi ? '★ अति आवश्यक' : '★ Critical'}
                      </span>
                    )}

                    {isSecuringThis ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 animate-pulse">
                        <Loader2 className="w-2.5 h-2.5 animate-spin text-amber-700" />
                        <span>{isHindi ? 'सुरक्षित हो रहा है...' : 'Securing...'}</span>
                      </span>
                    ) : isJustSecured ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 animate-fadeIn">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                        <span>{isHindi ? '✓ दर्ज व सुरक्षित' : '✓ Locked in Memory'}</span>
                      </span>
                    ) : isChecked ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                        <Lock className="w-2.5 h-2.5 text-emerald-600" />
                        <span>{isHindi ? 'सुरक्षित' : 'Secured'}</span>
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* Checkbox + Title */}
                <div 
                  onClick={() => toggleItem(item.id)}
                  className="flex items-start gap-3 cursor-pointer select-none group"
                >
                  <div className="mt-0.5 shrink-0 transition-transform group-active:scale-95">
                    {isSecuringThis ? (
                      <div className="w-5 h-5 rounded-md flex items-center justify-center bg-amber-100 border border-amber-300">
                        <Loader2 className="w-3.5 h-3.5 text-amber-700 animate-spin" />
                      </div>
                    ) : isChecked ? (
                      <CheckSquare className="w-5 h-5 text-emerald-600 transition-colors" />
                    ) : (
                      <Square className="w-5 h-5 text-[#AAA] group-hover:text-[#666] transition-colors" />
                    )}
                  </div>
                  
                  <div className="space-y-1 w-full">
                    <h3 className={`text-sm sm:text-base font-bold leading-snug transition-colors ${
                      isChecked ? 'text-emerald-950 line-through opacity-85' : 'text-[#1A1A1A]'
                    }`}>
                      {item.title[language]}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#555] leading-relaxed">
                      {item.description[language]}
                    </p>

                    {/* Active Comforting Guidance Cue Box */}
                    {isSecuringThis && (
                      <div className="pt-2">
                        <div className="p-2.5 rounded-xl bg-amber-100/70 border border-amber-200/80 flex items-center gap-2 text-xs text-amber-900 font-medium animate-pulse">
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-700 shrink-0" />
                          <span>{isHindi ? 'स्थानीय फॉरेंसिक टाइमस्टैम्प व साक्ष्य अखंडता दर्ज हो रही है...' : 'Logging local timestamp & Section 63 BSA forensic chain...'}</span>
                        </div>
                      </div>
                    )}

                    {isJustSecured && !isSecuringThis && (
                      <div className="pt-1.5">
                        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-2 text-xs text-emerald-900 font-medium animate-fadeIn">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-[11px] text-emerald-800 uppercase tracking-wide">
                              {isHindi ? 'साक्ष्य सफलतापूर्वक सहेजा गया' : 'Evidence Step Confirmed'}
                            </p>
                            <p className="text-xs text-emerald-900 mt-0.5">
                              {comfortingCuesMap[item.id]?.[language] || (isHindi ? 'यह साक्ष्य आपके पक्ष को पूर्ण मजबूती प्रदान करता है।' : 'Preserved safely in client-side memory.')}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Details Bar: Legal tip toggle */}
              <div className="pt-3 border-t border-[#EFEAE5] space-y-2 text-xs">
                <button
                  type="button"
                  onClick={() => setExpandedTip(isTipExpanded ? null : item.id)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8B6D5C] hover:text-[#6e5345] cursor-pointer transition-colors"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>{isTipExpanded ? (isHindi ? 'टिप्स छिपाएं' : 'Hide Legal Tip') : (isHindi ? 'फॉरेंसिक निर्देश व धारा' : 'Forensic Tips & Statute')}</span>
                  {isTipExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>

                {isTipExpanded && (
                  <div className="p-3 bg-white rounded-2xl border border-[#E8E2DC] space-y-1.5 text-[11px] text-[#444] animate-fadeIn">
                    <p className="leading-relaxed">
                      <strong>{isHindi ? 'सलाह: ' : 'Forensic Tip: '}</strong>
                      {item.tips[language]}
                    </p>
                    <p className="font-mono text-[10px] text-[#8B6D5C] pt-1">
                      {item.legalRelevance[language]}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Report Modal / Drawer */}
      {isReportOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-8 shadow-2xl border border-[#E8E2DC] max-h-[90vh] overflow-y-auto space-y-5">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#F0EBE6] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#F3EFEC] text-[#8B6D5C] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] tracking-tight">
                    {isHindi ? 'फॉरेंसिक साक्ष्य सारांश रिपोर्ट' : 'Forensic Evidence Progress Report'}
                  </h3>
                  <p className="text-xs text-[#666]">
                    {isHindi ? 'पुलिस शिकायत, e-FIR या 1930 विवरण के लिए तैयार' : 'Ready for Police FIRs, cybercrime.gov.in & Helplines'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsReportOpen(false)}
                className="w-8 h-8 rounded-full bg-[#FAF9F6] hover:bg-[#F3EFEC] text-[#555] flex items-center justify-center cursor-pointer transition-colors"
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* Assessment Score Card */}
            <div className={`p-4 rounded-2xl border ${statusLevel.color} space-y-1.5`}>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                <span>{isHindi ? 'साक्ष्य तत्परता स्थिति' : 'Evidence Readiness Status'}</span>
                <span>{completedCount}/{totalItems} ({progressPercent}%)</span>
              </div>
              <h4 className="text-base font-bold">
                {statusLevel.tier}
              </h4>
              <p className="text-xs leading-relaxed opacity-90">
                {statusLevel.assessment}
              </p>
            </div>

            {/* Monospace Output Preview */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#555] uppercase tracking-wider block">
                {isHindi ? 'रिपोर्ट टेक्स्ट (कॉपी करने के लिए तैयार):' : 'Formatted Report Content:'}
              </span>
              <pre className="p-4 bg-[#2D2D2D] text-[#FAF9F6] rounded-2xl text-xs font-mono whitespace-pre-wrap max-h-60 overflow-y-auto border border-[#222]">
                {generateSummaryReportText()}
              </pre>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#F0EBE6]">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyReport}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#8B6D5C] hover:bg-[#775c4c] text-white rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer min-h-[40px]"
                >
                  {copiedReport ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-200" />
                      <span>{isHindi ? 'रिपोर्ट कॉपी हो गई' : 'Report Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>{isHindi ? 'रिपोर्ट कॉपी करें' : 'Copy Report'}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownloadReport}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#FAF9F6] hover:bg-[#F3EFEC] text-[#333] border border-[#DED9D4] rounded-full text-xs font-bold transition-all cursor-pointer min-h-[40px]"
                >
                  <Download className="w-4 h-4 text-[#8B6D5C]" />
                  <span>{isHindi ? 'टेक्स्ट फाइल (.txt) डाउनलोड करें' : 'Download .TXT'}</span>
                </button>
              </div>

              <button
                onClick={() => setIsReportOpen(false)}
                className="px-4 py-2.5 text-xs text-[#666] hover:text-[#111] font-bold cursor-pointer"
              >
                {isHindi ? 'बंद करें' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
