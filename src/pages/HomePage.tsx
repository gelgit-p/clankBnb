import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Ruler, BedDouble, Bath, MapPin, ChevronLeft, ChevronRight, DollarSign, Home, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAccount } from 'wagmi';

const images = [
    {
      url: "https://res.cloudinary.com/gelgit/image/upload/v1737110870/house1.png",
      alt: "Luxury beachfront living room"
    },
    {
      url: "https://res.cloudinary.com/gelgit/image/upload/v1737110870/house3.png",
      alt: "Modern bedroom with ocean view"
    },
    // https://res.cloudinary.com/gelgit/image/upload/v1737110870/house3.png
// https://res.cloudinary.com/gelgit/image/upload/v1737110870/house2.png
    {
      url: "https://res.cloudinary.com/gelgit/image/upload/v1737110870/house2.png",
      alt: "Designer kitchen"
    },
    {
      url: "https://res.cloudinary.com/gelgit/image/upload/v1737110870/house1.png",
      alt: "Private balcony"
    }
  ];
  
  
//   const queryClient = new QueryClient();
  
  // function ConnectWallet() {
  //   const {isConnected} = useAccount();
  //   if(isConnected) return <Account />;
  //   return <WalletOptions />;
  
  // }
  
  
  function HomePage() {
    const {status} = useAccount(); 
    const PRICE_PER_NIGHT = 0.0452; // Price in USD
  
    const [currentImage, setCurrentImage] = useState(0);
    const [selectedDate, setSelectedDate] = useState<{
      checkIn: Date | null;
      checkOut: Date | null;
    }>({
      checkIn: null,
      checkOut: null
    });
  
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [amount, setAmount] = useState<string>('');
    // const [selectedCoin, setSelectedCoin] = useState<string>('');
  
      // Calculate total nights and amount
      const calculateTotalAmount = () => {
        if (!selectedDate.checkIn || !selectedDate.checkOut) return 0;
        
        const diffTime = Math.abs(selectedDate.checkOut.getTime() - selectedDate.checkIn.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Include both check-in and check-out days
        return diffDays * PRICE_PER_NIGHT;
      };
  
    const generateCalendarDays = () => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
  
      const firstDay = new Date(year, month, 1);
      const startingDay = firstDay.getDay();
  
      const lastDay = new Date(year, month + 1, 0);
      const totalDays = lastDay.getDate();
  
      const days = [];
  
      for (let i = 0; i <startingDay; i++) {
        days.push(null);
      }
  
      for (let i = 1; i <= totalDays; i++) {
        days.push(new Date(year, month, i));
      }
  
      const remainingDays = 42 - days.length;
      for(let i = 0; i < remainingDays; i++) {
        days.push(null);
      }
  
      return days;
    };
  
    const formatDate = (date: Date | null) => {
      if(!date) return '';
      return date.getDate().toString();
    }
  
    const isDateSelected = (date: Date | null) => {
      if (!date || !selectedDate.checkIn || !selectedDate.checkOut) return false;
      return date >= selectedDate.checkIn && date <= selectedDate.checkOut;
    };
  
    const isToday = (date: Date | null) => {
      if (!date) return false;
      const today = new Date();
      return date.toDateString() === today.toDateString();
    };
  
    const isPastDate = (date: Date | null) => {
      if (!date) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date < today;
    };
  
    const handleDateClick = (date: Date | null) => {
      if (!date || isPastDate(date)) return;
      
      if (!selectedDate.checkIn || (selectedDate.checkIn && selectedDate.checkOut)) {
        setSelectedDate({
          checkIn: date,
          checkOut: null,
        });
      } else {
        if (date < selectedDate.checkIn) {
          setSelectedDate({
            checkIn: date,
            checkOut: selectedDate.checkIn,
          });
        } else {
          setSelectedDate({
            ...selectedDate,
            checkOut: date,
          });
        }
      }
    };
  
    const navigateMonth = (direction: 'prev' | 'next') => {
      const newDate = new Date(currentDate);
      if (direction === 'prev') {
        newDate.setMonth(currentDate.getMonth() - 1);
      } else {
        newDate.setMonth(currentDate.getMonth() + 1);
      }
      setCurrentDate(newDate);
    };
  
    const getMonthYearString = () => {
      return currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    };
  
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
     // Update amount when dates are selected
     useEffect(() => {
      const totalAmount = calculateTotalAmount();
      if (totalAmount > 0) {
        setAmount(totalAmount.toString());
      }
    }, [selectedDate.checkIn, selectedDate.checkOut]);
  
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
            {/* <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
              clankbnb
            </h1> */}
            {/* <HelloWalletComponent */}
            {/* <Button variant="outline" className="flex items-center gap-2">
              <Wallet2 className="h-4 w-4" />
              Connect Wallet
            </Button> */}
          </header>
  
          {/* Main Content */}
          {status === 'connected' ? (
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Column */}
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-gray-800">
                Experience luxury living at its finest
              </h2>
              <p className="text-lg text-gray-600">
                Book our premium beachfront apartment using your preferred cryptocurrency
              </p>
  
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
                  <span className="font-semibold">1 Bed</span>
                </Card>
                <Card className="p-4 flex flex-col items-center text-center">
                  <Bath className="h-6 w-6 mb-2 text-pink-500" />
                  <span className="text-sm font-medium text-gray-600">Bathrooms</span>
                  <span className="font-semibold">1 Baths</span>
                </Card>
              </div>
  
              {/* Additional Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-5 w-5 text-pink-500" />
                  <span>Viña del Mar, Chile.</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="h-5 w-5 text-pink-500" />
                  <span>Fits 4 people</span>
                </div>
              </div>
            </div>
  
            {/* Right Column - Booking Form */}
            <Card className="p-6 space-y-6">
              <div className='flex justify-between items-center gap-2'>
  
              <h3 className="text-xl font-semibold">Book your stay</h3>
  
              <div className="flex items-center text-xl font-bold text-gray-900">
                <DollarSign className="w-5 h-5 text-pink-500" />
                CLANKBNB {PRICE_PER_NIGHT}
                <span className="text-sm font-normal text-gray-600 ml-1">/ night</span>
              </div>
                </div>
              
              
              {/* Date Grid */}
              <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <button 
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-100 rounded-full"
                  disabled={currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear()}
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div className="text-lg font-medium text-gray-900">
                  {getMonthYearString()}
                </div>
                <button 
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {weekDays.map(day => (
                  <div key={day} className="text-center text-sm font-medium text-gray-600 mb-2 py-2">
                    {day}
                  </div>
                ))}
                {generateCalendarDays().map((date, index) => (
                  <button
                    key={index}
                    onClick={() => handleDateClick(date)}
                    disabled={!date || isPastDate(date)}
                    className={`
                      relative p-2 rounded-lg text-sm transition-colors
                      ${!date ? 'invisible' : ''}
                      ${isPastDate(date) ? 'text-gray-300 cursor-not-allowed' : ''}
                      ${isDateSelected(date) ? 'bg-pink-500 text-white' : 'hover:bg-pink-50'}
                      ${isToday(date) ? 'font-bold' : ''}
                    `}
                  >
                    {formatDate(date)}
                    {isToday(date) && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-500 rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>
  
            {selectedDate.checkIn && selectedDate.checkOut && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                  {/* <span>Check-in:{selectedDate.checkIn.getDate()}</span>
                  <span>Check-out:{selectedDate.checkOut.getDate()}</span> */}
                  <span>Check-in: {selectedDate.checkIn.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  <span>Check-out: {selectedDate.checkOut.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
  
                  <span>Total nights:</span>
                  <span className="font-medium">{Math.ceil(Math.abs(selectedDate.checkOut.getTime() - selectedDate.checkIn.getTime()) / (1000 * 60 * 60 * 24)) + 1} nights</span>
                </div>
                <div className="flex justify-between items-center text-gray-900">
                  <span className="font-medium">Total amount:</span>
                  <span className="text-lg font-bold">$CAPITAL {calculateTotalAmount()}</span>
                </div>
              </div>
            )}
  
              {/* Payment Details */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Amount:</label>
                  <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
                  {/* <Input type="number" placeholder="Enter amount" /> */}
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
  
              <Button className="w-full" size="lg">
                BOOK NOW
              </Button>
            </Card>
          </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-screen">
  <h1 className="text-center text-2xl font-bold">CA: 0xc40513ED244434B67cA79b9a099d500F9b5b21bf</h1>
  <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text text-center">
    Welcome to clankbnb. Rent apartments with your clanker token.
  </h1>
</div>
            )};
        </div>
        
      </div>
    );
}

export default HomePage;