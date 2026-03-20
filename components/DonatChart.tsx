"use client";

import { useMemo } from "react";
import * as d3 from "d3";
import { useDonutChartData } from "./data";
import DonutSlice from "./DonutSlice";
import { DonutChartProps } from "@/src/types/types";
import { DataItem } from "@/src/types/types";

const INNER_WIDTH = 960;
const INNER_HEIGHT = 520;
const MARGIN_X = 240;
const MARGIN_Y = 100;

export const DonutChart = ({ data }: Pick<DonutChartProps, "data">) => {
  const { totalScore } = useDonutChartData();

  const radius = Math.min(INNER_WIDTH - 2 * MARGIN_X, INNER_HEIGHT - 2 * MARGIN_Y) / 2;
  const innerRadius = radius / 1.8;

  const pie = useMemo(() => {
    const pieGenerator = d3.pie<DataItem>().value((d) => d.value);
    return pieGenerator(data);
  }, [data]);

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[320px]">
        <svg
          viewBox={`0 0 ${INNER_WIDTH} ${INNER_HEIGHT}`}
          width="100%"
          height="auto"
          className="bg-white rounded-2xl p-4"
          style={{ overflow: "visible", maxWidth: INNER_WIDTH }}
        >
          <g transform={`translate(${INNER_WIDTH / 2}, ${INNER_HEIGHT / 2})`}>
            {pie.map((grp, i) => (
              <DonutSlice
                key={i}
                grp={grp}
                i={i}
                radius={radius}
                innerRadius={innerRadius}
              />
            ))}
            <text
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={28}
              fontWeight={700}
              fill="#111827"
            >
              {totalScore}
            </text>
            <text
              textAnchor="middle"
              dominantBaseline="middle"
              dy={36}
              fontSize={12}
              fill="#6b7280"
            >
              / 5.0
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};
