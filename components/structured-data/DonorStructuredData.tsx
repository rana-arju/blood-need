import type { Person, WithContext } from "schema-dts";

interface DonorStructuredDataProps {
  donor: any;
  url: string;
}

export default function DonorStructuredData({
  donor,
  url,
}: DonorStructuredDataProps) {
  const user = donor.user;

  const personSchema: WithContext<Person> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: user.name,
    gender: user.gender,
    telephone: donor.phone,
    email: user.email,
    url,
    address: {
      "@type": "PostalAddress",
      addressLocality: user.district,
      addressRegion: user.division,
    },
    description: `Blood donor with ${user.blood} blood type`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}
