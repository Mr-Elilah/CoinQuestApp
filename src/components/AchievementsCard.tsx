import React from "react";
import Image from "next/image";
import LeftCardWrapper from "./LeftCardWrapper";
import { Achievement } from "@/src/domain/achievement";

export interface AchievementsCardProps {
  achievements: Achievement[];
}

export default function AchievementsCard({
  achievements,
}: AchievementsCardProps) {
  return (
    <LeftCardWrapper title="Достижения">
      <div className="grid grid-cols-3 gap-4 text-center">
        {achievements.map((ach) => (
          <div key={ach.id} className="flex flex-col items-center">
            <div className="relative w-8 h-8 mb-2">
              <Image
                src={ach.iconUrl}
                alt={ach.title}
                fill
                className="object-contain"
              />
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300">
              {ach.title}
            </p>
          </div>
        ))}
      </div>
    </LeftCardWrapper>
  );
}
