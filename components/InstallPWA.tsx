"use client";

import { Download } from "lucide-react";
import { useState, useEffect } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export default function InstallPWA() {
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

  return showButton ? <button onClick={installPWA}>Install</button> : null;
}
