"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AwarenessCta() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your decision to donate blood can save lives. Join our community of
            donors and be a hero today.
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="space-x-4"
          >
            <Button asChild size="lg" variant="secondary">
              <Link href="/be-a-donor">Become a Donor</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/faq">Learn More</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
