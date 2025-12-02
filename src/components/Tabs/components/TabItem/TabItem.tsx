import { memo } from 'react';
import classNames from 'classnames';
import type { TabItemProps } from '../../types';
import styles from './TabItem.module.scss';

const TabItem = memo<TabItemProps>(
  ({
    id,
    label,
    badge,
    disabled = false,
    isActive,
    onClick,
    tabVariant = 'pill',
    tabBadge = 'neutral',
  }: TabItemProps) => {
    return (
      <button
        id={`tab-${id}`}
        role="tab"
        className={classNames(styles['tab-item'], {
          [styles[`tab-item--${tabVariant}`]]: tabVariant,
          [styles['tab-item--active']]: isActive,
          [styles['tab-item--disabled']]: disabled,
        })}
        onClick={onClick}
        disabled={disabled}
        aria-selected={isActive}
        aria-disabled={disabled}
        aria-controls={`panel-${id}`}
        type="button"
        data-testid={`tab-${id}`}
      >
        {label}
        {badge && (
          <span
            className={classNames(
              styles['tab-item__badge'],
              styles[`tab-item__badge--${tabBadge}`],
            )}
            aria-label={`Badge: ${badge}`}
            data-testid={`badge-${id}`}
          >
            {badge}
          </span>
        )}
      </button>
    );
  },
);

TabItem.displayName = 'TabItem' as const;

export { TabItem };
