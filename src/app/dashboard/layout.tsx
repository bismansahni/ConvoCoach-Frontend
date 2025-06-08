"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FeedbackModal } from "@/components/feedbackModal";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/dashboard/header";
import { Moon, Sun } from "lucide-react";
import { Toaster } from "sonner";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

// Separate component for parts that need searchParams
function DashboardContent({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const [showFeedback, setShowFeedback] = useState(false);
  const interviewId = searchParams.get("interviewId");

  useEffect(() => {
    const feedback = searchParams.get("feedback");
    if (feedback === "true") {
      setShowFeedback(true);
    }
  }, [searchParams]);

  const handleCloseFeedback = () => {
    setShowFeedback(false);
  };

  return (
    <div className="min-h-screen bg-background main-content-wrapper">
      {children}
      {showFeedback && (
        <FeedbackModal
          isOpen={showFeedback}
          onClose={handleCloseFeedback}
          interviewId={interviewId || ""}
        />
      )}
    </div>
  );
}

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading...</div>
    </div>
  );
}

// Main layout component
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { theme } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true); // User is authenticated
      } else {
        router.replace("/auth"); // Redirect to login page
      }
      setIsLoading(false); // Stop loading state
    });

    return () => unsubscribe(); // Cleanup the listener
  }, [router]);

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (!isAuthenticated) {
    return null; // Prevent rendering if not authenticated
  }

  return (
    <SidebarProvider className="text-lg">
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: theme === "dark" ? "#1f2937" : "#fff",
            color: theme === "dark" ? "#fff" : "#000",
            border: "1px solid",
            borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
          },
        }}
      />
      <AppSidebar />
      <SidebarInset>
        <Header />
        <Suspense fallback={<LoadingFallback />}>
          <DashboardContent>{children}</DashboardContent>
        </Suspense>
      </SidebarInset>
    </SidebarProvider>
  );
}
