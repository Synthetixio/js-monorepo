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
  children,
  onLabelClick
}) => {
  const [id, setId] = useState<string | undefined>(undefined);

  useEffect(() => {
    setId(uniqueId("id-"));
  }, []);

  return (
    <div className={clsx("ui-flex ui-flex-col ui-w-full ui-relative ui-mb-5", className)}>
      {label && (
        <label
          className="textfield-label ui-cursor-pointer ui-tg-caption ui-ml-5 ui-mb-3 ui-text-black-600 dark:ui-text-white"
          htmlFor={id}
        >
          {onLabelClick ? <button onClick={onLabelClick}>{label}</button> : label}
        </label>
      )}

      {label ? isValidElement(children) && cloneElement(children, { id }) : children}

      {error && (
        <small className="tg-caption-sm ui-text-red-400 ui-ml-5 ui-mt-0.5 ui-absolute ui-top-full">
          {error}
        </small>
      )}
    </div>
  );
};
