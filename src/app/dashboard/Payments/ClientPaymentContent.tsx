// /dashboard/Payments/ClientPaymentContent.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";

export default function ClientPaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [paymentSessionFetched, setPaymentSessionFetched] = useState(false);

  const fetchPaymentSession = useCallback(async () => {
    const priceId = searchParams.get("priceId");
    if (!priceId) {
      console.error("No price ID provided");
      setIsLoading(false);
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      console.error("User not logged in");
      setIsLoading(false);
      return;
    }

    try {
      const idToken = await user.getIdToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/create_payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            firebaseUID: user.uid,
            priceId,
          }),
        }
      );

      const data = await response.json();
      if (data.url) {
        router.push(data.url);
        setPaymentSessionFetched(true);
      } else {
        console.error("No URL found in response");
      }
    } catch (error) {
      console.error("Error fetching payment session:", error);
    } finally {
      setIsLoading(false);
    }
  }, [router, searchParams]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthChecked(true);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (authChecked && !paymentSessionFetched) {
      fetchPaymentSession();
    }
  }, [authChecked, paymentSessionFetched, fetchPaymentSession]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-2">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <div>
          {isLoading
            ? "Loading payment details..."
            : !authChecked
            ? "Checking authentication..."
            : "Redirecting to payment..."}
        </div>
      </div>
    </div>
  );
}
