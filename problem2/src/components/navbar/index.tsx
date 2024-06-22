import { createWeb3Modal } from "@web3modal/wagmi/react"
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config"

import { WagmiProvider } from "wagmi"
import { arbitrum, mainnet } from "wagmi/chains"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()
const projectId = "dbcf3f81a2d7187a79983b892f361d7e"

const chains = [mainnet, arbitrum] as const
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata: {
    name: "Web3Modal",
    description: "Web3Modal Example",
    url: "https://web3modal.com",
    icons: ["https://avatars.githubusercontent.com/u/37784886"]
  }
})
createWeb3Modal({
  projectId,
  wagmiConfig
})
function ConnectButton() {
  return <w3m-button />
}
const Navbar = () => {
  return (
    <div className='navbar wrapper cursor-pointer h-[60px] p-custom w-full justify-self-center mt-4 flex items-center justify-between bg-white bg-opacity-5 rounded-[50px] backdrop-blur-[20px]'>
      <div className='w-12 h-12 rounded-full  p-2'>
        <img
          src='/logo.png'
          alt='logo'
          className='w-full h-full object-contain'
        />
      </div>

      <WagmiProvider config={wagmiConfig}>
        <ConnectButton />
      </WagmiProvider>
    </div>
  )
}

export default Navbar
