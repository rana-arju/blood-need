"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface DonorSearchBarProps {
  onSearch: (term: string) => void;
  initialSearchTerm?: string;
}

export default function DonorSearchBar({
  onSearch,
  initialSearchTerm = "",
}: DonorSearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full gap-2">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Search by name, location, or blood group..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-10"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <Button type="submit" variant="default">
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </form>
  );
}
