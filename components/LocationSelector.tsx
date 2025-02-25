"use client";

import type React from "react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import divisionsData from "@/data/divisions.json";
import districtsData from "@/data/districts.json";
import upazilasData from "@/data/upazilas.json";

interface LocationSelectorProps {
  type: "division" | "district" | "upazila";
  division?: string;
  district?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  value: string;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  type,
  division,
  district,
  onChange,
  disabled,
  value,
}) => {
  const [options, setOptions] = useState<
    { id: string; name: string; bn_name: string }[]
  >([]);

  useEffect(() => {
    if (type === "division") {
      setOptions(divisionsData);
    } else if (type === "district") {
      if (division) {
        const filteredDistricts = districtsData.filter(
          (d) => d.division_id === division
        );
        setOptions(filteredDistricts);
      } else {
        setOptions([]);
      }
    } else if (type === "upazila") {
      if (district) {
        const filteredUpazilas = upazilasData.filter(
          (u) => u.district_id === district
        );
        setOptions(filteredUpazilas);
      } else {
        setOptions([]);
      }
    }
  }, [type, division, district]);

  return (
    <Select onValueChange={onChange} disabled={disabled} value={value}>
      <SelectTrigger>
        <SelectValue placeholder={`Select ${type}`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.id} value={option.id}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LocationSelector;
