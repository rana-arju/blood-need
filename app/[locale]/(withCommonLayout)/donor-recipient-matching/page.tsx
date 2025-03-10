import DonorRecipientMatching from "@/components/DonorRecipientMatching";

export default function DonorRecipientMatchingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
        Donor-Recipient Matching
      </h2>
      <DonorRecipientMatching />
    </div>
  );
}
