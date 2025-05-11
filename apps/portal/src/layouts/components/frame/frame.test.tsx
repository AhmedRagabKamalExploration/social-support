import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Frame } from './frame';

// Mock the Header component
vi.mock('../header/header', () => ({
  default: () => <div data-testid="mocked-header">Header</div>,
}));

describe('Frame', () => {
  it('renders the header', () => {
    render(<Frame>Test content</Frame>);

    expect(screen.getByTestId('mocked-header')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(<Frame>Test content</Frame>);

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('has the correct layout structure', () => {
    render(<Frame>Test content</Frame>);

    const container = screen.getByText('Test content').closest('div');
    expect(container).toHaveClass(
      'container mx-auto flex flex-1 lg:max-w-7/12',
    );
  });
});
