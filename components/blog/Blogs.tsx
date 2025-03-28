import { OptimizedBlogList } from "./OptimizedBlogList"
import { getAllBlog } from "@/services/blog"

const Blogs = async () => {
  const res = await getAllBlog()
  const blogPosts = res.data

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Banner */}
      <section className="relative py-16 bg-primary/70 dark:bg-primary/80">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Blood Donation Blog</h1>
          <p className="max-w-2xl mx-auto">
            Explore our articles about blood donation awareness, donor stories, and the impact of your contribution.
          </p>
        </div>
      </section>

      {/* Search and Filter + Blog Posts */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <OptimizedBlogList initialBlogPosts={blogPosts} />
        </div>
      </section>
    </div>
  )
}

export default Blogs

