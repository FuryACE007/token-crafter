import Layout from "@/components/Layout";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import type { Umi, KeypairSigner } from "@metaplex-foundation/umi";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useMemo, useState } from "react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { useUmi } from "@/useUmi";
import { UmiContext } from "@/UmiContext";
require("@solana/wallet-adapter-react-ui/styles.css");

export default function App({ Component, pageProps }: AppProps) {
  const rpcEndpoint = process.env.NEXT_PUBLIC_RPC_ENDPOINT;
  const wallets = useMemo(() => [], []);

  const [umi, setUmi] = useState<Umi | null>(useUmi());
  const [wallet, setWallet] = useState<KeypairSigner | null>(null);

  if (!rpcEndpoint) {
    throw new Error("RPC endpoint is not defined. ");
  }

  return (
    <ConnectionProvider endpoint={rpcEndpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <UmiContext.Provider value={{ umi, setUmi }}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </UmiContext.Provider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
