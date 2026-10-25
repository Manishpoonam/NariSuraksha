import type jsPDF from 'jspdf';
import { ComplaintFormData, IncidentCategory } from '../types';
import { getStatuteCitationsForIncident } from '../data/statuteCitations';

const generatePDFDocument = (
  jsPDFClass: typeof jsPDF,
  formData: ComplaintFormData,
  templateType: 'fir_police' | 'intermediary_notice' | 'ncw_petition',
  customText?: string
) => {
  const doc = new jsPDFClass({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  const checkAddPage = (neededSpace: number = 20) => {
    if (y + neededSpace > pageHeight - margin) {
      doc.addPage();
      y = margin;
      drawPageFooter();
    }
  };

  const drawPageFooter = () => {
    const pageCount = (doc.internal as any).getNumberOfPages();
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 120, 120);
    doc.text(
      'INFORMATIONAL COMPLAINT DRAFT — VICTIM IDENTITY SAFEGUARDED UNDER SECTION 73 BNS 2023',
      margin,
      pageHeight - 10
    );
    doc.text(`Page ${pageCount}`, pageWidth - margin - 15, pageHeight - 10);
    doc.setFont('helvetica', 'normal');
  };

  // Header Banner
  doc.setFillColor(45, 45, 45);
  doc.rect(margin, y, contentWidth, 18, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text(
    templateType === 'fir_police'
      ? 'FORMAL COMPLAINT DRAFT & FIRST INFORMATION REPORT (FIR) SUBMISSION'
      : templateType === 'intermediary_notice'
      ? '24-HOUR EMERGENCY TAKEDOWN NOTICE (RULE 3(2)(b) IT RULES)'
      : 'FORMAL PETITION UNDER SECTION 10 NATIONAL COMMISSION FOR WOMEN ACT',
    margin + 4,
    y + 7
  );

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(220, 220, 220);
  doc.text(
    'COMPLAINT DRAFT FOR REPORTING UNDER BNS 2023, BNSS 2023, AND IT ACT 2000',
    margin + 4,
    y + 13
  );

  y += 24;

  // Statutory Confidentiality Banner
  doc.setFillColor(243, 239, 236);
  doc.setDrawColor(222, 217, 212);
  doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(139, 109, 92);
  doc.text('STATUTORY CONFIDENTIALITY SAFEGUARD — SECTION 73 BHARATIYA NYAYA SANHITA, 2023', margin + 4, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(70, 70, 70);
  doc.text(
    'Disclosing the name or identity of the victim is a cognizable criminal offense punishable with up to 2 years imprisonment.',
    margin + 4,
    y + 10
  );

  y += 20;

  // Addressee & Case Info
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 30, 30);

  doc.text('TO:', margin, y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(
    templateType === 'fir_police'
      ? `The Station House Officer (SHO) / Officer-in-Charge\nCyber Crime Police Station / District Police Station\n${formData.cityState || '[Jurisdiction Police Station]'}`
      : templateType === 'intermediary_notice'
      ? `The Resident Grievance Officer & Legal Compliance Desk\nPlatforms: ${formData.platformsInvolved.join(', ') || 'Social Media Intermediary'}`
      : `The Hon'ble Chairperson\nNational Commission for Women (NCW), Plot 21, Jasola Institutional Area, New Delhi - 110025`,
    margin,
    y
  );

  y += 18;

  // Subject Line
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(20, 20, 20);
  const subjectText = templateType === 'fir_police'
    ? `SUBJECT: URGENT COMPLAINT UNDER SECTIONS 73, 77, 308(2), 351(2) BNS 2023 AND SECTIONS 66E, 67, 67A IT ACT 2000 FOR CYBER EXTORTION AND NON-CONSENSUAL INTIMATE IMAGES ABUSE.`
    : templateType === 'intermediary_notice'
    ? `SUBJECT: EMERGENCY 24-HOUR STATUTORY TAKEDOWN NOTICE UNDER RULE 3(2)(b) OF IT (INTERMEDIARY GUIDELINES) RULES, 2021.`
    : `SUBJECT: COMPLAINT UNDER SECTION 10 OF NCW ACT, 1990 SEEKING IMMEDIATE ACTION FOR CYBER HARASSMENT & BLACKMAIL.`;

  const splitSubject = doc.splitTextToSize(subjectText, contentWidth);
  doc.text(splitSubject, margin, y);
  y += splitSubject.length * 4.5 + 4;

  // Case Particulars Table / Summary
  doc.setFillColor(250, 249, 246);
  doc.setDrawColor(222, 217, 212);
  doc.rect(margin, y, contentWidth, 34, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 30, 30);
  doc.text('CASE PARTICULARS & PRELIMINARY DATA:', margin + 4, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(60, 60, 60);

  doc.text(`1. Complainant Reference: ${formData.victimAlias || 'Victim (Protected Under BNS 73)'}`, margin + 4, y + 11);
  doc.text(`2. Contact Coordinate: ${formData.contactEmailOrPhone || 'Kept on sealed police record'}`, margin + 4, y + 16);
  doc.text(`3. Accused Identity: ${formData.accusedDetails || 'Identified by digital handle/phone/IP'}`, margin + 4, y + 21);
  doc.text(`4. Extortion Amount Demanded: ${formData.extortionAmountDemanded ? 'INR ' + formData.extortionAmountDemanded : 'Nil / Personal Coercion'}`, margin + 4, y + 26);
  doc.text(`5. Relevant Platforms: ${formData.platformsInvolved.join(', ') || 'Electronic Intermediary'}`, margin + 4, y + 31);

  y += 40;

  // Main Narrative / Legal Body
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(20, 20, 20);
  doc.text('1. STATEMENT OF FACTS & INCIDENT CHRONOLOGY:', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(40, 40, 40);

  const narrative = formData.threatDetails || 
    'The complainant is being subjected to unlawful non-consensual electronic harassment, blackmail, and extortion via electronic messaging platforms. The perpetrator has threatened to disseminate private intimate media to family, college, and social contacts unless illicit demands are fulfilled.';

  const splitNarrative = doc.splitTextToSize(narrative, contentWidth);
  splitNarrative.forEach((line: string) => {
    checkAddPage(6);
    doc.text(line, margin, y);
    y += 4.5;
  });

  y += 4;
  checkAddPage(25);

  // Statutory Grounds Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(20, 20, 20);
  doc.text('2. APPLICABLE STATUTORY PROVISIONS:', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(40, 40, 40);

  const incidentStatutes = getStatuteCitationsForIncident(
    formData.incidentType,
    false,
    formData.isMinorVictim
  );

  const statutoryItems = incidentStatutes.statutes.map(
    (s) => `• ${s.section}, ${s.act} (${s.shortLabel.en}).`
  );

  statutoryItems.forEach((stat) => {
    checkAddPage(6);
    doc.text(stat, margin + 2, y);
    y += 4.5;
  });

  y += 4;
  checkAddPage(30);

  // Digital Evidence Declaration (Sec 63 BSA / Sec 65B IEA)
  doc.setFillColor(250, 249, 246);
  doc.setDrawColor(222, 217, 212);
  doc.rect(margin, y, contentWidth, 24, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(139, 109, 92);
  doc.text('3. ELECTRONIC EVIDENCE DECLARATION (SECTION 63 BHARATIYA SAKSHYA ADHINIYAM, 2023):', margin + 4, y + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(50, 50, 50);
  doc.text(
    'I declare that all screenshots, chat exports, transaction UTR records, and URL links appended to this complaint were captured directly from the electronic device in ordinary course without any alteration, tampering, or synthetic manipulation.',
    margin + 4,
    y + 10,
    { maxWidth: contentWidth - 8 }
  );

  y += 28;
  checkAddPage(22);

  // Legal & Procedural Notice
  doc.setFillColor(248, 246, 242);
  doc.setDrawColor(215, 210, 204);
  doc.roundedRect(margin, y, contentWidth, 16, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(70, 70, 70);
  doc.text('LEGAL & PROCEDURAL NOTICE (NON-REPRESENTATIONAL DRAFT):', margin + 3, y + 4.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(90, 90, 90);
  doc.text(
    'This document is a complainant-drafted factual report prepared to facilitate formal reporting to law enforcement authorities (cybercrime.gov.in / 1930 / Cyber Police Stations). It does not constitute formal legal counsel or judicial certification. Complainants may access free legal aid under Section 12 of the Legal Services Authorities Act (NALSA Helpline: 15100).',
    margin + 3,
    y + 8.5,
    { maxWidth: contentWidth - 6 }
  );

  y += 22;
  checkAddPage(40);

  // Police Station Receiving Slip (For FIR)
  doc.setDrawColor(180, 180, 180);
  doc.setLineDashPattern([2, 2], 0);
  doc.line(margin, y, pageWidth - margin, y);
  doc.setLineDashPattern([], 0);
  y += 6;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(20, 20, 20);
  doc.text('FOR POLICE STATION OFFICIAL RECEIVING ACKNOWLEDGEMENT (OFFICE USE ONLY)', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(60, 60, 60);

  doc.text('General Diary (GD) / FIR No: _____________________________', margin, y);
  doc.text('Date & Time of Receiving: _____________________', margin + 90, y);
  y += 6;
  doc.text('Receiving Officer Name: _________________________________', margin, y);
  doc.text('Rank & Belt No: _______________________________', margin + 90, y);
  y += 6;
  doc.text('Police Station Name: ___________________________________', margin, y);
  doc.text('Station Official Rubber Stamp & Signature', margin + 90, y);

  y += 15;
  drawPageFooter();

  return doc;
};

export interface PDFExportOptions {
  action?: 'view_print' | 'download_file';
  customFileName?: string;
}

export const exportComplaintDraftPDF = async (
  formData: ComplaintFormData,
  templateType: 'fir_police' | 'intermediary_notice' | 'ncw_petition',
  customText?: string,
  options: PDFExportOptions = { action: 'view_print' }
): Promise<{ blobUrl: string; defaultFileName: string }> => {
  const { default: jsPDFClass } = await import('jspdf');
  const doc = generatePDFDocument(jsPDFClass, formData, templateType, customText);

  const dateStr = new Date().toISOString().slice(0, 10);
  const neutralFileName = options.customFileName?.trim() 
    ? (options.customFileName.endsWith('.pdf') ? options.customFileName : `${options.customFileName}.pdf`)
    : `notes_${dateStr}.pdf`;

  if (options.action === 'download_file') {
    doc.save(neutralFileName);
  }

  const blob = doc.output('blob');
  const blobUrl = URL.createObjectURL(blob);

  if (options.action === 'view_print') {
    // Open in a new tab for inspection or native browser printing without disk saving
    const newWindow = window.open(blobUrl, '_blank');
    if (!newWindow) {
      console.warn('Popup window blocked, provided blob URL');
    }
  }

  return { blobUrl, defaultFileName: neutralFileName };
};

// Backwards-compatible alias for existing imports
export const exportCourtReadyPDF = exportComplaintDraftPDF;
export const exportTutorialGuidePDF = async (
  _languageOrOptions?: any,
  options?: PDFExportOptions
): Promise<{ blobUrl: string; defaultFileName: string }> => {
  const opts = (options || (typeof _languageOrOptions === 'object' ? _languageOrOptions : undefined)) || { action: 'download_file' };
  return exportFieldGuidePDF(opts);
};

export const exportFieldGuidePDF = async (
  options: PDFExportOptions = { action: 'download_file' }
): Promise<{ blobUrl: string; defaultFileName: string }> => {
  const { default: jsPDFClass } = await import('jspdf');
  const doc = new jsPDFClass({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  let y = 18;

  const checkAddPage = (neededSpace: number = 20) => {
    if (y + neededSpace > pageHeight - margin) {
      doc.addPage();
      y = margin;
      drawPageFooter();
    }
  };

  const drawPageFooter = () => {
    const pageCount = (doc.internal as any).getNumberOfPages();
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(130, 130, 130);
    doc.text(
      'NARISURAKSHA COMMUNITY FIELD GUIDE — 100% ON-DEVICE PRIVACY & LEGAL EMPOWERMENT',
      margin,
      pageHeight - 10
    );
    doc.text(`Page ${pageCount}`, pageWidth - margin - 15, pageHeight - 10);
    doc.setFont('helvetica', 'normal');
  };

  // Header Banner
  doc.setFillColor(38, 33, 92); // #26215C
  doc.rect(margin, y, contentWidth, 22, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.text('NARISURAKSHA — COMMUNITY FIELD GUIDE & HANDBOOK', margin + 5, y + 9);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(230, 230, 230);
  doc.text('How This Website Works • Decision Flowcharts • Technical Privacy • NGO Workshop Guide', margin + 5, y + 16);

  y += 28;

  // Intro Callout
  doc.setFillColor(250, 248, 243);
  doc.setDrawColor(222, 217, 212);
  doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(153, 53, 86); // #993556
  doc.text('CORE MESSAGE FOR GIRLS & WOMEN:', margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(50, 50, 50);
  doc.text(
    'If you or someone you know is facing online blackmail, you are not alone and you did nothing wrong.\nPaying never stops extortion. Indian law guarantees strict anonymity and provides complete legal protection.',
    margin + 4,
    y + 11
  );

  y += 24;

  // Section 1: The Three Golden Rules
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(30, 30, 30);
  doc.text('1. THE THREE GOLDEN RULES OF CYBER RESCUE', margin, y);
  y += 6;

  const rules = [
    { title: 'RULE 1: DO NOT PAY MONEY', desc: '97% of victims who pay are extorted again within 48 hours for higher amounts. Refusing to pay breaks their leverage.' },
    { title: 'RULE 2: DO NOT BLOCK IMMEDIATELY', desc: 'Preserve evidence first (screenshots with status bar & timestamps, UPI IDs, profile URLs). Blocking deletes key evidence.' },
    { title: 'RULE 3: YOU HAVE STATUTORY LEGAL IMMUNITY', desc: 'Under Section 73 BNS 2023, disclosing a victim\'s identity is a criminal offense (up to 2 yrs prison). Statements are recorded by female officers.' },
  ];

  rules.forEach((r) => {
    checkAddPage(15);
    doc.setFillColor(243, 239, 236);
    doc.rect(margin, y, contentWidth, 12, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(38, 33, 92);
    doc.text(r.title, margin + 3, y + 4.5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(60, 60, 60);
    doc.text(r.desc, margin + 3, y + 9.5);
    y += 15;
  });

  y += 2;
  checkAddPage(30);

  // Section 2: Step-by-Step Emergency Flowcharts
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(30, 30, 30);
  doc.text('2. STEP-BY-STEP WORKFLOWS & DECISION TREES', margin, y);
  y += 6;

  const flows = [
    {
      num: 'FLOW A',
      name: 'The 60-Minute Extortion Countdown Flow',
      steps: [
        '1. Recognize Artificial Panic: Extortionists set fake countdown timers to force panic reactions.',
        '2. Freeze Communication: Stop replying to threats; do not plead, do not send funds.',
        '3. Capture Evidence Trail: Full-screen screenshots (battery, time, date, full chat, profile link, payment QR).',
        '4. StopNCII Registration: Create cryptographic hashes to pre-emptively block image uploads.',
        '5. Official Reporting: Dial National Cyber Helpline 1930 and file formal complaint at cybercrime.gov.in.'
      ]
    },
    {
      num: 'FLOW B',
      name: 'StopNCII & Platform Takedown Flow (Perceptual Hashing)',
      steps: [
        '1. Device-Only Hash: StopNCII converts visual pixels into a 64-character mathematical fingerprint.',
        '2. Zero Image Transmission: THE RAW PHOTO NEVER LEAVES YOUR DEVICE. No human ever sees it.',
        '3. Global Platform Shield: Only the mathematical hash is added to Meta, Instagram, and partner databases.',
        '4. Automatic Upload Block: If an extortionist attempts to upload the image, the platform blocks it instantly.'
      ]
    },
    {
      num: 'FLOW C',
      name: 'Legal Reporting & e-FIR Flow (BNSS 173 & Section 73 BNS)',
      steps: [
        '1. Free e-FIR Draft Tool: Use NariSuraksha to generate structured legal drafts formatted for police/courts.',
        '2. Statutory Confidentiality: Section 73 BNS makes victim identity leakage a non-bailable offense.',
        '3. Female Officer Mandate: BNSS Section 173 guarantees statement recording by a woman police officer.',
        '4. Free Legal Aid: Access National Legal Services Authority (NALSA) defense lawyers via Helpline 15100.'
      ]
    }
  ];

  flows.forEach((flow) => {
    checkAddPage(35);
    doc.setFillColor(245, 241, 235);
    doc.roundedRect(margin, y, contentWidth, 7, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 110, 86); // #0F6E56
    doc.text(`${flow.num}: ${flow.name}`, margin + 3, y + 4.8);
    y += 9;

    flow.steps.forEach((step) => {
      checkAddPage(6);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(40, 40, 40);
      const splitStep = doc.splitTextToSize(`• ${step}`, contentWidth - 4);
      doc.text(splitStep, margin + 2, y);
      y += splitStep.length * 4;
    });
    y += 4;
  });

  checkAddPage(40);

  // Section 3: Technical Privacy Explained Simply
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(30, 30, 30);
  doc.text('3. TECHNICAL PRIVACY ARCHITECTURE (IN PLAIN ENGLISH)', margin, y);
  y += 6;

  const techFeatures = [
    { title: '100% On-Device (Zero Servers):', text: 'NariSuraksha operates solely inside the web browser. No databases, accounts, or telemetry exist to capture or store user data.' },
    { title: 'Emergency Stealth Camouflage:', text: 'Press ESC on desktop or swipe with 3 fingers on mobile to switch instantly to authentic UPSC Study Notes. Back-button navigation is trapped.' },
    { title: 'Perceptual Image Hashing:', text: 'Transforms intimate images into non-reversible mathematical codes right on your device so photos never touch the web.' },
    { title: 'Instant Footprint Purge:', text: 'One tap clears all session storage, form drafts, clipboard, and browser cache—leaving zero traces on shared devices.' }
  ];

  techFeatures.forEach((tf) => {
    checkAddPage(12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(38, 33, 92);
    doc.text(`• ${tf.title}`, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    const splitTf = doc.splitTextToSize(tf.text, contentWidth - 6);
    doc.text(splitTf, margin + 4, y + 4);
    y += splitTf.length * 4 + 3;
  });

  checkAddPage(40);

  // Section 4: Emergency Helplines & NGO Directory
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(30, 30, 30);
  doc.text('4. VERIFIED 24/7 ALL-INDIA HELPLINES CHEAT-SHEET', margin, y);
  y += 6;

  const helplines = [
    { name: 'National Cybercrime Helpline', num: '1930', desc: 'Immediate cyber extortion, blackmail & fraud' },
    { name: 'National Police Emergency', num: '112', desc: 'All-India 24x7 police response & physical protection' },
    { name: 'Women Police Helpline', num: '1091 / 181', desc: 'Dedicated women desks and state helplines' },
    { name: 'National Commission for Women (NCW)', num: '7827-170-170', desc: 'Legal counseling, complaint escalation & support' },
    { name: 'Childline & POCSO Protection', num: '1098', desc: 'Strict statutory minor protection under 18' },
    { name: 'Tele-MANAS Mental Health', num: '14416', desc: 'Free government psychological crisis counseling' },
    { name: 'National Legal Services Authority (NALSA)', num: '15100', desc: 'Free legal defense lawyers and legal aid' }
  ];

  doc.setFillColor(250, 249, 246);
  doc.setDrawColor(222, 217, 212);
  doc.rect(margin, y, contentWidth, helplines.length * 7 + 6, 'FD');
  y += 4;

  helplines.forEach((h) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(20, 20, 20);
    doc.text(h.name, margin + 3, y + 2);
    doc.setTextColor(153, 53, 86);
    doc.text(h.num, margin + 85, y + 2);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.setFontSize(7.5);
    doc.text(h.desc, margin + 115, y + 2);
    y += 7;
  });

  drawPageFooter();

  const fileName = `NariSuraksha_Community_Field_Guide_${new Date().toISOString().slice(0, 10)}.pdf`;

  if (options.action === 'download_file') {
    doc.save(fileName);
  }

  const blob = doc.output('blob');
  const blobUrl = URL.createObjectURL(blob);

  if (options.action === 'view_print') {
    const newWindow = window.open(blobUrl, '_blank');
    if (!newWindow) {
      console.warn('Popup window blocked, provided blob URL');
    }
  }

  return { blobUrl, defaultFileName: fileName };
};


