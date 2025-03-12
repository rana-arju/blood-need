"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

import {
  Eye,
  Pencil,
  Trash2,
  MoreHorizontal,
  Filter,
  Search,
  X,
} from "lucide-react";
import { deleteDonor, getAllDonors, updateDonor } from "@/services/beDonor";

export function DonorsList() {
  const { data: session } = useSession();
  const router = useRouter();
  const [donors, setDonors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDonors, setTotalDonors] = useState(0);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState({
    blood: "",
    division: "",
    district: "",
    upazila: "",
    gender: "",
    eligibleOnly: false,
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [donorToDelete, setDonorToDelete] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [donorToEdit, setDonorToEdit] = useState<any | null>(null);

  // Fetch donors
  const fetchDonors = async () => {
    try {
      setLoading(true);
      const result = await getAllDonors(
        {
          searchTerm,
          ...filters,
        }
        /*
        {
          page: currentPage,
          limit,
          sortBy: "createdAt",
          sortOrder: "desc",
        } */
      );
      setDonors(result.donors);
      setTotalPages(result.totalPages);
      setTotalDonors(result.total);
    } catch (error) {
      console.error("Error fetching donors:", error);
      toast.error("Failed to load donors");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchDonors();
  }, [currentPage, limit, searchTerm, filters]);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handle filter change
  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      blood: "",
      division: "",
      district: "",
      upazila: "",
      gender: "",
      eligibleOnly: false,
    });
    setSearchTerm("");
    setCurrentPage(1);
  };

  // Handle delete
  const handleDeleteClick = (id: string) => {
    setDonorToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!donorToDelete || !session?.user?.id) return;

    try {
      await deleteDonor(donorToDelete, session.user.id);
      toast.success("Donor deleted successfully");
      fetchDonors(); // Refresh the list
    } catch (error) {
      console.error("Error deleting donor:", error);
      toast.error("Failed to delete donor");
    } finally {
      setDeleteDialogOpen(false);
      setDonorToDelete(null);
    }
  };

  // Handle edit
  const handleEditClick = (donor: any) => {
    setDonorToEdit(donor);
    setEditDialogOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorToEdit || !session?.user?.id) return;
const { id, createdAt, updatedAt, ...dataToUpdate } = donorToEdit;
    try {
      await updateDonor(donorToEdit.id, dataToUpdate, session.user.id);
      toast.success("Donor updated successfully");
      fetchDonors(); // Refresh the list
    } catch (error) {
      console.error("Error updating donor:", error);
      toast.error("Failed to update donor");
    } finally {
      setEditDialogOpen(false);
      setDonorToEdit(null);
    }
  };

  // Format date
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (error) {
      return "Invalid date";
    }
  };

  // Calculate if donor is eligible (last donation was more than 3 months ago)
  const isEligible = (lastDonationDate: string | null | undefined) => {
    if (!lastDonationDate) return true;

    try {
      const lastDonation = new Date(lastDonationDate);
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

      return lastDonation < threeMonthsAgo;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Donors Management</h2>
        <div className="flex items-center gap-2 ">
          <form onSubmit={handleSearch} className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search donors..."
              className="w-full sm:w-[250px] pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-9 w-9"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </form>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto py-10">
              <SheetHeader>
                <SheetTitle>Filter Donors</SheetTitle>
                <SheetDescription>
                  Apply filters to narrow down the donors list
                </SheetDescription>
              </SheetHeader>
              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="blood">Blood Type</Label>
                  <Select
                    value={filters.blood}
                    onValueChange={(value) =>
                      handleFilterChange("blood", value)
                    }
                  >
                    <SelectTrigger id="blood">
                      <SelectValue placeholder="All blood types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All blood types</SelectItem>
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

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={filters.gender}
                    onValueChange={(value) =>
                      handleFilterChange("gender", value)
                    }
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="All genders" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All genders</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="division">Division</Label>
                  <Input
                    id="division"
                    value={filters.division}
                    onChange={(e) =>
                      handleFilterChange("division", e.target.value)
                    }
                    placeholder="Enter division"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Input
                    id="district"
                    value={filters.district}
                    onChange={(e) =>
                      handleFilterChange("district", e.target.value)
                    }
                    placeholder="Enter district"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="upazila">Upazila</Label>
                  <Input
                    id="upazila"
                    value={filters.upazila}
                    onChange={(e) =>
                      handleFilterChange("upazila", e.target.value)
                    }
                    placeholder="Enter upazila"
                  />
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="checkbox"
                    id="eligibleOnly"
                    checked={filters.eligibleOnly}
                    onChange={(e) =>
                      handleFilterChange("eligibleOnly", e.target.checked)
                    }
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="eligibleOnly">
                    Show only eligible donors
                  </Label>
                </div>

                <div className="pt-4 flex justify-between">
                  <Button variant="outline" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                  <Button onClick={() => fetchDonors()}>Apply Filters</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Blood</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Contact
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Location
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Last Donation
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className="h-6 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-10" />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Skeleton className="h-6 w-24" />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Skeleton className="h-6 w-32" />
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Skeleton className="h-6 w-24" />
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Skeleton className="h-6 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-20" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : donors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      No donors found. Try adjusting your search or filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  donors.map((donor) => (
                    <TableRow key={donor.id}>
                      <TableCell className="font-medium">
                        {donor.user?.name || "N/A"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="font-bold text-red-500"
                        >
                          {donor.user?.blood || "N/A"}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {donor.phone || "N/A"}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {donor.user?.district || "N/A"}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {formatDate(donor.user?.lastDonationDate)}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {isEligible(donor.user?.lastDonationDate) ? (
                          <Badge variant="default" className="bg-green-500">
                            Eligible
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Not Eligible</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() =>
                                router.push(`/admin/donors/${donor.id}`)
                              }
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            {
                              /*  <DropdownMenuItem
                              onClick={() => handleEditClick(donor)}
                            >
                              <Pencil className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem> */
                            }
                          
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDeleteClick(donor.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t p-4">
          <div className="text-sm text-muted-foreground">
            Showing {donors.length} of {totalDonors} donors
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  aria-disabled={currentPage === 1 || loading} // ✅ Use aria-disabled
                  className={
                    currentPage === 1 || loading
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>

              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                let pageNumber: number;

                // Logic to show pages around current page
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }

                if (pageNumber > totalPages) return null;

                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      isActive={pageNumber === currentPage}
                      onClick={() => setCurrentPage(pageNumber)}
                      aria-disabled={loading}
                      className={
                        loading ? "pointer-events-none opacity-50" : ""
                      }
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  aria-disabled={currentPage === totalPages || loading} // ✅ Use aria-disabled
                  className={
                    currentPage === totalPages || loading
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this donor? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Donor Dialog */}
      {donorToEdit && (
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Donor</DialogTitle>
              <DialogDescription>
                Update the donor's information. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditSubmit}>
              <div className="grid gap-4 py-4">
                
             
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="emergencyContact" className="col-span-4">
                    Emergency Contact
                  </Label>
                  <Input
                    id="emergencyContact"
                    className="col-span-4"
                    value={donorToEdit.emergencyContact || ""}
                    onChange={(e) =>
                      setDonorToEdit({
                        ...donorToEdit,
                        emergencyContact: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
