import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { constructMetadata } from "@/lib/seo-config";
import { generateContactPageSchema } from "@/lib/schema";


export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;

  return constructMetadata({
    title: "Contact Us",
    description:
      "Get in touch with us for any questions or concerns about blood donation.",
    keywords: ["contact us", "blood donation", "support", "help", "questions"],
    openGraph: {
      type: "website",
      title: "Contact Us | Blood Donation Community",
      description:
        "Get in touch with us for any questions or concerns about blood donation.",
      images: [
        {
          url: "https://res.cloudinary.com/db8l1ulfq/image/upload/v1742322550/blood-need-contact_p5pu2x.webp",
          width: 1200,
          height: 630,
          alt: "Blood Need Contact",
        },
      ],
    },
  });
}

export default function ContactPage() {
  const contactSchema = generateContactPageSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <div className="min-h-screen bg-background">
        <div className="container px-4 py-16">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get in touch with us for any questions or concerns about blood
              donation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </div>
    </>
  );
}
