"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CalendarDays, Clock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { OptimizedImage } from "@/components/OptimizedImage";
import DescriptiveLink from "../DescriptiveLink";

export function OptimizedBlogList({ blogPosts }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [page, setPage] = useState(1);
  const postsPerPage = 9;
  const observerRef = useRef(null);

  // Extract unique categories
  const categories = useMemo(
    () => Array.from(new Set(blogPosts.map((post: any) => post.category))),
    [blogPosts]
  );

  // Memoize filtered posts to prevent unnecessary recalculations
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post: any) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory
        ? post.category === selectedCategory
        : true;
      return matchesSearch && matchesCategory;
    });
  }, [blogPosts, searchTerm, selectedCategory]);

  // Update visible posts when filters or page changes
  useEffect(() => {
    setVisiblePosts(filteredPosts.slice(0, page * postsPerPage));
  }, [filteredPosts, page]);

  // Reset pagination when filters change
  useEffect(() => {
    if (page !== 1) setPage(1);
  }, [filteredPosts]);

  // Intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => {
            const nextPage = prevPage + 1;
            const maxPages = Math.ceil(filteredPosts.length / postsPerPage);
            return nextPage <= maxPages ? nextPage : prevPage;
          });
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [filteredPosts.length]); // Re-run when `filteredPosts.length` changes

  return (
    <>
      {/* Search and Category Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search articles..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search blog posts"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={!selectedCategory ? "default" : "outline"}
            size="sm"
            className={!selectedCategory ? "bg-red-600 hover:bg-red-700" : ""}
            onClick={() => setSelectedCategory("")}
          >
            All
          </Button>

          {categories.map((category: any, index) => (
            <Button
              key={index}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              className={
                selectedCategory === category ? "bg-red-600 hover:bg-red-700" : ""
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      {visiblePosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visiblePosts.map((post: any) => (
            <Card
              key={post.id}
              className="h-full overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden h-56">
                  <OptimizedImage
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={225}
                    className="w-full h-full"
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
                <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 line-clamp-3 mb-4">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0">
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                  asChild
                >
                  <DescriptiveLink
                    href={`/blog/${post.id}`}
                    ariaLabel={`Read full article about ${post.title}`}
                  >
                    Read Full Article
                  </DescriptiveLink>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-bold mb-2">No Articles Found</h3>
          <p className="text-gray-600 mb-4">
            We couldn't find any articles matching your search criteria.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("");
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}

      {/* Infinite Scroll Trigger */}
      {visiblePosts.length < filteredPosts.length && <div ref={observerRef} className="h-10 mt-8" />}
    </>
  );
}
