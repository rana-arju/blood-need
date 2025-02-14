import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Droplet,
  Users,
  Trophy,
  Bell,
  MessageCircle,
  Bot,
  Calendar,
  Activity,
  Map,
  Award,
  DollarSign,
} from "lucide-react";

const features = [
  {
    title: "Virtual Blood Type Test",
    description:
      "Take a quick quiz to estimate your blood type before donating.",
    icon: Droplet,
    link: "/virtual-blood-type-test",
  },
  {
    title: "Donor-Recipient Matching",
    description:
      "Our AI-powered system matches donors with recipients in need.",
    icon: Users,
    link: "/donor-recipient-matching",
  },
  {
    title: "Gamification & Leaderboard",
    description: "Earn points, climb the ranks, and compete with other donors.",
    icon: Trophy,
    link: "/leaderboard",
  },
  {
    title: "Emergency Alerts",
    description:
      "Receive real-time notifications for urgent blood needs in your area.",
    icon: Bell,
    link: "/emergency-alerts",
  },
  {
    title: "Community Forum",
    description:
      "Connect with other donors and recipients, share experiences, and get support.",
    icon: MessageCircle,
    link: "/community-forum",
  },
  {
    title: "AI Chatbot Assistant",
    description: "Get instant answers to your questions about blood donation.",
    icon: Bot,
    link: "/chatbot",
  },
  {
    title: "Blood Drive Organizer",
    description: "Plan and manage your own blood drive events.",
    icon: Calendar,
    link: "/organize-blood-drive",
  },
  {
    title: "Health Dashboard",
    description: "Track your health metrics and donation history.",
    icon: Activity,
    link: "/health-dashboard",
  },
  {
    title: "Appointment Scheduler",
    description: "Easily schedule your next blood donation appointment.",
    icon: Calendar,
    link: "/schedule-appointment",
  },
  {
    title: "Blood Type Compatibility",
    description: "Interactive chart to check blood type compatibility.",
    icon: Droplet,
    link: "/blood-type-compatibility",
  },
  {
    title: "Donation Achievements",
    description: "Earn badges and track your donation milestones.",
    icon: Award,
    link: "/achievements",
  },
  {
    title: "Community Blood Drive Map",
    description: "Find blood drives near you with our interactive map.",
    icon: Map,
    link: "/",
  },
  {
    title: "Fund Donation",
    description:
      "Contribute financially to support our blood donation initiatives.",
    icon: DollarSign,
    link: "/donate-funds",
  },
];

export default function FeatureHighlights() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Explore Our Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features?.map((feature, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <feature.icon className="h-6 w-6 text-primary" />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{feature.description}</p>
                <Button asChild>
                  <Link href={feature.link}>Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
