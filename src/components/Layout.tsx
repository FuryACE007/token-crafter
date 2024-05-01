import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useRouter } from "next/router";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  return (
    <div className="layout">
      <header className="flex justify-between items-center p-4 bg-black text-white">
        <div
          className="flex items-center font-extrabold hover:cursor-pointer uppercase"
          onClick={() => router.push("/")}
        >
          <span className="text-white mr-2 text-lg">Token</span>
          <span className="text-[#CD1818] text-xl">Craft</span>
        </div>
        <Navbar />
        <div className="flex items-center">
          <WalletMultiButton />
        </div>
      </header>
      <main>{children}</main>
      {/* <footer>Footer content</footer> */}
    </div>
  );
};

export default Layout;
