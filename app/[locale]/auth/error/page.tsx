"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export default function AuthError() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get("error")
  const t = useTranslations("auth")

  useEffect(() => {
    if (error === "Configuration") {
      console.error("There is a problem with the server configuration.")
    }
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md shadow-lg border-0 dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-red-600">{t("authError.title")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center">
            {error === "Configuration" ? t("authError.configError") : t("authError.genericError")}
          </p>
          <div className="flex justify-center">
            <Button onClick={() => router.push("/auth/signin")}>{t("authError.returnButton")}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

