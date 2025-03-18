import Blogs from "@/components/blog/Blogs";
import { constructMetadata } from "@/lib/seo-config";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  //const t = await getTranslations({ locale, namespace: "Blog" });

  return constructMetadata({
    title:  "Blood Donation Blog",
    description:
     
      "Explore our articles about blood donation awareness, donor stories, and the impact of your contribution.",
    keywords: [
      "blood donation blog",
      "donor stories",
      "blood donation tips",
      "blood donation awareness",
      "health articles",
    ],
    openGraph: {
      type: "website",
      title: "Blood Donation Blog | Blood Donation Community",
      description:
       
        "Explore our articles about blood donation awareness, donor stories, and the impact of your contribution.",
      images: [
        {
          url: "/blog-og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Blood Donation Blog",
        },
      ],
    },
  });
}

export default function BlogsPage() {
  return (
    <div>
      <Blogs />
    </div>
  );
}
