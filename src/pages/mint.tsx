"use client";

import MintTokenForm from "@/components/form/MintTokenForm";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import Head from "next/head";
import { useContext, useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { UmiContext } from "@/UmiContext";

export default function CreateToken() {
  const { umi, setUmi } = useContext(UmiContext);
  const [isClient, setIsClient] = useState(false);
  const { connection } = useConnection();
  const wallet = useWallet();

  const fillerScreen = (
    <main className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="text-2xl sm:text-4xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 ">
        Connect Your Wallet !
      </div>
    </main>
  );

  useEffect(() => {
    setIsClient(true);
    if (wallet?.publicKey && umi) {
      // console.log("Wallet check:", wallet.publicKey);
      setUmi(umi?.use(walletAdapterIdentity(wallet)));
    }
  }, [wallet, setUmi, umi]);

  if (!connection || !wallet.publicKey || !isClient || !umi) {
    return fillerScreen;
  }

  return (
    <>
      <Head>
        <title>Mint Token</title>
        <meta name="description" content="Create a fungible token" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <MintTokenForm umi={umi}/>
        <Toaster />
      </main>
    </>
  );
}
