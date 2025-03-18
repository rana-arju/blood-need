import { blogPosts } from "@/data/blogData";
import { constructMetadata } from "@/lib/seo-config";
import { generateBlogPostSchema } from "@/lib/schema";
import { getTranslations } from "next-intl/server";
import BlogDetailContent from "@/components/blog/BlogDetailContent";

export async function generateMetadata({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const { id, locale } = await params;
  // const t = await getTranslations({ locale, namespace: "Blog" });

  // Find the blog post
  const post = blogPosts.find((post) => post.id === Number(id));

  if (!post) {
    return constructMetadata({
      title: "Blog Post Not Found",
      description: "The blog post you are looking for does not exist.",
      noIndex: true,
    });
  }

  return constructMetadata({
    title: post.title,
    description: post.excerpt,
    keywords: [...post.tags, post.category, "blood donation", "blog"],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.createdAt,
    },
  });
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default function BlogDetailPage({
  params,
}: {
  params: { id: string; locale: string };
}) {
  const post = blogPosts.find((post) => post.id === Number(params.id));

  if (!post) {
    return null;
  }

  const blogSchema = generateBlogPostSchema(
    post,
    `${process.env.NEXT_PUBLIC_APP_URL}/${params.locale}/blog/${params.id}`
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <BlogDetailContent id={params.id} />
    </>
  );
}
