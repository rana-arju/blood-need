import { BlogsTable } from "@/components/admin/blogs-table"

export default function AdminBlogsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Blog Management</h1>
      <BlogsTable />
    </div>
  )
}

