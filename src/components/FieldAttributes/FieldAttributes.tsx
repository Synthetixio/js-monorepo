import clsx from "clsx";
import uniqueId from "lodash/uniqueId";
import { cloneElement, isValidElement, useEffect, useState } from "react";

export interface FieldAttributesProps {
  label?: React.ReactNode;
  error?: string | false;
  className?: string;
  onLabelClick?: () => void;
  children: React.ReactNode;
}

export const FieldAttributes: React.FC<FieldAttributesProps> = ({
  label,
  error,
  className,
  children
}) => {
  const [id, setId] = useState<string | undefined>(undefined);

  useEffect(() => {
    setId(uniqueId("id-"));
  }, []);

  return (
    <div className={clsx("ui-flex ui-flex-col ui-w-full ui-relative ui-mb-5", className)}>
      {id ? isValidElement(children) && cloneElement(children, { id }) : children}

      {label && (
        <label
          className="ui-transition ui-select-none ui-order-1 ui-cursor-pointer ui-tg-caption ui-mb-1.5 ui-text-black-600 dark:ui-text-white"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      {error && (
        <small className="tg-caption-sm ui-text-red-400 ui-ml-2 ui-mt-0.5 ui-absolute ui-top-full">
          {error}
        </small>
      )}
    </div>
  );
};
