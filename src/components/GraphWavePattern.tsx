import React from "react";

const GraphWavePattern = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const generateLinePath = (
    baseHeight: number,
    amplitude: number,
    frequency: number,
    phase: number,
    complexity: number
  ) => {
    const points = [];
    for (let x = 0; x <= 100; x += 0.5) {
      let y = baseHeight;
      for (let i = 1; i <= complexity; i++) {
        y +=
          (amplitude / i) *
          Math.sin(((x * frequency * i + phase) * Math.PI) / 50);
      }
      points.push(`${x},${y}`);
    }
    return `M0,${points[0].split(",")[1]} L${points.join(" L")}`;
  };

  const waveParams = [
    { base: 85, amp: 3, freq: 3.5, phase: 8, complexity: 3 },
    { base: 80, amp: 4, freq: 3, phase: 6, complexity: 2 },
    { base: 75, amp: 5, freq: 2.5, phase: 4, complexity: 4 },
    { base: 65, amp: 6, freq: 2, phase: 2, complexity: 2 },
    { base: 70, amp: 8, freq: 1.5, phase: 0, complexity: 3 },
  ].reverse();

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {[1, 2, 3, 4, 5].map((i) => (
          <linearGradient
            key={`fadeGradient${i}`}
            id={`fadeGradient${i}`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor={
                isDarkMode
                  ? `hsl(${240 + i * 10}, 80%, ${60 + i * 5}%)`
                  : `hsl(${210 + i * 10}, 80%, ${85 + i * 2}%)`
              }
              stopOpacity="0.8"
            />
            <stop
              offset="20%"
              stopColor={
                isDarkMode
                  ? `hsl(${240 + i * 10}, 75%, ${45 + i * 5}%)`
                  : `hsl(${210 + i * 10}, 75%, ${75 + i * 2}%)`
              }
              stopOpacity="0.6"
            />
            <stop
              offset="40%"
              stopColor={
                isDarkMode
                  ? `hsl(${240 + i * 10}, 70%, ${30 + i * 5}%)`
                  : `hsl(${210 + i * 10}, 70%, ${65 + i * 2}%)`
              }
              stopOpacity="0.4"
            />
            <stop
              offset="60%"
              stopColor={
                isDarkMode
                  ? `hsl(${240 + i * 10}, 65%, ${20 + i * 5}%)`
                  : `hsl(${210 + i * 10}, 65%, ${55 + i * 2}%)`
              }
              stopOpacity="0.2"
            />
            <stop
              offset="80%"
              stopColor={isDarkMode ? "#000000" : "#f8fafc"}
              stopOpacity="0.1"
            />
            <stop
              offset="100%"
              stopColor={isDarkMode ? "#000000" : "#f8fafc"}
              stopOpacity="0"
            />
          </linearGradient>
        ))}
      </defs>

      <rect
        width="100"
        height="100"
        fill={isDarkMode ? "#000000" : "#ffffff"}
      />

      {waveParams.map((params, i) => {
        const linePath = generateLinePath(
          params.base,
          params.amp,
          params.freq,
          params.phase,
          params.complexity
        );
        return (
          <g key={i}>
            <path
              d={`${linePath} L100,114 L0,100 Z`}
              fill={`url(#fadeGradient${5 - i})`}
              fillOpacity="1"
            />
            <path
              d={linePath}
              fill="none"
              stroke={
                isDarkMode
                  ? `hsl(${240 + (4 - i) * 10}, 85%, ${25 + (4 - i) * 5}%)`
                  : `hsl(${210 + (4 - i) * 10}, 85%, ${64 + (4 - i) * 2}%)`
              }
              strokeWidth="0.15"
              strokeOpacity="0.8"
            />
          </g>
        );
      })}
    </svg>
  );
};
export default GraphWavePattern;
