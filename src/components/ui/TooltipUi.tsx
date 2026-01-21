"use client";

import React, { ReactNode, useState } from "react";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  delay?: number;
}

export default function TooltipUi({
  content,
  children,
  delay = 250,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  let timeout: NodeJS.Timeout;

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => {
        timeout = setTimeout(() => setVisible(true), delay);
      }}
      onMouseLeave={() => {
        clearTimeout(timeout);
        setVisible(false);
      }}
    >
      {children}

      {visible && (
        <span className="absolute z-50 -top-2 left-1/2 -translate-y-full whitespace-nowrap rounded-md bg-gray-800 px-3 py-1.5 text-xs text-white shadow-lg">
          {content}
        </span>
      )}
    </span>
  );
}
