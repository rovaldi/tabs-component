import { useState, useRef, useCallback } from 'react';
import classNames from 'classnames';
import { TabItem } from './components/TabItem';
import { getInitialActiveTab } from './helpers/getInitialActiveTab';
import { useTabIndicator } from './hooks/useTabIndicator';
import type { TabsProps } from './types';
import styles from './Tabs.module.scss';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';

export const Tabs = ({
  tabs,
  panels = [],
  activeTab: controlledActiveTab,
  defaultActiveTab,
  onChange,
  tabVariant = 'pill',
  tabBadge = 'neutral',
  className = '',
}: TabsProps) => {
  const [uncontrolledActiveTab, setUncontrolledActiveTab] = useState<string>(() =>
    getInitialActiveTab(controlledActiveTab, defaultActiveTab, tabs),
  );

  const isControlled = controlledActiveTab !== undefined;
  const currentActiveTab = isControlled ? controlledActiveTab : uncontrolledActiveTab;
  const activePanel = panels.find((panel) => panel.id === currentActiveTab);

  const tabListRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const handleTabChange = useCallback(
    (tabId: string) => {
      const tab = tabs.find((t) => t.id === tabId);
      if (!tab || tab.disabled) return;

      if (!isControlled) {
        setUncontrolledActiveTab(tabId);
      }

      onChange?.(tabId);

      setTimeout(() => {
        const tabElement = tabListRef.current?.querySelector<HTMLButtonElement>(`#tab-${tabId}`);
        tabElement?.focus();
      }, 0);
    },
    [tabs, isControlled, onChange],
  );

  useTabIndicator(tabListRef, indicatorRef, currentActiveTab, tabVariant);
  useKeyboardNavigation(tabListRef, currentActiveTab, tabs, handleTabChange);

  return (
    <div
      className={classNames(
        styles.tabs,
        styles[`tabs--${tabVariant}`],
        { [styles['tabs--animated']]: tabVariant === 'underline' },
        className,
      )}
      data-testid={`tabs-${tabVariant}`}
    >
      <div
        ref={tabListRef}
        role="tablist"
        className={classNames(styles['tabs__list'], styles[`tabs__list--${tabVariant}`])}
        aria-label="Tab navigation"
        data-testid={`tablist-${tabVariant}`}
      >
        {tabs.map((tab) => (
          <TabItem
            key={tab.id}
            {...tab}
            isActive={currentActiveTab === tab.id}
            onClick={() => handleTabChange(tab.id)}
            tabVariant={tabVariant}
            tabBadge={tabBadge}
          />
        ))}
        {tabVariant === 'underline' && (
          <span
            ref={indicatorRef}
            className={styles['tabs__indicator']}
            aria-hidden="true"
            data-testid="tab-indicator"
          />
        )}
      </div>

      {activePanel && (
        <div
          key={activePanel.id}
          id={`panel-${activePanel.id}`}
          role="tabpanel"
          className={classNames(styles['tabs__panel'], activePanel.className)}
          aria-labelledby={`tab-${activePanel.id}`}
          tabIndex={0}
          data-testid={`panel-${activePanel.id}`}
        >
          {activePanel.children}
        </div>
      )}
    </div>
  );
};

export default Tabs;
