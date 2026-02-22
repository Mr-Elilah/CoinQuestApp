import React from "react";
import LeftCardWrapper from "./LeftCardWrapper";
import Image from "next/image";
import { Progress } from "../domain/progress";
import ProgressBar from "./ProgressBar";

export interface ProgressCardProps {
  progress: Progress;
  goalProgress: number;
}

const COIN_DATA = [
  { key: "gold", icon: "/icons/gold-coin.png", alt: "gold" },
  { key: "silver", icon: "/icons/silver-coinh.png", alt: "silver" },
  { key: "copper", icon: "/icons/copper-coin.png", alt: "copper" },
] as const;

export default function ProgressCard({
  progress,
  goalProgress,
}: ProgressCardProps) {
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
            {COIN_DATA.map((coin) => (
              <div key={coin.key} className="flex items-center gap-1">
                <Image src={coin.icon} alt={coin.alt} width={30} height={30} />
                <span>{progress[coin.key]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Опыт     */}
        <div className="flex items-center gap-8">
          <Image src="/icons/xp-icon.png" alt="XP" width={48} height={48} />

          <ProgressBar
            value={progress.xpProgress * 100}
            trackClassName="bg-orange-200"
            colorClassName="bg-orange-500"
          />
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
          <ProgressBar
            value={goalProgress}
            trackClassName="bg-blue-200"
            colorClassName="bg-blue-600"
          />
        </div>
      </div>
    </LeftCardWrapper>
  );
}
