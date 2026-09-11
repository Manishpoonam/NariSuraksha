export type Language = 'en' | 'hi';

export type IncidentCategory = 
  | 'extortion_blackmail'
  | 'viral_leaked'
  | 'ai_deepfake_morph'
  | 'videocall_sextortion'
  | 'device_hacked_icloud';

export interface DecisionNode {
  id: string;
  title: { en: string; hi: string };
  subtitle: { en: string; hi: string };
  category: IncidentCategory;
  urgencyLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  immediateWarnings: { en: string[]; hi: string[] };
  actionSteps: {
    stepNumber: number;
    title: { en: string; hi: string };
    description: { en: string; hi: string };
    buttonLabel?: { en: string; hi: string };
    actionType?: 'takedown' | 'draft' | 'call' | 'evidence' | 'portal';
    linkUrl?: string;
  }[];
}

export interface PlatformTakedown {
  id: string;
  name: string;
  category: 'social' | 'messaging' | 'search_browser' | 'hash_global' | 'adult';
  logoIcon: string;
  badgeText: string;
  turnaroundTime: string;
  directUrl: string;
  grievanceEmail?: string;
  instructions: { en: string[]; hi: string[] };
  statutoryRule?: string;
}

export interface HelplineItem {
  id: string;
  name: { en: string; hi: string };
  category: 'police' | 'women_crisis' | 'mental_health' | 'legal_aid';
  number: string;
  availableHours: string;
  description: { en: string; hi: string };
  badge: { en: string; hi: string };
  directDial: string;
  website?: string;
  isConfidential: boolean;
}

export interface LegalSection {
  code: string;
  section: string;
  bnsEquivalent?: string;
  title: { en: string; hi: string };
  punishment: { en: string; hi: string };
  bailable: boolean;
  plainMeaning: { en: string; hi: string };
}

export interface ComplaintFormData {
  incidentType: IncidentCategory;
  victimAlias: string;
  contactEmailOrPhone: string;
  accusedKnown: 'known' | 'unknown' | 'suspected';
  accusedDetails: string;
  platformsInvolved: string[];
  linksOrUsernames: string;
  extortionAmountDemanded: string;
  threatDetails: string;
  evidenceList: string[];
  cityState: string;
  language: Language;
}

export type CloudSyncStatus = 'synced' | 'saving' | 'offline' | 'error';

export interface CloudSyncState {
  status: CloudSyncStatus;
  progress: number; // 0 to 100
  lastSavedAt: number | null; // epoch timestamp
  isOnline: boolean;
  itemsSavedCount: number;
  lastSavedTitle?: string;
}
