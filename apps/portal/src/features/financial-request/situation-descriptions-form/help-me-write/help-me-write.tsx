'use client';

import { Button } from '@dge/ui-core';
import { Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useActionState } from 'react';
import { startTransition } from 'react';
import { toast } from 'sonner';

import { helpMeWriteAction } from '@/actions/help-me-write.action';

type HelpMeWriteProps = {
  prompt: string;
  onChange: (value: string) => void;
};

export default function HelpMeWrite({ prompt, onChange }: HelpMeWriteProps) {
  const t = useTranslations('HelpMeWrite');
  const [_state, formAction, isPending] = useActionState(async () => {
    const result = await helpMeWriteAction(prompt);
    console.log({ result });
    if (result.success && result.data) {
      onChange(result.data);
    } else {
      // TODO: handle error codes mapping correctly with typed error codes
      toast.error(
        result.error.code
          ? t(`errorCodes.${result.error.code}` as any)
          : result.error.message,
      );
    }
    return result;
  }, null);

  const handleClick = () => {
    startTransition(() => {
      formAction();
    });
  };

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      size="sm"
      type="button"
      disabled={isPending}
    >
      <Sparkles className="mr-2 size-4" />
      {isPending ? 'Generating...' : 'Help Me Write'}
    </Button>
  );
}
