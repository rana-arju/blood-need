"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { toast } from "sonner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, MoreHorizontal, Plus, Trash } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import moment from "moment"
import { useSession } from "next-auth/react"

interface Blog {
  id: string
  title: string
  content: string
  image: string
  createdAt: string
  updatedAt: string
  userId: string
  tags?: string[]
}

export function BlogsTable() {
  const router = useRouter()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
const {data:sessions} = useSession()
  useEffect(() => {
    fetchBlogs()
  }, [])
console.log(sessions);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true)
      const token = sessions?.user?.id


      console.log("Fetching all blogs")

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        cache: "no-store",
      })

      console.log("Fetch all blogs response status:", res.status)

      const data = await res.json()
      console.log("Fetch all blogs response data:", data)

      if (data.success && data.data) {
        setBlogs(data.data)
      } else {
        setError(data.message || "Failed to fetch blogs")
        toast.error(data.message || "Failed to fetch blogs")
      }
    } catch (error) {
      console.error("Error fetching blogs:", error)
      setError("An error occurred while fetching blogs")
      toast.error("An error occurred while fetching blogs")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(true)
      

      if (!sessions?.user?.id) {
        toast.error("Authentication token not found. Please log in again.")
        router.push("/auth/signin")
        return
      }

      console.log("Deleting blog with ID:", id)

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessions?.user?.id}`,
        },
        cache: "no-store",
      })

      console.log("Delete blog response status:", res.status)

      const data = await res.json()
      console.log("Delete blog response data:", data)

      if (data.success) {
        toast.success(data.message || "Blog deleted successfully")
        // Remove the deleted blog from the state
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id))
      } else {
        toast.error(data.message || "Failed to delete blog")
      }
    } catch (error) {
      console.error("Error deleting blog:", error)
      toast.error("An error occurred while deleting the blog")
    } finally {
      setIsDeleting(false)
      setBlogToDelete(null)
    }
  }

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return ""
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-md" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={fetchBlogs}>Try Again</Button>
        </CardContent>
      </Card>
    )
  }

  // Render a card-based layout for mobile and small screens
  const renderMobileView = () => {
    return (
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {blogs.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">No blogs found. Create your first blog post!</CardContent>
          </Card>
        ) : (
          blogs.map((blog) => (
            <Card key={blog.id}>
              <CardHeader className="p-4 pb-2 flex-row gap-4 items-center">
                <div className="relative h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={
                      blog.image ||
                      "https://res.cloudinary.com/db8l1ulfq/image/upload/v1742841645/y9DpT_fyxpqp.jpg" ||
                      "/placeholder.svg"
                    }
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardTitle className="text-base">{truncateText(blog.title, 50)}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Created: {moment(blog.createdAt).format("LL")}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => router.push(`/admin/blogs/edit/${blog.id}`)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => setBlogToDelete(blog.id)}>
                  <Trash className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    )
  }

  // Render a table for desktop and larger screens
  const renderDesktopView = () => {
    return (
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No blogs found. Create your first blog post!
                </TableCell>
              </TableRow>
            ) : (
              blogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <div className="relative h-12 w-12 rounded-md overflow-hidden">
                      <Image
                        src={
                          blog.image ||
                          "https://res.cloudinary.com/db8l1ulfq/image/upload/v1742841645/y9DpT_fyxpqp.jpg" ||
                          "/placeholder.svg"
                        }
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{truncateText(blog.title, 50)}</TableCell>
                  <TableCell>{moment(blog.createdAt).format("LL")}</TableCell>
                  <TableCell>{moment(blog.updatedAt).format("LL")}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/admin/blogs/edit/${blog.id}`)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => setBlogToDelete(blog.id)}>
                          <Trash className="mr-2 h-4 w-4" />
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
    )
  }

  return (
    <Card>
      <CardHeader className="px-6 py-4 flex flex-row items-center justify-between">
        <CardTitle>Blog Posts</CardTitle>
        <Button onClick={() => router.push("/admin/blogs/new")}>
          <Plus className="h-4 w-4 mr-2" />
          New Blog
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        {renderMobileView()}
        {renderDesktopView()}
      </CardContent>

      <AlertDialog open={!!blogToDelete} onOpenChange={(open) => !open && setBlogToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the blog post and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => blogToDelete && handleDelete(blogToDelete)}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}

