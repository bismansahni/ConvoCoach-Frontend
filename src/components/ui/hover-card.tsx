"use client";

import { useMotionValue, useMotionTemplate, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const generateRandomString = (length: number) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export function HoverCard({ children, className, color = "purple" }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [randomString, setRandomString] = useState("");

  useEffect(() => {
    setRandomString(generateRandomString(1500));
  }, []);

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
    setRandomString(generateRandomString(1500));
  }

  const maskImage = useMotionTemplate`radial-gradient(350px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div
      className={cn(
        "group/card relative overflow-hidden rounded-3xl transition-all duration-300",
        className
      )}
      onMouseMove={onMouseMove}
    >
      <div className="pointer-events-none">
        <div className="absolute inset-0 rounded-3xl [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50" />
        <motion.div
          className="absolute inset-0 rounded-3xl bg-gradient-to-r opacity-0 group-hover/card:opacity-100 transition duration-500"
          style={{
            ...style,
            background: `linear-gradient(to right, ${color}, ${color}50)`,
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 mix-blend-overlay group-hover/card:opacity-100"
          style={style}
        >
          <p className="absolute inset-x-0 text-xs h-full break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500">
            {randomString}
          </p>
        </motion.div>
      </div>
      {children}
    </div>
  );
}
