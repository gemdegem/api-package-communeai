import { useState } from "react";
import { PolkadotAccount } from "./PolkadotComponent";
import { postRequest } from "../../services/apiCalls";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

export const MainScreen = () => {
  const [selectedAccount, setSelectedAccount] = useState<InjectedAccountWithMeta | null>(null);

  return (
    <div>
      <PolkadotAccount setConnectedAccount={setSelectedAccount} />
      {selectedAccount && (
        <div>
          <p>Account Name: {selectedAccount.meta.name}</p>
          <p>Account Address: {selectedAccount.address}</p>
        </div>
      )}
      <button onClick={() => selectedAccount && postRequest(selectedAccount)}>Send Post Request</button>
    </div>
  );
};
