import clsx from "clsx";
import { HTMLAttributes, ReactNode } from "react";

export type BadgeVariant =
  | "default"
  | "success"
  | "danger"
  | "gray"
  | "yellow"
  | "indigo"
  | "purple"
  | "pink";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  className?: string;
  defaultClass?: string;
  children?: ReactNode;
}

const badgeColors = {
  default: "bg-blue-100 text-blue-800 text-xs dark:bg-blue-200 dark:text-blue-800",
  danger: "bg-red-100 text-red-800 text-xs dark:bg-red-200 dark:text-red-900",
  success: "bg-green-100 text-green-800 text-xs dark:bg-green-200 dark:text-green-900",
  gray: "bg-gray-100 text-gray-800 text-xs dark:bg-gray-700 dark:text-gray-300",
  yellow: "bg-yellow-100 text-yellow-800 text-xs dark:bg-yellow-200 dark:text-yellow-900",
  indigo: "bg-indigo-100 text-indigo-800 text-xs dark:bg-indigo-200 dark:text-indigo-900",
  purple: "bg-purple-100 text-purple-800 text-xs dark:bg-purple-200 dark:text-purple-900",
  pink: "bg-pink-100 text-pink-800 text-xs dark:bg-pink-200 dark:text-pink-900"
};

export const Badge: React.FC<BadgeProps> = ({
  className,
  defaultClass = "text-xs font-semibold px-2.5 py-0.5 rounded",
  variant = "default",
  children,
  ...props
}) => {
  return (
    <span {...props} className={clsx(className, defaultClass, badgeColors[variant])}>
      {children}
    </span>
  );
};
