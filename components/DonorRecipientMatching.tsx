"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  Users,
  Phone,
  Mail,
  Heart,
} from "lucide-react";

export default function DonorMatching() {
  const t = useTranslations("DonorMatching");
  const [activeTab, setActiveTab] = useState("find-donor");
  const [location, setLocation] = useState("");
  const [bloodType, setBloodType] = useState("");

  const mockDonors = [
    {
      id: 1,
      name: "John Doe",
      bloodType: "O+",
      location: "Dhaka Central",
      distance: "2.5 km",
      lastDonation: "3 months ago",
      availability: "Available",
      rating: 4.8,
    },
    // Add more mock donors...
  ];

  const mockRequests = [
    {
      id: 1,
      patientName: "Sarah Smith",
      bloodType: "A-",
      hospital: "City General Hospital",
      urgency: "High",
      neededBy: "24 hours",
      units: 2,
      contact: "+880 1234567890",
    },
    // Add more mock requests...
  ];

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
          <p className="text-muted-foreground">{t("description")}</p>
        </motion.div>

        <Card className="max-w-4xl mx-auto">
          <Tabs defaultValue="find-donor" className="p-6">
            <TabsList className="grid grid-cols-2 gap-4 mb-8">
              <TabsTrigger value="find-donor">
                {t("tabs.findDonor")}
              </TabsTrigger>
              <TabsTrigger value="find-recipient">
                {t("tabs.findRecipient")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="find-donor">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select onValueChange={setBloodType}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("bloodType")} />
                    </SelectTrigger>
                    <SelectContent>
                      {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                        (type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder={t("location")}
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Button className="w-full">
                    <Search className="w-4 h-4 mr-2" />
                    {t("search")}
                  </Button>
                </div>

                <div className="space-y-4">
                  {mockDonors.map((donor) => (
                    <motion.div
                      key={donor.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{donor.name}</h3>
                              <Badge variant="outline">{donor.bloodType}</Badge>
                              <Badge variant="secondary">
                                {donor.availability}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {donor.location} ({donor.distance})
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {donor.lastDonation}
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                {donor.rating} rating
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline">
                              <Phone className="w-4 h-4 mr-2" />
                              {t("contact")}
                            </Button>
                            <Button>
                              <Mail className="w-4 h-4 mr-2" />
                              {t("request")}
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="find-recipient">
              <div className="space-y-6">
                {mockRequests.map((request) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">
                              {request.patientName}
                            </h3>
                            <Badge variant="destructive">
                              {request.urgency}
                            </Badge>
                            <Badge variant="outline">{request.bloodType}</Badge>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {request.hospital}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              Needed within {request.neededBy}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {request.units} units needed
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline">
                            <Phone className="w-4 h-4 mr-2" />
                            {request.contact}
                          </Button>
                          <Button>
                            <Heart className="w-4 h-4 mr-2" />
                            {t("volunteer")}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
