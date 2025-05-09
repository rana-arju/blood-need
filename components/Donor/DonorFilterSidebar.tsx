"use client";

import type React from "react";
import { useState, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import LocationSelector from "@/components/LocationSelector";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslations } from "next-intl";

interface DonorFilterSidebarProps {
  onFilterChange: (filters: Record<string, any>) => void;
}

const DonorFilterSidebar: React.FC<DonorFilterSidebarProps> = ({
  onFilterChange,
}) => {
  const t = useTranslations("Donors.filters");

  const [localFilters, setLocalFilters] = useState({
    blood: "all",
    division: "",
    district: "",
    upazila: "",
    gender: "all",
    lastDonationDate: null as Date | null | undefined,
    eligibleOnly: false,
  });

  const handleChange = useCallback((name: string, value: any) => {
    setLocalFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleApplyFilters = useCallback(() => {
    // Format filters for API
    const formattedFilters: Record<string, any> = {};

    if (localFilters.blood !== "all") {
      formattedFilters.blood = localFilters.blood;
    }

    if (localFilters.division) {
      formattedFilters.division = localFilters.division;
    }

    if (localFilters.district) {
      formattedFilters.district = localFilters.district;
    }

    if (localFilters.upazila) {
      formattedFilters.upazila = localFilters.upazila;
    }

    if (localFilters.gender !== "all") {
      formattedFilters.gender = localFilters.gender;
    }

    if (localFilters.lastDonationDate) {
      formattedFilters.lastDonationDate = format(
        localFilters.lastDonationDate,
        "yyyy-MM-dd"
      );
    }

    formattedFilters.eligibleOnly = localFilters.eligibleOnly;

    onFilterChange(formattedFilters);
  }, [localFilters, onFilterChange]);

  const handleResetFilters = () => {
    setLocalFilters({
      blood: "all",
      division: "",
      district: "",
      upazila: "",
      gender: "all",
      lastDonationDate: null,
      eligibleOnly: false,
    });
    onFilterChange({});
  };

  return (
    <div className="space-y-4 p-4 bg-card rounded-lg border">
      <div>
        <Label htmlFor="blood">{t("bloodGroup")}</Label>
        <Select
          value={localFilters.blood}
          onValueChange={(value) => handleChange("blood", value)}
        >
          <SelectTrigger id="blood">
            <SelectValue placeholder={t("selectBloodGroup")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("all")}</SelectItem>
            <SelectItem value="A+">A+</SelectItem>
            <SelectItem value="A-">A-</SelectItem>
            <SelectItem value="B+">B+</SelectItem>
            <SelectItem value="B-">B-</SelectItem>
            <SelectItem value="AB+">AB+</SelectItem>
            <SelectItem value="AB-">AB-</SelectItem>
            <SelectItem value="O+">O+</SelectItem>
            <SelectItem value="O-">O-</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="gender">{t("gender")}</Label>
        <Select
          value={localFilters.gender}
          onValueChange={(value) => handleChange("gender", value)}
        >
          <SelectTrigger id="gender">
            <SelectValue placeholder={t("selectGender")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("all")}</SelectItem>
            <SelectItem value="Male">{t("male")}</SelectItem>
            <SelectItem value="Female">{t("female")}</SelectItem>
            <SelectItem value="Other">{t("other")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <LocationSelector
        type="division"
        onChange={(value) => handleChange("division", value)}
        value={localFilters.division}
      />

      <LocationSelector
        type="district"
        division={localFilters.division}
        onChange={(value) => handleChange("district", value)}
        value={localFilters.district}
        disabled={!localFilters.division}
      />

      <LocationSelector
        type="upazila"
        district={localFilters.district}
        onChange={(value) => handleChange("upazila", value)}
        value={localFilters.upazila}
        disabled={!localFilters.district}
      />

      <div className="space-y-2">
        <Label>{t("lastDonationBefore")}</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full justify-start text-left font-normal ${
                !localFilters.lastDonationDate && "text-muted-foreground"
              }`}
              aria-label={t("selectDateAriaLabel")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              {localFilters.lastDonationDate ? (
                format(localFilters.lastDonationDate, "PPP")
              ) : (
                <span>{t("selectDate")}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={localFilters.lastDonationDate ?? undefined}
              onSelect={(date) => handleChange("lastDonationDate", date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="eligibleOnly"
          checked={localFilters.eligibleOnly}
          onCheckedChange={(checked) => handleChange("eligibleOnly", checked)}
        />
        <label
          htmlFor="eligibleOnly"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {t("eligibleDonorsOnly")}
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <Button className="w-full" onClick={handleApplyFilters}>
          {t("applyFilters")}
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleResetFilters}
        >
          {t("resetFilters")}
        </Button>
      </div>
    </div>
  );
};

export default DonorFilterSidebar;
