"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  Clock,
  Heart,
  Share,
  ArrowLeft,
  MessageCircle,
  BookOpen,
  Tag,
} from "lucide-react";
import { blogPosts, type BlogPost } from "@/data/blogData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function BlogDetailContent({ id }: { id: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);


  useEffect(() => {
    // Find the current post
    const currentPost = blogPosts.find((post) => post.id === Number(id));

    if (currentPost) {
      setPost(currentPost);

      // Find related posts (same category, excluding current post)
      const related = blogPosts
        .filter(
          (p) => p.category === currentPost.category && p.id !== currentPost.id
        )
        .slice(0, 2); // Limit to 2 related posts

      setRelatedPosts(related);
    }

    // Scroll to top when post changes
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16 text-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Article not found
          </h3>
          <p className="mb-6">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
          <div className="max-w-3xl">
            <div className="inline-block bg-red-600 text-white text-sm font-semibold py-1 px-3 rounded mb-4">
              {post.category}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center text-white/80 text-sm">
              <CalendarDays className="w-4 h-4 mr-1" />
              <span>{post.createdAt}</span>
              <span className="mx-2">•</span>
              <Clock className="w-4 h-4 mr-1" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8">
                {/* Author Info */}
                <div className="flex items-center mb-8 pb-6 border-b">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={post.authorImage} alt={post.author} />
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{post.author}</p>
                    <p className="text-sm text-gray-500">
                      Blood Donation Specialist
                    </p>
                  </div>
                </div>

                {/* Article Body */}
                <div
                  className="prose prose-red max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                <div className="mt-8 pt-6 border-t flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Social Share */}
                <div className="mt-8 pt-6 border-t">
                  <h3 className="font-semibold mb-4">Share this article</h3>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <Share className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mb-8">
                <Button variant="outline" asChild>
                  <Link href="/blog" className="flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                  </Link>
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              {/* CTA Card */}
              <div className="bg-red-600 text-white rounded-lg shadow-sm p-6 mb-8">
                <div className="flex justify-center mb-4">
                  <Heart className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">
                  Become a Blood Donor Today
                </h3>
                <p className="mb-6 text-white/90 text-center">
                  Your donation can save up to 3 lives. Join our community of
                  heroes and make a difference.
                </p>
                <Button
                  className="w-full bg-white text-red-600 hover:bg-gray-100 hover:text-red-600"
                  asChild
                >
                  <Link href="/be-donor">Register as Donor</Link>
                </Button>
              </div>

              {/* Related Articles */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Related Articles
                </h3>

                {relatedPosts.length > 0 ? (
                  <div className="space-y-4">
                    {relatedPosts.map((related) => (
                      <div
                        key={related.id}
                        className="flex gap-4 pb-4 border-b last:border-0 last:pb-0"
                      >
                        <img
                          src={related.image || "/placeholder.svg"}
                          alt={related.title}
                          className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                        />
                        <div>
                          <h4 className="font-semibold line-clamp-2 mb-1">
                            <Link
                              href={`/blog/${related.id}`}
                              className="hover:text-red-600 transition-colors"
                            >
                              {related.title}
                            </Link>
                          </h4>
                          <div className="flex items-center text-gray-500 text-xs">
                            <CalendarDays className="w-3 h-3 mr-1" />
                            <span>{related.createdAt}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No related articles found.
                  </p>
                )}
              </div>

              {/* Categories List */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4">Categories</h3>
                <div className="space-y-2">
                  {Array.from(
                    new Set(blogPosts.map((post) => post.category))
                  ).map((category) => (
                    <Link
                      key={category}
                      href={`/blog?category=${category}`}
                      className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <span>{category}</span>
                      <span className="bg-gray-100 text-gray-700 text-xs py-1 px-2 rounded-full">
                        {
                          blogPosts.filter((post) => post.category === category)
                            .length
                        }
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
