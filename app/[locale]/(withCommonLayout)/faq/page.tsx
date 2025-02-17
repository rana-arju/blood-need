import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { FaqSearch } from "@/components/faq/FaqSearch";


export default function FaqPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about blood donation
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <FaqSearch />
          <FaqAccordion />
        </div>
      </div>
    </div>
  );
}
