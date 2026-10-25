# Emergency Cockpit Workflow & Evidence Logic Optimization (Revised)

Comprehensive architectural and workflow rectification for the emergency response stepper, resolving evidence sequence inversion, preventing premature workflow abandonment, and tailoring evidence/action grids across all 5 threat branches.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following user-confirmed architectural corrections govern this revised implementation:
>
> - **Confirmed Decision 1 (Card 1 Scenario Sanctity & FIR Highlighting)**: `isConfidentialFirPriority` will **NEVER overwrite or demote Card 1** (e.g. 1930 Golden Hour Bank Freeze, 24-Hour Intermediary Takedown, Synthetic Media Takedown, or StopNCII Hashing). Card 1 remains strictly bound to the immediate time-critical threat (`selectedScenario`). When `isConfidentialFirPriority` is toggled true, the **Confidential Police FIR Dossier card is highlighted in place** with a high-priority statutory badge, dedicated emphasis styling, and prioritized ranking without displacing life-critical or financial freeze remedies.
> - **Confirmed Decision 2 (Persistent POCSO Minor State)**: Replaces transient modal visibility with a dedicated session-persisted state `isPocsoMinorActive: boolean`. This state is directly toggled on the Step 1 POCSO banner / guide and passed as `isMinor={isPocsoMinorActive}` to `StateEmergencyHighlightCard`, ensuring adult users retain Cyber Crime Police Station (0651-2220060 in Jharkhand) while minor users retain Childline 1098 through Step 4.
> - **Confirmed Decision 3 (Strict Safety-Gating for Stalking Cease & Desist)**: The Cease & Desist copy script is completely removed from Step 2 (which now features only the Immediate Physical Safety Checklist). In Step 4, it is conditionally surfaced strictly for non-physical cyber harassment and gated behind an explicit red safety alert badge: *"Cyber-harassment only — DO NOT send if the stalker is physically near you or knows your current location."*

---

## 1. Overview & Core Concept

### What It Does
This release refines the linear 4-step emergency cockpit (`EmergencyCockpit.tsx`) to guarantee legal admissibility of digital evidence under Section 63 of Bharatiya Sakshya Adhiniyam (BSA) and Section 67A of the Information Technology Act. It eliminates workflow traps where panicked victims prematurely blocked blackmailers, sent dangerous confrontation messages to physical stalkers, or exited the wizard before capturing indispensable court evidence.

### Target Audience & Persona
Women and girls facing immediate non-consensual intimate imagery (NCII) extortion, financial sextortion timers, deepfakes, or digital stalking. The interface operates in high-stress, trembling-hand crisis states where every instruction must prevent irreversible evidence loss or physical harm.

### Key Value
- **Zero Evidence Loss**: Users are guided to buy time ("Stall Line") in Step 2, capture uncropped exhibits in Step 3, and only then deploy legal notices and blocks in Step 4.
- **Protected Time-Critical Remedies**: 1930 bank liens (2-hour golden hour) and 24-hour intermediary takedowns retain permanent Card 1 priority even when FIR drafting is prioritized.
- **Physical Safety Guarantee**: Physical stalking replaces confrontation texts with emergency de-escalation, location sharing, and direct 112 police dispatch.

---

## 2. User Experience & Visual Design

### Key User Flows

```
[ Step 1: Immediate Stabilization ]
   │  Grounding, reality check, zero-shame guarantee
   │  Persistent Minor / POCSO Toggle (isPocsoMinorActive) stored in sessionStorage
   ▼
[ Step 2: Assess Threat & Buy Time ]
   │  5 Distinct Threat Behaviors (Countdown, Already Paid, Leaked, Deepfake, Stalking)
   │  + Independent Persistent Toggle: "Need 100% Confidential FIR (Sec 73 BNS)"
   │  Stall Line ("Buy Breathing Room") ONLY — Aggressive notices strictly deferred
   │  Physical Danger: Shows Immediate Physical Safety Checklist (pop-haven, location, 112)
   │  NO Open FIR Generator exit button
   ▼
[ Step 3: Secure Critical Evidence (BSA Sec 63) ]
   │  Countdown / Extortion: 3 Uncropped exhibits (Handle, Timed threat, UPI/QR)
   │  Already Paid (Path 2): Dynamically updates Exhibit 3 to:
   │    "Screenshot 3: Payment Receipt showing 12-Digit UTR / UPI Transaction ID & Bank Debit Timestamp"
   │  Media Leaked: Platform post URL, disseminated post with clock, extortion history
   │  Deepfake: Synthesizer bot/channel handle, fabricated post, extortion linkage
   ▼
[ Step 4: Take Direct Action & Legal Remedies ]
   │  Card 1 (Strictly bound to selectedScenario — NEVER overwritten by FIR toggle):
   │    • Countdown ──> StopNCII Pre-emptive Hashing Hub
   │    • Already Paid ──> 1930 Golden Hour Bank Freeze & Cyber Cell
   │    • Media Leaked ──> 24-Hour Intermediary Takedown (IT Rule 3(2)(b)) [Promoted #1]
   │    • AI Deepfake ──> 24-Hour Synthetic Media Takedown & Bot Channel Report [Promoted #1]
   │    • Physical Danger ──> Immediate Police 112 / Women Helpline 1090
   │  Confidential Police FIR Dossier Card:
   │    • If isConfidentialFirPriority === true: Prominently highlighted in place with
   │      pulsing gold/emerald ring, "PRIORITIZED BY YOU" badge, and instant FIR generation trigger
   │  Integrated 1-Click Copy Notices:
   │    • Statutory Legal Warning Notice ("Send Once, Then Block")
   │    • 24-Hour Intermediary IT Rule 3(2)(b) Notice
   │    • MeitY Deepfake Advisory Notice
   │    • Stalking Warning: Strictly safety-gated with explicit alert badge
   │  State Directory (StateEmergencyHighlightCard):
   │    • Adult filers retain Cyber Crime Police Station (0651-2220060 in Jharkhand)
   │    • Childline 1098 shown only if isPocsoMinorActive is true
```

