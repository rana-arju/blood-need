import DonorRegistrationForm from "@/components/DonorRegistrationForm";
import { useTranslations } from "next-intl";

export default function BeADonorPage() {
   const t = useTranslations("Forms.donor");
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-8">
          {t("title")}
        </h1>
        <p className="text-lg sm:text-xl text-center text-gray-600 mb-12">
          {t("description")}
        </p>
        <DonorRegistrationForm />
      </div>
    </div>
  );
}
