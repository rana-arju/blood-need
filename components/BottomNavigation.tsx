"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Droplet,
  Menu,
  Heart,
  Info,
  Droplets,
  HeartPulse,
  NotebookPen,
  FlaskConical,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "./ui/dialog";
import InstallPWA from "./InstallPWA";
import { useTranslations } from "next-intl";

export default function BottomNavigation() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string) => pathname.endsWith(path);

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
          isActive(href)
            ? "text-primary"
            :"dark:text-gray-400 dark:hover:text-gray-300 text-gray-500 hover:text-gray-700"
        } transition-colors duration-200`}
        onClick={() => setSidebarOpen(false)}
      >
        <Icon size={24} />
        <span className="text-xs mt-1">{label}</span>
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
        className={`flex items-center space-x-2 p-2 rounded-md ${
          isActive(href)
            ? "text-primary bg-primary/10"
            :"dark:text-gray-300 dark:hover:bg-gray-800 text-gray-700 hover:bg-gray-100"
        } transition-all duration-200`}
        onClick={() => setSidebarOpen(false)}
      >
        <Icon size={20} />
        <span>{label}</span>
      </Link>
    </li>
  );

  return (
    <>
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 dark:bg-gray-900 dark:border-t dark:border-gray-800 bg-white border-t border-gray-200
         shadow-lg z-50 transition-colors duration-300"
      >
        <ul className="flex justify-around items-center h-16">
          <NavItem href="/" icon={Home} label="Home" />
          <NavItem href="/donors" icon={Heart} label="Donors" />
          <NavItem href="/requests" icon={Droplets} label="Requests" />
          <NavItem
            href="/request-blood"
            icon={Droplet}
            label="Request"
          />

          <InstallPWA pos="bottom" />

          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center dark:text-gray-400 dark:hover:text-gray-300 text-gray-500 hover:text-gray-700 transition-colors duration-200`}
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={24} />
                <span className="text-xs mt-1">More</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className= "dark:bg-gray-900 dark:text-gray-100"
            >
              <nav className="flex flex-col h-full">
                <DialogTitle className="sr-only">Menu</DialogTitle>
                <div className="py-4">
                  <h3
                    className="dark:text-gray-300 text-gray-700
                     font-medium mb-2"
                  >
                    Menu
                  </h3>
                  <ul className="space-y-1">
                    <SidebarItem href="/about" icon={Info} label="About Us" />
                    <SidebarItem
                      href="/be-donor"
                      icon={HeartPulse}
                      label="Be Donor"
                    />
                    <SidebarItem
                      href="/virtual-test"
                      icon={FlaskConical}
                      label="Blood Test"
                    />
                    <SidebarItem
                      href="/blog"
                      icon={NotebookPen}
                      label="Blogs"
                    />
                  </ul>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </ul>
      </nav>
    </>
  );
}
