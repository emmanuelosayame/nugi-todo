import twContainerQueries from '@tailwindcss/container-queries';
import twTypography from '@tailwindcss/typography';
import twAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'progress-gradient': 'linear-gradient(90deg, #0757ba 0%, #66a6ff 100%)',
      },
      colors: {
        'primary': '#0757ba',
        'primary-light': '#66a6ff',
        'bgColor': {
          'default': '#ffffff',
          'inset': '#f6f8fa',
          'emphasis': '#0969da',
          'transparent': '#ffffff00',
          'accent-emphasis': '#0969da',
        },
        'fgColor': {
          muted: '#636c76',
          link: '#0969da',
        },
        'border': {
          muted: '#d0d7deb3',
        },
      },
    },
  },
  plugins: [twAnimate, twContainerQueries, twTypography],
};
