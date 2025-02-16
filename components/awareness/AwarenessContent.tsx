"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplet, Users, Clock, Heart } from "lucide-react";

const awarenessContent = [
  {
    icon: Droplet,
    title: "Blood Types and Compatibility",
    content:
      "Learn about different blood types and their compatibility. Understanding your blood type can help you know who you can donate to and receive from.",
  },
  {
    icon: Users,
    title: "Who Can Donate?",
    content:
      "Most healthy adults can donate blood. There are some basic requirements like age, weight, and overall health. Check if you're eligible to be a donor.",
  },
  {
    icon: Clock,
    title: "Donation Process",
    content:
      "The blood donation process is quick and simple. From registration to post-donation refreshments, the entire process usually takes about an hour.",
  },
  {
    icon: Heart,
    title: "Impact of Donation",
    content:
      "Every donation can save up to three lives. Your single donation can help accident victims, surgery patients, and those battling cancer or blood disorders.",
  },
];

export function AwarenessContent() {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Blood Donation Awareness</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Understanding the importance and process of blood donation can
            inspire more people to become donors and save lives.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {awarenessContent.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center space-x-4">
                  <item.icon className="w-8 h-8 text-primary" />
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
