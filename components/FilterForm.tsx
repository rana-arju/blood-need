import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterFormProps {
  onFilter: (filters: FilterValues) => void;
}

export interface FilterValues {
  bloodGroup: string;
  division: string;
  district: string;
  upazila: string;
  union: string;
}

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export function FilterForm({ onFilter }: FilterFormProps) {
  const [filters, setFilters] = useState<FilterValues>({
    bloodGroup: "",
    division: "",
    district: "",
    upazila: "",
    union: "",
  });

  const handleChange = (field: keyof FilterValues, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="bloodGroup">Blood Group</Label>
          <Select onValueChange={(value) => handleChange("bloodGroup", value)}>
            <SelectTrigger id="bloodGroup">
              <SelectValue placeholder="Select blood group" />
            </SelectTrigger>
            <SelectContent>
              {bloodGroups.map((group) => (
                <SelectItem key={group} value={group}>
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="division">Division</Label>
          <Input
            id="division"
            value={filters.division}
            onChange={(e) => handleChange("division", e.target.value)}
            placeholder="Enter division"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="district">District</Label>
          <Input
            id="district"
            value={filters.district}
            onChange={(e) => handleChange("district", e.target.value)}
            placeholder="Enter district"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="upazila">Upazila</Label>
          <Input
            id="upazila"
            value={filters.upazila}
            onChange={(e) => handleChange("upazila", e.target.value)}
            placeholder="Enter upazila"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="union">Union</Label>
          <Input
            id="union"
            value={filters.union}
            onChange={(e) => handleChange("union", e.target.value)}
            placeholder="Enter union"
          />
        </div>
      </div>
      <Button type="submit">Apply Filters</Button>
    </form>
  );
}
