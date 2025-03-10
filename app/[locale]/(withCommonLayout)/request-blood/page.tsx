import BloodRequestForm from "@/components/BloodRequestForm";
import { useTranslations } from "next-intl";

export default function BloodRequestPage() {
  const t = useTranslations("Forms.bloodRequest");
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center text-gray-900 mb-8">
          {t("title")}
        </h2>
        <p className="text-lg sm:text-xl text-center text-gray-600 mb-12">
          {t("description")}
        </p>
        <BloodRequestForm />
      </div>
    </div>
  );
}
