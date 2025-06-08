"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import React from "react";
import GraphWavePattern from "../GraphWavePattern";

// const GraphWavePattern = ({ isDarkMode }: { isDarkMode: boolean }) => {
//   const generateLinePath = (
//     baseHeight: number,
//     amplitude: number,
//     frequency: number,
//     phase: number,
//     complexity: number
//   ) => {
//     const points = [];
//     for (let x = 0; x <= 100; x += 0.5) {
//       let y = baseHeight;
//       for (let i = 1; i <= complexity; i++) {
//         y +=
//           (amplitude / i) *
//           Math.sin(((x * frequency * i + phase) * Math.PI) / 50);
//       }
//       points.push(`${x},${y}`);
//     }
//     return `M0,${points[0].split(",")[1]} L${points.join(" L")}`;
//   };

//   const waveParams = [
//     { base: 85, amp: 3, freq: 3.5, phase: 8, complexity: 3 },
//     { base: 80, amp: 4, freq: 3, phase: 6, complexity: 2 },
//     { base: 75, amp: 5, freq: 2.5, phase: 4, complexity: 4 },
//     { base: 65, amp: 6, freq: 2, phase: 2, complexity: 2 },
//     { base: 70, amp: 8, freq: 1.5, phase: 0, complexity: 3 },
//   ].reverse();

//   return (
//     <svg
//       className="absolute inset-0 h-full w-full"
//       viewBox="0 0 100 100"
//       preserveAspectRatio="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <defs>
//         {[1, 2, 3, 4, 5].map((i) => (
//           <linearGradient
//             key={`fadeGradient${i}`}
//             id={`fadeGradient${i}`}
//             x1="0%"
//             y1="0%"
//             x2="0%"
//             y2="100%"
//           >
//             <stop
//               offset="0%"
//               stopColor={
//                 isDarkMode
//                   ? `hsl(${240 + i * 10}, 80%, ${60 + i * 5}%)`
//                   : `hsl(${210 + i * 10}, 80%, ${85 + i * 2}%)`
//               }
//               stopOpacity="0.8"
//             />
//             <stop
//               offset="20%"
//               stopColor={
//                 isDarkMode
//                   ? `hsl(${240 + i * 10}, 75%, ${45 + i * 5}%)`
//                   : `hsl(${210 + i * 10}, 75%, ${75 + i * 2}%)`
//               }
//               stopOpacity="0.6"
//             />
//             <stop
//               offset="40%"
//               stopColor={
//                 isDarkMode
//                   ? `hsl(${240 + i * 10}, 70%, ${30 + i * 5}%)`
//                   : `hsl(${210 + i * 10}, 70%, ${65 + i * 2}%)`
//               }
//               stopOpacity="0.4"
//             />
//             <stop
//               offset="60%"
//               stopColor={
//                 isDarkMode
//                   ? `hsl(${240 + i * 10}, 65%, ${20 + i * 5}%)`
//                   : `hsl(${210 + i * 10}, 65%, ${55 + i * 2}%)`
//               }
//               stopOpacity="0.2"
//             />
//             <stop
//               offset="80%"
//               stopColor={isDarkMode ? "#000000" : "#f8fafc"}
//               stopOpacity="0.1"
//             />
//             <stop
//               offset="100%"
//               stopColor={isDarkMode ? "#000000" : "#f8fafc"}
//               stopOpacity="0"
//             />
//           </linearGradient>
//         ))}
//       </defs>

//       <rect
//         width="100"
//         height="100"
//         fill={isDarkMode ? "#000000" : "#ffffff"}
//       />

//       {waveParams.map((params, i) => {
//         const linePath = generateLinePath(
//           params.base,
//           params.amp,
//           params.freq,
//           params.phase,
//           params.complexity
//         );
//         return (
//           <g key={i}>
//             <path
//               d={`${linePath} L100,114 L0,100 Z`}
//               fill={`url(#fadeGradient${5 - i})`}
//               fillOpacity="1"
//             />
//             <path
//               d={linePath}
//               fill="none"
//               stroke={
//                 isDarkMode
//                   ? `hsl(${240 + (4 - i) * 10}, 85%, ${25 + (4 - i) * 5}%)`
//                   : `hsl(${210 + (4 - i) * 10}, 85%, ${64 + (4 - i) * 2}%)`
//               }
//               strokeWidth="0.15"
//               strokeOpacity="0.8"
//             />
//           </g>
//         );
//       })}
//     </svg>
//   );
// };

export default function Hero() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const onSubmit = () => {
    router.push("/auth");
  };

  return (
    <div
      className={cn(
        "relative flex h-screen w-full items-center justify-center overflow-hidden",
        isDarkMode ? "bg-black" : "bg-slate-50"
      )}
    >
      <div className="absolute inset-0">
        <div
          className={cn(
            "absolute inset-0 bg-gradient-radial",
            isDarkMode
              ? "from-indigo-950/50 via-indigo-950/25 to-transparent"
              : "from-blue-100/50 via-blue-100/25 to-transparent"
          )}
          style={{
            background: isDarkMode
              ? "radial-gradient(circle at 50% 50%, rgba(79, 70, 229, 0.4) 0%, rgba(49, 46, 129, 0.2) 40%, transparent 70%)"
              : "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.4) 0%, rgba(37, 99, 235, 0.2) 40%, transparent 70%)",
          }}
        />
      </div>

      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-b",
          isDarkMode
            ? "from-transparent via-purple-950/10 to-black"
            : "from-transparent via-blue-100/10 to-slate-50"
        )}
      />

      <div className="absolute inset-0 opacity-20">
        <div className="relative h-full w-full">
          <GraphWavePattern isDarkMode={isDarkMode} />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 pb-10">
        <div className="flex flex-col items-center text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            <span
              className={cn(
                "bg-gradient-to-b bg-clip-text text-transparent",
                isDarkMode
                  ? "from-blue-400 to-blue-700 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                  : "from-blue-500 to-blue-600 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              )}
            >
              Reimagine
            </span>{" "}
            <span
              className={cn(
                "bg-clip-text text-transparent",
                isDarkMode ? "text-white" : "text-gray-900"
              )}
            >
              Interview Preparation with AI
            </span>
          </h1>

          <p
            className={cn(
              "mt-0 max-w-2xl text-center text-sm sm:text-base",
              isDarkMode ? "text-muted-foreground" : "text-gray-600"
            )}
          >


            Practice interviews with real-life-like human AI avatars
          </p>

          <Button
            onClick={onSubmit}
            className={cn(
              "mt-10 h-14 px-6 rounded-full text-white flex items-center justify-center transition-colors duration-300",
              isDarkMode
                ? "bg-blue-700 hover:bg-blue-800"
                : "bg-blue-500 hover:bg-blue-600"
            )}
          >
            <span className="mr-2">Start Your Interview</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}

