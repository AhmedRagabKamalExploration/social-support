import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Textarea,
} from '@dge/ui-core';
import { useTranslations } from 'next-intl';

type ReviewAiContentDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  editedContent: string;
  setEditedContent: (editedContent: string) => void;
  handleAccept: () => void;
  handleDiscard: () => void;
};
export function ReviewAiContentDialog({
  open,
  setOpen,
  editedContent,
  setEditedContent,
  handleAccept,
  handleDiscard,
}: ReviewAiContentDialogProps) {
  const t = useTranslations(
    'Pages.SituationDescription.components.situationDescriptionForm.ReviewAiContentDialog',
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{t('description')}</DialogDescription>
        <Textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="min-h-[200px]"
        />
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleDiscard}>
            {t('discard')}
          </Button>
          <Button onClick={handleAccept}>{t('accept')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
