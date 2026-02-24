import React from "react";

export interface FinanceSummaryCardProps {
  title: string;
  amount: number;
  currencySymbol?: string;
  onEdit?: () => void;
}

export const FinanceSummaryCard: React.FC<FinanceSummaryCardProps> = ({
  title,
  amount,
  currencySymbol = "$",
  onEdit,
}) => {
  return (
    <div className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-md p-5 w-full">
      {/* Заголовок + кнопка редактирования */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </h3>

        <button
          onClick={onEdit}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
        >
          ✏️
        </button>
      </div>

      {/* Сумма */}
      <div className="flex items-end gap-2">
        <span className="text-2xl font-semibold text-gray-900 dark:text-white">
          {amount.toLocaleString()}
        </span>
        <span className="text-gray-500 text-sm">{currencySymbol}</span>
      </div>
    </div>
  );
};
