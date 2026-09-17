/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { sessionDraft } from './storage';

/**
 * PWA MANIFEST DISGUISE ENGINE & OS INSTALLATION ARCHITECTURE
 * 
 * PROBLEM & OS CONSTRAINT:
 * Browser tab disguise (`document.title` and favicon) only protects the user when
 * the web page is already active and rendered. If a user installs the Progressive
 * Web App (PWA) to their Android / iOS home screen or app drawer, the operating
 * system evaluates the web app manifest (`manifest.json`) at INSTALL TIME.
 * 
 * If the manifest advertises "NariSuraksha - NCII Emergency Response Portal" with a
 * shield icon, the app drawer icon will immediately expose the victim to anyone
 * who picks up or glances at the physical phone, rendering all subsequent stealth
 * efforts useless.
 * 
 * HOW THE SOLUTION WORKS:
 * 1. Dual Manifest Configuration:
 *    - Standard: `/manifest.json` ("NariSuraksha")
 *    - Disguised: `/manifest-disguised.json` ("Polity Notes - UPSC & NCERT Revision Module")
 * 
 * 2. Dynamic `<link rel="manifest">` Swapping:
 *    When the user toggles "Install as a disguised app", the runtime replaces the
 *    manifest link tag in `document.head` with the disguised version.
 *    If the user then triggers "Add to Home Screen" or clicks the browser install prompt,
 *    the browser/OS parses the disguised manifest and installs the app as "Polity Notes"
 *    with a neutral notebook icon.
 * 
 * CRITICAL OS LIMITATION TO NOTE:
 * Modern operating systems (Android WebAPK generator, iOS WebClip service) freeze
 * the app title and launcher icon at the moment of installation.
 * Dynamically updating `<link rel="manifest">` will affect FUTURE installations,
 * but CANNOT retroactively rename an already-installed app shortcut on the home screen.
 * Users who installed the real branding must remove it and reinstall with the disguise
 * mode active. This limitation is explicitly surfaced in the user interface.
 */

const MANIFEST_LINK_ID = 'app-pwa-manifest';
const DISGUISE_SESSION_KEY = 'pwa_disguise_active';

export function isDisguisedManifestActive(): boolean {
  return sessionDraft.get<boolean>(DISGUISE_SESSION_KEY, false);
}

export function setDisguisedManifest(disguise: boolean): void {
  if (typeof document === 'undefined') return;

  sessionDraft.set(DISGUISE_SESSION_KEY, disguise);

  let linkEl = document.getElementById(MANIFEST_LINK_ID) as HTMLLinkElement | null;
  if (!linkEl) {
    linkEl = document.querySelector('link[rel="manifest"]') as HTMLLinkElement | null;
    if (linkEl) linkEl.id = MANIFEST_LINK_ID;
  }

  const manifestUrl = disguise ? '/manifest-disguised.json' : '/manifest.json';

  if (linkEl) {
    linkEl.setAttribute('href', manifestUrl);
  } else {
    const newLink = document.createElement('link');
    newLink.id = MANIFEST_LINK_ID;
    newLink.rel = 'manifest';
    newLink.href = manifestUrl;
    document.head.appendChild(newLink);
  }

  // Also adjust page title / favicon synchronously
  if (disguise) {
    document.title = 'Study Notes - Personal Revision Notebook';
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
    if (favicon) {
      favicon.href = '/icon-polity.svg';
    }
  } else {
    document.title = 'NariSuraksha - Crisis Sanctuary & Legal Shield';
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
    if (favicon) {
      favicon.href = '/icon.svg';
    }
  }
}
