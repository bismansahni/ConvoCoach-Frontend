"use client";

import { useState, useEffect } from "react";
import { Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { storage, db, auth } from "@/lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, getDoc, collection, addDoc, updateDoc } from "firebase/firestore";
import { createcandidate } from "@/service/api";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import {getFirebaseIdToken} from "@/service/AuthHelper";

export default function NewInterviewForm() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    jobDescription: "",
    companyName: "",
    targetPosition: "",
  });
  const [resumeName, setResumeName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // New function to check if form is complete
  const isFormComplete = () => {
    return (
      formData.companyName.trim() !== "" &&
      formData.targetPosition.trim() !== "" &&
      formData.jobDescription.trim() !== "" &&
      selectedFile !== null
    );
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            jobDescription: data.jobDesc || "",
            companyName: data.companyName || "",
            targetPosition: data.targetPosition || "",
          });
        }
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  // const handleResumeChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setResumeName(file.name);
  //     setSelectedFile(file);
  //   }
  // };
  //
  //
  // const handleResumeChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     if (file.type !== "application/pdf") {
  //       setError("Only PDF files are allowed.");
  //       setResumeName("");
  //       setSelectedFile(null);
  //       return;
  //     }
  //     setResumeName(file.name);
  //     setSelectedFile(file);
  //     setError(""); // Clear any previous errors
  //   }
  // };




  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3 MB in bytes

    if (file) {
      if (file.type !== "application/pdf") {
        setError("Only PDF files are allowed.");
        setResumeName("");
        setSelectedFile(null);
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setError("File size exceeds 3 MB limit.");
        setResumeName("");
        setSelectedFile(null);
        return;
      }

      setResumeName(file.name);
      setSelectedFile(file);
      setError(""); // Clear previous errors
    }
  };


  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const uploadResume = async (file, userId, interviewId) => {
    const storageRef = ref(
      storage,
      `resumes/${userId}/${interviewId}/resume.pdf`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          setError("Error uploading resume: " + error.message);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormComplete()) {
      setError("Please fill out all fields and upload your resume.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {

      const idToken = await getFirebaseIdToken();
      let resumeUrl = null;

      const creditCheckResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/check-credit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
            Authorization: idToken,
        },
        body: JSON.stringify({ uid: user.uid }),
      });

      if (creditCheckResponse.status === 403) {
        alert("No credits available. Please purchase more credits to continue.");
        setIsSubmitting(false);
        return;
      }

      if (!creditCheckResponse.ok) {
        const errorData = await creditCheckResponse.json();
        throw new Error(errorData.error || "Error checking credits");
      }

      const creditData = await creditCheckResponse.json();
      const { current_credits } = creditData;

      console.log(`Credits available: ${current_credits}`);

      const interviewCollectionRef = collection(
        db,
        "users",
        user.uid,
        "interviewDetails"
      );
      const newDocRef = await addDoc(interviewCollectionRef, {
        companyName: formData.companyName,
        targetPosition: formData.targetPosition,
        jobDescription: formData.jobDescription,
        resumeUrl: null,
        timestamp: new Date().toISOString(),
        interviewStatus: "candidate-file-created",
      });

      if (selectedFile) {
        resumeUrl = await uploadResume(selectedFile, user.uid, newDocRef.id);
        const docRef = doc(
          db,
          "users",
          user.uid,
          "interviewDetails",
          newDocRef.id
        );
        await updateDoc(docRef, { resumeUrl });
      }

      const payload = {
        uid: user.uid,
        interviewDocId: newDocRef.id,
      };

      setShowSuccess(true);
      const result = await createcandidate(payload);

      if (result.success) {
        setTimeout(() => {
          router.push(`/dashboard/pre-interview-room?id=${newDocRef.id}`);
        }, 1500);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Error starting interview: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full min-w-[320px] max-w-[1200px] mx-auto">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">
          Start New Interview
        </CardTitle>
        <CardDescription>Practice for your upcoming interviews</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="companyName">Target Company</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Enter your target company"
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea
                id="jobDescription"
                value={formData.jobDescription}
                onChange={handleInputChange}
                placeholder="Paste the job description here to help us prepare relevant interview questions"
                className="h-32 resize-none"
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="targetPosition">Target Position</Label>
              <Input
                id="targetPosition"
                value={formData.targetPosition}
                onChange={handleInputChange}
                placeholder="Enter target position"
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="resume">Resume</Label>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Input
                    id="resume"
                    type="file"
                    className="hidden"
                    onChange={handleResumeChange}
                    accept=".pdf"
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("resume").click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Resume
                  </Button>
                  {resumeName && <span className="text-sm">{resumeName}</span>}
                </div>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 pt-7">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={!isFormComplete() || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Starting Interview...
            </>
          ) : (
            "Start Interview"
          )}
        </Button>
        <p className="text-sm text-muted-foreground text-center">
          Our AI will analyze your resume and job description to create a
          personalized interview experience. Make sure to provide accurate
          information for the best results.
        </p>
      </CardFooter>
    </Card>
  );
}
