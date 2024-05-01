import CreateTokenForm from "@/components/form/CreateTokenForm";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

export default function CreateToken() {
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
