"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Bell, LayoutDashboard, LogOut } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

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
        <Link href="/donate-funds" className="hover:text-primary">
          Donate Funds
        </Link>
      </li>
      <li>
        <Link href="/about" className="hover:text-primary">
          About
        </Link>
      </li>
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 backdrop-blur-md z-50 transition-all duration-200 bg-background/80 border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          Blood Need
        </Link>
        <div className="flex items-center space-x-4">
          {!isMobile && (
            <nav>
              <ul className="flex space-x-4 items-center">
                <NavItems />
              </ul>
            </nav>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {!session ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:ring-0 focus:outline-none bg-red">
                  <Avatar className="w-7 h-7">
                    <AvatarImage className="dark:bg-white" src="/profile.png" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                  <DropdownMenuLabel className="text-gray-700 dark:text-gray-300">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="border-gray-200 dark:border-gray-700" />
                  <DropdownMenuItem>
                    <Link
                      href="/dashboard"
                      className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LayoutDashboard className="w-5 h-5 mr-3" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button
                      onClick={() => signOut()}
                      variant="ghost"
                      size="sm"
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      Log Out
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
          <Link
            href="/notifications"
            className="text-foreground hover:text-primary"
          >
            <Bell size={24} />
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
