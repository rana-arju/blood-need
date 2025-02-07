"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Home, Info, LogIn, UserPlus, User, Droplet } from "lucide-react";
import { usePathname } from "next/navigation";

export default function BottomNavigation() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <ul className="flex justify-around items-center h-16">
        <li>
          <Link
            href="/"
            className={`flex flex-col items-center ${
              isActive("/") ? "text-primary" : "text-gray-500"
            }`}
          >
            <Home size={24} />
            <span className="text-xs">Home</span>
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={`flex flex-col items-center ${
              isActive("/about") ? "text-primary" : "text-gray-500"
            }`}
          >
            <Info size={24} />
            <span className="text-xs">About</span>
          </Link>
        </li>
        {session ? (
          <>
            <li>
              <Link
                href="/dashboard"
                className={`flex flex-col items-center ${
                  isActive("/dashboard") ? "text-primary" : "text-gray-500"
                }`}
              >
                <User size={24} />
                <span className="text-xs">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/blood-request"
                className={`flex flex-col items-center ${
                  isActive("/blood-request") ? "text-primary" : "text-gray-500"
                }`}
              >
                <Droplet size={24} />
                <span className="text-xs">Request</span>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                href="/auth/signin"
                className={`flex flex-col items-center ${
                  isActive("/auth/signin") ? "text-primary" : "text-gray-500"
                }`}
              >
                <LogIn size={24} />
                <span className="text-xs">Sign In</span>
              </Link>
            </li>
            <li>
              <Link
                href="/auth/signup"
                className={`flex flex-col items-center ${
                  isActive("/auth/signup") ? "text-primary" : "text-gray-500"
                }`}
              >
                <UserPlus size={24} />
                <span className="text-xs">Sign Up</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
