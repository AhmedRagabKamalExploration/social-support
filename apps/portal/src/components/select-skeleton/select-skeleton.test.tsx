import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SelectSkeleton } from './select-skeleton';

describe('SelectSkeleton', () => {
  it('renders correctly', () => {
    render(<SelectSkeleton />);

    // Find the element - since it's a generic div we can use its class
    const skeletonElement = screen.getByRole('select-skeleton');

    // Assertions
    expect(skeletonElement).toBeInTheDocument();
    expect(skeletonElement).toHaveClass('animate-pulse');
    expect(skeletonElement).toHaveClass('bg-gray-200');
    expect(skeletonElement).toHaveClass('rounded-md');
    expect(skeletonElement).toHaveClass('h-10');
    expect(skeletonElement).toHaveClass('w-full');
  });
});
