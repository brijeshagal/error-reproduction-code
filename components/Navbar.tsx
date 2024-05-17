import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between gap-6 p-8">
      <div className="text-black dark:text-white font-bold uppercase">Viem Tutorial</div>
      <div>
        <ConnectButton />
      </div>
    </div>
  );
};

export default Navbar;
