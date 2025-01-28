import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bath, Bed, Heart, MapPin, Ruler, Share2, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Listing } from '@/types';


export const Route = createFileRoute('/listing/')({
  component: RouteComponent,
  // loader: async () => {
  //   const listing: Listing[] = await fetch('https://jsonplaceholder.typicode.com/posts').json();
  //   return listing;
  // }
})


// import { listings } from '@/data/listings'

function RouteComponent() {
  const navigate = useNavigate();
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{ [key: number]: number }>({})
  const [filters, setFilters] = useState({
    priceRange: '',
    propertyType: '',
    bedrooms: '',
    location: ''
  })

  const nextImage = (listingId: number) => {
    const listing = listings.find(l => l.id === listingId)
    if (!listing) return
    
    setCurrentImageIndexes(prev => ({
      ...prev,
      [listingId]: ((prev[listingId] || 0) + 1) % listing.images.length
    }))
  }

  const previousImage = (listingId: number) => {
    const listing = listings.find(l => l.id === listingId)
    if (!listing) return
    
    setCurrentImageIndexes(prev => ({
      ...prev,
      [listingId]: ((prev[listingId] || 0) - 1 + listing.images.length) % listing.images.length
    }))
  }

  const handleBookNow = (listing: typeof listings[0]) => {
    navigate('/', { state: { selectedListing: listing } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Available Properties
          </h1>
          <Link to="/create-listing">
            <Button>List Your Property</Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Price Range</label>
              <Select
                onValueChange={(value) =>
                  setFilters(prev => ({ ...prev, priceRange: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-100000">0 - 100,000 $CLANKBNB</SelectItem>
                  <SelectItem value="100000-200000">100,000 - 200,000 $CLANKBNB</SelectItem>
                  <SelectItem value="200000+">200,000+ $CLANKBNB</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Property Type</label>
              <Select
                onValueChange={(value) =>
                  setFilters(prev => ({ ...prev, propertyType: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="penthouse">Penthouse</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Bedrooms</label>
              <Select
                onValueChange={(value) =>
                  setFilters(prev => ({ ...prev, bedrooms: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Location</label>
              <Input
                type="text"
                placeholder="Search location..."
                onChange={(e) =>
                  setFilters(prev => ({ ...prev, location: e.target.value }))
                }
              />
            </div>
          </div>
        </Card>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden">
              {/* Image Carousel */}
              <div className="relative aspect-video">
                <img
                  src={listing.images[currentImageIndexes[listing.id] || 0].thumbnail}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="bg-white/80 hover:bg-white"
                    onClick={() => previousImage(listing.id)}
                  >
                    <span className="sr-only">Previous image</span>
                    ←
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="bg-white/80 hover:bg-white"
                    onClick={() => nextImage(listing.id)}
                  >
                    <span className="sr-only">Next image</span>
                    →
                  </Button>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="bg-white/80 hover:bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="bg-white/80 hover:bg-white"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{listing.title}</h3>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{listing.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">{listing.price}</div>
                    <div className="text-sm text-gray-600">$CLANKBNB</div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {listing.description}
                </p>

                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{listing.guest} Guests</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Bed className="h-4 w-4 mr-2" />
                    <span>{listing.bedroom} Beds</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Bath className="h-4 w-4 mr-2" />
                    <span>{listing.bathroom} Baths</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Ruler className="h-4 w-4 mr-2" />
                    <span>{listing.area}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {listing.features.map((feature) => (
                    <span
                      key={feature.id}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                    >
                      {feature.name}
                    </span>
                  ))}
                </div>

                <Button 
                  className="w-full"
                  onClick={() => handleBookNow(listing)}
                >
                  Book Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListingsPage;
