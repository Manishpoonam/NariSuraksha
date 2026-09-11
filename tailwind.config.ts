import type { Config } from 'tailwindcss';

/**
 * Trauma-Informed Design Tokens for NariSuraksha
 * 
 * DESIGN PRINCIPLES:
 * 1. Deep Indigo-Plum (#26215C): Serves as our protective anchor. Unlike cold bureaucratic blue (#003087)
 *    which mimics intimidating police/court portals, deep plum conveys quiet dignity, sanctuary, and trust.
 * 2. Warm Cream (#FAF8F3): Dominant neutral background. Replaces clinical stark white (#FFFFFF) to reduce
 *    glare and sensory strain for users experiencing adrenaline shock, panic, or crying.
 * 3. Soft Teal (#0F6E56 / #E1F5EE): Used strictly for grounding, emotional care, somatic breath, and reassurance.
 * 4. Soft Rose / Warm Coral (#993556 / #FBEAF0): Gentle human warmth for guidance and secondary CTAs.
 * 5. Emergency-Only Red (#DC2626): Restricted strictly to SOS, 1930 speed-dial, and Quick Exit.
 *    By avoiding red on banners or error states, red retains its life-critical urgency.
 * 6. Slow Breath Easing (350-500ms): Motion avoids snappy/mechanical jerks that startle an anxious user.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Anchor Primary: Deep Indigo-Plum
        plum: {
          50: '#F4F3F9',
          100: '#E8E6F3',
          200: '#D2CCE7',
          300: '#B4ABDA',
          400: '#7C6FBE',
          500: '#4A3FA0',
          DEFAULT: '#26215C', // Anchor primary
          600: '#26215C',
          700: '#1E1949',
          800: '#171338',
          900: '#100D28',
          950: '#0A081A',
        },
        // Background Secondary: Warm Cream
        cream: {
          50: '#FDFCF9',
          DEFAULT: '#FAF8F3', // Warm canvas
          100: '#FAF8F3',
          200: '#F3EFE6',
          300: '#EAE4D6',
          400: '#DDD5C3',
          500: '#C8BEA8',
        },
        // Emotional Care & Grounding: Soft Teal
        teal: {
          calm: '#0F6E56',
          'calm-light': '#E1F5EE',
          'calm-border': '#B7E4D7',
          'calm-dark': '#0A4E3D',
        },
        // Human Warmth & Friendly CTAs: Soft Rose/Coral
        rose: {
          warm: '#993556',
          'warm-light': '#FBEAF0',
          'warm-border': '#F3C5D6',
          'warm-dark': '#7A2843',
        },
        // Life-Critical Emergency Only
        emergency: {
          DEFAULT: '#DC2626',
          hover: '#B91C1C',
          light: '#FEE2E2',
          border: '#FCA5A5',
        },
        // Warm Neutral Text & Borders
        ink: {
          primary: '#1A1829', // High contrast, soft charcoal-plum
          secondary: '#5A5672', // Mid-contrast body
          muted: '#85819C', // Tertiary hints
          border: 'rgba(38, 33, 92, 0.10)',
        },
      },
      fontFamily: {
        sans: [
          'Plus Jakarta Sans',
          'Noto Sans Devanagari',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        hindi: [
          'Noto Sans Devanagari',
          'Plus Jakarta Sans',
          'sans-serif',
        ],
      },
      fontSize: {
        // Generous minimum sizes — never cramped like a government form
        xs: ['0.8125rem', { lineHeight: '1.5' }],    // 13px
        sm: ['0.9375rem', { lineHeight: '1.6' }],    // 15px
        base: ['1.0625rem', { lineHeight: '1.68' }], // 17px base body
        lg: ['1.1875rem', { lineHeight: '1.6' }],    // 19px
        xl: ['1.375rem', { lineHeight: '1.45' }],    // 22px
        '2xl': ['1.625rem', { lineHeight: '1.35' }],  // 26px
        '3xl': ['2rem', { lineHeight: '1.28' }],      // 32px
        '4xl': ['2.5rem', { lineHeight: '1.2' }],     // 40px
      },
      borderRadius: {
        card: '22px',
        'card-sm': '16px',
        btn: '14px',
        pill: '9999px',
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(38, 33, 92, 0.05)',
        elevated: '0 12px 36px -6px rgba(38, 33, 92, 0.08), 0 4px 12px -2px rgba(38, 33, 92, 0.03)',
        floating: '0 16px 48px -8px rgba(22, 18, 54, 0.16)',
      },
      transitionTimingFunction: {
        // Slow breath-like easing curve
        breath: 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      transitionDuration: {
        gentle: '350ms',
        breath: '500ms',
      },
    },
  },
  plugins: [],
};

export default config;
