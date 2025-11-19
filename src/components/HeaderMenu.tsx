"use client";

import { useState, ReactNode } from "react";

interface HeaderMenuProps {
  trigger: ReactNode;
  content: ReactNode;
  align?: "left" | "right";
  className?: string;
}

export default function HeaderMenu({
  trigger,
  content,
  align = "right",
  className,
}: HeaderMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`relative ${className || ""}`}
      onMouseLeave={() => setOpen(false)}
    >
      <div
        className="cursor-pointer flex items-center"
        onClick={() => setOpen(!open)}
      >
        {trigger}
      </div>

      {open && (
        <div
          className={`absolute mt-2 min-w-[180px] bg-white border rounded shadow-lg z-50 ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {content}
        </div>
      )}
    </div>
  );
}
