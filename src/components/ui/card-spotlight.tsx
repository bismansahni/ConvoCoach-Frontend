// components/ui/card-spotlight.tsx
"use client";

import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React, {
  MouseEvent as ReactMouseEvent,
  useState,
  Suspense,
} from "react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

// Dynamically import the CanvasRevealEffect with no SSR
const CanvasRevealEffect = dynamic(
  () =>
    import("@/components/ui/canvas-reveal-effect").then(
      (mod) => mod.CanvasRevealEffect
    ),
  { ssr: false }
);

export const CardSpotlight = ({
  children,
  radius = 350,
  color = "#262626",
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return (
    <div
      className={cn(
        "group/spotlight relative rounded-md border border-neutral-800 bg-black dark:border-neutral-800 p-10",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 rounded-md opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          backgroundColor: color,
          maskImage: useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, white, transparent 80%)`,
          WebkitMaskImage: useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, white, transparent 80%)`,
        }}
      >
        {isHovering && (
          <Suspense fallback={null}>
            <CanvasRevealEffect
              animationSpeed={0.4}
              containerClassName="bg-transparent absolute inset-0 pointer-events-none"
              colors={[
                [59, 130, 246],
                [139, 92, 246],
              ]}
              dotSize={3}
              showGradient={false}
            />
          </Suspense>
        )}
      </motion.div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};
