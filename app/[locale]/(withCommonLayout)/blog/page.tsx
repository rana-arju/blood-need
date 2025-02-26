import { BlogCategories } from "@/components/blog/BlogCategories";
import { BlogList } from "@/components/blog/BlogList";
import { BlogSearch } from "@/components/blog/BlogSearch";
import LoadingDrop from "@/components/LoadingDrop";
import { Suspense } from "react";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold tracking-tight">
            Blood Donation Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay informed about blood donation news, tips, and success stories
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <BlogSearch />
            <Suspense fallback={<LoadingDrop />}>
              <BlogList />
            </Suspense>
          </div>
          <div>
            <BlogCategories />
          </div>
        </div>
      </div>
    </div>
  );
}
