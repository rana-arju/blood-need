"use client";

import type React from "react";

import { useEffect, useState } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { updateUser } from "@/services/auth";
import { useSession } from "next-auth/react";
import LocationSelector from "../LocationSelector";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const genders = ["Male", "Female", "Other"];

const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.string().optional(),
  blood: z.string(),
  division: z.string().min(1, "Division is required"),
  district: z.string().min(1, "District is required"),
  upazila: z.string().min(1, "Upazila is required"),
  address: z.string().optional(),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
  }),
  lastDonationDate: z.date().optional(),
  gender: z.enum(genders as [string, ...string[]]),
  image: z.string().optional(),
});

interface ProfileSettingsProps {
  initialData: any;
  onCancel: () => void;
  onSuccess: (updatedData: any) => void;
}

export function ProfileSettings({
  initialData,
  onCancel,
  onSuccess,
}: ProfileSettingsProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { data: session, update } = useSession();
  const { user } = session!;

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: initialData.name || "",
      email: initialData.email || "",
      blood: initialData.blood || "",
      division: initialData.division || "",
      district: initialData.district || "",
      upazila: initialData.upazila || "",
      address: initialData.address || "",
      gender: initialData.gender || "Male",
      dateOfBirth: initialData.dateOfBirth
        ? new Date(initialData.dateOfBirth)
        : undefined,
      lastDonationDate: initialData.lastDonationDate
        ? new Date(initialData.lastDonationDate)
        : undefined,
      image: initialData.image || "",
    },
  });

  const watchDivision = form.watch("division");
  const watchDistrict = form.watch("district");

  useEffect(() => {
    if (watchDivision) {
      form.setValue("district", initialData.district || "");
      form.setValue("upazila", initialData.upazila || "");
    }
  }, [watchDivision, form, initialData]);

  useEffect(() => {
    if (watchDistrict) {
      form.setValue("upazila", initialData.upazila || "");
    }
  }, [watchDistrict, form, initialData]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const imageUrl = await uploadToCloudinary(file);
      form.setValue("image", imageUrl);
      toast.success("Profile image updated successfully");
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  async function onSubmit(values: z.infer<typeof profileFormSchema>) {
    try {
      const res = await updateUser(values, user?.id);

      if (res.success) {
        toast.success(res.message);
         await update({
           ...session,
           user: {
             ...session?.user,
             ...values,
           },
         });
         onSuccess(values);
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={
                      form.watch("image") || "/placeholder-avatar.jpg"
                    }
                    alt="Profile"
                  />
                  <AvatarFallback>
                    {form.watch("name")?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center space-x-2">
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="profile-image"
                    onChange={handleImageUpload}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      document.getElementById("profile-image")?.click()
                    }
                    disabled={isUploading}
                  >
                    {isUploading ? "Uploading..." : "Change Photo"}
                  </Button>
                </div>
              </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="blood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blood Group</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood group" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {bloodGroups.map((group) => (
                          <SelectItem key={group} value={group}>
                            {group}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {genders.map((gender) => (
                          <SelectItem key={gender} value={gender}>
                            {gender}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date(1900, 0, 1)
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastDonationDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Last Donation Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="division"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Division</FormLabel>
                    <FormControl>
                      <LocationSelector
                        type="division"
                        onChange={(value) => {
                          field.onChange(value);
                          form.trigger("division");
                        }}
                        value={field.value}
                      />
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
                    <FormLabel>District</FormLabel>
                    <FormControl>
                      <LocationSelector
                        type="district"
                        division={watchDivision}
                        onChange={(value) => {
                          field.onChange(value);
                          form.trigger("district");
                        }}
                        value={field.value}
                        disabled={!watchDivision}
                      />
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
                    <FormLabel>Upazila</FormLabel>
                    <FormControl>
                      <LocationSelector
                        type="upazila"
                        district={watchDistrict}
                        onChange={(value) => {
                          field.onChange(value);
                          form.trigger("upazila");
                        }}
                        value={field.value}
                        disabled={!watchDistrict}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter village/road no, house no"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
