"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { BlogFormBase, BlogFormValues } from "./blog-form-base"
import { useSession } from "next-auth/react"

// Default values for a new blog post
const defaultValues: BlogFormValues = {
  title: "",
  content: "",
  tags: [],
  image: "",
}

export function AddBlogForm() {
  const router = useRouter()
  const {data: session} = useSession()

  const onSubmit = async (values: BlogFormValues) => {
    try {
      if (session?.user.id == null) {
        throw new Error("User ID not found in session")
        
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.id}`,
        },
        body: JSON.stringify(values),
        cache: "no-store",
        credentials: "include",
      })

      const data = await res.json()

      if (data.success) {
        toast.success(data.message || "Blog post created successfully")
        router.push("/admin/blogs")
        router.refresh()
      } else {
        toast.error(data.message || "Failed to create blog post")
      }
    } catch (error) {
      console.error("Error creating blog post:", error)
      toast.error("An error occurred while creating the blog post")
      throw error
    }
  }

  return <BlogFormBase defaultValues={defaultValues} onSubmit={onSubmit} submitButtonText="Create Blog Post" />
}

