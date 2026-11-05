import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      // Theme-aware colours. `white` is remapped to the theme foreground so every
      // existing `text-white/40`, `border-white/[0.06]` etc. flips with the theme.
      // Light (default): near-black on white. Dark: white on #050505.
      // Text gets its own, stronger lift in light mode so grey copy stays readable
      // on white (e.g. text-white/40 → ~82% black). Borders/backgrounds use `colors.white`.
      textColor: {
        white: 'rgb(var(--fg) / min(1, calc(<alpha-value> * var(--text-boost) + var(--text-lift))))',
      },
      colors: {
        // --fg-boost lifts low-opacity tints in light mode, where they read fainter.
        white: 'rgb(var(--fg) / min(1, calc(<alpha-value> * var(--fg-boost))))',
        background: 'rgb(var(--bg) / <alpha-value>)',
        'text-primary': 'rgb(var(--fg) / <alpha-value>)',
        'text-secondary': 'rgb(var(--fg) / 0.6)',
        border: 'rgb(var(--fg) / 0.08)',
        card: 'rgb(var(--fg) / 0.03)',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both',
        'slide-up': 'slideUp 0.9s cubic-bezier(0.16,1,0.3,1) both',
        'blink': 'blink 2s ease-in-out infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'geo-float': 'geoFloat 6s ease-in-out infinite',
        'geo-rotate': 'geoRotate 20s linear infinite',
        'scroll-line': 'scrollLine 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { transform: 'translateY(110%)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.2' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6', transform: 'translate(-50%, -50%) scale(1)' },
          '50%': { opacity: '1', transform: 'translate(-50%, -50%) scale(1.1)' },
        },
        geoFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        geoRotate: {
          from: { transform: 'rotate(45deg)' },
          to: { transform: 'rotate(405deg)' },
        },
        scrollLine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
