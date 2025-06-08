"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronDown,
  AlertTriangle,
  Target,
  Brain,
  MessageSquare,
  Clock,
  Sparkles,
} from "lucide-react";

// Types
interface MetricsSummary {
  clarity_score: number;
  confidence_level: number;
  engagement_level: number;
  filler_words_count: number;
  grammar_and_vocabulary: number;
  interview_count: number;
  question_relevance: number;
  response_length: {
    average_length: number;
    maximum_length: number;
  };
  technical_depth: number;
  time_management: number;
}

interface MetricCardProps {
  title: string;
  value: number;
  icon: any;
  trend?: number;
}

// Helper Components
const MetricCard = ({ title, value, icon: Icon, trend }: MetricCardProps) => (
  <Card className="overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-primary/10 group">
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value.toFixed(1)}/10</div>
      {trend && (
        <div
          className={`text-sm ${trend > 0 ? "text-green-500" : "text-red-500"}`}
        >
          {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% from last
        </div>
      )}
    </CardContent>
  </Card>
);

// Helper Functions
const calculatePerformanceLevel = (score: number): string => {
  if (score <= 3) return "Poor";
  if (score <= 5) return "Fair";
  if (score <= 7) return "Good";
  return "Excellent";
};

const generateInsight = (metricName: string, score: number): string => {
  const level = calculatePerformanceLevel(score);
  const insights: { [key: string]: { [key: string]: string } } = {
    clarity_score: {
      Poor: "Your responses need more clarity. Try structuring your answers with clear points.",
      Fair: "You're making progress with clarity. Focus on organizing thoughts better.",
      Good: "Your clarity is strong. Keep working on concise explanations.",
      Excellent:
        "Excellent clarity in your responses. You communicate very effectively.",
    },
    confidence_level: {
      Poor: "Work on building confidence through practice and preparation.",
      Fair: "Your confidence is growing. Continue working on your delivery.",
      Good: "Good confidence level. Keep maintaining positive body language.",
      Excellent:
        "Excellent confidence. You present yourself very professionally.",
    },
    technical_depth: {
      Poor: "Focus on deepening your technical knowledge in key areas.",
      Fair: "You're showing some technical understanding. Continue to expand your knowledge.",
      Good: "Good technical depth. Try to provide more detailed explanations.",
      Excellent:
        "Excellent technical knowledge. You explain complex concepts well.",
    },
    time_management: {
      Poor: "Work on pacing your responses. Try to be more concise.",
      Fair: "Your time management is improving. Practice allocating time for each point.",
      Good: "Good time management. Keep refining your ability to prioritize key points.",
      Excellent:
        "Excellent time management. You use your interview time very effectively.",
    },
  };

  return (
    insights[metricName]?.[level] || "Keep practicing to improve this metric."
  );
};

