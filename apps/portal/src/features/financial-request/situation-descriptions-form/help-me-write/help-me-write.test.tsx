import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Import the mocked functions to reference them in tests
import { helpMeWriteAction } from '@/actions/help-me-write.action';

// NOW we can import the component being tested
// (after all mocks are set up)
import HelpMeWrite from './help-me-write';

// ⚠️ IMPORTANT: ALL mock() calls are HOISTED to the top of the file
// They run BEFORE any imports or variable declarations!

// Mock modules WITHOUT using any variables defined in this file
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

// Define the type for helpMeWriteAction result
type ActionResult = {
  success: boolean;
  data?: string | null;
  error?: {
    code: string;
    message: string;
  } | null;
};

// Mock helpMeWriteAction with a simple vi.fn()
vi.mock('@/actions/help-me-write.action', () => ({
  helpMeWriteAction: vi.fn<any>(),
}));

vi.mock('../review-ai-content-dialog/review-ai-content-dialog', () => ({
  ReviewAiContentDialog: ({
    open,
    editedContent,
    handleAccept,
    handleDiscard,
  }: {
    open: boolean;
    editedContent: string;
    handleAccept: () => void;
    handleDiscard: () => void;
  }) => (
    <div
      data-testid="review-dialog"
      data-open={open}
      data-content={editedContent}
    >
      <button data-testid="accept-button" onClick={handleAccept}>
        Accept
      </button>
      <button data-testid="discard-button" onClick={handleDiscard}>
        Discard
      </button>
    </div>
  ),
}));

// Mock React hooks
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...(actual as object),
    useActionState: vi.fn((action: Function, initialState: any) => [
      initialState,
      async () => {
        await action();
      },
      false, // isPending
    ]),
    startTransition: (callback: Function) => callback(),
    useState: actual.useState,
    useCallback: (cb: Function) => cb,
  };
});

describe('HelpMeWrite', () => {
  const onChangeMock = vi.fn();
  const promptText = 'Generate content about my financial situation';

  beforeEach(() => {
    vi.clearAllMocks();

    // Set default success response
    vi.mocked(helpMeWriteAction).mockResolvedValue({
      success: true,
      data: 'AI generated content',
      error: {
        code: '',
        message: '',
      },
    } as any);
  });

  it('renders the button correctly', () => {
    render(<HelpMeWrite prompt={promptText} onChange={onChangeMock} />);

    // Check if the button is rendered
    const button = screen.getByRole('button', { name: /buttonLabel/i });
    expect(button).toBeInTheDocument();
  });

  it('opens the dialog when clicking the button', async () => {
    const user = userEvent.setup();

    render(<HelpMeWrite prompt={promptText} onChange={onChangeMock} />);

    // Click the help me write button
    const button = screen.getByRole('button', { name: /buttonLabel/i });
    await user.click(button);

    // Check if the dialog is displayed with the correct content
    const dialog = screen.getByTestId('review-dialog');
    expect(dialog).toHaveAttribute('data-open', 'true');
    expect(dialog).toHaveAttribute('data-content', 'AI generated content');
  });

  it('calls onChange when accepting the content', async () => {
    const user = userEvent.setup();

    render(<HelpMeWrite prompt={promptText} onChange={onChangeMock} />);

    // Click the help me write button
    const button = screen.getByRole('button', { name: /buttonLabel/i });
    await user.click(button);

    // Accept the content
    const acceptButton = screen.getByTestId('accept-button');
    await user.click(acceptButton);

    // Check if onChange was called with the generated content
    expect(onChangeMock).toHaveBeenCalledWith('AI generated content');
  });

  it('does not call onChange when discarding the content', async () => {
    const user = userEvent.setup();

    render(<HelpMeWrite prompt={promptText} onChange={onChangeMock} />);

    // Click the help me write button
    const button = screen.getByRole('button', { name: /buttonLabel/i });
    await user.click(button);

    // Discard the content
    const discardButton = screen.getByTestId('discard-button');
    await user.click(discardButton);

    // Check that onChange was not called
    expect(onChangeMock).not.toHaveBeenCalled();
  });

  it('shows error toast when action fails', async () => {
    // Set the mock implementation to simulate an error
    vi.mocked(helpMeWriteAction).mockResolvedValue({
      success: false,
      data: null,
      error: {
        code: 'ERROR_CODE',
        message: 'Error message',
      },
    });

    const user = userEvent.setup();

    render(<HelpMeWrite prompt={promptText} onChange={onChangeMock} />);

    // Click the help me write button
    const button = screen.getByRole('button', { name: /buttonLabel/i });
    await user.click(button);

    // Check that error toast was called and dialog wasn't opened
    expect(toast.error).toHaveBeenCalled();
    const dialog = screen.getByTestId('review-dialog');
    expect(dialog).toHaveAttribute('data-open', 'false');
  });
});
