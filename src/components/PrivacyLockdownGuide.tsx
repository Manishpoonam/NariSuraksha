import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Instagram, 
  MessageCircle, 
  Send, 
  Smartphone, 
  CheckSquare, 
  Square, 
  Baby, 
  AlertCircle,
  Key,
  RotateCcw,
  CheckCircle2,
  Check
} from 'lucide-react';
import { Language } from '../types';
import { sessionDraft, STORAGE_KEYS } from '../utils/storage';

interface PrivacyLockdownGuideProps {
  language: Language;
}

export const PrivacyLockdownGuide: React.FC<PrivacyLockdownGuideProps> = ({ language }) => {
  const isHindi = language === 'hi';

  // Session-only storage: cleared on tab/browser close to protect users on shared or monitored devices
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(() => {
    // Purge legacy localStorage data to prevent security leaks on shared devices
    try {
      localStorage.removeItem('suraksha_lockdown_checklist_v1');
    } catch (_) {}
    return sessionDraft.get<Record<string, boolean>>(STORAGE_KEYS.LOCKDOWN_CHECKLIST, {});
  });

  useEffect(() => {
    sessionDraft.set(STORAGE_KEYS.LOCKDOWN_CHECKLIST, completedSteps);
  }, [completedSteps]);

  const toggleStep = (id: string) => {
    setCompletedSteps(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleReset = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    sessionDraft.remove(STORAGE_KEYS.LOCKDOWN_CHECKLIST);
    try {
      localStorage.removeItem('suraksha_lockdown_checklist_v1');
    } catch (_) {}
    setCompletedSteps({});
  };

  const platforms = [
    {
      id: 'instagram',
      name: 'Instagram Privacy Lockdown',
      icon: <Instagram className="w-5 h-5 text-[#8B6D5C]" />,
      summary: {
        en: 'Block contact scraping, prevent message requests from strangers, and hide mutual friend circles.',
        hi: 'कॉन्टैक्ट्स को चोरी होने से बचाएं, अजनबियों के मैसेज रिक्वेस्ट बंद करें और फॉलोअर्स लिस्ट सुरक्षित करें।'
      },
      steps: [
        {
          id: 'ig_private',
          title: {
            en: 'Set Account to Private (Immediately)',
            hi: 'अकाउंट को तुरंत "Private" करें'
          },
          instruction: {
            en: 'Settings > Account Privacy > Toggle "Private Account" to ON. This prevents extortionists from viewing your followers and tagged photos.',
            hi: 'Settings > Account Privacy में जाकर "Private Account" को ऑन करें। इससे ब्लैकमेलर आपके फॉलोअर्स और फोटो नहीं देख पाएगा।'
          }
        },
        {
          id: 'ig_dm_requests',
          title: {
            en: 'Turn OFF Message Requests from Strangers',
            hi: 'अजनबियों के मैसेज रिक्वेस्ट पूरी तरह बंद करें'
          },
          instruction: {
            en: 'Settings > Messages and Story Replies > Message Controls > Set "Others on Instagram" to "Don’t receive requests".',
            hi: 'Settings > Messages > Message Controls में जाकर "Others on Instagram" को "Don’t receive requests" पर सेट करें।'
          }
        },
        {
          id: 'ig_restrict',
          title: {
            en: 'Use "Restrict" Instead of Just Blocking (Silent Shield)',
            hi: 'सिर्फ ब्लॉक करने के बजाय "Restrict" मोड का प्रयोग करें'
          },
          instruction: {
            en: 'Restricting the blackmailer hides their comments and direct messages without alerting them, giving you quiet time to gather evidence.',
            hi: 'संदिग्ध अकाउंट को "Restrict" करने से उनके मैसेज छिपे रहते हैं और उन्हें पता भी नहीं चलता कि आपने उन्हें म्यूट किया है।'
          }
        },
        {
          id: 'ig_contact_sync',
          title: {
            en: 'Disconnect Phone Contacts Syncing',
            hi: 'फोन कॉन्टैक्ट्स की सिंक बंद करें'
          },
          instruction: {
            en: 'Settings > Accounts Center > Your information and permissions > Upload contacts > Toggle OFF. Prevents phone number discovery.',
            hi: 'Settings > Accounts Center > Your information > Upload Contacts को OFF करें ताकि आपका नंबर इंस्टाग्राम पर सर्च न हो।'
          }
        }
      ]
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Group & Profile Shield',
      icon: <MessageCircle className="w-5 h-5 text-[#8B6D5C]" />,
      summary: {
        en: 'Stop scammers from adding you to abusive groups and hide your profile picture and online status.',
        hi: 'ब्लैकमेलर्स को आपको किसी अवांछित ग्रुप में जोड़ने से रोकें और प्रोफाइल फोटो को सुरक्षित करें।'
      },
      steps: [
        {
          id: 'wa_groups',
          title: {
            en: 'Lock Group Addition to "My Contacts Except..."',
            hi: 'ग्रुप्स में जोड़ने की अनुमति को "My Contacts Except..." पर सेट करें'
          },
          instruction: {
            en: 'Settings > Privacy > Groups > Change from "Everyone" to "My Contacts" or "My Contacts Except...". Strangers will NOT be able to add you to public shame groups.',
            hi: 'Settings > Privacy > Groups में जाकर "Everyone" हटाकर "My Contacts" करें ताकि कोई भी अनजान व्यक्ति आपको किसी ग्रुप में न जोड़ सके।'
          }
        },
        {
          id: 'wa_silence_unknown',
          title: {
            en: 'Enable "Silence Unknown Callers"',
            hi: '"Silence Unknown Callers" को ऑन करें'
          },
          instruction: {
            en: 'Settings > Privacy > Calls > Turn ON "Silence Unknown Callers". Extortionists and spam video calls will not ring your phone.',
            hi: 'Settings > Privacy > Calls में जाकर "Silence Unknown Callers" चालू करें। अनजान नंबरों से आने वाली वीडियो कॉल अपने आप म्यूट हो जाएगी।'
          }
        },
        {
          id: 'wa_profile_privacy',
          title: {
            en: 'Hide Profile Picture & About from Non-Contacts',
            hi: 'प्रोफाइल फोटो और About को सिर्फ संपर्कों तक सीमित रखें'
          },
          instruction: {
            en: 'Settings > Privacy > Profile Photo & About > Set to "My Contacts".',
            hi: 'Settings > Privacy में Profile Photo और About दोनों को "My Contacts" पर सेट करें।'
          }
        },
        {
          id: 'wa_2fa',
          title: {
            en: 'Turn ON Two-Step Verification PIN',
            hi: 'टू-स्टेप वेरिफिकेशन (Two-Step Verification) पिन चालू करें'
          },
          instruction: {
            en: 'Settings > Account > Two-Step Verification > Enable 6-digit PIN. Protects your account from SIM-swap hijacking.',
            hi: 'Settings > Account > Two-step verification में 6 अंकों का पिन सेट करें ताकि कोई आपके नंबर का गलत इस्तेमाल न कर सके।'
          }
        }
      ]
    },
    {
      id: 'device_contacts',
      name: 'Phone Permissions & Contact Theft Protection',
      icon: <Smartphone className="w-5 h-5 text-[#8B6D5C]" />,
      summary: {
        en: 'How extortionists steal contacts via fake video-call APKs and how to audit installed permissions.',
        hi: 'फर्जी वीडियो-कॉल ऐप्स द्वारा कॉन्टैक्ट चोरी से बचाव और फोन परमिशन्स की जांच।'
      },
      steps: [
        {
          id: 'app_permission_audit',
          title: {
            en: 'Revoke "Contacts" & "Storage" from Unknown Apps',
            hi: 'अनजान ऐप्स से "Contacts" और "Storage" परमिशन तुरंत वापस लें'
          },
          instruction: {
            en: 'Phone Settings > Apps > Permission Manager > Contacts > Revoke access for any dating app, screen recorder, or third-party APK.',
            hi: 'फोन की Settings > Apps > Permission Manager > Contacts में जाएं और किसी भी अनजान ऐप या डेटिंग ऐप की परमिशन रद्द करें।'
          }
        },
        {
          id: 'uninstall_apk',
          title: {
            en: 'Uninstall Any Sideloaded APKs Downloaded Recently',
            hi: 'हाल ही में डाउनलोड किए गए किसी भी संदिग्ध APK को अनइंस्टॉल करें'
          },
          instruction: {
            en: 'If you installed an APK sent via WhatsApp/Telegram to "watch a video", delete it immediately and run Google Play Protect.',
            hi: 'यदि किसी ने टेलीग्राम या व्हाट्सएप पर कोई ऐप (APK) भेजा था, तो उसे तुरंत अनइंस्टॉल करें और Google Play Protect से स्कैन करें।'
          }
        },
        {
          id: 'google_account_audit',
          title: {
            en: 'Sign Out All Unknown Devices from Google / Apple ID',
            hi: 'Google अकाउंट या Apple ID से सभी अनजान डिवाइसों को लॉगआउट करें'
          },
          instruction: {
            en: 'Visit myaccount.google.com/devices or Apple ID settings, inspect active sessions, and click "Sign out" on unfamiliar devices.',
            hi: 'Google Account Settings में "Your Devices" पर जाकर उन सभी डिवाइसों से लॉगआउट करें जिन्हें आप नहीं पहचानते।'
          }
        }
      ]
    }
  ];

  const activeCount = Object.values(completedSteps).filter(Boolean).length;

  return (
    <section id="privacy-lockdown-guide" className="space-y-6 scroll-mt-48">
      <div className="border-b border-[#F0EBE6] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-[#F3EFEC] text-[#8B6D5C] flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </span>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#2D2D2D] tracking-tight">
              {isHindi ? 'सोशल मीडिया व डिवाइस प्राइवेसी लॉकडाउन गाइड' : 'Social Media & Device Privacy Lockdown Protocol'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#666] mt-1">
            {isHindi
              ? 'ब्लैकमेलर्स आपके दोस्तों और परिजनों की सूची तक कैसे पहुंचते हैं और 5 मिनट में अपने सभी सोशल अकाउंट्स को पूरी तरह सील कैसे करें।'
              : 'Detailed, actionable steps to shield your contact lists, isolate attackers, and lock down Instagram, WhatsApp, and device permissions.'}
          </p>
        </div>

        {/* Save Status & Reset Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 flex-wrap">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              activeCount > 0
                ? 'bg-[#E1F5EE] text-[#0F6E56] border border-[#B7E4D7]'
                : 'bg-[#FAF8F3] text-[#666] border border-[#E8E2DC]'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${activeCount > 0 ? 'text-[#0F6E56]' : 'text-[#888]'}`} />
            <span>
              {activeCount > 0
                ? isHindi
                  ? `${activeCount} सुरक्षा सक्रिय — अब आप तक पहुंचना बहुत कठिन है`
                  : `${activeCount} protections active — you're already harder to reach`
                : isHindi
                  ? 'सत्र-आधारित चेकलिस्ट (टैब बंद होने पर स्वतः मिट जाएगी)'
                  : 'Session checklist (cleared on tab close)'}
            </span>
          </span>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-[#666] hover:text-[#DC2626] hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all cursor-pointer active:scale-95"
              title={isHindi ? 'सभी टिक रीसेट करें' : 'Reset active protections'}
            >
              <RotateCcw className="w-3 h-3" />
              <span>{isHindi ? 'रीसेट' : 'Reset'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Minor Protection / POCSO Box */}
      <div className="bg-[#FAF9F6] border-2 border-[#E5DFD9] rounded-3xl p-5 sm:p-7 shadow-sm space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#8B6D5C] text-white flex items-center justify-center shrink-0">
            <Baby className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A]">
              {isHindi ? '18 वर्ष से कम आयु के किशोरों के लिए विशेष POCSO सुरक्षा' : 'Special Legal Shield for Minors (Under 18) — POCSO Act'}
            </h3>
            <span className="text-xs font-bold text-[#8B6D5C] uppercase tracking-wider">
              {isHindi ? 'कठोरतम गैर-जमानती कानून' : 'Zero-Tolerance Non-Bailable Statutory Protection'}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#3A3A3A] leading-relaxed">
          {isHindi
            ? 'यदि पीड़िता या मीडिया में दिखने वाला व्यक्ति 18 वर्ष से कम आयु का है, तो POCSO अधिनियम 2012 के तहत यह अत्यंत गंभीर अपराध है। ऐसे मामलों में सहमति का कोई महत्व नहीं होता और अपराधी को 20 वर्ष से लेकर आजीवन कारावास तक की सजा होती है। चाइल्डलाइन 1098 या 1930 पर सीधे नाबालिग के रूप में रिपोर्ट करें।'
            : 'Under the Protection of Children from Sexual Offences (POCSO) Act 2012, non-consensual creation or distribution of intimate media of anyone under 18 carries mandatory severe imprisonment up to Life Term. Lack of consent is statutorily presumed. Direct helpline: 1098 / 1930.'}
        </p>
      </div>

      {/* Platform Checklist Cards */}
      <div className="space-y-6">
        {platforms.map((plat) => (
          <div
            key={plat.id}
            className="bg-white border border-[#E8E2DC] rounded-3xl p-5 sm:p-8 shadow-sm space-y-5"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#FAF9F6] border border-[#E8E2DC] flex items-center justify-center shrink-0">
                {plat.icon}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A]">
                  {plat.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#555] mt-0.5 leading-relaxed">
                  {plat.summary[language]}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {plat.steps.map((st) => {
                const isChecked = !!completedSteps[st.id];
                return (
                  <div
                    key={st.id}
                    onClick={() => toggleStep(st.id)}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                      isChecked
                        ? 'bg-[#E1F5EE]/60 border-[#B7E4D7] text-[#1A1A1A]'
                        : 'bg-white hover:bg-[#FAF9F6] border-[#E8E2DC] text-[#1A1A1A]'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isChecked ? (
                        <div className="w-5 h-5 rounded-md bg-[#0F6E56] text-white flex items-center justify-center shadow-xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-md border-2 border-[#D1CCC7] hover:border-[#8B6D5C] bg-white transition-colors" />
                      )}
                    </div>

                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className={`text-sm sm:text-base font-bold transition-colors ${
                          isChecked ? 'text-[#0F6E56]' : 'text-[#1A1A1A]'
                        }`}>
                          {st.title[language]}
                        </h4>
                        {isChecked && (
                          <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-[#E1F5EE] text-[#0F6E56] border border-[#B7E4D7]">
                            {isHindi ? 'सक्रिय' : 'Active'}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-[#444] leading-relaxed">
                        {st.instruction[language]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
