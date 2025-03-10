import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";


export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Contact Us
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get in touch with us for any questions or concerns about blood
            donation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </div>
  );
}
