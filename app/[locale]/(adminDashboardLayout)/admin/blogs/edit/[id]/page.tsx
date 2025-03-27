import { EditBlogForm } from "@/components/admin/edit-blog-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Edit Blog | Admin Dashboard",
  description: "Edit an existing blog post",
}

export default async function EditBlogPage({
  params,
}: any) {
  const {id} = await params
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>
      <EditBlogForm id={id} />
    </div>
  )
}

