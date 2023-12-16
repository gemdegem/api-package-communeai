import React, { useState } from "react";
import { PolkadotAccount } from "./PolkadotComponent";
import { postRequest } from "../../services/apiCalls";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import ModulesList from "../ModulesList";

export const MainScreen = () => {
  const [selectedAccount, setSelectedAccount] = useState<InjectedAccountWithMeta | null>(null);
  const [serverData, setServerData] = useState<string[]>([]); // Dodany stan dla danych serwera

  const handlePostRequest = () => {
    if (selectedAccount) {
      postRequest(selectedAccount, (data) => {
        setServerData(data);
      });
    }
  };

  return (
    <div>
      <PolkadotAccount setConnectedAccount={setSelectedAccount} />
      {selectedAccount && (
        <div>
          <p>Account Name: {selectedAccount.meta.name}</p>
          <p>Account Address: {selectedAccount.address}</p>
        </div>
      )}
      <button onClick={handlePostRequest}>Send Post Request</button>
      <ModulesList modules={serverData} />
    </div>
  );
};
