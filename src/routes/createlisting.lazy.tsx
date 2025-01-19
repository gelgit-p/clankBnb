import { useState, useEffect } from 'react'
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
import { useSimulateContract, useWriteContract, useConnect, useAccount, useWaitForTransactionReceipt, type BaseError } from 'wagmi'
import { createLazyFileRoute } from '@tanstack/react-router'
import { listingabi } from '@/abi/listingabi'
import { useTokenWrite } from '@/hooks/use-token'
import useToast  from '@/hooks/use-toast'
import { listingabiContractConfig } from '@/contract/listingabi'
import useDebounce from '@/hooks/useDebounce'

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
  const toast = useToast()
  // const { address } = useAccount();
  // const { data: hash, error, isPending, writeContract } = useWriteContract();
  const [title, setTitle] =  useState('');
  const [description, setDescription] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [bathrooms, setBathrooms] = useState('')
  const [area, setArea] = useState('')
    const [price, setPrice] = useState('')
  const [location, setLocation] = useState('')
  const [images, setImages] = useState<string[]>([]);
  const [newAmenity, setNewAmenity] = useState('');
  const debouncedTitle = useDebounce(title, 500)
  const debouncedDescription = useDebounce(description, 500)
  const debouncedpropertyType = useDebounce(propertyType, 500)
  const debouncedBedrooms = useDebounce(bedrooms, 500)
  const debouncedBathrooms = useDebounce(bathrooms, 500)
  const debouncedArea = useDebounce(area, 500)
  const debouncedLocation = useDebounce(location, 500)
  const debouncedPrice = useDebounce(price, 500)
  const debouncedImages = useDebounce(images, 500)
  const debouncedAmenity = useDebounce(newAmenity, 500)
  const { connectAsync } = useConnect()
  const { address, isConnected } = useAccount()
  const [amenities, setAmenities] = useState<string[]>([
    'High-Speed WiFi',
    'Smart Home Features',
    'Ocean View',
  ]);
 


  const {
    register,
    // handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  // const createNewListing = useTokenWrite('createListing', {
  //   onSuccess(data) {
  //     console.log('data: transfer write ', data);
  //   }
  // })

  // const handleNewListing = async (formData: FormData) => {
  //   const { title, description, propertyType, location, area, bedrooms, bathrooms } = formData;
  //   // if (!recipient) return toast('Please enter recipient address', 'error');
  //   // const amount = parseUnits('10', tokenDecimalsData);
  //   await createNewListing.write([title, description, propertyType, location, area, bedrooms, bathrooms, images, amenities]);
  //   toast('Listing created', 'success');
  // };

  const onSubmit = async (data: FormData) => {
    const { title, description, propertyType, location, area, price, bedrooms, bathrooms } = data;
    
    if (!address) {
      // await connectAsync({ chainId: 11155111, connector: injected() });
    }

    const  result  = useSimulateContract({
      address: '0x97085885339305f4B6A2f4C8253C1BbD923e09b2',
      abi: listingabi, // Ensure listingabi is defined and imported correctly
      functionName: 'createListing',
      args: [title, description, propertyType, location, area, price, bedrooms, bathrooms, images, amenities],
    });

    const { writeContract } = useWriteContract();

    if (result?.request) {
      await writeContract(result.request);
    }
  };

  // const  {data}  = useSimulateContract({
  //   abi: listingabi,
  //   address: '0x97085885339305f4B6A2f4C8253C1BbD923e09b2',
  //   // ...listingabiContractConfig,
  //   // contractInterface: nftABI,
  //   functionName: 'createListing',
  //   // enabled: Boolean(quantity),
  //   args: [debouncedTitle, debouncedDescription, debouncedpropertyType, debouncedLocation, debouncedArea, debouncedPrice, debouncedBedrooms, debouncedImages, debouncedBathrooms, debouncedAmenity]
  // })

  // const { writeContract } = useWriteContract()

  //   const queryClient = new QueryClient();

  useEffect(() => {
    if(!isConnected){
      setPrice('');
      return
    }
  }, [isConnected, address]
)



  // const onSubmit = async (formData: FormData) => {
  // const { title, description, propertyType, location, area, bedrooms, bathrooms } = formData;
  //     if(!address) {
  //       await connectAsync({ chainId: 11155111, connector: injected()})
  //     }

  //     const {data, error, isSuccess, isLoading: isLoadingSimulate} = useSimulateContract({
  //       address: '0x14C8fe12a235bFCF6Da2b8179F34Da0C5D79415c',
  //       abi: listingabi,
  //       functionName: 'createListing',
  //       args: [title, description, propertyType, location, area, bedrooms, bathrooms, images, amenities],
  //     })
  //     console.log(data, 'SIMULATION')

  //     setResult(data)

  //     const { writeContract, isLoadingWrite } = useWriteContract()

  //     if (data?.request) {
  //       await writeContract(data.request);
  //     }

  //     const isButtonDisabled = !data  || isLoadingSimulate || isLoadingWrite
  // }
    //  await writeContractAsync({
    //   // chainId: sepolia.id,
    //   address: '0x14C8fe12a235bFCF6Da2b8179F34Da0C5D79415c', // change to receipient address
    //   functionName: 'createListing',
    //   abi: listingabi,
    //   args: [title, description, propertyType, location, area, bedrooms, bathrooms, images, amenities],
    // })
//     console.log('Listing created successfully:', data)

//  } catch(err) {
//   console.error('Error creating listing:', err)
//  } finally {
//   setIsSubmitting(false)
//  }

  // const { isLoading: isConfirming, isSuccess: isConfirmed } =
  // useWaitForTransactionReceipt({
  //   hash,
  // })

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

  // const isButtonDisabled = isPending || isSubmitting || isConfirming

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

      {/* onSubmit={handleSubmit(onSubmit)} */}

      <form className="space-y-8"> 
        <Card className="p-6">
          <p>{address}</p>
          <h2 className="text-xl font-semibold mb-4">Property Details</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Luxury Beachfront Villa"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                
                // {...register('title')}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                // {...register('description')}
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
                  type="decimal"
                  placeholder="0.0049939"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  // {...register('price')}
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
                  value={propertyType}
                  onValueChange={(value) => setPropertyType(value)}
                // value={propertyType}
                // onValueChange={(e) => setPropertyType(e.target.value)}
                  // onValueChange={(value) =>
                    // register('propertyType').onChange({ target: { value } })
                  // }
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
                    value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                    // {...register('bedrooms')}
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
                    value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                    // {...register('bathrooms')}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="area">Area (sq ft)</Label>
                <div className="flex items-center">
                  <Ruler className="w-4 h-4 mr-2 text-gray-500" />
                  <Input id="area" type="number" value={area}
                  onChange={(e) => setArea(e.target.value)}   />
                  {/* {...register('area')} */}
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                  <Input
                    id="location"
                    placeholder="Redbuick crossing, Miami, FL"
                    value={location}
                  onChange={(e) => setLocation(e.target.value)} 
                    // {...register('location')}
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
          <Button  type="button" variant="outline">
            Cancel
          </Button>
          {/* <button
  disabled={!Boolean(data?.request)}
  onClick={() => writeContract(data!.request)}
>
  Create listing
</button> */}
<button 
      onClick={() => 
        writeContract({ 
          listingabi,
          address: '0x6b175474e89094c44da98b954eedeac495271d0f',
          functionName: 'transferFrom',
          args: [
            '0xd2135CfB216b74109775236E36d4b433F1DF507B',
            '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
            123n,
          ],
       })
      }
    >
      CreateListing
    </button>
{/* <button disabled={!write} onClick={()=>write?.()}>Send</button> */}
          {/* <Button 
          // onClick={handleTransfer}
              // type="submit" 
              // onClick={handleTransfer}
  //             disabled={!Boolean(result?.request)}
  // onClick={() => result?.request && writeContract(result.request)}
            >
              Create Listing
            </Button> */}
          {/* {hash && <div>Transaction Hash: {hash}</div>} */}
        </div>
      </form>
    </div>
    </div>
    
  )
}
