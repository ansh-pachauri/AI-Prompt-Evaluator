"use client";
import { motion } from "motion/react";
import React from "react";

export const LoaderOne = () => {
  const transition = (x: number) => ({
    duration: 1,
    repeat: Infinity,
    repeatType: "loop" as const,
    delay: x * 0.2,
    ease: "easeInOut" as const,
  });

  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ y: 0 }}
          animate={{ y: [0, 10, 0] }}
          transition={transition(i)}
          className="h-3 w-3 rounded-full bg-linear-to-b from-violet-400 to-fuchsia-500 shadow-[0_0_8px_rgba(139,92,246,0.5)]"
        />
      ))}
    </div>
  );
};

export const LoaderTwo = () => {
  const transition = (x: number) => ({
    duration: 2,
    repeat: Infinity,
    repeatType: "loop" as const,
    delay: x * 0.2,
    ease: "easeInOut" as const,
  });

  return (
    <div className="flex items-center">
      <motion.div
        transition={transition(0)}
        initial={{ x: 0 }}
        animate={{ x: [0, 20, 0] }}
        className="h-4 w-4 rounded-full bg-zinc-700 shadow-md"
      />
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: [0, 20, 0] }}
        transition={transition(0.4)}
        className="h-4 w-4 -translate-x-2 rounded-full bg-zinc-700 shadow-md"
      />
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: [0, 20, 0] }}
        transition={transition(0.8)}
        className="h-4 w-4 -translate-x-4 rounded-full bg-zinc-700 shadow-md"
      />
    </div>
  );
};
