import { http, createConfig } from 'wagmi'
import { polygon } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const projectId = process.env.REACT_WALLET_CONNECT_ENV as string

export const config = createConfig({
  chains: [polygon],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask(),
    safe(),
  ],
  transports: {
    [polygon.id]: http(),
  },
})