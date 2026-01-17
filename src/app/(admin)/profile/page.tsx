"use client";

import { useEffect, useState } from "react";
import AboutCard from "@/src/components/AboutCard";
import AchievementsCard from "@/src/components/AchievementsCard";
import IncomeSourcesCard from "@/src/components/IncomeSourcesCard";
import MainTitle from "@/src/components/MainTitle";
import ParticipantCard from "@/src/components/ParticipantCard";
import ProgressCard from "@/src/components/ProgressCard";
import ResourcesCard from "@/src/components/ResourcesCard";
import BalanceChart from "@/src/components/BalanceChart";
import { buildMonthlyData, buildDailyData } from "@/src/utils/chartHelpers";
import { User } from "@/src/domain/user";
import { Achievement } from "@/src/domain/achievement";
import { IncomeSource } from "@/src/domain/source";
import { Resource } from "@/src/domain/resource";

import { getSources } from "@/src/services/source.service";
import { getResources } from "@/src/services/resource.service";
import { getUserAchievements } from "@/src/services/achievement.service";
import { getCurrentUser } from "@/src/services/user.service";
import { Goal, Payment } from "@/src/domain/finance";
import {
  getUserGoal,
  getUserPayments,
  calculateTotal,
  calculateProgressPercent,
} from "@/src/services/finance.service";
import { Progress } from "@/src/domain/progress";
import { getUserProgress } from "@/src/services/progress.service";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [incomeSources, setIncomeSources] = useState<IncomeSource[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [progress, setProgress] = useState<Progress | null>(null);

  useEffect(() => {
    getCurrentUser().then(setUser);
    getUserAchievements().then(setAchievements);
    getSources().then(setIncomeSources);
    getResources().then(setResources);
    getUserGoal().then(setGoal);
    getUserPayments().then(setPayments);
    getUserProgress().then(setProgress);
  }, []);

  if (!user || !goal || !progress) return null;

  const total = calculateTotal(payments);
  const daily = buildDailyData(payments);
  const monthly = buildMonthlyData(payments);
  const progressPercent = calculateProgressPercent(total, goal);

  return (
    <main className="p-10">
      <MainTitle id="profileTitle" />
      <div className="grid grid-cols-12 gap-4">
        {/* ЛЕВАЯ КОЛОНКА */}
        <div className="col-span-3 space-y-6">
          <ParticipantCard user={user} />
          <AchievementsCard achievements={achievements} />
          <ProgressCard progress={progress} goalProgress={progressPercent} />
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
            goalAmount={goal.targetAmount}
            progressPercent={progressPercent}
          />
        </div>
      </div>
    </main>
  );
}
