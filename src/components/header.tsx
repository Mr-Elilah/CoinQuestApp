"use client";
import React from "react";
import Button from "./button";
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
      <div className="flex gap-3 items-center">
        <Button type="burger" />
        <Button type="messages" />
        <Button type="notifications" />
        <Button type="locale" currentLocale={currentLocale} />
        <Button type="avatar" />
      </div>
    </header>
  );
}
