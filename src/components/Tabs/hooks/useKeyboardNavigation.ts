// src/components/Tabs/hooks/useKeyboardNavigation.ts
import { useCallback, useEffect } from 'react';
import type { RefObject } from 'react';

export const useKeyboardNavigation = (
  tabListRef: RefObject<HTMLDivElement | null>,
  currentActiveTab: string,
  tabs: Array<{ id: string; disabled?: boolean }>,
  onTabChange: (tabId: string) => void,
) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const enabledTabs = tabs.filter((t) => !t.disabled);
      const currentIndex = enabledTabs.findIndex((t) => t.id === currentActiveTab);

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown': {
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % enabledTabs.length;
          onTabChange(enabledTabs[nextIndex].id);
          break;
        }
        case 'ArrowLeft':
        case 'ArrowUp': {
          e.preventDefault();
          const prevIndex = (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
          onTabChange(enabledTabs[prevIndex].id);
          break;
        }
        case 'Home':
          e.preventDefault();
          onTabChange(enabledTabs[0].id);
          break;
        case 'End':
          e.preventDefault();
          onTabChange(enabledTabs[enabledTabs.length - 1].id);
          break;
      }
    },
    [currentActiveTab, tabs, onTabChange],
  );

  useEffect(() => {
    const tabList = tabListRef.current;
    if (!tabList) return;

    tabList.addEventListener('keydown', handleKeyDown);
    return () => tabList.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, tabListRef]);
};
