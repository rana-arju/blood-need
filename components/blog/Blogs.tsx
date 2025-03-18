"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CalendarDays, Clock, Droplet, Search, Tag } from "lucide-react";
import { blogPosts } from "@/data/blogData";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Extract unique categories
  const categories = Array.from(
    new Set(blogPosts.map((post) => post.category))
  );

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? post.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="relative py-16 bg-primary/70">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Blood Donation Blog
          </h2>
          <p className="max-w-2xl mx-auto">
            Explore our articles about blood donation awareness, donor stories,
            and the impact of your contribution.
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                className={
                  selectedCategory === null ? "bg-red-600 hover:bg-red-700" : ""
                }
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Button>

              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  className={
                    selectedCategory === category
                      ? "bg-red-600 hover:bg-red-700"
                      : ""
                  }
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="h-full overflow-hidden hover:shadow-lg transition-shadow"
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
                      <span>{post.createdAt}</span>
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
                      <Link href={`/blog/${post.id}`}>Read Full Article</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Droplet className="w-12 h-12 mx-auto text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">No Articles Found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any articles matching your search criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory(null);
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blogs;
