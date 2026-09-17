import React, { useState } from 'react';
import { 
  MessageSquare, 
  Copy, 
  Check, 
  Users, 
  ShieldAlert, 
  GraduationCap, 
  HeartHandshake, 
  AlertTriangle,
  FileText
} from 'lucide-react';
import { Language } from '../types';

interface CommunicationScriptsProps {
  language: Language;
}

export const CommunicationScripts: React.FC<CommunicationScriptsProps> = ({ language }) => {
  const isHindi = language === 'hi';
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'parents' | 'blackmailer' | 'college'>('parents');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const scripts = {
    parents: [
      {
        id: 'script_parent_confession',
        title: {
          en: 'Pre-Emptive Disclosure to Parents / Elder Sibling',
          hi: 'माता-पिता या बड़े भाई/बहन को पहले से बताने का संदेश'
        },
        context: {
          en: 'Blackmailers rely on fear of your family finding out. Telling your parents or a trusted relative first completely neutralizes their primary weapon.',
          hi: 'ब्लैकमेलर्स का सबसे बड़ा हथियार परिवार का डर होता है। जब आप खुद किसी समझदार परिजन को पहले बता देती हैं, तो ब्लैकमेलर की शक्ति शून्य हो जाती है।'
        },
        message: {
          en: `Mom/Dad, I need to talk to you about something important. An online scammer/hacker has obtained/manipulated some personal private images and is trying to extort money from me by threatening to share them. 

I have not done anything wrong, and I have already preserved the evidence and consulted the National Cyber Crime Portal (1930 / cybercrime.gov.in). Legal experts and cyber police have advised me not to pay a single rupee. I wanted you to hear this directly from me so we can handle this legally and firmly together. Please stand by me.`,
          hi: `मम्मी/पापा, मुझे आपसे एक ज़रूरी बात करनी है। एक ऑनलाइन धोखेबाज/साइबर अपराधी ने मेरी कुछ निजी तस्वीरों का गलत इस्तेमाल / मॉर्फिंग कर मुझे ब्लैकमेल करके पैसों की मांग की है और डराने की कोशिश कर रहा है।

मैंने कोई गलती नहीं की है। मैंने साइबर हेल्पलाइन (1930) और साइबर क्राइम पोर्टल पर कानूनी प्रक्रिया शुरू कर दी है। वकीलों और पुलिस का सख्त निर्देश है कि ब्लैकमेलर को एक भी पैसा न दिया जाए। मैं चाहती थी कि यह बात आपको सीधे मुझसे पता चले ताकि हम मिलकर कानूनी रूप से इसका सामना कर सकें। मुझे इस समय आपके साथ और भरोसे की ज़रूरत है।`
        }
      },
      {
        id: 'script_friend_ally',
        title: {
          en: 'Message to a Trusted Friend / Close Ally',
          hi: 'विश्वसनीय सहेली / मित्र से सहायता मांगने का संदेश'
        },
        context: {
          en: 'Use this to confide in a friend who can stay with you, help you file the complaint, and offer grounded emotional support.',
          hi: 'अपनी करीबी सहेली को बताएं ताकि वह आपके साथ रहकर शिकायत दर्ज कराने और मानसिक सहारा देने में मदद कर सके।'
        },
        message: {
          en: `Hey, I am going through a serious cyber extortion situation right now and I really need your calm support. Someone is threatening to leak private photos and asking for money. 

I am following the official Cyber Police protocol (1930) and StopNCII takedown process. Can you please stay with me while I document the evidence and file the report? Please keep this completely confidential between us.`,
          hi: `सुनो, इस समय मुझे तुम्हारी बहुत ज़रूरत है। कोई साइबर अपराधी मेरी निजी तस्वीरों को लेकर मुझे ब्लैकमेल और परेशान करने की कोशिश कर रहा है।

मैं 1930 साइबर हेल्पलाइन और आधिकारिक पोर्टल के जरिए कानूनी कार्रवाई कर रही हूं। क्या तुम मेरे साथ रहकर सबूत सुरक्षित करने और रिपोर्ट दर्ज कराने में मेरी मदद कर सकती हो? कृपया इस बात को अभी सिर्फ हमारे बीच गोपनीय रखना।`
        }
      }
    ],
    blackmailer: [
      {
        id: 'script_stall_time',
        title: {
          en: 'Phase 1: Calm Stalling Script (Buy Breathing Room During Countdown)',
          hi: 'चरण 1: समय हासिल करने का शांत संदेश (सक्रिय काउंटडाउन के समय)'
        },
        context: {
          en: 'Send this once only if facing an active countdown. Neutralizes urgency and buys 2-4 hours to screenshot evidence and compute StopNCII hashes. Withhold all payment.',
          hi: 'अगर आपको 1930 पर कॉल करने, चैट का पूरा स्क्रीनशॉट लेने और StopNCII पर हैश दर्ज करने के लिए 2-4 घंटे का समय चाहिए, तो यह संदेश भेजें।'
        },
        message: {
          en: `I am currently in an examination / hospital / without mobile banking access right now. I cannot arrange anything immediately. Do not do anything in haste. I will check once I am free later today.`,
          hi: `मैं इस समय एक जरूरी परीक्षा / हॉस्पिटल में हूं और मेरे पास ऑनलाइन बैंकिंग का एक्सेस नहीं है। मैं तुरंत कुछ नहीं कर सकती। जल्दबाजी में कुछ मत करो, मैं शाम को फ्री होकर देखती हूं।`
        }
      },
      {
        id: 'script_legal_warning',
        title: {
          en: 'Phase 2: Statutory Freeze Notice (Final Response Once Evidence Is Saved)',
          hi: 'चरण 2: वैधानिक फ्रीज नोटिस (सबूत सुरक्षित होने के बाद भेजें)'
        },
        context: {
          en: 'Cites Indian law (BNS 2023 & IT Act). Send this once, take an uncropped screenshot with timestamp, turn off read receipts, and block the perpetrator immediately.',
          hi: 'भारतीय न्याय संहिता (BNS) और आईटी एक्ट की धाराओं का हवाला दें। इसे भेजने के बाद स्क्रीनशॉट लें और नंबर को तुरंत ब्लॉक कर दें।'
        },
        message: {
          en: `Notice of Criminal Complaint:
Your contact information, UPI payment identifiers, and chat records have been preserved and submitted to the National Cyber Crime Reporting Portal (1930 / cybercrime.gov.in) and the Cyber Crime Police.

Applicable statutory provisions:
- Information Technology Act 2000, Section 66E (Violation of privacy) & Section 67A (Transmitting explicit content electronically)
- Bharatiya Nyaya Sanhita (BNS) 2023, Section 308 (Extortion), Section 351 (Criminal Intimidation), and Section 77 (Voyeurism)

All evidence has been digitally documented for investigation. Intermediary platforms have been notified for immediate blocking. You have the legal right to withhold payment. Cease all contact immediately.`,
          hi: `आधिकारिक कानूनी सूचना (Notice of Criminal Complaint):
आपकी संपर्क जानकारी, UPI भुगतान विवरण और चैट स्क्रीनशॉट सुरक्षित करके राष्ट्रीय साइबर अपराध पोर्टल (हेल्पलाइन 1930 / cybercrime.gov.in) एवं साइबर पुलिस को सौंप दिए गए हैं।

लागू कानूनी प्रावधान:
- सूचना प्रौद्योगिकी अधिनियम 2000, धारा 66E (गोपनीयता हनन) एवं धारा 67A (इलेक्ट्रॉनिक माध्यम से अश्लील सामग्री का प्रसारण)
- भारतीय न्याय संहिता (BNS 2023), धारा 308 (जबरन वसूली/ब्लैकमेल), धारा 351 (आपराधिक धमकी) एवं धारा 77 (ताक-झांक)

पुलिस जांच हेतु सभी साक्ष्य सुरक्षित हैं तथा मध्यवर्ती प्लेटफॉर्म्स को सूचना दी जा चुकी है। आपको कोई पैसा नहीं दिया जाएगा। तुरंत संपर्क बंद करें।`
        }
      }
    ],
    college: [
      {
        id: 'script_college_proctor',
        title: {
          en: 'Confidential Notice to College Internal Complaints Committee (ICC)',
          hi: 'कॉलेज आंतरिक शिकायत समिति (ICC) / प्रॉक्टर को गोपनीय सूचना'
        },
        context: {
          en: 'If a classmate, ex-partner, or stranger threatens to circulate media across college WhatsApp groups or hostel premises.',
          hi: 'यदि कोई कॉलेज सहपाठी या पूर्व-परिचित कॉलेज ग्रुप्स में बदनामी की धमकी दे रहा हो, तो कॉलेज प्रशासन को सूचित करने का प्रारूप।'
        },
        message: {
          en: `To,
The Presiding Officer / Internal Complaints Committee (ICC),
[Name of College / University]

Subject: Confidential Request for Protection against Cyber Harassment and Non-Consensual Extortion

Respected Committee Members,
I am a bona fide student of [Department / Semester, Roll No: ______]. I am writing to formally bring to your notice that an individual is attempting cyber extortion and threatening to circulate manipulated/private media within university circles.

I have already initiated formal proceedings with the National Cyber Crime Cell (Ack No: _________). Under UGC Regulations on Sexual Harassment (2015) and Section 73 BNS, I request strict confidentiality regarding my identity, and urgent instruction to department administrators to immediately report and remove any unauthorized posts or circulation targeting me.

Yours sincerely,
[Your Name / Confidential Alias]
Contact: [Your Phone / Email]`,
          hi: `सेवा में,
अध्यक्ष / आंतरिक शिकायत समिति (ICC),
[कॉलेज / विश्वविद्यालय का नाम]

विषय: साइबर उत्पीड़न एवं ब्लैकमेलिंग के विरुद्ध गोपनीय सुरक्षा हेतु आवेदन

महोदया/महोदय,
मैं [विभाग / सेमेस्टर, रोल नंबर: ______] की छात्रा हूं। मैं आपके संज्ञान में लाना चाहती हूं कि एक व्यक्ति द्वारा मुझे साइबर ब्लैकमेल कर कॉलेज परिसर/समूहों में निजी/मॉर्फ्ड तस्वीरें प्रसारित करने की धमकी दी जा रही है।

मैंने इस संबंध में राष्ट्रीय साइबर क्राइम पोर्टल (1930) पर शिकायत दर्ज कराई है। यूजीसी नियमावली 2015 एवं BNS की धारा 73 के तहत मेरी पहचान पूर्णतः गोपनीय रखी जाए, तथा कॉलेज के ग्रुप्स या परिसर में किसी भी प्रकार के अनधिकृत प्रसार को तुरंत रोकने के निर्देश दिए जाएं।

भवदीया,
[आपका नाम / गोपनीय नाम]
संपर्क: [फोन नंबर / ईमेल]`
        }
      }
    ]
  };

  return (
    <section id="communication-scripts" className="space-y-6 scroll-mt-48">
      <div className="border-b border-[#F0EBE6] pb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-full bg-[#F3EFEC] text-[#8B6D5C] flex items-center justify-center">
            <MessageSquare className="w-4 h-4" />
          </span>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#2D2D2D] tracking-tight">
            {isHindi ? 'बातचीत व सुरक्षा स्क्रिप्ट्स (फैमिली, कॉलेज व ब्लैकमेलर)' : 'Crisis Communication & De-escalation Scripts'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#666] mt-1">
          {isHindi
            ? 'घबराहट में गलत कदम उठाने से बचें। माता-पिता को विश्वास में लेने और ब्लैकमेलर को कानूनी चेतावनी देने के लिए तैयार शब्द-दर-शब्द संदेश।'
            : 'Pre-written, legally sound scripts to confide in parents, neutralize extortion threats, and alert university authorities with 100% confidence.'}
        </p>
      </div>

      {/* Critical Reassurance Banner */}
      <div className="bg-[#FAF9F6] border border-[#F0EBE6] rounded-3xl p-5 sm:p-6 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-[#8B6D5C] text-white flex items-center justify-center shrink-0">
          <HeartHandshake className="w-5 h-5" />
        </div>
        <div className="space-y-1.5">
          <h4 className="text-sm sm:text-base font-bold text-[#1A1A1A]">
            {isHindi ? 'याद रखें: ब्लैकमेलर की सबसे बड़ी ताकत आपकी चुप्पी है' : 'Core Rule: The Blackmailer’s Only Power is Your Silence and Fear'}
          </h4>
          <p className="text-xs sm:text-sm text-[#444] leading-relaxed">
            {isHindi
              ? 'पैसा देने से ब्लैकमेलिंग कभी नहीं रुकती; वे और अधिक मांगते हैं। जब आप अपने माता-पिता या साइबर पुलिस को बता देती हैं, तो अपराधी का सारा नियंत्रण खत्म हो जाता है।'
              : 'Paying ransom never stops extortion—it only invites higher demands. Taking control by informing parents and filing a 1930 cyber complaint instantly breaks the psychological trap.'}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2.5 overflow-x-auto scrollbar-none pb-1">
        <button
          onClick={() => setActiveTab('parents')}
          className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 select-none ${
            activeTab === 'parents'
              ? 'bg-[#2D2D2D] text-white shadow-xs'
              : 'bg-white text-[#444] border border-[#E8E2DC] hover:bg-[#FAF9F6]'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{isHindi ? 'माता-पिता व परिजन से बात करें' : 'Family & Allies'}</span>
        </button>

        <button
          onClick={() => setActiveTab('blackmailer')}
          className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 select-none ${
            activeTab === 'blackmailer'
              ? 'bg-[#2D2D2D] text-white shadow-xs'
              : 'bg-white text-[#444] border border-[#E8E2DC] hover:bg-[#FAF9F6]'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>{isHindi ? 'ब्लैकमेलर को जवाब (De-escalation)' : 'Blackmailer Response'}</span>
        </button>

        <button
          onClick={() => setActiveTab('college')}
          className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 select-none ${
            activeTab === 'college'
              ? 'bg-[#2D2D2D] text-white shadow-xs'
              : 'bg-white text-[#444] border border-[#E8E2DC] hover:bg-[#FAF9F6]'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>{isHindi ? 'कॉलेज / हॉस्टल प्रशासन' : 'College / Hostel Notice'}</span>
        </button>
      </div>

      {/* Script Cards */}
      <div className="space-y-4">
        {activeTab === 'blackmailer' && (
          <div className="p-4 bg-[#FBEAF0] border border-[#F3C5D6] rounded-2xl text-xs text-[#7A2843] space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-[#993556]">
              <AlertTriangle className="w-4 h-4 text-[#993556]" />
              <span>{isHindi ? 'सुरक्षा चेतावनी: ब्लैकमेलर के साथ बातचीत का चयन' : 'Safety Warning: Known vs. Anonymous Extortionists'}</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              {isHindi 
                ? 'कानूनी चेतावनी (Cease & Desist) अज्ञात ऑनलाइन एक्सटॉर्शनिस्ट्स के लिए सबसे उपयुक्त है। यदि ब्लैकमेलर कोई ऐसा व्यक्ति है जिसे आप व्यक्तिगत रूप से जानती हैं (पूर्व-पार्टनर, सहकर्मी, परिचित), तो कानूनी टकराव से वह घबराकर तुरंत लीक कर सकता है। ऐसी स्थिति में पहले समय हासिल करने वाला शांत संदेश (Delay Message) भेजें और चुपचाप 1930 / साइबर पुलिस में शिकायत दर्ज कराएं।'
                : 'Best for anonymous online extortionists. If the person threatening you is someone you know personally (an ex-partner, colleague, acquaintance), sending an immediate legal confrontation may escalate their behavior. Consider filing quietly first while using the neutral delay message to buy time without provocation.'}
            </p>
          </div>
        )}

        {scripts[activeTab].map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#E8E2DC] hover:border-[#8B6D5C] rounded-3xl p-5 sm:p-7 shadow-sm space-y-4 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A]">
                  {item.title[language]}
                </h3>
                <p className="text-xs sm:text-sm text-[#555] mt-1 leading-relaxed">
                  {item.context[language]}
                </p>
              </div>

              <button
                onClick={() => copyToClipboard(item.message[language], item.id)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#8B6D5C] hover:bg-[#775c4c] text-white rounded-full text-xs sm:text-sm font-bold transition-colors cursor-pointer self-start sm:self-auto shadow-xs shrink-0"
              >
                {copiedId === item.id ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>{isHindi ? 'कॉपी हो गया' : 'Copied to Clipboard'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>{isHindi ? 'संदेश कॉपी करें' : 'Copy Template'}</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-4 sm:p-6 bg-[#FAF9F6] border-2 border-[#E5DFD9] rounded-2xl">
              <pre className="text-xs sm:text-sm md:text-base text-[#1A1A1A] font-sans whitespace-pre-wrap leading-relaxed select-text">
                {item.message[language]}
              </pre>
            </div>
          </div>
        ))}
      </div>

      {/* Guidance Box for Parents */}
      {activeTab === 'parents' && (
        <div className="bg-white border border-[#F0EBE6] rounded-3xl p-6 sm:p-7 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-[#8B6D5C] font-bold text-xs sm:text-sm uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4" />
            <span>{isHindi ? 'अभिभावकों के लिए विशेष संदेश' : 'Special Note for Parents & Family Members'}</span>
          </div>
          <p className="text-xs sm:text-sm text-[#444] leading-relaxed">
            {isHindi
              ? 'यदि आपकी बेटी या बहन ने आपको यह बात बताई है, तो याद रखें कि वह किसी अपराध की शिकार (Victim) है, अपराधी नहीं। उसे डांटने या दोष देने से वह और अधिक असुरक्षित हो जाएगी। आपका समर्थन ही साइबर अपराधियों को सलाखों के पीछे पहुंचाने की सबसे बड़ी ताकत है।'
              : 'If your daughter, sister, or friend has confided in you, remember she is the victim of a coordinated digital crime. Blaming or scolding her plays directly into the blackmailer’s hands. Standing firmly by her side ensures the police can take swift, uncompromising action against the extortionist.'}
          </p>
        </div>
      )}

      {/* Safety Warning for Blackmailer Response */}
      {activeTab === 'blackmailer' && (
        <div className="bg-[#FAF9F6] border-2 border-[#E5DFD9] rounded-3xl p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-[#E25822] font-bold text-xs sm:text-sm uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>{isHindi ? 'अति महत्वपूर्ण चेतावनी' : 'Crucial Safety Rules'}</span>
          </div>
          <ul className="text-xs sm:text-sm text-[#333] space-y-2 list-disc pl-4 leading-relaxed">
            <li><strong>{isHindi ? 'कभी भी पैसे न भेजें:' : 'Never pay any ransom:'}</strong> {isHindi ? '100 रुपये भी देने से वे जान जाते हैं कि आप डर गई हैं और वे मांग बढ़ाते जाएंगे।' : 'Paying even ₹500 signals compliance and triggers endless escalations.'}</li>
            <li><strong>{isHindi ? 'चैट कभी डिलीट न करें:' : 'Never delete chats/call logs:'}</strong> {isHindi ? 'चैट ही पुलिस और कोर्ट में आपका सबसे बड़ा कानूनी सबूत है।' : 'These logs constitute primary forensic evidence under Section 65B of Indian Evidence Act.'}</li>
            <li><strong>{isHindi ? 'चेतावनी भेजकर तुरंत ब्लॉक करें:' : 'Send legal notice, then block:'}</strong> {isHindi ? 'संदेश भेजने के बाद उनसे बहस न करें, तुरंत रिपोर्ट व ब्लॉक करें।' : 'Do not enter into emotional arguments. Deliver the notice, preserve the proof, and block.'}</li>
          </ul>
        </div>
      )}
    </section>
  );
};
