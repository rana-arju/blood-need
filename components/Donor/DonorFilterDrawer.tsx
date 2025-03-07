"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Filter } from "lucide-react";
import DonorFilterSidebar from "./DonorFilterSidebar";
import { useState } from "react";

interface DonorFilterDrawerProps {
  onFilterChange: (filters: Record<string, any>) => void;
}

export default function DonorFilterDrawer({
  onFilterChange,
}: DonorFilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (filters: Record<string, any>) => {
    onFilterChange(filters);
    setIsOpen(false); // Close drawer after applying filters
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="lg:hidden">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh] overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle>Filter Donors</DrawerTitle>
          <DrawerDescription>
            Apply filters to find donors that match your criteria
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <DonorFilterSidebar onFilterChange={handleFilterChange} />
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
