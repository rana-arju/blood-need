"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import SocialLogin from "./SocialLogin"
import { toast } from "sonner"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import {  Heart, User, UserCog, Mail, Lock } from "lucide-react"
import { useTranslations } from "next-intl"

// Define validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

// Demo credentials
const demoUserCredentials = {
  email: "rana@gmail.com",
  password: "12345678",
}

const demoAdminCredentials = {
  email: "rana2@gmail.com",
  password: "12345678",
}

export default function SignInForm() {
  const router = useRouter()
  const [error, setError] = useState("")
  const t = useTranslations("auth")
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError("")
    setIsLoading(true)

    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    })

    setIsLoading(false)

    if (result?.ok) {
          toast.success("Login Successfull", {
                  style: {
                    background: "#10B981",
                    color: "white",
                  },
                  icon: "🎉",
                })
      router.push("/")
    } else {
      toast.error(t("signIn.invalidCredentials"))
      setError(t("signIn.invalidCredentials"))
    }
  }

  const handleDemoLogin = (type: "user" | "admin") => {
    const credentials = type === "user" ? demoUserCredentials : demoAdminCredentials
    form.setValue("email", credentials.email)
    form.setValue("password", credentials.password)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-gray-800 p-4 transition-all duration-300">
      

      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-8">
        {/* Left side - Illustration (hidden on small screens) */}
        <div className="w-full md:w-1/2 hidden md:flex flex-col items-center justify-center p-6">
          <div className="relative w-64 h-64 mb-6">
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-red-200 dark:bg-red-800/30 rounded-full animate-pulse delay-300"></div>
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <Heart className="w-32 h-32 text-red-500 dark:text-red-400 animate-pulse" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-4">
            {t("signIn.welcomeBack")}
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-md">{t("signIn.heroText")}</p>
        </div>

        {/* Right side - Form */}
        <Card className="w-full md:w-1/2 shadow-xl border-0 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 via-red-500 to-red-600"></div>

        

          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="text-2xl font-bold text-center text-gray-800 dark:text-white">
              {t("signIn.title")}
            </CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-gray-300">
              {t("signIn.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            {/* Demo Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => handleDemoLogin("user")}
                className="w-full group relative overflow-hidden border-red-200 dark:border-gray-700 hover:border-red-400 dark:hover:border-red-500 transition-all duration-300"
              >
                <span className="absolute inset-0 w-0 bg-red-100 dark:bg-red-900/30 transition-all duration-300 ease-out group-hover:w-full"></span>
                <span className="relative flex items-center justify-center gap-2">
                  <User className="w-4 h-4" />
                  {t("signIn.demoUser")}
                </span>
              </Button>
              <Button
                variant="outline"
                onClick={() => handleDemoLogin("admin")}
                className="w-full group relative overflow-hidden border-red-200 dark:border-gray-700 hover:border-red-400 dark:hover:border-red-500 transition-all duration-300"
              >
                <span className="absolute inset-0 w-0 bg-red-100 dark:bg-red-900/30 transition-all duration-300 ease-out group-hover:w-full"></span>
                <span className="relative flex items-center justify-center gap-2">
                  <UserCog className="w-4 h-4" />
                  {t("signIn.demoAdmin")}
                </span>
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground dark:bg-gray-800">
                  {t("signIn.orContinueWith")}
                </span>
              </div>
            </div>

            {/* Sign In Form */}
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">{t("signIn.emailLabel")}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-4 w-4" />
                            <Input
                              placeholder={t("signIn.emailPlaceholder")}
                              {...field}
                              className="pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500 dark:focus:ring-red-400 transition-all duration-200"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">{t("signIn.passwordLabel")}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-4 w-4" />
                            <Input
                              type="password"
                              {...field}
                              placeholder={t("signIn.passwordPlaceholder")}
                              className="pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500 dark:focus:ring-red-400 transition-all duration-200"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md text-sm flex items-center">
                    <span className="mr-2">⚠️</span> {error}
                  </div>
                )}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      {t("signIn.loggingIn")}
                    </div>
                  ) : (
                    t("signIn.submitButton")
                  )}
                </Button>
              </form>
            </FormProvider>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground dark:bg-gray-800">
                  {t("signIn.orContinueWith")}
                </span>
              </div>
            </div>
            <SocialLogin />
          </CardContent>
          <CardFooter className="flex justify-center pb-6">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t("signIn.noAccount")}{" "}
              <a
                href="/auth/signup"
                className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 font-medium hover:underline transition-all duration-200"
              >
                {t("signIn.signUpLink")}
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>🩸 {t("signIn.tagline")}</p>
      </div>
    </div>
  )
}

