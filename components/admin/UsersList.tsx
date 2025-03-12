"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  UserCog,
  Lock,
  ShieldAlert,
  ShieldCheck,
  CheckCircle,
  XCircle,
  User,
} from "lucide-react";
import {
  deleteUser,
  getAllUsers,
  setUserPassword,
  updateUser,
  updateUserRole,
  updateUserStatus,
  type User as UserType,
  type PaginationOptions,
  type UserFilters,
} from "@/services/auth";

export function UsersList() {
  const { data: session } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [passwordUser, setPasswordUser] = useState<UserType | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [deleteConfirmUser, setDeleteConfirmUser] = useState<UserType | null>(
    null
  );
  const [pagination, setPagination] = useState<PaginationOptions>({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const { user } = session || {};

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/auth/signin");
      return;
    }
  }, [user, router]);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, [debouncedSearchTerm]);

  // Fetch users with pagination and search
  useEffect(() => {
    const fetchUsers = async () => {
      if (!user?.id) return;

      setLoading(true);
      try {
        // Create filters object with searchTerm
        const filters: UserFilters = {};

        // Only add searchTerm if it's not empty
        if (debouncedSearchTerm && debouncedSearchTerm.trim() !== "") {
          filters.searchTerm = debouncedSearchTerm.trim();
        }
        const response = await getAllUsers(user.id, filters, pagination);

        setUsers(response.data);
        setTotalPages(Math.ceil(response.meta.total / response.meta.limit));
        setTotalUsers(response.meta.total);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user?.id, pagination, debouncedSearchTerm]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, page });
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle user deletion
  const handleDelete = async (id: string) => {
    if (!user?.id) return;

    try {
      await deleteUser(id, user.id);
      setUsers(users.filter((user) => user.id !== id));
      toast.success("User deleted successfully");
      setDeleteConfirmUser(null);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  // Handle user role change
  const handleRoleChange = async (id: string, role: string) => {
    if (!user?.id) return;

    try {
      await updateUserRole(id, role, user.id);
      setUsers(
        users.map((u) =>
          u.id === id
            ? {
                ...u,
                role: role as "user" | "admin" | "superadmin" | "volunteer",
              }
            : u
        )
      );
      toast.success(`User role updated to ${role}`);
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("Failed to update user role");
    }
  };

  // Handle user status change
  const handleStatusChange = async (
    id: string,
    status: "active" | "blocked"
  ) => {
    if (!user?.id) return;

    try {
      await updateUserStatus(id, status, user.id);
      setUsers(users.map((u) => (u.id === id ? { ...u, status } : u)));
      toast.success(
        `User ${status === "active" ? "activated" : "blocked"} successfully`
      );
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error("Failed to update user status");
    }
  };

  // Handle password update
  const handlePasswordUpdate = async () => {
    if (!user?.id || !passwordUser) return;

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await setUserPassword(passwordUser.id, newPassword, user.id);
      toast.success("Password updated successfully");
      setPasswordUser(null);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Failed to update password");
    }
  };

  // Handle user update
  const handleUpdate = async (updatedUser: UserType) => {
    if (!user?.id) return;

    try {
      // Create a new object without the id field to avoid Prisma error
      const { id, createdAt, updatedAt, ...dataToUpdate } = updatedUser;

      await updateUser(updatedUser.id, dataToUpdate, user.id);
      setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
      toast.success("User updated successfully");
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    }
  };

  // Render role badge
  const renderRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge variant="secondary">Admin</Badge>;
      case "superadmin":
        return <Badge variant="destructive">Super Admin</Badge>;
      case "volunteer":
        return <Badge variant="outline">Volunteer</Badge>;
      default:
        return <Badge variant="default">User</Badge>;
    }
  };

  // Render status badge
  const renderStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge variant="default" className="bg-green-500">
        Active
      </Badge>
    ) : (
      <Badge variant="destructive">Blocked</Badge>
    );
  };

  return (
    <div className="space-y-4  p-1 overflow-x-hidden container">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl sm:text-3xl  font-bold">Users Management</h2>

        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by name or email..."
            className="pl-10 w-full md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
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
            <div className="overflow-x-auto max-w-xs sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">Name</TableHead>
                    <TableHead className="whitespace-nowrap">Email</TableHead>
                    <TableHead className="whitespace-nowrap">Role</TableHead>
                    <TableHead className="whitespace-nowrap">Status</TableHead>
                    <TableHead className="whitespace-nowrap text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    users?.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="whitespace-nowrap font-medium">
                          {user.name}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {user.email}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {renderRoleBadge(user.role)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {renderStatusBadge(user.status)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-right ">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="outline-none border-none">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="max-h-64 overflow-y-auto scroll-m-0">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() =>
                                  router.push(`/admin/users/${user.id}`)
                                }
                              >
                                <User className="h-4 w-4 mr-2" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => setEditingUser(user)}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => setPasswordUser(user)}
                              >
                                <Lock className="h-4 w-4 mr-2" />
                                Set Password
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => setDeleteConfirmUser(user)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete User
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel>Change Role</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleRoleChange(user.id, "user")
                                }
                              >
                                <UserCog className="h-4 w-4 mr-2" />
                                Set as User
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleRoleChange(user.id, "admin")
                                }
                              >
                                <ShieldCheck className="h-4 w-4 mr-2" />
                                Set as Admin
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleRoleChange(user.id, "volunteer")
                                }
                              >
                                <ShieldAlert className="h-4 w-4 mr-2" />
                                Set as Volunteer
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel>
                                Change Status
                              </DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(user.id, "active")
                                }
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Activate User
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(user.id, "blocked")
                                }
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Block User
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
                    pagination.page &&
                    pagination.page > 1 &&
                    handlePageChange(pagination.page - 1)
                  }
                  className={
                    pagination.page === 1
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
                  (pageNumber >= (pagination.page || 1) - 1 &&
                    pageNumber <= (pagination.page || 1) + 1)
                ) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        isActive={pageNumber === pagination.page}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }

                // Show ellipsis for skipped pages
                if (
                  (pageNumber === 2 && (pagination.page || 1) > 3) ||
                  (pageNumber === totalPages - 1 &&
                    (pagination.page || 1) < totalPages - 2)
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
                    pagination.page &&
                    pagination.page < totalPages &&
                    handlePageChange(pagination.page + 1)
                  }
                  className={
                    pagination.page === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Edit User Dialog */}
      <EditUserDialog
        user={editingUser}
        onUpdate={handleUpdate}
        onClose={() => setEditingUser(null)}
      />

      {/* Set Password Dialog */}
      <Dialog
        open={!!passwordUser}
        onOpenChange={() => {
          setPasswordUser(null);
          setNewPassword("");
          setConfirmPassword("");
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Password for {passwordUser?.name}</DialogTitle>
            <DialogDescription>
              This will set a new password for the user. They will need to use
              this password to log in.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setPasswordUser(null);
                setNewPassword("");
                setConfirmPassword("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePasswordUpdate}
              disabled={!newPassword || !confirmPassword}
            >
              Update Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteConfirmUser}
        onOpenChange={() => setDeleteConfirmUser(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {deleteConfirmUser?.name}? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteConfirmUser(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                deleteConfirmUser && handleDelete(deleteConfirmUser.id)
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

function EditUserDialog({
  user,
  onUpdate,
  onClose,
}: {
  user: UserType | null;
  onUpdate: (user: UserType) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  // Initialize form when user changes
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setRole(user.role || "user");
      setStatus(user.status || "active");
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    onUpdate({
      ...user,
      name,
      email,
      role: role as "user" | "admin" | "superadmin" | "volunteer",
      status: status as "active" | "blocked",
    });
  };

  if (!user) return null;

  return (
    <Dialog open={!!user} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="volunteer">Volunteer</SelectItem>
                <SelectItem value="superadmin">Super Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Update User</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
