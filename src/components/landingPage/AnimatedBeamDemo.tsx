"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface BeamProps {
  delay?: number;
  width?: string;
  className?: string;
}

const Beam = ({ delay = 0, width = "80%", className }: BeamProps) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "h-2 rounded-lg",
        isDarkMode
          ? "bg-gradient-to-r from-blue-700 via-indigo-500 to-blue-600"
          : "bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-500",
        className
      )}
      style={{ width }}
    >
      <div
        className={cn(
          "h-full w-full animate-pulse rounded-lg",
          isDarkMode
            ? "bg-gradient-to-r from-blue-700/50 via-indigo-500/50 to-blue-600/50"
            : "bg-gradient-to-r from-blue-600/50 via-indigo-500/50 to-blue-500/50"
        )}
      />
    </motion.div>
  );
};

export function AnimatedBeamDemo({ className }: { className?: string }) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <div
      className={cn(
        "relative flex flex-col space-y-4 overflow-hidden rounded-lg p-4 backdrop-blur-sm",
        isDarkMode ? "bg-white/5" : "bg-gray-100/50",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative flex flex-col space-y-4"
      >
        <Beam delay={0} width="80%" />
        <Beam delay={0.2} width="65%" />
        <Beam delay={0.4} width="70%" />
        <Beam delay={0.6} width="55%" />
        <Beam delay={0.8} width="75%" />
        {/* Feedback indicators */}
        <div className="mt-6 flex justify-between">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="flex items-center space-x-2"
          >
            <div
              className={cn(
                "h-3 w-3 rounded-full animate-pulse",
                isDarkMode ? "bg-blue-700" : "bg-blue-600"
              )}
            />
            <div
              className={cn(
                "h-3 w-3 rounded-full animate-pulse delay-75",
                isDarkMode ? "bg-indigo-500" : "bg-indigo-400"
              )}
            />
            <div
              className={cn(
                "h-3 w-3 rounded-full animate-pulse delay-150",
                isDarkMode ? "bg-blue-600" : "bg-blue-500"
              )}
            />
          </motion.div>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className={cn(
              "text-sm",
              isDarkMode ? "text-gray-400" : "text-gray-600"
            )}
          >
            Real-time analysis...
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
