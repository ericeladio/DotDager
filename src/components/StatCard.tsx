import * as React from "react";
import type { StatCardProps } from "./types";

export const StatCard: React.FC<StatCardProps> = ({ value, label }) => (
  <article className="flex flex-col items-center self-stretch my-auto max-md:mt-10 ">
    <h3 className="text-4xl font-semibold text-sky-500">{value}</h3>
    <p className="mt-4 text-sm text-white">{label}</p>
    <div className="flex shrink-0 self-stretch mt-6 h-1 bg-white rounded-[45px]" />
  </article>
);
