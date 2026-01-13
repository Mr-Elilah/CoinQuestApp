// src/components/BalanceChart.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  LineChart as ReLineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import type {
  Payload,
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import LeftCardWrapper from "./LeftCardWrapper";

interface IncomingPoint {
  label: string; // дата
  value: number;
}

interface ChartDotProps {
  cx?: number;
  cy?: number;
  value?: number | null;
}

interface SlotPoint {
  stepLabel: string;
  realLabel: string;
  value: number | null;
}

// 🔥 Моковая цель пользователя
const GOAL_AMOUNT = 30000;

export default function BalanceChart({
  title = "Balance",
  data = [],
}: {
  title?: string;
  data: IncomingPoint[];
}) {
  const SLOTS = 10;

  const baseSlots: SlotPoint[] = useMemo(() => {
    const last = data.slice(-SLOTS);
    const placeholdersCount = Math.max(0, SLOTS - last.length);

    const filled: SlotPoint[] = last.map((d, i) => ({
      stepLabel: `Шаг ${i + 1}`,
      realLabel: d.label,
      value: d.value,
    }));

    const placeholders: SlotPoint[] = Array.from({
      length: placeholdersCount,
    }).map((_, i) => ({
      stepLabel: `Шаг ${filled.length + i + 1}`,
      realLabel: "",
      value: null,
    }));

    return [...filled, ...placeholders];
  }, [data]);

  const realCount = useMemo(
    () => baseSlots.filter((s) => s.value !== null).length,
    [baseSlots]
  );

  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);
    if (realCount === 0) return;

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleCount(i);
      if (i >= realCount) clearInterval(interval);
    }, 180);

    return () => clearInterval(interval);
  }, [realCount]);

  const chartData = useMemo(() => {
    return baseSlots.map((slot, idx) => {
      const shouldShow = idx < visibleCount && slot.value !== null;

      return {
        stepLabel: slot.stepLabel,
        realLabel: slot.realLabel,
        value: shouldShow ? slot.value : null,
      };
    });
  }, [baseSlots, visibleCount]);

  // 👉 Текущая сумма = последнее реальное значение
  const currentTotal = useMemo(() => {
    const last = data[data.length - 1];
    return last ? last.value : 0;
  }, [data]);

  const GOAL_AMOUNT = 30000;

  const progressPercent = useMemo(() => {
    return (currentTotal / GOAL_AMOUNT) * 100;
  }, [currentTotal]);

  const CustomDot = ({ cx, cy, value }: ChartDotProps) => {
    if (value == null || cx == null || cy == null) return null;

    return (
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill="#ffffff"
        stroke="#3b82f6"
        strokeWidth={2}
      />
    );
  };

  function isSlotPoint(value: unknown): value is SlotPoint {
    return (
      typeof value === "object" &&
      value !== null &&
      "realLabel" in value &&
      "stepLabel" in value
    );
  }

  const tooltipLabelFormatter = (
    _: unknown,
    payload: readonly Payload<ValueType, NameType>[]
  ) => {
    const raw = payload?.[0]?.payload;
    if (isSlotPoint(raw)) return raw.realLabel;
    return "";
  };

  return (
    <LeftCardWrapper title={title}>
      <div className="relative" style={{ width: "100%", height: 320 }}>
        {/* 🔥 Индикатор цели — внутри чарта */}
        <div className="absolute -top-10 right-4 z-10 text-sm text-gray-700">
          <div className="relative group inline-block">
            <span className="font-semibold text-gray-900 cursor-default">
              {currentTotal.toLocaleString()}
            </span>

            {/* Tooltip */}
            <div className="pointer-events-none absolute right-0 top-full mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                {progressPercent.toFixed(1)}%
              </div>
            </div>
          </div>

          <span className="mx-1">/</span>
          <span className="text-gray-500">{GOAL_AMOUNT.toLocaleString()}</span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <ReLineChart
            data={chartData}
            margin={{ top: 24, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="balColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" opacity={0.08} />

            <XAxis
              dataKey="stepLabel"
              tick={{ fill: "#888", fontSize: 12 }}
              axisLine={{ stroke: "#333" }}
              tickLine={false}
              interval={0}
            />

            <YAxis
              tick={{ fill: "#888", fontSize: 12 }}
              axisLine={{ stroke: "#333" }}
              width={70}
            />

            <Tooltip
              formatter={(value) =>
                value == null ? [] : [value, "Сумма" as NameType]
              }
              labelFormatter={tooltipLabelFormatter}
              contentStyle={{
                background: "#1f2937",
                border: "none",
                borderRadius: 8,
                color: "#fff",
              }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="none"
              fill="url(#balColor)"
              connectNulls={false}
              isAnimationActive={false}
            />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={CustomDot}
              activeDot={{ r: 6 }}
              isAnimationActive
              animationDuration={700}
              connectNulls={false}
            />
          </ReLineChart>
        </ResponsiveContainer>
      </div>
    </LeftCardWrapper>
  );
}
