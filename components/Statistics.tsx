const stats = [
  { number: "8", label: "YEARS OF EXPERIENCE" },
  { number: "11", label: "BLOOD DONATIONS" },
  { number: "2", label: "TOTAL AWARDS" },
  { number: "0", label: "BLOOD COOPERATIONS" },
]

export default function Statistics() {
  return (
    <section className="bg-primary py-16 text-white">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-5xl font-bold mb-2">{stat.number}</div>
              <div className="text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

