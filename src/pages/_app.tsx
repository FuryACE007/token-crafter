import Layout from "@/components/Layout";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useMemo } from "react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
require("@solana/wallet-adapter-react-ui/styles.css");

export default function App({ Component, pageProps }: AppProps) {
  const rpcEndpoint = process.env.NEXT_PUBLIC_RPC_ENDPOINT;
  const wallets = useMemo(() => [], []);

  if (!rpcEndpoint) {
    throw new Error("RPC endpoint is not defined. ");
  }

  return (
    <ConnectionProvider endpoint={rpcEndpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