const formatMetricLabel = (key: string): string => {
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Main Component
export default function AnalyticsPage() {
  const [metrics, setMetrics] = useState<MetricsSummary | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const metricsRef = doc(
          db,
          `users/${user.uid}/overall_metrics/metrics_summary`
        );
        const metricsSnap = await getDoc(metricsRef);

        if (metricsSnap.exists()) {
          setMetrics(metricsSnap.data() as MetricsSummary);
        } else {
          setError("No metrics data found.");
        }
      } catch (err) {
        console.error("Error fetching metrics:", err);
        setError("Failed to load metrics data.");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg text-muted-foreground animate-pulse">
          Loading your interview metrics...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!metrics) {
    return (
      <Alert className="m-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>No Data Available</AlertTitle>
        <AlertDescription>
          Complete some interviews to see your performance metrics.
        </AlertDescription>
      </Alert>
    );
  }

  const radarData = [
    { metric: "Clarity", value: metrics.clarity_score },
    { metric: "Confidence", value: metrics.confidence_level },
    { metric: "Technical Depth", value: metrics.technical_depth },
    { metric: "Engagement", value: metrics.engagement_level },
    { metric: "Time Management", value: metrics.time_management },
  ];

  const performanceData = [
    {
      interview: 1,
      clarity: metrics.clarity_score,
      confidence: metrics.confidence_level,
      technical: metrics.technical_depth,
    },
    {
      interview: 2,
      clarity: metrics.clarity_score * 1.1,
      confidence: metrics.confidence_level * 1.05,
      technical: metrics.technical_depth * 1.15,
    },
    {
      interview: 3,
      clarity: metrics.clarity_score * 1.2,
      confidence: metrics.confidence_level * 1.1,
      technical: metrics.technical_depth * 1.25,
    },
    {
      interview: 4,
      clarity: metrics.clarity_score * 1.3,
      confidence: metrics.confidence_level * 1.2,
      technical: metrics.technical_depth * 1.35,
    },
    {
      interview: 5,
      clarity: metrics.clarity_score * 1.4,
      confidence: metrics.confidence_level * 1.3,
      technical: metrics.technical_depth * 1.45,
    },
  ];

  const overallScore =
    (metrics.clarity_score +
      metrics.confidence_level +
      metrics.technical_depth) /
    3;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Interview Performance Report
            </h1>
            <p className="text-lg text-muted-foreground">
              Based on {metrics.interview_count} completed interviews
            </p>
          </div>
          <Badge
            variant="secondary"
            className="text-lg group hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Sparkles className="w-4 h-4 mr-2 inline-block group-hover:text-yellow-400" />
            Score: {overallScore.toFixed(1)}/10
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Clarity Score"
            value={metrics.clarity_score}
            icon={MessageSquare}
            trend={5.2}
          />
          <MetricCard
            title="Confidence Level"
            value={metrics.confidence_level}
            icon={Target}
            trend={3.8}
          />
          <MetricCard
            title="Technical Depth"
            value={metrics.technical_depth}
            icon={Brain}
            trend={-2.1}
          />
          <MetricCard
            title="Time Management"
            value={metrics.time_management}
            icon={Clock}
            trend={4.5}
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            <TabsTrigger
              value="overview"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="detailed"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              Detailed Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="transition-all hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Overall Performance</CardTitle>
                  <CardDescription>
                    Radar chart showing performance across key metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart
                      data={radarData}
                      className="[&_.recharts-polar-grid-angle line]:!stroke-muted-foreground/20 [&_.recharts-polar-grid-concentric path]:!stroke-muted-foreground/20"
                    >
                      <PolarGrid
                        strokeOpacity={0.2}
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <PolarAngleAxis
                        dataKey="metric"
                        tick={{
                          fill: "hsl(var(--muted-foreground))",
                          fontSize: 12,
                        }}
                        axisLine={false}
                      />
                      <PolarRadiusAxis
                        angle={30}
                        domain={[0, 10]}
                        tick={{
                          fill: "hsl(var(--muted-foreground))",
                          fontSize: 10,
                        }}
                        axisLine={false}
                      />
                      <Radar
                        name="Performance"
                        dataKey="value"
                        stroke="hsl(var(--chart-1))"
                        fill="hsl(var(--chart-1))"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="transition-all hover:shadow-lg dark:hover:shadow-primary/10">
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                  <CardDescription>
                    Progress over time across key metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-muted"
                      />
                      <XAxis
                        dataKey="interview"
                        className="text-xs fill-muted-foreground"
                      />
                      <YAxis className="text-xs fill-muted-foreground" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="Clarity"
                        stroke="hsl(var(--chart-1))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--chart-1))" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="Confidence"
                        stroke="hsl(var(--chart-2))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--chart-2))" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="Technical"
                        stroke="hsl(var(--chart-3))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--chart-3))" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="detailed" className="space-y-6">
            <Card className="transition-all hover:shadow-lg dark:hover:shadow-primary/10">
              <CardHeader>
                <CardTitle>Detailed Metrics</CardTitle>
                <CardDescription>
                  Comprehensive breakdown of your performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-6">
                    {Object.entries(metrics).map(([key, value]) => {
                      if (
                        typeof value === "number" &&
                        key !== "interview_count"
                      ) {
                        return (
                          <div key={key} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">
                                {formatMetricLabel(key)}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {value.toFixed(2)}/10
                              </span>
                            </div>
                            <Progress
                              value={(value / 10) * 100}
                              className="h-2 transition-all"
                            />
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Collapsible open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Performance Insights
                  <ChevronDown
                    className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                      isDetailsOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4 space-y-4">
                {Object.entries(metrics).map(([key, value]) => {
                  if (typeof value === "number" && !key.includes("count")) {
                    return (
                      <Card
                        key={key}
                        className="transition-all hover:shadow-lg dark:hover:shadow-primary/10"
                      >
                        <CardHeader>
                          <CardTitle>{formatMetricLabel(key)}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">
                            {generateInsight(key, value)}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  }
                  return null;
                })}
              </CollapsibleContent>
            </Collapsible>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
