import { Button, Headline, Paragraph } from '@dge/ui-core';
import { ArrowRight } from 'lucide-react';

import { Link } from '@/i18n/navigation';

export default function AppPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <Headline>Welcome to the portal</Headline>
      <Paragraph>
        This is the portal for the financial request. Please select the
        appropriate option below.
      </Paragraph>
      <Button icon={<ArrowRight />}>
        <Link href="/financial-request">Financial Request</Link>
      </Button>
    </div>
  );
}
