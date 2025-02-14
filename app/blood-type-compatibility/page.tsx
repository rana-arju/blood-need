import BloodTypeCompatibilityChart from "@/components/BloodTypeCompatibilityChart";

export default function BloodTypeCompatibilityPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Blood Type Compatibility Chart
      </h1>
      <BloodTypeCompatibilityChart />
    </div>
  );
}
