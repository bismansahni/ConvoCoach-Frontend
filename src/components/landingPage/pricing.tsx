"use client";

import { motion } from "framer-motion";
import { Icon } from "@/components/ui/evervault-card";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const pricingPlans = [
  {
    title: "Starter",
    credits: "5",
    price: "10",
    description: "Perfect for interview practice",
    features: [
      "Basic performance analytics",
      "Interview recordings",
      "Common question database",
      "Basic feedback system",
      "Email support",
    ],
    action: "Sign up for free trial",
  },
  {
    title: "Professional",
    credits: "10",
    price: "15",
    description: "Our most popular plan for serious job seekers",
    features: [
      "Advanced analytics dashboard",
      "Interview recordings with AI analysis",
      "Industry-specific questions",
      "Detailed feedback system",
      "Priority email support",
    ],
    popular: true,
    action: "Join waitlist",
  },
  {
    title: "Premium",
    credits: "15",
    price: "20",
    description: "Maximum interview preparation",
    features: [
      "Comprehensive analytics suite",
      "Advanced AI-powered feedback",
      "Custom interview scenarios",
      "Premium question database",
      "24/7 priority support",
    ],
    action: "Contact sales",
  },
];

function PricingCard({ plan }) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <div className="relative flex h-[600px]">
      <div
        className={cn(
          "w-full relative rounded-3xl p-[1px] overflow-hidden",
          isDarkMode ? "bg-black" : "bg-white",
          plan.popular
            ? "before:absolute before:inset-0 before:rounded-3xl before:border-2 before:border-dashed before:border-blue-700/50"
            : isDarkMode
            ? "before:absolute before:inset-0 before:rounded-3xl before:border-2 before:border-dashed before:border-gray-800"
            : "before:absolute before:inset-0 before:rounded-3xl before:border-2 before:border-dashed before:border-gray-300"
        )}
      >
        {/* Corner Plus Signs */}
        <div className="absolute -top-3 -left-3 h-6 w-6 text-blue-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 5v14m7-7H5"
            />
          </svg>
        </div>
        <div className="absolute -bottom-3 -left-3 h-6 w-6 text-blue-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 5v14m7-7H5"
            />
          </svg>
        </div>
        <div className="absolute -top-3 -right-3 h-6 w-6 text-blue-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 5v14m7-7H5"
            />
          </svg>
        </div>
        <div className="absolute -bottom-3 -right-3 h-6 w-6 text-blue-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 5v14m7-7H5"
            />
          </svg>
        </div>

        {/* Content */}
        <div
          className={cn(
            "h-full rounded-3xl p-8 flex flex-col",
            isDarkMode ? "bg-black" : "bg-white"
          )}
        >
          {/* Header */}
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-700 to-indigo-500 bg-clip-text text-transparent">
                {plan.title}
              </h3>
              {plan.popular && (
                <span className="inline-block px-3 py-1 text-xs font-medium text-blue-700 bg-blue-700/10 rounded-full border border-blue-700/20">
                  Most Popular
                </span>
              )}
            </div>
            <p
              className={cn(
                "text-sm",
                isDarkMode ? "text-gray-400" : "text-gray-600"
              )}
            >
              {plan.description}
            </p>
          </div>

          {/* Pricing */}
          <div className="mt-8">
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-700 to-indigo-500 bg-clip-text text-transparent">
                {plan.credits}
              </span>
              <div className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                <div className="text-sm font-medium">credits</div>
                <div className="text-xl font-bold text-blue-700">
                  ${plan.price}
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 flex-1">
            <p
              className={cn(
                "text-xs font-semibold uppercase tracking-wider mb-4",
                isDarkMode ? "text-gray-400" : "text-gray-500"
              )}
            >
              What's included
            </p>
            <ul className="space-y-3">
              {plan.features.map((feature, idx) => (
                <li
                  key={idx}
                  className={cn(
                    "flex items-center gap-3 text-sm",
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  )}
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-700 to-indigo-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Action */}
          <div className="mt-8">
            <div className="space-y-4">
              <div className="text-center">
                <a
                  href="#"
                  className="text-sm font-medium text-blue-700 hover:text-blue-600 transition-colors"
                >
                  {plan.action} →
                </a>
              </div>
              <p
                className={cn(
                  "text-xs text-center",
                  isDarkMode ? "text-gray-500" : "text-gray-400"
                )}
              >
                {plan.popular
                  ? "14-day free trial included"
                  : "No credit card required"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PricingSection() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <section
      className={cn(
        "relative min-h-screen flex items-center justify-center py-32",
        isDarkMode ? "bg-black" : "bg-gray-50"
      )}
    >
      <div
        className={cn(
          "absolute inset-0",
          isDarkMode ? "bg-black" : "bg-gray-50"
        )}
      />

      <div className="container relative z-10 px-4 mx-auto">
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "inline-flex h-10 animate-shimmer items-center justify-center rounded-full border px-6 font-medium transition-colors",
              isDarkMode
                ? "border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] text-slate-400"
                : "border-blue-200 bg-[linear-gradient(110deg,#e6f0ff,45%,#f0f7ff,55%,#e6f0ff)] bg-[length:200%_100%] text-blue-700"
            )}
          >
            <span className="text-base">Beta Access Available</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-8 space-y-6"
          >
            <h2 className="text-5xl font-bold tracking-tight sm:text-3xl lg:text-7xl">
              <span className={isDarkMode ? "text-white" : "text-gray-900"}>
                Simple, transparent
                <span> </span>
                <span
                  className={cn(
                    "bg-gradient-to-r bg-clip-text text-transparent",
                    isDarkMode
                      ? "from-blue-700 to-indigo-500 drop-shadow-[0_0_15px_rgba(29,78,216,0.5)]"
                      : "from-blue-600 to-indigo-600 drop-shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                  )}
                >
                  pricing
                </span>
              </span>
            </h2>
            <p
              className={cn(
                "max-w-2xl mx-auto text-xl",
                isDarkMode ? "text-gray-400" : "text-gray-600"
              )}
            >
              Choose the perfect plan for your interview preparation needs. All
              plans include access to our AI-powered interview platform.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-16 lg:gap-24 md:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.title} plan={plan} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={cn(
            "text-center text-xl mt-24 max-w-3xl mx-auto",
            isDarkMode ? "text-gray-400" : "text-gray-600"
          )}
        >
          Join now and get early access to all premium features during our beta
          phase.
        </motion.p>
      </div>
    </section>
  );
}
