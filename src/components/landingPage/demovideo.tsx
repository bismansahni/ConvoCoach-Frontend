"use client";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DemoVideo() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = "VB41v3W5xj8";
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;



  const demoUrl=process.env.NEXT_PUBLIC_CONVO_COACH_DEMO_URL;
  return (
    <div
      className={cn(
        "min-h-screen relative flex items-center justify-center overflow-hidden py-20",
        isDarkMode ? "bg-black" : "bg-slate-50"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span
              className={cn(
                "bg-clip-text text-transparent",
                isDarkMode ? "text-white" : "text-gray-900"
              )}
            >
              See ConvoCoach in
            </span>{" "}
            <span
              className={cn(
                "bg-gradient-to-r bg-clip-text text-transparent",
                isDarkMode
                  ? "from-blue-700 to-indigo-500 drop-shadow-[0_0_15px_rgba(29,78,216,0.5)]"
                  : "from-blue-600 to-indigo-600 drop-shadow-[0_0_15px_rgba(37,99,235,0.5)]"
              )}
            >
              Action
            </span>
          </h2>
          <p
            className={cn(
              "max-w-2xl mx-auto text-lg",
              isDarkMode ? "text-gray-400" : "text-gray-600"
            )}
          >
            Watch how ConvoCoach helps you prepare for your next interview with
            AI-powered practice sessions
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Spotlight Glow Effect */}
          <div
            className={cn(
              "absolute -inset-4 z-0 blur-2xl opacity-50",
              isDarkMode
                ? "bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20"
                : "bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100"
            )}
            style={{
              background: isDarkMode
                ? "radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.1), rgba(79, 70, 229, 0.05) 50%, transparent 100%)"
                : "radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.08), rgba(79, 70, 229, 0.04) 50%, transparent 100%)",
            }}
          />

          <div
            className={cn(
              "relative z-10 rounded-xl overflow-hidden",
              "shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
              isDarkMode
                ? [
                    "bg-gray-900/95",
                    "border border-gray-800/50",
                    "backdrop-blur-sm",
                    "ring-1 ring-gray-800/25",
                  ].join(" ")
                : [
                    "bg-white/95",
                    "border border-gray-200/50",
                    "backdrop-blur-sm",
                    "ring-1 ring-gray-100/25",
                  ].join(" ")
            )}
          >
            {/* Top Bar */}
            <div
              className={cn(
                "relative z-20 h-12 px-4",
                "flex items-center justify-between",
                isDarkMode ? "bg-gray-900/90" : "bg-white/90",
                "border-b backdrop-blur-sm",
                isDarkMode ? "border-gray-800/50" : "border-gray-200/50"
              )}
            >
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/90 shadow-sm shadow-red-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/90 shadow-sm shadow-yellow-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/90 shadow-sm shadow-green-500/20"></div>
                </div>
              </div>
              <div
                className={cn(
                  "text-sm font-medium",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}
              >
                ConvoCoach Demo
              </div>
              <div className="w-16"></div>
            </div>

            {/* Video Container */}
            <div className="w-full">
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                {!isPlaying ? (
                  <div className="absolute inset-0 w-full h-full">
                    <div
                      className="absolute inset-0 w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${thumbnailUrl})` }}
                    />
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group"
                    >
                      <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-200">
                        <Play className="w-8 h-8 text-white fill-white" />
                      </div>
                    </button>
                  </div>
                ) : (
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={demoUrl}
                    title="ConvoCoach Demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
  
}
