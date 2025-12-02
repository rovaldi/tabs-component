import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTabIndicator } from './useTabIndicator';
import type { RefObject } from 'react';

const mockStyle = {
  transform: '',
  width: '',
};

const mockActiveTabElement = {
  offsetLeft: 100,
  offsetWidth: 150,
};

describe('useTabIndicator', () => {
  let tabListRef: RefObject<HTMLDivElement>;
  let indicatorRef: RefObject<HTMLDivElement>;
  let mockTabListElement: HTMLDivElement;
  let mockIndicatorElement: HTMLDivElement;

  beforeEach(() => {
    mockTabListElement = document.createElement('div');
    mockIndicatorElement = document.createElement('div');

    mockTabListElement.querySelector = vi.fn().mockReturnValue(mockActiveTabElement);

    Object.defineProperty(mockIndicatorElement, 'style', {
      value: mockStyle,
      writable: true,
    });

    tabListRef = { current: mockTabListElement };
    indicatorRef = { current: mockIndicatorElement };

    mockStyle.transform = '';
    mockStyle.width = '';

    Object.defineProperty(window, 'addEventListener', {
      value: vi.fn(),
      writable: true,
    });

    Object.defineProperty(window, 'removeEventListener', {
      value: vi.fn(),
      writable: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should update indicator position when active tab changes', () => {
    renderHook(() => useTabIndicator(tabListRef, indicatorRef, 'tab1', 'underline'));

    expect(mockTabListElement.querySelector).toHaveBeenCalledWith('#tab-tab1');
    expect(mockStyle.transform).toBe('translateX(100px)');
    expect(mockStyle.width).toBe('150px');
  });

  it('should add resize event listener on mount', () => {
    renderHook(() => useTabIndicator(tabListRef, indicatorRef, 'tab1', 'underline'));

    expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('should remove resize event listener on unmount', () => {
    const { unmount } = renderHook(() =>
      useTabIndicator(tabListRef, indicatorRef, 'tab1', 'underline'),
    );

    unmount();

    expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('should update indicator position on window resize', () => {
    renderHook(() => useTabIndicator(tabListRef, indicatorRef, 'tab1', 'underline'));

    const resizeEvent = new Event('resize');
    window.dispatchEvent(resizeEvent);

    expect(mockStyle.transform).toBe('translateX(100px)');
    expect(mockStyle.width).toBe('150px');
  });

  it('should handle missing tabListRef', () => {
    const emptyTabListRef = { current: null };

    expect(() => {
      renderHook(() => useTabIndicator(emptyTabListRef, indicatorRef, 'tab1', 'underline'));
    }).not.toThrow();

    expect(mockStyle.transform).toBe('');
    expect(mockStyle.width).toBe('');
  });

  it('should handle missing indicatorRef', () => {
    const emptyIndicatorRef = { current: null };

    expect(() => {
      renderHook(() => useTabIndicator(tabListRef, emptyIndicatorRef, 'tab1', 'underline'));
    }).not.toThrow();
  });

  it('should handle missing active tab element', () => {
    mockTabListElement.querySelector = vi.fn().mockReturnValue(null);

    expect(() => {
      renderHook(() => useTabIndicator(tabListRef, indicatorRef, 'nonexistent-tab', 'underline'));
    }).not.toThrow();

    expect(mockStyle.transform).toBe('');
    expect(mockStyle.width).toBe('');
  });

  it('should update when currentActiveTab changes', () => {
    const { rerender } = renderHook(
      ({ activeTab }) => useTabIndicator(tabListRef, indicatorRef, activeTab, 'underline'),
      { initialProps: { activeTab: 'tab1' } },
    );

    expect(mockTabListElement.querySelector).toHaveBeenCalledWith('#tab-tab1');

    rerender({ activeTab: 'tab2' });

    expect(mockTabListElement.querySelector).toHaveBeenCalledWith('#tab-tab2');
  });

  it('should work with different tab variants', () => {
    renderHook(() => useTabIndicator(tabListRef, indicatorRef, 'tab1', 'pill'));

    expect(mockStyle.transform).toBe('translateX(100px)');
    expect(mockStyle.width).toBe('150px');
  });
});
