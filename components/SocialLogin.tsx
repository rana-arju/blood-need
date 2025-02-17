import React from "react";
import { Button } from "./ui/button";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SocialLogin = () => {
  const router = useRouter();

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
    } catch (error) {
      toast.error("Something error. Try again!");
    }
  };
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button variant="outline" onClick={() => handleSocialSignIn("google")}>
        <FaGoogle className="mr-2 h-4 w-4" /> Google
      </Button>
      <Button variant="outline" onClick={() => handleSocialSignIn("facebook")}>
        <FaFacebook className="mr-2 h-4 w-4" /> Facebook
      </Button>
    </div>
  );
};

export default SocialLogin;
