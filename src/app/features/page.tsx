"use client";

import { motion } from "framer-motion";
import { IconArrowLeft } from "@tabler/icons-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Brain,
  Target,
  Clock,
  Zap,
  Shield,
  Users,
  Trophy,
} from "lucide-react";
import FooterWithGlobe from "@/components/landingPage/dreamjobpage";

export default function FeaturesPage() {
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-purple-500" />,
      title: "Advanced AI Technology",
      description:
        "Powered by state-of-the-art language models that understand context and provide human-like interactions.",
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      icon: <Target className="w-8 h-8 text-blue-500" />,
      title: "Industry-Specific Training",
      description:
        "Customized interview scenarios and questions tailored to your target industry and role.",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      icon: <Clock className="w-8 h-8 text-green-500" />,
      title: "Real-Time Feedback",
      description:
        "Instant analysis of your responses with actionable suggestions for improvement.",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Performance Analytics",
      description:
        "Detailed insights into your progress with comprehensive performance metrics and trends.",
      gradient: "from-yellow-500 to-orange-600",
    },
    {
      icon: <Shield className="w-8 h-8 text-red-500" />,
      title: "Secure Environment",
      description:
        "Practice in a safe, judgment-free space with complete privacy and data protection.",
      gradient: "from-red-500 to-pink-600",
    },
    {
      icon: <Users className="w-8 h-8 text-indigo-500" />,
      title: "Mock Interviews",
      description:
        "Realistic interview simulations with varying difficulty levels and interviewer personalities.",
      gradient: "from-indigo-500 to-violet-600",
    },
    {
      icon: <Trophy className="w-8 h-8 text-orange-500" />,
      title: "Success Tracking",
      description:
        "Monitor your improvement over time with detailed progress reports and achievement badges.",
      gradient: "from-orange-500 to-red-600",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-teal-500" />,
      title: "Custom Learning Paths",
      description:
        "Personalized interview preparation journeys based on your experience and goals.",
      gradient: "from-teal-500 to-green-600",
    },
  ];

  return (
    <main className="bg-white dark:bg-black text-black dark:text-white min-h-screen relative overflow-hidden">
      {/* Back Button */}
      <div className="fixed top-4 sm:top-8 left-4 sm:left-8 z-20">
        <a
          href="/"
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <IconArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </a>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Hero Section */}
      <section className="pt-20 pb-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-blue-600 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto">
            Discover the comprehensive suite of tools and capabilities designed
            to transform your interview preparation experience.
          </p>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className="p-6 h-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border border-gray-200 dark:border-gray-800
                  hover:translate-y-[-4px] hover:shadow-xl transition-all duration-300"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                  <div
                    className={`h-1 w-16 mt-4 rounded bg-gradient-to-r ${feature.gradient}`}
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Transform Your Interview Skills?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Join thousands of successful candidates who have mastered their
              interview skills with our AI-powered platform.
            </p>
            <Button
              className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-6 rounded-lg text-lg
                hover:from-purple-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started Now
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
    </main>
  );
}
