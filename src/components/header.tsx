"use client";
import React from "react";
import Image from "next/image";
import LocaleSwitcher from "./LocaleSwitcher";

export interface HeadersProps {
  children: React.ReactNode;
  currentLocale: string;
}

export default function Header({ children, currentLocale }: HeadersProps) {
  return (
    <header className="flex items-center gap-5 py-6 px-10 border-b border-gray-300">
      <h1 className="flex-1 text-3xl font-semibold text-gray-900">
        {children}
      </h1>
      <div className="flex items-center gap-8">
        <LocaleSwitcher currentLocale={currentLocale} />
        <div className="w-px h-10 bg-gray-300" />
        <Image width={44} height={44} src="/images/avatar.png" alt="avatar" />
      </div>
    </header>
  );
}
