import React from "react";
import { useIntl } from "react-intl";

export interface MainTitleProps {
  id: string;
  className?: string;
}

export default function MainTitle({ id, className = "" }: MainTitleProps) {
  const intl = useIntl();

  return (
    <h1 className={`text-xl font-semibold mb-6 ${className}`}>
      {intl.formatMessage({ id })}
    </h1>
  );
}
