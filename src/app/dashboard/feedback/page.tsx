"use client";

import { useState, useEffect } from "react";
import { send } from "@emailjs/browser";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Smile,
  Lightbulb,
  Star,
  Send as SendIcon,
  Sparkles,
} from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { type LucideIcon } from "lucide-react";

function FeedbackSection({
  icon: Icon,
  title,
  name,
  value,
  onChange,
  placeholder,
}: {
  icon: LucideIcon;
  title: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        <h3 className="text-base font-medium text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
      <Textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="h-52 resize-none rounded-xl border-gray-200 bg-white text-base shadow-sm transition-all 
                 placeholder:text-gray-500 focus:border-gray-300 focus:shadow-md
                 dark:border-gray-800 dark:bg-gray-900 dark:text-white 
                 dark:placeholder:text-gray-500 dark:focus:border-gray-700 dark:focus:shadow-lg"
        required
      />
    </div>
  );
}

export default function FeedbackPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    usability_feedback: "",
    feature_request: "",
    overall_experience: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            const name = data.name || user.displayName || "User";
            const email = data.email || user.email;

            setFormData((prev) => ({
              ...prev,
              from_name: name,
              from_email: email,
            }));
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Failed to load user data");
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.from_name ||
      !formData.from_email ||
      !formData.usability_feedback
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.from_email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      await send(
        "service_58g5dc9",
        "template_o8vgcrb",
        formData,
        "f0ONplS3lviKpi4C6"
      );

      toast.success("Feedback sent successfully!");

      setFormData((prev) => ({
        ...prev,
        usability_feedback: "",
        feature_request: "",
        overall_experience: "",
      }));
    } catch (error) {
      console.error("Feedback sending failed:", error);
      toast.error("Failed to send feedback. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-12 transition-colors dark:bg-black">
      <Toaster />
      <form onSubmit={handleSubmit} className="mx-auto max-w-6xl space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Share Your Feedback
          </h1>
          <p className="mx-auto max-w-2xl text-base text-gray-500 dark:text-gray-400">
            Help shape the future of ConvoCoach. Your insights and suggestions
            drive our commitment to creating the best possible experience for
            our users.
          </p>
          <div className="mx-auto flex max-w-xl items-center gap-3">
            <Input
              id="from_name"
              name="from_name"
              value={formData.from_name}
              readOnly
              className="h-10 rounded-xl border-gray-200 bg-white text-base shadow-sm text-gray-900
                       dark:border-gray-800 dark:bg-gray-900 dark:text-white"
            />
            <Input
              id="from_email"
              name="from_email"
              type="email"
              value={formData.from_email}
              readOnly
              className="h-10 rounded-xl border-gray-200 bg-white text-base shadow-sm text-gray-900
                       dark:border-gray-800 dark:bg-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div
          className="rounded-2xl bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 p-6
                      dark:from-blue-950/50 dark:to-indigo-950/50 dark:border-gray-800"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-yellow-500 dark:text-blue-400" />
            <p className="text-base font-medium text-yellow-800 dark:text-white">
              Beta Testing Phase
            </p>
          </div>
          <p className="mt-2 text-base text-yellow-700 dark:text-gray-300">
            We're currently in beta, and your feedback is incredibly valuable.
            Every suggestion helps us refine and perfect ConvoCoach for
            everyone.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeedbackSection
            icon={Smile}
            title="Usability Feedback"
            name="usability_feedback"
            value={formData.usability_feedback}
            onChange={handleChange}
            placeholder="What aspects of ConvoCoach work well for you? Where do you see room for improvement?"
          />
          <FeedbackSection
            icon={Lightbulb}
            title="Feature Suggestions"
            name="feature_request"
            value={formData.feature_request}
            onChange={handleChange}
            placeholder="What features would make ConvoCoach even better for your needs?"
          />
          <FeedbackSection
            icon={Star}
            title="Overall Experience"
            name="overall_experience"
            value={formData.overall_experience}
            onChange={handleChange}
            placeholder="Tell us about your experience with ConvoCoach. What stands out?"
          />
        </div>

        <div className="flex justify-center pt-6">
          <Button
            type="submit"
            size="lg"
            className="h-12 min-w-[200px] rounded-full bg-gray-900 text-base font-medium text-white
                     transition-all hover:bg-gray-800
                     dark:bg-white dark:text-black dark:hover:bg-gray-100"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                <span>Sending...</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <SendIcon className="h-5 w-5" />
                <span>Send Feedback</span>
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
