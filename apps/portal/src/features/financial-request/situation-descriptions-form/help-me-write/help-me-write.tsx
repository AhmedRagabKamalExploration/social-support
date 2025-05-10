'use client';

import { Button } from '@dge/ui-core';
import { Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useActionState, useCallback } from 'react';
import { startTransition, useState } from 'react';
import { toast } from 'sonner';

import { helpMeWriteAction } from '@/actions/help-me-write.action';

import { ReviewAiContentDialog } from '../review-ai-content-dialog/review-ai-content-dialog';

type HelpMeWriteProps = {
  prompt: string;
  onChange: (value: string) => void;
};

export default function HelpMeWrite({ prompt, onChange }: HelpMeWriteProps) {
  const [open, setOpen] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const t = useTranslations(
    'Pages.SituationDescription.components.situationDescriptionForm.HelpMeWrite',
  );
  const [_state, formAction, isPending] = useActionState(async () => {
    const result = await helpMeWriteAction(prompt);

    if (result.success && result.data) {
      setEditedContent(result.data);
      setOpen(true);
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

  const handleClick = useCallback(() => {
    startTransition(() => {
      formAction();
    });
  }, [formAction]);

  const handleAccept = useCallback(() => {
    onChange(editedContent);
    setOpen(false);
  }, [editedContent, onChange]);

  const handleDiscard = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <>
      <Button
        onClick={handleClick}
        variant="outline"
        size="sm"
        type="button"
        disabled={isPending}
      >
        <Sparkles className="mr-2 size-4" />
        {isPending ? t('buttonGenerating') : t('buttonLabel')}
      </Button>
      <ReviewAiContentDialog
        open={open}
        setOpen={setOpen}
        editedContent={editedContent}
        setEditedContent={setEditedContent}
        handleAccept={handleAccept}
        handleDiscard={handleDiscard}
      />
    </>
  );
}
