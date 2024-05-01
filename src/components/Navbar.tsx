"use client";
import {
  IconBrandCashapp,
  IconHome,
  IconMoneybag,
  IconPlus,
} from "@tabler/icons-react";
import React from "react";
import { FloatingNav } from "./ui/floating-navbar";
import { link } from "fs";

const Navbar = () => {
  const navItems = [
    {
      name: "Home 🏠",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Craft 🔨",
      link: "/create-token",
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
