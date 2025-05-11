import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Logo } from './logo';

// Mock the Link component
vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} data-testid="mocked-link">
      {children}
    </a>
  ),
}));

// Mock the Headline component
vi.mock('@dge/ui-core', () => ({
  Headline: ({
    children,
    variant,
  }: {
    children: React.ReactNode;
    variant: string;
  }) => (
    <div data-testid="headline" data-variant={variant}>
      {children}
    </div>
  ),
}));

describe('Logo', () => {
  it('renders the SSP text', () => {
    render(<Logo />);

    expect(screen.getByText('SSP')).toBeInTheDocument();
  });

  it('renders the Headline component with h3 variant', () => {
    render(<Logo />);

    const headline = screen.getByTestId('headline');
    expect(headline).toBeInTheDocument();
    expect(headline).toHaveAttribute('data-variant', 'h3');
  });

  it('renders a link to the homepage', () => {
    render(<Logo />);

    const link = screen.getByTestId('mocked-link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
