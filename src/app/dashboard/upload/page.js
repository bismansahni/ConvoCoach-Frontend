"use client";
import React, { useState } from "react";
import { storage, auth } from "@/lib/firebase"; // Adjust path as needed
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");
  const [user, setUser] = useState(null);

  // Monitor authentication state
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return setError("Please select a file to upload.");
    if (!user) return setError("You must be logged in to upload a file.");

    const storageRef = ref(storage, `uploads/${user.uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      (err) => {
        setError(err.message);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setUrl(downloadURL);
          alert("File uploaded successfully!");
        } catch (err) {
          setError(err.message);
        }
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Upload a File</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Upload
      </button>
      {progress > 0 && <p className="mt-4">Upload Progress: {progress}%</p>}
      {url && (
        <div className="mt-4">
          <p>File URL:</p>
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            {url}
          </a>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
