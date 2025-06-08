"use client";
import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { signOut, auth } from "@/lib/firebase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavBar = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [credits, setCredits] = React.useState(100); // Example credit amount

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Pass the auth instance
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Interviews", href: "/dashboard/interviews" },
    { name: "Reviews", href: "/dashboard/reviews" },
    { name: "Pricing", href: "/dashboard/payment" },
  ];

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full border-b",
        "bg-white/70 dark:bg-black/20 backdrop-blur-xl backdrop-saturate-200",
        "border-gray-200/50 dark:border-white/5"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-white/80 bg-clip-text text-transparent">
                  Converse
                </span>
                <span className="bg-gradient-to-r from-[#0ff] via-[#0af] to-[#0066ff] bg-clip-text text-transparent">
                  AI
                </span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative group text-sm font-medium text-gray-600 dark:text-white/70 transition-colors hover:text-gray-900 dark:hover:text-white"
              >
                <span className="relative">
                  {item.name}
                  <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </span>
              </Link>
            ))}
          </div>

          {/* Right Side Items */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 backdrop-blur-sm transition-colors"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform duration-500 dark:-rotate-90 dark:scale-0 text-gray-600 dark:text-white/70" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform duration-500 dark:rotate-0 dark:scale-100 text-gray-600 dark:text-white/70" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <p className="text-sm mr-2 hidden lg:block text-gray-600 dark:text-white/70">
              Credits: <span className="font-semibold">{credits}</span>
            </p>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-8 w-8 rounded-full"
                >
                  <User className="h-5 w-5 text-gray-600 dark:text-white/70" />
                  <span className="sr-only">Open user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="lg:hidden">
                  Credits: {credits}
                </DropdownMenuItem>
                <DropdownMenuItem className="md:hidden">
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem className="md:hidden">
                  Interviews
                </DropdownMenuItem>
                <DropdownMenuItem className="md:hidden">
                  Reviews
                </DropdownMenuItem>
                <DropdownMenuItem className="md:hidden">
                  Pricing
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem onSelect={handleSignOut}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9 md:hidden text-gray-600 dark:text-white/70"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden"
            >
              <div className="space-y-2 pb-4 pt-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-xl px-3 py-2 text-base font-medium text-gray-600 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default NavBar;
