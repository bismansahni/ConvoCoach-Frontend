"use client";
import { FileTextIcon } from "@radix-ui/react-icons";
import { UserIcon, MessageSquareIcon, BarChartIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import AnimatedListDemo from "@/components/example/animatedListDemo";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import Marquee from "@/components/ui/marquee";
import { useTheme } from "next-themes";

const interviewTips = [
  {
    name: "Research the company",
    body: "Learn about the company's history, values, and recent achievements before your interview.",
  },
  {
    name: "Practice common questions",
    body: "Prepare answers for frequently asked interview questions to boost your confidence.",
  },
  {
    name: "Dress appropriately",
    body: "Choose professional attire that aligns with the company's culture and the position you're applying for.",
  },
  {
    name: "Bring extra copies of your resume",
    body: "Have multiple copies of your resume on hand for potential interviewers.",
  },
  {
    name: "Follow up after the interview",
    body: "Send a thank-you note or email within 24 hours of your interview to express your appreciation and interest.",
  },
];

const features = [
  {
    Icon: MessageSquareIcon,
    name: "Real-time Feedback",
    description: "Get instant feedback on your responses during the interview.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <AnimatedBeamDemo className="absolute right-2 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: UserIcon,
    name: "AI Interviewer",
    description:
      "Practice with our adaptive AI interviewer tailored to your profile.",
    href: "#",
    cta: "Try it now",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedListDemo className="absolute right-2 top-4 h-[300px] w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: FileTextIcon,
    name: "Resume Analysis",
    description:
      "Our AI analyzes your resume to create a personalized interview experience.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]"
      >
        {interviewTips.map((tip, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium text-gray-900 dark:text-white">
                  {tip.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs text-gray-700 dark:text-gray-300">
              {tip.body}
            </blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: BarChartIcon,
    name: "Performance Analytics",
    description:
      "Track your progress and improve with detailed performance analytics.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "View demo",
    background: (
      <Calendar
        mode="single"
        selected={new Date()}
        className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
      />
    ),
  },
];

export default function FeaturesPage() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <div
      className={cn("min-h-screen p-20", isDarkMode ? "bg-black" : "bg-slate-50")}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold text-left mb-4">
            <span
              className={cn(
                "bg-clip-text text-transparent text-left",
                isDarkMode
                  ? "text-white dark:from-white dark:via-zinc-300/80 dark:to-transparent"
                  : "text-gray-900"
              )}
            >
              Ace Your Interviews with
              <span> </span>
              <span
                className={cn(
                  "bg-gradient-to-r bg-clip-text text-transparent",
                  isDarkMode
                    ? "from-blue-700 to-indigo-500 drop-shadow-[0_0_15px_rgba(29,78,216,0.5)] dark:drop-shadow-[0_0_15px_rgba(29,78,216,0.3)]"
                    : "from-blue-600 to-indigo-600 drop-shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                )}
              >
                AI-Powered Practice
              </span>
            </span>
          </h1>
          <p
            className={cn(
              "text-lg mb-12 text-left",
              isDarkMode ? "text-gray-400" : "text-gray-600"
            )}
          >
            Discover our powerful features designed to transform your interview
            preparation
          </p>
        </div>
        <BentoGrid>
          {features.map((feature, idx) => (
            <BentoCard key={idx} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
}

// AnimatedBeamDemo component
import { motion } from "framer-motion";

interface BeamProps {
  delay?: number;
  width?: string;
  className?: string;
}

const Beam = ({ delay = 0, width = "80%", className }: BeamProps) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "h-2 rounded-lg",
        isDarkMode
          ? "bg-gradient-to-r from-blue-700 via-indigo-500 to-blue-600"
          : "bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-500",
        className
      )}
      style={{ width }}
    >
      <div
        className={cn(
          "h-full w-full animate-pulse rounded-lg",
          isDarkMode
            ? "bg-gradient-to-r from-blue-700/50 via-indigo-500/50 to-blue-600/50"
            : "bg-gradient-to-r from-blue-600/50 via-indigo-500/50 to-blue-500/50"
        )}
      />
    </motion.div>
  );
};

export function AnimatedBeamDemo({ className }: { className?: string }) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <div
      className={cn(
        "relative flex flex-col space-y-4 overflow-hidden rounded-lg p-4 backdrop-blur-sm",
        isDarkMode ? "bg-white/5" : "bg-gray-100/50",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative flex flex-col space-y-4"
      >
        <Beam delay={0} width="80%" />
        <Beam delay={0.2} width="65%" />
        <Beam delay={0.4} width="70%" />
        <Beam delay={0.6} width="55%" />
        <Beam delay={0.8} width="75%" />
        {/* Feedback indicators */}
        <div className="mt-6 flex justify-between">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="flex items-center space-x-2"
          >
            <div
              className={cn(
                "h-3 w-3 rounded-full animate-pulse",
                isDarkMode ? "bg-blue-700" : "bg-blue-600"
              )}
            />
            <div
              className={cn(
                "h-3 w-3 rounded-full animate-pulse delay-75",
                isDarkMode ? "bg-indigo-500" : "bg-indigo-400"
              )}
            />
            <div
              className={cn(
                "h-3 w-3 rounded-full animate-pulse delay-150",
                isDarkMode ? "bg-blue-600" : "bg-blue-500"
              )}
            />
          </motion.div>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className={cn(
              "text-sm",
              isDarkMode ? "text-gray-400" : "text-gray-600"
            )}
          >
            Real-time analysis...
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
