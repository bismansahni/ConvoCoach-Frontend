// nav-projects.jsx
"use client";

import { BarChart3, FileText, MoreHorizontal, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  getDocs,
  writeBatch,
  doc,
} from "firebase/firestore";
import { toast } from "sonner";

export function NavProjects({ userId }) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    if (userId) {
      fetchInterviews();
    }
  }, [userId]);

  const fetchInterviews = async () => {
    try {
      const interviewsRef = collection(db, `users/${userId}/interviewDetails`);
      const q = query(interviewsRef);
      const querySnapshot = await getDocs(q);
      const interviewData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInterviews(interviewData);
    } catch (error) {
      console.error("Error fetching interviews:", error);
      toast.error("Failed to load interviews");
    }
  };

  const handleDeleteInterview = async (interviewId) => {
    try {
      const batch = writeBatch(db);
      batch.delete(doc(db, `users/${userId}/interviewDetails/${interviewId}`));
      batch.delete(
        doc(
          db,
          `users/${userId}/interviewDetails/${interviewId}/analysis/${interviewId}`
        )
      );
      await batch.commit();
      toast.success("Interview deleted successfully");
      fetchInterviews();
    } catch (error) {
      console.error("Error deleting interview:", error);
      toast.error("Failed to delete interview");
    }
  };

  const handleViewReport = (interviewId) => {
    router.push(`/dashboard/analysis?id=${interviewId}`);
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="text-lg px-4 py-2">
        Past Interviews
      </SidebarGroupLabel>
      <SidebarMenu>
        {interviews.map((interview) => (
          <SidebarMenuItem key={interview.id}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="flex items-center justify-between px-4 py-3 text-base hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors w-full">
                  <div className="flex items-center gap-4">
                    <BarChart3 className="h-6 w-6" />
                    <span className="font-medium">
                      {interview.companyName || "Interview"}
                    </span>
                  </div>
                  <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem
                  onClick={() => handleViewReport(interview.id)}
                  className="text-base"
                >
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <span>View Analysis</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleDeleteInterview(interview.id)}
                  className="text-base"
                >
                  <Trash2 className="h-5 w-5 text-muted-foreground" />
                  <span>Delete Interview</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
