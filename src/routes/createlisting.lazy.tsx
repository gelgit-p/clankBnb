import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Camera, Bed, Bath, Ruler, MapPin, Wifi, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useWriteContract, } from 'wagmi'
import { listingabiContractConfig } from '@/contract/listingabi'
import { createLazyFileRoute } from '@tanstack/react-router'

// const queryClient = new QueryClient()

export const Route = createLazyFileRoute('/createlisting')({
  component: RouteComponent,
})

const formSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  price: z.string().min(1, 'Price is required'),
  location: z.string().min(5, 'Location is required'),
  bedrooms: z.string().min(1, 'Number of bedrooms is required'),
  bathrooms: z.string().min(1, 'Number of bathrooms is required'),
  area: z.string().min(1, 'Area is required'),
  propertyType: z.string().min(1, 'Property type is required'),
})

type FormData = z.infer<typeof formSchema>

function RouteComponent() {
  // const { address } = useAccount();
  const { data: hash, writeContract } = useWriteContract();
  const [images, setImages] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([
    'High-Speed WiFi',
    'Smart Home Features',
    'Ocean View',
  ]);
  const [newAmenity, setNewAmenity] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  //   const queryClient = new QueryClient();

  const onSubmit = (data: FormData) => {

    // New unique id
    // const unique_id = uuidv4();

    // Get first 8 characters using slice
    // const tokenId = unique_id.slice(0, 8);
    // const tokenId = Math.floor(Math.random() * 1000000).toString();

    writeContract({
      ...listingabiContractConfig,
      address: '0x5C639874B7faB5d0A4da383963dbeF194a533675',
      functionName: 'createListing',
      args: [data.title, data.description, data.propertyType, data.area, data.bedrooms, data.bathrooms, data.address, images, amenities  ],
    })
    console.log({ ...data, images, amenities })
  }

  const addImage = () => {
    const url = prompt('Enter image URL:')
    if (url) setImages([...images, url])
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const addAmenity = () => {
    if (newAmenity && !amenities.includes(newAmenity)) {
      setAmenities([...amenities, newAmenity])
      setNewAmenity('')
    }
  }

  const removeAmenity = (index: number) => {
    setAmenities(amenities.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          List Your Property
        </h1>
        <p className="text-gray-600">
          Share your luxury space with our community
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Property Details</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Luxury Beachfront Villa"
                {...register('title')}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your property..."
                className="h-32"
                {...register('description')}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price per night ($CLANKBNB)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.0049939"
                  {...register('price')}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="propertyType">Property Type</Label>
                <Select
                  onValueChange={(value) =>
                    register('propertyType').onChange({ target: { value } })
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
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <div className="flex items-center">
                  <Bed className="w-4 h-4 mr-2 text-gray-500" />
                  <Input
                    id="bedrooms"
                    type="number"
                    {...register('bedrooms')}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <div className="flex items-center">
                  <Bath className="w-4 h-4 mr-2 text-gray-500" />
                  <Input
                    id="bathrooms"
                    type="number"
                    {...register('bathrooms')}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="area">Area (sq ft)</Label>
                <div className="flex items-center">
                  <Ruler className="w-4 h-4 mr-2 text-gray-500" />
                  <Input id="area" type="number" {...register('area')} />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                  <Input
                    id="location"
                    placeholder="Redbuick crossing, Miami, FL"
                    {...register('location')}
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((url, index) => (
              <div key={index} className="relative group aspect-video">
                <img
                  src={url}
                  alt={`Property ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addImage}
              className="aspect-video flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
            >
              <Camera className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Amenities</h2>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add amenity..."
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
              />
              <Button type="button" variant="outline" onClick={addAmenity}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
                >
                  <Wifi className="w-4 h-4 text-gray-500" />
                  <span>{amenity}</span>
                  <button
                    type="button"
                    onClick={() => removeAmenity(index)}
                    className="hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Create Listing</Button>
          {hash && <div>Transaction Hash: {hash}</div>}
        </div>
      </form>
    </div>
    </div>
    
  )
}
