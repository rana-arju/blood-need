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
        <Icon size={20} />
        <span>{label}</span>
      </Link>
    </li>
  );

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
        <ul className="flex justify-around items-center h-16">
          <NavItem href="/" icon={Home} label="Home" />
          <NavItem href="/donors" icon={Heart} label="Donors" />
          <NavItem href="/requests" icon={Droplets} label="Requests" />
          <NavItem href="/request-blood" icon={Droplet} label="Request" />

          <InstallPWA pos="bottom" />
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
                    <SidebarItem href="/about" icon={Info} label={t("about")} />
                    <SidebarItem
                      href="/be-donor"
                      icon={HeartPulse}
                      label={t("beADonor")}
                    />{" "}
                    <SidebarItem
                      href="/virtual-test"
                      icon={FlaskConical}
                      label={t("bloodTest")}
                    />{" "}
                    <SidebarItem
                      href="/blog"
                      icon={NotebookPen}
                      label={t("blog")}
                    />
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
