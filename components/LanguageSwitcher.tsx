"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
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

  const switchLanguage = (newLocale: string) => {
     if (locale !== newLocale) {
       router.replace(`/${newLocale}`);
       router.refresh()
       
     }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus:ring-0 focus:outline-non">
        <Button variant="ghost" size="icon">
          {locale == "bn" ? "বাং" : locale == "en" ? "En" : ""}
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => switchLanguage("bn")}
          className={
            locale === "bn"
              ? "bg-primary text-white cursor-pointer"
              : "cursor-pointer"
          }
        >
          বাংলা
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => switchLanguage("en")}
          className={
            locale === "en"
              ? "bg-primary text-white cursor-pointer"
              : "cursor-pointer"
          }
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
