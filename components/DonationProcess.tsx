const steps = [
  {
    number: "01",
    title: "Registration",
    description: "Complete the registration process",
  },
  {
    number: "02",
    title: "Screening Test",
    description: "Quick health screening",
  },
  {
    number: "03",
    title: "Donation",
    description: "Safe blood donation process",
  },
  {
    number: "04",
    title: "Rest & Refresh",
    description: "Take a moment to recover",
  },
]

export default function DonationProcess() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h3 className="text-primary text-sm font-semibold mb-2">WHAT WE DO</h3>
          <h2 className="text-3xl font-bold">Donation Process</h2>
        </div>
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={step.number} className="bg-white p-6 rounded-lg shadow-lg relative z-10">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

