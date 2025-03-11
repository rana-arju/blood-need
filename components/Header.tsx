"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Bell, Droplet, LayoutDashboard, LogOut } from "lucide-react";
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
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import InstallPWA from "./InstallPWA";
import { useNotificationSubscription } from "@/utils/pushNotifications";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname.endsWith(path);

  const { data: session } = useSession();
  const [isMobile, setIsMobile] = useState(false);
  const t = useTranslations("common");
  const { isSubscribed, subscribe } = useNotificationSubscription();
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  useEffect(() => {
    if (session?.user?.id && !isSubscribed) {
      subscribe();
    }
  }, [session, isSubscribed, subscribe]);
  const handleSignOut = async () => {
    const data = await signOut({
      redirect: false,
      callbackUrl: "/auth/signin",
    });
    router.push(data.url);
  };
  const NavItems = () => (
    <>
      <li>
        <Link
          href="/"
          className={`hover:text-primary ${
            (pathname === "/en" || pathname === "/bn") && "text-primary"
          }`}
        >
          {t("home")}
        </Link>
      </li>
      <li>
        <Link
          href="/requests"
          className={`hover:text-primary ${
            isActive("/requests") && "text-primary"
          }`}
        >
          {t("allRequests")}
        </Link>
      </li>
      <li>
        <Link
          href="/donors"
          className={`hover:text-primary ${
            isActive("/donors") && "text-primary"
          }`}
        >
          {t("allDonors")}
        </Link>
      </li>
      {session && session?.user && (
        <>
          <li>
            <Link
              href="/request-blood"
              className={`hover:text-primary ${
                isActive("/request-blood") && "text-primary"
              }`}
            >
              {t("bloodRequest")}
            </Link>
          </li>
          <li>
            <Link
              href="/be-donor"
              className={`hover:text-primary ${
                isActive("/be-donor") && "text-primary"
              }`}
            >
              {t("beADonor")}
            </Link>
          </li>
        </>
      )}
      <li>
        <Link
          href="/blog"
          className={`hover:text-primary ${
            isActive("/blog") && "text-primary"
          }`}
        >
          {t("blog")}
        </Link>
      </li>{" "}
      <li>
        <Link
          href="/virtual-test"
          className={`hover:text-primary ${
            isActive("/blog") && "text-primary"
          }`}
        >
          {t("bloodTest")}
        </Link>
      </li>
      <li>
        <Link
          href="/about"
          className={`hover:text-primary ${
            isActive("/about") && "text-primary"
          }`}
        >
          {t("about")}
        </Link>
      </li>
      <li>
        <InstallPWA pos="header" />
      </li>
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 backdrop-blur-md z-50 transition-all duration-200 bg-background/80 border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center overflow-hidden whitespace-nowrap">
        <Link href="/">
          <div className="flex justify-start items-center">
            <Droplet className="h-6 w-6 text-blood-600 mr-2 text-primary" />
            <span className="font-bold flex items-center gap-1 text-lg md:text-2xl">
              <span className="text-primary "> Blood</span>
              <span className="text-gray-800 dark:text-white">Need</span>
            </span>
          </div>
        </Link>
        <div className="flex items-center space-x-4">
          <nav className="invisible sm:visible">
            {!isMobile && (
              <ul className="flex space-x-4 items-center">
                <NavItems />
              </ul>
            )}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:ring-0 focus:outline-none bg-red">
                  <Avatar className="w-7 h-7">
                    <AvatarImage
                      className="dark:bg-white object-cover"
                      src={session?.user?.image || "/profile.png"}
                    />
                    <AvatarFallback>
                      {(session?.user?.name?.[0] as string) ?? "?"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                  <DropdownMenuLabel className="text-gray-700 dark:text-gray-300">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="border-gray-200 dark:border-gray-700" />
                  <DropdownMenuItem>
                    <Link
                      href={
                        session?.user?.role == "admin"
                          ? "/admin"
                          : session?.user?.role == "user"
                          ? "/dashboard"
                          : "/"
                      }
                      className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LayoutDashboard className="w-5 h-5 mr-3" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button
                      onClick={handleSignOut}
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
            <ul>
              <li>
                <Link href="/auth/signin" className="hover:text-primary">
                  Sign In
                </Link>
              </li>
            </ul>
          )}
          {session && (
            <Link
              href="/notifications"
              className="text-foreground hover:text-primary"
            >
              <Bell size={22} />
            </Link>
          )}

          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
