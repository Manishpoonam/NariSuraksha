/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  HeartHandshake, 
  PhoneCall, 
  Wind, 
  MessageSquare, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Lock,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Language } from '../types';
import { hapticAction } from '../utils/haptics';
import { SomaticGroundingTool } from './SomaticGroundingTool';
import { HelplineDirectory } from './HelplineDirectory';
import { CommunicationScripts } from './CommunicationScripts';

interface CalmSupportPortalProps {
  language: Language;
  onNavigateToTab?: (tab: string, elementId?: string) => void;
  defaultSection?: 'grounding' | 'helplines' | 'scripts';
}

export const CalmSupportPortal: React.FC<CalmSupportPortalProps> = ({
  language,
  onNavigateToTab,
  defaultSection = 'grounding',
}) => {
  const isHindi = language === 'hi';

  const [activeMode, setActiveMode] = useState<'grounding' | 'helplines' | 'scripts'>(
    defaultSection === 'scripts' ? 'scripts' : defaultSection === 'helplines' ? 'helplines' : 'grounding'
  );

  return (
    <div className="space-y-6 scroll-mt-36 sm:scroll-mt-48" id="calm-support-portal">
      {/* 1. TOP 1-TAP EMERGENCY HOTLINE TRIAGE BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* 1930 Cyber Crime Helpline */}
        <a
          href="tel:1930"
          onClick={() => hapticAction()}
          className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0F6E56] hover:bg-[#0A4E3D] text-white transition-all shadow-soft group min-h-[54px] active:scale-98"
          title="Dial 1930 National Cyber Helpline"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <div className="font-mono font-extrabold text-base tracking-wider text-white">1930</div>
              <div className="text-[11px] text-emerald-100 font-medium leading-tight">
                {isHindi ? 'राष्ट्रीय साइबर अपराध' : 'Cyber Crime Helpline (24/7)'}
              </div>
            </div>
          </div>
          <span className="text-xs bg-white/20 px-3 py-1.5 rounded-full font-bold uppercase tracking-wider text-white">
            {isHindi ? 'कॉल करें' : 'Dial'}
          </span>
        </a>

        {/* 14490 NCW Women Safety */}
        <a
          href="tel:14490"
          onClick={() => hapticAction()}
          className="flex items-center justify-between p-3.5 rounded-2xl bg-[#993556] hover:bg-[#7A2843] text-white transition-all shadow-soft group min-h-[54px] active:scale-98"
          title="Dial 14490 NCW Helpline"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5 text-rose-200" />
            </div>
            <div>
              <div className="font-mono font-extrabold text-base tracking-wider text-white">14490</div>
              <div className="text-[11px] text-rose-100 font-medium leading-tight">
                {isHindi ? 'राष्ट्रीय महिला आयोग' : 'NCW Women Helpdesk (24/7)'}
              </div>
            </div>
          </div>
          <span className="text-xs bg-white/20 px-3 py-1.5 rounded-full font-bold uppercase tracking-wider text-white">
            {isHindi ? 'कॉल करें' : 'Dial'}
          </span>
        </a>

        {/* 14416 Tele-MANAS Mental Health */}
        <a
          href="tel:14416"
          onClick={() => hapticAction()}
          className="flex items-center justify-between p-3.5 rounded-2xl bg-[#26215C] hover:bg-[#1A1540] text-white transition-all shadow-soft group min-h-[54px] active:scale-98"
          title="Dial 14416 Tele-MANAS"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5 text-teal-200" />
            </div>
            <div>
              <div className="font-mono font-extrabold text-base tracking-wider text-white">14416</div>
              <div className="text-[11px] text-[#FAF8F3]/90 font-medium leading-tight">
                {isHindi ? 'मानसिक स्वास्थ्य परामर्श' : 'Tele-MANAS Anxiety Help (24/7)'}
              </div>
            </div>
          </div>
          <span className="text-xs bg-white/20 px-3 py-1.5 rounded-full font-bold uppercase tracking-wider text-white">
            {isHindi ? 'कॉल करें' : 'Dial'}
          </span>
        </a>
      </div>

      {/* 2. CALM HERO & 3-MODE SELECTOR */}
      <div className="p-5 sm:p-7 rounded-3xl bg-white border border-[#26215C]/10 shadow-soft space-y-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="px-3 py-1 rounded-full bg-[#E1F5EE] text-[#0F6E56] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-[#B7E4D7]">
            <HeartHandshake className="w-3.5 h-3.5 text-[#0F6E56]" />
            <span>{isHindi ? 'मानसिक संबल, श्वास व्यायाम व 24/7 हेल्पलाइन' : 'Calm, Grounding & 24/7 Support'}</span>
          </span>
          <span className="text-xs text-[#5A5672] font-medium">
            {isHindi ? '100% निःशुल्क, गोपनीय व टोल-फ्री' : '100% Free, Confidential & Toll-Free'}
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-[#26215C] tracking-tight">
          {isHindi 
            ? 'गहरी सांस लें — आप सुरक्षित हैं और नियंत्रण में हैं' 
            : 'Take a Slow Breath — You Are In Control & Supported'}
        </h2>
        
        <p className="text-xs sm:text-sm text-[#5A5672] max-w-3xl leading-relaxed">
          {isHindi
            ? 'डिजिटल ब्लैकमेलिंग आपकी गलती नहीं है। ब्लैकमेलर डर पैदा करके जल्दबाजी में गलत कदम उठवाना चाहते हैं। पहले 4-7-8 श्वास व्यायाम से घबराहट शांत करें, फिर बिना किसी झिझक के प्रशिक्षित सलाहकारों या पुलिस डेस्क से संपर्क करें।'
            : 'Extortion thrives on acute panic and self-isolation. Lower your heart rate with trauma-informed 4-7-8 somatic pacing, access verified crisis helplines, or copy freeze messages to silence perpetrators.'}
        </p>

        {/* 3-Mode Clean Switcher */}
        <div className="pt-2 flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          <button
            type="button"
            onClick={() => {
              hapticAction();
              setActiveMode('grounding');
            }}
            className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer min-h-[44px] ${
              activeMode === 'grounding'
                ? 'bg-[#26215C] text-white shadow-soft scale-102'
                : 'bg-[#FAF8F3] text-[#5A5672] hover:text-[#26215C] border border-[#26215C]/12 hover:bg-white'
            }`}
          >
            <Wind className="w-4 h-4 text-teal-300" />
            <span>{isHindi ? '🌿 1. घबराहट शांत करें (4-7-8 सांस)' : '🌿 1. Somatic Breathing (4-7-8)'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              hapticAction();
              setActiveMode('helplines');
            }}
            className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer min-h-[44px] ${
              activeMode === 'helplines'
                ? 'bg-[#26215C] text-white shadow-soft scale-102'
                : 'bg-[#FAF8F3] text-[#5A5672] hover:text-[#26215C] border border-[#26215C]/12 hover:bg-white'
            }`}
          >
            <PhoneCall className="w-4 h-4 text-emerald-300" />
            <span>{isHindi ? '📞 2. सभी हेल्पलाइन डायरेक्टरी' : '📞 2. Helpline Directory'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              hapticAction();
              setActiveMode('scripts');
            }}
            className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer min-h-[44px] ${
              activeMode === 'scripts'
                ? 'bg-[#26215C] text-white shadow-soft scale-102'
                : 'bg-[#FAF8F3] text-[#5A5672] hover:text-[#26215C] border border-[#26215C]/12 hover:bg-white'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-amber-300" />
            <span>{isHindi ? '💬 3. सुरक्षित संदेश व कानूनी जवाब' : '💬 3. Safe Scripts & Disclosure'}</span>
          </button>
        </div>
      </div>

      {/* 3. PRIMARY CONTENT PANEL */}
      {activeMode === 'grounding' && (
        <div className="space-y-6">
          <SomaticGroundingTool language={language} />

          {/* Quick Helpline Strip below Grounding for fast reassurance */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#26215C]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E1F5EE] text-[#0F6E56] flex items-center justify-center shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#26215C]">
                  {isHindi ? 'क्या आप किसी से बात करना चाहती हैं?' : 'Need to talk to an empathetic counselor right now?'}
                </h4>
                <p className="text-xs text-[#5A5672]">
                  {isHindi
                    ? 'राष्ट्रीय महिला हेल्पलाइन 14490 या टेली-मानस 14416 पर मुफ्त व 100% गोपनीय परामर्श लें।'
                    : 'Dial 14490 (NCW Women Desk) or 14416 (Tele-MANAS) for free, anonymous support.'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                hapticAction();
                setActiveMode('helplines');
              }}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-[#26215C] hover:bg-[#1A1540] text-white text-xs font-bold transition-all shadow-soft shrink-0 cursor-pointer active:scale-95 min-h-[42px]"
            >
              <span>{isHindi ? 'सभी हेल्पलाइन देखें' : 'View All Helplines'}</span>
              <PhoneCall className="w-3.5 h-3.5 text-emerald-300" />
            </button>
          </div>
        </div>
      )}

      {activeMode === 'helplines' && (
        <div className="space-y-6">
          <HelplineDirectory 
            language={language} 
            onNavigateToTab={onNavigateToTab}
          />
        </div>
      )}

      {activeMode === 'scripts' && (
        <div className="space-y-6">
          <CommunicationScripts language={language} />
        </div>
      )}
    </div>
  );
};
