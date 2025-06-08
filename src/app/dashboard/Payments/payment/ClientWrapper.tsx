// /dashboard/Payments/payment/ClientWrapper.tsx
"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Import the client component with no SSR
const ClientPaymentContent = dynamic(() => import("../ClientPaymentContent"), {
  ssr: false,
});

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-2">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <div>Loading...</div>
      </div>
    </div>
  );
}

export default function ClientWrapper() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ClientPaymentContent />
    </Suspense>
  );
}
