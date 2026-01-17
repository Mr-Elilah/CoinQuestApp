import React from "react";
import LeftCardWrapper from "./LeftCardWrapper";
import Image from "next/image";
import { Progress } from "../domain/progress";

export interface ProgressCardProps {
  progress: Progress;
  goalProgress: number;
}

export default function ProgressCard(
  progress,
  goalProgress,
): ProgressCardProps {
  return (
    <LeftCardWrapper title="Прогресс">
      <div className="flex flex-col gap-6">
        {/* Монеты */}
        <div className="flex items-center gap-8">
          <Image
            src="/icons/coins-wallet.png"
            alt="coins"
            width={44}
            height={44}
          />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Image
                src="/icons/gold-coin.png"
                alt="gold"
                width={30}
                height={30}
              />
              <span>{progress.gold}</span>
            </div>

            <div className="flex items-center gap-1">
              <Image
                src="/icons/silver-coin.png"
                alt="Silver"
                width={30}
                height={30}
              />
              <span>{progress.silver}</span>
            </div>

            <div className="flex items-center gap-1">
              <Image
                src="/icons/gold-coin.png"
                alt="Copper"
                width={30}
                height={30}
              />
              <span>{progress.copper}</span>
            </div>
          </div>
        </div>

        {/* Опыт     */}
        <div className="flex items-center gap-8">
          <Image src="/icons/xp-icon.png" alt="XP" width={48} height={48} />
          <div className="flex-1 h-3 bg-orange-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500"
              style={{ width: `${progress.xpProgress * 100}%` }}
            />
          </div>
        </div>

        {/* Уроки   */}

        <div className="flex items-center gap-8">
          <Image
            src="/icons/lessons-icon.png"
            alt="Lessons"
            width={48}
            height={48}
          />

          <div className="flex gap-1 flex-1">
            {Array.from({ length: progress.lessonsTotal }).map((_, i) => (
              <div
                key={i}
                className={`lesson-block ${
                  i < progress.lessonsCompleted
                    ? "bg-green-600"
                    : "bg-green-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Цель   */}

        <div className="flex items-center gap-8">
          <Image
            src="/icons/target-icon.png"
            alt="Target"
            width={44}
            height={44}
          />
          <div className="flex-1 h-3 bg-blue-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600"
              style={{ width: `${goalProgress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </LeftCardWrapper>
  );
}
