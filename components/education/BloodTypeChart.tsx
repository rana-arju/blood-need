"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Droplet, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const compatibilityMap = {
  "A+": { canGiveTo: ["A+", "AB+"], canReceiveFrom: ["A+", "A-", "O+", "O-"] },
  "A-": { canGiveTo: ["A+", "A-", "AB+", "AB-"], canReceiveFrom: ["A-", "O-"] },
  "B+": { canGiveTo: ["B+", "AB+"], canReceiveFrom: ["B+", "B-", "O+", "O-"] },
  "B-": { canGiveTo: ["B+", "B-", "AB+", "AB-"], canReceiveFrom: ["B-", "O-"] },
  "AB+": { canGiveTo: ["AB+"], canReceiveFrom: bloodTypes },
  "AB-": {
    canGiveTo: ["AB+", "AB-"],
    canReceiveFrom: ["A-", "B-", "AB-", "O-"],
  },
  "O+": { canGiveTo: ["A+", "B+", "AB+", "O+"], canReceiveFrom: ["O+", "O-"] },
  "O-": { canGiveTo: bloodTypes, canReceiveFrom: ["O-"] },
};
const compatibility: Record<string, string[]> = {
  "A+": ["A+", "AB+"],
  "A-": ["A+", "A-", "AB+", "AB-"],
  "B+": ["B+", "AB+"],
  "B-": ["B+", "B-", "AB+", "AB-"],
  "AB+": ["AB+"],
  "AB-": ["AB+", "AB-"],
  "O+": ["A+", "B+", "AB+", "O+"],
  "O-": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
};

export default function BloodTypeChart() {
  const t = useTranslations("BloodChart");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const getTypeColor = (type: string) => {
    if (type.startsWith("A"))
      return "text-red-500 bg-red-100 dark:bg-red-900/20 border-red-200 dark:border-red-900/30";
    if (type.startsWith("B"))
      return "text-blue-500 bg-blue-100 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900/30";
    if (type.startsWith("AB"))
      return "text-purple-500 bg-purple-100 dark:bg-purple-900/20 border-purple-200 dark:border-purple-900/30";
    return "text-green-500 bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-900/30";
  };
  const canDonate = (donor: string, recipient: string) => {
    return compatibility[donor]?.includes(recipient) || false;
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-1 md:p-4 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary ">
          {t("title")}
        </h2>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      <Card className="p-1 sm:p-3 md:p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
            {bloodTypes.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                className={cn(
                  "w-full h-12 text-lg font-bold",
                  selectedType === type && "bg-primary text-primary-foreground"
                )}
                onClick={() => setSelectedType(type)}
              >
                {type}
              </Button>
            ))}
          </div>

          {selectedType && (
            <div className="space-y-6 animate-in fade-in-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-1 md:p-4 border-green-500 dark:border-green-400">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-green-600 dark:text-green-400 mb-3">
                    <Droplet className="w-5 h-5" />
                    {t("canGiveTo")}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {compatibilityMap[
                      selectedType as keyof typeof compatibilityMap
                    ].canGiveTo.map((type) => (
                      <div
                        key={type}
                        className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-md p-2 text-center font-semibold"
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-1 md:p-4 border-blue-500 dark:border-blue-400">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">
                    <Droplet className="w-5 h-5" />
                    {t("canReceiveFrom")}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {compatibilityMap[
                      selectedType as keyof typeof compatibilityMap
                    ].canReceiveFrom.map((type) => (
                      <div
                        key={type}
                        className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-md p-2 text-center font-semibold"
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}
          <div className="mt-6 md:mt-8">
            <h3 className="font-medium mb-3 text-center">
              Full Compatibility Chart
            </h3>
            <div className="border rounded-lg overflow-x-auto">
              {isMobile ? (
                <MobileCompatibilityChart
                  bloodTypes={bloodTypes}
                  getTypeColor={getTypeColor}
                  canDonate={canDonate}
                />
              ) : (
                <DesktopCompatibilityChart
                  bloodTypes={bloodTypes}
                  getTypeColor={getTypeColor}
                  canDonate={canDonate}
                />
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
type CompatibilityChartProps = {
  bloodTypes: string[];
  getTypeColor: (type: string) => string;
  canDonate: (donor: string, recipient: string) => boolean;
};

const DesktopCompatibilityChart = ({
  bloodTypes,
  getTypeColor,
  canDonate,
}: CompatibilityChartProps) => (
  <table className="w-full text-center border-collapse">
    <thead>
      <tr className="bg-muted/50">
        <th className="border p-2 whitespace-nowrap">Donor ↓ / Recipient →</th>
        {bloodTypes.map((type) => (
          <th
            key={type}
            className={`border p-2 ${getTypeColor(type).split(" ")[0]}`}
          >
            {type}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {bloodTypes.map((donor) => (
        <tr key={donor} className="hover:bg-muted/30">
          <td
            className={`border p-2 font-medium ${
              getTypeColor(donor).split(" ")[0]
            }`}
          >
            {donor}
          </td>
          {bloodTypes.map((recipient) => (
            <td key={`${donor}-${recipient}`} className="border p-2">
              {canDonate(donor, recipient) ? (
                <Check className="h-4 w-4 mx-auto text-green-500" />
              ) : (
                <X className="h-4 w-4 mx-auto text-red-500" />
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

const MobileCompatibilityChart = ({
  bloodTypes,
  getTypeColor,
  canDonate,
}: CompatibilityChartProps) => (
  <div className="grid grid-cols-1 gap-4 p-1 md:p-3">
    {bloodTypes.map((donor) => (
      <div key={donor} className="border rounded-lg overflow-hidden">
        <div className={`p-2 font-medium text-center ${getTypeColor(donor)}`}>
          Donor: {donor}
        </div>
        <div className="grid grid-cols-4 text-center">
          {bloodTypes.map((recipient) => (
            <div
              key={`${donor}-${recipient}`}
              className="border p-2 flex flex-col items-center"
            >
              <span
                className={`text-xs mb-1 ${
                  getTypeColor(recipient).split(" ")[0]
                }`}
              >
                {recipient}
              </span>
              {canDonate(donor, recipient) ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <X className="h-4 w-4 text-red-500" />
              )}
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);
