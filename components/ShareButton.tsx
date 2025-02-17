"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Share2,
  Facebook,
  Twitter,
  PhoneIcon as WhatsApp,
  Copy,
  Check,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface ShareButtonProps {
  url: string;
  title: string;
}

export function ShareButton({ url, title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}${url}`;
  const encodedShareUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleShare = async (platform: string) => {
    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedShareUrl}`,
          "_blank"
        );
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodedTitle} ${encodedShareUrl}`,
          "_blank"
        );
        break;
      case "copy":
        try {
          await navigator.clipboard.writeText(shareUrl);
          setCopied(true);
          toast.success("You can now paste the link anywhere");
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error("Failed to copy text: ", err);
          toast.error("Failed to copy link");
        }
        break;
      default:
        if (navigator.share) {
          try {
            await navigator.share({
              title: title,
              text: "Check out this blood donation request",
              url: shareUrl,
            });
          } catch (err) {
            console.error("Error sharing:", err);
          }
        }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-9 h-9 p-0">
          <Share2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem
          onClick={() => handleShare("facebook")}
          className="cursor-pointer"
        >
          <Facebook className="mr-2 h-4 w-4" />
          <span>Share on Facebook</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleShare("twitter")}
          className="cursor-pointer"
        >
          <Twitter className="mr-2 h-4 w-4" />
          <span>Share on Twitter</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleShare("whatsapp")}
          className="cursor-pointer"
        >
          <WhatsApp className="mr-2 h-4 w-4" />
          <span>Share on WhatsApp</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleShare("copy")}
          className="cursor-pointer"
        >
          {copied ? (
            <Check className="mr-2 h-4 w-4" />
          ) : (
            <Copy className="mr-2 h-4 w-4" />
          )}
          <span>{copied ? "Copied!" : "Copy Link"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
