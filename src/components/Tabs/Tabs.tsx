import clsx from "clsx";
import React, { useCallback, useMemo, useState } from "react";

import { Tab } from "../Tab/Tab";

export interface ITabItem {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export type TabsProps = {
  className?: string;
  contentClassName?: string;
  initial: string;
  items: ITabItem[];
  onChange?: (id: string) => void;
  dataActionId?: string;
};

export const Tabs: React.FC<TabsProps> = ({
  items,
  initial,
  onChange,
  className,
  contentClassName
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
    <div className={className}>
      <div className="ui-flex ui-items-center ui-flex-nowrap ui-overflow-auto">
        {items.map((item) => (
          <Tab
            key={item.id}
            active={item.id === activeTab}
            className="ui-mx-2"
            disabled={item.disabled}
            text={item.label}
            onClick={() => selectTab(item)}
          />
        ))}
      </div>
      <div className={clsx(contentClassName, "dark:ui-text-white")}>{content}</div>
    </div>
  );
};
