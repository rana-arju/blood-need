"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  CalendarDays,
  Clock,
  Heart,
  Share,
  ArrowLeft,
  MessageCircle,
  BookOpen,
  Tag,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { OptimizedImage } from "@/components/OptimizedImage"
import { useDynamicScript } from "@/utils/script-optimization"
import { getBlogById, type IBlog } from "@/services/blog"
import { Skeleton } from "@/components/ui/skeleton"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "sonner"
import DescriptiveLink from "../DescriptiveLink"
import moment from "moment"

// Declare the global interface for window with hljs
declare global {
  interface Window {
    hljs?: {
      highlightElement: (element: HTMLElement) => void
    }
  }
}

export default function BlogDetailContent({ id }: { id: string }) {
  const [post, setPost] = useState<IBlog | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<IBlog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  // Load syntax highlighting only if needed
  const hasCodeBlocks = post?.content?.includes("<pre>") || post?.content?.includes("<code>")
  const highlightJsLoaded = useDynamicScript(
    "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js",
    "highlight-js",
    hasCodeBlocks,
  )

  // CSS for syntax highlighting
  useDynamicScript(
    "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github-dark.min.css",
    "highlight-css",
    hasCodeBlocks,
  )

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const res = await getBlogById(id)

        if (res?.success && res?.data) {
          setPost(res.data)

          // Fetch related posts logic could go here
          // For now, we'll leave relatedPosts empty
        } else {
          setError(res?.message || "Failed to load blog post")
        }
      } catch (err) {
        console.error("Error fetching blog:", err)
        setError("An error occurred while loading the blog post")
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchBlog()
    }

    // Scroll to top when post changes
    window.scrollTo(0, 0)
  }, [id])

  // Apply syntax highlighting
  useEffect(() => {
    if (highlightJsLoaded && hasCodeBlocks && window.hljs) {
      document.querySelectorAll("pre code").forEach((block) => {
        (window.hljs!).highlightElement(block as HTMLElement)
      })
    }
  }, [highlightJsLoaded, hasCodeBlocks, post])

  // Copy URL to clipboard
  const copyToClipboard = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url).then(
      () => {
        setCopied(true)
        toast.success("URL copied to clipboard")
        setTimeout(() => setCopied(false), 2000)
      },
      (err) => {
        console.error("Could not copy text: ", err)
        toast.error("Failed to copy URL")
      },
    )
  }

  // Share on social media
  const shareOnSocial = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(post?.title || "Blood Donation Blog Post")

    let shareUrl = ""

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        break
      default:
        return
    }

    window.open(shareUrl, "_blank", "width=600,height=400")
  }

  // Loading state
  if (isLoading) {
    return <BlogDetailSkeleton />
  }

  // Error state
  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-16 text-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 dark:text-white">
            {error || "Article not found"}
          </h3>
          <p className="mb-6 dark:text-gray-300">The article you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <DescriptiveLink href="/blog" ariaLabel="Return to blog listing page">
              Back to Blog
            </DescriptiveLink>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Banner */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src={post.image || "/placeholder.svg?height=600&width=1200"}
            alt={post.title}
            width={1200}
            height={600}
            priority={true}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
          <div className="max-w-3xl">
            {post.tags && post.tags.length > 0 && (
              <div className="inline-block bg-red-600 text-white text-sm font-semibold py-1 px-3 rounded mb-4">
                {post.tags[0]}
              </div>
            )}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{post.title}</h1>
            <div className="flex items-center text-white/80 text-sm">
              <CalendarDays className="w-4 h-4 mr-1" />
              <span>{moment(post.createdAt).format("LL")}</span>
              <span className="mx-2">•</span>
              <Clock className="w-4 h-4 mr-1" />
              <span>5 min read</span>
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
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 md:p-8 mb-8">
                {/* Author Info */}
                <div className="flex items-center mb-8 pb-6 border-b dark:border-gray-700">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage
                      src={post.user?.image || "/placeholder.svg?height=48&width=48"}
                      alt={post.user?.name || "Author"}
                    />
                    <AvatarFallback>{post.user?.name?.[0] || "A"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold dark:text-white">{post.user?.name || "Admin"}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Admin</p>
                  </div>
                </div>

                {/* Article Body */}
                <div
                  className="prose prose-red dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t dark:border-gray-700 flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm dark:text-gray-200"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Social Share */}
                <div className="mt-8 pt-6 border-t dark:border-gray-700">
                  <h3 className="font-semibold mb-4 dark:text-white">Share this article</h3>
                  <div className="flex gap-3">
                    <Button variant="outline" size="icon" className="rounded-full" aria-label="Like this article">
                      <Heart className="h-4 w-4" />
                    </Button>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="icon" className="rounded-full" aria-label="Share this article">
                          <Share className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-2">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full"
                            onClick={() => shareOnSocial("facebook")}
                            aria-label="Share on Facebook"
                          >
                            <Facebook className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full"
                            onClick={() => shareOnSocial("twitter")}
                            aria-label="Share on Twitter"
                          >
                            <Twitter className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full"
                            onClick={() => shareOnSocial("linkedin")}
                            aria-label="Share on LinkedIn"
                          >
                            <Linkedin className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full"
                            onClick={copyToClipboard}
                            aria-label="Copy link"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>

                    <Button variant="outline" size="icon" className="rounded-full" aria-label="Comment on this article">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mb-8">
                <Button variant="outline" asChild>
                  <DescriptiveLink href="/blog" className="flex items-center" ariaLabel="Return to blog listing page">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                  </DescriptiveLink>
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
                <h3 className="text-xl font-bold mb-4 text-center">Become a Blood Donor Today</h3>
                <p className="mb-6 text-white/90 text-center">
                  Your donation can save up to 3 lives. Join our community of heroes and make a difference.
                </p>
                <Button className="w-full bg-white text-red-600 hover:bg-gray-100 hover:text-red-600" asChild>
                  <DescriptiveLink href="/be-donor" ariaLabel="Register as a blood donor">
                    Register as Donor
                  </DescriptiveLink>
                </Button>
              </div>

              {/* Related Articles */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
                <h3 className="text-lg font-bold mb-4 flex items-center dark:text-white">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Related Articles
                </h3>

                {relatedPosts.length > 0 ? (
                  <div className="space-y-4">
                    {relatedPosts.map((related) => (
                      <div
                        key={related.id}
                        className="flex gap-4 pb-4 border-b dark:border-gray-700 last:border-0 last:pb-0"
                      >
                        <div className="w-20 h-20 flex-shrink-0">
                          <OptimizedImage
                            src={related.image || "/placeholder.svg?height=80&width=80"}
                            alt={related.title}
                            width={80}
                            height={80}
                            className="rounded-md"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold line-clamp-2 mb-1 dark:text-white">
                            <DescriptiveLink
                              href={`/blog/${related.id}`}
                              className="hover:text-red-600 transition-colors dark:hover:text-red-400"
                              ariaLabel={`Read article: ${related.title}`}
                            >
                              {related.title}
                            </DescriptiveLink>
                          </h4>
                          <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                            <CalendarDays className="w-3 h-3 mr-1" />
                            <span>{moment(related.createdAt).format("LL")}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">No related articles found.</p>
                )}
              </div>

              {/* Categories List */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4 dark:text-white">Categories</h3>
                <div className="space-y-2">
                  {/* We'll need to fetch categories from the API */}
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Categories will be displayed here.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Loading skeleton component
function BlogDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Banner Skeleton */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden bg-gray-200 dark:bg-gray-800">
        <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-8">
          <div className="max-w-3xl">
            <Skeleton className="h-8 w-24 mb-4" />
            <Skeleton className="h-12 w-full mb-2" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content Skeleton */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content Skeleton */}
            <div className="lg:w-2/3">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 md:p-8 mb-8">
                {/* Author Info Skeleton */}
                <div className="flex items-center mb-8 pb-6 border-b dark:border-gray-700">
                  <Skeleton className="h-12 w-12 rounded-full mr-4" />
                  <div>
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>

                {/* Article Body Skeleton */}
                <div className="space-y-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-40 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-5/6" />
                  <Skeleton className="h-6 w-full" />
                </div>

                {/* Tags Skeleton */}
                <div className="mt-8 pt-6 border-t dark:border-gray-700 flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>

                {/* Social Share Skeleton */}
                <div className="mt-8 pt-6 border-t dark:border-gray-700">
                  <Skeleton className="h-6 w-40 mb-4" />
                  <div className="flex gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Navigation Skeleton */}
              <div className="flex justify-between items-center mb-8">
                <Skeleton className="h-10 w-32" />
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <div className="lg:w-1/3">
              {/* CTA Card Skeleton */}
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg shadow-sm p-6 mb-8">
                <div className="flex justify-center mb-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                </div>
                <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mx-auto mb-2" />
                <Skeleton className="h-4 w-4/6 mx-auto mb-6" />
                <Skeleton className="h-10 w-full" />
              </div>

              {/* Related Articles Skeleton */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
                <Skeleton className="h-6 w-40 mb-4" />
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4 pb-4 border-b dark:border-gray-700 last:border-0 last:pb-0">
                      <Skeleton className="w-20 h-20 rounded-md" />
                      <div className="flex-1">
                        <Skeleton className="h-5 w-full mb-1" />
                        <Skeleton className="h-5 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories List Skeleton */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

