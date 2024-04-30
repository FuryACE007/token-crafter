"use client";
import { IconBrandCashapp, IconMoneybag, IconPlus } from "@tabler/icons-react";
import React from "react";
import { FloatingNav } from "./ui/floating-navbar";

const Navbar = () => {
  const navItems = [
    {
      name: "Craft 🔨",
      link: "/",
      icon: <IconPlus className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Mint 💰",
      link: "/mint",
      icon: (
        <IconMoneybag className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: "Send 💴",
      link: "/send",
      icon: (
        <IconBrandCashapp className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];
  return (
    <div className="w-full relative">
      <FloatingNav navItems={navItems} />
    </div>
  );
};

export default Navbar;
