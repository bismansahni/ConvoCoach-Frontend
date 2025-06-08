// "use client";
//
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { getAuth, signInWithEmailLink } from "firebase/auth";
// import { db } from "@/lib/firebase";
// import { doc, getDoc, setDoc } from "firebase/firestore";
//
// const VerifyEmail = () => {
//   const [status, setStatus] = useState(
//     "Click the button to verify your email."
//   );
//   const router = useRouter();
//   const auth = getAuth();
//
//   const handleVerifyEmail = async () => {
//     console.log("VerifyEmail button clicked");
//     try {
//       const urlParams = new URLSearchParams(window.location.search);
//       const oobCode = urlParams.get("oobCode");
//       const email = window.localStorage.getItem("emailForSignIn");
//
//       if (!oobCode) {
//         setStatus("Invalid or missing verification code.");
//         return;
//       }
//
//       if (!email) {
//         setStatus(
//           "No email found in local storage. Please try signing up again."
//         );
//         return;
//       }
//
//       console.log("oobCode:", oobCode);
//       console.log("Email from localStorage:", email); // Confirm email sign-in
//
//       const result = await signInWithEmailLink(
//         auth,
//         email,
//         window.location.href
//       );
//       const user = result.user; // console.log("User signed in:", user); // // const userDocRef = doc(db, "users", user.uid); // const userDoc = await getDoc(userDocRef); // // if (!userDoc.exists()) { //   console.log("New user detected. Saving data to Firestore and backend."); // // //   // Save user data to Firestore // const userDocRef = doc(db, "users", user.uid); // await setDoc(userDocRef, { //   email: user.email, //   createdAt: new Date().toISOString(), // // });
//
//       console.log("User signed in:", user);
//
//       const userDocRef = doc(db, "users", user.uid);
//       const userDoc = await getDoc(userDocRef);
//
//       if (!userDoc.exists()) {
//         console.log("New user detected. Saving data to Firestore and backend."); // Save user data to Firestore
//
//         await setDoc(userDocRef, {
//           email: user.email,
//           createdAt: new Date().toISOString(),
//         });
//
//         console.log("User data saved to Firestore."); // Send data to backend //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, { //       method: "POST", //       headers: { "Content-Type": "application/json" }, //       body: JSON.stringify({ //         uid: user.uid, //         email: user.email, //       }), //     }); // //     if (!response.ok) { //       throw new Error(`Backend API returned an error: ${response.statusText}`); //     } // //     console.log("User data sent to backend successfully."); // //     // Update status and redirect to dashboard //     setStatus("Email verified successfully! Redirecting..."); //     setTimeout(() => router.push("/dashboard"), 3000); //   } catch (error) { //     console.error("Error during email verification:", error); //     setStatus("Verification failed. Please try again."); //   } // }; // Send data to backend
//
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/signup`,
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               uid: user.uid,
//               email: user.email,
//             }),
//           }
//         );
//
//         if (!response.ok) {
//           throw new Error(
//             `Backend API returned an error: ${response.statusText}`
//           );
//         }
//
//         console.log("User data sent to backend successfully.");
//       } else {
//         console.log("Existing user detected. Skipping signup request.");
//       } // Update status and redirect to dashboard
//
//       setStatus("Email verified successfully! Redirecting...");
//       setTimeout(() => router.push("/dashboard"), 3000);
//     } catch (error) {
//       console.error("Error during email verification:", error);
//       setStatus("Verification failed. Please try again.");
//     }
//   };
//
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
//               <h1 className="text-2xl mb-4">{status}</h1>
//
//       <button
//         onClick={handleVerifyEmail}
//         className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//       >
//                   Verify Email
//       </button>
//
//     </div>
//   );
// };
//
// export default VerifyEmail;

// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { getAuth, signInWithEmailLink } from "firebase/auth"
// import { db } from "@/lib/firebase"
// import { doc, getDoc, setDoc } from "firebase/firestore"
// import { BorderBeam } from "@/components/ui/border-beam"
// import { DotPattern } from "@/components/ui/dot-pattern"

// const VerifyEmail = () => {
//   const [status, setStatus] = useState("Verifying your email...")
//   const [isLoading, setIsLoading] = useState(false)
//   const router = useRouter()
//   const auth = getAuth()

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search)
//     const oobCode = urlParams.get("oobCode")
//     if (oobCode) {
//       handleVerifyEmail()
//     } else {
//       setStatus("Invalid or missing verification code.")
//     }
//   }, [])

//   const handleVerifyEmail = async () => {
//     setIsLoading(true)
//     try {
//       const urlParams = new URLSearchParams(window.location.search)
//       const oobCode = urlParams.get("oobCode")
//       const email = window.localStorage.getItem("emailForSignIn")

//       if (!oobCode) {
//         setStatus("Invalid or missing verification code.")
//         return
//       }

//       if (!email) {
//         setStatus("No email found. Please try signing up again.")
//         return
//       }

//       const result = await signInWithEmailLink(auth, email, window.location.href)
//       const user = result.user

//       const userDocRef = doc(db, "users", user.uid)
//       const userDoc = await getDoc(userDocRef)

//       if (!userDoc.exists()) {
//         await setDoc(userDocRef, {
//           email: user.email,
//           createdAt: new Date().toISOString(),
//         })

//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             uid: user.uid,
//             email: user.email,
//           }),
//         })

//         if (!response.ok) {
//           throw new Error(`Backend API returned an error: ${response.statusText}`)
//         }
//       }

//       setStatus("Email verified successfully! Redirecting...")
//       setTimeout(() => router.push("/dashboard"), 3000)
//     } catch (error) {
//       console.error("Error during email verification:", error)
//       setStatus("Verification failed. Please try again.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//       <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
//         <DotPattern className="absolute inset-0 opacity-20" />
//         <div className="relative z-10 w-full max-w-md px-4">
//           <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
//             <BorderBeam />
//             <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
//               Email Verification
//             </h1>
//             <p className="text-lg mb-8 text-center text-gray-300">{status}</p>
//             {status.includes("failed") && (
//                 <button
//                     onClick={handleVerifyEmail}
//                     disabled={isLoading}
//                     className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isLoading ? (
//                       <span className="flex items-center justify-center">
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Verifying...
//                 </span>
//                   ) : (
//                       "Try Again"
//                   )}
//                 </button>
//             )}
//           </div>
//         </div>
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 filter blur-3xl opacity-30" style={{ mixBlendMode: 'overlay' }}></div>
//       </div>
//   )
// }

// export default VerifyEmail
//
// "use client";
//
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { getAuth, signInWithEmailLink } from "firebase/auth";
// import { db } from "@/lib/firebase";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { cn } from "@/lib/utils";
// import { useTheme } from "next-themes";
// import GraphWavePattern from "@/components/GraphWavePattern";
// import NavBar from "@/components/landingPage/navbar";
// interface HexagonPatternProps {
//   isDarkMode: boolean;
// }
//
// const HexagonPattern: React.FC<HexagonPatternProps> = ({ isDarkMode }) => {
//   return (
//     <svg
//       className="absolute inset-0 h-full w-full"
//       xmlns="http://www.w3.org/2000/svg"
//       width="100%"
//       height="100%"
//       preserveAspectRatio="xMidYMid slice"
//     >
//       <defs>
//         <pattern
//           id="honeycomb"
//           width="56"
//           height="100"
//           patternUnits="userSpaceOnUse"
//           patternTransform="scale(2) rotate(0)"
//         >
//           <path
//             d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100"
//             strokeWidth="1"
//             stroke={
//               isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"
//             }
//             fill="none"
//           />
//           <path
//             d="M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34"
//             strokeWidth="1"
//             stroke={
//               isDarkMode
//                 ? "rgba(255, 255, 255, 0.05)"
//                 : "rgba(255, 244, 240, 0.05)"
//             }
//             fill="none"
//           />
//         </pattern>
//       </defs>
//       <rect x="0" y="0" width="100%" height="100%" fill="url(#honeycomb)" />
//     </svg>
//   );
// };
//
// const VerifyEmail = () => {
//   const [status, setStatus] = useState("Verifying your email...");
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();
//   const auth = getAuth();
//   const { theme } = useTheme();
//   const isDarkMode = theme === "dark";
//
//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const oobCode = urlParams.get("oobCode");
//     if (oobCode) {
//       handleVerifyEmail();
//     } else {
//       setStatus("Invalid or missing verification code.");
//     }
//   }, []);
//
//   const handleVerifyEmail = async () => {
//     setIsLoading(true);
//     try {
//       const urlParams = new URLSearchParams(window.location.search);
//       const oobCode = urlParams.get("oobCode");
//       const email = window.localStorage.getItem("emailForSignIn");
//
//       if (!oobCode) {
//         setStatus("Invalid or missing verification code.");
//         return;
//       }
//
//       if (!email) {
//         setStatus("No email found. Please try signing up again.");
//         return;
//       }
//
//       const result = await signInWithEmailLink(
//         auth,
//         email,
//         window.location.href
//       );
//       const user = result.user;
//
//       const userDocRef = doc(db, "users", user.uid);
//       const userDoc = await getDoc(userDocRef);
//
//       if (!userDoc.exists()) {
//         await setDoc(userDocRef, {
//           email: user.email,
//           createdAt: new Date().toISOString(),
//         });
//
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/signup`,
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               uid: user.uid,
//               email: user.email,
//             }),
//           }
//         );
//
//         if (!response.ok) {
//           throw new Error(
//             `Backend API returned an error: ${response.statusText}`
//           );
//         }
//       }
//
//       setStatus("Email verified successfully! Redirecting...");
//       setTimeout(() => router.push("/dashboard"), 3000);
//     } catch (error) {
//       console.error("Error during email verification:", error);
//       setStatus("Verification failed. Please try again.");
//     } finally {
//       setIsLoading(false);
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
//         <HexagonPattern isDarkMode={isDarkMode} />
//       </div>
//
//       <div className="z-10 flex flex-col items-center justify-center min-h-screen px-4 space-y-12">
//         <div className="text-center max-w-2xl mx-auto">
//           <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
//             <span className={isDarkMode ? "text-white" : "text-gray-900"}>
//               Email{" "}
//             </span>
//             <span
//               className={cn(
//                 "bg-gradient-to-b bg-clip-text text-transparent",
//                 isDarkMode
//                   ? "from-blue-400 to-blue-700 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]"
//                   : "from-blue-500 to-blue-600 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
//               )}
//             >
//               Verification
//             </span>
//           </h1>
//           <p
//             className={cn(
//               "text-lg sm:text-xl md:text-2xl max-w-xl mx-auto",
//               isDarkMode ? "text-gray-400" : "text-gray-600"
//             )}
//           >
//             {status}
//           </p>
//         </div>
//
//         <div
//           className={cn(
//             "backdrop-blur-xl rounded-2xl p-8 sm:p-10 shadow-md max-w-md w-full",
//             isDarkMode
//               ? "bg-gray-900/60 border border-gray-800/50"
//               : "bg-white/70 border border-gray-200/50"
//           )}
//         >
//           {status.includes("failed") && (
//             <button
//               onClick={handleVerifyEmail}
//               disabled={isLoading}
//               className={cn(
//                 "w-full h-14 rounded-lg text-lg font-semibold text-center shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-70",
//                 isDarkMode
//                   ? "bg-blue-600 text-white hover:bg-blue-700"
//                   : "bg-blue-500 text-white hover:bg-blue-600"
//               )}
//             >
//               {isLoading ? (
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
//                   Verifying...
//                 </span>
//               ) : (
//                 "Try Again"
//               )}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default VerifyEmail;
//
//





