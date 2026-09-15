/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquareHeart, 
  Check, 
  ShieldCheck, 
  Send, 
  Sparkles,
  Info
} from 'lucide-react';
import { Language } from '../types';
import { submitAnonymousFeedback } from '../utils/feedback';
import { hapticAction, hapticSuccess } from '../utils/haptics';

interface AnonymousFeedbackPromptProps {
  language: Language;
  flowId: string;
}

export const AnonymousFeedbackPrompt: React.FC<AnonymousFeedbackPromptProps> = ({
  language,
  flowId
}) => {
  const isHindi = language === 'hi';
  const [selectedRating, setSelectedRating] = useState<'yes' | 'no' | 'prefer_not_to_say' | null>(null);
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRating) return;

    hapticAction();
    setIsSubmitting(true);
    await submitAnonymousFeedback({
      flowId,
      helpful: selectedRating,
      comments: comments.trim(),
    });
    setIsSubmitting(false);
    setSubmitted(true);
    hapticSuccess();
  };

  if (submitted) {
    return (
      <div className="p-4 bg-[#E1F5EE]/50 rounded-2xl border border-[#B7E4D7] text-xs text-[#0F6E56] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-[#0F6E56]" />
          <span>
            {isHindi 
              ? 'गोपनीय प्रतिक्रिया के लिए धन्यवाद। इससे संकट में फंसी अन्य महिलाओं की सहायता प्रणाली बेहतर होती है।' 
              : 'Thank you for your anonymous feedback. It helps improve safety tools for others.'}
          </span>
        </div>
        <span className="text-[10px] text-[#666] font-medium">
          {isHindi ? '100% शून्य-ट्रैकिंग' : 'Zero-Telemetry'}
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#E8E2DC] bg-[#FAF9F6] p-4 sm:p-5 space-y-3">
      {/* Honest qualitative social-proof copy */}
      <p className="text-xs text-[#5A5672] leading-relaxed">
        {isHindi
          ? 'आप यहाँ डर कर बैठने वाली पहली इंसान नहीं हैं, और न ही आखिरी। यह टूल इसलिए मौजूद है क्योंकि दूसरों को भी इसकी उतनी ही ज़रूरत थी।'
          : "You're not the first person to sit here scared, and you won't be the last. This exists because others needed it too."}
      </p>

      <div className="flex items-start justify-between gap-3 pt-0.5">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#1A1A1A]">
            <MessageSquareHeart className="w-4 h-4 text-[#8B6D5C] shrink-0" />
            <span>
              {isHindi ? 'क्या इस टूल से आपको मदद मिली? (वैकल्पिक व पूरी तरह गोपनीय)' : 'Did this help in your situation? (Optional & 100% Anonymous)'}
            </span>
          </div>
          <p className="text-[11px] text-[#666]">
            {isHindi
              ? 'कोई व्यक्तिगत डेटा, IP पता या केस विवरण एकत्र नहीं किया जाता।'
              : 'No personal details, IP addresses, or case specifics are stored or collected.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Rating Options */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'yes', label: isHindi ? 'हाँ, मदद मिली' : 'Yes, helped' },
            { id: 'no', label: isHindi ? 'नहीं' : 'No' },
            { id: 'prefer_not_to_say', label: isHindi ? 'कहना नहीं चाहती' : 'Prefer not to say' },
          ].map((opt) => (
            <button
              type="button"
              key={opt.id}
              onClick={() => {
                hapticAction();
                setSelectedRating(opt.id as any);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                selectedRating === opt.id
                  ? 'bg-[#2D2D2D] text-white border-[#2D2D2D]'
                  : 'bg-white text-[#555] border-[#DED9D4] hover:bg-[#F3EFEC]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Optional Comment */}
        {selectedRating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-2 pt-1"
          >
            <input
              type="text"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              maxLength={200}
              placeholder={
                isHindi 
                  ? 'कोई सुझाव या अनुभव? (कृपया अपना नाम या फोन नंबर न लिखें)' 
                  : 'Optional comment: what could be clearer? (Do not enter names or phone numbers)'
              }
              className="w-full text-xs px-3.5 py-2 rounded-xl border border-[#DED9D4] bg-white text-[#1A1A1A] focus:outline-none focus:border-[#8B6D5C]"
            />

            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#888]">
                {comments.length}/200
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#2D2D2D] hover:bg-black text-white text-xs font-bold transition-all cursor-pointer shadow-xs disabled:opacity-50"
              >
                <Send className="w-3 h-3" />
                <span>{isSubmitting ? (isHindi ? 'भेज रहे हैं...' : 'Sending...') : (isHindi ? 'फीडबैक भेजें' : 'Submit')}</span>
              </button>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  );
};
