import { Connection, SystemProgram, Transaction, clusterApiUrl ,PublicKey} from '@solana/web3.js';



type DisplayEncoding = "utf8" | "hex";
interface ConnectOpts {
  onlyIfTrusted: boolean;
}
interface PhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  signMessage: (
    message: Uint8Array | string,
    display?: DisplayEncoding
  ) => Promise<any>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
  request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
}


export default async function connectToWallet() {

  const getProvider = (): PhantomProvider | undefined => {
    if ("solana" in window) {
      const anyWindow: any = window;
      const provider = anyWindow.solana;
      if (provider.isPhantom) {
        return provider;
      }
    }
    window.open("https://phantom.app/", "_blank");
  };
}