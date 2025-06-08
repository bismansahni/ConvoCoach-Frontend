import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { getFirebaseIdToken } from "./AuthHelper";

export const signUpUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createcandidate = async (payload) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const idToken = await getFirebaseIdToken();
    const response = await fetch(`${apiUrl}/create-candidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         Authorization: idToken,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return { success: true, message: "Candidate file created successfully!" };
    } else {
      return { success: false, message: "Failed to create candidate file." };
    }
  } catch (error) {
    console.error("Error creating candidate file: ", error);
    return {
      success: false,
      message: "An error occurred while creating the candidate file.",
    };
  }
  
};

export const createPersona = async () => {
  const payload = {
    code: 300, // Client code for validation
  };

  try {
    const idToken = await getFirebaseIdToken();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/create/persona`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
            Authorization: idToken,
        },
        body: JSON.stringify(payload),
      }
    );

    const responseData = await response.json();
    console.log(responseData); // Print the response to the console

    if (response.ok) {
      return {
        success: true,
        message: "Persona created successfully!",
        data: responseData,
      };
    } else {
      return {
        success: false,
        message: responseData.error || "Failed to create persona",
      };
    }
  } catch (error) {
    console.error("Error creating persona:", error);
    return {
      success: false,
      message: "An error occurred while creating the persona.",
    };
  }
};
  