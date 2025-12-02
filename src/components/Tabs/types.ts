import type { ReactNode } from 'react';

export interface TabProps {
  id: string;
  label: string;
  disabled?: boolean;
  badge?: string | number;
}

export type TabVariant = 'pill' | 'underline';
export type TabBadge = 'neutral' | 'positive' | 'negative';

export type GetInitialActiveTabFunction = (
  controlledActiveTab: string | undefined,
  defaultActiveTab: string | undefined,
  tabs: TabProps[],
) => string;

export interface TabPanelProps {
  children: ReactNode;
  id: string;
  className?: string;
}

export interface TabItemProps extends TabProps {
  isActive: boolean;
  onClick: () => void;
  tabBadge?: TabBadge;
  tabVariant?: TabVariant;
}

export interface TabsProps {
  tabs: TabProps[];
  activeTab?: string;
  className?: string;
  defaultActiveTab?: string;
  onChange?: (tabId: string) => void;
  panels?: TabPanelProps[];
  tabBadge?: TabBadge;
  tabVariant?: TabVariant;
}
