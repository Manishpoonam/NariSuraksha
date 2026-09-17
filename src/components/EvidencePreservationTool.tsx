import React, { useState } from 'react';
import { 
  Hash, 
  Lock, 
  Upload, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Language } from '../types';
import { EvidenceChecklist } from './EvidenceChecklist';
import { EvidencePreservationWizard } from './EvidencePreservationWizard';

interface EvidencePreservationToolProps {
  language: Language;
  onNavigateToTab?: (tab: string, elementId?: string) => void;
}

export const EvidencePreservationTool: React.FC<EvidencePreservationToolProps> = ({ 
  language,
  onNavigateToTab
}) => {
  const isHindi = language === 'hi';

  const [demoHash, setDemoHash] = useState<string>('');
  const [demoFileName, setDemoFileName] = useState<string>('');
  const [isHashing, setIsHashing] = useState(false);

  // Client-Side Demonstrator of StopNCII On-Device Hashing
  const handleSimulateHashing = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsHashing(true);
    setDemoFileName(file.name);

    try {
      const buffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
      setDemoHash(hashHex);
    } catch (err) {
      console.error(err);
    } finally {
      setIsHashing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Step-by-Step Evidence Preservation Wizard */}
      <EvidencePreservationWizard
        language={language}
        onNavigateToTab={onNavigateToTab}
      />

      {/* 2. Complete Evidence Checklist & Progress Report */}
      <EvidenceChecklist 
        language={language}
        onNavigateToTab={onNavigateToTab}
      />

      {/* 2. Educational Demonstration: How StopNCII Protects Privacy via On-Device Hashing */}
      <section className="bg-white border border-[#E8E2DC] rounded-3xl p-5 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 text-[#1A1A1A] font-bold text-sm sm:text-base">
          <Lock className="w-5 h-5 text-[#8B6D5C]" />
          <span>{isHindi ? 'StopNCII की कार्यप्रणाली: आपकी फोटो कभी किसी सर्वर पर अपलोड नहीं होती' : 'How StopNCII Protects You: Your Raw Photo is Never Uploaded to Any Server'}</span>
        </div>

        <p className="text-xs sm:text-sm text-[#444] leading-relaxed">
          {isHindi
            ? 'अनेक महिलाएं इस डर से रिपोर्ट नहीं करतीं कि StopNCII पर उनकी निजी तस्वीर किसी और को दिखेगी। ऐसा बिल्कुल नहीं है! StopNCII आपके फोन के ब्राउज़र में ही फोटो का 64-अक्षरों का गणितीय कोड (SHA-256 हैश) बनाता है। केवल यह कोड सोशल मीडिया कंपनियों को भेजा जाता है, आपकी फोटो नहीं।'
            : 'Many victims hesitate because they fear sharing their image with another portal. In reality, StopNCII computes a 64-character mathematical hash (SHA-256) right inside your device browser memory. The original photo never leaves your phone.'}
        </p>

        {/* Live In-Browser Hashing Demonstration */}
        <div className="bg-[#FAF9F6] p-5 rounded-2xl border border-[#F0EBE6] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-[#2D2D2D] flex items-center gap-1.5">
                <Hash className="w-4 h-4 text-[#8B6D5C]" />
                <span>{isHindi ? 'लाइव ऑन-डिवाइस हैश टेस्ट (कोई भी टेस्ट फोटो चुनें)' : 'Try On-Device Hash Generation (Select any sample image)'}</span>
              </span>
              <p className="text-[11px] text-[#777] mt-0.5">
                {isHindi ? 'यह 100% आपके ब्राउज़र में रन करता है; कुछ भी इंटरनेट पर नहीं भेजा जाता।' : 'Processed 100% locally in your browser memory via Web Crypto API.'}
              </p>
            </div>

            <label className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#8B6D5C] hover:bg-[#775c4c] text-white rounded-full text-xs font-medium transition-colors cursor-pointer self-start sm:self-auto shadow-xs">
              <Upload className="w-3.5 h-3.5" />
              <span>{isHindi ? 'टेस्ट फाइल चुनें' : 'Choose Test File'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleSimulateHashing}
                className="hidden"
              />
            </label>
          </div>

          {demoHash && (
            <div className="p-4 bg-[#2D2D2D] text-[#FAF9F6] rounded-2xl font-mono text-xs space-y-1.5 overflow-x-auto border border-[#222]">
              <div className="flex items-center justify-between text-[#AAA] text-[10px]">
                <span>FILE: {demoFileName}</span>
                <span className="text-emerald-400 font-semibold">SHA-256 GENERATED LOCALLY</span>
              </div>
              <div className="text-[#E5DFD9] break-all text-[11px] font-bold">
                {demoHash}
              </div>
              <p className="text-[10px] text-[#AAA] pt-1 font-sans">
                {isHindi
                  ? 'यह 64-अक्षरों का कोड ही प्लेटफॉर्म्स को भेजा जाता है। ओरिजिनल फोटो आपके पास ही सुरक्षित रहती है।'
                  : 'Only this 64-character fingerprint is shared with Meta/TikTok to match and block uploads. Your actual photo stays safely with you.'}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <a
            href="https://stopncii.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-[#2D2D2D] hover:text-white text-[#2D2D2D] border border-[#DED9D4] rounded-full text-xs font-medium transition-colors"
          >
            <span>{isHindi ? 'आधिकारिक StopNCII.org पोर्टल पर जाएं' : 'Open Official StopNCII.org Portal'}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#8B6D5C]" />
          </a>
        </div>
      </section>
    </div>
  );
};

