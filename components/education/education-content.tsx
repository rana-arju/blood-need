"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import DescriptiveLink from "@/components/DescriptiveLink";

export default function EducationContent() {
  const t = useTranslations("education");

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">{t("title")}</h1>

      <Tabs defaultValue="resources" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="resources">{t("tabs.resources")}</TabsTrigger>
          <TabsTrigger value="quiz">{t("tabs.quiz")}</TabsTrigger>
        </TabsList>

        <TabsContent value="resources">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("basics.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{t("basics.description")}</p>
              </CardContent>
              <CardFooter>
                <DescriptiveLink
                  href="/learn/blood-donation-101"
                  ariaLabel="Learn about blood donation basics, eligibility criteria and donation process"
                  className="w-full"
                >
                  <Button variant="outline" className="w-full">
                    {t("basics.readMore")}
                  </Button>
                </DescriptiveLink>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("bloodTypes.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{t("bloodTypes.description")}</p>
              </CardContent>
              <CardFooter>
                <DescriptiveLink
                  href="/learn/blood-types"
                  ariaLabel="Learn about different blood types and their compatibility for transfusions"
                  className="w-full"
                >
                  <Button variant="outline" className="w-full">
                    {t("bloodTypes.readMore")}
                  </Button>
                </DescriptiveLink>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("preparation.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{t("preparation.description")}</p>
              </CardContent>
              <CardFooter>
                <DescriptiveLink
                  href="/learn/preparation"
                  ariaLabel="Learn how to prepare for your blood donation for a smooth experience"
                  className="w-full"
                >
                  <Button variant="outline" className="w-full">
                    {t("preparation.readMore")}
                  </Button>
                </DescriptiveLink>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quiz">
          {/* Quiz content would go here */}
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">Coming Soon!</h2>
            <p className="text-muted-foreground">
              Our interactive blood donation quiz is under development.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
