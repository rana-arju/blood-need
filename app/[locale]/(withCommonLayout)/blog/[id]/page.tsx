import type { Metadata } from "next"
import { getBlogById } from "@/services/blog"
import BlogDetailContent from "@/components/blog/BlogDetailContent"

type Props = {
  params: { id: string; locale: string }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params
  try {
    const blog = await getBlogById(id)

    if (!blog?.success || !blog?.data) {
      return {
        title: "Blog Post Not Found | Blood Donation Community",
        description: "The requested blog post could not be found.",
      }
    }

    const post = blog.data

    // Extract plain text from HTML content for description
    const description = post.content
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .substring(0, 160)

    return {
      title: `${post.title} | Blood Donation Community`,
      description: description,
      openGraph: {
        title: post.title,
        description: description,
        images: [
          {
            url: post.image || "/images/default-blog.jpg",
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        type: "article",
        publishedTime: post.createdAt,
        modifiedTime: post.updatedAt,
        authors: [post.user?.name || "Blood Donation Community"],
        tags: post.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: description,
        images: [post.image || "/images/default-blog.jpg"],
      },
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Blog Post | Blood Donation Community",
      description: "Read our latest blog post about blood donation.",
    }
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { id } = params

  try {
    const blog = await getBlogById(id)

    // We'll handle the not found case in the client component
    // instead of using notFound()

    // Schema.org structured data for SEO
    const schemaData =
      blog?.success && blog?.data
        ? {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.data.title,
            image: blog.data.image || "/images/default-blog.jpg",
            datePublished: blog.data.createdAt,
            dateModified: blog.data.updatedAt,
            author: {
              "@type": "Person",
              name: blog.data.user?.name || "Blood Donation Community",
            },
            publisher: {
              "@type": "Organization",
              name: "Blood Donation Community",
              logo: {
                "@type": "ImageObject",
                url: "/logo.png",
              },
            },
            description: blog.data.content
              .replace(/<[^>]*>/g, " ")
              .replace(/\s+/g, " ")
              .trim()
              .substring(0, 160),
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${process.env.NEXT_PUBLIC_APP_URL}/blog/${id}`,
            },
          }
        : null

    return (
      <>
        {schemaData && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
        )}
        <BlogDetailContent id={id} />
      </>
    )
  } catch (error) {
    console.error("Error in BlogDetailPage:", error)
    // Return the component anyway, it will handle the error state
    return <BlogDetailContent id={id} />
  }
}

