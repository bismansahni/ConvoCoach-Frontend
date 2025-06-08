"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { AppSidebar } from "@/components/app-sidebar";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import PerformanceChart from "@/components/dashboard/performance-chart";
import NewInterviewForm from "@/components/dashboard/interview-form";
import PastInterviews from "@/components/dashboard/past-interviews";
import ProfileCreationModal from "@/components/dashboard/ProfileCreationModal";
import ProtectedRoute from "@/components/ProtectedRoute";
import { FeedbackModal } from "@/components/feedbackModal";

export default function Dashboard() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("feedback") === "true") {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  const closeModal = () => {
    setIsModalOpen(false);
    router.push("/dashboard");
  };

  const reloadDashboard = () => {
    router.push("/dashboard");
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        try {
          const userDocSnap = await getDoc(userDocRef);

          // Show modal if document doesn't exist or required fields are empty
          if (!userDocSnap.exists()) {
            setShowProfileModal(true);
          } else {
            const userData = userDocSnap.data();
            const requiredFields = ["name", "currentCompany", "currentRole"];
            const hasRequiredFields = requiredFields.every(
              (field) => userData[field] && userData[field].trim() !== ""
            );
            setShowProfileModal(!hasRequiredFields);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setShowProfileModal(true); // Show modal on error
        }
      } else {
        router.push("/auth");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <ProtectedRoute>
      <div>
        <div className="flex flex-1 flex-col">
          {/* <DashboardHeader /> */}
          <main className="container mx-auto max-w-full px-7 py-9">
            <div className="grid gap-6 md:grid-cols-2">
              <PerformanceChart />
              <NewInterviewForm />
            </div>
            <PastInterviews />
          </main>
        </div>

        <ProfileCreationModal
          isOpen={showProfileModal}
          onClose={() => {setShowProfileModal(false);
            reloadDashboard();
        }}
        />
      </div>
    </ProtectedRoute>
  );
}
