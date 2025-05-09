import { Container } from '@dge/ui-core';

import Header from '../header/header';

export function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <Container>{children}</Container>
    </div>
  );
}
