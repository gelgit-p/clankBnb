import { ArrowLeft, ArrowRight, Wallet2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            clankbnb
          </h1>
          <Button variant="outline" className="flex items-center gap-2">
            <Wallet2 className="h-4 w-4" />
            Connect Wallet
          </Button>
        </header>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-gray-800">
              Experience luxury living at its finest
            </h2>
            <p className="text-lg text-gray-600">
              Book our premium beachfront apartment using your preferred cryptocurrency
            </p>

            {/* Image Carousel */}
            <Card className="relative overflow-hidden aspect-video">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80"
                alt="Luxury apartment interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <Button variant="secondary" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>

            <Button className="w-full" size="lg">
              BOOK NOW
            </Button>
          </div>

          {/* Right Column - Booking Form */}
          <Card className="p-6 space-y-6">
            <h3 className="text-xl font-semibold">Book your stay</h3>
            
            {/* Date Grid */}
            <div className="space-y-4">
              <label className="text-sm font-medium">Select nights:</label>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className="aspect-square"
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
            </div>

            {/* Payment Details */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount:</label>
                <Input type="number" placeholder="Enter amount" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Select coin:</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cryptocurrency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="btc">Bitcoin</SelectItem>
                    <SelectItem value="eth">Ethereum</SelectItem>
                    <SelectItem value="usdt">USDT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
              You'll receive an NFT with booking details. Thank you for your order.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;