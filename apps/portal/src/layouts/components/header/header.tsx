import { LocaleSwitcher } from '@/components/locale-switcher/locale-switcher';

import { Logo } from './logo/logo';

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-purple-100 p-4">
      <Logo />
      <LocaleSwitcher />
    </header>
  );
}
