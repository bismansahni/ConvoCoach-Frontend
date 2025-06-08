// "use client";
//
// import React, { useState } from "react";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";
// import { useRouter } from "next/navigation";
// import { sendSignInLinkToEmail } from "firebase/auth";
// import { auth } from "@/lib/firebase";
// import Link from "next/link";
// import { useTheme } from "next-themes";
// import GraphWavePattern from "@/components/GraphWavePattern";
// import NavBar from "@/components/landingPage/navbar";
//
// export default function EnhancedEmailSignIn() {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const router = useRouter();
//   const { theme } = useTheme();
//   const isDarkMode = theme === "dark";
//
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value);
//   };
//
//   const handleSendLink = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//
//     try {
//       await sendSignInLinkToEmail(auth, email, {
//         url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/verify`,
//         handleCodeInApp: true,
//       });
//       window.localStorage.setItem("emailForSignIn", email);
//       setMessage("Sign-in link sent! Check your email to proceed.");
//     } catch (err) {
//       console.error("Error sending sign-in link:", err);
//       setError("Failed to send the sign-in link. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return (
//     <div
//       className={cn(
//         "relative flex min-h-screen w-full items-center justify-center overflow-hidden",
//         isDarkMode ? "bg-black" : "bg-slate-50"
//       )}
//     >
//       {/* Background Effects */}
//       <div className="absolute inset-0">
//         <div
//           className={cn(
//             "absolute inset-0 bg-gradient-radial",
//             isDarkMode
//               ? "from-indigo-950/50 via-indigo-950/25 to-transparent"
//               : "from-blue-100/50 via-blue-100/25 to-transparent"
//           )}
//           style={{
//             background: isDarkMode
//               ? "radial-gradient(circle at 50% 50%, rgba(79, 70, 229, 0.4) 0%, rgba(49, 46, 129, 0.2) 40%, transparent 70%)"
//               : "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.4) 0%, rgba(37, 99, 235, 0.2) 40%, transparent 70%)",
//           }}
//         />
//       </div>
//
//       <NavBar />
//
//       <div
//         className={cn(
//           "absolute inset-0 bg-gradient-to-b",
//           isDarkMode
//             ? "from-transparent via-purple-950/10 to-black"
//             : "from-transparent via-blue-100/10 to-slate-50"
//         )}
//       />
//
//       <div className="absolute inset-0 opacity-20">
//         <div className="relative h-full w-full">
//           <GraphWavePattern isDarkMode={isDarkMode} />
//         </div>
//       </div>
//
//       <div className="z-10 flex flex-col items-center justify-center min-h-screen px-4 space-y-12">
//         {/* Hero Text */}
//         <div className="text-center max-w-5xl mx-auto">
//           <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 md:whitespace-nowrap px-4">
//             <span className="text-white">Step into </span>
//             <span
//               className={cn(
//                 "bg-gradient-to-b bg-clip-text text-transparent",
//                 isDarkMode
//                   ? "from-blue-400 to-blue-700 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]"
//                   : "from-blue-500 to-blue-600 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
//               )}
//             >
//               Smarter
//             </span>
//             <span className="text-white"> Interview Prep</span>
//           </h1>
//           <p
//             className={cn(
//               "text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto",
//               isDarkMode ? "text-gray-400" : "text-gray-600"
//             )}
//           >
//             Enter your email to receive a secure sign-in link
//           </p>
//         </div>
//
//         {/* Form Section */}
//         <div
//           className={cn(
//             "backdrop-blur-xl rounded-2xl p-8 sm:p-10 shadow-md max-w-md w-full",
//             isDarkMode
//               ? "bg-gray-900/60 border border-gray-800/50"
//               : "bg-white/70 border border-gray-200/50"
//           )}
//         >
//           <form onSubmit={handleSendLink} className="space-y-6">
//             <div className="space-y-2">
//               <Label
//                 htmlFor="email"
//                 className={cn(
//                   "block text-base sm:text-lg font-medium",
//                   isDarkMode ? "text-gray-300" : "text-gray-700"
//                 )}
//               >
//                 Email Address
//               </Label>
//               <Input
//                 id="email"
//                 type="email"
//                 required
//                 className={cn(
//                   "block w-full h-14 px-4 text-lg rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200",
//                   isDarkMode
//                     ? "bg-gray-800 text-white placeholder-gray-500 border-gray-700 focus:border-blue-500"
//                     : "bg-white text-gray-700 placeholder-gray-400 border-gray-200 focus:border-blue-500"
//                 )}
//                 placeholder="you@example.com"
//                 value={email}
//                 onChange={handleChange}
//
//               />
//             </div>
//
//             {error && (
//               <div
//                 className={cn(
//                   "text-base sm:text-lg p-4 rounded-lg font-medium shadow-md",
//                   isDarkMode
//                     ? "text-red-400 bg-red-500/10"
//                     : "text-red-600 bg-red-100"
//                 )}
//               >
//                 {error}
//               </div>
//             )}
//
//             {message && (
//               <div
//                 className={cn(
//                   "text-base sm:text-lg p-4 rounded-lg font-medium shadow-md",
//                   isDarkMode
//                     ? "text-blue-400 bg-blue-500/10"
//                     : "text-blue-600 bg-blue-100"
//                 )}
//               >
//                 {message}
//               </div>
//             )}
//
//             <button
//               type="submit"
//               disabled={loading}
//               className={cn(
//                 "w-full h-14 rounded-lg text-lg font-semibold text-center shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-70",
//                 isDarkMode
//                   ? "bg-blue-600 text-white hover:bg-blue-700"
//                   : "bg-blue-500 text-white hover:bg-blue-600"
//               )}
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center">
//                   <svg
//                     className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     />
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     />
//                   </svg>
//                   Sending link...
//                 </span>
//               ) : (
//                 "Continue with Email →"
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import GraphWavePattern from "@/components/GraphWavePattern";
import NavBar from "@/components/landingPage/navbar";

