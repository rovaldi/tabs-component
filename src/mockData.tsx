import type { TabProps, TabPanelProps } from './components/Tabs/types';
import styles from './App.module.scss';

// Pill variant tabs with badges
export const pillTabs: TabProps[] = [
  {
    id: 'home',
    label: 'Home',
  },
  {
    id: 'profile',
    label: 'Profile',
  },
  {
    id: 'messages',
    label: 'Messages',
    badge: 'warning',
  },
  {
    id: 'settings',
    label: 'Settings',
  },
];

// Underline variant tabs with badges
export const underlineTabs: TabProps[] = [
  {
    id: 'overview',
    label: 'Overview',
  },
  {
    id: 'analytics',
    label: 'Analytics',
  },
  {
    id: 'reports',
    label: 'Reports',
  },
  {
    id: 'team',
    label: 'Team',
    badge: 'Beta',
  },
];

// Pill variant panels with content
export const pillPanels: TabPanelProps[] = [
  {
    id: 'home',
    children: (
      <>
        <h2 className={styles.panel__title}>Welcome Home</h2>
        <p className={styles.panel__text}>
          This is your home dashboard. Here you can see an overview of your application.
        </p>
      </>
    ),
  },
  {
    id: 'profile',
    children: (
      <>
        <h2 className={styles.panel__title}>User Profile</h2>
        <p className={styles.panel__text}>Manage your personal information and account settings.</p>
      </>
    ),
  },
  {
    id: 'messages',
    children: (
      <>
        <h2 className={styles.panel__title}>Messages</h2>
        <p className={styles.panel__text}>Your recent messages and conversations.</p>
      </>
    ),
  },
  {
    id: 'settings',
    children: (
      <>
        <h2 className={styles.panel__title}>Settings</h2>
        <p className={styles.panel__text}>Configure your application preferences.</p>
      </>
    ),
  },
];

// Underline variant panels with content
export const underlinePanels: TabPanelProps[] = [
  {
    id: 'overview',
    children: (
      <>
        <h2 className={styles.panel__title}>Project Overview</h2>
        <p className={styles.panel__text}>
          Get a comprehensive view of your project&apos;s current status and metrics.
        </p>
      </>
    ),
  },
  {
    id: 'analytics',
    children: (
      <>
        <h2 className={styles.panel__title}>Analytics</h2>
        <p className={styles.panel__text}>
          Deep dive into your performance metrics and user engagement data.
        </p>
      </>
    ),
  },
  {
    id: 'reports',
    children: (
      <>
        <h2 className={styles.panel__title}>Reports</h2>
        <p className={styles.panel__text}>
          Generate and download detailed reports for your projects and team performance.
        </p>
      </>
    ),
  },
  {
    id: 'team',
    children: (
      <>
        <h2 className={styles.panel__title}>Team Management</h2>
        <p className={styles.panel__text}>Manage your team members, roles, and permissions.</p>
      </>
    ),
  },
];
