import React from "react";

export interface LeftCardWrapperProps {
  title?: React.ReactNode;
  children: React.ReactNode;
}

export default function LeftCardWrapper({
  title,
  children,
}: LeftCardWrapperProps) {
  return (
    <div className="w-full bg-yellow-50 dark:bg-[#293b54] rounded-xl shadow pt-4 px-4 pb-6 text-gray-900 dark:text-gray-100">
      {title && <h2 className="text-left mb-5"> {title}</h2>}
      {children}
    </div>
  );
}
