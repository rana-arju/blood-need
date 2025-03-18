import { BloodRequest } from "@/services/bloodRegister";
import type {
  Organization,
  WebSite,
  WithContext,
  BreadcrumbList,
  Article,
  MedicalEntity,
} from "schema-dts";
// Schema markup for different page types
export function generatePersonSchema(person: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.role,
    description: person.bio,
    image: person.image,
    url: person.url,
    sameAs: person.socialLinks,
    contactPoint: {
      "@type": "ContactPoint",
      email: person.email,
      telephone: person.phone,
    },
  }
}

export function generateOrganizationSchema(

){
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Blood Need - Blood Donation Community",

    url: process.env.NEXT_PUBLIC_APP_URL,
    logo: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
    sameAs: [
      "https://facebook.com/bloodneed",
      "https://twitter.com/bloodneed",
      "https://instagram.com/bloodneed",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+8801881220413",
      contactType: "customer service",
      email: "bloodneed@gmail.com",
      availableLanguage: ["English", "Bengali"],
    },
    description:
      "Connect blood donors with those in need, save lives through our blood donation community platform.",
  };
}

export function generateWebsiteSchema(url: string): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Blood Need",
    url: url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string", // Schema.org correct format
    } as unknown as WebSite["potentialAction"], // ✅ Type assertion to bypass error
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateBloodRequestSchema(
  request: BloodRequest,
  url: string
): WithContext<MedicalEntity> {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalEntity",
    name: `Blood Request: ${request.blood} needed in ${request.address}`,
    description: `Urgent blood request for ${request.patientName}. ${request.blood} blood needed at ${request.hospitalName} in ${request.address}. Please donate and save a life.`,
    url: url,

    subjectOf: {
      "@type": "MedicalCondition",
      studyLocation: {
        "@type": "Hospital",
        name: request.hospitalName,
        address: {
          "@type": "PostalAddress",
          addressRegion: request.division,
          addressLocality: `${request.district}, ${request.upazila}`,
        },
      },
      healthCondition: {
        "@type": "MedicalCondition",
        name: request.patientProblem,
      },
    } as unknown, // ✅ Fix subjectOf error
    datePosted: request.createdAt as unknown, // ✅ Fix datePosted error
    dateNeeded: request.requiredDate as unknown, // ✅ Fix dateNeeded error
    location: {
      "@type": "Place",
      name: request.hospitalName,
      address: {
        "@type": "PostalAddress",
        addressLocality: request.address,
        addressRegion: request.division,
      },
    },
    provider: {
      "@type": "Person",
      name: request?.user?.name,
      telephone: request.contactNumber,
    },
  } as unknown as WithContext<MedicalEntity>; // ✅ Fix object type error
}


export function generateBlogPostSchema(post: any, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.content,
    image: post.image,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.user.name,
     
    },
    publisher: {
      "@type": "Organization",
      name: "Blood Donation Community",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
      },
    },
    url: url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
  };
}

export function generateFAQSchema(faqs: any[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateContactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Blood Donation Community",
    description:
      "Get in touch with us for any questions or concerns about blood donation",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/contact`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+8801881-220413",
      contactType: "customer service",
      email: "bloodneed@gmail.com",
      areaServed: "Worldwide",
      availableLanguage: ["English", "Bengali"],
    },
  };
}

export function generateAwarenessPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Blood Donation Awareness",
    description:
      "Learn about blood donation awareness, donor eligibility, and fraud prevention",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/awareness`,
    mainEntity: {
      "@type": "Article",
      headline: "Blood Donation Awareness",
      description:
        "Learn about blood donation awareness, donor eligibility, and fraud prevention",
      author: {
        "@type": "Organization",
        name: "Blood Donation Community",
      },
      publisher: {
        "@type": "Organization",
        name: "Blood Donation Community",
        logo: {
          "@type": "ImageObject",
          url: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
        },
      },
    },
  };
}

export function generatePrivacyPolicySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    description:
      "Blood Donation Community privacy policy and data protection information",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/privacy`,
    mainEntity: {
      "@type": "WebPageElement",
      headline: "Privacy Policy",
      text: "Our privacy policy explains how we collect, use, and protect your personal information.",
    },
  };
}
