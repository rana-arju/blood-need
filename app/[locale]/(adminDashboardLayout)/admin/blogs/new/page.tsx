import { AddBlogForm } from "@/components/admin/add-blog-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Blog | Admin Dashboard",
  description: "Create a new blog post",
}

export default function NewBlogPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
      <AddBlogForm />
    </div>
  )
}

