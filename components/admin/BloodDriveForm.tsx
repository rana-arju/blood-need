"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import type { IBloodDrive, IBloodDriveFormData } from "@/types/blood-drive";
import { z } from "zod";
import { createBloodDrive, updateBloodDrive } from "@/services/blood-drive";
import { uploadToCloudinary } from "@/lib/cloudinary";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  division: z.string().min(1, "Division is required"),
  district: z.string().min(1, "District is required"),
  upazila: z.string().min(1, "Upazila is required"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  organizer: z.string().min(2, "Organizer must be at least 2 characters"),
  date: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
    message: "Please enter a valid date",
  }),
  banner: z.string().optional(),
});

interface BloodDriveFormProps {
  bloodDrive?: IBloodDrive;
  onSuccess: () => void;
}

export function BloodDriveForm({ bloodDrive, onSuccess }: BloodDriveFormProps) {
  const t = useTranslations("Admin.bloodDrives.form");
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const imageUrl = await uploadToCloudinary(file);
      form.setValue("banner", imageUrl);
      toast.success("Profile image updated successfully");
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };
  const form = useForm<IBloodDriveFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: bloodDrive
      ? {
          title: bloodDrive.title,
          division: bloodDrive.division,
          district: bloodDrive.district,
          upazila: bloodDrive.upazila,
          address: bloodDrive.address,
          organizer: bloodDrive.organizer,
          date: new Date(bloodDrive.date).toISOString(),
          banner: bloodDrive.banner || "",
        }
      : {
          title: "",
          division: "",
          district: "",
          upazila: "",
          address: "",
          organizer: "",
          date: new Date().toISOString(),
          banner: "",
        },
  });

  async function onSubmit(values: any) {
    if (!session?.user?.id) {
      toast.error(t("notAuthenticated"));
      return;
    }

    setIsSubmitting(true);
    try {
       values.date = values.date
         ? new Date(`${values.date}T00:00:00.000Z`).toISOString()
         : null;
      if (bloodDrive) {
        await updateBloodDrive(bloodDrive.id, values);
        toast.success(t("updateSuccess"));
      } else {
        const res = await createBloodDrive(values, session.user.id);
        console.log("Create blood drive", res);
        if (res?.message) {
          toast.success(res?.message);
          form.reset()
        } else {
          toast.error(res?.message);
        }
      }

      onSuccess();
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      toast.error(bloodDrive ? t("updateError") : t("createError"));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("title")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("titlePlaceholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("date")}</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="division"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("division")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("divisionPlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("district")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("districtPlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="upazila"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("upazila")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("upazilaPlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("address")}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("addressPlaceholder")}
                    {...field}
                    rows={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="organizer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("organizer")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("organizerPlaceholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              id="profile-image"
              onChange={handleImageUpload}
            />
            <Button
              type="button"
              variant="secondary"
              onClick={() => document.getElementById("profile-image")?.click()}
              disabled={isUploading}
              className="w-full bg-green-600 text-white hover:bg-green-500"
            >
              {isUploading ? "Banner Uploading..." : "Upload Banner"}
            </Button>
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting
              ? t("saving")
              : bloodDrive
              ? t("updateButton")
              : t("createButton")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
