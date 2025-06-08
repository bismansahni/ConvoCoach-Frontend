//
// "use client";
//
// import { useState, useEffect } from "react";
// import {
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     ResponsiveContainer,
// } from "recharts";
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
// import { collection, doc, getDocs } from "firebase/firestore";
// import { auth, db } from "@/lib/firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import {performanceData} from "@/components/dashboard/mockData";
//
// const chartConfig = {
//     fillerWords: {
//         label: "Filler Words",
//         color: "hsl(var(--chart-1))",
//     },
//     confidence: {
//         label: "Confidence",
//         color: "hsl(var(--chart-2))",
//     },
//     clarity: {
//         label: "Clarity",
//         color: "hsl(var(--chart-3))",
//     },
// };
//
// export default function PerformanceChart() {
//     const [performanceData, setPerformanceData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [uid, setUid] = useState(null);
//
//     const fetchPerformanceData = async (uid) => {
//         try {
//             console.log("Fetching data for UID:", uid);
//             const performanceGraphRef = collection(
//                 doc(collection(db, "users"), uid),
//                 "performance_graph"
//             );
//
//             const snapshot = await getDocs(performanceGraphRef);
//
//             const data = snapshot.docs.map((doc) => {
//                 const docData = doc.data();
//                 return {
//                     date: docData.timestamp.toDate().toISOString().slice(0, 7), // Format as "YYYY-MM"
//                     fillerWords: docData.fillerWords || 0,
//                     confidence: docData.confidence || 0,
//                     clarity: docData.clarity || 0,
//                 };
//             });
//
//             return data;
//         } catch (error) {
//             console.error("Error fetching performance data:", error);
//             return [];
//         }
//     };
//
//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, async (user) => {
//             if (user) {
//                 setUid(user.uid);
//                 setLoading(true);
//                 try {
//                     const data = await fetchPerformanceData(user.uid);
//                     setPerformanceData(data);
//                 } catch (error) {
//                     console.error("Error fetching performance data:", error);
//                 } finally {
//                     setLoading(false);
//                 }
//             } else {
//                 console.log("No user is authenticated");
//                 setUid(null);
//                 setPerformanceData([]);
//             }
//         });
//
//         return () => unsubscribe(); // Cleanup the auth listener
//     }, []);
//
//     const hasData = performanceData && performanceData.length > 0;
//
//     return (
//         <div>
//             <Card className="w-full min-w-[320px] max-w-[1200px] mx-auto">
//                 <CardHeader>
//                     <CardTitle className="text-xl sm:text-2xl">
//                         Performance Overview
//                     </CardTitle>
//                     <CardDescription>
//                         Your interview performance over time
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     {!loading && hasData && (
//                         <div className="flex justify-end gap-4 mb-4">
//                             {Object.keys(chartConfig).map((key) => {
//                                 if (!performanceData.some((item) => item[key] !== undefined)) return null;
//                                 return (
//                                     <div key={key} className="flex items-center gap-1">
//                                         <div
//                                             className="w-3 h-3 rounded-full"
//                                             style={{ backgroundColor: chartConfig[key]?.color }}
//                                         />
//                                         <span className="text-sm text-muted-foreground">
//                                             {chartConfig[key]?.label || key}
//                                         </span>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     )}
//                     <div className="h-[300px] sm:h-[400px] lg:h-[450px] w-full">
//                         <ChartContainer config={chartConfig}>
//                             <ResponsiveContainer width="100%" height="100%">
//                                 <LineChart
//                                     data={performanceData}
//                                     margin={{
//                                         top: 16,
//                                         right: 8,
//                                         left: 0,
//                                         bottom: 16,
//                                     }}
//                                 >
//                                     <CartesianGrid
//                                         strokeDasharray="1 0"
//                                         horizontal={true}
//                                         vertical={false}
//                                         stroke="hsl(var(--border))"
//                                         opacity={0.1}
//                                     />
//                                     <XAxis
//                                         dataKey="date"
//                                         tickLine={false}
//                                         axisLine={false}
//                                         tickMargin={8}
//                                         stroke="hsl(var(--muted-foreground))"
//                                         fontSize={12}
//                                         tick={{
//                                             fontSize: "0.75rem",
//                                             transform: "translate(0, 8)",
//                                         }}
//                                         interval="preserveStartEnd"
//                                     />
//                                     <YAxis
//                                         tickLine={false}
//                                         axisLine={false}
//                                         tickMargin={8}
//                                         stroke="hsl(var(--muted-foreground))"
//                                         fontSize={12}
//                                         tick={{ fontSize: "0.75rem" }}
//                                         width={40}
//                                     />
//                                     <ChartTooltip
//                                         cursor={false}
//                                         content={
//                                             <ChartTooltipContent
//                                                 style={{
//                                                     backgroundColor: "hsl(var(--background))",
//                                                     border: "1px solid hsl(var(--border))",
//                                                     borderRadius: "var(--radius)",
//                                                     padding: "0.5rem",
//                                                 }}
//                                             />
//                                         }
//                                     />
//                                     {Object.keys(chartConfig).map((key) => {
//                                         if (!performanceData.some((item) => item[key] !== undefined)) return null;
//                                         return (
//                                             <Line
//                                                 key={key}
//                                                 type="natural"
//                                                 dataKey={key}
//                                                 stroke={chartConfig[key]?.color}
//                                                 strokeWidth={2}
//                                                 dot={false}
//                                                 activeDot={{
//                                                     r: 4,
//                                                     strokeWidth: 0,
//                                                 }}
//                                             />
//                                         );
//                                     })}
//                                 </LineChart>
//                             </ResponsiveContainer>
//                         </ChartContainer>
//                     </div>
//                 </CardContent>
//
//                 <div className="pt-12"></div>
//             </Card>
//         </div>
//     );
// }





"use client";

import { useState, useEffect } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { collection, doc, getDocs } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const chartConfig = {
    fillerWords: {
        label: "Filler Words",
        color: "hsl(var(--chart-1))",
    },
    confidence: {
        label: "Confidence",
        color: "hsl(var(--chart-2))",
    },
    clarity: {
        label: "Clarity",
        color: "hsl(var(--chart-3))",
    },
};

export default function PerformanceChart() {
    const [performanceData, setPerformanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uid, setUid] = useState(null);

    const fetchPerformanceData = async (uid) => {
        try {
            console.log("Fetching data for UID:", uid);
            const performanceGraphRef = collection(
                doc(collection(db, "users"), uid),
                "performance_graph"
            );

            const snapshot = await getDocs(performanceGraphRef);

            const data = snapshot.docs.map((doc) => {
                const docData = doc.data();
                return {
                    date: docData.timestamp.toDate().toISOString().slice(0, 7), // Format as "YYYY-MM"
                    fillerWords: docData.fillerWords || 0,
                    confidence: docData.confidence || 0,
                    clarity: docData.clarity || 0,
                };
            });

            return data;
        } catch (error) {
            console.error("Error fetching performance data:", error);
            return [];
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUid(user.uid);
                setLoading(true);
                try {
                    const data = await fetchPerformanceData(user.uid);
                    setPerformanceData(data);
                } catch (error) {
                    console.error("Error fetching performance data:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                console.log("No user is authenticated");
                setUid(null);
                setPerformanceData([]);
            }
        });

        return () => unsubscribe(); // Cleanup the auth listener
    }, []);

    const hasData =
        performanceData &&
        performanceData.some((data) =>
            Object.keys(chartConfig).some((key) => data[key] !== undefined && data[key] !== 0)
        );

    return (

            <Card className="w-full min-w-[320px] max-w-[1200px] mx-auto">
                <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">
                        Performance Overview
                    </CardTitle>
                    <CardDescription>
                        Your interview performance over time
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        // Loading State
                        <div className="flex justify-center items-center h-[300px] sm:h-[400px] lg:h-[450px]">
                            <p className="text-sm text-muted-foreground">Loading...</p>
                        </div>
                    ) : hasData ? (
                        // Display Chart with Data
                        <>
                            <div className="flex justify-end gap-4 mb-4">
                                {Object.keys(chartConfig).map((key) => (
                                    <div key={key} className="flex items-center gap-1">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: chartConfig[key]?.color }}
                                        />
                                        <span className="text-sm text-muted-foreground">
                                            {chartConfig[key]?.label || key}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="h-[300px] sm:h-[400px] lg:h-[450px] w-full">
                                <ChartContainer config={chartConfig}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart
                                            data={performanceData}
                                            margin={{
                                                top: 16,
                                                right: 8,
                                                left: 0,
                                                bottom: 16,
                                            }}
                                        >
                                            <CartesianGrid
                                                strokeDasharray="1 0"
                                                horizontal
                                                vertical={false}
                                                stroke="hsl(var(--border))"
                                                opacity={0.1}
                                            />
                                            <XAxis
                                                dataKey="date"
                                                tickLine={false}
                                                axisLine={false}
                                                tickMargin={8}
                                                stroke="hsl(var(--muted-foreground))"
                                                fontSize={12}
                                                tick={{
                                                    fontSize: "0.75rem",
                                                    transform: "translate(0, 8)",
                                                }}
                                                interval="preserveStartEnd"
                                            />
                                            <YAxis
                                                tickLine={false}
                                                axisLine={false}
                                                tickMargin={8}
                                                stroke="hsl(var(--muted-foreground))"
                                                fontSize={12}
                                                tick={{ fontSize: "0.75rem" }}
                                                width={40}
                                            />
                                            <ChartTooltip
                                                cursor={false}
                                                content={
                                                    <ChartTooltipContent
                                                        style={{
                                                            backgroundColor: "hsl(var(--background))",
                                                            border: "1px solid hsl(var(--border))",
                                                            borderRadius: "var(--radius)",
                                                            padding: "0.5rem",
                                                        }}
                                                    />
                                                }
                                            />
                                            {Object.keys(chartConfig).map((key) => (
                                                <Line
                                                    key={key}
                                                    type="natural"
                                                    dataKey={key}
                                                    stroke={chartConfig[key]?.color}
                                                    strokeWidth={2}
                                                    dot={false}
                                                    activeDot={{
                                                        r: 4,
                                                        strokeWidth: 0,
                                                    }}
                                                />
                                            ))}
                                        </LineChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </div>
                        </>
                    ) : (
                        // No Data Fallback
                        <div className="flex justify-center items-center h-[300px] sm:h-[400px] lg:h-[450px]">
                            <p className="text-sm text-muted-foreground">
                                No performance data is available. Take at least two interviews to see your progress here.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

    );
}
