import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ReviewAiContentDialog } from './review-ai-content-dialog';

// Mock next-intl hooks
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

// Mock UI components
vi.mock('@dge/ui-core', () => ({
  Button: ({ children, onClick, variant }: any) => (
    <button onClick={onClick} data-variant={variant}>
      {children}
    </button>
  ),
  Dialog: ({ open, onOpenChange, children }: any) => (
    <div data-testid="dialog" data-open={open}>
      {open ? (
        <>
          <button
            data-testid="close-dialog"
            onClick={() => onOpenChange(false)}
          >
            Close
          </button>
          {children}
        </>
      ) : null}
    </div>
  ),
  DialogContent: ({ children, className }: any) => (
    <div data-testid="dialog-content" className={className}>
      {children}
    </div>
  ),
  DialogHeader: ({ children }: any) => (
    <div data-testid="dialog-header">{children}</div>
  ),
  DialogTitle: ({ children }: any) => (
    <h2 data-testid="dialog-title">{children}</h2>
  ),
  DialogDescription: ({ children }: any) => (
    <p data-testid="dialog-description">{children}</p>
  ),
  DialogFooter: ({ children, className }: any) => (
    <div data-testid="dialog-footer" className={className}>
      {children}
    </div>
  ),
  Textarea: ({ value, onChange, className }: any) => (
    <textarea
      data-testid="dialog-textarea"
      className={className}
      value={value}
      onChange={onChange}
    />
  ),
}));

describe('ReviewAiContentDialog', () => {
  const mockProps = {
    open: true,
    setOpen: vi.fn(),
    editedContent: 'AI generated content',
    setEditedContent: vi.fn(),
    handleAccept: vi.fn(),
    handleDiscard: vi.fn(),
  };

  it('renders the dialog when open is true', () => {
    render(<ReviewAiContentDialog {...mockProps} />);

    expect(screen.getByTestId('dialog')).toHaveAttribute('data-open', 'true');
    expect(screen.getByTestId('dialog-title')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-description')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-textarea')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-textarea')).toHaveValue(
      'AI generated content',
    );
  });

  it('does not render dialog content when open is false', () => {
    render(<ReviewAiContentDialog {...mockProps} open={false} />);

    expect(screen.getByTestId('dialog')).toHaveAttribute('data-open', 'false');
    expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument();
  });

  it('calls handleAccept when Accept button is clicked', async () => {
    const user = userEvent.setup();

    render(<ReviewAiContentDialog {...mockProps} />);

    // Find the Accept button and click it
    const acceptButton = screen.getByText('accept');
    await user.click(acceptButton);

    expect(mockProps.handleAccept).toHaveBeenCalled();
  });

  it('calls handleDiscard when Discard button is clicked', async () => {
    const user = userEvent.setup();

    render(<ReviewAiContentDialog {...mockProps} />);

    // Find the Discard button and click it
    const discardButton = screen.getByText('discard');
    await user.click(discardButton);

    expect(mockProps.handleDiscard).toHaveBeenCalled();
  });

  it('calls setOpen when dialog is closed', async () => {
    const user = userEvent.setup();

    render(<ReviewAiContentDialog {...mockProps} />);

    // Close the dialog
    const closeButton = screen.getByTestId('close-dialog');
    await user.click(closeButton);

    expect(mockProps.setOpen).toHaveBeenCalledWith(false);
  });
});
