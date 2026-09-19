import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { hapticSOSDispatch, hapticSuccess, hapticAction } from '../utils/haptics';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { 
  AlertTriangle, 
  MapPin, 
  Send, 
  MessageSquare, 
  Phone, 
  Copy, 
  Check, 
  X, 
  Shield, 
  HeartHandshake, 
  RefreshCw,
  Share2,
  Lock
} from 'lucide-react';

interface EmergencySOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const EmergencySOSModal: React.FC<EmergencySOSModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const isHindi = language === 'hi';
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(isOpen, modalRef, '#close-sos-modal-btn');

  const [recipientNumber, setRecipientNumber] = useState('');
  const [recipientRole, setRecipientRole] = useState<'parents' | 'friend' | 'mentor'>('parents');
  const [locationStatus, setLocationStatus] = useState<'idle' | 'fetching' | 'success' | 'error'>('idle');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [copied, setCopied] = useState(false);
  const [customNote, setCustomNote] = useState('');

  // Fetch geolocation on modal open or request
  const fetchLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('error');
      return;
    }
    setLocationStatus('fetching');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLocationStatus('success');
      },
      () => {
        setLocationStatus('error');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    if (isOpen) {
      fetchLocation();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const mapsLink = coords
    ? `https://maps.google.com/?q=${coords.lat.toFixed(6)},${coords.lng.toFixed(6)}`
    : '';

  // Generate Message Text
  const getSOSMessage = () => {
    const locText = mapsLink ? `\n📍 Current Location: ${mapsLink}` : '';

    if (recipientRole === 'parents') {
      return isHindi
        ? `[आपातकालीन संदेश / URGENT SOS]
माँ / पापा, मुझे आपकी तुरंत मदद की ज़रूरत है। कोई मुझे ऑनलाइन धमकी व ब्लैकमेल कर रहा है। मैं अभी सुरक्षित हूँ लेकिन मुझे आपके साथ मिलकर साइबर पुलिस (1930) में शिकायत करनी है। कृपया घबराएं नहीं, मुझे तुरंत कॉल करें।${locText}`
        : `[EMERGENCY SOS / URGENT]
Mom/Dad, I need your help urgently. Someone is blackmailing me online. I am safe right now, but I need your support to handle this and file a cyber police complaint together. Please call me as soon as you see this.${locText}`;
    }

    if (recipientRole === 'friend') {
      return isHindi
        ? `[URGENT SOS / गुप्त सहायता]
मुझे तुरंत तुम्हारी मदद की ज़रूरत है। मैं एक गंभीर साइबर संकट / ब्लैकमेलिंग में फँसी हूँ। कृपया तुरंत मुझे कॉल करो या मेरे पास आओ। यह बहुत ज़रूरी है।${locText}`
        : `[URGENT SOS / Confidential]
I need your support immediately. I am facing a serious cyber harassment/extortion situation. Please call me or come over as soon as possible. Please keep this confidential.${locText}`;
    }

    return isHindi
      ? `[आपातकालीन कानूनी सहायता / SOS]
मुझे साइबर उत्पीड़न एवं ब्लैकमेलिंग के संबंध में तत्काल परामर्श की आवश्यकता है। कृपया मार्गदर्शन करें।${locText}`
      : `[EMERGENCY SOS / Cyber Help]
I am currently facing online blackmail/harassment and require immediate confidential guidance.${locText}`;
  };

  const fullMessage = customNote ? `${getSOSMessage()}\n\nNote: ${customNote}` : getSOSMessage();

  const handleCopy = () => {
    navigator.clipboard.writeText(fullMessage);
    hapticSuccess();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppSend = () => {
    hapticSOSDispatch();
    const cleanPhone = recipientNumber.replace(/[^0-9]/g, '');
    const encodedText = encodeURIComponent(fullMessage);
    const waUrl = cleanPhone
      ? `https://wa.me/${cleanPhone}?text=${encodedText}`
      : `https://wa.me/?text=${encodedText}`;
    window.open(waUrl, '_blank');
  };

  const handleSmsSend = () => {
    hapticSOSDispatch();
    const cleanPhone = recipientNumber.replace(/[^0-9]/g, '');
    const encodedText = encodeURIComponent(fullMessage);
    const smsUrl = cleanPhone
      ? `sms:${cleanPhone}?body=${encodedText}`
      : `sms:?body=${encodedText}`;
    window.location.href = smsUrl;
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sos-modal-title"
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-3xl border border-[#E8E2DC] shadow-2xl max-w-lg w-full p-6 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-[#F0EBE6] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FDE8E8] text-[#E25822] flex items-center justify-center font-bold shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 id="sos-modal-title" className="text-lg font-bold text-[#1A1A1A]">
                {isHindi ? 'विश्वसनीय संपर्क को गोपनीय SOS अलर्ट भेजें' : 'Discreet SOS Alert to Trusted Contact'}
              </h2>
              <p className="text-xs text-[#666]">
                {isHindi ? 'लाइव लोकेशन और प्री-रिटन संकट संदेश' : 'Silent distress message with live GPS location'}
              </p>
            </div>
          </div>

          <button
            id="close-sos-modal-btn"
            type="button"
            onClick={onClose}
            aria-label={isHindi ? 'संवाद बंद करें' : 'Close SOS modal'}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#777] hover:text-[#111] rounded-full hover:bg-[#FAF9F6] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#26215C] focus-visible:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Selector Tabs */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-[#1A1A1A]">
            {isHindi ? 'संदेश का प्रकार (किसके लिए संदेश भेजना है):' : 'Select Distress Context:'}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'parents', label: isHindi ? 'माता-पिता / परिवार' : 'Parents / Family' },
              { id: 'friend', label: isHindi ? 'खास दोस्त' : 'Best Friend' },
              { id: 'mentor', label: isHindi ? 'काउंसलर / वकील' : 'Mentor / Legal' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  hapticAction();
                  setRecipientRole(t.id as any);
                }}
                className={`min-h-[44px] py-2 px-2 rounded-2xl text-xs font-bold transition-all cursor-pointer text-center select-none focus-visible:ring-2 focus-visible:ring-[#26215C] focus-visible:outline-none ${
                  recipientRole === t.id
                    ? 'bg-[#2D2D2D] text-white shadow-xs'
                    : 'bg-[#FAF9F6] text-[#555] border border-[#E8E2DC] hover:bg-[#F3EFEC]'
                }`}
                aria-pressed={recipientRole === t.id}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Optional Phone Input */}
        <div>
          <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
            {isHindi ? 'फ़ोन नंबर (वैकल्पिक - सीधे WhatsApp/SMS भेजने के लिए):' : 'Recipient Phone (Optional - e.g. 9876543210):'}
          </label>
          <input
            type="tel"
            value={recipientNumber}
            onChange={(e) => setRecipientNumber(e.target.value)}
            placeholder="+91 XXXXX XXXXX"
            className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-2xl border border-[#DED9D4] bg-[#FAF9F6] focus:bg-white text-[#1A1A1A] focus:outline-none focus:border-[#8B6D5C]"
          />
        </div>

        {/* GPS Location Status Pill */}
        <div className="p-3 bg-[#FAF9F6] rounded-2xl border border-[#E8E2DC] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#8B6D5C] shrink-0" />
            {locationStatus === 'fetching' && (
              <span className="text-[#666] flex items-center gap-1">
                <RefreshCw className="w-3 h-3 animate-spin" />
                {isHindi ? 'GPS लोकेशन प्राप्त हो रही है...' : 'Acquiring GPS coordinates...'}
              </span>
            )}
            {locationStatus === 'success' && (
              <span className="text-emerald-700 font-medium">
                {isHindi ? 'सटीक GPS लोकेशन शामिल है' : 'GPS Location Attached (Google Maps)'}
              </span>
            )}
            {locationStatus === 'error' && (
              <span className="text-amber-700 font-medium">
                {isHindi ? 'लोकेशन उपलब्ध नहीं (बिना लोकेशन संदेश जाएगा)' : 'Location disabled (Message will send without GPS)'}
              </span>
            )}
            {locationStatus === 'idle' && (
              <span className="text-[#666]">{isHindi ? 'लोकेशन तैयार' : 'Location ready'}</span>
            )}
          </div>

          <button
            onClick={() => {
              hapticAction();
              fetchLocation();
            }}
            className="text-[11px] font-bold text-[#8B6D5C] hover:underline cursor-pointer"
          >
            {isHindi ? 'रीफ्रेश' : 'Refresh GPS'}
          </button>
        </div>

        {/* Message Preview Box */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#1A1A1A]">
            {isHindi ? 'भेजे जाने वाले संदेश का प्रीव्यू:' : 'Prepared SOS Text Preview:'}
          </label>
          <pre className="w-full p-4 bg-[#2D2D2D] text-white rounded-2xl text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto border border-[#222]">
            {fullMessage}
          </pre>
        </div>

        {/* Action Dispatch Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-[#F0EBE6]">
          <button
            onClick={handleWhatsAppSend}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer select-none"
          >
            <Send className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleSmsSend}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#2D2D2D] hover:bg-[#111] text-white rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer select-none"
          >
            <MessageSquare className="w-4 h-4" />
            <span>SMS Message</span>
          </button>

          <button
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#FAF9F6] hover:bg-[#F3EFEC] text-[#1A1A1A] border border-[#DED9D4] rounded-full text-xs font-bold transition-all cursor-pointer select-none"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#8B6D5C]" />}
            <span>{copied ? (isHindi ? 'कॉपी हुआ!' : 'Copied!') : (isHindi ? 'कॉपी करें' : 'Copy Text')}</span>
          </button>
        </div>

        <p className="text-[11px] text-[#777] text-center">
          {isHindi
            ? 'यह संदेश पूरी तरह आपके डिवाइस पर तैयार होता है। कोई भी डेटा किसी सर्वर पर स्टोर नहीं होता।'
            : 'Zero-Storage: This alert is constructed on-device and dispatched directly via your messaging app.'}
        </p>
      </div>
    </div>
  );
};
