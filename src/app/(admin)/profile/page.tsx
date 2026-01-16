"use client";

import AboutCard from "@/src/components/AboutCard";
import AchievementsCard from "@/src/components/AchievementsCard";
import IncomeSourcesCard from "@/src/components/IncomeSourcesCard";
import MainTitle from "@/src/components/MainTitle";
import ParticipantCard from "@/src/components/ParticipantCard";
import ProgressCard from "@/src/components/ProgressCard";
import ResourcesCard from "@/src/components/ResourcesCard";
import BalanceChart from "@/src/components/BalanceChart";
import { mockPayments } from "@/src/data/mockPayments";
import {
  getTotal,
  buildMonthlyData,
  buildDailyData,
} from "@/src/utils/chartHelpers";
import { User } from "@/src/domain/user";
import { Achievement } from "@/src/domain/achievement";

import { getUserAchievements } from "@/src/services/achievement.service";
import { getCurrentUser } from "@/src/services/user.service";
import { useEffect, useState } from "react";

import { IncomeSource } from "@/src/domain/source";
import { getSources } from "@/src/services/source.service";
import { Resource } from "@/src/domain/resource";
import { getResources } from "@/src/services/resource.service";

export default function ProfilePage() {
  const GOAL_AMOUNT = 30_000;

  const [user, setUser] = useState<User | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [incomeSources, setIncomeSources] = useState<IncomeSource[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    getCurrentUser().then(setUser);
    getUserAchievements().then(setAchievements);
    getSources().then(setIncomeSources);
    getResources().then(setResources);
  }, []);

  if (!user) return null;

  const daily = buildDailyData(mockPayments);
  const monthly = buildMonthlyData(mockPayments);
  const total = getTotal(mockPayments);

  return (
    <main className="p-10">
      <MainTitle id="profileTitle" />
      <div className="grid grid-cols-12 gap-4">
        {/* ЛЕВАЯ КОЛОНКА */}
        <div className="col-span-3 space-y-6">
          <ParticipantCard user={user} />
          <AchievementsCard achievements={achievements} />
          <ProgressCard />
          <IncomeSourcesCard sources={incomeSources} />
          <AboutCard user={user} />
          <ResourcesCard resources={resources} />
        </div>

        <div className="col-span-9 space-y-4">
          {/* ПРАВАЯ КОЛОНКА */}

          <BalanceChart
            title="Путь к цели"
            points={daily}
            currentTotal={total}
            goalAmount={GOAL_AMOUNT}
          />
        </div>
      </div>
    </main>
  );
}
