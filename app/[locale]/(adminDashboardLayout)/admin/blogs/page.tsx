import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { BlogsTable } from "@/components/admin/blogs-table"

export const metadata: Metadata = {
  title: "Blog Management | Admin Dashboard",
  description: "Manage blog posts for the blood donation community",
}

export default function BlogsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Management</h1>
        <Link href="/admin/blogs/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Blog
          </Button>
        </Link>
      </div>
      <BlogsTable />
    </div>
  )
}

