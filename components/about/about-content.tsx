"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Mail,
  Github,
  Linkedin,
  Code,
  GraduationCap,
  Briefcase,
  MapPin,
  Phone,
  Globe,
  Calendar,
} from "lucide-react";

export default function AboutContent() {
  const t = useTranslations("About");

  const skills = [
    "JavaScript",
    "TypeScript",
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mongoose",
    "Prisma",
    "Next-auth",
    "Clerk",
    "Tailwind CSS",
    "Redux",
    "Firebase",
  ];

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container px-4 md:px-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-2 px-3 mb-6 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <Heart className="w-4 h-4 mr-2" />
            {t("badge")}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* About Blood Donation Platform */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-5xl mx-auto mb-16"
        >
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 ">
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    {t("platform.title")}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {t("platform.description")}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {[1, 2, 3, 4].map((i) => (
                      <li key={i} className="flex items-start">
                        <Heart className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>{t(`platform.features.${i}`)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    <Button asChild>
                      <Link href="/be-donor">{t("platform.donateButton")}</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/request-blood">
                        {t("platform.requestButton")}
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="relative h-64 md:h-auto">
                  <Image
                    src="https://res.cloudinary.com/db8l1ulfq/image/upload/v1741593907/DALL_E_2025-03-10_14.03.59_-_A_heartwarming_and_inspiring_image_of_a_blood_donation_process._A_donor_is_lying_on_a_hospital_bed_smiling_while_donating_blood_and_a_nurse_is_assis_jiepv7.webp"
                    alt={t("platform.imageAlt")}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <p className="font-medium">
                        {t("platform.imageCaption")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* About Developer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-5xl mx-auto mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
            {t("developer.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Image and Contact */}
            <div className="md:col-span-1">
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-primary/20">
                      <Image
                        src="https://res.cloudinary.com/db8l1ulfq/image/upload/v1740566021/sygfps6phbgv3iozj7vy.jpg"
                        alt="Rana Arju"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-1">
                      Mohammad Rana Arju
                    </h3>
                    <p className="text-primary font-medium mb-4">
                      {t("developer.role")}
                    </p>

                    <div className="w-full space-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span>Cox's Bazar, Bangladesh</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span>ranaarju20@gmail.com</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                        <Link href={`tel:01881-220413`}>+8801881-220413</Link>
                      </div>
                      <div className="flex items-center text-sm">
                        <Globe className="w-4 h-4 mr-2 text-muted-foreground" />
                        <a
                          href="https://rana-arju.vercel.app"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary"
                        >
                          rana-arju.vercel.app
                        </a>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" asChild>
                        <a
                          href="https://github.com/rana-arju"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <a
                          href="https://www.linkedin.com/in/rana-arju"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <a href="mailto:arjurana20@gmail.com">
                          <Mail className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bio and Skills */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Code className="w-5 h-5 text-primary mr-2" />
                    <h3 className="text-xl font-semibold">
                      {t("developer.bio.title")}
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {t("developer.bio.content")}
                  </p>
                  <p className="text-muted-foreground">
                    {t("developer.bio.content2")}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <GraduationCap className="w-5 h-5 text-primary mr-2" />
                    <h3 className="text-xl font-semibold">
                      {t("developer.education.title")}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">
                          {t("developer.education.degree")}
                        </h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5 mr-1" />
                          <span>2019 - 2023</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t("developer.education.institution")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Briefcase className="w-5 h-5 text-primary mr-2" />
                    <h3 className="text-xl font-semibold">
                      {t("developer.experience.title")}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">
                          {t("developer.experience.position")}
                        </h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5 mr-1" />
                          <span>
                            2022 - {t("developer.experience.present")}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t("developer.experience.company")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    {t("developer.skills.title")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <div
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-5xl mx-auto text-center"
        >
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl  font-bold mb-2">
                {t("cta.title")}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                {t("cta.description")}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/be-donor">{t("cta.donateButton")}</Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link href="/contact">{t("cta.contactButton")}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
