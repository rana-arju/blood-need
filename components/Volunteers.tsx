import Image from "next/image"

const volunteers = [
  {
    name: "Maria Khazova",
    role: "Volunteer",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blood%20donation%203.PNG-GiAd5vRa5pae1TR8TKpjDJWaqKzoBy.png",
  },
  {
    name: "Alex Joshua Doe",
    role: "Doctor",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blood%20donation%203.PNG-GiAd5vRa5pae1TR8TKpjDJWaqKzoBy.png",
  },
  {
    name: "Joshua Khazova",
    role: "Specialist",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blood%20donation%203.PNG-GiAd5vRa5pae1TR8TKpjDJWaqKzoBy.png",
  },
]

export default function Volunteers() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <h3 className="text-sm text-primary text-center uppercase mb-4">OUR MEMBERS</h3>
        <h2 className="text-3xl font-bold text-center mb-12">Meet Volunteers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {volunteers.map((volunteer, index) => (
            <div key={index} className="text-center">
              <Image
                src={volunteer.image || "/placeholder.svg"}
                alt={volunteer.name}
                className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-bold text-xl mb-1">{volunteer.name}</h3>
              <p className="text-gray-600">{volunteer.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

