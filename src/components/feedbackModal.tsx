"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { toast } from "sonner";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  interviewId: string;
}

export function FeedbackModal({
  isOpen,
  onClose,
  interviewId,
}: FeedbackModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = [
    {
      
      id: "overall",
      label: "How would you rate your overall interview experience?",
      type: "rating",
    },
    {
      id: "strengths",
      label: "What do you think were your strengths during the interview?",
      type: "text",
    },
    {
      id: "improvements",
      label: "Are there any areas you feel you could improve on?",
      type: "text",
    },
    {
      id: "feedback",
      label: "Do you have any feedback for our interview process?",
      type: "textarea",
    },
  ];

  const onSubmit = async (data: Record<string, string>) => {
    if (!auth.currentUser || !interviewId) {
      toast.error("Unable to submit feedback. Please try again.");
      return;
    }

    setIsSubmitting(true);

    try {
      const uid = auth.currentUser.uid;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/register_personal_feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid,
            interviewId,
            ...data,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      toast.success("Feedback submitted successfully!");
      onClose();
      // router.push("/dashboard");
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle></DialogTitle>
      <DialogContent className="sm:max-w-[600px] p-0 bg-black border border-white/20 shadow-2xl">
        <div className="relative p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Post-Interview Feedback
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Help us improve our AI interview process
              </p>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              className="h-8 w-8 p-0 rounded-full hover:bg-white/10"
              disabled={isSubmitting}
            >
              <X className="h-4 w-4 text-white/70" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {questions.map((question) => (
              <div key={question.id} className="space-y-3">
                <Label
                  htmlFor={question.id}
                  className="text-sm font-medium text-white/90"
                >
                  {question.label}
                </Label>

                {question.type === "rating" && (
                  <div className="flex gap-3">
                    {[1, 2, 3, 4, 5].map((value) => {
                      const isSelected =
                        watch(question.id) === value.toString();
                      return (
                        <Button
                          key={value}
                          type="button"
                          variant="outline"
                          disabled={isSubmitting}
                          className={cn(
                            "w-12 h-12 rounded-full border transition-all duration-200",
                            isSelected
                              ? "bg-white/10 border-white text-white"
                              : "bg-black border-white/20 text-white/70 hover:bg-white/5 hover:border-white/40"
                          )}
                          onClick={() => {
                            register(question.id, { required: true }).onChange({
                              target: {
                                name: question.id,
                                value: value.toString(),
                              },
                              type: "custom",
                            });
                          }}
                        >
                          {value}
                        </Button>
                      );
                    })}
                  </div>
                )}

                {question.type === "text" && (
                  <div className="relative">
                    <Input
                      id={question.id}
                      disabled={isSubmitting}
                      className={cn(
                        "bg-black border-white/20 text-white h-11 px-4",
                        "focus:border-white/50 focus:ring-1 focus:ring-white/20 hover:border-white/30",
                        "transition-colors placeholder:text-white/30"
                      )}
                      placeholder="Type your answer here..."
                      {...register(question.id, { required: true })}
                    />
                    {errors[question.id] && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                      </div>
                    )}
                  </div>
                )}

                {question.type === "textarea" && (
                  <div className="relative">
                    <Textarea
                      id={question.id}
                      disabled={isSubmitting}
                      className={cn(
                        "bg-black border-white/20 text-white min-h-[120px] px-4 py-3",
                        "focus:border-white/50 focus:ring-1 focus:ring-white/20 hover:border-white/30",
                        "transition-colors placeholder:text-white/30 resize-none"
                      )}
                      placeholder="Type your feedback here..."
                      {...register(question.id, { required: true })}
                    />
                    {errors[question.id] && (
                      <div className="absolute right-3 top-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "bg-white text-black hover:bg-white/90 px-8 h-11",
                  "transition-colors duration-200 rounded-lg font-medium",
                  isSubmitting && "opacity-50 cursor-not-allowed"
                )}
              >
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
