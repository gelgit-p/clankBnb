import { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi'


function WalletOptions() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  const [selectedConnector, setSelectedConnector] = useState<typeof connectors[0] | null>(null);

  // const handleConnect = () => {
  //   if (selectedConnector) {
  //     connect({ connector: selectedConnector });
  //   }
  // };

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
            <option value="" disabled>Select a connector</option>
            {connectors.map((connector) => (
              <option key={connector.uid} value={connector.uid}>
                {connector.name}
              </option>
            ))}
          </select>
          {status !== 'idle' && <div>{status}</div>}
          <div>{error?.message}</div>
        </div>
      )}
    </div>
  </>
  )
}

export default WalletOptions