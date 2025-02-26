import { Suspense } from "react";
import { notFound } from "next/navigation";
import { BlogContent } from "@/components/blog/BlogContent";
import  LoadingDrop  from "@/components/LoadingDrop";
import { BlogSidebar } from "@/components/blog/BlogSidebar";


async function getBlogPost(slug: string) {
  // In a real app, fetch from your API
  const posts = [
    {
      slug: "importance-of-blood-donation",
      title: "The Importance of Blood Donation",
      content: "...",
      date: "2024-02-15",
      author: "John Doe",
    },
    // Add more posts
  ];

  return posts.find((post) => post.slug === slug);
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Suspense fallback={<LoadingDrop />}>
              <BlogContent post={post} />
            </Suspense>
          </div>
          <div>
            <BlogSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