### Visual Identity & Theme
- **Color Discipline**: Deep midnight navy canvas (`#171338`, `#1E1949`), rose-wine emergency accents (`#993556`, `#F3C5D6`), emerald preservation indicators (`#0F6E56`, `#10B981`), and amber urgency tags (`#F59E0B`).
- **Typography & Hierarchy**: Plus Jakarta Sans display headers with clean tabular alignment for legal citations (`BNS § 308`, `BSA § 63`, `IT Rules § 3(2)(b)`).
- **Zero-Pill Restraint**: Metadata badges and statutory indicators are rendered as crisp unboxed typography or clean segmented action bars.
- **Touch Targets**: All action buttons and copy triggers exceed $44 \times 44\text{px}$ with physical haptic feedback.

---

## 3. Key Product Decisions & Trade-Offs

### Decision 1: Relocating Legal Warning Scripts from Step 2 to Step 4 (WF-01)
- **Chosen Approach**: Step 2 provides *only* the Stall Line ("Buy Breathing Room") to defuse extortion deadlines. All aggressive legal warning notices ("Send Once, Then Block", Cease & Desist, 24h Takedown) are deferred to Step 4, integrated inside their respective action cards.
- **Why**: When victims send aggressive notices or block the perpetrator in Step 2, the perpetrator deletes chat histories or burns burner accounts before Step 3 screenshots can be taken. Moving notices to Step 4 ensures evidence is captured *before* the attacker is alerted.

### Decision 2: Decoupling Confidential FIR from Threat Behavior Without Collision (WF-02, WF-03 & Toggle Fix)
- **Chosen Approach**: Remove Option 6 ("Filing Confidential Police FIR") from the single-choice threat behavioral list. Introduce an independent toggle ("Need 100% Confidential FIR (Sec 73 BNS)") that can be enabled alongside any of the 5 threat types. In Step 4, when enabled, the Confidential FIR Dossier card is highlighted in place with enhanced visual prominence and action priority, **without replacing Card 1**.
- **Why**: Filing an FIR is a *remedy*, not a *threat condition*. Replacing Card 1 would overwrite 1930 bank freeze (2-hour limit) or 24h takedown, which are far more time-critical than drafting an FIR.

### Decision 3: Synthetic Media Distinction for AI Deepfakes (Path 4)
- **Chosen Approach**: When `selectedScenario === 'deepfake'`, replace StopNCII as the primary remedy with "24-Hour Synthetic Media Takedown" under IT Rules 3(2)(b) and MeitY Deepfake Advisory 2023, accompanied by "Report Originating AI Bot / Telegram Channel".
- **Why**: StopNCII hashes authentic intimate photographs. In deepfakes, the victim has no original intimate photo (their clothed social media photo was morphed). Hashing a clothed photo will not match the synthetic image.

### Decision 4: Non-Confrontational Protocol for Physical Stalking (Path 5 & Safety Gate)
- **Chosen Approach**: In Step 2 for `danger_stalking`, eliminate the copy-paste confrontational cease-and-desist text. Surface an "Immediate Physical Safety Checklist". In Step 4, gate any Cease & Desist copy script behind an explicit red safety warning banner stating: *"Cyber-harassment only — DO NOT send if the stalker is physically near you or knows your current location."*
- **Why**: Texting legal threats to a physically proximate stalker can trigger immediate violent retaliation before law enforcement arrives.

### Decision 5: Restoring Cyber Crime Police Station in State Directory (Path 6 & Persistent Minor State)
- **Chosen Approach**: In `EmergencyCockpit.tsx`, maintain `isPocsoMinorActive` in persistent session state, toggled via the Step 1 Minor/POCSO guide banner. Pass `isMinor={isPocsoMinorActive}` to `StateEmergencyHighlightCard.tsx`. Decouple line 141 from `selectedScenario === 'police'`, ensuring adult users filing an FIR always see their state's Cyber Crime Police Station (e.g., CID Cyber Police 0651-2220060 in Jharkhand).
- **Why**: Victims filing an FIR need the direct phone number to the state cyber crime police station. Swapping it out for Childline 1098 deprived adult filers of the exact contact they needed, and using modal visibility caused state loss upon modal close.

---

