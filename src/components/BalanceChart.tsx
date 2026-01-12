"use client";

import React from "react";
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

import LeftCardWrapper from "@/src/components/LeftCardWrapper";
import { ChartPoint } from "@/src/utils/chartHelpers";

interface Props {
  title: string;
  data: ChartPoint[];
  total: number;
}

export default function BalanceChart({
  title,
  data,
  total,
}: Props): React.ReactElement {
  // Берём только последние 10 накопленных точек
  const last10 = data.slice(-10);
  const offset = data.length - last10.length;

  const visible = last10.map((item, index) => ({
    ...item,
    label: `Шаг ${offset + index + 1}`,
  }));

  return (
    <LeftCardWrapper title={title}>
      <div className="relative w-full h-64">
        <div className="absolute top-2 right-2 text-sm text-gray-400">
          Итого:
          <span className="ml-1 font-semibold text-white">
            {total.toLocaleString()} €
          </span>
        </div>

        <ResponsiveContainer>
          <LineChart data={visible} margin={{ top: 30, right: 40 }}>
            <defs>
              <linearGradient id="balance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis dataKey="label" />
            <YAxis width={60} />
            <Tooltip />

            <Area dataKey="value" fill="url(#balance)" stroke="none" />

            <Line
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{
                r: 4,
                stroke: "#3b82f6",
                strokeWidth: 2,
                fill: "#fff",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </LeftCardWrapper>
  );
}
