import { PrivacyContent } from "@/components/PrivacyContent";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn how we collect, use, and protect your personal information
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <PrivacyContent />
        </div>
      </div>
    </div>
  );
}