## 4. Technical Architecture & Data Strategy

### System & State Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          EmergencyCockpit Component                         │
│                                                                             │
│  State:                                                                     │
│  • currentStep: 1 | 2 | 3 | 4                                               │
│  • selectedScenario: 'countdown' | 'paid' | 'leaked' | 'deepfake' | ...     │
│  • isConfidentialFirPriority: boolean (sessionStorage)                      │
│  • isPocsoMinorActive: boolean (sessionStorage)                             │
│  • evidenceChecks: Record<string, boolean>                                  │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         ▼                             ▼                             ▼
┌──────────────────┐         ┌──────────────────┐          ┌──────────────────┐
│      Step 2      │         │      Step 3      │          │      Step 4      │
│ Threat & Stall   │         │ Court Evidence   │          │  Direct Action   │
├──────────────────┤         ├──────────────────┤          ├──────────────────┤
│ • 5 Behaviors    │         │ • BSA § 63 proof │          │ • Card 1 LOCKED  │
│ • FIR Toggle     │         │ • Path 2 Dynamic:│          │   to Threat:     │
│ • Stall Line only│         │   12-digit UTR & │          │   - 1930 (paid)  │
│ • Physical Safe  │         │   Debit Receipt  │          │   - Takedown (3) │
│   Checklist      │         │ • Strict 3-item  │          │   - Deepfake (4) │
│ • NO Legal Notice│         │   uncropped logs │          │   - StopNCII (1) │
│ • NO FIR Exit Btn│         │                  │          │ • FIR Highlighted│
│                  │         │                  │          │   in-place if on │
│                  │         │                  │          │ • Safety-Gated   │
│                  │         │                  │          │   Stalking Notice│
└──────────────────┘         └──────────────────┘          └─────────┬────────┘
                                                                     │
                                                                     ▼
                                                   ┌──────────────────────────┐
                                                   │StateEmergencyHighlightCard│
                                                   ├──────────────────────────┤
                                                   │ Contact 1: Women 1090    │
                                                   │ Contact 2: Police 112    │
                                                   │ Contact 3: Cyber Police  │
                                                   │ (Childline ONLY if       │
                                                   │  isPocsoMinorActive=true)│
                                                   └──────────────────────────┘
```

### Component & File Modification Plan

1. **`src/components/EmergencyCockpit.tsx`**:
   - Update `CrisisScenarioKey` to 5 threat behaviors (`'countdown' | 'paid' | 'leaked' | 'deepfake' | 'danger_stalking'`).
   - Add state `isConfidentialFirPriority: boolean` with `sessionStorage` synchronization (`suraksha_confidential_fir_priority_v1`).
   - Add state `isPocsoMinorActive: boolean` with `sessionStorage` synchronization (`suraksha_pocso_minor_active_v1`), toggled from Step 1 POCSO banner / modal.
   - Refactor `scenariosList` to remove Option 6, rendering the 5 threat types with an independent "Need 100% Confidential FIR (Sec 73 BNS)" priority toggle card.
   - In Step 2:
     - Retain only the Stall Line ("Buy Breathing Room") for countdown extortion.
     - Remove Phase 2 Statutory Legal Warning notice and copy button.
     - Remove Open FIR Generator button from Step 2.
     - For `danger_stalking`, render the Immediate Physical Safety Checklist instead of the confrontational script.
   - In Step 3:
     - For `paid`, dynamically set Item 3 to: "Screenshot 3: Payment Receipt showing 12-Digit UTR / UPI Transaction ID & Bank Debit Timestamp."
   - In Step 4:
     - Keep Card 1 strictly bound to `selectedScenario`:
       - `paid`: 1930 Golden Hour Bank Freeze
       - `leaked`: 24-Hour Intermediary Takedown Notice & Platform Portals
       - `deepfake`: 24-Hour Synthetic Media Takedown & Bot Channel Report
       - `danger_stalking`: Immediate Police 112 / Women Helpline 1090
       - `countdown`: StopNCII Pre-emptive Hashing Hub
     - When `isConfidentialFirPriority` is true: Highlight the Confidential Police FIR Dossier card in place with enhanced visual prominence, a "PRIORITIZED BY YOU" badge, and priority action trigger—never displacing Card 1.
     - In Step 4, gate the Stalking Cease & Desist Warning behind an explicit warning badge: *"Cyber-harassment only — DO NOT send if the stalker is physically near you or knows your current location."*
     - Pass `isMinor={isPocsoMinorActive}` to `StateEmergencyHighlightCard`.

2. **`src/components/StateEmergencyHighlightCard.tsx`**:
   - Add `isMinor?: boolean` prop.
   - Fix line 141: Replace `const isMinor = selectedScenario === 'police' || selectedScenario === 'known_person_threats';` with `const isMinor = propIsMinor ?? false;`.
   - Ensure Cyber Crime Police Station (0651-2220060 in Jharkhand) remains visible for all adult scenarios including FIR filing.

3. **Verification**:
   - Run `compile_applet` and `lint_applet` to confirm zero TypeScript compilation errors.
   - Run full production build (`npm run build`) to verify packaging and asset bundle integrity.
