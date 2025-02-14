import AppointmentScheduler from "@/components/AppointmentScheduler";

export default function ScheduleAppointmentPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Schedule a Blood Donation Appointment
      </h1>
      <AppointmentScheduler />
    </div>
  );
}
