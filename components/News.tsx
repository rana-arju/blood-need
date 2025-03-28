import { Button } from "@/components/ui/button"
import sanitizeHtml from "sanitize-html"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { CalendarDays, Clock } from "lucide-react"
import Link from "next/link"
import moment from "moment"
import { OptimizedImage } from "./OptimizedImage"
import { getAllBlog } from "@/services/blog"

export async function BlogSection() {
  const res = await getAllBlog()
  const blogPosts = res.data

  const getFirstWords = (html: string, wordLimit: number) => {
    // Remove all HTML tags to get plain text
    const plainText = sanitizeHtml(html, { allowedTags: [] }).trim()

    // Split by spaces and take the first `wordLimit` words
    const words = plainText.split(/\s+/).slice(0, wordLimit).join(" ")

    return words + (plainText.split(/\s+/).length > wordLimit ? "..." : "")
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-up animate-delay-100">
          <h3 className="text-red-600 dark:text-red-400 text-sm font-semibold uppercase mb-2">Our Articles</h3>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold dark:text-white">
            Blood Donation Awareness
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Stay informed with our latest articles on blood donation, donor stories, and how your contribution makes a
            difference in saving lives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts?.slice(0, 3).map((post, index) => (
            <Card
              key={post.id}
              className="h-full overflow-hidden hover:shadow-lg transition-shadow animate-fade-up dark:bg-gray-800 dark:border-gray-700"
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden">
                  <OptimizedImage
                    src={post.image || "/placeholder.svg?height=400&width=600"}
                    alt={post.title}
                    width={400}
                    height={225}
                    className="w-full h-56 object-cover transition-transform hover:scale-105 duration-500"
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
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white dark:border-primary dark:text-primary/50 dark:hover:bg-red-400 dark:hover:text-white"
                  asChild
                >
                  <Link href={`/blog/${post.id}`}>Read Article</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center animate-fade-up animate-delay-500">
          <Button variant="default" className="bg-primary hover:bg-primary/60 text-white" size="lg" asChild>
            <Link href="/blog">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default BlogSection

