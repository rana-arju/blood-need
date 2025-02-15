import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import BloodRequestForm from "@/components/BloodRequestForm";

export default async function BloodRequestPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  //return <BloodRequestForm user={session.user} />;
}
