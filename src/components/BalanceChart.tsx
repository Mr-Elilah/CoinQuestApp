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
import { ChartPoint } from "../utils/chartHelpers";
import TooltipUi from "./ui/TooltipUi";
/* ===================== TYPES ===================== */

interface SlotPoint {
  stepLabel: string;
  realLabel: string;
  value: number | null;
}

interface BalanceChartProps {
  title: React.ReactNode;
  points: ChartPoint[];
  currentTotal: number;
  goalAmount: number;
  progressPercent: number;
}

/* ===================== COMPONENT ===================== */

export default function BalanceChart({
  title,
  points,
  currentTotal,
  goalAmount,
  progressPercent,
}: BalanceChartProps) {
  const SLOTS = 10;

  /* ---------- slots ---------- */

  const baseSlots: SlotPoint[] = useMemo(() => {
    const last = points.slice(-SLOTS);
    const placeholdersCount = Math.max(0, SLOTS - last.length);

    const filled = last.map((p, i) => ({
      stepLabel: `Шаг ${i + 1}`,
      realLabel: p.label,
      value: p.value,
    }));

    const placeholders = Array.from({ length: placeholdersCount }).map(
      (_, i) => ({
        stepLabel: `Шаг ${filled.length + i + 1}`,
        realLabel: "",
        value: null,
      }),
    );

    return [
      {
        stepLabel: "",
        realLabel: "",
        value: 0,
      },
      ...filled,
      ...placeholders,
    ];
  }, [points]);

  /* ---------- animation ---------- */

  const realCount = useMemo(
    () => baseSlots.filter((s) => s.value !== null).length,
    [baseSlots],
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
    return baseSlots.map((slot, idx) => ({
      ...slot,
      value: idx < visibleCount ? slot.value : null,
    }));
  }, [baseSlots, visibleCount]);

  /* ---------- helpers ---------- */

  function isSlotPoint(value: unknown): value is SlotPoint {
    return typeof value === "object" && value !== null && "realLabel" in value;
  }

  const tooltipLabelFormatter = (
    _: unknown,
    payload: readonly Payload<ValueType, NameType>[],
  ) => {
    const raw = payload?.[0]?.payload;
    return isSlotPoint(raw) ? raw.realLabel : "";
  };

  const yMax = useMemo(() => {
    if (goalAmount === 0) return undefined;

    const padding = goalAmount * 0.01;
    const softMax = currentTotal + padding;

    return Math.min(goalAmount, softMax);
  }, [currentTotal, goalAmount]);
  /* ===================== RENDER ===================== */

  return (
    <LeftCardWrapper title={title}>
      <div className="relative w-full h-[320px]">
        {/* top-right summary */}
        <div className="absolute -top-2 right-4 z-10 text-sm text-gray-700">
          <TooltipUi content={`${progressPercent.toFixed(1)}%`}>
            <span className="font-semibold text-gray-900 cursor-default">
              {currentTotal.toLocaleString()}
            </span>
          </TooltipUi>
          <span className="text-gray-500">
            {" "}
            / {goalAmount.toLocaleString()}
          </span>
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
              tickLine={false}
              interval={0}
            />

            <YAxis
              domain={yMax ? [0, yMax] : undefined}
              tick={{ fill: "#888", fontSize: 12 }}
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
              dot={({ cx, cy, value }) =>
                value == null || cx == null || cy == null ? null : (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={4}
                    fill="#fff"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                )
              }
              activeDot={{ r: 6 }}
              animationDuration={700}
              connectNulls={false}
            />
          </ReLineChart>
        </ResponsiveContainer>
      </div>
    </LeftCardWrapper>
  );
}
