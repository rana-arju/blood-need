import { BlogPreview } from "@/components/admin/blog-preview"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog Preview | Admin Dashboard",
  description: "Preview a blog post",
}

export default function BlogPreviewPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Blog Preview</h1>
      <BlogPreview id={params.id} />
    </div>
  )
}

