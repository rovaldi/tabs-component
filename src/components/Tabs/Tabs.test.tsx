import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Tabs } from './Tabs';
import type { TabsProps, TabProps, TabPanelProps } from './types';

vi.mock('./hooks/useTabIndicator', () => ({
  useTabIndicator: vi.fn(),
}));

describe('Tabs', () => {
  const mockTabs: TabProps[] = [
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' },
    { id: 'tab3', label: 'Tab 3', disabled: true },
  ];

  const mockPanels: TabPanelProps[] = [
    { id: 'tab1', children: <div>Panel 1 Content</div> },
    { id: 'tab2', children: <div>Panel 2 Content</div> },
    { id: 'tab3', children: <div>Panel 3 Content</div> },
  ];

  const defaultProps: TabsProps = {
    tabs: mockTabs,
    panels: mockPanels,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render tabs and default active panel', () => {
      render(<Tabs {...defaultProps} />);

      expect(screen.getByTestId('tab-tab1')).toBeInTheDocument();
      expect(screen.getByTestId('tab-tab2')).toBeInTheDocument();
      expect(screen.getByTestId('tab-tab3')).toBeInTheDocument();

      expect(screen.getByText('Panel 1 Content')).toBeInTheDocument();
    });

    it('should render without panels', () => {
      render(<Tabs tabs={mockTabs} />);

      expect(screen.getByTestId('tab-tab1')).toBeInTheDocument();
      expect(screen.getByTestId('tab-tab2')).toBeInTheDocument();
      expect(screen.getByTestId('tab-tab3')).toBeInTheDocument();

      expect(screen.queryByText('Panel 1 Content')).not.toBeInTheDocument();
    });

    it('should render with custom className', () => {
      render(<Tabs {...defaultProps} className="custom-tabs" />);

      const tabsContainer = screen.getByTestId('tabs-pill');
      expect(tabsContainer.className).toContain('custom-tabs');
    });

    it('should render with pill variant by default', () => {
      render(<Tabs {...defaultProps} />);

      const tabsContainer = screen.getByTestId('tabs-pill');
      expect(tabsContainer).toBeInTheDocument();
    });

    it('should render with underline variant', () => {
      render(<Tabs {...defaultProps} tabVariant="underline" />);

      const tabsContainer = screen.getByTestId('tabs-underline');
      expect(tabsContainer).toBeInTheDocument();

      const indicator = screen.getByTestId('tab-indicator');
      expect(indicator).toBeInTheDocument();
    });

    it('should not render indicator for pill variant', () => {
      render(<Tabs {...defaultProps} tabVariant="pill" />);

      const indicator = screen.queryByTestId('tab-indicator');
      expect(indicator).not.toBeInTheDocument();
    });
  });

  describe('Tab States and Selection', () => {
    it('should set first non-disabled tab as active by default', () => {
      render(<Tabs {...defaultProps} />);

      const tab1 = screen.getByTestId('tab-tab1');
      expect(tab1).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Panel 1 Content')).toBeInTheDocument();
    });

    it('should respect defaultActiveTab prop', () => {
      render(<Tabs {...defaultProps} defaultActiveTab="tab2" />);

      const tab2 = screen.getByTestId('tab-tab2');
      expect(tab2).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Panel 2 Content')).toBeInTheDocument();
    });

    it('should handle controlled activeTab prop', () => {
      render(<Tabs {...defaultProps} activeTab="tab2" />);

      const tab2 = screen.getByTestId('tab-tab2');
      expect(tab2).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Panel 2 Content')).toBeInTheDocument();
    });

    it('should update active tab when activeTab prop changes (controlled)', () => {
      const { rerender } = render(<Tabs {...defaultProps} activeTab="tab1" />);

      expect(screen.getByText('Panel 1 Content')).toBeInTheDocument();

      rerender(<Tabs {...defaultProps} activeTab="tab2" />);

      expect(screen.getByText('Panel 2 Content')).toBeInTheDocument();
      expect(screen.queryByText('Panel 1 Content')).not.toBeInTheDocument();
    });
  });

  describe('Tab Interactions', () => {
    it('should switch tabs when clicked (uncontrolled)', async () => {
      render(<Tabs {...defaultProps} />);

      expect(screen.getByText('Panel 1 Content')).toBeInTheDocument();

      fireEvent.click(screen.getByTestId('tab-tab2'));

      await waitFor(() => {
        expect(screen.getByText('Panel 2 Content')).toBeInTheDocument();
        expect(screen.queryByText('Panel 1 Content')).not.toBeInTheDocument();
      });
    });

    it('should call onChange when tab is clicked', () => {
      const mockOnChange = vi.fn();
      render(<Tabs {...defaultProps} onChange={mockOnChange} />);

      fireEvent.click(screen.getByTestId('tab-tab2'));

      expect(mockOnChange).toHaveBeenCalledWith('tab2');
    });

    it('should not switch to disabled tab when clicked', () => {
      render(<Tabs {...defaultProps} />);

      expect(screen.getByText('Panel 1 Content')).toBeInTheDocument();

      fireEvent.click(screen.getByTestId('tab-tab3'));

      expect(screen.getByText('Panel 1 Content')).toBeInTheDocument();
      expect(screen.queryByText('Panel 3 Content')).not.toBeInTheDocument();
    });

    it('should not call onChange for disabled tab', () => {
      const mockOnChange = vi.fn();
      render(<Tabs {...defaultProps} onChange={mockOnChange} />);

      fireEvent.click(screen.getByTestId('tab-tab3'));

      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it('should not update uncontrolled state when controlled', () => {
      const mockOnChange = vi.fn();
      render(<Tabs {...defaultProps} activeTab="tab1" onChange={mockOnChange} />);

      fireEvent.click(screen.getByTestId('tab-tab2'));

      expect(screen.getByText('Panel 1 Content')).toBeInTheDocument();
      expect(mockOnChange).toHaveBeenCalledWith('tab2');
    });
  });

  describe('Badge Variants', () => {
    it('should pass tabBadge prop to TabItem components', () => {
      const tabsWithBadges: TabProps[] = [
        { id: 'tab1', label: 'Tab 1', badge: '5' },
        { id: 'tab2', label: 'Tab 2', badge: 'New' },
      ];

      render(<Tabs tabs={tabsWithBadges} tabBadge="positive" />);

      const badge1 = screen.getByTestId('badge-tab1');
      const badge2 = screen.getByTestId('badge-tab2');

      expect(badge1).toBeInTheDocument();
      expect(badge1).toHaveTextContent('5');
      expect(badge2).toBeInTheDocument();
      expect(badge2).toHaveTextContent('New');
    });
  });

  describe('Panel Management', () => {
    it('should render active panel with correct attributes', () => {
      render(<Tabs {...defaultProps} defaultActiveTab="tab2" />);

      const panel = screen.getByTestId('panel-tab2');
      expect(panel).toHaveAttribute('id', 'panel-tab2');
      expect(panel).toHaveAttribute('aria-labelledby', 'tab-tab2');
      expect(panel).toHaveAttribute('tabIndex', '0');
      expect(panel).toHaveTextContent('Panel 2 Content');
    });

    it('should handle missing panel for active tab', () => {
      const incompleteProps = {
        tabs: mockTabs,
        panels: [{ id: 'tab1', children: <div>Only Panel 1</div> }],
        defaultActiveTab: 'tab2',
      };

      render(<Tabs {...incompleteProps} />);
      expect(screen.queryByRole('tabpanel')).not.toBeInTheDocument();
    });

    it('should apply custom className to panel', () => {
      const panelsWithClassName: TabPanelProps[] = [
        { id: 'tab1', children: <div>Panel Content</div>, className: 'custom-panel' },
      ];

      render(<Tabs tabs={mockTabs} panels={panelsWithClassName} />);

      const panel = screen.getByRole('tabpanel');
      expect(panel).toHaveClass('custom-panel');
    });
  });

  describe('Accessibility', () => {
    it('should have correct tablist attributes', () => {
      render(<Tabs {...defaultProps} />);

      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveAttribute('aria-label', 'Tab navigation');
    });

    it('should maintain tab/panel relationship', () => {
      render(<Tabs {...defaultProps} />);

      const activeTab = screen.getByRole('tab', { selected: true });
      const panel = screen.getByRole('tabpanel');

      const tabId = activeTab.getAttribute('id');
      const panelAriaLabelledBy = panel.getAttribute('aria-labelledby');
      const panelId = panel.getAttribute('id');
      const tabAriaControls = activeTab.getAttribute('aria-controls');

      expect(panelAriaLabelledBy).toBe(tabId);
      expect(tabAriaControls).toBe(panelId);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty tabs array', () => {
      render(<Tabs tabs={[]} />);

      const tablist = screen.getByRole('tablist');
      expect(tablist).toBeInTheDocument();
      expect(tablist.children).toHaveLength(0);
    });

    it('should handle all disabled tabs', () => {
      const allDisabledTabs: TabProps[] = [
        { id: 'tab1', label: 'Tab 1', disabled: true },
        { id: 'tab2', label: 'Tab 2', disabled: true },
      ];

      const panels: TabPanelProps[] = [
        { id: 'tab1', children: <div>Panel 1</div> },
        { id: 'tab2', children: <div>Panel 2</div> },
      ];

      render(<Tabs tabs={allDisabledTabs} panels={panels} />);

      expect(screen.getByText('Panel 1')).toBeInTheDocument();
    });

    it('should handle tabs without matching panels', () => {
      const tabsOnly: TabProps[] = [
        { id: 'tab1', label: 'Tab 1' },
        { id: 'tab2', label: 'Tab 2' },
      ];

      const partialPanels: TabPanelProps[] = [{ id: 'tab1', children: <div>Panel 1</div> }];

      render(<Tabs tabs={tabsOnly} panels={partialPanels} defaultActiveTab="tab2" />);

      expect(screen.queryByRole('tabpanel')).not.toBeInTheDocument();
    });
  });
});
