import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">About Us</h3>
            <p className="mb-4">
              We are dedicated to making blood donation accessible and saving lives through our community of donors.
            </p>
            <p>
              <strong>Phone:</strong> +8801881-220413
            </p>
          </div>
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/campaigns" className="hover:text-primary">
                  Campaigns
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blood-bank" className="hover:text-primary">
                  Blood Bank
                </Link>
              </li>
              <li>
                <Link href="/blood-test" className="hover:text-primary">
                  Blood Test
                </Link>
              </li>
              <li>
                <Link href="/donation" className="hover:text-primary">
                  Blood Donation
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-primary">
                  Research
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Subscribe</h3>
            <p className="mb-4">Subscribe to our newsletter for updates and news.</p>
            <div className="flex gap-2">
              <Input placeholder="Your email" className="bg-gray-800 border-gray-700" />
              <Button className="bg-primary hover:bg-primary/90">Subscribe</Button>
            </div>
            <div className="flex gap-4 mt-6">
              <Facebook className="hover:text-primary cursor-pointer" />
              <Twitter className="hover:text-primary cursor-pointer" />
              <Instagram className="hover:text-primary cursor-pointer" />
              <Youtube className="hover:text-primary cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container py-6 text-center">©  {new Date().getFullYear()} Rana Arju. All rights reserved.</div>
      </div>
    </footer>
  )
}

