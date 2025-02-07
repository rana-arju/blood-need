import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const campaigns = [
  {
    title: "Blood Group Collection",
    description: "Regular blood donation process",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blood%20donation%203.PNG-GiAd5vRa5pae1TR8TKpjDJWaqKzoBy.png",
    date: "February 2024",
  },
  {
    title: "Free Group Checking",
    description: "Check your blood group",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blood%20donation%203.PNG-GiAd5vRa5pae1TR8TKpjDJWaqKzoBy.png",
    date: "February 2024",
  },
  {
    title: "Blood Donation Camp",
    description: "Join our donation camp",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blood%20donation%203.PNG-GiAd5vRa5pae1TR8TKpjDJWaqKzoBy.png",
    date: "February 2024",
  },
]

export default function PopularCampaigns() {
  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Campaigns</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {campaigns.map((campaign, index) => (
            <Card key={index}>
              <CardHeader className="p-0">
                <img
                  src={campaign.image || "/placeholder.svg"}
                  alt={campaign.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="mb-2">{campaign.title}</CardTitle>
                <CardDescription>{campaign.description}</CardDescription>
                <p className="text-sm text-primary mt-4">{campaign.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

