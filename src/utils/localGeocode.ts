import { INDIA_STATE_BOUNDARIES, StateBoundaryFeature } from '../data/indiaBoundariesData';

/**
 * 100% Client-Side Reverse Geocoding for Indian States & Union Territories.
 * 
 * HARD CONSTRAINTS:
 * - Zero network calls. No third-party geocoding API is ever invoked.
 * - Coordinates never leave the user's browser / device.
 * - Zero persistent storage (never writes to localStorage, sessionStorage, or cookies).
 * - Uses local ray-casting point-in-polygon over bundled simplified boundaries (~60KB).
 */

/**
 * Standard ray-casting algorithm to test if a 2D point [lng, lat]
 * is strictly inside a polygon ring [[lng, lat], ...].
 */
function pointInPolygonRing(point: [number, number], ring: [number, number][]): boolean {
  const x = point[0];
  const y = point[1];
  let inside = false;

  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0];
    const yi = ring[i][1];
    const xj = ring[j][0];
    const yj = ring[j][1];

    const intersect = ((yi > y) !== (yj > y)) && (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi);
    if (intersect) {
      inside = !inside;
    }
  }

  return inside;
}

/**
 * Fast bounding-box check to reject non-candidate states before expensive polygon math.
 */
function pointInBBox(point: [number, number], bbox: [number, number, number, number], margin = 0.001): boolean {
  const lng = point[0];
  const lat = point[1];
  return (
    lng >= bbox[0] - margin &&
    lat >= bbox[1] - margin &&
    lng <= bbox[2] + margin &&
    lat <= bbox[3] + margin
  );
}

/**
 * Checks whether [lng, lat] falls inside a State boundary feature (Polygon or MultiPolygon).
 */
function pointInFeature(point: [number, number], feature: StateBoundaryFeature): boolean {
  if (!pointInBBox(point, feature.bbox)) {
    return false;
  }

  if (feature.type === 'Polygon') {
    for (const ring of feature.coordinates) {
      if (pointInPolygonRing(point, ring)) {
        return true;
      }
    }
  } else if (feature.type === 'MultiPolygon') {
    for (const poly of feature.coordinates) {
      for (const ring of poly) {
        if (pointInPolygonRing(point, ring)) {
          return true;
        }
      }
    }
  }

  return false;
}

/**
 * Detects the Indian State or Union Territory from GPS coordinates using local GeoJSON.
 * Returns the exact state/UT name as defined in `STATE_CYBER_CELLS`, or null if not found.
 */
export function detectIndianStateFromCoords(latitude: number, longitude: number): string | null {
  const point: [number, number] = [longitude, latitude];

  // 1. Strict point-in-polygon lookup
  for (const feature of INDIA_STATE_BOUNDARIES) {
    if (pointInFeature(point, feature)) {
      return feature.name;
    }
  }

  // 2. Coastal / boundary tolerance fallback (if coordinate is slightly offshore, within ~0.25 deg / ~25km)
  let bestCandidate: string | null = null;
  let minDistanceSq = 0.25 * 0.25; // ~25-30 km radius threshold

  for (const feature of INDIA_STATE_BOUNDARIES) {
    if (pointInBBox(point, feature.bbox, 0.3)) {
      const centerLng = (feature.bbox[0] + feature.bbox[2]) / 2;
      const centerLat = (feature.bbox[1] + feature.bbox[3]) / 2;
      const dSq = Math.pow(longitude - centerLng, 2) + Math.pow(latitude - centerLat, 2);
      if (dSq < minDistanceSq) {
        minDistanceSq = dSq;
        bestCandidate = feature.name;
      }
    }
  }

  return bestCandidate;
}

export interface StateDetectionResult {
  state: string | null;
  error?: 'permission_denied' | 'position_unavailable' | 'timeout' | 'not_supported' | 'outside_india' | 'unknown';
}

