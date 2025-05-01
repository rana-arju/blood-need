"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Book, FlaskRoundIcon as Flask, HeartPulse, Brain } from "lucide-react"
import { motion } from "framer-motion"

const EducationalResources = () => {
  const t = useTranslations("education")
  const router = useRouter()
  const locale = useLocale()
  const [activeTab, setActiveTab] = useState("resources")

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const handleReadMore = (path: string) => {
    router.push(`https://bloodneed.com/${locale}/learn/${path}`);
  }

  return (
    <section className="py-16 px-1 md:px-4 bg-background">
      <div className="container mx-auto px-1 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-primary">
            {t("title")}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
        </motion.div>

        <Tabs
          defaultValue="resources"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full max-w-3xl mx-auto mb-8 grid-cols-2">
            <TabsTrigger value="resources" className="text-sm md:text-base">
              {t("tabs.resources")}
            </TabsTrigger>
            <TabsTrigger value="quiz" className="text-sm md:text-base">
              {t("tabs.quiz")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="resources">
            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div variants={item}>
                <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden border-2 border-muted group">
                  <div className="bg-primary/10 p-6 flex justify-center group-hover:bg-primary/20 transition-colors">
                    <Book className="w-12 h-12 text-primary" />
                  </div>
                  <CardHeader>
                    <CardTitle>{t("basics.title")}</CardTitle>
                    <CardDescription>{t("basics.description")}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                      <li>Eligibility requirements</li>
                      <li>Donation process</li>
                      <li>Types of blood donations</li>
                      <li>Benefits of donating</li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => handleReadMore("about-blood-donation")}
                      className="w-full"
                    >
                      {t("basics.readMore")}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div variants={item}>
                <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden border-2 border-muted group">
                  <div className="bg-primary/10 p-6 flex justify-center group-hover:bg-primary/20 transition-colors">
                    <Flask className="w-12 h-12 text-primary" />
                  </div>
                  <CardHeader>
                    <CardTitle>{t("bloodTypes.title")}</CardTitle>
                    <CardDescription>
                      {t("bloodTypes.description")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                      <li>The ABO blood group system</li>
                      <li>Rh factor explained</li>
                      <li>Universal donors and recipients</li>
                      <li>Compatibility chart</li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => handleReadMore("blood-types")}
                      className="w-full"
                    >
                      {t("bloodTypes.readMore")}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div variants={item}>
                <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden border-2 border-muted group">
                  <div className="bg-primary/10 p-6 flex justify-center group-hover:bg-primary/20 transition-colors">
                    <HeartPulse className="w-12 h-12 text-primary" />
                  </div>
                  <CardHeader>
                    <CardTitle>{t("preparation.title")}</CardTitle>
                    <CardDescription>
                      {t("preparation.description")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                      <li>Before donation guidelines</li>
                      <li>Day-of preparation tips</li>
                      <li>Post-donation care</li>
                      <li>Recovery recommendations</li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => handleReadMore("preparation")}
                      className="w-full"
                    >
                      {t("preparation.readMore")}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="quiz">
            <div className="flex justify-center">
              <Card className="w-full max-w-3xl">
                <CardHeader className="text-center">
                  <CardTitle>{t("tabs.quiz")}</CardTitle>
                  <CardDescription>
                    Test your knowledge about blood donation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center mb-6">
                    Ready to test your knowledge about blood donation? Our quiz
                    covers all the essentials from blood types to donor
                    eligibility.
                  </p>
                  <div className="flex justify-center">
                    <Button
                      onClick={() => router.push(`/${locale}/quiz`)}
                      size="lg"
                      className="gap-2"
                    >
                      <Brain className="w-5 h-5" />
                      Start Quiz
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

export default EducationalResources

