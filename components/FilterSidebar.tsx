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
import { Slider } from "@/components/ui/slider";
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

interface FilterSidebarProps {
  onFilterChange: (filters: Record<string, any>) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState({
    blood: "all",
    division: "",
    district: "",
    upazila: "",
    requiredDateStart: null as Date | null,
    requiredDateEnd: null as Date | null,
    bloodAmount: [0, 10],
    hemoglobin: [0, 20],
  });

  const handleChange = useCallback((name: string, value: any) => {
    setLocalFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleApplyFilters = useCallback(() => {
    const formattedFilters = {
      ...localFilters,
      requiredDateStart: localFilters.requiredDateStart
        ? format(localFilters.requiredDateStart, "yyyy-MM-dd")
        : null,
      requiredDateEnd: localFilters.requiredDateEnd
        ? format(localFilters.requiredDateEnd, "yyyy-MM-dd")
        : null,
    };
    onFilterChange(formattedFilters);
  }, [localFilters, onFilterChange]);

  return (
    <div className="space-y-4 p-4 bg-card rounded-lg border">
      <div>
        <Label htmlFor="blood">Blood Group</Label>
        <Select onValueChange={(value) => handleChange("blood", value)}>
          <SelectTrigger id="blood">
            <SelectValue placeholder="Select blood group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
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
        <Label>Required Date Range</Label>
        <div className="grid gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal ${
                  !localFilters.requiredDateStart && "text-muted-foreground"
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {localFilters.requiredDateStart ? (
                  format(localFilters.requiredDateStart, "PPP")
                ) : (
                  <span>Start date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={localFilters.requiredDateStart || undefined}
                onSelect={(date) => handleChange("requiredDateStart", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal ${
                  !localFilters.requiredDateEnd && "text-muted-foreground"
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {localFilters.requiredDateEnd ? (
                  format(localFilters.requiredDateEnd, "PPP")
                ) : (
                  <span>End date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={localFilters.requiredDateEnd || undefined}
                onSelect={(date) => handleChange("requiredDateEnd", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div>
        <Label>Blood Amount (bags)</Label>
        <Slider
          defaultValue={[0, 10]}
          max={10}
          step={1}
          onValueChange={(value) => handleChange("bloodAmount", value)}
        />
        <div className="flex justify-between text-sm mt-1">
          <span>{localFilters.bloodAmount[0]}</span>
          <span>{localFilters.bloodAmount[1]}</span>
        </div>
      </div>

      <div>
        <Label>Hemoglobin (g/dL)</Label>
        <Slider
          defaultValue={[0, 20]}
          max={20}
          step={0.1}
          onValueChange={(value) => handleChange("hemoglobin", value)}
        />
        <div className="flex justify-between text-sm mt-1">
          <span>{localFilters.hemoglobin[0].toFixed(1)}</span>
          <span>{localFilters.hemoglobin[1].toFixed(1)}</span>
        </div>
      </div>

      <Button className="w-full" onClick={handleApplyFilters}>
        Apply Filters
      </Button>
    </div>
  );
};

export default FilterSidebar;
