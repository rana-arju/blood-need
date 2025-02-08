import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Droplet } from "lucide-react";
import AnimatedBloodDrops from "@/components/AnimatedBloodDrops";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <AnimatedBloodDrops />
      <div className="max-w-md w-full space-y-8 text-center relative z-10">
        <div className="flex justify-center">
          <Droplet className="h-24 w-24 text-red-500 animate-pulse" />
        </div>
        <h1 className="mt-6 text-4xl font-extrabold text-gray-900 sm:text-5xl">
          404 - Page Not Found
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Oops! It seems we couldn't find the page you're looking for.
        </p>
        <p className="mt-2 text-md text-gray-500">
          But don't worry, your willingness to help can still make a difference!
        </p>
        <div className="mt-8 space-y-4">
          <Button asChild className="w-full">
            <Link href="/">Return Home</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/request-blood">Donate Blood</Link>
          </Button>
        </div>
        <p className="mt-6 text-sm text-gray-500">
          Remember, every drop counts. Your donation can save a life!
        </p>
      </div>
    </div>
  );
}
