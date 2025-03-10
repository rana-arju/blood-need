import EmergencyAlerts from "@/components/EmergencyAlerts";

export default function EmergencyAlertsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xlfont-bold mb-8">
        Emergency Alerts
      </h2>
      <EmergencyAlerts />
    </div>
  );
}
