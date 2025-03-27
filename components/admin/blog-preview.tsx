"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft } from "lucide-react"
import moment from "moment"

interface BlogPreviewProps {
  id: string
}

export function BlogPreview({ id }: BlogPreviewProps) {
  const router = useRouter()
  const [blog, setBlog] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })

        const data = await res.json()

        if (data.success && data.data) {
          setBlog(data.data)
        } else {
          setError(data.message || "Failed to fetch blog post")
        }
      } catch (error) {
        console.error("Error fetching blog post:", error)
        setError("An error occurred while fetching the blog post")
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlog()
  }, [id])

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    )
  }

  if (error || !blog) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-red-500 mb-4">{error || "Failed to load blog post"}</p>
          <Button onClick={() => router.push("/admin/blogs")}>Back to Blogs</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => router.push("/admin/blogs")} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blogs
      </Button>

      <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-6">
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

      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{blog.title}</h1>

        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <span>Created: {moment(blog.createdAt).format("LL")}</span>
          <span className="mx-2">•</span>
          <span>Updated: {moment(blog.updatedAt).format("LLL")}</span>
        </div>

        <div className="prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>
    </div>
  )
}

