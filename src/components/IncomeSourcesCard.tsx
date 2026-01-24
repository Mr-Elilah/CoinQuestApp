import React from "react";
import LeftCardWrapper from "./LeftCardWrapper";
import { IncomeSource } from "@/src/domain/source";
export interface IncomeSourcesCardProps {
  sources: IncomeSource[];
}

export default function IncomeSourcesCard({ sources }: IncomeSourcesCardProps) {
  return (
    <LeftCardWrapper title="Источники">
      <div className="flex flex-wrap justify-center gap-2">
        {sources.map((item) => (
          <span
            key={item.id}
            className="
                  py-2 px-3 bg-gray-200 dark:bg-blue-600 dark:text-gray-300 rounded-md text-xs text-gray-700 font-semibold cursor-pointer transition hover:bg-blue-600 hover:text-white"
          >
            {item.label}
          </span>
        ))}
      </div>
    </LeftCardWrapper>
  );
}
