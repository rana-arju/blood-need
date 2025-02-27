import React from "react";
import { Button } from "./ui/button";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import Image from "next/image";

const SocialLogin = () => {

  const handleSocialSignIn = async (provider: string) => {
    try {
      if (provider === "google") {
        await signIn("google", {
          callbackUrl: "/",
          redirect: false,
        });
      }
      if (provider === "facebook") {
        await signIn("facebook", {
          callbackUrl: "/",
          redirect: false,
        });
      }
    } catch  {
      toast.error("Something error. Try again!");
    }
  };
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button variant="outline" onClick={() => handleSocialSignIn("google")}>
        {
          //<FaGoogle className="mr-2 h-4 w-4" />
        }
        <Image
          src="https://res.cloudinary.com/db8l1ulfq/image/upload/v1740683517/google_oweld1.png"
          alt="google"
          width={22}
          height={22}
        />
        Google
      </Button>
      <Button variant="outline" onClick={() => handleSocialSignIn("facebook")}>
        <Image
          src="https://res.cloudinary.com/db8l1ulfq/image/upload/v1740683517/facebook_jd4xb2.png"
          alt="facebook"
          width={22}
          height={22}
        />
        Facebook
      </Button>
    </div>
  );
};

export default SocialLogin;
