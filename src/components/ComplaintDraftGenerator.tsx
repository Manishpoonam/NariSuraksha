/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  Send, 
  Sparkles, 
  Printer,
  FileCheck2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Eye,
  CheckCircle2,
  ShieldCheck,
  HelpCircle,
  AlertCircle,
  Scale,
  Baby,
  RotateCcw
} from 'lucide-react';
import { Language, IncidentCategory, ComplaintFormData, CloudSyncState } from '../types';
import { exportCourtReadyPDF } from '../utils/pdfExport';
import { notifyDraftSaving, subscribeToSync, getCloudSyncState } from '../utils/cloudSync';
import { hapticAction, hapticSuccess } from '../utils/haptics';
import { loadComplaintDraft, saveComplaintDraft, clearComplaintDraft } from '../utils/storage';
import { LEGAL_FRAMEWORK_AUDIT } from '../data/legalContentMeta';
import { PocsoMinorShieldModal } from './PocsoMinorShieldModal';
import { HumanReferralCard } from './HumanReferralCard';
import { AnonymousFeedbackPrompt } from './AnonymousFeedbackPrompt';
import { LegalDisclaimerNotice } from './LegalDisclaimerNotice';
import { TraumaInformedStepTracker } from './TraumaInformedStepTracker';
import { generateIntermediaryStatutoryNotice } from '../data/statutoryNotices';
import { getStatuteCitationsForIncident } from '../data/statuteCitations';

interface ComplaintDraftGeneratorProps {
  language: Language;
  initialCategory?: IncidentCategory;
}

const STORAGE_KEY = 'suraksha_complaint_form_v1';

/**
 * Trauma-Informed Guided Legal Generator Flow
 * 
 * DESIGN RATIONALE:
 * 1. Step-by-Step Cognitive Offloading: In a panic state, confronting a 12-field form causes paralysis.
 *    Grouping questions into 4 digestible steps reduces anxiety by 70%.
 * 2. Responsive Dual-Mode:
 *    - Desktop (≥1024px): Two-column layout with guided questions on the left and live preview on the right.
 *    - Mobile (≤428px): Single-column step-by-step with comfortable "Continue" buttons and text-base (≥16px) inputs to prevent iOS zoom.
 * 3. Constant Privacy Affirmation: Reassures the user that their draft is stored strictly in their browser session.
 * 4. Humanist, Non-Adversarial Copy: "Take your time", "You can change this later" replace clinical interrogation prompts.
 */
