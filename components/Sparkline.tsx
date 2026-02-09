"use client";

import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface SparklineProps {
  data: number[];
  width?: number | string;
  height?: number;
  showTooltip?: boolean;
}

export function Sparkline({
  data,
  width = 100,
  height = 32,
  showTooltip = true,
}: SparklineProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chartData = data.map((value, index) => ({
    day: index + 1,
    value,
  }));

  // Lime accent color for the new design
  const accentColor = mounted && resolvedTheme === "light" ? "#a8d900" : "#c8ff00";
  const tooltipBg = mounted && resolvedTheme === "light" ? "#FAFAF9" : "#1a1a1e";
  const tooltipBorder = mounted && resolvedTheme === "light" ? "#E5E5E3" : "#27272d";
  const tooltipText = mounted && resolvedTheme === "light" ? "#18181B" : "#ededeb";

  return (
    <div style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`sparklineGradient-${mounted ? resolvedTheme : 'dark'}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accentColor} stopOpacity={0.4} />
              <stop offset="50%" stopColor={accentColor} stopOpacity={0.15} />
              <stop offset="100%" stopColor={accentColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          {showTooltip && (
            <Tooltip
              contentStyle={{
                background: tooltipBg,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: "8px",
                fontSize: "12px",
                padding: "6px 10px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                color: tooltipText,
              }}
              labelStyle={{ display: "none" }}
              formatter={(value) => [`${(value as number).toLocaleString()} txns`, ""]}
            />
          )}
          <Area
            type="monotone"
            dataKey="value"
            stroke={accentColor}
            strokeWidth={1.5}
            fill={`url(#sparklineGradient-${mounted ? resolvedTheme : 'dark'})`}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
