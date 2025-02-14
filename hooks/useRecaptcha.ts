"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export function useRecaptcha() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const executeRecaptcha = async () => {
    return new Promise<string>((resolve) => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {
              action: "submit",
            })
            .then((token: string) => {
              resolve(token);
            });
        });
      } else {
        console.error("reCAPTCHA not loaded");
        resolve("");
      }
    });
  };

  return { executeRecaptcha };
}
