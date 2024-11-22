import * as React from "react";
import type { ServiceCardProps } from "./types";

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
}) => (
  <article className="flex flex-col grow max-md:mt-10">
    <h3 className="self-start text-2xl font-medium text-sky-500 text-opacity-90">
      {title}
    </h3>
    <p className="mt-2 text-sm font-light text-stone-500">{description}</p>
  </article>
);
