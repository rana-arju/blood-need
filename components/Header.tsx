"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

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
        <Link href="/request-blood" className="hover:text-primary">
          Blood Request
        </Link>
      </li>
      <li>
        <Link href="/be-donor" className="hover:text-primary">
          Be a donor
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
              Log Out
            </Button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link href="/auth/signin" className="hover:text-primary">
              Login In
            </Link>
          </li>
        </>
      )}
      <Link href="/notifications" className="text-gray-600 hover:text-primary">
        <Bell size={24} />
      </Link>
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0  backdrop-blur-md  z-50 transition-all duration-200 bg-white shadow-md ">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          Blood Need
        </Link>
        <div>
          {isMobile ? (
            <div className="flex items-center space-x-4">
              {!session ? (
                <>
                  <Link
                    href="/auth/signin"
                    className="text-sm font-medium text-gray-600 hover:text-primary"
                  >
                    Login In
                  </Link>
                </>
              ) : (
                <Button onClick={() => signOut()} variant="ghost" size="sm">
                  Log Out
                </Button>
              )}
              <Link
                href="/notifications"
                className="text-gray-600 hover:text-primary"
              >
                <Bell size={24} />
              </Link>
            </div>
          ) : (
            <nav>
              <ul className="flex space-x-4">
                <NavItems />
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
