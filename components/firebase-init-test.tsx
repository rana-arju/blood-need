"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  initializeFirebase,
  checkFirebaseInitialization,
} from "@/utils/firebase-debug";

export default function FirebaseInitTest() {
  const [status, setStatus] = useState<
    "idle" | "checking" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState(
    "Click the button to check Firebase initialization"
  );

  // Function to initialize Firebase and check status
  const checkFirebase = async () => {
    setStatus("checking");
    setMessage("Checking Firebase initialization...");

    try {
      // Step 1: Initialize Firebase
      const initialized = initializeFirebase();
      if (!initialized) {
        setStatus("error");
        setMessage("Failed to initialize Firebase. Check console for details.");
        return;
      }

      // Step 2: Check Firebase initialization
      const isInitialized = await checkFirebaseInitialization();

      if (isInitialized) {
        setStatus("success");
        setMessage("Firebase initialized successfully! ✅");
      } else {
        setStatus("error");
        setMessage(
          "Firebase initialization check failed. Check console for details."
        );
      }
    } catch (error) {
      console.error("Error checking Firebase:", error);
      setStatus("error");
      setMessage(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  };

  // Check Firebase on mount
  useEffect(() => {
    // Wait for the page to fully load
    const timer = setTimeout(() => {
      checkFirebase();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Firebase Initialization Test</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`p-4 rounded-md ${
            status === "success"
              ? "bg-green-100"
              : status === "error"
              ? "bg-red-100"
              : "bg-gray-100"
          }`}
        >
          <p>{message}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={checkFirebase}
          disabled={status === "checking"}
          className="w-full"
        >
          {status === "checking"
            ? "Checking..."
            : "Check Firebase Initialization"}
        </Button>
      </CardFooter>
    </Card>
  );
}
