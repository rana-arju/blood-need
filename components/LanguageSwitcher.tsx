"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [_, setRender] = useState(false); // State to trigger re-render

  const switchLanguage = (newLocale: string) => {
    if (locale === newLocale) return; // Prevent switching to the same language

    // Remove the current locale from the pathname
    const segments = pathname.split("/").filter(Boolean);

    if (segments[0] === locale) {
      segments.shift(); // Remove existing locale
    }

    // Construct new path with the new locale
    const newPath = `/${newLocale}/${segments.join("/")}`;

    // Preserve query parameters
    const params = new URLSearchParams(searchParams.toString());

    // Update the URL
    router.replace(`${newPath}?${params.toString()}`);

    // Force re-render to update language instantly
    setRender((prev) => !prev);

    // Ensure next-intl updates the language immediately
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus:ring-0 focus:outline-none">
        <Button variant="ghost" size="icon" className="w-7 h-7">
          {locale === "bn" ? "বাং" : locale === "en" ? "En" : ""}
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => switchLanguage("bn")}
          disabled={locale === "bn"} // Disable if already selected
          className={`cursor-pointer ${
            locale === "bn" ? "bg-primary text-white" : ""
          }`}
        >
          বাংলা
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => switchLanguage("en")}
          disabled={locale === "en"} // Disable if already selected
          className={`cursor-pointer ${
            locale === "en" ? "bg-primary text-white" : ""
          }`}
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