/**
 * Triggers browser geolocation on explicit user interaction.
 * Cross-browser compatibility note (especially Safari / iOS WebKit):
 * 1. Safari on iOS / macOS often hangs or times out when `enableHighAccuracy: false` is supplied
 *    without cached cell towers, or if timeout is too short for user permission dialog.
 * 2. In Safari, users may take 5-10s to see and approve the system dialog ("Allow Once" / "Allow While Using App").
 *    A short timeout causes early PositionError (timeout) while the system prompt is still open.
 * 3. We attempt rapid resolution with fallback to watchPosition clearing or high-accuracy retry if low accuracy fails.
 * - Never calls external APIs.
 * - Resolves to state name string and error status.
 */
export async function detectCurrentStateOnDevice(): Promise<StateDetectionResult> {
  if (typeof window === 'undefined' || !navigator.geolocation) {
    return { state: null, error: 'not_supported' };
  }

  // Safari / iOS helper: wraps geolocation with a safety race and fallback
  return new Promise<StateDetectionResult>((resolve) => {
    let hasResolved = false;
    let watchId: number | null = null;
    let safetyTimer: ReturnType<typeof setTimeout> | null = null;

    const cleanup = () => {
      if (watchId !== null) {
        try {
          navigator.geolocation.clearWatch(watchId);
        } catch {
          // ignore
        }
        watchId = null;
      }
      if (safetyTimer) {
        clearTimeout(safetyTimer);
        safetyTimer = null;
      }
    };

    const handleSuccess = (position: GeolocationPosition) => {
      if (hasResolved) return;
      hasResolved = true;
      cleanup();

      try {
        const { latitude, longitude } = position.coords;
        const detected = detectIndianStateFromCoords(latitude, longitude);
        if (detected) {
          resolve({ state: detected });
        } else {
          resolve({ state: null, error: 'outside_india' });
        }
      } catch {
        resolve({ state: null, error: 'unknown' });
      }
    };

    const handleError = (error?: GeolocationPositionError) => {
      // If user denied permission explicitly, resolve immediately without retrying
      if (error && error.code === error.PERMISSION_DENIED) {
        if (!hasResolved) {
          hasResolved = true;
          cleanup();
          resolve({ state: null, error: 'permission_denied' });
        }
        return;
      }

      // If getCurrentPosition failed or timed out on Safari, try watchPosition once
      if (hasResolved) return;
      
      try {
        // Fallback single-tick watchPosition which iOS WebKit handles more reliably on cellular/WiFi
        watchId = navigator.geolocation.watchPosition(
          (pos) => {
            handleSuccess(pos);
          },
          (err) => {
            if (!hasResolved) {
              hasResolved = true;
              cleanup();
              let errorType: StateDetectionResult['error'] = 'position_unavailable';
              if (err && err.code === err.PERMISSION_DENIED) {
                errorType = 'permission_denied';
              } else if (err && err.code === err.TIMEOUT) {
                errorType = 'timeout';
              }
              resolve({ state: null, error: errorType });
            }
          },
          {
            enableHighAccuracy: true,
            maximumAge: 300000,
            timeout: 12000,
          }
        );
      } catch {
        if (!hasResolved) {
          hasResolved = true;
          cleanup();
          resolve({ state: null, error: 'position_unavailable' });
        }
      }
    };

    // Primary attempt: standard getCurrentPosition
    // Safari needs adequate timeout (14s) to allow the user to read and tap iOS system permission prompt
    try {
      navigator.geolocation.getCurrentPosition(
        handleSuccess,
        handleError,
        {
          enableHighAccuracy: true, // Safari iOS resolves much more reliably with highAccuracy: true
          timeout: 14000,
          maximumAge: 300000, // Accepts cached location from last 5 mins to avoid cold GPS delay
        }
      );
    } catch {
      handleError();
    }

    // Safety timeout in case browser never fires success or error callback (WebKit edge case)
    safetyTimer = setTimeout(() => {
      if (!hasResolved) {
        hasResolved = true;
        cleanup();
        resolve({ state: null, error: 'timeout' });
      }
    }, 16000);
  });
}
