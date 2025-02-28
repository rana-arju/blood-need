import * as z from "zod";

export const formSchema = z.object({
  patientName: z.string().min(2, "Patient name must be at least 2 characters"),
  blood: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  division: z.string().min(1, "Division is required"),
  district: z.string().min(1, "District is required"),
  upazila: z.string().min(1, "Upazila is required"),
  address: z.string().optional(),
  hospitalName: z
    .string()
    .min(2, "Donation center or hospital name must be at least 2 characters"),
  contactNumber: z.string().regex(/^\+?[0-9]{10,14}$/, "Invalid phone number"),
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
});
