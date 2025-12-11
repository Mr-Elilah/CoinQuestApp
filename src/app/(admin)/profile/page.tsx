"use client";

import AboutCard from "@/src/components/AboutCard";
import AchievementsCard from "@/src/components/AchievementsCard";
import IncomeSourcesCard from "@/src/components/IncomeSourcesCard";
import MainTitle from "@/src/components/MainTitle";
import ParticipantCard from "@/src/components/ParticipantCard";
import ProgressCard from "@/src/components/ProgressCard";
import ResourcesCard from "@/src/components/ResourcesCard";

export default function ProfilePage() {
  const mockUser = {
    name: "Пирс Броссман",
    age: 72,
    profession: "Актер",
    avatar: "/images/pierce-avatar.webp",
    birthPlace: "Лос-Анджелес, США",
    currentLocation: "Нью-Йорк, США",
    job: "NBC",
  };

  const mockAchievements = [
    { id: 1, title: "1-й уровень", icon: "/icons/LvL.png" },
    { id: 2, title: "Первая цель", icon: "/icons/goal-set.jpg" },
    { id: 3, title: "Первые сбережения", icon: "/icons/saving.png" },
  ];

  const mockSources = [
    { id: 1, label: "Работа" },
    { id: 2, label: "Гос. выплаты" },
    { id: 3, label: "Дивиденды" },
    { id: 4, label: "Проценты" },
    { id: 5, label: "Рента" },
    { id: 6, label: "Роялти" },
    { id: 7, label: "Бизнес" },
    {
      id: 8,
      label: "Интернет-активность",
      icon: "/icons/source-internet.png",
    },
    { id: 9, label: "Природные источники", icon: "/icons/source-nature.png" },
  ];

  const mockResources = [
    { id: 1, label: "Binance", url: "https://www.binance.com" },
    { id: 2, label: "Bybit", url: "https://www.bybit.com" },
    { id: 3, label: "CapTrader", url: "https://www.captrader.com" },
    { id: 4, label: "Forex", url: "https://www.forex.com" },
  ];

  return (
    <main className="p-10">
      <MainTitle id="profileTitle" />
      <div className="grid grid-cols-12 gap-4">
        {/* ЛЕВАЯ КОЛОНКА */}
        <div className="col-span-3 space-y-6">
          <ParticipantCard
            name={mockUser.name}
            age={mockUser.age}
            profession={mockUser.profession}
            avatar={mockUser.avatar}
          />
          <AchievementsCard achievements={mockAchievements} />
          <ProgressCard />
          <IncomeSourcesCard sources={mockSources} />
          <AboutCard
            birthPlace={mockUser.birthPlace}
            job={mockUser.job}
            currentLocation={mockUser.currentLocation}
          />
          <ResourcesCard resources={mockResources} />
        </div>

        <div className="col-span-9 space-y-4">{/* ПРАВАЯ КОЛОНКА */}</div>
      </div>
    </main>
  );
}
