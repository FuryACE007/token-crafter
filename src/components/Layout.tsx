import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import dynamic from "next/dynamic";

// Dynamically import WalletMultiButton with SSR disabled
const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  {
    ssr: false, // Disable server-side rendering for WalletMultiButton
  }
);

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <header className="flex justify-between items-center p-4 bg-black text-white">
        <div className="flex items-center text-xl font-extrabold uppercase">
          <span className="text-white mr-2">Token</span>
          <span className="text-[#CD1818]">Craft</span>
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
