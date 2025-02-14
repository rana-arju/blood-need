"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AuthError() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error === "Configuration") {
      console.error("There is a problem with the server configuration.");
    }
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-red-600">
            Authentication Error
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center">
            {error === "Configuration"
              ? "There is a problem with the server configuration."
              : "An error occurred during authentication."}
          </p>
          <div className="flex justify-center">
            <Button onClick={() => router.push("/auth/signin")}>
              Return to Sign In
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
