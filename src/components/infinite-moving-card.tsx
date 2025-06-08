"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useCallback } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "up",
  speed = "fast",
  className,
}: {
  items: {
    company: string;
    role: string;
    description: string;
    logo: string;
  }[];
  direction?: "up" | "down";
  speed?: "fast" | "normal" | "slow";
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Create only one copy for better performance
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "up" ? "forwards" : "reverse"
      );
      containerRef.current.style.setProperty("--animation-duration", "20s");

      setStart(true);
    }
  }, [direction]);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex flex-col gap-4 py-4 w-full",
          start && "animate-scroll"
        )}
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        {items.map((item, idx) => (
          <li
            key={`${item.company}-${idx}`}
            className="w-full relative rounded-xl border border-slate-800 bg-black/80 backdrop-blur-sm px-4 py-3"
            style={{ transform: "translateZ(0)" }}
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-slate-800 p-1.5 ring-1 ring-slate-700 flex-shrink-0">
                <img
                  src={item.logo}
                  alt={`${item.company} icon`}
                  className="h-full w-full object-contain rounded-full"
                  loading="lazy"
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-semibold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent truncate">
                  {item.company}
                </h3>
                <h4 className="text-xs font-medium text-slate-400 truncate">
                  {item.role}
                </h4>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
