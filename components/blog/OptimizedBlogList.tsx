"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { CalendarDays, Clock, Search, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { OptimizedImage } from "@/components/OptimizedImage"
import DescriptiveLink from "../DescriptiveLink"
import sanitizeHtml from "sanitize-html"
import { getAllBlog } from "@/services/blog"
import moment from "moment"
import { useRouter, useSearchParams } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"

export function OptimizedBlogList({ initialBlogPosts }: { initialBlogPosts: any[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get("searchTerm") || "")
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [totalPosts, setTotalPosts] = useState(0)
  const limit = 9
  const observerRef = useRef(null)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const getFirstWords = (html: string, wordLimit: number) => {
    // Remove all HTML tags to get plain text
    const plainText = sanitizeHtml(html, { allowedTags: [] }).trim()

    // Split by spaces and take the first `wordLimit` words
    const words = plainText.split(/\s+/).slice(0, wordLimit).join(" ")

    return words + (plainText.split(/\s+/).length > wordLimit ? "..." : "")
  }

  const fetchBlogs = async (reset = false) => {
    try {
      setLoading(true)
      const currentPage = reset ? 1 : page

      const filters = searchTerm ? { searchTerm } : undefined
      const pagination = {
        page: currentPage,
        limit,
        sortBy: "createdAt",
        sortOrder: "desc" as "desc",
      }

      const res = await getAllBlog(filters, pagination)

      if (reset) {
        setBlogPosts(res.data)
      } else {
        setBlogPosts((prev) => [...prev, ...res.data])
      }

      setTotalPosts(res.meta.total)
      setHasMore(currentPage * limit < res.meta.total)

      if (!reset) {
        setPage((prev) => prev + 1)
      } else {
        setPage(2)
      }
    } catch (error) {
      console.error("Error fetching blogs:", error)
    } finally {
      setLoading(false)
    }
  }

  // Handle search input changes with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    searchTimeoutRef.current = setTimeout(() => {
      // Update URL with search term
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set("searchTerm", value)
      } else {
        params.delete("searchTerm")
      }

      // Replace the URL without reloading the page
      const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`
      window.history.replaceState({}, "", newUrl)

      fetchBlogs(true)
    }, 500)
  }

  // Intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchBlogs()
        }
      },
      { threshold: 0.1 },
    )

    if (observerRef.current) observer.observe(observerRef.current)

    return () => {
      if (observerRef.current) observer.disconnect()
    }
  }, [hasMore, loading])

  // Initial fetch
  useEffect(() => {
    fetchBlogs(true)

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [])

  return (
    <>
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search articles..."
            className="pl-10"
            value={searchTerm}
            onChange={handleSearchChange}
            aria-label="Search blog posts"
          />
        </div>
      </div>

      {/* Blog Posts Grid */}
      {blogPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post: any) => (
            <Card
              key={post.id}
              className="h-full overflow-hidden hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden h-56">
                  <OptimizedImage
                    src={post.image || "/placeholder.svg?height=400&width=600"}
                    alt={post.title}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover"
                  />
                  {post.tags && post.tags.length > 0 && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-semibold py-1 px-2 rounded">
                      {post.tags[0]}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
                  <CalendarDays className="w-4 h-4 mr-1" />
                  <span>{moment(post.createdAt).format("LL")}</span>
                  <span className="mx-2">•</span>
                  <Clock className="w-4 h-4 mr-1" />
                  <span>5 min read</span>
                </div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2 dark:text-white">{post.title}</h3>
                <div className="prose max-w-none dark:text-gray-300">
                  <p>{getFirstWords(post.content, 20)}</p>
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0">
                <Button
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white dark:border-primary dark:text-primary dark:hover:bg-priamry/50 dark:hover:text-white"
                  asChild
                >
                  <DescriptiveLink href={`/blog/${post.id}`} ariaLabel={`Read full article about ${post.title}`}>
                    Read More
                  </DescriptiveLink>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : loading && page === 1 ? (
        <BlogListSkeleton />
      ) : (
        <div className="text-center py-12 dark:text-white">
          <h3 className="text-xl font-bold mb-2">No Articles Found</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We couldn't find any articles matching your search criteria.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("")
              const newUrl = window.location.pathname
              window.history.replaceState({}, "", newUrl)
              fetchBlogs(true)
            }}
          >
            Reset Search
          </Button>
        </div>
      )}

      {/* Loading indicator */}
      {loading && page > 1 && (
        <div className="flex justify-center mt-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {/* Infinite Scroll Trigger */}
      {hasMore && !loading && <div ref={observerRef} className="h-10 mt-8" />}

      {/* Total posts counter */}
      <div className="text-center mt-8 text-gray-500 dark:text-gray-400">
        {blogPosts.length > 0 && (
          <p>
            Showing {blogPosts.length} of {totalPosts} articles
          </p>
        )}
      </div>
    </>
  )
}

// Loading skeleton component
function BlogListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="h-full overflow-hidden dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="p-0">
            <Skeleton className="h-56 w-full" />
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-7 w-full mb-2" />
            <Skeleton className="h-7 w-3/4 mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </CardContent>
          <CardFooter className="px-6 pb-6 pt-0">
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

