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
import { ChartMode } from "../types/chart";
/* ===================== TYPES ===================== */

interface SlotPoint {
  stepLabel: string;
  realLabel: string;
  total: number | null;
  amount: number | null;
}

interface BalanceChartProps {
  title: React.ReactNode;
  points: ChartPoint[];
  currentTotal: number;
  goalAmount: number;
  progressPercent: number;
  mode: ChartMode;
  headerCenter?: React.ReactNode;
}

/* ===================== COMPONENT ===================== */

export default function BalanceChart({
  title,
  points,
  currentTotal,
  goalAmount,
  progressPercent,
  mode,
  headerCenter,
}: BalanceChartProps) {
  const SLOTS = 10;

  /* ---------- slots ---------- */

  const baseSlots: SlotPoint[] = useMemo(() => {
    const last = points.slice(-SLOTS);
    const placeholdersCount = Math.max(0, SLOTS - last.length);
    const stepPrefix =
      mode === "steps" ? "Шаг" : mode === "weeks" ? "Неделя" : "Месяц";
    const filled = last.map((p, i) => ({
      stepLabel: `${stepPrefix} \u00A0 ${i + 1}`,
      realLabel: p.label,
      total: p.total,
      amount: p.amount,
    }));

    const placeholders = Array.from({ length: placeholdersCount }).map(
      (_, i) => ({
        stepLabel: `${stepPrefix} \u00A0 ${filled.length + i + 1}`,
        realLabel: "",
        total: null,
        amount: null,
      }),
    );

    return [
      {
        stepLabel: "",
        realLabel: "",
        total: 0,
        amount: null,
      },
      ...filled,
      ...placeholders,
    ];
  }, [points, mode]);

  /* ---------- animation ---------- */

  const realCount = useMemo(
    () => baseSlots.filter((s) => s.total !== null).length,
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
      total: idx < visibleCount ? slot.total : null,
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
    <LeftCardWrapper
      title={
        <div className="relative flex items-center">
          {/* ЛЕВАЯ ЗОНА */}
          <div className="flex-1">{title}</div>

          {/* ЦЕНТР */}
          {headerCenter && (
            <div className="absolute left-1/2 -translate-x-1/2">
              {headerCenter}
            </div>
          )}

          {/* ПРАВАЯ ЗОНА (пусто, но держит баланс) */}
          <div className="flex-1" />
        </div>
      }
    >
      <div className="relative w-full h-[320px]">
        {/* top-right summary */}
        <div className="absolute -top-10 right-4 z-10 text-sm text-gray-700">
          <TooltipUi content={`${progressPercent.toFixed(1)}%`}>
            <span className="font-semibold text-gray-900 dark:text-gray-400 cursor-default pr-1">
              {currentTotal.toLocaleString()}
            </span>
          </TooltipUi>
          <span className="text-gray-500">/ {goalAmount.toLocaleString()}</span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <ReLineChart
            data={chartData}
            margin={{ top: 24, right: 35, left: 0, bottom: 0 }}
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
              minTickGap={12}
              interval={0}
            />

            <YAxis
              domain={yMax ? [0, yMax] : undefined}
              tick={{ fill: "#888", fontSize: 12 }}
              width={55}
            />

            <Tooltip
              formatter={(value, name) => {
                if (value == null) return [];
                const label =
                  name === "amount"
                    ? ("Взнос" as NameType)
                    : ("Сумма" as NameType);
                return [value, label];
              }}
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
              dataKey="amount"
              stroke="none"
              fill="url(#balColor)"
              connectNulls={false}
              isAnimationActive={false}
            />

            <Line
              type="monotone"
              dataKey="total"
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
