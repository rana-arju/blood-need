import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimatedBloodDrops from "@/components/AnimatedBloodDrops";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden py-5">
      <div className="max-w-md w-full space-y-8 text-center relative z-10 ">
        
          <AnimatedBloodDrops />
     
        <h2 className=" font-bold text-gray-900 text-xl sm:text-2xl md:text-3xl lg:text-5xl">
          404 - Page Not Found
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          Oops! It seems we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <p className="mt-2 text-md text-gray-500">
          But don&apos;t worry, your willingness to help can still make a
          difference!
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
