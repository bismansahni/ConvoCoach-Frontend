"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import InteractiveHoverButton from "@/components/ui/interactive-hover-button";

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = ["home", "features", "pricing", "about"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navigation = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Adjust this value based on your navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] px-4 pt-4 md:px-6 lg:px-8">
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navbarVariants}
        role="navigation"
        aria-label="Main navigation"
        className={`
          mx-auto max-w-[1400px] rounded-2xl
          bg-gradient-to-b from-white/[0.12] to-white/[0.08] dark:from-black/[0.12] dark:to-black/[0.08]
          backdrop-blur-[12px] backdrop-saturate-[180%]
          border border-white/20 dark:border-white/10
          before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-white/5 before:to-transparent before:pointer-events-none
          after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-t after:from-white/[0.07] after:via-transparent after:to-transparent after:pointer-events-none
          relative overflow-hidden
          shadow-[0_8px_32px_rgba(0,0,0,0.04)]
          dark:shadow-[0_8px_32px_rgba(0,0,0,0.1)]
          transition-all duration-300 ease-in-out
          ${
            isScrolled
              ? "bg-gradient-to-b from-white/[0.15] to-white/[0.1] dark:from-black/[0.15] dark:to-black/[0.1] shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
              : ""
          }
        `}
      >
        <div className="px-4 md:px-6 lg:px-8">
          <div className="flex h-[60px] md:h-[65px] lg:h-[70px] items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center space-x-2 group"
              aria-label="ConvoCoach Home"
            >
              <span className="text-xl md:text-2xl font-bold tracking-tight">
                <div className="p-2 flex">
                  <img
                    src="/ConvoCoachLogo.png"
                    alt="Logo"
                    className="h-7 w-7 transition-all duration-300 ease-in-out group-data-[collapsible=icon]:h-7 group-data-[collapsible=icon]:w-7"
                  />
                  <div>
                    <span className="pl-2 font-articulat pr-1 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-white/80 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
                      Convo
                    </span>
                    <span className="font-articulat text-blue-600 group-hover:opacity-80 transition-opacity">
                      Coach
                    </span>
                  </div>
                </div>
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-1">
              {navigation.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href.substring(1))}
                    className={`
                      relative px-4 py-2 text-sm lg:text-base
                      font-medium tracking-wide
                      text-gray-700 dark:text-white/90
                      hover:text-gray-900 dark:hover:text-white
                      transition-all duration-200
                      rounded-xl
                      hover:bg-black/5 dark:hover:bg-white/10
                      ${
                        isActive
                          ? "bg-black/5 dark:bg-white/10 text-gray-900 dark:text-white"
                          : ""
                      }
                      hover:shadow-sm
                    `}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-4">
              <InteractiveHoverButton onClick={() => router.push("/auth")} />

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden h-9 w-9 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20"
                aria-expanded={isMenuOpen}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isMenuOpen ? "close" : "menu"}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isMenuOpen ? (
                      <X className="h-5 w-5 text-gray-700 dark:text-white" />
                    ) : (
                      <Menu className="h-5 w-5 text-gray-700 dark:text-white" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={mobileMenuVariants}
                className="md:hidden overflow-hidden"
              >
                <div className="space-y-1 pb-4">
                  {navigation.map((item) => {
                    const isActive = activeSection === item.href.substring(1);
                    return (
                      <button
                        key={item.name}
                        onClick={() => scrollToSection(item.href.substring(1))}
                        className={`
                          block w-full text-left px-4 py-2.5 text-sm
                          font-medium tracking-wide
                          text-gray-700 dark:text-white/90
                          hover:text-gray-900 dark:hover:text-white
                          rounded-xl transition-all duration-200
                          hover:bg-black/5 dark:hover:bg-white/10
                          ${
                            isActive
                              ? "bg-black/5 dark:bg-white/10 text-gray-900 dark:text-white"
                              : ""
                          }
                        `}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {item.name}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </header>
  );
};

export default NavBar;
