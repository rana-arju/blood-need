"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  date: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
    message: "Please enter a valid date",
  }),
  location: z.string().min(5, "Location must be at least 5 characters"),
  organizer: z.string().min(2, "Organizer must be at least 2 characters"),
});

interface BloodDriveFormProps {
  bloodDrive?: {
    id: string;
    title: string;
    date: string;
    location: string;
    organizer: string;
  };
  onSuccess: () => void;
}

export function BloodDriveForm({ bloodDrive, onSuccess }: BloodDriveFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: bloodDrive || {
      title: "",
      date: "",
      location: "",
      organizer: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const url = bloodDrive
        ? `/api/blood-drives/${bloodDrive.id}`
        : "/api/blood-drives";
      const method = bloodDrive ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to save blood drive");
      }

      toast(`Blood drive ${
          bloodDrive ? "updated" : "created"
        } successfully.`);
      onSuccess();
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      toast( `Failed to ${
          bloodDrive ? "update" : "create"
        } blood drive. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Blood Drive Title" {...field} />
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
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Blood Drive Location" {...field} />
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
              <FormLabel>Organizer</FormLabel>
              <FormControl>
                <Input placeholder="Organizer Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : bloodDrive ? "Update" : "Create"} Blood
          Drive
        </Button>
      </form>
    </Form>
  );
}
