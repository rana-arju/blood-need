"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Overview } from "./Overview";
import { RecentActivity } from "./RecentActivity";
import { Analytics } from "./Analytics";
import { Settings } from "./Settings";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
        Admin Dashboard
      </h3>
      <div>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full md:w-auto"
        >
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <div className="grid gap-6">
            <TabsContent value="overview" className="space-y-6">
              <Overview />
            </TabsContent>
            <TabsContent value="activity" className="space-y-6">
              <RecentActivity />
            </TabsContent>
            <TabsContent value="analytics" className="space-y-6">
              <Analytics />
            </TabsContent>
            <TabsContent value="settings" className="space-y-6">
              <Settings />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
