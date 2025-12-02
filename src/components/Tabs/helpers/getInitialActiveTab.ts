import type { GetInitialActiveTabFunction } from '../types';

export const getInitialActiveTab: GetInitialActiveTabFunction = (
  controlledActiveTab,
  defaultActiveTab,
  tabs,
) => {
  if (controlledActiveTab !== undefined) return controlledActiveTab;
  if (defaultActiveTab) return defaultActiveTab;
  return tabs.find((tab) => !tab.disabled)?.id || tabs[0]?.id || '';
};
