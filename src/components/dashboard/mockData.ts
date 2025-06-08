

import { db } from "@/lib/firebase"; // Firestore instance
import { collection, doc, getDocs } from "firebase/firestore";

export const performanceData = async (uid) => {
  try {
    // Reference to the user's performance_graph collection
    const performanceGraphRef = collection(
        doc(collection(db, "users"), uid), // Navigate to the user's document
        "performance_graph"
    );

    console.log("hahaa");

    // Fetch all documents in the performance_graph collection
    const snapshot = await getDocs(performanceGraphRef);

    // Iterate over the documents and format the data
    const data = snapshot.docs.map((doc) => {
      const docData = doc.data();
      return {
        date: docData.timestamp.toDate().toISOString().slice(0, 7), // Format as "YYYY-MM"
        fillerWords: docData.fillerWords || 0,
        confidence: docData.confidence || 0,
        clarity: docData.clarity || 0,
      };
    });

    console.log(snapshot.docs);

    return data;
  } catch (error) {
    console.error("Error fetching performance data:", error);
    return [];
  }
};
