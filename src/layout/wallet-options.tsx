import React, { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi'


function WalletOptions() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  const [selectedConnector, setSelectedConnector] = useState<typeof connectors[0] | null>(null);

  const handleConnect = () => {
    if (selectedConnector) {
      connect({ connector: selectedConnector });
    }
  };

  const handleChange = (e) => {
    const connector = connectors.find(connector => connector.uid === e.target.value) || null;
    setSelectedConnector(connector);
    if (connector) {
      connect({ connector });
    }
  };

  return (
    <>
      <div>
        {/* <h2>Account</h2> */}

        {/* <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div> */}

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>


      <div>
        <select onChange={handleChange} defaultValue="">
          <option value="" disabled>Select a connector</option>
          {connectors.map((connector) => (
            <option key={connector.uid} value={connector.uid}>
              {connector.name}
            </option>
          ))}
        </select>
        {/* <div>{status}</div> */}
        {status !== 'idle' && <div>{status}</div>}
        
        <div>{error?.message}</div>
      </div>
    </>
  )
}

export default WalletOptions