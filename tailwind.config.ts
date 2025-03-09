import { heroui } from '@heroui/theme';
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/components/(button|snippet|code|input).js',
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
