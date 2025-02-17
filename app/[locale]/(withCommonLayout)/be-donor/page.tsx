import DonorRegistrationForm from "@/components/DonorRegistrationForm";

export default function BeADonorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Be a Donor
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          Your donation can save lives. Register now to become a blood donor.
        </p>
        <DonorRegistrationForm />
      </div>
    </div>
  );
}
