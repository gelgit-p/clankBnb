import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import App from './App.tsx';
import './index.css';
import { WagmiProvider } from 'wagmi';
import { config } from './config.ts';
// import { BrowserRouter } from 'react-router-dom';
import {createRouter, RouterProvider} from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { routeTree } from './routeTree.gen.ts';

const router = createRouter({routeTree});

const queryClient = new QueryClient();

declare module '@tanstack/react-router' {
  export interface Register {
    router: typeof router;
  }
}



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>

      <RouterProvider router={router} />
      </QueryClientProvider>
      {/* <BrowserRouter>
      <App />
      </BrowserRouter> */}
    </WagmiProvider>
  </StrictMode>
);
