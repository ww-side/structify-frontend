import { heroui } from '@heroui/theme';
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        'primary-dark': 'var(--primary-dark-color)',
        background: 'var(--background)',
        secondary: 'var(--secondary-color)',
        'primary-text': 'var(--primary-text-color)',
        'inverted-text': 'var(--inverted-text-color)',
        'stroke-color': 'var(--stroke-color)',
      },
      backgroundImage: {
        noise: 'var(--bg-noise)',
      },
    },
  },
  plugins: [
    heroui({
      addCommonColors: true,
    }),
  ],
} satisfies Config;
