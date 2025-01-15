import { ArrowLeft, ArrowRight, Wallet2, Home, Ruler, BedDouble, Bath, MapPin, Wifi } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {Web3} from 'web3';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAccount, WagmiProvider } from 'wagmi';
import { Account } from './layout/account';
import { WalletOptions } from './layout/wallet-options';
import { config } from './config';


const images = [
  {
    url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80",
    alt: "Luxury beachfront living room"
  },
  {
    url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80",
    alt: "Modern bedroom with ocean view"
  },
  {
    url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80",
    alt: "Designer kitchen"
  },
  {
    url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80",
    alt: "Private balcony"
  }
];


const queryClient = new QueryClient();

function ConnectWallet() {
  const {isConnected} = useAccount();
  if(isConnected) return <Account />;
  return <WalletOptions />;

}

function App() {

  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  }

  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  }


  
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            clankbnb
          </h1>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <ConnectWallet />
              </QueryClientProvider>
          </WagmiProvider>
          {/* <Button variant="outline" className="flex items-center gap-2">
            <Wallet2 className="h-4 w-4" />
            Connect Wallet
          </Button> */}
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
            {/* <Card className="relative overflow-hidden aspect-video">
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
            </Card> */}

<Card className="relative overflow-hidden aspect-video group">
              <div className="relative w-full h-full">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute w-full h-full transition-opacity duration-500 ${
                      index === currentImage ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>


<div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  variant="secondary" 
                  size="icon" 
                  onClick={previousImage}
                  className="bg-white/80 hover:bg-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="secondary" 
                  size="icon" 
                  onClick={nextImage}
                  className="bg-white/80 hover:bg-white"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImage 
                        ? "bg-white w-4" 
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                  />
                ))}
              </div>
              </Card>

                          {/* Property Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 flex flex-col items-center text-center">
                <Home className="h-6 w-6 mb-2 text-pink-500" />
                <span className="text-sm font-medium text-gray-600">Property Type</span>
                <span className="font-semibold">Luxury Apartment</span>
              </Card>
              <Card className="p-4 flex flex-col items-center text-center">
                <Ruler className="h-6 w-6 mb-2 text-pink-500" />
                <span className="text-sm font-medium text-gray-600">Area</span>
                <span className="font-semibold">2,500 sq ft</span>
              </Card>
              <Card className="p-4 flex flex-col items-center text-center">
                <BedDouble className="h-6 w-6 mb-2 text-pink-500" />
                <span className="text-sm font-medium text-gray-600">Bedrooms</span>
                <span className="font-semibold">3 Beds</span>
              </Card>
              <Card className="p-4 flex flex-col items-center text-center">
                <Bath className="h-6 w-6 mb-2 text-pink-500" />
                <span className="text-sm font-medium text-gray-600">Bathrooms</span>
                <span className="font-semibold">2.5 Baths</span>
              </Card>
            </div>

            {/* Additional Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-5 w-5 text-pink-500" />
                <span>Prime Beach Location, Miami Beach, FL</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Wifi className="h-5 w-5 text-pink-500" />
                <span>High-Speed WiFi & Smart Home Features</span>
              </div>
            </div>



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