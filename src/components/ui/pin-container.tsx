"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PinContainerProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  containerClassName?: string;
}

export function PinContainer({
  children,
  title,
  className,
  containerClassName,
}: PinContainerProps) {
  const [transform, setTransform] = useState(
    "translate(-50%,-50%) rotateX(0deg)"
  );

  const onMouseEnter = () => {
    setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)");
  };
  const onMouseLeave = () => {
    setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
  };

  return (
    <div
      className={cn(
        "relative group/pin z-50 cursor-pointer",
        containerClassName
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        style={{
          perspective: "1000px",
          transform: "rotateX(70deg) translateZ(0deg)",
        }}
        className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
      >
        <div
          style={{
            transform: transform,
          }}
          className="absolute left-1/2 p-4 top-1/2 flex justify-start items-start rounded-2xl shadow-[0_8px_32px_rgb(0_0_0/0.5)] bg-black border border-white/[0.1] group-hover/pin:border-white/[0.2] transition duration-700 overflow-hidden"
        >
          <div className={cn("relative z-50", className)}>{children}</div>
        </div>
      </div>
      <PinPerspective title={title} />
    </div>
  );
}

function PinPerspective({ title }: { title?: string }) {
  return (
    <motion.div className="pointer-events-none w-[500px] h-[650px] flex items-center justify-center opacity-0 group-hover/pin:opacity-100 z-[60] transition duration-500">
      <div className="w-full h-full -mt-7 flex-none inset-0">
        <div className="absolute top-0 inset-x-0 flex justify-center">
          <div className="relative flex items-center z-10 rounded-full bg-zinc-950 py-2 px-6 ring-1 ring-white/10">
            <span className="text-white text-lg font-bold">{title}</span>
          </div>
        </div>

        <div
          style={{
            perspective: "1000px",
            transform: "rotateX(70deg) translateZ(0)",
          }}
          className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
        >
          <>
            {[0, 2, 4].map((delay) => (
              <motion.div
                key={delay}
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: "-50%",
                  y: "-50%",
                }}
                animate={{
                  opacity: [0, 1, 0.5, 0],
                  scale: 1,
                  z: 0,
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: delay,
                }}
                className="absolute left-1/2 top-1/2 h-[15rem] w-[15rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
              ></motion.div>
            ))}
          </>
        </div>

        <div className="absolute right-1/2 bottom-1/2">
          <motion.div className="h-40 w-px bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] group-hover/pin:h-60" />
          <motion.div className="h-[4px] w-[4px] rounded-full bg-cyan-600 translate-x-[1.5px] translate-y-[14px] blur-[3px]" />
          <motion.div className="h-[2px] w-[2px] rounded-full bg-cyan-300 translate-x-[0.5px] translate-y-[14px]" />
        </div>
      </div>
    </motion.div>
  );
}
