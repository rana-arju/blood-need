import { BloodRequestDetails } from "@/components/BloodRequestDetails";
import { getBloodRequestById } from "@/services/bloodRegister";
import type { Metadata } from "next";

interface PageProps {
  params: {
    id: string;
  };
}

// Fetch actual blood request details from backend API
async function getBloodRequestDetails(id: string) {
  const response: any = await getBloodRequestById(id)

  return response;
}

// Generate dynamic metadata based on fetched data
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const {id} = await params;

  
  const bloodRequest = await getBloodRequestDetails(id);

  return {
    title: `Blood Request: ${bloodRequest.blood} needed in ${bloodRequest.address}`,
    description: `Urgent blood request for ${bloodRequest.blood} in ${bloodRequest.address}. Please help if you can!`,
    openGraph: {
      title: `Blood Request: ${bloodRequest.blood} needed in ${bloodRequest.address}`,
      description: `Urgent blood request for ${bloodRequest.blood} in ${bloodRequest.address}. Please help if you can!`,
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

// Blood Request Page Component
export default async function BloodRequestPage({ params }: PageProps) {
  const {id} = await params
  return (
    <div className="container mx-auto px-4 py-8">
      <BloodRequestDetails id={id} />
    </div>
  );
}
