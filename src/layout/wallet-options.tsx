import { wagmiContractConfig } from '@/contract/contract';
import { useState } from 'react';
import { useAccount, useConnect, useDisconnect, useReadContract } from 'wagmi'

// const tokenAddress = '0x121C1344bb936dC50fecc6B1688AdefAad3F39F2'


function WalletOptions() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect();
  // const { data } = useBalance({
  //   address: account.address,
  // })
  // const {balance} = useBalance({
  //   address: '0x121C1344bb936dC50fecc6B1688AdefAad3F39F2',
  //   token: tokenAddress
  // })
  console.log(account.address, 'accountAddress')
  const addresses = account.address ? [account.address] : [];
  // const balance = useBalance({
  //   address: account.address,
  //   token: tokenAddress
  // })
  const { data: balance } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'balanceOf',
    args: addresses.map(address => address.startsWith('0x') ? address : `0x${address}`) as [`0x${string}`],
    // addresses.map(address => address.startsWith('0x') ? address : `0x${address}`),
  });
  // const fetchBalances = async (addresses: string[]) => {
  //   const balances = await Promise.all(
  //     addresses.map(async (address) =>
  //       useReadContract({
  //         ...wagmiContractConfig,
  //         functionName: 'balanceOf',
  //         args: [address.startsWith('0x') ? address : `0x${address}`] as [`0x${string}`],
  //       })
  //     )
  //   );
  //   return balances;
  // };
//   const balances = await Promise.all(
//     addresses.map(address =>
//         useReadContract({
//             ...wagmiContractConfig,
//             functionName: 'balanceOf',
//             args: [address.startsWith('0x') ? address : `0x${address}`] as [`0x${string}`],
//         })
//     )
// );

  // console.log(balance, 'balance')
  // const [balance, setBalance] = useState<string | null>(null);
  // const CONTRACT_ADDRESS = '0x121C1344bb936dC50fecc6B1688AdefAad3F39F2';
  const [selectedConnector, setSelectedConnector] = useState<typeof connectors[0] | null>(null);

  const handleChange = (e: any) => {
    const connector = connectors.find(connector => connector.uid === e.target.value) || null;
    setSelectedConnector(connector);
    if (connector) {
      connect({ connector });
    }
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#f0f0f0',
    cursor: 'pointer',
    marginBottom: '10px',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#e0e0e0',
  };

  const balanceStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginTop: '10px',
  };

  return (
    <>
    <div>
      {account.status === 'connected' ? (
        <>
          <button
              type="button"
              onClick={() => disconnect()}
              style={buttonStyle}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
            >
              Disconnect Wallet
            </button>
            <div style={balanceStyle}>
            {selectedConnector && <div>{selectedConnector.name}</div>}
            <br />
            Balance: $CLANKBNB {balance ? balance.toString() : 'Loading balance...'}
            </div>
          {/* <div>
            chainId: {account.chainId}
          </div> */}
        </>
      ) : (
        <div>
          <select
            onChange={handleChange}
            defaultValue=""
            style={{
              padding: '10px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginBottom: '10px',
            }}
          >
            <option value="" disabled>connect your wallet</option>
            {connectors.map((connector) => (
              <option key={connector.uid} value={connector.uid}>
                {connector.name}
              </option>
            ))}
          </select>
          {status !== 'idle' && <div>{status}</div>}
          {/* {selectedConnector && <div>Selected: {selectedConnector.name}</div>} */}
          <div>{error?.message}</div>
        </div>
      )}
    </div>
  </>
  )
}

export default WalletOptions