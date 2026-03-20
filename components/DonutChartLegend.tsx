"use client";

import { useDonutChartData } from "./data";
import { DonutChart } from "./DonatChart";
import { ImprovedPrompt } from "./ImprovedPrompt";
import PointDiscription from "./PointDiscription";
import Summary from "./Summary";
import TotalScore from "./TotalScore";
import { motion } from "motion/react";

export function DonutChartLegend() {
  const { improvedPrompt, improvedSuggestions, rawSuggestions, chartData } = useDonutChartData();

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4">
      {/* Top row: chart + score */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 w-full">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full lg:flex-1"
        >
          <DonutChart data={chartData} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full lg:w-auto flex justify-center"
        >
          <TotalScore />
        </motion.div>
      </div>

      {/* Bottom row: legend + suggestions + improved prompt */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex flex-col md:flex-row justify-around items-start gap-6 mt-4 pb-12"
      >
        <PointDiscription />
        <div className="flex flex-col w-full max-w-2xl">
          <Summary improvedSuggestions={improvedSuggestions} rawSuggestions={rawSuggestions} />
          <ImprovedPrompt improvedPrompt={improvedPrompt} />
        </div>
      </motion.div>
    </div>
  );
}
