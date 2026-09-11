/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldAlert, 
  Smartphone, 
  Cloud, 
  Eye, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowLeft, 
  Lock, 
  ExternalLink, 
  HelpCircle,
  Laptop,
  Users,
  Info
} from 'lucide-react';
import { Language } from '../types';
import { hapticAction } from '../utils/haptics';

interface DeviceSafetyChecklistProps {
  language: Language;
  onBack?: () => void;
  onProceedToEmergency?: () => void;
}

export const DeviceSafetyChecklist: React.FC<DeviceSafetyChecklistProps> = ({
  language,
  onBack,
  onProceedToEmergency
}) => {
  const isHindi = language === 'hi';
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    hapticAction();
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const suspiciousIndicators = [
    {
      id: 'battery_heat',
      title: {
        en: 'Unusual Phone Heat & Rapid Battery Drain',
        hi: 'बिना इस्तेमाल फोन का गर्म होना व तेज बैटरी खत्म होना'
      },
      desc: {
        en: 'Stalkerware runs stealth background processes, continuously uploading audio, location, and screen activity, causing the device to feel hot even while sleeping in your bag or pocket.',
        hi: 'जासूसी ऐप्स (Stalkerware) बैकग्राउंड में लगातार स्क्रीन और लोकेशन डेटा अपलोड करते हैं, जिससे फोन बिना चलाए भी गर्म रहता है।'
      }
    },
    {
      id: 'shared_cloud',
      title: {
        en: 'Shared Google Account or Apple iCloud Family',
        hi: 'साझा Google अकाउंट या Apple फैमिली शेयरिंग'
      },
      desc: {
        en: 'If your partner, spouse, or family member set up your phone or shares your Google/iCloud ID, your photos, messages, browsing history, and Find My locations are instantly visible on their iPad, laptop, or phone without them needing your passcode.',
        hi: 'यदि आपका Google या Apple ID किसी और के डिवाइस से जुड़ा है, तो आपके स्क्रीनशॉट्स और ब्राउज़िंग हिस्ट्री उनके कंप्यूटर या फोन पर तुरंत दिख जाती है।'
      }
    },
    {
      id: 'admin_apps',
      title: {
        en: 'Unfamiliar "Device Administrator" or Accessibility Apps',
        hi: 'अपरिचित "डिवाइस एडमिन" या एक्सेसिबिलिटी ऐप्स'
      },
      desc: {
        en: 'Check Settings → Security → Device Admin Apps (or Accessibility). Spyware often disguises itself under bland names like "System Health", "Battery Optimizer", "Sync Service", or "Network Service".',
        hi: 'सेटिंग्स में जांचें। स्पाइवेयर अक्सर "Device Care" या "Network Sync" जैसे नकली नामों के पीछे छिपा रहता है।'
      }
    },
    {
      id: 'third_party_keyboards',
      title: {
        en: 'Third-Party Keyboards & Bluetooth Screen Casting',
        hi: 'अज्ञात कीबोर्ड या अचानक कास्टिंग/स्क्रीन रिकॉर्डिंग आइकन'
      },
      desc: {
        en: 'A keylogger keyboard records every password and sensitive sentence you type. If you notice an active microphone or camera dot on your screen when no app is open, someone may be observing.',
        hi: 'संदिग्ध कीबोर्ड हर टाइप किया गया पासवर्ड रिकॉर्ड कर लेते हैं। स्टेटस बार में माइक या कैमरे का हरा/नारंगी डॉट दिखना जासूसी का संकेत हो सकता है।'
      }
    }
  ];

  const safetySteps = [
    {
      step: '1',
      title: {
        en: 'Do not research or type sensitive details on a monitored phone',
        hi: 'निगरानी वाले फोन पर संवेदनशील सर्च या शिकायत न लिखें'
      },
      desc: {
        en: 'If you suspect stalkerware or a shared cloud account, stop reading or drafting here. Every keystroke or screenshot can be seen by the abuser in real time.',
        hi: 'यदि आपको शक है कि फोन ट्रैक हो रहा है, तो इस फोन पर केस के सबूत या मैसेज टाइप करना तुरंत बंद कर दें।'
      }
    },
    {
      step: '2',
      title: {
        en: 'Use a trusted alternative device',
        hi: 'किसी विश्वसनीय सहेली या सुरक्षित कंप्यूटर का उपयोग करें'
      },
      desc: {
        en: 'Use a close friend’s phone in Incognito mode, a work laptop on an enterprise network, or a college library terminal. Ensure you log out and close all windows before leaving.',
        hi: 'किसी करीबी सहेली के फोन (प्राइवेट/गुप्त मोड में) या कॉलेज/दफ्तर के कंप्यूटर से शिकायत दर्ज करें।'
      }
    },
    {
      step: '3',
      title: {
        en: 'Never confront the perpetrator from the monitored device',
        hi: 'निगरानी वाले फोन से कभी अपराधी को चुनौती न दें'
      },
      desc: {
        en: 'Do not text the perpetrator "I know you are tracking my phone" or "I am filing an FIR" from this device. Doing so removes your tactical advantage and can provoke escalation.',
        hi: 'उसे कभी यह मैसेज न करें कि "मुझे पता है तुम जासूसी कर रहे हो"। इससे खतरा बढ़ सकता है।'
      }
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Bar with Back action */}
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
      <div className="bg-[#1E1949] text-white rounded-3xl p-6 sm:p-8 border border-white/15 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E1F5EE]/15 text-[#E1F5EE] text-xs font-medium border border-[#B7E4D7]/20">
          <Smartphone className="w-3.5 h-3.5 text-[#E1F5EE]" />
          <span>{isHindi ? 'डिवाइस सुरक्षा विश्लेषण' : 'Critical Device Integrity Assessment'}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          {isHindi 
            ? 'क्या अभी जिस फोन पर आप यह पढ़ रही हैं, वह वास्तव में सुरक्षित है?' 
            : 'Is this device safe for you to use right now?'}
        </h1>

        <p className="text-sm sm:text-base text-[#D2CCE7] leading-relaxed max-w-2xl">
          {isHindi
            ? 'यदि ब्लैकमेलर या साथी के पास आपके फोन का पासवर्ड है, या आपका Google/iCloud अकाउंट उनके कंप्यूटर पर खुला है, तो वह आपके स्क्रीनशॉट्स और कानूनी शिकायतें देख सकता है।'
            : 'In intimate partner extortion and domestic surveillance, abusers frequently monitor texts, locations, and browser tabs via stalkerware or linked cloud family accounts. Review these indicators before typing sensitive information.'}
        </p>
      </div>

      {/* Warning Notice: Purely Educational */}
      <div className="p-4 bg-[#FBEAF0] rounded-2xl border border-[#F3C5D6] flex items-start gap-3 text-xs sm:text-sm text-[#7A2843]">
        <Info className="w-5 h-5 shrink-0 text-[#993556] mt-0.5" />
        <div>
          <span className="font-bold">
            {isHindi ? 'पारदर्शी सुरक्षा सूचना: ' : 'Transparency Notice: '}
          </span>
          {isHindi
            ? 'यह मॉड्यूल केवल शैक्षणिक मार्गदर्शन प्रदान करता है। 100% प्राइवेसी बनाए रखने के लिए यह ऐप आपके फोन को स्कैन नहीं करता और न ही कोई छिपे हुए परमिशन मांगता है।'
            : 'This module is strictly educational guidance. Consistent with our zero-telemetry and zero-permission privacy model, this app does NOT inspect your device filesystem or claim to scan for viruses.'}
        </div>
      </div>

      {/* SECTION 1: Red Flag Indicators */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E2DC] shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-[#E25822]" />
          <span>{isHindi ? 'जासूसी व निगरानी के 4 मुख्य संकेत' : '4 Telltale Signs of Stalkerware & Shared Monitoring'}</span>
        </h2>
        <p className="text-xs text-[#666]">
          {isHindi ? 'उन संकेतों पर टिक करें जो आपके फोन में दिख रहे हैं:' : 'Check the items you have observed on this phone:'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
          {suspiciousIndicators.map((item) => {
            const isChecked = !!checkedItems[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer select-none space-y-2 ${
                  isChecked 
                    ? 'bg-[#FBEAF0]/40 border-[#F3C5D6] shadow-xs' 
                    : 'bg-[#FAF9F6] border-[#E8E2DC] hover:border-[#CBD5E1]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-bold text-[#1A1A1A] leading-snug">
                    {item.title[language]}
                  </span>
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                    isChecked ? 'bg-[#993556] border-[#993556] text-white' : 'border-[#CBD5E1] bg-white'
                  }`}>
                    {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </div>
                <p className="text-xs text-[#555] leading-relaxed">
                  {item.desc[language]}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Immediate Safe Protocol */}
      <div className="bg-[#FAF9F6] rounded-3xl p-6 sm:p-7 border border-[#E8E2DC] space-y-4">
        <h2 className="text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
          <Lock className="w-5 h-5 text-[#0F6E56]" />
          <span>{isHindi ? 'यदि आपको निगरानी का संदेह है, तो क्या करें?' : 'Immediate Protocol if You Suspect Device Monitoring'}</span>
        </h2>

        <div className="space-y-3">
          {safetySteps.map((s) => (
            <div key={s.step} className="p-4 bg-white rounded-2xl border border-[#E8E2DC] flex items-start gap-3.5">
              <span className="w-7 h-7 rounded-xl bg-[#E1F5EE] text-[#0F6E56] font-bold text-xs flex items-center justify-center shrink-0">
                {s.step}
              </span>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#1A1A1A]">
                  {s.title[language]}
                </h3>
                <p className="text-xs text-[#666] leading-relaxed">
                  {s.desc[language]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="text-xs text-[#777]">
          {isHindi 
            ? 'सुरक्षित महसूस होने पर ही आगे बढ़ें।' 
            : 'Only proceed with drafting when you are confident in your physical surroundings.'}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {onProceedToEmergency && (
            <button
              onClick={() => {
                hapticAction();
                onProceedToEmergency();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#2D2D2D] hover:bg-black text-white text-xs font-bold transition-all shadow-sm cursor-pointer text-center"
            >
              {isHindi ? 'डिवाइस सुरक्षित है — संकट कॉकपिट खोलें' : 'Device is Secure — Open Crisis Cockpit'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
