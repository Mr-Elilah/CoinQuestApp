"use client";

import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import LeftCardWrapper from "./LeftCardWrapper";

// Тип данных для графика
interface ChartPoint {
  month: string;
  value: number | null;
}

// Все 12 месяцев
const months = [
  "Янв",
  "Фев",
  "Мар",
  "Апр",
  "Май",
  "Июн",
  "Июл",
  "Авг",
  "Сен",
  "Окт",
  "Ноя",
  "Дек",
];

// Реальные данные
const mockData: ChartPoint[] = [
  { month: "Янв", value: 40 },
  { month: "Фев", value: 480 },
  { month: "Мар", value: 360 },
  { month: "Апр", value: 820 },
  { month: "Май", value: 610 },
  { month: "Июн", value: 1200 },
];

export default function UserBalanceChart() {
  const [chartData, setChartData] = useState<ChartPoint[]>(
    months.map((m) => ({ month: m, value: null }))
  );

  // Флаг, чтобы рендерить график только на клиенте
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      const point = mockData[i];
      if (point) {
        setChartData((prev) =>
          prev.map((item) =>
            item.month === point.month ? { ...item, value: point.value } : item
          )
        );
        i++;
      } else {
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  if (!isClient) return null; // Не рендерим на сервере

  return (
    <LeftCardWrapper title="Путь к цели">
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 40, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorMain" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />

            <XAxis
              dataKey="month"
              tick={{ fill: "#888" }}
              axisLine={{ stroke: "#333" }}
            />
            <YAxis
              tick={{ fill: "#888", fontSize: 12 }}
              axisLine={{ stroke: "#333" }}
              width={55}
            />

            <Tooltip
              contentStyle={{
                background: "#1f2937",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="none"
              fill="url(#colorMain)"
              connectNulls={false}
            />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{
                stroke: "#3b82f6",
                strokeWidth: 2,
                r: 4,
                fill: "transparent",
              }}
              activeDot={{ r: 6 }}
              isAnimationActive={true}
              animationDuration={800}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </LeftCardWrapper>
  );
}
