import { getAuth } from "firebase/auth";

export const getFirebaseIdToken = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        throw new Error("User not authenticated");
    }

    return await user.getIdToken();
};
