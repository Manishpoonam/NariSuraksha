/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Users, 
  Phone, 
  ExternalLink, 
  ShieldCheck, 
  HeartHandshake, 
  Scale, 
  ChevronDown, 
  ChevronUp,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Language } from '../types';
import { REFERRAL_PARTNERS, ReferralPartner } from '../data/referralPartners';
import { hapticAction } from '../utils/haptics';

interface HumanReferralCardProps {
  language: Language;
  compact?: boolean;
}

export const HumanReferralCard: React.FC<HumanReferralCardProps> = ({
  language,
  compact = false
}) => {
  const isHindi = language === 'hi';
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);

  const togglePartner = (id: string) => {
    hapticAction();
    setSelectedPartnerId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="rounded-3xl bg-[#FAF9F6] border border-[#E8E2DC] p-5 sm:p-7 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#E1F5EE] text-[#0F6E56] text-xs font-medium">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>{isHindi ? 'विशेषज्ञ मानवीय सहायता' : 'Human-in-the-Loop Support'}</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A]">
            {isHindi ? 'क्या आपको किसी जीवित विशेषज्ञ से बात करनी है?' : 'Need a real person in your corner?'}
          </h3>
          <p className="text-xs sm:text-sm text-[#666] leading-relaxed max-w-2xl">
            {isHindi
              ? 'यह ऐप कानूनी मसौदे तैयार करता है, लेकिन जटिल मामलों (शारीरिक धमकी, जबरन वसूली, कोर्ट केस) में किसी अनुभवी वकील, मनोवैज्ञानिक काउंसलर या NGO केसवर्कर से बात करना बेहद मददगार होता है।'
              : 'Self-serve digital tools have limits. If you face physical intimidation, blackmail escalation, or court hearings, connect with verified Indian non-profit caseworkers and pro bono legal advocates.'}
          </p>
        </div>
      </div>

      {/* Partners List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
        {REFERRAL_PARTNERS.map((partner) => {
          const isExpanded = selectedPartnerId === partner.id;
          return (
            <div
              key={partner.id}
              className="bg-white rounded-2xl border border-[#E8E2DC] hover:border-[#CBD5E1] transition-all p-4 space-y-3 shadow-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B6D5C]">
                      {partner.organizationType} • {partner.feeStructure}
                    </span>
                    {partner.verification?.isVerified ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E1F5EE] text-[#0F6E56] border border-[#B7E4D7]">
                        <CheckCircle2 className="w-3 h-3 text-[#0F6E56] shrink-0" />
                        <span>{isHindi ? `सत्यापित: ${partner.verification.source.hi}` : `Verified: ${partner.verification.source.en}`}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                        <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                        <span>{isHindi ? 'असत्यापित' : 'Unverified'}</span>
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-[#1A1A1A] leading-snug">
                    {partner.name[language]}
                  </h4>
                </div>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#FAF9F6] border border-[#E8E2DC] text-[#666] shrink-0">
                  {partner.badge[language]}
                </span>
              </div>

              <p className="text-xs text-[#555] leading-relaxed">
                {partner.description[language]}
              </p>

              <div className="p-2.5 rounded-xl bg-[#FAF9F6] border border-[#F0EBE6] text-[11px] text-[#666] space-y-1">
                <div className="flex items-center gap-1.5 text-[#2D2D2D] font-semibold">
                  <Clock className="w-3.5 h-3.5 text-[#8B6D5C]" />
                  <span>{partner.operatingHours}</span>
                </div>
                <div>
                  <span className="font-semibold">{isHindi ? 'विशेषता: ' : 'Best for: '}</span>
                  <span>{partner.bestFor[language]}</span>
                </div>
              </div>

              {/* Action Contact Button */}
              <div className="flex items-center gap-2 pt-1">
                <a
                  href={partner.contactMethod.actionUri}
                  target={partner.contactMethod.type === 'phone' ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#2D2D2D] hover:bg-black text-white text-xs font-bold transition-colors shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{partner.contactMethod.displayLabel}</span>
                </a>

                {partner.secondaryContact && (
                  <a
                    href={partner.secondaryContact.actionUri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-[#DED9D4] hover:bg-[#FAF9F6] text-[#666] transition-colors"
                    title={partner.secondaryContact.value}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
