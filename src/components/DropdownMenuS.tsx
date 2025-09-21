"use client";

import { useState, ReactNode } from "react";

type DropdowmMenuSProps = {
  buttonContent: ReactNode;
  items: ReactNode[];
  className?: string;
};

export default function DropdowmMenuS({
  buttonContent,
  items,
  className,
}: DropdowmMenuSProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative ${className || ""}`}>
      <button
        onClick={() => setOpen(!open)}
        className="p-1 flex items-center justify-center"
      >
        {buttonContent}
      </button>

      {open && (
        <ul className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-50">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
