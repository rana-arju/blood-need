"use client";

import { useState, useEffect, useCallback } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import useMediaQuery from "@/utils/useMediaQuery";
import { getAllDonors } from "@/services/beDonor";
import DonorSearchBar from "@/components/Donor/DonorSearchBar";
import DonorFilterDrawer from "@/components/Donor/DonorFilterDrawer";
import DonorFilterSidebar from "@/components/Donor/DonorFilterSidebar";
import DonorCardSkeleton from "@/components/Donor/DonorCardSkeleton";
import DonorCard from "@/components/Donor/DonorCard";
import { Pagination } from "@/components/Pagination";
export default function DonorsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
    const initialSearchTerm = searchParams.get("searchTerm") || "";

  const [donors, setDonors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [currentPage, setCurrentPage] = useState(
    Number.parseInt(searchParams.get("page") || "1", 10)
  );
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const fetchDonors = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Combine search term and filters
      const params = {
        ...filters,
        searchTerm: searchTerm,
        page: currentPage,
        limit: 10,
      };

      const {
        donors: donorsList,
        totalPages: pages,
        currentPage: page,
        total: totalItems,
      } = await getAllDonors(params);
      setDonors(donorsList);
      setTotalPages(pages);
      setCurrentPage(page);
      setTotal(totalItems);

      // Update URL with search params
      const urlParams = new URLSearchParams();
     if (searchTerm) urlParams.set("searchTerm", searchTerm);
     if (currentPage > 1) urlParams.set("page", currentPage.toString());

      // Add filter params to URL
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          urlParams.set(key, value.toString());
        }
      });

      const url = urlParams.toString() ? `?${urlParams.toString()}` : "";
      router.push(`/donors${url}`, { scroll: false });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching donors"
      );
      setDonors([]);
    } finally {
      setIsLoading(false);
    }
  }, [filters, searchTerm, currentPage, router]);

  useEffect(() => {
    fetchDonors();
  }, [fetchDonors]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: Record<string, any>) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Blood Donors Directory
      </h1>

      <div className="mb-6">
        <DonorSearchBar
          onSearch={handleSearch}
          initialSearchTerm={searchTerm}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {isDesktop ? (
          <div className="lg:w-1/4">
            <DonorFilterSidebar onFilterChange={handleFilterChange} />
          </div>
        ) : (
          <div className="mb-4">
            <DonorFilterDrawer onFilterChange={handleFilterChange} />
          </div>
        )}

        <div className="lg:w-3/4">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!isLoading && donors.length === 0 && !error && (
            <div className="text-center py-8 bg-muted rounded-lg">
              <h3 className="text-xl font-medium">No donors found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your search or filters
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <DonorCardSkeleton key={index} />
                ))
              : donors.map((donor) => (
                  <DonorCard key={donor.id} donor={donor} />
                ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}

          {!isLoading && donors.length > 0 && (
            <p className="text-center text-sm text-muted-foreground mt-4">
              Showing {donors.length} of {total} donors
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
