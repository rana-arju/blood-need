"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
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
// import { useRecaptcha } from "@/hooks/useRecaptcha";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { bloodRequest } from "@/services/bloodRegister";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const formSchema = z.object({
  patientName: z.string().min(2, "Patient name must be at least 2 characters"),
  blood: z.enum(bloodGroups as [string, ...string[]]),
  district: z.string().min(2, "District must be at least 2 characters"),
  upazila: z.string().min(2, "Upazila must be at least 2 characters"),
  division: z.string().min(2, "Area must be at least 2 characters"),
  hospitalName: z
    .string()
    .min(2, "Donation center or hospital name must be at least 2 characters"),
  contactNumber: z.string().regex(/^\+?[0-9]{10,14}$/, "Invalid phone number"),
  address: z.string().optional(),
  whatsappNumber: z
    .string()
    .regex(/^\+?[0-9]{10,14}$/, "Invalid WhatsApp number"),
  patientProblem: z.string().optional(),
  bloodAmount: z.number().min(1, "Amount of blood must be at least 1 unit"),
  requiredDate: z.date({
    required_error: "Please select a date for donation",
  }),
  requireTime: z.date({
    required_error: "Please select a time for donation",
  }),
  hemoglobin: z.number().optional(),
  reference: z.string().optional(),
});

export default function BloodRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const { executeRecaptcha } = useRecaptcha();
  const { data: session } = useSession();
  const { user } = session || {};
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientName: "",
      patientProblem: "",
      blood: "A+",
      district: "",
      address: "",
      upazila: "",
      division: "",
      hospitalName: "",
      contactNumber: "",
      whatsappNumber: "",
      bloodAmount: 1,
      hemoglobin: 1,
      reference: "",
      requireTime: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    //const recaptchaToken = await executeRecaptcha();

    try {
      if (!user?.id) {
        throw new Error("Please sign in");
      }
      const modifiedValues = {
        ...values,
        userId: user?.id,
      }
      const response = await bloodRequest(modifiedValues, user.id);
      console.log("response", response);

      if (response.success) {
        toast.success("Blood Request Successfully Submitted");
        form.reset();
      } else {
        toast.error("Blood request submission failed");
      }
    } catch (error) {
      console.error("Error submitting blood request:", error);
      toast.error("Submission Failed");
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
                        {bloodGroups && bloodGroups?.map((group, index) => (
                          <SelectItem key={index} value={group}>
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
                name="division"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Division</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hospitalName"
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
                name="bloodAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount of Blood (Bag)</FormLabel>
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
                name="requiredDate"
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
                name="requireTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time of Donation</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        value={field.value ? format(field.value, "HH:mm") : ""}
                        onChange={(e) =>
                          field.onChange(
                            new Date(`1970-01-01T${e.target.value}:00`)
                          )
                        }
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
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
                  <FormLabel>Patient Problem (optional)</FormLabel>
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
            {isSubmitting ? (
              <Button disabled>
                <Loader2 className="animate-spin" />
                Requesting Blood...
              </Button>
            ) : (
              <Button type="submit" disabled={!user}>
                {!user ? "First Signin/Signup" : "Submit Blood Request"}
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
