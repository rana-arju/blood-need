import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative min-h-[600px] flex items-center">
      <div className="absolute inset-0">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blood%20donation%202.PNG-qBwi5zOwe68h3MK3Vcq4Fd5PFGtfFm.png"
          alt="Blood donation background"
          className="w-full h-full object-cover brightness-50"
        />
      </div>
      <div className="container relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl font-bold mb-6">Your Blood Can Bring Smile</h1>
          <p className="text-xl mb-8">Join our mission to save lives through blood donation</p>
          <div className="flex gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/register">Register Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/20">
              <Link href="/donate">Donate Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