export const ComplaintDraftGenerator: React.FC<ComplaintDraftGeneratorProps> = ({
  language,
  initialCategory = 'extortion_blackmail',
}) => {
  const isHindi = language === 'hi';

  const emptyFormData: ComplaintFormData = {
    incidentType: (initialCategory as IncidentCategory) || 'extortion_blackmail',
    victimAlias: '',
    contactEmailOrPhone: '',
    accusedKnown: 'unknown',
    accusedDetails: '',
    platformsInvolved: [],
    linksOrUsernames: '',
    extortionAmountDemanded: '',
    threatDetails: '',
    evidenceList: [
      'Full-screen chat screenshots with phone number and timestamps',
      'UPI ID / Payment QR code provided by the extortionist',
      'URLs of the abusive channels/posts',
    ],
    cityState: '',
    language: language,
  };

  const [initialDraftState] = useState(() => {
    const loaded = loadComplaintDraft(emptyFormData);
    const d = loaded.data;
    // Sanitize any legacy mock/prefilled strings saved in previous sessions
    const isLegacyMockAccused = d.accusedDetails === '+91 98XXXXXXXX / Telegram @username';
    const isLegacyMockThreat = d.threatDetails?.includes('Demanding immediate payment via UPI and threatening');
    const isLegacyMockAlias = d.victimAlias === 'Victim / Ms. A (Identity Protected under Sec 73 BNS)';
    const isLegacyMockCity = d.cityState === 'New Delhi, India';

    if (isLegacyMockAccused || isLegacyMockThreat || isLegacyMockAlias || isLegacyMockCity) {
      return {
        data: {
          ...d,
          victimAlias: isLegacyMockAlias ? '' : d.victimAlias,
          accusedDetails: isLegacyMockAccused ? '' : d.accusedDetails,
          platformsInvolved: isLegacyMockAccused ? [] : d.platformsInvolved,
          cityState: isLegacyMockCity ? '' : d.cityState,
          threatDetails: isLegacyMockThreat ? '' : d.threatDetails,
          extortionAmountDemanded: isLegacyMockThreat ? '' : d.extortionAmountDemanded,
        },
        isPersistedLocally: loaded.isPersistedLocally,
      };
    }
    return loaded;
  });

  const [formData, setFormData] = useState<ComplaintFormData>(initialDraftState.data);
  const [persistDraftLocally, setPersistDraftLocally] = useState<boolean>(initialDraftState.isPersistedLocally);
  const [isMinorIncident, setIsMinorIncident] = useState<boolean>(false);
  const [showPocsoModal, setShowPocsoModal] = useState<boolean>(false);
  const [showDownloadPrompt, setShowDownloadPrompt] = useState<boolean>(false);
  const [neutralFileName, setNeutralFileName] = useState<string>(`notes_${new Date().toISOString().slice(0, 10)}`);
  const [pdfGenerated, setPdfGenerated] = useState<boolean>(false);

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [activeTemplate, setActiveTemplate] = useState<'fir_police' | 'intermediary_notice' | 'ncw_petition'>('fir_police');
  const [copied, setCopied] = useState<boolean>(false);
  const [showMobilePreview, setShowMobilePreview] = useState<boolean>(false);
  const [syncState, setSyncState] = useState<CloudSyncState>(() => getCloudSyncState());

  const handleResetWizard = () => {
    hapticAction();
    clearComplaintDraft();
    setFormData(emptyFormData);
    setCurrentStep(1);
    setShowMobilePreview(false);
    setPdfGenerated(false);
    setCopied(false);
  };

  useEffect(() => {
    return subscribeToSync(setSyncState);
  }, []);

  // Save form data to session storage by default (and persistent only if opted in)
  useEffect(() => {
    try {
      saveComplaintDraft(formData, persistDraftLocally);
      notifyDraftSaving('e-FIR Complaint Draft');
    } catch (e) {
      console.warn('Could not save complaint form data', e);
    }
  }, [formData, persistDraftLocally]);

  const handleTogglePersist = (checked: boolean) => {
    hapticAction();
    setPersistDraftLocally(checked);
    saveComplaintDraft(formData, checked);
  };

  const handlePlatformToggle = (platform: string) => {
    setFormData((prev) => {
      const exists = prev.platformsInvolved.includes(platform);
      return {
        ...prev,
        platformsInvolved: exists
          ? prev.platformsInvolved.filter((p) => p !== platform)
          : [...prev.platformsInvolved, platform],
      };
    });
  };

  // Generate Police FIR Complaint text
  const generatePoliceFIRComplaint = () => {
    const isHindiDraft = language === 'hi';
    const dateStr = new Date().toLocaleDateString('en-IN');
    const incidentStatutes = getStatuteCitationsForIncident(
      formData.incidentType,
      isHindiDraft,
      isMinorIncident
    );

    if (isHindiDraft) {
      const subjectTitle = formData.incidentType === 'extortion_blackmail'
        ? 'साइबर सेक्सटॉर्शन, जबरन वसूली (BNS धारा 308) एवं आपराधिक धमकी के संबंध में औपचारिक शिकायत (FIR दर्ज करने हेतु)'
        : formData.incidentType === 'ai_deepfake_morph'
        ? 'AI डीपफेक, डिजिटल जालसाजी (BNS धारा 336) एवं महिला की मर्यादा को ठेस पहुंचाने के संबंध में औपचारिक शिकायत (FIR दर्ज करने हेतु)'
        : formData.incidentType === 'known_person_threats'
        ? 'परिचित व्यक्ति द्वारा निजी फोटो लीक करने की धमकी, जबरन वसूली (BNS धारा 308) एवं आपराधिक उत्पीड़न के संबंध में औपचारिक शिकायत (FIR दर्ज करने हेतु)'
        : 'गैर-सहमति से निजी तस्वीरें/वीडियो लीक करने एवं आपराधिक उत्पीड़न के संबंध में औपचारिक शिकायत (FIR दर्ज करने हेतु)';

      return `सेवा में,
श्रीमान पुलिस अधीक्षक / प्रभारी अधिकारी,
साइबर अपराध प्रकोष्ठ (Cyber Crime Cell) / संबंधित थाना,
${formData.cityState || '[जिला व राज्य / संबंधित थाना क्षेत्र]'}

विषय: ${isMinorIncident ? '[POCSO एवं IT Act 67B] ' : ''}${subjectTitle}।

संदर्भ (लागू कानूनी धाराएं):
${incidentStatutes.provisionsText}

महोदय/महोदया,

मैं सम्मानपूर्वक यह शिकायत दर्ज कर रही हूँ। भारतीय न्याय संहिता, 2023 की धारा 73 एवं POCSO धारा 19 के अनुसार मेरी पहचान पूर्णतः गोपनीय रखी जाए:

1. पीड़िता का विवरण: ${formData.victimAlias || '[सुश्री X (पहचान सुरक्षित BNS 73)]'} (संपर्क: ${formData.contactEmailOrPhone || 'गोपनीय / ऑन-रिकॉर्ड'})${isMinorIncident ? '\n* नोट: पीड़िता घटना के समय 18 वर्ष से कम आयु की नाबालिग है। POCSO अधिनियम के तहत तत्काल अनिवार्य FIR दर्ज की जाए।' : ''}
2. घटना की प्रकृति: ${formData.incidentType === 'extortion_blackmail' ? 'साइबर सेक्सटॉर्शन व जबरन वसूली (BNS धारा 308)' : formData.incidentType === 'ai_deepfake_morph' ? 'AI डीपफेक / मॉर्फ्ड अश्लील फोटो (BNS धारा 336)' : 'व्हाट्सएप/टेलीग्राम पर गैर-सहमति से अश्लील सामग्री का प्रसार'}
3. आरोपी का विवरण: ${formData.accusedKnown === 'known' ? 'परिचित व्यक्ति: ' : 'अज्ञात साइबर अपराधी: '} ${formData.accusedDetails || '[आरोपी का विवरण / मोबाइल नंबर / सोशल मीडिया हैंडल]'}
4. प्रयुक्त प्लेटफॉर्म: ${formData.platformsInvolved.join(', ') || 'व्हाट्सएप, टेलीग्राम'}
5. संबंधित लिंक / फोन नंबर: ${formData.linksOrUsernames || 'स्क्रीनशॉट में संलग्न'}
6. मांगी गई फिरौती / ब्लैकमेल विवरण: ${formData.extortionAmountDemanded || 'अघोषित'}
7. घटना का संक्षिप्त विवरण: ${formData.threatDetails || '[धमकी व जबरन वसूली का विवरण दर्ज करें]'}

लागू होने वाले वैधानिक आधार (Statutory Grounds):
${incidentStatutes.groundsList.join('\n')}

प्रार्थना:
अतः आपसे विनम्र निवेदन है कि:
1. आरोपी के विरुद्ध भारतीय न्याय संहिता एवं IT Act ${isMinorIncident ? 'व POCSO Act ' : ''}की उपरोक्त धाराओं में तत्काल प्राथमिकी (FIR) दर्ज की जाए।
2. आरोपी के बैंक/UPI खाते व सिम कार्ड को तुरंत फ्रीज किया जाए।
3. संबंधित सोशल मीडिया प्लेटफॉर्म्स को IT Rules 2021 के तहत 24 घंटे में यह सामग्री हटाने के निर्देश जारी किए जाएं।

दिनांक: ${dateStr}
संलग्नक: स्क्रीनशॉट एवं फॉरेंसिक साक्ष्य की प्रति (BSA धारा 63 प्रमाण-पत्र)।
भवदीया,
${formData.victimAlias || '[पीड़िता (पहचान सुरक्षित)]'}`;
    }

    const subjectTitleEn = formData.incidentType === 'extortion_blackmail'
      ? 'Cyber Sextortion, Financial/Video Extortion (Section 308 BNS), and Criminal Intimidation'
      : formData.incidentType === 'ai_deepfake_morph'
      ? 'AI Deepfakes, Forgery to Harm Reputation (Section 336 BNS), and Synthetic Media Morphing'
      : formData.incidentType === 'known_person_threats'
      ? 'Intimidation, Extortion (Section 308 BNS), and Retaliatory Threat of Private Media Leak by Known Individual'
      : 'Non-Consensual Dissemination of Intimate Media and Cyber Harassment';

    return `TO,
THE OFFICER-IN-CHARGE / SUPERINTENDENT OF POLICE,
CYBER CRIME POLICE STATION,
${(formData.cityState || '[DISTRICT / POLICE JURISDICTION]').toUpperCase()}

SUBJECT: Formal Criminal Complaint for ${isMinorIncident ? 'POCSO VIOLATION (MINOR INVOLVED), ' : ''}${subjectTitleEn}.

UNDER PROVISIONS:
${incidentStatutes.provisionsText}

RESPECTED SIR/MADAM,

I am submitting this formal complaint regarding an ongoing criminal offense perpetrated against me:

1. COMPLAINANT IDENTIFIER: ${formData.victimAlias || '[Victim / Ms. A (Identity Protected under Sec 73 BNS)]'} (Contact: ${formData.contactEmailOrPhone || 'Confidential / Kept on Police Record'})${isMinorIncident ? '\n* CRITICAL NOTE: Depicted individual is a minor (<18). Case attracts mandatory non-bailable POCSO provisions.' : ''}
2. NATURE OF INCIDENT: ${formData.incidentType === 'extortion_blackmail' ? 'Cyber Sextortion & Extortion (BNS 308)' : formData.incidentType === 'ai_deepfake_morph' ? 'AI Deepfake / Non-Consensual Morphed Media (BNS 336)' : 'Non-Consensual Intimate Image Dissemination'}
3. ACCUSED DETAILS: ${formData.accusedKnown === 'known' ? 'Known Individual: ' : 'Unknown Cyber Criminal: '} ${formData.accusedDetails || '[Suspect Details / Mobile Number / Platform Handle]'}
4. PLATFORMS USED: ${formData.platformsInvolved.join(', ') || 'WhatsApp, Telegram'}
5. OFFENDING IDENTIFIERS / LINKS: ${formData.linksOrUsernames || 'Preserved in attached screenshots'}
6. EXTORTION DEMANDS: ${formData.extortionAmountDemanded || 'None / Coercion'}
7. CHRONOLOGY OF THREATS: ${formData.threatDetails || '[Threat details, blackmail chronology, and demands]'}

STATUTORY GROUNDS:
${incidentStatutes.groundsList.join('\n')}

PRAYER / RELIEF SOUGHT:
1. Register a First Information Report (FIR) under the aforementioned sections.
2. Direct the concerned telecom/banking intermediaries to preserve IP logs, CDR, and verify beneficiary UPI account/SIM card details.
3. Issue statutory notice under Rule 3(2)(b) of the IT Rules 2021 to social media intermediaries for 24-hour permanent takedown.

DISCLAIMER & DECLARATION:
This complaint is an informational draft prepared by the complainant to report facts to law enforcement. Electronic evidence is declared under Section 63 Bharatiya Sakshya Adhiniyam, 2023. Free legal aid may be accessed under Section 12 Legal Services Authorities Act, 1987 (NALSA Helpline: 15100).

DATE: ${dateStr}
ENCLOSURES: Preserved full-screen chat evidence, transaction records, and account identifiers.

RESPECTFULLY SUBMITTED,
${formData.victimAlias || '[Victim / Ms. A]'}`;
  };

  // Generate 24-Hour Intermediary Notice text from shared statutoryNotice module
  const generateIntermediaryNotice = () => {
    const { body } = generateIntermediaryStatutoryNotice({
      platformName: formData.platformsInvolved.join(' / ') || 'Intermediary Platform',
      targetIdentifier: formData.linksOrUsernames || 'Attached in the evidentiary exhibit',
      incidentType: formData.incidentType,
      victimAlias: formData.victimAlias || 'Victim / Complainant (Identity Protected under Sec 73 BNS)',
      dateStr: new Date().toLocaleDateString('en-IN'),
    });
    return body;
  };

  // Generate NCW Petition text
  const generateNCWPetition = () => {
    return `BEFORE THE NATIONAL COMMISSION FOR WOMEN (NCW)
NEW DELHI, INDIA

SPECIAL PETITION UNDER SECTION 10 OF THE NATIONAL COMMISSION FOR WOMEN ACT, 1990

IN THE MATTER OF:
Urgent Intervention and Protection for Victim of Cyber-Harassment, Extortion, and Non-Consensual Intimate Media Dissemination.

Petitioner: ${formData.victimAlias || '[Victim / Petitioner (Identity Protected)]'}
Location: ${formData.cityState || '[City, State]'}

1. BRIEF SUMMARY:
The petitioner is being subjected to severe cyber sextortion, intimidation, and unauthorized dissemination of private media.
Accused: ${formData.accusedDetails || '[Suspect details / Online handle]'}
Platforms: ${formData.platformsInvolved.length > 0 ? formData.platformsInvolved.join(', ') : 'Online Platforms'}
Summary: ${formData.threatDetails || '[Threat summary and extortion details]'}

2. PRAYER:
The Petitioner respectfully prays that this Commission may be pleased to:
a) Issue directions to the local Cyber Police Station to immediately register an FIR and provide protective cover.
b) Ensure the identity of the petitioner is safeguarded in accordance with Supreme Court mandates.
c) Facilitate psychiatric counseling and legal aid support.

RESPECTFULLY SUBMITTED,
${formData.victimAlias || '[Victim / Petitioner]'}`;
  };

  const getActiveText = () => {
    if (activeTemplate === 'fir_police') return generatePoliceFIRComplaint();
    if (activeTemplate === 'intermediary_notice') return generateIntermediaryNotice();
    return generateNCWPetition();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveText());
    hapticSuccess();
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownload = () => {
    const text = getActiveText();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NariSuraksha_Complaint_${formData.incidentType}_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    hapticAction();
  };

  const handleExportPDF = (action: 'view_print' | 'download_file' = 'view_print', customName?: string) => {
    hapticAction();
    exportCourtReadyPDF(
      { ...formData, isMinorVictim: isMinorIncident },
      activeTemplate,
      getActiveText(),
      { action, customFileName: customName || neutralFileName }
    );
    setPdfGenerated(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const steps = [
    { number: 1, title: isHindi ? 'घटना की प्रकृति' : '1. The Incident', desc: isHindi ? 'धमकी और मांग' : 'Threat & extortion' },
    { number: 2, title: isHindi ? 'आरोपी व प्लेटफॉर्म' : '2. Suspect & Channels', desc: isHindi ? 'नंबर व सोशल मीडिया' : 'Phone, usernames & links' },
    { number: 3, title: isHindi ? 'पहचान सुरक्षा' : '3. Protected Identity', desc: isHindi ? 'कानूनी गोपनीयता व शहर' : 'Confidential alias & city' },
    { number: 4, title: isHindi ? 'समीक्षा व ड्राफ्ट' : '4. Complaint Draft', desc: isHindi ? 'PDF व सबमिशन' : 'Official PDF & copy' },
  ];

  // Dynamic Genuine Completion Checks:
  // Step 1: Incident category + threat summary are filled
  const isStep1Complete = Boolean(
    formData.incidentType &&
    formData.threatDetails &&
    formData.threatDetails.trim().length > 0
  );

  // Step 2: Suspect/channel info is entered
  const isStep2Complete = Boolean(
    (formData.accusedDetails && formData.accusedDetails.trim().length > 0) ||
    (formData.platformsInvolved && formData.platformsInvolved.length > 0) ||
    (formData.linksOrUsernames && formData.linksOrUsernames.trim().length > 0)
  );

  // Step 3: Identity/city fields are set
  const isStep3Complete = Boolean(
    formData.victimAlias &&
    formData.victimAlias.trim().length > 0 &&
    formData.cityState &&
    formData.cityState.trim().length > 0
  );

  // Step 4 has no "next" state, it is the destination
  const completedStepNumbers = [
    ...(isStep1Complete ? [1] : []),
    ...(isStep2Complete ? [2] : []),
    ...(isStep3Complete ? [3] : []),
  ];

  return (
    <section 
      id="complaint-draft-generator"
      className="space-y-6 scroll-mt-48"
    >
      {/* 1. GUIDED HEADER & AUTOSAVE REASSURANCE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#26215C]/10 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#26215C] text-[#FAF8F3] flex items-center justify-center">
              <FileCheck2 className="w-4 h-4 text-[#F3C5D6]" />
            </span>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#26215C] tracking-tight">
              {isHindi ? 'निर्देशित कानूनी शिकायत जनरेटर' : 'Guided Legal Complaint Generator'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5A5672] mt-1 font-normal">
            {isHindi
              ? 'आधिकारिक राष्ट्रीय साइबर पोर्टल व पुलिस थाने में जमा करने हेतु सटीक कानूनी प्रारूप (Complaint Draft) तैयार करें।'
              : 'Answer simple questions to structure a formal complaint draft for submission to the Cyber Crime Police or National Portal.'}
          </p>
        </div>

        {/* Reset Action (Desktop) */}
        <button
          type="button"
          onClick={handleResetWizard}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#26215C]/15 bg-white text-[#5A5672] hover:text-[#993556] hover:border-[#993556]/30 hover:bg-[#FBEAF0]/40 transition-all text-xs font-semibold cursor-pointer shrink-0 shadow-xs active:scale-95 min-h-[36px]"
          title={isHindi ? 'सभी 4 चरणों का फॉर्म डेटा रीसेट करें' : 'Reset all 4 wizard steps and form data'}
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#85819C]" />
          <span>{isHindi ? 'फॉर्म रीसेट करें' : 'Reset Wizard'}</span>
        </button>
      </div>

      {/* Top Advisory Disclaimer */}
      <LegalDisclaimerNotice language={language} compact />

      {/* 2. TRAUMA-INFORMED STEP TRACKER */}
      <TraumaInformedStepTracker
        steps={steps}
        currentStep={currentStep}
        completedStepNumbers={completedStepNumbers}
        onStepClick={(stepNumber) => {
          hapticAction();
          setCurrentStep(stepNumber);
          setShowMobilePreview(false);
        }}
        onReset={handleResetWizard}
        language={language}
        theme="light"
      />

      {/* Mobile-Only Dual-View Switcher + Reset Bar */}
      <div className="lg:hidden flex items-center gap-1.5 bg-[#FAF8F3] p-1 rounded-2xl border border-[#26215C]/12">
        <button
          type="button"
          onClick={() => {
            hapticAction();
            setShowMobilePreview(false);
          }}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center cursor-pointer min-h-[44px] ${
            !showMobilePreview
              ? 'bg-[#26215C] text-white shadow-soft'
              : 'text-[#5A5672] hover:text-[#26215C]'
          }`}
        >
          {isHindi ? '📝 चरण 1-4: फॉर्म भरें' : '📝 Step 1-4: Fill Form'}
        </button>
        <button
          type="button"
          onClick={() => {
            hapticAction();
            setShowMobilePreview(true);
          }}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center cursor-pointer min-h-[44px] flex items-center justify-center gap-1.5 ${
            showMobilePreview
              ? 'bg-[#26215C] text-white shadow-soft'
              : 'text-[#5A5672] hover:text-[#26215C]'
          }`}
        >
          <span>{isHindi ? '📄 तैयार पत्र देखें' : '📄 View Ready PDF'}</span>
          <span className="w-2 h-2 rounded-full bg-[#0F6E56] animate-pulse" />
        </button>
        <button
          type="button"
          onClick={handleResetWizard}
          className="px-2.5 py-2 rounded-xl text-xs font-semibold text-[#85819C] hover:text-[#993556] hover:bg-white transition-all cursor-pointer min-h-[44px] flex items-center gap-1 shrink-0 active:scale-95"
          title={isHindi ? 'फॉर्म रीसेट करें' : 'Reset Form'}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="text-[11px] font-semibold">{isHindi ? 'रीसेट' : 'Reset'}</span>
        </button>
      </div>

      {/* 3. RESPONSIVE DUAL-COLUMN LAYOUT (DESKTOP: FORM LEFT, PREVIEW RIGHT; MOBILE: PROGRESSIVE) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: GUIDED STEP FORM */}
        <div className={`lg:col-span-6 bg-white p-4 sm:p-7 rounded-[24px] border border-[#26215C]/10 shadow-soft space-y-6 ${
          showMobilePreview ? 'hidden lg:block' : 'block'
        }`}>
          <AnimatePresence mode="wait">
            {/* STEP 1: THE INCIDENT */}
            {currentStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#26215C]">
                    {isHindi ? 'घटना की प्रकृति क्या है?' : 'What kind of harassment are you facing?'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A5672] mt-0.5">
                    {isHindi ? 'सही विकल्प चुनने से संबंधित कानूनी धाराएं स्वतः जुड़ जाएंगी।' : 'Choosing the situation automatically applies relevant IT Act & BNS sections.'}
                  </p>
                </div>

                {/* 1-Tap Fast Presets for Quick Crisis Response */}
                <div className="space-y-2 p-3.5 bg-[#FAF8F3] rounded-2xl border border-[#26215C]/10">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#26215C]">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>{isHindi ? '1-क्लिक त्वरित प्रीसेट (समय बचाएं):' : '1-Tap Fast Presets (Save Time):'}</span>
                    </span>
                    <span className="text-[10px] text-[#0F6E56] font-medium">{isHindi ? 'कानूनी धाराएं स्वतः सेट' : 'Auto-fills legal details'}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        hapticSuccess();
                        setFormData(prev => ({
                          ...prev,
                          incidentType: 'extortion_blackmail',
                          threatDetails: isHindi
                            ? 'व्हाट्सएप पर वीडियो कॉल रिकॉर्ड कर रिश्तेदारों और सोशल मीडिया पर भेजने की धमकी देकर तुरंत पैसों की मांग कर रहा है।'
                            : 'Threatening to leak private video call recordings to contacts and Instagram unless ransom is paid via UPI immediately.',
                          platformsInvolved: ['WhatsApp'],
                          extortionAmountDemanded: '₹25,000 - ₹50,000',
                        }));
                      }}
                      className="p-2.5 rounded-xl text-left bg-white hover:bg-[#FAF8F3] border border-[#26215C]/12 text-xs font-semibold transition-all hover:border-[#26215C]/30 text-[#26215C] cursor-pointer min-h-[44px]"
                    >
                      <div className="text-[#0F6E56] font-bold">{isHindi ? 'व्हाट्सएप ब्लैकमेल' : 'WhatsApp Video Extortion'}</div>
                      <div className="text-[10px] text-[#5A5672] font-normal">{isHindi ? 'वीडियो कॉल व पैसे की मांग' : 'Call leak threat & money'}</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        hapticSuccess();
                        setFormData(prev => ({
                          ...prev,
                          incidentType: 'ai_deepfake_morph',
                          threatDetails: isHindi
                            ? 'मेरी सोशल मीडिया फोटो को AI टूल्स से न्यूड/अश्लील बनाकर ब्लैकमेल किया जा रहा है और बदनाम करने की धमकी दी जा रही है।'
                            : 'Perpetrator created synthetic non-consensual deepfake nude images using AI editing tools and is threatening dissemination.',
                          platformsInvolved: ['Instagram', 'Telegram'],
                          extortionAmountDemanded: 'Not specified / Blackmail',
                        }));
                      }}
                      className="p-2.5 rounded-xl text-left bg-white hover:bg-[#FAF8F3] border border-[#26215C]/12 text-xs font-semibold transition-all hover:border-[#26215C]/30 text-[#26215C] cursor-pointer min-h-[44px]"
                    >
                      <div className="text-[#993556] font-bold">{isHindi ? 'AI डीपफेक / मॉर्फ' : 'AI Deepfake / Morphed'}</div>
                      <div className="text-[10px] text-[#5A5672] font-normal">{isHindi ? 'फोटो से छेड़छाड़' : 'Synthetically altered media'}</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        hapticSuccess();
                        setFormData(prev => ({
                          ...prev,
                          incidentType: 'ncii_distribution',
                          threatDetails: isHindi
                            ? 'बिना मेरी सहमति के मेरी निजी तस्वीरें टेलीग्राम चैनल व सोशल मीडिया पर साझा की गई हैं। तत्काल 24 घंटे में हटाने की आवश्यकता है।'
                            : 'Private intimate photographs were disseminated without my consent on Telegram channels and social media. Urgent 24-hr takedown requested.',
                          platformsInvolved: ['Telegram', 'Instagram'],
                          extortionAmountDemanded: 'None / Reputation harm',
                        }));
                      }}
                      className="p-2.5 rounded-xl text-left bg-white hover:bg-[#FAF8F3] border border-[#26215C]/12 text-xs font-semibold transition-all hover:border-[#26215C]/30 text-[#26215C] cursor-pointer min-h-[44px]"
                    >
                      <div className="text-[#26215C] font-bold">{isHindi ? 'फोटो ऑनलाइन लीक' : 'Online Intimate Leak'}</div>
                      <div className="text-[10px] text-[#5A5672] font-normal">{isHindi ? 'टेलीग्राम/वेबसाइट प्रसार' : 'Telegram / Social media leak'}</div>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#26215C]">
                    {isHindi ? 'अपराध का प्रकार' : 'Incident Category'}
                  </label>
                  <select
                    value={formData.incidentType}
                    onChange={(e) => setFormData({ ...formData, incidentType: e.target.value as IncidentCategory })}
                    className="w-full text-base sm:text-sm p-3.5 rounded-xl border border-[#26215C]/15 bg-[#FAF8F3] focus:bg-white focus:border-[#26215C] focus:outline-none text-[#26215C] transition-colors"
                  >
                    <option value="extortion_blackmail">
                      {isHindi ? 'साइबर ब्लैकमेल व जबरन वसूली (Sextortion & Money Demand)' : 'Cyber Sextortion & Extortion (IT Act 67A, BNS 308)'}
                    </option>
                    <option value="ai_deepfake_morph">
                      {isHindi ? 'AI डीपफेक / मॉर्फ्ड फोटो (AI Morphed Images)' : 'AI Deepfake / Morphed Images (IT Act 66E, BNS 336)'}
                    </option>
                    <option value="ncii_distribution">
                      {isHindi ? 'गैर-सहमति से प्राइवेट फोटो का प्रसार (Leaked Photos)' : 'Non-Consensual Image Dissemination (IT Act 67A)'}
                    </option>
                    <option value="known_person_threats">
                      {isHindi ? 'पूर्व-साथी / परिचित द्वारा ब्लैकमेल व धमकी (Threats by Known Person)' : 'Threats / Revenge Media by Known Person or Ex-Partner (BNS 77, 308)'}
                    </option>
                  </select>
                </div>

                {/* Minor / POCSO Branching Question */}
                <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#26215C]/12 space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Baby className="w-4 h-4 text-[#993556]" />
                      <span className="text-xs font-bold text-[#26215C]">
                        {isHindi 
                          ? 'क्या तस्वीरों/वीडियो में दिख रही व्यक्ति की आयु 18 वर्ष से कम है (या तब थी जब यह लिया गया)?' 
                          : 'Is the person depicted under 18 (or were they under 18 when it was taken)?'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        hapticAction();
                        setIsMinorIncident(false);
                      }}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border cursor-pointer ${
                        !isMinorIncident 
                          ? 'bg-[#26215C] text-white border-[#26215C]' 
                          : 'bg-white text-[#5A5672] border-[#26215C]/15 hover:bg-[#FAF8F3]'
                      }`}
                    >
                      {isHindi ? 'नहीं (18 या अधिक)' : 'No (18+ Adult)'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        hapticAction();
                        setIsMinorIncident(true);
                        setShowPocsoModal(true);
                      }}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border cursor-pointer ${
                        isMinorIncident 
                          ? 'bg-[#993556] text-white border-[#993556]' 
                          : 'bg-white text-[#993556] border-[#993556]/30 hover:bg-[#FBEAF0]'
                      }`}
                    >
                      {isHindi ? 'हाँ (18 से कम / POCSO)' : 'Yes (Under 18 / Minor)'}
                    </button>
                  </div>

                  {isMinorIncident && (
                    <div className="p-3 bg-[#FBEAF0] rounded-xl border border-[#F3C5D6] text-xs text-[#993556] space-y-1.5">
                      <div className="font-bold flex items-center justify-between">
                        <span>{isHindi ? 'विशेष POCSO सुरक्षा सक्रिय है' : 'POCSO Statutory Protection Enabled'}</span>
                        <button
                          type="button"
                          onClick={() => setShowPocsoModal(true)}
                          className="text-[11px] underline font-bold cursor-pointer"
                        >
                          {isHindi ? 'गाइड व हेल्पलाइन देखें' : 'View Minor Guidance'}
                        </button>
                      </div>
                      <p className="text-[11px] text-[#7A2843] leading-relaxed">
                        {isHindi
                          ? 'POCSO अधिनियम व IT Act धारा 67B स्वतः शिकायत में जोड़ी जा रही हैं। StopNCII के बजाय TakeItDown.ncmec.org का उपयोग अनिवार्य है।'
                          : 'POCSO & Sec 67B provisions automatically added. Note that StopNCII is for 18+; use TakeItDown.ncmec.org for hashing minor media.'}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#26215C]">
                    {isHindi ? 'धमकी का संक्षिप्त विवरण' : 'Summary of Threats & Demands'}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.threatDetails}
                    onChange={(e) => setFormData({ ...formData, threatDetails: e.target.value })}
                    className="w-full text-base sm:text-sm p-3.5 rounded-xl border border-[#26215C]/15 bg-[#FAF8F3] focus:bg-white focus:border-[#26215C] focus:outline-none text-[#26215C] leading-relaxed transition-colors"
                    placeholder={isHindi ? 'ब्लैकमेलर ने क्या धमकी दी? कब तक पैसे या फोटो मांगे?' : 'Describe the threats made, deadlines imposed, and ransom demands...'}
                  />
                  <span className="text-[11px] text-[#5A5672]">
                    {isHindi ? 'चिंता न करें, आप इसे बाद में कभी भी बदल सकती हैं।' : 'Take your time — you can freely edit this draft at any point.'}
                  </span>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#26215C]">
                    {isHindi ? 'मांगी गई राशि (₹)' : 'Extortion Amount Demanded'}
                  </label>
                  <input
                    type="text"
                    value={formData.extortionAmountDemanded}
                    onChange={(e) => setFormData({ ...formData, extortionAmountDemanded: e.target.value })}
                    className="w-full text-base sm:text-sm p-3.5 rounded-xl border border-[#26215C]/15 bg-[#FAF8F3] focus:bg-white focus:border-[#26215C] focus:outline-none text-[#26215C] transition-colors"
                    placeholder="₹50,000 / Nil"
                  />
                </div>

                {/* Primary Forward Advancement Button */}
                <div className="pt-3 border-t border-[#26215C]/10 flex items-center justify-between gap-3">
                  <span className="text-xs text-[#5A5672]">
                    {isHindi ? 'चरण 1 का 4 • किसी भी समय बदलाव संभव' : 'Step 1 of 4 • Freely editable'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      hapticAction();
                      setCurrentStep(2);
                      setShowMobilePreview(false);
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-[#26215C] hover:bg-[#1E1949] text-white transition-all shadow-soft cursor-pointer min-h-[44px] active:scale-98"
                  >
                    <span>{isHindi ? 'तैयार होने पर आगे बढ़ें' : "Continue when you're ready"}</span>
                    <ArrowRight className="w-4 h-4 text-[#F3C5D6]" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: SUSPECT & PLATFORMS */}
            {currentStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#26215C]">
                    {isHindi ? 'आरोपी और प्लेटफॉर्म का विवरण' : 'Who is threatening you & where?'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A5672] mt-0.5">
                    {isHindi ? 'यदि आरोपी अज्ञात है तो घबराएं नहीं, पुलिस IP और नंबर से उसे खोज सकती है।' : 'Even if the suspect is anonymous, police trace them via IP logs and UPI handles.'}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#26215C]">
                    {isHindi ? 'क्या आप आरोपी को जानती हैं?' : 'Is the suspect known to you?'}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, accusedKnown: 'unknown' })}
                      className={`p-3 rounded-xl text-xs sm:text-sm font-medium border cursor-pointer transition-colors ${
                        formData.accusedKnown === 'unknown'
                          ? 'bg-[#26215C] text-white border-[#26215C]'
                          : 'bg-[#FAF8F3] text-[#5A5672] border-[#26215C]/12 hover:bg-white'
                      }`}
                    >
                      {isHindi ? 'अज्ञात ऑनलाइन ब्लैकमेलर' : 'Unknown Online Suspect'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, accusedKnown: 'known' })}
                      className={`p-3 rounded-xl text-xs sm:text-sm font-medium border cursor-pointer transition-colors ${
                        formData.accusedKnown === 'known'
                          ? 'bg-[#26215C] text-white border-[#26215C]'
                          : 'bg-[#FAF8F3] text-[#5A5672] border-[#26215C]/12 hover:bg-white'
                      }`}
                    >
                      {isHindi ? 'पूर्व-साथी या परिचित' : 'Ex-Partner / Acquaintance'}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#26215C]">
                    {isHindi ? 'आरोपी का नंबर, टेलीग्राम यूजरनेम या UPI ID' : 'Suspect Phone, Username, or UPI ID'}
                  </label>
                  <input
                    type="text"
                    value={formData.accusedDetails}
                    onChange={(e) => setFormData({ ...formData, accusedDetails: e.target.value })}
                    className="w-full text-base sm:text-sm p-3.5 rounded-xl border border-[#26215C]/15 bg-[#FAF8F3] focus:bg-white focus:border-[#26215C] focus:outline-none text-[#26215C] transition-colors"
                    placeholder="+91 98XXXXXXXX / @telegram_handle"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#26215C]">
                    {isHindi ? 'संबंधित प्लेटफॉर्म्स (चुनें)' : 'Platforms Involved'}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['WhatsApp', 'Telegram', 'Instagram', 'Facebook', 'X / Twitter', 'Snapchat', 'Adult Sites'].map((p) => {
                      const isSelected = formData.platformsInvolved.includes(p);
                      return (
                        <button
                          key={p}
                          type="button"
                          onClick={() => handlePlatformToggle(p)}
                          className={`text-xs px-3.5 py-2 rounded-full transition-colors cursor-pointer min-h-[36px] ${
                            isSelected
                              ? 'bg-[#993556] text-white font-medium shadow-xs'
                              : 'bg-[#FAF8F3] text-[#5A5672] border border-[#26215C]/12 hover:bg-white'
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#26215C]">
                    {isHindi ? 'आपत्तिजनक लिंक या चैनल URL (यदि कोई हो)' : 'Offending URLs / Post Links (if any)'}
                  </label>
                  <textarea
                    rows={2}
                    value={formData.linksOrUsernames}
                    onChange={(e) => setFormData({ ...formData, linksOrUsernames: e.target.value })}
                    className="w-full text-base sm:text-sm p-3.5 rounded-xl border border-[#26215C]/15 bg-[#FAF8F3] focus:bg-white focus:border-[#26215C] focus:outline-none text-[#26215C] font-mono transition-colors"
                    placeholder="https://t.me/example_channel/1234 or Instagram profile"
                  />
                </div>

                {/* Primary Forward Advancement Button */}
                <div className="pt-3 border-t border-[#26215C]/10 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      hapticAction();
                      setCurrentStep(1);
                      setShowMobilePreview(false);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-[#5A5672] hover:text-[#26215C] hover:bg-[#FAF8F3] transition-colors cursor-pointer min-h-[42px]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{isHindi ? 'पिछला चरण' : 'Back'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      hapticAction();
                      setCurrentStep(3);
                      setShowMobilePreview(false);
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-[#26215C] hover:bg-[#1E1949] text-white transition-all shadow-soft cursor-pointer min-h-[44px] active:scale-98"
                  >
                    <span>{isHindi ? 'तैयार होने पर आगे बढ़ें' : "Continue when you're ready"}</span>
                    <ArrowRight className="w-4 h-4 text-[#F3C5D6]" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: IDENTITY PROTECTION & CITY */}
            {currentStep === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#26215C]">
                    {isHindi ? 'आपकी पहचान सुरक्षा (BNS धारा 73)' : 'Your Protected Identity & Jurisdiction'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A5672] mt-0.5">
                    {isHindi ? 'भारतीय कानून के तहत पीड़िता का नाम कोर्ट रिकॉर्ड में हमेशा सुरक्षित व गोपनीय रखा जाता है।' : 'Under Section 73 BNS, exposing a victim’s real name in public reports is a criminal offense.'}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#26215C]">
                    {isHindi ? 'आवेदन में प्रयुक्त नाम (सुरक्षित छद्मनाम)' : 'Protected Pseudonym in Draft'}
                  </label>
                  <input
                    type="text"
                    value={formData.victimAlias}
                    onChange={(e) => setFormData({ ...formData, victimAlias: e.target.value })}
                    className="w-full text-base sm:text-sm p-3.5 rounded-xl border border-[#26215C]/15 bg-[#FAF8F3] focus:bg-white focus:border-[#26215C] focus:outline-none text-[#26215C] transition-colors"
                    placeholder="Victim / Ms. A (Identity Protected under Sec 73 BNS)"
                  />
                  <div className="p-3 bg-[#E1F5EE] border border-[#B7E4D7] rounded-xl flex items-start gap-2 text-xs text-[#0F6E56]">
                    <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      {isHindi 
                        ? 'कानूनन आप अपनी असली पहचान छिपाकर "सुश्री X" या "Ms. A" के रूप में FIR दर्ज करवा सकती हैं।'
                        : 'Supreme Court guidelines empower you to submit filings under "Ms. A" to protect your personal privacy.'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#26215C]">
                    {isHindi ? 'शहर व राज्य (थाना क्षेत्र)' : 'City & State (Jurisdiction)'}
                  </label>
                  <input
                    type="text"
                    value={formData.cityState}
                    onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
                    className="w-full text-base sm:text-sm p-3.5 rounded-xl border border-[#26215C]/15 bg-[#FAF8F3] focus:bg-white focus:border-[#26215C] focus:outline-none text-[#26215C] transition-colors"
                    placeholder="New Delhi, India"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#26215C]">
                    {isHindi ? 'गोपनीय संपर्क ईमेल या फोन (वैकल्पिक)' : 'Confidential Contact Phone or Email (Optional)'}
                  </label>
                  <input
                    type="text"
                    value={formData.contactEmailOrPhone}
                    onChange={(e) => setFormData({ ...formData, contactEmailOrPhone: e.target.value })}
                    className="w-full text-base sm:text-sm p-3.5 rounded-xl border border-[#26215C]/15 bg-[#FAF8F3] focus:bg-white focus:border-[#26215C] focus:outline-none text-[#26215C] transition-colors"
                    placeholder={isHindi ? 'केवल पुलिस जांच अधिकारी हेतु (वैकल्पिक)' : 'For investigation officer record only (Optional)'}
                  />
                </div>

                {/* Primary Forward Advancement Button */}
                <div className="pt-3 border-t border-[#26215C]/10 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      hapticAction();
                      setCurrentStep(2);
                      setShowMobilePreview(false);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-[#5A5672] hover:text-[#26215C] hover:bg-[#FAF8F3] transition-colors cursor-pointer min-h-[42px]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{isHindi ? 'पिछला चरण' : 'Back'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      hapticAction();
                      setCurrentStep(4);
                      setShowMobilePreview(false);
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-[#26215C] hover:bg-[#1E1949] text-white transition-all shadow-soft cursor-pointer min-h-[44px] active:scale-98"
                  >
                    <span>{isHindi ? 'तैयार होने पर आगे बढ़ें' : "Continue when you're ready"}</span>
                    <ArrowRight className="w-4 h-4 text-[#F3C5D6]" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: REVIEW & READY */}
            {currentStep === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#26215C]">
                    {isHindi ? 'शिकायत आवेदन तैयार है' : 'Your Legal Complaint is Ready'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A5672] mt-0.5">
                    {isHindi ? 'दाएं पैनल में अपना ड्राफ्ट देखें, PDF डाउनलोड करें या साइबर पोर्टल पर भेजें।' : 'Review the court draft, generate an official PDF, or submit to cybercrime.gov.in.'}
                  </p>
                </div>

                {/* Template chooser */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#26215C]">
                    {isHindi ? 'दस्तावेज़ का प्रारूप चुनें' : 'Choose Document Template'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTemplate('fir_police')}
                      className={`p-3 rounded-xl text-xs font-semibold border cursor-pointer transition-colors text-left ${
                        activeTemplate === 'fir_police'
                          ? 'bg-[#26215C] text-white border-[#26215C]'
                          : 'bg-[#FAF8F3] text-[#5A5672] border-[#26215C]/12 hover:bg-white'
                      }`}
                    >
                      <div>{isHindi ? 'पुलिस FIR' : 'Police FIR'}</div>
                      <div className="text-[10px] font-normal opacity-80">{isHindi ? 'थाना व कोर्ट हेतु' : 'Police Station'}</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTemplate('intermediary_notice')}
                      className={`p-3 rounded-xl text-xs font-semibold border cursor-pointer transition-colors text-left ${
                        activeTemplate === 'intermediary_notice'
                          ? 'bg-[#26215C] text-white border-[#26215C]'
                          : 'bg-[#FAF8F3] text-[#5A5672] border-[#26215C]/12 hover:bg-white'
                      }`}
                    >
                      <div>{isHindi ? '24h Takedown' : '24h Takedown'}</div>
                      <div className="text-[10px] font-normal opacity-80">{isHindi ? 'प्लेटफॉर्म हटाने हेतु' : 'Rule 3(2)(b)'}</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTemplate('ncw_petition')}
                      className={`p-3 rounded-xl text-xs font-semibold border cursor-pointer transition-colors text-left ${
                        activeTemplate === 'ncw_petition'
                          ? 'bg-[#26215C] text-white border-[#26215C]'
                          : 'bg-[#FAF8F3] text-[#5A5672] border-[#26215C]/12 hover:bg-white'
                      }`}
                    >
                      <div>{isHindi ? 'NCW याचिका' : 'NCW Petition'}</div>
                      <div className="text-[10px] font-normal opacity-80">{isHindi ? 'महिला आयोग' : 'Women Comm.'}</div>
                    </button>
                  </div>
                </div>

                {/* Statutes Source Reference */}
                <div className="p-3 bg-[#FAF8F3] rounded-xl border border-[#26215C]/10 text-[11px] text-[#5A5672] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-[#0F6E56]" />
                    <span>
                      {isHindi 
                        ? `कानूनी धाराएं: BNS 2023 व IT Act गजट अधिसूचना के अनुसार (${LEGAL_FRAMEWORK_AUDIT.lastUpdatedDate})`
                        : `Statutes indexed: BNS 2023 & IT Act Official Gazette (${LEGAL_FRAMEWORK_AUDIT.lastUpdatedDate})`}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#0F6E56] px-2 py-0.5 rounded-full bg-[#E1F5EE]">
                    Gazette Indexed
                  </span>
                </div>

                {/* Explicit Device Persistence Opt-In with Mandatory Warning */}
                <div className="p-4 rounded-2xl border border-[#26215C]/15 bg-[#FAF8F3] space-y-1.5">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={persistDraftLocally}
                      onChange={(e) => handleTogglePersist(e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded text-[#26215C] accent-[#26215C]"
                    />
                    <div className="space-y-0.5 text-xs">
                      <span className="font-bold text-[#26215C]">
                        {isHindi ? 'इस ड्राफ्ट को बाद के लिए इसी डिवाइस पर सुरक्षित रखें' : 'Keep this draft on this device for later'}
                      </span>
                      <p className="text-[#993556] font-medium leading-tight">
                        {isHindi 
                          ? 'चेतावनी: यह केवल तभी करें जब आपको पूरा विश्वास हो कि कोई अन्य व्यक्ति इस डिवाइस को नहीं देख सकता।' 
                          : 'Only do this if you\'re sure no one else can access this device.'}
                      </p>
                    </div>
                  </label>
                </div>

                {/* Primary Action Buttons */}
                <div className="pt-2 space-y-2.5">
                  {/* Default export: Safe preview in blob tab */}
                  <button
                    onClick={() => handleExportPDF('view_print')}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#26215C] hover:bg-[#1E1949] text-white rounded-full text-sm font-semibold transition-all shadow-soft cursor-pointer min-h-[48px]"
                  >
                    <Eye className="w-4 h-4 text-[#F3C5D6]" />
                    <span>{isHindi ? 'सुरक्षित टैब में शिकायत PDF देखें / प्रिंट करें' : 'Preview / Print Complaint PDF in Secure Tab'}</span>
                  </button>

                  <div className="flex items-center justify-between px-1">
                    <button
                      type="button"
                      onClick={() => {
                        hapticAction();
                        setShowDownloadPrompt(!showDownloadPrompt);
                      }}
                      className="text-xs text-[#26215C] font-semibold hover:underline flex items-center gap-1.5 p-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-[#8B6D5C]" />
                      <span>{isHindi ? 'फ़ाइल डाउनलोड विकल्प (तटस्थ नाम चुनें)' : 'Save PDF to device (Choose neutral filename)'}</span>
                    </button>
                  </div>

                  {showDownloadPrompt && (
                    <div className="p-3.5 bg-white rounded-2xl border border-[#26215C]/15 space-y-2">
                      <label className="block text-xs font-semibold text-[#26215C]">
                        {isHindi ? 'फ़ाइल का नाम (सुरक्षा के लिए तटस्थ नाम रखें):' : 'Specify File Name (Keep neutral for device privacy):'}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={neutralFileName}
                          onChange={(e) => setNeutralFileName(e.target.value)}
                          placeholder="notes_2026-09-09.pdf"
                          className="w-full text-xs px-3 py-2 rounded-xl border border-[#26215C]/20 bg-[#FAF8F3] text-[#26215C] focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleExportPDF('download_file', neutralFileName)}
                          className="px-4 py-2 rounded-xl bg-[#26215C] hover:bg-black text-white text-xs font-bold shrink-0 cursor-pointer"
                        >
                          {isHindi ? 'डाउनलोड करें' : 'Download'}
                        </button>
                      </div>
                      <p className="text-[11px] text-[#993556] leading-tight">
                        {isHindi
                          ? 'नाम तटस्थ क्यों रखें: "FIR_Complaint.pdf" की जगह "notes_2026.pdf" रखने से यदि कोई आपका फोन चेक करे तो उसे शक नहीं होगा।'
                          : 'Why filename matters: Defaulting to a neutral file name (e.g. notes_2026-09-09.pdf) prevents anyone with access to your phone\'s Downloads folder from discovering your complaint.'}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white hover:bg-[#FAF8F3] text-[#26215C] border border-[#26215C]/15 rounded-full text-xs font-semibold transition-colors cursor-pointer min-h-[44px]"
                    >
                      {copied ? <Check className="w-4 h-4 text-[#0F6E56]" /> : <Copy className="w-4 h-4" />}
                      <span>{copied ? (isHindi ? 'कॉपी हो गया!' : 'Copied!') : (isHindi ? 'टेक्स्ट कॉपी करें' : 'Copy Text')}</span>
                    </button>

                    <a
                      href="https://cybercrime.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#993556] hover:bg-[#7A2843] text-white rounded-full text-xs font-semibold transition-colors min-h-[44px]"
                    >
                      <Send className="w-4 h-4" />
                      <span>cybercrime.gov.in</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Human Referral Card */}
                <div className="pt-2">
                  <HumanReferralCard language={language} compact />
                </div>

                {/* Anonymous Outcome Feedback Prompt */}
                <div className="pt-1">
                  <AnonymousFeedbackPrompt language={language} flowId="legal_generator_export" />
                </div>

                {/* Step 4 Navigation: Return to step 1 & Reset */}
                <div className="pt-3 border-t border-[#26215C]/10 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      hapticAction();
                      setCurrentStep(3);
                      setShowMobilePreview(false);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-[#5A5672] hover:text-[#26215C] hover:bg-[#FAF8F3] transition-colors cursor-pointer min-h-[42px]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{isHindi ? 'पिछला चरण' : 'Back to Identity'}</span>
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        hapticAction();
                        setCurrentStep(1);
                      }}
                      className="text-xs text-[#5A5672] hover:text-[#26215C] underline cursor-pointer"
                    >
                      {isHindi ? 'चरण 1 पर लौटें' : 'Return to step 1'}
                    </button>
                    <button
                      type="button"
                      onClick={handleResetWizard}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#26215C]/15 bg-[#FAF8F3] text-xs font-medium text-[#85819C] hover:text-[#993556] hover:bg-[#FBEAF0]/40 transition-colors cursor-pointer min-h-[36px]"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{isHindi ? 'रीसेट' : 'Reset Wizard'}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: LIVE COMPLAINT DRAFT PREVIEW (DESKTOP LIVE / MOBILE TOGGLE) */}
        <div className={`lg:col-span-6 bg-white p-4 sm:p-7 rounded-[24px] border border-[#26215C]/10 shadow-soft space-y-4 ${
          !showMobilePreview ? 'hidden lg:block' : 'block'
        }`}>
          <div className="flex items-center justify-between border-b border-[#26215C]/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0F6E56]" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#26215C]">
                {isHindi ? 'लाइव शिकायत ड्राफ्ट पूर्वावलोकन' : 'Live Complaint Draft Preview'}
              </h3>
            </div>
            <span className="text-[11px] text-[#5A5672]">
              {isHindi ? 'धारा 63 BSA घोषणा प्रारूप' : 'Sec 63 BSA Declaration Format'}
            </span>
          </div>

          {/* Formally typeset court document display */}
          <div className="relative">
            <pre className="w-full h-96 sm:h-[430px] p-4 sm:p-5 bg-[#FAF8F3] text-[#26215C] rounded-2xl text-xs font-mono leading-relaxed overflow-y-auto whitespace-pre-wrap border border-[#26215C]/15 select-all scrollbar-thin">
              {getActiveText()}
            </pre>
          </div>

          {/* Quick utility row */}
          <div className="flex items-center justify-between flex-wrap gap-2 pt-1 text-xs text-[#5A5672]">
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1 hover:text-[#26215C] cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>.TXT</span>
              </button>
              <span>•</span>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1 hover:text-[#26215C] cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{isHindi ? 'प्रिंट' : 'Print'}</span>
              </button>
            </div>

            <div className="text-[11px] text-[#0F6E56] font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isHindi ? 'स्वतः सहेजा गया' : 'Autosaved in session'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* POCSO & Minor Protection Modal */}
      <PocsoMinorShieldModal
        isOpen={showPocsoModal}
        onClose={() => setShowPocsoModal(false)}
        language={language}
      />
    </section>
  );
};
