// "use client";
//
// import { useEffect } from "react";
// import {
//   auth,
//   sendEmailVerification,
//   onAuthStateChanged,
// } from "@/lib/firebase";
// import { cn } from "@/lib/utils";
// import { BorderBeam } from "@/components/ui/border-beam";
// import DotPattern from "@/components/ui/dot-pattern";
// import { IconCheck, IconArrowLeft } from "@tabler/icons-react";
//
// const OtpPage = () => {
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         sendEmailVerification(auth.currentUser);
//       }
//     });
//
//     return () => unsubscribe(); // Cleanup listener on unmount
//   }, []);
//
//   return (
//     <div className="relative min-h-screen bg-black overflow-hidden">
//       <DotPattern
//         className={cn(
//           "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]"
//         )}
//       />
//
//       {/* Gradient orbs */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob" />
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob animation-delay-2000" />
//         <div className="absolute top-40 left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob animation-delay-4000" />
//       </div>
//
//       <div className="relative flex min-h-screen items-center justify-center">
//         <div className="w-full max-w-md relative">
//           {/* Card glow effect */}
//           <div className="absolute inset-0 bg-gradient-to-r from-[#0575E6] via-[#4E95FF] to-[#021B79] rounded-2xl blur-[2px]" />
//
//           <div className="relative bg-black border border-gray-800 rounded-2xl p-8 backdrop-blur-xl">
//             <BorderBeam size={200} duration={8} delay={9} />
//             <div className="relative z-10 text-center space-y-6">
//               <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <IconCheck className="w-8 h-8 text-blue-400" />
//               </div>
//
//               <h2 className="text-2xl bg-gradient-to-b from-slate-100 via-zinc-400 to-gray-200 dark:from-white dark:via-zinc-300/80 dark:to-transparent bg-clip-text text-transparent font-bold">
//                 Verify Your Email
//               </h2>
//
//               <p className="text-gray-400">
//                 Please check your email inbox for the verification link.
//               </p>
//
//               <div className="text-sm text-gray-500">
//                 Didn't receive an email?{" "}
//                 <button className="text-blue-400 hover:text-blue-300 underline">
//                   Resend verification email
//                 </button>
//               </div>
//
//               <a
//                 href="/"
//                 className="inline-flex items-center justify-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
//               >
//                 <IconArrowLeft className="w-4 h-4" />
//                 <span>Return to homepage</span>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default OtpPage;
//
//





"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  auth,
  sendEmailVerification,
  onAuthStateChanged,
} from "@/lib/firebase";
import { cn } from "@/lib/utils";
import { BorderBeam } from "@/components/ui/border-beam";
import DotPattern from "@/components/ui/dot-pattern";
import { IconCheck, IconArrowLeft } from "@tabler/icons-react";

const OtpPage = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          // Redirect verified users to the dashboard
          router.push("/dashboard");
        } else {
          // Send a verification email if not already sent
          sendEmailVerification(auth.currentUser)
              .then(() => {
                console.log("Verification email sent!");
              })
              .catch((error) => {
                console.error("Error sending verification email:", error);
              });
        }
      } else {
        // Redirect unauthenticated users to the login page
        router.push("/login");
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [router]);

  return (
      <div className="relative min-h-screen bg-black overflow-hidden">
        <DotPattern
            className={cn(
                "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]"
            )}
        />

        {/* Gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob animation-delay-2000" />
          <div className="absolute top-40 left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob animation-delay-4000" />
        </div>

        <div className="relative flex min-h-screen items-center justify-center">
          <div className="w-full max-w-md relative">
            {/* Card glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0575E6] via-[#4E95FF] to-[#021B79] rounded-2xl blur-[2px]" />

            <div className="relative bg-black border border-gray-800 rounded-2xl p-8 backdrop-blur-xl">
              <BorderBeam size={200} duration={8} delay={9} />
              <div className="relative z-10 text-center space-y-6">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconCheck className="w-8 h-8 text-blue-400" />
                </div>

                <h2 className="text-2xl bg-gradient-to-b from-slate-100 via-zinc-400 to-gray-200 dark:from-white dark:via-zinc-300/80 dark:to-transparent bg-clip-text text-transparent font-bold">
                  Verify Your Email
                </h2>

                <p className="text-gray-400">
                  Please check your email inbox for the verification link.
                </p>

                <div className="text-sm text-gray-500">
                  Didn't receive an email?{" "}
                  <button
                      onClick={() => sendEmailVerification(auth.currentUser)}
                      className="text-blue-400 hover:text-blue-300 underline"
                  >
                    Resend verification email
                  </button>
                </div>

                <a
                    href="/"
                    className="inline-flex items-center justify-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <IconArrowLeft className="w-4 h-4" />
                  <span>Return to homepage</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default OtpPage;
