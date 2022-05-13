import { SVGIconProps } from "./types";

export const ArrowDropdownDownIcon = ({ onClick, className }: SVGIconProps) => (
  <svg
    className={className}
    fill="none"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
    <path
      d="M16 10L12 14L8 10"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);
