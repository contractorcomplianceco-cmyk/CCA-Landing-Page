import { useMemo } from "react";
import { getZohoFormSrc } from "../lib/zoho";

type ZohoIntakeEmbedProps = {
  heightClass?: string;
};

export function ZohoIntakeEmbed({ heightClass = "h-[1000px] sm:h-[900px]" }: ZohoIntakeEmbedProps) {
  const formSrc = useMemo(() => getZohoFormSrc(), []);

  return (
    <iframe
      title="CCA Short Lead Intake Form"
      aria-label="CCA Short Lead Intake Form"
      src={formSrc}
      className={`w-full block border-0 ${heightClass}`}
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}
