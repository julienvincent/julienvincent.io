import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Switch } from '@/components/ui/switch';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const is_dark = theme === 'dark';

  const handle_checked_change = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <Switch
      aria-label="Toggle dark mode"
      checked={is_dark}
      onCheckedChange={handle_checked_change}
      thumb_children={
        is_dark ? <Moon className="h-3 w-3" /> : <Sun className="h-3 w-3 " />
      }
    />
  );
}
