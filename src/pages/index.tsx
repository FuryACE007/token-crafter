import { useRouter } from "next/router";
import { useWallet } from "@solana/wallet-adapter-react";
import Head from "next/head";
import { useEffect } from "react";
require("@solana/wallet-adapter-react-ui/styles.css");

export default function Home() {
  const { connected } = useWallet();
  const router = useRouter();

  // Redirect to the token creation page if the wallet is connected
  useEffect(() => {
    if (connected) {
      router.push("/create-token");
    }
  }, [connected, router]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" min-h-screen w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div>
          <p className=" leading-loose text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
            Launch your coin <br />
            Without writing code
          </p>
          {/* <WalletMultiButton /> */}
        </div>
      </main>
    </>
  );
}
