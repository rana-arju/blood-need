"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { donorAdd } from "@/services/beDonor";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const formSchema = z.object({
  weight: z.number().min(50, "Weight must be at least 50 kg"),
  height: z.number().min(100, "Height must be at least 100 cm"),
  emergencyContactName: z
    .string()
    .min(2, "Emergency Contact Name must be at least 2 characters"),
  medicalCondition: z.string().optional(),
  currentMedications: z.string().optional(),
  facebookId: z.string().min(2, "Enter facebook Id url"),
  emergencyContact: z
    .string()
    .regex(/^\+?[0-9]{10,14}$/, "Invalid phone number"),
  phone: z.string().regex(/^\+?[0-9]{10,14}$/, "Invalid phone number"),
  whatsappNumber: z.string().regex(/^\+?[0-9]{10,14}$/, "Invalid phone number"),
  agreeToTerms: z.boolean().refine((value) => value === true, {
    message: "You must agree to the terms and conditions",
  }),
});

export default function DonorRegistrationForm() {
    const t = useTranslations("Forms.donor");
  const { data: session } = useSession();
  const router = useRouter();
  const { user } = session!;
  if (!user?.id) {
    toast.error("Please sign in");
    router.push("auth/signin");
    return;
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",

      facebookId: "",

      weight: 70,
      height: 170,

      medicalCondition: "",
      currentMedications: "",
      whatsappNumber: "",
      emergencyContact: "",
      emergencyContactName: "",
      agreeToTerms: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const donorData = {
        userId: user?.id,
        phone: values.phone,
        whatsappNumber: values?.whatsappNumber,
        facebookId: values?.facebookId,
        emergencyContact: values?.emergencyContact,
        height: values?.height,
        weight: values?.weight,
        medicalCondition: values?.medicalCondition,
        currentMedications: values?.currentMedications,
      };

      const res = await donorAdd(donorData, user?.id);

      if (res.success) {
        toast.success(res.message);
        form.reset();
        router.push("/");
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="space-y-1">
  {      /*
        <CardTitle className="text-2xl text-center">{t("title")}</CardTitle>
        <CardDescription className="text-center">
          {t("description")}
        </CardDescription>
        */}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="facebookId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("labels.facebookId")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://www.facebook.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("labels.phone")}</FormLabel>
                    <FormControl>
                      <Input placeholder="+880XXXXXXXXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={form.control}
                name="whatsappNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("labels.whatsapp")}</FormLabel>
                    <FormControl>
                      <Input placeholder="+880XXXXXXXXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("labels.weight")}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(+e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("labels.height")}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(+e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emergencyContactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("labels.emergencyContactName")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("labels.emergencyContactName")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emergencyContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("labels.emergencyContact")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("labels.emergencyContact")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="medicalCondition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("labels.medicalCondition")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("labels.medicalConditionPlaceholder")}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currentMedications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("labels.currentMedications")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("labels.medicationsPlaceholder")}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>{t("labels.agreeToTerms")}</FormLabel>
                    <FormDescription>
                      {t("labels.termsDescription")}
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={user ? false : true}
            >
              {t("buttons.register")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
