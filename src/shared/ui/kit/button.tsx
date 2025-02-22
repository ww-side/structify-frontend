import { Button as Btn } from '@heroui/button';
import { extendVariants } from '@heroui/system';

export const Button = extendVariants(Btn, {
  variants: {
    color: {
      primary: 'text-white bg-primary',
    },
    isDisabled: {
      true: 'bg-[#eaeaea] text-[#000] opacity-50 cursor-not-allowed',
    },
    size: {
      xs: 'px-2 min-w-12 h-6 text-tiny gap-1 rounded-small',
      md: 'px-4 min-w-20 h-10 text-small gap-2 rounded-small',
      xl: 'px-8 min-w-28 h-14 text-large gap-4 rounded-medium',
    },
  },
});
