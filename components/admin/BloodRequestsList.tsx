"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Filter,
} from "lucide-react";

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
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

import {
  BloodRequest,
  BloodRequestFilters,
  deleteBloodRequest,
  getAllBloodRequests,
  updateBloodRequest,
} from "@/services/bloodRegister";
import { bloodTypes, requestStatuses } from "@/constant/blood-request";

export function BloodRequestsList() {
  const { data: session } = useSession();
  const router = useRouter();
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingRequest, setEditingRequest] = useState<BloodRequest | null>(
    null
  );
  const [deleteConfirmRequest, setDeleteConfirmRequest] =
    useState<BloodRequest | null>(null);
  const [filters, setFilters] = useState<BloodRequestFilters>({
    page: 1,
    limit: 10,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [totalRequests, setTotalRequests] = useState(0);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setFilters((prev: any) => ({
      ...prev,
      page: 1,
      search: debouncedSearchTerm || undefined,
    }));
  }, [debouncedSearchTerm]);

  // Fetch blood requests with pagination and search
  useEffect(() => {
    const fetchBloodRequests = async () => {
      setLoading(true);
      try {
        const response = await getAllBloodRequests(filters);
        setRequests(response.requests);
        setTotalPages(response.totalPages);
        setTotalRequests(response.total);
      } catch (error) {
        console.error("Error fetching blood requests:", error);
        toast.error("Failed to load blood requests");
      } finally {
        setLoading(false);
      }
    };

    fetchBloodRequests();
  }, [filters]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle blood request deletion
  const handleDelete = async (id: string) => {
    if (!session?.user?.id) {
      toast.error("You must be logged in to delete a blood request");
      return;
    }

    try {
      await deleteBloodRequest(id, session.user.id);
      setRequests(requests.filter((request) => request.id !== id));
      toast.success("Blood request deleted successfully");
      setDeleteConfirmRequest(null);
    } catch (error) {
      console.error("Error deleting blood request:", error);
      toast.error("Failed to delete blood request");
    }
  };

  // Handle blood request update
  const handleUpdate = async (updatedRequest: BloodRequest) => {

    if (!session?.user?.id) {
      toast.error("You must be logged in to update a blood request");
      return;
    }

    try {
      const { id, createdAt, updatedAt, user, ...dataToUpdate } =
        updatedRequest;
      const res = await updateBloodRequest(
        id,
        {
          ...dataToUpdate,
          userId: user?.id,
        },
        session.user.id
      );
    

      // Update the request in the local state
      setRequests(
        requests.map((req) =>
          req.id === updatedRequest.id ? updatedRequest : req
        )
      );

      toast.success("Blood request updated successfully");
      setEditingRequest(null);
    } catch (error) {
      console.error("Error updating blood request:", error);
      toast.error("Failed to update blood request");
    }
  };

  // Apply filters
  const applyFilters = (newFilters: Partial<BloodRequestFilters>) => {
    setFilters({ ...filters, ...newFilters, page: 1 });
  };

  // Render status badge
  const renderStatusBadge = (status?: string) => {
    switch (status) {
      case "fulfilled":
        return (
          <Badge
            variant="outline"
            className="bg-green-500/10 text-green-700 border-green-300"
          >
            Fulfilled
          </Badge>
        );
      case "cancelled":
        return (
          <Badge
            variant="outline"
            className="bg-red-500/10 text-red-700 border-red-300"
          >
            Cancelled
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="bg-yellow-500/10 text-yellow-700 border-yellow-300"
          >
            Pending
          </Badge>
        );
    }
  };

  // Format date
  const formatDate = (dateString?: string | Date) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "PPP");
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <div className="space-y-4 max-w-5xl p-1 overflow-x-hidden mt-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl  lg:text-4xl font-bold">
          Blood Requests Management
        </h2>

        <div className="flex flex-col w-xs sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative max-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by patient name, hospital..."
              className="pl-10 w-full md:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Blood Requests</SheetTitle>
                <SheetDescription>
                  Apply filters to narrow down the blood requests
                </SheetDescription>
              </SheetHeader>

              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="blood">Blood Type</Label>
                  <Select
                    value={filters.blood || ""}
                    onValueChange={(value) =>
                      applyFilters({ blood: value || undefined })
                    }
                  >
                    <SelectTrigger id="blood">
                      <SelectValue placeholder="All blood types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All blood types</SelectItem>
                      {bloodTypes.map((type: any) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="division">Division</Label>
                  <Input
                    id="division"
                    value={filters.division || ""}
                    onChange={(e) =>
                      applyFilters({ division: e.target.value || undefined })
                    }
                    placeholder="Filter by division"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Input
                    id="district"
                    value={filters.district || ""}
                    onChange={(e) =>
                      applyFilters({ district: e.target.value || undefined })
                    }
                    placeholder="Filter by district"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="upazila">Upazila</Label>
                  <Input
                    id="upazila"
                    value={filters.upazila || ""}
                    onChange={(e) =>
                      applyFilters({ upazila: e.target.value || undefined })
                    }
                    placeholder="Filter by upazila"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Required Date Range</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="requiredDateStart" className="text-xs">
                        From
                      </Label>
                      <Input
                        id="requiredDateStart"
                        type="date"
                        value={filters.requiredDateStart || ""}
                        onChange={(e) =>
                          applyFilters({
                            requiredDateStart: e.target.value || undefined,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="requiredDateEnd" className="text-xs">
                        To
                      </Label>
                      <Input
                        id="requiredDateEnd"
                        type="date"
                        value={filters.requiredDateEnd || ""}
                        onChange={(e) =>
                          applyFilters({
                            requiredDateEnd: e.target.value || undefined,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <SheetFooter>
                <SheetClose asChild>
                  <Button
                    variant="outline"
                    onClick={() => setFilters({ page: 1, limit: 10 })}
                  >
                    Reset Filters
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button>Apply Filters</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <Card>
        <CardContent className="p-0 w-full overflow-x-auto">
          {loading ? (
            <div className="p-4 space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-screen overflow-x-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">
                      Patient Name
                    </TableHead>
                    <TableHead className="whitespace-nowrap">Blood</TableHead>
                    <TableHead className="whitespace-nowrap">
                      Hospital
                    </TableHead>
                    <TableHead className="whitespace-nowrap">
                      Required Date
                    </TableHead>
                    <TableHead className="whitespace-nowrap">Status</TableHead>
                    <TableHead className="whitespace-nowrap text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        No blood requests found
                      </TableCell>
                    </TableRow>
                  ) : (
                    requests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="whitespace-nowrap font-medium">
                          {request.patientName}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <Badge
                            variant="outline"
                            className="bg-red-500/10 text-red-700 border-red-300"
                          >
                            {request.blood}
                          </Badge>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {request.hospitalName}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {formatDate(request.requiredDate)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {//renderStatusBadge(request.status)
                          }
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() =>
                                  router.push(
                                    `/admin/blood-requests/${request.id}`
                                  )
                                }
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => setEditingRequest(request)}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Request
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => setDeleteConfirmRequest(request)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Request
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
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    filters.page &&
                    filters.page > 1 &&
                    handlePageChange(filters.page - 1)
                  }
                  className={
                    filters.page === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, i) => {
                const pageNumber = i + 1;
                // Show first page, last page, and pages around current page
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= (filters.page || 1) - 1 &&
                    pageNumber <= (filters.page || 1) + 1)
                ) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        isActive={pageNumber === filters.page}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }

                // Show ellipsis for skipped pages
                if (
                  (pageNumber === 2 && (filters.page || 1) > 3) ||
                  (pageNumber === totalPages - 1 &&
                    (filters.page || 1) < totalPages - 2)
                ) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                return null;
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    filters.page &&
                    filters.page < totalPages &&
                    handlePageChange(filters.page + 1)
                  }
                  className={
                    filters.page === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Edit Blood Request Dialog */}
      <EditRequestDialog
        request={editingRequest}
        onUpdate={handleUpdate}
        onClose={() => setEditingRequest(null)}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteConfirmRequest}
        onOpenChange={() => setDeleteConfirmRequest(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the blood request for{" "}
              {deleteConfirmRequest?.patientName}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteConfirmRequest(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                deleteConfirmRequest && handleDelete(deleteConfirmRequest.id)
              }
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function EditRequestDialog({
  request,
  onUpdate,
  onClose,
}: {
  request: BloodRequest | null;
  onUpdate: (request: BloodRequest) => void;
  onClose: () => void;
}) {
  const [patientName, setPatientName] = useState("");
  const [blood, setBlood] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [status, setStatus] = useState<string>("pending");
  const [requiredDate, setRequiredDate] = useState("");
  const [requireTime, setRequireTime] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [bloodAmount, setBloodAmount] = useState(1);
  const [patientProblem, setPatientProblem] = useState("");

  // Initialize form when request changes
  useEffect(() => {
    if (request) {
      setPatientName(request.patientName || "");
      setBlood(request.blood || "");
      setHospitalName(request.hospitalName || "");
      //setStatus(request.status || "pending");

      // Format date for input
      if (request.requiredDate) {
        try {
          const date = new Date(request.requiredDate);
          setRequiredDate(format(date, "yyyy-MM-dd"));
        } catch (error) {
          setRequiredDate("");
        }
      }

      // Format time for input
      if (request.requireTime) {
        try {
          const time = new Date(request.requireTime);
          setRequireTime(format(time, "HH:mm"));
        } catch (error) {
          setRequireTime("");
        }
      }

      setContactNumber(request.contactNumber || "");
      setWhatsappNumber(request.whatsappNumber || "");
      setBloodAmount(request.bloodAmount || 1);
      setPatientProblem(request.patientProblem || "");
    }
  }, [request]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!request) return;

    onUpdate({
      ...request,
      patientName,
      blood,
      hospitalName,
      //status: status as "pending" | "fulfilled" | "cancelled",
      requiredDate: requiredDate
        ? new Date(requiredDate)
        : request.requiredDate,
      requireTime: requireTime
        ? new Date(`1970-01-01T${requireTime}:00`)
        : request.requireTime,
      contactNumber,
      whatsappNumber,
      bloodAmount,
      patientProblem,
    });
  };

  if (!request) return null;

  return (
    <Dialog open={!!request} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Blood Request</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="patientName">Patient Name</Label>
            <Input
              id="patientName"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="blood">Blood Type</Label>
            <Select value={blood} onValueChange={setBlood}>
              <SelectTrigger>
                <SelectValue placeholder="Select blood type" />
              </SelectTrigger>
              <SelectContent>
                {bloodTypes.map((type: any) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hospitalName">Hospital Name</Label>
            <Input
              id="hospitalName"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {requestStatuses.map((status: any) => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="requiredDate">Required Date</Label>
              <Input
                id="requiredDate"
                type="date"
                value={requiredDate}
                onChange={(e) => setRequiredDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requireTime">Required Time</Label>
              <Input
                id="requireTime"
                type="time"
                value={requireTime}
                onChange={(e) => setRequireTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
              <Input
                id="whatsappNumber"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bloodAmount">Blood Amount (units)</Label>
            <Input
              id="bloodAmount"
              type="number"
              min="1"
              value={bloodAmount}
              onChange={(e) => setBloodAmount(Number.parseInt(e.target.value))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="patientProblem">Patient Problem</Label>
            <Input
              id="patientProblem"
              value={patientProblem}
              onChange={(e) => setPatientProblem(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Update Request</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
