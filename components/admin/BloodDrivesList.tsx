"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Calendar,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  Users,
} from "lucide-react";
import type { IBloodDrive } from "@/types/blood-drive";
import { BloodDriveForm } from "@/components/admin/BloodDriveForm";
import { useIsMobile } from "@/hooks/use-mobile";

import { useSession } from "next-auth/react";
import { deleteBloodDrive, getAllBloodDrives } from "@/services/blood-drive";

export function BloodDrivesList() {
  const t = useTranslations("Admin.bloodDrives");
  const router = useRouter();
  const isMobile = useIsMobile();
  const { data: session } = useSession();

  const [drives, setDrives] = useState<IBloodDrive[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDrive, setSelectedDrive] = useState<IBloodDrive | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchDrives();
  }, [page]);

  const fetchDrives = async () => {
    try {
      setLoading(true);
      const filters = searchTerm ? { searchTerm } : undefined;
      const response = await getAllBloodDrives(page, limit, filters);
      setDrives(response.data);
      setTotalPages(Math.ceil(response.meta.total / limit));
    } catch (error) {
      console.error("Error:", error);
      toast.error(t("fetchError"));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchDrives();
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteBloodDrive(id);
      console.log("delete res", res);
      
      if (res?.success) {
        toast.success(t("deleteSuccess"));
        fetchDrives();
        setIsDeleteDialogOpen(false);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(t("deleteError"));
    }
  };

  const getFullAddress = (drive: IBloodDrive) => {
    return `${drive.address}, ${drive.upazila}, ${drive.district}, ${drive.division}`;
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t("searchPlaceholder")}
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t("addButton")}
            </Button>
          </DialogTrigger>
          <DialogContent
            className={`${
              isMobile ? "w-[95vw] " : "max-w-lg "
            } max-h-screen overflow-y-auto`}
          >
            <DialogHeader>
              <DialogTitle>{t("addTitle")}</DialogTitle>
            </DialogHeader>
            <BloodDriveForm
              onSuccess={() => {
                setIsCreateDialogOpen(false);
                fetchDrives();
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : drives.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <p className="text-muted-foreground">
            {searchTerm ? t("noSearchResults") : t("noDrives")}
          </p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("table.title")}</TableHead>
                <TableHead>{t("table.date")}</TableHead>
                <TableHead className="hidden md:table-cell">
                  {t("table.location")}
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  {t("table.organizer")}
                </TableHead>
                <TableHead className="text-right">
                  {t("table.actions")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drives.map((drive) => (
                <TableRow key={drive.id}>
                  <TableCell className="font-medium">{drive.title}</TableCell>
                  <TableCell>{format(new Date(drive.date), "PPP")}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {drive.district}, {drive.division}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {drive.organizer}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">{t("openMenu")}</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedDrive(drive);
                            setIsViewDialogOpen(true);
                          }}
                        >
                          {t("view")}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedDrive(drive);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          {t("edit")}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => {
                            setSelectedDrive(drive);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          {t("delete")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              {t("previous")}
            </Button>
            <div className="flex items-center px-2">
              {t("pageInfo", { current: page, total: totalPages })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              {t("next")}
            </Button>
          </div>
        </div>
      )}

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        {selectedDrive && (
          <DialogContent
            className={`${
              isMobile ? "w-[95vw] " : "max-w-lg "
            } max-h-screen overflow-y-auto`}
          >
            <DialogHeader>
              <DialogTitle className="text-xl">
                {selectedDrive.title}
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              {selectedDrive.banner && (
                <div className="relative h-60 w-full mb-4 rounded-md overflow-hidden">
                  <img
                    src={
                      selectedDrive.banner ||
                      "/placeholder.svg?height=240&width=600"
                    }
                    alt={selectedDrive.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">{t("date")}</h4>
                    <p>{format(new Date(selectedDrive.date), "PPP")}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="mr-3 h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">{t("location")}</h4>
                    <p>{getFullAddress(selectedDrive)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">{t("organizer")}</h4>
                    <p>{selectedDrive.organizer}</p>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        {selectedDrive && (
          <DialogContent
            className={`${
              isMobile ? "w-[95vw] " : "max-w-lg "
            } max-h-screen overflow-y-auto`}
          >
            <DialogHeader>
              <DialogTitle>{t("editTitle")}</DialogTitle>
            </DialogHeader>
            <BloodDriveForm
              bloodDrive={selectedDrive}
              onSuccess={() => {
                setIsEditDialogOpen(false);
                fetchDrives();
              }}
            />
          </DialogContent>
        )}
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("deleteConfirmTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("deleteConfirmDescription")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => selectedDrive && handleDelete(selectedDrive.id)}
            >
              {t("confirmDelete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
