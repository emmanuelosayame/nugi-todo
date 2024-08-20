import twContainerQueries from '@tailwindcss/container-queries';
import twTypography from '@tailwindcss/typography';
import twAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        // sm: '0rem',
        lg: '0rem',
        // xl: '5rem',
        // '2xl': '6rem',
      },
    },
    extend: {
      keyframes: {
        growBar1: {
          '0%': {
            animationTimingFunction: 'linear',
            transform: 'scaleX(.1)',
          },
          '36.6%': {
            animationTimingFunction: 'cubic-bezier(.33473,.12482,.78584,1)',
            transform: 'scaleX(.1)',
          },
          '69.15%': {
            animationTimingFunction: 'cubic-bezier(.22573,0,.23365,1.37098)',
            transform: 'scaleX(.83)',
          },
          '100%': {
            transform: 'scaleX(.1)',
          },
        },
        moveBar1: {
          '0%': {
            animationTimingFunction: 'linear',
            left: '-105.16667%',
          },
          '20%': {
            animationTimingFunction: 'cubic-bezier(.5,0,.70173,.49582)',
            left: '-105.16667%',
          },
          '69.15%': {
            animationTimingFunction: 'cubic-bezier(.30244,.38135,.55,.95635)',
            left: '21.5%',
          },
          '100%': {
            left: '95.44444%',
          },
        },
        growBar2: {
          '0%': {
            animationTimingFunction:
              'cubic-bezier(.20503,.05705,.57661,.45397)',
            transform: 'scaleX(.1)',
          },
          '19.15%': {
            animationTimingFunction:
              'cubic-bezier(.15231,.19643,.64837,1.00432)',
            transform: 'scaleX(.57)',
          },
          '44.15%': {
            animationTimingFunction:
              'cubic-bezier(.25776,-.00316,.21176,1.38179)',
            transform: 'scaleX(.91)',
          },
          '100%': {
            transform: 'scaleX(.1)',
          },
        },
        moveBar2: {
          '0%': {
            animationTimingFunction: 'cubic-bezier(.15,0,.51506,.40968)',
            left: '-54.88889%',
          },
          '25%': {
            animationTimingFunction: 'cubic-bezier(.31033,.28406,.8,.73372)',
            left: '-17.25%',
          },
          '48.35%': {
            animationTimingFunction: 'cubic-bezier(.4,.62703,.6,.90203)',
            left: '29.5%',
          },
          '100%': {
            left: '117.38889%',
          },
        },
        start: {
          from: {
            maxHeight: 0,
            opacity: 0,
          },
          to: {
            maxHeight: '20px',
            opacity: 1,
          },
        },
        end: {
          from: {
            maxHeight: 0,
            opacity: 0,
          },
          to: {
            maxHeight: '2px',
            opacity: 1,
          },
        },
        progressLinearMovement: {
          '0%': {
            left: '-100%',
          },
          '50%': {
            left: '100%',
          },
          '100%': {
            left: '100%',
          },
        },
      },
      colors: {
        bgColor: {
          'default': 'var(--bgColor-default)',
          'disabled': '--bgColor-disabled',
          'white': 'var(--bgColor-white)',
          'black': 'var(--bgColor-black)',
          'muted': 'var(--bgColor-muted)',
          'inset': 'var(--bgColor-inset)',
          'emphasis': 'var(--bgColor-emphasis)',
          'inverse': 'var(--bgColor-inverse)',
          'transparent': 'var(--bgColor-transparent)',
          'accent-muted': 'var(--bgColor-accent-muted)',
          'accent-emphasis': 'var(--bgColor-accent-emphasis)',
          'danger-muted': 'var(--bgColor-danger-muted)',
          'danger-emphasis': 'var(--bgColor-danger-emphasis)',
          'success-muted': 'var(--bgColor-success-muted)',
          'success-emphasis': 'var(--bgColor-success-emphasis)',
          'attention-muted': 'var(--bgColor-attention-muted)',
          'attention-emphasis': 'var(--bgColor-attention-emphasis)',
        },
        fgColor: {
          default: 'var(--fgColor-default)',
          muted: 'var(--fgColor-muted)',
          emphasis: 'var(--fgColor-onEmphasis)',
          white: 'var(--fgColor-white)',
          black: 'var(--fgColor-black)',
          disabled: 'var(--fgColor-disabled)',
          link: 'var(--fgColor-link)',
          accent: 'var(--fgColor-accent)',
          danger: 'var(--fgColor-danger)',
          success: 'var(--fgColor-success)',
          attention: 'var(--fgColor-attention)',
        },
      },
    },
  },
  plugins: [twAnimate, twContainerQueries, twTypography],
};
