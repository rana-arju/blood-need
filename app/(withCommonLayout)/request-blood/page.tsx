import BloodRequestForm from "@/components/BloodRequestForm";

export default function BloodRequestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Blood Request
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          Your request can save a life. Please provide accurate information.
        </p>
        <BloodRequestForm />
      </div>
    </div>
  );
}
