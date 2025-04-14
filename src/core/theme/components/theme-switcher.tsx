'use client';

import { useTheme } from 'next-themes';

import { Moon, Sun } from '@/shared/ui/icons';
import { Switch } from '@/shared/ui/kit/switch';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Switch
      defaultSelected
      color="primary"
      size="sm"
      checked={theme === 'dark'}
      onChange={e => setTheme(e.target.checked ? 'dark' : 'light')}
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <Sun className={className} />
        ) : (
          <Moon className={className} />
        )
      }
    />
  );
}
