import type { ItemList, WithContext } from "schema-dts";

interface DonorListingStructuredDataProps {
  donors: any[];
  baseUrl: string;
}

export default function DonorListingStructuredData({
  donors,
  baseUrl,
}: DonorListingStructuredDataProps) {
  const itemListSchema: WithContext<ItemList> = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: donors.map((donor, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Person",
        name: donor.user.name,
        url: `${baseUrl}/donors/${donor.id}`,
        description: `Blood donor with ${donor.user.blood} blood type`,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
    />
  );
}
