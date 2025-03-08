import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CalendarDays, Clock, Heart, Droplet, Tag } from "lucide-react";
import { blogPosts } from "@/data/blogData";
import Link from "next/link";

export function BlogSection() {
  // Display only 3 featured blog posts on homepage
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-up animate-delay-100">
          <h3 className="text-red-600 text-sm font-semibold uppercase mb-2">
            Our Articles
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold">
            Blood Donation Awareness
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Stay informed with our latest articles on blood donation, donor
            stories, and how your contribution makes a difference in saving
            lives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <Card
              key={post.id}
              className="h-full overflow-hidden hover:shadow-lg transition-shadow animate-fade-up"
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-56 object-cover transition-transform hover:scale-105 duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-semibold py-1 px-2 rounded">
                    {post.category}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <CalendarDays className="w-4 h-4 mr-1" />
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{post.readTime} min read</span>
                </div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0">
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                  asChild
                >
                  <Link href={`/blog/${post.id}`}>Read Article</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center animate-fade-up animate-delay-500">
          <Button
            variant="default"
            className="bg-primary hover:bg-primary/60 text-white"
            size="lg"
            asChild
          >
            <Link href="/blog">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
