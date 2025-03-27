import { AddBlogForm } from "@/components/admin/add-blog-form";

export default function NewBlogPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-bold">Create New Blog</h1>
      <AddBlogForm />
    </div>
  )
}

