"use client";
import {
  BriefcaseIcon,
  MapPinIcon,
  CalendarIcon,
  ArrowRightIcon,
  CreditCardIcon,
  Github,
  Linkedin,
  Twitter,
  CheckCircle2,
  GraduationCap,
  Globe,
} from "lucide-react";
import NavBar from "@/components/landingPage/navbar";
import { GridPattern } from "@/components/ui/grid-pattern";

const Careers = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <NavBar />

      {/* Hero Section */}
      <div className="relative overflow-hidden py-32 sm:py-40">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${GridPattern})`,
            opacity: 0.1,
          }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl bg-gradient-to-r from-white to-white/90 bg-clip-text">
              <span>Join Our </span>
              <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                Mission
              </span>
            </h1>
            <p className="text-xl leading-8 text-gray-300 max-w-2xl mx-auto">
              Help us revolutionize interview preparation with AI technology and
              shape the future of career development
            </p>
          </div>
        </div>
      </div>

      {/* Job Listing */}
      <div
        id="open-positions"
        className="max-w-5xl mx-auto px-6 lg:px-8 pb-24 space-y-16"
      >
        <div className=" from-gray-900 to-gray-900/80 rounded-3xl p-10 md:p-12 border border-gray-800 shadow-2xl backdrop-blur-sm space-y-12 bg-black">
          {/* Job Header */}
          <div className="space-y-6">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-blue-900/50 text-blue-300 border border-blue-800/50">
              New Opening
            </div>
            <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-white to-white/90 bg-clip-text">
              Software Engineer Intern – AI Interview Platform
            </h2>
            <div className="flex flex-wrap gap-6 text-gray-400">
              <div className="flex items-center space-x-2">
                <BriefcaseIcon className="h-5 w-5" />
                <span>Internship</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPinIcon className="h-5 w-5" />
                <span>100% Remote</span>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5" />
                <span>Spring Session B 2025</span>
              </div>
              <div className="flex items-center space-x-2">
                <CreditCardIcon className="h-5 w-5" />
                <span>$3,000 Stipend</span>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {/* About Us Section */}
            <section className="space-y-5">
              <h3 className="text-xl font-semibold text-blue-500 flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>About Us</span>
              </h3>
              <p className="text-gray-300 leading-relaxed">
                We are revolutionizing the hiring process with an AI-driven
                interview preparation platform. Our goal is to provide job
                seekers with an interactive, intelligent experience that
                enhances their interview skills through real-time feedback,
                dynamic AI avatars, and in-depth performance analysis. At
                ConvoCoach, we're building the future of career development
                technology.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-blue-500 mb-4 flex items-center">
                <GraduationCap className="mr-2 h-5 w-5" />
                Internship Overview
              </h3>
              <p className="text-gray-300 leading-relaxed">
                As a Software Engineer Intern, you will play a key role in
                developing and refining our platform. This is an opportunity to
                work on cutting-edge AI-driven applications, gain hands-on
                experience in full-stack development, and contribute to a
                rapidly growing product. This is a fully remote position with a
                $3,000 stipend, offering flexibility and the chance to work with
                a distributed team of professionals.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-blue-500 mb-4 flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Your Responsibilities
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                {[
                  "Enhance the platform by implementing robust new features",
                  "Improve the written analysis portion for deeper feedback",
                  "Develop a structured scoring mechanism",
                  "Enhance AI avatar interaction capabilities",
                  "Implement secure payment gateway integration",
                  "Engage with ASU services for partnerships",
                  "Drive growth and user acquisition",
                  "Analyze the competitive landscape",
                  "Contribute to technical roadmap",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="h-2 w-2 mt-2 mr-3 bg-blue-500 rounded-full" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-blue-500 mb-4 flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5" />
                What We're Looking For
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                {[
                  "Proficiency in JavaScript (React, Node.js) or Python",
                  "Strong problem-solving skills",
                  "Interest in AI and NLP",
                  "Payment integration experience (bonus)",
                  "Passion for user-centric products",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="h-2 w-2 mt-2 mr-3 bg-blue-500 rounded-full" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-blue-500 mb-4 flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Why Join Us?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Hands-on Experience",
                    description:
                      "Work directly with AI technologies and modern development frameworks",
                  },
                  {
                    title: "Expert Mentorship",
                    description:
                      "Learn from experienced industry professionals",
                  },
                  {
                    title: "Impactful Work",
                    description:
                      "Contribute to a product that helps thousands of job seekers",
                  },
                  {
                    title: "$3,000 Stipend",
                    description:
                      "Competitive compensation for your valuable contributions",
                  },
                  {
                    title: "100% Remote",
                    description: "Work from anywhere with flexible scheduling",
                  },
                  {
                    title: "Growth Opportunities",
                    description:
                      "Potential for full-time roles for exceptional performers",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/50 p-4 rounded-lg border border-gray-700"
                  >
                    <h4 className="font-medium text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-12 pt-12 border-t border-gray-800">
              <div className="bg-slate-950 from-gray-800 to-gray-800/50 p-8 rounded-xl border border-gray-700">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <img
                    src="https://media.licdn.com/dms/image/v2/D5603AQHktkQZtgqJ_Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1697924061435?e=1746662400&v=beta&t=wY2JdIqW1yC5wGYHmBP0iwm79dOAdRKFiSv2DOHqUUE"
                    alt="Harrison Shuman"
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-blue-500/20"
                  />
                  <div className="text-center sm:text-left">
                    <h4 className="text-2xl font-medium text-white mb-2">
                      Harrison Shuman
                    </h4>
                    <p className="text-gray-400 mb-4">
                      Co-Founder at ConvoCoach
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                      <a
                        href="https://www.linkedin.com/in/harrison-shulman-17102b101/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-slate-950 text-white px-6 py-2 rounded-lg hover:bg-[#004182] transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20"
                      >
                        <Linkedin className="h-5 w-5 mr-2" />
                        Connect on LinkedIn
                      </a>
                      <a
                        href="mailto:Hds7137@gmail.com"
                        className="inline-flex items-center px-6 py-2 rounded-lg bg-blue-800 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20"
                      >
                        Send Application
                        <ArrowRightIcon className="ml-2 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Application Process Section */}
        <div className="bg-black from-gray-900 to-gray-900/80 rounded-3xl p-10 md:p-12 border border-gray-800 shadow-2xl backdrop-blur-sm space-y-8">
          <h2 className="text-3xl font-semibold text-white mb-8">
            Application Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Application steps with improved spacing and design */}
            {[
              {
                step: "01",
                title: "Submit Application",
                description:
                  "Send your resume and a brief introduction to our team",
              },
              {
                step: "02",
                title: "Initial Interview",
                description:
                  "Meet with our team to discuss your experience and goals",
              },
              {
                step: "03",
                title: "Technical Assessment",
                description: "Complete a small project to showcase your skills",
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-4 -top-4 bg-blue-600 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center">
                  {item.step}
                </div>
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 h-full space-y-3">
                  <h3 className="text-lg font-medium text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer className="mt-24 border-t border-white/10 pt-12 space-y-12">
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
                    <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
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

            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
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
        </footer>
      </div>
    </div>
  );
};

export default Careers;
