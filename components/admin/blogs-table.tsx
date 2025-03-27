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
import { Card, CardContent } from "@/components/ui/card"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
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
}

export function BlogsTable() {
  const router = useRouter()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null)

    const { data: session } = useSession();
  

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setIsLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog`, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await res.json()
console.log("Data", data);

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
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.user?.id}`,
        },
      })

      const data = await res.json()

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
      setBlogToDelete(null)
    }
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text?.length <= maxLength) return text
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
  console.log("blogs",blogs);

  return (
    <Card>
      <CardContent className="p-0">
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
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => blogToDelete && handleDelete(blogToDelete)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}

