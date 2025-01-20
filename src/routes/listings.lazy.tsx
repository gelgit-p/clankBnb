// import { createFileRoute } from '@tanstack/react-router'

// export const Route = createLazyFileRoute('/listings')({
//   component: RouteComponent,
// })

// function RouteComponent() {
//   return <div>Hello "/getlistings"!</div>
// }

import { useState } from 'react'
// import { Link } from 'react-router-dom'
import { Bath, Bed, Heart, MapPin, Ruler, Share2 } from 'lucide-react'
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
import { createLazyFileRoute, Link } from '@tanstack/react-router'

// Dummy data
const listings = [
  {
    id: 1,
    title: 'Luxury Beachfront Villa',
    description:
      'Experience paradise in this stunning beachfront villa with panoramic ocean views.',
    price: '0.0049939',
    location: 'Miami Beach, FL',
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    type: 'villa',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80',
    ],
    amenities: ['High-Speed WiFi', 'Smart Home Features', 'Ocean View'],
  },
  {
    id: 2,
    title: 'Modern Downtown Penthouse',
    description: 'Stunning penthouse with city views and luxury amenities.',
    price: '0.0039939',
    location: 'Downtown Miami, FL',
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    type: 'penthouse',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&q=80',
    ],
    amenities: ['Gym', 'Pool', 'Parking'],
  },
  {
    id: 3,
    title: 'Cozy Beach House',
    description: 'Charming beach house steps from the sand.',
    price: '0.0029939',
    location: 'Fort Lauderdale, FL',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    type: 'house',
    images: [
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80',
    ],
    amenities: ['Beach Access', 'BBQ', 'Patio'],
  },
]

export const Route = createLazyFileRoute('/listings')({
  component: ListingsPage,
})

function ListingsPage() {
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{
    [key: number]: number
  }>({})
  const [filters, setFilters] = useState({
    priceRange: '',
    propertyType: '',
    bedrooms: '',
    location: '',
  })

  const nextImage = (listingId: number) => {
    const listing = listings.find((l) => l.id === listingId)
    if (!listing) return

    setCurrentImageIndexes((prev) => ({
      ...prev,
      [listingId]: ((prev[listingId] || 0) + 1) % listing.images.length,
    }))
  }

  const previousImage = (listingId: number) => {
    const listing = listings.find((l) => l.id === listingId)
    if (!listing) return

    setCurrentImageIndexes((prev) => ({
      ...prev,
      [listingId]:
        ((prev[listingId] || 0) - 1 + listing.images.length) %
        listing.images.length,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Available Properties
          </h1>
          <Link to="/listings">
            <Button>List Your Property</Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Price Range
              </label>
              <Select
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, priceRange: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1">0 - 0.001 $CLANKBNB</SelectItem>
                  <SelectItem value="1-2">0.001 - 0.002 $CLANKBNB</SelectItem>
                  <SelectItem value="2+">0.002+ $CLANKBNB</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Property Type
              </label>
              <Select
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, propertyType: value }))
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
                  setFilters((prev) => ({ ...prev, bedrooms: value }))
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
                  setFilters((prev) => ({ ...prev, location: e.target.value }))
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
                  src={listing.images[currentImageIndexes[listing.id] || 0]}
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
                    <span className="sr-only">Previous image</span>←
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="bg-white/80 hover:bg-white"
                    onClick={() => nextImage(listing.id)}
                  >
                    <span className="sr-only">Next image</span>→
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
                    <h3 className="text-xl font-semibold mb-2">
                      {listing.title}
                    </h3>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{listing.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">{listing.price}</div>
                    <div className="text-sm text-gray-600">$CLANKBNB/night</div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {listing.description}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Bed className="h-4 w-4 mr-2" />
                    <span>{listing.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Bath className="h-4 w-4 mr-2" />
                    <span>{listing.bathrooms} Baths</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Ruler className="h-4 w-4 mr-2" />
                    <span>{listing.area} ft²</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {listing.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>

                <Button className="w-full">Book Now</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ListingsPage
