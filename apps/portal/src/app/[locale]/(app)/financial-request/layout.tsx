import { Card, CardContent } from '@dge/ui-core';

export default function FinancialRequestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Card className="my-4 flex-1">
      <CardContent className="p-4">{children}</CardContent>
    </Card>
  );
}
