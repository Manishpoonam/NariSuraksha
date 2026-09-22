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

