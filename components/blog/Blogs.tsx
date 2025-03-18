"use client";
import { blogPosts } from "@/data/blogData";
import { OptimizedBlogList } from "./OptimizedBlogList";

const Blogs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="relative py-16 bg-primary/70">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Blood Donation Blog
          </h1>
          <p className="max-w-2xl mx-auto">
            Explore our articles about blood donation awareness, donor stories,
            and the impact of your contribution.
          </p>
        </div>
      </section>

      {/* Search and Filter + Blog Posts */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <OptimizedBlogList blogPosts={blogPosts} />
        </div>
      </section>
    </div>
  );
};

export default Blogs;
