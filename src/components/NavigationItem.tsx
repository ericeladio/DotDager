import * as React from "react";
import type { NavigationItemProps } from "./types";


export const NavigationItem: React.FC<NavigationItemProps> = ({
  label,
  isActive,
  onClick,
}) => (

  <a 
    href={`#${label.toLowerCase()}`} 
    className={` hover:text-sky-500 self-stretch my-auto  ${isActive ? "text-sky-500" : ""}`}
    onClick={onClick}
  >
    {label}
  </a>
);
