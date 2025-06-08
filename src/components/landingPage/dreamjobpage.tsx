import React from "react";
import { JobCardsDemo } from "./JobCard";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function CompanyScrollFooter() {
  return (
    <div>
      <div className="relative min-h-screen w-full overflow-hidden bg-black">
        {/* Main Content */}
        <div className="flex flex-col justify-center items-center min-h-screen">
          {/* Hero Text */}
          <div className="text-center px-4 py-16 relative z-30">
            <div className="absolute inset-0 bg-black/80 blur-xl rounded-[30px] transform scale-90"></div>

            <h1 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                Apply to your{" "}
              </span>
              <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                Dream Job
              </span>
              <br />
              <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                with Confidence
              </span>
            </h1>
          </div>

          {/* Centered Cards */}
          <div className="w-full max-w-5xl mx-auto h-[400px] relative">
            <JobCardsDemo />
          </div>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-0 left-0 right-0 z-40 bg-black backdrop-blur-sm border-t border-white/10">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center space-x-3">
                  <img
                    src="/ConvoCoachLogo.png"
                    alt="ConvoCoach"
                    className="h-10 w-auto"
                  />
                  <div className="flex flex-col">
                    <span className="text-xl font-semibold">
                      <span className="text-white">Convo</span>
                      <span className="bg-gradient-to-r from-blue-700 to-indigo-400 bg-clip-text text-transparent">
                        Coach
                      </span>
                    </span>
                    <span className="text-xs text-slate-400">
                      Interview Excellence
                    </span>
                  </div>
                </div>
                <p className="text-slate-400 mt-4 text-sm text-center md:text-left max-w-xs">
                  Ace your next interview with confidence. Professional guidance
                  for career success.
                </p>
              </div>

              <div className="flex flex-col items-center md:items-end gap-4">
                <div className="flex items-center gap-6">
                  <a
                    href="#"
                    className="text-slate-400 hover:text-blue-400 transition-colors p-2 hover:bg-white/5 rounded-full"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-blue-400 transition-colors p-2 hover:bg-white/5 rounded-full"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-blue-400 transition-colors p-2 hover:bg-white/5 rounded-full"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6">
                <p className="text-slate-400 text-sm">
                  © {new Date().getFullYear()} ConvoCoach. All rights reserved.
                </p>
                <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4">
                  <a
                    href="#"
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="#"
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    Terms of Service
                  </a>
                  <a
                    href="/careers"
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    Careers
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
