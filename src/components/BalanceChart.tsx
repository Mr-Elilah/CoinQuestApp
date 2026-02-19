"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
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

/* ===================== CONSTANT ===================== */

const WINDOW = 10;

const RU_MONTHS = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

function isServiceStartPoint(point?: ChartPoint) {
  if (!point) return false;
  return point.label === "" && point.amount === null && point.total === 0;
}

function getMonthIndexFromRuLabel(label: string) {
  return RU_MONTHS.indexOf(label);
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
  const totalPoints = points.length;
  const hasLeadingStartPoint = isServiceStartPoint(points[0]);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ---------- window start ---------- */

  const [start, setStart] = useState(() =>
    totalPoints > WINDOW ? totalPoints - WINDOW : 0,
  );

  useEffect(() => {
    if (totalPoints > WINDOW) {
      setStart(totalPoints - WINDOW);
    } else {
      setStart(0);
    }
  }, [totalPoints]);

  /* ---------- wheel scroll ---------- */

  useEffect(() => {
    const el = containerRef.current;
    if (!el || totalPoints <= WINDOW) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      setStart((prev) => {
        const next = e.deltaY > 0 ? prev + 1 : prev - 1;
        return Math.max(0, Math.min(next, totalPoints - WINDOW));
      });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [totalPoints]);

  /* ---------- visible slice ---------- */

  const visiblePoints = useMemo(() => {
    if (totalPoints > WINDOW) {
      return points.slice(start, start + WINDOW);
    }
    return points;
  }, [points, start, totalPoints]);

  /* ---------- slots ---------- */

  const baseSlots: SlotPoint[] = useMemo(() => {
    const prefix = mode === "steps" ? "Шаг" : mode === "weeks" ? "Неделя" : "";

    /* ================= CASE: данных > 10 ================= */

    if (totalPoints > WINDOW) {
      return visiblePoints.map((p, i) => ({
        stepLabel:
          mode === "months"
            ? p.label
            : isServiceStartPoint(p)
              ? ""
              : `${prefix} ${start + i + 1 - (hasLeadingStartPoint ? 1 : 0)}`,
        realLabel: p.label,
        total: p.total,
        amount: p.amount,
      }));
    }

    /* ================= CASE: данных ≤ 10 ================= */

    const filled = visiblePoints.map((p, i) => ({
      stepLabel:
        mode === "months"
          ? p.label
          : isServiceStartPoint(p)
            ? ""
            : `${prefix} ${i + 1 - (hasLeadingStartPoint ? 1 : 0)}`,
      realLabel: p.label,
      total: p.total,
      amount: p.amount,
    }));

    /* ВАЖНО: для months убираем служебную стартовую точку,
       иначе при <10 месяцев данные сдвигаются на 1 слот */
    const monthFilled = filled.filter((p) => p.realLabel.trim() !== "");

    const placeholdersCount = WINDOW - filled.length;

    /* ===== MONTHS placeholder generation (calendar-based) ===== */

    if (mode === "months") {
      const lastRealMonthLabel =
        filled
          .map((p) => p.realLabel)
          .filter((label) => label.trim() !== "")
          .at(-1) ?? "";

      const nextStartMonthIndex = getMonthIndexFromRuLabel(lastRealMonthLabel);

      const monthPlaceholders = Array.from({ length: placeholdersCount }).map(
        (_, i) => {
          // если не нашли месяц, просто оставляем пустую подпись
          if (nextStartMonthIndex < 0) {
            return {
              stepLabel: "",
              realLabel: "",
              total: null,
              amount: null,
            };
          }

          const monthIndex = (nextStartMonthIndex + i + 1) % 12;
          return {
            stepLabel: RU_MONTHS[monthIndex],
            realLabel: "",
            total: null,
            amount: null,
          };
        },
      );

      // ВАЖНО: старт/существующие точки остаются 1-в-1 как в данных
      return [...filled, ...monthPlaceholders];
    }

    /* ===== STEPS & WEEKS placeholders ===== */

    const filledRealCount = filled.filter(
      (p) => p.total !== 0 || p.amount !== null,
    ).length;

    const placeholders = Array.from({ length: placeholdersCount }).map(
      (_, i) => ({
        stepLabel: `${prefix} ${filledRealCount + i + 1}`,
        realLabel: "",
        total: null,
        amount: null,
      }),
    );

    // ВАЖНО: не добавляем вторую стартовую точку (она уже может быть в filled)
    return [...filled, ...placeholders];
  }, [visiblePoints, totalPoints, mode, start, points, hasLeadingStartPoint]);

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

  /* ---------- tooltip ---------- */

  const tooltipLabelFormatter = (
    _: unknown,
    payload: readonly Payload<ValueType, NameType>[],
  ) => payload?.[0]?.payload?.realLabel ?? "";

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
          <div className="flex-1">{title}</div>
          {headerCenter && (
            <div className="absolute left-1/2 -translate-x-1/2">
              {headerCenter}
            </div>
          )}
          <div className="flex-1" />
        </div>
      }
    >
      <div ref={containerRef} className="relative w-full h-[320px]">
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
                const label = name === "amount" ? "Взнос" : "Сумма";
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
              connectNulls={false}
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
            />
          </ReLineChart>
        </ResponsiveContainer>
      </div>
    </LeftCardWrapper>
  );
}
