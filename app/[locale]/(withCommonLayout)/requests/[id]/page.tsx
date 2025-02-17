import { BloodRequestDetails } from "@/components/BloodRequestDetails";
import type { Metadata } from "next";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  // Fetch blood request details (replace with your actual data fetching logic)
  const bloodRequest = await getBloodRequestDetails(params.id);

  return {
    title: `Blood Request: ${bloodRequest.bloodType} needed in ${bloodRequest.location}`,
    description: `Urgent blood request for ${bloodRequest.bloodType} in ${bloodRequest.location}. Please help if you can!`,
    openGraph: {
      title: `Blood Request: ${bloodRequest.bloodType} needed in ${bloodRequest.location}`,
      description: `Urgent blood request for ${bloodRequest.bloodType} in ${bloodRequest.location}. Please help if you can!`,
      images: [
        {
          url: `${
            process.env.NEXT_PUBLIC_APP_URL
          }/api/og?title=${encodeURIComponent(
            bloodRequest.bloodType
          )}&subtitle=${encodeURIComponent(
            bloodRequest.location
          )}&type=request`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default function BloodRequestPage({ params }: PageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <BloodRequestDetails id={params.id} />
    </div>
  );
}

// Mock function to fetch blood request details (replace with your actual data fetching logic)
async function getBloodRequestDetails(id: string) {
  return {
    id,
    bloodType: "A+",
    location: "City Hospital, Downtown",
    urgency: "High",
    postedAt: new Date().toISOString(),
  };
}
