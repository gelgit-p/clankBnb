import React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi';
import { config } from '@/config'
import WalletOptions from '@/layout/wallet-options'

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: RootComponent,
})


function RootComponent() {
  return (
    <React.Fragment>
      <div className="navbar bg-gradient-to-r from-pink-50 to-pink-50 p-4 shadow-md flex items-center justify-between">
      <Link to="/listings" className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            Clankbnb
          </Link>
          <div className="flex gap-4">
            {/* {isWalletConnected && (
                         <Link to="/createlisting">
                         <Button variant="outline" className="flex items-center gap-2">
                           <Plus className="h-4 w-4" />
                           List Property
                         </Button>
                       </Link>
            )} */}
            <Link to="/listing">
              <Button variant="outline">Browse Listings</Button>
            </Link>
             <Link to="/createlisting">
                         <Button variant="outline" className="flex items-center gap-2">
                           <Plus className="h-4 w-4" />
                           List Property
                         </Button>
                       </Link>
                       <Link to="/createlisting">
                         <Button variant="outline" className="flex items-center gap-2">
                           <Plus className="h-4 w-4" />
                           My Listings
                         </Button>
                       </Link>
          <Link to="/roadmap">
              <Button variant="outline">Roadmap</Button>
            </Link>
            <Link to="/tokenomics">
              <Button variant="outline">$ CLANKBNB</Button>
            </Link>
            <WagmiProvider config={config}>
               <QueryClientProvider client={queryClient}>
                 <WalletOptions />
                 </QueryClientProvider>
             </WagmiProvider>
      </div>
      </div>
      <Outlet />
    </React.Fragment>

//     <React.Fragment>
//     <div className="navbar bg-white p-4 shadow-md flex items-center justify-between">
//       <Link to="/" className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
//         Clankbnb
//       </Link>
//       <div className="flex gap-4">
//         <Link to="/createlisting">
//           <Button variant="outline" className="flex items-center gap-2">
//             <Plus className="h-4 w-4" />
//             List Property
//           </Button>
//         </Link>
//         <Link to="/roadmap">
//           <Button variant="outline">Roadmap</Button>
//         </Link>
//         <Link to="/tokenomics">
//           <Button variant="outline">$ CLANKBNB</Button>
//         </Link>
//         <WagmiProvider config={config}>
//       <QueryClientProvider client={queryClient}>
//         {/* Other components */}
//         <WalletOptions />
//       </QueryClientProvider>
//     </WagmiProvider>
//       </div>
//     </div>
//   </React.Fragment>

  )
}
