import FundDonation from "@/components/FundDonation";

export default function DonateFundsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Donate Funds</h1>
      <p className="mb-8 text-lg">
        Your financial contribution helps us maintain our blood donation
        programs and save more lives. Every donation, big or small, makes a
        difference.
      </p>
      <FundDonation />
    </div>
  );
}
