import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { BloodDrivesList } from "@/components/admin/BloodDrivesList";
import { Skeleton } from "@/components/ui/skeleton";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Admin.bloodDrives" });

  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
  };
}

export default async function BloodDrivesPage() {
  const t = await getTranslations("Admin.bloodDrives");

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>
      </div>

      <Suspense fallback={<BloodDrivesListSkeleton />}>
        <BloodDrivesList />
      </Suspense>
    </div>
  );
}

function BloodDrivesListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-24" />
      </div>
      <div className="border rounded-md">
        <div className="p-4 border-b">
          <div className="grid grid-cols-6 gap-4">
            <Skeleton className="h-5 col-span-2" />
            <Skeleton className="h-5 col-span-1" />
            <Skeleton className="h-5 col-span-1" />
            <Skeleton className="h-5 col-span-1" />
            <Skeleton className="h-5 col-span-1" />
          </div>
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-4 border-b">
            <div className="grid grid-cols-6 gap-4">
              <Skeleton className="h-5 col-span-2" />
              <Skeleton className="h-5 col-span-1" />
              <Skeleton className="h-5 col-span-1" />
              <Skeleton className="h-5 col-span-1" />
              <Skeleton className="h-5 col-span-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
