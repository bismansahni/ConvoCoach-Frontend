"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CreditUsageProps {
  totalCredits: number;
  usedCredits: number;
  className?: string;
}

export function CreditUsage({
  totalCredits,
  usedCredits,
  className,
}: CreditUsageProps) {
  const [progress, setProgress] = useState(0);
  const remainingCredits = totalCredits - usedCredits;
  const percentage = (remainingCredits / totalCredits) * 100;

  useEffect(() => {
    const timer = setTimeout(() => setProgress(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  // Using the original colors as specified
  const COLORS = ["#FF0000", "#00FF00"];

  return (
    <Card className={cn("bg-background/5 border-0", className)}>
      <CardContent className="p-4">
        <div className="relative flex flex-col items-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-muted/20"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
              <motion.circle
                stroke={COLORS[1]}
                strokeWidth="10"
                strokeLinecap="round"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
                initial={{ strokeDasharray: "0 251.2" }}
                animate={{
                  strokeDasharray: `${percentage * 2.512} 251.2`,
                }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <motion.span
                className="text-3xl font-bold"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {remainingCredits}
              </motion.span>
              <motion.div
                className="text-xs text-muted-foreground mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                credits left
              </motion.div>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: COLORS[0] }}
              ></div>
              <span className="text-muted-foreground">Remaining</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Used</span>
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: COLORS[1] }}
              ></div>
            </div>
          </div>
          
        </div>
      </CardContent>
    </Card>
  );
}
