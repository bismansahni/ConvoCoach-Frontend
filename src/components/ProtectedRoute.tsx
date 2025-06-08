"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, onAuthStateChanged } from "@/lib/firebase";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                if (!user.emailVerified) {
                    // Redirect unverified users to the OTP page
                    router.push("/login");
                }
            } else {
                // Redirect unauthenticated users to the login page
                router.push("/login");
            }
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, [router]);

    return <>{children}</>;
};

export default ProtectedRoute;
