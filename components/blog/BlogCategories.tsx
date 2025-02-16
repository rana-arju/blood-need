"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const categories = [
  { name: "Blood Donation Tips", count: 15 },
  { name: "Donor Stories", count: 8 },
  { name: "Health Benefits", count: 12 },
  { name: "Blood Types", count: 6 },
  { name: "Donation Process", count: 10 },
  { name: "Community Impact", count: 7 },
];

export function BlogCategories() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/blog/category/${category.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="flex items-center justify-between hover:text-primary"
                >
                  <span>{category.name}</span>
                  <Badge variant="secondary">{category.count}</Badge>
                </Link>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}