export default function EnhancedEmailSignIn() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Send email to Flask backend to generate the sign-in link
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/send-sign-in-link`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            redirectUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/verify`,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Sign-in link sent! Check your email to proceed.");
      } else {
        setError(
          data.message || "Failed to send the sign-in link. Please try again."
        );
      }
    } catch (err) {
      console.error("Error sending sign-in link:", err);
      setError("Failed to send the sign-in link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center overflow-hidden",
        isDarkMode ? "bg-black" : "bg-slate-50"
      )}
    >
      <div className="absolute inset-0">
        <div
          className={cn(
            "absolute inset-0 bg-gradient-radial",
            isDarkMode
              ? "from-indigo-950/50 via-indigo-950/25 to-transparent"
              : "from-blue-100/50 via-blue-100/25 to-transparent"
          )}
          style={{
            background: isDarkMode
              ? "radial-gradient(circle at 50% 50%, rgba(79, 70, 229, 0.4) 0%, rgba(49, 46, 129, 0.2) 40%, transparent 70%)"
              : "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.4) 0%, rgba(37, 99, 235, 0.2) 40%, transparent 70%)",
          }}
        />
      </div>

      <NavBar />

      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-b",
          isDarkMode
            ? "from-transparent via-purple-950/10 to-black"
            : "from-transparent via-blue-100/10 to-slate-50"
        )}
      />

      <div className="absolute inset-0 opacity-20">
        <div className="relative h-full w-full">
          <GraphWavePattern isDarkMode={isDarkMode} />
        </div>
      </div>

      <div className="z-10 flex flex-col items-center justify-center min-h-screen px-4 space-y-12">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 md:whitespace-nowrap px-4">
            <span className="text-white">Step into </span>
            <span
              className={cn(
                "bg-gradient-to-b bg-clip-text text-transparent",
                isDarkMode
                  ? "from-blue-400 to-blue-700 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                  : "from-blue-500 to-blue-600 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              )}
            >
              Smarter
            </span>
            <span className="text-white"> Interview Prep</span>
          </h1>
          <p
            className={cn(
              "text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto",
              isDarkMode ? "text-gray-400" : "text-gray-600"
            )}
          >
            Enter your email to receive a secure sign-in link
          </p>
        </div>

        <div
          className={cn(
            "backdrop-blur-xl rounded-2xl p-8 sm:p-10 shadow-md max-w-md w-full",
            isDarkMode
              ? "bg-gray-900/60 border border-gray-800/50"
              : "bg-white/70 border border-gray-200/50"
          )}
        >
          <form onSubmit={handleSendLink} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className={cn(
                  "block text-base sm:text-lg font-medium",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                required
                className={cn(
                  "block w-full h-14 px-4 text-lg rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200",
                  isDarkMode
                    ? "bg-gray-800 text-white placeholder-gray-500 border-gray-700 focus:border-blue-500"
                    : "bg-white text-gray-700 placeholder-gray-400 border-gray-200 focus:border-blue-500"
                )}
                placeholder="you@example.com"
                value={email}
                onChange={handleChange}
              />
            </div>

            {error && (
              <div
                className={cn(
                  "text-base sm:text-lg p-4 rounded-lg font-medium shadow-md",
                  isDarkMode
                    ? "text-red-400 bg-red-500/10"
                    : "text-red-600 bg-red-100"
                )}
              >
                {error}
              </div>
            )}

            {message && (
              <div
                className={cn(
                  "text-base sm:text-lg p-4 rounded-lg font-medium shadow-md",
                  isDarkMode
                    ? "text-blue-400 bg-blue-500/10"
                    : "text-blue-600 bg-blue-100"
                )}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full h-14 rounded-lg text-lg font-semibold text-center shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-70",
                isDarkMode
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              )}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending link...
                </span>
              ) : (
                "Continue with Email →"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
