"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  const { data: session } = useSession();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const NavItems = () => (
    <>
      <li>
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
      </li>
      <li>
        <Link href="/about" className="hover:text-primary">
          About
        </Link>
      </li>
      {session ? (
        <>
          <li>
            <Link href="/dashboard" className="hover:text-primary">
              Dashboard
            </Link>
          </li>
          <li>
            <Button onClick={() => signOut()} variant="ghost">
              Sign Out
            </Button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link href="/auth/signin" className="hover:text-primary">
              Sign In
            </Link>
          </li>
          <li>
            <Link href="/auth/signup" className="hover:text-primary">
              Sign Up
            </Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          Blood Donation
        </Link>
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Navigate through our blood donation community
                </SheetDescription>
              </SheetHeader>
              <nav className="mt-6">
                <ul className="space-y-4">
                  <NavItems />
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <nav>
            <ul className="flex space-x-4">
              <NavItems />
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
