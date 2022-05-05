import clsx from "clsx";
import { Card } from "components/Card/Card";
import { useOnClickOutside } from "hooks/useOnClickOutside";
import React, { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

export interface Props {
  className?: string;
  wrapperClass?: string;
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  disableClose?: boolean;
  hideCloseIcon?: boolean;
}

export const Dialog: React.FC<Props> = ({
  className,
  wrapperClass,
  open,
  onClose,
  children,
  disableClose,
  hideCloseIcon
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => !disableClose && onClose?.());

  useEffect(() => {
    if (open) document.documentElement.classList.add("stop-scrolling");
    else document.documentElement.classList.remove("stop-scrolling");
  }, [open]);
  const nodeRef = useRef(null);

  return (
    // <CSSTransition
    //   unmountOnExit
    //   classNames="dialog"
    //   in={open}
    //   nodeRef={nodeRef}
    //   timeout={{ enter: 500, exit: 300 }}
    // >
    open ? (
      <div
        ref={nodeRef}
        className="ui-overflow-y-auto ui-bg-overlay ui-overflow-x-hidden ui-fixed ui-right-0 ui-left-0 ui-top-0 ui-z-999 ui-flex ui-justify-center ui-items-center ui-h-screen ui-w-screen ui-max-h-screen"
      >
        <Card
          ref={ref}
          className={clsx(
            wrapperClass,
            "ui-overflow-y-auto ui-relative ui-w-full ui-max-w-md ui-h-full ui-max-h-full md:ui-h-auto"
          )}
          defaultClass="md:ui-rounded-lg ui-p-4 sm:ui-p-6"
        >
          {!hideCloseIcon && (
            <button
              className="ui-absolute ui-top-4 ui-right-4 ui-text-xl ui-cursor-pointer"
              onClick={onClose}
            >
              x
            </button>
          )}
          <div className={clsx(className, "ui-px-5 ui-text-center")}>{children}</div>
        </Card>
      </div>
    ) : null
    // </CSSTransition>
  );
};
