"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import SocialLogin from "./SocialLogin";
import * as z from "zod";
import { toast } from "sonner";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { signIn } from "next-auth/react";
import { User, Mail, Lock, Droplets } from "lucide-react";
import { useTranslations } from "next-intl";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export default function SignUpForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const t = useTranslations("auth");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError("");
    setIsLoading(true);

    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
      role: "user",
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const result = await signIn("credentials", {
          redirect: false,
          email: values?.email,
          password: values?.password,
        });

        setIsLoading(false);

        if (result?.ok) {
          toast.success(t("signUp.registrationSuccess"));
          router.push("/");
        } else {
          setError(t("signUp.autoLoginFailed"));
          toast.error(t("signUp.autoLoginFailed"));
        }
      } else {
        setIsLoading(false);
        setError(t("signUp.registrationFailed"));
        toast.error(t("signUp.registrationFailed"));
      }
    } catch {
      setIsLoading(false);
      setError(t("signUp.registrationFailed"));
      toast.error(t("signUp.registrationFailed"));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-gray-800 p-4 transition-all duration-300">
      <div className="w-full max-w-5xl flex flex-col md:flex-row-reverse items-center gap-8">
        {/* Left side - Illustration (hidden on small screens) */}
        <div className="w-full md:w-1/2 hidden md:flex flex-col items-center justify-center p-6">
          <div className="relative w-64 h-64 mb-6">
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-red-200 dark:bg-red-800/30 rounded-full animate-pulse delay-300"></div>
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <Droplets className="w-32 h-32 text-red-500 dark:text-red-400 animate-pulse" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-4">
            {t("signUp.joinCommunity")}
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-md">
            {t("signUp.heroText")}
          </p>
        </div>

        {/* Right side - Form */}
        <Card className="w-full md:w-1/2 shadow-xl border-0 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 via-red-500 to-red-600"></div>

          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="text-2xl font-bold text-center text-gray-800 dark:text-white">
              {t("signUp.title")}
            </CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-gray-300">
              {t("signUp.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            {/* Wrap the form with FormProvider */}
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">
                          {t("signUp.nameLabel")}
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-4 w-4" />
                            <Input
                              {...field}
                              placeholder={t("signUp.namePlaceholder")}
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">
                          {t("signUp.emailLabel")}
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-4 w-4" />
                            <Input
                              {...field}
                              placeholder={t("signUp.emailPlaceholder")}
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
                        <FormLabel className="text-gray-700 dark:text-gray-300">
                          {t("signUp.passwordLabel")}
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-4 w-4" />
                            <Input
                              type="password"
                              {...field}
                              placeholder={t("signUp.passwordPlaceholder")}
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
                      {t("signUp.registering")}
                    </div>
                  ) : (
                    t("signUp.submitButton")
                  )}
                </Button>
              </form>
            </FormProvider>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground dark:bg-gray-800">
                  {t("signUp.orContinueWith")}
                </span>
              </div>
            </div>

            <SocialLogin />
          </CardContent>
          <CardFooter className="flex justify-center pb-6">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t("signUp.haveAccount")}{" "}
              <a
                href="/auth/signin"
                className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 font-medium hover:underline transition-all duration-200"
              >
                {t("signUp.signInLink")}
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>🩸 {t("signUp.tagline")}</p>
      </div>
    </div>
  );
}
