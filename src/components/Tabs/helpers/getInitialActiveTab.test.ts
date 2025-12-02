import { describe, it, expect } from 'vitest';
import { getInitialActiveTab } from './getInitialActiveTab';
import type { TabProps } from '../types';

describe('getInitialActiveTab', () => {
  const mockTabs: TabProps[] = [
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2', disabled: true },
    { id: 'tab3', label: 'Tab 3' },
  ];

  const mockTabsAllDisabled: TabProps[] = [
    { id: 'tab1', label: 'Tab 1', disabled: true },
    { id: 'tab2', label: 'Tab 2', disabled: true },
  ];

  it('should return controlledActiveTab when provided', () => {
    const result = getInitialActiveTab('controlled', 'default', mockTabs);
    expect(result).toBe('controlled');
  });

  it('should return defaultActiveTab when controlledActiveTab is undefined', () => {
    const result = getInitialActiveTab(undefined, 'default', mockTabs);
    expect(result).toBe('default');
  });

  it('should return first non-disabled tab when both controlledActiveTab and defaultActiveTab are undefined', () => {
    const result = getInitialActiveTab(undefined, undefined, mockTabs);
    expect(result).toBe('tab1');
  });

  it('should return first tab when all tabs are disabled', () => {
    const result = getInitialActiveTab(undefined, undefined, mockTabsAllDisabled);
    expect(result).toBe('tab1');
  });

  it('should return empty string when no tabs are provided', () => {
    const result = getInitialActiveTab(undefined, undefined, []);
    expect(result).toBe('');
  });

  it('should not select disabled tab as default', () => {
    const tabsWithFirstDisabled: TabProps[] = [
      { id: 'tab1', label: 'Tab 1', disabled: true },
      { id: 'tab2', label: 'Tab 2' },
    ];
    const result = getInitialActiveTab(undefined, undefined, tabsWithFirstDisabled);
    expect(result).toBe('tab2');
  });

  it('should prioritize controlledActiveTab over defaultActiveTab', () => {
    const result = getInitialActiveTab('controlled', 'default', mockTabs);
    expect(result).toBe('controlled');
  });

  it('should handle tabs with mixed disabled states', () => {
    const tabsWithMixedStates: TabProps[] = [
      { id: 'disabled1', label: 'Disabled 1', disabled: true },
      { id: 'enabled1', label: 'Enabled 1' },
      { id: 'disabled2', label: 'Disabled 2', disabled: true },
      { id: 'enabled2', label: 'Enabled 2' },
    ];

    const result = getInitialActiveTab(undefined, undefined, tabsWithMixedStates);
    expect(result).toBe('enabled1');
  });
});
