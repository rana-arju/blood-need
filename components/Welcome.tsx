import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function Welcome() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="rounded-lg overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blood%20donation%202.PNG-qBwi5zOwe68h3MK3Vcq4Fd5PFGtfFm.png"
                alt="Medical team"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
          <div>
            <h3 className="text-primary text-sm font-semibold mb-2">HELP THE PEOPLE IN NEED</h3>
            <h2 className="text-3xl font-bold mb-6">Welcome to Blood Donors Organization</h2>
            <p className="text-gray-600 mb-8">
              We are dedicated to making blood donation accessible and efficient. Join our community of donors and help
              save lives.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {["Good Service", "Help People", "Regular Test", "Blood Bank", "24h Service", "Health Check"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Check className="text-primary" />
                    <span>{item}</span>
                  </div>
                ),
              )}
            </div>
            <Button className="bg-primary hover:bg-primary/90">Explore Now</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

