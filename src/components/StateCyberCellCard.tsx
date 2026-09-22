import React, { useState } from 'react';
import type { StateCyberCell } from '../data/stateCyberCellsData';
import { isRecordVerified, getVerifiedDate } from '../data/stateCyberCellsData';
import { Language } from '../types';
import { 
  Building2, 
  PhoneCall, 
  Mail, 
  MapPin, 
  ExternalLink, 
  Check, 
  Copy, 
  Lock,
  Phone,
  CheckCircle2,
  HelpCircle,
  MessageSquare,
  Shield,
  Globe
} from 'lucide-react';

export interface StateCyberCellCardProps {
  cell: StateCyberCell;
  language: Language;
  onCopyEmail?: (email: string) => void;
  copiedEmail?: string | null;
}

export const StateCyberCellCard: React.FC<StateCyberCellCardProps> = ({
  cell,
  language,
  onCopyEmail,
  copiedEmail: externalCopiedEmail,
}) => {
  const isHindi = language === 'hi';
  const [internalCopiedEmail, setInternalCopiedEmail] = useState<string | null>(null);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const copiedEmail = externalCopiedEmail !== undefined ? externalCopiedEmail : internalCopiedEmail;

  const handleCopyEmail = (email: string) => {
    if (onCopyEmail) {
      onCopyEmail(email);
    } else {
      navigator.clipboard.writeText(email);
      setInternalCopiedEmail(email);
      setTimeout(() => setInternalCopiedEmail(null), 2000);
    }
  };

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  const isVerified = isRecordVerified(cell);
  const verifiedDate = getVerifiedDate(cell);

  // Helper to format WhatsApp digits cleanly (standard Indian international format: 91XXXXXXXXXX)
  const formatWhatsAppUrl = (phoneStr: string) => {
    const cleanDigits = phoneStr.replace(/\D/g, '');
    const waNum = cleanDigits.startsWith('91') && cleanDigits.length > 10 ? cleanDigits : `91${cleanDigits}`;
    return `https://wa.me/${waNum}`;
  };

  return (
    <div
      id={`state-card-${cell.id}`}
      className="bg-white border border-[#E8E2DC] hover:border-[#D5C9BF] rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all shadow-xs flex flex-col space-y-4 text-[#1A1A1A]"
    >
      {/* ============================================================== */}
      {/* ROW 1: State/UT Name + Region Badge (STATE/UT) + isVerified Badge */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-2 pb-3.5 border-b border-[#E8E2DC]">
        {/* Top Badges Stack (Wraps cleanly, no absolute positioning, zero overlap) */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Region / UT Badge */}
          <span
            className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
              cell.isUnionTerritory
                ? 'bg-amber-50 text-amber-900 border-amber-200'
                : 'bg-[#F4EFEA] text-[#8B6D5C] border-[#E2D8CF]'
            }`}
          >
            {cell.isUnionTerritory
              ? (isHindi ? 'केंद्रशासित प्रदेश (UT)' : 'Union Territory (UT)')
              : (isHindi ? `${cell.region} राज्य` : `${cell.region} State`)}
          </span>

          {/* State Code Pill */}
          <span className="font-mono text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded bg-[#F0EBE6] text-[#555] border border-[#E0D8D0]">
            {cell.state_code}
          </span>

          {/* isVerified Badge (Strict Tier-1/2 Verification status) */}
          {isVerified ? (
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{isHindi ? `सत्यापित: ${verifiedDate || 'आधिकारिक'}` : `Verified: ${verifiedDate || 'Official'}`}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
              <HelpCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>{isHindi ? 'सत्यापन शेष — पहले पुष्टि करें' : 'Unverified — confirm before relying'}</span>
            </span>
          )}
        </div>

        {/* State/UT Heading */}
        <div className="mt-0.5">
          <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] leading-tight break-words">
            {cell.stateName[language] || cell.state}
          </h3>
          {language === 'en' && cell.stateName.hi && cell.stateName.hi !== cell.stateName.en && (
            <span className="block text-xs font-normal text-[#666] mt-0.5">
              {cell.stateName.hi}
            </span>
          )}
          {language === 'hi' && cell.stateName.en && (
            <span className="block text-xs font-normal text-[#666] mt-0.5">
              {cell.stateName.en}
            </span>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* ROW 2: Headquarters / Nodal Officer Designation & Address     */}
      {/* ============================================================== */}
      <div className="space-y-2.5 text-xs text-[#2D2D2D] bg-[#FAF8F5] p-3 sm:p-3.5 rounded-xl border border-[#EFE9E2]">
        {/* Nodal Officer */}
        <div className="flex items-start gap-2.5">
          <Shield className="w-4 h-4 text-[#8B6D5C] shrink-0 mt-0.5" />
          <div className="min-w-0">
            <span className="font-semibold text-[#666] text-[10px] uppercase tracking-wider block">
              {isHindi ? 'नोडल अधिकारी / विंग:' : 'Nodal Officer / Wing:'}
            </span>
            <span className="font-semibold text-[#1A1A1A] text-xs leading-snug break-words">
              {cell.nodalOfficer}
            </span>
          </div>
        </div>

        {/* Headquarters & Address */}
        <div className="flex items-start gap-2.5">
          <Building2 className="w-4 h-4 text-[#8B6D5C] shrink-0 mt-0.5" />
          <div className="min-w-0">
            <span className="font-semibold text-[#666] text-[10px] uppercase tracking-wider block">
              {isHindi ? 'मुख्यालय:' : 'Headquarters:'}
            </span>
            <p className="font-semibold text-[#1A1A1A] text-xs leading-snug break-words">
              {cell.headquarters}
            </p>
            {cell.address && cell.address !== cell.headquarters && (
              <p className="text-[11px] text-[#666] mt-1 flex items-start gap-1 leading-relaxed break-words">
                <MapPin className="w-3 h-3 text-[#8B6D5C] shrink-0 mt-0.5" />
                <span>{cell.address}</span>
              </p>
            )}
          </div>
        </div>

        {/* Special Cyber Women & Child Safety Wing */}
        {cell.specialWomenCell && (cell.specialWomenCell.en || cell.specialWomenCell.hi) && (
          <div className="p-2.5 bg-[#F8F2EC] rounded-lg border border-[#E7DDD3] space-y-0.5">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#8B6D5C]">
              <Lock className="w-3.5 h-3.5 shrink-0" />
              <span>{isHindi ? 'विशेष साइबर महिला व बाल सुरक्षा विंग:' : 'Specialized Cyber Women & Child Safety Wing:'}</span>
            </div>
            <p className="text-[11px] text-[#333] font-medium leading-snug break-words pl-5">
              {cell.specialWomenCell[language] || cell.specialWomenCell.en}
            </p>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* ROWS 3 - 8: Structured Helplines with Independent Call Buttons */}
      {/* ============================================================== */}
      <div className="space-y-2">
        <div className="text-[11px] font-bold uppercase tracking-wider text-[#8B6D5C] px-0.5">
          {isHindi ? 'आपातकालीन व हेल्पलाइन संपर्क' : 'Emergency & Specialized Helplines'}
        </div>

        {/* ROW 3: Police Emergency Number + Call Button + police_coverage */}
        <div className="p-3 bg-[#FAF8F5] border border-[#E8E2DC] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8B6D5C]">
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span>{isHindi ? 'पुलिस आपातकाल:' : 'Police Emergency:'}</span>
            </div>
            <div className="mt-0.5">
              {cell.police_emergency ? (
                <span className="font-mono font-bold text-sm sm:text-base text-[#1A1A1A] tracking-wide">
                  {cell.police_emergency}
                </span>
              ) : (
                <span className="text-xs text-[#888] italic">
                  {isHindi ? 'सार्वजनिक रूप से सूचीबद्ध नहीं' : 'Not publicly listed'}
                </span>
              )}
            </div>
            <div className="text-[10px] text-[#666] mt-0.5">
              <span className="font-medium text-[#555]">{isHindi ? 'कवरेज:' : 'Coverage:'}</span>{' '}
              {cell.police_coverage || cell.coverage}
            </div>
          </div>

          {cell.police_emergency && (
            <div className="shrink-0 w-full sm:w-auto">
              <a
                href={`tel:${cell.police_emergency.replace(/\s+/g, '')}`}
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#8B6D5C] hover:bg-[#775c4c] active:bg-[#684f41] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs whitespace-nowrap"
                aria-label={`${isHindi ? 'पुलिस कॉल करें' : 'Call Police'} ${cell.police_emergency}`}
              >
                <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                <span>{isHindi ? `कॉल ${cell.police_emergency}` : `Call ${cell.police_emergency}`}</span>
              </a>
            </div>
          )}
        </div>

        {/* ROW 4: Women Helpline Number + Call Button + women_helpline_coverage */}
        <div className="p-3 bg-[#F0F7F4] border border-[#D1E6DD] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0F6E56]">
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span>{isHindi ? 'महिला हेल्पलाइन:' : 'Women Helpline:'}</span>
            </div>
            <div className="mt-0.5">
              {cell.women_helpline ? (
                <span className="font-mono font-bold text-sm sm:text-base text-[#0A4E3D] tracking-wide">
                  {cell.women_helpline}
                </span>
              ) : (
                <span className="text-xs text-[#888] italic">
                  {isHindi ? 'सार्वजनिक रूप से सूचीबद्ध नहीं' : 'Not publicly listed'}
                </span>
              )}
            </div>
            <div className="text-[10px] text-[#0F6E56]/80 mt-0.5">
              <span className="font-medium text-[#0A4E3D]">{isHindi ? 'कवरेज:' : 'Coverage:'}</span>{' '}
              {cell.women_helpline_coverage || cell.coverage}
            </div>
          </div>

          {cell.women_helpline && (
            <div className="shrink-0 w-full sm:w-auto">
              <a
                href={`tel:${cell.women_helpline.replace(/\s+/g, '')}`}
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0F6E56] hover:bg-[#0A4E3D] active:bg-[#073D30] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs whitespace-nowrap"
                aria-label={`${isHindi ? 'महिला हेल्पलाइन कॉल करें' : 'Call Women Helpline'} ${cell.women_helpline}`}
              >
                <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                <span>{isHindi ? `कॉल ${cell.women_helpline}` : `Call ${cell.women_helpline}`}</span>
              </a>
            </div>
          )}
        </div>

        {/* ROW 5: Child Helpline Number + Call Button + child_helpline_coverage */}
        <div className="p-3 bg-[#FAF8F5] border border-[#E8E2DC] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#26215C]">
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span>{isHindi ? 'बाल हेल्पलाइन:' : 'Child Helpline:'}</span>
            </div>
            <div className="mt-0.5">
              {cell.child_helpline ? (
                <span className="font-mono font-bold text-sm sm:text-base text-[#1A1A1A] tracking-wide">
                  {cell.child_helpline}
                </span>
              ) : (
                <span className="text-xs text-[#888] italic">
                  {isHindi ? 'सार्वजनिक रूप से सूचीबद्ध नहीं' : 'Not publicly listed'}
                </span>
              )}
            </div>
            <div className="text-[10px] text-[#666] mt-0.5">
              <span className="font-medium text-[#555]">{isHindi ? 'कवरेज:' : 'Coverage:'}</span>{' '}
              {cell.child_helpline_coverage || cell.coverage}
            </div>
          </div>

          {cell.child_helpline && (
            <div className="shrink-0 w-full sm:w-auto">
              <a
                href={`tel:${cell.child_helpline.replace(/\s+/g, '')}`}
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#26215C] hover:bg-[#1A1644] active:bg-[#120F30] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs whitespace-nowrap"
                aria-label={`${isHindi ? 'बाल हेल्पलाइन कॉल करें' : 'Call Child Helpline'} ${cell.child_helpline}`}
              >
                <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                <span>{isHindi ? `कॉल ${cell.child_helpline}` : `Call ${cell.child_helpline}`}</span>
              </a>
            </div>
          )}
        </div>

        {/* ROW 6: Women Mobile (if not null) + Call Button + coverage */}
        {cell.women_mobile && (
          <div className="p-3 bg-[#FAF8F5] border border-[#E8E2DC] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8B6D5C]">
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span>{isHindi ? 'विशेष मोबाइल हेल्पलाइन:' : 'Specialized Mobile Helpline:'}</span>
              </div>
              <div className="mt-0.5">
                <span className="font-mono font-bold text-sm sm:text-base text-[#1A1A1A] tracking-wide">
                  {cell.women_mobile}
                </span>
              </div>
              <div className="text-[10px] text-[#666] mt-0.5">
                <span className="font-medium text-[#555]">{isHindi ? 'कवरेज:' : 'Coverage:'}</span>{' '}
                {cell.women_mobile_coverage || cell.coverage}
              </div>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              <a
                href={`tel:${cell.women_mobile.replace(/\s+/g, '')}`}
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#F3EFEA] border border-[#D5C9BF] text-[#1A1A1A] text-xs font-bold transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
                aria-label={`${isHindi ? 'मोबाइल हेल्पलाइन कॉल करें' : 'Call Mobile Helpline'} ${cell.women_mobile}`}
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#0F6E56] shrink-0" />
                <span>{isHindi ? `कॉल ${cell.women_mobile}` : `Call ${cell.women_mobile}`}</span>
              </a>
            </div>
          </div>
        )}

        {/* ROW 7: Women WhatsApp (if not null) + wa.me link + coverage context */}
        <div className="p-3 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{isHindi ? 'आधिकारिक व्हाट्सएप सहायता:' : 'Official WhatsApp Helpline:'}</span>
            </div>
            <div className="mt-0.5">
              {cell.women_whatsapp ? (
                <span className="font-mono font-bold text-sm sm:text-base text-emerald-950 tracking-wide">
                  {cell.women_whatsapp}
                </span>
              ) : (
                <span className="text-xs text-[#888] italic">
                  {isHindi ? 'आधिकारिक रूप से प्रकाशित नहीं' : 'Not officially published'}
                </span>
              )}
            </div>
            <div className="text-[10px] text-emerald-800/80 mt-0.5">
              <span className="font-medium text-emerald-900">{isHindi ? 'कवरेज व निर्देश:' : 'Coverage & Note:'}</span>{' '}
              {cell.women_whatsapp
                ? `${cell.women_whatsapp_coverage || cell.coverage} (${isHindi ? 'चैट/संदेश सहायता — आपातकाल में सीधे 112 मिलाएं' : 'Text/chat support — for emergencies, call 112 directly'})`
                : (isHindi ? 'लागू नहीं' : 'N/A')}
            </div>
          </div>

          {cell.women_whatsapp && (
            <div className="shrink-0 w-full sm:w-auto">
              <a
                href={formatWhatsAppUrl(cell.women_whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs whitespace-nowrap"
                aria-label={`${isHindi ? 'व्हाट्सएप चैट खोलें' : 'Open WhatsApp chat with'} ${cell.women_whatsapp}`}
              >
                <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                <span>{isHindi ? 'व्हाट्सएप चैट' : 'Chat on WhatsApp'}</span>
              </a>
            </div>
          )}
        </div>

        {/* ROW 8: Alternate Number (if not null) + its label + Call Button + coverage */}
        {cell.alternate_number && (
          <div className="p-3 bg-[#FAF8F5] border border-[#E8E2DC] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8B6D5C]">
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span>
                  {cell.alternate_number_label || (isHindi ? 'साइबर थाना / अतिरिक्त लैंडलाइन:' : 'Cyber PS / Landline:')}
                </span>
              </div>
              <div className="mt-0.5">
                <span className="font-mono font-bold text-sm sm:text-base text-[#1A1A1A] tracking-wide">
                  {cell.alternate_number}
                </span>
              </div>
              <div className="text-[10px] text-[#666] mt-0.5">
                <span className="font-medium text-[#555]">{isHindi ? 'कवरेज:' : 'Coverage:'}</span>{' '}
                {cell.alternate_number_coverage || cell.coverage}
              </div>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              <a
                href={`tel:${cell.alternate_number.replace(/\s+/g, '')}`}
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#F3EFEA] border border-[#D5C9BF] text-[#1A1A1A] text-xs font-bold transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
                aria-label={`${isHindi ? 'कॉल करें' : 'Call'} ${cell.alternate_number}`}
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#8B6D5C] shrink-0" />
                <span>{isHindi ? 'कॉल करें' : `Call ${cell.alternate_number}`}</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* ROW 9: Police Website + Women & Child Website (As Links)       */}
      {/* ============================================================== */}
      <div className="p-3 bg-[#FAF8F5] border border-[#E8E2DC] rounded-xl space-y-2 text-xs">
        <div className="text-[11px] font-bold uppercase tracking-wider text-[#8B6D5C]">
          {isHindi ? 'आधिकारिक वेब पोर्टल' : 'Official Portals'}
        </div>

        {/* Police Portal Link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 py-1 border-b border-[#EFE9E2]">
          <span className="font-semibold text-[#555] flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#8B6D5C] shrink-0" />
            <span>{isHindi ? 'पुलिस पोर्टल:' : 'Police Portal:'}</span>
          </span>
          {cell.police_website ? (
            <a
              href={cell.police_website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#0F6E56] hover:text-[#0A4E3D] hover:underline font-semibold text-xs break-all"
            >
              <span>{cell.police_website.replace(/^https?:\/\//, '')}</span>
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
          ) : (
            <span className="text-[#888] italic">{isHindi ? 'सूचीबद्ध नहीं' : 'Not publicly listed'}</span>
          )}
        </div>

        {/* Women & Child Website Link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 py-1">
          <span className="font-semibold text-[#555] flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#26215C] shrink-0" />
            <span>{isHindi ? 'महिला व बाल विकास पोर्टल:' : 'Women & Child Portal:'}</span>
          </span>
          {cell.women_child_website ? (
            <a
              href={cell.women_child_website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#26215C] hover:text-[#1A1644] hover:underline font-semibold text-xs break-all"
            >
              <span>{cell.women_child_website.replace(/^https?:\/\//, '')}</span>
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
          ) : (
            <span className="text-[#888] italic">{isHindi ? 'सूचीबद्ध नहीं' : 'Not publicly listed'}</span>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* ROW 10: Email (if not null) with Copy & Mailto Options        */}
      {/* ============================================================== */}
      {cell.email && (
        <div className="p-3 bg-[#FAF8F5] border border-[#E8E2DC] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="min-w-0 flex-1">
            <span className="font-semibold text-[#666] text-[10px] uppercase tracking-wider block">
              {isHindi ? 'आधिकारिक ईमेल आईडी:' : 'Official Email ID:'}
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <Mail className="w-4 h-4 text-[#8B6D5C] shrink-0" />
              <a
                href={`mailto:${cell.email}`}
                className="font-mono font-semibold text-xs sm:text-sm text-[#1A1A1A] hover:underline break-all"
              >
                {cell.email}
              </a>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 pt-1 sm:pt-0">
            <button
              type="button"
              onClick={() => handleCopyEmail(cell.email)}
              className="min-h-[38px] px-3 py-1.5 rounded-lg bg-white hover:bg-[#F3EFEA] border border-[#D5C9BF] text-[#2D2D2D] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              aria-label={isHindi ? 'ईमेल कॉपी करें' : 'Copy email address'}
            >
              {copiedEmail === cell.email ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-emerald-700 font-bold">{isHindi ? 'कॉपी हुआ!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#666] shrink-0" />
                  <span>{isHindi ? 'ईमेल कॉपी करें' : 'Copy Email'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* ROW 11: Source URL + last_verified Date Metadata               */}
      {/* ============================================================== */}
      <div className="pt-2 border-t border-[#E8E2DC] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[#666]">
        {/* Source URL Link */}
        <div className="flex items-center gap-1.5 flex-wrap min-w-0">
          <span className="font-semibold text-[#444]">{isHindi ? 'सत्यापन स्रोत:' : 'Verification Source:'}</span>
          {cell.source_url ? (
            <a
              href={cell.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8B6D5C] hover:text-[#775c4c] underline underline-offset-2 font-medium break-all inline-flex items-center gap-1"
            >
              <span>{cell.source_url.replace(/^https?:\/\//, '').split('/')[0]}</span>
              <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-70" />
            </a>
          ) : (
            <span className="italic">{isHindi ? 'सूचीबद्ध नहीं' : 'Not publicly listed'}</span>
          )}
        </div>

        {/* Last Verified Date Label */}
        <div className="shrink-0 text-[10px] sm:text-[11px]">
          {cell.last_verified ? (
            <span className="text-emerald-800 font-medium">
              • {isHindi ? 'अंतिम सत्यापन:' : 'Last verified:'} <span className="font-semibold">{cell.last_verified}</span>
            </span>
          ) : (
            <span className="text-amber-900 font-medium">
              • {isHindi ? 'सत्यापन शेष — पहले पुष्टि करें' : 'Unverified — confirm before relying'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