"use client";

import {Suspense, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import { getAuth, signInWithEmailLink } from "firebase/auth";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import GraphWavePattern from "@/components/GraphWavePattern";
import NavBar from "@/components/landingPage/navbar";

interface HexagonPatternProps {
  isDarkMode: boolean;
}

const HexagonPattern: React.FC<HexagonPatternProps> = ({ isDarkMode }) => {
  return (
      <svg
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
              id="honeycomb"
              width="56"
              height="100"
              patternUnits="userSpaceOnUse"
              patternTransform="scale(2) rotate(0)"
          >
            <path
                d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100"
                strokeWidth="1"
                stroke={
                  isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"
                }
                fill="none"
            />
            <path
                d="M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34"
                strokeWidth="1"
                stroke={
                  isDarkMode
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(255, 244, 240, 0.05)"
                }
                fill="none"
            />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#honeycomb)" />
      </svg>
  );
};

const VerifyEmailContent = () => {
  const [status, setStatus] = useState("Click the button below to verify your email.");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const auth = getAuth();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const searchParams = useSearchParams();

  const emailFromQuery = searchParams.get("email");

  const handleVerifyEmail = async () => {
    setIsLoading(true);
    try {
      // const urlParams = new URLSearchParams(window.location.search);
      // const oobCode = urlParams.get("oobCode");
      // const email = window.localStorage.getItem("emailForSignIn");

      const urlParams = new URLSearchParams(window.location.search);
      const oobCode = urlParams.get("oobCode");

      if (!oobCode) {
        setStatus("Invalid or missing verification code.");
        return;
      }

      if (!emailFromQuery) {
        setStatus("No email found. Please try signing up again.");
        return;
      }

      const result = await signInWithEmailLink(auth, emailFromQuery, window.location.href);
      const user = result.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          createdAt: new Date().toISOString(),
        });

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid: user.uid,
            email: user.email,
          }),
        });

        if (!response.ok) {
          throw new Error(`Backend API returned an error: ${response.statusText}`);
        }
      }

      setStatus("Email verified successfully! Redirecting...");
      setTimeout(() => router.push("/dashboard"), 3000);
    } catch (error) {
      console.error("Error during email verification:", error);
      setStatus("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (

      <div
          className={cn(
              "relative flex min-h-screen w-full items-center justify-center overflow-hidden",
              isDarkMode ? "bg-black" : "bg-slate-50"
          )}
      >
        {/* Background Effects */}
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
          <HexagonPattern isDarkMode={isDarkMode} />
        </div>

        <div className="z-10 flex flex-col items-center justify-center min-h-screen px-4 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className={isDarkMode ? "text-white" : "text-gray-900"}>
              Email{" "}
            </span>
              <span
                  className={cn(
                      "bg-gradient-to-b bg-clip-text text-transparent",
                      isDarkMode
                          ? "from-blue-400 to-blue-700 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                          : "from-blue-500 to-blue-600 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                  )}
              >
              Verification
            </span>
            </h1>
            <p
                className={cn(
                    "text-lg sm:text-xl md:text-2xl max-w-xl mx-auto",
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                )}
            >
              {status}
            </p>
          </div>

          <div
              className={cn(
                  " rounded-2xl p-8 sm:p-10  max-w-md w-full",
                  isDarkMode
                      ? " "
                      : ""
              )}
          >
            <button
                onClick={handleVerifyEmail}
                disabled={isLoading}
                className={cn(
                    "w-full h-14 rounded-lg text-lg font-semibold text-center shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-70",
                    isDarkMode
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                )}
            >
              {isLoading ? (
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
                Verifying...
              </span>
              ) : (
                  "Verify Email"
              )}
            </button>
          </div>
        </div>
      </div>

  );
};

const VerifyEmail = () => {
  return (
      <Suspense fallback={<div className="text-center text-gray-500">Loading verification page...</div>}>
        <VerifyEmailContent />
      </Suspense>
  );
};

// export default VerifyEmail;

export default VerifyEmail;
