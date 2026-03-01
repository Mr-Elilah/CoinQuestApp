"use client";

import LeftCardWrapper from "./LeftCardWrapper";
import { ReactNode } from "react";

export interface FinanceSummaryCardProps {
  title: string;
  amount: number;
  currencyIcon?: ReactNode; // теперь это иконка
  variant?: "positive" | "negative"; // тип карточки
  onEdit?: () => void;
}

export default function FinanceSummaryCard({
  title,
  amount,
  currencyIcon,
  variant = "positive",
  onEdit,
}: FinanceSummaryCardProps) {
  const titleColor = variant === "positive" ? "text-green-400" : "text-red-400";

  return (
    <LeftCardWrapper>
      <div className="flex justify-between items-start">
        <h3 className={`text-sm font-semibold ${titleColor}`}>{title}</h3>

        <button
          onClick={onEdit}
          className="text-gray-400 hover:text-gray-600 hover:scale-110 hover:shadow-md transition-all cursor-pointer text-sm"
        >
          ✏️
        </button>
      </div>

      <div className="mt-6 flex justify-between gap-2">
        <div className="text-2xl font-bold">{amount.toLocaleString()}</div>
        <div className="text-xl">{currencyIcon}</div>
      </div>
    </LeftCardWrapper>
  );
}
