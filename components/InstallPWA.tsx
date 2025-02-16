"use client";

import { Download } from "lucide-react";
import { useState, useEffect } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export default function InstallPWA({ pos }: { pos: string }) {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event: Event) => {
      const beforeInstallPromptEvent = event as BeforeInstallPromptEvent;
      beforeInstallPromptEvent.preventDefault(); // Prevent automatic prompt
      setDeferredPrompt(beforeInstallPromptEvent);
      setShowButton(true);
    });
  }, []);

  const installPWA = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === "accepted") {
          console.log("PWA Installed");
        } else {
          console.log("PWA Installation Dismissed");
        }
        setDeferredPrompt(null);
        setShowButton(false);
      });
    }
  };

  return showButton && pos === "bottom" ? (
    <button
      onClick={installPWA}
      className="flex flex-col justify-center items-center text-gray-500 cursor-pointer space-x-2"
    >
      <Download size={20} />
      <span className="text-xs">Install</span>
    </button>
  ) : (
    showButton && pos === "header" && (
      <button
        onClick={installPWA}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white shadow-lg hover:bg-red-700 transition duration-300 cursor-pointer"
      >
        Install
        <Download size={20} className="text-white" />
      </button>
    )
  );
}
