"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    content: "123 Blood Donation Center, City, Country",
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+1 (123) 456-7890",
  },
  {
    icon: Mail,
    title: "Email",
    content: "info@blooddonation.org",
  },
  {
    icon: Clock,
    title: "Operating Hours",
    content:
      "Monday to Friday: 9AM - 5PM\nSaturday: 10AM - 2PM\nSunday: Closed",
  },
];

export function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-4"
            >
              <item.icon className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-muted-foreground whitespace-pre-line">
                  {item.content}
                </p>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
