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
import { districts, divisions, getDistrictIdByName, getDivisionIdByName, upazilas } from "@/utils/location-utils";

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
      setOptions(divisions);
    } else if (type === "district") {
      if (division) {
        const divisionId = getDivisionIdByName(division);
        const filteredDistricts = districts.filter(
          (d) => d.division_id === divisionId
        );
        setOptions(filteredDistricts);
      } else {
        setOptions([]);
      }
    } else if (type === "upazila") {
      if (district) {
        const districtId = getDistrictIdByName(district);
        const filteredUpazilas = upazilas.filter(
          (u) => u.district_id === districtId
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
          <SelectItem key={option.id} value={option.name}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LocationSelector;
