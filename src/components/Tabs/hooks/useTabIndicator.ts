import { useEffect } from 'react';
import type { RefObject } from 'react';

export const useTabIndicator = (
  tabListRef: RefObject<HTMLDivElement | null>,
  indicatorRef: RefObject<HTMLDivElement | null>,
  currentActiveTab: string,
  tabVariant: string,
) => {
  useEffect(() => {
    if (!tabListRef.current || !indicatorRef.current) {
      return;
    }

    const updateIndicatorPosition = () => {
      const activeTabElement = tabListRef.current?.querySelector<HTMLButtonElement>(
        `#tab-${currentActiveTab}`,
      );

      if (activeTabElement && tabListRef.current) {
        const { offsetLeft, offsetWidth } = activeTabElement;

        indicatorRef.current!.style.transform = `translateX(${offsetLeft}px)`;
        indicatorRef.current!.style.width = `${offsetWidth}px`;
      }
    };

    updateIndicatorPosition();
    window.addEventListener('resize', updateIndicatorPosition);

    return () => {
      window.removeEventListener('resize', updateIndicatorPosition);
    };
  }, [currentActiveTab, tabVariant, tabListRef, indicatorRef]);
};
