
"use client";
import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db, auth } from "@/lib/firebase";
import {
  collection,
  query,
  limit,
  startAfter,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function PastInterviews() {
  const [interviews, setInterviews] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is authenticated:", user.uid);
        setUid(user.uid);
        fetchInterviews(user.uid);
      } else {
        console.error("User is not authenticated");
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const fetchInterviews = async (userId) => {
    if (!userId) {
      console.warn("No user ID provided");
      return;
    }
    setLoading(true);
    try {
      console.log("Fetching interviews for user:", userId);
      const interviewsRef = collection(db, `users/${userId}/interviewDetails`);
      // let q = query(interviewsRef, orderBy("timestamp"), limit(6)); // Using timestamp for ordering
      let q = query(interviewsRef, orderBy("timestamp", "desc"), limit(6));
      if (lastVisible) {
        q = query(
          interviewsRef,
          // orderBy("timestamp"),

            orderBy("timestamp", "desc"),
          startAfter(lastVisible),
          limit(6)
        ); // Changed to load 6 interviews
      }

      const querySnapshot = await getDocs(q);
      const newInterviews = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (newInterviews.length === 0) {
        console.log("No more interviews found");
      } else {
        console.log("Fetched interviews:", newInterviews);
      }

      setInterviews((prev) => [...prev, ...newInterviews]);
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickForViewReport = (id) => {
    router.push(`/dashboard/report?id=${id}`);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Past Interviews</CardTitle>
        <CardDescription>
          Review and analyze your previous interview sessions. Only successfully completed interviews are listed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {interviews.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-3">
            {interviews.map((interview) => (
              <Card key={interview.id}>
                <CardHeader>
                  <CardTitle>
                    {capitalizeFirstLetter(interview.companyName) ||
                      "Unknown Company"}
                  </CardTitle>
                  <CardDescription>
                    {capitalizeFirstLetter(interview.targetPosition) ||
                      "Unknown Position"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Date:{" "}
                    {new Date(interview.timestamp).toLocaleDateString() ||
                      "N/A"}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                      onClick={() => handleClickForViewReport(interview.id)}
                      variant="outline"
                    className="w-full"
                  >
                    View Report
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No interviews found. Take your first interview to see it here!
          </p>
        )}
      </CardContent>
      {lastVisible && (
        <CardFooter>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => fetchInterviews(uid)}
            disabled={loading}
          >
            {loading ? (
              "Loading..."
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                View All Interviews
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
