import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Header from './header';

// Mock the dependencies
vi.mock('@/components/locale-switcher/locale-switcher', () => ({
  LocaleSwitcher: () => (
    <div data-testid="locale-switcher">Locale Switcher</div>
  ),
}));

vi.mock('./logo/logo', () => ({
  Logo: () => <div data-testid="logo">SSP Logo</div>,
}));

describe('Header', () => {
  it('renders the header with correct styling', () => {
    render(<Header />);

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toHaveClass(
      'flex items-center justify-between bg-purple-100 p-4',
    );
  });

  it('renders the logo component', () => {
    render(<Header />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  it('renders the locale switcher component', () => {
    render(<Header />);

    expect(screen.getByTestId('locale-switcher')).toBeInTheDocument();
  });
});
