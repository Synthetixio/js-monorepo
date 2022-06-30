import clsx from 'clsx';
import React, { useCallback, useMemo, useState } from 'react';

import { Tab } from '../Tab/Tab';

export interface ITabItem {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export type TabsProps = {
  className?: string;
  tabClassName?: string;
  contentClassName?: string;
  initial: string | number;
  items: ITabItem[];
  onChange?: (id: string | number) => void;
  dataActionId?: string;
};

export const Tabs: React.FC<TabsProps> = ({
  items,
  initial,
  onChange,
  className,
  contentClassName,
  tabClassName
}) => {
  const [activeTab, setActiveTab] = useState(initial);

  const selectTab = useCallback(
    (item: ITabItem) => {
      if (item.disabled) return;
      setActiveTab(item.id);
      onChange?.(item.id);
    },
    [onChange]
  );

  const content = useMemo(
    () => items.find((item) => item.id === activeTab)?.content,
    [activeTab, items]
  );

  return (
    <>
      <div className={clsx('ui-flex ui-items-center ui-flex-nowrap ui-overflow-auto', className)}>
        {items.map((item) => (
          <Tab
            key={item.id}
            active={item.id === activeTab}
            className={clsx('ui-mx-2', tabClassName)}
            disabled={item.disabled}
            text={item.label}
            onClick={() => selectTab(item)}
          />
        ))}
      </div>
      <div className={clsx('dark:ui-text-white', contentClassName)}>{content}</div>
    </>
  );
};
