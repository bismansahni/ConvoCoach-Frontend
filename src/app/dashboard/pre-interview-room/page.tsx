//
//
//
// "use client";
//
// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { createPersona } from "@/service/api";
// import Head from "next/head";
// import { db, auth } from "@/lib/firebase";
// import { doc, updateDoc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import DailyIframe from "@daily-co/daily-js";
//
// const PreInterviewRoom = () => {
//     const [loading, setLoading] = useState(false);
//     const [roomUrl, setRoomUrl] = useState(null);
//     const [error, setError] = useState("");
//     const [user, setUser] = useState(null);
//     const router = useRouter();
//
//     // Fetch the current user
//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//             if (currentUser) {
//                 console.log("User authenticated:", currentUser.uid); // Debug: Check user authentication
//                 setUser(currentUser);
//             } else {
//                 console.log("User not authenticated, redirecting to login."); // Debug: No user, redirecting
//                 router.push("/login");
//             }
//         });
//
//         return () => unsubscribe();
//     }, [router]);
//
//     // Function to update interview status in Firestore
//     const updateInterviewStatus = async (userId, interviewId, status) => {
//         try {
//             const docRef = doc(db, "users", userId, "interviewDetails", interviewId);
//             await updateDoc(docRef, { interviewStatus: status });
//             console.log(`Interview status updated to: ${status}`);
//         } catch (error) {
//             console.error("Error updating interview status:", error);
//             setError("Failed to update interview status.");
//         }
//     };
//
//     const sendCallStatusToBackend = async (status) => {
//         try {
//             const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/call_status`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     status,
//                     timestamp: new Date().toISOString(),
//                 }),
//             });
//
//             if (!response.ok) {
//                 throw new Error(`Failed to send status: ${status}`);
//             }
//
//             console.log(`Call status (${status}) successfully sent to backend.`);
//         } catch (error) {
//             console.error("Error sending call status to backend:", error);
//         }
//     };
//
//     // Initialize Daily callFrame and join room
//     useEffect(() => {
//         if (roomUrl) {
//             const callWrapper = document.getElementById("call-wrapper");
//
//             const interviewId = new URLSearchParams(window.location.search).get("id");
//
//
//             // Create callFrame instance
//             const callFrame = DailyIframe.createFrame(callWrapper, {
//                 showLeaveButton: true,
//             });
//
//             // callFrame
//             //     .on("loaded", () => console.log("Call loaded."))
//             //     .on("joining-meeting", () => console.log("Joining meeting..."))
//             //     .on("joined-meeting", () => console.log("Joined meeting."))
//             //     .on("left-meeting", () => {
//             //         console.log("Call has ended.");
//             //         callFrame.destroy(); // Cleanup call frame
//             //         setRoomUrl(null); // Reset the room URL to show the initial UI
//             //     });
//
//
//
//
//             callFrame
//                 .on("loaded", () => console.log("Call loaded."))
//                 .on("joining-meeting", () => console.log("Joining meeting..."))
//                 .on("joined-meeting", async () => {
//                     console.log("Joined meeting.");
//                     sendCallStatusToBackend("meeting-joined-in-progress"); // Notify backend
//                     // Update status to "meeting-joined-in-progress"
//                     await updateInterviewStatus(user.uid, interviewId, "meeting-joined-in-progress");
//                 })
//                 .on("left-meeting", async () => {
//                     console.log("Call has ended.");
//                     // Update status to "meeting-ended-successfully"
//                     sendCallStatusToBackend("meeting-ended-successfully"); // Notify backend
//                     await updateInterviewStatus(user.uid, interviewId, "meeting-ended-successfully");
//                     callFrame.destroy(); // Cleanup call frame
//                     setRoomUrl(null); // Reset the room URL to show the initial UI
//                 });
//             // Join the call with the room URL
//             callFrame
//                 .join({ url: roomUrl })
//                 .catch((error) => {
//                     console.error("Error joining the call:", error);
//                     setError("Failed to join the meeting. Please try again.");
//                     setRoomUrl(null);
//                 });
//
//             return () => {
//                 callFrame.destroy();
//             };
//         }
//     }, [roomUrl]);
//
//     const handleStartPersonaCreation = async () => {
//         if (!user) {
//             setError("User not authenticated.");
//             console.error("User is not authenticated."); // Debug: No user
//             return;
//         }
//
//         setLoading(true);
//         console.log("Starting persona creation..."); // Debug: Persona creation started
//
//         try {
//             // Replace with the actual interview ID from the query or props
//             const interviewId = new URLSearchParams(window.location.search).get("id");
//
//             // Update Firestore document with "Start-interview-button=pressed"
//             await updateInterviewStatus(user.uid, interviewId, "Start-interview-button=pressed");
//
//             const result = await createPersona();
//             console.log("CreatePersona result:", result); // Debug: Check API response
//
//             if (result.success) {
//                 const conversationId = result.data.conversation_id[1];
//                 console.log("Conversation ID received:", conversationId); // Debug: Check conversation ID
//                 setRoomUrl(conversationId);
//                 setError("");
//             } else {
//                 console.error("CreatePersona error:", result.message); // Debug: API error
//                 setError(result.message || "An unexpected error occurred.");
//             }
//         } catch (error) {
//             console.error("Error in persona creation:", error); // Debug: Catch unexpected errors
//             setError("Failed to create persona.");
//         }
//
//         setLoading(false);
//     };
//
//     return (
//         <>
//             <Head>
//                 <link
//                     href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap"
//                     rel="stylesheet"
//                 />
//             </Head>
//             {!roomUrl ? (
//                 <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-blue-500 p-4">
//                     <h1 className="text-4xl font-bold mb-6 text-center text-blue-700 font-montserrat">
//                         Pre-Interview Room
//                     </h1>
//                     <p className="mb-4 text-white">
//                         Are you ready to start the interview?
//                     </p>
//
//                     {error && <p className="mb-4 text-red-500">{error}</p>}
//
//                     <button
//                         onClick={handleStartPersonaCreation}
//                         disabled={loading}
//                         className={`px-4 py-2 rounded w-full max-w-sm mb-4 ${
//                             loading
//                                 ? "bg-gray-400 cursor-not-allowed"
//                                 : "bg-green-600 hover:bg-green-700 text-white"
//                         }`}
//                     >
//                         {loading ? "Starting..." : "Yes, I'm ready!"}
//                     </button>
//                 </div>
//             ) : (
//                 <div id="call-wrapper" className="fixed inset-0 z-50"></div>
//             )}
//         </>
//     );
// };
//
// export default PreInterviewRoom;

