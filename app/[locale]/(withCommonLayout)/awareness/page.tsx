import { AwarenessContent } from "@/components/awareness/AwarenessContent";
import { AwarenessCta } from "@/components/awareness/AwarenessCta";
import { AwarenessHero } from "@/components/awareness/AwarenessHero";


export default function AwarenessPage() {
  return (
    <div className="min-h-screen bg-background">
      <AwarenessHero />
      <AwarenessContent />
      <AwarenessCta />
    </div>
  );
}
