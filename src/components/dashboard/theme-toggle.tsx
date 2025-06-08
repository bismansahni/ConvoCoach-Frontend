"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setDarkMode(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="dark-mode"
        checked={darkMode}
        onCheckedChange={toggleDarkMode}
      />
      <Label htmlFor="dark-mode" className="sr-only">
        Dark Mode
      </Label>
      {darkMode ? (
        <Moon className="h-4 w-4 text-muted-foreground" />
      ) : (
        <Sun className="h-4 w-4 text-muted-foreground" />
      )}
    </div>
  );
}
