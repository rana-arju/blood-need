"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Droplet,
  Heart,
  UserCheck,
  Star,
  Menu,
  Calendar,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslations } from "next-intl";
/*
const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: Droplet, label: "Blood Requests", href: "/admin/blood-requests" },
  { icon: Heart, label: "Donors", href: "/admin/donors" },
  { icon: UserCheck, label: "Volunteers", href: "/admin/volunteers" },
  { icon: Star, label: "Reviews", href: "/admin/reviews" },
];
*/
 

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
   const t = useTranslations("Admin.sidebar");
 const sidebarItems = [
   { icon: LayoutDashboard, label: t("dashboard"), href: "/admin" },
   { icon: Users, label: t("users"), href: "/admin/users" },
   { icon: Droplet, label: t("bloodRequests"), href: "/admin/blood-requests" },
   { icon: Heart, label: t("donors"), href: "/admin/donors" },
   { icon: Calendar, label: t("bloodDrives"), href: "/admin/blood-drives" },
   { icon: UserCheck, label: t("volunteers"), href: "/admin/volunteers" },
   { icon: Star, label: t("reviews"), href: "/admin/reviews" },
   {
    label: "Blog Management",
    href: "/admin/blogs",
    icon: FileText,
  }
 ];
  const isActive = (path: string) => pathname.endsWith(path);
  return (
    <>
      <Button
        variant="outline"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-4 w-4" />
      </Button>
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64  bg-white shadow-lg transform transition-transform duration-200 ease-in-out md:translate-x-0 mt-16",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <nav className="flex-1 overflow-y-auto">
            <ul className="p-4 space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center p-2 rounded-lg transition-colors",
                      isActive(item.href)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
