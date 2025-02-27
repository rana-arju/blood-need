"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import BloodRequestCard from "@/components/BloodRequestCard";
import BloodRequestCardSkeleton from "@/components/BloodRequestCardSkeleton";
import SearchBar from "@/components/SearchBar";
import FilterSidebar from "@/components/FilterSidebar";
import FilterDrawer from "@/components/FilterDrawer";
import { Button } from "@/components/ui/button";

import { Pagination } from "@/components/Pagination";
import useMediaQuery from "@/utils/useMediaQuery";
import { getAllBloodRequests } from "@/services/bloodRegister";
import CustomNotFound from "@/components/CustomNotFound";

interface BloodRequest {
  id: string;
  user: {

    image: string;
    name: string;
  }
  patientName: string;
  blood: string;
  hospitalName: string;
  requiredDate: string;
}

const AllBloodRequests: React.FC = () => {
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const { theme } = useTheme();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

 const fetchBloodRequests = useCallback(async () => {
   setIsLoading(true);
   try {
     const {
       requests,
       totalPages,
       currentPage: page,
       total: totalItems,
     } = await getAllBloodRequests({
       ...filters,
       search: searchTerm,
       page: currentPage,
       limit: 10,
     });
     setBloodRequests(requests);
     setTotalPages(totalPages);
     setCurrentPage(page);
     setTotal(totalItems);
   } catch (err) {
     setError(err instanceof Error ? err.message : "An error occurred");
   } finally {
     setIsLoading(false);
   }
 }, [filters, searchTerm, currentPage]);
  useEffect(() => {
    fetchBloodRequests();
  }, [fetchBloodRequests]);

  const handleFilterChange = (newFilters: Record<string, any>) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div
      className={`container mx-auto py-8  ${theme === "dark" ? "dark" : ""}`}
    >
      <div className="mb-6">
        <SearchBar onSearch={handleSearchChange} />
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        {isDesktop ? (
          <div className="w-full lg:w-1/4">
            <FilterSidebar onFilterChange={handleFilterChange} />
          </div>
        ) : (
          <Button onClick={() => setIsFilterDrawerOpen(true)} className="mb-4">
            Open Filters
          </Button>
        )}
        <div className="w-full lg:w-3/4">
          {total > 0 && (
            <p className="text-sm text-muted-foreground mb-4">
              Showing {bloodRequests.length} of {total} blood requests
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading &&
              Array.from({ length: 10 }).map((_, index) => (
                <BloodRequestCardSkeleton key={index} />
              ))}
          </div>
          {!isLoading && bloodRequests?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bloodRequests?.map((request) => (
                <BloodRequestCard key={request.id} {...request} />
              ))}
            </div>
          )}
          {!isLoading && bloodRequests?.length === 0 && <CustomNotFound />}

          {error && <p className="text-red-500 mt-4">Error: {error}</p>}
          {!isLoading && !error && totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
      {!isDesktop && (
        <FilterDrawer
          isOpen={isFilterDrawerOpen}
          onClose={() => setIsFilterDrawerOpen(false)}
          onFilterChange={handleFilterChange}
        />
      )}
    </div>
  );
};

export default AllBloodRequests;