"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPersona } from "@/service/api";
import Head from "next/head";
import { db, auth } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import DailyIframe from "@daily-co/daily-js";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { Camera, Mic, Shield, Brain, Loader2 } from "lucide-react";
import {getFirebaseIdToken} from "@/service/AuthHelper";

const loadingStates = [
  
  { text: "Analyzing your profile..." },
  { text: "Preparing AI interviewer..." },
  { text: "Customizing questions..." },
  { text: "Setting up secure room..." },
  { text: "Calibrating voice recognition..." },
  { text: "Initializing feedback system..." },
  { text: "Configuring video stream..." },
  { text: "Starting interview session..." },
];

const PreInterviewRoom = () => {
  const [loading, setLoading] = useState(false);
  const [roomUrl, setRoomUrl] = useState(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioStreamRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const updateInterviewStatus = async (userId, interviewId, status) => {
    try {
      const docRef = doc(db, "users", userId, "interviewDetails", interviewId);
      await updateDoc(docRef, { interviewStatus: status });
    } catch (error) {
      console.error("Error updating interview status:", error);
      setError("Failed to update interview status.");
    }
  };

  const decrementCredits = async () => {
    try {
      const idToken = await getFirebaseIdToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/credit-decrement`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: idToken,
          },
          body: JSON.stringify({ uid: user.uid }),
        }
      );

      if (response.status === 200) {
        return true;
      } else {
        const data = await response.json();
        setError(data.message || "Failed to decrement credits.");
        return false;
      }
    } catch (err) {
      setError("An unexpected error occurred while decrementing credits.");
      return false;
    }
  };

  const sendCallStatusToBackend = async (status) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/call_status`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
            timestamp: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to send status: ${status}`);
      }
    } catch (error) {
      console.error("Error sending call status to backend:", error);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      mediaRecorder.start();
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setError("Please allow microphone access.");
    }
  };

  const stopRecordingAndSendToBackend = async () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        audioChunksRef.current = [];
        const formData = new FormData();
        formData.append("file", audioBlob, "recording.wav");
        formData.append(
          "interviewId",
          new URLSearchParams(window.location.search).get("id")
        );
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/upload_recording`,
            {
              method: "POST",
              body: formData,
            }
          );
          if (!response.ok) throw new Error("Failed to upload recording.");
        } catch (err) {
          console.error("Error uploading recording:", err);
        }
      };
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    }
  };

  useEffect(() => {
    if (roomUrl) {
      const callWrapper = document.getElementById("call-wrapper");
      const interviewId = new URLSearchParams(window.location.search).get("id");
      const callFrame = DailyIframe.createFrame(callWrapper, {
        showLeaveButton: true,
      });

      callFrame
        .on("loaded", () => console.log("Call loaded."))
        .on("joining-meeting", () => console.log("Joining meeting..."))
        .on("joined-meeting", async () => {
          await startRecording();
          sendCallStatusToBackend("meeting-joined-in-progress");
          await updateInterviewStatus(
            user.uid,
            interviewId,
            "meeting-joined-in-progress"
          );
        })
        .on("left-meeting", async () => {
          router.push(`/dashboard?feedback=true&interviewId=${interviewId}`);
          await stopRecordingAndSendToBackend();
          sendCallStatusToBackend("meeting-ended-successfully");
          await updateInterviewStatus(
            user.uid,
            interviewId,
            "meeting-ended-successfully"
          );
          callFrame.destroy();
          setRoomUrl(null);
        });

      callFrame.join({ url: roomUrl }).catch((error) => {
        console.error("Error joining the call:", error);
        setError("Failed to join the meeting. Please try again.");
        setRoomUrl(null);
      });

      return () => {
        callFrame.destroy();
      };
    }
  }, [roomUrl]);

  const handleStartPersonaCreation = async () => {
    if (!user) {
      setError("User not authenticated.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const creditsAvailable = await decrementCredits();
      if (!creditsAvailable) {
        setLoading(false);
        return;
      }
      const interviewId = new URLSearchParams(window.location.search).get("id");
      await updateInterviewStatus(
        user.uid,
        interviewId,
        "Start-interview-button=pressed"
      );

      const result = await createPersona();

      if (result.success) {
        const conversationId = result.data.conversation_id[1];
        setRoomUrl(conversationId);
      } else {
        setError(result.message || "An unexpected error occurred.");
      }
    } catch (error) {
      setError("Failed to create persona.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      {!roomUrl ? (
        <div className="relative min-h-screen bg-black">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.02]"></div>

          <div className="relative px-4 py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700">
                Ready for Your Interview
              </h1>
              <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
                Our AI interviewer is prepared to help you practice and improve
                your interview skills.
              </p>
            </div>

            <div className="grid gap-8 lg:gap-12 md:grid-cols-2 max-w-7xl mx-auto">
              <div className="space-y-6">
                {[
                  {
                    icon: Camera,
                    title: "Camera Ready",
                    description:
                      "Enable your camera and find good lighting for optimal face-to-face interaction",
                  },
                  {
                    icon: Mic,
                    title: "Clear Audio",
                    description:
                      "Test your microphone in a quiet space for clear communication",
                  },
                  {
                    icon: Brain,
                    title: "AI Analysis",
                    description:
                      "Get real-time feedback on your responses and body language",
                  },
                  {
                    icon: Shield,
                    title: "Secure Session",
                    description:
                      "Your interview is private and encrypted end-to-end",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="group flex items-start gap-4 p-6 rounded-xl bg-[#0A0A0A] hover:bg-[#111111] transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-[#1a1a1a]">
                      <item.icon className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <div className="p-8 rounded-xl bg-[#0A0A0A]">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Interview Tips
                  </h2>
                  <ul className="space-y-4">
                    <li className="flex gap-3 text-gray-300">
                      <span className="text-blue-500">•</span>
                      <span>
                        Maintain eye contact with the camera to simulate real
                        interaction
                      </span>
                    </li>
                    <li className="flex gap-3 text-gray-300">
                      <span className="text-blue-500">•</span>
                      <span>Use the STAR method for behavioral questions</span>
                    </li>
                    <li className="flex gap-3 text-gray-300">
                      <span className="text-blue-500">•</span>
                      <span>Take brief pauses to gather your thoughts</span>
                    </li>
                    <li className="flex gap-3 text-gray-300">
                      <span className="text-blue-500">•</span>
                      <span>Keep responses focused and concise</span>
                    </li>
                  </ul>

                  {error && (
                    <div className="mt-6 p-4 rounded-lg bg-red-900/20 border border-red-900/50 text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    onClick={handleStartPersonaCreation}
                    disabled={loading}
                    className="mt-8 w-full py-4 px-6 text-lg font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Preparing Interview...</span>
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </button>

                  <p className="mt-4 text-sm text-center text-gray-500">
                    By starting, you agree to our terms and conditions
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Loader
            loadingStates={loadingStates}
            loading={loading}
            duration={2000}
          />

          {loading && (
            <button
              className="fixed top-4 right-4 text-gray-400 hover:text-white z-[120] transition-colors"
              onClick={() => setLoading(false)}
            >
              <IconSquareRoundedX className="h-8 w-8" />
            </button>
          )}
        </div>
      ) : (
        <div id="call-wrapper" className="fixed inset-0 z-50 bg-black"></div>
      )}
    </>
  );
};

export default PreInterviewRoom;
