/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { STATE_CYBER_CELLS as CANONICAL_CELLS, StateCyberCell as CanonicalStateCyberCell } from './stateCyberCellsData';

export interface StateCyberCell {
  stateOrUT: string;
  isUnionTerritory: boolean;
  helphoneNumber?: string | null;
  portalUrl?: string | null;
  stateOrUTHi?: string;
  isVerified?: boolean;
  verifiedDate: string | null;
}

/**
 * Unified Directory of all 28 States and 8 Union Territories of India (36 administrative divisions).
 * Derived directly from `stateCyberCellsData.ts` as the single canonical source of truth
 * to eliminate data drift and guarantee complete consistency across the application.
 */
export const STATE_CYBER_CELLS: StateCyberCell[] = CANONICAL_CELLS.map((cell: CanonicalStateCyberCell) => ({
  stateOrUT: cell.stateName.en,
  stateOrUTHi: cell.stateName.hi,
  isUnionTerritory: cell.region === 'UT',
  helphoneNumber: cell.helplinePhone || null,
  portalUrl: cell.websiteUrl || null,
  isVerified: cell.isVerified ?? false,
  verifiedDate: cell.verifiedDate ?? null,
}));
