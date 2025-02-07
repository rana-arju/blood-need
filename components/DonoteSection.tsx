import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function DonoteSection() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 md:px-8">
      <Card className="w-full max-w-md md:max-w-xl lg:max-w-3xl shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
            Donate Now and Make a Difference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            {/* Payment Methods Section */}
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-700">
                Payment Methods
              </h2>
              <div className="flex gap-4">
                {/* Bkash Logo */}
                <Image
                  src="/bkash.png"
                  alt="Bkash"
                  width={80}
                  height={80}
                  className="object-contain"
                />
                {/* Nagad Logo */}
                <Image
                  src="/nagad.png"
                  alt="Nagad"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
            </div>

            {/* QR Code Section */}
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-700">
                Scan to Pay
              </h2>
              <Image
                src="/qr-code.png"
                alt="QR Code"
                width={120}
                height={120}
                className="object-contain"
              />
            </div>
          </div>

          {/* Donation Input Section */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700">
              Enter Donation Amount
            </h2>
            <Input
              type="number"
              placeholder="Enter amount (in BDT)"
              className="w-full max-w-xs md:max-w-md"
            />
            <Button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg">
              Donate Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
