"use client"

import { useEffect } from "react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"

export default function SignOut() {
  const router = useRouter()
  const t = useTranslations("auth")

  useEffect(() => {
    const handleSignOut = async () => {
      await signOut({ redirect: false })
      router.push("/auth/signin")
    }

    handleSignOut()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center p-8 rounded-lg shadow-md bg-white dark:bg-gray-800">
        <p className="text-lg">{t("signOut.signingOut")}</p>
      </div>
    </div>
  )
}

