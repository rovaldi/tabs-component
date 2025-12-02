import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { memo } from 'react';
import { TabItem } from './TabItem';
import type { TabItemProps } from '../../types';

describe('TabItem', () => {
  const defaultProps: TabItemProps = {
    id: 'test-tab',
    label: 'Test Tab',
    isActive: false,
    onClick: vi.fn(),
    tabVariant: 'pill',
    tabBadge: 'neutral',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render with basic props', () => {
      render(<TabItem {...defaultProps} />);

      const button = screen.getByTestId('tab-test-tab');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Test Tab');
      expect(button).toHaveAttribute('id', 'tab-test-tab');
    });

    it('should render with badge when provided', () => {
      render(<TabItem {...defaultProps} badge="5" />);

      const badge = screen.getByTestId('badge-test-tab');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent('5');
    });

    it('should render with string badge', () => {
      render(<TabItem {...defaultProps} badge="New" />);

      const badge = screen.getByTestId('badge-test-tab');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent('New');
    });

    it('should render with number badge', () => {
      render(<TabItem {...defaultProps} badge={99} />);

      const badge = screen.getByTestId('badge-test-tab');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent('99');
    });

    it('should not render badge when not provided', () => {
      render(<TabItem {...defaultProps} />);

      const badge = screen.queryByTestId('badge-test-tab');
      expect(badge).not.toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('should render as active when isActive is true', () => {
      render(<TabItem {...defaultProps} isActive={true} />);

      const button = screen.getByTestId('tab-test-tab');
      expect(button).toHaveAttribute('aria-selected', 'true');
    });

    it('should render as inactive when isActive is false', () => {
      render(<TabItem {...defaultProps} isActive={false} />);

      const button = screen.getByTestId('tab-test-tab');
      expect(button).toHaveAttribute('aria-selected', 'false');
    });

    it('should render as disabled when disabled is true', () => {
      render(<TabItem {...defaultProps} disabled={true} />);

      const button = screen.getByTestId('tab-test-tab');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('should render as enabled when disabled is false', () => {
      render(<TabItem {...defaultProps} disabled={false} />);

      const button = screen.getByTestId('tab-test-tab');
      expect(button).not.toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'false');
    });
  });

  describe('Variants', () => {
    it('should render with pill variant', () => {
      render(<TabItem {...defaultProps} tabVariant="pill" />);

      const button = screen.getByTestId('tab-test-tab');
      expect(button).toBeInTheDocument();
      expect(button.className).toContain('tab-item--pill');
    });

    it('should render with underline variant', () => {
      render(<TabItem {...defaultProps} tabVariant="underline" />);

      const button = screen.getByTestId('tab-test-tab');
      expect(button).toBeInTheDocument();
      expect(button.className).toContain('tab-item--underline');
    });
  });

  describe('Badge Variants', () => {
    it.each([
      ['neutral', 'test'],
      ['positive', 5],
      ['negative', 'New'],
    ])('should render badge with %s variant and %s content', (variant, content) => {
      render(
        <TabItem
          {...defaultProps}
          badge={content}
          tabBadge={variant as 'neutral' | 'positive' | 'negative'}
        />,
      );

      const badge = screen.getByTestId('badge-test-tab');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent(String(content));
      expect(badge.className).toContain(`tab-item__badge--${variant}`);
    });
  });

  describe('Interactions', () => {
    it('should call onClick when clicked', () => {
      const mockOnClick = vi.fn();
      render(<TabItem {...defaultProps} onClick={mockOnClick} />);

      const button = screen.getByTestId('tab-test-tab');
      fireEvent.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled and clicked', () => {
      const mockOnClick = vi.fn();
      render(<TabItem {...defaultProps} onClick={mockOnClick} disabled={true} />);

      const button = screen.getByTestId('tab-test-tab');
      fireEvent.click(button);

      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have correct ARIA attributes', () => {
      render(<TabItem {...defaultProps} />);

      const button = screen.getByTestId('tab-test-tab');
      expect(button).toHaveAttribute('role', 'tab');
      expect(button).toHaveAttribute('aria-controls', 'panel-test-tab');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('should have correct id attribute', () => {
      render(<TabItem {...defaultProps} id="custom-id" />);

      const button = screen.getByTestId('tab-custom-id');
      expect(button).toHaveAttribute('id', 'tab-custom-id');
      expect(button).toHaveAttribute('aria-controls', 'panel-custom-id');
    });

    it('should have accessible badge when present', () => {
      render(<TabItem {...defaultProps} badge="Important" />);

      const badge = screen.getByTestId('badge-test-tab');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveAttribute('aria-label', 'Badge: Important');
    });
  });

  describe('CSS Classes', () => {
    it('should have CSS module classes applied', () => {
      render(<TabItem {...defaultProps} />);

      const button = screen.getByTestId('tab-test-tab');
      expect(button.className).toContain('tab-item');
      expect(button.className).toContain('tab-item--pill');
    });

    it('should apply CSS classes for different states', () => {
      render(<TabItem {...defaultProps} isActive={true} disabled={true} tabVariant="underline" />);

      const button = screen.getByTestId('tab-test-tab');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-selected', 'true');
      expect(button.className).toContain('tab-item--active');
      expect(button.className).toContain('tab-item--disabled');
      expect(button.className).toContain('tab-item--underline');
    });
  });

  describe('Component Memoization', () => {
    it('should not re-render when props have not changed', () => {
      const renderSpy = vi.fn();

      const MemoizedComponent = memo(() => {
        renderSpy();
        return <TabItem {...defaultProps} />;
      });
      MemoizedComponent.displayName = 'MemoizedComponent';

      const { rerender } = render(<MemoizedComponent />);
      expect(renderSpy).toHaveBeenCalledTimes(1);

      rerender(<MemoizedComponent />);
      expect(renderSpy).toHaveBeenCalledTimes(1);

      rerender(<MemoizedComponent key="force-rerender" />);
      expect(renderSpy).toHaveBeenCalledTimes(2);
    });
  });
});
