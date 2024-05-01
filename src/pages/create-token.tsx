"use client";

import CreateTokenForm from "@/components/form/CreateTokenForm";
import { useUmi } from "@/useUmi";
import { generateSigner, signerIdentity } from "@metaplex-foundation/umi";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { createSignerFromWalletAdapter } from "@metaplex-foundation/umi-signer-wallet-adapters";
import Head from "next/head";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function CreateToken() {
  const { connection } = useConnection();
  const wallet = useWallet();

  if (!connection || !wallet.publicKey) {
    return (
      <main className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="text-2xl sm:text-4xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 ">
          Connect Your Wallet !
        </div>
      </main>
    );
  }

  const umi = useUmi();
  const [mint, setMint] = useState(generateSigner(umi));
  umi.use(signerIdentity(createSignerFromWalletAdapter(wallet)));

  return (
    <>
      <Head>
        <title>Create Token</title>
        <meta name="description" content="Create a fungible token" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <CreateTokenForm />
        <Toaster />
      </main>
    </>
  );
}
