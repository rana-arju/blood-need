"use client";

import type React from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Youtube, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

export default function Footer() {
  const t = useTranslations("Footer");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success(t("subscribeSuccess"));
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <footer
      className="dark:bg-gray-900 dark:text-gray-300 bg-gray-100 text-gray-700
       mb-16 md:mb-0 transition-colors duration-300"
    >
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div>
            <h3 className="dark:text-white text-gray-900 text-xl font-bold mb-4">
              {t("aboutUs")}
            </h3>
            <p className="mb-4">{t("aboutUsText")}</p>
            <p>
              <strong>{t("phone")}:</strong> +8801881-220413
            </p>
          </div>

          <div>
            <h3
              className="dark:text-white text-gray-900
               text-xl font-bold mb-4"
            >
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors duration-200"
                >
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/be-donor"
                  className="hover:text-primary transition-colors duration-200"
                >
                  {t("beDonor")}
                </Link>
              </li>
              <li>
                <Link
                  href="/requests"
                  className="hover:text-primary transition-colors duration-200"
                >
                  {t("allRequests")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors duration-200"
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3
              className="dark:text-white text-gray-900
               text-xl font-bold mb-4"
            >
              {t("important")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/faq"
                  className="hover:text-primary transition-colors duration-200"
                >
                  {t("faq")}
                </Link>
              </li>
              <li>
                <Link
                  href="/awareness"
                  className="hover:text-primary transition-colors duration-200"
                >
                  {t("awareness")}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-primary transition-colors duration-200"
                >
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="https://rana-arju.vercel.app"
                  target="_blank"
                  className="hover:text-primary transition-colors duration-200"
                >
                  {t("aboutMe")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3
              className="dark:text-white text-gray-900
               text-xl font-bold mb-4"
            >
              {t("subscribe")}
            </h3>
            <p className="mb-4">{t("subscribeText")}</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="dark:bg-gray-800 dark:border-gray-700 bg-white border-gray-300"
                />
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="animate-spin mr-2">⟳</span>
                  ) : (
                    <Send size={16} className="mr-2" />
                  )}
                  {t("subscribeButton")}
                </Button>
              </div>
            </form>

            <div className="flex gap-4 mt-6">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-primary transition-colors duration-200"
              >
                <Facebook />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-primary transition-colors duration-200"
              >
                <Twitter />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-primary transition-colors duration-200"
              >
                <Instagram />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="hover:text-primary transition-colors duration-200"
              >
                <Youtube />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={`border-t dark:border-gray-800 border-gray-200`}>
        <div className="container py-6 text-center">
          © {new Date().getFullYear()}{" "}
          <Link
            href="https://rana-arju.vercel.app"
            target="_blank"
            className="hover:text-primary transition-colors duration-200"
          >
            Rana Arju
          </Link>
          . {t("allRightsReserved")}
        </div>
      </div>
    </footer>
  );
}
