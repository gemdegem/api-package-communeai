import React, { useState, useEffect } from "react";
import { web3Enable, web3AccountsSubscribe, web3FromAddress } from "@polkadot/extension-dapp";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

interface PolkadotAccountProps {
  setConnectedAccount: (account: InjectedAccountWithMeta | null) => void;
}

export const PolkadotAccount: React.FC<PolkadotAccountProps> = ({ setConnectedAccount }) => {
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [selectedAccountIndex, setSelectedAccountIndex] = useState<string>("");
  const [extensionDetected, setExtensionDetected] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      const extensions = await web3Enable("MyApp");
      if (extensions.length > 0) {
        setExtensionDetected(true);
      } else {
        setShowPopup(true);
      }
      const unsubscribe = await web3AccountsSubscribe((allAccounts) => {
        if (Array.isArray(allAccounts)) {
          setAccounts(allAccounts);
        }
      });
      return () => unsubscribe && unsubscribe();
    };

    init();
  }, []);

  const connectAccount = async (index: string) => {
    if (index === "") {
      setConnectedAccount(null);
      setSelectedAccountIndex("");
    } else {
      const account = accounts[parseInt(index, 10)];
      const injector = await web3FromAddress(account.address);
      if (injector) {
        setConnectedAccount(account);
        setSelectedAccountIndex(index);
      }
    }
  };

  const disconnectAccount = () => {
    setConnectedAccount(null);
    setSelectedAccountIndex("");
  };
  const downloadExtensionPopup = () => {
    return (
      <div style={{ background: "white", padding: "20px", position: "fixed", top: "20%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1000, border: "1px solid black" }}>
        <h2>Polkadot Extension Required</h2>
        <p>Please install the Polkadot.js extension to use this feature.</p>
        <p>
          <a href="https://polkadot.js.org/extension/" target="_blank" rel="noopener noreferrer">
            Download Polkadot.js Extension
          </a>
        </p>
        <button onClick={() => setShowPopup(false)}>Close</button>
      </div>
    );
  };

  return (
    <div>
      {showPopup && downloadExtensionPopup()}
      {!extensionDetected && <div>Please install the Polkadot.js extension.</div>}
      {extensionDetected && (
        <div>
          <select value={selectedAccountIndex} onChange={(e) => connectAccount(e.target.value)} onBlur={() => connectAccount(selectedAccountIndex)}>
            <option hidden value="">
              Select Account
            </option>
            {accounts.map((account, index) => (
              <option key={account.address} value={index.toString()}>
                {account.meta.name} ({account.address})
              </option>
            ))}
          </select>
          <button onClick={disconnectAccount}>Disconnect</button>
        </div>
      )}
    </div>
  );
};
