const steps = [
  {
    number: "01",
    title: "Become a Donor",
    description: "Register to become a blood donor and help save lives",
  },
  {
    number: "02",
    title: "Why Give Blood?",
    description: "Learn about the importance of blood donation",
  },
  {
    number: "03",
    title: "How Donations Help",
    description: "Discover how your donation makes a difference",
  },
]

export default function Steps() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps?.map((step) => (
            <div key={step.number} className="text-center">
              <div className="text-4xl font-bold text-primary mb-4">{step.number}</div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

