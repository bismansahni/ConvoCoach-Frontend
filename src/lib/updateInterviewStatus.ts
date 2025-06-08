import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

/**
 * Updates the `interviewStatus` field in Firestore directly from the frontend.
 *
 * @param userId - The user ID.
 * @param documentId - The document ID inside the `interviewDetails` collection.
 * @param updatedStatus - The new status to update.
 */
const updateInterviewStatus = async (
    userId: string,
    documentId: string,
    updatedStatus: string
): Promise<void> => {
    try {
        // Reference the document in Firestore
        const interviewDocRef = doc(db, "users", userId, "interviewDetails", documentId);

        // Update the `interviewStatus` field
        await updateDoc(interviewDocRef, {
            interviewStatus: updatedStatus,
            updatedAt: new Date().toISOString(),
        });

        console.log(`Interview status updated to: ${updatedStatus}`);
    } catch (error) {
        console.error("Error updating interview status:", error);
    }
};

export default updateInterviewStatus;
