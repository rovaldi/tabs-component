import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { App } from './App';

describe('App Integration Tests', () => {
  beforeEach(() => {
    render(<App />);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Pill Variant Tab System', () => {
    it('should render pill variant tabs', () => {
      const pillSection = screen.getByTestId('pill-variant-section');

      expect(pillSection).toBeInTheDocument();

      expect(screen.getByTestId('tab-home')).toBeInTheDocument();
      expect(screen.getByTestId('tab-profile')).toBeInTheDocument();
      expect(screen.getByTestId('tab-messages')).toBeInTheDocument();
      expect(screen.getByTestId('tab-settings')).toBeInTheDocument();
    });

    it('should show Home panel by default in pill variant', () => {
      expect(screen.getByTestId('panel-home')).toBeInTheDocument();
      expect(screen.getByText('Welcome Home')).toBeInTheDocument();
    });

    it('should switch to Profile panel when Profile tab is clicked', async () => {
      const profileTab = screen.getByTestId('tab-profile');

      fireEvent.click(profileTab);

      await waitFor(() => {
        expect(screen.getByTestId('panel-profile')).toBeInTheDocument();
        expect(screen.getByText('User Profile')).toBeInTheDocument();
      });
    });

    it('should switch to Messages panel when Messages tab is clicked', async () => {
      const messagesTab = screen.getByTestId('tab-messages');

      fireEvent.click(messagesTab);

      await waitFor(() => {
        expect(screen.getByTestId('panel-messages')).toBeInTheDocument();
      });
    });

    it('should switch to Settings panel when Settings tab is clicked', async () => {
      const settingsTab = screen.getByTestId('tab-settings');

      fireEvent.click(settingsTab);

      await waitFor(() => {
        expect(screen.getByTestId('panel-settings')).toBeInTheDocument();
      });
    });

    it('should display Messages tab with warning badge', () => {
      const badge = screen.getByTestId('badge-messages');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent('warning');
    });
  });

  describe('Underline Variant Tab System', () => {
    it('should render underline variant tabs', () => {
      const underlineSection = screen.getByTestId('underline-variant-section');

      expect(underlineSection).toBeInTheDocument();

      expect(screen.getByTestId('tab-overview')).toBeInTheDocument();
      expect(screen.getByTestId('tab-analytics')).toBeInTheDocument();
      expect(screen.getByTestId('tab-reports')).toBeInTheDocument();
      expect(screen.getByTestId('tab-team')).toBeInTheDocument();
    });

    it('should show Overview panel by default in underline variant', () => {
      expect(screen.getByTestId('panel-overview')).toBeInTheDocument();
      expect(screen.getByText('Project Overview')).toBeInTheDocument();
    });

    it('should switch to Analytics panel when Analytics tab is clicked', async () => {
      const analyticsTab = screen.getByTestId('tab-analytics');

      fireEvent.click(analyticsTab);

      await waitFor(() => {
        expect(screen.getByTestId('panel-analytics')).toBeInTheDocument();
        expect(
          screen.getByText('Deep dive into your performance metrics and user engagement data.'),
        ).toBeInTheDocument();
      });
    });

    it('should switch to Reports panel when Reports tab is clicked', async () => {
      const reportsTab = screen.getByTestId('tab-reports');

      fireEvent.click(reportsTab);

      await waitFor(() => {
        expect(screen.getByTestId('panel-reports')).toBeInTheDocument();
        expect(
          screen.getByText(
            'Generate and download detailed reports for your projects and team performance.',
          ),
        ).toBeInTheDocument();
      });
    });

    it('should switch to Team panel when Team tab is clicked', async () => {
      const teamTab = screen.getByTestId('tab-team');

      fireEvent.click(teamTab);

      await waitFor(() => {
        expect(screen.getByTestId('panel-team')).toBeInTheDocument();
        expect(screen.getByText('Team Management')).toBeInTheDocument();
      });
    });

    it('should display Team tab with Beta badge', () => {
      const badge = screen.getByTestId('badge-team');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent('Beta');
    });
  });

  describe('Tab System Independence', () => {
    it('should maintain independent state between pill and underline variants', async () => {
      const profileTab = screen.getByTestId('tab-profile');
      fireEvent.click(profileTab);

      const analyticsTab = screen.getByTestId('tab-analytics');
      fireEvent.click(analyticsTab);

      await waitFor(() => {
        expect(screen.getByTestId('panel-profile')).toBeInTheDocument();
        expect(screen.getByTestId('panel-analytics')).toBeInTheDocument();
      });
    });

    it('should switch tabs independently in each variant', async () => {
      const profileTab = screen.getByTestId('tab-profile');
      fireEvent.click(profileTab);

      const analyticsTab = screen.getByTestId('tab-analytics');
      fireEvent.click(analyticsTab);

      await waitFor(() => {
        expect(screen.getByTestId('panel-profile')).toBeInTheDocument();
        expect(screen.getByTestId('panel-analytics')).toBeInTheDocument();
      });

      const messagesTab = screen.getByTestId('tab-messages');
      fireEvent.click(messagesTab);

      await waitFor(() => {
        expect(screen.getByTestId('panel-messages')).toBeInTheDocument();
        expect(screen.getByTestId('panel-analytics')).toBeInTheDocument();
        expect(screen.queryByTestId('panel-profile')).not.toBeInTheDocument();
      });
    });
  });

  describe('Badge Styling', () => {
    it('should display badge in pill variant with correct content', () => {
      const badge = screen.getByTestId('badge-messages');

      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent('warning');
    });

    it('should display badge in underline variant with correct content', () => {
      const badge = screen.getByTestId('badge-team');

      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent('Beta');
    });
  });
});
