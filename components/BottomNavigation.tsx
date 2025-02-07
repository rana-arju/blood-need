"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  Home,
  Droplet,
  UserPlus,
  LogIn,
  Menu,
  Heart,
  Info,
  User,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "./ui/dialog";

export default function BottomNavigation() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const NavItem = ({
    href,
    icon: Icon,
    label,
  }: {
    href: string;
    icon: any;
    label: string;
  }) => (
    <li>
      <Link
        href={href}
        className={`flex flex-col items-center ${
          isActive(href) ? "text-primary" : "text-gray-500"
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <Icon size={24} />
        <span className="text-xs">{label}</span>
      </Link>
    </li>
  );

  const SidebarItem = ({
    href,
    icon: Icon,
    label,
  }: {
    href: string;
    icon: any;
    label: string;
  }) => (
    <li>
      <Link
        href={href}
        className={`flex items-center space-x-2 ${
          isActive(href) ? "text-primary" : "text-gray-500"
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <Icon size={24} />
        <span>{label}</span>
      </Link>
    </li>
  );

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
        <ul className="flex justify-around items-center h-16">
          <NavItem href="/" icon={Home} label="Home" />
          <NavItem href="/be-donor" icon={Heart} label="Be Donor" />
          <NavItem href="/request-blood" icon={Droplet} label="Request" />
          {session ? (
            <NavItem href="/dashboard" icon={User} label="Dashboard" />
          ) : (
            <NavItem href="/auth/signin" icon={LogIn} label="Sign In" />
          )}
          <li>
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex flex-col items-center"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu size={24} />
                  <span className="text-xs">More</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col h-full">
                  <DialogTitle className="sr-only">Menu</DialogTitle>
                  <ul className="space-y-4">
                    <SidebarItem href="/about" icon={Info} label="About" />
                    {!session && (
                      <SidebarItem
                        href="/auth/signup"
                        icon={UserPlus}
                        label="Sign Up"
                      />
                    )}
                    {/* Add more menu items here */}
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>
          </li>
        </ul>
      </nav>
    </>
  );
}
