// "use client";
//
// import { useEffect, useState, Suspense } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { auth, db } from "@/lib/firebase";
// import { doc, getDoc } from "firebase/firestore";
//
// // Separate component for the transcription content
// const TranscriptionContent = ({ searchParams }) => {
//   const [transcription, setTranscription] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const router = useRouter();
//
//   useEffect(() => {
//     const fetchTranscription = async () => {
//       const interviewId = searchParams.get("id");
//
//       if (!interviewId) {
//         setError("Interview ID is missing.");
//         setLoading(false);
//         console.error("Interview ID is missing.");
//         return;
//       }
//
//       const user = auth.currentUser;
//
//       if (!user) {
//         console.error("User is not authenticated. Redirecting to login.");
//         router.push("/login");
//         return;
//       }
//
//       const uid = user.uid;
//
//       try {
//         const transcriptionDocRef = doc(
//           db,
//           `users/${uid}/interviewDetails/${interviewId}/analysis/transcription`
//         );
//
//         const docSnap = await getDoc(transcriptionDocRef);
//
//         if (docSnap.exists()) {
//           setTranscription(docSnap.data().transcription);
//         } else {
//           setError("No transcription found.");
//         }
//       } catch (err) {
//         setError("Error fetching transcription: " + err.message);
//         console.error("Error fetching transcription:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//
//     fetchTranscription();
//   }, [searchParams, router]);
//
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen flex-col">
//         <h1>Loading Transcription...</h1>
//       </div>
//     );
//   }
//
//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen flex-col">
//         <h1>Error</h1>
//         <p>{error}</p>
//       </div>
//     );
//   }
//
//   return (
//     <div className="flex justify-center items-center h-screen flex-col p-5">
//       <h1 className="mb-3">Transcription</h1>
//       <pre className="whitespace-pre-wrap text-center">{transcription}</pre>
//     </div>
//   );
// };
//
// // Main page component with proper Suspense boundary
// const TranscriptionPage = () => {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <TranscriptionContentWrapper />
//     </Suspense>
//   );
// };
//
// // Wrapper component to handle useSearchParams
// const TranscriptionContentWrapper = () => {
//   const searchParams = useSearchParams();
//   return <TranscriptionContent searchParams={searchParams} />;
// };
//
// export default TranscriptionPage;



"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

// Separate component for the transcription content
const TranscriptionContent = ({ searchParams }) => {
  const [transcription, setTranscription] = useState(null); // State to hold transcription object
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchTranscription = async () => {
      const interviewId = searchParams.get("id");

      if (!interviewId) {
        setError("Interview ID is missing.");
        setLoading(false);
        console.error("Interview ID is missing.");
        return;
      }

      const user = auth.currentUser;

      if (!user) {
        console.error("User is not authenticated. Redirecting to login.");
        router.push("/login");
        return;
      }

      const uid = user.uid;

      try {
        const transcriptionDocRef = doc(
            db,
            `users/${uid}/interviewDetails/${interviewId}/analysis/transcription`
        );

        const docSnap = await getDoc(transcriptionDocRef);

        if (docSnap.exists()) {
          setTranscription(docSnap.data().transcription); // Correctly set transcription data
        } else {
          setError("No transcription found.");
        }
      } catch (err) {
        setError("Error fetching transcription: " + err.message);
        console.error("Error fetching transcription:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTranscription();
  }, [searchParams, router]);

  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen flex-col">
          <h1>Loading Transcription...</h1>
        </div>
    );
  }

  if (error) {
    return (
        <div className="flex justify-center items-center h-screen flex-col">
          <h1>Error</h1>
          <p>{error}</p>
        </div>
    );
  }

  return (
      <div className="flex justify-center items-center h-screen flex-col p-5">
        <h1 className="mb-3">Transcription</h1>
        {transcription && typeof transcription === "object" ? (
            <div className="text-left">
              {transcription.interview.map((item, index) => (
                  <div key={index} className="mb-4">
                    <h2 className="font-bold">Question:</h2>
                    <p>{item.question || "N/A"}</p>
                    {item.visual_scene && (
                        <>
                          <h2 className="font-bold">Visual Scene:</h2>
                          <p>{item.visual_scene}</p>
                        </>
                    )}
                    <h2 className="font-bold">Answer:</h2>
                    <p>{item.answer || "N/A"}</p>
                  </div>
              ))}
            </div>
        ) : (
            <pre className="whitespace-pre-wrap text-center">{transcription}</pre>
        )}
      </div>
  );
};

// Main page component with proper Suspense boundary
const TranscriptionPage = () => {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <TranscriptionContentWrapper />
      </Suspense>
  );
};

// Wrapper component to handle useSearchParams
const TranscriptionContentWrapper = () => {
  const searchParams = useSearchParams();
  return <TranscriptionContent searchParams={searchParams} />;
};

export default TranscriptionPage;
