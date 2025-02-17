import { DonorProfile } from "@/components/DonorProfile";
import type { Metadata } from "next";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  // Fetch donor details (replace with your actual data fetching logic)
  const donor = await getDonorDetails(params.id);

  return {
    title: `Blood Donor: ${donor.name} (${donor.bloodType}) in ${donor.location}`,
    description: `${donor.name} is a blood donor with ${donor.bloodType} blood type in ${donor.location}. View their profile and contact them for donation.`,
    openGraph: {
      title: `Blood Donor: ${donor.name} (${donor.bloodType}) in ${donor.location}`,
      description: `${donor.name} is a blood donor with ${donor.bloodType} blood type in ${donor.location}. View their profile and contact them for donation.`,
      images: [
        {
          url: `${
            process.env.NEXT_PUBLIC_APP_URL
          }/api/og?title=${encodeURIComponent(
            donor.name
          )}&subtitle=${encodeURIComponent(
            `${donor.bloodType} in ${donor.location}`
          )}&type=donor`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default function DonorPage({ params }: PageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <DonorProfile id={params.id} />
    </div>
  );
}

// Mock function to fetch donor details (replace with your actual data fetching logic)
async function getDonorDetails(id: string) {
  return {
    id,
    name: "John Doe",
    bloodType: "O+",
    location: "City Center",
    lastDonation: "2023-05-15",
    donationCount: 5,
  };
}
