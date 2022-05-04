import clsx from "clsx";
import { forwardRef, ReactNode } from "react";

export interface Props {
  className?: string;
  defaultClass?: string;
  children?: ReactNode;
}

const CardRender: React.ForwardRefRenderFunction<HTMLDivElement, Props> = (
  { className = "", defaultClass = "ui-rounded ui-my-2 ui-p-4 sm:ui-p-6", children },
  ref
) => {
  return (
    <div
      ref={ref}
      className={clsx(
        "ui-card ui-bg-white ui-border ui-border-gray-200 ui-shadow-md dark:ui-bg-gray-800 dark:ui-border-black dark:ui-text-gray-400",
        className,
        defaultClass
      )}
    >
      {children}
    </div>
  );
};

export const Card = forwardRef(CardRender);
