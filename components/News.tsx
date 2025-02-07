import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const news = [
  {
    title: "Donation is hope for poor helpless children",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blood%20donation%203.PNG-GiAd5vRa5pae1TR8TKpjDJWaqKzoBy.png",
    category: "Blood Tips",
  },
  {
    title: "Don't Do This After You Donating Your Blood",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blood%20donation%203.PNG-GiAd5vRa5pae1TR8TKpjDJWaqKzoBy.png",
    category: "Donation",
  },
  {
    title: "Don't Do This After You Donating Your Blood",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blood%20donation%203.PNG-GiAd5vRa5pae1TR8TKpjDJWaqKzoBy.png",
    category: "Blood Bank",
  },
]

export default function News() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h3 className="text-primary text-sm font-semibold mb-2">OUR NEWS</h3>
          <h2 className="text-3xl font-bold">Checkout News & Updates</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <Card key={index}>
              <CardHeader className="p-0">
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-48 object-cover" />
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-primary text-sm mb-2">{item.category}</div>
                <CardTitle className="mb-4">{item.title}</CardTitle>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Read More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

