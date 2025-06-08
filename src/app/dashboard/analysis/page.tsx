"use client";

import { Fragment, useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  MessageSquare,
  Clock,
  Mic,
  AlertCircle,
  ThumbsUp,
  Download,
  User,
  UserRound,
  Eye,
  Target,
  BarChart,
  MessageCircle,
  Brain,
  Clock3,
  VolumeX,
  FileText,
  Check,
  Award,
} from "lucide-react";
import { db, auth } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const AnalysisContent = () => {
  const searchParams = useSearchParams();
  const [interviewData, setInterviewData] = useState(null);
  const [transcription, setTranscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedScene, setSelectedScene] = useState(null);
  const [isSceneOpen, setIsSceneOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("transcript");

  useEffect(() => {
    const fetchData = async () => {
      const id = searchParams.get("id");
      if (!id || !auth.currentUser) {
        setError("Invalid request or not authenticated");
        setLoading(false);
        return;
      }

      const uid = auth.currentUser.uid;

      try {
        const interviewDoc = await getDoc(
          doc(db, `users/${uid}/interviewDetails/${id}`)
        );
        const transcriptionDoc = await getDoc(
          doc(db, `users/${uid}/interviewDetails/${id}/analysis/transcription`)
        );
        // Add this new fetch for AI feedback
        const aiFeedbackDoc = await getDoc(
          doc(db, `users/${uid}/interviewDetails/${id}/analysis/ai_feedback`)
        );

        if (interviewDoc.exists()) {
          const interviewData = interviewDoc.data();
          // Merge AI feedback data with interview data
          if (aiFeedbackDoc.exists()) {
            interviewData.aiFeedback = aiFeedbackDoc.data();
          }
          setInterviewData(interviewData);
        }

        if (transcriptionDoc.exists()) {
          let transcriptData;
          try {
            transcriptData =
              typeof transcriptionDoc.data().transcription === "string"
                ? JSON.parse(transcriptionDoc.data().transcription)
                : transcriptionDoc.data().transcription;
          } catch (e) {
            transcriptData = transcriptionDoc.data().transcription;
          }
          setTranscription(transcriptData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load interview data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  const createChatMessages = () => {
    const messages = [];
    transcription?.interview?.forEach((item) => {
      if (item.question || item.response) {
        messages.push({
          type: "interviewer",
          content: item.question || item.response,
          visual_scene: item.visual_scene,
        });
      }
      if (item.answer && item.answer.trim()) {
        messages.push({
          type: "interviewee",
          content: item.answer,
          visual_scene: item.visual_scene,
        });
      }
    });
    return messages;
  };

  const renderMessage = (message) => {
    const isInterviewer = message.type === "interviewer";

    const handleSceneClick = () => {
      setSelectedScene(message.visual_scene);
      setIsSceneOpen(true);
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={`flex w-full mb-6 ${
          isInterviewer ? "justify-start pr-12" : "justify-end pl-12"
        }`}
      >
        <div className={`flex items-start gap-3 max-w-[80%]`}>
          {isInterviewer && (
            <Avatar>
              <AvatarFallback>
                <UserRound className="h-10 w-10 p-2" />
              </AvatarFallback>
            </Avatar>
          )}

          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <Badge
                variant={isInterviewer ? "secondary" : "default"}
                className="px-2 py-0.5 text-xs"
              >
                {isInterviewer ? "Interviewer" : "You"}
              </Badge>
            </div>

            <div
              className={`rounded-lg px-4 py-3 ${
                isInterviewer
                  ? "bg-secondary/70 text-secondary-foreground rounded-tl-none"
                  : "bg-primary text-primary-foreground rounded-tr-none"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>

            {message.visual_scene && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSceneClick}
                className="mt-1 text-xs self-start hover:bg-secondary/50 transition-colors"
              >
                <Eye className="h-3 w-3 mr-1" />
                View Scene
              </Button>
            )}
          </div>

          {!isInterviewer && (
            <Avatar>
              <AvatarFallback>
                <User className="h-10 w-10 p-2" />
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  const chatMessages = createChatMessages();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90 pt-10">
      <main className="container mx-auto max-w-7xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-foreground mb-2">
                Interview Analysis
              </h2>
              <p className="text-xl text-muted-foreground mb-1">
                {interviewData?.companyName} - {interviewData?.targetPosition}
              </p>
              <p className="text-sm text-muted-foreground">
                {interviewData?.timestamp &&
                  new Date(interviewData.timestamp).toLocaleString()}
              </p>
            </div>
            <Button variant="outline" className="self-start md:self-center">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </motion.div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger
              value="transcript"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
            >
              Transcript
            </TabsTrigger>
            <TabsTrigger
              value="feedback"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
            >
              AI Feedback
            </TabsTrigger>
            <TabsTrigger
              value="metrics"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
            >
              Metrics
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="transcript">
                <Card className="backdrop-blur-sm bg-background/95">
                  <CardHeader>
                    <CardTitle>Interview Transcript</CardTitle>
                    <CardDescription>
                      Complete conversation transcript
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[600px] rounded-md border p-6">
                      <div className="flex flex-col space-y-4">
                        <AnimatePresence>
                          {chatMessages.map((message, index) => (
                            <Fragment key={index}>
                              {renderMessage(message)}
                            </Fragment>
                          ))}
                        </AnimatePresence>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="feedback">
                <Card className="backdrop-blur-sm bg-background/95">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Interview Response Analysis
                    </CardTitle>
                    <CardDescription>
                      Detailed analysis of your responses to each interview
                      question
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[600px] pr-4">
                      <div className="space-y-8">
                        {interviewData?.aiFeedback?.correctness?.map(
                          (item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="rounded-lg border p-6 bg-card"
                            >
                              {/* Question Header */}
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                  <span className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-sm">
                                    {index + 1}
                                  </span>
                                  Question
                                </h3>
                                <Badge>Score: {item.score}/10</Badge>
                              </div>

                              {/* Question Content */}
                              <div className="space-y-4">
                                <div className="bg-muted/30 p-4 rounded-lg">
                                  <p className="text-lg">{item.question}</p>
                                </div>

                                {/* Answers Grid */}
                                <div className="grid gap-4 mt-6">
                                  {/* Your Answer */}
                                  <div>
                                    <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                                      <User className="h-4 w-4" />
                                      Your Response
                                    </h4>
                                    <div className="bg-primary/5 p-4 rounded-lg">
                                      <p className="text-sm leading-relaxed">
                                        {item.actual_answer ||
                                          "No response provided"}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Expected Answer */}
                                  <div>
                                    <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                                      <Check className="h-4 w-4" />
                                      Expected Response
                                    </h4>
                                    <div className="bg-secondary/5 p-4 rounded-lg">
                                      <p className="text-sm leading-relaxed">
                                        {item.expected_answer}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Score Visualization */}
                                <div className="mt-4">
                                  <Progress
                                    value={item.score * 10}
                                    className="h-2"
                                  />
                                </div>
                              </div>
                            </motion.div>
                          )
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="metrics">
                <div className="grid gap-6">
                  {/* Performance Overview Cards */}
                  <div className="grid gap-6 md:grid-cols-4">
                    {[
                      {
                        title: "Overall Performance",
                        icon: Award,
                        score:
                          interviewData?.aiFeedback?.behavioral_questions
                            ?.clarity_score || 0,
                        color: "text-primary",
                      },
                      {
                        title: "Technical Skills",
                        icon: Brain,
                        score:
                          interviewData?.aiFeedback?.technical_depth?.score ||
                          0,
                        color: "text-blue-500",
                      },
                      {
                        title: "Communication",
                        icon: MessageSquare,
                        score:
                          interviewData?.aiFeedback?.grammar_and_vocabulary
                            ?.score || 0,
                        color: "text-green-500",
                      },
                      {
                        title: "Confidence Level",
                        icon: Target,
                        score:
                          interviewData?.aiFeedback?.confidence_level?.score ||
                          0,
                        color: "text-purple-500",
                      },
                    ].map((metric, index) => (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <div className="flex flex-col items-center text-center">
                            <metric.icon
                              className={`h-8 w-8 ${metric.color} mb-2`}
                            />
                            <h3 className="font-semibold mb-3">
                              {metric.title}
                            </h3>
                            <div className="text-3xl font-bold">
                              {metric.score}/10
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Detailed Metrics Grid */}
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Communication Analysis */}
                    <Card className="backdrop-blur-sm bg-background/95">
                      <CardHeader>
                        <CardTitle>Communication Analysis</CardTitle>
                        <CardDescription>
                          Detailed breakdown of your communication style
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          {/* Response Quality */}
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium">
                                Response Quality
                              </span>
                              <span className="text-sm">
                                {
                                  interviewData?.aiFeedback?.question_relevance
                                    ?.score
                                }
                                /10
                              </span>
                            </div>
                            <Progress
                              value={
                                interviewData?.aiFeedback?.question_relevance
                                  ?.score * 10
                              }
                              className="h-2"
                            />
                            <p className="text-sm text-muted-foreground mt-2">
                              {
                                interviewData?.aiFeedback?.question_relevance
                                  ?.feedback
                              }
                            </p>
                          </div>

                          {/* Language Proficiency */}
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium">
                                Language Proficiency
                              </span>
                              <span className="text-sm">
                                {
                                  interviewData?.aiFeedback
                                    ?.grammar_and_vocabulary?.score
                                }
                                /10
                              </span>
                            </div>
                            <Progress
                              value={
                                interviewData?.aiFeedback
                                  ?.grammar_and_vocabulary?.score * 10
                              }
                              className="h-2"
                            />
                            <p className="text-sm text-muted-foreground mt-2">
                              {
                                interviewData?.aiFeedback
                                  ?.grammar_and_vocabulary?.feedback
                              }
                            </p>
                          </div>

                          {/* Filler Words */}
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium">
                                Filler Words Used
                              </span>
                              <span className="text-sm">
                                {interviewData?.aiFeedback?.filler_words_count}{" "}
                                instances
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Performance Insights */}
                    <Card className="backdrop-blur-sm bg-background/95">
                      <CardHeader>
                        <CardTitle>Performance Insights</CardTitle>
                        <CardDescription>
                          Key strengths and areas for improvement
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {/* Strengths */}
                          <div className="space-y-2">
                            <h4 className="font-semibold flex items-center gap-2 text-green-500">
                              <ThumbsUp className="h-4 w-4" />
                              Strengths
                            </h4>
                            <p className="text-sm">
                              {interviewData?.aiFeedback?.summary?.strengths}
                            </p>
                          </div>

                          <Separator />

                          {/* Areas for Improvement */}
                          <div className="space-y-2">
                            <h4 className="font-semibold flex items-center gap-2 text-yellow-500">
                              <AlertCircle className="h-4 w-4" />
                              Areas for Improvement
                            </h4>
                            <p className="text-sm">
                              {interviewData?.aiFeedback?.summary?.weaknesses}
                            </p>
                          </div>

                          <Separator />

                          {/* Recommendations */}
                          <div className="space-y-2">
                            <h4 className="font-semibold flex items-center gap-2 text-blue-500">
                              <Target className="h-4 w-4" />
                              Recommendations
                            </h4>
                            <p className="text-sm">
                              {interviewData?.aiFeedback?.summary?.suggestions}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>

        <Dialog open={isSceneOpen} onOpenChange={setIsSceneOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Scene Description</DialogTitle>
            </DialogHeader>
            <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
              <Eye className="h-5 w-5 mt-0.5 text-muted-foreground flex-shrink-0" />
              <p className="text-sm leading-relaxed text-muted-foreground">
                {selectedScene}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default function IndividualAnalysisPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <div className="text-lg animate-pulse">Loading...</div>
        </div>
      }
    >
      <AnalysisContent />
    </Suspense>
  );
}
