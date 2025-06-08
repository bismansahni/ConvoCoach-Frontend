"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { ChevronRight, Home, BarChart3 } from "lucide-react";
import { navigationItems } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export function Breadcrumb() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [interviewData, setInterviewData] = useState<{
    companyName?: string;
  } | null>(null);

  // Get the interview ID from the URL query parameters
  const interviewId = searchParams.get("id");

  useEffect(() => {
    const fetchInterviewData = async () => {
      if (!interviewId) return;

      try {
        // We'll need to get the current user's ID - you might want to pass this as a prop
        // or get it from your auth context
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        const interviewRef = doc(
          db,
          `users/${userId}/interviewDetails/${interviewId}`
        );
        const interviewSnap = await getDoc(interviewRef);

        if (interviewSnap.exists()) {
          setInterviewData(interviewSnap.data());
        }
      } catch (error) {
        console.error("Error fetching interview data:", error);
      }
    };

    fetchInterviewData();
  }, [interviewId]);

  // Find the base navigation item
  const currentItem = navigationItems.find((item) =>
    item.exact ? pathname === item.path : pathname.startsWith(item.path)
  );

  // Check if we're on an interview analysis page
  const isInterviewAnalysis = pathname.includes("/analysis") && interviewId;

  if (!currentItem && !isInterviewAnalysis) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
      <span className="flex items-center gap-1">
        <Home className="h-4 w-4" />
        <span>Platform</span>
      </span>
      <ChevronRight className="h-4 w-4" />

      {isInterviewAnalysis ? (
        <>
          <span className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Analysis</span>
          </span>
          {interviewData && (
            <>
              <ChevronRight className="h-4 w-4" />
              <span className="font-medium text-foreground">
                {interviewData.companyName || "Interview Analysis"}
              </span>
            </>
          )}
        </>
      ) : (
        currentItem && (
          <span
            className={cn(
              "flex items-center gap-2 font-medium text-foreground",
              "transition-colors duration-200"
            )}
          >
            <currentItem.icon className="h-4 w-4" />
            {currentItem.title}
          </span>
        )
      )}
    </nav>
  );
}
