"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const news = [
  {
    title: "Donation is hope for poor helpless children",
    image:
      "https://zahrah.creedcreatives.net/donors/wp-content/uploads/sites/31/2025/02/blood-transfusion-2024-12-04-15-30-30-utc.jpg",
    category: "Blood Tips",
  },
  {
    title: "Don't Do This After You Donating Your Blood",
    image:
      "https://zahrah.creedcreatives.net/donors/wp-content/uploads/sites/31/2025/02/cheerful-young-female-person-visiting-her-doctor-2023-11-27-05-36-14-utc.jpg",
    category: "Donation",
  },
  {
    title: "Don't Do This After You Donating Your Blood",
    image:
      "https://zahrah.creedcreatives.net/donors/wp-content/uploads/sites/31/2025/02/multiracial-doctor-in-white-coat-medical-mask-and-2024-11-07-22-07-16-utc.jpg",
    category: "Blood Bank",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function News() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-primary text-sm font-semibold mb-2">OUR NEWS</h3>
          <h2 className="text-3xl font-bold">Checkout News & Updates</h2>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {news.map((newsItem, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full">
                <CardHeader className="p-0">
                  <img
                    src={newsItem.image || "/placeholder.svg"}
                    alt={newsItem.title}
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-primary text-sm mb-2">
                    {newsItem.category}
                  </div>
                  <CardTitle className="mb-4">{newsItem.title}</CardTitle>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Read More
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
