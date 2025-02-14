"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import { toast } from "sonner";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const formSchema = z.object({
  patientName: z.string().min(2, "Patient name must be at least 2 characters"),
  bloodGroup: z.enum(bloodGroups as [string, ...string[]]),
  district: z.string().min(2, "District must be at least 2 characters"),
  upazila: z.string().min(2, "Upazila must be at least 2 characters"),
  area: z.string().min(2, "Area must be at least 2 characters"),
  donationCenter: z
    .string()
    .min(2, "Donation center or hospital name must be at least 2 characters"),
  contactNumber: z.string().regex(/^\+?[0-9]{10,14}$/, "Invalid phone number"),
  facebookId: z.string().optional(),
  whatsappNumber: z
    .string()
    .regex(/^\+?[0-9]{10,14}$/, "Invalid WhatsApp number"),
  patientProblem: z
    .string()
    .min(10, "Please provide more details about the patient's problem"),
  amountOfBlood: z.number().min(1, "Amount of blood must be at least 1 unit"),
  dateOfDonation: z.date({
    required_error: "Please select a date for donation",
  }),
  timeOfDonation: z.string({
    required_error: "Please select a time for donation",
  }),
  hemoglobin: z.number().min(1, "Hemoglobin must be at least 1 g/dL"),
  reference: z.string().optional(),
});

export default function BloodRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { executeRecaptcha } = useRecaptcha();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientName: "",
      bloodGroup: "A+",
      district: "",
      upazila: "",
      area: "",
      donationCenter: "",
      contactNumber: "",
      facebookId: "",
      whatsappNumber: "",
      patientProblem: "",
      amountOfBlood: 1,
      hemoglobin: 12,
      reference: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const recaptchaToken = await executeRecaptcha();

    try {
      const response = await fetch("/api/blood-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, recaptchaToken }),
      });

      if (response.ok) {
        toast.success( "Blood Request Submitted",
       );
        form.reset();
      } else {
        throw new Error("Blood request submission failed");
      }
    } catch (error) {
      console.error("Error submitting blood request:", error);
      toast.error( "Submission Failed",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">
          Blood Request Form
        </CardTitle>
        <CardDescription className="text-center">
          Please fill out all the required information to submit a blood
          request.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="patientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bloodGroup"
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
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter district" {...field} />
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
                      <Input placeholder="Enter upazila" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter area" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="donationCenter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Donation Center/Hospital</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter donation center or hospital name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+880XXXXXXXXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="whatsappNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+880XXXXXXXXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="facebookId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook ID (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Facebook ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amountOfBlood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount of Blood (units)</FormLabel>
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
                name="dateOfDonation"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Donation</FormLabel>
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
                            date < new Date() ||
                            date >
                              new Date(
                                new Date().setMonth(new Date().getMonth() + 1)
                              )
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
                name="timeOfDonation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time of Donation</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hemoglobin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hemoglobin (g/dL)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
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
                name="reference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reference (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter reference" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="patientProblem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient Problem</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the patient's condition"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Blood Request"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
