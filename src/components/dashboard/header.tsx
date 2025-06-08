"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Breadcrumb } from "@/components/navigation /breadcrumb";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [credits, setCredits] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            setCredits(userDoc.data().credits ?? 0);
          }
        } catch (error) {
          console.error("Error fetching credits:", error);
          setCredits(0);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarTrigger />

      <div className="flex flex-1 items-center justify-between">
        <Breadcrumb />

        <div className="flex items-center gap-4">
          {/* Credits Display */}
          <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-1.5">
            <span className="text-sm font-medium text-muted-foreground">
              Credits:
            </span>
            <span className="text-sm font-bold">
              {loading ? (
                <span className="inline-block w-4 animate-pulse">...</span>
              ) : (
                credits
              )}
            </span>
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9 rounded-full"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
